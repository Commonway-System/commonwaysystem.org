---
title: How to Read a Pattern
llms: Explains how to read a Commonway System pattern entry, Pattern ID cards, density tier chips, and the citation and unsourced-claim system.
---

Each pattern in the guidebook opens with a Pattern ID card, naming its scale, context, and classification. The colored left edge matches the pattern's Functional Classification, so a reader flipping through the book can tell at a glance whether they are looking at a Local, Collector, Arterial, or Intersections pattern.

Density tiers appear as a small chip next to any guidance that changes by context:

<script>
  import { DensityChip } from '$lib/theme/components'
</script>

<DensityChip tier="Suburban" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Citations are numbered, superscript, and link back to the source list at the end of a section. A claim still waiting on a source is flagged instead of cited:

:::unsourced
This sentence is a placeholder for a claim that has not been sourced yet. The flag is meant to be visible during drafting and gone before publication.
:::
