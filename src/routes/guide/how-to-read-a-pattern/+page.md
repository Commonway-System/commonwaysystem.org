---
title: How to Read a Pattern
description: How to read a Commonway System pattern entry, Pattern ID cards, classification colors, status badges, density tier chips, and the citation system.
date: 2026-08-29
llms: Explains how to read a Commonway System pattern entry, Pattern ID cards, classification colors and status badges, density tier chips, admonitions, and the citation and unsourced-claim system.
---

<script>
  import { DensityChip, Citation } from '$lib/theme/components'
</script>

Every pattern in this guide is built from the same handful of parts, repeated consistently: a Pattern ID card, density tier chips, admonition blocks, and citations. This page walks through what each one means, so the rest of the guide can be read without re-explaining itself on every page.

## The Pattern ID card

Each pattern opens with a card naming its ID, title, Functional Classification, and (for most classifications) a status. The colored left edge matches the classification, Local, Collector, Arterial, Freeway, or Intersections & Crossings, so a reader flipping through the guide can tell at a glance what kind of pattern they're looking at, even before reading the title.

The ID itself follows a fixed format: `[CLASS]-[CTXCODE]-[##]`, like `LOC-BBG-12`. `CLASS` is the three-letter classification code (`LOC`, `COL`, `ART`, `FRE`, or `INT` for Intersections). `CTXCODE` is a short mnemonic for the specific Typology, `BBG` for Bicycle Boulevard / Neighborhood Greenway, for example, with `DEF` reserved for each classification's baseline default entry. The trailing number is assigned once, in the order the pattern was added to the guide, and never changes later even if the pattern's position in the Pattern Index does. Some patterns also carry a density suffix in parentheses, like `(SUB)`, once more than one page exists for the same Typology at different density tiers. See [Street Types & Classifications](/guide/street-types/) for what each Functional Classification and Typology actually means in plain language.

Where a status applies, it appears as a small badge next to the classification label. Recommended is the quiet default, no color emphasis, since it's the unremarkable normal case. Situational reuses the amber warning color, meaning the pattern is real but context-dependent. Avoid reuses the rose danger color, meaning the Commonway System actively recommends against it. Status is omitted entirely on Intersections & Crossings entries, since the master Typology reference doesn't track a status for those.

See [Bicycle Boulevard / Neighborhood Greenway](/patterns/local-streets/bicycle-boulevard/) for a full worked example of a Pattern ID card, and the [Pattern Index](/patterns/) for every pattern currently in the guide.

## Density tiers

Density tiers appear as a small chip next to any guidance that changes by context:

<DensityChip tier="Suburban" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Six tiers run from Undeveloped to Core, describing how much housing and activity sit on the land around a street, not the street itself. Read the [Density Tiers](/guide/density-tiers/) page for what each tier means, where the names and unit-per-acre ranges come from, and how to handle a segment that falls between two tiers.

## Admonitions

Callout blocks flag content that needs to stand apart from the surrounding text. Five kinds exist, each with its own color and label:

:::note
A note adds background or context that isn't itself an instruction.
:::

:::tip
A tip is a specific, actionable recommendation worth calling out on its own.
:::

:::warning
Renders with the label "Caution." Flags a real risk or a rule that's easy to get wrong, like the Stroad avoid-pattern warning on the Bicycle Boulevard page.
:::

:::danger
Renders with the label "Avoid." Marks a pattern or approach the Commonway System recommends against outright, stronger than a Situational status badge.
:::

:::unsourced
Flags a claim that still needs a citation before publication. The amber color is reserved for this and for pattern highlighting, so it never doubles as a general-purpose warning color elsewhere in the system.
:::

## Citations

Citations are numbered, superscript badges that link down to a source list at the end of the page, under a `## References` heading. Clicking a badge jumps straight to its numbered entry. A claim still waiting on a source is flagged inline instead of cited, using the same amber as the `:::unsourced` block above but sized for a single word or number rather than a whole paragraph<Citation unsourced />.

See the [Bicycle Boulevard](/patterns/local-streets/bicycle-boulevard/) page's Design Speed section for numbered citations linking to a real References list in action.
