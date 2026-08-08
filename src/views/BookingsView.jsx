import React, { useState } from 'react';
import { 
  Calendar, Clock, MapPin, Navigation, Phone, MessageSquare, 
  ShieldCheck, ChevronRight, CheckCircle2, AlertCircle, FileText, Star, Copy, Check, Plus
} from 'lucide-react';
import { HANDYMEN } from '../data/mockData';

export default function BookingsView({ 
  bookings = [], 
  citas = [], 
  client, 
  onOpenChat, 
  onSelectHandyman, 
  onOpenIncidentModal, 
  onOpenSolicitarCita,
  onUpdateCitaStatus
}) {
  const [activeTab, setActiveTab] = useState('active'); // 'active', 'past'
  const [copiedCode, setCopiedCode] = useState(null);
  const [cancelModalCita, setCancelModalCita] = useState(null);
  const [cancelPenaltyInfo, setCancelPenaltyInfo] = useState(null);

  const formatCRC = (amount) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  const handleCopyCode = (code) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const calculateCancelPenalty = (cita) => {
    if (!cita) return { isLate: false, penaltyCRC: 0 };
    if (cita.isEmergency) {
      return { isLate: true, penaltyCRC: 5000, reason: 'Servicio de atención inmediata de emergencia' };
    }
    const now = new Date();
    let apptDate = new Date();
    if (cita.scheduledDate === 'Mañana') {
      apptDate.setDate(apptDate.getDate() + 1);
    }
    const diffHours = (apptDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    if (diffHours >= 0 && diffHours < 2) {
      return { isLate: true, penaltyCRC: 5000, reason: 'Cancelación a menos de 2 horas de la cita' };
    }
    return { isLate: false, penaltyCRC: 0, reason: 'Cancelación anticipada (sin costo)' };
  };

  const handleOpenCancelModal = (cita) => {
    const info = calculateCancelPenalty(cita);
    setCancelPenaltyInfo(info);
    setCancelModalCita(cita);
  };

  const handleConfirmCancel = async () => {
    if (cancelModalCita && onUpdateCitaStatus) {
      await onUpdateCitaStatus(cancelModalCita.id, {
        status: 'Cancelada',
        cancellationPenalty: cancelPenaltyInfo?.penaltyCRC || 0
      });
    }
    setCancelModalCita(null);
  };


  // Combine real server citas and local bookings
  const mergedCitas = [...citas];

  const activeCitasList = mergedCitas.filter(c => c.status !== 'Completada' && c.status !== 'Cancelada');
  const pastCitasList = mergedCitas.filter(c => c.status === 'Completada');

  return (
    <div className="space-y-4 pb-20 px-4 pt-4 text-[#1c1b1b] dark:text-[#f3f0ef] transition-colors duration-500">
      
      {/* Title & Action Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-[#1c1b1b] dark:text-white">Gestión de Citas</h2>
          <p className="text-xs text-[#414846] dark:text-[#a9acaa] font-medium">Solicitud y pases de acceso a caseta</p>
        </div>

        <button
          onClick={onOpenSolicitarCita}
          className="bg-[#033028] dark:bg-[#1e463e] hover:bg-[#1e463e] text-white font-black text-xs px-3.5 py-2.5 rounded-2xl flex items-center space-x-1.5 shadow-md transition-all transform active:scale-95 border border-[#e5a93c]"
        >
          <Plus className="w-4 h-4 text-[#e5a93c]" />
          <span>Solicitar Cita</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-[#f0eded] dark:bg-[#222926] p-1 rounded-2xl text-xs font-bold border border-[#e5e2e1] dark:border-[#2e3633]">
        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
            activeTab === 'active' 
              ? 'bg-white dark:bg-[#1a201d] text-[#033028] dark:text-white border-2 border-[#033028] dark:border-[#e5a93c] shadow-sm font-black' 
              : 'text-[#414846] dark:text-[#a9acaa]'
          }`}
        >
          <Calendar className="w-3.5 h-3.5 text-[#033028] dark:text-[#a5cfc4]" />
          <span>En Curso ({activeCitasList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('past')}
          className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
            activeTab === 'past' 
              ? 'bg-white dark:bg-[#1a201d] text-[#033028] dark:text-white border-2 border-[#033028] dark:border-[#e5a93c] shadow-sm font-black' 
              : 'text-[#414846] dark:text-[#a9acaa]'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-[#717976] dark:text-[#a9acaa]" />
          <span>Completadas ({pastCitasList.length})</span>
        </button>
      </div>

      {/* ACTIVE RESERVATIONS / CITAS LIST */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          {activeCitasList.length > 0 ? (
            activeCitasList.map((res) => {
              const handymanObj = HANDYMEN.find(h => h.id === res.assignedHandymanId) || HANDYMEN[0];
              return (
                <div 
                  key={res.id}
                  className="bg-white dark:bg-[#1a201d] rounded-3xl p-5 border border-[#e5e2e1] dark:border-[#2e3633] card-shadow space-y-4 relative overflow-hidden"
                >
                  {/* Header Badge */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#e5e2e1] dark:border-[#2e3633]">
                    <div className="flex items-center space-x-2">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e5a93c] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#e5a93c]"></span>
                      </span>
                      <span className="text-xs font-black uppercase tracking-wider text-[#033028] dark:text-[#a5cfc4]">
                        {res.status || 'Pendiente'}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#717976] dark:text-[#a9acaa]">
                      #{res.id}
                    </span>
                  </div>

                  {/* Handyman or Pending Assignment Info */}
                  <div className="flex items-center space-x-3">
                    <img
                      src={handymanObj.avatar}
                      alt={res.assignedHandymanName || handymanObj.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-[#e5a93c] shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1.5">
                        <h3 className="font-bold text-[#1c1b1b] dark:text-white text-sm truncate">
                          {res.assignedHandymanName || handymanObj.name}
                        </h3>
                        <ShieldCheck className="w-4 h-4 text-[#e5a93c] shrink-0" />
                      </div>

                      <p className="text-xs font-semibold text-[#033028] dark:text-[#a5cfc4]">
                        {res.category || handymanObj.specialty}
                      </p>

                      <p className="text-[11px] text-[#414846] dark:text-[#a9acaa] mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#e5a93c]" />
                        Cita Programada: <strong className="text-[#033028] dark:text-[#a5cfc4]">{res.scheduledDate} {res.scheduledTime}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Guardhouse Access Passcode Component */}
                  <div className="bg-[#f0f7f5] dark:bg-[#162b25] border border-[#c1ebe0] dark:border-[#2e3633] rounded-2xl p-3.5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-black tracking-wider text-[#033028] dark:text-[#a5cfc4]">
                        Pase de Acceso a Caseta {res.condo || client.condo}
                      </span>
                      <button
                        onClick={() => handleCopyCode(res.passCode)}
                        className="text-[11px] font-bold text-[#033028] dark:text-[#a5cfc4] hover:underline flex items-center gap-1"
                      >
                        {copiedCode === res.passCode ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>¡Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copiar Pase</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-mono text-lg font-black text-[#033028] dark:text-white tracking-widest">
                        {res.passCode}
                      </span>
                      <span className="text-[10px] bg-white dark:bg-[#1a201d] text-[#033028] dark:text-[#a5cfc4] font-bold px-2 py-0.5 rounded-full border border-[#c1ebe0] dark:border-[#2e3633]">
                        Autorizado
                      </span>
                    </div>
                  </div>

                  {/* Service Details & Price */}
                  <div className="bg-[#f6f3f2] dark:bg-[#222926] rounded-xl p-3 text-xs space-y-1.5 border border-[#e5e2e1] dark:border-[#2e3633]">
                    <div className="flex justify-between">
                      <span className="text-[#414846] dark:text-[#a9acaa]">Trabajo:</span>
                      <span className="font-bold text-[#1c1b1b] dark:text-white">{res.serviceTitle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#414846] dark:text-[#a9acaa]">Pago Est.:</span>
                      <span className="font-bold text-[#033028] dark:text-[#a5cfc4]">{formatCRC(res.totalCRC)} ({res.paymentMethod})</span>
                    </div>
                    {res.description && (
                      <p className="text-[11px] text-[#414846] dark:text-[#a9acaa] italic pt-1 border-t border-[#e5e2e1] dark:border-[#2e3633]">
                        "{res.description}"
                      </p>
                    )}
                  </div>

                  {/* Direct Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={`tel:${handymanObj.phone}`}
                      className="bg-white dark:bg-[#1a201d] hover:bg-[#f6f3f2] dark:hover:bg-[#222926] text-[#1c1b1b] dark:text-white font-bold py-2.5 px-3 rounded-xl border border-[#c0c8c5] dark:border-[#414846] text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-xs"
                    >
                      <Phone className="w-4 h-4 text-[#033028] dark:text-[#a5cfc4]" />
                      <span>Llamar Técnico</span>
                    </a>

                    <button
                      onClick={() => onOpenChat(handymanObj)}
                      className="bg-[#033028] dark:bg-[#1e463e] hover:bg-[#1e463e] dark:hover:bg-[#264e45] text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-all transform active:scale-95"
                    >
                      <MessageSquare className="w-4 h-4 text-[#e5a93c]" />
                      <span>Chat en Vivo</span>
                    </button>
                  </div>

                  {/* Incident & Cancel Action Buttons Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleOpenCancelModal(res)}
                      className="w-full bg-[#f6f3f2] dark:bg-[#222926] hover:bg-[#ffdad6] text-[#ba1a1a] dark:text-[#ffb4ab] font-bold py-2 px-3 rounded-xl text-[11px] flex items-center justify-center space-x-1 border border-[#ba1a1a]/30 transition-all"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Cancelar Cita</span>
                    </button>

                    <button
                      onClick={onOpenIncidentModal}
                      className="w-full bg-[#ffdad6] dark:bg-[#3f1919] hover:bg-[#ba1a1a] text-[#ba1a1a] dark:text-[#ffdad6] hover:text-white font-bold py-2 px-3 rounded-xl text-[11px] flex items-center justify-center space-x-1 border border-[#ba1a1a]/30 transition-all"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Reportar Incidencia</span>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white dark:bg-[#1a201d] rounded-3xl p-8 text-center border border-[#e5e2e1] dark:border-[#2e3633] card-shadow space-y-3">
              <Calendar className="w-10 h-10 text-[#e5a93c] mx-auto" />
              <h3 className="font-extrabold text-base text-[#1c1b1b] dark:text-white">No tienes citas activas</h3>
              <p className="text-xs text-[#414846] dark:text-[#a9acaa]">
                Crea una nueva solicitud de cita técnica para reparar o instalar en tu hogar.
              </p>
              <button
                onClick={onOpenSolicitarCita}
                className="bg-[#033028] text-white font-black px-4 py-2.5 rounded-xl text-xs shadow-md inline-flex items-center space-x-1"
              >
                <Plus className="w-4 h-4 text-[#e5a93c]" />
                <span>Solicitar Cita Ahora</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* CANCELLATION CONFIRMATION MODAL WITH 2-HOUR PENALTY POLICY */}
      {cancelModalCita && (
        <div className="fixed inset-0 z-50 bg-[#1c1b1b]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1a201d] rounded-3xl p-5 max-w-sm w-full border border-[#e5e2e1] dark:border-[#2e3633] space-y-4 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-[#e5e2e1] dark:border-[#2e3633] pb-2">
              <h4 className="font-black text-sm text-[#1c1b1b] dark:text-white flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-[#ba1a1a]" />
                Confirmación de Cancelación
              </h4>
              <button onClick={() => setCancelModalCita(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            {/* Late vs Free Cancellation Warning Box */}
            {cancelPenaltyInfo?.isLate ? (
              <div className="bg-[#fff5f5] dark:bg-[#321616] border border-[#ff8a8a] rounded-2xl p-3.5 space-y-1.5 text-xs text-[#b91c1c] dark:text-[#ffb4ab]">
                <div className="flex items-center space-x-1.5 font-black">
                  <span>⚠️ Política de Cancelación Tardía (Menos de 2 Horas)</span>
                </div>
                <p className="text-[11px] leading-tight opacity-90">
                  Estás cancelando tu cita a menos de 2 horas de la hora pactada (o servicio de emergencia). Se aplicará una tarifa de penalización de <strong>₡5,000 CRC</strong> por desplazamiento del especialista en condominio.
                </p>
              </div>
            ) : (
              <div className="bg-[#f0f7f5] dark:bg-[#162b25] border border-[#c1ebe0] dark:border-[#2e3633] rounded-2xl p-3.5 space-y-1 text-xs text-[#033028] dark:text-[#a5cfc4]">
                <div className="flex items-center space-x-1.5 font-black">
                  <span>✅ Cancelación Anticipada Gratuita</span>
                </div>
                <p className="text-[11px] leading-tight opacity-90">
                  Tu cita será cancelada sin ningún costo ya que estás cancelando con más de 2 horas de anticipación.
                </p>
              </div>
            )}

            <div className="text-xs space-y-1 text-[#414846] dark:text-[#a9acaa] bg-[#f6f3f2] dark:bg-[#222926] p-3 rounded-xl border border-[#e5e2e1] dark:border-[#2e3633]">
              <p>Cita: <strong>{cancelModalCita.serviceTitle}</strong></p>
              <p>Fecha/Hora: <strong>{cancelModalCita.scheduledDate} {cancelModalCita.scheduledTime}</strong></p>
            </div>

            <div className="flex space-x-2 pt-1">
              <button
                onClick={() => setCancelModalCita(null)}
                className="flex-1 bg-gray-100 dark:bg-[#222926] text-gray-700 dark:text-white font-bold text-xs py-2.5 rounded-xl"
              >
                Volver
              </button>
              <button
                onClick={handleConfirmCancel}
                className="flex-1 bg-[#ba1a1a] hover:bg-red-700 text-white font-black text-xs py-2.5 rounded-xl shadow-md transition-all"
              >
                {cancelPenaltyInfo?.isLate ? 'Confirmar (+₡5,000)' : 'Confirmar Cancelación'}
              </button>
            </div>
          </div>
        </div>
      )}


      {/* COMPLETED PAST RESERVATIONS LIST */}
      {activeTab === 'past' && (
        <div className="space-y-3">
          {pastCitasList.length > 0 ? (
            pastCitasList.map((res) => {
              const handymanObj = HANDYMEN.find(h => h.id === res.assignedHandymanId) || HANDYMEN[0];
              return (
                <div 
                  key={res.id}
                  className="bg-white dark:bg-[#1a201d] rounded-2xl p-4 border border-[#e5e2e1] dark:border-[#2e3633] card-shadow space-y-2 text-xs"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={handymanObj.avatar}
                        alt={handymanObj.name}
                        className="w-11 h-11 rounded-xl object-cover border border-[#e5e2e1] dark:border-[#2e3633]"
                      />
                      <div>
                        <h4 className="font-bold text-[#1c1b1b] dark:text-white text-sm">{res.serviceTitle}</h4>
                        <p className="text-xs text-[#414846] dark:text-[#a9acaa]">
                          Técnico: <strong className="text-[#1c1b1b] dark:text-white">{res.assignedHandymanName || handymanObj.name}</strong>
                        </p>
                      </div>
                    </div>
                    <span className="bg-[#f0f7f5] dark:bg-[#162b25] text-[#033028] dark:text-[#a5cfc4] border border-[#c1ebe0] dark:border-[#2e3633] text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {res.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#e5e2e1] dark:border-[#2e3633] text-[#414846] dark:text-[#a9acaa] text-[11px]">
                    <span>{res.scheduledDate} • {res.paymentMethod}</span>
                    <span className="font-extrabold text-[#033028] dark:text-[#a5cfc4] text-sm">{formatCRC(res.totalCRC)}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white dark:bg-[#1a201d] rounded-2xl p-6 text-center border border-[#e5e2e1] dark:border-[#2e3633] text-xs text-[#414846] dark:text-[#a9acaa]">
              No hay citas completadas anteriormente.
            </div>
          )}
        </div>
      )}

    </div>
  );
}
