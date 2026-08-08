import React, { useState } from 'react';
import { 
  Bell, Globe, Moon, Sun, ShieldAlert, Building2, HelpCircle, 
  ChevronRight, PhoneCall, FileText, Lock, Check, Sparkles, Monitor 
} from 'lucide-react';

export default function SettingsView({ client, onOpenIncidentModal, isDarkMode, onToggleTheme }) {
  const [arrivalAlerts, setArrivalAlerts] = useState(true);
  const [gpsTrackingAlerts, setGpsTrackingAlerts] = useState(true);
  const [language, setLanguage] = useState('es-CR');

  return (
    <div className="space-y-4 pb-20 px-4 pt-4 text-[#1c1b1b] dark:text-[#f3f0ef] transition-colors duration-500">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-black text-[#1c1b1b] dark:text-white">Ajustes & Configuración</h2>
        <p className="text-xs text-[#414846] dark:text-[#a9acaa] font-medium">Preferencias de la aplicación y centro de soporte</p>
      </div>

      {/* THEME SELECTION CARD (MODO CLARO / MODO OSCURO) */}
      <div className="bg-white dark:bg-[#1a201d] rounded-2xl p-4 border border-[#e5e2e1] dark:border-[#2e3633] card-shadow space-y-3">
        <h3 className="font-extrabold text-[#1c1b1b] dark:text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#e5a93c]" />
          <span>Apariencia & Tema Visual</span>
        </h3>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Light Mode Button */}
          <button
            onClick={() => isDarkMode && onToggleTheme()}
            className={`p-3 rounded-2xl border-2 flex items-center space-x-3 transition-all ${
              !isDarkMode 
                ? 'border-2 border-[#033028] bg-white text-[#033028] font-black shadow-md' 
                : 'border-[#2e3633] bg-[#222926] text-[#a9acaa] hover:text-white'
            }`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${!isDarkMode ? 'bg-[#f0f7f5] text-[#033028]' : 'bg-[#1a201d] text-[#a9acaa]'}`}>
              <Sun className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold block">Modo Claro</span>
              <span className="text-[10px] opacity-70 block">Discerning Artisan</span>
            </div>
          </button>

          {/* Dark Mode Button */}
          <button
            onClick={() => !isDarkMode && onToggleTheme()}
            className={`p-3 rounded-2xl border-2 flex items-center space-x-3 transition-all ${
              isDarkMode 
                ? 'border-2 border-[#e5a93c] bg-[#1a201d] text-[#a5cfc4] font-black shadow-md' 
                : 'border-[#e5e2e1] bg-white text-[#414846] hover:text-[#1c1b1b]'
            }`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-[#162b25] text-[#e5a93c]' : 'bg-[#f6f3f2] text-[#414846]'}`}>
              <Moon className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold block">Modo Oscuro</span>
              <span className="text-[10px] opacity-70 block">Dark Emerald</span>
            </div>
          </button>
        </div>
      </div>

      {/* CRITICAL SECURITY & EMERGENCY SECTION */}
      <div className="bg-[#ffdad6] dark:bg-[#3f1919] border-2 border-[#ba1a1a]/30 dark:border-[#ba1a1a]/60 rounded-2xl p-4 card-shadow space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#ba1a1a] text-white flex items-center justify-center shadow-md">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="font-extrabold text-[#93000a] dark:text-[#ffdad6] text-sm">Seguridad & Protocolo de Emergencia</h3>
            <p className="text-[11px] text-[#ba1a1a] dark:text-[#ffb4ab] font-medium">Atención inmediata en caso de inconvenientes</p>
          </div>
        </div>

        <p className="text-xs text-[#1c1b1b] dark:text-[#f3f0ef] leading-relaxed">
          Si experimentas un problema con un técnico contratado o requieres asistencia de la administración de tu condominio, utiliza el botón de reporte directo.
        </p>

        <button
          onClick={onOpenIncidentModal}
          className="w-full bg-[#ba1a1a] hover:bg-[#93000a] text-white font-extrabold py-3 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-md transition-all transform active:scale-95 uppercase tracking-wider"
        >
          <ShieldAlert className="w-4 h-4" />
          <span>REPORTAR INCIDENCIA DE SERVICIO</span>
        </button>
      </div>

      {/* App Behavior & Notifications Settings */}
      <div className="bg-white dark:bg-[#1a201d] rounded-2xl p-4 border border-[#e5e2e1] dark:border-[#2e3633] card-shadow space-y-3">
        <h3 className="font-extrabold text-[#1c1b1b] dark:text-white text-xs uppercase tracking-wider">
          Notificaciones & Comportamiento
        </h3>

        <div className="flex items-center justify-between py-2 border-b border-[#e5e2e1] dark:border-[#2e3633] text-xs">
          <div className="flex items-center space-x-2.5">
            <Bell className="w-4 h-4 text-[#033028] dark:text-[#a5cfc4]" />
            <div>
              <span className="font-bold text-[#1c1b1b] dark:text-white block">Alertas de Llegada de Técnico</span>
              <span className="text-[10px] text-[#414846] dark:text-[#a9acaa]">Notificar cuando el handyman esté a 5 mins del condominio</span>
            </div>
          </div>
          <input
            type="checkbox"
            checked={arrivalAlerts}
            onChange={(e) => setArrivalAlerts(e.target.checked)}
            className="w-4 h-4 text-[#033028] rounded border-[#c0c8c5] dark:border-[#414846] focus:ring-[#033028]"
          />
        </div>

        <div className="flex items-center justify-between py-2 border-b border-[#e5e2e1] dark:border-[#2e3633] text-xs">
          <div className="flex items-center space-x-2.5">
            <Globe className="w-4 h-4 text-[#033028] dark:text-[#a5cfc4]" />
            <div>
              <span className="font-bold text-[#1c1b1b] dark:text-white block">Rastreos GPS en Tiempo Real</span>
              <span className="text-[10px] text-[#414846] dark:text-[#a9acaa]">Compartir ubicación de aproximación con caseta</span>
            </div>
          </div>
          <input
            type="checkbox"
            checked={gpsTrackingAlerts}
            onChange={(e) => setGpsTrackingAlerts(e.target.checked)}
            className="w-4 h-4 text-[#033028] rounded border-[#c0c8c5] dark:border-[#414846] focus:ring-[#033028]"
          />
        </div>

        <div className="flex items-center justify-between py-2 text-xs">
          <div className="flex items-center space-x-2.5">
            <Globe className="w-4 h-4 text-[#717976] dark:text-[#a9acaa]" />
            <span className="font-bold text-[#1c1b1b] dark:text-white">Idioma de la Aplicación</span>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-[#f6f3f2] dark:bg-[#222926] border border-[#c0c8c5] dark:border-[#414846] rounded-lg text-xs font-semibold px-2 py-1 text-[#1c1b1b] dark:text-white"
          >
            <option value="es-CR">Español (Costa Rica)</option>
            <option value="en-US">English (US)</option>
          </select>
        </div>
      </div>

      {/* Condominium Administrations Partnerships */}
      <div className="bg-[#033028] dark:bg-[#162b25] text-white rounded-2xl p-4 shadow-md border border-[#1e463e] dark:border-[#3e665d] space-y-2">
        <div className="flex items-center space-x-2.5">
          <Building2 className="w-5 h-5 text-[#e5a93c]" />
          <h3 className="font-extrabold text-sm text-white">Convenios con Administraciones</h3>
        </div>

        <p className="text-xs text-[#a5cfc4] leading-relaxed">
          ¿Perteneces a la junta o administración de un condominio? Integra TASKR para agilizar el ingreso de técnicos y control de mantenimiento de áreas comunes.
        </p>

        <a
          href="mailto:convenios@taskr.cr"
          className="inline-flex items-center space-x-1.5 text-xs text-[#e5a93c] font-extrabold hover:underline pt-1"
        >
          <span>Contactar Departamento de Convenios</span>
          <ChevronRight className="w-4 h-4" />
        </a>
      </div>

      {/* About TASKR Section */}
      <div className="bg-white dark:bg-[#1a201d] rounded-2xl p-4 border border-[#e5e2e1] dark:border-[#2e3633] card-shadow space-y-2 text-xs">
        <h3 className="font-extrabold text-[#1c1b1b] dark:text-white text-xs uppercase tracking-wider">Acerca de TASKR</h3>
        
        <div className="flex justify-between py-1.5 border-b border-[#e5e2e1] dark:border-[#2e3633]">
          <span className="text-[#414846] dark:text-[#a9acaa]">Versión del Prototipo:</span>
          <span className="font-mono font-bold text-[#1c1b1b] dark:text-white">v2.4.0-MobileFirst</span>
        </div>

        <div className="flex justify-between py-1.5 border-b border-[#e5e2e1] dark:border-[#2e3633]">
          <span className="text-[#414846] dark:text-[#a9acaa]">Soporte Telefónico CR:</span>
          <span className="font-bold text-[#033028] dark:text-[#a5cfc4]">+506 2200-TASK (8275)</span>
        </div>

        <div className="flex justify-between py-1.5">
          <span className="text-[#414846] dark:text-[#a9acaa]">Cobertura:</span>
          <span className="font-semibold text-[#1c1b1b] dark:text-white">Escazú, Santa Ana, Alajuela, Heredia & GAM</span>
        </div>
      </div>

      {/* Footer Credits */}
      <div className="text-center pt-2 text-[11px] text-[#717976] dark:text-[#a9acaa]">
        <p>© 2026 TASKR Digital Solutions S.A. • Costa Rica</p>
        <p className="text-[10px]">Conectando residencias con profesionales independientes verificados.</p>
      </div>

    </div>
  );
}
