'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getStoredSites, DEFAULT_SITE, saveSiteToStorage } from '@/lib/storage';
import { SiteData } from '@/lib/types';
import { Sparkles, Plus, Edit3, Eye, ArrowRight, Zap, ShieldCheck, Smartphone, Check } from 'lucide-react';

export default function Home() {
  const [sites, setSites] = useState<SiteData[]>([]);

  useEffect(() => {
    setSites(getStoredSites());
  }, []);

  const handleCreateNewSite = () => {
    const newSlug = `sitio-${Math.random().toString(36).substring(2, 7)}`;
    const newSite: SiteData = {
      ...DEFAULT_SITE,
      id: `site-${Date.now()}`,
      title: 'Mi Nuevo Sitio Web',
      slug: newSlug,
    };
    saveSiteToStorage(newSite);
    window.location.href = `/editor/${newSite.id}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-emerald-500">
      {/* Navbar */}
      <header className="max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center font-black text-white text-xl shadow-lg">
            W
          </div>
          <span className="font-extrabold text-xl tracking-tight">
            Web<span className="text-emerald-400">Libre</span>
          </span>
        </div>

        <button
          onClick={handleCreateNewSite}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg hover:shadow-emerald-500/20 transition-all hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          Crear Nuevo Sitio
        </button>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-12 text-center space-y-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400 shadow-inner">
          <Sparkles className="w-4 h-4 text-amber-400" />
          Plataforma SaaS Anti-Errores para Emprendedores
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight max-w-4xl mx-auto leading-tight">
          Crea tu Presencia Digital Profesional{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
            sin Conocimientos Técnicos
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
          Constructor por bloques tipo LEGO con paletas armónicas pre-calculadas, animación de libro 3D, generador de cupones y burbuja de WhatsApp directa.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={handleCreateNewSite}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-base shadow-xl hover:shadow-emerald-500/25 transition-all hover:-translate-y-1"
          >
            <span>Abrir Constructor Anti-Errores</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* List of User Sites */}
        <div className="pt-16 border-t border-slate-900 space-y-6 text-left">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-400" />
            Tus Sitios en Plataforma
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sites.map((site) => (
              <div
                key={site.id}
                className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between gap-6 group shadow-lg"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 uppercase tracking-wider">
                      SaaS Active
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Slug: /{site.slug}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {site.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {site.hero.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Link
                    href={`/editor/${site.id}`}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-700"
                  >
                    <Edit3 className="w-4 h-4 text-emerald-400" />
                    Editar Sitio
                  </Link>

                  <a
                    href={`/p/${site.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    Ver
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 text-left">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
            <h4 className="text-lg font-bold text-white">Diseño 100% Anti-Errores</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Combinaciones de color armónicas que calculan automáticamente el contraste del texto para garantizar legibilidad perfecta.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <Smartphone className="w-8 h-8 text-indigo-400" />
            <h4 className="text-lg font-bold text-white">Previsualización Multidispositivo</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Prueba exactamente cómo luce tu página en teléfonos móviles (375px), tablets (768px) y pantallas desktop en tiempo real.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <Sparkles className="w-8 h-8 text-amber-400" />
            <h4 className="text-lg font-bold text-white">Galería con Animación Libro 3D</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Paquete de 5 animaciones profesionales seleccionables con interruptor para efecto hojear libro 3D.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 px-6 text-center text-xs text-slate-500">
        WebLibre SaaS © 2026 — Despliegue optimizado para Vercel
      </footer>
    </div>
  );
}
