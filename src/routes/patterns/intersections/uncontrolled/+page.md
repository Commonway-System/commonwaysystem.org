---
title: Uncontrolled
description: An intersection with no assigned right-of-way control, realistic only at the lowest density and traffic volumes.
patternId: INT-UNC-07
status: situational
date: 2026-08-29
llms: An uncontrolled intersection with no assigned right-of-way control, realistic only at the lowest density and traffic volume tiers.
---

<script>
  import { Citation, DensityChip, EvidenceChip, IdPill, PatternViewer, RelatedMedia } from '$lib/theme/components'
</script>

An intersection with no stop, yield, signal, or roundabout control, right-of-way resolved informally by the drivers and other road users present.

<PatternViewer image={fm.image} title={fm.title} classification="intersections" />

<RelatedMedia id={fm.patternId} />

<div class="cw-context">

<span class="cw-context__label">Typical at:</span> <DensityChip tier="Undeveloped" /> <DensityChip tier="Rural" />

Suburban is an edge case. Compact, Urban, and Core are unlikely pairings.

</div>

## Design notes

Uncontrolled intersections are only realistic where traffic volume is low enough on every approach that informal right-of-way resolution stays safe, which narrows this pattern to the lowest end of the density range.<Citation index={1} /> Where volume rises past that point, Stop / Yield (Two-Way) is the first applied control tier.

## Related patterns

<div class="cw-links">

- [Stop / Yield (Two-Way)](/patterns/intersections/stop-yield/) <IdPill id="INT-SYD-05" /> (the next control tier up as volume exceeds informal right-of-way resolution, made explicit by the sentence added to this page's own Design notes)

</div>

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> [SWOV Institute for Road Safety Research, "Principles for a Safe Road Network."](https://swov.nl/en/fact-sheet/principles-safe-road-network)
