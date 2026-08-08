const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const os = require('os');
const {
  createUser,
  getUserByEmail,
  getUserById,
  getAllCitas,
  createCita,
  getCitaById,
  updateCita,
  getAllTecnicos,
  createIncidentReport
} = require('./database.cjs');

const PORT = 3001;
const UPLOADS_DIR = path.join(__dirname, '..', 'public', 'uploads');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && !alias.internal) {
        return alias.address;
      }
    }
  }
  return 'localhost';
}

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

const server = http.createServer((req, res) => {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Serve static uploaded photos: GET /uploads/:filename
  if (req.method === 'GET' && pathname.startsWith('/uploads/')) {
    const filename = path.basename(pathname);
    const filePath = path.join(UPLOADS_DIR, filename);
    if (fs.existsSync(filePath)) {
      const ext = path.extname(filePath).toLowerCase();
      const mimeTypes = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' };
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'image/jpeg' });
      fs.createReadStream(filePath).pipe(res);
      return;
    }
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Imagen no encontrada' }));
    return;
  }

  // GET /api/health
  if (req.method === 'GET' && pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'OK', server: 'TASKR SQLite Server', db: 'SQLite (taskr.db)', timestamp: new Date() }));
    return;
  }

  // POST /api/auth/register
  if (req.method === 'POST' && pathname === '/api/auth/register') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        if (!payload.email || !payload.password || !payload.name) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Nombre, correo y contraseña son obligatorios' }));
          return;
        }

        const existing = getUserByEmail(payload.email);
        if (existing) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'El correo electrónico ya está registrado' }));
          return;
        }

        const newUser = createUser(payload);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, user: newUser }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error al registrar usuario en la base de datos' }));
      }
    });
    return;
  }

  // POST /api/auth/login
  if (req.method === 'POST' && pathname === '/api/auth/login') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const { email, password } = JSON.parse(body);
        const user = getUserByEmail(email);

        if (!user || user.password !== password) {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Credenciales inválidas (correo o contraseña)' }));
          return;
        }

        // Return user profile (exclude password)
        const { password: _, ...userClean } = user;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, user: userClean }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error procesando inicio de sesión' }));
      }
    });
    return;
  }

  // POST /api/upload (Base64 photo upload)
  if (req.method === 'POST' && pathname === '/api/upload') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const { base64Data, filename } = JSON.parse(body);
        if (!base64Data) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Sin datos de imagen' }));
          return;
        }

        // Remove data header if present (e.g. data:image/jpeg;base64,...)
        const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        const buffer = matches ? Buffer.from(matches[2], 'base64') : Buffer.from(base64Data, 'base64');
        const ext = matches ? `.${matches[1].split('/')[1]}` : '.jpg';
        const cleanFilename = filename ? `${Date.now()}_${filename}` : `photo_${Date.now()}${ext}`;

        const filePath = path.join(UPLOADS_DIR, cleanFilename);
        fs.writeFileSync(filePath, buffer);

        const photoUrl = `/uploads/${cleanFilename}`;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, photoUrl }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error guardando archivo de imagen' }));
      }
    });
    return;
  }

  // GET /api/citas
  if (req.method === 'GET' && pathname === '/api/citas') {
    const citas = getAllCitas();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(citas));
    return;
  }

  // GET /api/tecnicos
  if (req.method === 'GET' && pathname === '/api/tecnicos') {
    const tecnicos = getAllTecnicos();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(tecnicos));
    return;
  }

  // POST /api/citas -> Solicitar Nueva Cita
  if (req.method === 'POST' && pathname === '/api/citas') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const newCita = createCita(payload);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, cita: newCita }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error creando la cita en SQLite' }));
      }
    });
    return;
  }

  // PATCH /api/citas/:id -> Asignar Técnico o Cambiar Estado
  if (req.method === 'PATCH' && pathname.startsWith('/api/citas/')) {
    const citaId = pathname.replace('/api/citas/', '');
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const updates = JSON.parse(body);
        const updated = updateCita(citaId, updates);
        if (!updated) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Cita no encontrada' }));
          return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, cita: updated }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error procesando actualización' }));
      }
    });
    return;
  }

  // POST /api/incidents
  if (req.method === 'POST' && pathname === '/api/incidents') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const report = createIncidentReport(payload);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, report }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error guardando el reporte de incidencia' }));
      }
    });
    return;
  }

  // Default 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
});

server.listen(PORT, '0.0.0.0', () => {
  const localIp = getLocalIpAddress();
  console.log(`====================================================`);
  console.log(` 🚀 TASKR SERVIDOR SQLITE PORTABLE (TASKR.DB)`);
  console.log(` 💻 Acceso Local PC:   http://localhost:${PORT}/api/citas`);
  console.log(` 📱 Acceso Móvil WLAN: http://${localIp}:5173`);
  console.log(` 🗄️ Base de datos:    ${path.join(__dirname, 'taskr.db')}`);
  console.log(`====================================================`);
});
