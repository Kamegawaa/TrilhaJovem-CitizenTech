import test from 'node:test';
import assert from 'node:assert/strict';
import { fetchEnemQuestions } from './enem-api.mjs';

const payload = {
  metadata: { limit: 2, offset: 0, total: 2700, hasMore: true },
  questions: [
    { title: 'Questão 1 - ENEM 2020', index: 1, discipline: 'matematica', year: 2020, correctAlternative: 'A', alternatives: [] },
    { title: 'Questão 2 - ENEM 2020', index: 2, discipline: 'matematica', year: 2020, correctAlternative: 'B', alternatives: [] },
  ],
};

function mockFetch(body, status = 200) {
  return async (url, options) => {
    assert.match(url.toString(), /^https:\/\/api\.enem\.dev\/v1\/exams\/2020\/questions/);
    assert.equal(options.headers.accept, 'application/json');
    return { ok: status >= 200 && status < 300, status, json: async () => body };
  };
}

test('fetches paginated ENEM questions from the documented public API', async () => {
  const result = await fetchEnemQuestions({ year: 2020, limit: 2, fetchImpl: mockFetch(payload) });
  assert.equal(result.questions.length, 2);
  assert.equal(result.metadata.hasMore, true);
  assert.equal(result.source.name, 'API ENEM (community project)');
});

test('rejects unsupported years and invalid pagination before network access', async () => {
  await assert.rejects(() => fetchEnemQuestions({ year: 2025 }), /supports years from 2009 to 2023/);
  await assert.rejects(() => fetchEnemQuestions({ year: 2020, limit: 100 }), /between 1 and 50/);
  await assert.rejects(() => fetchEnemQuestions({ year: 2020, offset: -1 }), /non-negative/);
});

test('marks rate limits and upstream server errors as retryable', async () => {
  await assert.rejects(
    () => fetchEnemQuestions({ year: 2020, fetchImpl: mockFetch({}, 429) }),
    error => error.status === 429 && error.retryable === true,
  );
});

test('rejects malformed API payloads', async () => {
  await assert.rejects(
    () => fetchEnemQuestions({ year: 2020, fetchImpl: mockFetch({ questions: [] }) }),
    /invalid questions payload/,
  );
});
