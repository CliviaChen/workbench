/**
 * Host-side usage scanner for the Control room.
 *
 * Reads DSH session logs (`<dsh home>/sessions/<workspace>/<session>/session.v4.jsonl.zstd`),
 * which is the only place a real token count exists: every completed assistant
 * message carries `data.message.usage`. The account API exposes balances only.
 *
 * The files are concatenated zstd frames, so a one-shot decompress returns just
 * the first frame; this module walks the frames with `engine.bytesWritten`.
 */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import zlib from 'node:zlib'

export const LOG_NAME = 'session.v4.jsonl.zstd'

function pad2(value) {
  return String(value).padStart(2, '0')
}

/** Local calendar day, matching the local hours used for the hourly buckets. */
function localDay(date) {
  return date.getFullYear() + '-' + pad2(date.getMonth() + 1) + '-' + pad2(date.getDate())
}

/** Resolve the DSH home that owns the `sessions` directory. */
export function dshHome() {
  const fromEnv = process.env.DSH_HOME
  if (typeof fromEnv === 'string' && fromEnv.trim() !== '') return fromEnv
  return path.join(os.homedir(), '.dsh')
}

/** Decompress every concatenated zstd frame in one buffer. */
export function decompressFrames(buffer) {
  if (typeof zlib.zstdDecompressSync !== 'function') {
    throw new Error('this Node has no zstd support')
  }
  let offset = 0
  let text = ''
  let frames = 0
  while (offset < buffer.length) {
    let part
    try {
      part = zlib.zstdDecompressSync(buffer.subarray(offset), { info: true })
    } catch (_error) {
      break
    }
    const used = part.engine && typeof part.engine.bytesWritten === 'number' ? part.engine.bytesWritten : 0
    text += part.buffer.toString('utf8')
    frames += 1
    if (used <= 0) break
    offset += used
    if (frames > 200000) break
  }
  return text
}

/** Every session log under `root`, newest first. */
export function listLogFiles(root) {
  const sessions = path.join(root, 'sessions')
  const found = []
  const walk = (dir) => {
    let entries
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true })
    } catch (_error) {
      return
    }
    for (const entry of entries) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (entry.name === LOG_NAME) {
        let stat = null
        try {
          stat = fs.statSync(full)
        } catch (_error) {}
        found.push({ file: full, mtimeMs: stat ? stat.mtimeMs : 0 })
      }
    }
  }
  walk(sessions)
  found.sort((left, right) => right.mtimeMs - left.mtimeMs)
  return found
}

/** Workspace slug is the log file's parent-parent directory name. */
export function workspaceOf(file) {
  try {
    return path.basename(path.dirname(path.dirname(file)))
  } catch (_error) {
    return ''
  }
}

/** Session id is the log file's parent directory name. */
export function sessionOf(file) {
  try {
    return path.basename(path.dirname(file))
  } catch (_error) {
    return ''
  }
}

function usageOf(record) {
  const data = record && record.data
  const direct = data && data.usage
  const nested = data && data.message && data.message.usage
  const usage = nested || direct
  if (!usage || typeof usage !== 'object') return null
  const total = typeof usage.totalTokens === 'number' ? usage.totalTokens : null
  const input = typeof usage.inputTokens === 'number' ? usage.inputTokens : 0
  const output = typeof usage.outputTokens === 'number' ? usage.outputTokens : 0
  if (total === null && input + output === 0) return null
  return { total: total === null ? input + output : total, net: input + output, at: record.time }
}

/**
 * Aggregate token usage since `sinceMs`.
 * `net` = input + output (no cache reads); `total` = the host's totalTokens.
 */
