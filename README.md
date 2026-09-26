# Commonway System publication

This repository holds the source code and content for the Commonway System
guidebook, published at [commonwaysystem.org](https://commonwaysystem.org/).
It's a working SveltePress site running a fully custom "Commonway" theme:
the same layout shell people like about SveltePress's default theme
(sticky navbar, collapsible sidebar, on-this-page rail, prev/next footer),
rebuilt from scratch with Commonway System branding and a set of
CS-specific components (Pattern ID card, Retrofit Strategy card, density
tier chip, citation badge, evidence-tier chip, Media Gallery, plus the
Brand Guide preview components: color swatch, logo preview, example card,
button, form controls preview, type sample). It also has search across every page,
a display-settings panel (text size, contrast, simplified view), a
plain text-only version and a markdown version of every page, and a
human-readable site map.

## Who this file is for, and what running it locally actually does

This file walks through getting a **local copy** of the publication running on
your own computer. A local copy means your computer builds and serves its
own private version of commonwaysystem.org, visible only to you, that
matches whatever files are in this repository at that moment.

You don't need to be a professional developer to follow these steps. This
project welcomes contributions from urban planners, engineers, and anyone
with relevant subject-matter expertise, not just coders. A working local
copy is how anyone, technical or not, previews their own edits before
submitting them.

**Why you'd want this:** every page in the published guidebook, pattern
pages, retrofit strategies, guide chapters, is a plain text file in this
repository. If you want to fix something or add content, you edit that
file, use your local copy to see exactly how your change will look on the
real publication, and then submit your edited file back to the project as a
**pull request**, a formal request asking the maintainers to review your
change and merge it into the live publication. Setting up a local copy is the
first step in that process for everyone, regardless of technical
background.

### If you've never used Git or GitHub before

Git and GitHub are the tools this project uses to track changes and let
people propose edits. Two terms worth knowing going in:

- **Fork:** your own personal copy of this repository on GitHub, which you
  edit freely without affecting anyone else's copy or the live publication.
- **Pull request:** once you've made changes in your fork, this is how you
  formally propose merging them into the real project.

GitHub's own guides on [forking a repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo)
and [about pull requests](https://docs.github.com/en/pull-requests/collaborating-on-pull-requests-with-code-quality-features/about-pull-requests)
cover the actual click-by-click steps better than this file could. Once
you have your own fork, the instructions below pick up from there:
downloading a copy of your fork onto your computer (this is what "running
it locally" means), then starting it up.

## Requirements

- **Node.js 24 or later.** Node.js is the runtime this project's code runs
  on (Netlify builds the live publication with Node 24, and the build's
  helper scripts rely on Node 24's built-in TypeScript support).
  [Download it here](https://nodejs.org/) if you don't already have it.
- **pnpm.** This project's package manager (a tool for downloading and
  managing the code libraries the project depends on), similar to npm but
  faster. The lockfile in this repo (`pnpm-lock.yaml` /
  `pnpm-workspace.yaml`) requires pnpm specifically, not npm. If you
  already have Node.js, install it with `npm install -g pnpm`; otherwise
  see [pnpm's own install guide](https://pnpm.io/installation).

## Running it locally

```sh
pnpm install
pnpm run dev
```

`pnpm install` downloads everything this project's code depends on. You
only need to run it once, or again later if those dependencies change.
`pnpm run dev` starts your local copy; leave it running in its own
terminal window while you work, it automatically updates to reflect any
file you edit and save.

Then open the URL it prints (usually `http://localhost:5173`).

Other commands you may need:

```sh
pnpm run check     # type-checks the Svelte and TypeScript code
pnpm run build     # the full static build, described below
pnpm run preview   # serves the build/ folder locally to sanity-check it
pnpm run thumbs    # makes small copies of new or changed images (see "Adding images")
```

You don't need `pnpm run build` to contribute content: `pnpm run dev` above
is enough to preview any edit. The build matters mainly to maintainers doing
a real deploy. It writes plain HTML/CSS/JS to `build/`, no server required
at runtime, then runs three more steps: it writes a plain **text-only** version
of every page (`build/text/`) and a **markdown** version of every page
(`build/<page>.md`, plus `build/llms-full.txt`), builds the **search index**
(`build/pagefind/`), and checks that every image has its small copies. Any
static host works; this publication currently deploys via Netlify, triggered
automatically on push to GitHub.

Because those extra steps happen after the main build, the text-only pages,
the markdown files, and (until you have run a build once) search do not exist
under `pnpm run dev`. Links to them will 404 there, which is expected. After
one `pnpm run build`, the dev server serves that build's search index, so
search works while you edit (results lag your latest edits until the next
build).

## Project structure

```
src/
  routes/                     Every page. A folder = a URL segment.
    +layout.svelte            Root layout. Deliberately minimal, SveltePress
                               wraps this in the theme's GlobalLayout.
    +layout.ts                Turns on prerendering and trailing-slash URLs.
    +layout.server.ts         Build-time data for every page: the "Last
                               updated" date and the navbar version.
    +page.md                  Home page.
    guide/                    Guide chapters, one folder per page
                               (Foundations, Find Your Pattern, Make It Happen).
    patterns/+page.md         Pattern Index (bare root).
    patterns/<scale>/<slug>/+page.md
                               Pattern pages, nested by Scale/classification.
                               Add new ones the same way: a folder with a
                               +page.md inside it.
    retrofits/+page.md        Retrofit Strategy Index (bare root).
    retrofits/<scale>/<slug>/+page.md
                               Retrofit Strategy entries, nested by Scale.
    references/+page.md
    media/+page.md            Media Gallery: filterable/sortable index of
                               external videos, podcasts, and articles.
    blog/                     Dynamic index (BlogIndex.svelte) plus one
                               folder per post.
    search/+page.md           The full-page search (also opens as a dialog
                               from the header). A "utility" page: see below.
    about/                    Overview, Site Map, The Commonway System, Brand
                               Guide, Release History (changelog and live
                               Roadmap), Contributing, Governance, Reporting,
                               Acknowledgments, and the Terms, Privacy, AI, and
                               Accessibility policies.
    about/sitemap/            The human site map, built from the sidebar and
                               every page at build time (+page.server.ts).
    llms.txt/+server.ts       Generates llms.txt from every +page.md's
                               frontmatter at build time. See below.
    robots.txt/+server.ts     Blanket-allow robots.txt, also build-time.
    sitemap.xml/+server.ts    The XML sitemap for search engines.

  lib/
    site.ts                   SITE_URL and shared link helpers.
    thumbs.ts                 The naming rule for small image copies.
    server/content.ts         Reads every +page.md's frontmatter at build
                               time (llms.txt, sitemap, page images).
    server/sitemap-tree.ts    Builds the human site map.
    data/media/               Media Gallery items: one small TypeScript
                               file per item in entries/, schema in types.ts.
    theme/                    The theme itself. You will rarely need to
                               touch this once the visual direction is set.
      index.ts                Theme entry point (the SveltePress contract).
      config.ts               TypeScript shape of the theme's options.
      layout.ts               Svelte stores (sidebar open/closed, dark mode).
      display-settings.ts     The Display settings panel's saved choices.
      search.ts               Client side of site search (loads the index).
      search-meta.ts          Search filter values (section, pattern type).
      highlighter.ts          Code block syntax highlighting (Shiki).
      schema/                 JSON-LD structured data, built per page.
      markdown/               admonitions.ts (:::note etc.), heading-anchors.ts,
                               external-links.ts, table-scroll.ts.
      styles/
        tokens.css            *** Brand control panel. Colors, type, spacing,
                               all as CSS variables. Start here for any
                               visual change. ***
        base.css              Base element styles and content typography,
                               built from the tokens above, plus the Display
                               settings modes.
      components/             Layout shell (GlobalLayout, PageLayout, Navbar,
                               Sidebar, Toc, TocMobile, PageNav), search
                               (SearchButton, SearchDialog, SearchPanel), the
                               Display settings panel, the site map, the
                               Commonway-specific components (Pattern and
                               Retrofit cards, Citation, EvidenceChip,
                               DensityChip, GuidanceTable, the Speed & Modal
                               Hierarchy card, Illustration, Media Gallery
                               pieces, homepage sections), and the Brand Guide
                               preview components. One file per component;
                               index.ts lists the ones pages can import.

scripts/                      Build helpers run by `pnpm run build`:
                               generate-text-pages.mjs (text-only and markdown
                               versions), build-search-index.mjs (search),
                               make-thumbs.mjs (`pnpm run thumbs`).

static/                       Files served as-is: logos, favicons, diagrams,
                               pattern illustrations (patterns/), media
                               previews (media-assets/), and the small copies
                               in each thumbs/ folder. _redirects and
                               _headers are Netlify's own rules files.

vite.config.ts                 Publication content lives here: navbar links, the
                                manual sidebar tree, GitHub link, edit-link
                                template. This is the file you edit most.
```

_(This tree reflects what the publication's own changelog at
`/about/release-history/` records as built. If you're checking exact file
names or paths for something you're about to edit, confirm against the
actual repo, this section is a map, not a guarantee.)_

If you're only here to edit page content, not code, you mainly need the
"Editing content" section right below, not the rest of this structure.

## Editing content

Every page is a `+page.md` file with YAML frontmatter:

```md
---
title: Page Title
description: Optional, used for the meta description tag.
llms: Optional, a one-sentence plain-language summary used in llms.txt.
llmsOptional: false # true lists this page under llms.txt's "## Optional" section instead
date: 2026-01-31 # first publish date, used in the page's structured data
image: /patterns/example.png # optional featured image, see "Adding images" below
---

Regular markdown. Tables, code blocks, and GitHub-flavored markdown
(checklists, strikethrough) all work.
```

The page's `<h1>` is rendered automatically from `title`, don't repeat it
as a `# Heading` in the body, that duplicates it.

`llms` falls back to `description`, then `title`, if omitted. See
"llms.txt, sitemap, and markdown versions" below. Pattern and Retrofit
Strategy pages also carry a `patternId` (for example `LOC-BBG-12`). A utility
page such as `/search/` sets `utility: true`, which keeps it out of the search
index, the sitemaps, and the text-only and markdown versions.

Admonition blocks:

```md
:::note
A neutral callout.
:::

:::tip
Positive/encouraged guidance.
:::

:::warning
Caution, e.g. the "Avoid" pattern for stroads.
:::

:::danger
Stronger than warning, same idea.
:::

:::unsourced
Flags a claim that still needs a citation. Always renders in the reserved
amber, regardless of the surrounding content, so it stands out during
drafting and is easy to grep for before publication.
:::
```

Using the CS-specific components inside a page (add the `<script>` import
at the top of the `.md` file, SveltePress lets Svelte run inside
markdown). You don't need to understand Svelte deeply to do this, copying
the pattern from an existing page of the same type is normally enough:

```svelte
<script>
  import { PatternCard, DensityChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id="LOC-BBG-12" title="Bicycle Boulevard" classification="local">
  One or two sentence summary of the pattern.
</PatternCard>

Applies at: <DensityChip tier="Urban" />

A cited claim.<Citation index={1} />
```

`classification` accepts `local`, `collector`, `arterial`, `freeway`,
`intersections`, `network`, `corridor`, `facility`, or `element`, and
controls the card's accent color.

## Adding images

A page's featured image is one optional line of frontmatter, `image:`,
pointing at a file under `static/` (for example
`image: /patterns/loc-aly-02-alley.png`). That single line is what the
Pattern Index and Retrofit Index cards, the search results, the social-share
preview, and the page's structured data all use. A page with no `image:` shows
a placeholder on its card, and no thumbnail in search unless it is a Pattern,
Retrofit Strategy, blog post, or Media item (those always show one).

The full-size illustrations are large (about 1 MB each), so search results and
cards show small copies instead. **Whenever you add or replace an image, run:**

```sh
pnpm run thumbs
```

then include the new files in the `thumbs/` folders next to your image in your
commit. It only makes the copies that are missing or out of date, so it is safe
to run any time. If you forget, `pnpm run build` warns about the missing copy
and the publication falls back to the full-size image, which works but loads
slowly.

Media Gallery previews are saved with the publication (`static/media-assets/`),
never loaded from another website's servers.

## Editing navigation and sidebar

Open `vite.config.ts`. The `commonwayTheme({...})` call at the top is the
single source of truth for:

- `navbar`: top nav links
- `sidebar`: manual sidebar, keyed by route prefix (e.g. everything under
  `/guide/` uses the `'/guide/'` entry). Each entry is `{ title, to }` for a
  link, or `{ title, items, collapsible }` for a group. Nest groups as deep
  as you need.
- `github`, `editLink`, `footerNote`, `siteTitle`, `logoText`

The sidebar shown for any page is whichever key in `sidebar` the current URL
starts with, same idea as SveltePress's own default theme.

## Editing the brand

Everything visual is a CSS custom property in
`src/lib/theme/styles/tokens.css`. In particular:

- `--cw-local`, `--cw-collector`, `--cw-arterial`, `--cw-freeway`: the
  per-Functional-Classification colors used on Pattern ID cards and sidebar
  chrome, each backed by a full 6-tier density ramp (`--cw-local-undeveloped`
  through `--cw-local-core`, etc.) synced to the real Brand Guide palette.
  Every Scale prefix has its own real ramp: Network, Corridor, Local,
  Collector, Arterial, Freeway, Intersections & Crossings, Facility, and
  Element (nine in all, with hues placed in spectrum order and checked
  for colorblind separation; the colored text label beside every use is what
  carries the classification, never the color alone).
- `--cw-amber` / `--cw-amber-soft` / `--cw-amber-ink`: the reserved
  highlight color. Used only for pattern highlighting and the
  `:::unsourced` flag, never as a general UI accent, by design.
- `--cw-font-display` / `--cw-font-body`: Fraunces and Inter, loaded as
  self-hosted variable fonts via `@fontsource-variable/*` (no external font
  CDN).
- The `[data-theme='dark']` block at the bottom of the file is the dark-mode
  override for every token above.

## llms.txt, sitemap, and markdown versions

`src/routes/llms.txt/+server.ts`, `src/routes/robots.txt/+server.ts`, and
`src/routes/sitemap.xml/+server.ts` are SvelteKit endpoints, not static files.
`llms.txt` and `sitemap.xml` are built from every `+page.md`'s frontmatter
(`llms`, falling back to `description`, then `title`) at build time, via
`src/lib/server/content.ts`, so a new page appears in both automatically,
nothing to hand-maintain. `llms.txt` groups pages into `##` sections by their
top-level route folder (`/guide/` becomes "Guide", etc.); set `llmsOptional: true`
on a page's frontmatter to list it under the spec's reserved `## Optional`
heading instead, for lower-priority stub/placeholder pages a context-constrained
reader can skip. `robots.txt` is a blanket allow, since the whole guidebook is
public.

Every page also has a **markdown version** at the same path with `.md` on the
end (`/patterns/foo/` becomes `/patterns/foo.md`; the home page is
`/index.md`), and `build/llms-full.txt` holds the whole guidebook as one
markdown file. Both are written by `scripts/generate-text-pages.mjs` from the
already-built HTML, so components' content is included. `llms.txt` links to the
`.md` versions, and each page's `<head>` advertises its own. `static/_headers`
serves them as markdown and asks search engines not to index them.

Because `adapter-static` prerenders everything ahead of time, the endpoints
compile down to plain files in `build/`, same as any other route, no server
required at runtime. Nothing on the publication links to some of them, so they
are listed explicitly in `svelte.config.js`'s `kit.prerender.entries`, otherwise
the prerender crawler would never find them. The canonical domain used for
absolute URLs lives in `src/lib/site.ts` (`SITE_URL`).

## Search and the site map

Search is built on [Pagefind](https://pagefind.app/): the index is built at
the end of `pnpm run build` (`scripts/build-search-index.mjs`) and runs entirely
in the browser, so nothing a reader types is sent anywhere. Every page's main
content is indexed, plus one result per Media Gallery item. It opens from the
Search button in the header (or Ctrl/Cmd+K) and as the full page at `/search/`.

The human-readable site map at `/about/sitemap/` is generated at build time from
the navbar, the sidebar tree in `vite.config.ts`, and every page. A page that
is missing from the sidebar still appears, under "Other pages", and the build
prints a warning so you can add it to the sidebar.

## Contributor-facing files

`.github/PULL_REQUEST_TEMPLATE.md` and `.github/ISSUE_TEMPLATE/*.yml` back
the checklists and report categories described on `/about/contributing/`
and `/about/reporting/`; edit those pages and these templates together if
the process changes. `CODE_OF_CONDUCT.md` at the repo root backs the "Code
of conduct" sections on `/about/contributing/` and `/about/governance/`.

If you're new to contributing and not sure where to start beyond getting
this running, `/about/contributing/` is the canonical walkthrough for the
actual submission process, that's the page to check first, rather than
this file, for anything about the contribution process itself.

## License

Two different licenses cover two different things in this repository, since
GitHub's own license detector only surfaces one license per repo by
default:

- **Publication code** (Svelte components, theme configuration, build tooling,
  everything except the guidebook content itself): [MIT](LICENSE), matching
  SveltePress.
- **Guidebook content** (the pattern pages and prose under
  `src/routes/**/+page.md`, and the compiled Commonway System guidebook):
  licensed separately, not MIT and not a fully open license like Creative
  Commons. See the "Terms of contributing" section on
  `/about/contributing/` for the model, an entity-retains-rights,
  contributor-grants-a-license arrangement, the same way a publisher
  retains rights to a book that many people contributed research to.

## What's not built yet, and what's planned

This project's feature roadmap lives in one place: the live Roadmap
section on [`/about/release-history/`](https://commonwaysystem.org/about/release-history/)
(or `/about/release-history/` on your own local copy once `pnpm run dev`
is running). It's kept current there, not duplicated here, since a second
static list in this file would drift out of sync with the real one.
