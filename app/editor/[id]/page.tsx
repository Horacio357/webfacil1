'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { SiteData, AppMode, ViewportDevice } from '@/lib/types';
import { getSiteBySlugOrId, saveSiteToStorage, DEFAULT_SITE } from '@/lib/storage';
import { getPalette } from '@/lib/palettes';
import { getFontPair } from '@/lib/fonts';

import { EditorHeader } from '@/components/editor/EditorHeader';
import { SidebarControls } from '@/components/editor/SidebarControls';
import { ViewportFrame } from '@/components/editor/ViewportFrame';
import { PromoRibbon } from '@/components/blocks/PromoRibbon';
import { HeroBlock } from '@/components/blocks/HeroBlock';
import { GalleryBlock } from '@/components/blocks/GalleryBlock';
import { FeaturesBlock } from '@/components/blocks/FeaturesBlock';
import { CouponGenerator } from '@/components/blocks/CouponGenerator';
import { WhatsAppBubble } from '@/components/blocks/WhatsAppBubble';
import { FooterBlock } from '@/components/blocks/FooterBlock';
import { WelcomeModal } from '@/components/blocks/WelcomeModal';
import { MediaManagerModal } from '@/components/media/MediaManagerModal';
import { QrCodeModal } from '@/components/editor/QrCodeModal';
import { TemplateSelectorModal } from '@/components/editor/TemplateSelectorModal';

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const siteId = (params?.id as string) || 'site-demo-1';

  const [site, setSite] = useState<SiteData>(DEFAULT_SITE);
  const [mode, setMode] = useState<AppMode>('admin');
  const [device, setDevice] = useState<ViewportDevice>('desktop');
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Modal states
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [mediaTarget, setMediaTarget] = useState<{ type: 'hero' | 'gallery' | 'welcome'; index?: number }>({
    type: 'hero',
  });

  useEffect(() => {
    const loaded = getSiteBySlugOrId(siteId);
    setSite(loaded);
  }, [siteId]);

  const handleUpdateSite = (updated: SiteData) => {
    setSite(updated);
    setHasUnsavedChanges(true);
  };

  const handleApplyTemplate = (templatePartial: Partial<SiteData>) => {
    handleUpdateSite({
      ...site,
      ...templatePartial,
      hero: templatePartial.hero ? { ...site.hero, ...templatePartial.hero } : site.hero,
      gallery: templatePartial.gallery ? { ...site.gallery, ...templatePartial.gallery } : site.gallery,
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    saveSiteToStorage(site);
    
    try {
      await fetch('/api/sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(site),
      });
    } catch (e) {
      console.error('Error syncing with API endpoint:', e);
    }

    setTimeout(() => {
      setIsSaving(false);
      setHasUnsavedChanges(false);
    }, 400);
  };

  const openHeroMediaModal = () => {
    setMediaTarget({ type: 'hero' });
    setIsMediaModalOpen(true);
  };

  const openGalleryMediaModal = (index: number) => {
    setMediaTarget({ type: 'gallery', index });
    setIsMediaModalOpen(true);
  };

  const openWelcomeMediaModal = () => {
    setMediaTarget({ type: 'welcome' });
    setIsMediaModalOpen(true);
  };

  const handleSelectMedia = (imageUrl: string) => {
    if (mediaTarget.type === 'hero') {
      handleUpdateSite({
        ...site,
        hero: { ...site.hero, imageUrl },
      });
    } else if (mediaTarget.type === 'welcome') {
      handleUpdateSite({
        ...site,
        welcomePopup: { ...site.welcomePopup, gifUrl: imageUrl },
      });
    } else if (mediaTarget.type === 'gallery' && mediaTarget.index !== undefined) {
      const updatedItems = [...site.gallery.items];
      updatedItems[mediaTarget.index] = {
        ...updatedItems[mediaTarget.index],
        url: imageUrl,
      };
      handleUpdateSite({
        ...site,
        gallery: { ...site.gallery, items: updatedItems },
      });
    }
  };

  const colors = getPalette(site.paletteId);
  const fonts = getFontPair(site.fontPairId);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col relative">
      {/* Editor Header Toolbar */}
      <EditorHeader
        site={site}
        mode={mode}
        device={device}
        isSaving={isSaving}
        hasUnsavedChanges={hasUnsavedChanges}
        onToggleMode={(newMode) => setMode(newMode)}
        onChangeDevice={(newDev) => setDevice(newDev)}
        onSave={handleSave}
        onTitleChange={(newTitle) => handleUpdateSite({ ...site, title: newTitle })}
        onOpenQrModal={() => setIsQrModalOpen(true)}
      />

      {/* Main Canvas Viewport Container */}
      <main className="flex-1 relative overflow-x-hidden">
        <ViewportFrame device={device}>
          <div className="w-full min-h-full flex flex-col justify-between" style={{ backgroundColor: colors.background }}>
            {/* Header Promo Ribbon */}
            <PromoRibbon
              data={site.headerRibbon}
              socialLinks={site.socialLinks}
              mode={mode}
              position="header"
              onChange={(ribbon) => handleUpdateSite({ ...site, headerRibbon: ribbon })}
            />

            {/* Hero Section */}
            <HeroBlock
              data={site.hero}
              colors={colors}
              fonts={fonts}
              mode={mode}
              onChange={(hero) => handleUpdateSite({ ...site, hero })}
              onOpenMediaModal={openHeroMediaModal}
            />

            {/* Gallery Section */}
            <GalleryBlock
              data={site.gallery}
              colors={colors}
              fonts={fonts}
              mode={mode}
              onChange={(gallery) => handleUpdateSite({ ...site, gallery })}
              onOpenMediaModal={openGalleryMediaModal}
            />

            {/* Features Section */}
            <FeaturesBlock
              data={site.features}
              colors={colors}
              fonts={fonts}
              mode={mode}
              onChange={(features) => handleUpdateSite({ ...site, features })}
            />

            {/* Coupon Generator Section */}
            <CouponGenerator
              data={site.coupon}
              colors={colors}
              fonts={fonts}
              mode={mode}
              whatsappPhone={site.whatsApp.phoneNumber}
              onChange={(coupon) => handleUpdateSite({ ...site, coupon })}
            />

            {/* Footer Promo Ribbon */}
            <PromoRibbon
              data={site.footerRibbon}
              mode={mode}
              position="footer"
              onChange={(ribbon) => handleUpdateSite({ ...site, footerRibbon: ribbon })}
            />

            {/* Footer Section */}
            <FooterBlock
              data={site.footer}
              socialLinks={site.socialLinks}
              colors={colors}
              fonts={fonts}
              mode={mode}
              onChange={(footer) => handleUpdateSite({ ...site, footer })}
            />

            {/* Direct WhatsApp Contact Bubble */}
            <WhatsAppBubble
              data={site.whatsApp}
              mode={mode}
              onChange={(whatsApp) => handleUpdateSite({ ...site, whatsApp })}
            />

            {/* Cartel de Bienvenida Pop-up con GIF */}
            <WelcomeModal
              data={site.welcomePopup}
              colors={colors}
              fonts={fonts}
              mode={mode}
              onChange={(welcomePopup) => handleUpdateSite({ ...site, welcomePopup })}
              onOpenMediaModal={openWelcomeMediaModal}
            />
          </div>
        </ViewportFrame>
      </main>

      {/* Anti-Error Control Sidebar (Only visible in Admin Mode) */}
      {mode === 'admin' && (
        <SidebarControls
          site={site}
          onChange={handleUpdateSite}
          onOpenTemplateModal={() => setIsTemplateModalOpen(true)}
        />
      )}

      {/* Media Manager Compression Modal */}
      <MediaManagerModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelectImage={handleSelectMedia}
      />

      {/* QR Code Modal */}
      <QrCodeModal
        isOpen={isQrModalOpen}
        slug={site.slug}
        onClose={() => setIsQrModalOpen(false)}
      />

      {/* Preset Template Selector Modal */}
      <TemplateSelectorModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        onSelectTemplate={handleApplyTemplate}
      />
    </div>
  );
}
