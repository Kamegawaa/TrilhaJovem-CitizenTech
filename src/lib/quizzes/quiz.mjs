const ANSWER_FIELDS = new Set(['correctAlternative', 'correct_alternative', 'answer', 'answerKey', 'isCorrect', 'is_correct', 'gabarito']);

export function toPublicQuizQuestion(question) {
  if (!question || typeof question !== 'object') throw new TypeError('Question must be an object.');
  const publicQuestion = { ...question };
  for (const field of ANSWER_FIELDS) delete publicQuestion[field];

  if (Array.isArray(publicQuestion.alternatives)) {
    publicQuestion.alternatives = publicQuestion.alternatives.map((alternative) => {
      if (!alternative || typeof alternative !== 'object') return alternative;
      const safeAlternative = { ...alternative };
      for (const field of ANSWER_FIELDS) delete safeAlternative[field];
      return safeAlternative;
    });
  }
  return publicQuestion;
}

export function toPublicQuizQuestions(questions) {
  if (!Array.isArray(questions)) throw new TypeError('Questions must be an array.');
  return questions.map(toPublicQuizQuestion);
}
