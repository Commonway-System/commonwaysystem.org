---
title: Rural Collector / Farm-to-Market Road
description: A Collector Typology moving vehicle and freight traffic through low-density agricultural or undeveloped land, the norm at Undeveloped and Rural density.
patternId: COL-FTM-02
date: 2026-08-29
llms: A Collector street typology serving vehicle and freight movement through low-density agricultural or undeveloped land, the norm at Undeveloped and Rural density and effectively absent past Suburban.
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation, SpeedModalHierarchyCard, SpeedLimitSection, ModalHierarchySection } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Rural Collector / Farm-to-Market Road" classification="collector" status="recommended">
A Collector road connecting low-density or agricultural land to the wider network, prioritizing vehicle and freight movement over pedestrian, bicycle, and transit use, which have little demand at this density.
</PatternCard>

Typical at: <DensityChip tier="Undeveloped" /> <DensityChip tier="Rural" />

Suburban is an edge case. Compact, Urban, and Core are unlikely pairings.

## Speed and modal hierarchy

<SpeedModalHierarchyCard>
<SpeedLimitSection speeds={[30]}>
Follows the Collector default: 30 mph standard.

</SpeedLimitSection>
<ModalHierarchySection classification="collector" rows={[{ tiers: ['vehicle', 'freight', 'pedestrian', 'bicycle', 'transit'] }]}>
A judgment call reasoned from the Typology's purpose rather than derived cleanly from a listed override trigger, and open for correction.

</ModalHierarchySection>

</SpeedModalHierarchyCard>

## Design notes

This entry is the mirror image of Main Street: the norm at Undeveloped and Rural density, and effectively disappearing past Suburban as land use shifts away from agricultural or undeveloped character. Dutch research on low-conflict Rural Collectors informs this Typology's design logic.<Citation index={1} />

## Related patterns

[Main Street](/patterns/local-streets/main-street/) (LOC-MST-05) (explicitly named on this page as this pattern's mirror image), [Default (Standard Collector)](/patterns/collectors/default/) (COL-DEF-01) (the base order this pattern overrides)

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> SWOV, "Principles for a Safe Road Network" (CROW Sustainable Safety framework).
