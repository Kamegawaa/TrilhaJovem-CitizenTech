import { NextResponse } from 'next/server';
import { fetchEnemQuestions } from '@/lib/sources/enem-api.mjs';
import { evaluateEnemAnswer } from '@/lib/quizzes/evaluation.mjs';

const DISCIPLINES = new Set(['languages', 'human-sciences', 'natural-sciences', 'mathematics']);
const LANGUAGES = new Set(['english', 'spanish']);

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Envie um JSON válido.' }, { status: 400 });
  }

  const year = Number(body.year);
  const index = Number(body.index);
  const discipline = body.discipline;
  const language = body.language || undefined;
  const selectedAlternative = body.selectedAlternative;

  if (!Number.isInteger(year) || year < 2009 || year > 2023) {
    return NextResponse.json({ error: 'Informe um ano entre 2009 e 2023.' }, { status: 400 });
  }
  if (!Number.isInteger(index) || index < 1 || index > 200) {
    return NextResponse.json({ error: 'Número de questão inválido.' }, { status: 400 });
  }
  if (!DISCIPLINES.has(discipline)) {
    return NextResponse.json({ error: 'Informe uma área do conhecimento válida.' }, { status: 400 });
  }
  if (language && (!LANGUAGES.has(language) || discipline !== 'languages')) {
    return NextResponse.json({ error: 'Idioma inválido para a área selecionada.' }, { status: 400 });
  }

  try {
    const result = await fetchEnemQuestions({ year, discipline, language, limit: 50, offset: 0 });
    const matches = result.questions.filter(question => Number(question.index) === index);
    if (matches.length === 0) {
      return NextResponse.json({ error: 'Questão não encontrada para os filtros informados.' }, { status: 404 });
    }
    if (matches.length > 1 && !language) {
      return NextResponse.json({ error: 'Informe o idioma para identificar a questão de Linguagens.' }, { status: 409 });
    }
    const feedback = evaluateEnemAnswer(matches[0], selectedAlternative);
    return NextResponse.json({
      ...feedback,
      feedback: feedback.correct ? 'Você acertou! Continue assim.' : 'Ainda não foi dessa vez. Confira o gabarito e tente a próxima.',
    });
  } catch (error) {
    const status = error.status === 429 ? 503 : error.status >= 500 ? 502 : 400;
    return NextResponse.json({
      error: 'Não foi possível corrigir a resposta agora.',
      retryable: Boolean(error.retryable),
    }, { status });
  }
}
