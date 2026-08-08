# 📱 GUÍA DE PRESENTACIÓN: SEPARACIÓN DE VISTAS (JUECES vs TÉCNICO vs LAPTOP)

Para una presentación perfecta, la aplicación ahora detecta automáticamente el rol según el enlace que abras en cada dispositivo:

---

## 💻 1. En la Laptop / Proyector de la Universidad
Al hacer doble click en **`INICIAR_TASKR.bat`**, la laptop abrirá automáticamente:
👉 **`http://localhost:5173/?role=server`**

Se mostrará el **Panel de Monitorización del Servidor en Vivo**, que refleja la actividad de la base de datos `citas.json`, las métricas en tiempo real y la tabla de citas registradas mientras los jueces interactúan.

---

## ⚖️ 2. En los Teléfonos de los Jueces (Modo Cliente)
Diles a los jueces que ingresen desde su navegador móvil a:
👉 **`http://192.168.X.X:5173/?role=client`** (o simplemente la IP principal)

A ellos se les abrirá **únicamente la interfaz de Cliente Residente** para solicitar citas, ver los técnicos disponibles y recibir pases de caseta.

---

## 🛠️ 3. En TU Teléfono (Modo Técnico)
Ingresa desde el navegador de tu teléfono a:
👉 **`http://192.168.X.X:5173/?role=handyman`**

Se te abrirá **únicamente tu panel de Socio Técnico** para recibir y aceptar las citas que envíen los jueces en tiempo real, marcar tu llegada a la caseta y completar el trabajo.
