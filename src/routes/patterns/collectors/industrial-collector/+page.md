---
title: Industrial Collector
description: A Collector Typology serving industrial land use, where freight movement outranks vehicle, pedestrian, bicycle, and transit priority.
patternId: COL-IND-03
date: 2026-08-29
llms: A Collector street typology serving industrial land use, where freight movement is prioritized above vehicle, pedestrian, bicycle, and transit use.
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation, SpeedModalHierarchyCard, SpeedLimitSection, ModalHierarchySection } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Industrial Collector" classification="collector" status="recommended">
A Collector road serving warehouses, freight yards, or manufacturing land use, designed around truck movement and loading rather than the base Collector priority order.
</PatternCard>

Typical at: <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" />

Undeveloped, Rural, and Core are edge cases.

## Speed and modal hierarchy

<SpeedModalHierarchyCard>
<SpeedLimitSection speeds={[30]}>
Follows the Collector default: 30 mph standard. Freight priority in the modal hierarchy below does not change the vehicle speed cap.

</SpeedLimitSection>
<ModalHierarchySection classification="collector" rows={[{ tiers: ['freight', 'vehicle', 'pedestrian', 'bicycle', 'transit'] }]}>
An override justified because the Typology's stated purpose is freight movement to and from industrial land use.

</ModalHierarchySection>

</SpeedModalHierarchyCard>

## Design notes

Industrial land use exists across a wide density range, which is why this Typology's realistic range is broader than most Collector entries, spanning Suburban through Urban with Undeveloped, Rural, and Core all plausible as edge cases rather than clean exclusions.<Citation index={1} />

## Related patterns

[Default (Standard Collector)](/patterns/collectors/default/) (COL-DEF-01) (the base order this pattern overrides for Freight priority), [Alley](/patterns/local-streets/alley/) (LOC-ALY-02) (the other cross-Classification pattern overriding to a Vehicle/Freight-first order for a specific access purpose)

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> NACTO, *Urban Street Design Guide*, "Design Vehicle" (citing AASHTO Green Book §2-1).
