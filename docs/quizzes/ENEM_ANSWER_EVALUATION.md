# ENEM answer evaluation

The application exposes `POST /api/quiz/enem/answer` to evaluate one submitted alternative.

Example request:

```json
{
  "year": 2020,
  "discipline": "mathematics",
  "index": 12,
  "selectedAlternative": "C"
}
```

For Linguagens, send `language: "english"` or `"spanish"` to disambiguate language-specific questions.

The server loads the matching source question and evaluates the submitted letter against `correctAlternative`. The answer key is never accepted from the browser. The response contains correctness, the selected letter, the correct letter, and brief feedback. The source does not provide a pedagogical explanation in this contract, so the endpoint does not fabricate one.

This endpoint is an academic MVP: it does not yet persist attempts or user progress.
