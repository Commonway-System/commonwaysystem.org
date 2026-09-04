# Commonway System website

A working SveltePress site running a fully custom "Commonway" theme: same
layout shell people like about SveltePress's default theme (sticky navbar,
collapsible sidebar, on-this-page rail, prev/next footer), rebuilt from
scratch with Commonway System branding and a set of CS-specific components
(Pattern ID card, density tier chip, citation badge, evidence-tier chip,
plus the Brand Guide preview components: color swatch, logo preview,
example card, button, form controls preview, type sample).

## Requirements

- Node.js 20 or later
- pnpm (the lockfile here is pnpm's, `pnpm-lock.yaml` / `pnpm-workspace.yaml`)

## Running it locally

```sh
pnpm install
pnpm run dev
```

Then open the URL it prints (usually `http://localhost:5173`).

To produce the static build (what you'd deploy to commonwaysystem.org):

```sh
pnpm run build
pnpm run preview   # serves the build/ folder locally to sanity-check it
```

`pnpm run build` writes plain HTML/CSS/JS to `build/`, no server required at
runtime. Any static host works: Cloudflare Pages, Netlify, S3 plus a CDN,
GitHub Pages, and so on.

## Project structure

```
src/
  routes/                     Every page. A folder = a URL segment.
    +layout.svelte            Root layout. Deliberately minimal, SveltePress
                               wraps this in the theme's GlobalLayout.
    +layout.ts                Turns on prerendering and trailing-slash URLs.
    +page.md                  Home page.
    guide/introduction/+page.md
    guide/how-to-read-a-pattern/+page.md
    guide/patterns/+page.md
    guide/local-streets/bicycle-boulevard/+page.md
    guide/.../+page.md        Add new pattern pages the same way: a folder
                               with a +page.md inside it.
    about/+page.md
    about/brand-guide/+page.md        Live preview of every brand token.
    about/commonway-system/+page.md
    about/contributing/+page.md
    about/governance/+page.md
    about/reporting/+page.md
    about/credits/+page.md            Data-driven contributor list, see
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
      PatternCard.svelte      CS-specific: the Pattern ID card.
      DensityChip.svelte      CS-specific: Undeveloped -> Core tier chip.
      Citation.svelte         CS-specific: numbered badge / unsourced flag.
      EvidenceChip.svelte     CS-specific: Legal/Evidence-based/Precedent
                               tier chip.
      ColorSwatch.svelte      Brand Guide page: color token preview.
      LogoPreview.svelte      Brand Guide page: logo lockup preview.
      ExampleCard.svelte      Brand Guide page: generic example card.
      Button.svelte           Brand Guide page: button variant preview.
      FormControlsPreview.svelte  Brand Guide page: form control preview.
      TypeSample.svelte       Brand Guide page: type scale preview.

vite.config.ts                 Site content lives here: navbar links, the
                                manual sidebar tree, GitHub link, edit-link
                                template. This is the file you edit most.
```

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

Using the CS-specific components inside a page (add the `<script>` import at
the top of the `.md` file, SveltePress lets Svelte run inside markdown):

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

`classification` accepts `local`, `collector`, `arterial`, `freeway`, or
`intersections`, and controls the card's accent color.

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
  `--cw-intersections` is still a **PLACEHOLDER**, since the guide's
  documented ramp only covers Local/Collector/Arterial/Freeway.
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
other route, no server required at runtime. Nothing on the site links to
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

## License

Two different licenses cover two different things in this repository, since
GitHub's own license detector only surfaces one license per repo by
default:

- **Site code** (Svelte components, theme configuration, build tooling,
  everything except the guide content itself): [MIT](LICENSE), matching
  SveltePress.
- **Guide content** (the pattern pages and prose under
  `src/routes/**/+page.md`, and the compiled Commonway System guidebook):
  licensed separately, not MIT and not a fully open license like Creative
  Commons. See the "Terms of contributing" section on
  `/about/contributing/` for the model, an entity-retains-rights,
  contributor-grants-a-license arrangement, the same way a publisher
  retains rights to a book that many people contributed research to.

## What is not built yet

This is a working v1 scaffold, not a feature-complete clone of the
SveltePress default theme. Deliberately left out for now:

- **Auto-generated sidebar** from the routes folder. The sidebar here is
  manually configured in `vite.config.ts`, which maps more naturally onto
  the Scale hierarchy and Functional Classification structure than a
  generic path-based auto-sidebar would. Worth revisiting once the
  typology list is closer to final.
- **Search.** No Algolia DocSearch / Meilisearch / Pagefind wiring yet.
- **A dedicated homepage hero.** The home page currently renders like any
  other content page.
- **PWA / offline support, Google Analytics.** Straightforward to add later
  by following the same virtual-module pattern used for theme options
  (see `OPTIONS_MODULE_ID` in `src/lib/theme/index.ts`), not built now
  since neither was a stated requirement.
- **A real "on this page" outline on narrow/tablet widths.** It currently
  hides below 1180px rather than collapsing into a "Jump to" control.

None of these block using the site for real content, they're just not
built yet.
