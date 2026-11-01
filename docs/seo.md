# Portfolio SEO implementation

`src/seo/catalog.mjs` is the shared, whitelist-based metadata catalog. Each
visible project has an honest title, description, canonical and existing public
image. Author-portrait fallbacks are identified as portraits, not app screenshots.

- Home, expertise, archive, its three stories, and Wanderlust receive generated
  initial HTML heads during `npm run build`; generated non-forced static rewrites
  serve them at existing public URLs without introducing trailing-slash routes.
  SPA scripts remain unchanged.
- Netlify's narrowly routed `project-metadata` Edge Function transforms expertise
  **HTML heads only** for `?project=...`, including arbitrary tracking/view query
  variants. It uses `context.next()`, no credentials, no third-party service, no
  personal data, and no asset interception. Transformed responses are not cached
  against generic origin validators. On an edge error it fails open to the page.
- Client navigation updates the same tags for modal open/close and history.
  Client tags alone are **not** treated as proof of social-preview support.
- The canonical project URL omits `projectView`, tracking parameters and hash.
  Existing shared URLs continue to work; parameters/history behavior are intact.
- Summary and pinned-image actions are actual anchors. Plain clicks retain the
  existing modal behavior; modifier keys/new tabs use native link behavior.
  Initial expertise HTML also includes a no-JavaScript project-link index.
- The sitemap is regenerated into `dist/sitemap.xml` with 16 deduplicated canonical
  URLs. The checked-in public copy is a reference, not the build's source of truth.
  All seven previously listed public routes remain. Writing modal duplicates use
  their established archive article canonical URLs; no work is removed/noindexed.
- Existing `/writing`, `/writing/:storyId` and `/expertise-prototype` aliases get
  server 301s matching their existing client destinations. Archive pages remain
  available and indexable.

## Verification and limits

Run `npm test` and `npm run build`. Verify raw preview HTML for home, expertise,
project query variants and an archive article: one title/description/canonical,
matching OG/Twitter tags, correct image URLs. Verify actual rendered normal-click,
modified-click, Back/Forward and live-frame preservation separately. Check image
HTTP responses, alias redirects and sitemap URLs. Preview social tags deliberately
refer to the production canonical/image origin; do not mistake that for publishing.

This is **not full body prerendering** or a claim of Google indexing/ranking.
Interactive project prose still needs JavaScript. Full content rendering and
proper unknown-route 404 responses remain a separate follow-up; the existing SPA
fallback is intentionally retained rather than silently dropping legacy work.
The edge transform adds one small invocation to expertise requests with no secret
configuration or new package dependency. No Search Console setup is performed.
