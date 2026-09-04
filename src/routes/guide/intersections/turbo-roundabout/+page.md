---
title: Turbo-Roundabout
description: A higher-capacity roundabout variant reserved for the highest-volume Arterial-to-Arterial junctions.
llms: A higher-capacity roundabout variant, using spiral lane markings to guide traffic, reserved for the highest-volume Arterial-to-Arterial junctions.
---

<script>
  import { PatternCard, DensityChip } from '$lib/theme/components'
</script>

<PatternCard id="INT-TRB-029" title="Turbo-Roundabout" classification="intersections">
A roundabout variant using spiral lane markings and raised lane dividers to guide multi-lane traffic without the weaving conflicts a standard multi-lane roundabout allows.
</PatternCard>

Typical at: <DensityChip tier="Compact" /> <DensityChip tier="Urban" />

Suburban and Core are edge cases. Undeveloped and Rural are unlikely pairings.

## Design notes

Reserved for higher-volume Arterial-to-Arterial junctions, where a standard roundabout's capacity is not enough but a signal is still not the preferred default. This keeps the roundabout-first philosophy intact at higher volumes rather than defaulting to a signal once traffic grows.

:::unsourced
Formal citations for this pattern have not yet been compiled from primary sources.
:::
