---
title: Boulevard
description: An Arterial Typology combining through traffic with a pedestrian-first frontage, including the Multiway Boulevard variant with medians separating frontage from through lanes.
patternId: ART-BLV-02
date: 2026-08-29
llms: An Arterial street typology combining through traffic with a pedestrian-first frontage, including the Multiway Boulevard variant, which separates frontage roads from through lanes with planted medians.
---

<script>
  import { PatternCard, DensityChip } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Boulevard" classification="arterial" status="recommended">
An Arterial with a wide, pedestrian-first frontage alongside through traffic lanes, typically featuring a planted median or landscaped buffer. Includes the Multiway Boulevard variant, where frontage roads are separated from through lanes by planted medians, such as Octavia Boulevard.
</PatternCard>

Typical at: <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Suburban is an edge case. Undeveloped and Rural are unlikely pairings.

## Modal hierarchy

Pedestrian, then Transit, then Bicycle, then Vehicle, then Freight, a judgment call reasoned from the Typology's purpose rather than derived cleanly from a listed override trigger, and open for correction.

## Design notes

Multiway Boulevard is confirmed as a named variant folded into this single entry rather than split into its own Typology, since both share the same underlying logic: separating slower, frontage-facing movement from faster through traffic within one right-of-way.

:::unsourced
Formal citations for this pattern have not yet been compiled from primary sources.
:::
