# Architecture, tooling and deployment

How the publication is built, as of 2026.10.20. The earlier version of this file (dated notes, including how some of these pieces came to be) is in `history.md` under "Superseded: architecture.md".

## Tooling

- **Package manager is pnpm.** `pnpm-lock.yaml` and `pnpm-workspace.yaml` exist and `README.md` says the same. `npm run <script>` works (it only runs `package.json` scripts), but never `npm install`: it re-resolves the whole tree against a pnpm lockfile, slowly and wrongly.
- **`ERR_PNPM_IGNORED_BUILDS`** comes from a dependency with a native build script (for example `sharp`). `pnpm approve-builds` needs a TTY; the non-interactive fix is an entry in `pnpm-workspace.yaml`'s `allowBuilds:` map (`sharp: true` is already there).
- **Node 24** (Netlify uses `NODE_VERSION=24`). Several build scripts import `.ts` files directly with Node's type stripping, so those files can't use syntax it can't erase (enums, parameter properties).
- **No test suite, no lint.** `pnpm run check` (svelte-check) is the only automated check, with a known baseline of three errors (`vite.config.ts` theme type, `admonitions.ts`, `heading-anchors.ts`). A broken internal link or `#id` only shows up in `pnpm run build`, because `adapter-static` runs with `strict: true`.

## Stack and theme registration

