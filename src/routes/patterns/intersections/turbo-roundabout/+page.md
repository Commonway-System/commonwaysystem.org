---
title: Turbo-Roundabout
description: A higher-capacity roundabout variant reserved for the highest-volume Arterial-to-Arterial junctions.
patternId: INT-TRB-02
date: 2026-08-29
llms: A higher-capacity roundabout variant, using spiral lane markings to guide traffic, reserved for the highest-volume Arterial-to-Arterial junctions.
---

<script>
  import { Citation, DensityChip, EvidenceChip, PatternCard, RelatedMedia } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Turbo-Roundabout" classification="intersections" status="recommended">
A roundabout variant using spiral lane markings and raised lane dividers to guide multi-lane traffic without the weaving conflicts a standard multi-lane roundabout allows.
</PatternCard>

<RelatedMedia id={fm.patternId} />

Typical at: <DensityChip tier="Compact" /> <DensityChip tier="Urban" />

Suburban and Core are edge cases. Undeveloped and Rural are unlikely pairings.

## Design notes

Reserved for higher-volume Arterial-to-Arterial junctions, where a standard roundabout's capacity is not enough but a signal is still not the preferred default. This keeps the roundabout-first philosophy intact at higher volumes rather than defaulting to a signal once traffic grows.<Citation index={1} />

## Related patterns

[Roundabout (Single/Multi-Lane)](/patterns/intersections/roundabout/) (INT-RAB-01) (the base pattern this scales up from), [Signal](/patterns/intersections/signal/) (INT-SIG-03) (explicitly named on this page as the alternative not preferred even at these volumes)

## Getting there: Retrofit path options

[Signal-to-roundabout conversion](/retrofits/intersection/signal-to-roundabout-conversion/) (RFT-INT-01)

## References

1. <span id="ref-1"></span><EvidenceChip tier="evidence" /> Fortuijn, L.G.H., "Turbo Roundabouts: Design Principles and Safety Performance," *Transportation Research Record* 2096 (2009).
