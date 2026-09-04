---
title: Arterial Transit (BRT/LRT)
description: An Arterial Typology with dedicated bus rapid transit or light rail treatment, reinforcing the Arterial base order rather than overriding it.
llms: An Arterial street typology with dedicated bus rapid transit or light rail treatment, reinforcing rather than overriding the Arterial base modal hierarchy.
---

<script>
  import { PatternCard, DensityChip } from '$lib/theme/components'
</script>

<PatternCard id="ART-ATR-04" title="Arterial Transit (BRT/LRT)" classification="arterial" status="recommended">
An Arterial with dedicated bus rapid transit or light rail infrastructure, most often a separated running way or exclusive lane.
</PatternCard>

Typical at: <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Suburban is an edge case. Undeveloped and Rural are unlikely pairings.

## Modal hierarchy

Transit, then Pedestrian, then Bicycle, then Vehicle, then Freight. Unlike Local Transit and Collector Transit, this ordering reinforces the Arterial base order rather than overriding it, since Transit already sits at the top of the Arterial base hierarchy.

## Design notes

Arterial is the one Functional Classification where the base modal hierarchy already puts Transit first, ahead of Pedestrian. Dedicated BRT or LRT treatment strengthens that existing priority with physical infrastructure rather than reordering it.

:::unsourced
Formal citations for this pattern have not yet been compiled from primary sources.
:::