The publication is a [SveltePress](https://sveltepress.site/) site (SvelteKit plus SveltePress's markdown pipeline) with a **fully custom theme** in `src/lib/theme/`. Only SveltePress's layout ideas survive (sticky navbar, sidebar, on-this-page rail, prev/next links); every component and style is the Commonway System's own. `@sveltepress/theme-default` is not installed, so its features (search, GA option) are not available and were built by hand.

`vite.config.ts` calls `commonwayTheme({...})` (`src/lib/theme/index.ts`) and passes it to the `sveltepress()` Vite plugin. The theme:

- sets `GlobalLayout.svelte` (wraps every route) and `PageLayout.svelte` (wraps every `+page.md`) as the layouts;
- registers the Shiki highlighter (`highlighter.ts`);
- runs remark plugins `remark-gfm`, `remark-directive` and `admonitions` (`:::note`, `:::tip`, `:::warning`, `:::danger`, `:::unsourced`);
- runs rehype plugins in this order: `rehype-slug`, `headingAnchors` (the "#" links), `externalLinks` (new tab, `nofollow`, icon and screen-reader text on every off-site link), `tableScroll` (wraps every markdown table in `.cw-table-wrap > .cw-table-scroll`), `linkCards` (adds images to `cw-links` cards). All five live in `src/lib/theme/markdown/`;
- exposes the theme options (site title, navbar, sidebar, GitHub and edit links, footer note, GA ID) as the virtual module `virtual:commonway/options`.

`vite.config.ts` also holds `devSearchIndex()`, which serves the last build's `build/pagefind/` at `/pagefind/` under `pnpm run dev`.

## Site structure

**Navbar** (`vite.config.ts`): Home, Guide, Patterns, Retrofits, Media, Reference (`/references/`), Blog, About.

**Sidebars** are a manual tree in `vite.config.ts`, keyed by route prefix; the sidebar for a page is whichever key its URL starts with. There are five keys:

- `/guide/`: Start Here (`/guide/`, ungrouped), then three groups. **Core Concepts**: How the Transportation Ecosystem Fits Together, Design Speed & Speed Limits, Induced Demand (Hoofdnet/Plusnet joins this group when it's written). **Using the System**: How to read a pattern, How to read a retrofit strategy, Scale Hierarchy, Street Types & Classifications, Density Tiers, Pattern IDs, Find Your Pattern (still a placeholder). **Make It Happen**: How Road Changes Actually Happen (with its companion page When Jurisdiction Doesn't Follow the Pattern), Legal & Planning Mechanisms, Funding & Financing Mechanisms, Decision & Evaluation Processes, Construction Methodology & The Build Spectrum. Guide page folders are flat under `src/routes/guide/` (except `make-it-happen/jurisdiction-variants/`); only the sidebar nests them. Start Here lists these pages by hand.
- `/patterns/`: the Pattern Index, then nine collapsible groups in Scale order: Network, Corridors, Local Streets, Collectors, Arterials, Freeways, Intersections and Crossings, Facilities, Elements. Pattern folders are `src/routes/patterns/{network,corridors,local-streets,collectors,arterials,freeways,intersections,facilities,elements}/<slug>/` (`network` is singular on purpose).
- `/retrofits/`: the Retrofit Strategy Index, then Network, Corridor and Intersection groups. Folders are `src/routes/retrofits/{network,corridor,intersection}/<slug>/`.
- `/about/`: three non-collapsible groups. **About**: Overview, Site Map, The Commonway System, Brand Guide. **Development**: Release History & Roadmap, Website Audit, Project Governance, Submit a Change, Report a Problem, Acknowledgments. **Terms and Policies**: Terms and Conditions, Privacy Policy, AI Policy, Accessibility Policy. Three titles don't match their folders, on purpose: Project Governance is `/about/governance/`, Submit a Change is `/about/contributing/`, Report a Problem is `/about/reporting/`. Use the titles when a page names them in prose.
- `/references/`: one non-collapsible group, **Reference**: Overview (`/references/`), Road Agency Directory (`/references/road-agencies/`). Added 2026.10.26.

`/media/`, `/blog/` and `/search/` have no sidebar key. The homepage has no sidebar or outline. `PageNav`'s prev/next links follow sidebar order, so moving a page in the sidebar moves it in prev/next too. On phones, the navbar's own links move into the sidebar drawer above the page tree. `src/lib/pattern-count.ts` counts pattern and Retrofit pages from the route folders; pages import those counts instead of hardcoding numbers.

**A new page is only reachable once it's in the sidebar** (and, for a pattern, on the Pattern Index; for a Retrofit, on the Retrofit index; for a Guide page, in Start Here). The build logs a `Site map:` warning for any page the navbar and sidebar don't reach.

**Moving a route folder** also means checking every `import.meta.glob` path that touches it (`pattern-count.ts`, `blog.ts`, `$lib/server/content.ts`, the Release History page), not just links.

## Layouts

**`GlobalLayout.svelte`** renders the navbar, sidebar, skip link, search dialog, cookie banner, Google Analytics, the pointer halo and reading ruler, sitewide JSON-LD (`Organization`, `WebSite`), and the three-column shell (sidebar, content, outline). Two routes change the shell: the homepage (`isHome`, `.shell--full`: one full-width column, no sidebar or outline) and `/media/` (`isMedia`, `.shell--media`: no sidebar, and the filter panel takes the outline's column). It also starts outline tracking, view transitions and the table scroll hints.

**`PageLayout.svelte`** wraps every `+page.md` in `<main id="main-content">` and renders:

- the head: title, description, canonical, robots, Open Graph and Twitter tags (default card `static/og/commonway-system-card.png` when there's no `image:`), alternate links to the page's `.md` and `.jsonld` copies, and the per-page JSON-LD;
- `PageHeader` (eyebrow, h1, and on Pattern and Retrofit pages the ID and status), unless `hideTitle: true` (only the homepage); `TocMobile` below 1180px, except on the homepage;
- the page content in `.cw-content` (46rem, or 88rem with `wide: true`, used by the homepage and `/media/`);
- the footer: edit link, "Last updated", text-only link, `ShareButtons`, `PageNav`, and the legal row (copyright, policies, Site Map, Report a Problem, Cookie settings);
- search markers for Pagefind (`data-pagefind-body`, filters, the Pattern ID), and the page's accent color (`data-accent`, from `page-header.ts`).

Frontmatter fields it reads: `title`, `description`, `date`, `llms`, `image`, `patternId`, `status`, `hideTitle`, `wide`, `utility` (noindex, no search entry, no text or markdown copy, left out of the sitemap and `llms.txt`; only `/search/` uses it).

## Build-time data

- **Root `+layout.server.ts`** runs git once per route at build time: `lastModified` and `lastModifiedISO` come from the last commit that touched that route's `+page.md` (never the file's mtime, which a fresh checkout resets), and `siteVersion` (the navbar's CalVer) from the last commit on `HEAD`, so rebuilding the same commit never changes the version. Under `pnpm run dev` the version is today's date.
- **`$lib/server/content.ts`** (`getSitePages()`) globs every `+page.md` and parses its frontmatter. It feeds `sitemap.xml`, `llms.txt`, the site map and the index pages' image maps. `$lib/theme/blog.ts` duplicates the glob for the Blog index on purpose, because client-reachable code can't import `$lib/server/*`.
- **Data records** (not pages): Media items in `src/lib/data/media/entries/`, changelog in `src/lib/data/releases.ts`, open items in `src/lib/data/roadmap.ts`, Pattern viewer drawings in `src/lib/data/street-configs/`, audit rows in `src/lib/audit.ts`.

## Endpoints

All prerender to static files; every one that nothing links to is listed in `svelte.config.js`'s `kit.prerender.entries`:

- `/robots.txt`, `/sitemap.xml` (with `image:image` entries), `/llms.txt`, `/rss.xml` (the Blog feed);
- `/.well-known/agent-skills/index.json`, `/.well-known/agent-skills/commonway-system/SKILL.md`, `/.well-known/ai-catalog.json`;
- static files in `static/`: `_headers`, `_redirects`, `security.txt`, `gpc.json`, `api-catalog`, `traffic-advice`, `tdmrep.json`, `manifest.webmanifest`, favicons.

The section labels in `llms.txt` come from `SECTION_LABELS` in `src/routes/llms.txt/+server.ts`; a new top-level section needs an entry there. Canonical URLs come from `SITE_URL` in `src/lib/site.ts`, which also holds `isExternalHref`/`externalLinkAttrs` (used wherever the theme renders a link from data rather than markdown) and the `markdownPath`/`jsonldPath` routing rules.

## Adapter and static constraints

`@sveltejs/adapter-static` with `strict: true` and `fallback: '404.html'` (rendered by `src/routes/+error.svelte`), output to `build/`. `src/routes/+layout.ts` turns on prerendering and trailing slashes. `svelte.config.js` also sets `inlineStyleThreshold: 100000` (all CSS inlined) and a `prerender.handleHttpError` that ignores 404s for `/text/`, `.md` and `/llms-full.txt` links, which only exist after the post-build scripts.

There is no server at runtime:

- A new `+server.ts` needs `export const prerender = true`, and an entry in `prerender.entries` if nothing links to it.
- **Redirects** go in `static/_redirects` (Netlify's format, `/old/ /new/ 301`); delete the retired route folder rather than leaving a stub. Neither `pnpm run dev` nor `pnpm run preview` reads that file; the only local check is that the rule reaches `build/_redirects`. One rule exists today: the retired Commercial Arterial page to Stroad.
- **Response headers** (CSP and the rest) live in `static/_headers`. Any new third-party host must be added to the CSP. Details: `website-audit.md`.

## After the Vite build

`pnpm run build` runs, in order: `scripts/generate-text-pages.mjs` (text-only pages, `.md` copies, `llms-full.txt`), `scripts/generate-agent-files.mjs` (`.jsonld` copies, `schemamap.xml`, the OKF bundle), `scripts/build-search-index.mjs` (Pagefind), `scripts/make-thumbs.mjs --check`. All four read the rendered HTML in `build/`, so anything a component renders reaches them automatically. Details: `search-and-text-pages.md` and `website-audit.md`.

## Analytics and structured data

- **Google Analytics** (`GoogleAnalytics.svelte`, ID in `vite.config.ts`) loads only in production builds and only after the reader accepts cookies (`consent.ts`, `CookieBanner.svelte`; Global Privacy Control counts as Decline). Never write a literal `<script` substring inside a Svelte `<script>` block: the compiler misreads it, so the tag text is built from pieces. Cloudflare Web Analytics is injected at the edge, not from this repo.
- **JSON-LD** is built from functions in `src/lib/theme/schema/` (typed with `schema-dts`) and rendered by `JsonLd.svelte`. Sitewide (`GlobalLayout`): `Organization` and `WebSite`. Per page (`PageLayout`): `BreadcrumbList` (sidebar group headers with no page of their own are skipped), plus `TechArticle` for Guide, Reference, Pattern and Retrofit pages (Pattern and Retrofit pages carry `identifier` from `patternId` and `about` a `DefinedTerm`), `CollectionPage`/`ItemList` for the Pattern and Retrofit indexes, `AboutPage`/`WebPage` for About, `Blog`/`BlogPosting` for the blog. `datePublished` is frontmatter `date`, `dateModified` is git's. `buildAuthorPerson()` in `organization.ts` is the one shared `Person` for Kevin Young: the Organization's `founder`, and the second `author` (after the Organization) on every article.

## Repo-root contributor files

`LICENSE` (MIT, code only), `CODE_OF_CONDUCT.md`, `.github/PULL_REQUEST_TEMPLATE.md` and `.github/ISSUE_TEMPLATE/*.yml` (factual-error, missing-citation, dead-link, accessibility-issue, `config.yml`) back `/about/contributing/`, `/about/governance/` and `/about/reporting/`, which link to them by GitHub URL; keep the pages and the files in step. The guidebook content is licensed separately (see `/about/contributing/` and `/about/terms-and-conditions/`), not under MIT. `THIRD-PARTY-NOTICES` holds license text for assets embedded directly rather than installed as packages (Lucide icons, Feather's MIT notice, the ColorSym symbols, and others); a new embedded asset gets an entry there, not in `LICENSE`.

## Deployment

Live at **commonwaysystem.org**. Cloudflare holds the domain and DNS and proxies traffic (SSL/TLS Full (strict), DNSSEC, CAA records, Crawler Hints, Early Hints, and a "Redirect-By on redirects" response header rule). Netlify hosts and builds from `netlify.toml` (`pnpm run build`, publish `build`, `NODE_VERSION=24`). The source is [github.com/Commonway-System/commonwaysystem.org](https://github.com/Commonway-System/commonwaysystem.org) (public), branch `main`. There is no staging site and no separate CI: a push to `main` is a publish. The push procedure is in CLAUDE.md.
