import { normalizeCatalogItem } from '../content/catalog-item.mjs';

const APOD_ENDPOINT = 'https://api.nasa.gov/planetary/apod';

/**
 * Fetch one NASA Astronomy Picture of the Day record.
 * API credentials are read only on the server; DEMO_KEY is a limited fallback.
 */
export async function fetchNasaApod({ date, apiKey = process.env.NASA_API_KEY ?? 'DEMO_KEY', fetchImpl = fetch } = {}) {
  const url = new URL(APOD_ENDPOINT);
  url.searchParams.set('api_key', apiKey);
  if (date) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new TypeError('Date must use YYYY-MM-DD.');
    url.searchParams.set('date', date);
  }

  const response = await fetchImpl(url, { headers: { accept: 'application/json' }, signal: AbortSignal.timeout(8000) });
  if (!response.ok) {
    const error = new Error(`NASA APOD request failed with HTTP ${response.status}.`);
    error.status = response.status;
    error.retryable = response.status === 429 || response.status >= 500;
    throw error;
  }

  const raw = await response.json();
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new TypeError('NASA APOD returned an invalid payload.');
  if (!raw.date || !raw.title || !raw.explanation || !raw.url || !raw.media_type) {
    throw new TypeError('NASA APOD payload is missing required fields.');
  }
  if (!['image', 'video'].includes(raw.media_type)) throw new TypeError('Unsupported NASA APOD media type.');

  const mediaUrl = new URL(raw.url);
  if (!['https:', 'http:'].includes(mediaUrl.protocol)) throw new TypeError('NASA APOD media URL must be HTTP(S).');

  const item = normalizeCatalogItem({
    id: `nasa-apod-${raw.date}`,
    source: 'NASA Astronomy Picture of the Day',
    sourceUrl: 'https://apod.nasa.gov/apod/astropix.html',
    sourceRecordId: raw.date,
    title: raw.title,
    summary: raw.explanation,
    category: 'astronomia',
    language: 'en',
    format: 'DISCOVERY',
    media: {
      type: raw.media_type,
      url: mediaUrl.toString(),
      thumbnailUrl: raw.thumbnail_url ?? null,
      altText: raw.title,
      copyright: raw.copyright ?? null,
    },
    rights: {
      // NASA API access does not establish rights to every third-party APOD asset.
      status: raw.copyright ? 'needs_rights_review' : 'needs_rights_review',
      license: null,
      attribution: raw.copyright ?? 'NASA APOD; verify asset-specific rights before publication.',
    },
    editorialStatus: 'needs_rights_review',
    retrievedAt: new Date().toISOString(),
  });

  return { item, sourcePayload: raw };
}
