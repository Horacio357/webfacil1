'use client';

import React from 'react';
import { X, QrCode, Download, Share2, Sparkles, Check } from 'lucide-react';

interface QrCodeModalProps {
  isOpen: boolean;
  slug: string;
  onClose: () => void;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({ isOpen, slug, onClose }) => {
  if (!isOpen) return null;

  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}/p/${slug}` : `https://weblibre.app/p/${slug}`;
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(fullUrl)}`;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrApiUrl;
    link.download = `QR-${slug}.png`;
    link.target = '_blank';
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-6 shadow-2xl relative border border-slate-100 text-slate-900">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <QrCode className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Código QR del Sitio</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* QR Image */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 inline-block shadow-inner">
          <img src={qrApiUrl} alt="Código QR del Sitio" className="w-48 h-48 mx-auto rounded-lg" />
        </div>

        <div className="space-y-1">
          <p className="text-xs font-bold text-slate-800 truncate">{fullUrl}</p>
          <p className="text-[11px] text-slate-400">
            Escanea para acceder a la landing page en cualquier smartphone. Ideal para folletos y locales.
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all"
        >
          <Download className="w-4 h-4" />
          Descargar QR en Alta Calidad (PNG)
        </button>
      </div>
    </div>
  );
};
