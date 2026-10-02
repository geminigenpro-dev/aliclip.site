import React from 'react';
import { Flame, Zap, ShieldCheck, Wallet, RefreshCw } from 'lucide-react';
import { StoreSettings } from '../types';

interface HeroProps {
  settings: StoreSettings;
}

export const Hero: React.FC<HeroProps> = ({ settings }) => {
  return (
    <section className="w-full relative overflow-hidden bg-slate-950 text-white select-none border-b border-slate-800/80 shadow-md">
      {/* Dynamic Background Image with Fallback Gradients */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90 transition-opacity duration-300"
        style={{
          backgroundImage: `url('/hero-banner-bg.svg')`,
          backgroundPosition: 'right center',
        }}
      />

      {/* Brand Accent Atmospheric Glows */}
      <div
        className="absolute -right-20 -top-20 w-96 h-96 rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{ background: settings.colorAccent }}
      />
      <div
        className="absolute left-1/4 -bottom-20 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: settings.colorPrimary }}
      />

      {/* Subtle Dark Vignette for Ultra-Crisp Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/20 pointer-events-none" />

      {/* Main Banner Content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8">
        {/* Left Column: Heading and Value Proposition */}
        <div className="max-w-2xl text-center lg:text-left space-y-1.5 sm:space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-[11px] font-extrabold text-cyan-300 uppercase tracking-wide backdrop-blur-md">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
            <span>Ofertas Exclusivas • 100% Cuentas Privadas y Perfiles VIP</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[28px] font-black text-white tracking-tight leading-tight">
            Membresías Premium de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300">
              Inteligencia Artificial
            </span>{' '}
            &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-rose-300">
              Streaming
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed font-normal">
            Activación ultra rápida en 3 minutos. Cuentas renovables mes a mes con garantía de reposición inmediata
            y soporte técnico dedicado en Perú.
          </p>
        </div>

        {/* Right Column: Live Metrics */}
        <div className="grid grid-cols-2 gap-2 sm:gap-2.5 shrink-0 w-full sm:w-auto">
          <div className="bg-slate-900/70 backdrop-blur-md border border-white/10 p-2 sm:p-2.5 rounded-xl text-center shadow-lg hover:border-amber-400/40 transition-colors">
            <span className="block text-base sm:text-lg font-black text-amber-300 leading-tight">+15,400</span>
            <span className="text-[10px] sm:text-[11px] text-slate-300 font-medium">Clientes Activos</span>
          </div>
          <div className="bg-slate-900/70 backdrop-blur-md border border-white/10 p-2 sm:p-2.5 rounded-xl text-center shadow-lg hover:border-cyan-400/40 transition-colors">
            <span className="block text-base sm:text-lg font-black text-cyan-300 leading-tight">&lt; 3 Min</span>
            <span className="text-[10px] sm:text-[11px] text-slate-300 font-medium">Entrega Promedio</span>
          </div>
          <div className="bg-slate-900/70 backdrop-blur-md border border-white/10 p-2 sm:p-2.5 rounded-xl text-center shadow-lg hover:border-emerald-400/40 transition-colors">
            <span className="block text-base sm:text-lg font-black text-emerald-300 leading-tight">100%</span>
            <span className="text-[10px] sm:text-[11px] text-slate-300 font-medium">Garantía Total</span>
          </div>
          <div className="bg-slate-900/70 backdrop-blur-md border border-white/10 p-2 sm:p-2.5 rounded-xl text-center shadow-lg hover:border-indigo-400/40 transition-colors">
            <span className="block text-base sm:text-lg font-black text-white leading-tight">24 / 7</span>
            <span className="text-[10px] sm:text-[11px] text-slate-300 font-medium">Atención VIP</span>
          </div>
        </div>
      </div>

      {/* Integrated Full-Width Trust Bar (Streamlined to save vertical scroll) */}
      <div className="w-full border-t border-white/10 bg-slate-950/85 backdrop-blur-md py-2 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 text-slate-300">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <div className="text-[11px] leading-tight">
              <strong className="block text-white font-bold">Entrega Inmediata</strong>
              <span className="text-[10px] text-slate-400">Al validar tu pago</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <div className="text-[11px] leading-tight">
              <strong className="block text-white font-bold">Garantía del 100%</strong>
              <span className="text-[10px] text-slate-400">Soporte y reposición</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/30">
              <Wallet className="w-3.5 h-3.5" />
            </div>
            <div className="text-[11px] leading-tight">
              <strong className="block text-white font-bold">Yape, Plin &amp; Binance</strong>
              <span className="text-[10px] text-slate-400">Cero comisiones</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/30">
              <RefreshCw className="w-3.5 h-3.5" />
            </div>
            <div className="text-[11px] leading-tight">
              <strong className="block text-white font-bold">Cuentas Renovables</strong>
              <span className="text-[10px] text-slate-400">Sin perder historial</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
