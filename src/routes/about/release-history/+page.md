---
title: Release History & Roadmap
description: How Commonway System versioning works, what changed in each release, and what's planned next.
date: 2026-08-31
llms: Explains the Commonway System's CalVer versioning, the current version, the changelog, and the public roadmap of work not yet built.
---

<script>
  import { patternPageCount, retrofitStrategyCount } from '$lib/pattern-count'
  import { releases } from '$lib/data/releases'
  import Changelog from '$lib/theme/components/Changelog.svelte'

  // The changelog itself lives in src/lib/data/releases.ts (newest first).
  const currentVersion = releases[0]
</script>

## How versioning works

The Commonway System uses CalVer, a version number built from the date rather than an arbitrary sequence: year, month, day (for example, 2026.08.28). The version shown in the publication's header is always the date of the most recent publish, and the most recently published version is the official current version of the guidebook. There is no separate "stable" or "beta" release; whatever is live is the current one.

This publication is statically generated. Publishing happens by pushing to GitHub, which triggers an automatic build. There's no manual deploy step and no delay between a push landing and the publication reflecting it, so the version number in the header updates the moment a change goes live.

The web version at commonwaysystem.org is canonical. Print editions of the Commonway System Guidebook are dated snapshots: each print copy carries the CalVer date it was produced under, and reflects the guidebook as it existed on that date. If something in a print copy conflicts with the current web version, the web version is the more current source.

If more than one push happens on the same calendar day, they share a single version number and a single changelog entry below. The changelog entry for that date covers everything that shipped that day, not just the first or last push.

## Current version

**{currentVersion.date}**

The guidebook currently documents {patternPageCount} pattern pages across all nine scales and classifications (Network, Corridor, Local, Collector, Arterial, Freeway, Intersections & Crossings, Facility, and Element), plus {retrofitStrategyCount} Retrofit Strategies at the Network, Corridor and Intersection scales. None are content stubs, every published pattern page carries real modal-hierarchy, density-applicability, and design-notes content, and every one now carries real citations rather than the "Unsourced claim" flag. Find Your Pattern is still the one remaining placeholder page in the Guide, pending its own diagnostic sequence. It is actively expanding, not a finished publication.

## Changelog

Entries run newest to oldest. Each entry covers everything published under that date, even if it shipped across more than one push. Changes are grouped as New, Improved, Fixed and Removed, each tagged Content (pages, patterns and media) or Site (features and how the publication works); open a line to read the full description. The newest release is shown open; older ones list their changes when you open them.

<Changelog releases={releases} />

## Publishing checklist and build notes

Before pushing a batch of work to GitHub, draft a short build note summarizing what changed since the last push. This does two things: it gives the changelog entry above something accurate to draw from, and it gives a checkpoint to review the work before it goes live.

Write the build note as a list of changes, one change per line, not a paragraph covering several. For each change:

- **Say what kind of change it is.** New (something that didn't exist before), Improved (something that existed and works or reads better now), Fixed (something that was wrong and is now right), or Removed (something taken out or retired). Accessibility checks, link checks and anything left in a known-incomplete state are Notes, not changes.
- **Say what it touched.** Content (pages, patterns, Retrofit Strategies, media items, citations, wording) or Site (features, components, layout, navigation, how the publication is built or served). Notes don't need this.
- **Write a one-sentence summary** a reader can understand without opening anything: plain words, no jargon, no em-dashes, and without repeating the type word, since the label already says it.
- **Add the full description** underneath when the summary leaves something out: which pages, how many items, what was checked, and why.

Then make sure the build note covers:

- What content changed (new pattern pages, edits to existing ones, corrected data)
- What structural or publication changes shipped (new components, navigation changes, styling updates)
- What was checked (accessibility scans, link checks) and what wasn't
- Anything left in a known-incomplete state (a page that's live but flagged with an unsourced claim, a section still under review)

The build note becomes that day's changelog entry, and the summaries double as the commit message. If more than one push lands on the same day, add the new changes to that day's entry instead of starting another one. Past entries stay as written, including the counts that were true on their date.

## Roadmap

Work that's planned but not yet built, grouped by area.

### New content

- **Traffic Calming page.** A new Guide page on traffic calming,
  connected to the patterns and retrofit strategies it relates to.
- **Hoofdnet/Plusnet methodology page.** A new Guide page on the Dutch
  Hoofdnet/Plusnet road-network methodology.

### Structure changes

- **Classification overview pages.** Landing pages for Local,
  Collector, Arterial, and Freeway, sitting between the Pattern Index
  and individual Street Typology pages, which currently jump straight
  from one to the other.
- **Dutch CROW reconciliation.** Folding an internal CROW-comparison
  reference into the actual Commonway System patterns.

### Existing content

- **Brand Guide page update.** Finalizing `/about/brand-guide/` as the
  canonical brand reference, including documentation for components
  not yet covered there.
- **Related Media placement decision.** Finalizing which page a
  specific Related Media item currently tagged to the Commonway System
  page actually belongs on.

### Audits

- **Website specification audit, remaining items.** The first full
  pass against the checklist at specification.website is published on
  the [Website Audit](/about/website-audit/) page; the items still
  marked Partial, Fail or Not yet reviewed there are what's left.

### New features

- **Find Your Pattern tool.** A two-part diagnostic tool plus an
  interactive, clickable hotspot map.
- **Photo Gallery feature.** A new media type usable on any page:
  ordinary photos, before/after comparison sliders, and map-based
  street-level photos.
- **Related Media refinements.** Improvements to how the Related Media
  component displays.

### Standing / ongoing

- **Pattern viewer drawings rollout.** Drawn, interactive views for
  every pattern and Retrofit Strategy, beyond the five that have them
  now; the rest show their illustration or a placeholder until then.
- **Bike Highway / Downtown Thoroughfare content pass.** A future
  revision pass on these two pattern pages.
- **Binding-adoption template.** A future, separate model template for
  formal municipal adoption.
- **More media items.** Ongoing additions to the Media Gallery as new
  sources come up.

### External

- **Rosetta Places citation.** Rosetta Places will cite the Commonway
  System by name once it reaches a citable state.
