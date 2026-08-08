import React from 'react';
import { 
  ShieldCheck, MapPin, Phone, Mail, CreditCard, 
  Star, DollarSign, UserCheck, MessageSquareQuote, LogIn, LogOut 
} from 'lucide-react';

export default function ProfileView({ client, onOpenAuthModal }) {
  const formatCRC = (amount) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Mock client reviews left by handymen
  const clientReviews = [
    {
      id: 'REV-1',
      handymanName: 'Mario Jiménez (Plomero)',
      rating: 5,
      comment: 'Excelente residente. Acceso a caseta registrado previamente sin demoras.',
      date: '24 Jul, 2026'
    },
    {
      id: 'REV-2',
      handymanName: 'Ricardo Solís (Pintor)',
      rating: 5,
      comment: 'Muy amable y pago por SINPE realizado inmediatamente al terminar.',
      date: '10 Jul, 2026'
    }
  ];

  return (
    <div className="space-y-4 pb-20 px-4 pt-4 text-[#1c1b1b] dark:text-[#f3f0ef] transition-colors duration-500">
      
      {/* Minimalist Profile Header */}
      <div className="bg-white dark:bg-[#1a201d] rounded-3xl p-5 border border-[#e5e2e1] dark:border-[#2e3633] card-shadow space-y-3">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={client.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={client.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-[#e5a93c] shadow-sm"
            />
            <span className="absolute -bottom-1 -right-1 bg-[#033028] dark:bg-[#1e463e] text-[#e5a93c] p-1 rounded-full border-2 border-white dark:border-[#1a201d]">
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-black text-[#1c1b1b] dark:text-white truncate">{client.name}</h2>
              <span className="bg-[#e5a93c] text-[#1c1b1b] text-[9px] font-black uppercase px-2 py-0.5 rounded-full shrink-0">
                PRO
              </span>
            </div>
            
            <p className="text-xs text-[#414846] dark:text-[#a9acaa] flex items-center gap-1 mt-0.5 truncate">
              <MapPin className="w-3 h-3 text-[#e5a93c] shrink-0" />
              <span>{client.condo} • {client.unit || client.condoUnit}</span>
            </p>

            <p className="text-[11px] text-[#033028] dark:text-[#a5cfc4] font-semibold mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#e5a93c]" />
              Cédula CR: <span className="font-mono font-bold">{client.idNumber || '1-1492-0841'}</span>
            </p>
          </div>
        </div>

        {/* Change Account / Login Button */}
        <button
          onClick={onOpenAuthModal}
          className="w-full bg-[#f0f7f5] dark:bg-[#162b25] hover:bg-[#c1ebe0] text-[#033028] dark:text-[#a5cfc4] font-bold py-2 px-3 rounded-xl border border-[#c1ebe0] dark:border-[#2e3633] text-xs flex items-center justify-center space-x-1.5 transition-colors"
        >
          <LogIn className="w-4 h-4 text-[#e5a93c]" />
          <span>Iniciar Sesión / Cambiar Cuenta de Residente</span>
        </button>
      </div>


      {/* 1. DATOS PERSONALES & CONTACTO */}
      <div className="bg-white dark:bg-[#1a201d] rounded-3xl p-4 border border-[#e5e2e1] dark:border-[#2e3633] card-shadow space-y-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-[#414846] dark:text-[#a9acaa] flex items-center gap-1.5">
          <UserCheck className="w-4 h-4 text-[#033028] dark:text-[#a5cfc4]" />
          <span>Datos de Identificación</span>
        </h3>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between py-1.5 border-b border-[#e5e2e1] dark:border-[#2e3633]">
            <span className="text-[#414846] dark:text-[#a9acaa] flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#033028] dark:text-[#a5cfc4]" />
              Teléfono
            </span>
            <span className="font-bold text-[#1c1b1b] dark:text-white">{client.phone}</span>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-[#e5e2e1] dark:border-[#2e3633]">
            <span className="text-[#414846] dark:text-[#a9acaa] flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#033028] dark:text-[#a5cfc4]" />
              Correo Electrónico
            </span>
            <span className="font-semibold text-[#1c1b1b] dark:text-white">{client.email}</span>
          </div>

          <div className="flex items-center justify-between py-1.5">
            <span className="text-[#414846] dark:text-[#a9acaa] flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#033028] dark:text-[#a5cfc4]" />
              Condominio Habitual
            </span>
            <span className="font-bold text-[#033028] dark:text-[#a5cfc4]">{client.condo}</span>
          </div>
        </div>
      </div>

      {/* 2. COSTOS & MÉTODOS DE PAGO */}
      <div className="bg-white dark:bg-[#1a201d] rounded-3xl p-4 border border-[#e5e2e1] dark:border-[#2e3633] card-shadow space-y-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-[#414846] dark:text-[#a9acaa] flex items-center gap-1.5">
          <CreditCard className="w-4 h-4 text-[#033028] dark:text-[#a5cfc4]" />
          <span>Costos & Formas de Pago</span>
        </h3>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between py-1.5 border-b border-[#e5e2e1] dark:border-[#2e3633]">
            <span className="text-[#414846] dark:text-[#a9acaa]">SINPE Móvil Principal:</span>
            <span className="font-mono font-bold text-[#033028] dark:text-[#a5cfc4]">{client.sinpePhone}</span>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-[#e5e2e1] dark:border-[#2e3633]">
            <span className="text-[#414846] dark:text-[#a9acaa]">Tarjeta Respaldada:</span>
            <span className="font-mono font-bold text-[#1c1b1b] dark:text-white">Visa **** 4242</span>
          </div>

          <div className="flex items-center justify-between py-1.5">
            <span className="text-[#414846] dark:text-[#a9acaa]">Costo Promedio / Hora:</span>
            <span className="font-bold text-[#033028] dark:text-[#a5cfc4]">₡15,000 - ₡20,000 CRC</span>
          </div>
        </div>
      </div>

      {/* 3. RESEÑAS RECIBIDAS DE TÉCNICOS */}
      <div className="bg-white dark:bg-[#1a201d] rounded-3xl p-4 border border-[#e5e2e1] dark:border-[#2e3633] card-shadow space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#414846] dark:text-[#a9acaa] flex items-center gap-1.5">
            <Star className="w-4 h-4 text-[#e5a93c]" />
            <span>Reseñas de Técnicos</span>
          </h3>
          <span className="text-[11px] font-black text-[#033028] dark:text-[#a5cfc4] bg-[#f0f7f5] dark:bg-[#162b25] px-2 py-0.5 rounded-full border border-[#c1ebe0] dark:border-[#2e3633]">
            ★ 5.0 (Excelente Residente)
          </span>
        </div>

        <div className="space-y-2.5">
          {clientReviews.map((rev) => (
            <div key={rev.id} className="p-3 bg-[#f6f3f2] dark:bg-[#222926] rounded-2xl border border-[#e5e2e1] dark:border-[#2e3633] space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#1c1b1b] dark:text-white">{rev.handymanName}</span>
                <div className="flex text-[#e5a93c]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#e5a93c]" />
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-[#414846] dark:text-[#a9acaa] italic">
                "{rev.comment}"
              </p>
              <span className="text-[10px] text-[#717976] dark:text-[#a9acaa] block text-right">{rev.date}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
