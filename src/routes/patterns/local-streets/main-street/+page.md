---
title: Main Street
description: A Local Typology built around retail frontage and pedestrian priority, the defining Local pattern at Compact and Urban density.
patternId: LOC-MST-05
date: 2026-08-29
llms: A Local street typology built around retail frontage and pedestrian priority, the small-town pattern at Rural density and the defining Local pattern at Compact and Urban density.
---

<script>
  import { Citation, DensityChip, EvidenceChip, ModalHierarchySection, PatternCard, RelatedMedia, SpeedLimitSection, SpeedModalHierarchyCard } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Main Street" classification="local" status="recommended">
A Local street lined with retail and commercial frontage, where pedestrian movement and lingering are treated as primary and vehicle movement is subordinate.
</PatternCard>

<RelatedMedia id={fm.patternId} />

Typical at: <DensityChip tier="Compact" /> <DensityChip tier="Urban" />

Rural, Suburban, and Core are edge cases: a small-town pattern at Rural, less common at Suburban, and tapering at Core where retail frontage folds into larger mixed-use blocks. Undeveloped is an unlikely pairing.

## Speed and modal hierarchy

<SpeedModalHierarchyCard>
<SpeedLimitSection speeds={[20]}>
Follows the Local default: 20 mph hard maximum, no exceptions.

</SpeedLimitSection>
<ModalHierarchySection classification="local" rows={[{ tiers: ['pedestrian', 'transit', 'bicycle', 'vehicle', 'freight'] }]}>
This ordering is a judgment call, reasoned from the Typology's purpose rather than derived cleanly from a listed override trigger, and is open for correction.

</ModalHierarchySection>

</SpeedModalHierarchyCard>

## Design notes

Main Street is the clearest case where a Local street's identity comes from its edge condition, retail frontage, rather than from a special traffic control treatment. It shares its defining density range with Stroad, the Arterial-scale pattern for commercial frontage done wrong.<Citation index={1} />

## Related patterns

[Stroad (Commercial Arterial)](/patterns/arterials/stroad/) (ART-STD-05) (shares this pattern's defining density range), [Downtown Thoroughfare](/patterns/collectors/downtown-thoroughfare/) (COL-DTH-07) (the Collector-scale pattern for a comparable commercial-thoroughfare hybrid)

## Getting there: Retrofit path options

[One-way to two-way conversion](/retrofits/corridor/one-way-to-two-way-conversion/) (RFT-CDR-04)

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> NACTO, *Urban Street Design Guide*, "Neighborhood Main Street."
