const SUBJECTS = new Set([
  'linguagens', 'matematica', 'ciencias-humanas', 'ciencias-natureza',
]);
const RIGHTS = new Set(['public_domain', 'licensed', 'needs_rights_review', 'restricted']);

function nonEmpty(value, field) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new TypeError(`Quiz question requires ${field}.`);
  }
  return value.trim();
}

/** Normalize an imported question while retaining its provenance and rights state. */
export function normalizeQuizQuestion(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new TypeError('Quiz question must be an object.');
  }
  const subject = nonEmpty(input.subject, 'subject');
  if (!SUBJECTS.has(subject)) throw new TypeError('Unsupported ENEM subject area.');
  if (!Array.isArray(input.options) || input.options.length !== 5) {
    throw new TypeError('ENEM questions must contain exactly five options.');
  }
  const options = input.options.map((option, index) => ({
    id: String.fromCharCode(65 + index),
    text: nonEmpty(option, `option ${index + 1}`),
  }));
  const answer = nonEmpty(input.answer, 'answer').toUpperCase();
  if (!options.some(option => option.id === answer)) throw new TypeError('Answer must reference an option from A to E.');
  const rightsStatus = input.rightsStatus ?? 'needs_rights_review';
  if (!RIGHTS.has(rightsStatus)) throw new TypeError('Unsupported question rights status.');
  const year = Number(input.year);
  if (!Number.isInteger(year) || year < 1998 || year > new Date().getFullYear() + 1) {
    throw new TypeError('Question year is invalid.');
  }
  return {
    id: nonEmpty(input.id, 'id'),
    exam: 'ENEM',
    year,
    subject,
    statement: nonEmpty(input.statement, 'statement'),
    supportText: input.supportText ?? null,
    options,
    answer,
    explanation: nonEmpty(input.explanation, 'explanation'),
    source: {
      name: nonEmpty(input.source?.name, 'source.name'),
      url: nonEmpty(input.source?.url, 'source.url'),
    },
    rights: {
      status: rightsStatus,
      attribution: input.attribution ?? null,
    },
  };
}

/** Safe question payload for the quiz UI: never reveal the answer before submission. */
export function toPublicQuizQuestion(question) {
  const { answer, explanation, ...publicQuestion } = question;
  return publicQuestion;
}

/** Evaluate a submitted option on the server and reveal the explanation afterward. */
export function evaluateQuizAnswer(question, submittedOption) {
  const selected = typeof submittedOption === 'string' ? submittedOption.toUpperCase() : '';
  const correct = selected === question.answer;
  return {
    correct,
    correctOption: question.answer,
    explanation: question.explanation,
  };
}
