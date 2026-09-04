---
title: Default (No Parking, No Direct Property Access)
description: The baseline Arterial typology, where the core safety rule against mixing on-street parking or direct property access with through traffic is what defines it.
llms: The baseline Arterial street typology, defined by never mixing on-street parking or direct property access with through traffic, the rule that distinguishes it from a Stroad.
---

<script>
  import { PatternCard, DensityChip } from '$lib/theme/components'
</script>

<PatternCard id="STR-ART-018" title="Default (No Parking, No Direct Property Access)" classification="arterial">
The baseline Arterial: a through-movement road that never mixes on-street parking or direct property access with through traffic. Any access need along the corridor is served by a separate Local or Frontage/Service Road instead.
</PatternCard>

Typical at: <DensityChip tier="Rural" /> <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Undeveloped is an edge case.

## Speed and modal hierarchy

Design speed always equals posted speed, following FHWA's self-enforcing roadway framework. The baseline is density-tiered with noise and access-proximity modifiers in principle, though exact per-tier figures are not yet locked. Modal hierarchy follows the Arterial base order: Transit, then Pedestrian, then Bicycle, then Vehicle, then Freight. This gives vehicles and freight movement-priority, but Vision Zero evidence keeps pedestrians and cyclists from dropping to the bottom on account of traffic volume alone. Freight moves above Vehicle only where a Typology's whole purpose is freight-specific.

## Design notes

The no-parking, no-direct-access rule is the load-bearing distinction between this entry and Stroad. It positions the Commonway System closer to the Dutch functional-homogeneity principle than to conventional NACTO or ITE-CNU practice, where Arterials more commonly do mix through traffic with driveway access and curbside parking.

:::unsourced
Formal citations for this pattern have not yet been compiled from primary sources.
:::
