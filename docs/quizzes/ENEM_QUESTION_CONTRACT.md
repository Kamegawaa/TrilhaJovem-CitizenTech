# ENEM quiz question contract

This contract is the source-independent foundation for short, interactive ENEM quizzes.

## Data and provenance

Every question carries its exam year, ENEM subject area, five alternatives, answer, explanation, source name and URL, and an explicit rights status. Imported questions default to `needs_rights_review`; ingestion does not imply permission to republish exam text or supporting images.

## Client/server boundary

- `toPublicQuizQuestion` removes the answer and explanation before the question reaches the learner.
- `evaluateQuizAnswer` evaluates a submitted option and returns correctness, the correct alternative, and the explanation.
- Keep answer keys and explanations on the server until the learner submits.

## Source integration

The first question provider is [API ENEM](https://api.enem.dev/), a community-maintained project, not an official INEP API. It currently documents question data for 2009–2023 and supports pagination by year. The connector uses `GET /v1/exams/{year}/questions`.

Official INEP exams and answer keys remain the authoritative validation reference: https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos

Source records are not silently converted into editorial explanations. Preserve provenance, confirm license compatibility, and review question assets before publication.
