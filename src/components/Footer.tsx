import React from 'react';
import {
  Sparkles,
  MessageCircle,
  FileText,
  BookOpen,
  Code,
  ExternalLink,
  ShieldCheck,
  Lock,
  CreditCard,
  Smartphone,
  Coins,
  Wallet,
  Building2,
  CheckCircle2,
  Sun,
  Moon,
  Clock,
  Zap,
  HelpCircle,
  Layers,
} from 'lucide-react';
import { StoreSettings, PaymentMethod } from '../types';
import { DEFAULT_PAYMENT_METHODS } from '../services/storeService';

interface FooterProps {
  settings: StoreSettings;
  onFilterCategory: (cat: string) => void;
  onOpenTerms: () => void;
  onOpenClaims: () => void;
  onOpenAdminAuth: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onFilterCategory,
  onOpenTerms,
  onOpenClaims,
  onOpenAdminAuth,
  theme = 'light',
  onToggleTheme,
}) => {
  const waUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    `Hola ${settings.name}${settings.suffix}, deseo consultar por una membresía`
  )}`;

  // Filter payment methods configured in admin settings that are enabled
  const visiblePaymentMethods: PaymentMethod[] = (
    settings.paymentMethods && settings.paymentMethods.length > 0
      ? settings.paymentMethods
      : DEFAULT_PAYMENT_METHODS
  ).filter((m) => m.enabled !== false);

  const renderSmallPaymentLogo = (method: PaymentMethod, sizeClass = 'w-4 h-4') => {
    if (method.logoUrl) {
      return (
        <img
          src={method.logoUrl}
          alt={method.name}
          className={`${sizeClass} object-contain rounded-xs shrink-0`}
        />
      );
    }
    switch (method.icon) {
      case 'smartphone':
        return <Smartphone className={`${sizeClass} shrink-0`} style={{ color: method.color }} />;
      case 'coins':
        return <Coins className={`${sizeClass} shrink-0`} style={{ color: method.color }} />;
      case 'wallet':
        return <Wallet className={`${sizeClass} shrink-0`} style={{ color: method.color }} />;
      case 'bank':
        return <Building2 className={`${sizeClass} shrink-0`} style={{ color: method.color }} />;
      case 'credit-card':
      default:
        return <CreditCard className={`${sizeClass} shrink-0`} style={{ color: method.color }} />;
    }
  };

  return (
    <footer className="bg-slate-50/70 dark:bg-[#070b14] border-t border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 pt-10 pb-8 mt-auto transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 pb-8">
          
          {/* Col 1: Marca & Contacto Directo */}
          <div className="space-y-4">
            {/* Brand Logo & Name */}
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold shadow-xs overflow-hidden shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${settings.colorPrimary} 0%, ${settings.colorAccent} 100%)`,
                }}
              >
                {settings.logoBase64 ? (
                  <img src={settings.logoBase64} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <Sparkles className="w-4 h-4 text-white" />
                )}
              </div>
              <span
                className="text-lg tracking-tight text-slate-900 dark:text-white transition-all leading-none"
                style={{
                  fontFamily: settings.brandFont ? `"${settings.brandFont}", system-ui, sans-serif` : undefined,
                  fontWeight: settings.brandFontWeight || '900',
                  letterSpacing: settings.brandLetterSpacing || '-0.025em',
                }}
              >
                {settings.name}
                <span
                  style={{
                    background: `linear-gradient(135deg, ${settings.colorPrimary} 0%, ${settings.colorAccent} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {settings.suffix}
                </span>
              </span>
            </div>

            <p className="text-[11.5px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Plataforma digital especializada en cuentas premium de Inteligencia Artificial y Streaming para Perú, con entrega ágil y garantía total garantizada.
            </p>

            {/* Direct WhatsApp Action & Availability */}
            <div className="space-y-2 pt-1">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 font-bold text-xs hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all shadow-2xs group"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{settings.whatsappDisplay}</span>
              </a>

              <div className="flex items-center gap-1.5 text-[10.5px] text-slate-500 dark:text-slate-400">
                <Clock className="w-3 h-3 text-slate-400 dark:text-slate-500 shrink-0" />
                <span>Atención: Lun a Dom, 8:00 AM - 11:30 PM</span>
              </div>
            </div>
          </div>

          {/* Col 2: Catálogo & Accesos Directos */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-3 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-500" />
              <span>Catálogo & Servicios</span>
            </h4>
            <div className="space-y-3">
              <div>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                  Inteligencia Artificial
                </p>
                <ul className="space-y-1 text-[11.5px] text-slate-600 dark:text-slate-400">
                  <li>
                    <a
                      href="#catalogo"
                      onClick={() => onFilterCategory('ai')}
                      className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      ChatGPT Plus & Claude Pro
                    </a>
                  </li>
                  <li>
                    <a
                      href="#catalogo"
                      onClick={() => onFilterCategory('ai')}
                      className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      Midjourney V6 & Canva Pro
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                  Streaming & Ocio
                </p>
                <ul className="space-y-1 text-[11.5px] text-slate-600 dark:text-slate-400">
                  <li>
                    <a
                      href="#catalogo"
                      onClick={() => onFilterCategory('streaming')}
                      className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      Netflix Ultra HD & Disney+ Premium
                    </a>
                  </li>
                  <li>
                    <a
                      href="#catalogo"
                      onClick={() => onFilterCategory('streaming')}
                      className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      Max Platino, Spotify & YouTube
                    </a>
                  </li>
                </ul>
              </div>

              <div className="pt-1 flex flex-wrap gap-2">
                <a
                  href="#combos"
                  className="inline-flex items-center gap-1 text-[10.5px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  <Zap className="w-3 h-3" />
                  <span>Ver Combos con Descuento</span>
                </a>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <a
                  href="#faq"
                  className="inline-flex items-center gap-1 text-[10.5px] font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>Preguntas Frecuentes</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Seguridad, Respaldo & Legal */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Garantía & Confianza</span>
            </h4>

            <div className="space-y-2.5">
              {/* Trust highlights */}
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1.5 shadow-2xs">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                      Garantía 100% Activa
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">
                      Reemplazo y soporte directo durante todo el período de suscripción.
                    </p>
                  </div>
                </div>
              </div>

              {/* Legal interactive links */}
              <div className="space-y-1.5 pt-1">
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="w-full text-left text-[11px] text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold flex items-center gap-2 py-1 transition-colors cursor-pointer group"
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-500 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Términos del Servicio & Políticas</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenClaims}
                  className="w-full text-left text-[11px] text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 font-semibold flex items-center gap-2 py-1 transition-colors cursor-pointer group"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-500 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Libro de Reclamaciones (INDECOPI)</span>
                </button>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-500 pt-1">
                <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                <span>Datos protegidos y transacciones verificadas</span>
              </div>
            </div>
          </div>

          {/* Col 4: Métodos de Pago (Sección única, compacta y organizada) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-indigo-500" />
                <span>Métodos de Pago</span>
              </h4>
              <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {visiblePaymentMethods.length} activos
              </span>
            </div>

            {/* Organized Payment Cards Grid - single dedicated display */}
            <div className="grid grid-cols-2 gap-1.5">
              {visiblePaymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 border border-slate-200/90 dark:border-slate-800 transition-all duration-200 shadow-2xs group"
                  style={{
                    borderColor: `${method.color}35`,
                  }}
                  title={method.accountNumber ? `${method.name}: ${method.accountNumber}` : method.name}
                >
                  <div
                    className="w-5 h-5 rounded-md flex items-center justify-center overflow-hidden shrink-0 bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-2xs group-hover:scale-105 transition-transform"
                    style={{
                      boxShadow: `0 0 6px ${method.color}25`,
                    }}
                  >
                    {renderSmallPaymentLogo(method, 'w-3.5 h-3.5')}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-slate-900 dark:group-hover:text-white">
                      {method.name}
                    </span>
                    {method.badge && (
                      <span className="block text-[9px] font-medium text-slate-400 dark:text-slate-500 truncate leading-none mt-0.5">
                        {method.badge}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2.5 leading-relaxed">
              Pagos en Soles (S/) o Dólares ($) con validación automática vía WhatsApp.
            </p>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-slate-400">
          {/* Copyright & Location */}
          <div className="text-center md:text-left space-y-0.5">
            <p className="font-medium text-slate-600 dark:text-slate-400">
              © 2026{' '}
              <span className="font-bold text-slate-900 dark:text-white">
                {settings.name}{settings.suffix}
              </span>
              . Todos los derechos reservados.
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500">
              Hecho con cariño para clientes en todo el Perú 🇵🇪 • Lima
            </p>
          </div>

          {/* Right Actions & Utilities */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {/* Developer link */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10.5px]">Desarrollado por:</span>
              <a
                href={settings.creatorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-[10.5px] transition-colors border border-slate-200 dark:border-slate-700"
              >
                <Code className="w-3 h-3 text-indigo-500" />
                <span>{settings.creatorHandle}</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
            </div>

            {/* Dark / Light Mode Toggle */}
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold transition-colors cursor-pointer"
                title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Modo Claro</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-slate-600" />
                    <span>Modo Oscuro</span>
                  </>
                )}
              </button>
            )}

            {/* Discreet Admin Lock */}
            <button
              type="button"
              onClick={onOpenAdminAuth}
              className="p-1 rounded text-slate-300 dark:text-slate-600 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Acceso de Administrador"
              aria-label="Acceso de Administrador"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
