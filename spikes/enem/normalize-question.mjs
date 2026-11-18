const ALLOWED_LETTERS = new Set(['A', 'B', 'C', 'D', 'E']);
const BROKEN_ASSET_MARKERS = ['/broken-image.svg'];

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isNullableString(value) {
  return value === null || typeof value === 'string';
}

function extractMarkdownImageUrls(markdown = '') {
  const urls = [];
  const expression = /!\[[^\]]*\]\((https?:\/\/[^\s)]+)(?:\s+[^)]*)?\)/g;
  for (const match of markdown.matchAll(expression)) urls.push(match[1]);
  return urls;
}

function isBrokenAsset(url) {
  try {
    const pathname = new URL(url).pathname;
    return BROKEN_ASSET_MARKERS.some(marker => pathname.endsWith(marker));
  } catch {
    return true;
  }
}

/**
 * Converts the community ENEM API payload into a safe quiz DTO.
 * The answer key is deliberately returned separately for server-side grading.
 */
export function normalizeEnemQuestion(raw) {
  if (!isObject(raw)) throw new TypeError('Question payload must be an object.');
  if (!Number.isInteger(raw.year) || raw.year < 2009) throw new TypeError('Invalid ENEM year.');
  if (!Number.isInteger(raw.index) || raw.index < 1) throw new TypeError('Invalid question index.');
  if (typeof raw.title !== 'string' || raw.title.trim() === '') throw new TypeError('Question title is required.');
  if (typeof raw.discipline !== 'string' || raw.discipline.trim() === '') throw new TypeError('Question discipline is required.');
  if (!isNullableString(raw.language)) throw new TypeError('Question language must be a string or null.');
  if (!isNullableString(raw.context)) throw new TypeError('Question context must be a string or null.');
  if (!isNullableString(raw.alternativesIntroduction)) throw new TypeError('Alternatives introduction must be a string or null.');
  if (!Array.isArray(raw.files)) throw new TypeError('Question files must be an array.');
  if (!Array.isArray(raw.alternatives) || raw.alternatives.length !== 5) {
    throw new TypeError('A multiple-choice ENEM question must contain five alternatives.');
  }
  if (!ALLOWED_LETTERS.has(raw.correctAlternative)) throw new TypeError('Invalid correct alternative.');

  const seen = new Set();
  const alternatives = raw.alternatives.map((alternative) => {
    if (!isObject(alternative)) throw new TypeError('Alternative must be an object.');
    if (!ALLOWED_LETTERS.has(alternative.letter)) throw new TypeError('Invalid alternative letter.');
    if (seen.has(alternative.letter)) throw new TypeError(`Duplicate alternative ${alternative.letter}.`);
    seen.add(alternative.letter);
    if (!isNullableString(alternative.text)) throw new TypeError(`Alternative ${alternative.letter} text must be a string or null.`);
    if (!isNullableString(alternative.file)) throw new TypeError(`Alternative ${alternative.letter} file must be a string or null.`);
    if (typeof alternative.isCorrect !== 'boolean') throw new TypeError(`Alternative ${alternative.letter} requires isCorrect.`);
    return {
      letter: alternative.letter,
      text: alternative.text,
      file: alternative.file,
      isCorrect: alternative.isCorrect,
    };
  });

  if (seen.size !== 5 || [...ALLOWED_LETTERS].some(letter => !seen.has(letter))) {
    throw new TypeError('Alternatives must contain A, B, C, D and E exactly once.');
  }

  const correctFlags = alternatives.filter(item => item.isCorrect).map(item => item.letter);
  if (correctFlags.length !== 1 || correctFlags[0] !== raw.correctAlternative) {
    throw new TypeError('Answer key is inconsistent with alternative isCorrect flags.');
  }

  const contextImages = extractMarkdownImageUrls(raw.context ?? '');
  const declaredFiles = raw.files.filter(file => typeof file === 'string');
  const allAssets = [...new Set([...declaredFiles, ...contextImages, ...alternatives.map(item => item.file).filter(Boolean)])];
  const brokenAssets = allAssets.filter(isBrokenAsset);
  const usableAssets = allAssets.filter(url => !isBrokenAsset(url));

  const publicQuestion = {
    id: `enem-${raw.year}-${raw.index}`,
    title: raw.title,
    year: raw.year,
    index: raw.index,
    discipline: raw.discipline,
    language: raw.language,
    contextMarkdown: raw.context,
    alternativesIntroduction: raw.alternativesIntroduction,
    alternatives: alternatives.map(({ letter, text, file }) => ({ letter, text, file })),
    assets: usableAssets,
    source: {
      provider: 'enem.dev',
      url: `https://api.enem.dev/v1/exams/${raw.year}/questions/${raw.index}${raw.language ? `?language=${encodeURIComponent(raw.language)}` : ''}`,
    },
    dataQuality: {
      hasContext: Boolean(raw.context?.trim()),
      hasQuestionFiles: declaredFiles.length > 0,
      brokenAssetCount: brokenAssets.length,
      warnings: brokenAssets.length ? ['One or more source assets use a known broken-image placeholder.'] : [],
    },
  };

  // Keep this object on the server only. Never serialize it in the quiz payload.
  const grading = {
    questionId: publicQuestion.id,
    correctAlternative: raw.correctAlternative,
  };

  return { publicQuestion, grading };
}

export function gradeEnemAnswer(grading, selectedLetter) {
  if (!isObject(grading) || !ALLOWED_LETTERS.has(grading.correctAlternative)) {
    throw new TypeError('Invalid private grading record.');
  }
  if (!ALLOWED_LETTERS.has(selectedLetter)) throw new TypeError('Selected answer must be A, B, C, D or E.');
  return {
    questionId: grading.questionId,
    selectedAlternative: selectedLetter,
    isCorrect: selectedLetter === grading.correctAlternative,
  };
}
