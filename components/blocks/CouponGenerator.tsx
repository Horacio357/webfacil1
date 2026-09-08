'use client';

import React, { useState } from 'react';
import { CouponSectionData, SiteColors, FontPair, AppMode, CouponDesignType } from '@/lib/types';
import { Ticket, Copy, Check, Tag, Clock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CouponGeneratorProps {
  data: CouponSectionData;
  colors: SiteColors;
  fonts: FontPair;
  mode: AppMode;
  whatsappPhone?: string;
  onChange?: (data: CouponSectionData) => void;
}

export const CouponGenerator: React.FC<CouponGeneratorProps> = ({
  data,
  colors,
  fonts,
  mode,
  whatsappPhone = '',
  onChange,
}) => {
  if (!data.enabled) return null;

  const [copied, setCopied] = useState(false);

  const updateField = (field: keyof CouponSectionData, val: any) => {
    if (mode === 'admin' && onChange) {
      onChange({ ...data, [field]: val });
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(data.code);
    setCopied(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch (e) {}
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRedeemWhatsApp = () => {
    const text = encodeURIComponent(
      `¡Hola! Quiero canjear el cupón promocional: *${data.code}* (${data.discount}).`
    );
    const url = `https://wa.me/${whatsappPhone.replace(/[^0-9]/g, '')}?text=${text}`;
    window.open(url, '_blank');
  };

  // Rendering Design 1: Ticket Perforado (Classic Ticket with perforated edges)
  const renderTicketDesign = () => (
    <div
      className="max-w-xl mx-auto rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden border-2 border-dashed border-white/30"
      style={{
        backgroundColor: colors.primary,
        color: '#FFFFFF',
      }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
        <div className="space-y-2 text-center sm:text-left flex-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5" />
            <span
              contentEditable={mode === 'admin'}
              suppressContentEditableWarning
              onBlur={(e) => updateField('badge', e.currentTarget.textContent || '')}
            >
              {data.badge}
            </span>
          </div>

          <div className="text-4xl sm:text-5xl font-black tracking-tight drop-shadow-sm">
            <span
              contentEditable={mode === 'admin'}
              suppressContentEditableWarning
              onBlur={(e) => updateField('discount', e.currentTarget.textContent || '')}
            >
              {data.discount}
            </span>
          </div>

          <p className="text-sm text-white/90 leading-snug">
            <span
              contentEditable={mode === 'admin'}
              suppressContentEditableWarning
              onBlur={(e) => updateField('description', e.currentTarget.textContent || '')}
            >
              {data.description}
            </span>
          </p>

          <p className="text-[11px] text-white/70 pt-1">
            <span
              contentEditable={mode === 'admin'}
              suppressContentEditableWarning
              onBlur={(e) => updateField('terms', e.currentTarget.textContent || '')}
            >
              {data.terms}
            </span>
          </p>
        </div>

        {/* Perforated Divider */}
        <div className="w-full sm:w-auto flex flex-col items-center gap-3 pt-4 sm:pt-0 border-t sm:border-t-0 sm:border-l border-white/20 sm:pl-6">
          <div className="text-xs font-semibold text-white/80 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span
              contentEditable={mode === 'admin'}
              suppressContentEditableWarning
              onBlur={(e) => updateField('expiryText', e.currentTarget.textContent || '')}
            >
              {data.expiryText}
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-center border border-white/30 w-full">
            <div className="text-[10px] text-white/70 uppercase tracking-wider font-semibold">Código</div>
            <div
              contentEditable={mode === 'admin'}
              suppressContentEditableWarning
              onBlur={(e) => updateField('code', e.currentTarget.textContent || '')}
              className="text-lg font-mono font-bold tracking-widest text-white outline-none"
            >
              {data.code}
            </div>
          </div>

          <button
            onClick={handleCopyCode}
            className="w-full py-2.5 px-4 rounded-xl bg-white font-bold text-xs shadow-md hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
            style={{ color: colors.primary }}
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            {copied ? '¡Copiado!' : 'Copiar Código'}
          </button>
        </div>
      </div>
    </div>
  );

  // Rendering Design 2: Neumorphic / Glass Card
  const renderNeumorphicDesign = () => (
    <div
      className="max-w-xl mx-auto rounded-3xl p-8 shadow-xl border border-slate-200/80 backdrop-blur-xl relative space-y-6"
      style={{ backgroundColor: colors.cardBg, color: colors.text }}
    >
      <div className="flex items-center justify-between">
        <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-amber-500/10 text-amber-600 tracking-wider">
          <span
            contentEditable={mode === 'admin'}
            suppressContentEditableWarning
            onBlur={(e) => updateField('badge', e.currentTarget.textContent || '')}
          >
            {data.badge}
          </span>
        </span>

        <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          <span
            contentEditable={mode === 'admin'}
            suppressContentEditableWarning
            onBlur={(e) => updateField('expiryText', e.currentTarget.textContent || '')}
          >
            {data.expiryText}
          </span>
        </span>
      </div>

      <div className="space-y-2 text-center">
        <div className="text-5xl font-black tracking-tight" style={{ color: colors.primary }}>
          <span
            contentEditable={mode === 'admin'}
            suppressContentEditableWarning
            onBlur={(e) => updateField('discount', e.currentTarget.textContent || '')}
          >
            {data.discount}
          </span>
        </div>
        <p className={`text-base ${fonts.bodyFont}`} style={{ color: colors.textMuted }}>
          <span
            contentEditable={mode === 'admin'}
            suppressContentEditableWarning
            onBlur={(e) => updateField('description', e.currentTarget.textContent || '')}
          >
            {data.description}
          </span>
        </p>
      </div>

      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Código de Descuento</div>
          <div
            contentEditable={mode === 'admin'}
            suppressContentEditableWarning
            onBlur={(e) => updateField('code', e.currentTarget.textContent || '')}
            className="text-xl font-mono font-extrabold tracking-widest text-slate-800 outline-none"
          >
            {data.code}
          </div>
        </div>

        <button
          onClick={handleRedeemWhatsApp}
          className="w-full sm:w-auto py-3 px-6 rounded-xl text-white font-bold text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
          style={{ backgroundColor: colors.primary }}
        >
          <Ticket className="w-4 h-4" />
          <span
            contentEditable={mode === 'admin'}
            suppressContentEditableWarning
            onBlur={(e) => updateField('ctaText', e.currentTarget.textContent || '')}
          >
            {data.ctaText}
          </span>
        </button>
      </div>

      <p className="text-[11px] text-center text-slate-400">
        <span
          contentEditable={mode === 'admin'}
          suppressContentEditableWarning
          onBlur={(e) => updateField('terms', e.currentTarget.textContent || '')}
        >
          {data.terms}
        </span>
      </p>
    </div>
  );

  // Rendering Design 3: Minimalist Banner
  const renderMinimalBannerDesign = () => (
    <div
      className="max-w-2xl mx-auto rounded-2xl p-6 sm:p-8 border-2 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md"
      style={{
        backgroundColor: colors.cardBg,
        borderColor: colors.primary,
        color: colors.text,
      }}
    >
      <div className="space-y-2 text-center md:text-left">
        <div className="text-3xl font-extrabold tracking-tight" style={{ color: colors.primary }}>
          <span
            contentEditable={mode === 'admin'}
            suppressContentEditableWarning
            onBlur={(e) => updateField('discount', e.currentTarget.textContent || '')}
          >
            {data.discount}
          </span>
        </div>
        <p className="text-sm font-medium text-slate-600">
          <span
            contentEditable={mode === 'admin'}
            suppressContentEditableWarning
            onBlur={(e) => updateField('description', e.currentTarget.textContent || '')}
          >
            {data.description}
          </span>
        </p>
        <p className="text-xs text-slate-400">
          <span
            contentEditable={mode === 'admin'}
            suppressContentEditableWarning
            onBlur={(e) => updateField('terms', e.currentTarget.textContent || '')}
          >
            {data.terms}
          </span>
        </p>
      </div>

      <div className="flex flex-col items-center gap-3 w-full md:w-auto">
        <div
          contentEditable={mode === 'admin'}
          suppressContentEditableWarning
          onBlur={(e) => updateField('code', e.currentTarget.textContent || '')}
          className="px-6 py-2.5 rounded-xl bg-slate-100 font-mono font-bold text-lg text-slate-800 tracking-widest border border-slate-300 w-full text-center outline-none"
        >
          {data.code}
        </div>
        <button
          onClick={handleCopyCode}
          className="w-full py-2.5 px-6 rounded-xl text-white font-bold text-xs shadow hover:opacity-90 transition-all flex items-center justify-center gap-2"
          style={{ backgroundColor: colors.primary }}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? '¡Copiado!' : 'Copiar Cupón'}
        </button>
      </div>
    </div>
  );

  return (
    <section
      id="coupon-section"
      className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-b border-slate-100"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Admin Switcher for 3 Coupon Designs */}
        {mode === 'admin' && (
          <div className="flex items-center justify-center gap-2 p-2 rounded-2xl bg-white shadow-md border border-slate-200 max-w-md mx-auto text-xs">
            <span className="font-bold text-slate-700 px-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Diseño Cupón:
            </span>
            {[
              { id: 'ticket', label: '1. Ticket Perforado' },
              { id: 'neumorphic', label: '2. Card Neumórfica' },
              { id: 'minimal_banner', label: '3. Banner Minimal' },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => updateField('design', d.id as CouponDesignType)}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                  data.design === d.id
                    ? 'bg-amber-500 text-white shadow'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        )}

        {/* Selected Design Render */}
        {data.design === 'ticket' && renderTicketDesign()}
        {data.design === 'neumorphic' && renderNeumorphicDesign()}
        {data.design === 'minimal_banner' && renderMinimalBannerDesign()}
      </div>
    </section>
  );
};
