@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"
title 正能量阿陈的工作台 · 一键安装
echo ==========================================
echo   正能量阿陈的工作台 · 一键安装
echo   （装依赖 + 建桌面快捷方式 + 启动）
echo ==========================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [X] 没找到 Node.js。请先安装 Node.js 24.9 或更新版本：https://nodejs.org/
  echo.
  pause
  exit /b 1
)
where npm >nul 2>nul
if errorlevel 1 (
  echo [X] 没找到 npm（通常跟 Node.js 一起装）。请重新安装 Node.js。
  echo.
  pause
  exit /b 1
)

if not exist "12-源码照搬\启动器\启动工作台.vbs" (
  echo [X] 目录不完整：缺少 12-源码照搬\启动器\启动工作台.vbs
  echo     请把整个项目文件夹完整下载/解压后再运行本脚本。
  echo.
  pause
  exit /b 1
)
if not exist "引擎\apps\cli\lib\bin.js" (
  echo [!] 警告：没找到 引擎\apps\cli\lib\bin.js
  echo     工作台需要本机安装 DeepSeek Harness 桌面版（启动器会自动找它）。
  echo     如果稍后启动失败，请先安装 DSH 桌面版，或设置 DSH_DESKTOP_EXE 指向它。
  echo.
)

echo [1/3] 检查外壳依赖（Electron）...
if exist "12-源码照搬\外壳\node_modules\electron\dist\electron.exe" (
  echo       已安装，跳过。
) else (
  echo       第一次需要下载约 120MB，请耐心等待...
  pushd "12-源码照搬\外壳"
  call npm install --no-audit --no-fund
  if errorlevel 1 (
    popd
    echo [X] npm install 失败。可换国内镜像后重试：
    echo     npm config set registry https://registry.npmmirror.com
    echo.
    pause
    exit /b 1
  )
  popd
)

echo [2/3] 创建/更新桌面快捷方式...
powershell -NoProfile -ExecutionPolicy Bypass -File "12-源码照搬\启动器\创建桌面快捷方式.ps1"
if errorlevel 1 (
  echo [!] 快捷方式创建失败（可能被杀毒软件拦截），可手动双击 12-源码照搬\启动器\启动工作台.vbs
)

echo [3/3] 启动工作台...
start "" "12-源码照搬\启动器\启动工作台.vbs"
echo.
echo 完成：桌面上的「正能量阿陈的工作台」以后双击就能用。
echo 想换项目文件夹名字也可以，启动器会自动修正快捷方式指向。
echo.
timeout /t 3 >nul