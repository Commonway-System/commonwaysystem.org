---
title: Release History & Roadmap
description: How Commonway System versioning works, what changed in each release, and what's planned next.
llms: Explains the Commonway System's CalVer versioning, the current version, the changelog, and the public roadmap of work not yet built.
---

<script>
  // Counts real Street Typology pattern pages (guide/<classification>/<slug>/),
  // not the guide's own Introduction/Pattern Index/How-to-read-a-pattern
  // pages, which sit one path segment shallower. Computed from the routes
  // themselves so this number can't drift stale the way a hardcoded count
  // would, the same reasoning src/lib/server/content.ts already applies to
  // llms.txt.
  const guideModules = import.meta.glob('/src/routes/guide/**/+page.md')
  const patternPageCount = Object.keys(guideModules).filter((path) => {
    const rel = path.replace('/src/routes/guide/', '').replace('/+page.md', '')
    return rel.split('/').length === 2
  }).length

  // Newest first. A quiet day can stay a one-line `summary`; a heavier day
  // can add `items` for a bulleted breakdown instead, per-entry, not a
  // shape every entry is forced into.
  const releases = [
    {
      date: '2026.08.29',
      items: [
        'Pattern ID format finalized as CLASS-CTXCODE-## (e.g. LOC-BBG-12), replacing the old SCALE-CTXCODE-### scheme. Applied across every pattern page, the Pattern Index, and every illustrative example, confirmed with a full-repo search for zero remaining old-format IDs.',
        'Bicycle Boulevard’s placeholder ID resolved to LOC-BBG-12; the Brand Guide’s separate "Urban main street" demo card migrated to ART-UMS-07.',
        'PatternCard gained a status badge (Recommended, Situational/Discouraged, Avoid), applied to every Local, Collector, Arterial, and Freeway pattern page. Intersections & Crossings entries intentionally carry no status, matching the master reference.',
        'Default (Standard Local Street) rewritten with real content and cross-links to every other Local Typology and to Continuous Sidewalk/Raised Junction.',
        'New Release History & Roadmap page published under About, with a live pattern-page count and current-version date computed from the site’s own routes rather than hardcoded.',
        'Google Analytics wired up (GA4), loading only in production builds, never during local development.',
        'sitemap.xml added and submitted to Google Search Console; robots.txt now points crawlers at it.',
        'Fixed a mobile navigation bug: the hamburger drawer only ever showed a page’s own sidebar tree, never the navbar’s primary links (Guide, Pattern Index, About), which made them unreachable on narrow viewports, including the homepage.',
      ],
    },
    {
      date: '2026.08.28',
      summary: `Initial public launch of commonwaysystem.org, deployed through Netlify with a custom SveltePress theme. Guide structure established: Introduction, Pattern Index, How to Read a Pattern, and the first ${patternPageCount} Street Typology pattern pages across Local, Collector, Arterial, Freeway, and Intersections & Crossings.`,
    },
  ]

  const currentVersion = releases[0]

  // Built here, not inline in the markdown body below, because backticks in
  // a template literal read as CommonMark inline-code delimiters when they
  // appear in prose text: two stray backticks around HTML in the page body
  // got misparsed and mangled the Svelte {#if}/{@html} block around it.
  // Script-block content isn't reprocessed as markdown, so it's safe here.
  function releaseBodyHtml(release) {
    if (release.items)
      return `<ul>${release.items.map((item) => `<li>${item}</li>`).join('')}</ul>`
    return `<p>${release.summary}</p>`
  }
</script>

## How versioning works

The Commonway System uses CalVer, a version number built from the date rather than an arbitrary sequence: year, month, day (for example, 2026.08.28). The version shown in the site header is always the date of the most recent publish, and the most recently published version is the official current version of the guide. There is no separate "stable" or "beta" release; whatever is live is the current one.

This site is statically generated. Publishing happens by pushing to GitHub, which triggers an automatic build. There's no manual deploy step and no delay between a push landing and the site reflecting it, so the version number in the header updates the moment a change goes live.

The web version at commonwaysystem.org is canonical. Print editions of the Commonway System Guidebook are dated snapshots: each print copy carries the CalVer date it was produced under, and reflects the guide as it existed on that date. If something in a print copy conflicts with the current web version, the web version is the more current source.

If more than one push happens on the same calendar day, they share a single version number and a single changelog entry below. The changelog entry for that date covers everything that shipped that day, not just the first or last push.

## Current version

**{currentVersion.date}**

The guide currently documents {patternPageCount} Street Typology pattern pages across Local, Collector, Arterial, Freeway, and Intersections & Crossings. None are content stubs, every published pattern page carries real modal-hierarchy, density-applicability, and design-notes content, but all of them still carry an "Unsourced claim" flag pending real citations, and most of the homepage and the Guide's own introductory pages remain placeholder text. The site is actively expanding, not a finished publication.

## Changelog

Entries run newest to oldest. Each entry covers everything published under that date, even if it shipped across more than one push.

{#each releases as release (release.date)}

<!--
  Bold text, not a `###` heading: rehype-slug assigns heading ids from the
  literal source text at build time, before Svelte interpolates {release.date}
  here, so every entry's heading would get the same id ("releasedate") and
  collide the moment a second changelog entry exists.
-->
**{release.date}**

{@html releaseBodyHtml(release)}

{/each}

## Publishing checklist and build notes

Before pushing a batch of work to GitHub, draft a short build note summarizing what changed since the last push. This does two things: it gives the changelog entry above something accurate to draw from, and it gives a checkpoint to review the work before it goes live.

A build note doesn't need to be long. Cover:

- What content changed (new pattern pages, edits to existing ones, corrected data)
- What structural or site changes shipped (new components, navigation changes, styling updates)
- Anything left in a known-incomplete state (a page that's live but flagged with an unsourced claim, a section still under review)

## Roadmap

Work that's planned but not yet built:

- **Facility and Element ID formats.** Only the Segment and Intersection scale of the pattern ID system is finalized; the finer-grained Facility and Element levels still need their own format.
- **Process-explainer chapter.** A plain-language guide to how local government actually handles road changes: who authorizes them, how they're funded, how citizens can engage.
- **Classification-level overview pages.** Local, Collector, Arterial, and Freeway currently jump straight from the Introduction into individual Typology pages, with no landing page explaining the classification itself.
- **Full citation compilation.** Most pattern pages carry an unsourced-claim flag rather than real citations; sourcing is an ongoing background task across the whole guide.
- **Dutch CROW reference table reconciliation.** A temporary comparison table sits in the internal density-matrix document and needs to be folded into the actual Commonway patterns once they're fully planned.
- **Entity formation and attorney review**, ahead of treating any part of the guide as a finished publication.
- **Arterial speed baseline figures.** The density-tiered principle is locked; the specific mph figures per density tier are not.
