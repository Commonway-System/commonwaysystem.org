---
title: Turbo-Roundabout
description: A higher-capacity roundabout variant reserved for the highest-volume Arterial-to-Arterial junctions.
patternId: INT-TRB-02
date: 2026-08-29
llms: A higher-capacity roundabout variant, using spiral lane markings to guide traffic, reserved for the highest-volume Arterial-to-Arterial junctions.
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Turbo-Roundabout" classification="intersections">
A roundabout variant using spiral lane markings and raised lane dividers to guide multi-lane traffic without the weaving conflicts a standard multi-lane roundabout allows.
</PatternCard>

Typical at: <DensityChip tier="Compact" /> <DensityChip tier="Urban" />

Suburban and Core are edge cases. Undeveloped and Rural are unlikely pairings.

## Design notes

Reserved for higher-volume Arterial-to-Arterial junctions, where a standard roundabout's capacity is not enough but a signal is still not the preferred default. This keeps the roundabout-first philosophy intact at higher volumes rather than defaulting to a signal once traffic grows.<Citation index={1} />

## References

1. <span id="ref-1"></span><EvidenceChip tier="evidence" /> Fortuijn, L.G.H., "Turbo Roundabouts: Design Principles and Safety Performance," *Transportation Research Record* 2096 (2009).
