import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateEnemAnswer } from './evaluation.mjs';

test('returns correct feedback without exposing source question content', () => {
  assert.deepEqual(evaluateEnemAnswer({ correctAlternative: 'B' }, 'b'), {
    correct: true, selectedAlternative: 'B', correctAlternative: 'B',
  });
});

test('identifies an incorrect answer and returns the correct letter', () => {
  assert.deepEqual(evaluateEnemAnswer({ correctAlternative: 'D' }, 'A'), {
    correct: false, selectedAlternative: 'A', correctAlternative: 'D',
  });
});

test('rejects invalid alternatives and missing answer keys', () => {
  assert.throws(() => evaluateEnemAnswer({ correctAlternative: 'A' }, 'F'), /A, B, C, D or E/);
  assert.throws(() => evaluateEnemAnswer({}, 'A'), /no valid answer key/);
  assert.throws(() => evaluateEnemAnswer(null, 'A'), /required/);
});
