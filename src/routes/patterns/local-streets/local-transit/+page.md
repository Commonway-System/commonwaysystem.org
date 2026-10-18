---
title: Local Transit
description: A Local Typology with a dedicated transit route, where transit is elevated above the rest of the Local base order.
patternId: LOC-LTR-10
status: recommended
date: 2026-08-29
image: /patterns/loc-ltr-10-local-transit.png
llms: A Local street typology carrying a dedicated transit route, with transit elevated above the rest of the Local base modal hierarchy.
---

<script>
  import { Citation, DensityChip, EvidenceChip, IdPill, ModalHierarchySection, PatternViewer, RelatedMedia, SpeedLimitSection, SpeedModalHierarchyCard } from '$lib/theme/components'
</script>

A Local street carrying a fixed transit route, most often a local bus line, where transit priority is layered onto the base pedestrian and bicycle priority rather than replacing it.

<PatternViewer image={fm.image} title={fm.title} classification="local" />

<RelatedMedia id={fm.patternId} />

<div class="cw-context">

<span class="cw-context__label">Typical at:</span> <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Undeveloped and Rural are unlikely pairings, since Local Transit assumes a rider base a low-density area typically cannot support.

</div>

## Speed and modal hierarchy

<SpeedModalHierarchyCard>
<SpeedLimitSection speeds={[20]}>
Follows the Local default: 20 mph hard maximum, no exceptions. Transit priority in the modal hierarchy below does not change the vehicle speed cap.

</SpeedLimitSection>
<ModalHierarchySection classification="local" rows={[{ tiers: ['transit', 'pedestrian', 'bicycle', 'vehicle', 'freight'] }]}>
This is an override of the Local base order, justified by the Typology's stated purpose: a designated transit route.

</ModalHierarchySection>

</SpeedModalHierarchyCard>

## Design notes

This entry is the Local-scale sibling of Collector Transit and Arterial Transit. All three follow the same override logic, moving Transit to the top of their respective base order once a route is designated, rather than treating transit priority as automatic on every street a bus happens to use.<Citation index={1} />

## Related patterns

<div class="cw-links">

- [Collector Transit](/patterns/collectors/collector-transit/) <IdPill id="COL-CTR-05" />
- [Arterial Transit (BRT/LRT)](/patterns/arterials/arterial-transit/) <IdPill id="ART-ATR-04" /> (this pattern's siblings across Functional Classification, following the same override logic per this page's own Design notes)

</div>

## Getting there: Retrofit path options

<div class="cw-links">

- [Parking-lane reallocation](/retrofits/corridor/parking-lane-reallocation/) <IdPill id="RFT-CDR-05" />
- [Transit priority lane retrofit](/retrofits/corridor/transit-priority-lane-retrofit/) <IdPill id="RFT-CDR-06" />

</div>

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> [NACTO, *Transit Street Design Guide*, 2016.](https://nacto.org/publication/transit-street-design-guide/)
