'use client';

import React, { useState } from 'react';
import { SiteData, BorderRadiusStyle, ShadowLevelStyle } from '@/lib/types';
import { HARMONIC_PALETTES } from '@/lib/palettes';
import { FONT_PAIRS } from '@/lib/fonts';
import {
  Palette,
  Type,
  Layers,
  Phone,
  BookOpen,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Ribbon,
  Tag,
  Eye,
  EyeOff,
  Search,
  Globe,
  AlertCircle,
  Share2,
  Gift,
  Sliders,
  Download,
  Upload,
  LayoutTemplate,
} from 'lucide-react';

interface SidebarControlsProps {
  site: SiteData;
  onChange: (updatedSite: SiteData) => void;
  onOpenTemplateModal?: () => void;
}

export const SidebarControls: React.FC<SidebarControlsProps> = ({
  site,
  onChange,
  onOpenTemplateModal,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'palette' | 'fonts' | 'style' | 'blocks' | 'welcome' | 'social' | 'whatsapp' | 'seo'>('palette');

  const updateSectionState = (sectionKey: keyof SiteData, enabled: boolean) => {
    const target = site[sectionKey] as any;
    if (target && typeof target === 'object' && 'enabled' in target) {
      onChange({
        ...site,
        [sectionKey]: {
          ...target,
          enabled,
        },
      });
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(site, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `WebLibre-${site.slug}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (imported && imported.slug) {
          onChange(imported);
        }
      } catch (err) {
        alert('Archivo JSON no válido.');
      }
    };
    reader.readAsText(file);
  };

  // SEO Health Score Calculation
  const calculateSeoScore = () => {
    let score = 0;
    const tips: string[] = [];

    if (site.seo.title.length >= 25 && site.seo.title.length <= 65) {
      score += 35;
    } else {
      tips.push('El título SEO debe tener entre 25 y 65 caracteres.');
    }

    if (site.seo.description.length >= 60 && site.seo.description.length <= 160) {
      score += 35;
    } else {
      tips.push('La meta-descripción debe tener entre 60 y 160 caracteres.');
    }

    if (site.seo.keywords.trim().length > 5) {
      score += 15;
    } else {
      tips.push('Agrega palabras clave separadas por comas.');
    }

    if (site.whatsApp.enabled) score += 15;

    return { score, tips };
  };

  const { score: seoScore, tips: seoTips } = calculateSeoScore();

  return (
    <aside
      className={`fixed top-16 right-0 z-30 h-[calc(100vh-64px)] bg-slate-900 border-l border-slate-800 text-white shadow-2xl transition-all duration-300 flex flex-col ${
        isOpen ? 'w-80 sm:w-96' : 'w-12'
      }`}
    >
      {/* Toggle Open/Close Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -left-4 top-6 p-2 rounded-full bg-slate-800 text-emerald-400 border border-slate-700 shadow-xl hover:scale-110 transition-transform"
      >
        {isOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {isOpen ? (
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="font-extrabold text-sm text-white">Panel Anti-Errores</h3>
                <p className="text-[11px] text-slate-400">Personalización guiada en tiempo real</p>
              </div>
            </div>

            {onOpenTemplateModal && (
              <button
                onClick={onOpenTemplateModal}
                className="px-2.5 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold flex items-center gap-1 shadow"
              >
                <LayoutTemplate className="w-3.5 h-3.5" /> Plantillas
              </button>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-950/50 p-1 overflow-x-auto">
            {[
              { id: 'palette', label: 'Colores', icon: Palette },
              { id: 'fonts', label: 'Fuentes', icon: Type },
              { id: 'style', label: 'Estilos', icon: Sliders },
              { id: 'blocks', label: 'Bloques', icon: Layers },
              { id: 'welcome', label: 'Pop-up', icon: Gift },
              { id: 'social', label: 'Redes', icon: Share2 },
              { id: 'whatsapp', label: 'WhatsApp', icon: Phone },
              { id: 'seo', label: 'SEO', icon: Search },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 min-w-[50px] py-2 text-[10px] font-bold rounded-lg flex flex-col items-center gap-1 transition-all ${
                    activeTab === tab.id
                      ? 'bg-slate-800 text-emerald-400 shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Tab 1: Palettes */}
            {activeTab === 'palette' && (
              <div className="space-y-4">
                <div className="text-xs font-bold text-slate-300">
                  16 Paletas Cromáticas Pre-Calculadas:
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  {HARMONIC_PALETTES.map((pal) => (
                    <button
                      key={pal.id}
                      onClick={() => onChange({ ...site, paletteId: pal.id })}
                      className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex items-center justify-between ${
                        site.paletteId === pal.id
                          ? 'border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/50'
                          : 'border-slate-800 bg-slate-800/60 hover:bg-slate-800'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-xs text-white">{pal.name}</div>
                        <div className="flex items-center gap-1.5 mt-2">
                          <span className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: pal.primary }} />
                          <span className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: pal.secondary }} />
                          <span className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: pal.background }} />
                          <span className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: pal.accent }} />
                        </div>
                      </div>
                      {site.paletteId === pal.id && (
                        <span className="text-[11px] font-bold text-emerald-400">Activa</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Typography */}
            {activeTab === 'fonts' && (
              <div className="space-y-4">
                <div className="text-xs font-bold text-slate-300">
                  9 Pares Tipográficos Curados:
                </div>
                <div className="space-y-2.5">
                  {FONT_PAIRS.map((fp) => (
                    <button
                      key={fp.id}
                      onClick={() => onChange({ ...site, fontPairId: fp.id })}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all ${
                        site.fontPairId === fp.id
                          ? 'border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/50'
                          : 'border-slate-800 bg-slate-800/60 hover:bg-slate-800'
                      }`}
                    >
                      <div className="font-extrabold text-xs text-white mb-1">{fp.name}</div>
                      <div className="text-xs font-bold text-slate-200">Título de Ejemplo</div>
                      <div className="text-[11px] text-slate-400">Texto de cuerpo limpio y legible.</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Sliders de Bordes & Sombras + Backup JSON */}
            {activeTab === 'style' && (
              <div className="space-y-6">
                {/* Border Radius Slider */}
                <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-white">Redondez de Bordes (Curvas)</label>
                    <span className="text-xs font-extrabold text-emerald-400 uppercase">
                      {site.borderRadius}
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5 pt-1">
                    {[
                      { id: 'none', label: '0px' },
                      { id: 'sm', label: '6px' },
                      { id: 'md', label: '12px' },
                      { id: 'lg', label: '20px' },
                      { id: 'full', label: 'Full' },
                    ].map((b) => (
                      <button
                        key={b.id}
                        onClick={() => onChange({ ...site, borderRadius: b.id as BorderRadiusStyle })}
                        className={`py-2 rounded-xl text-[10px] font-bold transition-all border ${
                          site.borderRadius === b.id
                            ? 'bg-emerald-500 text-white border-emerald-400 shadow'
                            : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Box Shadow Level Slider */}
                <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-white">Intensidad de Sombras 3D</label>
                    <span className="text-xs font-extrabold text-indigo-400 uppercase">
                      {site.shadowLevel}
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5 pt-1">
                    {[
                      { id: 'none', label: 'Plano' },
                      { id: 'sm', label: 'Suave' },
                      { id: 'md', label: 'Media' },
                      { id: 'lg', label: 'Fuerte' },
                      { id: 'xl', label: '3D XL' },
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => onChange({ ...site, shadowLevel: s.id as ShadowLevelStyle })}
                        className={`py-2 rounded-xl text-[10px] font-bold transition-all border ${
                          site.shadowLevel === s.id
                            ? 'bg-indigo-600 text-white border-indigo-400 shadow'
                            : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Export / Import JSON Backup */}
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
                  <div className="text-xs font-bold text-slate-300">Copia de Seguridad & Migración (JSON):</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleExportJson}
                      className="py-2.5 px-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-600 shadow"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-400" /> Exportar JSON
                    </button>

                    <label className="py-2.5 px-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-600 shadow cursor-pointer">
                      <Upload className="w-3.5 h-3.5 text-indigo-400" /> Importar
                      <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: LEGO Section Blocks & Feature Toggles */}
            {activeTab === 'blocks' && (
              <div className="space-y-4">
                <div className="text-xs font-bold text-slate-300">
                  Estructura del Sitio (Activa/Desactiva Secciones):
                </div>

                <div className="space-y-2.5">
                  {[
                    { key: 'headerRibbon', name: 'Cinta Promocional Superior', icon: Ribbon },
                    { key: 'hero', name: 'Bloque Principal (Hero)', icon: Layers },
                    { key: 'gallery', name: 'Galería de Medios', icon: Layers },
                    { key: 'features', name: 'Beneficios / Servicios', icon: Layers },
                    { key: 'coupon', name: 'Generador de Cupones', icon: Tag },
                    { key: 'footerRibbon', name: 'Cinta Promocional Inferior', icon: Ribbon },
                    { key: 'footer', name: 'Pie de Página', icon: Layers },
                  ].map((sec) => {
                    const secData = (site as any)[sec.key];
                    const isEnabled = secData?.enabled;
                    const Icon = sec.icon;

                    return (
                      <div
                        key={sec.key}
                        className="p-3 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5 text-xs font-bold text-white">
                          <Icon className="w-4 h-4 text-emerald-400" />
                          <span>{sec.name}</span>
                        </div>
                        <button
                          onClick={() => updateSectionState(sec.key as keyof SiteData, !isEnabled)}
                          className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                            isEnabled
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : 'bg-slate-700 text-slate-400'
                          }`}
                        >
                          {isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          <span>{isEnabled ? 'ON' : 'OFF'}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" /> Switch Efecto Libro 3D:
                  </div>
                  <button
                    onClick={() => {
                      const currentFlip = site.gallery.bookFlipEffect;
                      onChange({
                        ...site,
                        gallery: {
                          ...site.gallery,
                          bookFlipEffect: !currentFlip,
                          animation: !currentFlip ? 'book_flip_3d' : 'fade_zoom',
                        },
                      });
                    }}
                    className={`w-full py-2.5 px-4 rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${
                      site.gallery.bookFlipEffect
                        ? 'bg-amber-500 text-white border-amber-600 shadow-md'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    <span>Carrusel Modo Libro 3D</span>
                    <span>{site.gallery.bookFlipEffect ? 'ACTIVADO (ON)' : 'DESACTIVADO (OFF)'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Tab 5: Cartel de Bienvenida Pop-up GIF */}
            {activeTab === 'welcome' && (
              <div className="space-y-4">
                <div className="text-xs font-bold text-slate-300">
                  Cartel Pop-up de Bienvenida con GIF:
                </div>

                <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Gift className="w-4 h-4 text-amber-400" /> Pop-up Activo
                    </span>
                    <input
                      type="checkbox"
                      checked={site.welcomePopup.enabled}
                      onChange={(e) =>
                        onChange({
                          ...site,
                          welcomePopup: { ...site.welcomePopup, enabled: e.target.checked },
                        })
                      }
                      className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      URL del GIF o Imagen Animada:
                    </label>
                    <input
                      type="url"
                      value={site.welcomePopup.gifUrl}
                      onChange={(e) =>
                        onChange({
                          ...site,
                          welcomePopup: { ...site.welcomePopup, gifUrl: e.target.value },
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      Título de Bienvenida:
                    </label>
                    <input
                      type="text"
                      value={site.welcomePopup.title}
                      onChange={(e) =>
                        onChange({
                          ...site,
                          welcomePopup: { ...site.welcomePopup, title: e.target.value },
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      Mensaje Promocional:
                    </label>
                    <textarea
                      rows={3}
                      value={site.welcomePopup.message}
                      onChange={(e) =>
                        onChange({
                          ...site,
                          welcomePopup: { ...site.welcomePopup, message: e.target.value },
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      Texto del Botón CTA:
                    </label>
                    <input
                      type="text"
                      value={site.welcomePopup.buttonText}
                      onChange={(e) =>
                        onChange({
                          ...site,
                          welcomePopup: { ...site.welcomePopup, buttonText: e.target.value },
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tab 6: Redes Sociales */}
            {activeTab === 'social' && (
              <div className="space-y-4">
                <div className="text-xs font-bold text-slate-300">
                  Enlaces a Redes Sociales:
                </div>

                <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <span className="text-xs font-bold text-white">Mostrar Redes</span>
                    <input
                      type="checkbox"
                      checked={site.socialLinks.enabled}
                      onChange={(e) =>
                        onChange({
                          ...site,
                          socialLinks: { ...site.socialLinks, enabled: e.target.checked },
                        })
                      }
                      className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    {[
                      { key: 'instagram', label: 'Instagram URL' },
                      { key: 'facebook', label: 'Facebook URL' },
                      { key: 'tiktok', label: 'TikTok URL' },
                      { key: 'twitter', label: 'Twitter / X URL' },
                      { key: 'linkedin', label: 'LinkedIn URL' },
                      { key: 'youtube', label: 'YouTube URL' },
                    ].map((s) => (
                      <div key={s.key}>
                        <label className="text-[10px] text-slate-400 block mb-1 font-bold">{s.label}</label>
                        <input
                          type="url"
                          placeholder="https://..."
                          value={(site.socialLinks as any)[s.key] || ''}
                          onChange={(e) =>
                            onChange({
                              ...site,
                              socialLinks: { ...site.socialLinks, [s.key]: e.target.value },
                            })
                          }
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 7: Direct WhatsApp Contact Bubble */}
            {activeTab === 'whatsapp' && (
              <div className="space-y-4">
                <div className="text-xs font-bold text-slate-300">
                  Configuración de Burbuja Directa:
                </div>

                <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Burbuja Activa</span>
                    <input
                      type="checkbox"
                      checked={site.whatsApp.enabled}
                      onChange={(e) =>
                        onChange({
                          ...site,
                          whatsApp: { ...site.whatsApp, enabled: e.target.checked },
                        })
                      }
                      className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      Número Celular (con código de país):
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: 5491122334455"
                      value={site.whatsApp.phoneNumber}
                      onChange={(e) =>
                        onChange({
                          ...site,
                          whatsApp: { ...site.whatsApp, phoneNumber: e.target.value },
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      Texto del Botón Flotante:
                    </label>
                    <input
                      type="text"
                      value={site.whatsApp.buttonText}
                      onChange={(e) =>
                        onChange({
                          ...site,
                          whatsApp: { ...site.whatsApp, buttonText: e.target.value },
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      Posición en Pantalla:
                    </label>
                    <select
                      value={site.whatsApp.position}
                      onChange={(e) =>
                        onChange({
                          ...site,
                          whatsApp: { ...site.whatsApp, position: e.target.value as any },
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      <option value="bottom-right">Abajo a la Derecha</option>
                      <option value="bottom-left">Abajo a la Izquierda</option>
                      <option value="bottom-center">Abajo al Centro</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 8: SEO & Google Snippet Live Preview */}
            {activeTab === 'seo' && (
              <div className="space-y-5">
                <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-emerald-400" /> Score SEO Anti-Errores
                    </span>
                    <span
                      className={`text-sm font-black px-2.5 py-0.5 rounded-full ${
                        seoScore >= 80
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : seoScore >= 50
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-rose-500/20 text-rose-400'
                      }`}
                    >
                      {seoScore}%
                    </span>
                  </div>

                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        seoScore >= 80 ? 'bg-emerald-500' : seoScore >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${seoScore}%` }}
                    />
                  </div>

                  {seoTips.length > 0 && (
                    <div className="pt-2 space-y-1">
                      {seoTips.map((tip, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] text-amber-400">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-300">
                    Previsualización en Google (Resultados de Búsqueda):
                  </div>
                  <div className="p-4 rounded-2xl bg-white text-slate-900 space-y-1 shadow-md border border-slate-200">
                    <div className="text-xs text-slate-600 truncate flex items-center gap-1">
                      <span className="w-3.5 h-3.5 rounded-full bg-slate-200 flex items-center justify-center text-[8px] font-bold">
                        G
                      </span>
                      https://weblibre.app/p/{site.slug}
                    </div>
                    <div className="text-sm font-semibold text-blue-800 hover:underline cursor-pointer truncate">
                      {site.seo.title || site.title}
                    </div>
                    <div className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {site.seo.description || 'Escribe una descripción atractiva para buscadores...'}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">
                      Título SEO (Meta Title):
                    </label>
                    <input
                      type="text"
                      value={site.seo.title}
                      onChange={(e) =>
                        onChange({
                          ...site,
                          seo: { ...site.seo, title: e.target.value },
                        })
                      }
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">
                      Descripción SEO (Meta Description):
                    </label>
                    <textarea
                      rows={3}
                      value={site.seo.description}
                      onChange={(e) =>
                        onChange({
                          ...site,
                          seo: { ...site.seo, description: e.target.value },
                        })
                      }
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">
                      Palabras Clave (Keywords):
                    </label>
                    <input
                      type="text"
                      value={site.seo.keywords}
                      onChange={(e) =>
                        onChange({
                          ...site,
                          seo: { ...site.seo, keywords: e.target.value },
                        })
                      }
                      placeholder="ej: restaurante, comida gourmet, ofertas"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center py-6 gap-6">
          <Palette className="w-5 h-5 text-emerald-400" />
          <Type className="w-5 h-5 text-slate-400" />
          <Sliders className="w-5 h-5 text-slate-400" />
          <Layers className="w-5 h-5 text-slate-400" />
          <Gift className="w-5 h-5 text-slate-400" />
          <Share2 className="w-5 h-5 text-slate-400" />
          <Phone className="w-5 h-5 text-slate-400" />
          <Search className="w-5 h-5 text-slate-400" />
        </div>
      )}
    </aside>
  );
};
