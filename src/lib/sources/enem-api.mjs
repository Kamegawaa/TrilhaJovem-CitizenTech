const API_BASE = 'https://api.enem.dev/v1';
const MIN_YEAR = 2009;
const MAX_YEAR = 2023;

export async function fetchEnemQuestions({ year, limit = 10, offset = 0, discipline, language, fetchImpl = fetch } = {}) {
  const parsedYear = Number(year);
  if (!Number.isInteger(parsedYear) || parsedYear < MIN_YEAR || parsedYear > MAX_YEAR) {
    throw new TypeError(`ENEM API currently supports years from ${MIN_YEAR} to ${MAX_YEAR}.`);
  }
  if (!Number.isInteger(limit) || limit < 1 || limit > 50) throw new TypeError('Limit must be an integer between 1 and 50.');
  if (!Number.isInteger(offset) || offset < 0) throw new TypeError('Offset must be a non-negative integer.');

  const url = new URL(`${API_BASE}/exams/${parsedYear}/questions`);
  url.searchParams.set('limit', String(limit));
  url.searchParams.set('offset', String(offset));
  if (discipline) url.searchParams.set('discipline', discipline);
  if (language) url.searchParams.set('language', language);

  const response = await fetchImpl(url, {
    headers: { accept: 'application/json' },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) {
    const error = new Error(`ENEM source request failed with HTTP ${response.status}.`);
    error.status = response.status;
    error.retryable = response.status === 429 || response.status >= 500;
    throw error;
  }
  const payload = await response.json();
  if (!payload || typeof payload !== 'object' || !payload.metadata || !Array.isArray(payload.questions)) {
    throw new TypeError('ENEM source returned an invalid questions payload.');
  }
  return {
    metadata: {
      limit: payload.metadata.limit,
      offset: payload.metadata.offset,
      total: payload.metadata.total,
      hasMore: payload.metadata.hasMore,
    },
    questions: payload.questions,
    source: {
      name: 'API ENEM (community project)',
      url: 'https://api.enem.dev/',
      documentationUrl: 'https://docs.enem.dev/introduction',
      yearsAvailable: { from: MIN_YEAR, to: MAX_YEAR },
    },
  };
}
