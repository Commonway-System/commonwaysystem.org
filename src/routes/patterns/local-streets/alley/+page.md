---
title: Alley
description: A narrow Local Typology carrying service and driveway access, with vehicle and freight movement prioritized over through pedestrian and bicycle traffic.
patternId: LOC-ALY-02
date: 2026-08-29
llms: A narrow Local street typology for service and driveway access, where vehicle and freight movement outrank pedestrian and bicycle through-traffic.
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Alley" classification="local" status="recommended">
A narrow Local street serving rear or side property access, service vehicles, and utility placement rather than through movement of any mode.
</PatternCard>

Typical at: <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Suburban is an edge case. Undeveloped and Rural contexts are unlikely to carry a purpose-built alley.

## Modal hierarchy

Alley inverts the Local base order: Vehicle, then Freight, then Pedestrian, then Bicycle, then Transit. The override is justified because the Typology's stated purpose is service and driveway access, not through movement, one of the closed set of triggers that permits a departure from the base order.<Citation index={1} />

## Design notes

Because an alley is not a through-route for people walking or biking, its narrow width and service function do not conflict with the 20 mph Local speed cap. The override applies to mode priority, not to the speed rule.

## Related patterns

[Default (Standard Local Street)](/patterns/local-streets/default/) (LOC-DEF-01) (the base modal order this pattern inverts), [Curb Cut / Driveway Apron](/patterns/elements/curb-cut-driveway-apron/) (ELM-CCA-04) (the Element governing the driveway access this Typology exists to serve)

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> NACTO, *Urban Street Design Guide*, "Green Alley" and "Commercial Alley."
