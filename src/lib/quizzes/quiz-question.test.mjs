import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeQuizQuestion,
  toPublicQuizQuestion,
  evaluateQuizAnswer,
} from './quiz-question.mjs';

const fixture = {
  id: 'enem-2024-matematica-001',
  year: 2024,
  subject: 'matematica',
  statement: 'Uma questão de exemplo para validar o contrato.',
  options: ['Alternativa A', 'Alternativa B', 'Alternativa C', 'Alternativa D', 'Alternativa E'],
  answer: 'C',
  explanation: 'A resolução demonstra por que a alternativa C é correta.',
  source: { name: 'INEP', url: 'https://www.gov.br/inep/' },
  rightsStatus: 'needs_rights_review',
};

test('normalizes a five-option ENEM question with provenance', () => {
  const question = normalizeQuizQuestion(fixture);
  assert.equal(question.exam, 'ENEM');
  assert.equal(question.options.length, 5);
  assert.equal(question.options[2].id, 'C');
  assert.equal(question.rights.status, 'needs_rights_review');
});

test('rejects questions without five alternatives or a valid answer', () => {
  assert.throws(() => normalizeQuizQuestion({ ...fixture, options: ['A', 'B'] }), /exactly five/);
  assert.throws(() => normalizeQuizQuestion({ ...fixture, answer: 'F' }), /A to E/);
});

test('public question payload does not reveal answer or explanation', () => {
  const question = normalizeQuizQuestion(fixture);
  const safe = toPublicQuizQuestion(question);
  assert.equal('answer' in safe, false);
  assert.equal('explanation' in safe, false);
});

test('answer evaluation returns feedback only after submission', () => {
  const question = normalizeQuizQuestion(fixture);
  assert.equal(evaluateQuizAnswer(question, 'c').correct, true);
  assert.equal(evaluateQuizAnswer(question, 'A').correct, false);
  assert.match(evaluateQuizAnswer(question, 'A').explanation, /alternativa C/);
});
