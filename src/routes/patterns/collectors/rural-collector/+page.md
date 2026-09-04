---
title: Rural Collector / Farm-to-Market Road
description: A Collector Typology moving vehicle and freight traffic through low-density agricultural or undeveloped land, the norm at Undeveloped and Rural density.
patternId: COL-FTM-02
date: 2026-08-29
llms: A Collector street typology serving vehicle and freight movement through low-density agricultural or undeveloped land, the norm at Undeveloped and Rural density and effectively absent past Suburban.
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Rural Collector / Farm-to-Market Road" classification="collector" status="recommended">
A Collector road connecting low-density or agricultural land to the wider network, prioritizing vehicle and freight movement over pedestrian, bicycle, and transit use, which have little demand at this density.
</PatternCard>

Typical at: <DensityChip tier="Undeveloped" /> <DensityChip tier="Rural" />

Suburban is an edge case. Compact, Urban, and Core are unlikely pairings.

## Modal hierarchy

Vehicle, then Freight, then Pedestrian, then Bicycle, then Transit, a judgment call reasoned from the Typology's purpose rather than derived cleanly from a listed override trigger, and open for correction.

## Design notes

This entry is the mirror image of Main Street: the norm at Undeveloped and Rural density, and effectively disappearing past Suburban as land use shifts away from agricultural or undeveloped character. Dutch research on low-conflict Rural Collectors informs this Typology's design logic.<Citation index={1} />

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> SWOV, "Principles for a Safe Road Network" (CROW Sustainable Safety framework).
