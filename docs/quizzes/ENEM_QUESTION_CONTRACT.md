# ENEM question source connector

The first provider is [API ENEM](https://api.enem.dev/), a community-maintained, unaffiliated API with 2,700+ questions from 2009–2023.

Documented endpoints include `GET /v1/exams`, `GET /v1/exams/{year}`, `GET /v1/exams/{year}/questions`, and `GET /v1/exams/{year}/questions/{index}`. This connector implements the paginated questions endpoint.

The adapter validates the supported year range (2009–2023), limits each request to 50 records, supports offset/language filters, uses an 8-second timeout, and marks HTTP 429/5xx errors as retryable.

## Boundaries

- This is a community project, not an official INEP/MEC API.
- Newer exam years must not be assumed available.
- Preserve source records; do not invent editorial explanations.
- Keep answer keys server-side until submission.
- Confirm license compatibility and review media assets before publication.

Official reference: https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos

## Application delivery endpoint

The application exposes `GET /api/quiz/enem?year=2020&discipline=mathematics&limit=10&offset=0`. Supported discipline values are `languages`, `human-sciences`, `natural-sciences`, and `mathematics`. The optional `language` filter accepts `english` or `spanish` only with `languages`.

Before returning data to the browser, the API removes the correct alternative and correctness flags from both questions and alternatives. Answer keys must never be included in the learner-facing payload.
