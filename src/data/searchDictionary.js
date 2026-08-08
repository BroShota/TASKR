/**
 * TASKR — Diccionario Semántico de Búsqueda Inteligente
 * 
 * Mapea términos del lenguaje cotidiano costarricense a categorías de servicio.
 * 
 * Estrategia:
 *  1. Se extraen todas las palabras clave del query del usuario.
 *  2. Cada palabra se compara contra este mapa (con normalización de tildes).
 *  3. Se acumula un "score" por categoría según cuántas palabras hacen match.
 *  4. Se filtra por la(s) categoría(s) con mayor score.
 *  5. Si no hay match semántico, se hace búsqueda full-text como fallback.
 */

// Normalizador: quita tildes, minúsculas, caracteres especiales
export function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quita tildes
    .replace(/[^a-z0-9\s]/g, '')    // quita caracteres especiales
    .trim();
}

// Tokenizador: separa la frase en palabras individuales (>= 3 letras)
export function tokenize(text) {
  return normalize(text)
    .split(/\s+/)
    .filter(w => w.length >= 3);
}

/**
 * Mapa principal: palabra clave → categoría(s) de servicio.
 * Cada entrada puede apuntar a una o varias categorías con un peso relativo.
 */
export const SEMANTIC_MAP = {

  // ══════════════════════════════════════════════════════════════════
  // 💧 PLOMERÍA — Plumbing
  // ══════════════════════════════════════════════════════════════════
  'pila':           ['plumbing'],
  'pilas':          ['plumbing'],
  'fregadero':      ['plumbing'],
  'lavatorio':      ['plumbing'],
  'lavamanos':      ['plumbing'],
  'lavaplatos':     ['plumbing'],
  'bano':           ['plumbing'],
  'banera':         ['plumbing'],
  'tina':           ['plumbing'],
  'banadera':       ['plumbing'],
  'ducha':          ['plumbing'],
  'regadera':       ['plumbing'],
  'cabezal':        ['plumbing'],
  'inodoro':        ['plumbing'],
  'sanitario':      ['plumbing'],
  'excusado':       ['plumbing'],
  'poceta':         ['plumbing'],
  'tuberia':        ['plumbing'],
  'tubo':           ['plumbing'],
  'tubos':          ['plumbing'],
  'fuga':           ['plumbing'],
  'fugas':          ['plumbing'],
  'goteo':          ['plumbing'],
  'gotera':         ['plumbing'],
  'goteras':        ['plumbing'],
  'gotea':          ['plumbing'],
  'pierde':         ['plumbing'],
  'chorrear':       ['plumbing'],
  'chorrea':        ['plumbing'],
  'chorreo':        ['plumbing'],
  'agua':           ['plumbing'],
  'aguas':          ['plumbing'],
  'desague':        ['plumbing'],
  'drenaje':        ['plumbing'],
  'alcantarilla':   ['plumbing'],
  'desaguadero':    ['plumbing'],
  'atascado':       ['plumbing'],
  'atasco':         ['plumbing'],
  'taponado':       ['plumbing'],
  'tapon':          ['plumbing'],
  'obstruido':      ['plumbing'],
  'obstruccion':    ['plumbing'],
  'bloqueado':      ['plumbing'],
  'grifo':          ['plumbing'],
  'llave':          ['plumbing', 'locksmith'],
  'mezcladora':     ['plumbing'],
  'manguera':       ['plumbing'],
  'bomba':          ['plumbing'],
  'presion':        ['plumbing'],
  'tanque':         ['plumbing'],
  'termocalefon':   ['plumbing'],
  'calentador':     ['plumbing'],
  'calefon':        ['plumbing'],
  'paso':           ['plumbing'],
  'registro':       ['plumbing'],
  'sifon':          ['plumbing'],
  'filtro':         ['plumbing', 'maintenance'],
  'cano':           ['plumbing'],
  'caano':          ['plumbing'],
  'valvula':        ['plumbing'],
  'sellante':       ['plumbing'],
  'cisterna':       ['plumbing'],
  'pozo':           ['plumbing'],
  'humedo':         ['plumbing', 'painting'],
  'humedad':        ['plumbing', 'painting'],
  'mojado':         ['plumbing'],
  'infiltracion':   ['plumbing'],
  'cano':           ['plumbing'],
  'losa':           ['plumbing', 'remodeling'],

  // ══════════════════════════════════════════════════════════════════
  // ⚡ ELECTRICIDAD — Electricity
  // ══════════════════════════════════════════════════════════════════
  'luz':            ['electricity'],
  'luces':          ['electricity'],
  'bombillo':       ['electricity'],
  'bombillos':      ['electricity'],
  'foco':           ['electricity'],
  'focos':          ['electricity'],
  'led':            ['electricity'],
  'lampara':        ['electricity'],
  'lamparas':       ['electricity'],
  'interruptor':    ['electricity'],
  'apagador':       ['electricity'],
  'enchufe':        ['electricity'],
  'enchufes':       ['electricity'],
  'tomacorriente':  ['electricity'],
  'toma':           ['electricity'],
  'cable':          ['electricity'],
  'cables':         ['electricity'],
  'cableado':       ['electricity'],
  'instalacion':    ['electricity', 'maintenance'],
  'instalar':       ['electricity', 'maintenance'],
  'breaker':        ['electricity'],
  'breakers':       ['electricity'],
  'tablero':        ['electricity'],
  'panel':          ['electricity'],
  'cortocircuito':  ['electricity'],
  'corto':          ['electricity'],
  'apagon':         ['electricity'],
  'voltaje':        ['electricity'],
  'amperaje':       ['electricity'],
  'tierra':         ['electricity'],
  'polo':           ['electricity'],
  'generador':      ['electricity'],
  'planta':         ['electricity'],
  'inversor':       ['electricity'],
  'transformador':  ['electricity'],
  'electricidad':   ['electricity'],
  'electrico':      ['electricity'],
  'chispas':        ['electricity'],
  'chispa':         ['electricity'],
  'quemado':        ['electricity'],
  'quemada':        ['electricity'],
  'fallo':          ['electricity', 'maintenance'],
  'caliente':       ['electricity'],
  'sobrecarga':     ['electricity'],
  'trabo':          ['electricity'],
  'alarma':         ['electricity', 'locksmith'],
  'sensor':         ['electricity'],
  'domostica':      ['electricity'],
  'domotica':       ['electricity'],
  'smart':          ['electricity'],
  'automatizacion': ['electricity'],
  'camara':         ['electricity', 'locksmith'],
  'cctv':           ['electricity', 'locksmith'],
  'ventilador':     ['electricity'],
  'extractor':      ['electricity'],
  'aire':           ['electricity', 'maintenance'],
  'abanico':        ['electricity'],
  'microondas':     ['electricity'],
  'horno':          ['electricity'],
  'estufa':         ['electricity', 'plumbing'],
  'cocina':         ['electricity', 'plumbing'],
  'nevera':         ['electricity'],
  'refrigeradora':  ['electricity'],
  'lavadora':       ['electricity'],
  'secadora':       ['electricity'],
  'electrodomestico': ['electricity'],
  'aparato':        ['electricity'],
  'televisor':      ['electricity'],
  'television':     ['electricity'],

  // ══════════════════════════════════════════════════════════════════
  // 🔑 CERRAJERÍA — Locksmith
  // ══════════════════════════════════════════════════════════════════
  'cerradura':      ['locksmith'],
  'cerraduras':     ['locksmith'],
  'candado':        ['locksmith'],
  'candados':       ['locksmith'],
  'cerrojo':        ['locksmith'],
  'seguro':         ['locksmith'],
  'portero':        ['locksmith'],
  'portero':        ['locksmith'],
  'biometrico':     ['locksmith'],
  'digital':        ['locksmith'],
  'electronico':    ['locksmith'],
  'puerta':         ['locksmith', 'remodeling'],
  'porton':         ['locksmith', 'remodeling'],
  'reja':           ['locksmith', 'remodeling'],
  'rejas':          ['locksmith', 'remodeling'],
  'verja':          ['locksmith'],
  'acceso':         ['locksmith'],
  'tag':            ['locksmith'],
  'tarjeta':        ['locksmith'],
  'control':        ['locksmith', 'electricity'],
  'chapa':          ['locksmith'],
  'chapas':         ['locksmith'],
  'perdida':        ['locksmith'],
  'perdido':        ['locksmith'],
  'atascada':       ['locksmith', 'remodeling'],
  'pegada':         ['locksmith', 'remodeling'],
  'cambiar llave':  ['locksmith'],
  'rota':           ['locksmith', 'remodeling'],
  'roto':           ['locksmith', 'remodeling'],
  'duplicado':      ['locksmith'],
  'copiar':         ['locksmith'],
  'abrir':          ['locksmith'],
  'bloqueada':      ['locksmith'],
  'seguridad':      ['locksmith'],
  'interfon':       ['locksmith', 'electricity'],
  'intercomunicador': ['locksmith', 'electricity'],
  'apertura':       ['locksmith'],
  'caja':           ['locksmith'],
  'fuerte':         ['locksmith'],
  'vehiculo':       ['locksmith'],
  'carro':          ['locksmith'],
  'auto':           ['locksmith'],
  'garage':         ['locksmith', 'remodeling'],

  // ══════════════════════════════════════════════════════════════════
  // 🔨 REMODELACIÓN — Remodeling & Carpentry
  // ══════════════════════════════════════════════════════════════════
  'madera':         ['remodeling'],
  'maderas':        ['remodeling'],
  'ventana':        ['remodeling'],
  'ventanas':       ['remodeling'],
  'mueble':         ['remodeling'],
  'muebles':        ['remodeling'],
  'piso':           ['remodeling'],
  'pisos':          ['remodeling'],
  'ceramica':       ['remodeling'],
  'ceramicas':      ['remodeling'],
  'azulejo':        ['remodeling'],
  'azulejos':       ['remodeling'],
  'techo':          ['remodeling'],
  'techos':         ['remodeling'],
  'cielo':          ['remodeling'],
  'cielo raso':     ['remodeling'],
  'tabla':          ['remodeling'],
  'bisagra':        ['remodeling'],
  'cajones':        ['remodeling'],
  'cajon':          ['remodeling'],
  'closet':         ['remodeling'],
  'armario':        ['remodeling'],
  'repisa':         ['remodeling'],
  'estante':        ['remodeling'],
  'pared':          ['remodeling', 'painting'],
  'paredes':        ['remodeling', 'painting'],
  'zocalo':         ['remodeling'],
  'porcelanato':    ['remodeling'],
  'loseta':         ['remodeling'],
  'baldosa':        ['remodeling'],
  'repello':        ['remodeling', 'painting'],
  'gypsum':         ['remodeling'],
  'drywall':        ['remodeling'],
  'tabique':        ['remodeling'],
  'demoler':        ['remodeling'],
  'derribar':       ['remodeling'],
  'instalar piso':  ['remodeling'],
  'lamina':         ['remodeling'],
  'cubierta':       ['remodeling'],
  'columna':        ['remodeling'],
  'concreto':       ['remodeling'],
  'bloque':         ['remodeling'],
  'ladrillo':       ['remodeling'],
  'arena':          ['remodeling'],
  'mezcla':         ['remodeling'],
  'cemento':        ['remodeling'],
  'soldadura':      ['remodeling'],
  'soldador':       ['remodeling'],

  // ══════════════════════════════════════════════════════════════════
  // 🎨 PINTURA — Painting
  // ══════════════════════════════════════════════════════════════════
  'pintura':        ['painting'],
  'pintar':         ['painting'],
  'pintada':        ['painting'],
  'pincel':         ['painting'],
  'rodillo':        ['painting'],
  'color':          ['painting'],
  'mancha':         ['painting'],
  'manchas':        ['painting'],
  'barniz':         ['painting'],
  'laca':           ['painting'],
  'esmalte':        ['painting'],
  'sellador':       ['painting'],
  'anticorrosivo':  ['painting'],
  'base':           ['painting'],
  'acabado':        ['painting'],
  'textura':        ['painting'],
  'decoloracion':   ['painting'],
  'descascarando':  ['painting'],
  'descascarada':   ['painting'],
  'despintada':     ['painting'],
  'desportillada':  ['painting'],

  // ══════════════════════════════════════════════════════════════════
  // 🌿 JARDINERÍA — Gardening
  // ══════════════════════════════════════════════════════════════════
  'jardin':         ['gardening'],
  'jardines':       ['gardening'],
  'zacate':         ['gardening'],
  'cesped':         ['gardening'],
  'pasto':          ['gardening'],
  'grama':          ['gardening'],
  'cortar':         ['gardening'],
  'poda':           ['gardening'],
  'podar':          ['gardening'],
  'arbol':          ['gardening'],
  'arboles':        ['gardening'],
  'planta':         ['gardening'],
  'plantas':        ['gardening'],
  'maleza':         ['gardening'],
  'monte':          ['gardening'],
  'malas hierbas':  ['gardening'],
  'hojas':          ['gardening'],
  'ramas':          ['gardening'],
  'raiz':           ['gardening'],
  'raices':         ['gardening'],
  'abono':          ['gardening'],
  'fertilizante':   ['gardening'],
  'riego':          ['gardening'],
  'irrigation':     ['gardening'],
  'palma':          ['gardening'],
  'palmera':        ['gardening'],
  'helecho':        ['gardening'],
  'flor':           ['gardening'],
  'flores':         ['gardening'],
  'sembrar':        ['gardening'],
  'transplante':    ['gardening'],
  'tierra':         ['gardening'],
  'suelo':          ['gardening'],
  'patio':          ['gardening', 'cleaning'],
  'exterior':       ['gardening', 'cleaning'],
  'teraza':         ['gardening', 'cleaning'],
  'terraza':        ['gardening', 'cleaning'],

  // ══════════════════════════════════════════════════════════════════
  // ✨ LIMPIEZA — Cleaning
  // ══════════════════════════════════════════════════════════════════
  'limpieza':       ['cleaning'],
  'limpiar':        ['cleaning'],
  'suciedad':       ['cleaning'],
  'sucio':          ['cleaning'],
  'sucia':          ['cleaning'],
  'mugre':          ['cleaning'],
  'desinfeccion':   ['cleaning'],
  'desinfectar':    ['cleaning'],
  'higiene':        ['cleaning'],
  'desinfectante':  ['cleaning'],
  'cloro':          ['cleaning'],
  'detergente':     ['cleaning'],
  'escoba':         ['cleaning'],
  'trapeador':      ['cleaning'],
  'pacha':          ['cleaning'],
  'aseo':           ['cleaning'],
  'polvo':          ['cleaning'],
  'grasa':          ['cleaning'],
  'residuos':       ['cleaning'],
  'basura':         ['cleaning'],
  'vidrios':        ['cleaning'],
  'ventanas limpias': ['cleaning'],
  'alfombra':       ['cleaning'],
  'cortinas':       ['cleaning'],
  'muebles sucios': ['cleaning'],
  'cocina sucia':   ['cleaning'],
  'bano sucio':     ['cleaning'],
  'deep clean':     ['cleaning'],
  'limpieza profunda': ['cleaning'],
  'mudanza':        ['cleaning'],
  'post construccion': ['cleaning'],
  'estrato':        ['cleaning'],
  'hongos':         ['cleaning', 'plumbing'],
  'moho':           ['cleaning', 'plumbing'],

  // ══════════════════════════════════════════════════════════════════
  // 🔧 MANTENIMIENTO GENERAL — General Maintenance
  // ══════════════════════════════════════════════════════════════════
  'revision':       ['maintenance'],
  'revisar':        ['maintenance'],
  'reparacion':     ['maintenance'],
  'reparar':        ['maintenance'],
  'arreglo':        ['maintenance'],
  'arreglar':       ['maintenance'],
  'compostura':     ['maintenance'],
  'servicio':       ['maintenance'],
  'mantenimiento':  ['maintenance'],
  'preventivo':     ['maintenance'],
  'inspeccion':     ['maintenance'],
  'diagnostico':    ['maintenance'],
  'averia':         ['maintenance'],
  'falla':          ['maintenance'],
  'problema':       ['maintenance'],
  'dano':           ['maintenance'],
  'danado':         ['maintenance'],
  'urgente':        ['maintenance'],
  'emergencia':     ['maintenance'],
  'rapido':         ['maintenance'],
  'ya':             ['maintenance'],
  'inmediato':      ['maintenance'],
  'urgencia':       ['maintenance'],
  'hoy':            ['maintenance'],
  'ahora':          ['maintenance'],
  'grieta':         ['maintenance', 'remodeling'],
  'fisura':         ['maintenance', 'remodeling'],
  'rajadura':       ['maintenance', 'remodeling'],
  'oxidado':        ['maintenance'],
  'oxido':          ['maintenance'],
  'corrosion':      ['maintenance'],
  'viejo':          ['maintenance'],
  'antiguo':        ['maintenance'],
  'desgastado':     ['maintenance'],
  'ruido':          ['maintenance'],
  'ruidos':         ['maintenance'],
  'vibra':          ['maintenance'],
  'zumba':          ['maintenance'],
  'olor':           ['maintenance', 'plumbing'],
  'hedor':          ['maintenance', 'plumbing'],
  'feo':            ['maintenance'],
  'malo':           ['maintenance'],
  'mala':           ['maintenance'],
  'danar':          ['maintenance'],
  'chocado':        ['maintenance'],
  'accidente':      ['maintenance'],

  // ══════════════════════════════════════════════════════════════════
  // 🇨🇷 JERGA COSTARRICENSE — Costa Rican Slang Mappings
  // ══════════════════════════════════════════════════════════════════
  'mae':            ['maintenance'],      // "mae el tubo exploto"
  'diay':           ['maintenance'],      // "diay que feo"
  'chunche':        ['maintenance'],      // aparato/objeto roto
  'chunches':       ['maintenance'],
  'traste':         ['plumbing'],         // fregadero/pila
  'trastes':        ['plumbing'],
  'pacha':          ['cleaning'],         // coloquial para cubo
  'zacatal':        ['gardening'],
  'zacatear':       ['gardening'],
  'jalar':          ['plumbing'],         // "el inodoro no jala"
  'jala':           ['plumbing'],         // "ya no jala bien"
  'pachanga':       ['maintenance'],
  'guaro':          ['cleaning'],
  'cacharro':       ['maintenance'],      // aparato viejo
  'cacharros':      ['maintenance'],
  'vara':           ['maintenance'],      // "hay una vara rara"
  'suave':          ['maintenance'],
};

