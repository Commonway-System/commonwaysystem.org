---
title: Default (Standard Collector)
description: The baseline Collector street typology, carrying the base modal hierarchy and 30 mph standard speed with no named override.
patternId: COL-DEF-01
date: 2026-08-29
llms: The baseline Collector street, applying the base modal hierarchy and 30 mph standard speed with no named override.
---

<script>
  import { Citation, DensityChip, EvidenceChip, ModalHierarchySection, PatternCard, RelatedMedia, SpeedLimitSection, SpeedModalHierarchyCard } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Default (Standard Collector)" classification="collector" status="recommended">
The baseline Collector street. No special land use, freight function, or dedicated mode gives it a name of its own, so it carries the base Collector modal hierarchy and speed rule unmodified.
</PatternCard>

<RelatedMedia id={fm.patternId} />

Typical at: <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Rural is an edge case. Undeveloped is an unlikely pairing.

## Speed and modal hierarchy

<SpeedModalHierarchyCard>
<SpeedLimitSection speeds={[30, 35]} guideLink={false}>
30 mph standard. 35 mph is permitted only with rigid crash-protective separation, a concrete barrier rather than delineator posts, following FHWA's own distinction between the two.<Citation index={1} />

</SpeedLimitSection>
<ModalHierarchySection classification="collector" rows={[{ tiers: ['pedestrian', 'bicycle', 'transit', 'vehicle', 'freight'] }]}>
Modal hierarchy follows the Collector base order, the same shape as Local. The higher speed tier loosens the practical design treatment, crossing spacing and separation, without changing the rank order.

</ModalHierarchySection>

</SpeedModalHierarchyCard>

## Design notes

This entry is the standard against which every other Collector Typology is defined as an override, the same role Default plays within Local.

## Related patterns

[Default (Standard Local Street)](/patterns/local-streets/default/) (LOC-DEF-01) and [Default (No Parking, No Direct Property Access)](/patterns/arterials/default/) (ART-DEF-01) (the equivalent baseline reference point one Functional Classification down and up, completing the three-tier chain)

## Getting there: Retrofit path options

[Four-to-three lane road diet](/retrofits/corridor/four-to-three-lane-road-diet/) (RFT-CDR-01), [Lane diet](/retrofits/corridor/lane-diet/) (RFT-CDR-03), [Protected bike lane retrofit via lane-width reallocation](/retrofits/corridor/protected-bike-lane-width-reallocation/) (RFT-CDR-07), [Protected bike lane retrofit via parking reduction](/retrofits/corridor/protected-bike-lane-parking-reduction/) (RFT-CDR-09)

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> FHWA, *Separated Bike Lane Planning and Design Guide*.
