import React, { useState } from 'react';
import {
  X,
  Sparkles,
  MessageCircle,
  Copy,
  Check,
  CreditCard,
  Smartphone,
  Coins,
  Wallet,
  Building2,
} from 'lucide-react';
import { Product, ProductPlan, StoreSettings, PaymentMethod } from '../types';
import { DEFAULT_PAYMENT_METHODS } from '../services/storeService';

interface BuyModalProps {
  product: Product | null;
  plan: ProductPlan | null;
  settings: StoreSettings;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export const BuyModal: React.FC<BuyModalProps> = ({
  product,
  plan,
  settings,
  onClose,
  onToast,
}) => {
  // Available payment methods from settings or defaults
  const availableMethods: PaymentMethod[] = (
    settings.paymentMethods && settings.paymentMethods.length > 0
      ? settings.paymentMethods
      : DEFAULT_PAYMENT_METHODS
  ).filter((m) => m.enabled !== false);

  const [selectedMethodId, setSelectedMethodId] = useState<string>(
    availableMethods[0]?.id || 'pay_yape'
  );
  const [copiedText, setCopiedText] = useState<string | null>(null);

  if (!product) return null;

  const currentPlan = plan || (product.plans && product.plans[0]) || {
    name: 'Estándar',
    price: 'S/ 25.00',
    desc: 'Plan Estándar',
  };

  const selectedMethod =
    availableMethods.find((m) => m.id === selectedMethodId) ||
    availableMethods[0] ||
    DEFAULT_PAYMENT_METHODS[0];

  const handleCopy = (text: string, label: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(() => {
          fallbackCopyText(text);
        });
      } else {
        fallbackCopyText(text);
      }
    } catch {
      fallbackCopyText(text);
    }
    setCopiedText(text);
    onToast(`${label} copiado al portapapeles`);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const fallbackCopyText = (text: string) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      textArea.style.top = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    } catch (e) {
      console.warn('Fallback copy failed', e);
    }
  };

  const handleConfirmWhatsApp = () => {
    const message = `¡Hola ${settings.name}${settings.suffix}! 👋 Deseo adquirir la membresía de *${product.name}* en el plan *${currentPlan.name}* (${currentPlan.price}). Mi método de pago preferido es: *${selectedMethod.name}* (Dato: ${selectedMethod.accountNumber}). ¿Me confirman para enviar mi comprobante?`;
    const url = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message)}`;
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose();
  };

  const renderMethodIcon = (method: PaymentMethod, sizeClass = 'w-4 h-4') => {
    if (method.logoUrl) {
      return (
        <img
          src={method.logoUrl}
          alt={method.name}
          className={`${sizeClass} object-contain rounded-sm`}
        />
      );
    }
    switch (method.icon) {
      case 'smartphone':
        return <Smartphone className={sizeClass} style={{ color: method.color }} />;
      case 'coins':
        return <Coins className={sizeClass} style={{ color: method.color }} />;
      case 'wallet':
        return <Wallet className={sizeClass} style={{ color: method.color }} />;
      case 'bank':
        return <Building2 className={sizeClass} style={{ color: method.color }} />;
      case 'credit-card':
      default:
        return <CreditCard className={sizeClass} style={{ color: method.color }} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 select-none">
      <div className="bg-white dark:bg-[#0f172a] rounded-2xl max-w-md w-full p-4 sm:p-6 shadow-2xl border border-slate-100 dark:border-slate-800 relative animate-in fade-in zoom-in-95 duration-150 max-h-[95vh] flex flex-col text-slate-900 dark:text-slate-100 transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700 overflow-hidden shrink-0 shadow-xs"
              style={{
                background: `linear-gradient(135deg, ${settings.colorPrimary}15, ${settings.colorAccent}15)`,
              }}
            >
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain p-1" />
              ) : (
                <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              )}
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">{product.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {currentPlan.name} • {currentPlan.desc || 'Garantía 100%'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-3.5 space-y-3.5 overflow-y-auto flex-1">
          {/* Total Price Banner */}
          <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/70 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-400 block tracking-wider">
                {product.category === 'ai' ? 'Inteligencia Artificial' : 'Streaming & Apps'}
              </span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Total a Pagar:</span>
            </div>
            <span
              className="text-xl font-black"
              style={{
                color: settings.colorPrimary || '#4f46e5',
              }}
            >
              {currentPlan.price}
            </span>
          </div>

          {/* Payment Methods Selector Grid */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide">
                Selecciona tu método de pago:
              </label>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                {availableMethods.length} opciones disponibles
              </span>
            </div>

            <div
              className={`grid gap-2 ${
                availableMethods.length <= 2
                  ? 'grid-cols-2'
                  : availableMethods.length === 3
                  ? 'grid-cols-3'
                  : 'grid-cols-2 sm:grid-cols-3'
              }`}
            >
              {availableMethods.map((method) => {
                const isSelected = method.id === selectedMethod.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setSelectedMethodId(method.id)}
                    className={`relative p-2.5 rounded-xl text-xs flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'font-bold scale-102 ring-2 ring-offset-1 dark:ring-offset-slate-900'
                        : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 hover:scale-101'
                    }`}
                    style={{
                      borderColor: isSelected ? method.color : undefined,
                      boxShadow: isSelected
                        ? `0 0 16px -1px ${method.color}80, 0 0 6px ${method.color}50`
                        : undefined,
                      backgroundColor: isSelected ? `${method.color}15` : undefined,
                    }}
                  >
                    {/* Glowing indicator dot when selected */}
                    {isSelected && (
                      <span
                        className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full animate-ping"
                        style={{ backgroundColor: method.color }}
                      />
                    )}

                    <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-1 overflow-hidden shrink-0">
                      {renderMethodIcon(method, 'w-6 h-6')}
                    </div>

                    <span className="text-[11.5px] leading-tight font-extrabold text-slate-800 dark:text-slate-100 line-clamp-1">
                      {method.name}
                    </span>
                    <span className="text-[9px] font-medium text-slate-400 dark:text-slate-400 opacity-90 line-clamp-1 mt-0.5">
                      {method.badge || 'Sin comisiones'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Payment Details Box with Dynamic Neon Glow */}
          <div
            className="p-3.5 rounded-xl border transition-all duration-300 relative overflow-hidden space-y-2.5"
            style={{
              borderColor: `${selectedMethod.color}60`,
              boxShadow: `0 0 20px -3px ${selectedMethod.color}25, 0 4px 12px rgba(0,0,0,0.03)`,
              backgroundColor: `${selectedMethod.color}08`,
            }}
          >
            {/* Top header of selected method */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-700/80">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden shrink-0 shadow-2xs"
                  style={{
                    backgroundColor: `${selectedMethod.color}15`,
                    border: `1px solid ${selectedMethod.color}40`,
                  }}
                >
                  {renderMethodIcon(selectedMethod, 'w-5 h-5')}
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-800 dark:text-slate-100 leading-none">
                    {selectedMethod.name}
                  </h4>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                    {selectedMethod.badge || 'Pago inmediato'}
                  </span>
                </div>
              </div>

              {/* Neon Glow badge */}
              <span
                className="px-2 py-0.5 rounded-full text-[9.5px] font-extrabold uppercase tracking-wider"
                style={{
                  backgroundColor: `${selectedMethod.color}20`,
                  color: selectedMethod.color,
                  boxShadow: `0 0 8px ${selectedMethod.color}40`,
                }}
              >
                Activo
              </span>
            </div>

            {/* Account Number Box */}
            <div className="bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200/90 dark:border-slate-700 space-y-1">
              <span className="text-[9.5px] uppercase font-bold text-slate-400 dark:text-slate-400 block tracking-wider">
                Dato de Pago / Cuenta a Transferir:
              </span>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight break-all">
                  {selectedMethod.accountNumber}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(selectedMethod.accountNumber, selectedMethod.name)}
                  className="px-2.5 py-1 rounded-md text-xs font-bold text-white shrink-0 flex items-center gap-1 shadow-xs transition-all active:scale-95 cursor-pointer"
                  style={{
                    backgroundColor: selectedMethod.color,
                    boxShadow: `0 0 10px ${selectedMethod.color}50`,
                  }}
                >
                  {copiedText === selectedMethod.accountNumber ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-white" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Account Holder & Instructions */}
            {selectedMethod.accountHolder && (
              <p className="text-[10.5px] text-slate-600 dark:text-slate-300 font-medium leading-tight">
                <strong>Titular:</strong> {selectedMethod.accountHolder}
              </p>
            )}

            {selectedMethod.instructions && (
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight bg-slate-50/80 dark:bg-slate-800/80 p-2 rounded-lg border border-slate-200/60 dark:border-slate-700">
                ℹ️ {selectedMethod.instructions}
              </p>
            )}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2 shrink-0">
          <button
            onClick={handleConfirmWhatsApp}
            className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md active:scale-98 transition-transform cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Confirmar y Enviar Comprobante por WhatsApp</span>
          </button>
          <button
            onClick={onClose}
            className="w-full py-1.5 text-slate-500 dark:text-slate-400 text-xs font-semibold hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
          >
            Volver al catálogo
          </button>
        </div>
      </div>
    </div>
  );
};
