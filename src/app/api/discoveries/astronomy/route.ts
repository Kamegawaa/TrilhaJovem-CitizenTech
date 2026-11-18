import { NextResponse } from 'next/server';
import { fetchNasaApod } from '@/lib/sources/nasa-apod.mjs';

export const revalidate = 3600;

/**
 * Returns a source-backed astronomy discovery for editorial review.
 * This endpoint deliberately does not expose the item as publishable feed
 * content while its media rights remain unverified.
 */
export async function GET() {
  try {
    const { item } = await fetchNasaApod();
    return NextResponse.json(
      {
        data: {
          ...item,
          publicationEligible: item.rights.status === 'cleared'
            && item.editorial.status === 'approved',
        },
        meta: {
          source: 'NASA APOD',
          editorialQueue: true,
          notice: 'Mídia aguardando verificação de direitos antes da publicação.',
        },
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      },
    );
  } catch (error) {
    const status = error?.status === 429 ? 503 : 502;
    return NextResponse.json(
      {
        error: {
          code: error?.status === 429 ? 'SOURCE_RATE_LIMITED' : 'SOURCE_UNAVAILABLE',
          message: 'Não foi possível consultar a fonte de astronomia agora.',
          retryable: error?.retryable ?? true,
        },
      },
      { status, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
