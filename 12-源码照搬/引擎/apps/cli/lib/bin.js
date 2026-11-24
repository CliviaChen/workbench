#!/usr/bin/env node
/*
 * 引擎入口（适配层）—— 让「正能量阿陈的工作台」复用本机已安装的 DeepSeek Harness 桌面版引擎。
 *
 * 背景：工作台要求 <工作台>\引擎\apps\cli\lib\bin.js 存在，并用
 *   node <这个文件> web --no-open --port 3083
 * 拉起引擎。本机装的是 DSH 桌面版（0.2.2-rc.3），引擎被打包在
 *   D:\DSH\resources\app.asar\dsh\node_modules\@deepseek-ai\dsh\lib\bin.js
 * 普通 node 读不了 asar，所以这里转交给桌面版自带的 Electron 可执行文件
 * （ELECTRON_RUN_AS_NODE=1 时它就是 Node v24.21，满足 dsh 的 >=24.9 要求）。
 *
 * 可覆盖的环境变量：
 *   DSH_DESKTOP_EXE  桌面版 exe 路径（默认 D:\DSH\DeepSeek Harness.exe）
 *   DSH_ASAR_CLI     asar 内 dsh CLI 路径
 *
 * 换成「真正的引擎目录」（DSH 源码 pnpm 构建产物 / npm 安装的 dsh）后，
 * 把本文件删掉、用真实入口替换即可，工作台无需其它改动。
 */
'use strict';

const { spawn } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const DSH_ROOT = process.env.DSH_DESKTOP_ROOT || 'D:\\DSH';
const EXE = process.env.DSH_DESKTOP_EXE || path.join(DSH_ROOT, 'DeepSeek Harness.exe');
const CLI = process.env.DSH_ASAR_CLI
  || path.join(DSH_ROOT, 'resources', 'app.asar', 'dsh', 'node_modules', '@deepseek-ai', 'dsh', 'lib', 'bin.js');

if (!fs.existsSync(EXE)) {
  console.error('[engine-shim] 找不到 DSH 桌面版可执行文件：' + EXE);
  console.error('[engine-shim] 请设置 DSH_DESKTOP_EXE，或把真正的引擎放到 <工作台>\\引擎\\');
  process.exit(1);
}

const env = Object.assign({}, process.env, { ELECTRON_RUN_AS_NODE: '1' });
const args = ['--expose-internals', CLI].concat(process.argv.slice(2));

const child = spawn(EXE, args, {
  cwd: process.cwd(),
  env,
  windowsHide: true,
  stdio: ['ignore', 'inherit', 'inherit'],
});

child.on('error', (e) => {
  console.error('[engine-shim] 启动引擎失败：' + (e && e.message));
  process.exit(1);
});
child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code == null ? 0 : code);
});

for (const sig of ['SIGINT', 'SIGTERM', 'SIGBREAK']) {
  process.on(sig, () => { try { child.kill(); } catch (e) { /* ignore */ } });
}
