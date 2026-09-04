---
title: Uncontrolled
description: An intersection with no assigned right-of-way control, realistic only at the lowest density and traffic volumes.
patternId: INT-UNC-07
date: 2026-08-29
llms: An uncontrolled intersection with no assigned right-of-way control, realistic only at the lowest density and traffic volume tiers.
---

<script>
  import { Citation, DensityChip, EvidenceChip, PatternCard, RelatedMedia } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Uncontrolled" classification="intersections" status="situational">
An intersection with no stop, yield, signal, or roundabout control, right-of-way resolved informally by the drivers and other road users present.
</PatternCard>

<RelatedMedia id={fm.patternId} />

Typical at: <DensityChip tier="Undeveloped" /> <DensityChip tier="Rural" />

Suburban is an edge case. Compact, Urban, and Core are unlikely pairings.

## Design notes

Uncontrolled intersections are only realistic where traffic volume is low enough on every approach that informal right-of-way resolution stays safe, which narrows this pattern to the lowest end of the density range.<Citation index={1} /> Where volume rises past that point, Stop / Yield (Two-Way) is the first applied control tier.

## Related patterns

[Stop / Yield (Two-Way)](/patterns/intersections/stop-yield/) (INT-SYD-05) (the next control tier up as volume exceeds informal right-of-way resolution, made explicit by the sentence added to this page's own Design notes)

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> SWOV Institute for Road Safety Research, "Principles for a Safe Road Network."
