import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, MapPin, ArrowUpDown, Award, Wrench, Droplet, Zap, 
  Hammer, Paintbrush, Trees, Sparkles, Sliders, X, Check, ShieldCheck 
} from 'lucide-react';
import HandymanCard from '../components/HandymanCard';
import { CATEGORIES, HANDYMEN, CONDO_ZONES } from '../data/mockData';

export default function SearchView({ onSelectHandyman, onQuickBook }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedZone, setSelectedZone] = useState('Todos los Condominios');
  const [sortBy, setSortBy] = useState('rating'); // 'rating', 'price_asc', 'price_desc', 'experience'
  const [showFiltersModal, setShowFiltersModal] = useState(false);

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

  // Filter & Sort Logic using useMemo
  const filteredHandymen = useMemo(() => {
    return HANDYMEN.filter((item) => {
      // Direct search term matching name, specialty, or bio
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.zone.toLowerCase().includes(searchTerm.toLowerCase());

      // Category matching
      const matchesCategory = 
        selectedCategory === 'all' || item.category === selectedCategory;

      // Zone matching
      const matchesZone = 
        selectedZone === 'Todos los Condominios' || item.zone.toLowerCase().includes(selectedZone.toLowerCase());

      return matchesSearch && matchesCategory && matchesZone;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.hourlyRateCRC - b.hourlyRateCRC;
      if (sortBy === 'price_desc') return b.hourlyRateCRC - a.hourlyRateCRC;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      return b.rating - a.rating; // default: highest rating
    });
  }, [searchTerm, selectedCategory, selectedZone, sortBy]);

  return (
    <div className="space-y-4 pb-20">
      
      {/* Search & Immediate Emergency Hero Section */}
      <div className="bg-gradient-to-b from-[#fcf9f8] via-[#f0f7f5] to-[#fcf9f8] dark:from-[#121614] dark:via-[#162b25] dark:to-[#121614] text-[#1c1b1b] dark:text-[#f3f0ef] p-4 pt-3 rounded-b-3xl border-b border-[#e5e2e1] dark:border-[#2e3633] card-shadow transition-colors duration-500">
        <h1 className="text-xl font-black mb-1 leading-tight text-[#1c1b1b] dark:text-white">
          ¿Qué reparación necesitas hoy?
        </h1>
        <p className="text-xs text-[#414846] dark:text-[#a9acaa] mb-3 font-medium">
          Técnicos independientes verificados con pase directo a tu condominio.
        </p>

        {/* Direct Search Bar - Large pill shaped with light background as per DESIGN.md */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-3 text-[#717976] dark:text-[#a9acaa]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Ej: Fuga de agua, instalar lámpara, pintar pared..."
            className="w-full bg-white dark:bg-[#1a201d] text-[#1c1b1b] dark:text-white rounded-full pl-11 pr-10 py-2.5 text-xs font-semibold placeholder:text-[#717976] dark:placeholder:text-[#a9acaa] card-shadow border border-[#c0c8c5] dark:border-[#414846] focus:outline-none focus:ring-2 focus:ring-[#033028] dark:focus:ring-[#e5a93c]"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-3 text-[#717976] dark:text-[#a9acaa] hover:text-[#1c1b1b] dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Categories Horizontal Scroll / Grid */}
      <div className="px-4">
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
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all shrink-0 ${
                  isSelected
                    ? 'bg-white dark:bg-[#1a201d] text-[#033028] dark:text-white border-2 border-[#033028] dark:border-[#e5a93c] shadow-md'
                    : 'bg-white dark:bg-[#1a201d] text-[#414846] dark:text-[#f3f0ef] border border-[#e5e2e1] dark:border-[#2e3633] hover:bg-[#f6f3f2] dark:hover:bg-[#222926]'
                }`}
              >
                <span className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  isSelected ? 'bg-[#f0f7f5] dark:bg-[#162b25] text-[#033028] dark:text-[#e5a93c]' : 'bg-[#f6f3f2] dark:bg-[#222926] text-[#717976] dark:text-[#a9acaa]'
                }`}>
                  {getCategoryIcon(cat.icon)}
                </span>
                <span className="truncate">{cat.name}</span>
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

        {/* Active Filter Indicator & Clear Button (Clean row below selects) */}
        {(selectedCategory !== 'all' || selectedZone !== 'Todos los Condominios' || searchTerm) && (
          <div className="flex items-center justify-between bg-[#f0f7f5] dark:bg-[#162b25] border border-[#c1ebe0] dark:border-[#2e3633] px-3 py-1.5 rounded-xl text-[11px]">
            <div className="flex items-center space-x-1.5 text-[#033028] dark:text-[#a5cfc4] font-medium truncate">
              <Filter className="w-3.5 h-3.5 shrink-0 text-[#e5a93c]" />
              <span className="truncate">
                Filtro: <strong>{selectedCategory !== 'all' ? CATEGORIES.find(c => c.id === selectedCategory)?.name : (searchTerm ? `"${searchTerm}"` : selectedZone)}</strong>
              </span>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedZone('Todos los Condominios');
                setSearchTerm('');
                setSortBy('rating');
              }}
              className="text-[#ba1a1a] dark:text-[#ffb4ab] hover:underline font-extrabold text-[11px] shrink-0 ml-2 flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Limpiar filtros</span>
            </button>
          </div>
        )}
      </div>

      {/* Handymen Results Count & List */}
      <div className="px-4">
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
              onClick={() => {
                setSelectedCategory('all');
                setSelectedZone('Todos los Condominios');
                setSearchTerm('');
              }}
              className="bg-[#033028] dark:bg-[#1e463e] hover:bg-[#1e463e] dark:hover:bg-[#264e45] text-white font-bold text-xs px-4 py-2 rounded-xl"
            >
              Ver Todos los Profesionales
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
