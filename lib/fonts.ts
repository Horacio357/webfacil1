import { FontPair } from './types';

export const FONT_PAIRS: FontPair[] = [
  {
    id: 'modern-sans',
    name: '1. Moderna & Limpia (Inter + System)',
    headingFont: 'font-sans font-extrabold tracking-tight',
    bodyFont: 'font-sans font-normal',
  },
  {
    id: 'elegant-serif',
    name: '2. Elegante & Editorial (Serif + Sans)',
    headingFont: 'font-serif font-bold tracking-normal',
    bodyFont: 'font-sans font-normal',
  },
  {
    id: 'impact-bold',
    name: '3. Impacto & Comercio (Mono / Heavy)',
    headingFont: 'font-mono font-black uppercase tracking-wide',
    bodyFont: 'font-sans font-normal',
  },
  {
    id: 'creative-soft',
    name: '4. Creativa & Amigable (Rounded)',
    headingFont: 'font-sans font-bold tracking-tight rounded-lg',
    bodyFont: 'font-sans font-medium',
  },
  {
    id: 'futuristic-display',
    name: '5. 🔮 Futurista Display (Wide Tech)',
    headingFont: 'font-sans font-black tracking-widest uppercase',
    bodyFont: 'font-sans font-normal',
  },
  {
    id: 'handwritten-craft',
    name: '6. ✍️ Manuscrito & Artesanal',
    headingFont: 'font-serif italic font-extrabold tracking-wide',
    bodyFont: 'font-sans font-normal',
  },
  {
    id: 'geometric-pro',
    name: '7. 📐 Geométrica Pro (Corporate)',
    headingFont: 'font-sans font-black tracking-tighter',
    bodyFont: 'font-sans font-medium',
  },
  {
    id: 'vintage-retro',
    name: '8. 📜 Vintage Retro (Classic)',
    headingFont: 'font-serif font-extrabold tracking-normal uppercase',
    bodyFont: 'font-serif font-normal',
  },
  {
    id: 'scandinavian-minimal',
    name: '9. 🌿 Escandinava Minimal (Ultra Clean)',
    headingFont: 'font-sans font-semibold tracking-tight',
    bodyFont: 'font-sans font-light',
  },
];

export function getFontPair(id: string): FontPair {
  return FONT_PAIRS.find((f) => f.id === id) || FONT_PAIRS[0];
}
