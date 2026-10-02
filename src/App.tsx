import { useState, useEffect } from 'react';
import {
  Grid,
  Bot,
  Film,
  Sparkles,
  SearchX,
  MessageCircle,
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { FeaturedCombos } from './components/FeaturedCombos';
import { PaymentMethods } from './components/PaymentMethods';
import { PurchaseProcess } from './components/PurchaseProcess';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { SocialDock } from './components/SocialDock';
import { BuyModal } from './components/BuyModal';
import { TermsModal } from './components/TermsModal';
import { ClaimsModal } from './components/ClaimsModal';
import { AdminModal } from './components/AdminModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import {
  subscribeToProducts,
  subscribeToSettings,
  subscribeToClaims,
  seedProductsCollection,
  DEFAULT_SETTINGS,
} from './services/storeService';
import { Product, ProductPlan, StoreSettings, Claim } from './types';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_SETTINGS);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter & Search
  const [category, setCategory] = useState<'all' | 'ai' | 'streaming'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<ProductPlan | null>(null);
  const [showTerms, setShowTerms] = useState(false);
  const [showClaims, setShowClaims] = useState(false);
  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Admin session
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem('alixplay_admin_session') === 'true';
  });
  const [adminUsername, setAdminUsername] = useState(() => {
    return sessionStorage.getItem('alixplay_admin_user') || 'admin';
  });

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Theme state with local storage persistence
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('alixplay_theme');
        if (stored === 'dark' || stored === 'light') {
          return stored;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } catch (e) {
        console.error(e);
      }
    }
    return 'light';
  });

  // Apply dark mode class to html element and persist
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    try {
      localStorage.setItem('alixplay_theme', theme);
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  // Sync across tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'alixplay_theme' && (e.newValue === 'light' || e.newValue === 'dark')) {
        setTheme(e.newValue);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === 'dark' ? 'light' : 'dark';
      showToast(nextTheme === 'dark' ? 'Modo Oscuro activado 🌙' : 'Modo Claro activado ☀️');
      return nextTheme;
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Real-time Firestore Subscriptions
  useEffect(() => {
    // 1. Subscribe to products
    const unsubProducts = subscribeToProducts(
      (items) => {
        setProducts(items);
        setLoading(false);
        // Auto-seed if completely empty on initial load
        if (items.length === 0) {
          seedProductsCollection(false).catch(console.error);
        }
      },
      (err) => {
        console.error('Error in products subscription:', err);
        setLoading(false);
      }
    );

    // 2. Subscribe to settings
    const unsubSettings = subscribeToSettings(
      (newSettings) => {
        setSettings(newSettings);
        // Update document title and primary styles dynamically
        document.title = `${newSettings.name}${newSettings.suffix} • ${newSettings.subtitle}`;
        document.documentElement.style.setProperty('--brand-primary', newSettings.colorPrimary);
        document.documentElement.style.setProperty('--brand-accent', newSettings.colorAccent);

        // Calculate dynamic neon glow shadows from hex colors
        const hexToRgba = (hex: string, alpha: number) => {
          const clean = hex.replace('#', '');
          if (clean.length === 6) {
            const r = parseInt(clean.substring(0, 2), 16);
            const g = parseInt(clean.substring(2, 4), 16);
            const b = parseInt(clean.substring(4, 6), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
          }
          return hex;
        };

        document.documentElement.style.setProperty(
          '--brand-primary-glow',
          hexToRgba(newSettings.colorPrimary, 0.38)
        );
        document.documentElement.style.setProperty(
          '--brand-accent-glow',
          hexToRgba(newSettings.colorAccent, 0.38)
        );

        // Update browser favicon dynamically
        let favEl = document.getElementById('dynamic-favicon') as HTMLLinkElement | null;
        if (!favEl) {
          favEl = document.createElement('link');
          favEl.id = 'dynamic-favicon';
          favEl.rel = 'icon';
          document.head.appendChild(favEl);
        }
        if (newSettings.faviconBase64) {
          favEl.href = newSettings.faviconBase64;
        } else {
          favEl.href = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='${encodeURIComponent(
            newSettings.colorPrimary
          )}'><path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/></svg>`;
        }
      },
      (err) => {
        console.error('Error in settings subscription:', err);
      }
    );

    // 3. Subscribe to claims
    const unsubClaims = subscribeToClaims(
      (claimList) => {
        setClaims(claimList);
      },
      (err) => {
        console.error('Error in claims subscription:', err);
      }
    );

    return () => {
      unsubProducts();
      unsubSettings();
      unsubClaims();
    };
  }, []);

  // Keyboard shortcut & hash detection for discreet admin login
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (isAdmin) setShowAdminPanel(true);
        else setShowAdminAuth(true);
      }
    };

    const handleHash = () => {
      if (window.location.hash === '#admin' || window.location.hash === '#panel') {
        if (isAdmin) setShowAdminPanel(true);
        else setShowAdminAuth(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', handleHash);
    handleHash();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleHash);
    };
  }, [isAdmin]);

  // Triple-click on brand logo handler
  let clickCount = 0;
  let clickTimer: NodeJS.Timeout | null = null;
  const handleBrandTripleClick = () => {
    clickCount++;
    if (clickTimer) clearTimeout(clickTimer);
    clickTimer = setTimeout(() => {
      clickCount = 0;
    }, 1200);

    if (clickCount >= 3) {
      clickCount = 0;
      if (isAdmin) setShowAdminPanel(true);
      else setShowAdminAuth(true);
    }
  };

  const handleAdminLoginSuccess = (user: string) => {
    setIsAdmin(true);
    setAdminUsername(user);
    sessionStorage.setItem('alixplay_admin_session', 'true');
    sessionStorage.setItem('alixplay_admin_user', user);
    setShowAdminPanel(true);
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setAdminUsername('');
    sessionStorage.removeItem('alixplay_admin_session');
    sessionStorage.removeItem('alixplay_admin_user');
    setShowAdminPanel(false);
    showToast('Sesión de administrador cerrada. Panel oculto.');
  };

  // Filter products by category and search
  const filteredProducts = products.filter((p) => {
    const matchesCat = category === 'all' || p.category === category;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.tag.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const totalAll = products.length;
  const totalAi = products.filter((p) => p.category === 'ai').length;
  const totalStreaming = products.filter((p) => p.category === 'streaming').length;

  const handleDirectBuyFromCard = (product: Product, plan: ProductPlan) => {
    setSelectedProduct(product);
    setSelectedPlan(plan);
  };

  const openWhatsAppLink = (message: string) => {
    const url = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message)}`;
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRequestCombo = (name: string, price: string) => {
    openWhatsAppLink(`¡Hola ${settings.name}${settings.suffix}! 👋 Quiero ordenar el combo promocional *${name}* (${price}). ¿Tienen disponibilidad inmediata para enviar comprobante?`);
  };

  const handleCustomComboPrompt = () => {
    openWhatsAppLink(`¡Hola ${settings.name}${settings.suffix}! 👋 Quisiera armar un combo personalizado de membresías (IA + Streaming). ¿Qué descuento me pueden ofrecer?`);
  };

  const floatingWaUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    `Hola ${settings.name}${settings.suffix}, deseo consultar por una membresía`
  )}`;

  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#F8FAFC] dark:bg-[#0b0f19] text-[#0F172A] dark:text-slate-100 transition-colors duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-bold border border-slate-700 animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        settings={settings}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isAdmin={isAdmin}
        adminUsername={adminUsername}
        onOpenAdmin={() => setShowAdminPanel(true)}
        onLogoutAdmin={handleAdminLogout}
        onOpenTerms={() => setShowTerms(true)}
        onBrandClick={handleBrandTripleClick}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Hero Section */}
      <Hero settings={settings} />

      {/* Catalog Section */}
      <main id="catalogo" className="pt-3 sm:pt-4 pb-8 bg-slate-50 dark:bg-[#0b0f19] flex-1 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-3">
          {/* Category Filter Bar - Dynamic & Compact */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-1.5 sm:p-2 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-2 transition-colors">
            {/* Filter Tabs (No horizontal scrollbar) */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => setCategory('all')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  category === 'all'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Todos los Productos</span>
                <span
                  className={`ml-0.5 px-1.5 py-0.2 text-[10px] font-bold rounded-md ${
                    category === 'all'
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {totalAll}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setCategory('ai')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  category === 'ai'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Bot className="w-3.5 h-3.5 text-indigo-400" />
                <span>Inteligencia Artificial</span>
                <span
                  className={`ml-0.5 px-1.5 py-0.2 text-[10px] font-bold rounded-md ${
                    category === 'ai'
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {totalAi}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setCategory('streaming')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  category === 'streaming'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Film className="w-3.5 h-3.5 text-cyan-400" />
                <span>Streaming &amp; Series</span>
                <span
                  className={`ml-0.5 px-1.5 py-0.2 text-[10px] font-bold rounded-md ${
                    category === 'streaming'
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {totalStreaming}
                </span>
              </button>
            </div>

            {/* Right Side Status Indicator (Armar Combo removed) */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 px-2 py-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-[11px]">
                {loading ? 'Cargando membresías...' : `${filteredProducts.length} servicios disponibles`}
              </span>
            </div>
          </div>

          {/* Search feedback */}
          {searchQuery && (
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 text-xs text-indigo-800 dark:text-indigo-200 flex items-center justify-between">
              <span>Resultados para: "{searchQuery}"</span>
              <button
                onClick={() => setSearchQuery('')}
                className="font-bold underline text-indigo-600 dark:text-indigo-400 cursor-pointer"
              >
                Ver todo el catálogo
              </button>
            </div>
          )}

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 h-48 animate-pulse flex flex-col justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
                    <div className="space-y-1.5 flex-1">
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                      <div className="h-3 bg-slate-100 dark:bg-slate-850 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="h-8 bg-slate-100 dark:bg-slate-800 rounded" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4">
              {filteredProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  settings={settings}
                  onSelectProduct={handleDirectBuyFromCard}
                />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 mx-auto flex items-center justify-center mb-3">
                <SearchX className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-white">No encontramos resultados para tu búsqueda</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 mb-4">
                Intenta buscar con otro nombre como "ChatGPT", "Netflix", "Canva", o contáctanos por WhatsApp para consultar disponibilidad.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl text-xs shadow-sm cursor-pointer"
              >
                Restablecer Catálogo
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Featured Combos */}
      <FeaturedCombos settings={settings} onRequestCombo={handleRequestCombo} />

      {/* Payment Methods */}
      <PaymentMethods
        settings={settings}
        onOpenPaymentInfo={() => {
          if (products.length > 0) {
            setSelectedProduct(products[0]);
            setSelectedPlan(products[0].plans[0] || null);
          }
        }}
      />

      {/* Purchase Process */}
      <PurchaseProcess settings={settings} />

      {/* FAQ Section */}
      <FaqSection />

      {/* Footer */}
      <Footer
        settings={settings}
        onFilterCategory={(cat) => setCategory(cat as any)}
        onOpenTerms={() => setShowTerms(true)}
        onOpenClaims={() => setShowClaims(true)}
        onOpenAdminAuth={() => {
          if (isAdmin) setShowAdminPanel(true);
          else setShowAdminAuth(true);
        }}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Floating Neon Social Dock */}
      <SocialDock settings={settings} />

      {/* Floating WhatsApp Button (Compact & Discreet) */}
      <a
        href={floatingWaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center group"
        aria-label="Contactar por WhatsApp"
        title="WhatsApp Soporte"
      >
        <MessageCircle className="w-5 h-5 text-white" />

        {/* Discreet online status indicator */}
        <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 border border-slate-900"></span>
        </span>

        {/* Compact Hover Tooltip (doesn't resize or block page content) */}
        <span className="absolute right-12 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-slate-900/95 text-white text-[11px] font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 border border-slate-700/80 shadow-xl hidden sm:flex items-center gap-1.5 group-hover:-translate-x-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>WhatsApp Soporte</span>
        </span>
      </a>

      {/* Modals */}
      {selectedProduct && (
        <BuyModal
          product={selectedProduct}
          plan={selectedPlan}
          settings={settings}
          onClose={() => {
            setSelectedProduct(null);
            setSelectedPlan(null);
          }}
          onToast={showToast}
        />
      )}

      {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}

      {showClaims && (
        <ClaimsModal
          settings={settings}
          onClose={() => setShowClaims(false)}
          onToast={showToast}
        />
      )}

      {showAdminAuth && (
        <AdminAuthModal
          onClose={() => setShowAdminAuth(false)}
          onSuccess={handleAdminLoginSuccess}
          onToast={showToast}
        />
      )}

      {showAdminPanel && (
        <AdminModal
          products={products}
          settings={settings}
          claims={claims}
          adminUsername={adminUsername}
          onClose={() => setShowAdminPanel(false)}
          onLogout={handleAdminLogout}
          onToast={showToast}
        />
      )}
    </div>
  );
}
