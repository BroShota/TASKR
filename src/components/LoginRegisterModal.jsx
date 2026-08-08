import React, { useState } from 'react';
import { X, User, Mail, Lock, Phone, Home, Building2, Upload, Camera, LogIn, UserPlus, CheckCircle2 } from 'lucide-react';
import { loginUser, registerUser, uploadPhoto } from '../services/api';

export default function LoginRegisterModal({ onClose, onLoginSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+506 ');
  const [condo, setCondo] = useState('Condominio Montes del Sol');
  const [unit, setUnit] = useState('Casa ');
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarBase64, setAvatarBase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAvatarFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
      setAvatarBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleQuickDemoUser = async (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setLoading(true);
    setErrorMessage('');
    const res = await loginUser(demoEmail, demoPass);
    setLoading(false);
    if (res.user) {
      onLoginSuccess(res.user);
      onClose();
    } else {
      setErrorMessage(res.error || 'Error al iniciar sesión demo');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const res = await loginUser(email, password);
        if (res.user) {
          onLoginSuccess(res.user);
          onClose();
        } else {
          setErrorMessage(res.error || 'Correo o contraseña incorrectos');
        }
      } else {
        let uploadedAvatarUrl = null;
        if (avatarBase64) {
          uploadedAvatarUrl = await uploadPhoto(avatarBase64, `profile_${Date.now()}.jpg`);
        }

        const payload = {
          name,
          email,
          password,
          phone,
          condo,
          unit,
          avatar: uploadedAvatarUrl
        };

        const res = await registerUser(payload);
        if (res.user) {
          onLoginSuccess(res.user);
          onClose();
        } else {
          setErrorMessage(res.error || 'No se pudo crear la cuenta');
        }
      }
    } catch (err) {
      setErrorMessage('Ocurrió un error inesperado al procesar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1c1b1b]/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in text-xs selection:bg-[#033028] selection:text-white">
      <div className="bg-white dark:bg-[#1a201d] w-full max-w-md rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col border border-[#e5e2e1] dark:border-[#2e3633] shadow-2xl overflow-hidden text-[#1c1b1b] dark:text-[#f3f0ef]">
        
        {/* Header */}
        <div className="p-4 border-b border-[#e5e2e1] dark:border-[#2e3633] flex items-center justify-between bg-[#fcf9f8] dark:bg-[#121614]">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-xl bg-[#033028] dark:bg-[#1e463e] text-[#e5a93c] flex items-center justify-center font-bold">
              {mode === 'login' ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base font-black text-[#1c1b1b] dark:text-white">
                {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta de Residente'}
              </h3>
              <p className="text-[11px] text-[#414846] dark:text-[#a9acaa]">Plataforma TASKR Condominios</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#f0eded] dark:hover:bg-[#222926] text-[#717976] dark:text-[#a9acaa]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#e5e2e1] dark:border-[#2e3633] bg-[#f6f3f2] dark:bg-[#222926]">
          <button
            onClick={() => { setMode('login'); setErrorMessage(''); }}
            className={`flex-1 py-2.5 font-bold transition-all ${
              mode === 'login'
                ? 'bg-white dark:bg-[#1a201d] text-[#033028] dark:text-[#e5a93c] border-b-2 border-[#033028] dark:border-[#e5a93c]'
                : 'text-[#414846] dark:text-[#a9acaa]'
            }`}
          >
            Iniciar Sesión
          </button>

          <button
            onClick={() => { setMode('register'); setErrorMessage(''); }}
            className={`flex-1 py-2.5 font-bold transition-all ${
              mode === 'register'
                ? 'bg-white dark:bg-[#1a201d] text-[#033028] dark:text-[#e5a93c] border-b-2 border-[#033028] dark:border-[#e5a93c]'
                : 'text-[#414846] dark:text-[#a9acaa]'
            }`}
          >
            Crear Cuenta
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mx-4 mt-3 bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 p-3 rounded-xl text-xs font-bold border border-red-300 dark:border-red-800">
            ⚠️ {errorMessage}
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 overflow-y-auto flex-1">
          
          {mode === 'register' && (
            <>
              {/* Profile Photo Upload */}
              <div className="flex flex-col items-center space-y-2 pb-2">
                <div className="relative">
                  <img
                    src={avatarPreview || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                    alt="Preview"
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#e5a93c] shadow-md"
                  />
                  <label className="absolute bottom-0 right-0 bg-[#033028] dark:bg-[#1e463e] text-white p-1.5 rounded-full cursor-pointer hover:scale-110 transition-all border border-white">
                    <Camera className="w-3.5 h-3.5" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <span className="text-[10px] text-[#414846] dark:text-[#a9acaa] font-bold">Subir Foto de Perfil</span>
              </div>

              {/* Name */}
              <div>
                <label className="block font-bold mb-1">Nombre Completo *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#717976] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="Ej: Doña Sofía Arguedas"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#c0c8c5] dark:border-[#414846] bg-white dark:bg-[#222926] text-[#1c1b1b] dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block font-bold mb-1">Teléfono Móvil *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#717976] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="+506 8888-8888"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#c0c8c5] dark:border-[#414846] bg-white dark:bg-[#222926] text-[#1c1b1b] dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Condo & Unit */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">Condominio</label>
                  <input
                    type="text"
                    required
                    value={condo}
                    onChange={(e) => setCondo(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#c0c8c5] dark:border-[#414846] bg-white dark:bg-[#222926] text-[#1c1b1b] dark:text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Casa / Apto</label>
                  <input
                    type="text"
                    required
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#c0c8c5] dark:border-[#414846] bg-white dark:bg-[#222926] text-[#1c1b1b] dark:text-white focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <label className="block font-bold mb-1">Correo Electrónico *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#717976] absolute left-3 top-2.5" />
              <input
                type="email"
                required
                placeholder="ejemplo@condominio.cr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#c0c8c5] dark:border-[#414846] bg-white dark:bg-[#222926] text-[#1c1b1b] dark:text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block font-bold mb-1">Contraseña *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#717976] absolute left-3 top-2.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#c0c8c5] dark:border-[#414846] bg-white dark:bg-[#222926] text-[#1c1b1b] dark:text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#033028] dark:bg-[#1e463e] hover:bg-[#1e463e] text-white font-black py-3 px-4 rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2 text-xs mt-2"
          >
            <CheckCircle2 className="w-4 h-4 text-[#e5a93c]" />
            <span>{loading ? 'Procesando...' : mode === 'login' ? 'Iniciar Sesión' : 'Registrar Mi Cuenta'}</span>
          </button>

          {/* Quick Demo Login Preset Buttons */}
          {mode === 'login' && (
            <div className="pt-3 border-t border-[#e5e2e1] dark:border-[#2e3633] space-y-2">
              <span className="text-[10px] text-[#414846] dark:text-[#a9acaa] font-bold uppercase tracking-wider block text-center">
                Acceso Rápido Demo (Jueces / Prueba)
              </span>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemoUser('sofia@montesdelsol.cr', '123456')}
                  className="bg-[#f0f7f5] dark:bg-[#162b25] hover:bg-[#c1ebe0] text-[#033028] dark:text-[#a5cfc4] font-bold py-2 px-2.5 rounded-xl border border-[#c1ebe0] dark:border-[#2e3633] text-[11px] text-left truncate"
                >
                  👤 Sofía Arguedas
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoUser('alejandro@cerroalto.cr', '123456')}
                  className="bg-[#f0f7f5] dark:bg-[#162b25] hover:bg-[#c1ebe0] text-[#033028] dark:text-[#a5cfc4] font-bold py-2 px-2.5 rounded-xl border border-[#c1ebe0] dark:border-[#2e3633] text-[11px] text-left truncate"
                >
                  👨‍💼 Don Alejandro
                </button>
              </div>
            </div>
          )}
        </form>

      </div>
    </div>
  );
}
