---
title: Scenic Highway / Byway
description: A low-density, low-development-pressure Arterial Typology, the norm at Undeveloped and Rural density and an unlikely pairing past Compact.
patternId: ART-SCB-03
status: recommended
date: 2026-08-29
image: /patterns/art-scb-03-scenic-highway-byway.png
llms: A low-density, low-development-pressure Arterial street typology, the norm at Undeveloped and Rural density, an unlikely pairing past Compact density.
---

<script>
  import { Citation, DensityChip, EvidenceChip, IdPill, ModalHierarchySection, PatternViewer, RelatedMedia, SpeedLimitSection, SpeedModalHierarchyCard } from '$lib/theme/components'
</script>

An Arterial through a low-development, often scenic landscape, where vehicle movement is prioritized and pedestrian, bicycle, and transit demand are minimal.<Citation index={1} />

<PatternViewer image={fm.image} title={fm.title} classification="arterial" />

<RelatedMedia id={fm.patternId} />

<div class="cw-context">

<span class="cw-context__label">Typical at:</span> <DensityChip tier="Undeveloped" /> <DensityChip tier="Rural" />

Suburban is an edge case. Compact, Urban, and Core are unlikely pairings.

</div>

## Speed and modal hierarchy

<SpeedModalHierarchyCard>
<SpeedLimitSection speeds={[55]} stacked>
Follows the Arterial density-tiered baseline for its typical Undeveloped/Rural context.

</SpeedLimitSection>
<ModalHierarchySection classification="arterial" rows={[{ tiers: ['vehicle', 'bicycle', 'pedestrian', 'transit', 'freight'] }]}>
Whether Freight should be excluded outright rather than simply ranked last is an open call.

</ModalHierarchySection>

</SpeedModalHierarchyCard>

## Design notes

This entry follows the same shape as Rural Collector/Farm-to-Market Road: a low-density, low-development-pressure pattern that is the norm where it applies and effectively disappears as density rises.

## Related patterns

<div class="cw-links">

- [Rural Collector / Farm-to-Market Road](/patterns/collectors/rural-collector/) <IdPill id="COL-FTM-02" /> (explicitly named on this page as following the same shape)

</div>

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> [23 U.S.C. § 162, National Scenic Byways Program.](https://www.law.cornell.edu/uscode/text/23/162)
