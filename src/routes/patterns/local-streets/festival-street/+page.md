---
title: Festival Street
description: A Local Typology that closes to vehicle traffic during scheduled events and reverts to the base modal hierarchy off-hours.
patternId: LOC-FES-08
date: 2026-08-29
llms: A Local street typology that closes to vehicle traffic during scheduled events and reverts to the base Local modal hierarchy off-hours.
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation, SpeedModalHierarchyCard, SpeedLimitSection, ModalHierarchySection } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Festival Street" classification="local" status="recommended">
A Local street designed to convert between full vehicle access and a pedestrian-and-bicycle-only event space, on a schedule rather than permanently.
</PatternCard>

Typical at: <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Compact is an edge case. Undeveloped, Rural, and Suburban are unlikely pairings.

## Speed and modal hierarchy

<SpeedModalHierarchyCard>
<SpeedLimitSection speeds={[20]}>
Vehicle access is excluded entirely during scheduled events. Outside of events, the Local default applies: 20 mph hard maximum, no exceptions.

</SpeedLimitSection>
<ModalHierarchySection classification="local" rows={[{ label: 'During events:', tiers: ['pedestrian', 'bicycle'] }, { label: 'Off-hours:', tiers: ['pedestrian', 'bicycle', 'transit', 'vehicle', 'freight'] }]}>
This pattern carries two separate modal hierarchies depending on time of day, not one: full pedestrian/bicycle exclusivity during scheduled events, the Local base order the rest of the time.

</ModalHierarchySection>

</SpeedModalHierarchyCard>

## Design notes

The dual-mode design, full street for events and normal Local operation otherwise, is what distinguishes this from a permanent Pedestrian-only Street or Plaza. It requires enough event demand and foot traffic to justify the conversion, which is why it concentrates at Urban and Core density.<Citation index={1} />

## Related patterns

[Pedestrian-only Street / Plaza](/patterns/local-streets/pedestrian-plaza/) (LOC-PED-09) (the permanent version of what this pattern does on a schedule), [School Street](/patterns/local-streets/school-street/) (LOC-SCH-11) (shares this pattern's schedule-based structure, per both pages' Design notes)

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> Seattle Municipal Code §11.14.203, "Festival Streets."
