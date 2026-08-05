@echo off
cd /d "%~dp0"
echo Pushing your portfolio to GitHub...
"C:\Program Files\Git\bin\git.exe" push -u origin main
echo.
echo Process complete!
pause
