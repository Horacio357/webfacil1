'use client';

import React from 'react';
import { PRESET_TEMPLATES } from '@/lib/storage';
import { SiteData } from '@/lib/types';
import { X, LayoutTemplate, Check, Sparkles } from 'lucide-react';

interface TemplateSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (templatePartial: Partial<SiteData>) => void;
}

export const TemplateSelectorModal: React.FC<TemplateSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-slate-100 text-slate-900">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <LayoutTemplate className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Plantillas Temáticas Prearmadas</h3>
              <p className="text-xs text-slate-500">Aplica un diseño profesional completo en 1 solo clic</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PRESET_TEMPLATES.map((tmpl, idx) => (
            <div
              key={idx}
              onClick={() => {
                onSelectTemplate(tmpl.site);
                onClose();
              }}
              className="p-5 rounded-2xl border-2 border-slate-200 hover:border-indigo-600 bg-slate-50 hover:bg-white cursor-pointer transition-all flex flex-col justify-between space-y-4 group shadow-sm hover:shadow-md"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700">
                  {tmpl.category}
                </span>
                <h4 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                  {tmpl.name}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">{tmpl.description}</p>
              </div>

              <button className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 group-hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow">
                <Check className="w-4 h-4" /> Aplicar Plantilla
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
