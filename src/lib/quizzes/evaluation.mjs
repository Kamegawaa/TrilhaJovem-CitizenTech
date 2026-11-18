const LETTERS = new Set(['A', 'B', 'C', 'D', 'E']);

export function evaluateEnemAnswer(question, selectedAlternative) {
  if (!question || typeof question !== 'object') throw new TypeError('Question is required.');
  const selected = String(selectedAlternative || '').toUpperCase();
  const correct = String(question.correctAlternative || '').toUpperCase();
  if (!LETTERS.has(selected)) throw new TypeError('Selected alternative must be A, B, C, D or E.');
  if (!LETTERS.has(correct)) throw new TypeError('Question has no valid answer key.');
  return {
    correct: selected === correct,
    selectedAlternative: selected,
    correctAlternative: correct,
  };
}
