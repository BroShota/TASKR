/**
 * TASKR Demo Tour Steps
 * Pasos del recorrido guiado para cada vista/rol
 * Español costarricense (tico) informal
 */

export const CLIENT_DEMO_STEPS = [
  {
    targetId: 'demo-client-search',
    title: '🔍 Buscador Inteligente con Jerga Tica',
    description:
      'Escribí como hablás vos: "el micro malo", "se fue la luz", "la compu no prende" o hasta "chunche del baño". TASKR entiende slang tico y errores de ortografía, y encuentra al especialista perfecto al toque.',
  },
  {
    targetId: 'demo-client-categories',
    title: '🏷️ Categorías de Servicio',
    description:
      'Filtrá por tipo de trabajo: Plomería, Electricidad, Pintura, Jardinería, Cerrajería y más. Cada categoría muestra solo técnicos certificados y verificados en esa área.',
  },
  {
    targetId: 'demo-client-results',
    title: '⭐ Técnicos Verificados del Condominio',
    description:
      'Cada profesional tiene rating de estrellas, precio por visita, años de experiencia y zona de cobertura. Tocá su tarjeta para ver el perfil completo y agendar una cita.',
  },
  {
    targetId: null,
    title: '📅 Agendar Tu Cita',
    description:
      'Al seleccionar un técnico, elegís la hora exacta con un reloj visual, el día (Hoy, Mañana o una fecha específica), y si es emergencia se aplica un cargo de ₡5,000 CRC por atención inmediata.',
  },
  {
    targetId: null,
    title: '💳 Métodos de Pago Flexibles',
    description:
      'Elegí entre tarjeta (Visa, Mastercard, AMEX con selector 3D premium), SINPE Móvil o efectivo. El pago se coordina directamente entre vos y el técnico.',
  },
  {
    targetId: null,
    title: '🔑 PIN de Seguridad Anti-Fraude',
    description:
      'Cuando tu cita esté confirmada, recibís un PIN de 4 dígitos exclusivo. Al llegar el técnico a tu puerta, le dictás el PIN para confirmar que es la persona correcta. Doble seguridad para vos y para él.',
  },
  {
    targetId: null,
    title: '🚫 Política de Cancelación Transparente',
    description:
      'Podés cancelar tu cita cuando querás. Si cancelás con más de 2 horas de anticipación, es gratis. Si cancelás a menos de 2 horas, se aplica una penalización de ₡5,000 CRC por desplazamiento del técnico.',
  },
  {
    targetId: null,
    title: '🏰 Pase de Caseta Automático',
    description:
      'Al confirmarse la cita, TASKR genera automáticamente un código de acceso para la garita de seguridad del condominio. El técnico lo muestra al guardia y entra sin problemas.',
  },
];

export const HANDYMAN_DEMO_STEPS = [
  {
    targetId: 'demo-handyman-header',
    title: '🛠️ Panel del Socio Técnico TASKR',
    description:
      'Este es tu centro de operaciones. Desde aquí gestionás tu perfil profesional, tu estado de disponibilidad, y configurás qué métodos de pago aceptás.',
  },
  {
    targetId: 'demo-handyman-toggle',
    title: '🟢 Disponibilidad Online / Offline',
    description:
      'Con un toque activás o desactivás tu disponibilidad. Cuando estás online, recibís solicitudes de citas de residentes dentro de tu radio de cobertura (5 km en Escazú).',
  },
  {
    targetId: 'demo-handyman-tabs',
    title: '📂 Navegación por Pestañas',
    description:
      'Tres secciones principales: Solicitudes (citas entrantes), Trabajo Actual (el trabajo que estás ejecutando ahora) y Billetera (tus ganancias acumuladas).',
  },
  {
    targetId: 'demo-handyman-requests',
    title: '📥 Solicitudes de Citas Entrantes',
    description:
      'Aquí aparecen las solicitudes de los residentes del condominio. Ves el tipo de trabajo, la dirección, el monto estimado y los datos del cliente. Decidís si la aceptás o la rechazás.',
  },
  {
    targetId: null,
    title: '✅ Aceptar o ❌ Rechazar Solicitud',
    description:
      'Si aceptás, la cita pasa a tu "Trabajo Actual" y el residente recibe la notificación. Si rechazás, el sistema busca automáticamente otro técnico disponible en la zona.',
  },
  {
    targetId: null,
    title: '🏰 Pase de Ingreso a Caseta de Seguridad',
    description:
      'Al llegar al condominio, mostrás el código de acceso TASKR al oficial de la garita. Este pase es generado automáticamente y autoriza tu ingreso al residencial.',
  },
  {
    targetId: null,
    title: '🔑 Validación de PIN en la Puerta',
    description:
      'Al llegar al apartamento, el residente te dicta su PIN de 4 dígitos. Lo ingresás en tu app y el sistema confirma tu presencia física real. Seguridad para ambos maes.',
  },
  {
    targetId: null,
    title: '💰 Cotización en Sitio & Reagendar',
    description:
      'Si el trabajo es grande (ej. Pintura completa ₡300,000), podés ajustar el presupuesto en sitio y programar la fecha de ejecución. Todo se actualiza en tiempo real para el cliente.',
  },
  {
    targetId: null,
    title: '🏦 Billetera & Ganancias',
    description:
      'Todas tus ganancias se registran en tu billetera digital. Ves el historial de trabajos completados, montos cobrados y tu balance acumulado. Retiros directos por SINPE.',
  },
];

export const SUPERVISOR_DEMO_STEPS = [
  {
    targetId: 'demo-supervisor-header',
    title: '🛡️ Panel de Supervisor / Caseta',
    description:
      'Desde aquí el administrador del condominio o el guardia de caseta monitorea todas las citas de mantenimiento en tiempo real. Control total sobre quién entra y sale.',
  },
  {
    targetId: 'demo-supervisor-stats',
    title: '📊 Estadísticas en Tiempo Real',
    description:
      'Ves de un vistazo cuántas citas están activas, pendientes, completadas y el monto total generado. Todo se actualiza automáticamente sin recargar la página.',
  },
  {
    targetId: 'demo-supervisor-citas',
    title: '📋 Lista de Citas del Condominio',
    description:
      'Cada cita muestra el técnico asignado, el residente, tipo de trabajo, monto y su estado actual. El supervisor verifica los pases de acceso antes de autorizar ingreso a la caseta.',
  },
  {
    targetId: 'demo-supervisor-links',
    title: '🔗 Links de Acceso por Rol',
    description:
      'Desde aquí se generan los enlaces directos para cada vista: Cliente, Socio Técnico y Supervisor. Cada rol tiene su propia experiencia optimizada y segura.',
  },
];
