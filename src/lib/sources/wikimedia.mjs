const API_BASE = 'https://pt.wikipedia.org/w/rest.php/v1/search/page';

function plainText(value = '') {
  return String(value).replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();
}

export function normalizeKnowledgeResults(payload) {
  if (!payload || !Array.isArray(payload.pages)) throw new TypeError('Invalid Wikimedia search response.');
  return payload.pages.map(page => ({
    id: String(page.id ?? page.key ?? page.title),
    title: plainText(page.title || page.key || 'Sem título'),
    description: plainText(page.description || ''),
    excerpt: plainText(page.excerpt || ''),
    url: page.key ? `https://pt.wikipedia.org/wiki/${encodeURIComponent(page.key)}` : null,
    imageUrl: page.thumbnail?.url || null,
    source: 'Wikimedia / Wikipédia',
  })).filter(item => item.title && item.url);
}

export async function searchKnowledge({ query, limit = 8, fetchImpl = fetch } = {}) {
  const term = String(query || '').trim();
  if (term.length < 2 || term.length > 100) throw new TypeError('Search query must contain between 2 and 100 characters.');
  if (!Number.isInteger(limit) || limit < 1 || limit > 10) throw new TypeError('Limit must be between 1 and 10.');
  const url = new URL(API_BASE);
  url.searchParams.set('q', term);
  url.searchParams.set('limit', String(limit));
  const response = await fetchImpl(url, {
    headers: { accept: 'application/json', 'user-agent': 'TrilhaJovem/0.1 (educational discovery app)' },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) {
    const error = new Error(`Wikimedia search failed with HTTP ${response.status}.`);
    error.status = response.status;
    error.retryable = response.status === 429 || response.status >= 500;
    throw error;
  }
  return normalizeKnowledgeResults(await response.json());
}
