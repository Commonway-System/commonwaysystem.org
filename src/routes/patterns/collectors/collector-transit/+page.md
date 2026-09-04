---
title: Collector Transit
description: A Collector Typology with a dedicated transit route, where transit is elevated above the rest of the Collector base order.
patternId: COL-CTR-05
date: 2026-08-29
llms: A Collector street typology carrying a dedicated transit route, with transit elevated above the rest of the Collector base modal hierarchy.
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation, SpeedModalHierarchyCard, SpeedLimitSection, ModalHierarchySection } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Collector Transit" classification="collector" status="recommended">
A Collector street carrying a fixed transit route, where transit priority is layered onto the base pedestrian and bicycle priority rather than replacing it.
</PatternCard>

Typical at: <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Rural is an edge case. Undeveloped is an unlikely pairing.

## Speed and modal hierarchy

<SpeedModalHierarchyCard>
<SpeedLimitSection speeds={[30]}>
Follows the Collector default: 30 mph standard. Transit priority in the modal hierarchy below does not change the vehicle speed cap.

</SpeedLimitSection>
<ModalHierarchySection classification="collector" rows={[{ tiers: ['transit', 'pedestrian', 'bicycle', 'vehicle', 'freight'] }]}>
An override of the Collector base order justified by the Typology's stated purpose, a designated transit route.

</ModalHierarchySection>

</SpeedModalHierarchyCard>

## Design notes

This entry is the Collector-scale sibling of Local Transit and Arterial Transit, following the same override logic across all three Functional Classifications.<Citation index={1} />

## Related patterns

[Local Transit](/patterns/local-streets/local-transit/) (LOC-LTR-10) and [Arterial Transit (BRT/LRT)](/patterns/arterials/arterial-transit/) (ART-ATR-04) (this pattern's siblings across Functional Classification, per this page's own Design notes)

## Getting there: Retrofit path options

[Parking-lane reallocation](/retrofits/corridor/parking-lane-reallocation/) (RFT-CDR-05), [Transit priority lane retrofit](/retrofits/corridor/transit-priority-lane-retrofit/) (RFT-CDR-06)

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> NACTO, *Transit Street Design Guide* (2016).
