---
title: Boulevard
description: An Arterial Typology combining through traffic with a pedestrian-first frontage, including the Multiway Boulevard variant with medians separating frontage from through lanes.
patternId: ART-BLV-02
date: 2026-08-29
llms: An Arterial street typology combining through traffic with a pedestrian-first frontage, including the Multiway Boulevard variant, which separates frontage roads from through lanes with planted medians.
---

<script>
  import viewerData from '$lib/data/street-configs/art-blv-02'
  import { Citation, DensityChip, EvidenceChip, ModalHierarchySection, PatternCard, PatternViewer, RelatedMedia, SpeedLimitSection, SpeedModalHierarchyCard } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Boulevard" classification="arterial" status="recommended">
An Arterial with a wide, pedestrian-first frontage alongside through traffic lanes, typically featuring a planted median or landscaped buffer. Includes the Multiway Boulevard variant, where frontage roads are separated from through lanes by planted medians, such as Octavia Boulevard.<Citation index={1} />
</PatternCard>

<PatternViewer data={viewerData} image={fm.image} title={fm.title} classification="arterial" />

<RelatedMedia id={fm.patternId} />

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

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> [Jacobs, A., Macdonald, E., and Rofé, Y., *The Boulevard Book* (MIT Press, 2002).](https://mitpress.mit.edu/9780262100908/the-boulevard-book/)
2. <span id="ref-2"></span><EvidenceChip tier="evidence" /> [Jacobs, A. B., Rofé, Y. Y., and Macdonald, E., "Guidelines for the Design of Multiple Roadway Boulevards," University of California Transportation Center, UCTC No. 500. A 100 ft right-of-way is the feasible minimum (a 40 ft center roadway flanked by 30 ft pedestrian realms); medians from 5 ft up to 40 to 50 ft with closely spaced trees; parking lanes narrow, 6 or 7 ft.](https://escholarship.org/uc/item/2qn5820b)
3. <span id="ref-3"></span><EvidenceChip tier="legal" /> [City and County of San Francisco, *Better Streets Plan*, "Multi-way Boulevards" (archived): side medians preferably 10 ft wide, including 6 ft for landscaping and street trees; considered where the right-of-way is generally more than 100 ft, as little as 86 ft at minimum.](https://sfbetterstreets.org/design-guidelines/street-types/multi-way-boulevards/)
