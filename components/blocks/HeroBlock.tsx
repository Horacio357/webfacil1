'use client';

import React from 'react';
import { HeroSectionData, SiteColors, FontPair, AppMode } from '@/lib/types';
import { Sparkles, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroBlockProps {
  data: HeroSectionData;
  colors: SiteColors;
  fonts: FontPair;
  mode: AppMode;
  onChange?: (data: HeroSectionData) => void;
  onOpenMediaModal?: () => void;
}

export const HeroBlock: React.FC<HeroBlockProps> = ({
  data,
  colors,
  fonts,
  mode,
  onChange,
  onOpenMediaModal,
}) => {
  if (!data.enabled) return null;

  const updateField = (field: keyof HeroSectionData, value: string) => {
    if (mode === 'admin' && onChange) {
      onChange({ ...data, [field]: value });
    }
  };

  return (
    <section
      className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 transition-colors overflow-hidden"
      style={{ backgroundColor: colors.background }}
    >
      {/* Background Decorative Blob */}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: colors.primary }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Text Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 space-y-6 text-center lg:text-left"
        >
          {/* Badge */}
          {data.badgeText && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm border"
              style={{
                backgroundColor: colors.cardBg,
                borderColor: `${colors.primary}30`,
                color: colors.primary,
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span
                contentEditable={mode === 'admin'}
                suppressContentEditableWarning
                onBlur={(e) => updateField('badgeText', e.currentTarget.textContent || '')}
              >
                {data.badgeText}
              </span>
            </div>
          )}

          {/* Title */}
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl ${fonts.headingFont} leading-tight`}
            style={{ color: colors.text }}
          >
            <span
              contentEditable={mode === 'admin'}
              suppressContentEditableWarning
              onBlur={(e) => updateField('title', e.currentTarget.textContent || '')}
            >
              {data.title}
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-lg sm:text-xl ${fonts.bodyFont} max-w-2xl mx-auto lg:mx-0 leading-relaxed`}
            style={{ color: colors.textMuted }}
          >
            <span
              contentEditable={mode === 'admin'}
              suppressContentEditableWarning
              onBlur={(e) => updateField('subtitle', e.currentTarget.textContent || '')}
            >
              {data.subtitle}
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
            <a
              href={data.ctaLink}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              style={{
                backgroundColor: colors.primary,
                color: '#FFFFFF',
              }}
            >
              <span
                contentEditable={mode === 'admin'}
                suppressContentEditableWarning
                onBlur={(e) => updateField('ctaText', e.currentTarget.textContent || '')}
              >
                {data.ctaText}
              </span>
              <ArrowRight className="w-5 h-5" />
            </a>

            {mode === 'admin' && (
              <button
                onClick={onOpenMediaModal}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border font-medium text-sm transition-all"
                style={{
                  backgroundColor: colors.cardBg,
                  borderColor: `${colors.primary}40`,
                  color: colors.text,
                }}
              >
                <ImageIcon className="w-4 h-4 text-blue-500" />
                Cambiar Imagen Hero
              </button>
            )}
          </div>
        </motion.div>

        {/* Media Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 group">
            <img
              src={data.imageUrl}
              alt="Hero preview"
              className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            {mode === 'admin' && (
              <div
                onClick={onOpenMediaModal}
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer text-white font-semibold gap-2"
              >
                <ImageIcon className="w-6 h-6" />
                Clic para cambiar imagen
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
