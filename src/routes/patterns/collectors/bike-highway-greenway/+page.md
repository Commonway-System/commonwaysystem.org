---
title: Bike Highway / Greenway
description: A Collector-scale Typology providing a dedicated, physically separated bicycle path, distinct from Local's shared-roadway Bicycle Boulevard.
patternId: COL-BHG-04
status: recommended
date: 2026-08-29
image: /patterns/col-bhg-04-bike-highway-greenway.png
llms: A Collector-scale street typology providing a dedicated, physically separated bicycle path, distinct from Local's shared-roadway Bicycle Boulevard.
---

<script>
  import { Citation, DensityChip, EvidenceChip, IdPill, ModalHierarchySection, PatternViewer, RelatedMedia, SpeedModalHierarchyCard } from '$lib/theme/components'
</script>

A dedicated, physically separated bicycle path operating at Collector scale, prioritizing continuous, higher-speed bicycle through-movement over other modes.

<PatternViewer image={fm.image} title={fm.title} classification="collector" />

<RelatedMedia id={fm.patternId} />

<div class="cw-context">

<span class="cw-context__label">Typical at:</span> <DensityChip tier="Undeveloped" /> <DensityChip tier="Rural" /> <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" />

Core is an edge case, since a dedicated separated path competes for limited right-of-way with other demands at the highest density tier.

</div>

## Modal hierarchy

<SpeedModalHierarchyCard>
<ModalHierarchySection classification="collector" rows={[{ tiers: ['bicycle', 'pedestrian', 'transit', 'vehicle', 'freight'] }]}>
An override justified because the Typology's stated purpose is dedicated bicycle through-movement. Design Speed & Speed Limits doesn't apply here, since this pattern excludes automobiles entirely.
</ModalHierarchySection>
</SpeedModalHierarchyCard>

## Design notes

Distinct from Local's Bicycle Boulevard, which shares the roadway with calmed vehicle traffic, this Typology is physically separated infrastructure, closer in function to a linear park path or a rail-trail than to a shared street. It is realistic across nearly the full density range, since a separated path is not dependent on the surrounding street grid the way a shared-roadway Typology is.<Citation index={1} />

On a bridge, or where it passes under a rail viaduct, this pattern carries through unchanged: its sidewalks, bike lanes, separation and speed continue across the structure. See [Streets on Bridges](/guide/streets-on-bridges/).

## Related patterns

[Bicycle Boulevard / Neighborhood Greenway](/patterns/local-streets/bicycle-boulevard/) <IdPill id="LOC-BBG-12" /> (explicitly distinguished on this page: shared calmed roadway vs. this pattern's physical separation), [Multi-Use Trail / Greenway](/patterns/collectors/multi-use-trail-greenway/) <IdPill id="COL-MUT-06" /> (a similarly-named Collector-scale pattern this one is specifically distinct from)

## Getting there: Retrofit path options

<div class="cw-links">

- [Protected bike lane retrofit via lane-width reallocation](/retrofits/corridor/protected-bike-lane-width-reallocation/) <IdPill id="RFT-CDR-07" />
- [Protected bike lane retrofit via lane removal](/retrofits/corridor/protected-bike-lane-lane-removal/) <IdPill id="RFT-CDR-08" />
- [Protected bike lane retrofit via parking reduction](/retrofits/corridor/protected-bike-lane-parking-reduction/) <IdPill id="RFT-CDR-09" />

</div>

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> [CROW, *Design Manual for Bicycle Traffic*, English ed. (2016), Ch. 4.5 "Bicycle highways."](https://crowplatform.com/product/design-manual-for-bicycle-traffic/)
