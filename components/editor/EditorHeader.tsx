'use client';

import React from 'react';
import { AppMode, ViewportDevice, SiteData } from '@/lib/types';
import { Monitor, Tablet, Smartphone, Eye, Edit3, Save, ExternalLink, QrCode, Check } from 'lucide-react';
import Link from 'next/link';

interface EditorHeaderProps {
  site: SiteData;
  mode: AppMode;
  device: ViewportDevice;
  isSaving: boolean;
  hasUnsavedChanges: boolean;
  onToggleMode: (mode: AppMode) => void;
  onChangeDevice: (device: ViewportDevice) => void;
  onSave: () => void;
  onTitleChange: (newTitle: string) => void;
  onOpenQrModal: () => void;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({
  site,
  mode,
  device,
  isSaving,
  hasUnsavedChanges,
  onToggleMode,
  onChangeDevice,
  onSave,
  onTitleChange,
  onOpenQrModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-4 shadow-xl">
      {/* Brand & Site Title */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center font-black text-white text-lg shadow-md group-hover:scale-105 transition-transform">
            W
          </div>
          <span className="font-extrabold text-base tracking-tight text-white hidden sm:inline">
            Web<span className="text-emerald-400">Libre</span>
          </span>
        </Link>

        <div className="h-5 w-px bg-slate-700 hidden sm:block" />

        <input
          type="text"
          value={site.title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="bg-slate-800/80 text-white font-semibold text-xs sm:text-sm px-3 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 max-w-[150px] sm:max-w-[220px]"
        />
      </div>

      {/* Mode Selector (Admin vs Visualizer) */}
      <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs">
        <button
          onClick={() => onToggleMode('admin')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
            mode === 'admin'
              ? 'bg-emerald-500 text-white shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Admin (Editar)</span>
        </button>

        <button
          onClick={() => onToggleMode('view')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
            mode === 'view'
              ? 'bg-indigo-600 text-white shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Visualizar</span>
        </button>
      </div>

      {/* Device Viewport Switcher */}
      <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs">
        <button
          onClick={() => onChangeDevice('desktop')}
          title="Vista Desktop"
          className={`p-1.5 rounded-lg transition-all ${
            device === 'desktop' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Monitor className="w-4 h-4" />
        </button>
        <button
          onClick={() => onChangeDevice('tablet')}
          title="Vista Tablet (768px)"
          className={`p-1.5 rounded-lg transition-all ${
            device === 'tablet' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Tablet className="w-4 h-4" />
        </button>
        <button
          onClick={() => onChangeDevice('mobile')}
          title="Vista Mobile (375px)"
          className={`p-1.5 rounded-lg transition-all ${
            device === 'mobile' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Smartphone className="w-4 h-4" />
        </button>
      </div>

      {/* Actions (QR, Save & Public View) */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenQrModal}
          title="Generar Código QR"
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all text-xs font-bold flex items-center gap-1.5"
        >
          <QrCode className="w-4 h-4 text-emerald-400" />
          <span className="hidden lg:inline">Código QR</span>
        </button>

        <button
          onClick={onSave}
          disabled={isSaving}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
            hasUnsavedChanges
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white ring-2 ring-emerald-300/30 animate-pulse'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
          }`}
        >
          {isSaving ? (
            <span className="animate-spin text-xs">🌀</span>
          ) : hasUnsavedChanges ? (
            <Save className="w-4 h-4" />
          ) : (
            <Check className="w-4 h-4 text-emerald-400" />
          )}
          <span>{isSaving ? 'Guardando...' : hasUnsavedChanges ? 'Guardar Cambios' : 'Guardado'}</span>
        </button>

        <a
          href={`/p/${site.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Ver Sitio Publicado</span>
        </a>
      </div>
    </header>
  );
};
