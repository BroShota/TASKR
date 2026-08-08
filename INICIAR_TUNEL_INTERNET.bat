@echo off
title TASKR - Servidor Cloud Tunnel Internet
color 0B

echo ========================================================
echo   🚀 INICIANDO SERVIDOR Y TUNEL DE INTERNET
echo ========================================================
echo.
echo  1. Iniciando Backend Node.js en puerto 3001...
start "TASKR Backend Server" /min cmd /c "node server/server.cjs"

timeout /t 2 /nobreak >nul

echo  2. Iniciando Frontend Vite PWA en puerto 5173...
start "TASKR Frontend PWA" /min cmd /c "npx vite"

timeout /t 3 /nobreak >nul

echo  3. Abriendo Monitor de Servidor en la Laptop...
start http://localhost:5173/?role=server

echo.
echo  4. Generando Tunel HTTPS para celulares...
npx localtunnel --port 5173

pause
