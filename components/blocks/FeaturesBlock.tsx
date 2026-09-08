'use client';

import React from 'react';
import { FeaturesSectionData, SiteColors, FontPair, AppMode } from '@/lib/types';
import { Zap, Smartphone, Sparkles, MessageCircle, Star, CheckCircle, ShieldCheck, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeaturesBlockProps {
  data: FeaturesSectionData;
  colors: SiteColors;
  fonts: FontPair;
  mode: AppMode;
  onChange?: (data: FeaturesSectionData) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Zap,
  Smartphone,
  Sparkles,
  MessageCircle,
  Star,
  CheckCircle,
  ShieldCheck,
  Heart,
};

export const FeaturesBlock: React.FC<FeaturesBlockProps> = ({
  data,
  colors,
  fonts,
  mode,
  onChange,
}) => {
  if (!data.enabled) return null;

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

  const updateItem = (index: number, field: 'title' | 'description', val: string) => {
    if (mode === 'admin' && onChange) {
      const updated = [...data.items];
      updated[index] = { ...updated[index], [field]: val };
      onChange({ ...data, items: updated });
    }
  };

  return (
    <section
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-6xl mx-auto space-y-12">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.items.map((item, idx) => {
            const IconComponent = ICON_MAP[item.iconName] || Zap;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow space-y-4"
                style={{
                  backgroundColor: colors.cardBg,
                  borderColor: `${colors.primary}20`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shadow-inner"
                  style={{
                    backgroundColor: `${colors.primary}15`,
                    color: colors.primary,
                  }}
                >
                  <IconComponent className="w-6 h-6" />
                </div>

                <h3
                  className={`text-lg font-bold ${fonts.headingFont}`}
                  style={{ color: colors.text }}
                >
                  <span
                    contentEditable={mode === 'admin'}
                    suppressContentEditableWarning
                    onBlur={(e) => updateItem(idx, 'title', e.currentTarget.textContent || '')}
                  >
                    {item.title}
                  </span>
                </h3>

                <p
                  className={`text-sm leading-relaxed ${fonts.bodyFont}`}
                  style={{ color: colors.textMuted }}
                >
                  <span
                    contentEditable={mode === 'admin'}
                    suppressContentEditableWarning
                    onBlur={(e) => updateItem(idx, 'description', e.currentTarget.textContent || '')}
                  >
                    {item.description}
                  </span>
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
