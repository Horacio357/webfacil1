'use client';

import React, { useState } from 'react';
import { GallerySectionData, SiteColors, FontPair, AppMode, GalleryAnimationType } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sparkles, ChevronLeft, ChevronRight, Image as ImageIcon, RotateCw, ExternalLink, Tag } from 'lucide-react';

interface GalleryBlockProps {
  data: GallerySectionData;
  colors: SiteColors;
  fonts: FontPair;
  mode: AppMode;
  onChange?: (data: GallerySectionData) => void;
  onOpenMediaModal?: (index: number) => void;
}

export const GalleryBlock: React.FC<GalleryBlockProps> = ({
  data,
  colors,
  fonts,
  mode,
  onChange,
  onOpenMediaModal,
}) => {
  if (!data.enabled) return null;

  const [activeBookIndex, setActiveBookIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const updateTitle = (val: string) => {
    if (mode === 'admin' && onChange) {
      onChange({ ...data, title: val });
    }
  };

  const updateSubtitle = (val: string) => {
    if (mode === 'admin' && onChange) {
      onChange({ ...data, subtitle: val });
    }
  };

  const updateItem = (index: number, field: string, val: string) => {
    if (mode === 'admin' && onChange) {
      const updatedItems = [...data.items];
      updatedItems[index] = { ...updatedItems[index], [field]: val };
      onChange({ ...data, items: updatedItems });
    }
  };

  const handleAnimationChange = (anim: GalleryAnimationType) => {
    if (mode === 'admin' && onChange) {
      onChange({
        ...data,
        animation: anim,
        bookFlipEffect: anim === 'book_flip_3d',
      });
    }
  };

  const toggleBookEffect = () => {
    if (mode === 'admin' && onChange) {
      const nextFlipState = !data.bookFlipEffect;
      onChange({
        ...data,
        bookFlipEffect: nextFlipState,
        animation: nextFlipState ? 'book_flip_3d' : 'fade_zoom',
      });
    }
  };

  const toggleCardFlip = (id: string) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Rendering Book 3D Realistic Paper Page Flip View
  const renderBookFlip3D = () => {
    const total = data.items.length;
    if (total === 0) return null;
    const currentItem = data.items[activeBookIndex];

    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="perspective-1000 flex justify-center">
          <motion.div
            key={activeBookIndex}
            initial={{ rotateY: -90, opacity: 0.2, transformOrigin: 'left center' }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            className="w-full max-w-2xl bg-white rounded-r-3xl rounded-l-md overflow-hidden book-shadow border-y border-r border-slate-200 relative preserve-3d"
            style={{ backgroundColor: colors.cardBg }}
          >
            {/* Book Spine Gradient Shadow */}
            <div className="book-spine" />

            <div className="p-6 sm:p-8 pl-10 flex flex-col sm:flex-row gap-8 items-center relative">
              <div className="w-full sm:w-1/2 aspect-square rounded-2xl overflow-hidden relative group shadow-inner bg-slate-100">
                <img
                  src={currentItem.url}
                  alt={currentItem.title}
                  className="w-full h-full object-cover"
                />
                {mode === 'admin' && (
                  <button
                    onClick={() => onOpenMediaModal && onOpenMediaModal(activeBookIndex)}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-semibold gap-1.5"
                  >
                    <ImageIcon className="w-4 h-4" /> Cambiar Imagen
                  </button>
                )}
              </div>

              <div className="w-full sm:w-1/2 space-y-4 text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20">
                  <BookOpen className="w-3.5 h-3.5" />
                  Página {activeBookIndex + 1} de {total}
                </div>

                <h3
                  className={`text-2xl font-black ${fonts.headingFont}`}
                  style={{ color: colors.text }}
                >
                  <span
                    contentEditable={mode === 'admin'}
                    suppressContentEditableWarning
                    onBlur={(e) => updateItem(activeBookIndex, 'title', e.currentTarget.textContent || '')}
                  >
                    {currentItem.title}
                  </span>
                </h3>

                <p
                  className={`text-sm ${fonts.bodyFont} leading-relaxed`}
                  style={{ color: colors.textMuted }}
                >
                  <span
                    contentEditable={mode === 'admin'}
                    suppressContentEditableWarning
                    onBlur={(e) => updateItem(activeBookIndex, 'caption', e.currentTarget.textContent || '')}
                  >
                    {currentItem.caption || 'Descripción detallada del producto o servicio...'}
                  </span>
                </p>

                {currentItem.tag && (
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {currentItem.tag}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Book Page Turner Controls */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={() => setActiveBookIndex((prev) => (prev > 0 ? prev - 1 : total - 1))}
            className="p-3.5 rounded-2xl bg-white shadow-lg border hover:scale-105 active:scale-95 transition-all flex items-center gap-2 font-bold text-xs"
            style={{ color: colors.text }}
          >
            <ChevronLeft className="w-4 h-4" /> Anterior
          </button>

          <span className="text-xs font-extrabold text-slate-500 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
            📖 {activeBookIndex + 1} / {total}
          </span>

          <button
            onClick={() => setActiveBookIndex((prev) => (prev < total - 1 ? prev + 1 : 0))}
            className="p-3.5 rounded-2xl bg-white shadow-lg border hover:scale-105 active:scale-95 transition-all flex items-center gap-2 font-bold text-xs"
            style={{ color: colors.text }}
          >
            Siguiente <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <section
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-b border-black/5"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Title Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2
            className={`text-3xl sm:text-4xl ${fonts.headingFont}`}
            style={{ color: colors.text }}
          >
            <span
              contentEditable={mode === 'admin'}
              suppressContentEditableWarning
              onBlur={(e) => updateTitle(e.currentTarget.textContent || '')}
            >
              {data.title}
            </span>
          </h2>
          <p
            className={`text-base sm:text-lg ${fonts.bodyFont}`}
            style={{ color: colors.textMuted }}
          >
            <span
              contentEditable={mode === 'admin'}
              suppressContentEditableWarning
              onBlur={(e) => updateSubtitle(e.currentTarget.textContent || '')}
            >
              {data.subtitle}
            </span>
          </p>

          {/* Admin Toolbar for 5 Animations + 180° Card Flip */}
          {mode === 'admin' && (
            <div className="inline-flex flex-wrap items-center justify-center gap-2 p-2.5 rounded-2xl bg-white shadow-lg border border-slate-200 text-xs">
              <span className="font-bold text-slate-700 px-2 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Animación:
              </span>
              {[
                { id: 'fade_zoom', label: '1. Fade & Zoom' },
                { id: 'slide_cascade', label: '2. Slide Cascading' },
                { id: 'card_tilt_3d', label: '3. Card Tilt 3D' },
                { id: 'card_flip_180', label: '🎴 4. Giro Tarjeta 180°' },
                { id: 'parallax_float', label: '5. Parallax Float' },
                { id: 'book_flip_3d', label: '📖 6. Efecto Libro 3D' },
              ].map((anim) => (
                <button
                  key={anim.id}
                  onClick={() => handleAnimationChange(anim.id as GalleryAnimationType)}
                  className={`px-3 py-1.5 rounded-xl transition-all font-semibold ${
                    data.animation === anim.id
                      ? 'bg-indigo-600 text-white shadow'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {anim.label}
                </button>
              ))}

              <button
                onClick={toggleBookEffect}
                className={`ml-2 px-3 py-1.5 rounded-xl border flex items-center gap-1.5 font-bold transition-all ${
                  data.bookFlipEffect
                    ? 'bg-amber-500 text-white border-amber-600'
                    : 'bg-slate-50 text-slate-600 border-slate-300'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Modo Libro: {data.bookFlipEffect ? 'ON' : 'OFF'}
              </button>
            </div>
          )}
        </div>

        {/* Gallery Content */}
        {data.bookFlipEffect || data.animation === 'book_flip_3d' ? (
          renderBookFlip3D()
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.items.map((item, idx) => {
              const isFlipped = flippedCards[item.id];

              // Card Flip 180 Render
              if (data.animation === 'card_flip_180') {
                return (
                  <div key={item.id} className="perspective-1000 h-80 w-full group">
                    <motion.div
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="w-full h-full relative preserve-3d cursor-pointer rounded-2xl shadow-xl border border-slate-200"
                      onClick={() => toggleCardFlip(item.id)}
                    >
                      {/* FRONT OF CARD */}
                      <div
                        className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden flex flex-col justify-between p-4 bg-cover bg-center backface-hidden"
                        style={{
                          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.85), transparent), url(${item.url})`,
                        }}
                      >
                        <div className="flex items-center justify-between">
                          {item.tag && (
                            <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-extrabold text-white uppercase tracking-wider">
                              {item.tag}
                            </span>
                          )}
                          <div className="p-1.5 rounded-full bg-black/40 text-white backdrop-blur-md">
                            <RotateCw className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        <div className="space-y-1 text-white text-left">
                          <h4 className={`text-lg font-bold ${fonts.headingFont}`}>{item.title}</h4>
                          <p className="text-xs text-white/80 line-clamp-2">{item.caption}</p>
                          <span className="text-[10px] text-amber-300 font-bold block pt-1">
                            👆 Clic para voltear tarjeta
                          </span>
                        </div>
                      </div>

                      {/* BACK OF CARD (180 Flip) */}
                      <div
                        className="absolute inset-0 w-full h-full rounded-2xl p-6 flex flex-col justify-between bg-slate-900 text-white transform rotateY-180 backface-hidden border-2 border-indigo-500"
                        style={{ backgroundColor: colors.cardBg, color: colors.text }}
                      >
                        <div className="space-y-3 text-left">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
                              Detalles
                            </span>
                            <div className="p-1 rounded-full bg-slate-100 text-slate-600">
                              <RotateCw className="w-3.5 h-3.5" />
                            </div>
                          </div>
                          <h4 className={`text-lg font-bold ${fonts.headingFont}`}>{item.backTitle || item.title}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            {item.backDescription || item.caption || 'Información completa del producto.'}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[11px] font-bold text-indigo-600">¡Consultar Oferta!</span>
                          <a
                            href="#coupon-section"
                            className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center gap-1 shadow"
                          >
                            Ver Más <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              }

              // Standard Animations (Fade, Slide, Tilt, Parallax)
              let motionProps = {};
              if (data.animation === 'fade_zoom') {
                motionProps = {
                  initial: { opacity: 0, scale: 0.8 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true },
                  transition: { duration: 0.5, delay: idx * 0.1 },
                };
              } else if (data.animation === 'slide_cascade') {
                motionProps = {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.5, delay: idx * 0.15 },
                };
              } else if (data.animation === 'card_tilt_3d') {
                motionProps = {
                  whileHover: { rotateY: 12, rotateX: -12, scale: 1.04 },
                  transition: { duration: 0.3 },
                };
              } else if (data.animation === 'parallax_float') {
                motionProps = {
                  animate: { y: [0, -8, 0] },
                  transition: { duration: 3, repeat: Infinity, delay: idx * 0.5 },
                };
              }

              return (
                <motion.div
                  key={item.id}
                  {...motionProps}
                  className="rounded-2xl overflow-hidden shadow-lg border border-slate-100 group relative flex flex-col"
                  style={{ backgroundColor: colors.cardBg }}
                >
                  <div className="aspect-square relative overflow-hidden bg-slate-100">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    {mode === 'admin' && (
                      <button
                        onClick={() => onOpenMediaModal && onOpenMediaModal(idx)}
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-semibold gap-1.5"
                      >
                        <ImageIcon className="w-4 h-4" /> Cambiar Foto
                      </button>
                    )}
                  </div>
                  <div className="p-4 space-y-1 flex-1 text-left">
                    <h4
                      className={`font-bold text-base ${fonts.headingFont}`}
                      style={{ color: colors.text }}
                    >
                      <span
                        contentEditable={mode === 'admin'}
                        suppressContentEditableWarning
                        onBlur={(e) => updateItem(idx, 'title', e.currentTarget.textContent || '')}
                      >
                        {item.title}
                      </span>
                    </h4>
                    <p
                      className={`text-xs ${fonts.bodyFont}`}
                      style={{ color: colors.textMuted }}
                    >
                      <span
                        contentEditable={mode === 'admin'}
                        suppressContentEditableWarning
                        onBlur={(e) => updateItem(idx, 'caption', e.currentTarget.textContent || '')}
                      >
                        {item.caption || 'Escribe una bajada...'}
                      </span>
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
