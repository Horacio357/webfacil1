import { SiteData } from './types';

export const DEFAULT_SITE: SiteData = {
  id: 'site-demo-1',
  title: 'Mi Negocio Increíble',
  slug: 'minegocio',
  paletteId: 'emerald-luxe',
  fontPairId: 'modern-sans',
  borderRadius: 'lg',
  shadowLevel: 'md',
  seo: {
    title: 'Mi Negocio Increíble — Servicios Profesionales',
    description: 'Transforma tu presencia digital. Descubre nuestros productos y servicios con la mejor atención personalizada.',
    keywords: 'landing page, saas, servicios, promociones, whatsapp',
    ogImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    allowIndexing: true,
  },
  headerRibbon: {
    enabled: true,
    text: '🚀 ¡OFERTA ESPECIAL! 20% DE DESCUENTO EN TU PRIMERA COMPRA — CÓDIGO: BIENVENIDO20',
    speed: 'medium',
    bgColor: '#059669',
    textColor: '#FFFFFF',
    badgeText: 'NUEVO',
  },
  hero: {
    enabled: true,
    title: 'Transforma tu Presencia Digital en Minutos',
    subtitle: 'La forma más rápida y estética de lanzar tu landing page profesional sin depender de programadores.',
    ctaText: 'Reclamar Mi Oferta',
    ctaLink: '#coupon-section',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    badgeText: '✨ 100% Anti-Errores',
  },
  gallery: {
    enabled: true,
    title: 'Galería de Experiencias',
    subtitle: 'Explora nuestros productos y servicios destacados con animaciones profesionales',
    animation: 'book_flip_3d',
    bookFlipEffect: true,
    items: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        title: 'Diseño Inteligente',
        caption: 'Interface rápida e intuitiva para cualquier rubro',
        backTitle: 'Detalles de Diseño',
        backDescription: 'Construcción modular estilo LEGO que garantiza estética perfecta sin errores.',
        tag: 'DESTACADO',
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
        title: 'Atención al Cliente',
        caption: 'Conexión directa por WhatsApp en 1 solo paso',
        backTitle: 'Contacto Inmediato',
        backDescription: 'Redirección instantánea a tu WhatsApp sin intermediarios ni webhooks.',
        tag: 'DIRECTO',
      },
      {
        id: '3',
        url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
        title: 'Cupones de Descuento',
        caption: 'Cupones promocionales listos para convertir',
        backTitle: 'Herramienta de Marketing',
        backDescription: 'Elige entre 3 modelos de cupones con código y temporizador.',
        tag: 'OFERTA',
      },
      {
        id: '4',
        url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
        title: 'Resultados Rápidos',
        caption: 'Publica tu sitio institucional en minutos',
        backTitle: 'Listo para Vercel',
        backDescription: 'Velocidad ultra-rápida de carga y optimización automática para buscadores.',
        tag: 'PRO',
      }
    ],
  },
  features: {
    enabled: true,
    title: '¿Por qué elegirnos?',
    subtitle: 'Diseñado meticulosamente para eliminar cualquier fricción tecnológica',
    items: [
      {
        id: 'f1',
        iconName: 'Zap',
        title: 'Simplicidad Absoluta',
        description: 'Construye apilando bloques estilo LEGO. Sin código ni paneles confusos.',
      },
      {
        id: 'f2',
        iconName: 'Smartphone',
        title: 'Perfecto en Todos los Dispositivos',
        description: 'Visualiza exactamente cómo se verá tu página en Móviles, Tablets y PC.',
      },
      {
        id: 'f3',
        iconName: 'Sparkles',
        title: 'Animaciones de Alto Nivel',
        description: '5 efectos visuales únicos, incluyendo carrusel con efecto Libro 3D.',
      },
      {
        id: 'f4',
        iconName: 'MessageCircle',
        title: 'WhatsApp Directo',
        description: 'Tus clientes te contactan directamente a tu celular sin intermediarios.',
      },
    ],
  },
  coupon: {
    enabled: true,
    design: 'ticket',
    badge: '🔥 PROMOCIÓN LIMITADA',
    code: 'EXCLUSIVO2026',
    discount: '30% OFF',
    description: 'Aprovecha este cupón especial en cualquiera de nuestros servicios principales.',
    terms: 'Válido para nuevos clientes. Aplican términos y condiciones.',
    expiryText: '⏳ Vence en 48hs',
    ctaText: 'Usar Cupón por WhatsApp',
  },
  footerRibbon: {
    enabled: true,
    text: '⚡ ¡Garantía de Satisfacción Total! — Contacta ahora y recibe asesoría personalizada.',
    speed: 'medium',
    bgColor: '#047857',
    textColor: '#FFFFFF',
    badgeText: 'INFO',
  },
  whatsApp: {
    enabled: true,
    phoneNumber: '5491122334455',
    message: '¡Hola! Vi la promoción en la página web y me gustaría obtener más información.',
    position: 'bottom-right',
    buttonText: '¿Hablámos por WhatsApp?',
  },
  socialLinks: {
    enabled: true,
    showInHeader: true,
    showInFooter: true,
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    tiktok: 'https://tiktok.com',
    twitter: 'https://x.com',
    linkedin: 'https://linkedin.com',
    youtube: 'https://youtube.com',
  },
  welcomePopup: {
    enabled: true,
    badgeText: '🎁 REGALO DE BIENVENIDA',
    title: '¡Bienvenido a Nuestra Plataforma!',
    message: 'Obtén un 20% de descuento exclusivo en tu primer pedido utilizando el código promocional al contactarnos.',
    gifUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3k1cWdsaDBvdW9vZmRhYmxreXRzcnNmOHI2aWRmdWNqZHNrY2ZsOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26ufdipQqU2lhNA4g/giphy.gif',
    buttonText: '¡Reclamar Descuento Ahora!',
    buttonLink: '#coupon-section',
  },
  footer: {
    enabled: true,
    brandName: 'WebLibre SaaS',
    description: 'La plataforma que permite a emprendedores crear su presencia digital profesional en minutos.',
    copyrightText: '© 2026 WebLibre. Todos los derechos reservados.',
    links: [
      { label: 'Inicio', url: '#' },
      { label: 'Servicios', url: '#' },
      { label: 'Cupones', url: '#coupon-section' },
      { label: 'Contacto', url: '#whatsapp' },
    ],
  },
  updatedAt: new Date().toISOString(),
};

