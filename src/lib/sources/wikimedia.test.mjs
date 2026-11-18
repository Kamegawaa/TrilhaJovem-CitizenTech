import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeKnowledgeResults, searchKnowledge } from './wikimedia.mjs';

test('normalizes Wikimedia results into safe plain-text cards', () => {
  const results = normalizeKnowledgeResults({ pages: [{
    id: 42, key: 'Astronomia', title: 'Astronomia', description: 'Ciência dos astros',
    excerpt: 'Estudo <b>científico</b> dos corpos celestes &amp; fenômenos.',
    thumbnail: { url: 'https://upload.wikimedia.org/example.jpg' },
  }] });
  assert.equal(results[0].excerpt, 'Estudo científico dos corpos celestes & fenômenos.');
  assert.equal(results[0].url, 'https://pt.wikipedia.org/wiki/Astronomia');
  assert.equal(results[0].source, 'Wikimedia / Wikipédia');
});

test('rejects malformed results and invalid search terms', async () => {
  assert.throws(() => normalizeKnowledgeResults({}), /Invalid Wikimedia/);
  await assert.rejects(() => searchKnowledge({ query: 'a' }), /between 2 and 100/);
});

test('searches Wikimedia and returns normalized cards', async () => {
  const result = await searchKnowledge({ query: 'buracos negros', fetchImpl: async url => {
    assert.equal(url.searchParams.get('q'), 'buracos negros');
    assert.equal(url.searchParams.get('limit'), '8');
    return { ok: true, status: 200, json: async () => ({ pages: [{ key: 'Buraco_negro', title: 'Buraco negro' }] }) };
  } });
  assert.equal(result[0].title, 'Buraco negro');
});
