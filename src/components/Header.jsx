import React from 'react';
import { ShieldCheck, MapPin, AlertTriangle, Sun, Moon, User, LogIn } from 'lucide-react';

export default function Header({ client, onOpenIncidentModal, isDarkMode, onToggleTheme, onOpenAuthModal }) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#1a201d]/95 backdrop-blur-md border-b border-[#e5e2e1] dark:border-[#2e3633] text-[#1c1b1b] dark:text-[#f3f0ef] px-4 py-3 shadow-xs transition-colors duration-500">
      <div className="flex items-center justify-between">
        {/* Logo and Tagline */}
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#033028] dark:bg-[#1e463e] text-white flex items-center justify-center font-black text-xl shadow-md border border-[#1e463e] dark:border-[#3e665d]">
            T
          </div>
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

        {/* Action Buttons: Auth User, Theme Switcher & Verification */}
        <div className="flex items-center space-x-2">
          
          {/* User Account Button */}
          <button
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

          {/* Theme Toggle Button */}
          <button
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
    </header>
  );
}

