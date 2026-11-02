@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Please install Node.js 22 or newer, then try again.
  pause
  exit /b 1
)
start "" "http://localhost:4173"
node scripts/preview.mjs
pause
