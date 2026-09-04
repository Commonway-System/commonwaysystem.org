---
title: Multi-Use Trail / Greenway
description: An off-street Collector Typology shared by pedestrians and bicyclists under roughly equal priority, longer-distance and often a destination in its own right.
patternId: COL-MUT-06
date: 2026-08-31
llms: A Collector street typology for an off-street path shared by pedestrians and bicyclists under roughly equal priority, longer-distance and often a destination in its own right, such as a rail-trail or linear park path.
---

<script>
  import { Citation, DensityChip, EvidenceChip, ModalHierarchySection, PatternCard, RelatedMedia, SpeedModalHierarchyCard } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Multi-Use Trail / Greenway" classification="collector" status="recommended">
An off-street path shared by pedestrians and bicyclists under roughly equal priority, similar to Shared-Use Path but longer-distance and often a destination in its own right, such as a rail-trail or linear park path.
</PatternCard>

<RelatedMedia id={fm.patternId} />

Typical at: <DensityChip tier="Rural" /> <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Undeveloped contexts are an unlikely pairing.

## Modal hierarchy

<SpeedModalHierarchyCard>
<ModalHierarchySection classification="collector" rows={[{ tiers: [['pedestrian', 'bicycle']] }]}>
Pedestrian and Bicycle share top priority under this pattern's own equal-priority definition, no ranking between the two. Transit, Vehicle, and Freight do not apply off-street; Design Speed & Speed Limits doesn't apply here, since this pattern excludes automobiles entirely.
</ModalHierarchySection>
</SpeedModalHierarchyCard>

## Design notes

Distinct from [Bike Highway / Greenway](/patterns/collectors/bike-highway-greenway/) (COL-BHG-04), which is bicycle-priority rather than equal-priority, and longer-distance than [Shared-Use Path](/patterns/local-streets/shared-use-path/) (LOC-SUP-13), with wayfinding and rest amenities mattering more at this length. Appropriate where the trail itself is a recreational or civic destination, not just a through-corridor. Where it runs parallel to a road for a meaningful stretch, see [Road-Adjacent Greenway](/patterns/corridors/road-adjacent-greenway/) (CDR-RAG-05) for the corridor-scale relationship.<Citation index={1} />

## Related patterns

- [Shared-Use Path](/patterns/local-streets/shared-use-path/) (LOC-SUP-13)
- [Bike Highway / Greenway](/patterns/collectors/bike-highway-greenway/) (COL-BHG-04)
- [Road-Adjacent Greenway](/patterns/corridors/road-adjacent-greenway/) (CDR-RAG-05)

## Getting there: Retrofit path options

[Barrier-crossing / network reconnection retrofit](/retrofits/network/barrier-crossing-network-reconnection-retrofit/) (RFT-NET-03) commonly takes this form where it crosses a highway, rail line, or disconnected cul-de-sac pattern.

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> AASHTO, *Guide for the Development of Bicycle Facilities*, 5th Edition (2024).
