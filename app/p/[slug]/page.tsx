'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { SiteData } from '@/lib/types';
import { getSiteBySlugOrId } from '@/lib/storage';
import { getPalette } from '@/lib/palettes';
import { getFontPair } from '@/lib/fonts';

import { PromoRibbon } from '@/components/blocks/PromoRibbon';
import { HeroBlock } from '@/components/blocks/HeroBlock';
import { GalleryBlock } from '@/components/blocks/GalleryBlock';
import { FeaturesBlock } from '@/components/blocks/FeaturesBlock';
import { CouponGenerator } from '@/components/blocks/CouponGenerator';
import { WhatsAppBubble } from '@/components/blocks/WhatsAppBubble';
import { FooterBlock } from '@/components/blocks/FooterBlock';
import { WelcomeModal } from '@/components/blocks/WelcomeModal';

export default function PublicSitePage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'minegocio';

  const [site, setSite] = useState<SiteData | null>(null);

  useEffect(() => {
    fetch(`/api/sites?slug=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.site) {
          setSite(data.site);
        } else {
          setSite(getSiteBySlugOrId(slug));
        }
      })
      .catch(() => {
        setSite(getSiteBySlugOrId(slug));
      });
  }, [slug]);

  useEffect(() => {
    if (site) {
      document.title = site.seo?.title || site.title;
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', site.seo?.description || site.hero.subtitle);
    }
  }, [site]);

  if (!site) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="animate-spin text-2xl">🌀</div>
      </div>
    );
  }

  const colors = getPalette(site.paletteId);
  const fonts = getFontPair(site.fontPairId);

  return (
    <div className="min-h-screen flex flex-col justify-between" style={{ backgroundColor: colors.background }}>
      {/* Header Promo Ribbon */}
      <PromoRibbon data={site.headerRibbon} socialLinks={site.socialLinks} mode="view" position="header" />

      {/* Hero Section */}
      <HeroBlock data={site.hero} colors={colors} fonts={fonts} mode="view" />

      {/* Gallery Section */}
      <GalleryBlock data={site.gallery} colors={colors} fonts={fonts} mode="view" />

      {/* Features Section */}
      <FeaturesBlock data={site.features} colors={colors} fonts={fonts} mode="view" />

      {/* Coupon Generator Section */}
      <CouponGenerator
        data={site.coupon}
        colors={colors}
        fonts={fonts}
        mode="view"
        whatsappPhone={site.whatsApp.phoneNumber}
      />

      {/* Footer Promo Ribbon */}
      <PromoRibbon data={site.footerRibbon} mode="view" position="footer" />

      {/* Footer Section */}
      <FooterBlock data={site.footer} socialLinks={site.socialLinks} colors={colors} fonts={fonts} mode="view" />

      {/* Direct WhatsApp Bubble */}
      <WhatsAppBubble data={site.whatsApp} mode="view" />

      {/* Cartel Pop-up de Bienvenida con GIF */}
      <WelcomeModal data={site.welcomePopup} colors={colors} fonts={fonts} mode="view" />
    </div>
  );
}
