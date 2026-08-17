import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, Pause, X, RotateCcw, ChevronRight, ChevronLeft, Check,
  Search, Tag, Sliders, Star, Bell, User, Moon, Calendar, Wrench, 
  Power, TrendingUp, DollarSign, Folder, Inbox, ShieldCheck, FileText, 
  ExternalLink, Smartphone
} from 'lucide-react';

const STEP_DURATION = 5500;
const SPLASH_DURATION = 3200;

export default function DemoTour({ steps = [], roleName = '', onClose }) {
  const [phase, setPhase] = useState('splash');
  const [stepIndex, setStepIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [spotlightRect, setSpotlightRect] = useState(null);
  const [tooltipSide, setTooltipSide] = useState('bottom');
  const [fadeClass, setFadeClass] = useState('opacity-100');
  const timerRef = useRef(null);

  // Icon resolver for clean SVG vector icons
  const getStepIcon = (iconName) => {
    switch (iconName) {
      case 'Search': return <Search className="w-4 h-4 text-[#e5a93c]" />;
      case 'Tag': return <Tag className="w-4 h-4 text-[#e5a93c]" />;
      case 'Sliders': return <Sliders className="w-4 h-4 text-[#e5a93c]" />;
      case 'Star': return <Star className="w-4 h-4 text-[#e5a93c]" />;
      case 'Bell': return <Bell className="w-4 h-4 text-[#e5a93c]" />;
      case 'User': return <User className="w-4 h-4 text-[#e5a93c]" />;
      case 'Moon': return <Moon className="w-4 h-4 text-[#e5a93c]" />;
      case 'Calendar': return <Calendar className="w-4 h-4 text-[#e5a93c]" />;
      case 'Wrench': return <Wrench className="w-4 h-4 text-[#e5a93c]" />;
      case 'Power': return <Power className="w-4 h-4 text-[#e5a93c]" />;
      case 'TrendingUp': return <TrendingUp className="w-4 h-4 text-[#e5a93c]" />;
      case 'DollarSign': return <DollarSign className="w-4 h-4 text-[#e5a93c]" />;
      case 'Folder': return <Folder className="w-4 h-4 text-[#e5a93c]" />;
      case 'Inbox': return <Inbox className="w-4 h-4 text-[#e5a93c]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4 text-[#e5a93c]" />;
      case 'FileText': return <FileText className="w-4 h-4 text-[#e5a93c]" />;
      case 'ExternalLink': return <ExternalLink className="w-4 h-4 text-[#e5a93c]" />;
      default: return <ShieldCheck className="w-4 h-4 text-[#e5a93c]" />;
    }
  };

  const getRoleIcon = (role) => {
    if (role.includes('Socio') || role.includes('Técnico')) {
      return <Wrench className="w-3.5 h-3.5 text-[#e5a93c]" />;
    }
    if (role.includes('Supervisor')) {
      return <ShieldCheck className="w-3.5 h-3.5 text-[#e5a93c]" />;
    }
    return <Smartphone className="w-3.5 h-3.5 text-[#e5a93c]" />;
  };

  // Splash → touring
  useEffect(() => {
    if (phase === 'splash') {
      const t = setTimeout(() => setPhase('touring'), SPLASH_DURATION);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // Auto-advance
  useEffect(() => {
    if (phase !== 'touring' || isPaused) return;
    timerRef.current = setTimeout(() => {
      if (stepIndex < steps.length - 1) {
        goToStep(stepIndex + 1);
      } else {
        setPhase('complete');
      }
    }, STEP_DURATION);
    return () => clearTimeout(timerRef.current);
  }, [phase, stepIndex, isPaused, steps.length]);

  // Spotlight positioning
  useEffect(() => {
    if (phase !== 'touring') { setSpotlightRect(null); return; }
    const step = steps[stepIndex];
    if (!step?.targetId) { setSpotlightRect(null); return; }
    const el = document.getElementById(step.targetId);
    if (!el) { setSpotlightRect(null); return; }

    // Scroll element smoothly into view centered
    el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });

    const update = () => {
      const r = el.getBoundingClientRect();
      const pad = 8;
      
      const top = Math.max(6, r.top - pad);
      const left = Math.max(6, r.left - pad);
      const width = Math.min(window.innerWidth - 12, r.width + pad * 2);
      const height = Math.min(window.innerHeight - 130, r.height + pad * 2);

      setSpotlightRect({ top, left, width, height });

      // Available space above & below
      const spaceBelow = window.innerHeight - (top + height) - 80;
      const spaceAbove = top - 20;

      if (spaceBelow >= 160) {
        setTooltipSide('bottom');
      } else if (spaceAbove >= 160) {
        setTooltipSide('top');
      } else {
        setTooltipSide('bottom');
      }
    };

    const timer = setTimeout(update, 350);
    window.addEventListener('resize', update);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', update);
    };
  }, [phase, stepIndex, steps]);

  const goToStep = useCallback((i) => {
    setFadeClass('opacity-0');
    setTimeout(() => { setStepIndex(i); setFadeClass('opacity-100'); }, 180);
  }, []);

  const handleNext = () => { clearTimeout(timerRef.current); stepIndex < steps.length - 1 ? goToStep(stepIndex + 1) : setPhase('complete'); };
  const handlePrev = () => { clearTimeout(timerRef.current); stepIndex > 0 && goToStep(stepIndex - 1); };
  const handleRestart = () => { setStepIndex(0); setIsPaused(false); setSpotlightRect(null); setPhase('splash'); };

  const progress = phase === 'touring' ? ((stepIndex + 1) / steps.length) * 100 : 0;
  const step = steps[stepIndex];

  // ─── SPLASH (Clean SVG Icons / Black / Gold) ───
  if (phase === 'splash') {
    return (
      <div className="fixed inset-0 z-[70] bg-[#09090b] flex items-center justify-center" style={{ animation: 'fadeIn 0.4s ease-out' }}>
        <div className="text-center space-y-5 px-6 max-w-sm" style={{ animation: 'scaleIn 0.5s ease-out' }}>
          {/* Logo Tile */}
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#1c1c20] via-[#121215] to-[#000000] flex items-center justify-center mx-auto shadow-2xl border-2 border-[#e5a93c]/60">
            <span className="text-3xl font-black text-[#e5a93c]">T</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">TASKR</h1>
          <p className="text-sm text-zinc-300 font-medium max-w-xs mx-auto leading-relaxed">
            Plataforma de servicios técnicos para condominios de Costa Rica
          </p>
          <div className="pt-4 space-y-2">
            <div className="flex items-center justify-center space-x-1.5 text-xs text-[#e5a93c] font-black uppercase tracking-widest">
              {getRoleIcon(roleName)}
              <span>Demo — Vista {roleName}</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5">
              <div className="w-2 h-2 rounded-full bg-[#e5a93c] animate-pulse" />
              <span className="text-xs text-zinc-400 font-semibold">Iniciando recorrido...</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="absolute top-5 right-5 text-zinc-500 hover:text-white text-sm transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
    );
  }

  // ─── COMPLETE (Clean SVG Vector) ───
  if (phase === 'complete') {
    return (
      <div className="fixed inset-0 z-[70] bg-[#09090b]/95 backdrop-blur-xl flex items-center justify-center" style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <div className="text-center space-y-5 px-6 max-w-sm" style={{ animation: 'scaleIn 0.4s ease-out' }}>
          <div className="w-20 h-20 rounded-full bg-[#e5a93c]/15 border border-[#e5a93c]/40 text-[#e5a93c] flex items-center justify-center mx-auto shadow-xl">
            <Check className="w-10 h-10 text-[#e5a93c]" />
          </div>
          <h2 className="text-2xl font-black text-white">¡Pura Vida!</h2>
          <p className="text-sm text-zinc-300 font-medium leading-relaxed">
            Ya conocés la vista de <strong className="text-[#e5a93c]">{roleName}</strong> en TASKR.<br />
            Ahora probala vos mismo.
          </p>
          <div className="flex items-center justify-center space-x-3 pt-3">
            <button
              onClick={handleRestart}
              className="bg-white/10 hover:bg-white/20 text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center space-x-1.5 border border-zinc-700 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Repetir Demo</span>
            </button>
            <button
              onClick={onClose}
              className="bg-[#e5a93c] hover:bg-[#fdbe50] text-[#121215] font-black py-2.5 px-5 rounded-xl text-xs flex items-center space-x-1.5 shadow-lg transition-all"
            >
              <span>Explorar App</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <button onClick={onClose} className="absolute top-5 right-5 text-zinc-500 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
    );
  }

  // ─── TOURING (SVG Spotlight & Clean Badges) ───
  const isOverlayStep = !step?.targetId || !spotlightRect;
  const isBottomTarget = Boolean(spotlightRect && (spotlightRect.top + spotlightRect.height > window.innerHeight - 130));

  return (
    <div className="fixed inset-0 z-[70]" style={{ animation: 'fadeIn 0.3s ease-out' }}>

      {/* Dark overlay with spotlight cutout */}
      {isOverlayStep ? (
        <div className="absolute inset-0 bg-[#09090b]/88 backdrop-blur-sm z-[70]" onClick={() => setIsPaused(!isPaused)} />
      ) : (
        /* Crystal Clear Spotlight Hole - 0% Opacity in focus box, 88% dark obsidian around it */
        <div
          onClick={() => setIsPaused(!isPaused)}
          className="absolute rounded-2xl border-2 border-[#e5a93c] pointer-events-auto cursor-pointer transition-all duration-400 ease-out"
          style={{
            top: spotlightRect.top,
            left: spotlightRect.left,
            width: spotlightRect.width,
            height: spotlightRect.height,
            boxShadow: '0 0 0 9999px rgba(9, 9, 11, 0.88), 0 0 35px 6px rgba(229, 169, 60, 0.35)',
            zIndex: 70
          }}
        />
      )}

      {/* Floating Close button when control bar is at bottom */}
      {!isBottomTarget && (
        <button onClick={onClose} className="absolute top-4 right-4 z-[71] bg-white/10 hover:bg-white/20 text-white p-2 rounded-full border border-zinc-700 transition-all">
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Tooltip Card (Clean Vector SVG Badges) */}
      <div
        className={`absolute z-[71] max-w-[340px] w-[90vw] transition-all duration-300 pointer-events-none ${fadeClass}`}
        style={
          isOverlayStep
            ? { top: '48%', left: '50%', transform: 'translate(-50%, -50%)' }
            : isBottomTarget || tooltipSide === 'top'
              ? {
                  top: `${Math.max(80, spotlightRect.top - 14)}px`,
                  left: '50%',
                  transform: 'translate(-50%, -100%)'
                }
              : {
                  top: `${Math.min(window.innerHeight - 240, spotlightRect.top + spotlightRect.height + 12)}px`,
                  left: '50%',
                  transform: 'translateX(-50%)'
                }
        }
      >
        <div className="bg-[#121215]/95 backdrop-blur-xl border border-zinc-800 rounded-2xl p-4 shadow-2xl space-y-2.5 relative pointer-events-auto">
          {/* Gold accent line */}
          <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-[#e5a93c] to-transparent rounded-full" />

          <div className="flex items-center space-x-2.5 pt-1">
            <div className="w-7 h-7 rounded-xl bg-zinc-800/90 border border-zinc-700/60 flex items-center justify-center shrink-0 shadow-xs">
              {getStepIcon(step?.icon)}
            </div>
            <h3 className="text-sm font-black text-white leading-tight">
              {step?.title}
            </h3>
          </div>

          <p className="text-[12px] text-zinc-300 leading-relaxed font-medium">
            {step?.description}
          </p>
        </div>
      </div>

      {/* Control Bar (Vector Buttons & Progress) */}
      <div
        className={`absolute z-[72] transition-all duration-300 ease-out bg-[#121215]/95 backdrop-blur-xl px-4 py-2.5 space-y-2 ${
          isBottomTarget
            ? 'top-3 left-3 right-3 rounded-2xl border border-[#e5a93c]/50 shadow-2xl max-w-md mx-auto'
            : 'bottom-0 left-0 right-0 border-t border-zinc-800'
        }`}
      >
        {/* Progress bar */}
        <div className="relative h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#e5a93c] to-[#fbbf24] rounded-full"
            style={{ width: `${progress}%`, transition: 'width 0.4s ease-out' }}
          />
        </div>

        <div className="flex items-center justify-between">
          {/* Step counter */}
          <span className="text-[11px] text-zinc-400 font-bold">
            Paso {stepIndex + 1} de {steps.length} — <span className="text-[#e5a93c]">{roleName}</span>
          </span>

          {/* Control buttons */}
          <div className="flex items-center space-x-1.5">
            <button
              onClick={handlePrev}
              disabled={stepIndex === 0}
              className="bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white p-1.5 rounded-xl transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPaused(!isPaused)}
              className="bg-[#e5a93c] hover:bg-[#fdbe50] text-[#121215] p-1.5 rounded-xl shadow-sm transition-all"
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>

            <button
              onClick={handleNext}
              className="bg-white/10 hover:bg-white/20 text-white p-1.5 rounded-xl transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {isBottomTarget && (
              <button
                onClick={onClose}
                className="bg-white/10 hover:bg-white/20 text-white p-1.5 rounded-xl transition-all ml-1"
                title="Cerrar Demo"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Paused indicator */}
      {isPaused && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[71] bg-[#e5a93c] text-[#121215] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center space-x-1.5 shadow-lg" style={{ animation: 'fadeIn 0.2s ease-out' }}>
          <Pause className="w-3 h-3" />
          <span>Pausado — Tocá reproducir para continuar</span>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}
