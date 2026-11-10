---
paths:
  - "src/lib/theme/components/SearchPanel.svelte"
  - "src/lib/theme/components/RoadAgencyDirectory.svelte"
  - "src/lib/theme/components/MediaGallery.svelte"
  - "src/lib/theme/components/PatternViewer.svelte"
  - "src/lib/theme/components/GlobalLayout.svelte"
  - "src/lib/theme/components/PageLayout.svelte"
  - "src/lib/theme/components/TocMobile.svelte"
  - "src/lib/viewer/state.ts"
---

# State kept in the URL (SvelteKit 3)

Search, the Road Agency Directory, the Media Gallery and the Pattern viewer mirror their controls into the query string. The site moved to SvelteKit 3 on 2026.11.10, and three things about that bit the same day.

- **Write the URL with `goto(url, { shallow: true, replace: true, state: page.state })`**, followed by `.catch(() => {})`. `replaceState` from `$app/navigation` is deprecated. The shallow `goto` adds no history entry, runs no `load`, and doesn't move scroll or focus. It returns a promise and never throws synchronously, so a `try/catch` around it catches nothing.
- **A shallow `goto` does not change `page.url`** (it changes `page.state` and `page.shallow`). Decide whether a write is needed by comparing with `location.search`, inside `untrack()`, never with `page.url`. An effect that compared against `page.url` rewrote the address in an endless loop on `/search/`.
- **Read the starting state from `location`, not `page.url`.** After Back into a page whose address was rewritten, `page.url` is the address the page was first opened at, so a component that reads it on mount wipes the reader's query and filters.
- **A shallow `goto` fires `beforeNavigate`, `onNavigate` and `afterNavigate`** with `type: 'goto'` and `shallow: true`. Every such hook must return early for that case, or each keystroke in a filter starts a view transition, closes the search dialog and re-collects headings. The guards are in `GlobalLayout`, `PageLayout`, `TocMobile` and `RoadAgencyDirectory`; a new hook needs the same one.
- **Test by using the page.** `pnpm run check`, the build and axe all passed with the loop present. After touching any of this, build, serve with `netlify-like.mjs` and run `node scripts/qa/clicks.mjs` (file header has the details).
