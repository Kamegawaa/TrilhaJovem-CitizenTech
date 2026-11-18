import test from 'node:test';
import assert from 'node:assert/strict';
import { gradeEnemAnswer, normalizeEnemQuestion } from './normalize-question.mjs';

function fixture(overrides = {}) {
  return {
    title: 'Questão 1 - ENEM 2023',
    index: 1,
    discipline: 'linguagens',
    language: 'espanhol',
    year: 2023,
    context: 'Texto de apoio.\n\n![](https://enem.dev/broken-image.svg)',
    files: [],
    correctAlternative: 'A',
    alternativesIntroduction: 'Com base no texto, selecione a alternativa correta.',
    alternatives: ['A', 'B', 'C', 'D', 'E'].map(letter => ({
      letter,
      text: `Alternativa ${letter}`,
      file: null,
      isCorrect: letter === 'A',
    })),
    ...overrides,
  };
}

test('normalizes a question and keeps answer key out of the public DTO', () => {
  const { publicQuestion, grading } = normalizeEnemQuestion(fixture());
  assert.equal(publicQuestion.id, 'enem-2023-1');
  assert.equal(publicQuestion.alternatives.length, 5);
  assert.equal('correctAlternative' in publicQuestion, false);
  assert.equal('isCorrect' in publicQuestion.alternatives[0], false);
  assert.equal(grading.correctAlternative, 'A');
});

test('flags known broken-image placeholders without rewritng source context', () => {
  const { publicQuestion } = normalizeEnemQuestion(fixture());
  assert.equal(publicQuestion.dataQuality.brokenAssetCount, 1);
  assert.equal(publicQuestion.assets.length, 0);
  assert.match(publicQuestion.contextMarkdown, /broken-image\.svg/);
});

test('rejects duplicated alternative letters', () => {
  const input = fixture();
  input.alternatives[4].letter = 'D';
  assert.throws(() => normalizeEnemQuestion(input), /Duplicate alternative D/);
});

test('rejects a disagreement between answer key and alternative flags', () => {
  const input = fixture({ correctAlternative: 'B' });
  assert.throws(() => normalizeEnemQuestion(input), /inconsistent/);
});

test('grades a selected alternative without returning the answer key', () => {
  const { grading } = normalizeEnemQuestion(fixture());
  const result = gradeEnemAnswer(grading, 'A');
  assert.deepEqual(result, {
    questionId: 'enem-2023-1',
    selectedAlternative: 'A',
    isCorrect: true,
  });
  assert.equal('correctAlternative' in result, false);
});
