---
title: One-Way Street
description: An Arterial Typology, Situational/Discouraged status, retaining the base modal hierarchy despite a design tendency to encourage speeding.
patternId: ART-OWS-06
date: 2026-08-29
llms: An Arterial street typology marked Situational/Discouraged, since one-way operation tends to encourage speeding even though it retains the Arterial base modal hierarchy on paper.
---

<script>
  import { Citation, DensityChip, EvidenceChip, ModalHierarchySection, PatternCard, RelatedMedia, SpeedLimitSection, SpeedModalHierarchyCard } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="One-Way Street" classification="arterial" status="situational">
An Arterial operating one direction of travel only, typically paired with a second one-way Arterial carrying the opposite direction nearby.
</PatternCard>

<RelatedMedia id={fm.patternId} />

Typical at: <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Suburban is an edge case. Undeveloped and Rural are unlikely pairings.

:::warning
One-Way Street carries Situational/Discouraged status. It tends to encourage speeding, since drivers no longer need to watch for oncoming traffic.<Citation index={1} />
:::

## Speed and modal hierarchy

<SpeedModalHierarchyCard>
<SpeedLimitSection speeds={[40, 35, 30]} stacked>
Follows the Arterial density-tiered baseline for its typical Compact, Urban, and Core contexts.

</SpeedLimitSection>
<ModalHierarchySection classification="arterial" rows={[{ tiers: ['transit', 'pedestrian', 'bicycle', 'vehicle', 'freight'] }]}>
The modal hierarchy is retained at the Arterial base order rather than reassigned, a deliberate choice that signals the conflict between the pattern's real-world speeding effect and its nominal priority order, rather than papering over it with a different hierarchy.

</ModalHierarchySection>

</SpeedModalHierarchyCard>

## Design notes

Discouraged status here does not mean the pattern is banned; it means adopting it requires weighing the speeding tendency against whatever benefit, often traffic flow or signal progression, motivated the one-way conversion in the first place.

## Related patterns

[Default (No Parking, No Direct Property Access)](/patterns/arterials/default/) (ART-DEF-01) (the two-way form this page's own citation, Riggs and Gilderbloom's evidence-based research on two-way conversion's livability gains, supports converting to, rather than the base order this pattern deliberately retains without reassigning)

## References

1. <span id="ref-1"></span><EvidenceChip tier="evidence" /> Riggs, W. and Gilderbloom, J., "Two-Way Street Conversion: Evidence of Increased Livability in Louisville," *Journal of Planning Education and Research* 36(1), 2016.
