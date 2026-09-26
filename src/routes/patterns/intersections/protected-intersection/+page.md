---
title: Protected Intersection
description: A Dutch-style intersection treatment using corner refuge islands and setback crossings to reduce conflict between turning vehicles and people walking or biking.
patternId: INT-PRI-11
date: 2026-08-31
image: /patterns/int-pri-11-protected-intersection.png
llms: A Dutch-style intersection treatment using corner refuge islands and setback bicycle/pedestrian crossings to reduce conflict between turning vehicles and people walking or biking through the intersection.
---

<script>
  import { Citation, DensityChip, EvidenceChip, PatternCard, RelatedMedia } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Protected Intersection" classification="intersections" status="recommended">
A Dutch-style intersection treatment using corner refuge islands and setback bicycle/pedestrian crossings to reduce conflict between turning vehicles and people walking or biking through the intersection.
</PatternCard>

<RelatedMedia id={fm.patternId} />

Typical at: <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Suburban is an edge case. Undeveloped and Rural contexts are an unlikely pairing.

## Design notes

The first addition to Intersections & Crossings since the original ten. Addresses a specific, well-documented failure mode of conventional intersections, insufficient separation between turning vehicles and through bicycle/pedestrian traffic, that no other pattern in the set directly solves.<Citation index={1} />

Corner islands should provide genuine physical refuge, not a painted buffer alone. Crossing setback distance should give turning drivers a clear sightline and adequate reaction distance to pedestrians and cyclists.

Compatible with, and often paired with, [Roundabout](/patterns/intersections/roundabout/) (INT-RAB-01) as the default intersection treatment.

## Turning trucks

Vehicles making a turn are involved in a disproportionate share of fatal pedestrian and cyclist crashes relative to vehicles going straight, and that risk rises sharply with vehicle size.<Citation index={2} /><Citation index={3} /> See [Signal](/patterns/intersections/signal/) for the general pattern.

Where a truck route runs through this intersection, setting the bicycle stop bar back keeps a cyclist waiting at the intersection out of a turning truck's swept path. Where a bicycle signal phase exists, separating bicycle and truck turning movements in time, not just space, closes the gap a setback stop bar alone cannot.<Citation index={4} />

## Related patterns

- [Roundabout (Single/Multi-Lane)](/patterns/intersections/roundabout/) (INT-RAB-01)

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> [Falbo, Nick, "Protected Intersections for Bicyclists," ProtectedIntersection.com (2014).](http://www.protectedintersection.com/)
2. <span id="ref-2"></span><EvidenceChip tier="evidence" /> [U.S. Government Accountability Office, *Pedestrian and Cyclist Safety: DOT Should Take Steps to Address Risks Related to Limited Driver Visibility*, GAO-26-107954 (2026).](https://www.gao.gov/products/gao-26-107954)
3. <span id="ref-3"></span><EvidenceChip tier="evidence" /> [Wang, Q. et al., "Exploring the Influencing Factors and Formation of the Blind Zone of a Semitrailer Truck in a Right-Turn Collision," *Sustainability* 14(16), 9805 (2022).](https://doi.org/10.3390/su14169805)
4. <span id="ref-4"></span><EvidenceChip tier="precedent" /> [Seattle Streets Illustrated, 3.11 "Freight" (setback bike lane stop bars and bicycle signals as tools against large-truck turning movements).](https://streetsillustrated.seattle.gov/design-standards/freight/)
