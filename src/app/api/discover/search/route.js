import { NextResponse } from 'next/server';
import { searchKnowledge } from '@/lib/sources/wikimedia.mjs';

export async function GET(request) {
  const query = request.nextUrl.searchParams.get('q') || '';
  try {
    const results = await searchKnowledge({ query, limit: 8 });
    return NextResponse.json({ query: query.trim(), results }, {
      headers: { 'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1800' },
    });
  } catch (error) {
    const invalid = error instanceof TypeError;
    const status = invalid ? 400 : error.status === 429 ? 503 : 502;
    return NextResponse.json({
      error: invalid ? error.message : 'Não foi possível buscar conteúdos agora.',
      retryable: Boolean(error.retryable),
    }, { status });
  }
}
