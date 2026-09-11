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
button, form controls preview, type sample).

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

- **Node.js 20 or later.** Node.js is the runtime this project's code runs
  on. [Download it here](https://nodejs.org/) if you don't already have
  it.
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

To produce the static build (what actually gets deployed to
commonwaysystem.org):

```sh
pnpm run build
pnpm run preview   # serves the build/ folder locally to sanity-check it
```

You don't need this step to contribute content, `pnpm run dev` above is
enough to preview any edit. `pnpm run build` matters mainly to maintainers
doing a real deploy: it writes plain HTML/CSS/JS to `build/`, no server
required at runtime. Any static host works, this publication currently deploys
via Netlify, triggered automatically on push to GitHub.

## Project structure

```
src/
  routes/                     Every page. A folder = a URL segment.
    +layout.svelte            Root layout. Deliberately minimal, SveltePress
                               wraps this in the theme's GlobalLayout.
    +layout.ts                Turns on prerendering and trailing-slash URLs.
    +page.md                  Home page.
    guide/+page.md             Guide intro (bare root).
    guide/how-to-read-a-pattern/+page.md
    guide/density-tiers/+page.md
    guide/street-types/+page.md
    guide/design-speed/+page.md
    guide/pattern-ids/+page.md
    guide/...                  Additional Foundations / Find Your Pattern /
                               Make It Happen chapters follow the same
                               one-folder-per-page shape.
    patterns/+page.md          Pattern Index (bare root).
    patterns/local-streets/bicycle-boulevard/+page.md
    patterns/.../+page.md      Add new pattern pages the same way: a folder
                               with a +page.md inside it, under patterns/,
                               nested by Scale/classification.
    retrofits/+page.md         Retrofit Strategy Index (bare root).
    retrofits/corridor/.../+page.md
    retrofits/intersection/.../+page.md
    retrofits/network/.../+page.md
                               Retrofit Strategy entries, one folder each,
                               nested by Scale the same way patterns are.
    references/+page.md
    media/+page.md              Media Gallery: filterable/sortable index of
                               external videos, podcasts, and articles.
    blog/+page.md              Dynamic index, see BlogIndex.svelte.
    blog/welcome/+page.md
    about/+page.md
    about/brand-guide/+page.md        Live preview of every brand token.
    about/commonway-system/+page.md
    about/release-history/+page.md    Version, changelog, and the live
                                       public Roadmap (see below).
    about/contributing/+page.md
    about/governance/+page.md
    about/reporting/+page.md
    about/acknowledgments/+page.md    Data-driven contributor list, see
                                       the `contributors` array in its
                                       own <script> block.
    llms.txt/+server.ts       Generates llms.txt from every +page.md's
                               frontmatter at build time. See below.
    robots.txt/+server.ts     Blanket-allow robots.txt, also build-time.

  lib/
    site.ts                   SITE_URL, the canonical domain used for
                               llms.txt's absolute links.
    server/content.ts         Reads every +page.md's frontmatter at
                               build/dev time for llms.txt.
    theme/                    The theme itself. You will rarely need to
                               touch this once the visual direction is set.
    index.ts                  Theme entry point (the SveltePress contract).
    config.ts                 TypeScript shape of the theme's options.
    layout.ts                 Svelte stores (sidebar open/closed, dark mode).
    highlighter.ts             Code block syntax highlighting (Shiki).
    markdown/
      admonitions.ts          Implements :::note :::tip :::warning :::danger
                               and :::unsourced callout blocks.
      heading-anchors.ts      Adds the hover "#" link next to headings.
    styles/
      tokens.css              *** Brand control panel. Colors, type, spacing,
                               all as CSS variables. Start here for any
                               visual change. ***
      base.css                Base element styles and content typography,
                               built from the tokens above.
    components/
      GlobalLayout.svelte     Navbar + sidebar + content + toc grid.
      PageLayout.svelte       Wraps each page: title, edit link, prev/next.
      Navbar.svelte
      Sidebar.svelte / SidebarGroup.svelte
      Toc.svelte
      PageNav.svelte          Prev/next footer links.
      ThemeToggle.svelte      Light/dark mode switch.
      Backdrop.svelte         Mobile sidebar scrim.
      Icon.svelte             All icons in one file, keyed by name.
      icons/                  Individual icon source files.
      Hero.svelte             CS-specific: homepage hero.
      EvidenceStrip.svelte    CS-specific: homepage differentiator strip.
      FeatureGrid.svelte      CS-specific: homepage features grid.
      PatternCard.svelte      CS-specific: the Pattern ID card.
      RetrofitCard.svelte     CS-specific: the Retrofit Strategy ID card.
      RetrofitIndexCard.svelte  CS-specific: Retrofit Strategy Index grid card.
      StatusBadge.svelte      CS-specific: shared Recommended/Situational/
                               Avoid/Descriptive pill, backs both Pattern
                               and Retrofit cards.
      DensityChip.svelte      CS-specific: Undeveloped -> Core tier chip.
      Citation.svelte         CS-specific: numbered badge / unsourced flag.
      EvidenceChip.svelte     CS-specific: Legal/Evidence-based/Precedent
                               tier chip.
      Illustration.svelte     CS-specific: Paired/Single-condition/Diagram/
                               Descriptive/Conditional pattern illustration
                               frame-and-callout renderer.
      SpeedModalHierarchyCard.svelte  CS-specific, plus its sub-components
      SpeedLimitSection.svelte        (SpeedLimitSign, ModalHierarchySection,
      ModalHierarchyRow.svelte        ModalHierarchyRow, ModalHierarchyPill):
      ModalHierarchyPill.svelte       speed-limit signage and ranked-mode
      SpeedLimitSign.svelte           hierarchy display on pattern pages.
      MediaGallery.svelte      CS-specific: filterable/sortable Media
                               Gallery index.
      MediaCard.svelte        CS-specific: one Media Gallery entry.
      MediaFilters.svelte     CS-specific: Media Gallery's filter panel.
      RelatedMedia.svelte     CS-specific: per-page tagged-media section,
                               shown on Pattern, Retrofit, and select
                               Guide/About pages.
      ColorSwatch.svelte      Brand Guide page: color token preview.
      LogoPreview.svelte      Brand Guide page: logo lockup preview.
      ExampleCard.svelte      Brand Guide page: generic example card.
      Button.svelte           Brand Guide page: button variant preview.
      FormControlsPreview.svelte  Brand Guide page: form control preview.
      TypeSample.svelte       Brand Guide page: type scale preview.

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
---

Regular markdown. Tables, code blocks, and GitHub-flavored markdown
(checklists, strikethrough) all work.
```

The page's `<h1>` is rendered automatically from `title`, don't repeat it
as a `# Heading` in the body, that duplicates it.

`llms` falls back to `description`, then `title`, if omitted. See
"llms.txt and robots.txt" below.

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
  `--cw-intersections` has its own ramp too; `--cw-network`, `--cw-corridor`,
  `--cw-facility`, and `--cw-element` are still **PLACEHOLDER**, sharing
  Freeway's neutral-gray ramp pending real per-Scale colors (see the live
  Roadmap referenced below).
