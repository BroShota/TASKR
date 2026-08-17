import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import SearchView from './views/SearchView';
import BookingsView from './views/BookingsView';
import ProfileView from './views/ProfileView';
import SettingsView from './views/SettingsView';
import HandymanPartnerApp from './views/HandymanPartnerApp';
import ServerMonitorView from './views/ServerMonitorView';
import HandymanDetailModal from './components/HandymanDetailModal';
import BookingConfirmationModal from './components/BookingConfirmationModal';
import IncidentReportModal from './components/IncidentReportModal';
import SolicitarCitaModal from './components/SolicitarCitaModal';
import LoginRegisterModal from './components/LoginRegisterModal';
import { INITIAL_CLIENT, HANDYMEN } from './data/mockData';
import { getCitas, solicitarCita, actualizarEstadoCita, checkServerHealth } from './services/api';
import { Smartphone, Monitor, User, Wrench, Server, Wifi, WifiOff } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('search'); // 'search', 'bookings', 'profile', 'settings'
  
  // Initial client loaded from active user session if available
  const getInitialClient = () => {
    const stored = localStorage.getItem('taskr_active_user');
    if (stored) {
      try { return JSON.parse(stored); } catch (e) {}
    }
    return INITIAL_CLIENT;
  };

  const [client, setClient] = useState(getInitialClient);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedHandyman, setSelectedHandyman] = useState(null);
  const [selectedHandymanMode, setSelectedHandymanMode] = useState('profile'); // 'profile' or 'book'
  const [activeBookingData, setActiveBookingData] = useState(null);
  const [isIncidentModalOpen, setIsIncidentModalOpen] = useState(false);
  const [isSolicitarCitaOpen, setIsSolicitarCitaOpen] = useState(false);
  const [chatHandyman, setChatHandyman] = useState(null);
  const [isMobileFrameView, setIsMobileFrameView] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userBookings, setUserBookings] = useState([]);
  const [citasList, setCitasList] = useState([]);
  const [isServerOnline, setIsServerOnline] = useState(true);

  const handleLoginSuccess = (user) => {
    const cleanUser = {
      name: user.name || 'Cliente Residente',
      email: user.email,
      phone: user.phone || '+506 8844-1122',
      condo: user.condo || 'Condominio Montes del Sol',
      unit: user.unit || 'Casa 42B',
      avatar: user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      sinpePhone: user.phone || '+506 8844-1122',
      idNumber: '1-1492-0841'
    };
    setClient(cleanUser);
    localStorage.setItem('taskr_active_user', JSON.stringify(cleanUser));
  };


  // Detect initial mode from URL search param or pathname
  const getInitialAppMode = () => {
    const params = new URLSearchParams(window.location.search);
    const roleParam = params.get('role') || params.get('mode');
    const path = window.location.pathname.toLowerCase();

    if (roleParam === 'handyman' || roleParam === 'tecnico' || path.includes('handyman') || path.includes('tecnico')) {
      return 'handyman';
    }
    if (roleParam === 'server' || roleParam === 'servidor' || roleParam === 'supervisor' || path.includes('server') || path.includes('supervisor')) {
      return 'server';
    }
    return 'client';
  };


  const [appMode, setAppMode] = useState(getInitialAppMode); // 'client', 'handyman', or 'server'

  // Fetch citas and check server connection health
  const refreshCitas = async () => {
    const data = await getCitas();
    setCitasList(data || []);
    const health = await checkServerHealth();
    setIsServerOnline(health.online);
  };

  useEffect(() => {
    refreshCitas();
    const interval = setInterval(refreshCitas, 3000); // Polling every 3s for live sync
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Open Handyman Modal with specific mode
  const handleSelectHandyman = (handyman, mode = 'profile') => {
    setSelectedHandyman(handyman);
    setSelectedHandymanMode(mode);
  };

  // Quick book handler -> opens directly into booking mode
  const handleQuickBook = (handyman) => {
    setSelectedHandyman(handyman);
    setSelectedHandymanMode('book');
  };

  // Confirm booking handler from Modal
  const handleConfirmBooking = async (bookingPayload) => {
    setSelectedHandyman(null);
    setActiveBookingData(bookingPayload);
    setUserBookings(prev => [bookingPayload, ...prev]);

    // Sync to backend Citas API as well
    const created = await solicitarCita({
      clientName: client.name,
      clientPhone: client.phone,
      condo: client.condo,
      unit: client.unit,
      serviceTitle: bookingPayload.serviceTitle || 'Servicio Técnico',
      category: bookingPayload.handyman?.specialty || 'General',
      description: bookingPayload.notes || '',
      scheduledDate: bookingPayload.scheduledDate || new Date().toISOString().split('T')[0],
      scheduledTime: '14:30',
      totalCRC: bookingPayload.totalCRC,
      paymentMethod: bookingPayload.paymentMethod,
      assignedHandymanId: bookingPayload.handyman?.id,
      assignedHandymanName: bookingPayload.handyman?.name
    });

    refreshCitas();
  };

  // Submit Cita directly from SolicitarCitaModal
  const handleSubmitSolicitudCita = async (payload) => {
    const newCita = await solicitarCita(payload);
    refreshCitas();
    setActiveBookingData(newCita);
    setActiveTab('bookings');
  };

  // Handyman partner update cita status
  const handleUpdateCitaStatus = async (citaId, updates) => {
    await actualizarEstadoCita(citaId, updates);
    refreshCitas();
  };

  // Render standalone Supervisor / Monitor View
  if (appMode === 'server') {
    return (
      <ServerMonitorView
        citas={citasList}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onUpdateCitaStatus={handleUpdateCitaStatus}
      />
    );
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-start sm:py-4 selection:bg-[#1e463e] selection:text-white transition-colors duration-500 ${
      isDarkMode ? 'bg-[#0b0e0d]' : 'bg-[#f0eded]'
    }`}>
      
      {/* Top Frame Control Bar (Only Frame Toggle & Connection Status for Desktop Testing) */}
      <div className={`w-full max-w-md mb-2 px-2 flex items-center justify-between text-xs transition-colors duration-500 ${
        isDarkMode ? 'text-[#a9acaa]' : 'text-[#414846]'
      }`}>
        {/* App Title Badge */}
        <div className="flex items-center space-x-1.5 font-extrabold text-xs">
          <span className="bg-[#033028] text-white dark:bg-[#1e463e] px-2.5 py-0.5 rounded-lg text-[10px] uppercase font-black tracking-wider">
            {appMode === 'handyman' ? 'TASKR PARTNER (Socio Técnico)' : 'TASKR RESIDENTE'}
          </span>
        </div>

        {/* Server Connection Status & Frame Toggle */}
        <div className="flex items-center space-x-2">
          <span className={`hidden sm:flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
            isServerOnline
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
              : 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30'
          }`}>
            {isServerOnline ? <Wifi className="w-3 h-3 text-emerald-500" /> : <WifiOff className="w-3 h-3 text-amber-500" />}
            <span>{isServerOnline ? 'WLAN Conectado' : 'Offline Local'}</span>
          </span>

          <button
            onClick={() => setIsMobileFrameView(!isMobileFrameView)}
            className={`hidden sm:flex items-center space-x-1 px-2.5 py-1 rounded-xl border transition-all font-medium text-[11px] shadow-xs ${
              isDarkMode 
                ? 'bg-[#1a201d] hover:bg-[#222926] text-[#f3f0ef] border-[#2e3633]' 
                : 'bg-white hover:bg-[#f6f3f2] text-[#1c1b1b] border-[#c0c8c5]'
            }`}
          >
            {isMobileFrameView ? (
              <>
                <Monitor className={`w-3.5 h-3.5 ${isDarkMode ? 'text-[#e5a93c]' : 'text-[#033028]'}`} />
                <span>Full</span>
              </>
            ) : (
              <>
                <Smartphone className={`w-3.5 h-3.5 ${isDarkMode ? 'text-[#e5a93c]' : 'text-[#033028]'}`} />
                <span>Marco</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Container - Framed or Fullwidth Mobile Viewport */}
      <main className={`w-full transition-all duration-500 min-h-screen sm:min-h-[840px] flex flex-col relative overflow-hidden ${
        isDarkMode ? 'dark bg-[#121614] text-[#f3f0ef]' : 'bg-[#fcf9f8] text-[#1c1b1b]'
      } ${
        isMobileFrameView 
          ? `sm:max-w-md sm:rounded-[40px] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] sm:border-8 ${
              isDarkMode ? 'sm:border-[#1a201d]' : 'sm:border-[#033028]'
            }`
          : 'max-w-4xl sm:rounded-2xl sm:shadow-2xl'
      }`}>

        {appMode === 'handyman' ? (
          /* Handyman Partner App View */
          <HandymanPartnerApp
            onOpenChat={(h) => setChatHandyman(h)}
            isDarkMode={isDarkMode}
            citas={citasList}
            onUpdateCitaStatus={handleUpdateCitaStatus}
          />
        ) : (
          /* Resident Client App View */
          <>
            {/* Header Component */}
            <Header
              client={client}
              citas={citasList}
              onOpenChat={(h) => setChatHandyman(h)}
              onOpenIncidentModal={() => setIsIncidentModalOpen(true)}
              isDarkMode={isDarkMode}
              onToggleTheme={toggleTheme}
              onOpenAuthModal={() => setIsAuthModalOpen(true)}
            />

            {/* View Switcher based on Bottom Nav Active Tab */}
            <div className="flex-1 overflow-y-auto">
              {activeTab === 'search' && (
                <SearchView
                  citas={citasList}
                  client={client}
                  onSelectHandyman={handleSelectHandyman}
                  onQuickBook={handleQuickBook}
                  onOpenChat={(h) => setChatHandyman(h)}
                />
              )}

              {activeTab === 'bookings' && (
                <BookingsView
                  bookings={userBookings}
                  citas={citasList}
                  client={client}
                  onOpenChat={(h) => setChatHandyman(h)}
                  onSelectHandyman={handleSelectHandyman}
                  onOpenIncidentModal={() => setIsIncidentModalOpen(true)}
                  onOpenSolicitarCita={() => setIsSolicitarCitaOpen(true)}
                  onUpdateCitaStatus={handleUpdateCitaStatus}
                />
              )}

              {activeTab === 'profile' && (
                <ProfileView
                  client={client}
                  onSelectHandyman={handleSelectHandyman}
                  onOpenAuthModal={() => setIsAuthModalOpen(true)}
                />
              )}

              {activeTab === 'settings' && (
                <SettingsView
                  client={client}
                  onOpenIncidentModal={() => setIsIncidentModalOpen(true)}
                  isDarkMode={isDarkMode}
                  onToggleTheme={toggleTheme}
                />
              )}
            </div>

            {/* Fixed Bottom Navigation Bar (4 Tabs) */}
            <BottomNav
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </>
        )}

        {/* Login / Register Auth Modal */}
        {isAuthModalOpen && (
          <LoginRegisterModal
            onClose={() => setIsAuthModalOpen(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {/* Handyman Detail & Booking Modal */}
        {selectedHandyman && (
          <HandymanDetailModal
            handyman={selectedHandyman}
            client={client}
            initialMode={selectedHandymanMode}
            onClose={() => setSelectedHandyman(null)}
            onConfirmBooking={handleConfirmBooking}
            onOpenChat={(h) => setChatHandyman(h)}
          />
        )}


        {/* Solicitar Cita Modal */}
        {isSolicitarCitaOpen && (
          <SolicitarCitaModal
            client={client}
            onClose={() => setIsSolicitarCitaOpen(false)}
            onSubmitCita={handleSubmitSolicitudCita}
          />
        )}

        {/* Booking Confirmation & Passcode Modal */}
        {activeBookingData && (
          <BookingConfirmationModal
            bookingData={activeBookingData}
            client={client}
            onClose={() => setActiveBookingData(null)}
            onOpenChat={(h) => setChatHandyman(h)}
          />
        )}

        {/* Safety Incident Report Modal */}
        {isIncidentModalOpen && (
          <IncidentReportModal
            client={client}
            onClose={() => setIsIncidentModalOpen(false)}
          />
        )}

        {/* Live Chat Modal */}
        {chatHandyman && (
          <ChatModal
            handyman={chatHandyman}
            client={client}
            onClose={() => setChatHandyman(null)}
          />
        )}

      </main>
    </div>
  );
}
