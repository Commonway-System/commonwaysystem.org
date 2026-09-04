---
title: All-Way Stop
description: A stop-controlled intersection where every approach stops, tapering off past Compact and Urban density as volumes exceed safe stop-control capacity.
llms: A stop-controlled intersection where every approach stops, tapering off past Compact and Urban density as intersection volumes exceed what stop control can safely handle.
---

<script>
  import { PatternCard, DensityChip } from '$lib/theme/components'
</script>

<PatternCard id="INT-AWS-04" title="All-Way Stop" classification="intersections">
An intersection where every approach carries a stop sign, with right-of-way determined by arrival order.
</PatternCard>

Typical at: <DensityChip tier="Suburban" /> <DensityChip tier="Compact" />

Rural and Urban are edge cases. Undeveloped and Core are unlikely pairings.

## Design notes

All-Way Stop tapers off past Compact and Urban density, as intersection volumes exceed what stop control can handle safely. This is the same taper logic that applies to Stop/Yield control, just shifted one tier higher on the density range.

:::unsourced
Formal citations for this pattern have not yet been compiled from primary sources.
:::
