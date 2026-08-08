const {
  createUser,
  getUserByEmail,
  getAllCitas,
  createCita,
  updateCita,
  getAllTecnicos,
  createIncidentReport
} = require('../server/database.cjs');

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  const url = req.url || '/';

  // Parse body safely if string
  let body = req.body || {};
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }


  // GET /api/health
  if (req.method === 'GET' && (url.endsWith('/health') || url.includes('/health'))) {
    res.status(200).json({ status: 'OK', server: 'TASKR Vercel Serverless API', timestamp: new Date() });
    return;
  }

  // POST /api/auth/register
  if (req.method === 'POST' && url.includes('/auth/register')) {
    const payload = body;
    if (!payload || !payload.email || !payload.password || !payload.name) {
      res.status(400).json({ error: 'Nombre, correo y contraseña son obligatorios' });
      return;
    }
    const existing = getUserByEmail(payload.email);
    if (existing) {
      res.status(400).json({ error: 'El correo electrónico ya está registrado' });
      return;
    }
    const newUser = createUser(payload);
    res.status(201).json({ success: true, user: newUser });
    return;
  }

  // POST /api/auth/login
  if (req.method === 'POST' && url.includes('/auth/login')) {
    const { email, password } = body || {};
    const user = getUserByEmail(email);
    if (!user || user.password !== password) {
      res.status(401).json({ error: 'Credenciales inválidas' });
      return;
    }
    const { password: _, ...userClean } = user;
    res.status(200).json({ success: true, user: userClean });
    return;
  }

  // GET /api/citas
  if (req.method === 'GET' && url.includes('/citas')) {
    const citas = getAllCitas();
    res.status(200).json(citas);
    return;
  }

  // GET /api/tecnicos
  if (req.method === 'GET' && url.includes('/tecnicos')) {
    const tecnicos = getAllTecnicos();
    res.status(200).json(tecnicos);
    return;
  }

  // POST /api/citas
  if (req.method === 'POST' && url.includes('/citas')) {
    const payload = body;
    const newCita = createCita(payload);
    res.status(201).json({ success: true, cita: newCita });
    return;
  }

  // PATCH /api/citas/:id
  if (req.method === 'PATCH' && url.includes('/citas')) {
    const parts = url.split('/');
    const citaId = parts[parts.length - 1];
    const updates = body;
    const updated = updateCita(citaId, updates);
    if (!updated) {
      res.status(404).json({ error: 'Cita no encontrada' });
      return;
    }
    res.status(200).json({ success: true, cita: updated });
    return;
  }

  // POST /api/upload
  if (req.method === 'POST' && url.includes('/upload')) {
    const { base64Data } = body || {};
    // Return base64 directly as data URL in Serverless environments
    res.status(200).json({ success: true, photoUrl: base64Data });
    return;
  }


  res.status(404).json({ error: 'Ruta no encontrada en Vercel Serverless API' });
};
