import React, { useState, useEffect } from 'react';
import { CheckCircle2, Navigation, Smartphone, ShieldCheck, Key, MessageSquare, Phone, X } from 'lucide-react';

export default function BookingConfirmationModal({ bookingData, client, onClose, onOpenChat }) {
  if (!bookingData) return null;

  const { handyman, totalCRC, paymentMethod, hours, isEmergency } = bookingData;
  const [passcode] = useState(() => `PASS-${Math.floor(1000 + Math.random() * 9000)}`);
  const [copied, setCopied] = useState(false);

  const formatCRC = (amount) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const copyPasscode = () => {
    navigator.clipboard?.writeText(passcode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1c1b1b]/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-[#e5e2e1] flex flex-col text-[#1c1b1b]">
        
        {/* Success Header */}
        <div className="bg-[#033028] text-white p-6 text-center relative border-b border-[#1e463e]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white p-1.5 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 bg-white text-[#033028] rounded-full flex items-center justify-center mx-auto mb-3 shadow-xl transform scale-110 animate-bounce">
            <CheckCircle2 className="w-10 h-10 text-[#033028]" />
          </div>

          <h3 className="text-xl font-black">¡Reserva Confirmada!</h3>
          <p className="text-xs text-[#a5cfc4] mt-1 font-medium">
            Notificación enviada a la caseta de seguridad de {client.condo}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Real time ETA Box */}
          <div className="bg-[#f0f7f5] border border-[#c1ebe0] rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#033028] text-[#e5a93c] flex items-center justify-center shadow-md">
                <Navigation className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#033028] tracking-wider block">
                  Técnico en Camino
                </span>
                <p className="text-sm font-extrabold text-[#1c1b1b]">
                  Llegada estim.: <span className="text-[#033028]">{handyman.estimatedArrivalMins} minutos</span>
                </p>
              </div>
            </div>
          </div>

          {/* Gate Access Passcode for Condominium Guard */}
          <div className="bg-[#033028] text-white rounded-2xl p-4 border border-[#1e463e]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-[#a5cfc4] uppercase font-bold tracking-wider flex items-center gap-1">
                <Key className="w-3.5 h-3.5 text-[#e5a93c]" />
                Pase de Entrada Caseta Seguridad
              </span>
              <span className="text-[10px] bg-[#1e463e] text-[#c1ebe0] font-semibold px-2 py-0.5 rounded-full">
                Válido por 2 hrs
              </span>
            </div>
            
            <div className="flex items-center justify-between bg-[#1e463e] p-2.5 rounded-xl border border-[#3e665d] mt-2">
              <span className="text-xl font-black font-mono tracking-wider text-[#e5a93c]">
                {passcode}
              </span>
              <button
                onClick={copyPasscode}
                className="bg-[#e5a93c] hover:bg-[#fdbe50] text-[#1c1b1b] font-bold text-xs px-3 py-1.5 rounded-lg transition-colors"
              >
                {copied ? '¡Copiado!' : 'Copiar'}
              </button>
            </div>
            <p className="text-[11px] text-[#a5cfc4] mt-2">
              Se enviará automáticamente a los oficiales del condominio al aproximarse el técnico.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-[#f6f3f2] rounded-2xl p-4 border border-[#e5e2e1] text-xs space-y-2">
            <div className="flex justify-between py-1 border-b border-[#e5e2e1]">
              <span className="text-[#414846]">Profesional:</span>
              <span className="font-bold text-[#1c1b1b]">{handyman.name}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#e5e2e1]">
              <span className="text-[#414846]">Especialidad:</span>
              <span className="font-semibold text-[#1c1b1b]">{handyman.specialty}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#e5e2e1]">
              <span className="text-[#414846]">Hora / Modalidad:</span>
              <span className="font-semibold text-[#1c1b1b]">{bookingData.timeSlot || (bookingData.isEmergency ? 'Atención Inmediata' : '08:00 AM')}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#e5e2e1]">
              <span className="text-[#414846]">Método de pago:</span>
              <span className="font-extrabold text-[#033028] uppercase">{paymentMethod}</span>
            </div>
            <div className="flex justify-between py-1 pt-2 font-bold text-sm">
              <span className="text-[#1c1b1b]">Total a pagar:</span>
              <span className="text-[#033028]">{formatCRC(totalCRC)} CRC</span>
            </div>
          </div>

          {/* SINPE instructions if payment method was SINPE */}
          {paymentMethod === 'sinpe' && (
            <div className="bg-[#f0f7f5] border border-[#c1ebe0] rounded-2xl p-3.5 text-xs text-[#033028]">
              <div className="flex items-center space-x-2 font-bold mb-1">
                <Smartphone className="w-4 h-4 text-[#033028]" />
                <span>Instrucciones SINPE Móvil</span>
              </div>
              <p className="text-[11px] text-[#414846] leading-tight">
                Transfiere <strong className="font-bold text-[#1c1b1b]">{formatCRC(totalCRC)}</strong> al número SINPE <span className="font-bold font-mono bg-white px-1 py-0.5 rounded border border-[#c1ebe0] text-[#033028]">{handyman.sinpeNumber}</span> ({handyman.name}) y comparte el recibo en el chat.
              </p>
            </div>
          )}

          {/* Communication CTA */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <a
              href={`tel:${handyman.phone}`}
              className="w-full bg-white hover:bg-[#f6f3f2] text-[#1c1b1b] font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors border border-[#c0c8c5]"
            >
              <Phone className="w-4 h-4 text-[#033028]" />
              <span>Llamar</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onOpenChat(handyman);
              }}
              className="w-full bg-[#033028] hover:bg-[#1e463e] text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4 text-[#e5a93c]" />
              <span>Abrir Chat</span>
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f6f3f2] border-t border-[#e5e2e1]">
          <button
            onClick={onClose}
            className="w-full bg-[#1c1b1b] hover:bg-[#313030] text-white font-bold py-3 rounded-xl text-xs transition-colors"
          >
            Volver a la Pantalla Principal
          </button>
        </div>

      </div>
    </div>
  );
}
