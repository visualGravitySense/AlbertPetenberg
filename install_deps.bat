@echo off
echo Installing dependencies...
cd /d "%~dp0"
npm install
echo.
echo Done! Press any key to close...
pause >nul
