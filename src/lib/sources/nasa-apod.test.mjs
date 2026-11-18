import test from 'node:test';
import assert from 'node:assert/strict';
import { fetchNasaApod } from './nasa-apod.mjs';

const fixture = {
  date: '2026-11-17',
  title: 'A Test Nebula',
  explanation: 'A distant nebula observed in space.',
  url: 'https://apod.nasa.gov/apod/image/test.jpg',
  media_type: 'image',
  copyright: 'Example Photographer',
};

function mockFetch(payload, status = 200) {
  return async (url, options) => {
    assert.match(url.toString(), /^https:\/\/api\.nasa\.gov\/planetary\/apod/);
    assert.equal(options.headers.accept, 'application/json');
    return { ok: status >= 200 && status < 300, status, json: async () => payload };
  };
}

test('normalizes NASA APOD while keeping it out of publication pending rights review', async () => {
  const { item } = await fetchNasaApod({ date: '2026-11-17', apiKey: 'test', fetchImpl: mockFetch(fixture) });
  assert.equal(item.id, 'nasa-apod-2026-11-17');
  assert.equal(item.source.recordId, '2026-11-17');
  assert.equal(item.media.type, 'image');
  assert.equal(item.editorial.status, 'needs_rights_review');
  assert.equal(item.rights.status, 'needs_rights_review');
});

test('rejects invalid dates before making a request', async () => {
  await assert.rejects(() => fetchNasaApod({ date: '17/11/2026', fetchImpl: mockFetch(fixture) }), /YYYY-MM-DD/);
});

test('marks rate limits and server failures as retryable', async () => {
  await assert.rejects(
    () => fetchNasaApod({ fetchImpl: mockFetch({}, 429) }),
    error => error.status === 429 && error.retryable === true,
  );
});

test('rejects unsupported media types', async () => {
  await assert.rejects(
    () => fetchNasaApod({ fetchImpl: mockFetch({ ...fixture, media_type: 'audio' }) }),
    /Unsupported NASA APOD media type/,
  );
});

test('rejects malformed source payloads', async () => {
  await assert.rejects(() => fetchNasaApod({ fetchImpl: mockFetch({ date: '2026-11-17' }) }), /missing required fields/);
});
