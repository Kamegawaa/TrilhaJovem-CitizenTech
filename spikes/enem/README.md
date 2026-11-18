# ENEM API spike

Small, dependency-free proof of concept for validating the community ENEM API and normalizing a question for the Trilha Jovem quiz domain.

## Requirements

- Node.js 18.17+ (native `fetch` and `node:test`).
- Internet access for the live smoke test.

## Offline tests

```bash
node --test spikes/enem/normalize-question.test.mjs
```

## Live API check

```bash
node spikes/enem/smoke-api.mjs 2023 1 espanhol
```

The smoke test makes one request per execution. The API documentation recommends no more than one uncached request per second; do not run this script in a tight loop.

## What this spike validates

- Required fields and five alternatives A–E.
- Consistency between `correctAlternative` and `isCorrect` flags.
- A public quiz DTO that excludes the answer key and correctness flags.
- A separate private grading record for server-side validation.
- Detection of the known `broken-image.svg` placeholder in Markdown/assets.
- Preservation of the original Markdown context so editorial content is not silently modified.

This is not yet a production connector, import job, database integration, API route, or frontend feature. It is intentionally isolated under `spikes/` until the source contract and rights policy are approved.

## Known limitations

- The community API is not an official INEP API.
- The current endpoint coverage and media quality must be rechecked periodically.
- The spike detects a known broken-image placeholder; it does not download or prove the availability/licensing of every asset.
- Explanations and difficulty tags are not supplied by the API; they require separate editorial work and review.
