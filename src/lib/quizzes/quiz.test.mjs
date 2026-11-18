import test from 'node:test';
import assert from 'node:assert/strict';
import { toPublicQuizQuestion, toPublicQuizQuestions } from './quiz.mjs';

test('removes answer keys from the question and alternatives', () => {
  const result = toPublicQuizQuestion({
    index: 1,
    title: 'Questão de teste',
    correctAlternative: 'B',
    alternatives: [
      { letter: 'A', text: 'Opção A', isCorrect: false },
      { letter: 'B', text: 'Opção B', isCorrect: true },
    ],
  });
  assert.equal('correctAlternative' in result, false);
  assert.equal('isCorrect' in result.alternatives[0], false);
  assert.deepEqual(result.alternatives.map(item => item.letter), ['A', 'B']);
  assert.equal(result.alternatives[1].text, 'Opção B');
});

test('does not mutate the source question', () => {
  const question = { correctAlternative: 'C', alternatives: [{ letter: 'C', isCorrect: true }] };
  toPublicQuizQuestion(question);
  assert.equal(question.correctAlternative, 'C');
  assert.equal(question.alternatives[0].isCorrect, true);
});

test('maps a list and rejects invalid input', () => {
  assert.equal(toPublicQuizQuestions([{ index: 1 }, { index: 2 }]).length, 2);
  assert.throws(() => toPublicQuizQuestions(null), /array/);
});
