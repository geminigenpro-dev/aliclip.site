import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
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
  Star,
  Zap,
  Package,
  Flame,
  Clock,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { Product, ProductPlan, StoreSettings } from '../types';

interface ProductCardProps {
  product: Product;
  settings: StoreSettings;
  onSelectProduct: (product: Product, selectedPlan: ProductPlan) => void;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  settings,
  onSelectProduct,
  index = 0,
}) => {
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);

  const plans =
    product.plans && product.plans.length > 0
      ? product.plans
      : [{ name: 'Estándar', price: 'S/ 25.00', desc: 'Plan Estándar' }];

  const currentPlan = plans[selectedPlanIndex] || plans[0];
  const stockUnits = product.stock ?? 10;
  const isAvailable = product.available && stockUnits > 0;

  // Check if product is marked as 'Oferta Flash'
  const tagLower = (product.tag || '').toLowerCase();
  const isFlashOffer =
    tagLower.includes('oferta flash') ||
    tagLower.includes('flash') ||
    (product.desc || '').toLowerCase().includes('oferta flash');

  // Dynamic countdown timer synchronized with current time (counts down to midnight)
  const [timeLeft, setTimeLeft] = useState<{ hours: string; minutes: string; seconds: string }>({
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    if (!isFlashOffer) return;

    const calculateTimeRemaining = () => {
      const now = new Date();
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);
      const diff = Math.max(0, endOfDay.getTime() - now.getTime());

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      });
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(interval);
  }, [isFlashOffer]);

  const handleCardClick = () => {
    setIsSelecting(true);
    setTimeout(() => {
      onSelectProduct(product, currentPlan);
      setIsSelecting(false);
    }, 180);
  };

  const renderIcon = (iconName?: string) => {
    const iconClass =
      'w-7 h-7 sm:w-8 sm:h-8 text-purple-600 dark:text-indigo-400 group-hover:text-pink-500 transition-colors duration-300';
    switch (iconName) {
      case 'bot':
        return <Bot className={iconClass} />;
      case 'cpu':
        return <Cpu className={iconClass} />;
      case 'palette':
        return <Palette className={iconClass} />;
      case 'video':
        return <Video className={iconClass} />;
      case 'layout-grid':
        return <LayoutGrid className={iconClass} />;
      case 'image':
        return <ImageIcon className={iconClass} />;
      case 'mic':
        return <Mic className={iconClass} />;
      case 'tv':
        return <Tv className={iconClass} />;
      case 'film':
        return <Film className={iconClass} />;
      case 'clapperboard':
        return <Clapperboard className={iconClass} />;
      case 'play-square':
        return <PlaySquare className={iconClass} />;
      case 'music':
        return <Music className={iconClass} />;
      case 'glasses':
        return <Glasses className={iconClass} />;
      case 'monitor-play':
        return <MonitorPlay className={iconClass} />;
      default:
        return <Sparkles className={iconClass} />;
    }
  };

  const handlePlanClick = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    setSelectedPlanIndex(idx);
  };

  // Determine badge styling based on product tag
  const getBadgeStyle = () => {
    const tag = (product.tag || '').toLowerCase();
    if (tag.includes('oferta flash') || tag.includes('flash')) {
      return {
        label: '⚡ OFERTA FLASH',
        classes:
          'text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-500/20 border-rose-400 dark:border-rose-500/50 shadow-xs dark:shadow-[0_0_14px_rgba(244,63,94,0.4)] animate-pulse font-black',
      };
    }
    if (tag.includes('gpt') || tag.includes('4k') || tag.includes('top') || tag.includes('vip')) {
      return {
        label: product.tag || 'BEST SELLER',
        classes:
          'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-500/15 border-amber-300 dark:border-amber-400/40 shadow-xs dark:shadow-[0_0_12px_rgba(251,191,36,0.3)] font-bold',
      };
    }
    if (tag.includes('nuevo') || tag.includes('new') || tag.includes('ultra')) {
      return {
        label: product.tag || 'NUEVO',
        classes:
          'text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-500/15 border-cyan-300 dark:border-cyan-400/40 shadow-xs dark:shadow-[0_0_12px_rgba(34,211,238,0.3)] font-bold',
      };
    }
    return {
      label: product.tag || 'TRENDING',
      classes:
        'text-pink-700 dark:text-pink-300 bg-pink-50 dark:bg-pink-500/15 border-pink-300 dark:border-pink-400/40 shadow-xs dark:shadow-[0_0_12px_rgba(244,114,182,0.3)] font-bold',
    };
  };

  const badge = getBadgeStyle();

  // Category labels with friendly emojis
  const getCategoryLabel = (cat?: string) => {
    switch (cat) {
      case 'ai':
        return '✨ IA & Creatividad';
      case 'streaming':
        return '🎬 Streaming 4K';
      default:
        return '⚡ Software VIP';
    }
  };

  // Calculate simulated regular original price for strikethrough comparison
  const parsePrice = (priceStr: string) => {
    const num = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) return null;
    const original = Math.round(num * 1.38);
    return `S/ ${original.toFixed(2)}`;
  };

  const originalPriceStr = parsePrice(currentPlan.price);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.38,
        delay: Math.min(index * 0.05, 0.35),
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6, transition: { duration: 0.22 } }}
      className="h-full flex flex-col"
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
        className={`group relative h-full flex flex-col justify-between rounded-3xl p-5 sm:p-6 cursor-pointer select-none transition-all duration-300 backdrop-blur-xl ${
          isSelecting
            ? 'ring-4 ring-purple-500 ring-offset-2 ring-offset-white dark:ring-offset-[#070913] scale-[0.99]'
            : ''
        } bg-white/95 dark:bg-[#0c101d]/95 border border-slate-200 dark:border-slate-800 hover:border-purple-500/60 shadow-md dark:shadow-lg hover:shadow-2xl dark:hover:shadow-[0_16px_45px_rgba(168,85,247,0.24)]`}
        style={{
          boxShadow: isHovered
            ? `0 16px 45px -10px ${settings.colorPrimary || '#8b5cf6'}40, 0 0 30px -4px ${settings.colorAccent || '#ec4899'}25`
            : undefined,
          borderColor: isHovered ? (settings.colorPrimary || '#a855f7') : undefined,
        }}
      >
        {/* Ambient Top Glow Line on Hover */}
        <div
          className="absolute top-0 left-6 right-6 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, ${settings.colorPrimary || '#ec4899'}, ${settings.colorAccent || '#8b5cf6'})`,
          }}
        />

        {/* Top Badges Row */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            {/* Category micro badge */}
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
              {getCategoryLabel(product.category)}
            </span>

            {/* Flash/Best Seller Badge */}
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider border backdrop-blur-md transition-transform duration-300 group-hover:scale-105 ${badge.classes}`}
            >
              {badge.label}
            </span>
          </div>

          {/* Product Center Image Showcase (Pedestal Look with Increased Presence) */}
          <div className="relative my-3 flex items-center justify-center">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-b from-purple-500/10 via-indigo-500/5 to-transparent border border-slate-200/80 dark:border-slate-800 flex items-center justify-center p-3.5 relative group-hover:border-purple-400/50 group-hover:shadow-[0_0_32px_rgba(168,85,247,0.3)] transition-all duration-300">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-contain filter drop-shadow-md dark:drop-shadow-[0_10px_20px_rgba(0,0,0,0.55)] transform transition-transform duration-300 group-hover:scale-110"
                />
              ) : (
                <div className="transform transition-transform duration-300 group-hover:scale-110">
                  {renderIcon(product.icon)}
                </div>
              )}

              {/* Floating Guarantee Chip */}
              <div className="absolute -bottom-2.5 px-2 py-0.5 rounded-full bg-white dark:bg-[#141b31] border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-1 text-[9.5px] font-bold text-slate-700 dark:text-slate-300">
                <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />
                <span>Garantía Oficial</span>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="text-center mt-3.5">
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
              {product.name}
            </h3>

            {/* Star Ratings + Reviews */}
            <div className="flex items-center justify-center gap-1.5 mt-1 mb-2">
              <div className="flex items-center text-amber-400 text-xs">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-black text-slate-800 dark:text-slate-200">4.9</span>
              <span className="text-[10.5px] text-slate-400 dark:text-slate-500 font-medium">
                (1,480+ verificadas)
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed min-h-[36px] px-1">
              {product.desc}
            </p>

            {/* Feature Perks Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2.5">
              <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60 flex items-center gap-1">
                <Zap className="w-2.5 h-2.5 text-purple-500" />
                Entrega &lt;3m
              </span>
              <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1">
                <Check className="w-2.5 h-2.5 text-emerald-500" />
                PIN Propio
              </span>
              <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-md bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/60 flex items-center gap-1">
                <ShieldCheck className="w-2.5 h-2.5 text-sky-500" />
                Renovable
              </span>
            </div>
          </div>

          {/* Dynamic Flash Offer Countdown Timer (Synchronized with Current Time) */}
          {isFlashOffer && (
            <div className="mt-3 p-2.5 rounded-xl bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-rose-500/10 dark:from-rose-950/50 dark:via-amber-950/30 dark:to-rose-950/50 border border-rose-400/50 dark:border-rose-500/50 flex items-center justify-between shadow-sm dark:shadow-[0_0_16px_rgba(244,63,94,0.22)] select-none">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-80" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                </span>
                <div className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse shrink-0" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 dark:text-rose-300">
                    Termina en:
                  </span>
                </div>
              </div>

              {/* Digital LED Clock Display */}
              <div className="flex items-center gap-1 font-mono font-black text-xs">
                <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/30">
                  {timeLeft.hours}h
                </span>
                <span className="text-rose-500 font-bold">:</span>
                <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                  {timeLeft.minutes}m
                </span>
                <span className="text-amber-500 font-bold">:</span>
                <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                  {timeLeft.seconds}s
                </span>
              </div>
            </div>
          )}

          {/* Availability & Exact Units Stock Section */}
          <div className="mt-3 p-2.5 rounded-xl bg-slate-50 dark:bg-[#13192f]/90 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-[11px]">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isAvailable
                    ? 'bg-emerald-500 shadow-[0_0_10px_rgba(52,211,153,0.9)] animate-pulse'
                    : 'bg-rose-500'
                }`}
              />
              <span className="font-extrabold text-slate-800 dark:text-slate-200">
                {isAvailable ? 'Disponible' : 'Sin stock'}
              </span>
            </div>

            <div className="flex items-center gap-1 text-[10.5px] font-black">
              {isAvailable ? (
                stockUnits <= 3 ? (
                  <span className="text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-500/40 px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                    🔥 Solo {stockUnits} cupos
                  </span>
                ) : (
                  <span className="text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-500/30 px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                    <Package className="w-3.5 h-3.5 text-purple-500" />
                    <span>{stockUnits} cupos</span>
                  </span>
                )
              ) : (
                <span className="text-slate-400 bg-slate-200/50 dark:bg-slate-800/50 px-2 py-0.5 rounded-md">
                  Agotado
                </span>
              )}
            </div>
          </div>

          {/* Dynamic Plan Selector Pills & Live Plan Details */}
          {plans.length > 1 && (
            <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-800/80 space-y-2">
              <span className="text-[10px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-wider block text-center">
                Elige tu Modalidad / Plan
              </span>
              <div
                className="grid gap-1.5"
                style={{
                  gridTemplateColumns: `repeat(${plans.length}, minmax(0, 1fr))`,
                }}
              >
                {plans.map((pl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => handlePlanClick(e, idx)}
                    className={`py-1.5 px-2 text-[10.5px] font-black rounded-xl border transition-all text-center truncate cursor-pointer ${
                      idx === selectedPlanIndex
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-500 shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {pl.name}
                  </button>
                ))}
              </div>

              {/* Live Details of Currently Selected Plan */}
              {currentPlan.desc && (
                <div className="text-[10.5px] text-slate-600 dark:text-slate-400 bg-slate-100/70 dark:bg-slate-850/60 p-2 rounded-xl border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-1 leading-tight">
                  <span className="truncate">✓ {currentPlan.desc}</span>
                  <span className="text-purple-600 dark:text-purple-400 font-bold shrink-0">
                    {currentPlan.name}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Pricing & High Conversion Action CTA */}
        <div className="mt-4 pt-3.5 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-3">
          <div>
            {originalPriceStr && (
              <span className="text-[11px] text-slate-400 line-through block leading-none font-bold">
                {originalPriceStr}
              </span>
            )}
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-none tracking-tight">
                {currentPlan.price}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCardClick}
            className="px-4 py-2.5 rounded-xl font-black text-xs text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-700 hover:via-indigo-700 hover:to-pink-700 shadow-md group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300 flex items-center gap-1.5 group/btn cursor-pointer shrink-0"
          >
            <span>Comprar</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
