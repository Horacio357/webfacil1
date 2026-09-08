export type SectionType = 
  | 'header_ribbon'
  | 'hero'
  | 'gallery'
  | 'features'
  | 'coupon'
  | 'footer_ribbon'
  | 'footer';

export type GalleryAnimationType = 
  | 'fade_zoom'
  | 'slide_cascade'
  | 'card_tilt_3d'
  | 'parallax_float'
  | 'book_flip_3d'
  | 'card_flip_180';

export type CouponDesignType = 'ticket' | 'neumorphic' | 'minimal_banner';

export type WhatsAppPositionType = 'bottom-right' | 'bottom-left' | 'bottom-center';

export type BorderRadiusStyle = 'none' | 'sm' | 'md' | 'lg' | 'full';
export type ShadowLevelStyle = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  caption?: string;
  backTitle?: string;
  backDescription?: string;
  tag?: string;
}

export interface SiteColors {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  background: string;
  cardBg: string;
  text: string;
  textMuted: string;
  accent: string;
}

export interface FontPair {
  id: string;
  name: string;
  headingFont: string;
  bodyFont: string;
  googleFontsImport?: string;
}

export interface HeroSectionData {
  enabled: boolean;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  badgeText: string;
}

export interface GallerySectionData {
  enabled: boolean;
  title: string;
  subtitle: string;
  animation: GalleryAnimationType;
  bookFlipEffect: boolean;
  items: GalleryItem[];
}

export interface FeaturesSectionData {
  enabled: boolean;
  title: string;
  subtitle: string;
  items: {
    id: string;
    iconName: string;
    title: string;
    description: string;
  }[];
}

export interface CouponSectionData {
  enabled: boolean;
  design: CouponDesignType;
  badge: string;
  code: string;
  discount: string;
  description: string;
  terms: string;
  expiryText: string;
  ctaText: string;
}

export interface PromoRibbonData {
  enabled: boolean;
  text: string;
  speed: 'slow' | 'medium' | 'fast';
  bgColor: string;
  textColor: string;
  badgeText?: string;
}

export interface WhatsAppBubbleData {
  enabled: boolean;
  phoneNumber: string;
  message: string;
  position: WhatsAppPositionType;
  buttonText: string;
}

export interface SocialLinksData {
  enabled: boolean;
  showInHeader: boolean;
  showInFooter: boolean;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
}

export interface WelcomePopupData {
  enabled: boolean;
  title: string;
  message: string;
  gifUrl: string;
  buttonText: string;
  buttonLink: string;
  badgeText: string;
}

export interface FooterSectionData {
  enabled: boolean;
  brandName: string;
  description: string;
  copyrightText: string;
  links: { label: string; url: string }[];
}

export interface SeoData {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  allowIndexing: boolean;
}

export interface SiteData {
  id: string;
  title: string;
  slug: string;
  paletteId: string;
  fontPairId: string;
  borderRadius: BorderRadiusStyle;
  shadowLevel: ShadowLevelStyle;
  seo: SeoData;
  headerRibbon: PromoRibbonData;
  hero: HeroSectionData;
  gallery: GallerySectionData;
  features: FeaturesSectionData;
  coupon: CouponSectionData;
  footerRibbon: PromoRibbonData;
  whatsApp: WhatsAppBubbleData;
  socialLinks: SocialLinksData;
  welcomePopup: WelcomePopupData;
  footer: FooterSectionData;
  updatedAt: string;
}

export type ViewportDevice = 'desktop' | 'tablet' | 'mobile';
export type AppMode = 'admin' | 'view';
