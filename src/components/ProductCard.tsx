import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Cpu,
  Palette,
  Video,
  LayoutGrid,
  Image as ImageIcon,
  Mic,
  Tv,
  Film,
  Clapperboard,
  PlaySquare,
  Music,
  Glasses,
  MonitorPlay,
  ArrowRight,
} from 'lucide-react';
import { Product, ProductPlan, StoreSettings } from '../types';

interface ProductCardProps {
  product: Product;
  settings: StoreSettings;
  onSelectProduct: (product: Product, selectedPlan: ProductPlan) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  settings,
  onSelectProduct,
}) => {
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);

  const plans = product.plans && product.plans.length > 0
    ? product.plans
    : [{ name: 'Estándar', price: 'S/ 25.00', desc: 'Plan Estándar' }];

  const currentPlan = plans[selectedPlanIndex] || plans[0];

  const handleCardClick = () => {
    setIsSelecting(true);
    setTimeout(() => {
      onSelectProduct(product, currentPlan);
      setIsSelecting(false);
    }, 180);
  };

  const renderIcon = (iconName?: string) => {
    switch (iconName) {
      case 'bot':
        return <Bot className="w-5 h-5 text-indigo-600" />;
      case 'cpu':
        return <Cpu className="w-5 h-5 text-indigo-600" />;
      case 'palette':
        return <Palette className="w-5 h-5 text-indigo-600" />;
      case 'video':
        return <Video className="w-5 h-5 text-indigo-600" />;
      case 'layout-grid':
        return <LayoutGrid className="w-5 h-5 text-indigo-600" />;
      case 'image':
        return <ImageIcon className="w-5 h-5 text-indigo-600" />;
      case 'mic':
        return <Mic className="w-5 h-5 text-indigo-600" />;
      case 'tv':
        return <Tv className="w-5 h-5 text-indigo-600" />;
      case 'film':
        return <Film className="w-5 h-5 text-indigo-600" />;
      case 'clapperboard':
        return <Clapperboard className="w-5 h-5 text-indigo-600" />;
      case 'play-square':
        return <PlaySquare className="w-5 h-5 text-indigo-600" />;
      case 'music':
        return <Music className="w-5 h-5 text-indigo-600" />;
      case 'glasses':
        return <Glasses className="w-5 h-5 text-indigo-600" />;
      case 'monitor-play':
        return <MonitorPlay className="w-5 h-5 text-indigo-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-indigo-600" />;
    }
  };

  const handlePlanClick = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    setSelectedPlanIndex(idx);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      className={`product-card group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden cursor-pointer select-none transition-all ${
        isSelecting ? 'product-card-selected ring-4 ring-offset-2 ring-indigo-500 dark:ring-offset-slate-900' : ''
      }`}
      style={{
        boxShadow: isHovered
          ? `0 0 28px -4px ${settings.colorPrimary}35, 0 16px 32px -8px rgba(0, 0, 0, 0.08)`
          : undefined,
        borderColor: isHovered ? settings.colorPrimary : undefined,
      }}
    >
      {/* Subtle top glowing accent strip on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, ${settings.colorPrimary}, ${settings.colorAccent})`,
          boxShadow: isHovered ? `0 0 12px ${settings.colorPrimary}` : undefined,
        }}
      />

      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center shrink-0 overflow-hidden shadow-xs transition-transform duration-300 group-hover:scale-105">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-contain p-1"
                />
              ) : (
                renderIcon(product.icon)
              )}
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {product.name}
              </h3>
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.2 rounded-md">
                {product.tag}
              </span>
            </div>
          </div>
          <span
            className={`inline-flex items-center gap-1 text-[9px] font-bold ${
              product.available
                ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800'
                : 'text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800'
            } px-2 py-0.5 rounded-full shrink-0 transition-transform duration-200 group-hover:scale-105`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                product.available ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
              }`}
            />
            {product.available ? 'Entrega 3m' : 'Pausado'}
          </span>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mt-1 mb-2">{product.desc}</p>

        {/* Plan Selectors */}
        {plans.length > 1 && (
          <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1.5">
              Elige tu plan:
            </span>
            <div
              className={`grid gap-1`}
              style={{
                gridTemplateColumns: `repeat(${plans.length}, minmax(0, 1fr))`,
              }}
            >
              {plans.map((pl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => handlePlanClick(e, idx)}
                  className={`py-1 px-1.5 text-[10.5px] font-bold rounded-lg border transition-all text-center leading-tight truncate active:scale-95 cursor-pointer ${
                    idx === selectedPlanIndex
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs scale-102 font-extrabold'
                      : 'bg-slate-50 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700'
                  }`}
                  style={{
                    backgroundColor: idx === selectedPlanIndex ? settings.colorPrimary : undefined,
                    borderColor: idx === selectedPlanIndex ? settings.colorPrimary : undefined,
                  }}
                >
                  {pl.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <div>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 block">{currentPlan.desc || 'Garantía 100%'}</span>
          <p className="text-base font-black text-slate-900 dark:text-white leading-none">{currentPlan.price}</p>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
          className="relative overflow-hidden group/btn px-4 py-2 rounded-xl text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm hover:shadow-lg transition-all duration-300 active:scale-95 shrink-0 cursor-pointer"
          style={{
            backgroundColor: settings.colorPrimary || '#4f46e5',
            boxShadow: isHovered ? `0 4px 14px ${settings.colorPrimary}45` : undefined,
          }}
        >
          {/* Dynamic Fill Transition Layer: smoothly sweeps and fills across the button on hover */}
          <span
            className="absolute inset-0 w-full h-full transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300 ease-out"
            style={{
              background: `linear-gradient(135deg, ${settings.colorAccent || '#06b6d4'} 0%, ${settings.colorPrimary || '#4f46e5'} 100%)`,
            }}
          />

          {/* Shimmer light sweep highlight */}
          <span className="absolute inset-0 w-1/2 h-full bg-white/25 skew-x-[-20deg] transform -translate-x-full group-hover/btn:translate-x-[260%] transition-transform duration-700 ease-in-out pointer-events-none" />

          {/* Content elevated above the dynamic fill */}
          <span className="relative z-10 font-black tracking-tight">Comprar</span>
          <ArrowRight className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
