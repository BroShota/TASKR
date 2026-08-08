// API Client for TASKR Portable Backend (Server + LocalStorage Fallback)

const API_BASE = import.meta.env.VITE_API_URL || '/api';

// Initial local fallback data in case server is offline
const DEFAULT_LOCAL_CITAS = [
  {
    id: 'CIT-8492',
    clientName: 'Doña Sofía Arguedas',
    clientPhone: '+506 8844-1122',
    condo: 'Condominio Montes del Sol',
    unit: 'Casa 42B',
    serviceTitle: 'Reparación de Fuga en Fregadero',
    category: 'Plomería',
    description: 'Fuga leve en la tubería bajo la pila de la cocina.',
    scheduledDate: '2026-08-04',
    scheduledTime: '14:30',
    status: 'Pendiente',
    assignedHandymanId: 'hm-1',
    assignedHandymanName: 'Mario Jiménez',
    passCode: 'TASKR-8492',
    paymentMethod: 'SINPE Móvil',
    totalCRC: 18000,
    createdAt: new Date().toISOString()
  },
  {
    id: 'CIT-9925',
    clientName: 'Don Alejandro Fonseca',
    clientPhone: '+506 8711-3344',
    condo: 'Condominio Cerro Alto',
    unit: 'Torre A - Apto 302',
    serviceTitle: 'Instalación de Grifo y Lavatorio',
    category: 'Plomería',
    description: 'Cambio de mezcladora de lavatorio principal.',
    scheduledDate: '2026-08-05',
    scheduledTime: '10:00',
    status: 'Pendiente',
    assignedHandymanId: null,
    assignedHandymanName: null,
    passCode: 'TASKR-9925',
    paymentMethod: 'SINPE Móvil',
    totalCRC: 12000,
    createdAt: new Date().toISOString()
  }
];

function getLocalCitas() {
  const stored = localStorage.getItem('taskr_citas');
  if (!stored) {
    localStorage.setItem('taskr_citas', JSON.stringify(DEFAULT_LOCAL_CITAS));
    return DEFAULT_LOCAL_CITAS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_LOCAL_CITAS;
  }
}

function setLocalCitas(citas) {
  localStorage.setItem('taskr_citas', JSON.stringify(citas));
}

/**
 * Get all citas from Server or LocalStorage
 */
export async function getCitas() {
  try {
    const response = await fetch(`${API_BASE}/citas`);
    if (response.ok) {
      const data = await response.json();
      setLocalCitas(data);
      return data;
    }
  } catch (err) {
    console.warn('Servidor offline o inaccesible, usando base local:', err);
  }
  return getLocalCitas();
}

/**
 * Request / Create a new Cita
 */
export async function solicitarCita(citaPayload) {
  try {
    const response = await fetch(`${API_BASE}/citas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(citaPayload)
    });
    if (response.ok) {
      const resData = await response.json();
      return resData.cita;
    }
  } catch (err) {
    console.warn('Servidor offline, creando cita en almacenamiento local:', err);
  }

  // Local fallback creation
  const localCitas = getLocalCitas();
  const newId = `CIT-${Math.floor(1000 + Math.random() * 9000)}`;
  const passCode = `TASKR-${Math.floor(1000 + Math.random() * 9000)}`;
  const newCita = {
    id: newId,
    clientName: citaPayload.clientName || 'Cliente Residente',
    clientPhone: citaPayload.clientPhone || '+506 8000-0000',
    condo: citaPayload.condo || 'Condominio Central',
    unit: citaPayload.unit || 'Apto 101',
    serviceTitle: citaPayload.serviceTitle || 'Servicio General',
    category: citaPayload.category || 'Mantenimiento',
    description: citaPayload.description || '',
    scheduledDate: citaPayload.scheduledDate || new Date().toISOString().split('T')[0],
    scheduledTime: payload => payload.scheduledTime || '10:00',
    status: 'Pendiente',
    assignedHandymanId: citaPayload.assignedHandymanId || null,
    assignedHandymanName: citaPayload.assignedHandymanName || null,
    passCode: passCode,
    paymentMethod: citaPayload.paymentMethod || 'SINPE Móvil',
    totalCRC: citaPayload.totalCRC || 15000,
    createdAt: new Date().toISOString()
  };
  localCitas.unshift(newCita);
  setLocalCitas(localCitas);
  return newCita;
}

/**
 * Assign Cita to Handyman / Update Status
 */
export async function actualizarEstadoCita(citaId, updates) {
  try {
    const response = await fetch(`${API_BASE}/citas/${citaId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (response.ok) {
      const resData = await response.json();
      return resData.cita;
    }
  } catch (err) {
    console.warn('Servidor offline, actualizando cita en almacenamiento local:', err);
  }

  // Local fallback update
  const localCitas = getLocalCitas();
  const index = localCitas.findIndex(c => c.id === citaId);
  if (index !== -1) {
    localCitas[index] = { ...localCitas[index], ...updates };
    setLocalCitas(localCitas);
    return localCitas[index];
  }
  return null;
}

/**
 * Login user against SQLite Backend or LocalStorage
 */
export async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errData = await response.json();
      return { error: errData.error || 'Credenciales inválidas' };
    }
  } catch (err) {
    console.warn('Servidor offline, autenticando localmente:', err);
  }

  // Local fallback auth
  const storedUsers = JSON.parse(localStorage.getItem('taskr_users') || '[]');
  const found = storedUsers.find(u => u.email === email && u.password === password);
  if (found) {
    return { success: true, user: found };
  }
  return { error: 'Servidor offline y usuario no encontrado en almacenamiento local' };
}

/**
 * Register user in SQLite Backend or LocalStorage
 */
export async function registerUser(userData) {
  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errData = await response.json();
      return { error: errData.error || 'Error al registrar usuario' };
    }
  } catch (err) {
    console.warn('Servidor offline, guardando registro localmente:', err);
  }

  // Local fallback registration
  const storedUsers = JSON.parse(localStorage.getItem('taskr_users') || '[]');
  const newUser = {
    id: `usr-${Math.floor(1000 + Math.random() * 9000)}`,
    ...userData,
    avatar: userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userData.name)}`,
    createdAt: new Date().toISOString()
  };
  storedUsers.push(newUser);
  localStorage.setItem('taskr_users', JSON.stringify(storedUsers));
  return { success: true, user: newUser };
}

/**
 * Upload Photo (Base64) to Backend or Local Data URL
 */
export async function uploadPhoto(base64Data, filename = 'photo.jpg') {
  try {
    const response = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ base64Data, filename })
    });
    if (response.ok) {
      const data = await response.json();
      return data.photoUrl;
    }
  } catch (err) {
    console.warn('Servidor offline, retornando data URL local para la foto:', err);
  }
  return base64Data; // Return data URL directly as fallback
}

/**
 * Check if backend HTTP server is online
 */
export async function checkServerHealth() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const response = await fetch(`${API_BASE}/health`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (response.ok) {
      const data = await response.json();
      return { online: true, server: data.server, timestamp: data.timestamp };
    }
  } catch (err) {
    // Server offline, will use localStorage fallback
  }
  return { online: false, server: 'Offline (LocalStorage Fallback)', timestamp: new Date() };
}



