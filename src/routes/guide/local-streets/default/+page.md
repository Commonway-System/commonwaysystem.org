---
title: Default (Standard Local Street)
description: The baseline Local street typology, carrying the base modal hierarchy and 20 mph speed cap with no named override.
llms: The baseline Local street, applying the base modal hierarchy and 20 mph design speed with no named override.
---

<script>
  import { PatternCard, DensityChip } from '$lib/theme/components'
</script>

<PatternCard id="STR-LOC-001" title="Default (Standard Local Street)" classification="local">
The baseline Local street. No special access pattern, event use, or dedicated mode gives it a name of its own, so it carries the base Local modal hierarchy and speed rule unmodified.
</PatternCard>

Typical at: <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Rural is an edge case, not the norm. Undeveloped contexts are unlikely to carry a Local street at all.

## Speed and modal hierarchy

20 mph hard maximum, no exceptions. Modal hierarchy follows the Local base order without an override: Pedestrian, then Bicycle, then Transit, then Vehicle, then Freight.

## Design notes

This entry is the standard against which every other Local Typology is defined as an override. A Typology only departs from this base order when its entire reason for existing is a specific mode, for example Alley (service access) or Bicycle Boulevard (bicycle through-movement).

:::unsourced
Formal citations for this pattern have not yet been compiled from primary sources.
:::
