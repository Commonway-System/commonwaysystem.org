---
title: Yield Street
description: A Local Typology narrow enough that opposing vehicles yield to each other, viable only where traffic volume genuinely stays low.
patternId: LOC-YLD-07
date: 2026-08-29
llms: A narrow Local street typology where opposing vehicles yield to each other by design, viable only at genuinely low traffic volumes.
---

<script>
  import { PatternCard, DensityChip } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Yield Street" classification="local" status="recommended">
A Local street narrow enough that two vehicles cannot pass without one yielding, using the street's width itself as a traffic-calming device.
</PatternCard>

Typical at: <DensityChip tier="Suburban" /> <DensityChip tier="Compact" />

Rural and Urban are edge cases. Undeveloped and Core are unlikely pairings, since local street volumes at Core density typically exceed what yield control can handle safely.

## Modal hierarchy

Pedestrian, then Bicycle, then Vehicle, then Transit, then Freight. Marked as needing confirmation rather than fully locked.

## Design notes

This pattern only functions where traffic volume is genuinely low. It thins out toward Urban and Core, where local street volumes typically outgrow what a shared, yield-controlled width can safely absorb.

:::unsourced
Formal citations for this pattern have not yet been compiled from primary sources.
:::
