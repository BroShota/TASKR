import React, { useState } from 'react';
import { Server, Smartphone, Wrench, ShieldCheck, Activity, Users, CheckCircle2, QrCode, Filter, UserCheck } from 'lucide-react';
import { HANDYMEN } from '../data/mockData';

export default function ServerMonitorView({ citas = [], isDarkMode, onToggleTheme, onUpdateCitaStatus }) {
  const localIp = window.location.hostname;
  const clientUrl = `http://${localIp}:5173/?role=client`;
  const handymanUrl = `http://${localIp}:5173/?role=handyman`;

  const [statusFilter, setStatusFilter] = useState('ALL');

  const totalCitas = citas.length;
  const pendientes = citas.filter(c => c.status === 'Pendiente').length;
  const enCamino = citas.filter(c => c.status && (c.status.includes('camino') || c.status.includes('caseta') || c.status === 'Asignada')).length;
  const completadas = citas.filter(c => c.status === 'Completada').length;

  const filteredCitas = citas.filter(c => {
    if (statusFilter === 'PENDING') return c.status === 'Pendiente';
    if (statusFilter === 'IN_PROGRESS') return c.status && c.status !== 'Pendiente' && c.status !== 'Completada' && c.status !== 'Cancelada';
    if (statusFilter === 'COMPLETED') return c.status === 'Completada';
    return true;
  });

  const handleAssignHandyman = async (citaId, handymanId) => {
    const selectedHandyman = HANDYMEN.find(h => h.id === handymanId);
    if (!selectedHandyman) return;

    if (onUpdateCitaStatus) {
      await onUpdateCitaStatus(citaId, {
        assignedHandymanId: selectedHandyman.id,
        assignedHandymanName: selectedHandyman.name,
        status: 'Asignada - En camino'
      });
    }
  };

  const handleQuickStatusChange = async (citaId, newStatus) => {
    if (onUpdateCitaStatus) {
      await onUpdateCitaStatus(citaId, { status: newStatus });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e0d] text-white p-6 flex flex-col space-y-6 selection:bg-[#033028] selection:text-white">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-[#2e3633] pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-[#033028] border border-[#e5a93c] flex items-center justify-center text-[#e5a93c] shadow-lg">
            <Server className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-black tracking-wide text-white">TASKR SUPERVISOR & MONITOR</h1>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold animate-pulse">
                CONEXIÓN EN VIVO (WLAN)
              </span>
            </div>
            <p className="text-xs text-[#a9acaa]">Gestión Centralizada de Citas, Conexiones & Intermediación</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-[#a9acaa] block font-mono">Puerto Backend: {localIp}:3001</span>
          <span className="text-[11px] text-emerald-400 font-bold">🟢 Servidor Sincronizado (citas.json)</span>
        </div>
      </div>

      {/* Access Banner Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Client Access Card (FOR JUDGES / CLIENTS) */}
        <div className="bg-[#121614] border-2 border-[#033028] hover:border-[#e5a93c] rounded-3xl p-5 shadow-xl flex flex-col justify-between space-y-3 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="bg-[#033028] text-[#e5a93c] text-xs font-black uppercase px-2.5 py-1 rounded-xl flex items-center gap-1.5">
                <Smartphone className="w-4 h-4" /> VISTA DE CLIENTE
              </span>
              <span className="text-xs font-mono text-emerald-400">Escaneable / Móvil</span>
            </div>
            <h2 className="text-base font-bold text-white">Acceso a PWA de Residentes</h2>
            <p className="text-xs text-[#a9acaa] mt-0.5">
              Enlace para solicitar servicios, consultar técnicos y obtener pases de caseta.
            </p>
          </div>

          <div className="bg-[#1a201d] border border-[#2e3633] rounded-2xl p-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#a9acaa] block">URL para Clientes:</span>
              <span className="font-mono text-sm font-black text-[#e5a93c] select-all">
                {clientUrl}
              </span>
            </div>
          </div>
        </div>

        {/* Handyman Access Card (FOR HANDYMAN PARTNER) */}
        <div className="bg-[#121614] border-2 border-[#1e463e] rounded-3xl p-5 shadow-xl flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="bg-[#1e463e] text-white text-xs font-black uppercase px-2.5 py-1 rounded-xl flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-[#e5a93c]" /> VISTA DE SOCIO TÉCNICO
              </span>
              <span className="text-xs font-mono text-[#a5cfc4]">Socio Handyman</span>
            </div>
            <h2 className="text-base font-bold text-white">Acceso a Panel de Técnico</h2>
            <p className="text-xs text-[#a9acaa] mt-0.5">
              Abre esta URL en tu teléfono para recibir y procesar citas en tiempo real.
            </p>
          </div>

          <div className="bg-[#1a201d] border border-[#2e3633] rounded-2xl p-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#a9acaa] block">URL para Técnico:</span>
              <span className="font-mono text-sm font-black text-white select-all">
                {handymanUrl}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Live Metrics Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#121614] border border-[#2e3633] rounded-2xl p-4 text-center">
          <span className="text-xs text-[#a9acaa] uppercase font-bold block">Total Pedidos</span>
          <span className="text-3xl font-black text-white">{totalCitas}</span>
        </div>

        <div className="bg-[#121614] border border-[#2e3633] rounded-2xl p-4 text-center">
          <span className="text-xs text-[#a9acaa] uppercase font-bold block">Sin Asignar</span>
          <span className="text-3xl font-black text-[#e5a93c]">{pendientes}</span>
        </div>

        <div className="bg-[#121614] border border-[#2e3633] rounded-2xl p-4 text-center">
          <span className="text-xs text-[#a9acaa] uppercase font-bold block">En Proceso / Ruta</span>
          <span className="text-3xl font-black text-emerald-400">{enCamino}</span>
        </div>

        <div className="bg-[#121614] border border-[#2e3633] rounded-2xl p-4 text-center">
          <span className="text-xs text-[#a9acaa] uppercase font-bold block">Completados</span>
          <span className="text-3xl font-black text-[#a5cfc4]">{completadas}</span>
        </div>
      </div>

      {/* Live Interactive Supervisor Order Table */}
      <div className="bg-[#121614] border border-[#2e3633] rounded-3xl p-5 flex-1 flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
            <h3 className="text-base font-black text-white">
              Gestión e Intermediación de Pedidos de Citas
            </h3>
          </div>

          {/* Status Filters */}
          <div className="flex bg-[#1a201d] p-1 rounded-xl border border-[#2e3633] text-xs">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                statusFilter === 'ALL' ? 'bg-[#033028] text-white shadow-xs' : 'text-[#a9acaa]'
              }`}
            >
              Todos ({totalCitas})
            </button>
            <button
              onClick={() => setStatusFilter('PENDING')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                statusFilter === 'PENDING' ? 'bg-[#033028] text-[#e5a93c] shadow-xs' : 'text-[#a9acaa]'
              }`}
            >
              Pendientes ({pendientes})
            </button>
            <button
              onClick={() => setStatusFilter('IN_PROGRESS')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                statusFilter === 'IN_PROGRESS' ? 'bg-[#033028] text-emerald-400 shadow-xs' : 'text-[#a9acaa]'
              }`}
            >
              En Ruta ({enCamino})
            </button>
            <button
              onClick={() => setStatusFilter('COMPLETED')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                statusFilter === 'COMPLETED' ? 'bg-[#033028] text-[#a5cfc4] shadow-xs' : 'text-[#a9acaa]'
              }`}
            >
              Completados ({completadas})
            </button>
          </div>
        </div>

        <div className="overflow-x-auto flex-1 border border-[#2e3633] rounded-2xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#1a201d] text-[#a9acaa] font-mono uppercase text-[10px] border-b border-[#2e3633]">
                <th className="py-3 px-3">ID Pedido</th>
                <th className="py-3 px-3">Cliente / Dirección</th>
                <th className="py-3 px-3">Servicio</th>
                <th className="py-3 px-3">Pase Caseta</th>
                <th className="py-3 px-3">Técnico Asignado</th>
                <th className="py-3 px-3">Estado Actual</th>
                <th className="py-3 px-3">Acciones de Supervisor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2e3633]">
              {filteredCitas.length > 0 ? (
                filteredCitas.map((c) => (
                  <tr key={c.id} className="hover:bg-[#1a201d]/60 transition-colors">
                    <td className="py-3.5 px-3 font-mono text-[#e5a93c] font-black">#{c.id}</td>
                    
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-white">{c.clientName}</div>
                      <div className="text-[11px] text-[#a9acaa]">{c.condo} ({c.unit})</div>
                      <div className="text-[10px] text-[#717976]">{c.clientPhone}</div>
                    </td>
                    
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-white">{c.serviceTitle}</div>
                      <div className="text-[11px] text-[#a5cfc4] font-semibold">₡{(c.totalCRC || 0).toLocaleString()} • {c.category}</div>
                    </td>

                    <td className="py-3.5 px-3 font-mono font-black text-emerald-400">
                      <span className="bg-[#162b25] px-2 py-1 rounded-lg border border-[#2e3633]">
                        {c.passCode || 'TASKR-0000'}
                      </span>
                    </td>

                    {/* Assign Handyman Select */}
                    <td className="py-3.5 px-3">
                      {c.assignedHandymanName ? (
                        <span className="font-bold text-white flex items-center gap-1">
                          <UserCheck className="w-3.5 h-3.5 text-[#e5a93c]" />
                          {c.assignedHandymanName}
                        </span>
                      ) : (
                        <select
                          value=""
                          onChange={(e) => handleAssignHandyman(c.id, e.target.value)}
                          className="bg-[#1a201d] text-[#e5a93c] font-bold text-xs px-2.5 py-1.5 rounded-xl border border-[#e5a93c]/50 focus:outline-none"
                        >
                          <option value="" disabled>-- Asignar Técnico --</option>
                          {HANDYMEN.map(h => (
                            <option key={h.id} value={h.id}>{h.name} ({h.specialty})</option>
                          ))}
                        </select>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase inline-block ${
                        c.status === 'Completada'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : c.status === 'Pendiente'
                          ? 'bg-[#e5a93c]/20 text-[#e5a93c] border border-[#e5a93c]/30'
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {c.status || 'Pendiente'}
                      </span>
                    </td>

                    {/* Quick Supervisor Actions */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center space-x-1.5">
                        {c.status !== 'Completada' && (
                          <button
                            onClick={() => handleQuickStatusChange(c.id, 'Completada')}
                            className="bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white px-2 py-1 rounded-lg text-[11px] font-bold transition-all border border-emerald-500/40"
                          >
                            Finalizar
                          </button>
                        )}

                        {c.status === 'Pendiente' && (
                          <button
                            onClick={() => handleQuickStatusChange(c.id, 'Asignada - En camino')}
                            className="bg-amber-600/30 hover:bg-amber-600 text-amber-300 hover:text-white px-2 py-1 rounded-lg text-[11px] font-bold transition-all border border-amber-500/40"
                          >
                            En Ruta
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#a9acaa]">
                    No hay pedidos en esta categoría.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
