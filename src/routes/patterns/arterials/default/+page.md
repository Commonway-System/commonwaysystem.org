---
title: Default (No Parking, No Direct Property Access)
description: The baseline Arterial typology, where the core safety rule against mixing on-street parking or direct property access with through traffic is what defines it.
patternId: ART-DEF-01
date: 2026-08-29
llms: The baseline Arterial street typology, defined by never mixing on-street parking or direct property access with through traffic, the rule that distinguishes it from a Stroad.
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Default (No Parking, No Direct Property Access)" classification="arterial" status="recommended">
The baseline Arterial: a through-movement road that never mixes on-street parking or direct property access with through traffic. Any access need along the corridor is served by a separate Local or Frontage/Service Road instead.
</PatternCard>

Typical at: <DensityChip tier="Rural" /> <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Undeveloped is an edge case.

## Speed and modal hierarchy

Design speed always equals posted speed, following FHWA's self-enforcing roadway framework.<Citation index={2} /><Citation index={3} /> The baseline is density-tiered with noise and access-proximity modifiers in principle, though exact per-tier figures are not yet locked. Modal hierarchy follows the Arterial base order: Transit, then Pedestrian, then Bicycle, then Vehicle, then Freight. This gives vehicles and freight movement-priority, but Vision Zero evidence keeps pedestrians and cyclists from dropping to the bottom on account of traffic volume alone. Freight moves above Vehicle only where a Typology's whole purpose is freight-specific.

## Design notes

The no-parking, no-direct-access rule is the load-bearing distinction between this entry and Stroad. It positions the Commonway System closer to the Dutch functional-homogeneity principle than to conventional NACTO or ITE-CNU practice, where Arterials more commonly do mix through traffic with driveway access and curbside parking.<Citation index={1} />

## Related patterns

[Stroad (Commercial Arterial)](/patterns/arterials/stroad/) (ART-STD-05) (explicitly named on this page as the pattern this rule exists to prevent becoming), [Default (Standard Collector)](/patterns/collectors/default/) (COL-DEF-01) (the equivalent baseline one Functional Classification down)

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> SWOV, "Principles for a Safe Road Network" (CROW Sustainable Safety).
2. <span id="ref-2"></span><EvidenceChip tier="legal" /> FHWA, "Self-Enforcing Roadways: A Guidance Report."
3. <span id="ref-3"></span><EvidenceChip tier="evidence" /> Gluck, J., Levinson, H. S., and Stover, V., NCHRP Report 420 (1999).
