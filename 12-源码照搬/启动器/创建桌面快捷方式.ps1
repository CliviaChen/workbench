# 创建（或更新）桌面快捷方式：孟菲斯图标 + 静默启动器
# 用法：powershell -ExecutionPolicy Bypass -File 创建桌面快捷方式.ps1
#      加 -StartMenu 同时建到开始菜单
param(
  [string]$Name = '正能量阿陈的工作台',
  [switch]$StartMenu
)
$ErrorActionPreference = 'Stop'

$root     = Split-Path -Parent $PSScriptRoot            # <工作台>\12-源码照搬
$vbs      = Join-Path $PSScriptRoot '启动工作台.vbs'
$ico      = Join-Path $PSScriptRoot '素材\工作台-孟菲斯.ico'
$wscript  = Join-Path $env:WINDIR 'System32\wscript.exe'

foreach ($p in @($vbs, $ico, $wscript)) {
  if (-not (Test-Path -LiteralPath $p)) { throw "缺少文件：$p" }
}

$desktop = [Environment]::GetFolderPath('Desktop')
$lnk = Join-Path $desktop "$Name.lnk"

$sh = New-Object -ComObject WScript.Shell
$s = $sh.CreateShortcut($lnk)
$s.TargetPath       = $wscript
$s.Arguments        = '"' + $vbs + '"'
$s.WorkingDirectory = $root
$s.IconLocation     = $ico + ',0'
$s.Description      = 'DSH 工作台 · 孟菲斯皮肤（双击启动，已在运行则切到前台）'
$s.WindowStyle      = 1
$s.Save()

Write-Host "✓ 桌面快捷方式：$lnk" -ForegroundColor Green
Write-Host "  图标：$ico"

if ($StartMenu) {
  $programs = [Environment]::GetFolderPath('Programs')
  $lnk2 = Join-Path $programs "$Name.lnk"
  $s2 = $sh.CreateShortcut($lnk2)
  $s2.TargetPath       = $wscript
  $s2.Arguments        = '"' + $vbs + '"'
  $s2.WorkingDirectory = $root
  $s2.IconLocation     = $ico + ',0'
  $s2.Description      = 'DSH 工作台 · 孟菲斯皮肤'
  $s2.Save()
  Write-Host "✓ 开始菜单快捷方式：$lnk2" -ForegroundColor Green
}

# 让资源管理器重新读图标缓存（不刷新的话偶尔还显示旧图标）
try { & "$env:WINDIR\System32\ie4uinit.exe" -show | Out-Null } catch { }
Write-Host '完成。如果桌面图标还是旧的：F5 刷新桌面，或注销/重新登录一次。' -ForegroundColor DarkGray
