---
title: Arterial Transit (BRT/LRT)
description: An Arterial Typology with dedicated bus rapid transit or light rail treatment, reinforcing the Arterial base order rather than overriding it.
patternId: ART-ATR-04
status: recommended
date: 2026-08-29
image: /patterns/art-atr-04-arterial-transit-brt-lrt.jpeg
llms: An Arterial street typology with dedicated bus rapid transit or light rail treatment, reinforcing rather than overriding the Arterial base modal hierarchy.
---

<script>
  import { Citation, DensityChip, EvidenceChip, IdPill, ModalHierarchySection, PatternViewer, RelatedMedia, SpeedLimitSection, SpeedModalHierarchyCard } from '$lib/theme/components'
</script>

An Arterial with dedicated bus rapid transit or light rail infrastructure, most often a separated running way or exclusive lane.

<PatternViewer image={fm.image} title={fm.title} classification="arterial" />

<RelatedMedia id={fm.patternId} />

<div class="cw-context">

<span class="cw-context__label">Typical at:</span> <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Suburban is an edge case. Undeveloped and Rural are unlikely pairings.

</div>

## Speed and modal hierarchy

<SpeedModalHierarchyCard>
<SpeedLimitSection speeds={[40, 35, 30]} stacked>
Follows the Arterial density-tiered baseline for its typical Compact, Urban, and Core contexts. Transit priority in the modal hierarchy below does not change the vehicle speed cap.

</SpeedLimitSection>
<ModalHierarchySection classification="arterial" rows={[{ tiers: ['transit', 'pedestrian', 'bicycle', 'vehicle', 'freight'] }]}>
Unlike Local Transit and Collector Transit, this ordering reinforces the Arterial base order rather than overriding it, since Transit already sits at the top of the Arterial base hierarchy.

</ModalHierarchySection>

</SpeedModalHierarchyCard>

## Design notes

Arterial is the one Functional Classification where the base modal hierarchy already puts Transit first, ahead of Pedestrian. Dedicated BRT or LRT treatment strengthens that existing priority with physical infrastructure rather than reordering it.<Citation index={1} />

On a bridge, or where it passes under a rail viaduct, this pattern carries through unchanged: its sidewalks, bike lanes, separation and speed continue across the structure. See [Streets on Bridges](/guide/streets-on-bridges/).

## Related patterns

<div class="cw-links">

- [Local Transit](/patterns/local-streets/local-transit/) <IdPill id="LOC-LTR-10" />
- [Collector Transit](/patterns/collectors/collector-transit/) <IdPill id="COL-CTR-05" /> (explicitly contrasted on this page: those two override their base order for Transit priority, while this pattern reinforces an order where Transit is already first)

</div>

## Getting there: Retrofit path options

<div class="cw-links">

- [Transit priority lane retrofit](/retrofits/corridor/transit-priority-lane-retrofit/) <IdPill id="RFT-CDR-06" />

</div>

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> [NACTO, *Transit Street Design Guide* (2016).](https://nacto.org/publication/transit-street-design-guide/)
