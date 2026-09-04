---
title: Release History & Roadmap
description: How Commonway System versioning works, what changed in each release, and what's planned next.
llms: Explains the Commonway System's CalVer versioning, the current version, the changelog, and the public roadmap of work not yet built.
---

<script>
  // Counts real Street Typology pattern pages (patterns/<classification>/<slug>/),
  // not the Pattern Index itself, which sits one path segment shallower.
  // Computed from the routes themselves so this number can't drift stale
  // the way a hardcoded count would, the same reasoning
  // src/lib/server/content.ts already applies to llms.txt. Points at
  // patterns/, not guide/, since the sitewide URL restructure moved every
  // pattern page out of guide/ into its own top-level patterns/ section.
  const patternModules = import.meta.glob('/src/routes/patterns/**/+page.md')
  const patternPageCount = Object.keys(patternModules).filter((path) => {
    const rel = path.replace('/src/routes/patterns/', '').replace('/+page.md', '')
    return rel.split('/').length === 2
  }).length

  // Newest first. A quiet day can stay a one-line `summary`; a heavier day
  // can add `items` for a bulleted breakdown instead, per-entry, not a
  // shape every entry is forced into.
  const releases = [
    {
      date: '2026.08.30',
      items: [
        'Homepage rebuilt from scaffold placeholder text into a real Hero / differentiator-strip / features-grid page, with three new components (Hero, EvidenceStrip, FeatureGrid) and two new PageLayout frontmatter flags (hideTitle, wide) for pages that need their own custom-placed h1 or a wider-than-prose content column.',
        'Homepage hero redesigned to be full-bleed edge to edge and permanently dark regardless of the site’s own light/dark toggle, with a subtle animated lane-line texture and a teal glow behind the logomark (both respecting prefers-reduced-motion), and a 60vh minimum height. New GlobalLayout mechanism (isHome) collapses the sidebar/toc grid to a single full-width column on the homepage only, since neither ever has content there.',
        'Differentiator strip (the "why this guide is different" evidence-tier callout) redesigned from an amber box, which read as a warning notice, to a teal feature-highlight treatment matching the evidence chips’ own palette; its "learn more" link now uses the site’s standard hyperlink styling instead of a custom color.',
        'Differentiator strip and feature grid widened to match the navbar’s own 88rem measure, instead of the narrower 46rem prose column every article page uses.',
        '/about/credits/ moved for real to /about/acknowledgments/ (route, not just display title this time), with every cross-link updated to match.',
        'Guide section rebuilt: sidebar regrouped into Foundations, Find Your Pattern, and Make It Happen (the Introduction page now an ungrouped "Start Here" entry at the top, same idea as About’s own Overview item). New Scale Hierarchy page split out of the Introduction page’s old content. Two new placeholder pages, Find Your Pattern and Make It Happen, each with real explanatory copy and the standing "planned but not yet written" callout, one per new sidebar group so nothing has to move once each becomes a real page sequence.',
        'Known incomplete: the new Scale Hierarchy page’s Network/Corridor/Facility/Element definitions carry over wording from an earlier planning session that was never formally re-confirmed as final; pending a maintainer read-through.',
      ],
    },
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
        'Density Tiers and Street Types & Classifications published under Guide: the six density tiers with their ITE/CNU transect equivalents and unit-per-acre ranges, and what a Functional Classification and a Street Typology actually are, indexing every Typology by classification.',
        'How to Read a Pattern rewritten with real content: the Pattern ID format, classification colors and status badges, all five admonition kinds, and how citation badges work.',
        'Citation badges now link down to their numbered source entry site-wide, instead of being plain unlinked numbers.',
        'About section filled in with real content: Contributing / Volunteering, Governance, Reporting, and a new Credits page (a data-driven contributor list, currently empty pending the first real contribution). New Terms and Conditions, Privacy Policy, and AI Policy pages published alongside them.',
        'Added the GitHub-side contributor infrastructure those About pages point to: issue templates (factual error, missing citation, dead link, accessibility), a pull request template, and a CODE_OF_CONDUCT.md. Added a root LICENSE (MIT, covering the site’s code only) and documented the code/content license split in the README.',
        'Every page now shows a real "Last updated" date next to its edit link, sourced from git history at build time rather than filesystem metadata (which a fresh deploy checkout would otherwise reset on every file).',
        'Added "Share" buttons (X, Facebook, LinkedIn, Reddit, Bluesky, email, copy-link) to every page: plain outbound links only, no third-party share-button script or tracking, consistent with the Privacy Policy.',
        'The version number in the navbar is now a link to this page.',
        'Fixed a real production-build failure: the Brand Guide’s illustrative citation demo linked to a citation anchor that doesn’t exist, which `adapter-static`’s strict prerendering treats as a hard build error rather than a soft dead link.',
        'Street Types & Classifications gained 10 real citations (Stroad, Street Typology, Living Street/Woonerf, Yield Street, Turbo-Roundabout, plus the three sources behind the Dutch CROW comparison table), mph conversions alongside every km/h speed figure, and working links from that comparison table straight to each pattern’s real CS equivalent page.',
        'Wide tables now scroll horizontally in their own box instead of overflowing the page: a themed edge-fade shadow, a thin scrollbar, and a “scroll for more” hint shown only once a table actually overflows. Applied site-wide through a new rehype plugin, not hand-added per table, and built as a wrapper around the table rather than changing the table’s own CSS display, so screen readers keep the table’s native semantics.',
        'Evidence-tier chips (Legal/regulatory, Evidence-based, Precedent-based) rolled out to every citation on Density Tiers and Street Types & Classifications, and made a standing house rule going forward: every new citation gets one. The Contributing page’s review checklist now says so explicitly.',
        'Sitewide URL restructure: the navbar is now Home / Guide / Patterns / Reference / Blog / About. All 37 pattern pages and the Pattern Index moved out of Guide into their own Patterns section; Guide now holds only its 4 remaining non-pattern pages. Two new sections launched: Reference (explaining the technical-detail layer planned beneath pattern pages, not yet populated) and Blog (a dynamically generated index, one welcome post so far).',
        'About’s sidebar split into three groups, About/Development/Terms and Policies, and four of its pages got new display titles without changing their URLs: Governance → Project Governance, Contributing / Volunteering → Submit a Change, Reporting → Report a Problem, Credits → Acknowledgments.',
        'Fixed this page’s own live pattern-page count, which had silently dropped to 0 after the Patterns move since the script computing it still pointed at the old guide/ path.',
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
- **Classification-level overview pages.** Local, Collector, Arterial, and Freeway currently jump straight from the Patterns index into individual Typology pages, with no landing page explaining the classification itself.
- **Full citation compilation.** Most pattern pages carry an unsourced-claim flag rather than real citations; sourcing is an ongoing background task across the whole guide.
- **Dutch CROW reference table reconciliation.** A temporary comparison table sits in the internal density-matrix document and needs to be folded into the actual Commonway patterns once they're fully planned.
- **Entity formation and attorney review**, ahead of treating any part of the guide as a finished publication.
- **Arterial speed baseline figures.** The density-tiered principle is locked; the specific mph figures per density tier are not.
