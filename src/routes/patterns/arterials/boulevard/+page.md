---
title: Boulevard
description: An Arterial Typology combining through traffic with a pedestrian-first frontage, including the Multiway Boulevard variant with medians separating frontage from through lanes.
patternId: ART-BLV-02
date: 2026-08-29
llms: An Arterial street typology combining through traffic with a pedestrian-first frontage, including the Multiway Boulevard variant, which separates frontage roads from through lanes with planted medians.
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation, SpeedModalHierarchyCard, SpeedLimitSection, ModalHierarchySection } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Boulevard" classification="arterial" status="recommended">
An Arterial with a wide, pedestrian-first frontage alongside through traffic lanes, typically featuring a planted median or landscaped buffer. Includes the Multiway Boulevard variant, where frontage roads are separated from through lanes by planted medians, such as Octavia Boulevard.<Citation index={1} />
</PatternCard>

Typical at: <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Suburban is an edge case. Undeveloped and Rural are unlikely pairings.

## Speed and modal hierarchy

<SpeedModalHierarchyCard>
<SpeedLimitSection speeds={[40, 35, 30]} stacked>
Follows the Arterial density-tiered baseline for its typical Compact, Urban, and Core contexts.

</SpeedLimitSection>
<ModalHierarchySection classification="arterial" rows={[{ tiers: ['pedestrian', 'transit', 'bicycle', 'vehicle', 'freight'] }]}>
A judgment call reasoned from the Typology's purpose rather than derived cleanly from a listed override trigger, and open for correction.

</ModalHierarchySection>

</SpeedModalHierarchyCard>

## Design notes

Multiway Boulevard is confirmed as a named variant folded into this single entry rather than split into its own Typology, since both share the same underlying logic: separating slower, frontage-facing movement from faster through traffic within one right-of-way.

## Related patterns

[Default (No Parking, No Direct Property Access)](/patterns/arterials/default/) (ART-DEF-01) (the base Arterial rule this pattern applies pedestrian-first frontage to), [Stroad (Commercial Arterial)](/patterns/arterials/stroad/) (ART-STD-05) (named in Stroad's own "Instead, see" list as one of its two replacement patterns), [Median Island](/patterns/elements/median-island/) (ELM-MDI-45) (the Element pattern this corridor most often carries)

## Getting there: Retrofit path options

[Five-plus lane reallocation](/retrofits/corridor/five-plus-lane-reallocation/) (RFT-CDR-02)

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> Jacobs, A., Macdonald, E., and Rofé, Y., *The Boulevard Book* (MIT Press, 2002).
