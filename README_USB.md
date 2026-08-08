# 🪟 TASKR - Guía de Servidor WLAN Portable (Móvil + USB sin Internet)

Este proyecto está configurado para funcionar como un **Servidor de Red Local (WLAN)**. Puedes conectarte desde tu teléfono móvil (iOS / Android) a la computadora de la universidad **sin necesidad de acceso a internet**.

---

## 📱 Cómo conectarte desde tu Teléfono Móvil:

### Método A: Usando la misma red Wi-Fi de la U
1. Conecta la memoria USB a la computadora de la universidad y ejecuta `INICIAR_TASKR.bat`.
2. La consola te mostrará una dirección IP (por ejemplo: `http://192.168.1.45:5173`).
3. Conecta tu teléfono celular a la **misma red Wi-Fi** de la universidad.
4. Abre Safari (iOS) o Chrome (Android) en tu teléfono e ingresa la dirección IP indicada.
5. ¡Listo! Verás y podrás usar la PWA en tu celular.

### Método B: Usando la "Zona Wi-Fi / Hotspot" de tu Celular (Sin gastar datos)
Si la red Wi-Fi de la universidad bloquea conexiones entre dispositivos (aislamiento de red):
1. En tu teléfono celular, activa la **Zona Wi-Fi / Anclaje de Red (Hotspot)** (no requiere datos móviles activos).
2. Conecta la computadora de la universidad a la red Wi-Fi de tu celular.
3. Ejecuta `INICIAR_TASKR.bat` en la computadora.
4. En el navegador de tu celular abre la dirección IP que aparece en pantalla (ejemplo: `http://192.168.43.1:5173`).

---

## 📲 Cómo Instalar la PWA en tu Celular durante la Presentación:
1. **En iPhone (Safari):** Toca el botón de *Compartir* ➔ selecciona **"Agregar al inicio"**.
2. **En Android (Chrome):** Toca los 3 puntos superiores ➔ selecciona **"Instalar aplicación"** o **"Agregar a la pantalla principal"**.

Una vez instalada, la app aparecerá con su icono nativo en la pantalla de tu celular y sincronizará en tiempo real con el servidor de la computadora.
