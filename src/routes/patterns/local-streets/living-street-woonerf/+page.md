---
title: Living Street / Woonerf
description: A Local Typology where pedestrians and cyclists share the full street width with vehicles, who move at walking pace as guests. Includes NACTO's Home Zone.
patternId: LOC-LSW-06
date: 2026-08-29
llms: A Local street typology, including NACTO's Home Zone, where pedestrians and cyclists share the full street width and vehicles move as guests at walking pace.
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation, SpeedModalHierarchyCard, SpeedLimitSection, ModalHierarchySection } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Living Street / Woonerf" classification="local" status="recommended">
A Local street with no separation between the pedestrian, bicycle, and vehicle space. Vehicles are guests, moving at walking pace and yielding to people on foot or bike by design, not by signage alone.
</PatternCard>

Typical at: <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Suburban is an edge case. Undeveloped and Rural are unlikely pairings.

## Speed and modal hierarchy

<SpeedModalHierarchyCard>
<SpeedLimitSection speeds={[20]}>
Follows the Local default: 20 mph hard maximum, no exceptions. In practice, the shared-surface design typically produces actual speeds well below this ceiling.

</SpeedLimitSection>
<ModalHierarchySection classification="local" rows={[{ tiers: ['pedestrian', 'bicycle', 'vehicle', 'transit', 'freight'] }]}>
Vehicle ranks third as a guest in this order, not a peer road user: it moves at walking pace and yields to people on foot or bike by design.

</ModalHierarchySection>

</SpeedModalHierarchyCard>

## Design notes

NACTO's Home Zone is, strictly, an area-wide overlay rather than a distinct street type of its own, but the Commonway System folds it into this single entry rather than tracking it separately, since the on-the-ground design treatment is the same shared, no-separation street.<Citation index={1} />

## Related patterns

[Yield Street](/patterns/local-streets/yield-street/) (LOC-YLD-07) (the other Local pattern using street geometry itself, rather than signage, as the calming mechanism)

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> Ben-Joseph, E. (1995), "Changing the Residential Street Scene: Adapting the Shared Street (Woonerf) Concept to the Suburban Environment," *Journal of the American Planning Association* 61(4).
