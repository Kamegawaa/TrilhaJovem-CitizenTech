const FORMATS = new Set([
  'CINEMATIC_EDIT', 'DISCOVERY', 'DEEP_DIVE', 'QUICK_CHALLENGE',
  'EXPERIMENT', 'CAREER_STORY', 'LEARNING_PATH', 'OPPORTUNITY',
]);
const STATUSES = new Set(['discovered', 'ingested', 'validated', 'editorial_review', 'approved', 'published', 'needs_rights_review', 'rejected']);

/**
 * Normalize source metadata without inventing editorial facts.
 * Source-provided values and editorial fields remain explicitly separated.
 */
export function normalizeCatalogItem(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new TypeError('Catalog item must be an object.');
  }
  for (const key of ['id', 'source', 'sourceUrl', 'title', 'summary', 'category', 'language']) {
    if (typeof input[key] !== 'string' || input[key].trim() === '') {
      throw new TypeError(`Catalog item requires ${key}.`);
    }
  }
  const format = input.format ?? 'DISCOVERY';
  if (!FORMATS.has(format)) throw new TypeError('Unsupported editorial format.');
  const editorialStatus = input.editorialStatus ?? 'ingested';
  if (!STATUSES.has(editorialStatus)) throw new TypeError('Unsupported editorial status.');
  const rights = input.rights ?? { status: 'needs_rights_review', license: null, attribution: null };
  if (!['cleared', 'needs_rights_review', 'restricted'].includes(rights.status)) {
    throw new TypeError('Unsupported rights status.');
  }
  return {
    id: input.id.trim(),
    format,
    title: input.title.trim(),
    summary: input.summary.trim(),
    category: input.category.trim(),
    language: input.language.trim(),
    source: { name: input.source.trim(), url: input.sourceUrl.trim(), recordId: input.sourceRecordId ?? null },
    media: input.media ?? null,
    rights: {
      status: rights.status,
      license: rights.license ?? null,
      attribution: rights.attribution ?? null,
    },
    editorial: {
      status: editorialStatus,
      hook: input.editorial?.hook ?? null,
      factCheckedAt: input.editorial?.factCheckedAt ?? null,
    },
    retrievedAt: input.retrievedAt ?? new Date().toISOString(),
  };
}
