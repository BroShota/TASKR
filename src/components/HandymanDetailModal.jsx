import React, { useState } from 'react';
import { 
  X, Star, ShieldCheck, MapPin, Clock, Wrench, Phone, MessageSquare, 
  CreditCard, Smartphone, Banknote, Navigation, CheckCircle2, AlertCircle, ChevronRight
} from 'lucide-react';

export default function HandymanDetailModal({ 
  handyman, 
  client, 
  onClose, 
  onConfirmBooking,
  onOpenChat,
  initialMode = 'profile' // 'profile' or 'book'
}) {
  const todayStr = new Date().toISOString().split('T')[0];
  const [modalMode, setModalMode] = useState(initialMode); // 'profile' or 'book'
  const [selectedDateDay, setSelectedDateDay] = useState('Hoy'); // 'Hoy', 'Mañana', 'Fecha'
  const [customDate, setCustomDate] = useState(todayStr);
  const [customTime, setCustomTime] = useState('09:00');
  const [isEmergency, setIsEmergency] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('sinpe'); // 'sinpe', 'card', 'cash'
  const [notes, setNotes] = useState('');

  if (!handyman) return null;

  // Format 24h string to 12h string with AM/PM
  const formatTime12h = (time24) => {
    if (!time24) return '09:00 AM';
    const [hStr, mStr] = time24.split(':');
    const h = parseInt(hStr, 10);
    const period = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 || 12;
    const hourStr = hour12 < 10 ? `0${hour12}` : `${hour12}`;
    return `${hourStr}:${mStr || '00'} ${period}`;
  };

  const getDateDisplayText = () => {
    if (selectedDateDay === 'Hoy') return 'Hoy';
    if (selectedDateDay === 'Mañana') return 'Mañana';
    return `El ${customDate}`;
  };

  // Base visit and diagnostic fee
  const baseTotal = handyman.hourlyRateCRC || 15000;
  const emergencyFee = isEmergency ? 5000 : 0;
  const grandTotalCRC = baseTotal + emergencyFee;

  const formatCRC = (amount) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleBooking = () => {
    const formattedSlot = isEmergency 
      ? 'Atención Inmediata de Emergencia' 
      : `${getDateDisplayText()} a las ${formatTime12h(customTime)}`;

    onConfirmBooking({
      handyman,
      timeSlot: formattedSlot,
      totalCRC: grandTotalCRC,
      paymentMethod: selectedPayment,
      isEmergency,
      notes
    });
  };




  return (
    <div className="fixed inset-0 z-50 bg-[#1c1b1b]/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white dark:bg-[#1a201d] w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-[#e5e2e1] dark:border-[#2e3633] transition-colors duration-500">
        
        {/* Modal Header with Light Luxury Glass Aesthetic */}
        <div className="relative bg-white/95 dark:bg-[#1a201d]/95 backdrop-blur-md text-[#1c1b1b] dark:text-white p-5 pt-6 shrink-0 border-b border-[#e5e2e1] dark:border-[#2e3633] transition-colors duration-500">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-[#f0eded] dark:bg-[#222926] hover:bg-[#eae7e7] dark:hover:bg-[#2a332f] text-[#1c1b1b] dark:text-white p-2 rounded-full border border-[#c0c8c5] dark:border-[#414846] transition-colors shadow-xs z-10"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-4 mb-4">
            <img
              src={handyman.avatar}
              alt={handyman.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-[#e5a93c] shadow-md"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-black text-[#1c1b1b] dark:text-white">{handyman.name}</h2>
                <ShieldCheck className="w-5 h-5 text-[#e5a93c] shrink-0" />
              </div>
              <p className="text-xs font-bold text-[#033028] dark:text-[#a5cfc4]">{handyman.specialty}</p>

              <div className="flex items-center space-x-2 text-xs mt-1">
                <div className="flex items-center text-[#7e5700] dark:text-[#fdbe50] font-bold bg-[#fef8ec] dark:bg-[#332408] px-2 py-0.5 rounded-md border border-[#fdbe50] dark:border-[#714d00]">
                  <Star className="w-3.5 h-3.5 fill-[#e5a93c] mr-1" />
                  {handyman.rating.toFixed(1)} ({handyman.reviewsCount} reseñas)
                </div>
              </div>
            </div>
          </div>

          {/* Mode Switcher Tabs: Ver Perfil vs Cotizar & Reservar */}
          <div className="flex bg-[#f0eded] dark:bg-[#222926] p-1 rounded-2xl text-xs font-bold border border-[#e5e2e1] dark:border-[#2e3633]">
            <button
              onClick={() => setModalMode('profile')}
              className={`flex-1 py-2 rounded-xl transition-all ${
                modalMode === 'profile'
                  ? 'bg-white dark:bg-[#1a201d] text-[#033028] dark:text-white border-2 border-[#033028] dark:border-[#e5a93c] shadow-sm font-black'
                  : 'text-[#414846] dark:text-[#a9acaa]'
              }`}
            >
              📄 Perfil & Reseñas
            </button>

            <button
              onClick={() => setModalMode('book')}
              className={`flex-1 py-2 rounded-xl transition-all ${
                modalMode === 'book'
                  ? 'bg-white dark:bg-[#1a201d] text-[#033028] dark:text-white border-2 border-[#033028] dark:border-[#e5a93c] shadow-sm font-black'
                  : 'text-[#414846] dark:text-[#a9acaa]'
              }`}
            >
              📅 Cotizar & Reservar
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-5 flex-1 text-[#1c1b1b] dark:text-[#f3f0ef]">

          {/* MODE 1: PROFESSIONAL PROFILE VIEW */}
          {modalMode === 'profile' && (
            <div className="space-y-4 animate-fade-in">
              {/* REAL-TIME GPS SIMULATION COMPONENT */}
              <div className="bg-white dark:bg-[#1a201d] rounded-2xl p-4 text-[#1c1b1b] dark:text-[#f3f0ef] relative overflow-hidden card-shadow border border-[#e5e2e1] dark:border-[#2e3633]">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center space-x-2">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e5a93c] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#e5a93c]"></span>
                      </span>
                      <span className="text-xs uppercase font-black tracking-wider text-[#033028] dark:text-[#a5cfc4]">
                        GPS en Tiempo Real
                      </span>
                    </div>
                    <span className="text-[11px] bg-[#f0f7f5] dark:bg-[#162b25] text-[#033028] dark:text-[#a5cfc4] font-bold px-2.5 py-0.5 rounded-full border border-[#c1ebe0] dark:border-[#2e3633]">
                      {handyman.availability}
                    </span>
                  </div>

                  <div className="bg-[#f6f3f2] dark:bg-[#222926] rounded-xl p-3 border border-[#e5e2e1] dark:border-[#2e3633] flex items-center justify-between mb-2.5">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-[#033028] dark:bg-[#1e463e] text-[#e5a93c] flex items-center justify-center border border-[#1e463e] shadow-sm">
                        <Navigation className="w-5 h-5 animate-pulse text-[#e5a93c]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#1c1b1b] dark:text-white flex items-center gap-1">
                          <span>Ruta a:</span> {client.condo}
                        </p>
                        <p className="text-[11px] text-[#414846] dark:text-[#a9acaa] font-medium">
                          Tiempo estimado de llegada: <strong className="text-[#033028] dark:text-[#a5cfc4] font-black">{handyman.estimatedArrivalMins} mins</strong>
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#414846] dark:text-[#a9acaa] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#e5a93c] shrink-0" />
                    Zona habitual: <span className="text-[#1c1b1b] dark:text-white font-bold">{handyman.zone}</span>
                  </p>
                </div>
              </div>

              {/* KEY METRICS GRID */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-[#f6f3f2] dark:bg-[#222926] border border-[#e5e2e1] dark:border-[#2e3633] rounded-xl p-2.5 text-center">
                  <span className="text-[10px] text-[#414846] dark:text-[#a9acaa] uppercase font-semibold block">Experiencia</span>
                  <span className="text-sm font-extrabold text-[#1c1b1b] dark:text-white">{handyman.experienceYears}+ Años</span>
                </div>

                <div className="bg-[#f6f3f2] dark:bg-[#222926] border border-[#e5e2e1] dark:border-[#2e3633] rounded-xl p-2.5 text-center">
                  <span className="text-[10px] text-[#414846] dark:text-[#a9acaa] uppercase font-semibold block">Herramientas</span>
                  <span className="text-sm font-extrabold text-[#033028] dark:text-[#a5cfc4]">100% Propias</span>
                </div>

                <div className="bg-[#f6f3f2] dark:bg-[#222926] border border-[#e5e2e1] dark:border-[#2e3633] rounded-xl p-2.5 text-center">
                  <span className="text-[10px] text-[#414846] dark:text-[#a9acaa] uppercase font-semibold block">Garantía</span>
                  <span className="text-sm font-extrabold text-[#1c1b1b] dark:text-white">TASKR Pro</span>
                </div>
              </div>

              {/* COMMUNICATION BUTTONS */}
              <div className="bg-[#f6f3f2] dark:bg-[#222926] rounded-2xl p-3 flex gap-2 border border-[#e5e2e1] dark:border-[#2e3633]">
                <a
                  href={`tel:${handyman.phone}`}
                  className="flex-1 bg-white dark:bg-[#1a201d] hover:bg-[#f0eded] dark:hover:bg-[#2a332f] text-[#1c1b1b] dark:text-white font-bold py-2.5 px-3 rounded-xl border border-[#c0c8c5] dark:border-[#414846] text-xs flex items-center justify-center space-x-2 transition-colors shadow-sm"
                >
                  <Phone className="w-4 h-4 text-[#033028] dark:text-[#a5cfc4]" />
                  <span>Llamar Técnico</span>
                </a>

                <button
                  onClick={() => {
                    onClose();
                    onOpenChat(handyman);
                  }}
                  className="flex-1 bg-[#033028] dark:bg-[#1e463e] hover:bg-[#1e463e] dark:hover:bg-[#264e45] text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-[#e5a93c]" />
                  <span>Chat en Vivo</span>
                </button>
              </div>

              {/* BIO & CERTIFICATIONS */}
              <div>
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-[#414846] dark:text-[#a9acaa] mb-1.5">
                  Sobre el Profesional
                </h4>
                <p className="text-xs text-[#1c1b1b] dark:text-[#f3f0ef] leading-relaxed bg-[#f6f3f2] dark:bg-[#222926] p-3 rounded-xl border border-[#e5e2e1] dark:border-[#2e3633]">
                  {handyman.bio}
                </p>

                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {handyman.certifications.map((cert, i) => (
                    <span key={i} className="text-[11px] bg-white dark:bg-[#222926] text-[#1c1b1b] dark:text-[#f3f0ef] font-semibold px-2.5 py-1 rounded-lg border border-[#c0c8c5] dark:border-[#414846] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#033028] dark:text-[#a5cfc4]" />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* RECENT REVIEWS SUMMARY */}
              {handyman.recentReviews && handyman.recentReviews.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase font-extrabold tracking-wider text-[#414846] dark:text-[#a9acaa] mb-2">
                    Reseñas de Vecinos en Condominios
                  </h4>
                  <div className="space-y-2">
                    {handyman.recentReviews.map((rev) => (
                      <div key={rev.id} className="bg-[#f6f3f2] dark:bg-[#222926] p-2.5 rounded-xl border border-[#e5e2e1] dark:border-[#2e3633] text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-[#1c1b1b] dark:text-white">{rev.user}</span>
                          <div className="flex text-[#e5a93c]">
                            {[...Array(rev.rating)].map((_, idx) => (
                              <Star key={idx} className="w-3 h-3 fill-[#e5a93c] text-[#e5a93c]" />
                            ))}
                          </div>
                        </div>
                        <p className="text-[#414846] dark:text-[#a9acaa] text-[11px] italic">"{rev.comment}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MODE 2: COTIZAR & RESERVAR VIEW */}
          {modalMode === 'book' && (
            <div className="space-y-4 animate-fade-in">
              {/* SCHEDULE & APPOINTMENT TIME SELECTION */}
              <div className="bg-[#f6f3f2] dark:bg-[#222926] rounded-2xl p-4 border border-[#e5e2e1] dark:border-[#2e3633] space-y-3">
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-[#1c1b1b] dark:text-white flex items-center justify-between">
                  <span>Horario & Modalidad del Servicio</span>
                  <span className="text-[10px] text-[#e5a93c] bg-[#fef8ec] dark:bg-[#332408] border border-[#fdbe50] px-2 py-0.5 rounded-full font-bold">
                    Visita & Diagnóstico
                  </span>
                </h4>

                {/* Emergency Toggle Card */}
                <div 
                  onClick={() => setIsEmergency(!isEmergency)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isEmergency 
                      ? 'bg-[#fff5f5] dark:bg-[#321616] border-[#ff8a8a] text-[#b91c1c] dark:text-[#ffb4ab] shadow-sm'
                      : 'bg-white dark:bg-[#1a201d] border-[#c0c8c5] dark:border-[#414846] text-[#1c1b1b] dark:text-[#f3f0ef] hover:bg-[#f0eded]'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${isEmergency ? 'bg-[#b91c1c] text-white' : 'bg-[#f0eded] dark:bg-[#222926] text-[#717976]'}`}>
                      🚨
                    </div>
                    <div>
                      <span className="text-xs font-black block">Atención Inmediata de Emergencia</span>
                      <span className="text-[10px] opacity-80 block">Llegada prioritaria en 15 - 30 min (+₡5,000 CRC)</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isEmergency}
                    onChange={() => {}}
                    className="w-4 h-4 text-[#b91c1c] rounded border-[#c0c8c5] focus:ring-[#b91c1c]"
                  />
                </div>

                {/* Custom Time & Date Selection (If not emergency) */}
                {!isEmergency && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-[#414846] dark:text-[#a9acaa]">
                        Día y Hora deseada para la cita:
                      </label>
                      <span className="text-[10px] text-[#033028] dark:text-[#e5a93c] font-black bg-[#f0f7f5] dark:bg-[#162b25] border border-[#c1ebe0] dark:border-[#2e3633] px-2 py-0.5 rounded-md">
                        🕒 {getDateDisplayText()} a las {formatTime12h(customTime)}
                      </span>
                    </div>

                    {/* Day Selector Pills: Hoy, Mañana, Elegir Fecha */}
                    <div className="flex bg-white dark:bg-[#1a201d] border border-[#c0c8c5] dark:border-[#414846] p-1 rounded-xl">
                      {['Hoy', 'Mañana', 'Elegir Fecha'].map((d) => (
                        <button
                          key={d}
                          onClick={() => setSelectedDateDay(d)}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-black transition-all ${
                            selectedDateDay === d
                              ? 'bg-[#033028] text-white dark:bg-[#e5a93c] dark:text-[#1c1b1b] shadow-xs'
                              : 'text-[#414846] dark:text-[#a9acaa] hover:text-[#1c1b1b]'
                          }`}
                        >
                          {d === 'Elegir Fecha' ? '📅 Fecha' : d}
                        </button>
                      ))}
                    </div>

                    {/* Date and Time Controls Grid */}
                    <div className="grid grid-cols-2 gap-2">
                      {/* Custom Date Input (Visible when 'Elegir Fecha' is active, otherwise shows day indicator) */}
                      {selectedDateDay === 'Elegir Fecha' ? (
                        <input
                          type="date"
                          value={customDate}
                          min={todayStr}
                          onChange={(e) => setCustomDate(e.target.value)}
                          className="w-full bg-white dark:bg-[#1a201d] border-2 border-[#033028] dark:border-[#e5a93c] rounded-xl px-2.5 py-1.5 text-xs font-black text-[#033028] dark:text-[#a5cfc4] focus:outline-none shadow-xs text-center cursor-pointer"
                        />
                      ) : (
                        <div className="flex items-center justify-center bg-[#f6f3f2] dark:bg-[#222926] border border-[#c0c8c5] dark:border-[#414846] rounded-xl px-3 py-1.5 text-xs font-bold text-[#414846] dark:text-[#a9acaa]">
                          <span>Día: <strong>{selectedDateDay}</strong></span>
                        </div>
                      )}

                      {/* Custom Time Input Box */}
                      <div className="relative flex items-center">
                        <input
                          type="time"
                          value={customTime}
                          onChange={(e) => setCustomTime(e.target.value)}
                          className="w-full bg-white dark:bg-[#1a201d] border-2 border-[#033028] dark:border-[#e5a93c] rounded-xl px-3 py-1.5 text-xs font-black text-[#033028] dark:text-[#a5cfc4] focus:outline-none shadow-xs text-center cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                )}



                {/* Notes Input */}
                <div>
                  <label className="text-xs font-bold text-[#414846] dark:text-[#a9acaa] block mb-1">
                    ¿Qué trabajo necesitas realizar?
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ej: Fuga bajo la pila, cambiar enchufe, llave rota..."
                    className="w-full text-xs p-2.5 rounded-xl border border-[#c0c8c5] dark:border-[#414846] bg-white dark:bg-[#1a201d] focus:outline-none focus:ring-2 focus:ring-[#033028] text-[#1c1b1b] dark:text-white"
                  />
                </div>
              </div>


              {/* PAYMENT METHOD SELECTION */}
              <div>
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-[#1c1b1b] dark:text-white mb-2">
                  Método de Pago Seleccionado
                </h4>

                <div className="grid grid-cols-3 gap-2">
                  {/* SINPE MÓVIL */}
                  <button
                    onClick={() => setSelectedPayment('sinpe')}
                    className={`p-3 rounded-2xl text-left flex flex-col justify-between transition-all ${
                      selectedPayment === 'sinpe'
                        ? 'border-2 border-[#033028] dark:border-[#e5a93c] bg-white dark:bg-[#1a201d] text-[#033028] dark:text-[#a5cfc4] shadow-md font-black'
                        : 'border border-[#e5e2e1] dark:border-[#2e3633] bg-white dark:bg-[#1a201d] hover:bg-[#f6f3f2] text-[#414846] dark:text-[#a9acaa]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Smartphone className={`w-5 h-5 ${selectedPayment === 'sinpe' ? 'text-[#033028] dark:text-[#e5a93c]' : 'text-[#717976] dark:text-[#a9acaa]'}`} />
                      <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-[#e5a93c] text-[#1c1b1b]">
                        CR
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-black block">SINPE Móvil</span>
                      <span className="text-[10px] opacity-80 block">Transferencia</span>
                    </div>
                  </button>

                  {/* TARJETA */}
                  <button
                    onClick={() => setSelectedPayment('card')}
                    className={`p-3 rounded-2xl text-left flex flex-col justify-between transition-all ${
                      selectedPayment === 'card'
                        ? 'border-2 border-[#033028] dark:border-[#e5a93c] bg-white dark:bg-[#1a201d] text-[#033028] dark:text-[#a5cfc4] shadow-md font-black'
                        : 'border border-[#e5e2e1] dark:border-[#2e3633] bg-white dark:bg-[#1a201d] hover:bg-[#f6f3f2] text-[#414846] dark:text-[#a9acaa]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <CreditCard className={`w-5 h-5 ${selectedPayment === 'card' ? 'text-[#033028] dark:text-[#e5a93c]' : 'text-[#717976] dark:text-[#a9acaa]'}`} />
                    </div>
                    <div>
                      <span className="text-xs font-black block">Tarjeta</span>
                      <span className="text-[10px] opacity-80 block">Visa / MC</span>
                    </div>
                  </button>

                  {/* EFECTIVO */}
                  <button
                    onClick={() => setSelectedPayment('cash')}
                    className={`p-3 rounded-2xl text-left flex flex-col justify-between transition-all ${
                      selectedPayment === 'cash'
                        ? 'border-2 border-[#033028] dark:border-[#e5a93c] bg-white dark:bg-[#1a201d] text-[#033028] dark:text-[#a5cfc4] shadow-md font-black'
                        : 'border border-[#e5e2e1] dark:border-[#2e3633] bg-white dark:bg-[#1a201d] hover:bg-[#f6f3f2] text-[#414846] dark:text-[#a9acaa]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Banknote className={`w-5 h-5 ${selectedPayment === 'cash' ? 'text-[#033028] dark:text-[#e5a93c]' : 'text-[#717976] dark:text-[#a9acaa]'}`} />
                    </div>
                    <div>
                      <span className="text-xs font-black block">Efectivo</span>
                      <span className="text-[10px] opacity-80 block">Pago directo</span>
                    </div>
                  </button>
                </div>

                {/* SINPE Móvil Highlight Box */}
                {selectedPayment === 'sinpe' && (
                  <div className="mt-2.5 p-3 rounded-xl bg-[#f0f7f5] dark:bg-[#162b25] border border-[#c1ebe0] dark:border-[#2e3633] text-[#033028] dark:text-[#a5cfc4] text-xs flex items-start space-x-2">
                    <ShieldCheck className="w-4 h-4 text-[#033028] dark:text-[#e5a93c] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Pago Seguro por SINPE Móvil</p>
                      <p className="text-[11px] text-[#414846] dark:text-[#a9acaa] mt-0.5">
                        Los datos para realizar la transferencia se enviarán de forma privada una vez confirmada la cita.
                      </p>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

        </div>

        {/* Footer Fixed Action bar */}
        <div className="bg-white/95 dark:bg-[#1a201d]/95 backdrop-blur-md text-[#1c1b1b] dark:text-white p-4 border-t border-[#e5e2e1] dark:border-[#2e3633] flex items-center justify-between shrink-0">
          <div>
            <span className="text-[10px] text-[#414846] dark:text-[#a9acaa] uppercase font-semibold block">Total estimado:</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-lg font-black text-[#033028] dark:text-[#e5a93c]">{formatCRC(grandTotalCRC)}</span>
              <span className="text-xs text-[#414846] dark:text-[#a9acaa]">CRC</span>
            </div>
          </div>

          {modalMode === 'profile' ? (
            <button
              onClick={() => setModalMode('book')}
              className="bg-white dark:bg-[#1a201d] hover:bg-[#f0f7f5] dark:hover:bg-[#162b25] text-[#033028] dark:text-white border-2 border-[#033028] dark:border-[#e5a93c] font-black py-3 px-5 rounded-2xl text-xs shadow-sm transition-all transform active:scale-95 flex items-center space-x-1.5"
            >
              <span>Ir a Cotizar & Reservar</span>
              <ChevronRight className="w-4 h-4 text-[#e5a93c]" />
            </button>
          ) : (
            <button
              onClick={handleBooking}
              className="bg-[#033028] dark:bg-[#1e463e] hover:bg-[#1e463e] dark:hover:bg-[#264e45] text-white font-extrabold py-3 px-6 rounded-2xl text-xs shadow-lg transition-all transform active:scale-95 flex items-center space-x-1.5"
            >
              <span>Confirmar Reserva</span>
              <ChevronRight className="w-4 h-4 text-[#e5a93c]" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
