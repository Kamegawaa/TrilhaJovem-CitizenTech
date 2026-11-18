export interface NasaApodCatalogItem {
  id: string;
  format: string;
  title: string;
  summary: string;
  category: string;
  language: string;
  source: {
    name: string;
    url: string;
    recordId: string | null;
  };
  media: {
    type: 'image' | 'video';
    url: string;
    thumbnailUrl: string | null;
    altText: string;
    copyright: string | null;
  } | null;
  rights: {
    status: 'cleared' | 'needs_rights_review' | 'restricted';
    license: string | null;
    attribution: string | null;
  };
  editorial: {
    status: 'discovered' | 'ingested' | 'validated' | 'editorial_review' | 'approved' | 'published' | 'needs_rights_review' | 'rejected';
    hook: string | null;
    factCheckedAt: string | null;
  };
  retrievedAt: string;
}

export interface FetchNasaApodOptions {
  date?: string;
  apiKey?: string;
  fetchImpl?: typeof fetch;
}

export function fetchNasaApod(
  options?: FetchNasaApodOptions,
): Promise<{
  item: NasaApodCatalogItem;
  sourcePayload: Record<string, unknown>;
}>;
