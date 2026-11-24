window.__ModuleLoader__.load({
  id: '@local/control-room',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const { useEffect, useMemo, useRef, useState } = React

    const NS = 'control-room'
    const PANEL_ID = 'control-room'
    const MAX_COLUMNS = 3
    const MAX_FOCUS = 3
    const META_KEY = 'control-room:meta'
    const FLAG_KEY = 'control-room:onboarded'
    const ACTIVITY_DAYS = 7
const WEEKDAY_KEYS = ['wdMon', 'wdTue', 'wdWed', 'wdThu', 'wdFri', 'wdSat', 'wdSun']

    const STAGES = [
      { id: 'idea', key: 'stageIdea' },
      { id: 'active', key: 'stageActive' },
      { id: 'review', key: 'stageReview' },
      { id: 'done', key: 'stageDone' },
    ]

    const TABS = [
      { id: 'overview', key: 'tabOverview' },
      { id: 'board', key: 'tabBoard' },
      { id: 'tasks', key: 'tabTasks' },
      { id: 'sessions', key: 'tabSessions' },
    ]

    const SCALES = [
      { id: 'day', key: 'scaleDay', days: 1, report: 'reportDay' },
      { id: 'week', key: 'scaleWeek', days: 7, report: 'reportWeek' },
      { id: 'month', key: 'scaleMonth', days: 30, report: 'reportMonth' },
    ]

    const WAITING = { approval: 'waitApproval', 'plan-review': 'waitPlan', question: 'waitAnswer' }

    // Stage colour blocks. Lime is deliberately absent: it stays reserved for the
    // running / needs-you pulse so a static stage can never read as activity.
    const STAGE_META = {
      idea: { color: '#00e5ff', ink: '#111111' },
      active: { color: '#ff8a00', ink: '#111111' },
      review: { color: '#ff2e9a', ink: '#111111' },
      done: { color: '#111111', ink: '#f7f2e7' },
    }

    const ZH = {
      panel: '控制室',
      title: '控制室',
      running: '运行中',
      waiting: '等你确认',
      waitApproval: '待审批',
      waitPlan: '计划待审',
      waitAnswer: '待回答',
      enter: '进入对话',
      open: '打开项目',
      back: '返回项目列表',
      emptyTitle: '还没有本地项目',
      emptyHint: '在侧边栏打开一个文件夹后，它会作为工作区登记在这里。',
      allHidden: '所有项目都被归档或隐藏了',
      showHidden: '显示已归档 / 隐藏（{n}）',
      hideHidden: '收起已归档 / 隐藏',
      focusTitle: '现在该做',
      stageIdea: '起步',
      stageActive: '进行',
      stageReview: '待复核',
      stageDone: '已交付',
      stageNone: '未选择',
      stageLabel: '阶段',
      ddlLabel: '截止日期',
      nextLabel: '下一步',
      nextPlaceholder: '一句话写下接下来要做的事',
      dueToday: '今天截止',
      dueTomorrow: '明天截止',
      dueIn: '{n} 天后截止',
      overdue: '已逾期',
      noDue: '未设截止',
      daysAgo: '{n} 天前动过',
      tabOverview: '概览',
      tabBoard: '看板',
      tabTasks: '任务',
      tabSessions: '会话',
      statSessions: '会话',
      statTasks: '任务完成',
      statDue: '距截止',
      statActive: '最近活动',
      activityTitle: '这一周活动',
      activityAria: '这一周每天的 token 消耗与完成的任务数',
      legendTokens: 'Token 消耗',
      legendTasks: '完成任务',
      chartTipTokens: 'Token',
      chartTipTasks: '完成',
      unitTask: '个',
      wdMon: '一',
      wdTue: '二',
      wdWed: '三',
      wdThu: '四',
      wdFri: '五',
      wdSat: '六',
      wdSun: '日',
      tasksTitle: '任务清单',
      tasksEmpty: '还没有任务。把下一步拆成 2–3 条，开工时不用想。',
      taskAdd: '添加',
      taskPlaceholder: '要做什么？',
      taskRemove: '删除任务',
      sessionsTitle: '会话',
      sessionsEmpty: '这个项目还没有会话，进入对话开始第一个。',
      untitled: '未命名会话',
      star: '收藏会话',
      starred: '已收藏',
      note: '备注',
      notePlaceholder: '给这次会话写一句备注',
      hint: '卡片就是项目：点进去看板、任务、会话都在里面，需要对话再点「进入对话」。',
      gotIt: '知道了',
      noValue: '—',
      clockAria: '当前时间',
      menuRename: '重命名工作区…',
      canvasMenuAria: '画布菜单',
      menuCreate: '创建新对话…',
      createTitle: '创建新对话',
      createName: '对话名称',
      createPath: '工作区位置',
      createPathPlaceholder: 'E:\\projects\\demo',
      createPathHint: '填写这台电脑上已存在的文件夹绝对路径',
      createDefaultName: '新建对话',
      createMissingPath: '请填写工作区路径',
      createUnavailable: '宿主未提供创建工作区接口（请关开一次插件以加载 Host 半边）',
      createBusy: '创建中…',
      createDone: '已创建新对话',
      menuArchive: '归档项目',
      menuUnarchive: '取消归档',
      menuHide: '隐藏项目',
      menuUnhide: '取消隐藏',
      menuSessions: '会话收藏与备注…',
      renameTitle: '重命名工作区',
      renameHint: '同时更新侧边栏里的工作区名称',
      renameEmpty: '名称不能为空',
      renameUnavailable: '宿主未提供重命名接口（请关开一次插件以加载 Host 半边）',
      renameDone: '已重命名',
      confirm: '确定',
      cancel: '取消',
      menuAria: '项目操作',
      archived: '已归档',
      hidden: '已隐藏',
      records: '记录',
      recordsClose: '关闭记录',
      scaleDay: '日报',
      scaleWeek: '周报',
      scaleMonth: '月报',
      metricDone: '已完成项目',
      metricTokens: '使用 Token',
      metricPeak: '最活跃时段',
      peakHintHours: '最活跃的 3 小时',
      peakHintDay: '最活跃的一天',
      peakHintWeek: '最活跃的一周',
      metricSessions: '会话数',
      tokenHostBody: '这些数字来自本机会话日志，由 Host 半边读取，不经过网络。',
      tokenNet: '净消耗（输入+输出）',
      tokenTotal: '总消耗（含缓存）',
      tokenRecords: '计量条数',
      tokenLoading: '读取中…',
      tokenHostDown: '宿主导航未提供该数据（需要重启 DSH 以加载 Host 半边）',
      tokensConnect: '点击连接账号',
      tokenDialogTitle: 'Token 用量',
      tokenKnownBody: '这些数字来自宿主会话计量。',
      tokenUnknownBody: '控制室读不到历史 token 用量：宿主只向本页提供会话状态，账号接口也只返回余额。点「读取账号余额」可读取与「设置 → 账号余额」相同的数据。',
      tokenConnect: '登录 DeepSeek 账号',
      tokenRead: '读取账号余额',
      tokenUnsupported: '当前安装未开放账号接口',
      tokenFailed: '读取失败，请登录后重试',
      tokenBalance: '余额',
      tokenBonus: '赠送',
      tokenBalanceRead: '已读取账号余额',
      close: '关闭',
      recordsNote: '完成数按「标记为已交付」的日期统计；Token 取宿主会话用量，取不到则显示 —。',
      exportCopy: '复制',
      exportDownload: '下载 .md',
      copied: '已复制到剪贴板',
      copyFailed: '复制失败，请手动选择文本',
      reportDay: '日报',
      reportWeek: '周报',
      reportMonth: '月报',
      reportRange: '统计区间',
      reportDelivered: '已完成项目',
      reportSessions: '会话数',
      reportTokens: 'Token',
      reportPeak: '最活跃时段',
      reportDoneSection: '已完成',
      timeNow: '刚刚',
      timeMin: ' 分钟前',
      timeHour: ' 小时前',
      timeDay: ' 天前',
    }

    const EN = {
      panel: 'Control room',
      title: 'Control room',
      running: 'Running',
      waiting: 'Needs you',
      waitApproval: 'Approval due',
      waitPlan: 'Plan review',
      waitAnswer: 'Answer due',
      enter: 'Open chat',
      open: 'Open project',
      back: 'Back to projects',
      emptyTitle: 'No local projects yet',
      emptyHint: 'Open a folder in the sidebar and it is registered here as a workspace.',
      allHidden: 'Every project is archived or hidden',
      showHidden: 'Show archived / hidden ({n})',
      hideHidden: 'Hide archived / hidden',
      focusTitle: 'Do next',
      stageIdea: 'Idea',
      stageActive: 'Active',
      stageReview: 'Review',
      stageDone: 'Delivered',
      stageNone: 'No stage',
      stageLabel: 'Stage',
      ddlLabel: 'Deadline',
      nextLabel: 'Next step',
      nextPlaceholder: 'One line on what moves this forward',
      dueToday: 'Due today',
      dueTomorrow: 'Due tomorrow',
      dueIn: 'Due in {n}d',
      overdue: 'Overdue',
      noDue: 'No deadline',
      daysAgo: 'Touched {n}d ago',
      tabOverview: 'Overview',
      tabBoard: 'Board',
      tabTasks: 'Tasks',
      tabSessions: 'Sessions',
      statSessions: 'Sessions',
      statTasks: 'Tasks done',
      statDue: 'Due in',
      statActive: 'Last active',
      activityTitle: 'This week',
      activityAria: 'Tokens spent and tasks completed on each day of this week',
      legendTokens: 'Tokens',
      legendTasks: 'Tasks done',
      chartTipTokens: 'Token',
      chartTipTasks: 'done',
      unitTask: ' tasks',
      wdMon: 'Mon',
      wdTue: 'Tue',
      wdWed: 'Wed',
      wdThu: 'Thu',
      wdFri: 'Fri',
      wdSat: 'Sat',
      wdSun: 'Sun',
      tasksTitle: 'Task list',
      tasksEmpty: 'No tasks yet. Break the next step into 2–3 items.',
      taskAdd: 'Add',
      taskPlaceholder: 'What needs doing?',
      taskRemove: 'Delete task',
      sessionsTitle: 'Sessions',
      sessionsEmpty: 'No sessions yet. Open the chat to start one.',
      untitled: 'Untitled session',
      star: 'Star session',
      starred: 'Starred',
      note: 'Note',
      notePlaceholder: 'One line about this session',
      hint: 'A card is a project: open it for board, tasks and sessions; use “Open chat” when you need the conversation.',
      gotIt: 'Got it',
      noValue: '—',
      clockAria: 'Current time',
      menuRename: 'Rename workspace…',
      canvasMenuAria: 'Canvas menu',
      menuCreate: 'New conversation…',
      createTitle: 'New conversation',
      createName: 'Conversation name',
      createPath: 'Workspace location',
      createPathPlaceholder: 'E:\\projects\\demo',
      createPathHint: 'Absolute path to an existing folder on this computer',
      createDefaultName: 'New conversation',
      createMissingPath: 'Enter a workspace path',
      createUnavailable: 'The host exposes no workspace create API (toggle the plugin once to load the Host half)',
      createBusy: 'Creating…',
      createDone: 'Conversation created',
      menuArchive: 'Archive project',
      menuUnarchive: 'Unarchive',
      menuHide: 'Hide project',
      menuUnhide: 'Unhide',
      menuSessions: 'Session stars and notes…',
      renameTitle: 'Rename workspace',
      renameHint: 'The sidebar workspace name updates too',
      renameEmpty: 'Name cannot be empty',
      renameUnavailable: 'The host exposes no rename API (toggle the plugin once to load the Host half)',
      renameDone: 'Renamed',
      confirm: 'OK',
      cancel: 'Cancel',
      menuAria: 'Project actions',
      archived: 'Archived',
      hidden: 'Hidden',
      records: 'Records',
      recordsClose: 'Close records',
      scaleDay: 'Day',
      scaleWeek: 'Week',
      scaleMonth: 'Month',
      metricDone: 'Projects done',
      metricTokens: 'Tokens used',
      metricPeak: 'Peak window',
      peakHintHours: 'Busiest 3 hours',
      peakHintDay: 'Busiest day',
      peakHintWeek: 'Busiest week',
      metricSessions: 'Sessions',
      tokensUnavailable: 'not exposed by host',
      tokenHostBody: 'These numbers come from local session logs, read by the Host half — no network involved.',
      tokenNet: 'Net (input + output)',
      tokenTotal: 'Total (incl. cache)',
      tokenRecords: 'Metered records',
      tokenLoading: 'Reading…',
      tokenHostDown: 'The Host route is unavailable — restart DSH so the Host half loads',
      tokensConnect: 'Connect account',
      tokenDialogTitle: 'Token usage',
      tokenKnownBody: 'These numbers come from host session metering.',
      tokenUnknownBody: 'Historical token usage is not readable here: the host gives this page session state only, and the account API returns balances. “Read account balance” shows the same data as Settings → Account.',
      tokenConnect: 'Sign in to DeepSeek',
      tokenRead: 'Read account balance',
      tokenUnsupported: 'This installation does not expose the account API',
      tokenFailed: 'Read failed — sign in and try again',
      tokenBalance: 'Balance',
      tokenBonus: 'Bonus',
      tokenBalanceRead: 'Account balance read',
      close: 'Close',
      recordsNote: 'Done counts use the date a project was marked delivered; tokens come from host session usage and show — when absent.',
      exportCopy: 'Copy',
      exportDownload: 'Download .md',
      copied: 'Copied to clipboard',
      copyFailed: 'Copy failed — select the text manually',
      reportDay: 'Daily report',
      reportWeek: 'Weekly report',
      reportMonth: 'Monthly report',
      reportRange: 'Range',
      reportDelivered: 'Projects done',
      reportSessions: 'Sessions',
      reportTokens: 'Tokens',
      reportPeak: 'Peak window',
      reportDoneSection: 'Delivered',
      timeNow: 'just now',
      timeMin: 'm ago',
      timeHour: 'h ago',
      timeDay: 'd ago',
    }

    const CSS = `
.cr-root{position:relative;display:flex;flex-direction:column;height:100%;min-height:0;overflow:hidden;box-sizing:border-box;
  color:var(--dsw-alias-label-primary);font-family:inherit;
  background:var(--dsw-alias-bg-base,light-dark(#f4f1ea,#0e0c10));
  --cr-size:clamp(112px,min(28vh,22vw),190px);
  --cr-gap:clamp(34px,5vmin,56px);
  --cr-line:light-dark(#111111,#f7f2e7);
  --cr-shadow:light-dark(#111111,#050408);
  --cr-paper:light-dark(#f4efe6,#17131d);
  --cr-lime:#c8ff00;
  --cr-magenta:#ff2e9a;
  --cr-cyan:#00e5ff;
  --cr-amber:#ff8a00;
  --cr-focus:light-dark(#0a5bd3,#c8ff00)}
.cr-root::before{content:'';position:absolute;inset:-8%;pointer-events:none;z-index:0;
  background-image:radial-gradient(var(--cr-line) 1.4px,transparent 1.4px);
  background-size:22px 22px;opacity:.07}
.cr-scroll{position:relative;z-index:1;flex:1 1 auto;min-height:0;overflow:auto;display:flex;flex-direction:column;gap:24px;
  padding:30px 36px 96px;box-sizing:border-box;
  scrollbar-width:none;-ms-overflow-style:none}
.cr-scroll::-webkit-scrollbar{width:0;height:0}
.cr-scrollInner{display:flex;flex-direction:column;gap:24px;transform:translateY(var(--cr-pull,0px));will-change:transform}
.cr-scrollInner[data-spring="true"]{transition:transform .46s cubic-bezier(.25,1.08,.34,1)}
/* overlay scrollbar: appears on wheel, fades out when idle */
.cr-scrollbar{position:absolute;right:5px;top:18px;bottom:18px;width:12px;z-index:60;border-radius:2px;
  background:color-mix(in srgb,var(--cr-line) 16%,transparent);opacity:0;transition:opacity .28s ease;pointer-events:none}
.cr-scrollbar[data-on="true"]{opacity:1;pointer-events:auto}
.cr-scrollThumb{position:absolute;left:1px;right:1px;top:0;box-sizing:border-box;border-radius:1px;
  background:var(--cr-magenta);border:2px solid var(--cr-line);cursor:grab;touch-action:none}
.cr-scrollbar[data-on="true"] .cr-scrollThumb:active{cursor:grabbing}
.cr-top,.cr-hint,.cr-focus,.cr-grid,.cr-empty,.cr-detail{position:relative;z-index:1}
/* clock: Memphis type — hour dominant, labels as tracked caps */
.cr-top{display:flex;align-items:flex-start;justify-content:space-between;gap:24px}
.cr-clock{display:flex;align-items:flex-end;gap:14px;flex:0 0 auto;padding:10px 14px;border:2px solid var(--cr-line);border-radius:3px;
  background:var(--cr-paper);box-shadow:5px 5px 0 var(--cr-shadow)}
.cr-clockTime{font-size:clamp(30px,4.6vmin,50px);font-weight:800;line-height:.86;letter-spacing:-.04em;font-variant-numeric:tabular-nums}
.cr-clockSide{display:flex;flex-direction:column;gap:3px;padding-bottom:3px}
.cr-clockDate{font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;font-variant-numeric:tabular-nums;opacity:.72}
.cr-clockWeek{font-size:10px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;opacity:.5}
/* buttons */
.cr-btn{height:38px;padding:0 16px;border:2px solid var(--cr-line);border-radius:2px;background:transparent;
  color:var(--cr-line);font:inherit;font-size:12.5px;font-weight:700;cursor:pointer;white-space:nowrap}
.cr-btn:hover{background:color-mix(in srgb,var(--cr-line) 10%,transparent)}
.cr-btn--primary{background:var(--cr-lime);color:#111111;box-shadow:3px 3px 0 var(--cr-line)}
.cr-btn--primary:hover{background:var(--cr-lime)}
.cr-btn:focus-visible{outline:3px solid var(--cr-focus);outline-offset:2px}
.cr-hint{display:flex;align-items:center;justify-content:space-between;gap:18px;flex-wrap:wrap;
  padding:12px 14px;border:2px solid var(--cr-line);border-radius:4px;background:var(--cr-paper);
  box-shadow:6px 6px 0 var(--cr-shadow);font-size:13px}
.cr-hintText{min-width:0;line-height:1.5}
/* focus */
.cr-focus{display:flex;flex-direction:column;gap:10px;flex:1 1 auto;min-width:0}
.cr-focusLabel{font-size:10.5px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;opacity:.62}
.cr-focusRow{display:flex;gap:12px;flex-wrap:wrap}
.cr-focusItem{display:inline-flex;flex-direction:column;align-items:flex-start;gap:3px;text-align:left;
  padding:9px 13px;border:2px solid var(--cr-line);border-radius:3px;background:var(--cr-paper);color:var(--cr-line);
  box-shadow:4px 4px 0 var(--cr-shadow);cursor:pointer;font:inherit;max-width:260px;
  transition:transform .16s ease,box-shadow .16s ease}
.cr-focusItem:hover{transform:translate(-2px,-2px);box-shadow:6px 6px 0 var(--cr-shadow)}
.cr-focusItem[data-state="waiting"]{--cr-shadow:var(--cr-lime);border-color:var(--cr-lime)}
.cr-focusName{font-size:13px;font-weight:800;letter-spacing:-.01em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%}
.cr-focusWhy{font-size:10.5px;letter-spacing:.06em;text-transform:uppercase;opacity:.72;display:inline-flex;align-items:center;gap:5px}
/* grid */
.cr-grid{display:grid;grid-template-columns:repeat(var(--cr-cols,3),var(--cr-size));gap:var(--cr-gap);margin:auto;justify-items:stretch}
.cr-card{position:relative;box-sizing:border-box;width:var(--cr-size);aspect-ratio:1/1;
  display:flex;flex-direction:column;align-items:flex-start;
  padding:clamp(14px,1.8vmin,18px);
  border:2px solid var(--cr-line);border-radius:4px;
  color:var(--cr-line);font:inherit;text-align:left;cursor:pointer;
  background:var(--cr-paper);
  box-shadow:9px 9px 0 var(--cr-shadow);
  transition:transform .2s cubic-bezier(.2,.9,.2,1.05),box-shadow .2s ease}
.cr-card:hover{transform:translate(-3px,-3px);box-shadow:13px 13px 0 var(--cr-shadow)}
.cr-card:active{transform:translate(4px,4px);box-shadow:0 0 0 var(--cr-shadow)}
.cr-card:focus-visible{outline:3px solid var(--cr-focus);outline-offset:4px}
.cr-card[data-state="running"]{--cr-shadow:var(--cr-lime);animation:cr-pulse 1.6s ease-in-out infinite}
.cr-card[data-state="waiting"]{--cr-shadow:var(--cr-lime);border-color:var(--cr-lime);animation:cr-pulse 1.6s ease-in-out infinite}
.cr-card[data-muted="true"]{opacity:.55}
.cr-flag{position:absolute;top:8px;right:8px;z-index:2;padding:2px 6px;border:2px solid var(--cr-line);border-radius:2px;
  background:var(--cr-magenta);color:#ffffff;font-size:9px;font-weight:800;letter-spacing:.1em;text-transform:uppercase}
.cr-mark{position:relative;z-index:2;display:grid;place-items:center;flex:0 0 auto;
  width:clamp(34px,4.2vmin,42px);aspect-ratio:1/1;border-radius:2px;
  color:#ffffff;background:var(--cr-magenta);
  border:2px solid var(--cr-line);box-shadow:3px 3px 0 var(--cr-shadow)}
.cr-name{position:relative;z-index:2;margin-top:auto;width:100%;font-size:14px;font-weight:800;line-height:1.3;
  letter-spacing:-.01em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.cr-state{position:relative;z-index:2;display:inline-flex;align-items:center;gap:6px;margin-top:6px;
  font-size:10.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;font-variant-numeric:tabular-nums;
  color:color-mix(in srgb,var(--cr-line) 88%,transparent)}
.cr-state--idle{font-weight:500;letter-spacing:.02em;text-transform:none;opacity:.72}
.cr-dot{width:6px;height:6px;background:var(--cr-lime);border:1px solid var(--cr-line);flex:0 0 auto}
.cr-dot--running{border-radius:50%}
.cr-dot--waiting{border-radius:1px}
.cr-meta{position:relative;z-index:2;display:flex;align-items:center;gap:8px;margin-top:6px;width:100%;
  overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.cr-due{font-size:10px;letter-spacing:.04em;color:color-mix(in srgb,var(--cr-line) 66%,transparent);font-variant-numeric:tabular-nums}
/* stage: static colour block + tinted card. Lime is kept for activity only. */
.cr-card[data-stage="idea"],.cr-card[data-stage="active"],.cr-card[data-stage="review"],.cr-card[data-stage="done"]{
  background:color-mix(in srgb,var(--cr-stage) 13%,var(--cr-paper))}
.cr-stageTag{display:inline-flex;align-items:center;padding:2px 7px;border:2px solid var(--cr-line);border-radius:2px;
  background:var(--cr-stage,transparent);color:var(--cr-stage-ink,inherit);
  font-size:9.5px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;line-height:1.5}
.cr-stageTag[data-unset="true"]{background:transparent;border-style:dashed;font-weight:700;
  color:color-mix(in srgb,var(--cr-line) 58%,transparent)}
.cr-hiddenToggle{align-self:center;border:0;background:transparent;color:var(--cr-line);font:inherit;font-size:11.5px;
  letter-spacing:.06em;text-decoration:underline;cursor:pointer;opacity:.7;padding:6px}
.cr-hiddenToggle:hover{opacity:1}
/* context menu */
.cr-menuScrim{position:fixed;inset:0;z-index:70}
.cr-menu{position:fixed;z-index:71;min-width:190px;padding:6px;border:2px solid var(--cr-line);border-radius:3px;
  background:var(--cr-paper);box-shadow:8px 8px 0 var(--cr-shadow);
  animation:cr-menuIn .16s cubic-bezier(.2,1.3,.4,1) both}
.cr-menuItem{display:block;width:100%;padding:8px 10px;border:0;border-radius:2px;background:transparent;color:var(--cr-line);
  font:inherit;font-size:13px;text-align:left;cursor:pointer}
.cr-menuItem:hover,.cr-menuItem:focus-visible{background:var(--cr-lime);color:#111111;outline:none}
.cr-menuSep{height:2px;margin:5px 2px;background:color-mix(in srgb,var(--cr-line) 24%,transparent)}
/* detail */
.cr-detail{display:flex;flex-direction:column;gap:20px;min-height:0}
.cr-detailHead{display:flex;align-items:flex-start;gap:16px;flex-wrap:wrap}
.cr-back{display:inline-flex;align-items:center;gap:7px;height:34px;padding:0 12px;border:2px solid var(--cr-line);
  border-radius:2px;background:transparent;color:var(--cr-line);font:inherit;font-size:12px;font-weight:700;cursor:pointer}
.cr-back:hover{background:var(--cr-lime);color:#111111}
.cr-back:focus-visible{outline:3px solid var(--cr-focus);outline-offset:2px}
.cr-detailId{display:flex;align-items:center;gap:12px;min-width:0;flex:1 1 220px}
.cr-detailName{margin:0;font-size:22px;font-weight:800;letter-spacing:-.02em;line-height:1.2;
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.cr-detailSub{display:flex;align-items:center;gap:10px;margin-top:4px;flex-wrap:wrap;
  font-size:11px;letter-spacing:.06em;text-transform:uppercase;opacity:.72}
.cr-detailActions{display:flex;gap:10px;margin-left:auto}
.cr-tabs{display:flex;gap:8px;flex-wrap:wrap;border-bottom:2px solid var(--cr-line);padding-bottom:10px}
.cr-tab{height:34px;padding:0 14px;border:2px solid var(--cr-line);border-radius:2px;background:transparent;
  color:var(--cr-line);font:inherit;font-size:12px;font-weight:700;cursor:pointer}
.cr-tab[aria-selected="true"]{background:var(--cr-lime);color:#111111;box-shadow:3px 3px 0 var(--cr-line)}
.cr-tab:focus-visible{outline:3px solid var(--cr-focus);outline-offset:2px}
/* panels */
.cr-panel{border:2px solid var(--cr-line);border-radius:4px;background:var(--cr-paper);
  box-shadow:7px 7px 0 var(--cr-shadow);padding:20px}
.cr-panelTitle{margin:0 0 14px;font-size:10.5px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;opacity:.62}
.cr-field{margin-bottom:16px}
.cr-field:last-child{margin-bottom:0}
.cr-fieldLabel{display:block;margin-bottom:7px;font-size:10.5px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;opacity:.66}
.cr-chips{display:flex;flex-wrap:wrap;gap:7px}
.cr-chip{padding:6px 11px;border:2px solid var(--cr-line);border-radius:2px;background:transparent;color:var(--cr-line);
  font:inherit;font-size:12px;font-weight:700;cursor:pointer}
.cr-chip[data-on="true"]{background:var(--cr-lime);color:#111111}
.cr-chip:focus-visible{outline:3px solid var(--cr-focus);outline-offset:2px}
.cr-input{box-sizing:border-box;width:100%;height:38px;padding:0 10px;border:2px solid var(--cr-line);border-radius:2px;
  background:transparent;color:var(--cr-line);font:inherit;font-size:13px}
.cr-input:focus-visible{outline:3px solid var(--cr-focus);outline-offset:2px}
/* board */
.cr-statRow{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:12px;margin-bottom:16px}
.cr-stat{border:2px solid var(--cr-line);border-radius:3px;background:var(--cr-paper);padding:12px 14px;box-shadow:4px 4px 0 var(--cr-shadow)}
.cr-statValue{font-size:24px;font-weight:800;letter-spacing:-.03em;line-height:1.1;font-variant-numeric:tabular-nums}
.cr-statLabel{margin-top:5px;font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;opacity:.66}
.cr-legends{display:flex;gap:14px;margin-bottom:10px;font-size:9.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;opacity:.68}
.cr-legend{display:inline-flex;align-items:center;gap:6px}
.cr-legendSwatch{width:10px;height:10px;border:2px solid var(--cr-line)}
.cr-legendSwatch--up{background:var(--cr-magenta)}
.cr-legendSwatch--down{background:var(--cr-cyan)}
/* week chart: tokens grow up, completed tasks grow down, over a grey track */
.cr-chart{position:relative;display:grid;grid-template-columns:repeat(7,1fr);gap:8px;height:150px;margin:4px 0 22px}
.cr-chartBase{position:absolute;left:0;right:0;top:calc(50% - 1px);height:2px;background:color-mix(in srgb,var(--cr-line) 42%,transparent)}
.cr-chartCol{position:relative;height:100%}
.cr-chartCol:focus-visible{outline:3px solid var(--cr-lime);outline-offset:2px}
.cr-chartTrack{position:absolute;left:50%;transform:translateX(-50%);top:0;bottom:0;width:16px;
  background:color-mix(in srgb,var(--cr-line) 10%,transparent)}
.cr-chartCol[data-idle="true"] .cr-chartTrack{background:color-mix(in srgb,var(--cr-line) 5%,transparent)}
.cr-chartUp{position:absolute;left:50%;transform:translateX(-50%);bottom:50%;width:16px;box-sizing:border-box;
  background:var(--cr-magenta);border:2px solid var(--cr-line);border-bottom:0}
.cr-chartDown{position:absolute;left:50%;transform:translateX(-50%);top:50%;width:16px;box-sizing:border-box;
  background:var(--cr-cyan);border:2px solid var(--cr-line);border-top:0}
.cr-chartLabel{position:absolute;left:0;right:0;bottom:-18px;text-align:center;font-size:9px;font-weight:700;
  letter-spacing:.04em;opacity:.55;white-space:nowrap}
.cr-chartTip{position:absolute;left:50%;bottom:calc(100% + 8px);transform:translateX(-50%);z-index:6;
  padding:6px 8px;border:2px solid var(--cr-line);border-radius:2px;background:var(--cr-paper);color:var(--cr-line);
  box-shadow:3px 3px 0 var(--cr-shadow);font-size:10.5px;font-weight:700;white-space:nowrap;
  opacity:0;pointer-events:none;transition:opacity .12s}
.cr-chartCol:hover .cr-chartTip,.cr-chartCol:focus-visible .cr-chartTip{opacity:1}
.cr-progress{margin-top:16px;height:12px;border:2px solid var(--cr-line);border-radius:2px;background:transparent;overflow:hidden}
.cr-progressFill{height:100%;background:var(--cr-lime)}
/* tasks */
.cr-taskForm{display:flex;gap:8px;margin-bottom:16px}
.cr-taskForm .cr-input{flex:1 1 auto}
.cr-taskList,.cr-sessionList{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}
.cr-taskRow{display:flex;align-items:center;gap:10px;padding:9px 10px;border:2px solid var(--cr-line);border-radius:2px;background:var(--cr-paper)}
.cr-taskCheck{width:18px;height:18px;flex:0 0 auto;display:grid;place-items:center;border:2px solid var(--cr-line);
  border-radius:2px;background:transparent;cursor:pointer;color:#111111;font-size:11px;line-height:1;padding:0}
.cr-taskRow[data-done="true"] .cr-taskCheck{background:var(--cr-lime)}
.cr-taskText{flex:1 1 auto;min-width:0;font-size:13px;line-height:1.4;word-break:break-word}
.cr-taskRow[data-done="true"] .cr-taskText{text-decoration:line-through;opacity:.55}
.cr-taskDel{width:26px;height:26px;flex:0 0 auto;display:grid;place-items:center;border:2px solid transparent;border-radius:2px;
  background:transparent;color:var(--cr-line);cursor:pointer;font-size:14px;line-height:1;padding:0}
.cr-taskDel:hover{border-color:var(--cr-line);background:var(--cr-magenta);color:#ffffff}
.cr-taskCheck:focus-visible,.cr-taskDel:focus-visible{outline:3px solid var(--cr-focus);outline-offset:2px}
/* sessions */
.cr-sessionItem{display:flex;flex-direction:column;gap:6px}
.cr-sessionRow{display:flex;align-items:center;gap:8px;border:2px solid var(--cr-line);border-radius:2px;background:var(--cr-paper)}
.cr-star{width:30px;height:34px;flex:0 0 auto;display:grid;place-items:center;border:0;border-right:2px solid var(--cr-line);
  background:transparent;color:var(--cr-line);cursor:pointer;font-size:14px;line-height:1;padding:0}
.cr-star[aria-pressed="true"]{background:var(--cr-lime);color:#111111}
.cr-sessionOpen{display:flex;align-items:center;gap:10px;flex:1 1 auto;min-width:0;padding:8px 10px;border:0;background:transparent;
  color:var(--cr-line);font:inherit;text-align:left;cursor:pointer}
.cr-sessionOpen:hover{background:var(--cr-lime);color:#111111}
.cr-sessionTitle{flex:1 1 auto;min-width:0;font-size:13px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.cr-sessionTime{flex:0 0 auto;font-size:11px;opacity:.66;font-variant-numeric:tabular-nums}
.cr-noteBtn{width:30px;height:34px;flex:0 0 auto;display:grid;place-items:center;border:0;border-left:2px solid var(--cr-line);
  background:transparent;color:var(--cr-line);cursor:pointer;font-size:13px;line-height:1;padding:0}
.cr-noteBtn:hover{background:var(--cr-cyan);color:#111111}
.cr-star:focus-visible,.cr-sessionOpen:focus-visible,.cr-noteBtn:focus-visible{outline:3px solid var(--cr-focus);outline-offset:-3px}
.cr-noteInput{height:34px}
.cr-emptyInline{padding:16px 0;font-size:12.5px;line-height:1.6;opacity:.7}
/* records drawer */
.cr-recordsBtn{position:absolute;left:18px;bottom:16px;z-index:60;height:40px;padding:0 16px;border:2px solid var(--cr-line);
  border-radius:2px;background:var(--cr-paper);color:var(--cr-line);font:inherit;font-size:12px;font-weight:800;
  letter-spacing:.12em;text-transform:uppercase;cursor:pointer;box-shadow:5px 5px 0 var(--cr-shadow)}
.cr-recordsBtn:hover{background:var(--cr-lime);color:#111111}
.cr-recordsBtn:focus-visible{outline:3px solid var(--cr-focus);outline-offset:2px}
.cr-records{position:absolute;left:18px;bottom:16px;z-index:65;box-sizing:border-box;width:min(400px,calc(100% - 36px));
  max-height:calc(100% - 32px);overflow:auto;padding:18px;border:2px solid var(--cr-line);border-radius:4px;
  background:var(--cr-paper);color:var(--cr-line);box-shadow:12px 12px 0 var(--cr-shadow)}
.cr-recordsHead{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:14px}
.cr-recordsHead h2{margin:0;font-size:11px;font-weight:800;letter-spacing:.2em;text-transform:uppercase}
.cr-recordsActions{display:flex;gap:6px;flex:0 0 auto}
.cr-recordsActions .cr-btn{height:30px;padding:0 10px;font-size:11px}
.cr-scale{display:flex;gap:6px;margin-bottom:14px}
.cr-scaleBtn{padding:5px 11px;border:2px solid var(--cr-line);border-radius:2px;background:transparent;color:var(--cr-line);
  font:inherit;font-size:11.5px;font-weight:700;cursor:pointer}
.cr-scaleBtn[aria-pressed="true"]{background:var(--cr-lime);color:#111111;box-shadow:2px 2px 0 var(--cr-line)}
.cr-scaleBtn:focus-visible{outline:3px solid var(--cr-focus);outline-offset:2px}
.cr-recordsStats{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.cr-recordsStat{border:2px solid var(--cr-line);border-radius:3px;padding:10px 12px}
.cr-recordsStat--action{cursor:pointer;font:inherit;color:inherit;text-align:left;background:var(--cr-paper)}
.cr-recordsStat--action:hover{background:var(--cr-lime);color:#111111}
.cr-recordsStat--action:focus-visible{outline:3px solid var(--cr-focus);outline-offset:2px}
.cr-dialogText{margin:0 0 14px;font-size:12.5px;line-height:1.65}
.cr-accountResult{margin-bottom:14px;padding:9px 11px;border:2px dashed var(--cr-line);border-radius:2px;font-size:12px;line-height:1.5}
.cr-recordsValue{font-size:22px;font-weight:800;letter-spacing:-.03em;line-height:1.1;font-variant-numeric:tabular-nums}
.cr-recordsValue--wide{font-size:15px;letter-spacing:-.01em;white-space:nowrap}
.cr-recordsLabel{margin-top:4px;font-size:9.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;opacity:.62}
.cr-recordsHint{margin-top:3px;font-size:9.5px;opacity:.55}
.cr-recordsNote{margin:14px 0 0;font-size:10.5px;line-height:1.55;opacity:.6}
.cr-recordsClose{width:26px;height:26px;display:grid;place-items:center;border:2px solid var(--cr-line);border-radius:2px;
  background:transparent;color:var(--cr-line);font:inherit;font-size:14px;line-height:1;cursor:pointer;padding:0}
.cr-recordsClose:hover{background:var(--cr-magenta);color:#ffffff}
/* modal — rendered at the panel root, or portaled to <body>; it carries its own
   tokens so it stays themed either way */
.cr-scrim{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;padding:24px;background:rgba(8,6,12,.66);
  --cr-line:light-dark(#111111,#f7f2e7);
  --cr-paper:light-dark(#f4efe6,#17131d);
  --cr-shadow:light-dark(#111111,#050408);
  --cr-focus:light-dark(#0a5bd3,#c8ff00);
  --cr-lime:#c8ff00;
  --cr-magenta:#ff2e9a}
.cr-dialog{box-sizing:border-box;width:min(420px,100%);max-height:min(84vh,560px);overflow:auto;
  border:2px solid var(--cr-line);border-radius:4px;background:var(--cr-paper);color:var(--cr-line);
  box-shadow:12px 12px 0 var(--cr-shadow);padding:20px}
.cr-dialog:focus-visible{outline:3px solid var(--cr-focus);outline-offset:3px}
.cr-dialogHead{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:14px}
.cr-dialogHead h2{margin:0;font-size:16px;font-weight:800;letter-spacing:-.01em;line-height:1.3}
.cr-close{width:26px;height:26px;display:grid;place-items:center;flex:0 0 auto;border:2px solid var(--cr-line);
  border-radius:2px;background:transparent;color:var(--cr-line);font:inherit;font-size:15px;line-height:1;cursor:pointer;padding:0}
.cr-close:hover{background:var(--cr-line);color:var(--cr-paper)}
.cr-close:focus-visible{outline:3px solid var(--cr-focus);outline-offset:2px}
.cr-formField{display:block;margin-bottom:14px}
.cr-formField:last-of-type{margin-bottom:0}
.cr-fieldHint{display:block;margin-top:6px;font-size:10.5px;line-height:1.5;opacity:.6}
.cr-dialogActions{display:flex;justify-content:flex-end;gap:10px;margin-top:18px;flex-wrap:wrap}
.cr-input{box-sizing:border-box;width:100%;height:40px;padding:0 11px;border:2px solid var(--cr-line);border-radius:2px;
  background:var(--cr-paper);color:var(--cr-line);font:inherit;font-size:14px;font-weight:600}
.cr-input:focus{outline:3px solid var(--cr-lime);outline-offset:1px}
.cr-input:disabled{opacity:.6}
.cr-formError{margin-top:10px;padding:8px 10px;border:2px solid var(--cr-magenta);border-radius:2px;
  color:var(--cr-line);font-size:12px;line-height:1.5;background:color-mix(in srgb,var(--cr-magenta) 14%,transparent)}
.cr-btn:disabled{opacity:.5;cursor:progress}
/* empty + a11y */
.cr-empty{display:flex;flex-direction:column;align-items:center;gap:12px;max-width:340px;margin:auto;text-align:center}
.cr-emptyIcon{display:grid;place-items:center;width:52px;height:52px;border-radius:2px;
  color:#ffffff;background:var(--cr-magenta);border:2px solid var(--cr-line);box-shadow:5px 5px 0 var(--cr-shadow)}
.cr-emptyTitle{font-size:13.5px;font-weight:800;letter-spacing:-.01em}
.cr-emptyHint{font-size:12px;line-height:1.6;color:var(--dsw-alias-label-secondary)}
.cr-srOnly{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0}
.cr-toast{position:fixed;left:50%;bottom:26px;transform:translateX(-50%);z-index:90;padding:10px 16px;
  border:2px solid var(--cr-line);border-radius:2px;background:var(--cr-lime);color:#111111;font-size:12.5px;
  font-weight:700;box-shadow:5px 5px 0 var(--cr-shadow);pointer-events:none}
/* sidebar row */
.cr-sideEntry{display:flex;align-items:center;gap:8px;width:100%;height:32px;padding:0 8px;border-radius:8px;border:1px solid transparent;background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:13px;cursor:pointer;text-align:left}
.cr-sideEntry:hover{background:color-mix(in srgb,var(--dsw-alias-label-primary) 8%,transparent)}
.cr-sideEntry[data-active="true"]{background:color-mix(in srgb,var(--dsw-alias-label-primary) 10%,transparent)}
.cr-sideEntry:focus-visible{outline:2px solid light-dark(#0a5bd3,#8fd0ff);outline-offset:1px}
.cr-sideEntry[data-rail="true"]{justify-content:center;padding:0}
.cr-sideIcon{display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;width:16px;height:16px;color:#c8ff00}
.cr-sideLabel{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
@keyframes cr-pulse{
  0%,100%{transform:translate(0,0);box-shadow:9px 9px 0 var(--cr-shadow)}
  50%{transform:translate(-4px,-4px);box-shadow:15px 15px 0 var(--cr-shadow)}}

/* motion: short, overshooting, never blurred — the hard shadow carries the weight */
@keyframes cr-viewIn{from{opacity:0;transform:translateY(14px) scale(.988)}
  to{opacity:1;transform:none}}
@keyframes cr-gridIn{from{opacity:0;transform:translateY(10px) scale(.994)}
  to{opacity:1;transform:none}}
@keyframes cr-panelIn{from{opacity:0;transform:translateY(12px) scale(.992)}
  to{opacity:1;transform:none}}
@keyframes cr-tabOn{from{transform:scale(.9)}to{transform:scale(1)}}
@keyframes cr-drawerIn{from{opacity:0;transform:translate(-8px,16px) scale(.97)}
  to{opacity:1;transform:none}}
@keyframes cr-drawerOut{to{opacity:0;transform:translate(-4px,10px) scale(.985)}}
@keyframes cr-dialogIn{from{opacity:0;transform:translateY(12px) scale(.965)}
  to{opacity:1;transform:none}}
@keyframes cr-dialogOut{to{opacity:0;transform:translateY(8px) scale(.98)}}
@keyframes cr-scrimIn{from{opacity:0}to{opacity:1}}
@keyframes cr-scrimOut{to{opacity:0}}
@keyframes cr-grow{from{height:0}to{height:var(--h,0%)}}
@keyframes cr-tick{from{transform:scale(.72)}to{transform:scale(1)}}
@keyframes cr-toastIn{from{opacity:0;transform:translate(-50%,12px) scale(.96)}
  to{opacity:1;transform:translate(-50%,0) scale(1)}}
@keyframes cr-menuIn{from{opacity:0;transform:translateY(-4px) scale(.97)}to{opacity:1;transform:none}}

.cr-detail{animation:cr-viewIn .22s cubic-bezier(.18,1.32,.42,1) both}
.cr-grid{animation:cr-gridIn .2s cubic-bezier(.18,1.32,.42,1) both}
.cr-panel{animation:cr-panelIn .2s cubic-bezier(.18,1.32,.42,1) both}
.cr-tab{transition:background-color .16s ease,color .14s ease,box-shadow .16s ease,transform .16s ease}
.cr-tab[aria-selected="true"]{animation:cr-tabOn .22s cubic-bezier(.2,1.45,.4,1)}
.cr-records{animation:cr-drawerIn .22s cubic-bezier(.18,1.32,.42,1) both}
.cr-records[data-closing="true"]{animation:cr-drawerOut .13s ease-in both}
.cr-recordsBtn{transition:transform .16s ease,background-color .16s ease}
.cr-recordsBtn:active{transform:translate(2px,2px)}
.cr-scrim{animation:cr-scrimIn .14s ease-out both}
.cr-scrim[data-closing="true"]{animation:cr-scrimOut .13s ease-in both}
.cr-dialog{animation:cr-dialogIn .22s cubic-bezier(.18,1.32,.42,1) both}
.cr-scrim[data-closing="true"] .cr-dialog{animation:cr-dialogOut .13s ease-in both}
.cr-chartUp,.cr-chartDown{height:var(--h,0%);animation:cr-grow .46s cubic-bezier(.16,1.42,.36,1) both;
  animation-delay:calc(var(--i,0) * 45ms)}
.cr-chartDown{animation-delay:calc(var(--i,0) * 45ms + 70ms)}
.cr-taskRow[data-done="true"] .cr-taskCheck{animation:cr-tick .2s cubic-bezier(.2,1.5,.4,1)}
.cr-toast{animation:cr-toastIn .18s cubic-bezier(.2,1.4,.4,1) both}
@media (max-width:640px){
  .cr-scroll{padding:22px 18px 92px}
  .cr-top{flex-direction:column;gap:14px}
  .cr-grid{grid-template-columns:repeat(var(--cr-cols,3),minmax(0,1fr))}
  .cr-card{width:100%}
  .cr-detailActions{margin-left:0;width:100%}
  .cr-clock{padding:8px 10px;gap:10px}
  .cr-recordsBtn,.cr-records{left:12px;bottom:12px}
  .cr-records{width:calc(100% - 24px)}
}
@media (prefers-reduced-motion: reduce){
  .cr-card,.cr-card[data-state="running"],.cr-card[data-state="waiting"]{animation:none}
  .cr-card:hover,.cr-focusItem:hover{transform:none}
  .cr-detail,.cr-grid,.cr-panel,.cr-records,.cr-records[data-closing="true"],
  .cr-scrim,.cr-scrim[data-closing="true"],.cr-dialog,.cr-scrim[data-closing="true"] .cr-dialog,
  .cr-chartUp,.cr-chartDown,.cr-toast,.cr-tab[aria-selected="true"],
  .cr-taskRow[data-done="true"] .cr-taskCheck{animation:none}
  .cr-tab,.cr-recordsBtn{transition:none}
  .cr-scrollInner[data-spring="true"]{transition:none}
  .cr-scrollbar{transition:none}}
`

    function Styles() {
      return h('style', { 'data-control-room-style': '' }, CSS)
    }

    function Icon({ size }) {
      const edge = size || 16
      return h('svg', {
        width: edge, height: edge, viewBox: '0 0 16 16', fill: 'none',
        stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round',
        'aria-hidden': 'true',
      },
        h('rect', { x: 1.8, y: 1.8, width: 5.2, height: 5.2, rx: 1.4 }),
        h('rect', { x: 9, y: 1.8, width: 5.2, height: 5.2, rx: 1.4, opacity: 0.55 }),
        h('rect', { x: 1.8, y: 9, width: 5.2, height: 5.2, rx: 1.4, opacity: 0.55 }),
        h('rect', { x: 9, y: 9, width: 5.2, height: 5.2, rx: 1.4 }),
      )
    }

    function ProjectMark({ size }) {
      const edge = size || 20
      return h('svg', {
        width: edge, height: edge, viewBox: '0 0 24 24', fill: 'none',
        stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round',
        'aria-hidden': 'true',
      },
        h('rect', { x: 3.4, y: 3.4, width: 7.5, height: 7.5, rx: 2.2 }),
        h('rect', { x: 13.1, y: 3.4, width: 7.5, height: 7.5, rx: 2.2, opacity: 0.62 }),
        h('rect', { x: 3.4, y: 13.1, width: 7.5, height: 7.5, rx: 2.2, opacity: 0.62 }),
        h('rect', { x: 13.1, y: 13.1, width: 7.5, height: 7.5, rx: 2.2 }),
      )
    }

    const pad2 = (value) => String(value).padStart(2, '0')

    function timeAgo(iso, t) {
      const then = Date.parse(iso)
      if (!Number.isFinite(then)) return ''
      const diff = Date.now() - then
      const minutes = Math.floor(diff / 60000)
      if (minutes < 1) return t('timeNow')
      if (minutes < 60) return String(minutes) + t('timeMin')
      const hours = Math.floor(minutes / 60)
      if (hours < 24) return String(hours) + t('timeHour')
      const days = Math.floor(hours / 24)
      if (days < 30) return String(days) + t('timeDay')
      return new Date(then).toLocaleDateString()
    }

    function formatDuration(ms) {
      const total = Math.max(0, Math.floor(ms / 1000))
      const hours = Math.floor(total / 3600)
      const minutes = Math.floor((total % 3600) / 60)
      const seconds = total % 60
      return hours > 0 ? String(hours) + ':' + pad2(minutes) + ':' + pad2(seconds) : pad2(minutes) + ':' + pad2(seconds)
    }

    function dayDelta(ddl) {
      if (typeof ddl !== 'string') return null
      const parts = ddl.split('-').map(Number)
      if (parts.length !== 3 || parts.some((part) => !Number.isFinite(part))) return null
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
      const target = new Date(parts[0], parts[1] - 1, parts[2]).getTime()
      if (!Number.isFinite(target)) return null
      return Math.round((target - today) / 86400000)
    }

    function dueLabel(ddl, t) {
      const days = dayDelta(ddl)
      if (days === null) return ''
      if (days < 0) return t('overdue')
      if (days === 0) return t('dueToday')
      if (days === 1) return t('dueTomorrow')
      return t('dueIn').replace('{n}', String(days))
    }

    function readJson(key, fallback) {
      try {
        const raw = window.localStorage.getItem(key)
        if (!raw) return fallback
        const parsed = JSON.parse(raw)
        return parsed && typeof parsed === 'object' ? parsed : fallback
      } catch (_error) {
        return fallback
      }
    }

    function writeJson(key, value) {
      try {
        window.localStorage.setItem(key, JSON.stringify(value))
      } catch (_error) {}
    }

    function readFlag(key) {
      try {
        return window.localStorage.getItem(key) === '1'
      } catch (_error) {
        return false
      }
    }

    function writeFlag(key) {
      try {
        window.localStorage.setItem(key, '1')
      } catch (_error) {}
    }

    function copyText(text) {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text)
          return true
        }
      } catch (_error) {}
      try {
        const area = document.createElement('textarea')
        area.value = text
        area.setAttribute('readonly', '')
        area.style.position = 'fixed'
        area.style.opacity = '0'
        document.body.appendChild(area)
        area.select()
        document.execCommand('copy')
        document.body.removeChild(area)
        return true
      } catch (_error) {
        return false
      }
    }

    function downloadMarkdown(name, text) {
      try {
        const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const anchor = document.createElement('a')
        anchor.href = url
        anchor.download = name
        document.body.appendChild(anchor)
        anchor.click()
        document.body.removeChild(anchor)
        window.setTimeout(() => { URL.revokeObjectURL(url) }, 1000)
        return true
      } catch (_error) {
        return false
      }
    }

    const EMPTY_STATUSES = new Map()
    const noSessionStatus = (selector) => selector(EMPTY_STATUSES)

    // Render the account dialog outside the panel when react-dom is reachable,
    // so it is a real modal instead of a box inside the canvas.
    let createPortal = null
    try {
      const reactDom = require('react-dom')
      if (reactDom && typeof reactDom.createPortal === 'function') createPortal = reactDom.createPortal
    } catch (_error) {
      createPortal = null
    }

    function readSessionFlags(id, statuses, byId) {
      const entry = statuses && typeof statuses.get === 'function' ? statuses.get(id) : null
      const kind = entry && entry.pendingInteraction ? entry.pendingInteraction.kind : null
      const running = Boolean((entry && entry.running) || (byId[id] && byId[id].running))
      return { kind: WAITING[kind] ? kind : null, running }
    }

    function sessionLabel(session, t) {
      const title = session && typeof session.title === 'string' ? session.title.trim() : ''
      return title || t('untitled')
    }

    /** Host session usage, when the store exposes it. Returns null rather than guessing. */
    function usageOf(session) {
      if (!session) return null
      const usage = session.usage
      if (usage && typeof usage.totalTokens === 'number') return usage.totalTokens
      if (typeof session.totalTokens === 'number') return session.totalTokens
      return null
    }

    function periodStart(days, now) {
      const date = new Date(now)
      date.setHours(0, 0, 0, 0)
      return date.getTime() - (days - 1) * 86400000
    }

    // Peak windows are ranked by net tokens (input + output). Ranking by the
    // cached total would just report whichever hour happened to reuse context.
    function bestThreeHours(perHour) {
      if (!Array.isArray(perHour)) return null
      const sums = new Array(24).fill(0)
      for (const row of perHour) {
        const hour = Number(row && row.hour)
        if (Number.isInteger(hour) && hour >= 0 && hour < 24) sums[hour] += Number(row.net) || 0
      }
      let bestStart = -1
      let bestSum = 0
      for (let start = 0; start <= 21; start += 1) {
        const sum = sums[start] + sums[start + 1] + sums[start + 2]
        if (sum > bestSum) {
          bestSum = sum
          bestStart = start
        }
      }
      if (bestStart < 0) return null
      return { text: pad2(bestStart) + ':00—' + pad2(bestStart + 3) + ':00', hint: 'peakHintHours', value: bestSum }
    }

    function bestDay(perDay) {
      if (!Array.isArray(perDay)) return null
      let best = null
      for (const row of perDay) {
        const net = Number(row && row.net) || 0
        const day = String((row && row.day) || '')
        if (net <= 0 || day.length < 10) continue
        if (best === null || net > best.net) best = { day, net }
      }
      if (best === null) return null
      return { text: best.day.slice(5), hint: 'peakHintDay', value: best.net }
    }

    function bestWeek(perWeek) {
      if (!Array.isArray(perWeek)) return null
      let best = null
      for (const row of perWeek) {
        const net = Number(row && row.net) || 0
        const start = String((row && row.start) || '')
        const end = String((row && row.end) || '')
        if (net <= 0 || start.length < 10 || end.length < 10) continue
        if (best === null || net > best.net) best = { start, end, net }
      }
      if (best === null) return null
      return { text: best.start.slice(5) + '—' + best.end.slice(5), hint: 'peakHintWeek', value: best.net }
    }

    /** Best token window for the active scale, or null when the data is absent. */
    function peakOf(scale, usage) {
      if (!usage) return null
      if (scale === 'day') return bestThreeHours(usage.perHour)
      if (scale === 'week') return bestDay(usage.perDay)
      return bestWeek(usage.perWeek)
    }

    function buildReport(t, scale, summary, now, peak) {
      const preset = SCALES.find((item) => item.id === scale) || SCALES[2]
      const lines = []
      lines.push('# ' + t('records') + ' · ' + t(preset.report))
      lines.push('')
      lines.push('- ' + t('reportRange') + ': ' + new Date(summary.start).toLocaleDateString() + ' → ' + new Date(now).toLocaleDateString())
      lines.push('- ' + t('reportDelivered') + ': ' + String(summary.delivered.length))
      lines.push('- ' + t('reportSessions') + ': ' + String(summary.sessionCount))
      lines.push('- ' + t('reportTokens') + ': ' + (summary.tokenKnown ? String(summary.tokens) : '—'))
      if (peak) lines.push('- ' + t('reportPeak') + ': ' + peak.text)
      if (summary.delivered.length > 0) {
        lines.push('')
        lines.push('## ' + t('reportDoneSection'))
        for (const item of summary.delivered) {
          lines.push('- ' + item.title + ' · ' + new Date(item.at).toLocaleDateString())
        }
      }
      return lines.join('\n')
    }

    /** Compact token counts: 5.6M reads better than 5615952 in a small tile. */
    function compact(value) {
      if (typeof value !== 'number' || !Number.isFinite(value)) return '—'
      if (value >= 1e9) return (value / 1e9).toFixed(1) + 'B'
      if (value >= 1e6) return (value / 1e6).toFixed(1) + 'M'
      if (value >= 1e3) return (value / 1e3).toFixed(1) + 'k'
      return String(value)
    }

    /** Chart tooltips always carry the M unit, with two decimals. */
    function formatM(value) {
      return ((Number(value) || 0) / 1e6).toFixed(2) + 'M'
    }

    /** Local calendar key, matching the Host's perDay bucket keys. */
    function localDayKey(date) {
      return date.getFullYear() + '-' + pad2(date.getMonth() + 1) + '-' + pad2(date.getDate())
    }

    /** Pull wallet rows out of whatever shape the account call returns. */
    function formatWallets(value) {
      const rows = []
      const push = (list) => {
        if (!Array.isArray(list)) return
        for (const item of list) {
          if (!item || typeof item.currency !== 'string') continue
          const amount = typeof item.balance === 'number' ? String(item.balance)
            : typeof item.balance === 'string' ? item.balance : null
          if (amount !== null) rows.push(item.currency + ' ' + amount)
        }
      }
      if (value && typeof value === 'object') {
        push(value.value)
        push(value.wallets)
        push(value.bonusWallets)
      }
      push(value)
      return rows
    }

    function describeUsage(value, t) {
      if (!value || value.ok !== true) return t('tokenUnsupported')
      const rows = formatWallets(value.balance)
      return rows.length > 0 ? t('tokenBalance') + ' ' + rows.join(' · ') : t('tokenBalanceRead')
    }

    function ProjectCard(props) {
      const { workspace, t, now, state, kind, runningStart, meta, muted, onOpen, onContextMenu } = props
      const running = state === 'running'
      const waiting = state === 'waiting'
      const stageKey = meta && meta.stage ? (STAGES.find((item) => item.id === meta.stage) || {}).key : null
      const stageMeta = meta && meta.stage ? STAGE_META[meta.stage] : null
      const due = meta && meta.ddl ? dueLabel(meta.ddl, t) : null
      const flag = meta && meta.archived ? t('archived') : meta && meta.hidden ? t('hidden') : null

      let statusText
      if (waiting) statusText = t(WAITING[kind] || 'waiting')
      else if (running) statusText = t('running') + ' · ' + formatDuration(now - runningStart)
      else statusText = timeAgo(workspace.updatedAt, t)

      return h('button', {
        type: 'button',
        className: 'cr-card',
        'data-state': state,
        'data-stage': stageKey ? meta.stage : 'none',
        'data-muted': muted && flag ? 'true' : 'false',
        style: stageMeta ? { '--cr-stage': stageMeta.color, '--cr-stage-ink': stageMeta.ink } : undefined,
        title: workspace.title + ' — ' + t('open'),
        'aria-label': workspace.title + ' · ' + statusText + ' · ' + t('open'),
        onClick: onOpen,
        onContextMenu: onContextMenu,
      },
        flag ? h('span', { className: 'cr-flag' }, flag) : null,
        h('span', { className: 'cr-mark', 'aria-hidden': 'true' }, h(ProjectMark, { size: 20 })),
        h('span', { className: 'cr-name' }, workspace.title),
        h('span', { className: 'cr-state cr-state--' + state },
          waiting ? h('span', { className: 'cr-dot cr-dot--waiting', 'aria-hidden': 'true' })
            : running ? h('span', { className: 'cr-dot cr-dot--running', 'aria-hidden': 'true' })
              : null,
          statusText,
        ),
        h('span', { className: 'cr-meta' },
          h('span', {
            className: 'cr-stageTag',
            'data-unset': stageKey ? 'false' : 'true',
          }, stageKey ? t(stageKey) : t('stageNone')),
          due ? h('em', { className: 'cr-due' }, due) : null,
        ),
      )
    }

    function DetailView(props) {
      const { workspace, state, kind, meta, sessions, t, sessionNotes, initialTab } = props
      const [tab, setTab] = useState(initialTab || 'overview')
      const [taskDraft, setTaskDraft] = useState('')
      const [noteEditing, setNoteEditing] = useState(null)
      const [weekTokens, setWeekTokens] = useState(null)

      const projectMeta = meta || {}
      const tasks = Array.isArray(projectMeta.tasks) ? projectMeta.tasks : []
      const doneCount = tasks.filter((task) => task.done).length
      const days = projectMeta.ddl ? dayDelta(projectMeta.ddl) : null
      const notes = sessionNotes || {}

      const addTask = () => {
        const text = taskDraft.trim()
        if (!text) return
        const id = String(Date.now()) + '-' + String(tasks.length)
        props.update({ tasks: tasks.concat([{ id, text, done: false }]) })
        setTaskDraft('')
      }

      // "This week" is the local calendar week, Monday 00:00 onward.
      const weekStartMs = useMemo(() => {
        const midnight = new Date()
        midnight.setHours(0, 0, 0, 0)
        return midnight.getTime() - ((midnight.getDay() + 6) % 7) * 86400000
      }, [])

      const sessionIdsKey = sessions.map((session) => session.id).filter(Boolean).join(',')

      useEffect(() => {
        if (typeof fetch !== 'function') return undefined
        let cancelled = false
        const query = 'since=' + String(weekStartMs)
          + (sessionIdsKey === '' ? '&scale=week' : '&sessions=' + encodeURIComponent(sessionIdsKey))
        fetch('/api/control-room-usage?' + query, { credentials: 'same-origin' })
          .then((response) => (response && response.ok === true ? response.json() : null))
          .then((body) => {
            if (cancelled) return
            const map = {}
            if (body && body.ok === true && body.usage && Array.isArray(body.usage.perDay)) {
              for (const row of body.usage.perDay) map[row.day] = Number(row.net) || 0
            }
            setWeekTokens(map)
          })
          .catch(() => { if (!cancelled) setWeekTokens({}) })
        return () => { cancelled = true }
      }, [weekStartMs, sessionIdsKey])

      const activity = useMemo(() => {
        const rows = []
        for (let offset = 0; offset < 7; offset += 1) {
          const day = new Date(weekStartMs + offset * 86400000)
          const key = localDayKey(day)
          let doneTasks = 0
          for (const task of tasks) {
            if (!task.done || !task.doneAt) continue
            const at = Date.parse(task.doneAt)
            if (Number.isFinite(at) && localDayKey(new Date(at)) === key) doneTasks += 1
          }
          rows.push({
            key,
            label: day.getDate(),
            weekday: t(WEEKDAY_KEYS[(day.getDay() + 6) % 7]),
            tokens: weekTokens ? (weekTokens[key] || 0) : 0,
            doneTasks,
          })
        }
        return rows
      }, [weekStartMs, weekTokens, tasks, t])

      const maxTokens = Math.max(1, ...activity.map((row) => row.tokens))
      const maxTasks = Math.max(1, ...activity.map((row) => row.doneTasks))
      const latest = sessions[0] || null

      const overview = h('div', { key: 'overview', className: 'cr-panel' },
        h('h3', { className: 'cr-panelTitle' }, t('tabOverview')),
        h('div', { className: 'cr-field' },
          h('span', { className: 'cr-fieldLabel' }, t('stageLabel')),
          h('div', { className: 'cr-chips' },
            STAGES.map((stage, index) => h('button', {
              key: stage.id,
              type: 'button',
              className: 'cr-chip',
              autoFocus: index === 0,
              'data-on': projectMeta.stage === stage.id ? 'true' : 'false',
              'aria-pressed': projectMeta.stage === stage.id ? 'true' : 'false',
              onClick: () => {
                const next = projectMeta.stage === stage.id ? '' : stage.id
                props.update({ stage: next, doneAt: next === 'done' ? new Date().toISOString() : '' })
              },
            }, t(stage.key))),
          ),
        ),
        h('label', { className: 'cr-field' },
          h('span', { className: 'cr-fieldLabel' }, t('ddlLabel')),
          h('input', {
            type: 'date',
            className: 'cr-input',
            value: projectMeta.ddl || '',
            onChange: (event) => { props.update({ ddl: event.currentTarget.value }) },
          }),
        ),
        h('label', { className: 'cr-field' },
          h('span', { className: 'cr-fieldLabel' }, t('nextLabel')),
          h('input', {
            type: 'text',
            className: 'cr-input',
            placeholder: t('nextPlaceholder'),
            value: projectMeta.next || '',
            onChange: (event) => { props.update({ next: event.currentTarget.value }) },
          }),
        ),
      )

      const board = h('div', { key: 'board', className: 'cr-panel' },
        h('h3', { className: 'cr-panelTitle' }, t('tabBoard')),
        h('div', { className: 'cr-statRow' },
          h('div', { className: 'cr-stat' },
            h('div', { className: 'cr-statValue' }, String(sessions.length)),
            h('div', { className: 'cr-statLabel' }, t('statSessions')),
          ),
          h('div', { className: 'cr-stat' },
            h('div', { className: 'cr-statValue' }, String(doneCount) + '/' + String(tasks.length)),
            h('div', { className: 'cr-statLabel' }, t('statTasks')),
          ),
          h('div', { className: 'cr-stat' },
            h('div', { className: 'cr-statValue' }, days === null ? t('noValue') : String(days)),
            h('div', { className: 'cr-statLabel' }, t('statDue')),
          ),
          h('div', { className: 'cr-stat' },
            h('div', { className: 'cr-statValue', style: { fontSize: '15px' } }, latest ? timeAgo(latest.updatedAt, t) : t('noValue')),
            h('div', { className: 'cr-statLabel' }, t('statActive')),
          ),
        ),
        h('h3', { className: 'cr-panelTitle' }, t('activityTitle')),
        h('div', { className: 'cr-legends' },
          h('span', { className: 'cr-legend' }, h('i', { className: 'cr-legendSwatch cr-legendSwatch--up', 'aria-hidden': 'true' }), t('legendTokens')),
          h('span', { className: 'cr-legend' }, h('i', { className: 'cr-legendSwatch cr-legendSwatch--down', 'aria-hidden': 'true' }), t('legendTasks')),
        ),
        h('div', { className: 'cr-chart', role: 'img', 'aria-label': t('activityAria') },
          h('span', { className: 'cr-chartBase', 'aria-hidden': 'true' }),
          activity.map((day, index) => {
            const tip = t('chartTipTokens') + ' ' + formatM(day.tokens)
              + ' · ' + t('chartTipTasks') + ' ' + String(day.doneTasks) + t('unitTask')
            return h('div', {
              key: day.key,
              className: 'cr-chartCol',
              tabIndex: 0,
              style: { '--i': String(index) },
              'aria-label': day.weekday + ' · ' + tip,
              'data-idle': day.tokens === 0 && day.doneTasks === 0 ? 'true' : 'false',
            },
              h('span', { className: 'cr-chartTrack', 'aria-hidden': 'true' }),
              h('span', {
                className: 'cr-chartUp',
                'aria-hidden': 'true',
                style: { '--h': String(Math.round((day.tokens / maxTokens) * 46)) + '%' },
              }),
              h('span', {
                className: 'cr-chartDown',
                'aria-hidden': 'true',
                style: { '--h': String(Math.round((day.doneTasks / maxTasks) * 46)) + '%' },
              }),
              h('span', { className: 'cr-chartTip' }, tip),
              h('span', { className: 'cr-chartLabel' }, day.weekday + ' ' + String(day.label)),
            )
          }),
        ),
        h('div', { className: 'cr-progress', 'aria-hidden': 'true' },
          h('div', { className: 'cr-progressFill', style: { width: tasks.length === 0 ? '0%' : String(Math.round((doneCount / tasks.length) * 100)) + '%' } }),
        ),
      )

      const taskPanel = h('div', { key: 'tasks', className: 'cr-panel' },
        h('h3', { className: 'cr-panelTitle' }, t('tasksTitle')),
        h('div', { className: 'cr-taskForm' },
          h('input', {
            type: 'text',
            className: 'cr-input',
            placeholder: t('taskPlaceholder'),
            value: taskDraft,
            'aria-label': t('taskPlaceholder'),
            onChange: (event) => { setTaskDraft(event.currentTarget.value) },
            onKeyDown: (event) => { if (event.key === 'Enter') addTask() },
          }),
          h('button', { type: 'button', className: 'cr-btn cr-btn--primary', onClick: addTask }, t('taskAdd')),
        ),
        tasks.length === 0
          ? h('div', { className: 'cr-emptyInline' }, t('tasksEmpty'))
          : h('ul', { className: 'cr-taskList' },
            tasks.map((task) => h('li', {
              key: task.id,
              className: 'cr-taskRow',
              'data-done': task.done ? 'true' : 'false',
            },
              h('button', {
                type: 'button',
                className: 'cr-taskCheck',
                'aria-pressed': task.done ? 'true' : 'false',
                'aria-label': task.text,
                onClick: () => { props.update({ tasks: tasks.map((item) => (item.id === task.id
                  ? { id: item.id, text: item.text, done: !item.done, doneAt: !item.done ? new Date().toISOString() : '' }
                  : item)) }) },
              }, task.done ? '✓' : ''),
              h('span', { className: 'cr-taskText' }, task.text),
              h('button', {
                type: 'button',
                className: 'cr-taskDel',
                'aria-label': t('taskRemove') + ' · ' + task.text,
                onClick: () => { props.update({ tasks: tasks.filter((item) => item.id !== task.id) }) },
              }, '×'),
            )),
          ),
      )

      const sessionPanel = h('div', { key: 'sessions', className: 'cr-panel' },
        h('h3', { className: 'cr-panelTitle' }, t('sessionsTitle')),
        sessions.length === 0
          ? h('div', { className: 'cr-emptyInline' }, t('sessionsEmpty'))
          : h('ul', { className: 'cr-sessionList' },
            sessions.map((session) => {
              const note = notes[session.id] || {}
              const editing = noteEditing === session.id
              return h('li', { key: session.id, className: 'cr-sessionItem' },
                h('div', { className: 'cr-sessionRow' },
                  h('button', {
                    type: 'button',
                    className: 'cr-star',
                    'aria-pressed': note.star ? 'true' : 'false',
                    'aria-label': t('star') + ' · ' + sessionLabel(session, t),
                    title: t('star'),
                    onClick: () => { props.onToggleStar(session.id) },
                  }, note.star ? '★' : '☆'),
                  h('button', {
                    type: 'button',
                    className: 'cr-sessionOpen',
                    onClick: () => { props.onOpenSession(session.id) },
                  },
                    h('span', { className: 'cr-sessionTitle' }, sessionLabel(session, t)),
                    h('span', { className: 'cr-sessionTime' }, session.updatedAt ? timeAgo(session.updatedAt, t) : ''),
                  ),
                  h('button', {
                    type: 'button',
                    className: 'cr-noteBtn',
                    'aria-label': t('note') + ' · ' + sessionLabel(session, t),
                    title: t('note'),
                    onClick: () => { setNoteEditing(editing ? null : session.id) },
                  }, '✎'),
                ),
                editing
                  ? h('input', {
                    type: 'text',
                    className: 'cr-input cr-noteInput',
                    placeholder: t('notePlaceholder'),
                    'aria-label': t('notePlaceholder'),
                    value: note.note || '',
                    onChange: (event) => { props.onSetNote(session.id, event.currentTarget.value) },
                  })
                  : null,
              )
            }),
          ),
      )

      const stateText = state === 'waiting' ? t(WAITING[kind] || 'waiting') : state === 'running' ? t('running') : ''
      const stageKey = projectMeta.stage ? (STAGES.find((item) => item.id === projectMeta.stage) || {}).key : null
      const stageMeta = projectMeta.stage ? STAGE_META[projectMeta.stage] : null

      return h('div', { className: 'cr-detail' },
        h('div', { className: 'cr-detailHead' },
          h('button', { type: 'button', className: 'cr-back', onClick: () => { props.onBack() } }, '← ' + t('back')),
          h('div', { className: 'cr-detailId' },
            h('span', { className: 'cr-mark', 'aria-hidden': 'true' }, h(ProjectMark, { size: 20 })),
            h('div', { style: { minWidth: 0 } },
              h('h2', { className: 'cr-detailName' }, workspace.title),
              h('div', { className: 'cr-detailSub' },
                h('span', {
                  className: 'cr-stageTag',
                  'data-unset': stageKey ? 'false' : 'true',
                  style: stageMeta ? { '--cr-stage': stageMeta.color, '--cr-stage-ink': stageMeta.ink } : undefined,
                }, stageKey ? t(stageKey) : t('stageNone')),
                projectMeta.ddl ? h('span', null, dueLabel(projectMeta.ddl, t)) : h('span', null, t('noDue')),
                stateText
                  ? h('span', { style: { display: 'inline-flex', alignItems: 'center', gap: '5px' } },
                    h('span', { className: 'cr-dot' + (state === 'waiting' ? ' cr-dot--waiting' : ' cr-dot--running'), 'aria-hidden': 'true' }),
                    stateText,
                  )
                  : null,
              ),
            ),
          ),
          h('div', { className: 'cr-detailActions' },
            h('button', { type: 'button', className: 'cr-btn cr-btn--primary', onClick: () => { props.onOpenChat() } }, t('enter')),
          ),
        ),
        h('div', { className: 'cr-tabs', role: 'tablist', 'aria-label': t('title') },
          TABS.map((entry) => h('button', {
            key: entry.id,
            type: 'button',
            className: 'cr-tab',
            role: 'tab',
            'aria-selected': tab === entry.id ? 'true' : 'false',
            onClick: () => { setTab(entry.id) },
          }, t(entry.key))),
        ),
        tab === 'overview' ? overview : null,
        tab === 'board' ? board : null,
        tab === 'tasks' ? taskPanel : null,
        tab === 'sessions' ? sessionPanel : null,
      )
    }

    function Clock(props) {
      const { now, t } = props
      const date = new Date(now)
      const time = pad2(date.getHours()) + ':' + pad2(date.getMinutes())
      const day = String(date.getFullYear()) + '.' + pad2(date.getMonth() + 1) + '.' + pad2(date.getDate())
      let weekday = ''
      try {
        weekday = date.toLocaleDateString(undefined, { weekday: 'long' })
      } catch (_error) {
        weekday = ''
      }
      return h('div', { className: 'cr-clock', 'aria-label': t('clockAria') + ' ' + time },
        h('div', { className: 'cr-clockTime' }, time),
        h('div', { className: 'cr-clockSide' },
          h('div', { className: 'cr-clockDate' }, day),
          h('div', { className: 'cr-clockWeek' }, weekday),
        ),
      )
    }

    function ControlRoomPage(props) {
      const t = props.t || ((key) => key)
      const snapshot = props.useWorkspaces((value) => value)
      const baseWorkspaces = (snapshot && snapshot.items) || []
      const useSessions = props.useSessions || ((selector) => selector(null))
      const sessionState = useSessions((value) => value)
      const useSessionStatus = props.useSessionStatus || noSessionStatus
      const statuses = useSessionStatus((value) => value)

      const [now, setNow] = useState(() => Date.now())
      const [meta, setMeta] = useState(() => readJson(META_KEY, {}))
      const [active, setActive] = useState(null)
      const [menu, setMenu] = useState(null)
      const [showArchived, setShowArchived] = useState(false)
      const [recordsOpen, setRecordsOpen] = useState(false)
      const [scale, setScale] = useState('month')
      const [tokenOpen, setTokenOpen] = useState(false)
      const [account, setAccount] = useState({ status: 'idle', text: '' })
      const [host, setHost] = useState(null)
      const [hostLoading, setHostLoading] = useState(false)
      const [toast, setToast] = useState(null)
      const [titles, setTitles] = useState({})
      const [renaming, setRenaming] = useState(null)
      const [canvasMenu, setCanvasMenu] = useState(null)
      const [creating, setCreating] = useState(null)
      const [createClosing, setCreateClosing] = useState(false)
      const [recordsClosing, setRecordsClosing] = useState(false)
      const [tokenClosing, setTokenClosing] = useState(false)
      const [renameClosing, setRenameClosing] = useState(false)
      const [onboarded, setOnboarded] = useState(() => readFlag(FLAG_KEY))
      const startsRef = useRef({})
      const scrollRef = useRef(null)
      const barTimerRef = useRef(null)
      const pullRef = useRef(0)
      const [scrollState, setScrollState] = useState({ top: 0, height: 0, view: 0 })
      const [barOn, setBarOn] = useState(false)
      const [pull, setPull] = useState(0)
      const [springOn, setSpringOn] = useState(false)

      // Overlays animate out for ~130ms before unmounting. Where no timer exists
      // (the verification harness), the close lands immediately.
      const afterMotion = (fn) => {
        try {
          window.setTimeout(fn, 130)
        } catch (_error) {
          fn()
        }
      }
      const closeRecords = () => {
        if (!recordsOpen || recordsClosing) return
        setRecordsClosing(true)
        afterMotion(() => { setRecordsOpen(false); setRecordsClosing(false) })
      }
      const closeToken = () => {
        if (!tokenOpen || tokenClosing) return
        setTokenClosing(true)
        afterMotion(() => { setTokenOpen(false); setTokenClosing(false) })
      }
      const closeRename = () => {
        if (!renaming || renameClosing) return
        setRenameClosing(true)
        afterMotion(() => { setRenaming(null); setRenameClosing(false) })
      }
      const closeCreate = () => {
        if (!creating || createClosing) return
        setCreateClosing(true)
        afterMotion(() => { setCreating(null); setCreateClosing(false) })
      }
      const openCreate = () => {
        setCanvasMenu(null)
        setCreating({ name: t('createDefaultName'), path: '', error: null, busy: false })
      }

      // Rubber band: the further you pull past an edge, the less it moves.
      const MAX_PULL = 56
      const damp = (raw) => {
        const size = Math.abs(raw)
        return (raw < 0 ? -1 : 1) * MAX_PULL * (1 - Math.exp(-size / (MAX_PULL * 1.5)))
      }

      useEffect(() => {
        const node = scrollRef.current
        if (!node) return undefined
        const sync = () => setScrollState({ top: node.scrollTop, height: node.scrollHeight, view: node.clientHeight })
        sync()

        const showBar = () => {
          setBarOn(true)
          if (barTimerRef.current) window.clearTimeout(barTimerRef.current)
          barTimerRef.current = window.setTimeout(() => { setBarOn(false) }, 900)
        }
        const settle = () => {
          if (pullRef.current === 0) return
          pullRef.current = 0
          setSpringOn(true)
          setPull(0)
          window.setTimeout(() => { setSpringOn(false) }, 320)
        }
        let springTimer = null
        const scheduleSettle = () => {
          if (springTimer) window.clearTimeout(springTimer)
          springTimer = window.setTimeout(settle, 140)
        }

        const onScroll = () => { sync(); showBar() }
        const onWheel = (event) => {
          showBar()
          const atTop = node.scrollTop <= 0
          const atBottom = node.scrollTop + node.clientHeight >= node.scrollHeight - 1
          if ((atTop && event.deltaY < 0) || (atBottom && event.deltaY > 0)) {
            if (typeof event.preventDefault === 'function') event.preventDefault()
            // Positive pull moves the content down: wheel up at the top stretches
            // downward, wheel down at the bottom stretches upward.
            pullRef.current = damp(pullRef.current - event.deltaY)
            setSpringOn(false)
            setPull(pullRef.current)
            scheduleSettle()
            return
          }
          if (pullRef.current !== 0) settle()
        }
        const onResize = () => { sync() }

        // Content height changes when a view or tab swaps without any scroll, so
        // observe both the viewport and the content wrapper.
        let observer = null
        if (typeof ResizeObserver === 'function') {
          observer = new ResizeObserver(() => { sync() })
          observer.observe(node)
          if (node.firstElementChild) observer.observe(node.firstElementChild)
        }

        node.addEventListener('scroll', onScroll, { passive: true })
        node.addEventListener('wheel', onWheel, { passive: false })
        window.addEventListener('resize', onResize)
        return () => {
          node.removeEventListener('scroll', onScroll)
          node.removeEventListener('wheel', onWheel)
          window.removeEventListener('resize', onResize)
          if (observer) observer.disconnect()
          if (barTimerRef.current) window.clearTimeout(barTimerRef.current)
          if (springTimer) window.clearTimeout(springTimer)
        }
      }, [])

      // A successful rename updates the host store, but the event may arrive a
      // beat later; the override makes the card flip immediately.
      const workspaces = useMemo(() => {
        if (Object.keys(titles).length === 0) return baseWorkspaces
        return baseWorkspaces.map((workspace) => {
          const next = titles[workspace.workspaceId]
          return next ? Object.assign({}, workspace, { title: next }) : workspace
        })
      }, [baseWorkspaces, titles])

      const byId = (sessionState && sessionState.byId) || {}
      const runningKey = Object.keys(byId).filter((id) => byId[id] && byId[id].running).sort().join('|')

      useEffect(() => {
        const timer = window.setInterval(() => { setNow(Date.now()) }, 1000)
        return () => { window.clearInterval(timer) }
      }, [])

      useEffect(() => {
        const next = {}
        const stamp = Date.now()
        const ids = runningKey === '' ? [] : runningKey.split('|')
        for (const id of ids) next[id] = startsRef.current[id] || stamp
        startsRef.current = next
      }, [runningKey])

      useEffect(() => {
        if (!toast) return undefined
        const timer = window.setTimeout(() => { setToast(null) }, 2400)
        return () => { window.clearTimeout(timer) }
      }, [toast])

      // Ask the Host half for real token counts; the browser cannot read session logs.
      const loadHostUsage = (scaleArg) => {
        const target = scaleArg || scale
        if (typeof fetch !== 'function') {
          setHost({ ok: false, error: 'fetch unavailable' })
          return
        }
        setHostLoading(true)
        fetch('/api/control-room-usage?scale=' + encodeURIComponent(target), { credentials: 'same-origin' })
          .then((response) => {
            if (!response || response.ok !== true) throw new Error('HTTP ' + (response ? String(response.status) : '?'))
            return response.json()
          })
          .then((body) => { setHost(body) })
          .catch((error) => { setHost({ ok: false, error: String((error && error.message) || error) }) })
          .then(() => { setHostLoading(false) })
      }

      useEffect(() => {
        // Load on mount so the token tile is already filled, and again when the
        // drawer or the scale changes.
        loadHostUsage()
        return undefined
      }, [recordsOpen, scale])

      const stateByWorkspace = useMemo(() => {
        const map = {}
        for (const workspace of workspaces) {
          let state = 'idle'
          let kind = null
          for (const id of workspace.sessionIds || []) {
            const flags = readSessionFlags(id, statuses, byId)
            if (flags.kind) { state = 'waiting'; kind = flags.kind; break }
            if (flags.running) state = 'running'
          }
          map[workspace.workspaceId] = { state, kind }
        }
        return map
      }, [workspaces, statuses, runningKey])

      const sessionsByWorkspace = useMemo(() => {
        const map = {}
        for (const workspace of workspaces) {
          const rows = (workspace.sessionIds || [])
            .map((id) => byId[id])
            .filter((session) => Boolean(session))
            .map((session) => ({
              id: session.id,
              title: session.title,
              updatedAt: session.updatedAt || workspace.updatedAt,
              running: session.running === true,
              usage: session.usage,
              totalTokens: session.totalTokens,
            }))
          rows.sort((left, right) => Date.parse(right.updatedAt) - Date.parse(left.updatedAt))
          map[workspace.workspaceId] = rows
        }
        return map
      }, [workspaces, runningKey, statuses])

      const visibleWorkspaces = useMemo(() => workspaces.filter((workspace) => {
        const projectMeta = meta[workspace.workspaceId] || {}
        if (showArchived) return true
        return !projectMeta.archived && !projectMeta.hidden
      }), [workspaces, meta, showArchived])

      const runningByWorkspace = useMemo(() => {
        const map = {}
        for (const workspace of workspaces) {
          const stamps = (workspace.sessionIds || [])
            .filter((id) => (statuses && typeof statuses.get === 'function' ? statuses.get(id) : null)?.running === true
              || (byId[id] && byId[id].running))
            .map((id) => startsRef.current[id] || now)
          if (stamps.length > 0) map[workspace.workspaceId] = Math.min.apply(null, stamps)
        }
        return map
      }, [workspaces, statuses, runningKey, now])

      const hiddenCount = workspaces.length - workspaces.filter((workspace) => {
        const projectMeta = meta[workspace.workspaceId] || {}
        return !projectMeta.archived && !projectMeta.hidden
      }).length

      const ordered = useMemo(() => {
        const weight = (workspace) => {
          const state = (stateByWorkspace[workspace.workspaceId] || {}).state
          return state === 'waiting' ? 0 : state === 'running' ? 1 : 2
        }
        return visibleWorkspaces.slice().sort((left, right) => {
          const byWeight = weight(left) - weight(right)
          if (byWeight !== 0) return byWeight
          return Date.parse(right.updatedAt) - Date.parse(left.updatedAt)
        })
      }, [visibleWorkspaces, stateByWorkspace])

      const focus = useMemo(() => {
        const rows = []
        for (const workspace of visibleWorkspaces) {
          const entry = stateByWorkspace[workspace.workspaceId] || { state: 'idle', kind: null }
          const projectMeta = meta[workspace.workspaceId] || {}
          const days = projectMeta.ddl ? dayDelta(projectMeta.ddl) : null
          let rank = 9
          let reason = ''
          let order = 0

          if (entry.state === 'waiting') {
            rank = 0
            reason = t(WAITING[entry.kind] || 'waiting')
          } else if (days !== null && days <= 1) {
            rank = 1
            reason = days < 0 ? t('overdue') : days === 0 ? t('dueToday') : t('dueTomorrow')
            order = days
          } else if (days !== null && days <= 7) {
            rank = 2
            reason = t('dueIn').replace('{n}', String(days))
            order = days
          } else if (entry.state === 'running') {
            rank = 3
            reason = t('running')
          } else {
            const at = Date.parse(workspace.updatedAt)
            const ago = Number.isFinite(at) ? Math.floor((Date.now() - at) / 86400000) : Infinity
            if (ago <= 7) {
              rank = 4
              reason = t('daysAgo').replace('{n}', String(Math.max(1, ago)))
              order = ago
            }
          }

          if (rank < 9) rows.push({ workspace, state: entry.state, reason, rank, order })
        }
        rows.sort((left, right) => left.rank - right.rank || left.order - right.order)
        return rows.slice(0, MAX_FOCUS)
      }, [visibleWorkspaces, stateByWorkspace, meta, t])

      const summary = useMemo(() => {
        const preset = SCALES.find((item) => item.id === scale) || SCALES[2]
        const start = periodStart(preset.days, Date.now())
        let tokens = 0
        let tokenKnown = false
        let sessionCount = 0

        for (const workspace of workspaces) {
          for (const session of sessionsByWorkspace[workspace.workspaceId] || []) {
            const at = Date.parse(session.updatedAt)
            if (!Number.isFinite(at) || at < start) continue
            sessionCount += 1
            const used = usageOf(session)
            if (used !== null) { tokens += used; tokenKnown = true }
          }
        }

        const delivered = []
        for (const workspace of workspaces) {
          const projectMeta = meta[workspace.workspaceId] || {}
          if (projectMeta.stage !== 'done' || !projectMeta.doneAt) continue
          const at = Date.parse(projectMeta.doneAt)
          if (Number.isFinite(at) && at >= start) delivered.push({ title: workspace.title, at: projectMeta.doneAt })
        }
        delivered.sort((left, right) => Date.parse(right.at) - Date.parse(left.at))

        return { start, tokens, tokenKnown, sessionCount, delivered }
      }, [workspaces, sessionsByWorkspace, meta, scale])

      const hostUsage = host && host.ok === true && host.usage ? host.usage : null
      const hostTokens = hostUsage && hostUsage.tokens ? hostUsage.tokens : null
      const hostBalance = host && host.ok === true && host.balance ? host.balance : null
      const hostFailed = host !== null && host.ok !== true
      // Null when the Host exposes no hourly/daily/weekly token breakdown, which
      // removes the peak tile instead of showing a placeholder.
      const peak = peakOf(scale, hostUsage)

      const updateMeta = (workspaceId, patch) => {
        const next = Object.assign({}, meta)
        const merged = Object.assign({}, next[workspaceId] || {}, patch)
        if (!merged.stage) delete merged.stage
        if (!merged.ddl) delete merged.ddl
        if (!merged.next) delete merged.next
        if (!merged.doneAt) delete merged.doneAt
        if (!merged.archived) delete merged.archived
        if (!merged.hidden) delete merged.hidden
        if (merged.sessionNotes && Object.keys(merged.sessionNotes).length === 0) delete merged.sessionNotes
        if (!Array.isArray(merged.tasks) || merged.tasks.length === 0) delete merged.tasks
        if (Object.keys(merged).length === 0) delete next[workspaceId]
        else next[workspaceId] = merged
        setMeta(next)
        writeJson(META_KEY, next)
      }

      const toggleSessionFlag = (workspaceId, sessionId, field, value) => {
        const projectMeta = meta[workspaceId] || {}
        const notes = Object.assign({}, projectMeta.sessionNotes || {})
        const current = Object.assign({ star: false, note: '' }, notes[sessionId] || {})
        current[field] = value
        if (!current.star && !current.note) delete notes[sessionId]
        else notes[sessionId] = current
        updateMeta(workspaceId, { sessionNotes: notes })
      }

      const openMenu = (workspaceId, event) => {
        if (event && typeof event.preventDefault === 'function') event.preventDefault()
        const x = event && Number.isFinite(event.clientX) ? event.clientX : 0
        const y = event && Number.isFinite(event.clientY) ? event.clientY : 0
        setMenu({ workspaceId, x: Math.min(x, Math.max(0, (window.innerWidth || 1024) - 210)), y: Math.min(y, Math.max(0, (window.innerHeight || 768) - 170)) })
      }

      const report = buildReport(t, scale, summary, now, peak)
      const reportName = 'control-room-' + scale + '-' + new Date(now).toISOString().slice(0, 10) + '.md'

      const clockNode = h(Clock, { now, t })

      const recordsButtonNode = h('button', {
        type: 'button',
        className: 'cr-recordsBtn',
        onClick: () => { if (recordsOpen) closeRecords(); else setRecordsOpen(true) },
      }, t('records'))

      const recordsNode = recordsOpen
        ? h('aside', { className: 'cr-records', 'data-closing': recordsClosing ? 'true' : 'false', 'aria-label': t('records') },
          h('div', { className: 'cr-recordsHead' },
            h('h2', null, t('records')),
            h('div', { className: 'cr-recordsActions' },
              h('button', {
                type: 'button',
                className: 'cr-btn',
                onClick: () => { setToast(copyText(report) ? t('copied') : t('copyFailed')) },
              }, t('exportCopy')),
              h('button', {
                type: 'button',
                className: 'cr-btn',
                onClick: () => { downloadMarkdown(reportName, report) },
              }, t('exportDownload')),
              h('button', {
                type: 'button',
                className: 'cr-recordsClose',
                'aria-label': t('recordsClose'),
                onClick: closeRecords,
              }, '×'),
            ),
          ),
          h('div', { className: 'cr-scale' },
            SCALES.map((entry) => h('button', {
              key: entry.id,
              type: 'button',
              className: 'cr-scaleBtn',
              'aria-pressed': scale === entry.id ? 'true' : 'false',
              onClick: () => { setScale(entry.id) },
            }, t(entry.key))),
          ),
          h('div', { className: 'cr-recordsStats' },
            h('div', { className: 'cr-recordsStat' },
              h('div', { className: 'cr-recordsValue' }, String(summary.delivered.length)),
              h('div', { className: 'cr-recordsLabel' }, t('metricDone')),
            ),
            h('button', {
              type: 'button',
              className: 'cr-recordsStat cr-recordsStat--action',
              onClick: () => { setTokenOpen(true); loadHostUsage() },
            },
              h('div', { className: 'cr-recordsValue' },
                hostTokens ? compact(hostTokens.net) : summary.tokenKnown ? compact(summary.tokens) : t('noValue')),
              h('div', { className: 'cr-recordsLabel' }, t('metricTokens')),
              hostTokens
                ? h('div', { className: 'cr-recordsHint' }, t('tokenTotal') + ' ' + compact(hostTokens.total))
                : h('div', { className: 'cr-recordsHint' }, hostLoading ? t('tokenLoading') : t('tokensConnect')),
            ),
            peak
              ? h('div', { className: 'cr-recordsStat' },
                h('div', { className: 'cr-recordsValue cr-recordsValue--wide' }, peak.text),
                h('div', { className: 'cr-recordsLabel' }, t('metricPeak')),
                h('div', { className: 'cr-recordsHint' }, t(peak.hint)),
              )
              : null,
            h('div', { className: 'cr-recordsStat' },
              h('div', { className: 'cr-recordsValue' }, String(summary.sessionCount)),
              h('div', { className: 'cr-recordsLabel' }, t('metricSessions')),
            ),
          ),
          h('p', { className: 'cr-recordsNote' }, t('recordsNote')),
        )
        : null

      const readAccount = () => {
        loadHostUsage()
        setAccount({ status: 'reading', text: '' })
        let result = null
        try {
          result = props.readUsage ? props.readUsage() : null
        } catch (_error) {
          result = null
        }
        if (result && typeof result.then === 'function') {
          result.then(
            (value) => { setAccount({ status: 'done', text: describeUsage(value, t) }) },
            () => { setAccount({ status: 'done', text: t('tokenFailed') }) },
          )
          return
        }
        setAccount({ status: 'done', text: result && result.ok ? describeUsage(result, t) : t('tokenUnsupported') })
      }

      const modalLayer = (node) => {
        if (createPortal && typeof document !== 'undefined' && document.body) {
          try {
            return createPortal(node, document.body)
          } catch (_error) {
            return node
          }
        }
        return node
      }

      const tokenDialog = tokenOpen
        ? modalLayer(h('div', { className: 'cr-scrim', 'data-closing': tokenClosing ? 'true' : 'false', onClick: closeToken },
          h('div', {
            className: 'cr-dialog',
            role: 'dialog',
            'aria-modal': 'true',
            'aria-label': t('tokenDialogTitle'),
            tabIndex: -1,
            onClick: (event) => { event.stopPropagation() },
            onKeyDown: (event) => { if (event.key === 'Escape') closeToken() },
          },
            h('div', { className: 'cr-dialogHead' },
              h('h2', null, t('tokenDialogTitle')),
              h('button', { type: 'button', className: 'cr-close', autoFocus: true, 'aria-label': t('close'), onClick: closeToken }, '×'),
            ),
            h('p', { className: 'cr-dialogText' }, hostUsage ? t('tokenHostBody') : summary.tokenKnown ? t('tokenKnownBody') : t('tokenUnknownBody')),
            hostUsage
              ? h('div', { className: 'cr-accountResult' },
                h('div', null, t('tokenNet') + ': ' + compact(hostTokens ? hostTokens.net : null)),
                h('div', null, t('tokenTotal') + ': ' + compact(hostTokens ? hostTokens.total : null)),
                h('div', null, t('tokenRecords') + ': ' + String(hostUsage.records || 0)),
                peak ? h('div', null, t('metricPeak') + ': ' + peak.text) : null,
              )
              : null,
            hostBalance
              ? h('div', { className: 'cr-accountResult' }, t('tokenBalance') + ': ' + (formatWallets(hostBalance).join(' · ') || t('tokenBalanceRead')))
              : null,
            hostFailed ? h('div', { className: 'cr-accountResult' }, t('tokenHostDown')) : null,
            account.status === 'done' ? h('div', { className: 'cr-accountResult' }, account.text) : null,
            h('div', { className: 'cr-dialogActions' },
              h('button', { type: 'button', className: 'cr-btn cr-btn--primary', onClick: readAccount }, t('tokenRead')),
              h('button', { type: 'button', className: 'cr-btn', onClick: closeToken }, t('close')),
            ),
          ),
        ))
        : null

      const focusSection = focus.length === 0
        ? null
        : h('section', { className: 'cr-focus', 'aria-label': t('focusTitle') },
          h('span', { className: 'cr-focusLabel' }, t('focusTitle')),
          h('div', { className: 'cr-focusRow' },
            focus.map((item) => h('button', {
              key: item.workspace.workspaceId,
              type: 'button',
              className: 'cr-focusItem',
              'data-state': item.state,
              onClick: () => { setActive({ id: item.workspace.workspaceId, tab: 'overview' }) },
            },
              h('span', { className: 'cr-focusName' }, item.workspace.title),
              h('span', { className: 'cr-focusWhy' },
                item.state === 'waiting'
                  ? h('span', { className: 'cr-dot cr-dot--waiting', 'aria-hidden': 'true' })
                  : null,
                item.reason,
              ),
            )),
          ),
        )

      const toastNode = toast ? h('div', { className: 'cr-toast', role: 'status' }, toast) : null
      const spacer = h('div', { style: { flex: '1 1 auto' } })
      // Shell keeps the records affordances pinned to the panel's own bottom-left,
      // never the viewport, so they cannot cover the host sidebar.
      const submitRename = () => {
        if (!renaming || renaming.busy) return
        const title = String(renaming.draft || '').trim()
        if (title === '') {
          setRenaming(Object.assign({}, renaming, { error: t('renameEmpty') }))
          return
        }
        if (title === renaming.title) {
          closeRename()
          return
        }
        setRenaming(Object.assign({}, renaming, { busy: true, error: null }))

        let pending
        try {
          pending = props.renameWorkspace ? props.renameWorkspace(renaming.workspaceId, title) : null
        } catch (error) {
          pending = Promise.reject(error)
        }
        if (!pending || typeof pending.then !== 'function') {
          setRenaming(Object.assign({}, renaming, { busy: false, error: t('renameUnavailable') }))
          return
        }
        const targetId = renaming.workspaceId
        pending.then(
          () => {
            setTitles(Object.assign({}, titles, { [targetId]: title }))
            closeRename()
            setToast(t('renameDone'))
          },
          (error) => {
            setRenaming(Object.assign({}, renaming, { busy: false, error: String((error && error.message) || error) }))
          },
        )
      }

      const renameNode = renaming
        ? modalLayer(h('div', { className: 'cr-scrim', 'data-closing': renameClosing ? 'true' : 'false', onClick: () => { if (!renaming.busy) closeRename() } },
          h('div', {
            className: 'cr-dialog',
            role: 'dialog',
            'aria-modal': 'true',
            'aria-label': t('renameTitle'),
            tabIndex: -1,
            onClick: (event) => { event.stopPropagation() },
            onKeyDown: (event) => { if (event.key === 'Escape' && !renaming.busy) closeRename() },
          },
            h('div', { className: 'cr-dialogHead' },
              h('h2', null, t('renameTitle')),
              h('button', {
                type: 'button',
                className: 'cr-close',
                'aria-label': t('close'),
                onClick: () => { if (!renaming.busy) closeRename() },
              }, '×'),
            ),
            h('p', { className: 'cr-dialogText' }, t('renameHint')),
            h('input', {
              className: 'cr-input',
              type: 'text',
              value: renaming.draft,
              autoFocus: true,
              maxLength: 80,
              'aria-label': t('renameTitle'),
              disabled: renaming.busy,
              onChange: (event) => setRenaming(Object.assign({}, renaming, { draft: event.target.value, error: null })),
              onKeyDown: (event) => { if (event.key === 'Enter') submitRename() },
            }),
            renaming.error ? h('div', { className: 'cr-formError' }, renaming.error) : null,
            h('div', { className: 'cr-dialogActions' },
              h('button', {
                type: 'button',
                className: 'cr-btn',
                disabled: renaming.busy,
                onClick: () => { if (!renaming.busy) closeRename() },
              }, t('cancel')),
              h('button', {
                type: 'button',
                className: 'cr-btn cr-btn--primary',
                disabled: renaming.busy,
                onClick: submitRename,
              }, t('confirm')),
            ),
          ),
        ))
        : null

      const viewSize = scrollState.view || 0
      const totalSize = scrollState.height || 0
      const maxScroll = Math.max(0, totalSize - viewSize)
      const trackSize = Math.max(0, viewSize - 36)
      const thumbSize = totalSize > 0 ? Math.max(30, Math.round(trackSize * Math.min(1, viewSize / totalSize))) : 0
      const thumbTop = maxScroll > 0 && trackSize > thumbSize
        ? Math.round((trackSize - thumbSize) * (scrollState.top / maxScroll))
        : 0

      const startDrag = (event) => {
        const node = scrollRef.current
        if (!node) return
        if (typeof event.preventDefault === 'function') event.preventDefault()
        const startY = event.clientY
        const startTop = node.scrollTop
        const free = Math.max(1, trackSize - thumbSize)
        const scale = maxScroll / free
        setBarOn(true)

        const move = (moveEvent) => {
          const raw = startTop + (moveEvent.clientY - startY) * scale
          if (raw < 0) {
            node.scrollTop = 0
            pullRef.current = damp(-raw)
          } else if (raw > maxScroll) {
            node.scrollTop = maxScroll
            pullRef.current = damp(maxScroll - raw)
          } else {
            node.scrollTop = raw
            pullRef.current = 0
          }
          setSpringOn(false)
          setPull(pullRef.current)
          setScrollState({ top: node.scrollTop, height: node.scrollHeight, view: node.clientHeight })
        }
        const up = () => {
          window.removeEventListener('pointermove', move)
          window.removeEventListener('pointerup', up)
          if (pullRef.current !== 0) {
            pullRef.current = 0
            setSpringOn(true)
            setPull(0)
            window.setTimeout(() => { setSpringOn(false) }, 320)
          }
          if (barTimerRef.current) window.clearTimeout(barTimerRef.current)
          barTimerRef.current = window.setTimeout(() => { setBarOn(false) }, 900)
        }
        window.addEventListener('pointermove', move)
        window.addEventListener('pointerup', up)
      }

      const scrollbarNode = maxScroll > 1
        ? h('div', { className: 'cr-scrollbar', 'data-on': barOn ? 'true' : 'false', 'aria-hidden': 'true' },
          h('div', {
            className: 'cr-scrollThumb',
            style: { height: String(thumbSize) + 'px', transform: 'translateY(' + String(thumbTop) + 'px)' },
            onPointerDown: startDrag,
          }),
        )
        : null

      const submitCreate = () => {
        if (!creating || creating.busy) return
        const name = String(creating.name || '').trim() || t('createDefaultName')
        const targetPath = String(creating.path || '').trim()
        if (targetPath === '') {
          setCreating(Object.assign({}, creating, { error: t('createMissingPath') }))
          return
        }
        setCreating(Object.assign({}, creating, { busy: true, error: null }))

        let pending
        try {
          pending = props.createWorkspace ? props.createWorkspace(targetPath, name) : null
        } catch (error) {
          pending = Promise.reject(error)
        }
        if (!pending || typeof pending.then !== 'function') {
          setCreating(Object.assign({}, creating, { busy: false, error: t('createUnavailable') }))
          return
        }
        pending.then(
          () => {
            closeCreate()
            setToast(t('createDone'))
          },
          (error) => {
            setCreating(Object.assign({}, creating, { busy: false, error: String((error && error.message) || error) }))
          },
        )
      }

      const createNode = creating
        ? modalLayer(h('div', { className: 'cr-scrim', 'data-closing': createClosing ? 'true' : 'false', onClick: () => { if (!creating.busy) closeCreate() } },
          h('div', {
            className: 'cr-dialog',
            role: 'dialog',
            'aria-modal': 'true',
            'aria-label': t('createTitle'),
            tabIndex: -1,
            onClick: (event) => { event.stopPropagation() },
            onKeyDown: (event) => { if (event.key === 'Escape' && !creating.busy) closeCreate() },
          },
            h('div', { className: 'cr-dialogHead' },
              h('h2', null, t('createTitle')),
              h('button', {
                type: 'button',
                className: 'cr-close',
                autoFocus: true,
                'aria-label': t('close'),
                onClick: () => { if (!creating.busy) closeCreate() },
              }, '×'),
            ),
            h('label', { className: 'cr-formField' },
              h('span', { className: 'cr-fieldLabel' }, t('createName')),
              h('input', {
                className: 'cr-input',
                type: 'text',
                value: creating.name,
                maxLength: 80,
                disabled: creating.busy,
                'aria-label': t('createName'),
                onChange: (event) => setCreating(Object.assign({}, creating, { name: event.target.value, error: null })),
                onKeyDown: (event) => { if (event.key === 'Enter') submitCreate() },
              }),
            ),
            h('label', { className: 'cr-formField' },
              h('span', { className: 'cr-fieldLabel' }, t('createPath')),
              h('input', {
                className: 'cr-input',
                type: 'text',
                value: creating.path,
                placeholder: t('createPathPlaceholder'),
                disabled: creating.busy,
                'aria-label': t('createPath'),
                onChange: (event) => setCreating(Object.assign({}, creating, { path: event.target.value, error: null })),
                onKeyDown: (event) => { if (event.key === 'Enter') submitCreate() },
              }),
              h('span', { className: 'cr-fieldHint' }, t('createPathHint')),
            ),
            creating.error ? h('div', { className: 'cr-formError' }, creating.error) : null,
            h('div', { className: 'cr-dialogActions' },
              h('button', {
                type: 'button',
                className: 'cr-btn',
                disabled: creating.busy,
                onClick: () => { if (!creating.busy) closeCreate() },
              }, t('cancel')),
              h('button', {
                type: 'button',
                className: 'cr-btn cr-btn--primary',
                disabled: creating.busy,
                onClick: submitCreate,
              }, creating.busy ? t('createBusy') : t('confirm')),
            ),
          ),
        ))
        : null

      const canvasMenuNode = canvasMenu
        ? h(React.Fragment, null,
          h('div', {
            className: 'cr-menuScrim',
            onClick: () => { setCanvasMenu(null) },
            onContextMenu: (event) => { event.preventDefault(); setCanvasMenu(null) },
          }),
          h('div', {
            className: 'cr-menu',
            role: 'menu',
            'aria-label': t('canvasMenuAria'),
            style: { left: String(canvasMenu.x) + 'px', top: String(canvasMenu.y) + 'px' },
            onKeyDown: (event) => { if (event.key === 'Escape') setCanvasMenu(null) },
          },
            h('button', {
              type: 'button',
              className: 'cr-menuItem',
              role: 'menuitem',
              autoFocus: true,
              onClick: openCreate,
            }, t('menuCreate')),
          ),
        )
        : null

      const onCanvasContextMenu = (event) => {
        if (event.defaultPrevented) return
        if (typeof event.preventDefault === 'function') event.preventDefault()
        setCanvasMenu({ x: Number(event.clientX) || 0, y: Number(event.clientY) || 0 })
      }

      const shell = (children) => h('div', { className: 'cr-root', onContextMenu: onCanvasContextMenu },
        h(Styles),
        h('div', { className: 'cr-scroll', ref: scrollRef },
          h('div', {
            className: 'cr-scrollInner',
            'data-spring': springOn ? 'true' : 'false',
            style: { '--cr-pull': String(pull) + 'px' },
          }, children),
        ),
        scrollbarNode,
        canvasMenuNode,
        recordsButtonNode,
        recordsNode,
        tokenDialog,
        renameNode,
        createNode,
        toastNode,
      )

      if (snapshot && !Array.isArray(snapshot.items)) {
        return shell(null)
      }

      if (ordered.length === 0) {
        return shell([
          h('h1', { className: 'cr-srOnly' }, t('title')),
          h('div', { className: 'cr-top' }, spacer, clockNode),
          h('div', { className: 'cr-empty' },
            h('span', { className: 'cr-emptyIcon', 'aria-hidden': 'true' }, h(Icon, { size: 26 })),
            h('span', { className: 'cr-emptyTitle' }, hiddenCount > 0 ? t('allHidden') : t('emptyTitle')),
            hiddenCount > 0
              ? h('button', { type: 'button', className: 'cr-btn', onClick: () => { setShowArchived(true) } }, t('showHidden').replace('{n}', String(hiddenCount)))
              : h('span', { className: 'cr-emptyHint' }, t('emptyHint')),
          ),
        ])
      }

      const activeWorkspace = active ? ordered.find((workspace) => workspace.workspaceId === active.id) : null

      if (activeWorkspace) {
        const entry = stateByWorkspace[activeWorkspace.workspaceId] || { state: 'idle', kind: null }
        const projectMeta = meta[activeWorkspace.workspaceId] || {}
        return shell([
          h('h1', { className: 'cr-srOnly' }, t('title')),
          h('div', { className: 'cr-top' }, spacer, clockNode),
          h(DetailView, {
            key: activeWorkspace.workspaceId + ':' + active.tab,
            workspace: activeWorkspace,
            state: entry.state,
            kind: entry.kind,
            meta: projectMeta,
            sessions: sessionsByWorkspace[activeWorkspace.workspaceId] || [],
            sessionNotes: projectMeta.sessionNotes || {},
            initialTab: active.tab,
            t,
            onBack: () => { setActive(null) },
            onOpenChat: () => { props.openProject(activeWorkspace.workspaceId) },
            onOpenSession: (sessionId) => {
              try {
                const opened = props.openSession(sessionId)
                if (opened !== true) props.openProject(activeWorkspace.workspaceId)
              } catch (_error) {
                props.openProject(activeWorkspace.workspaceId)
              }
            },
            onToggleStar: (sessionId) => {
              const note = (projectMeta.sessionNotes || {})[sessionId] || {}
              toggleSessionFlag(activeWorkspace.workspaceId, sessionId, 'star', !note.star)
            },
            onSetNote: (sessionId, text) => {
              toggleSessionFlag(activeWorkspace.workspaceId, sessionId, 'note', text)
            },
            update: (patch) => { updateMeta(activeWorkspace.workspaceId, patch) },
          }),
        ])
      }

      const columns = Math.min(MAX_COLUMNS, Math.max(1, ordered.length))

      const menuNode = menu ? h(React.Fragment, null,
        h('div', { className: 'cr-menuScrim', onClick: () => { setMenu(null) }, onContextMenu: (event) => { event.preventDefault(); setMenu(null) } }),
        h('div', {
          className: 'cr-menu',
          role: 'menu',
          'aria-label': t('menuAria'),
          style: { left: String(menu.x) + 'px', top: String(menu.y) + 'px' },
          onKeyDown: (event) => { if (event.key === 'Escape') setMenu(null) },
        },
          h('button', {
            type: 'button',
            className: 'cr-menuItem',
            role: 'menuitem',
            autoFocus: true,
            onClick: () => {
              const target = workspaces.find((item) => item.workspaceId === menu.workspaceId) || {}
              setRenaming({
                workspaceId: menu.workspaceId,
                title: target.title || '',
                draft: target.title || '',
                error: null,
                busy: false,
              })
              setMenu(null)
            },
          }, t('menuRename')),
          h('div', { className: 'cr-menuSep', 'aria-hidden': 'true' }),
          h('button', {
            type: 'button',
            className: 'cr-menuItem',
            role: 'menuitem',
            onClick: () => {
              const current = (meta[menu.workspaceId] || {}).archived === true
              updateMeta(menu.workspaceId, { archived: !current })
              setMenu(null)
            },
          }, (meta[menu.workspaceId] || {}).archived ? t('menuUnarchive') : t('menuArchive')),
          h('button', {
            type: 'button',
            className: 'cr-menuItem',
            role: 'menuitem',
            onClick: () => {
              const current = (meta[menu.workspaceId] || {}).hidden === true
              updateMeta(menu.workspaceId, { hidden: !current })
              setMenu(null)
            },
          }, (meta[menu.workspaceId] || {}).hidden ? t('menuUnhide') : t('menuHide')),
          h('div', { className: 'cr-menuSep', 'aria-hidden': 'true' }),
          h('button', {
            type: 'button',
            className: 'cr-menuItem',
            role: 'menuitem',
            onClick: () => {
              setActive({ id: menu.workspaceId, tab: 'sessions' })
              setMenu(null)
            },
          }, t('menuSessions')),
        ),
      ) : null

      return shell([
        h('h1', { className: 'cr-srOnly' }, t('title')),
        h('div', { className: 'cr-top' }, focusSection || spacer, clockNode),

        onboarded
          ? null
          : h('div', { className: 'cr-hint' },
            h('span', { className: 'cr-hintText' }, t('hint')),
            h('button', {
              type: 'button',
              className: 'cr-btn',
              onClick: () => { setOnboarded(true); writeFlag(FLAG_KEY) },
            }, t('gotIt')),
          ),

        h('div', { className: 'cr-grid', style: { '--cr-cols': String(columns) } },
          ordered.map((workspace) => {
            const entry = stateByWorkspace[workspace.workspaceId] || { state: 'idle', kind: null }
            return h(ProjectCard, {
              key: workspace.workspaceId,
              workspace,
              t,
              now,
              state: entry.state,
              kind: entry.kind,
              runningStart: Object.prototype.hasOwnProperty.call(runningByWorkspace, workspace.workspaceId)
                ? runningByWorkspace[workspace.workspaceId]
                : null,
              meta: meta[workspace.workspaceId] || null,
              muted: showArchived,
              onOpen: () => { setActive({ id: workspace.workspaceId, tab: 'overview' }) },
              onContextMenu: (event) => { openMenu(workspace.workspaceId, event) },
            })
          }),
        ),

        hiddenCount > 0
          ? h('button', {
            type: 'button',
            className: 'cr-hiddenToggle',
            onClick: () => { setShowArchived(!showArchived) },
          }, showArchived ? t('hideHidden') : t('showHidden').replace('{n}', String(hiddenCount)))
          : null,

        menuNode,
      ])
    }

    function SidebarEntry(props) {
      const wide = props.wide !== false
      const label = typeof props.t === 'function'
        ? props.t('panel')
        : typeof props.label === 'function'
          ? props.label()
          : (props.label || NS)
      const panelInfo = typeof props.usePanelInfo === 'function' ? props.usePanelInfo((value) => value) : null
      const active = Boolean(panelInfo && panelInfo.activePanelId === PANEL_ID)
      return h(React.Fragment, null,
        h(Styles),
        h('button', {
          type: 'button',
          className: 'cr-sideEntry',
          'data-rail': wide ? 'false' : 'true',
          'data-active': active ? 'true' : 'false',
          'aria-current': active ? 'page' : undefined,
          title: label,
          'aria-label': label,
          onClick: () => { props.open() },
        },
          h('span', { className: 'cr-sideIcon' }, h(Icon, { size: 16 })),
          wide ? h('span', { className: 'cr-sideLabel' }, label) : null,
        ),
      )
    }

    return {
      inject: ['slots', 'locale', 'layout', 'uiWorkspace'],
      apply(ctx) {
        ctx.effect(
          () => ctx.locale.register(NS, { zh: ZH, en: EN }),
          'control-room: dictionaries',
        )
        const t = ctx.locale.bind(NS)

        ctx.slots.inject('main', () => ctx.slots.register({
          name: 'main',
          key: PANEL_ID,
          locale: NS,
          inject: () => ({
            openProject: (workspaceId) => {
              try {
                const opening = ctx.uiWorkspace.openWorkspace(workspaceId)
                if (opening && typeof opening.catch === 'function') opening.catch(() => {})
              } catch (_error) {}
            },
            openSession: (sessionId) => {
              try {
                const opening = ctx.uiWorkspace.openSession(sessionId)
                if (opening && typeof opening.catch === 'function') opening.catch(() => {})
                return true
              } catch (_error) {
                return false
              }
            },
            // Reads the same account balance the Settings → Account page shows.
            // The host exposes no token-history query, so this is the honest ceiling.
            readUsage: async () => {
              let account = null
              try {
                account = ctx.get('deepseekAccount')
              } catch (_error) {
                account = null
              }
              if (!account || typeof account.getBalance !== 'function') return { ok: false, reason: 'unsupported' }

              let locale = 'zh-CN'
              try {
                locale = navigator.language || locale
              } catch (_error) {}
              let timezoneOffsetSeconds = 0
              try {
                timezoneOffsetSeconds = -new Date().getTimezoneOffset() * 60
              } catch (_error) {}

              const attempts = [
                { client: 'web' },
                { version: '1', locale, timezoneOffsetSeconds },
                {},
              ]
              for (const params of attempts) {
                try {
                  const out = await account.getBalance(params)
                  if (out !== undefined && out !== null) return { ok: true, balance: out }
                } catch (_error) {
                  // try the next parameter shape
                }
              }
              return { ok: false, reason: 'error' }
            },
            // Rename goes through the Host half: the workspace controller is a Host
            // service, so the change reaches the real sidebar entry.
            renameWorkspace: async (workspaceId, title) => {
              const response = await fetch('/api/control-room-rename', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                credentials: 'same-origin',
                body: JSON.stringify({ workspaceId, title }),
              })
              let body = null
              try {
                body = await response.json()
              } catch (_error) {
                body = null
              }
              if (!response || response.ok !== true || !body || body.ok !== true) {
                throw new Error(body && body.error ? body.error : 'HTTP ' + (response ? String(response.status) : '?'))
              }
              return body
            },
            // Create registers an existing directory on the Host, then renames it.
            createWorkspace: async (targetPath, title) => {
              const response = await fetch('/api/control-room-create', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                credentials: 'same-origin',
                body: JSON.stringify({ path: targetPath, title }),
              })
              let body = null
              try {
                body = await response.json()
              } catch (_error) {
                body = null
              }
              if (!response || response.ok !== true || !body || body.ok !== true) {
                throw new Error(body && body.error ? body.error : 'HTTP ' + (response ? String(response.status) : '?'))
              }
              return body
            },
          }),
        }, ControlRoomPage))

        ctx.slots.inject('sidebar.footer.action', () => ctx.slots.register({
          name: 'sidebar.footer.action',
          id: PANEL_ID,
          order: 10,
          locale: NS,
          inject: () => ({
            label: t('panel'),
            open: () => {
              try {
                ctx.layout.selectPanel(PANEL_ID)
              } catch (_error) {}
            },
          }),
        }, SidebarEntry))
      },
    }
  },
})
