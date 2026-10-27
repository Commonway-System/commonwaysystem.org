# CLAUDE.md

The Commonway System is a street-design guidebook (patterns, Retrofit Strategies, a Guide and a Media Gallery), published as a static SveltePress site at commonwaysystem.org.
Kevin does all Commonway System work in Claude Code now: research, drafting, decisions and implementation. Planning no longer lives in a separate chat.

@docs/decisions.md

- Voice, page structure and editorial rules live on `/about/brand-guide/` (Voice attributes, Two kinds of page, Editorial standards, Citation format). Follow that page for all content; don't restate its rules here.

This file is a short index. Detail lives in `docs/engineering/` (read when relevant) and `.claude/rules/` (loads automatically when matching files are touched); see the pointer index at the end.

**Keeping these docs useful:** when something changes, update the doc that describes it in the same session, so each file says what is true now; move text that's no longer true into `docs/engineering/history.md` rather than deleting it. Put a new lesson in the most specific place: a rule file when it applies to certain paths, a `docs/engineering/` file when it's reference, CLAUDE.md only when every session needs it. Keep CLAUDE.md and each rule file under 200 lines. Before describing a component as used or unused, count its uses (a Python scan of `src/**/*.svelte` and `src/routes/**/*.md` for `<Name`; zsh breaks grep patterns like `<Name[ />]`).

## Commands

```sh
pnpm install       # NOT npm install, see below
pnpm run dev        # dev server, usually http://localhost:5173
pnpm run build      # static build to build/ (HTML/CSS/JS, no server needed at runtime), then in order: scripts/generate-text-pages.mjs (text-only pages in build/text/, a markdown version of every page at build/<route>.md, build/llms-full.txt), scripts/generate-agent-files.mjs (build/<route>.jsonld + schemamap.xml, the OKF bundle in build/okf/ + okf.tar.gz), scripts/build-search-index.mjs (Pagefind index in build/pagefind/), scripts/make-thumbs.mjs --check (warns about missing image thumbnails)
pnpm run preview    # serve build/ locally to sanity-check the static output
pnpm run check      # svelte-kit sync && svelte-check --tsconfig ./tsconfig.json
pnpm run thumbs     # make the small copies (160px and 480px WebP) of any new or changed content image, then COMMIT them
node scripts/qa/netlify-like.mjs build 5180          # serve the BUILT site like Netlify (applies static/_headers incl. CSP, gzip, 404.html); also preview_start "commonway-build"
node scripts/qa/qa.mjs http://localhost:5180 / /about/   # axe + console warnings (CSP, hydration) in light/dark at 1280 and 375; see the file header for --modes/--storage/--setup
python3 scripts/qa/check-headers.py                  # after a build: flags any header two _headers rules both set (Netlify merges them into invalid values)
```

- **pnpm, not npm**, for any dependency change (README is wrong). `ERR_PNPM_IGNORED_BUILDS` is fixed in `pnpm-workspace.yaml`'s `allowBuilds:`. Details: `docs/engineering/architecture.md`.
- **No test suite, no lint.** `pnpm run check` is the only automated check; its known baseline is three errors (`vite.config.ts` theme type, `admonitions.ts`, `heading-anchors.ts`). It doesn't catch visual regressions or broken internal links: run a real `pnpm run build` (adapter-static `strict: true` fails on any dead `#id` or route) after adding cross-linked pages.
- `qa.mjs` borrows puppeteer-core and axe-core from `/Users/kevinyoung/Documents/pro-how-com/scripts/qa/node_modules` and runs light and dark at 1280 and 375 by default. Lighthouse recipe and caveats: `docs/engineering/accessibility.md`.
- `pnpm run build` stops the dev server; `preview_start` again before browser checks. The shell is zsh: quote separators (`echo "---"`), no `timeout`, unmatched globs abort the command.
- **Images:** any time an image is added or replaced (`static/patterns/`, `static/media-assets/`, `static/photos/`, `static/diagrams/`, or a local `image:` in frontmatter), run `pnpm run thumbs` and commit the `thumbs/` files in the same session. Details: `docs/engineering/search-and-text-pages.md`.

## Standing rules

