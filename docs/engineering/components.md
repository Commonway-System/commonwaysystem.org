# Theme components

What each component in `src/lib/theme/components/` renders and where, as of 2026.10.20. Components a page can import are exported from `index.ts`. The earlier version of this file is in `history.md` under "Superseded: components.md".

`PatternCard` and `RetrofitCard` (the old ID cards) were removed on 2026.10.20. No page or component had used them since 2026.10.18, when `PageHeader` became the ID card. Their CSS hooks (`.pattern-card`, `.retrofit-card`) are gone too, and `generate-agent-files.mjs` now reads a pattern's status from `.page-head .status-badge`.

Big feature areas have their own notes: the Pattern viewer (`.claude/rules/pattern-viewer.md`), Media (`.claude/rules/media.md`), search and the site map (`search-and-text-pages.md`), Display settings (`accessibility.md`), the homepage (`homepage.md`).

## Page shell

- **`GlobalLayout`** and **`PageLayout`**: the two layouts. See `architecture.md`.
- **`PageHeader`**: rendered by `PageLayout` for every page with a `title`. A tinted band with the eyebrow (navbar section plus sidebar group, from `page-header.ts`) and the `h1`. On Pattern and Retrofit pages it is also the **ID card**: frontmatter `patternId` and `status` sit in its top row (with a Color symbols tab when that setting is on), and the page's first paragraph, the one-sentence summary, joins the band through CSS. Documentation samples (How to Read a Pattern, How to read a retrofit strategy, the Brand Guide) use `<PageHeader demo accent="..." summary="..." ... />`, which draws the title as a `p` so a sample never adds a second `h1`. The Pattern ID is always ink-colored, never the classification color.
- **`Navbar`**: logo, primary links, version, GitHub, `SearchButton`, `DisplaySettings` (the "Aa" button), `ThemeToggle`. Below 940px the primary links, search and Display settings move into the sidebar drawer, and the remaining items spread across the bar (`display: contents`, `space-between`, `flex-shrink: 0` so icons keep their tap size). Below 420px the version link is hidden. A `ResizeObserver` publishes the real height as `--cw-navbar-height`, which the sticky sidebar, outline and anchor offsets read.
- **`Sidebar`** and **`SidebarGroup`**: the sidebar tree for the current route prefix. Below 940px it is the drawer and also holds the navbar's links, a Search button and a Display settings disclosure. It stays mounted on the homepage, where it is hidden at desktop widths. **`Backdrop`**: the dimmed layer behind the open drawer.
- **`Toc`** (desktop "On this page", rendered by `GlobalLayout` on every page except the homepage and `/media/`) and **`TocMobile`** (the sticky bar below 1180px, rendered by `PageLayout` except on the homepage). Both read headings collected from the rendered page (`h2[id]`, `h3[id]`), so headings a component renders appear as long as they carry an `id`.
- **`PageNav`**: previous and next links, from sidebar order.
- **`ShareButtons`**: the "Share:" row in the footer: plain share-intent links (X, Facebook, LinkedIn, Reddit, Bluesky, email) and copy-link. No share SDKs (they would set third-party cookies). Its root is a `<span>` because it sits inside a `<p>`.
- **`Icon`**: inline SVG icons used by most shell components. `filled` draws brand marks (Facebook, LinkedIn, Reddit, Bluesky) as solid shapes; paths use `fill-rule="evenodd"` so the Reddit mark's eyes show as holes.
- **`JsonLd`**, **`GoogleAnalytics`**, **`CookieBanner`**: structured data, consent-gated analytics, the cookie banner. See `architecture.md` and `website-audit.md`.
- **Search**: `SearchButton`, `SearchDialog` (in `GlobalLayout`), `SearchPanel` (in the dialog and on `/search/`). **`SiteMap`**: `/about/sitemap/`.
- **Reader settings**: `DisplaySettings` (navbar popover) and `DisplaySettingsPanel` (its contents, also mounted in the drawer, so every radio name and id carries `$props.id()`), `PointerHalo`, `ReadingRuler`, `ThemeToggle`.

## Content components used on pages

