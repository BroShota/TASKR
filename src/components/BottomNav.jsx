import React from 'react';
import { Search, Calendar, User, Settings } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'search', label: 'Buscar', icon: Search },
    { id: 'bookings', label: 'Reservas', icon: Calendar },
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'settings', label: 'Ajustes', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#1a201d]/95 backdrop-blur-md border-t border-[#e5e2e1] dark:border-[#2e3633] px-4 py-2 shadow-lg max-w-md mx-auto transition-colors duration-500">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={tab.id === 'bookings' ? 'demo-client-nav-bookings' : undefined}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-[#033028] dark:text-white font-extrabold scale-105'
                  : 'text-[#414846] dark:text-[#a9acaa] hover:text-[#1c1b1b] dark:hover:text-white font-medium'
              }`}
            >
              <div className={`relative p-1.5 rounded-xl transition-all ${
                isActive ? 'bg-white dark:bg-[#1a201d] border-2 border-[#033028] dark:border-[#e5a93c] text-[#033028] dark:text-[#e5a93c] shadow-xs' : 'bg-transparent border border-transparent'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[11px] mt-0.5 tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
