---
title: Turbo-Roundabout
description: A higher-capacity roundabout variant reserved for the highest-volume Arterial-to-Arterial junctions.
patternId: INT-TRB-02
status: recommended
date: 2026-08-29
image: /patterns/int-trb-02-turbo-roundabout.png
llms: A higher-capacity roundabout variant, using spiral lane markings to guide traffic, reserved for the highest-volume Arterial-to-Arterial junctions.
---

<script>
  import { Citation, DensityChip, EvidenceChip, IdPill, PatternViewer, RelatedMedia } from '$lib/theme/components'
</script>

A roundabout variant using spiral lane markings and raised lane dividers to guide multi-lane traffic without the weaving conflicts a standard multi-lane roundabout allows.

<PatternViewer image={fm.image} title={fm.title} classification="intersections" />

<RelatedMedia id={fm.patternId} />

<div class="cw-context">

<span class="cw-context__label">Typical at:</span> <DensityChip tier="Compact" /> <DensityChip tier="Urban" />

Suburban and Core are edge cases. Undeveloped and Rural are unlikely pairings.

</div>

## Design notes

Reserved for higher-volume Arterial-to-Arterial junctions, where a standard roundabout's capacity is not enough but a signal is still not the preferred default. This keeps the roundabout-first philosophy intact at higher volumes rather than defaulting to a signal once traffic grows.<Citation index={1} />

## Related patterns

<div class="cw-links">

- [Roundabout (Single/Multi-Lane)](/patterns/intersections/roundabout/) <IdPill id="INT-RAB-01" /> (the base pattern this scales up from)
- [Signal](/patterns/intersections/signal/) <IdPill id="INT-SIG-03" /> (explicitly named on this page as the alternative not preferred even at these volumes)

</div>

## Getting there: Retrofit path options

<div class="cw-links">

- [Signal-to-roundabout conversion](/retrofits/intersection/signal-to-roundabout-conversion/) <IdPill id="RFT-INT-01" />

</div>

## References

1. <span id="ref-1"></span><EvidenceChip tier="evidence" /> [Fortuijn, L.G.H., "Turbo Roundabouts: Design Principles and Safety Performance," *Transportation Research Record* 2096 (2009).](https://doi.org/10.3141/2096-03)