- **`Citation`**: numbered badge, `<Citation index={N} />`, linking to `#ref-N` (override with `href`). Every page's References list needs a matching anchor: `N. <span id="ref-N"></span>...`. A missing target fails the build (`strict: true`), so a badge with no real reference list behind it needs `href="#"`. `<Citation unsourced />` is the amber unsourced-claim flag. The visible pill is small (12px), with a transparent border that gives it a 24px tap area. Used on about 150 pages, and inside `PatternViewer`, `GuidanceTable` and `HomeTrust`.
- **`EvidenceChip`**: `tier="legal | evidence | precedent"`, placed first in each References entry, right after the `ref-N` anchor (`N. <span id="ref-N"></span><EvidenceChip tier="..." /> Source text`). Small (11px) on purpose.
- **`IdPill`**: a Pattern or Retrofit ID in prose, `<IdPill id="LOC-DEF-01" />`. Draws the ID as a pill with a classification-colored dot and keeps the parentheses for screen readers and text copies. Used in Related patterns lists and prose on about 130 pages.
- **`StatusBadge`**: the status pill, `recommended | situational | avoid | descriptive` (labels: Recommended, Situational / Discouraged, Avoid, Descriptive). Recommended is a neutral pill, Situational amber, Avoid rose. Never used directly on a page: `PageHeader`, `PatternIndexCard` and `HomeCompare` render it.
- **`DensityChip`**: an Undeveloped to Core density-tier chip, on its own neutral tan ramp rather than the classification ramps (a site-only choice; see `known-gaps.md`). On about 50 pages.
- **`PatternIndexCard`**: a card on the Pattern Index (`/patterns/`), the homepage pattern shelf and the Brand Guide. Props `href`, `id`, `title`, `classification` (the nine Scale values), optional `status` (`situational | avoid | descriptive`; Recommended shows no badge here), `image` (an override; by default the image comes from the target page's frontmatter via `page.data.pageImages`, falling back to the tinted placeholder), and `showNumber` (default true; the number comes from the ID's last two digits, and the homepage turns it off).
- **`RetrofitIndexCard`**: the same card for the Retrofit Strategy Index (`/retrofits/`) and the Brand Guide, with `scale` (`corridor | intersection | network`) instead of `classification` and never a status. Intersection strategies use the Intersections & Crossings colors, Corridor and Network strategies use the Corridor and Network colors.
- **`SpeedModalHierarchyCard`**: the "Speed & Modal Hierarchy" box on automobile-allowing Local, Collector and Arterial patterns (and a modal-only version on four car-free patterns), about 29 pages including How to Read a Pattern. Its children:
  - **`SpeedLimitSection`**: `speeds` (one **`SpeedLimitSign`** per value, a black-on-white R2-1 sign in both themes), `guideLink` (default true: a link to Design Speed & Speed Limits; false on the three Default pages), `stacked` (Arterial pages, and Rural Collector, which puts a **`SpeedTerrainTable`** inside it).
  - **`ModalHierarchySection`**: `classification` and `rows` (`{ label?, tiers }[]`, each tier a mode or an array of tied modes); with neither it's plain prose (Stroad). It renders **`ModalHierarchyRow`**, which renders **`ModalHierarchyPill`** (five Lucide icons, pedestrian, bicycle, transit, vehicle, freight, on the classification color; text color from `--cw-*-pill-fg`). The Brand Guide shows a `ModalHierarchyRow` on its own.
  - Markdown rules for these tags: write their content flush left (four spaces of indent turns it into a code block), and never put a blank line directly before a tag with an object or array prop. See `.claude/rules/content-pages.md`.
- **`GuidanceTable`**: "Layered guidance across sources", on Collector Default, Rural Collector and Industrial Collector. See `.claude/rules/patterns.md`.
- **`PatternViewer`** and its parts (`PatternViewerTabs`, `PatternViewerStage`, `PatternViewerControls`, `PatternViewerSection`, `PatternViewerPlan`, `PatternViewerPending`): the viewer on every Pattern and Retrofit page and the two How to Read pages. `PatternViewerSection` is also drawn on its own by `HomeCompare` and `StreetBeforeAfter`. See `.claude/rules/pattern-viewer.md`.
- **`RelatedMedia`**, **`MediaGallery`**, **`MediaFilters`**, **`MediaFilterList`**, **`MediaCard`**: Media. See `.claude/rules/media.md`.
- **`GuideDiagram`**: a full-width diagram, on five Guide pages (Density Tiers, Design Speed, Induced Demand, Scale Hierarchy, Street Types) and the Brand Guide. `src` and `alt` are required; `width`/`height` (real pixel size, so the browser reserves space), `aspectRatio`, `caption` (wraps it in `<figure>`) and `priority` (eager loading and `fetchpriority="high"`, for a diagram that opens its page) are optional. Images under `/diagrams/` get a 768/1280 WebP `srcset`. The global `img { max-width: 100%; height: auto }` rule keeps the attributes from stretching the image.
- **`AuthorPhoto`**: text with a square-cropped photo beside it, used once on `/about/commonway-system/`. Takes `src`, `alt`, optional `caption`, and page content as children (plain markdown inside it, including links, works). Uses the 160/480 thumbnails and a container query to stack.
- **`ExampleCard`**: a framed "example" box for live samples, on the two How to Read pages and the Brand Guide (`label`, `tone`: `neutral | good | avoid`).
- **`BlogIndex`** (`/blog/`), **`Changelog`** and **`Roadmap`** (`/about/release-history/`), **`WebsiteAudit`** (`/about/website-audit/`): each renders one page's list from data.

## Brand Guide only

`Button`, `ColorSwatch`, `ColorSymbolKey`, `FormControlsPreview` (a decorative mockup, not wired to anything), `LogoPreview` and `TypeSample` appear only on `/about/brand-guide/`.

## Homepage only

`Hero` (with `InkHalftone` and `StreetBeforeAfter`), `HomeSection` (the shared band wrapper) and the eight `Home*` sections. See `homepage.md`.
