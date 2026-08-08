@echo off
title TASKR - Servidor Portable WLAN USB
color 0A

echo ========================================================
echo   🚀 INICIANDO TASKR PWA & SERVIDOR WLAN PARA MOVILES
echo ========================================================
echo.
echo  1. Obteniendo direccion IP local de la red Wi-Fi...
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
    set LOCAL_IP=%%a
)
set LOCAL_IP=%LOCAL_IP: =%

echo.
echo  2. Iniciando Backend Node.js en puerto 3001 (0.0.0.0)...
start "TASKR Backend Server" /min cmd /c "node server/server.cjs"

timeout /t 2 /nobreak >nul

echo  3. Iniciando Frontend Vite PWA en puerto 5173 (--host)...
start "TASKR Frontend PWA" cmd /c "npx vite --host"

timeout /t 3 /nobreak >nul

echo  4. Abriendo Panel Monitor de Servidor en la Laptop...
start http://localhost:5173/?role=server

echo.
echo ========================================================
echo   ✅ SERVIDOR TASKR Y MONITOR LISTO
echo ========================================================
echo   📱 1. PARA LOS JUECES (Modo Cliente):
echo      👉 http://%LOCAL_IP%:5173/?role=client
echo.
echo   📱 2. PARA TI (Modo Tecnico):
echo      👉 http://%LOCAL_IP%:5173/?role=handyman
echo ========================================================
echo.
pause
