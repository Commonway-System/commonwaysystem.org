---
title: Default (No Parking, No Direct Property Access)
description: The baseline Arterial typology, where the core safety rule against mixing on-street parking or direct property access with through traffic is what defines it.
patternId: ART-DEF-01
status: recommended
date: 2026-08-29
llms: The baseline Arterial street typology, defined by never mixing on-street parking or direct property access with through traffic, the rule that distinguishes it from a Stroad.
---

<script>
  import { Citation, DensityChip, EvidenceChip, IdPill, ModalHierarchySection, PatternViewer, RelatedMedia, SpeedLimitSection, SpeedModalHierarchyCard } from '$lib/theme/components'
</script>

The baseline Arterial: a through-movement road that never mixes on-street parking or direct property access with through traffic. Any access need along the corridor is served by a separate Local or Frontage/Service Road instead.

<PatternViewer image={fm.image} title={fm.title} classification="arterial" />

<RelatedMedia id={fm.patternId} />

<div class="cw-context">

<span class="cw-context__label">Typical at:</span> <DensityChip tier="Rural" /> <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Undeveloped is an edge case.

</div>

## Speed and modal hierarchy

<SpeedModalHierarchyCard>
<SpeedLimitSection speeds={[55, 45, 40, 35, 30]} guideLink={false} stacked>
Design speed always equals posted speed, following FHWA's self-enforcing roadway framework.<Citation index={2} /> The baseline is set by density tier, running from 55 mph at Undeveloped and Rural down to 30 mph at Core, matching Collector's own ceiling at that tier. Two modifiers can each subtract 5 mph from the baseline where they apply: adjacency to noise-sensitive land uses within a lane-count-based distance, and local-street access more frequent than a defined spacing threshold, the same access-density logic behind why frequent driveway cuts raise crash risk.<Citation index={3} /> The two modifiers do not stack: where both apply, only the single larger reduction is used, not both added together. The result never falls below a 30 mph floor except through a documented exception.

</SpeedLimitSection>
<ModalHierarchySection classification="arterial" rows={[{ tiers: ['transit', 'pedestrian', 'bicycle', 'vehicle', 'freight'] }]}>
Modal hierarchy follows the Arterial base order. This gives vehicles and freight movement-priority, but Vision Zero evidence keeps pedestrians and cyclists from dropping to the bottom on account of traffic volume alone. Freight moves above Vehicle only where a Typology's whole purpose is freight-specific.

</ModalHierarchySection>

</SpeedModalHierarchyCard>

## Design notes

The no-parking, no-direct-access rule is the load-bearing distinction between this entry and Stroad. It positions the Commonway System closer to the Dutch functional-homogeneity principle than to conventional NACTO or ITE-CNU practice, where Arterials more commonly do mix through traffic with driveway access and curbside parking.<Citation index={1} />

## Related patterns

<div class="cw-links">

- [Stroad (Commercial Arterial)](/patterns/arterials/stroad/) <IdPill id="ART-STD-05" /> (explicitly named on this page as the pattern this rule exists to prevent becoming)
- [Default (Standard Collector)](/patterns/collectors/default/) <IdPill id="COL-DEF-01" /> (the equivalent baseline one Functional Classification down)

</div>

## Getting there: Retrofit path options

<div class="cw-links">

- [Four-to-three lane road diet](/retrofits/corridor/four-to-three-lane-road-diet/) <IdPill id="RFT-CDR-01" />
- [Five-plus lane reallocation](/retrofits/corridor/five-plus-lane-reallocation/) <IdPill id="RFT-CDR-02" />
- [Lane diet](/retrofits/corridor/lane-diet/) <IdPill id="RFT-CDR-03" />
- [One-way to two-way conversion](/retrofits/corridor/one-way-to-two-way-conversion/) <IdPill id="RFT-CDR-04" />
- [Protected bike lane retrofit via lane removal](/retrofits/corridor/protected-bike-lane-lane-removal/) <IdPill id="RFT-CDR-08" />

</div>

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> [SWOV, "Principles for a Safe Road Network" (CROW Sustainable Safety).](https://sustainablesafety.nl/)
2. <span id="ref-2"></span><EvidenceChip tier="legal" /> [FHWA, "Self-Enforcing Roadways: A Guidance Report."](https://highways.dot.gov/research/publications/safety/FHWA-HRT-17-098)
3. <span id="ref-3"></span><EvidenceChip tier="evidence" /> [Gluck, J., Levinson, H. S., and Stover, V., NCHRP Report 420 (1999).](http://onlinepubs.trb.org/onlinepubs/nchrp/nchrp_rpt_420.pdf)