/**
 * Motor de búsqueda semántica principal.
 * 
 * @param {string} query - El texto que escribió el usuario
 * @returns {{ categories: string[], confidence: number, interpreted: string }} - 
 *   categories: array de IDs de categoría a filtrar
 *   confidence: número entre 0 y 1 indicando certeza del match
 *   interpreted: texto amigable de la interpretación ("Entendemos: Plomería")
 */
export function semanticSearch(query) {
  if (!query || query.trim().length < 2) {
    return { categories: [], confidence: 0, interpreted: null };
  }

  const tokens = tokenize(query);
  if (tokens.length === 0) {
    return { categories: [], confidence: 0, interpreted: null };
  }

  // Acumular scores por categoría
  const scores = {};

  for (const token of tokens) {
    // Búsqueda exacta
    if (SEMANTIC_MAP[token]) {
      for (const cat of SEMANTIC_MAP[token]) {
        scores[cat] = (scores[cat] || 0) + 2;
      }
      continue;
    }

    // Búsqueda parcial (el token está contenido dentro de una clave)
    for (const [key, cats] of Object.entries(SEMANTIC_MAP)) {
      if (key.includes(token) || token.includes(key)) {
        for (const cat of cats) {
          scores[cat] = (scores[cat] || 0) + 1;
        }
      }
    }
  }

  if (Object.keys(scores).length === 0) {
    return { categories: [], confidence: 0, interpreted: null };
  }

  // Encontrar el score máximo
  const maxScore = Math.max(...Object.values(scores));
  // Retornar todas las categorías que estén al 60% del score máximo
  const threshold = maxScore * 0.6;
  const matchedCategories = Object.entries(scores)
    .filter(([, score]) => score >= threshold)
    .sort(([, a], [, b]) => b - a)
    .map(([cat]) => cat);

  const confidence = Math.min(maxScore / (tokens.length * 2), 1);

  // Textos interpretativos amigables por categoría
  const categoryLabels = {
    plumbing:     '💧 Plomería',
    electricity:  '⚡ Electricidad',
    locksmith:    '🔑 Cerrajería',
    remodeling:   '🔨 Remodelación',
    painting:     '🎨 Pintura',
    gardening:    '🌿 Jardinería',
    cleaning:     '✨ Limpieza',
    maintenance:  '🔧 Mantenimiento',
  };

  const labels = matchedCategories.map(c => categoryLabels[c] || c).join(' • ');
  const interpreted = labels
    ? `Entendemos: ${labels}`
    : null;

  return { categories: matchedCategories, confidence, interpreted };
}
