---
title: Protected Intersection
description: A Dutch-style intersection treatment using corner refuge islands and setback crossings to reduce conflict between turning vehicles and people walking or biking.
patternId: INT-PRI-11
date: 2026-08-31
llms: A Dutch-style intersection treatment using corner refuge islands and setback bicycle/pedestrian crossings to reduce conflict between turning vehicles and people walking or biking through the intersection.
---

<script>
  import { PatternCard, DensityChip } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Protected Intersection" classification="intersections" status="recommended">
A Dutch-style intersection treatment using corner refuge islands and setback bicycle/pedestrian crossings to reduce conflict between turning vehicles and people walking or biking through the intersection.
</PatternCard>

Typical at: <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Suburban is an edge case. Undeveloped and Rural contexts are an unlikely pairing.

## Design notes

The first addition to Intersections & Crossings since the original ten. Addresses a specific, well-documented failure mode of conventional intersections, insufficient separation between turning vehicles and through bicycle/pedestrian traffic, that no other pattern in the set directly solves.

Corner islands should provide genuine physical refuge, not a painted buffer alone. Crossing setback distance should give turning drivers a clear sightline and adequate reaction distance to pedestrians and cyclists.

Compatible with, and often paired with, [Roundabout](/patterns/intersections/roundabout/) (INT-RAB-01) as the default intersection treatment.

## Related patterns

- [Roundabout (Single/Multi-Lane)](/patterns/intersections/roundabout/) (INT-RAB-01)

:::unsourced
Formal citations for this pattern have not yet been compiled from primary sources.
:::