**Accessibility check on every change, of the WHOLE page it touches** (every page type, for a component or style change), however small. Full rule and the in-pane axe recipe: `docs/engineering/accessibility.md`.
1. axe on each touched page with tags `wcag2a, wcag2aa, wcag21aa, wcag22aa, best-practice`, light and dark, desktop and 375px (`qa.mjs` does all four). Zero violations, or fix it, or flag a real judgment call and record it in `/about/accessibility-policy/`'s Known limitations.
2. The mindset review axe can't do: heading order, alt text, link text, color never the only signal, real buttons/links with visible focus and 24x24 px targets, table headers, pause paths and reduced motion, `<details>` checked expanded, 375px, largest text size, high contrast, Simplified view, focus not hidden under sticky bars.
3. Compute contrast with the WCAG formula, don't eyeball it: 4.5:1 text, 3:1 UI and focus indicators, both themes.
4. Fix genuine failures directly; flag judgment calls. Don't bypass `PageLayout` (skip link, `<main>`, text-only build).
5. Keep `/about/accessibility-policy/` true and mention changes in that day's changelog entry.
6. Say in the final report what was checked and what wasn't. Never claim conformance. A full-site scan is reserved for the Website specification audit.

**Publishing.** A push to `main` is a publish (Netlify builds on push; no staging). Before pushing: look at `git status`, `git diff --stat` and `git log origin/main..HEAD` for other sessions' work; `pnpm run build` green; one change per item added to today's entry in `src/lib/data/releases.ts` (format: `.claude/rules/releases.md`), including a line for every unpushed commit from other sessions, and with any entries those commits filed under an earlier, unpublished date moved to today's (the changelog date is the publish date); the standing accessibility check also covers those sessions' pages; the build note doubles as the commit message, ending with the attribution line the session's system reminder gives. Historical changelog entries stay as written.

**Push procedure.** `origin` is HTTPS and needs `GITHUB_TOKEN` from `.env` (gitignored; never echo it or print `.env`):
`TOKEN=$(grep '^GITHUB_TOKEN=' .env | cut -d= -f2-); git -c http.extraheader="Authorization: Basic $(printf 'x-access-token:%s' "$TOKEN" | base64)" push origin main`

