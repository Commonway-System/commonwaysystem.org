---
title: Bike Highway / Greenway
description: A Collector-scale Typology providing a dedicated, physically separated bicycle path, distinct from Local's shared-roadway Bicycle Boulevard.
patternId: COL-BHG-04
date: 2026-08-29
llms: A Collector-scale street typology providing a dedicated, physically separated bicycle path, distinct from Local's shared-roadway Bicycle Boulevard.
---

<script>
  import { Citation, DensityChip, EvidenceChip, ModalHierarchySection, PatternCard, RelatedMedia, SpeedModalHierarchyCard } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Bike Highway / Greenway" classification="collector" status="recommended">
A dedicated, physically separated bicycle path operating at Collector scale, prioritizing continuous, higher-speed bicycle through-movement over other modes.
</PatternCard>

<RelatedMedia id={fm.patternId} />

Typical at: <DensityChip tier="Undeveloped" /> <DensityChip tier="Rural" /> <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" />

Core is an edge case, since a dedicated separated path competes for limited right-of-way with other demands at the highest density tier.

## Modal hierarchy

<SpeedModalHierarchyCard>
<ModalHierarchySection classification="collector" rows={[{ tiers: ['bicycle', 'pedestrian', 'transit', 'vehicle', 'freight'] }]}>
An override justified because the Typology's stated purpose is dedicated bicycle through-movement. Design Speed & Speed Limits doesn't apply here, since this pattern excludes automobiles entirely.
</ModalHierarchySection>
</SpeedModalHierarchyCard>

## Design notes

Distinct from Local's Bicycle Boulevard, which shares the roadway with calmed vehicle traffic, this Typology is physically separated infrastructure, closer in function to a linear park path or a rail-trail than to a shared street. It is realistic across nearly the full density range, since a separated path is not dependent on the surrounding street grid the way a shared-roadway Typology is.<Citation index={1} />

## Related patterns

[Bicycle Boulevard / Neighborhood Greenway](/patterns/local-streets/bicycle-boulevard/) (LOC-BBG-12) (explicitly distinguished on this page: shared calmed roadway vs. this pattern's physical separation), [Multi-Use Trail / Greenway](/patterns/collectors/multi-use-trail-greenway/) (COL-MUT-06) (a similarly-named Collector-scale pattern this one is specifically distinct from)

## Getting there: Retrofit path options

[Protected bike lane retrofit via lane-width reallocation](/retrofits/corridor/protected-bike-lane-width-reallocation/) (RFT-CDR-07), via [lane removal](/retrofits/corridor/protected-bike-lane-lane-removal/) (RFT-CDR-08), via [parking reduction](/retrofits/corridor/protected-bike-lane-parking-reduction/) (RFT-CDR-09)

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> CROW, *Design Manual for Bicycle Traffic*, English ed. (2016), Ch. 4.5 "Bicycle highways."
