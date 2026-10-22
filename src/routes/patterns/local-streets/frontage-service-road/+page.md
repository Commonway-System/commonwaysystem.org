---
title: Frontage / Service Road
description: A Local Typology running parallel to a faster Arterial or Freeway, keeping pedestrians and cyclists separated from that higher-speed traffic.
patternId: LOC-FSR-04
status: recommended
date: 2026-08-29
image: /patterns/loc-fsr-04-frontage-service-road.png
llms: A Local street typology running parallel to a faster Arterial or Freeway, separating pedestrians and cyclists from the higher-speed roadway.
---

<script>
  import { Citation, DensityChip, EvidenceChip, IdPill, ModalHierarchySection, PatternViewer, RelatedMedia, SpeedLimitSection, SpeedModalHierarchyCard } from '$lib/theme/components'
</script>

A Local street running alongside a higher-speed Arterial or Freeway, giving property access and slower-mode movement a lane physically separated from the through traffic next to it.

<PatternViewer image={fm.image} title={fm.title} classification="local" />

<RelatedMedia id={fm.patternId} />

<div class="cw-context">

<span class="cw-context__label">Typical at:</span> <DensityChip tier="Rural" /> <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" />

Undeveloped and Core are edge cases.

</div>

## Speed and modal hierarchy

<SpeedModalHierarchyCard>
<SpeedLimitSection speeds={[20]}>
Follows the Local default: 20 mph hard maximum, no exceptions, even where this road runs alongside a higher-speed Arterial or Freeway.

</SpeedLimitSection>
<ModalHierarchySection classification="local" rows={[{ tiers: ['pedestrian', 'bicycle', 'transit', 'vehicle', 'freight'] }]}>
Follows the Local base order. Flagged for confirmation rather than fully locked.

</ModalHierarchySection>

</SpeedModalHierarchyCard>

## Design notes

The safety rationale is separation, not speed: keeping people walking and biking off a roadway designed for faster through traffic.<Citation index={1} /> This is the Local-scale companion to the Arterial safety rule that access needs are served by a separate road rather than mixed into through lanes.

On a bridge, or where it passes under a rail viaduct, this pattern carries through unchanged: its sidewalks, bike lanes, separation and speed continue across the structure. See [Streets on Bridges](/guide/streets-on-bridges/).

## Related patterns

<div class="cw-links">

- [Default (No Parking, No Direct Property Access)](/patterns/arterials/default/) <IdPill id="ART-DEF-01" /> (the Arterial-scale rule this pattern serves as the Local-scale companion to)
- [Stroad (Commercial Arterial)](/patterns/arterials/stroad/) <IdPill id="ART-STD-05" /> (the Avoid pattern that results when this separation isn't provided)

</div>

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> [AASHTO, *A Policy on Geometric Design of Highways and Streets*.](https://store.transportation.org/Item/PublicationDetail?ID=4127)