// Preset Templates
export const PRESET_TEMPLATES: { name: string; category: string; description: string; site: Partial<SiteData> }[] = [
  {
    name: '🍽️ Gastronomía & Café Gourmet',
    category: 'Restauración',
    description: 'Paleta terracota cálida con carrusel libro 3D para menús y cupones de descuento.',
    site: {
      paletteId: 'terracotta-warm',
      fontPairId: 'vintage-retro',
      borderRadius: 'lg',
      shadowLevel: 'lg',
      hero: {
        enabled: true,
        title: 'Sabor Auténtico & Experiencia Gourmet',
        subtitle: 'Platos de autor preparados con ingredientes frescos cada mañana. Haz tu reserva o pedido rápido.',
        ctaText: 'Ver Menú & Descuentos',
        ctaLink: '#coupon-section',
        imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
        badgeText: '☕ CAFÉ & BISTRO',
      },
    },
  },
  {
    name: '🎨 Estudio & Agencia Creativa',
    category: 'Diseño',
    description: 'Paleta cyber violeta futurista con giro de tarjeta 180° para portafolio de proyectos.',
    site: {
      paletteId: 'cyber-violet',
      fontPairId: 'futuristic-display',
      borderRadius: 'full',
      shadowLevel: 'xl',
      hero: {
        enabled: true,
        title: 'Diseño Estratégico para Marcas Audaces',
        subtitle: 'Construimos identidades visuales y experiencias digitales de alto impacto.',
        ctaText: 'Iniciar Proyecto',
        ctaLink: '#coupon-section',
        imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        badgeText: '⚡ CREATIVE STUDIO',
      },
      gallery: {
        enabled: true,
        title: 'Portafolio de Trabajo',
        subtitle: 'Voltea las tarjetas para ver los detalles de cada caso de éxito',
        animation: 'card_flip_180',
        bookFlipEffect: false,
        items: [
          {
            id: '1',
            url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
            title: 'Branding Digital',
            caption: 'Rediseño de marca y sistema de diseño',
            backTitle: 'Caso Branding',
            backDescription: 'Incremento del 140% en conversión tras el lanzamiento.',
            tag: 'BRANDING',
          },
        ],
      },
    },
  },
  {
    name: '🩺 Salud, Estética & Consultorio',
    category: 'Bienestar',
    description: 'Paleta esmeralda vital ultra-limpia con tipografía geométrica pro.',
    site: {
      paletteId: 'emerald-luxe',
      fontPairId: 'geometric-pro',
      borderRadius: 'md',
      shadowLevel: 'sm',
      hero: {
        enabled: true,
        title: 'Tu Salud y Bienestar en Manos de Expertos',
        subtitle: 'Atención médica y tratamientos estéticos personalizados con la más alta tecnología.',
        ctaText: 'Agendar Cita por WhatsApp',
        ctaLink: '#whatsapp',
        imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80',
        badgeText: '🌿 CENTRO DE SALUD',
      },
    },
  },
];

const STORAGE_KEY = 'weblibre_sites_db_v1';

export function getStoredSites(): SiteData[] {
  if (typeof window === 'undefined') return [DEFAULT_SITE];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([DEFAULT_SITE]));
      return [DEFAULT_SITE];
    }
    const parsed = JSON.parse(data);
    return parsed.map((s: SiteData) => ({
      ...s,
      borderRadius: s.borderRadius || DEFAULT_SITE.borderRadius,
      shadowLevel: s.shadowLevel || DEFAULT_SITE.shadowLevel,
      seo: s.seo || DEFAULT_SITE.seo,
      socialLinks: s.socialLinks || DEFAULT_SITE.socialLinks,
      welcomePopup: s.welcomePopup || DEFAULT_SITE.welcomePopup,
    }));
  } catch (e) {
    console.error('Error reading localStorage:', e);
    return [DEFAULT_SITE];
  }
}

export function saveSiteToStorage(site: SiteData): SiteData {
  if (typeof window === 'undefined') return site;
  const sites = getStoredSites();
  const index = sites.findIndex((s) => s.id === site.id || s.slug === site.slug);
  const updatedSite = { ...site, updatedAt: new Date().toISOString() };
  
  if (index >= 0) {
    sites[index] = updatedSite;
  } else {
    sites.push(updatedSite);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(sites));
  return updatedSite;
}

export function getSiteBySlugOrId(identifier: string): SiteData {
  const sites = getStoredSites();
  const found = sites.find((s) => s.id === identifier || s.slug === identifier);
  if (!found) return DEFAULT_SITE;
  return {
    ...found,
    borderRadius: found.borderRadius || DEFAULT_SITE.borderRadius,
    shadowLevel: found.shadowLevel || DEFAULT_SITE.shadowLevel,
    seo: found.seo || DEFAULT_SITE.seo,
    socialLinks: found.socialLinks || DEFAULT_SITE.socialLinks,
    welcomePopup: found.welcomePopup || DEFAULT_SITE.welcomePopup,
  };
}
