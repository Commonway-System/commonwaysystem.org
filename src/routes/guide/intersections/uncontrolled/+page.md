---
title: Uncontrolled
description: An intersection with no assigned right-of-way control, realistic only at the lowest density and traffic volumes.
llms: An uncontrolled intersection with no assigned right-of-way control, realistic only at the lowest density and traffic volume tiers.
---

<script>
  import { PatternCard, DensityChip } from '$lib/theme/components'
</script>

<PatternCard id="INT-UNC-07" title="Uncontrolled" classification="intersections">
An intersection with no stop, yield, signal, or roundabout control, right-of-way resolved informally by the drivers and other road users present.
</PatternCard>

Typical at: <DensityChip tier="Undeveloped" /> <DensityChip tier="Rural" />

Suburban is an edge case. Compact, Urban, and Core are unlikely pairings.

## Design notes

Uncontrolled intersections are only realistic where traffic volume is low enough on every approach that informal right-of-way resolution stays safe, which narrows this pattern to the lowest end of the density range.

:::unsourced
Formal citations for this pattern have not yet been compiled from primary sources.
:::
