import React from 'react';
import { Package, Check, ArrowRight } from 'lucide-react';
import { StoreSettings } from '../types';

interface FeaturedCombosProps {
  settings: StoreSettings;
  onRequestCombo: (name: string, price: string) => void;
}

export const FeaturedCombos: React.FC<FeaturedCombosProps> = ({ settings, onRequestCombo }) => {
  return (
    <section id="promos" className="py-7 bg-white dark:bg-[#0b0f19] border-y border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded-md mb-1">
              <Package className="w-3.5 h-3.5" />
              Ahorro Máximo
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">Packs & Combos Más Vendidos</h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Ahorra hasta 25% llevando herramientas conjuntas de trabajo o entretenimiento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Combo 1 */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-white to-indigo-50/30 dark:from-slate-900/90 dark:via-slate-850 dark:to-indigo-950/30 border border-indigo-100 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-500 transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-indigo-600 text-white rounded-md">
                  Pack Creativo IA
                </span>
                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                  Ahorra 20%
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">ChatGPT Plus + Midjourney</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 mb-3">
                La combinación definitiva para redactores, publicistas y creadores de contenido digital.
              </p>
              <ul className="text-[11px] text-slate-600 dark:text-slate-300 space-y-1 mb-4">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> GPT-4o sin límites + DALL-E 3
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Midjourney V6.1 Ultra Realista
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Soporte VIP y entrega inmediata
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-indigo-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 line-through">S/ 85.00</span>
                <p className="text-lg font-black text-indigo-700 dark:text-indigo-400 leading-none">
                  S/ 69.90 <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400">/ mes</span>
                </p>
              </div>
              <button
                onClick={() =>
                  onRequestCombo('Pack Creativo IA (ChatGPT Plus + Midjourney)', 'S/ 69.90')
                }
                className="relative overflow-hidden group/btn px-4 py-2 rounded-xl text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm hover:shadow-md transition-all duration-300 active:scale-95 shrink-0 cursor-pointer"
                style={{
                  backgroundColor: settings.colorPrimary || '#4f46e5',
                }}
              >
                <span
                  className="absolute inset-0 w-full h-full transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300 ease-out"
                  style={{
                    background: `linear-gradient(135deg, ${settings.colorAccent || '#06b6d4'} 0%, ${settings.colorPrimary || '#4f46e5'} 100%)`,
                  }}
                />
                <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-20deg] transform -translate-x-full group-hover/btn:translate-x-[260%] transition-transform duration-700 ease-in-out pointer-events-none" />
                <span className="relative z-10 font-black tracking-tight">Comprar Pack</span>
                <ArrowRight className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Combo 2 */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-50/70 via-white to-cyan-50/30 dark:from-slate-900/90 dark:via-slate-850 dark:to-cyan-950/30 border border-cyan-100 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-cyan-300 dark:hover:border-cyan-500 transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-cyan-600 text-white rounded-md">
                  Combo Cine Familiar
                </span>
                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                  Ahorra 25%
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Netflix 4K + Disney+ ESPN</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 mb-3">
                Series, películas exclusivas, universo Marvel y todos los eventos deportivos en vivo.
              </p>
              <ul className="text-[11px] text-slate-600 dark:text-slate-300 space-y-1 mb-4">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Calidad Ultra HD 4K con PIN privado
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Disney+ completo con ESPN deportes
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Garantía y renovación mensual
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-cyan-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 line-through">S/ 35.00</span>
                <p className="text-lg font-black text-cyan-700 dark:text-cyan-400 leading-none">
                  S/ 26.50 <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400">/ mes</span>
                </p>
              </div>
              <button
                onClick={() =>
                  onRequestCombo('Combo Cine (Netflix 4K + Disney+)', 'S/ 26.50')
                }
                className="relative overflow-hidden group/btn px-4 py-2 rounded-xl text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm hover:shadow-md transition-all duration-300 active:scale-95 shrink-0 cursor-pointer bg-cyan-600"
              >
                <span
                  className="absolute inset-0 w-full h-full transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300 ease-out"
                  style={{
                    background: `linear-gradient(135deg, #0284c7 0%, #0891b2 100%)`,
                  }}
                />
                <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-20deg] transform -translate-x-full group-hover/btn:translate-x-[260%] transition-transform duration-700 ease-in-out pointer-events-none" />
                <span className="relative z-10 font-black tracking-tight">Comprar Pack</span>
                <ArrowRight className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Combo 3 */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/70 via-white to-amber-50/30 dark:from-slate-900/90 dark:via-slate-850 dark:to-amber-950/30 border border-amber-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-amber-300 dark:hover:border-amber-500 transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-amber-600 text-white rounded-md">
                  Pack Desarrollador & Pro
                </span>
                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                  Recomendado
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Claude Pro 3.5 + ChatGPT Plus</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 mb-3">
                La potencia de análisis y programación de Claude junto a la versatilidad de OpenAI.
              </p>
              <ul className="text-[11px] text-slate-600 dark:text-slate-300 space-y-1 mb-4">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Código sin errores y alta velocidad
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Modelos Sonnet 3.5 & GPT-4o
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Cuentas privadas de alta duración
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-amber-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 line-through">S/ 82.00</span>
                <p className="text-lg font-black text-amber-700 dark:text-amber-400 leading-none">
                  S/ 68.00 <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400">/ mes</span>
                </p>
              </div>
              <button
                onClick={() =>
                  onRequestCombo('Pack Dev (Claude Pro + ChatGPT Plus)', 'S/ 68.00')
                }
                className="relative overflow-hidden group/btn px-4 py-2 rounded-xl text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm hover:shadow-md transition-all duration-300 active:scale-95 shrink-0 cursor-pointer bg-amber-600"
              >
                <span
                  className="absolute inset-0 w-full h-full transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300 ease-out"
                  style={{
                    background: `linear-gradient(135deg, #d97706 0%, #b45309 100%)`,
                  }}
                />
                <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-20deg] transform -translate-x-full group-hover/btn:translate-x-[260%] transition-transform duration-700 ease-in-out pointer-events-none" />
                <span className="relative z-10 font-black tracking-tight">Comprar Pack</span>
                <ArrowRight className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
