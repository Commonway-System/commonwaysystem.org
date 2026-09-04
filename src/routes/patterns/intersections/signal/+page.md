---
title: Signal
description: Traffic signal control, available within the Commonway System only as a documented last resort, never the presumed choice.
patternId: INT-SIG-03
date: 2026-08-29
llms: Traffic signal control, available within the Commonway System only as a documented last resort against the safer roundabout default, never the presumed choice.
---

<script>
  import { PatternCard, DensityChip } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Signal" classification="intersections">
A signalized intersection, controlling conflicting movements with timed lights.
</PatternCard>

Typical at: <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Suburban is an edge case. Undeveloped and Rural are unlikely pairings.

:::note
Signal remains available within the Commonway System, but only as a last resort requiring documented burden-of-proof justification, modeled on WSDOT's Roundabout First and Intersection Control Evaluation policy. It is not banned, just never presumed. Where a roundabout or turbo-roundabout can serve the same volume, that is the default choice instead.
:::

## Design notes

Signal's realistic density range overlaps heavily with Roundabout and Turbo-Roundabout, since all three ultimately compete for the same higher-volume intersections. The difference is which one the Commonway System treats as the presumed choice absent a documented reason otherwise.

:::unsourced
Formal citations for this pattern have not yet been compiled from primary sources.
:::
