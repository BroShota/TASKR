import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, MapPin, ArrowUpDown, Award, Wrench, Droplet, Zap, 
  Hammer, Paintbrush, Trees, Sparkles, Sliders, X, Check, ShieldCheck,
  Lightbulb, Clock, Calendar, MessageSquare, Phone, Bell, Key, Play
} from 'lucide-react';
import HandymanCard from '../components/HandymanCard';
import DemoTour from '../components/DemoTour';
import { CATEGORIES, HANDYMEN, CONDO_ZONES } from '../data/mockData';
import { semanticSearch, normalize } from '../data/searchDictionary';
import { CLIENT_DEMO_STEPS } from '../data/demoSteps';

export default function SearchView({ citas = [], client, onSelectHandyman, onQuickBook, onOpenChat }) {
  const [showDemo, setShowDemo] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedZone, setSelectedZone] = useState('Todos los Condominios');
  const [sortBy, setSortBy] = useState('rating'); // 'rating', 'price_asc', 'price_desc', 'experience'

  // Category Icon Resolver
  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Droplet': return <Droplet className="w-4 h-4" />;
      case 'Zap': return <Zap className="w-4 h-4" />;
      case 'Hammer': return <Hammer className="w-4 h-4" />;
      case 'Paintbrush': return <Paintbrush className="w-4 h-4" />;
      case 'Trees': return <Trees className="w-4 h-4" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'Sliders': return <Sliders className="w-4 h-4" />;
      default: return <Wrench className="w-4 h-4" />;
    }
  };

  // ── Semantic Search Engine ──────────────────────────────────────
  // Run semantic interpretation on the search term
  const semantic = useMemo(() => {
    if (!searchTerm || searchTerm.trim().length < 2) return null;
    return semanticSearch(searchTerm);
  }, [searchTerm]);

  // Determine effective categories to filter by:
  // 1. If user manually selected a category pill → that wins
  // 2. Otherwise if semantic engine found matches → use those
  // 3. Otherwise → all categories
  const effectiveCategories = useMemo(() => {
    if (selectedCategory !== 'all') return [selectedCategory];
    if (semantic && semantic.categories.length > 0 && semantic.confidence >= 0.2) {
      return semantic.categories;
    }
    return [];
  }, [selectedCategory, semantic]);

  // ── Filter & Sort Logic ──────────────────────────────────────────
  const filteredHandymen = useMemo(() => {
    const normalizedTerm = normalize(searchTerm);

    return HANDYMEN.filter((item) => {
      // Category matching (semantic or manual)
      const matchesCategory =
        effectiveCategories.length === 0 ||
        effectiveCategories.includes(item.category);

      // Zone matching
      const matchesZone =
        selectedZone === 'Todos los Condominios' ||
        item.zone.toLowerCase().includes(selectedZone.toLowerCase());

      // Full-text fallback if no strong semantic match and user typed something
      if (searchTerm && semantic && semantic.confidence < 0.2) {
        const matchesText =
          normalize(item.name).includes(normalizedTerm) ||
          normalize(item.specialty).includes(normalizedTerm) ||
          normalize(item.bio).includes(normalizedTerm) ||
          normalize(item.zone).includes(normalizedTerm);
        return matchesText && matchesZone;
      }

      return matchesCategory && matchesZone;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.hourlyRateCRC - b.hourlyRateCRC;
      if (sortBy === 'price_desc') return b.hourlyRateCRC - a.hourlyRateCRC;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      return b.rating - a.rating; // default: highest rating
    });
  }, [searchTerm, effectiveCategories, selectedZone, sortBy, semantic]);

  // When the user clicks a category chip in the semantic banner → apply it
  const handleSemanticCategoryClick = (catId) => {
    setSelectedCategory(catId);
    setSearchTerm('');
  };

  // Clear everything
  const clearAll = () => {
    setSelectedCategory('all');
    setSelectedZone('Todos los Condominios');
    setSearchTerm('');
    setSortBy('rating');
  };

  // Get active upcoming cita for client
  const activeUpcomingCita = useMemo(() => {
    if (!citas || citas.length === 0) return null;
    return citas.find(c => c.status !== 'Completada' && c.status !== 'Cancelada') || null;
  }, [citas]);

  return (
    <div className="space-y-4 pb-20">
      
      {/* UPCOMING APPOINTMENT REMINDER CARD (Pantalla Principal) */}
      {activeUpcomingCita && (
        <div className="mx-4 mt-3 bg-gradient-to-r from-[#033028] via-[#122b25] to-[#033028] text-white rounded-3xl p-4 shadow-xl border border-[#e5a93c]/30 relative overflow-hidden animate-fade-in">
          {/* Shine Effect */}
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#e5a93c]/20 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-center justify-between mb-2 relative z-10">
            <div className="flex items-center space-x-1.5 text-xs font-black text-[#e5a93c] uppercase tracking-wider">
              <Bell className="w-4 h-4 animate-bounce" />
              <span>Cita Más Cercana • Recordatorio</span>
            </div>
            <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border shadow-xs ${
              activeUpcomingCita.status === 'Pendiente'
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
            }`}>
              {activeUpcomingCita.status || 'Confirmada'}
            </span>
          </div>

          <div className="space-y-1.5 relative z-10">
            <h3 className="font-black text-base leading-tight text-white">
              {activeUpcomingCita.serviceTitle || 'Servicio de Mantenimiento'}
            </h3>
            <p className="text-xs text-[#a5cfc4] font-medium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#e5a93c]" />
              <span>{activeUpcomingCita.scheduledDate} a las <strong>{activeUpcomingCita.scheduledTime}</strong></span>
            </p>
            <p className="text-xs text-[#a5cfc4] font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#e5a93c]" />
              <span>Técnico: <strong>{activeUpcomingCita.assignedHandymanName || 'Mario Jiménez (Asignado)'}</strong></span>
            </p>

            {/* PIN DE SEGURIDAD PARA CONFIRMAR LLEGADA */}
            <div className="mt-2.5 bg-white/10 backdrop-blur-md rounded-2xl p-2.5 border border-white/20 flex items-center justify-between">
              <div>
                <span className="text-[9px] uppercase font-bold text-[#e5a93c] block">PIN de Seguridad de Llegada</span>
                <span className="text-[10px] text-white/80 block">Dicta este PIN al técnico al tocar tu puerta</span>
              </div>
              <div className="font-mono text-lg font-black tracking-widest text-[#e5a93c] bg-black/40 px-3 py-1 rounded-xl border border-[#e5a93c]/50">
                {activeUpcomingCita.passCode ? activeUpcomingCita.passCode.slice(-4) : '4819'}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2 pt-2">
              <button
                onClick={() => onOpenChat && onOpenChat(HANDYMEN[0])}
                className="flex-1 bg-[#e5a93c] hover:bg-[#fdbe50] text-[#1c1b1b] font-black py-2 rounded-xl text-xs flex items-center justify-center space-x-1 shadow-sm transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat con Técnico</span>
              </button>
              <a
                href="tel:+50688449911"
                className="bg-white/15 hover:bg-white/25 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center space-x-1 border border-white/20"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Llamar</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Search & Immediate Emergency Hero Section */}

      <div id="demo-client-search" className="bg-gradient-to-b from-[#fcf9f8] via-[#f0f7f5] to-[#fcf9f8] dark:from-[#121614] dark:via-[#162b25] dark:to-[#121614] text-[#1c1b1b] dark:text-[#f3f0ef] p-4 pt-3 rounded-b-3xl border-b border-[#e5e2e1] dark:border-[#2e3633] card-shadow transition-colors duration-500">
        <h1 className="text-xl font-black mb-1 leading-tight text-[#1c1b1b] dark:text-white">
          ¿Qué reparación necesitas hoy?
        </h1>
        <p className="text-xs text-[#414846] dark:text-[#a9acaa] mb-3 font-medium">
          Describe el problema con tus propias palabras — nosotros encontramos al especialista.
        </p>

        {/* Smart Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-3 text-[#717976] dark:text-[#a9acaa]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (selectedCategory !== 'all') {
                setSelectedCategory('all');
              }
            }}
            placeholder='Ej: "el microondas malo", "se fue la luz", "tubo roto"...'
            className="w-full bg-white dark:bg-[#1a201d] text-[#1c1b1b] dark:text-white rounded-full pl-11 pr-10 py-2.5 text-xs font-semibold placeholder:text-[#717976] dark:placeholder:text-[#a9acaa] card-shadow border border-[#c0c8c5] dark:border-[#414846] focus:outline-none focus:ring-2 focus:ring-[#033028] dark:focus:ring-[#e5a93c]"
          />
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="absolute right-3 top-3 text-[#717976] dark:text-[#a9acaa] hover:text-[#1c1b1b] dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* ── Semantic Interpretation Banner ── */}
        {semantic && semantic.interpreted && semantic.confidence >= 0.2 && selectedCategory === 'all' && (
          <div className="mt-3 bg-[#f0f7f5] dark:bg-[#162b25] border border-[#b5dfd0] dark:border-[#2e3633] rounded-2xl px-3 py-2.5 flex items-start gap-2 animate-fadeIn">
            <Lightbulb className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#e5a93c]" />
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-[#033028] dark:text-[#a5cfc4] mb-1.5">
                {semantic.interpreted}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {semantic.categories.map(catId => {
                  const cat = CATEGORIES.find(c => c.id === catId);
                  if (!cat) return null;
                  return (
                    <button
                      key={catId}
                      onClick={() => handleSemanticCategoryClick(catId)}
                      className="text-[10px] font-extrabold bg-[#033028] dark:bg-[#1e463e] text-white px-2.5 py-1 rounded-full hover:bg-[#1e463e] dark:hover:bg-[#264e45] transition-colors"
                    >
                      Ver solo {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}



        {/* Low confidence fallback notice */}
        {searchTerm.length > 3 && semantic && semantic.confidence < 0.2 && (
          <div className="mt-3 bg-[#fff8ed] dark:bg-[#2a1f10] border border-[#f5c77a] dark:border-[#5c3d1a] rounded-2xl px-3 py-2 flex items-center gap-2">
            <Search className="w-3.5 h-3.5 shrink-0 text-[#e5a93c]" />
            <p className="text-[11px] font-semibold text-[#7a4f00] dark:text-[#f0c97a]">
              Buscando "<strong>{searchTerm}</strong>" en nombre y especialidad...
            </p>
          </div>
        )}
      </div>

      {/* Main Categories Horizontal Scroll */}
      <div id="demo-client-categories" className="px-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-black uppercase tracking-wider text-[#414846] dark:text-[#a9acaa]">
            Categorías de Servicio
          </h2>
          <span className="text-[11px] font-bold text-[#033028] dark:text-[#a5cfc4]">
            {CATEGORIES.length - 1} Disponibles
          </span>
        </div>

        <div className="flex items-center space-x-2.5 overflow-x-auto no-scrollbar py-2.5 px-0.5 min-h-[56px]">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            // Highlight a category if semantic engine matched it
            const isSemanticMatch =
              selectedCategory === 'all' &&
              semantic &&
              semantic.confidence >= 0.2 &&
              semantic.categories.includes(cat.id);

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all shrink-0 ${
                  isSelected
                    ? 'bg-white dark:bg-[#1a201d] text-[#033028] dark:text-white border-2 border-[#033028] dark:border-[#e5a93c] shadow-md'
                    : isSemanticMatch
                    ? 'bg-[#f0f7f5] dark:bg-[#162b25] text-[#033028] dark:text-[#a5cfc4] border-2 border-dashed border-[#6bbea5] dark:border-[#3d7a68] shadow-sm'
                    : 'bg-white dark:bg-[#1a201d] text-[#414846] dark:text-[#f3f0ef] border border-[#e5e2e1] dark:border-[#2e3633] hover:bg-[#f6f3f2] dark:hover:bg-[#222926]'
                }`}
              >
                <span className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-[#f0f7f5] dark:bg-[#162b25] text-[#033028] dark:text-[#e5a93c]'
                    : isSemanticMatch
                    ? 'bg-[#dff0ea] dark:bg-[#1e3d35] text-[#033028] dark:text-[#a5cfc4]'
                    : 'bg-[#f6f3f2] dark:bg-[#222926] text-[#717976] dark:text-[#a9acaa]'
                }`}>
                  {getCategoryIcon(cat.icon)}
                </span>
                <span className="truncate">{cat.name}</span>
                {isSemanticMatch && (
                  <span className="w-1.5 h-1.5 bg-[#e5a93c] rounded-full shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Filters & Sorting Bar */}
      <div className="px-4 space-y-2">
        <div className="flex items-center gap-2">
          {/* Zone Selector Pill */}
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="flex-1 min-w-0 bg-white dark:bg-[#1a201d] border border-[#c0c8c5] dark:border-[#414846] rounded-xl px-2.5 py-2 font-bold text-[#1c1b1b] dark:text-white text-[11px] focus:outline-none focus:ring-2 focus:ring-[#033028] shadow-xs truncate cursor-pointer"
          >
            {CONDO_ZONES.map((z) => (
              <option key={z} value={z}>{z}</option>
            ))}
          </select>

          {/* Sort Pill */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="flex-1 min-w-0 bg-white dark:bg-[#1a201d] border border-[#c0c8c5] dark:border-[#414846] rounded-xl px-2.5 py-2 font-bold text-[#1c1b1b] dark:text-white text-[11px] focus:outline-none focus:ring-2 focus:ring-[#033028] shadow-xs truncate cursor-pointer"
          >
            <option value="rating">★ Mejor Calificados</option>
            <option value="price_asc">₡ Precio: Menor a Mayor</option>
            <option value="price_desc">₡ Precio: Mayor a Menor</option>
            <option value="experience">⏱ Mayor Experiencia</option>
          </select>
        </div>

        {/* Active Filter Indicator & Clear Button */}
        {(selectedCategory !== 'all' || selectedZone !== 'Todos los Condominios' || searchTerm) && (
          <div className="flex items-center justify-between bg-[#f0f7f5] dark:bg-[#162b25] border border-[#c1ebe0] dark:border-[#2e3633] px-3 py-1.5 rounded-xl text-[11px]">
            <div className="flex items-center space-x-1.5 text-[#033028] dark:text-[#a5cfc4] font-medium truncate">
              <Filter className="w-3.5 h-3.5 shrink-0 text-[#e5a93c]" />
              <span className="truncate">
                Filtro: <strong>
                  {selectedCategory !== 'all'
                    ? CATEGORIES.find(c => c.id === selectedCategory)?.name
                    : searchTerm
                    ? `"${searchTerm}"`
                    : selectedZone}
                </strong>
              </span>
            </div>
            <button
              onClick={clearAll}
              className="text-[#ba1a1a] dark:text-[#ffb4ab] hover:underline font-extrabold text-[11px] shrink-0 ml-2 flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Limpiar filtros</span>
            </button>
          </div>
        )}
      </div>

      {/* Handymen Results Count & List */}
      <div id="demo-client-results" className="px-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-[#414846] dark:text-[#a9acaa] font-semibold">
            Mostrando <strong className="text-[#1c1b1b] dark:text-white font-black">{filteredHandymen.length}</strong> profesionales verificados
          </p>
          <span className="text-[10px] bg-[#f0f7f5] dark:bg-[#162b25] text-[#033028] dark:text-[#a5cfc4] border border-[#c1ebe0] dark:border-[#2e3633] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#e5a93c]" />
            Condominios Costa Rica
          </span>
        </div>

        {filteredHandymen.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredHandymen.map((handyman) => (
              <HandymanCard
                key={handyman.id}
                handyman={handyman}
                onSelect={onSelectHandyman}
                onQuickBook={onQuickBook}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-[#1a201d] rounded-2xl p-8 text-center border border-[#e5e2e1] dark:border-[#2e3633] card-shadow space-y-3">
            <div className="w-12 h-12 bg-[#f6f3f2] dark:bg-[#222926] text-[#717976] dark:text-[#a9acaa] rounded-full flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-[#1c1b1b] dark:text-white text-sm">No se encontraron profesionales</h3>
            <p className="text-xs text-[#414846] dark:text-[#a9acaa] max-w-xs mx-auto">
              Intenta cambiar la categoría o los filtros de búsqueda para ver más especialistas en tu zona.
            </p>
            <button
              onClick={clearAll}
              className="bg-[#033028] dark:bg-[#1e463e] hover:bg-[#1e463e] dark:hover:bg-[#264e45] text-white font-bold text-xs px-4 py-2 rounded-xl"
            >
              Ver Todos los Profesionales
            </button>
          </div>
        )}
      </div>

      {showDemo && (
        <DemoTour
          steps={CLIENT_DEMO_STEPS}
          roleName="Residente"
          roleEmoji="📱"
          onClose={() => setShowDemo(false)}
        />
      )}

      {!showDemo && (
        <button
          onClick={() => setShowDemo(true)}
          className="fixed bottom-24 right-4 z-40 bg-[#e5a93c] hover:bg-[#fdbe50] text-[#1c1b1b] font-black py-3 px-5 rounded-2xl text-xs shadow-xl flex items-center space-x-2 transition-all transform active:scale-95 border border-[#e5a93c]/50"
          style={{ animation: 'pulse 2s infinite' }}
        >
          <Play className="w-4 h-4" />
          <span>▶ Ver Demo</span>
        </button>
      )}

    </div>
  );
}
