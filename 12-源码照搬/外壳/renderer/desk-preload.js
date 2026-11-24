// 命令页「直连桌面版 DSH」专用 preload：
// 在页面脚本启动**之前**把桌面版当前会话写进本 webview 的 localStorage，
// 这样 DSH 启动时就直接落在同一个对话上（页面运行后再写会被它自己的持久化覆盖）。
const { ipcRenderer } = require('electron');
try {
  localStorage.setItem('kneu.deskPreload', String(Date.now()));
  const sid = ipcRenderer.sendSync('harness:desktop-session-sync');
  localStorage.setItem('kneu.deskPreloadSid', String(sid || ''));
  if (sid) {
    localStorage.setItem('dsh.sessions.current', JSON.stringify({ sessionId: String(sid) }));
  }
} catch (e) {
  try { localStorage.setItem('kneu.deskPreloadErr', String(e && e.message || e)); } catch (e2) { /* ignore */ }
}