- `--cw-amber` / `--cw-amber-soft` / `--cw-amber-ink`: the reserved
  highlight color. Used only for pattern highlighting and the
  `:::unsourced` flag, never as a general UI accent, by design.
- `--cw-font-display` / `--cw-font-body`: Fraunces and Inter, loaded as
  self-hosted variable fonts via `@fontsource-variable/*` (no external font
  CDN).
- The `[data-theme='dark']` block at the bottom of the file is the dark-mode
  override for every token above.

## llms.txt and robots.txt

`src/routes/llms.txt/+server.ts` and `src/routes/robots.txt/+server.ts` are
SvelteKit endpoints, not static files. `llms.txt` is built from every
`+page.md`'s frontmatter (`llms`, falling back to `description`, then
`title`) at build time, via `src/lib/server/content.ts`, so a new page
appears in it automatically, nothing to hand-maintain. Pages are grouped
into `##` sections by their top-level route folder (`/guide/` → "Guide",
etc.); set `llmsOptional: true` on a page's frontmatter to list it under
the spec's reserved `## Optional` heading instead, for lower-priority
stub/placeholder pages a context-constrained reader can skip. `robots.txt`
is a blanket allow,
since the whole guidebook is public.

Because `adapter-static` prerenders everything ahead of time, these compile
down to plain `build/llms.txt` and `build/robots.txt` files, same as any
other route, no server required at runtime. Nothing on the publication links to
them, so they're listed explicitly in `svelte.config.js`'s
`kit.prerender.entries`, otherwise the prerender crawler would never find
them. The canonical domain used for the absolute URLs in `llms.txt` lives
in `src/lib/site.ts` (`SITE_URL`), update it there once the real domain is
set.

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
