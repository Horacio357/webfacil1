'use client';

import React from 'react';
import { PromoRibbonData, SocialLinksData, AppMode } from '@/lib/types';
import { Instagram, Facebook, Video, Twitter, Linkedin, Youtube } from 'lucide-react';

interface PromoRibbonProps {
  data: PromoRibbonData;
  socialLinks?: SocialLinksData;
  mode: AppMode;
  onChange?: (data: PromoRibbonData) => void;
  position: 'header' | 'footer';
}

export const PromoRibbon: React.FC<PromoRibbonProps> = ({
  data,
  socialLinks,
  mode,
  onChange,
  position,
}) => {
  if (!data.enabled) return null;

  const handleTextChange = (e: React.FormEvent<HTMLSpanElement>) => {
    if (mode === 'admin' && onChange) {
      onChange({ ...data, text: e.currentTarget.textContent || '' });
    }
  };

  const showSocial = position === 'header' && socialLinks?.enabled && socialLinks?.showInHeader;

  return (
    <div
      className={`w-full overflow-hidden py-2.5 px-4 font-semibold text-xs sm:text-sm transition-all shadow-sm flex items-center justify-between relative z-20 ${
        position === 'header' ? 'border-b border-white/10' : 'border-t border-white/10'
      }`}
      style={{ backgroundColor: data.bgColor, color: data.textColor }}
    >
      <div className="flex whitespace-nowrap animate-marquee items-center gap-8 w-max flex-1">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 shrink-0">
            {data.badgeText && (
              <span className="px-2 py-0.5 text-[10px] uppercase font-extrabold rounded-full bg-white/20 tracking-wider">
                {data.badgeText}
              </span>
            )}
            <span
              contentEditable={mode === 'admin'}
              suppressContentEditableWarning
              onBlur={handleTextChange}
              className="inline-block outline-none"
            >
              {data.text}
            </span>
          </div>
        ))}
      </div>

      {showSocial && (
        <div className="hidden md:flex items-center gap-2 pl-4 shrink-0 border-l border-white/20 relative z-30">
          {socialLinks.instagram && (
            <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">
              <Instagram className="w-4 h-4" />
            </a>
          )}
          {socialLinks.facebook && (
            <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">
              <Facebook className="w-4 h-4" />
            </a>
          )}
          {socialLinks.tiktok && (
            <a href={socialLinks.tiktok} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">
              <Video className="w-4 h-4" />
            </a>
          )}
          {socialLinks.twitter && (
            <a href={socialLinks.twitter} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">
              <Twitter className="w-4 h-4" />
            </a>
          )}
        </div>
      )}
    </div>
  );
};
