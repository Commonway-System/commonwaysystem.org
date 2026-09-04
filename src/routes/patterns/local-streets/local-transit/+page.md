---
title: Local Transit
description: A Local Typology with a dedicated transit route, where transit is elevated above the rest of the Local base order.
patternId: LOC-LTR-10
date: 2026-08-29
llms: A Local street typology carrying a dedicated transit route, with transit elevated above the rest of the Local base modal hierarchy.
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Local Transit" classification="local" status="recommended">
A Local street carrying a fixed transit route, most often a local bus line, where transit priority is layered onto the base pedestrian and bicycle priority rather than replacing it.
</PatternCard>

Typical at: <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Undeveloped and Rural are unlikely pairings, since Local Transit assumes a rider base a low-density area typically cannot support.

## Modal hierarchy

Transit, then Pedestrian, then Bicycle, then Vehicle, then Freight. This is an override of the Local base order, justified by the Typology's stated purpose: a designated transit route.

## Design notes

This entry is the Local-scale sibling of Collector Transit and Arterial Transit. All three follow the same override logic, moving Transit to the top of their respective base order once a route is designated, rather than treating transit priority as automatic on every street a bus happens to use.<Citation index={1} />

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> NACTO, *Transit Street Design Guide*, 2016.
