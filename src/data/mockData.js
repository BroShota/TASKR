// Mock Data for TASKR - Costa Rica Handyman Platform

export const INITIAL_CLIENT = {
  id: "cli_001",
  name: "Ana Solís",
  role: "Cliente Premium",
  condo: "Condominio Monte Sol",
  condoUnit: "Torre B - Apto 402",
  location: "Escazú, San José",
  phone: "+506 8888-4321",
  sinpePhone: "8888-4321",
  email: "ana.solis@example.cr",
  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
  idVerified: true,
  idNumber: "1-1428-0912",
  idType: "Cédula de Identidad Costa Rica",
  memberSince: "Enero 2024",
  completedServicesCount: 14,
  paymentMethods: [
    { id: "pm_1", type: "sinpe", label: "SINPE Móvil (8888-4321)", primary: true, icon: "smartphone" },
    { id: "pm_2", type: "card", label: "Visa Banco Nacional", maskedNumber: "**** **** **** 4242", expiry: "08/27", primary: false, icon: "credit-card" }
  ]
};

export const CATEGORIES = [
  { id: "all", name: "Todos", icon: "Wrench", count: 24 },
  { id: "plumbing", name: "Plomería", icon: "Droplet", count: 8, color: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100" },
  { id: "electricity", name: "Electricidad", icon: "Zap", count: 6, color: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100" },
  { id: "remodeling", name: "Remodelación", icon: "Hammer", count: 4, color: "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100" },
  { id: "painting", name: "Pintura", icon: "Paintbrush", count: 5, color: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100" },
  { id: "gardening", name: "Jardinería", icon: "Trees", count: 3, color: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" },
  { id: "cleaning", name: "Limpieza", icon: "Sparkles", count: 7, color: "bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100" },
  { id: "maintenance", name: "Mantenimiento", icon: "Sliders", count: 9, color: "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100" }
];

export const HANDYMEN = [
  {
    id: "h_001",
    name: "Carlos Montero",
    specialty: "Maestro Plomero",
    category: "plumbing",
    experienceYears: 15,
    rating: 4.9,
    reviewsCount: 124,
    hourlyRateCRC: 15000,
    hourlyRateUSD: 30,
    zone: "Escazú y Santa Ana",
    condoSpecialist: true,
    badges: ["Verificado SINPE", "Top Rated", "Experto Local"],
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
    phone: "+506 8311-9201",
    sinpeNumber: "8311-9201",
    acceptsSinpe: true,
    acceptsCash: true,
    ownTools: true,
    availability: "Hoy / Inmediata",
    estimatedArrivalMins: 15,
    bio: "Más de 15 años solucionando fugas, detección ultrasónica de fugas subterráneas, instalación de griferías premium y reparación de bombas de agua en condominios residenciales.",
    certifications: ["Técnico Certificado INA", "Verificación Policial al 100%", "Poliza INS al Día"],
    recentReviews: [
      { id: "r1", user: "Roberto G.", rating: 5, comment: "Llegó super rápido al Condominio Valle del Sol. Arregló la fuga del baño principal sin romper pared. 100% recomendado.", date: "Hace 2 días" },
      { id: "r2", user: "María F.", rating: 5, comment: "Muy educado, dejó todo limpio y cobró exactamente lo cotizado por SINPE.", date: "Hace 1 semana" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=400&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "h_002",
    name: "Aishel Morales",
    specialty: "Técnica Electricista",
    category: "electricity",
    experienceYears: 8,
    rating: 4.8,
    reviewsCount: 89,
    hourlyRateCRC: 18000,
    hourlyRateUSD: 36,
    zone: "Concasa / San Rafael de Alajuela",
    condoSpecialist: true,
    badges: ["Especialista Condominios", "Verificado", "Top Rated"],
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80",
    phone: "+506 8744-1290",
    sinpeNumber: "8744-1290",
    ownTools: true,
    availability: "Hoy / Inmediata",
    estimatedArrivalMins: 20,
    bio: "Especialista en tableros eléctricos, certificación de conexiones para electrodomésticos de alta demanda, iluminación LED inteligente y cortocircuitos.",
    certifications: ["Colegio de Tecnólogos", "Norma Eléctrica Costa Rica", "Verificación Cédula"],
    recentReviews: [
      { id: "r3", user: "Juan Diego C.", rating: 5, comment: "Excelente trabajo en torre de aptos. Detectó la falla del breaker principal de inmediato.", date: "Hace 3 días" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "h_003",
    name: "Mauricio Marín",
    specialty: "Remodelación y Pintura",
    category: "remodeling",
    experienceYears: 12,
    rating: 5.0,
    reviewsCount: 56,
    hourlyRateCRC: 12000,
    hourlyRateUSD: 24,
    zone: "Heredia / GAM",
    condoSpecialist: false,
    badges: ["Top Rated", "Verificado"],
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    phone: "+506 8922-3311",
    sinpeNumber: "8922-3311",
    ownTools: true,
    availability: "Disponible Mañana",
    estimatedArrivalMins: 35,
    bio: "Acabados de primera calidad, instalación de drywall/tablayeso, impermeabilización de paredes en condominios y pintura anti-humedad.",
    certifications: ["Maestro de Obras INA", "Verificado TASKR Pro"],
    recentReviews: [
      { id: "r4", user: "Karla V.", rating: 5, comment: "Dejó el apartamento impecable. Pintura perfecta y sin manchas.", date: "Hace 5 días" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "h_004",
    name: "Samantha Vargas",
    specialty: "Mantenimiento y Jardinería",
    category: "gardening",
    experienceYears: 5,
    rating: 4.7,
    reviewsCount: 40,
    hourlyRateCRC: 10000,
    hourlyRateUSD: 20,
    zone: "San José Centro",
    condoSpecialist: true,
    badges: ["Experto Local", "Verificado SINPE"],
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    phone: "+506 8655-4422",
    sinpeNumber: "8655-4422",
    ownTools: true,
    availability: "Hoy / En 45 mins",
    estimatedArrivalMins: 45,
    bio: "Diseño y poda de jardines verticales en balcones de condominios, plantas ornamentales, sistemas de riego por goteo y paisajismo.",
    certifications: ["Agronomía Paisajista", "Cédula Verificada"],
    recentReviews: [
      { id: "r5", user: "Esteban R.", rating: 5, comment: "Transformó mi terraza del condominio por completo. Sabe mucho de plantas locales.", date: "Hace 1 semana" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "h_005",
    name: "Jorge Esquivel",
    specialty: "Cerrajero de Emergencia 24/7",
    category: "maintenance",
    experienceYears: 10,
    rating: 4.9,
    reviewsCount: 110,
    hourlyRateCRC: 20000,
    hourlyRateUSD: 40,
    zone: "Escazú, Santa Ana y Curridabat",
    condoSpecialist: true,
    badges: ["Top Rated", "Emergencias 24/7", "Verificado"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    phone: "+506 8812-7788",
    sinpeNumber: "8812-7788",
    ownTools: true,
    availability: "Hoy / Inmediata (10 mins)",
    estimatedArrivalMins: 10,
    bio: "Apertura rápida de cerraduras digitales, llaves inteligentes, cambio de combinaciones de puertas principal de condominio sin daños.",
    certifications: ["Cerrajero Profesional Certificado", "Record Policial Impecable"],
    recentReviews: [
      { id: "r6", user: "Lucía M.", rating: 5, comment: "Me quedé afuera del apartamento a las 10 PM. Llegó en 12 minutos y abrió la puerta en 2 minutos.", date: "Ayer" }
    ],
    gallery: []
  }
];

export const SERVICE_HISTORY = [
  {
    id: "srv_101",
    handymanName: "Carlos Montero",
    specialty: "Maestro Plomero",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    title: "Reparación de fuga en fregadero de cocina",
    date: "14 Jul 2026",
    status: "Completado",
    amountCRC: 15000,
    paymentMethod: "SINPE Móvil",
    ratingGiven: 5,
    invoiceId: "TSK-2026-8821"
  },
  {
    id: "srv_102",
    handymanName: "Aishel Morales",
    specialty: "Técnica Electricista",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80",
    title: "Instalación de Lámparas Inteligentes y Dimmers",
    date: "28 Jun 2026",
    status: "Completado",
    amountCRC: 36000,
    paymentMethod: "Visa **** 4242",
    ratingGiven: 5,
    invoiceId: "TSK-2026-7419"
  },
  {
    id: "srv_103",
    handymanName: "Samantha Vargas",
    specialty: "Mantenimiento y Jardinería",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    title: "Mantenimiento de Jardín de Terraza",
    date: "10 May 2026",
    status: "Completado",
    amountCRC: 20000,
    paymentMethod: "SINPE Móvil",
    ratingGiven: 4,
    invoiceId: "TSK-2026-6102"
  }
];

export const CONDO_ZONES = [
  "Todos los Condominios",
  "Escazú y Santa Ana",
  "Concasa / San Rafael Alajuela",
  "Heredia / GAM",
  "San José Centro",
  "Curridabat y San Pedro"
];
