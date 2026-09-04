---
title: Arterial Transit (BRT/LRT)
description: An Arterial Typology with dedicated bus rapid transit or light rail treatment, reinforcing the Arterial base order rather than overriding it.
patternId: ART-ATR-04
date: 2026-08-29
llms: An Arterial street typology with dedicated bus rapid transit or light rail treatment, reinforcing rather than overriding the Arterial base modal hierarchy.
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation, SpeedModalHierarchyCard, SpeedLimitSection, ModalHierarchySection } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Arterial Transit (BRT/LRT)" classification="arterial" status="recommended">
An Arterial with dedicated bus rapid transit or light rail infrastructure, most often a separated running way or exclusive lane.
</PatternCard>

Typical at: <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Suburban is an edge case. Undeveloped and Rural are unlikely pairings.

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

## Related patterns

[Local Transit](/patterns/local-streets/local-transit/) (LOC-LTR-10) and [Collector Transit](/patterns/collectors/collector-transit/) (COL-CTR-05) (explicitly contrasted on this page: those two override their base order for Transit priority, while this pattern reinforces an order where Transit is already first)

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> NACTO, *Transit Street Design Guide* (2016).
