import React, { useState } from 'react';
import { 
  Wrench, CheckCircle2, XCircle, Clock, MapPin, Navigation, Phone, 
  MessageSquare, DollarSign, ShieldCheck, Star, Calendar, FileText, 
  Power, TrendingUp, AlertTriangle, ArrowRight, UserCheck, Sparkles, Check 
} from 'lucide-react';
import { HANDYMEN } from '../data/mockData';

export default function HandymanPartnerApp({ onOpenChat, isDarkMode, citas = [], onUpdateCitaStatus }) {
  const [partnerHandyman, setPartnerHandyman] = useState(HANDYMEN[0]); // Mario Jiménez
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState('requests'); // 'requests', 'active_job', 'earnings'
  const [jobStatus, setJobStatus] = useState('accepted'); // 'accepted', 'arrived', 'completed'
  const [showPayoutSuccess, setShowPayoutSuccess] = useState(false);
  const [activeJobCita, setActiveJobCita] = useState(null);

  // Technician Payment Acceptance Autonomy
  const [acceptsSinpe, setAcceptsSinpe] = useState(partnerHandyman.acceptsSinpe ?? true);
  const [acceptsCash, setAcceptsCash] = useState(partnerHandyman.acceptsCash ?? true);


  const formatCRC = (amount) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  // Citas pending assignment or offered to this handyman
  const pendingCitas = citas.filter(c => c.status === 'Pendiente' || c.assignedHandymanId === partnerHandyman.id);

  const handleAcceptRequest = async (reqCita) => {
    if (onUpdateCitaStatus) {
      await onUpdateCitaStatus(reqCita.id, {
        status: 'Asignada - En camino',
        assignedHandymanId: partnerHandyman.id,
        assignedHandymanName: partnerHandyman.name
      });
    }
    setActiveJobCita(reqCita);
    setJobStatus('accepted');
    setActiveTab('active_job');
  };

  const handleCompleteJob = async () => {
    if (activeJobCita && onUpdateCitaStatus) {
      await onUpdateCitaStatus(activeJobCita.id, {
        status: 'Completada'
      });
    }
    setJobStatus('completed');
    setShowPayoutSuccess(true);
    setTimeout(() => {
      setShowPayoutSuccess(false);
      setActiveTab('earnings');
    }, 2500);
  };

  return (
    <div className="flex flex-col h-full bg-[#fcf9f8] dark:bg-[#121614] text-[#1c1b1b] dark:text-[#f3f0ef] transition-colors duration-500 min-h-screen">
      
      {/* Handyman Partner Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#1a201d]/95 backdrop-blur-md text-[#1c1b1b] dark:text-[#f3f0ef] p-4 shadow-xs border-b border-[#e5e2e1] dark:border-[#2e3633] transition-colors duration-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={partnerHandyman.avatar}
                alt={partnerHandyman.name}
                className="w-11 h-11 rounded-2xl object-cover border-2 border-[#e5a93c] shadow-sm"
              />
              <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full ring-2 ring-white dark:ring-[#1a201d] ${
                isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'
              }`}></span>
            </div>

            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="font-extrabold text-sm text-[#1c1b1b] dark:text-white">{partnerHandyman.name}</h3>
                <span className="bg-[#e5a93c] text-[#1c1b1b] text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md">
                  SOCIO PRO
                </span>
              </div>
              <p className="text-[11px] text-[#414846] dark:text-[#a9acaa] font-medium">
                {partnerHandyman.specialty} • Escazú & GAM
              </p>
            </div>
          </div>

          {/* Online Status Toggle */}
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs ${
              isOnline 
                ? 'bg-[#f0f7f5] dark:bg-[#162b25] text-[#033028] dark:text-[#a5cfc4] border border-[#c1ebe0] dark:border-[#2e3633]' 
                : 'bg-[#ffdad6] dark:bg-[#3f1919] text-[#ba1a1a] dark:text-[#ffdad6] border border-[#ba1a1a]/30'
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            <span>{isOnline ? 'EN LÍNEA' : 'OFFLINE'}</span>
          </button>
        </div>

        {/* Quick Earnings Dashboard Bar */}
        <div className="mt-3 bg-[#f0f7f5] dark:bg-[#162b25] border border-[#c1ebe0] dark:border-[#2e3633] rounded-2xl p-2.5 flex items-center justify-around text-xs">
          <div className="text-center">
            <span className="text-[10px] text-[#414846] dark:text-[#a9acaa] uppercase font-bold block">Ganado Hoy</span>
            <span className="font-black text-sm text-[#033028] dark:text-[#e5a93c]">₡38,000</span>
          </div>
          <div className="h-6 w-px bg-[#c1ebe0] dark:bg-[#2e3633]"></div>
          <div className="text-center">
            <span className="text-[10px] text-[#414846] dark:text-[#a9acaa] uppercase font-bold block">Calificación</span>
            <span className="font-black text-sm text-[#1c1b1b] dark:text-white flex items-center justify-center gap-0.5">
              <Star className="w-3.5 h-3.5 fill-[#e5a93c] text-[#e5a93c]" />
              {partnerHandyman.rating.toFixed(1)}
            </span>
          </div>
          <div className="h-6 w-px bg-[#c1ebe0] dark:bg-[#2e3633]"></div>
          <div className="text-center">
            <span className="text-[10px] text-[#414846] dark:text-[#a9acaa] uppercase font-bold block">Trabajos Hoy</span>
            <span className="font-black text-sm text-[#033028] dark:text-[#a5cfc4]">2 Exitosos</span>
          </div>
        </div>

        {/* Technician Payment Acceptance Settings */}
        <div className="mt-2.5 bg-white dark:bg-[#1a201d] border border-[#e5e2e1] dark:border-[#2e3633] rounded-2xl p-2.5 space-y-1 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#414846] dark:text-[#a9acaa]">
              Configuración de Cobro Directo (Autónomo)
            </span>
            <span className="text-[10px] text-[#033028] dark:text-[#a5cfc4] font-bold">Cobro Directo</span>
          </div>

          <div className="flex items-center space-x-4 pt-1">
            <label className="flex items-center space-x-1.5 cursor-pointer text-[11px] font-bold text-[#1c1b1b] dark:text-white">
              <input
                type="checkbox"
                checked={acceptsSinpe}
                onChange={(e) => setAcceptsSinpe(e.target.checked)}
                className="w-3.5 h-3.5 text-[#033028] rounded border-[#c0c8c5]"
              />
              <span>Acepto SINPE Móvil</span>
            </label>

            <label className="flex items-center space-x-1.5 cursor-pointer text-[11px] font-bold text-[#1c1b1b] dark:text-white">
              <input
                type="checkbox"
                checked={acceptsCash}
                onChange={(e) => setAcceptsCash(e.target.checked)}
                className="w-3.5 h-3.5 text-[#033028] rounded border-[#c0c8c5]"
              />
              <span>Acepto Efectivo</span>
            </label>
          </div>
        </div>
      </header>


      {/* Main Tab Navigation for Handyman Partner */}
      <div className="px-4 pt-3">
        <div className="flex bg-[#f0eded] dark:bg-[#222926] p-1 rounded-2xl text-xs font-bold border border-[#e5e2e1] dark:border-[#2e3633]">
          <button
            onClick={() => setActiveTab('requests')}
            className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center space-x-1 ${
              activeTab === 'requests' 
                ? 'bg-white dark:bg-[#1a201d] text-[#033028] dark:text-white border-2 border-[#033028] dark:border-[#e5a93c] shadow-sm font-black' 
                : 'text-[#414846] dark:text-[#a9acaa]'
            }`}
          >
            <span>Solicitudes Citas</span>
            {pendingCitas.length > 0 && (
              <span className="bg-[#e5a93c] text-[#1c1b1b] text-[10px] px-1.5 py-0.2 rounded-full font-black">
                {pendingCitas.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('active_job')}
            className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center space-x-1 ${
              activeTab === 'active_job' 
                ? 'bg-white dark:bg-[#1a201d] text-[#033028] dark:text-white border-2 border-[#033028] dark:border-[#e5a93c] shadow-sm font-black' 
                : 'text-[#414846] dark:text-[#a9acaa]'
            }`}
          >
            <span>Trabajo Actual</span>
          </button>

          <button
            onClick={() => setActiveTab('earnings')}
            className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center space-x-1 ${
              activeTab === 'earnings' 
                ? 'bg-white dark:bg-[#1a201d] text-[#033028] dark:text-white border-2 border-[#033028] dark:border-[#e5a93c] shadow-sm font-black' 
                : 'text-[#414846] dark:text-[#a9acaa]'
            }`}
          >
            <span>Billetera</span>
          </button>
        </div>
      </div>

      {/* SUCCESS PAYOUT OVERLAY MODAL */}
      {showPayoutSuccess && (
        <div className="fixed inset-0 z-50 bg-[#1c1b1b]/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-[#1a201d] rounded-3xl p-6 text-center max-w-xs border border-[#e5e2e1] dark:border-[#2e3633] card-shadow space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-black text-[#1c1b1b] dark:text-white">¡Trabajo Completado!</h3>
            <p className="text-xs text-[#414846] dark:text-[#a9acaa]">
              Se ha transferido la suma de <strong className="text-[#033028] dark:text-[#a5cfc4]">{formatCRC(activeJobCita?.totalCRC || 18000)}</strong> a tu cuenta SINPE Móvil.
            </p>
          </div>
        </div>
      )}

      {/* TAB 1: INCOMING REQUESTS */}
      {activeTab === 'requests' && (
        <div className="p-4 space-y-4 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#414846] dark:text-[#a9acaa]">
              Solicitudes de Citas del Servidor
            </h3>
            <span className="text-[11px] font-bold text-[#033028] dark:text-[#a5cfc4]">
              Radio: 5 km (Escazú)
            </span>
          </div>

          {pendingCitas.length > 0 ? (
            pendingCitas.map((req) => (
              <div
                key={req.id}
                className="bg-white dark:bg-[#1a201d] rounded-3xl p-5 border border-[#e5e2e1] dark:border-[#2e3633] card-shadow space-y-3 relative overflow-hidden"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="bg-[#e5a93c]/20 text-[#033028] dark:text-[#e5a93c] text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                      {req.status || 'Pendiente'}
                    </span>
                    <h4 className="font-extrabold text-sm text-[#1c1b1b] dark:text-white mt-1">
                      {req.serviceTitle}
                    </h4>
                    <p className="text-xs text-[#033028] dark:text-[#a5cfc4] font-bold flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#e5a93c]" />
                      {req.condo} ({req.unit})
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-black text-[#033028] dark:text-[#a5cfc4] block">
                      {formatCRC(req.totalCRC)}
                    </span>
                    <span className="text-[10px] text-[#414846] dark:text-[#a9acaa]">
                      Fecha: {req.scheduledDate} {req.scheduledTime}
                    </span>
                  </div>
                </div>

                {req.description && (
                  <p className="text-xs text-[#414846] dark:text-[#a9acaa] bg-[#f6f3f2] dark:bg-[#222926] p-3 rounded-2xl border border-[#e5e2e1] dark:border-[#2e3633] italic">
                    "{req.description}"
                  </p>
                )}

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[#414846] dark:text-[#a9acaa]">
                    Cliente: <strong>{req.clientName}</strong> ({req.clientPhone})
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => {}}
                    className="bg-white dark:bg-[#1a201d] hover:bg-[#f6f3f2] dark:hover:bg-[#222926] text-[#ba1a1a] dark:text-[#ffb4ab] font-bold py-2.5 px-3 rounded-xl border border-[#ba1a1a]/30 text-xs transition-colors"
                  >
                    Rechazar
                  </button>

                  <button
                    onClick={() => handleAcceptRequest(req)}
                    className="bg-white dark:bg-[#1a201d] hover:bg-[#f0f7f5] dark:hover:bg-[#162b25] text-[#033028] dark:text-white border-2 border-[#033028] dark:border-[#e5a93c] font-black py-2.5 px-3 rounded-xl text-xs shadow-sm transition-all transform active:scale-95 flex items-center justify-center space-x-1"
                  >
                    <span>Asignarme Cita</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#e5a93c]" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white dark:bg-[#1a201d] rounded-3xl p-8 text-center border border-[#e5e2e1] dark:border-[#2e3633] card-shadow space-y-2">
              <Sparkles className="w-8 h-8 text-[#e5a93c] mx-auto" />
              <h4 className="font-bold text-[#1c1b1b] dark:text-white text-sm">Sin nuevas citas solicitadas</h4>
              <p className="text-xs text-[#414846] dark:text-[#a9acaa]">
                Las citas solicitadas por clientes desde la PWA aparecerán aquí en tiempo real.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ACTIVE JOB NAVIGATION & CASETA PASSCODE */}
      {activeTab === 'active_job' && (
        <div className="p-4 space-y-4 flex-1">
          <div className="bg-white dark:bg-[#1a201d] rounded-3xl p-5 border border-[#e5e2e1] dark:border-[#2e3633] card-shadow space-y-4">
            
            {/* Header Badge */}
            <div className="flex items-center justify-between pb-3 border-b border-[#e5e2e1] dark:border-[#2e3633]">
              <div className="flex items-center space-x-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-black uppercase text-[#033028] dark:text-[#a5cfc4]">
                  {jobStatus === 'accepted' ? 'En ruta a Residencia' : 'En Residencia del Cliente'}
                </span>
              </div>
              <span className="text-[11px] font-bold text-[#e5a93c] bg-[#fef8ec] dark:bg-[#332408] px-2 py-0.5 rounded-full border border-[#fdbe50]">
                Trabajo Activo
              </span>
            </div>

            {/* Client Info */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black text-base text-[#1c1b1b] dark:text-white">
                  {activeJobCita?.clientName || 'Doña Sofía Arguedas'}
                </h3>
                <p className="text-xs text-[#414846] dark:text-[#a9acaa] font-medium">
                  {activeJobCita?.condo || 'Condominio Montes del Sol'} • {activeJobCita?.unit || 'Casa 42B'}
                </p>
                <p className="text-xs font-extrabold text-[#033028] dark:text-[#a5cfc4] mt-1">
                  Trabajo: {activeJobCita?.serviceTitle || 'Reparación de Fuga en Fregadero'}
                </p>
              </div>

              <div className="text-right">
                <span className="text-base font-black text-[#033028] dark:text-[#a5cfc4] block">
                  {formatCRC(activeJobCita?.totalCRC || 18000)}
                </span>
                <span className="text-[10px] text-[#414846] dark:text-[#a9acaa]">Paga por trabajo</span>
              </div>
            </div>

            {/* HANDYMAN CASETA PASSCODE */}
            <div className="bg-[#f0f7f5] dark:bg-[#162b25] border border-[#c1ebe0] dark:border-[#2e3633] rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-[#033028] dark:text-[#a5cfc4] uppercase text-[10px]">
                  Pase de Ingreso a Caseta de Guardias
                </span>
                <span className="bg-white dark:bg-[#1a201d] text-[#033028] dark:text-[#a5cfc4] px-2 py-0.5 rounded-md text-[10px] font-bold border border-[#c1ebe0] dark:border-[#2e3633]">
                  AUTORIZADO
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-mono text-xl font-black text-[#033028] dark:text-white tracking-widest">
                  {activeJobCita?.passCode || 'TASKR-8492'}
                </span>
                <span className="text-xs text-[#414846] dark:text-[#a9acaa] font-medium">
                  Muestra este código al oficial
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={`tel:${activeJobCita?.clientPhone || '+50688449911'}`}
                className="bg-white dark:bg-[#1a201d] hover:bg-[#f6f3f2] text-[#1c1b1b] dark:text-white font-bold py-2.5 px-3 rounded-xl border border-[#c0c8c5] dark:border-[#414846] text-xs flex items-center justify-center space-x-1.5 shadow-xs"
              >
                <Phone className="w-4 h-4 text-[#033028] dark:text-[#a5cfc4]" />
                <span>Llamar Cliente</span>
              </a>

              <button
                onClick={() => onOpenChat(HANDYMEN[0])}
                className="bg-white dark:bg-[#1a201d] hover:bg-[#f0f7f5] text-[#033028] dark:text-white font-bold py-2.5 px-3 rounded-xl border-2 border-[#033028] dark:border-[#e5a93c] text-xs flex items-center justify-center space-x-1.5 shadow-xs"
              >
                <MessageSquare className="w-4 h-4 text-[#e5a93c]" />
                <span>Chat Cliente</span>
              </button>
            </div>

            {/* Progress Actions */}
            {jobStatus === 'accepted' ? (
              <button
                onClick={() => setJobStatus('arrived')}
                className="w-full bg-[#e5a93c] hover:bg-[#fdbe50] text-[#1c1b1b] font-black py-3 px-4 rounded-2xl text-xs shadow-md transition-all uppercase tracking-wider"
              >
                1. MARCAR LLEGADA A CASETA DEL CONDOMINIO
              </button>
            ) : (
              <button
                onClick={handleCompleteJob}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 px-4 rounded-2xl text-xs shadow-md transition-all uppercase tracking-wider flex items-center justify-center space-x-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>2. FINALIZAR TRABAJO & COBRAR ({formatCRC(activeJobCita?.totalCRC || 18000)})</span>
              </button>
            )}

          </div>
        </div>
      )}

      {/* TAB 3: EARNINGS & WALLET */}
      {activeTab === 'earnings' && (
        <div className="p-4 space-y-4 flex-1">
          {/* Wallet Balance Card */}
          <div className="bg-white dark:bg-[#1a201d] text-[#1c1b1b] dark:text-white rounded-3xl p-5 border border-[#e5e2e1] dark:border-[#2e3633] card-shadow space-y-3">
            <span className="text-xs text-[#033028] dark:text-[#a5cfc4] font-extrabold uppercase tracking-wider block">
              Billetera Socio Handyman
            </span>

            <div className="flex items-baseline space-x-1">
              <span className="text-3xl font-black text-[#033028] dark:text-[#e5a93c]">₡142,000</span>
              <span className="text-xs text-[#414846] dark:text-[#a9acaa]">CRC Ganados esta semana</span>
            </div>

            <div className="pt-2 border-t border-[#e5e2e1] dark:border-[#2e3633] flex items-center justify-between text-xs">
              <span className="text-[#414846] dark:text-[#a9acaa]">Cuenta de Depósito SINPE:</span>
              <span className="font-mono font-bold text-[#033028] dark:text-white">+506 8844-9911</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
