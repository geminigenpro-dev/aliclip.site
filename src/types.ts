export interface ProductPlan {
  name: string;
  price: string;
  desc?: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'ai' | 'streaming' | 'utility';
  tag: string;
  desc: string;
  imageUrl?: string;
  icon?: string;
  available: boolean;
  selectedPlanIndex?: number;
  plans: ProductPlan[];
  order?: number;
  updatedAt?: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  badge?: string;
  accountNumber: string;
  accountHolder?: string;
  instructions?: string;
  logoUrl?: string; // custom uploaded logo or direct URL
  icon?: string; // fallback icon identifier: 'smartphone', 'wallet', 'credit-card', 'coins', 'bank'
  color: string; // hex color for neon glow highlight (e.g. #8b5cf6, #06b6d4, #f59e0b)
  enabled: boolean;
  order?: number;
}

export interface StoreSettings {
  name: string;
  suffix: string;
  subtitle: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  announcement: string;
  colorPrimary: string;
  colorAccent: string;
  creatorUrl: string;
  creatorHandle: string;
  brandFont?: string;
  brandFontWeight?: string;
  brandLetterSpacing?: string;
  brandTextTransform?: 'normal' | 'uppercase' | 'capitalize';
  brandLogoShape?: 'rounded' | 'square' | 'circle';
  brandLogoGlow?: boolean;
  brandIconName?: string;
  tiktokUrl?: string;
  instagramUrl?: string;
  telegramUrl?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  twitterUrl?: string;
  showTiktok?: boolean;
  showInstagram?: boolean;
  showTelegram?: boolean;
  showFacebook?: boolean;
  showYoutube?: boolean;
  showTwitter?: boolean;
  logoBase64?: string;
  faviconBase64?: string;
  paymentMethods?: PaymentMethod[];
  updatedAt?: string;
}

export interface Claim {
  id: string;
  code: string;
  name: string;
  document: string;
  phone: string;
  email: string;
  typeGood: string;
  service: string;
  category: 'Reclamo' | 'Queja';
  description: string;
  request: string;
  createdAt: string;
  status: 'pending' | 'in_review' | 'resolved';
}
