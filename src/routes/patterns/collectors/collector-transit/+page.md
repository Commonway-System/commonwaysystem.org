---
title: Collector Transit
description: A Collector Typology with a dedicated transit route, where transit is elevated above the rest of the Collector base order.
patternId: COL-CTR-05
date: 2026-08-29
llms: A Collector street typology carrying a dedicated transit route, with transit elevated above the rest of the Collector base modal hierarchy.
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Collector Transit" classification="collector" status="recommended">
A Collector street carrying a fixed transit route, where transit priority is layered onto the base pedestrian and bicycle priority rather than replacing it.
</PatternCard>

Typical at: <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Rural is an edge case. Undeveloped is an unlikely pairing.

## Modal hierarchy

Transit, then Pedestrian, then Bicycle, then Vehicle, then Freight, an override of the Collector base order justified by the Typology's stated purpose, a designated transit route.

## Design notes

This entry is the Collector-scale sibling of Local Transit and Arterial Transit, following the same override logic across all three Functional Classifications.<Citation index={1} />

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> NACTO, *Transit Street Design Guide* (2016).
