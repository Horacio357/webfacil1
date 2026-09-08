'use client';

import React, { useState } from 'react';
import { X, Upload, Image as ImageIcon, Check, Sparkles } from 'lucide-react';

interface MediaManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string) => void;
}

const PRESET_IMAGES = [
  {
    title: 'Trabajo en Equipo',
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Oficina Moderna',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Productos & E-commerce',
    url: 'https://images.unsplash.com/photo-1556742049-0a675628532f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Gastronomía & Café',
    url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Moda & Tendencias',
    url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Salud & Bienestar',
    url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80',
  },
];

export const MediaManagerModal: React.FC<MediaManagerModalProps> = ({
  isOpen,
  onClose,
  onSelectImage,
}) => {
  if (!isOpen) return null;

  const [customUrl, setCustomUrl] = useState('');
  const [compressing, setCompressing] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCompressing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const scaleSize = MAX_WIDTH / img.width;
        
        if (scaleSize < 1) {
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Compress to JPEG 82% quality
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
        setCompressing(false);
        onSelectImage(compressedDataUrl);
        onClose();
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleCustomUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrl.trim()) {
      onSelectImage(customUrl.trim());
      setCustomUrl('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-slate-100">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Gestor de Medios</h3>
              <p className="text-xs text-slate-500">Sube fotos o elige imágenes con compresión integrada</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload Button */}
        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-indigo-500 transition-colors bg-slate-50 relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <div className="flex flex-col items-center gap-2 pointer-events-none">
            <div className="p-3 rounded-full bg-white shadow-sm text-indigo-600">
              <Upload className="w-6 h-6" />
            </div>
            <span className="font-bold text-sm text-slate-800">
              {compressing ? 'Compresionando imagen...' : 'Cargar foto desde tu dispositivo'}
            </span>
            <span className="text-xs text-slate-400">PNG, JPG, WEBP o GIF (Auto-compresión a HD Web)</span>
          </div>
        </div>

        {/* Custom URL */}
        <form onSubmit={handleCustomUrlSubmit} className="flex gap-2">
          <input
            type="url"
            placeholder="O pega el enlace URL de una imagen (https://...)"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow"
          >
            Usar URL
          </button>
        </form>

        {/* Curated Presets */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Imágenes Profesionales Recomendadas:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {PRESET_IMAGES.map((preset, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onSelectImage(preset.url);
                  onClose();
                }}
                className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer border border-slate-200 shadow-sm hover:shadow-md transition-all"
              >
                <img
                  src={preset.url}
                  alt={preset.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-bold">
                  <Check className="w-4 h-4 mr-1" /> Elegir
                </div>
                <span className="absolute bottom-1 left-1.5 right-1.5 text-[10px] font-semibold text-white truncate drop-shadow">
                  {preset.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
