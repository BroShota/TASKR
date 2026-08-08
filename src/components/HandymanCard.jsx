import React from 'react';
import { Star, ShieldCheck, MapPin, Clock, Wrench, ChevronRight, Zap } from 'lucide-react';

export default function HandymanCard({ handyman, onSelect, onQuickBook }) {
  const formatCRC = (amount) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white dark:bg-[#1a201d] rounded-2xl p-4 card-shadow hover:card-shadow-hover border border-[#e5e2e1] dark:border-[#2e3633] transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
      {/* Top Banner Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#033028] via-[#1e463e] to-[#e5a93c]"></div>

      <div>
        {/* Profile Info Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={handyman.avatar}
                alt={handyman.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-[#c1ebe0] dark:border-[#3e665d] shadow-sm"
              />
              {handyman.condoSpecialist && (
                <span title="Especialista en Condominios" className="absolute -bottom-1 -right-1 bg-[#033028] dark:bg-[#1e463e] text-[#e5a93c] rounded-full p-0.5 border-2 border-white dark:border-[#1a201d] shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="font-bold text-[#1c1b1b] dark:text-white text-base group-hover:text-[#033028] dark:group-hover:text-[#a5cfc4] transition-colors">
                  {handyman.name}
                </h3>
              </div>

              <p className="text-xs font-bold text-[#033028] dark:text-[#a5cfc4] bg-[#f0f7f5] dark:bg-[#162b25] px-2 py-0.5 rounded-full inline-block mt-0.5">
                {handyman.specialty}
              </p>

              {/* Rating & Reviews */}
              <div className="flex items-center space-x-1 text-xs text-[#414846] dark:text-[#a9acaa] mt-1">
                <div className="flex items-center text-[#7e5700] dark:text-[#fdbe50] font-extrabold">
                  <Star className="w-3.5 h-3.5 fill-[#e5a93c] text-[#e5a93c] mr-0.5" />
                  <span>{handyman.rating.toFixed(1)}</span>
                </div>
                <span className="text-[#c0c8c5] dark:text-[#414846]">•</span>
                <span className="text-[#414846] dark:text-[#a9acaa] font-medium">({handyman.reviewsCount} reseñas)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {handyman.badges.map((badge, idx) => (
            <span
              key={idx}
              className={`text-[10px] font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                badge.includes('SINPE')
                  ? 'bg-blue-50 dark:bg-[#132238] text-blue-800 dark:text-[#93c5fd] border-blue-200 dark:border-[#1e3a8a]'
                  : badge.includes('Top')
                  ? 'bg-[#fef8ec] dark:bg-[#332408] text-[#714d00] dark:text-[#fdbe50] border-[#fdbe50] dark:border-[#714d00]'
                  : 'bg-[#f0f7f5] dark:bg-[#162b25] text-[#033028] dark:text-[#a5cfc4] border-[#c1ebe0] dark:border-[#2e3633]'
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              {badge}
            </span>
          ))}
        </div>

        {/* Info Grid: Experience, Zone & Rate */}
        <div className="bg-[#f6f3f2] dark:bg-[#222926] rounded-xl p-2.5 space-y-1.5 text-xs text-[#1c1b1b] dark:text-[#f3f0ef] mb-3 border border-[#e5e2e1] dark:border-[#2e3633]">
          <div className="flex items-center justify-between">
            <span className="text-[#414846] dark:text-[#a9acaa] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#717976] dark:text-[#a9acaa]" />
              Experiencia:
            </span>
            <span className="font-bold text-[#1c1b1b] dark:text-white">{handyman.experienceYears}+ Años</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#414846] dark:text-[#a9acaa] flex items-center gap-1 truncate max-w-[130px]">
              <MapPin className="w-3.5 h-3.5 text-[#717976] dark:text-[#a9acaa] shrink-0" />
              Zona:
            </span>
            <span className="font-semibold text-[#1c1b1b] dark:text-white truncate max-w-[140px]" title={handyman.zone}>
              {handyman.zone}
            </span>
          </div>

          <div className="flex items-center justify-between border-t border-[#e5e2e1] dark:border-[#2e3633] pt-1.5">
            <span className="text-[#414846] dark:text-[#a9acaa] flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-[#033028] dark:text-[#a5cfc4]" />
              Tarifa / hora:
            </span>
            <div className="text-right">
              <span className="font-extrabold text-[#033028] dark:text-[#a5cfc4] text-sm">{formatCRC(handyman.hourlyRateCRC)}</span>
              <span className="text-[10px] text-[#414846] dark:text-[#a9acaa] block">/ hora (~${handyman.hourlyRateUSD} USD)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          onClick={() => onSelect(handyman, 'profile')}
          className="w-full bg-[#f0eded] dark:bg-[#222926] hover:bg-[#eae7e7] dark:hover:bg-[#2a332f] text-[#1c1b1b] dark:text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center space-x-1 transition-colors border border-[#c0c8c5] dark:border-[#414846]"
        >
          <span>Ver Perfil</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => (onQuickBook ? onQuickBook(handyman) : onSelect(handyman, 'book'))}
          className="w-full bg-white dark:bg-[#1a201d] hover:bg-[#f0f7f5] dark:hover:bg-[#162b25] text-[#033028] dark:text-white font-extrabold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center space-x-1 border-2 border-[#033028] dark:border-[#e5a93c] shadow-xs transition-all transform active:scale-95"
        >
          <span>Reservar</span>
        </button>
      </div>
    </div>
  );
}
