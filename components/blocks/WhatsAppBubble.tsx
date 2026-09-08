'use client';

import React from 'react';
import { WhatsAppBubbleData, AppMode } from '@/lib/types';
import { MessageCircle, Settings2, EyeOff } from 'lucide-react';

interface WhatsAppBubbleProps {
  data: WhatsAppBubbleData;
  mode: AppMode;
  onChange?: (data: WhatsAppBubbleData) => void;
}

export const WhatsAppBubble: React.FC<WhatsAppBubbleProps> = ({
  data,
  mode,
  onChange,
}) => {
  if (!data.enabled) return null;

  const getPositionClasses = () => {
    switch (data.position) {
      case 'bottom-left':
        return 'bottom-6 left-6';
      case 'bottom-center':
        return 'bottom-6 left-1/2 -translate-x-1/2';
      default:
        return 'bottom-6 right-6';
    }
  };

  const handleOpenWhatsApp = () => {
    const cleanPhone = data.phoneNumber.replace(/[^0-9]/g, '');
    const encodedMsg = encodeURIComponent(data.message);
    const url = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
    window.open(url, '_blank');
  };

  const handleDisableWhatsApp = () => {
    if (mode === 'admin' && onChange) {
      onChange({ ...data, enabled: false });
    }
  };

  return (
    <div className={`fixed z-50 ${getPositionClasses()} flex flex-col items-end gap-2 group`}>
      {/* Admin quick floating controls (Position selector + Quick TURN OFF button) */}
      {mode === 'admin' && onChange && (
        <div className="flex items-center gap-2 p-2 bg-slate-900/95 text-white text-xs rounded-2xl shadow-2xl border border-slate-700 backdrop-blur-md">
          <div className="flex items-center gap-1.5 font-semibold text-slate-300">
            <Settings2 className="w-3.5 h-3.5 text-emerald-400" />
            <select
              value={data.position}
              onChange={(e) => onChange({ ...data, position: e.target.value as any })}
              className="bg-slate-800 border border-slate-600 rounded-lg px-2 py-1 text-white text-[11px] focus:outline-none"
            >
              <option value="bottom-right">Derecha</option>
              <option value="bottom-left">Izquierda</option>
              <option value="bottom-center">Centro</option>
            </select>
          </div>

          <button
            onClick={handleDisableWhatsApp}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white font-bold text-[11px] transition-all border border-rose-500/40"
            title="Quitar / Ocultar WhatsApp"
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span>Quitar</span>
          </button>
        </div>
      )}

      <button
        onClick={handleOpenWhatsApp}
        className="flex items-center gap-3 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all group-hover:ring-4 ring-emerald-300/50 relative"
      >
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
          <MessageCircle className="w-5 h-5 fill-white text-emerald-500" />
        </div>
        <span
          contentEditable={mode === 'admin'}
          suppressContentEditableWarning
          onBlur={(e) => {
            if (mode === 'admin' && onChange) {
              onChange({ ...data, buttonText: e.currentTarget.textContent || '' });
            }
          }}
          className="text-sm tracking-wide"
        >
          {data.buttonText}
        </span>
      </button>
    </div>
  );
};
