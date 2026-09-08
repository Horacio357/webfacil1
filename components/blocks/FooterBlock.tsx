'use client';

import React from 'react';
import { FooterSectionData, SocialLinksData, SiteColors, FontPair, AppMode } from '@/lib/types';
import { Instagram, Facebook, Video, Twitter, Linkedin, Youtube } from 'lucide-react';

interface FooterBlockProps {
  data: FooterSectionData;
  socialLinks?: SocialLinksData;
  colors: SiteColors;
  fonts: FontPair;
  mode: AppMode;
  onChange?: (data: FooterSectionData) => void;
}

export const FooterBlock: React.FC<FooterBlockProps> = ({
  data,
  socialLinks,
  colors,
  fonts,
  mode,
  onChange,
}) => {
  if (!data.enabled) return null;

  const updateField = (field: keyof FooterSectionData, val: any) => {
    if (mode === 'admin' && onChange) {
      onChange({ ...data, [field]: val });
    }
  };

  const showSocial = socialLinks?.enabled && socialLinks?.showInFooter;

  return (
    <footer
      className="py-12 px-4 sm:px-6 lg:px-8 border-t border-black/10 transition-colors"
      style={{ backgroundColor: colors.cardBg, color: colors.text }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-6 space-y-3 text-center md:text-left">
          <h3
            className={`text-2xl font-bold ${fonts.headingFont}`}
            style={{ color: colors.primary }}
          >
            <span
              contentEditable={mode === 'admin'}
              suppressContentEditableWarning
              onBlur={(e) => updateField('brandName', e.currentTarget.textContent || '')}
            >
              {data.brandName}
            </span>
          </h3>
          <p
            className={`text-sm ${fonts.bodyFont} max-w-sm`}
            style={{ color: colors.textMuted }}
          >
            <span
              contentEditable={mode === 'admin'}
              suppressContentEditableWarning
              onBlur={(e) => updateField('description', e.currentTarget.textContent || '')}
            >
              {data.description}
            </span>
          </p>

          {/* Social Icons Row */}
          {showSocial && (
            <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all shadow-sm"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all shadow-sm"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {socialLinks.tiktok && (
                <a
                  href={socialLinks.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all shadow-sm"
                >
                  <Video className="w-4 h-4" />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all shadow-sm"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all shadow-sm"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all shadow-sm"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          )}
        </div>

        <div className="md:col-span-6 flex flex-col items-center md:items-end gap-4">
          <div className="flex flex-wrap items-center gap-6 text-sm font-semibold">
            {data.links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                className="hover:underline transition-all"
                style={{ color: colors.text }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <p className="text-xs text-slate-400">
            <span
              contentEditable={mode === 'admin'}
              suppressContentEditableWarning
              onBlur={(e) => updateField('copyrightText', e.currentTarget.textContent || '')}
            >
              {data.copyrightText}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};
