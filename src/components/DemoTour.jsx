import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, SkipForward, SkipBack, X, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react';

const STEP_DURATION = 5500;
const SPLASH_DURATION = 3200;

export default function DemoTour({ steps = [], roleName = '', roleEmoji = '📱', onClose }) {
  const [phase, setPhase] = useState('splash');
  const [stepIndex, setStepIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [spotlightRect, setSpotlightRect] = useState(null);
  const [tooltipSide, setTooltipSide] = useState('bottom');
  const [fadeClass, setFadeClass] = useState('opacity-100');
  const timerRef = useRef(null);

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

  // ─── SPLASH ───
  if (phase === 'splash') {
    return (
      <div className="fixed inset-0 z-[70] bg-[#0a0f0d] flex items-center justify-center" style={{ animation: 'fadeIn 0.4s ease-out' }}>
        <div className="text-center space-y-5 px-6" style={{ animation: 'scaleIn 0.5s ease-out' }}>
          {/* Logo */}
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#033028] to-[#1e463e] flex items-center justify-center mx-auto shadow-2xl border border-[#e5a93c]/40">
            <span className="text-3xl font-black text-[#e5a93c]">T</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">TASKR</h1>
          <p className="text-sm text-[#a5cfc4] font-medium max-w-xs mx-auto leading-relaxed">
            Plataforma de servicios técnicos para condominios de Costa Rica
          </p>
          <div className="pt-4 space-y-2">
            <span className="text-xs text-[#e5a93c] font-black uppercase tracking-widest block">
              {roleEmoji} Demo — Vista {roleName}
            </span>
            <div className="flex items-center justify-center space-x-1.5">
              <div className="w-2 h-2 rounded-full bg-[#e5a93c] animate-pulse" />
              <span className="text-xs text-white/60 font-semibold">Iniciando recorrido...</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="absolute top-5 right-5 text-white/40 hover:text-white text-sm">
          <X className="w-5 h-5" />
        </button>
      </div>
    );
  }

  // ─── COMPLETE ───
  if (phase === 'complete') {
    return (
      <div className="fixed inset-0 z-[70] bg-[#0a0f0d]/95 backdrop-blur-md flex items-center justify-center" style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <div className="text-center space-y-5 px-6 max-w-sm" style={{ animation: 'scaleIn 0.4s ease-out' }}>
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto">
            <span className="text-4xl">✅</span>
          </div>
          <h2 className="text-2xl font-black text-white">¡Pura Vida!</h2>
          <p className="text-sm text-[#a5cfc4] font-medium leading-relaxed">
            Ya conocés la vista de <strong className="text-[#e5a93c]">{roleName}</strong> en TASKR.<br />
            Ahora probala vos mismo.
          </p>
          <div className="flex items-center justify-center space-x-3 pt-3">
            <button
              onClick={handleRestart}
              className="bg-white/10 hover:bg-white/20 text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center space-x-1.5 border border-white/20 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Repetir Demo</span>
            </button>
            <button
              onClick={onClose}
              className="bg-[#e5a93c] hover:bg-[#fdbe50] text-[#1c1b1b] font-black py-2.5 px-5 rounded-xl text-xs flex items-center space-x-1.5 shadow-lg transition-all"
            >
              <span>Explorar App</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <button onClick={onClose} className="absolute top-5 right-5 text-white/40 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>
    );
  }

  // ─── TOURING ───
  const isOverlayStep = !step?.targetId || !spotlightRect;

  return (
    <div className="fixed inset-0 z-[70]" style={{ animation: 'fadeIn 0.3s ease-out' }}>

      {/* Dark overlay with spotlight cutout */}
      {isOverlayStep ? (
        <div className="absolute inset-0 bg-[#0a0f0d]/85 backdrop-blur-sm z-[70]" onClick={() => setIsPaused(!isPaused)} />
      ) : (
        /* Crystal Clear Spotlight Hole - 0% Opacity in focus box, 85% opacity around it */
        <div
          onClick={() => setIsPaused(!isPaused)}
          className="absolute rounded-2xl border-2 border-[#e5a93c] pointer-events-auto cursor-pointer transition-all duration-400 ease-out"
          style={{
            top: spotlightRect.top,
            left: spotlightRect.left,
            width: spotlightRect.width,
            height: spotlightRect.height,
            boxShadow: '0 0 0 9999px rgba(10, 15, 13, 0.85), 0 0 35px 6px rgba(229, 169, 60, 0.35)',
            zIndex: 70
          }}
        />
      )}

      {/* Close button */}
      <button onClick={onClose} className="absolute top-4 right-4 z-[71] bg-white/10 hover:bg-white/20 text-white p-2 rounded-full border border-white/20 transition-all">
        <X className="w-4 h-4" />
      </button>

      {/* Tooltip Card */}
      <div
        className={`absolute z-[71] max-w-[340px] w-[90vw] transition-all duration-300 pointer-events-none ${fadeClass}`}
        style={
          isOverlayStep
            ? { top: '48%', left: '50%', transform: 'translate(-50%, -50%)' }
            : tooltipSide === 'bottom'
              ? {
                  top: `${Math.min(window.innerHeight - 240, spotlightRect.top + spotlightRect.height + 12)}px`,
                  left: '50%',
                  transform: 'translateX(-50%)'
                }
              : {
                  top: `${Math.max(65, spotlightRect.top - 12)}px`,
                  left: '50%',
                  transform: 'translate(-50%, -100%)'
                }
        }
      >
        <div className="bg-[#1a201d] border border-[#2e3633] rounded-2xl p-4 shadow-2xl space-y-2.5 relative pointer-events-auto">
          {/* Gold accent line */}
          <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-[#e5a93c] to-transparent rounded-full" />

          <h3 className="text-sm font-black text-white leading-tight pt-1">
            {step?.title}
          </h3>
          <p className="text-[12px] text-[#a9acaa] leading-relaxed font-medium">
            {step?.description}
          </p>
        </div>
      </div>

      {/* Bottom Control Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-[71] bg-[#1a201d]/95 backdrop-blur-md border-t border-[#2e3633] px-4 py-3 space-y-2.5">
        {/* Progress bar */}
        <div className="relative h-1 bg-[#2e3633] rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#e5a93c] to-[#fdbe50] rounded-full"
            style={{ width: `${progress}%`, transition: 'width 0.4s ease-out' }}
          />
        </div>

        <div className="flex items-center justify-between">
          {/* Step counter */}
          <span className="text-[11px] text-[#a9acaa] font-bold">
            Paso {stepIndex + 1} de {steps.length} — <span className="text-[#e5a93c]">{roleName}</span>
          </span>

          {/* Control buttons */}
          <div className="flex items-center space-x-1.5">
            <button
              onClick={handlePrev}
              disabled={stepIndex === 0}
              className="bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white p-2 rounded-xl transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPaused(!isPaused)}
              className="bg-[#e5a93c] hover:bg-[#fdbe50] text-[#1c1b1b] p-2 rounded-xl shadow-sm transition-all"
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>

            <button
              onClick={handleNext}
              className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Paused indicator */}
      {isPaused && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[71] bg-[#e5a93c] text-[#1c1b1b] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 shadow-lg" style={{ animation: 'fadeIn 0.2s ease-out' }}>
          <Pause className="w-3 h-3" />
          <span>Pausado — Tocá ▶ para continuar</span>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}
