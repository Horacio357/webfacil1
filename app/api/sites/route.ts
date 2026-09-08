import { NextResponse } from 'next/server';
import { DEFAULT_SITE } from '@/lib/storage';
import { SiteData } from '@/lib/types';

// In-memory fallback database for Vercel Serverless environment
let inMemorySites: SiteData[] = [DEFAULT_SITE];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (slug) {
    const found = inMemorySites.find((s) => s.slug === slug || s.id === slug);
    if (found) {
      return NextResponse.json({ success: true, site: found });
    }
    // Return default site if not found
    return NextResponse.json({ success: true, site: { ...DEFAULT_SITE, slug } });
  }

  return NextResponse.json({ success: true, sites: inMemorySites });
}

export async function POST(request: Request) {
  try {
    const body: SiteData = await request.json();
    if (!body || !body.slug) {
      return NextResponse.json({ success: false, error: 'Slug e información del sitio requerida' }, { status: 400 });
    }

    const index = inMemorySites.findIndex((s) => s.id === body.id || s.slug === body.slug);
    const updated = { ...body, updatedAt: new Date().toISOString() };

    if (index >= 0) {
      inMemorySites[index] = updated;
    } else {
      inMemorySites.push(updated);
    }

    return NextResponse.json({ success: true, site: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error procesando solicitud' }, { status: 500 });
  }
}
