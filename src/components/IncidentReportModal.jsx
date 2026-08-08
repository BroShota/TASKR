import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, X, Send, CheckCircle, Camera, PhoneCall } from 'lucide-react';

export default function IncidentReportModal({ client, onClose }) {
  const [incidentType, setIncidentType] = useState('delay');
  const [description, setDescription] = useState('');
  const [notifyCondoAdmin, setNotifyCondoAdmin] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1c1b1b]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-[#ffdad6] flex flex-col text-[#1c1b1b]">
        
        {/* Header */}
        <div className="bg-[#ba1a1a] text-white p-5 relative border-b border-[#93000a]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white p-1.5 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-black">Centro de Seguridad & Reportes</h3>
              <p className="text-xs text-rose-100 font-medium">Asistencia inmediata TASKR Costa Rica</p>
            </div>
          </div>
        </div>

        {/* Content */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
            <div className="bg-[#ffdad6] border border-[#ba1a1a]/30 rounded-xl p-3 text-[#93000a]">
              <p className="font-semibold flex items-center gap-1.5 text-xs">
                <AlertTriangle className="w-4 h-4 text-[#ba1a1a] shrink-0" />
                Tu seguridad es nuestra prioridad número uno.
              </p>
              <p className="text-[11px] text-[#ba1a1a] mt-1">
                Los reportes priorizados activan una alerta directa con la administración de {client.condo} y nuestro soporte telefónico 24/7.
              </p>
            </div>

            {/* Select Incident Type */}
            <div>
              <label className="block font-bold text-[#1c1b1b] mb-1">
                Motivo del Reporte / Incidencia:
              </label>
              <select
                value={incidentType}
                onChange={(e) => setIncidentType(e.target.value)}
                className="w-full bg-[#f6f3f2] border border-[#c0c8c5] rounded-xl p-2.5 font-semibold text-[#1c1b1b] focus:ring-2 focus:ring-[#ba1a1a] focus:outline-none"
              >
                <option value="delay">Retraso excesivo o no llegada del técnico</option>
                <option value="pricing">Discrepancia en cobro o tarifa no acordada</option>
                <option value="conduct">Comportamiento inapropiado o falta de respeto</option>
                <option value="damage">Daño accidental en propiedad del condominio</option>
                <option value="emergency">Emergencia de seguridad o desacuerdo grave</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block font-bold text-[#1c1b1b] mb-1">
                Detalle de lo ocurrido:
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe brevemente la situación..."
                className="w-full bg-[#f6f3f2] border border-[#c0c8c5] rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-[#ba1a1a] focus:outline-none text-[#1c1b1b]"
              />
            </div>

            {/* Attach photo simulator */}
            <div className="border border-dashed border-[#c0c8c5] rounded-xl p-3 bg-[#f6f3f2] text-center hover:bg-[#f0eded] transition-colors cursor-pointer">
              <Camera className="w-5 h-5 text-[#717976] mx-auto mb-1" />
              <span className="font-semibold text-[#1c1b1b] block text-[11px]">Adjuntar Foto de Evidencia (Opcional)</span>
              <span className="text-[10px] text-[#717976]">JPG, PNG hasta 10MB</span>
            </div>

            {/* Checkbox Notify Condo Admin */}
            <label className="flex items-center space-x-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={notifyCondoAdmin}
                onChange={(e) => setNotifyCondoAdmin(e.target.checked)}
                className="w-4 h-4 text-[#ba1a1a] rounded border-[#c0c8c5] focus:ring-[#ba1a1a]"
              />
              <span className="font-semibold text-[#1c1b1b]">Notificar a la administración de {client.condo}</span>
            </label>

            {/* Emergency Hotline Banner */}
            <div className="pt-2 flex items-center justify-between border-t border-[#e5e2e1]">
              <a
                href="tel:22008275"
                className="text-[#ba1a1a] font-bold flex items-center gap-1.5 hover:underline text-xs"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Línea Directa: +506 2200-TASK</span>
              </a>

              <button
                type="submit"
                className="bg-[#ba1a1a] hover:bg-[#93000a] text-white font-extrabold py-2.5 px-4 rounded-xl shadow-md transition-all flex items-center space-x-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Enviar Reporte</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 bg-[#f0f7f5] text-[#033028] border border-[#c1ebe0] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-[#033028]" />
            </div>
            <h4 className="text-lg font-bold text-[#1c1b1b]">Reporte Recibido</h4>
            <p className="text-xs text-[#414846] leading-relaxed">
              Hemos registrado el folio <strong className="font-mono text-[#1c1b1b]">INC-2026-9041</strong>. Un agente de seguridad TASKR se pondrá en contacto contigo en menos de 5 minutos.
            </p>
            <button
              onClick={onClose}
              className="bg-[#1c1b1b] hover:bg-[#313030] text-white font-bold py-2.5 px-6 rounded-xl text-xs"
            >
              Cerrar y Volver
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
