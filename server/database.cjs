const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');

const DB_FILE = path.join(__dirname, 'taskr.db');
const db = new DatabaseSync(DB_FILE);

// Initialize DB schema
function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      phone TEXT,
      condo TEXT,
      unit TEXT,
      avatar TEXT,
      role TEXT DEFAULT 'client',
      created_at TEXT
    );

    CREATE TABLE IF NOT EXISTS citas (
      id TEXT PRIMARY KEY,
      client_name TEXT,
      client_phone TEXT,
      condo TEXT,
      unit TEXT,
      service_title TEXT,
      category TEXT,
      description TEXT,
      scheduled_date TEXT,
      scheduled_time TEXT,
      status TEXT DEFAULT 'Pendiente',
      assigned_handyman_id TEXT,
      assigned_handyman_name TEXT,
      pass_code TEXT,
      payment_method TEXT,
      total_crc INTEGER,
      photo_url TEXT,
      created_at TEXT
    );

    CREATE TABLE IF NOT EXISTS tecnicos (
      id TEXT PRIMARY KEY,
      name TEXT,
      specialty TEXT,
      phone TEXT,
      avatar TEXT,
      rating REAL,
      status TEXT
    );

    CREATE TABLE IF NOT EXISTS incident_reports (
      id TEXT PRIMARY KEY,
      client_name TEXT,
      condo TEXT,
      unit TEXT,
      incident_type TEXT,
      description TEXT,
      photo_url TEXT,
      created_at TEXT
    );
  `);

  // Seed default data if empty
  seedDefaultData();
}

function seedDefaultData() {
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
  if (userCount === 0) {
    const insertUser = db.prepare(`
      INSERT INTO users (id, name, email, password, phone, condo, unit, avatar, role, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    insertUser.run(
      'usr-1',
      'Doña Sofía Arguedas',
      'sofia@montesdelsol.cr',
      '123456',
      '+506 8844-1122',
      'Condominio Montes del Sol',
      'Casa 42B',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      'client',
      new Date().toISOString()
    );

    insertUser.run(
      'usr-2',
      'Don Alejandro Fonseca',
      'alejandro@cerroalto.cr',
      '123456',
      '+506 8711-3344',
      'Condominio Cerro Alto',
      'Torre A - Apto 302',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      'client',
      new Date().toISOString()
    );
  }

  const handymanCount = db.prepare('SELECT COUNT(*) as count FROM tecnicos').get().count;
  if (handymanCount === 0) {
    const insertHandyman = db.prepare(`
      INSERT INTO tecnicos (id, name, specialty, phone, avatar, rating, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    insertHandyman.run('hm-1', 'Mario Jiménez', 'Especialista en Plomería & Gas', '+506 8844-9911', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80', 4.9, 'Disponible');
    insertHandyman.run('hm-2', 'Carlos Mora', 'Electricidad Residencial & Smart Home', '+506 8712-4455', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80', 4.8, 'Disponible');
    insertHandyman.run('hm-3', 'Lucía Fernández', 'Cerrajería Digital & Seguridad', '+506 8333-7788', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', 4.95, 'Disponible');
  }

  const citasCount = db.prepare('SELECT COUNT(*) as count FROM citas').get().count;
  if (citasCount === 0) {
    const insertCita = db.prepare(`
      INSERT INTO citas (id, client_name, client_phone, condo, unit, service_title, category, description, scheduled_date, scheduled_time, status, assigned_handyman_id, assigned_handyman_name, pass_code, payment_method, total_crc, photo_url, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertCita.run(
      'CIT-8492',
      'Doña Sofía Arguedas',
      '+506 8844-1122',
      'Condominio Montes del Sol',
      'Casa 42B',
      'Reparación de Fuga en Fregadero',
      'Plomería',
      'Fuga leve en la tubería bajo la pila de la cocina.',
      '2026-08-04',
      '14:30',
      'Pendiente',
      'hm-1',
      'Mario Jiménez',
      'TASKR-8492',
      'SINPE Móvil',
      18000,
      null,
      new Date().toISOString()
    );

    insertCita.run(
      'CIT-9925',
      'Don Alejandro Fonseca',
      '+506 8711-3344',
      'Condominio Cerro Alto',
      'Torre A - Apto 302',
      'Instalación de Grifo y Lavatorio',
      'Plomería',
      'Cambio de mezcladora de lavatorio principal.',
      '2026-08-05',
      '10:00',
      'Pendiente',
      null,
      null,
      'TASKR-9925',
      'SINPE Móvil',
      12000,
      null,
      new Date().toISOString()
    );
  }
}

// User helper methods
function createUser({ name, email, password, phone, condo, unit, avatar }) {
  const newId = `usr-${Math.floor(100000 + Math.random() * 900000)}`;
  const defaultAvatar = avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
  const stmt = db.prepare(`
    INSERT INTO users (id, name, email, password, phone, condo, unit, avatar, role, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(newId, name, email, password, phone || '', condo || 'Condominio Central', unit || 'Apto 101', defaultAvatar, 'client', new Date().toISOString());
  return getUserById(newId);
}

function getUserByEmail(email) {
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
}

function getUserById(id) {
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
}

// Citas helper methods
function getAllCitas() {
  const rows = db.prepare('SELECT * FROM citas ORDER BY created_at DESC').all();
  return rows.map(r => ({
    id: r.id,
    clientName: r.client_name,
    clientPhone: r.client_phone,
    condo: r.condo,
    unit: r.unit,
    serviceTitle: r.service_title,
    category: r.category,
    description: r.description,
    scheduledDate: r.scheduled_date,
    scheduledTime: r.scheduled_time,
    status: r.status,
    assignedHandymanId: r.assigned_handyman_id,
    assignedHandymanName: r.assigned_handyman_name,
    passCode: r.pass_code,
    paymentMethod: r.payment_method,
    totalCRC: r.total_crc,
    photoUrl: r.photo_url,
    createdAt: r.created_at
  }));
}

function createCita(payload) {
  const newId = `CIT-${Math.floor(1000 + Math.random() * 9000)}`;
  const passCode = `TASKR-${Math.floor(1000 + Math.random() * 9000)}`;
  const createdAt = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO citas (id, client_name, client_phone, condo, unit, service_title, category, description, scheduled_date, scheduled_time, status, assigned_handyman_id, assigned_handyman_name, pass_code, payment_method, total_crc, photo_url, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    newId,
    payload.clientName || 'Cliente Residente',
    payload.clientPhone || '+506 8000-0000',
    payload.condo || 'Condominio Central',
    payload.unit || 'Apto 101',
    payload.serviceTitle || 'Servicio General',
    payload.category || 'Mantenimiento',
    payload.description || '',
    payload.scheduledDate || new Date().toISOString().split('T')[0],
    payload.scheduledTime || '14:00',
    'Pendiente',
    payload.assignedHandymanId || null,
    payload.assignedHandymanName || null,
    passCode,
    payload.paymentMethod || 'SINPE Móvil',
    Number(payload.totalCRC || 15000),
    payload.photoUrl || null,
    createdAt
  );

  return getCitaById(newId);
}

function getCitaById(id) {
  const r = db.prepare('SELECT * FROM citas WHERE id = ?').get(id);
  if (!r) return null;
  return {
    id: r.id,
    clientName: r.client_name,
    clientPhone: r.client_phone,
    condo: r.condo,
    unit: r.unit,
    serviceTitle: r.service_title,
    category: r.category,
    description: r.description,
    scheduledDate: r.scheduled_date,
    scheduledTime: r.scheduled_time,
    status: r.status,
    assignedHandymanId: r.assigned_handyman_id,
    assignedHandymanName: r.assigned_handyman_name,
    passCode: r.pass_code,
    paymentMethod: r.payment_method,
    totalCRC: r.total_crc,
    photoUrl: r.photo_url,
    createdAt: r.created_at
  };
}

function updateCita(id, updates) {
  const current = getCitaById(id);
  if (!current) return null;

  const status = updates.status !== undefined ? updates.status : current.status;
  const assignedHandymanId = updates.assignedHandymanId !== undefined ? updates.assignedHandymanId : current.assignedHandymanId;
  const assignedHandymanName = updates.assignedHandymanName !== undefined ? updates.assignedHandymanName : current.assignedHandymanName;

  const stmt = db.prepare(`
    UPDATE citas 
    SET status = ?, assigned_handyman_id = ?, assigned_handyman_name = ?
    WHERE id = ?
  `);
  stmt.run(status, assignedHandymanId, assignedHandymanName, id);

  return getCitaById(id);
}

function getAllTecnicos() {
  return db.prepare('SELECT * FROM tecnicos').all();
}

function createIncidentReport({ clientName, condo, unit, incidentType, description, photoUrl }) {
  const newId = `INC-${Math.floor(1000 + Math.random() * 9000)}`;
  const createdAt = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO incident_reports (id, client_name, condo, unit, incident_type, description, photo_url, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(newId, clientName, condo, unit, incidentType, description, photoUrl || null, createdAt);
  return { id: newId, clientName, condo, unit, incidentType, description, photoUrl, createdAt };
}

// Initialize DB on require
initDatabase();

module.exports = {
  db,
  createUser,
  getUserByEmail,
  getUserById,
  getAllCitas,
  createCita,
  getCitaById,
  updateCita,
  getAllTecnicos,
  createIncidentReport
};