**Working conventions** (full text: `docs/engineering/conventions.md`):
- Don't commit or push until Kevin asks. He often answers "Not yet" and keeps adding work; keep it uncommitted and add each piece to the same day's changelog entry.
- Verify UI changes in a real browser (light, dark, a narrow width) before calling them done; `check` won't catch visual problems.
- Verify a claim (a spec's, a spoken one, or your own memory) against the current files or sources before acting on it.
- Links: report 403s, timeouts and dead links as findings; never swap a link silently. Curl 403s from NACTO, AASHTO, SWOV and highways.dot.gov are bot walls; confirm in the Browser pane. Never get past a bot check.
- Fix genuine bugs and contrast failures directly; flag content and design judgment calls to Kevin.
- After drafting content from any written instructions, re-read the rendered page for sentences addressed to Claude rather than to a reader (leaked meta-notes).
- Work now arrives as direct requests or through `/guide-page`, not as tickets from a separate chat. Past ticket lessons are in `docs/engineering/history.md`.

## Architecture essentials

- **SveltePress (SvelteKit) with a fully custom theme** in `src/lib/theme/`, registered from `vite.config.ts` via `commonwayTheme()`. Pages are `src/routes/**/+page.md` (frontmatter + markdown + Svelte). Brand tokens live only in `src/lib/theme/styles/tokens.css`.
- **Top-level structure:** Home / Guide / Patterns / Retrofits / Media / Reference / Blog / About, matching the navbar in `vite.config.ts`. Guide sections: Core Concepts, Using the System, Make It Happen; `/guide/` is Start Here, the front door to the whole publication.
- **The sidebar is a manual tree in `vite.config.ts`** (keyed by route prefix), not generated from the routes folder. A new page needs a sidebar entry (and, for a pattern, a card in `src/routes/patterns/+page.md`; for a Guide page, a line in Start Here), or it's unreachable. `PageNav` prev/next follows sidebar order. The build logs a `Site map:` warning for any page the sidebar misses.
- **Shared counts:** `src/lib/pattern-count.ts` exports `patternPageCount` and `retrofitStrategyCount`. Never hardcode either number in a page.
- **Static-site constraints:** `adapter-static`, `strict: true`, everything prerenders; no server at runtime. A new `+server.ts` needs `export const prerender = true` and, if nothing links to it, an entry in `svelte.config.js`'s `kit.prerender.entries`. Redirects go in `static/_redirects` (only testable once deployed). New third-party hosts must be added to the CSP in `static/_headers`. "Last updated" and the navbar version come from git at build time.
- **Every page gets a text-only copy (`/text/...`), a markdown copy (`<route>.md`), JSON-LD and a search entry automatically**, generated from the rendered HTML after the build; none of these exist under `pnpm run dev`. Data rendered as one page's list (Media items, road agencies) is not indexed from that page: it needs its own Pagefind records in `scripts/build-search-index.mjs` and a branch in `schema/page.ts` (checklist: `docs/engineering/search-and-text-pages.md`, "four places").
- Deployment: Cloudflare (DNS, SSL Full strict) in front of Netlify (`netlify.toml`, Node 24); repo `github.com/Commonway-System/commonwaysystem.org`, branch `main`.

## The `guide-page` skill

Use `/guide-page <route or topic> [new]` for any new Guide or About page, or any substantial rewrite of one. It holds the full workflow (diagnose and propose, stop for Kevin's answers, research every source, draft with a review notes file, revise, close out). File: `.claude/skills/guide-page/SKILL.md`.

Use `/add-agency <agency and state>` to research and add or recheck a Road Agency Directory entry (`.claude/skills/add-agency/SKILL.md`). It also has the recipe for bulk runs (a whole state's cities and towns) and the phone-only exception for towns with no website.

## Pointer index

Locked decisions and source rules: `docs/decisions.md` (imported above). Open items: `src/lib/data/roadmap.ts`.

`docs/engineering/` (read when the topic comes up):
- `architecture.md`: tooling notes (pnpm), theme registration, tables, site structure and sidebars, adapter, redirects, last-updated and CalVer, llms.txt/robots/sitemap, Google Analytics, JSON-LD, repo-root contributor files, deployment.
- `components.md`: the domain and layout components (cards, chips, Citation, navbar, share buttons, icons), the Speed & Modal Hierarchy card, GuideDiagram and AuthorPhoto.
- `homepage.md`: the homepage sections, the permanently dark full-bleed hero, the ink-halftone canvas.
- `accessibility.md`: the accessibility rule in full, the in-pane axe recipe and its gotchas, qa tools and Lighthouse, the 2026.09.26 audit, skip link, Display settings, text-only pages, the Accessibility Policy.
- `search-and-text-pages.md`: thumbnails rule in full, markdown copies for AI readers, Pagefind search, the human site map, featured images and thumbnails.
- `website-audit.md`: the specification.website audit, headers and CSP, consent, head metadata, endpoints, robots policy, 404, performance, schemamap/OKF/AI catalog, Cloudflare settings.
- `known-gaps.md`: deliberately unresolved items; raise them with Kevin rather than deciding.
- `conventions.md`: working conventions in full.
- `history.md`: dated session notes and past ticket lessons, including the old Roadmap sync note.

`.claude/rules/` (load automatically for the paths named in each file's frontmatter):
- `content-pages.md` (`src/routes/**/*.md`): links as `[text](url)`, images as raw `<img>`, nested-component and one-line-tag gotchas, content model, self-reference terms, page polish markup, link card images.
- `citations.md` (`src/routes/**/*.md`): References list mechanics, the link-out audit, link-checking false positives.
- `guide.md` (`src/routes/guide/**`): Guide sections, shared counts, the retrofit sample card, rewritten pages.
- `theme.md` (`src/lib/theme/**`): brand token rules (teal vs primary, fixed tokens, amber reserved, ramps).
- `patterns.md` (pattern routes and pattern components): Pattern ID scheme, Pattern Index, citations, status badges, Related patterns, GuidanceTable.
- `retrofits.md` (retrofit routes and components): IDs, the index card grid, the strategy page template, Getting there sections.
- `media.md` (media data, routes, assets, components): the MediaItem schema, adding items, batch recipes, Related Media carousel, Gallery filters.
- `releases.md` (`releases.ts`, `roadmap.ts`, Release History): changelog format, the Roadmap data file, the launch-entry count bug.
- `pattern-viewer.md` (viewer code and street configs): the Pattern viewer's data model, renderers, art, choices within a layer.
