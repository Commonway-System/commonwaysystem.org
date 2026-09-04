---
title: Default (Standard Collector)
description: The baseline Collector street typology, carrying the base modal hierarchy and 30 mph standard speed with no named override.
patternId: COL-DEF-01
date: 2026-08-29
llms: The baseline Collector street, applying the base modal hierarchy and 30 mph standard speed with no named override.
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Default (Standard Collector)" classification="collector" status="recommended">
The baseline Collector street. No special land use, freight function, or dedicated mode gives it a name of its own, so it carries the base Collector modal hierarchy and speed rule unmodified.
</PatternCard>

Typical at: <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Rural is an edge case. Undeveloped is an unlikely pairing.

## Speed and modal hierarchy

30 mph standard. 35 mph is permitted only with rigid crash-protective separation, a concrete barrier rather than delineator posts, following FHWA's own distinction between the two.<Citation index={1} /> Modal hierarchy follows the Collector base order: Pedestrian, then Bicycle, then Transit, then Vehicle, then Freight, the same shape as Local. The higher speed tier loosens the practical design treatment, crossing spacing and separation, without changing the rank order.

## Design notes

This entry is the standard against which every other Collector Typology is defined as an override, the same role Default plays within Local.

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> FHWA, *Separated Bike Lane Planning and Design Guide*.
