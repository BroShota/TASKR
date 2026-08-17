/**
 * TASKR Demo Tour Steps
 * Pasos del recorrido guiado para cada vista/rol con elementos reales interactivos
 * Español costarricense (tico) informal
 */

export const CLIENT_DEMO_STEPS = [
  {
    targetId: 'demo-client-search',
    title: '🔍 Buscador Inteligente con Jerga Tica',
    description:
      'Escribí como hablás vos: "el micro malo", "se fue la luz", "la compu no prende" o "tubo roto". TASKR entiende slang tico y errores ortográficos para encontrar al especialista ideal.',
  },
  {
    targetId: 'demo-client-categories',
    title: '🏷️ Categorías de Especialistas',
    description:
      'Filtrá por oficio con un toque: Plomería, Electricidad, Pintura, Jardinería, Cerrajería y más. Cada categoría agrupa profesionales verificados.',
  },
  {
    targetId: 'demo-client-filters',
    title: '⚙️ Filtros por Condominio y Precio',
    description:
      'Seleccioná tu condominio en Escazú o Santa Ana y ordená los resultados por mejor calificación, precio por hora o años de experiencia.',
  },
  {
    targetId: 'demo-client-first-handyman',
    title: '⭐ Perfil del Técnico & Cotización',
    description:
      'Ves fotos, tarifa en colones (₡), estrellas y experiencia. Tocá "Cotizar & Agendar" para elegir horario con reloj interactivo o pedir atención de emergencia.',
  },
  {
    targetId: 'demo-client-bell',
    title: '🔔 Campana de Citas & PIN de Seguridad',
    description:
      'Tocá esta campanita para desplegar tu burbuja flotante estilo Apple. Muestra tu cita activa y el PIN de 4 dígitos que le dictás al técnico al llegar a tu puerta.',
  },
  {
    targetId: 'demo-client-account',
    title: '👤 Cuenta y Dirección de Residencia',
    description:
      'Accedé al perfil de tu apartamento o casa en el condominio y gestioná tu cuenta de usuario.',
  },
  {
    targetId: 'demo-client-theme',
    title: '🌓 Modo Claro / Modo Oscuro',
    description:
      'Alterná al instante entre la interfaz de día y el modo oscuro de lujo con colores antracita y detalles dorados.',
  },
  {
    targetId: 'demo-client-nav-bookings',
    title: '📅 Pestaña de Reservas & Pases de Caseta',
    description:
      'Gestioná todas tus citas, consultá el Pase TASKR autorizado para el guardia de caseta y cancelá sin costo hasta 2 horas antes.',
  },
];

export const HANDYMAN_DEMO_STEPS = [
  {
    targetId: 'demo-handyman-header',
    title: '🛠️ Perfil del Socio Técnico',
    description:
      'Panel principal del especialista con tu foto, nombre, especialidad y estado de conexión en el condominio.',
  },
  {
    targetId: 'demo-handyman-toggle',
    title: '🟢 Disponibilidad Online / Offline',
    description:
      'Activá o desactivá tu estado con un toque. Al estar "EN LÍNEA" recibís solicitudes de condominios en tu radio de 5 km.',
  },
  {
    targetId: 'demo-handyman-stats',
    title: '📊 Resumen de Ganancias y Calificación',
    description:
      'Monitoreá lo que has ganado hoy en colones (₡38,000), tu promedio de calificación por residentes y trabajos exitosos.',
  },
  {
    targetId: 'demo-handyman-payment-settings',
    title: '💵 Cobro Directo Autónomo',
    description:
      'Elegí libremente si aceptás transferencias por SINPE Móvil o pago en Efectivo. El trato de pago es directo con el cliente.',
  },
  {
    targetId: 'demo-handyman-tabs',
    title: '📂 Pestañas de Trabajo y Billetera',
    description:
      'Navegá entre Solicitudes entrantes, Trabajo Actual en ejecución (con validación de PIN y cotización en sitio) y tu Billetera.',
  },
  {
    targetId: 'demo-handyman-requests',
    title: '📥 Solicitudes Entrantes de Residentes',
    description:
      'Revisá los detalles de la visita solicitada, dirección en el condominio y monto. Aceptá la cita o rechazala para reasignación.',
  },
];

export const SUPERVISOR_DEMO_STEPS = [
  {
    targetId: 'demo-supervisor-header',
    title: '🛡️ Panel de Supervisor y Caseta',
    description:
      'Monitoreo centralizado en tiempo real para guardias de garita y administración del residencial.',
  },
  {
    targetId: 'demo-supervisor-stats',
    title: '📊 Métricas en Tiempo Real',
    description:
      'Conteo automático de pedidos totales, citas sin asignar, técnicos en ruta y servicios completados.',
  },
  {
    targetId: 'demo-supervisor-links',
    title: '🔗 Enlaces de Acceso por Rol',
    description:
      'Acceso rápido con URL directa a la App de Residentes (?role=client) y al Panel de Socios Técnicos (?role=handyman).',
  },
  {
    targetId: 'demo-supervisor-citas',
    title: '📋 Control de Pases y Citas en Vivo',
    description:
      'Tabla interactiva para verificar códigos de acceso a caseta (ej. TASKR-8492) antes de abrir la aguja al técnico.',
  },
];
