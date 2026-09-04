---
title: Shared-Use Path
description: An off-street Local Typology physically separated from the roadway, shared by pedestrians and bicyclists under roughly equal priority.
patternId: LOC-SUP-13
date: 2026-08-31
llms: A Local street typology for an off-street path physically separated from the roadway, shared by pedestrians and bicyclists under roughly equal priority, connecting local-scale destinations.
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation, SpeedModalHierarchyCard, ModalHierarchySection } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Shared-Use Path" classification="local" status="recommended">
An off-street path physically separated from the roadway, shared by pedestrians and bicyclists under roughly equal priority, connecting local-scale destinations.
</PatternCard>

Typical at: <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Undeveloped and Rural contexts are unlikely to carry a purpose-built shared-use path.

## Modal hierarchy

<SpeedModalHierarchyCard>
<ModalHierarchySection classification="local" rows={[{ tiers: [['pedestrian', 'bicycle']] }]}>
Pedestrian and Bicycle share top priority under this pattern's own equal-priority definition, no ranking between the two. Transit, Vehicle, and Freight do not apply off-street; Design Speed & Speed Limits doesn't apply here, since this pattern excludes automobiles entirely.
</ModalHierarchySection>
</SpeedModalHierarchyCard>

## Design notes

Width should accommodate two-way pedestrian and bicycle travel without forcing conflict, with connections back to the street network at logical, safe, visible points rather than incidental gaps.<Citation index={1} /> Distinct from [Bicycle Boulevard / Neighborhood Greenway](/patterns/local-streets/bicycle-boulevard/) (LOC-BBG-12), which shares an on-street roadway rather than separating off-street, and from [Multi-Use Trail / Greenway](/patterns/collectors/multi-use-trail-greenway/) (COL-MUT-06), which is longer-distance and destination-scale rather than local-connector scale.

## Related patterns

- [Bicycle Boulevard / Neighborhood Greenway](/patterns/local-streets/bicycle-boulevard/) (LOC-BBG-12)
- [Multi-Use Trail / Greenway](/patterns/collectors/multi-use-trail-greenway/) (COL-MUT-06)

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> AASHTO, *Guide for the Development of Bicycle Facilities*, 5th Edition, 2024.
