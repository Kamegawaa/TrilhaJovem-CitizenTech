import { normalizeEnemQuestion } from './normalize-question.mjs';

const [yearArg = '2023', indexArg = '1', languageArg = 'espanhol'] = process.argv.slice(2);
const year = Number(yearArg);
const index = Number(indexArg);

if (!Number.isInteger(year) || !Number.isInteger(index) || year < 2009 || index < 1) {
  console.error('Usage: node spikes/enem/smoke-api.mjs [year>=2009] [questionIndex>=1] [language]');
  process.exit(2);
}

const language = languageArg ? `?language=${encodeURIComponent(languageArg)}` : '';
const url = `https://api.enem.dev/v1/exams/${year}/questions/${index}${language}`;

try {
  const response = await fetch(url, {
    headers: { Accept: 'application/json', 'User-Agent': 'TrilhaJovem-CitizenTech/0.1' },
    signal: AbortSignal.timeout(15000),
  });

  if (response.status === 429) {
    const retryAfter = response.headers.get('Retry-After');
    throw new Error(`Rate limit (429). Retry-After informado pela API: ${retryAfter ?? 'não informado'}. Aguarde antes de tentar novamente.`);
  }
  if (!response.ok) throw new Error(`API respondeu HTTP ${response.status}.`);

  const raw = await response.json();
  const { publicQuestion, grading } = normalizeEnemQuestion(raw);

  console.log(JSON.stringify({
    status: 'ok',
    source: 'enem.dev',
    question: publicQuestion.id,
    title: publicQuestion.title,
    discipline: publicQuestion.discipline,
    language: publicQuestion.language,
    alternatives: publicQuestion.alternatives.length,
    usableAssets: publicQuestion.assets.length,
    brokenAssets: publicQuestion.dataQuality.brokenAssetCount,
    answerKeyValidated: Boolean(grading.correctAlternative),
    answerKeyExposed: false,
    sourceUrl: publicQuestion.source.url,
  }, null, 2));
} catch (error) {
  console.error(`ENEM API validation failed: ${error.message}`);
  process.exitCode = 1;
}
