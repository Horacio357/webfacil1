'use client';

import React, { useState, useEffect } from 'react';
import { WelcomePopupData, SiteColors, FontPair, AppMode } from '@/lib/types';
import { X, Sparkles, Image as ImageIcon, ArrowRight, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeModalProps {
  data: WelcomePopupData;
  colors: SiteColors;
  fonts: FontPair;
  mode: AppMode;
  onChange?: (data: WelcomePopupData) => void;
  onOpenMediaModal?: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({
  data,
  colors,
  fonts,
  mode,
  onChange,
  onOpenMediaModal,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!data.enabled) {
      setIsVisible(false);
      return;
    }

    // In View mode, show modal shortly after render
    // In Admin mode, keep visible or toggleable so user can edit it
    setIsVisible(true);
  }, [data.enabled, mode]);

  if (!data.enabled || !isVisible) return null;

  const updateField = (field: keyof WelcomePopupData, val: string) => {
    if (mode === 'admin' && onChange) {
      onChange({ ...data, [field]: val });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative border border-slate-100 flex flex-col"
          style={{ backgroundColor: colors.cardBg, color: colors.text }}
        >
          {/* Header Close Button / Quick Disable */}
          <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
            {mode === 'admin' && onChange && (
              <button
                onClick={() => onChange({ ...data, enabled: false })}
                className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1 hover:bg-rose-600 transition-colors shadow"
                title="Desactivar Pop-up de Bienvenida"
              >
                <EyeOff className="w-3 h-3" /> Quitar Pop-up
              </button>
            )}
            <button
              onClick={() => setIsVisible(false)}
              className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* GIF / Image Banner Header */}
          <div className="relative h-52 bg-slate-900 overflow-hidden group">
            <img
              src={data.gifUrl}
              alt="Welcome Animated Banner"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Admin Change GIF trigger */}
            {mode === 'admin' && onOpenMediaModal && (
              <button
                onClick={onOpenMediaModal}
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-bold gap-1.5"
              >
                <ImageIcon className="w-4 h-4" /> Cambiar GIF / Imagen
              </button>
            )}
          </div>

          {/* Modal Body Content */}
          <div className="p-6 text-center space-y-4">
            {data.badgeText && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-amber-500/10 text-amber-600 border border-amber-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span
                  contentEditable={mode === 'admin'}
                  suppressContentEditableWarning
                  onBlur={(e) => updateField('badgeText', e.currentTarget.textContent || '')}
                >
                  {data.badgeText}
                </span>
              </span>
            )}

            <h3
              className={`text-2xl font-black ${fonts.headingFont} leading-tight`}
              style={{ color: colors.text }}
            >
              <span
                contentEditable={mode === 'admin'}
                suppressContentEditableWarning
                onBlur={(e) => updateField('title', e.currentTarget.textContent || '')}
              >
                {data.title}
              </span>
            </h3>

            <p
              className={`text-sm ${fonts.bodyFont} leading-relaxed`}
              style={{ color: colors.textMuted }}
            >
              <span
                contentEditable={mode === 'admin'}
                suppressContentEditableWarning
                onBlur={(e) => updateField('message', e.currentTarget.textContent || '')}
              >
                {data.message}
              </span>
            </p>

            <div className="pt-2">
              <a
                href={data.buttonLink}
                onClick={() => setIsVisible(false)}
                className="w-full py-3.5 px-6 rounded-2xl text-white font-extrabold text-sm shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                style={{ backgroundColor: colors.primary }}
              >
                <span
                  contentEditable={mode === 'admin'}
                  suppressContentEditableWarning
                  onBlur={(e) => updateField('buttonText', e.currentTarget.textContent || '')}
                >
                  {data.buttonText}
                </span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
