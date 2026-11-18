# Wikimedia knowledge discovery source

The first general-purpose knowledge discovery provider is the Wikimedia REST search API for Portuguese Wikipedia:

`GET https://pt.wikipedia.org/w/rest.php/v1/search/page?q={query}&limit=8`

The application exposes `GET /api/discover/search?q=astronomia` and normalizes results to title, description, plain-text excerpt, source URL, optional thumbnail, and source attribution. HTML excerpts are stripped before being returned to the interface.

This is a discovery entry point, not an endorsement of Wikipedia as the final authority. Cards link to the original article so learners can explore references and continue their research. Media rights and attribution must be respected; the source image is optional and should not be copied into the application.

Requests are limited to 2–100 characters and 10 results maximum, with an 8-second upstream timeout and short shared cache.
