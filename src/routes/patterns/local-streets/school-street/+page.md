---
title: School Street
description: A Local Typology that closes or restricts vehicle traffic during active school hours, protecting pedestrian and bicycle arrival and dismissal.
patternId: LOC-SCH-11
date: 2026-08-29
llms: A Local street typology that closes or restricts vehicle traffic during active school hours to protect pedestrian and bicycle arrival and dismissal.
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation, SpeedModalHierarchyCard, SpeedLimitSection, ModalHierarchySection } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="School Street" classification="local" status="recommended">
A Local street adjacent to a school that restricts or excludes vehicle traffic during arrival and dismissal, then reverts to normal Local operation the rest of the day.
</PatternCard>

Typical at: <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Suburban is an edge case. Undeveloped and Rural are unlikely pairings, where schools are typically set back with dedicated drop-off lots rather than fronting a closable street.

## Speed and modal hierarchy

<SpeedModalHierarchyCard>
<SpeedLimitSection speeds={[20]}>
Vehicle access is restricted or excluded during arrival and dismissal. Outside of active hours, the Local default applies: 20 mph hard maximum, no exceptions.

</SpeedLimitSection>
<ModalHierarchySection classification="local" rows={[{ label: 'During active hours:', tiers: ['pedestrian', 'bicycle'] }, { label: 'Off-hours:', tiers: ['pedestrian', 'bicycle', 'transit', 'vehicle', 'freight'] }]}>
This pattern carries two separate modal hierarchies depending on time of day, not one: full pedestrian/bicycle exclusivity during arrival and dismissal, the Local base order the rest of the time.

</ModalHierarchySection>

</SpeedModalHierarchyCard>

## Design notes

This Typology and Festival Street share the same schedule-based structure, full closure or restriction during a defined window, base operation otherwise. Both were added to the system after a NACTO gap-check identified time-restricted street patterns not otherwise covered by the core Local set.<Citation index={1} />

## Related patterns

[Festival Street](/patterns/local-streets/festival-street/) (LOC-FES-08) (shares this pattern's schedule-based structure, per both pages' Design notes)

## References

1. <span id="ref-1"></span><EvidenceChip tier="evidence" /> Gellatly, R. and Marner, B., "Air Quality Monitoring Study: London School Streets," 2021.
