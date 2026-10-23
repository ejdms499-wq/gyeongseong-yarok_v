@echo off
chcp 65001 >nul
cd /d "%~dp0"
title 경성야록 웹 서버 실행기

python run_server.py
if errorlevel 1 py run_server.py
pause