export function scanUsage(options = {}) {
  const home = options.home || dshHome()
  const sinceMs = Number.isFinite(options.sinceMs) ? options.sinceMs : 0
  const sessions = options.sessions instanceof Set ? options.sessions : null
  const files = listLogFiles(home)

  let records = 0
  let totalTokens = 0
  let netTokens = 0
  let sessionCount = 0
  let skippedFiles = 0
  let consideredFiles = 0
  const perDay = new Map()
  const perWorkspace = new Map()
  const perHour = new Array(24).fill(0).map((_, hour) => ({ hour, net: 0, total: 0 }))

  for (const entry of files) {
    // Optional session filter, so one project can chart only its own sessions.
    if (sessions && sessions.size > 0 && !sessions.has(sessionOf(entry.file))) continue
    consideredFiles += 1
    let text
    try {
      text = decompressFrames(fs.readFileSync(entry.file))
    } catch (_error) {
      skippedFiles += 1
      continue
    }
    let touched = false
    const workspace = workspaceOf(entry.file)
    for (const line of text.split('\n')) {
      if (line === '' || line.indexOf('totalTokens') === -1) continue
      let record
      try {
        record = JSON.parse(line)
      } catch (_error) {
        continue
      }
      const usage = usageOf(record)
      if (!usage) continue
      const at = typeof usage.at === 'number' ? usage.at : 0
      if (at < sinceMs) continue
      touched = true
      records += 1
      totalTokens += usage.total
      netTokens += usage.net
      const when = new Date(at)
      const day = localDay(when)
      const dayRow = perDay.get(day) || { day, net: 0, total: 0 }
      dayRow.net += usage.net
      dayRow.total += usage.total
      perDay.set(day, dayRow)
      const wsRow = perWorkspace.get(workspace) || { workspace, net: 0, total: 0 }
      wsRow.net += usage.net
      wsRow.total += usage.total
      perWorkspace.set(workspace, wsRow)
      const hourRow = perHour[when.getHours()]
      hourRow.net += usage.net
      hourRow.total += usage.total
    }
    if (touched) sessionCount += 1
  }

  // Weeks start on Monday; a window that starts mid-week still reports the whole
  // calendar week, but only days inside the window contribute.
  const perWeek = []
  const weekIndex = new Map()
  const days = [...perDay.values()].sort((left, right) => (left.day < right.day ? -1 : 1))
  for (const row of days) {
    const parts = row.day.split('-').map(Number)
    const date = new Date(parts[0], parts[1] - 1, parts[2])
    const monday = new Date(date.getTime() - ((date.getDay() + 6) % 7) * 86400000)
    const key = localDay(monday)
    let entry = weekIndex.get(key)
    if (!entry) {
      entry = { start: key, end: localDay(new Date(monday.getTime() + 6 * 86400000)), net: 0, total: 0 }
      weekIndex.set(key, entry)
      perWeek.push(entry)
    }
    entry.net += row.net
    entry.total += row.total
  }
  perWeek.sort((left, right) => (left.start < right.start ? -1 : 1))

  return {
    home,
    files: consideredFiles,
    skippedFiles,
    sessions: sessionCount,
    records,
    tokens: { net: netTokens, total: totalTokens },
    perDay: days,
    perHour,
    perWeek,
    perWorkspace: [...perWorkspace.values()].sort((left, right) => right.net - left.net),
  }
}

/** Status file the Host half writes on activation, for diagnosis without a UI. */
export function writeStatus(payload) {
  try {
    const file = path.join(dshHome(), 'control-room-host.json')
    fs.writeFileSync(file, JSON.stringify({ at: new Date().toISOString(), ...payload }, null, 2))
  } catch (_error) {
    // diagnostics must never break activation
  }
}

/** Balance wallets from the host account service, or null when unavailable. */
export async function readBalance(ctx) {
  let account = null
  try {
    account = ctx.get('deepseekAccount')
  } catch (_error) {
    account = null
  }
  if (!account || typeof account.getBalance !== 'function') return null
  const attempts = [{ client: 'web' }, {}]
  for (const params of attempts) {
    try {
      const out = await account.getBalance(params)
      if (out !== null && out !== undefined) return out
    } catch (_error) {
      // try the next shape
    }
  }
  return null
}

// Self check: `node control-room/usage.js` prints the current totals.
if (process.argv[1] && process.argv[1].endsWith('usage.js')) {
  const days = Number(process.argv[2] || '30')
  const since = Date.now() - days * 86400000
  const result = scanUsage({ sinceMs: since })
  console.log(JSON.stringify({
    files: result.files,
    sessions: result.sessions,
    records: result.records,
    net: result.tokens.net,
    total: result.tokens.total,
    days: result.perDay.slice(-5),
    weeks: result.perWeek.slice(-3),
    workspaces: result.perWorkspace.slice(0, 3),
  }, null, 2))
}
