---
title: Frontage / Service Road
description: A Local Typology running parallel to a faster Arterial or Freeway, keeping pedestrians and cyclists separated from that higher-speed traffic.
patternId: LOC-FSR-04
date: 2026-08-29
llms: A Local street typology running parallel to a faster Arterial or Freeway, separating pedestrians and cyclists from the higher-speed roadway.
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Frontage / Service Road" classification="local" status="recommended">
A Local street running alongside a higher-speed Arterial or Freeway, giving property access and slower-mode movement a lane physically separated from the through traffic next to it.
</PatternCard>

Typical at: <DensityChip tier="Rural" /> <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" />

Undeveloped and Core are edge cases.

## Modal hierarchy

Follows the Local base order: Pedestrian, then Bicycle, then Transit, then Vehicle, then Freight. Flagged for confirmation rather than fully locked.

## Design notes

The safety rationale is separation, not speed: keeping people walking and biking off a roadway designed for faster through traffic.<Citation index={1} /> This is the Local-scale companion to the Arterial safety rule that access needs are served by a separate road rather than mixed into through lanes.

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> AASHTO, *A Policy on Geometric Design of Highways and Streets*.
