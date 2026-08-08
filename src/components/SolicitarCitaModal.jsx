import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Wrench, ShieldCheck, DollarSign, CheckCircle2, User, Camera, Image } from 'lucide-react';
import { HANDYMEN } from '../data/mockData';
import { uploadPhoto } from '../services/api';

export default function SolicitarCitaModal({ client, onClose, onSubmitCita }) {
  const [serviceTitle, setServiceTitle] = useState('');
  const [category, setCategory] = useState('Plomería');
  const [description, setDescription] = useState('');
  const [scheduledDate, setScheduledDate] = useState(new Date().toISOString().split('T')[0]);
  const [scheduledTime, setScheduledTime] = useState('14:00');
  const [condo, setCondo] = useState(client?.condo || 'Condominio Montes del Sol');
  const [unit, setUnit] = useState(client?.unit || 'Casa 42B');
  const [paymentMethod, setPaymentMethod] = useState('SINPE Móvil');
  const [assignedHandymanId, setAssignedHandymanId] = useState('');
  const [totalCRC, setTotalCRC] = useState(18000);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoBase64, setPhotoBase64] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
      setPhotoBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!serviceTitle.trim()) return;

    setIsSubmitting(true);

    let uploadedPhotoUrl = null;
    if (photoBase64) {
      uploadedPhotoUrl = await uploadPhoto(photoBase64, `cita_${Date.now()}.jpg`);
    }

    const selectedHandymanObj = HANDYMEN.find(h => h.id === assignedHandymanId);

    const payload = {
      clientName: client?.name || 'Doña Sofía Arguedas',
      clientPhone: client?.phone || '+506 8844-1122',
      condo,
      unit,
      serviceTitle,
      category,
      description,
      scheduledDate,
      scheduledTime,
      paymentMethod,
      totalCRC: Number(totalCRC),
      assignedHandymanId: assignedHandymanId || null,
      assignedHandymanName: selectedHandymanObj ? selectedHandymanObj.name : null,
      photoUrl: uploadedPhotoUrl
    };

    await onSubmitCita(payload);
    setIsSubmitting(false);
    onClose();
  };


  return (
    <div className="fixed inset-0 z-50 bg-[#1c1b1b]/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="bg-white dark:bg-[#1a201d] w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col border border-[#e5e2e1] dark:border-[#2e3633] shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 border-b border-[#e5e2e1] dark:border-[#2e3633] flex items-center justify-between bg-[#fcf9f8] dark:bg-[#121614]">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-xl bg-[#033028] dark:bg-[#1e463e] text-[#e5a93c] flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#1c1b1b] dark:text-white">Solicitar Nueva Cita</h3>
              <p className="text-[11px] text-[#414846] dark:text-[#a9acaa]">Agendar servicio técnico para tu residencia</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#f0eded] dark:hover:bg-[#222926] text-[#717976] dark:text-[#a9acaa]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto flex-1 text-xs">
          
          {/* Service Title */}
          <div>
            <label className="block font-bold text-[#1c1b1b] dark:text-white mb-1">
              Título del Servicio o Reparación *
            </label>
            <input
              type="text"
              required
              placeholder="Ej: Fuga en pila, Cambio de tomacorriente, Fuga de agua"
              value={serviceTitle}
              onChange={(e) => setServiceTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#c0c8c5] dark:border-[#414846] bg-white dark:bg-[#222926] text-[#1c1b1b] dark:text-white focus:outline-none focus:border-[#033028] dark:focus:border-[#e5a93c]"
            />
          </div>

          {/* Category */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-[#1c1b1b] dark:text-white mb-1">
                Categoría
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#c0c8c5] dark:border-[#414846] bg-white dark:bg-[#222926] text-[#1c1b1b] dark:text-white focus:outline-none"
              >
                <option value="Plomería">Plomería</option>
                <option value="Electricidad">Electricidad</option>
                <option value="Cerrajería">Cerrajería</option>
                <option value="Pintura">Pintura</option>
                <option value="Mantenimiento General">Mantenimiento General</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#1c1b1b] dark:text-white mb-1">
                Presupuesto Est. (CRC)
              </label>
              <input
                type="number"
                step="1000"
                value={totalCRC}
                onChange={(e) => setTotalCRC(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#c0c8c5] dark:border-[#414846] bg-white dark:bg-[#222926] text-[#1c1b1b] dark:text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-bold text-[#1c1b1b] dark:text-white mb-1">
              Descripción del trabajo
            </label>
            <textarea
              rows={2}
              placeholder="Detalla lo que necesitas reparar o instalar..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-[#c0c8c5] dark:border-[#414846] bg-white dark:bg-[#222926] text-[#1c1b1b] dark:text-white focus:outline-none"
            />
          </div>

          {/* Photo Attachment Field */}
          <div>
            <label className="block font-bold text-[#1c1b1b] dark:text-white mb-1">
              Adjuntar Foto de la Avería / Reparación (Opcional)
            </label>
            
            <div className="flex items-center space-x-3">
              <label className="flex-1 border-2 border-dashed border-[#c0c8c5] dark:border-[#414846] hover:border-[#033028] dark:hover:border-[#e5a93c] rounded-2xl p-3 flex items-center justify-center space-x-2 cursor-pointer bg-[#f6f3f2] dark:bg-[#222926] transition-all">
                <Camera className="w-4 h-4 text-[#033028] dark:text-[#e5a93c]" />
                <span className="font-bold text-[#1c1b1b] dark:text-white text-xs">
                  {photoPreview ? 'Cambiar Foto' : 'Tomar o Seleccionar Foto'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>

              {photoPreview && (
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#e5a93c] shadow-sm shrink-0">
                  <img src={photoPreview} alt="Avería preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => { setPhotoPreview(null); setPhotoBase64(null); }}
                    className="absolute top-0.5 right-0.5 bg-red-600 text-white rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>


          {/* Date & Time Picker */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-[#1c1b1b] dark:text-white mb-1">
                Fecha Deseada
              </label>
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#c0c8c5] dark:border-[#414846] bg-white dark:bg-[#222926] text-[#1c1b1b] dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-[#1c1b1b] dark:text-white mb-1">
                Hora Preferida
              </label>
              <input
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#c0c8c5] dark:border-[#414846] bg-white dark:bg-[#222926] text-[#1c1b1b] dark:text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Condo Address & Unit */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-[#1c1b1b] dark:text-white mb-1">
                Condominio / Residencial
              </label>
              <input
                type="text"
                value={condo}
                onChange={(e) => setCondo(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#c0c8c5] dark:border-[#414846] bg-white dark:bg-[#222926] text-[#1c1b1b] dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-[#1c1b1b] dark:text-white mb-1">
                Casa / Apto / Unidad
              </label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#c0c8c5] dark:border-[#414846] bg-white dark:bg-[#222926] text-[#1c1b1b] dark:text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Assign Handyman (Optional) */}
          <div>
            <label className="block font-bold text-[#1c1b1b] dark:text-white mb-1">
              Asignar Técnico Específico (Opcional)
            </label>
            <select
              value={assignedHandymanId}
              onChange={(e) => setAssignedHandymanId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#c0c8c5] dark:border-[#414846] bg-white dark:bg-[#222926] text-[#1c1b1b] dark:text-white focus:outline-none"
            >
              <option value="">-- Cualquiera disponible (Socio cercanía) --</option>
              {HANDYMEN.map(h => (
                <option key={h.id} value={h.id}>
                  {h.name} ({h.specialty}) ★ {h.rating}
                </option>
              ))}
            </select>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block font-bold text-[#1c1b1b] dark:text-white mb-1">
              Método de Pago
            </label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('SINPE Móvil')}
                className={`flex-1 py-2 rounded-xl font-bold border text-center transition-all ${
                  paymentMethod === 'SINPE Móvil'
                    ? 'bg-[#033028] dark:bg-[#1e463e] text-white border-[#033028]'
                    : 'bg-white dark:bg-[#222926] text-[#414846] dark:text-[#a9acaa] border-[#c0c8c5]'
                }`}
              >
                SINPE Móvil
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('Tarjeta Visa/Mastercard')}
                className={`flex-1 py-2 rounded-xl font-bold border text-center transition-all ${
                  paymentMethod === 'Tarjeta Visa/Mastercard'
                    ? 'bg-[#033028] dark:bg-[#1e463e] text-white border-[#033028]'
                    : 'bg-white dark:bg-[#222926] text-[#414846] dark:text-[#a9acaa] border-[#c0c8c5]'
                }`}
              >
                Tarjeta
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#033028] dark:bg-[#1e463e] hover:bg-[#1e463e] dark:hover:bg-[#264e45] text-white font-extrabold py-3.5 px-4 rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2 text-sm mt-2"
          >
            <CheckCircle2 className="w-5 h-5 text-[#e5a93c]" />
            <span>{isSubmitting ? 'Guardando Cita...' : 'Confirmar & Registrar Cita'}</span>
          </button>
        </form>

      </div>
    </div>
  );
}
