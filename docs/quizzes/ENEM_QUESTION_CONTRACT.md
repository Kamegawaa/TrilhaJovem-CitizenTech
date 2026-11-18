# ENEM quiz question contract

This contract is the source-independent foundation for short, interactive ENEM quizzes.

## Data and provenance

Every question carries its exam year, ENEM subject area, five alternatives, answer, explanation, source name and URL, and an explicit rights status. Imported questions default to `needs_rights_review`; ingestion does not imply permission to republish exam text or supporting images.

## Client/server boundary

- `toPublicQuizQuestion` removes the answer and explanation before the question reaches the learner.
- `evaluateQuizAnswer` evaluates a submitted option and returns correctness, the correct alternative, and the explanation.
- Keep answer keys and explanations on the server until the learner submits.

## Source integration

The contract does not claim that INEP offers a public question API. A future connector must use an official, verifiable source (such as INEP's published exams and answer keys), preserve attribution, and pass the rights review before publication.
