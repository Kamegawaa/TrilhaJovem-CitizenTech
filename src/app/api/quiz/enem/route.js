import { NextResponse } from 'next/server';
import { fetchEnemQuestions } from '@/lib/sources/enem-api.mjs';
import { toPublicQuizQuestions } from '@/lib/quizzes/quiz.mjs';

const DISCIPLINES = new Set(['languages', 'human-sciences', 'natural-sciences', 'mathematics']);
const LANGUAGES = new Set(['english', 'spanish']);

export async function GET(request) {
  const params = request.nextUrl.searchParams;
  const year = Number(params.get('year'));
  const discipline = params.get('discipline') || undefined;
  const language = params.get('language') || undefined;
  const limit = Number(params.get('limit') || 10);
  const offset = Number(params.get('offset') || 0);

  if (!Number.isInteger(year) || year < 2009 || year > 2023) {
    return NextResponse.json({ error: 'Informe um ano entre 2009 e 2023.' }, { status: 400 });
  }
  if (discipline && !DISCIPLINES.has(discipline)) {
    return NextResponse.json({ error: 'Área do conhecimento inválida.' }, { status: 400 });
  }
  if (language && (!LANGUAGES.has(language) || discipline !== 'languages')) {
    return NextResponse.json({ error: 'Idioma disponível apenas para Linguagens: english ou spanish.' }, { status: 400 });
  }

  try {
    const result = await fetchEnemQuestions({ year, discipline, language, limit, offset });
    return NextResponse.json({
      metadata: result.metadata,
      questions: toPublicQuizQuestions(result.questions),
      source: result.source,
    }, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
    });
  } catch (error) {
    const status = error.status === 429 ? 503 : error.status >= 500 ? 502 : 400;
    return NextResponse.json({
      error: 'Não foi possível carregar as questões agora.',
      retryable: Boolean(error.retryable),
    }, { status });
  }
}
