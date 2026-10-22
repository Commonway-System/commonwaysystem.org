---
title: Collector Transit
description: A Collector Typology with a dedicated transit route, where transit is elevated above the rest of the Collector base order.
patternId: COL-CTR-05
status: recommended
date: 2026-08-29
llms: A Collector street typology carrying a dedicated transit route, with transit elevated above the rest of the Collector base modal hierarchy.
---

<script>
  import { Citation, DensityChip, EvidenceChip, IdPill, ModalHierarchySection, PatternViewer, RelatedMedia, SpeedLimitSection, SpeedModalHierarchyCard } from '$lib/theme/components'
</script>

A Collector street carrying a fixed transit route, where transit priority is layered onto the base pedestrian and bicycle priority rather than replacing it.

<PatternViewer image={fm.image} title={fm.title} classification="collector" />

<RelatedMedia id={fm.patternId} />

<div class="cw-context">

<span class="cw-context__label">Typical at:</span> <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Rural is an edge case. Undeveloped is an unlikely pairing.

</div>

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

On a bridge, or where it passes under a rail viaduct, this pattern carries through unchanged: its sidewalks, bike lanes, separation and speed continue across the structure. See [Streets on Bridges](/guide/streets-on-bridges/).

## Related patterns

<div class="cw-links">

- [Local Transit](/patterns/local-streets/local-transit/) <IdPill id="LOC-LTR-10" />
- [Arterial Transit (BRT/LRT)](/patterns/arterials/arterial-transit/) <IdPill id="ART-ATR-04" /> (this pattern's siblings across Functional Classification, per this page's own Design notes)

</div>

## Getting there: Retrofit path options

<div class="cw-links">

- [Parking-lane reallocation](/retrofits/corridor/parking-lane-reallocation/) <IdPill id="RFT-CDR-05" />
- [Transit priority lane retrofit](/retrofits/corridor/transit-priority-lane-retrofit/) <IdPill id="RFT-CDR-06" />

</div>

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> [NACTO, *Transit Street Design Guide* (2016).](https://nacto.org/publication/transit-street-design-guide/)
