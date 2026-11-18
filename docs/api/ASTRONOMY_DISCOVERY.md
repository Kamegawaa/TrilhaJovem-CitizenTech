# Astronomy discovery endpoint

`GET /api/discoveries/astronomy` retrieves the current NASA Astronomy Picture of the Day through the server-side connector.

- The NASA API key is read only on the server from `NASA_API_KEY`; the connector uses `DEMO_KEY` only as a limited development fallback.
- Successful responses include the normalized catalog item and `publicationEligible` flag.
- Items remain in the editorial queue while media rights are unverified. The endpoint does not imply permission to redistribute NASA APOD media.
- Responses are cached at the edge for one hour, with stale content permitted for up to one day.
- Upstream failures return a stable error code and a retryable flag; upstream details and credentials are not exposed.

This is a source-integration endpoint, not yet the user-facing personalized feed. Publication requires a separate editorial approval workflow.
