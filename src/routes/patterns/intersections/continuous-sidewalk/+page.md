---
title: Continuous Sidewalk / Raised Junction
description: The Commonway System's locked default treatment for Local-to-Collector intersections, keeping the sidewalk and bike path uninterrupted across the junction.
patternId: INT-CSJ-06
date: 2026-08-29
llms: The Commonway System's locked default for Local-to-Collector intersections, where the sidewalk and bike path stay uninterrupted and the roadway ramps up to meet them.
---

<script>
  import { Citation, DensityChip, EvidenceChip, PatternCard, RelatedMedia } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Continuous Sidewalk / Raised Junction" classification="intersections" status="recommended">
A junction where the sidewalk and bike path continue across the intersection at a consistent grade, and the roadway ramps up to meet them rather than the reverse. Dutch terminology;<Citation index={1} /> carries an implicit yield to pedestrians and cyclists crossing.
</PatternCard>

<RelatedMedia id={fm.patternId} />

Typical at: <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Suburban is an edge case, thinning for the same reason as Bicycle Boulevard: a disconnected, cul-de-sac-heavy grid gives it fewer places to apply. Undeveloped and Rural are unlikely pairings.

## Design notes

This is the Commonway System's locked default treatment for Local-to-Collector intersections, giving priority to people walking and biking at the exact point where a slower Local street meets a faster Collector.

## Related patterns

[Default (Standard Local Street)](/patterns/local-streets/default/) (LOC-DEF-01) (the page that names this pattern as its own locked default Local-to-Collector treatment), [Bicycle Boulevard / Neighborhood Greenway](/patterns/local-streets/bicycle-boulevard/) (LOC-BBG-12) (explicitly named on this page as thinning for the same connectivity reason)

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> CROW Platform for Transport, Infrastructure and Public Space, *Road Safety Manual* / *Design Manual for Bicycle Traffic*.
