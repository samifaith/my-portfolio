# Project Guidelines

## Scope

This is a Vite + React 19 single-page portfolio site. Keep changes minimal, preserve existing visual direction, and avoid introducing new dependencies unless required.

## Build and Test

- Install: `npm install`
- Dev server: `npm run dev`
- Production build: `npm run build`
- Preview production build: `npm run preview`
- Tests: `npm run test`
- Lighthouse audit script: `npm run audit:lighthouse`

See [README](../README.md) and [QUICK_START](../QUICK_START.md) for full run guidance.

## Architecture

- App routing and lazy-loading live in [src/App.jsx](../src/App.jsx).
- Pages are in [src/pages](../src/pages), reusable UI is in [src/components](../src/components).
- Content data is file-based in [src/constants/WritingPieces.js](../src/constants/WritingPieces.js) and [src/constants/CaseStudies.js](../src/constants/CaseStudies.js) (no backend/API).
- Shared image source logic is in [src/utils/imageFormats.js](../src/utils/imageFormats.js).
- Build chunking and test environment config are in [vite.config.js](../vite.config.js).

## Conventions That Matter

- Keep route behavior intact, including legacy writing redirects (`/writing/:storyId` -> `/expertise/:storyId`) defined in [src/App.jsx](../src/App.jsx).
- For content/project images, use modern source sets via `getModernImageSources(...)` from [src/utils/imageFormats.js](../src/utils/imageFormats.js) and keep compatibility assets (favicons/manifest icons) in `public/`.
- For animation-heavy edits, preserve current performance approach: avoid unnecessary main-thread work, and follow existing GSAP patterns in [src/pages/AnimatedHomePage.jsx](../src/pages/AnimatedHomePage.jsx) and [src/components/VerticalTimeline.jsx](../src/components/VerticalTimeline.jsx).
- Keep Netlify SPA fallback redirect behavior in [netlify.toml](../netlify.toml).

## Performance and Accessibility

- Treat performance as a core requirement for UI changes.
- Before finalizing significant frontend changes, verify with `npm run build` and `npm run preview`, and run `npm run audit:lighthouse` when the change could affect rendering/loading.
- Maintain semantic HTML and keyboard-accessible interactions in React components.

See [PERFORMANCE_OPTIMIZATION](../PERFORMANCE_OPTIMIZATION.md) for optimization rationale and known pitfalls.

## Testing Guidance

- Use Vitest + Testing Library patterns already configured in [src/test/setup.js](../src/test/setup.js).
- Prefer behavioral tests over implementation-detail assertions.

## Documentation

- Link to existing docs instead of duplicating long explanations:
  - [README](../README.md)
  - [QUICK_START](../QUICK_START.md)
  - [PERFORMANCE_OPTIMIZATION](../PERFORMANCE_OPTIMIZATION.md)
