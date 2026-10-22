---
title: School Street
description: A Local Typology that closes or restricts vehicle traffic during active school hours, protecting pedestrian and bicycle arrival and dismissal.
patternId: LOC-SCH-11
status: recommended
date: 2026-08-29
image: /patterns/loc-sch-11-school-street.png
llms: A Local street typology that closes or restricts vehicle traffic during active school hours to protect pedestrian and bicycle arrival and dismissal.
---

<script>
  import { Citation, DensityChip, EvidenceChip, IdPill, ModalHierarchySection, PatternViewer, RelatedMedia, SpeedLimitSection, SpeedModalHierarchyCard } from '$lib/theme/components'
</script>

A Local street adjacent to a school that restricts or excludes vehicle traffic during arrival and dismissal, then reverts to normal Local operation the rest of the day.

<PatternViewer image={fm.image} title={fm.title} classification="local" />

<RelatedMedia id={fm.patternId} />

<div class="cw-context">

<span class="cw-context__label">Typical at:</span> <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Suburban is an edge case. Undeveloped and Rural are unlikely pairings, where schools are typically set back with dedicated drop-off lots rather than fronting a closable street.

</div>

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

On a bridge, or where it passes under a rail viaduct, this pattern carries through unchanged: its sidewalks, bike lanes, separation and speed continue across the structure. See [Streets on Bridges](/guide/streets-on-bridges/).

## Related patterns

<div class="cw-links">

- [Festival Street](/patterns/local-streets/festival-street/) <IdPill id="LOC-FES-08" /> (shares this pattern's schedule-based structure, per both pages' Design notes)

</div>

## References

1. <span id="ref-1"></span><EvidenceChip tier="evidence" /> [Gellatly, R. and Marner, B., "Air Quality Monitoring Study: London School Streets," 2021.](https://www.london.gov.uk/programmes-and-strategies/environment-and-climate-change/environment-publications/school-streets-air-quality-study)
