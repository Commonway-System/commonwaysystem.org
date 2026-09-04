---
title: Pedestrian-only Street / Plaza
description: A Local Typology, Situational status, excluding vehicle traffic entirely in favor of pedestrians and, where permitted, bicycles.
patternId: LOC-PED-09
date: 2026-08-29
llms: A Local street typology, marked Situational, that excludes vehicle traffic entirely in favor of pedestrians and, where permitted, bicycles.
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation, SpeedModalHierarchyCard, ModalHierarchySection } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Pedestrian-only Street / Plaza" classification="local" status="situational">
A Local street or plaza space that excludes vehicle traffic permanently, not on an event schedule the way a Festival Street does.
</PatternCard>

Typical at: <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Compact is an edge case. Undeveloped, Rural, and Suburban are unlikely pairings.

:::warning
Pedestrian-only Street / Plaza carries Situational status. Full vehicle exclusion is only realistic where surrounding land use and network connectivity can absorb the displaced access, which concentrates this pattern at Urban and Core density.
:::

## Modal hierarchy

<SpeedModalHierarchyCard>
<ModalHierarchySection classification="local" rows={[{ tiers: ['pedestrian', 'bicycle'] }]}>
Where permitted, Bicycle ranks second. All other modes are excluded rather than ranked; Design Speed & Speed Limits doesn't apply here, since this pattern excludes automobiles entirely.
</ModalHierarchySection>
</SpeedModalHierarchyCard>

## Design notes

Unlike Festival Street, which toggles between full and pedestrian-only operation, this Typology's exclusion of vehicles is permanent. That makes it a heavier commitment, appropriate only where the surrounding block can genuinely support it.<Citation index={1} />

## Related patterns

[Festival Street](/patterns/local-streets/festival-street/) (LOC-FES-08) (the scheduled version of this pattern's permanent vehicle exclusion), [Plaza / Parklet](/patterns/facilities/plaza-parklet/) (FAC-PLZ-07) (the Facility-scale pattern for a comparable public-space treatment)

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> NACTO, *Urban Street Design Guide*, "Pedestrian Streets" and "Public Plazas."
