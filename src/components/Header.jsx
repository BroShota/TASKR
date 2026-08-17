import React, { useState, useMemo } from 'react';
import { ShieldCheck, MapPin, AlertTriangle, Sun, Moon, User, Bell, Clock, MessageSquare, Phone, X } from 'lucide-react';
import { HANDYMEN } from '../data/mockData';

export default function Header({ client, citas = [], onOpenChat, onOpenIncidentModal, isDarkMode, onToggleTheme, onOpenAuthModal }) {
  const [isBellOpen, setIsBellOpen] = useState(false);

  // Active upcoming appointment for the resident
  const activeUpcomingCita = useMemo(() => {
    if (!citas || citas.length === 0) return null;
    return citas.find(c => c.status !== 'Completada' && c.status !== 'Cancelada') || null;
  }, [citas]);

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#1a201d]/95 backdrop-blur-md border-b border-[#e5e2e1] dark:border-[#2e3633] text-[#1c1b1b] dark:text-[#f3f0ef] px-4 py-3 shadow-xs transition-colors duration-500 relative">
      <div className="flex items-center justify-between">
        {/* Logo and Tagline */}
        <div className="flex items-center space-x-2.5">
          <img
            src="/logo.png"
            alt="TASKR Logo"
            className="w-9 h-9 object-contain drop-shadow-sm"
          />
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-lg tracking-tight text-[#1c1b1b] dark:text-white">TASKR</span>
              <span className="text-[10px] uppercase font-extrabold tracking-widest px-1.5 py-0.5 rounded-md bg-[#f0f7f5] dark:bg-[#162b25] text-[#033028] dark:text-[#a5cfc4] border border-[#c1ebe0] dark:border-[#2e3633]">
                CR
              </span>
            </div>
            <p className="text-[11px] text-[#414846] dark:text-[#a9acaa] font-medium leading-none flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-[#e5a93c] shrink-0" />
              <span className="truncate max-w-[120px] font-semibold text-[#1c1b1b] dark:text-white">{client.condo}</span>
            </p>
          </div>
        </div>

        {/* Action Buttons: User Account, Notification Bell & Theme Toggle */}
        <div className="flex items-center space-x-2">
          
          {/* User Account Button */}
          <button
            id="demo-client-account"
            onClick={onOpenAuthModal}
            className="flex items-center space-x-1.5 p-1 pr-2.5 rounded-xl bg-[#f6f3f2] dark:bg-[#222926] border border-[#c0c8c5] dark:border-[#2e3633] hover:border-[#033028] dark:hover:border-[#e5a93c] transition-all"
            title="Mi Cuenta / Iniciar Sesión"
          >
            {client.avatar ? (
              <img src={client.avatar} alt={client.name} className="w-6 h-6 rounded-lg object-cover border border-[#e5a93c]" />
            ) : (
              <User className="w-4 h-4 text-[#033028] dark:text-[#a5cfc4]" />
            )}
            <span className="text-[11px] font-bold text-[#1c1b1b] dark:text-white max-w-[70px] truncate">
              {client.name ? client.name.split(' ')[0] : 'Cuenta'}
            </span>
          </button>

          {/* Notification Bell Button (Apple-style Icon with Badge) */}
          <button
            id="demo-client-bell"
            onClick={() => setIsBellOpen(!isBellOpen)}
            title="Recordatorio de Cita Próxima"
            className="relative p-2 rounded-xl transition-all duration-300 transform active:scale-90 bg-[#f6f3f2] dark:bg-[#222926] text-[#033028] dark:text-[#a5cfc4] border border-[#c0c8c5] dark:border-[#2e3633] shadow-xs flex items-center justify-center"
          >
            <Bell className={`w-4 h-4 ${activeUpcomingCita ? 'text-[#e5a93c] animate-pulse' : 'text-[#717976] dark:text-[#a9acaa]'}`} />
            {activeUpcomingCita && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#e5a93c] rounded-full border-2 border-white dark:border-[#1a201d] animate-ping" />
            )}
          </button>

          {/* Theme Toggle Button */}
          <button
            id="demo-client-theme"
            onClick={onToggleTheme}
            title={isDarkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
            className="p-1.5 rounded-xl transition-all duration-300 transform active:scale-90 bg-[#f0eded] dark:bg-[#222926] text-[#033028] dark:text-[#fdbe50] border border-[#c0c8c5] dark:border-[#3e665d] shadow-sm flex items-center justify-center"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-[#fdbe50] transform rotate-0 hover:rotate-45 transition-transform duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-[#033028] transform rotate-0 hover:-rotate-12 transition-transform duration-300" />
            )}
          </button>

        </div>
      </div>

      {/* APPLE-STYLE FLOATING NOTIFICATION DYNAMIC BUBBLE */}
      {isBellOpen && (
        <div className="absolute top-[60px] left-4 right-4 z-50 animate-fade-in transition-all duration-300 transform origin-top scale-100">
          <div className="bg-white/95 dark:bg-[#1a201d]/95 backdrop-blur-xl text-[#1c1b1b] dark:text-white rounded-3xl p-4 shadow-2xl border border-[#e5a93c]/50 dark:border-[#e5a93c]/30 space-y-3 relative overflow-hidden">
            {/* Ambient Gold Glow */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-[#e5a93c]/15 rounded-full blur-xl pointer-events-none" />

            {/* Title Bar */}
            <div className="flex items-center justify-between relative z-10 border-b border-[#e5e2e1] dark:border-[#2e3633] pb-2">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-lg bg-[#033028] dark:bg-[#1e463e] text-[#e5a93c] flex items-center justify-center shadow-xs">
                  <Bell className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-black text-[#1c1b1b] dark:text-white uppercase tracking-wider">
                  Cita Próxima • Recordatorio
                </span>
              </div>

              <div className="flex items-center space-x-2">
                {activeUpcomingCita && (
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${
                    activeUpcomingCita.status === 'Pendiente'
                      ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300/60 dark:border-amber-700/40'
                      : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300/60 dark:border-emerald-700/40'
                  }`}>
                    {activeUpcomingCita.status || 'Confirmada'}
                  </span>
                )}
                <button
                  onClick={() => setIsBellOpen(false)}
                  className="p-1 rounded-full text-[#717976] dark:text-[#a9acaa] hover:bg-gray-100 dark:hover:bg-[#222926] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content Body */}
            {activeUpcomingCita ? (
              <div className="space-y-2.5 relative z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-extrabold text-xs text-[#1c1b1b] dark:text-white leading-tight">
                      {activeUpcomingCita.serviceTitle || 'Servicio de Mantenimiento'}
                    </h4>
                    <p className="text-[11px] text-[#033028] dark:text-[#a5cfc4] font-semibold flex items-center gap-1 mt-1">
                      <Clock className="w-3.5 h-3.5 text-[#e5a93c]" />
                      <span>{activeUpcomingCita.scheduledDate} a las <strong>{activeUpcomingCita.scheduledTime}</strong></span>
                    </p>
                  </div>
                </div>

                <div className="bg-[#f6f3f2] dark:bg-[#222926] rounded-2xl p-2.5 flex items-center justify-between border border-[#e5e2e1] dark:border-[#2e3633]">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-[#414846] dark:text-[#a9acaa]">
                    <ShieldCheck className="w-4 h-4 text-[#033028] dark:text-[#e5a93c]" />
                    <span>Técnico: <strong className="text-[#1c1b1b] dark:text-white">{activeUpcomingCita.assignedHandymanName || 'Mario Jiménez'}</strong></span>
                  </div>

                  <div className="flex items-center space-x-1 bg-white dark:bg-[#1a201d] px-2.5 py-1 rounded-xl border border-[#e5e2e1] dark:border-[#2e3633]">
                    <span className="text-[9px] font-extrabold uppercase text-[#717976] dark:text-[#a9acaa]">PIN:</span>
                    <span className="font-mono text-xs font-black text-[#033028] dark:text-[#e5a93c] tracking-widest">
                      {activeUpcomingCita.passCode ? activeUpcomingCita.passCode.slice(-4) : '4819'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 pt-1">
                  <button
                    onClick={() => {
                      setIsBellOpen(false);
                      if (onOpenChat) onOpenChat(HANDYMEN[0]);
                    }}
                    className="flex-1 bg-[#033028] dark:bg-[#1e463e] hover:bg-[#1e463e] text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#e5a93c]" />
                    <span>Chat con Técnico</span>
                  </button>
                  <a
                    href="tel:+50688449911"
                    className="bg-[#f6f3f2] dark:bg-[#222926] hover:bg-[#e5e2e1] dark:hover:bg-[#2e3633] text-[#1c1b1b] dark:text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center space-x-1 border border-[#e5e2e1] dark:border-[#2e3633]"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#033028] dark:text-[#a5cfc4]" />
                    <span>Llamar</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-4 text-center text-xs text-[#717976] dark:text-[#a9acaa]">
                <Bell className="w-6 h-6 text-[#e5a93c] mx-auto mb-1.5 opacity-60" />
                <span>No tienes citas pendientes en este momento.</span>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
