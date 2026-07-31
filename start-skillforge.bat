@echo off
chcp 65001 >nul
title Skillforge OS
cd /d D:\skillforge-os

echo.
echo   ============================================
echo     Skillforge OS
echo     启动中... 浏览器会自动打开
echo     关闭这个窗口 = 关闭服务器
echo   ============================================
echo.

bun run dev:vite
pause
