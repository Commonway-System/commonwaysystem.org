---
title: "2+1 road with cable median barrier"
description: "Converts an undivided rural two-lane road into a continuous three-lane cross section with an alternating passing lane and a cable median barrier, within the existing right-of-way."
patternId: RFT-CDR-11
date: 2026-09-25
llms: "Converts an undivided rural two-lane road into a continuous three-lane cross section: a center lane that alternates as a passing lane in each direction, with a cable median barrier separating opposing traffic between passing sections. Built inside the existing right-of-way. Applies where design speed, terrain, or posted speed exceeds roughly 45 mph, where head-on and run-off crashes dominate fatalities."
---

<script>
  import { Citation, EvidenceChip, RelatedMedia, RetrofitCard } from '$lib/theme/components'
</script>

<RetrofitCard id={fm.patternId} title="2+1 road with cable median barrier" scale="corridor">
Converts an undivided rural two-lane road into a continuous three-lane cross section, with an alternating passing lane and a cable median barrier, built within the existing right-of-way.
</RetrofitCard>

## Overview

This strategy converts an existing undivided two-lane rural road into a continuous three-lane cross section. The center lane serves as a passing lane for one direction of travel, then switches to the other direction along the corridor, and a cable median barrier separates opposing traffic through the sections where the center lane is not open for passing. It is built within the existing right-of-way: no new land, and no added lanes beyond the single shared center lane.

Run-off and head-on crashes together account for the large majority of fatalities on this road type. The alternating passing lane breaks up the long straight stretches that produce driver drift, and it gives a driver stuck behind a slow vehicle a defined window to pass without crossing into the opposing lane at all. The cable barrier physically stops a drifting vehicle from crossing the centerline, converting a would-be head-on collision into a barrier strike, survivable by design rather than by chance.

<RelatedMedia id={fm.patternId} />

## Where this leads: Target patterns

[Rural Collector / Farm-to-Market Road](/patterns/collectors/rural-collector/) (COL-FTM-02), [Default (No Parking, No Direct Property Access)](/patterns/arterials/default/) (ART-DEF-01), [Scenic Highway / Byway](/patterns/arterials/scenic-highway-byway/) (ART-SCB-03)

This strategy does not change a road into a different pattern so much as change the safety properties of the same pattern when it runs at high speed. It applies within these patterns, wherever a two-lane rural road is functioning as a through-highway rather than a low-volume access road.

## Applicability and thresholds

Appropriate on rural two-lane roads where design speed, terrain, or existing posted speed exceeds roughly 45 mph. Past that point two vehicles closing head-on hit each other at roughly 90 mph or more combined, and collision energy scales with the square of closing speed, not linearly, so the safety answer changes qualitatively rather than just numerically.

It is the direct destination for the terrain and volume combinations in Rural Collector / Farm-to-Market Road's own [Speed management row](/patterns/collectors/rural-collector/#layered-guidance-across-sources) that cross that threshold: level terrain at 400 to 2,000 vehicles per day (50 mph) and above 2,000 (60 mph), and rolling terrain above 2,000 vehicles per day (50 mph). It also applies to the Rural density tier of Default (No Parking, No Direct Property Access) and to Scenic Highway / Byway, wherever a two-lane rural road is functioning as a through-highway.

## Evidence and effectiveness

Sweden's network-wide experience with 2+1 roads that have a median barrier shows fatalities down 77%, and fatal-and-serious-injury crashes down 51% on 110 km/h roads and 63% on 90 km/h roads.<Citation index={1} />

The barrier itself is a recognized countermeasure, with a real limit worth stating plainly: FHWA lists median barriers as a Proven Safety Countermeasure, but scopes it to divided highways with an actual median. An undivided rural road cannot simply invoke that designation, which is why states have had to write separate guidance for exactly this retrofit.<Citation index={2} />

The passing lane contributes on its own: Missouri DOT's research found passing-lane sections with 12 to 24% fewer crashes per mile per year than conventional two-lane sections. That is the documented network-level result; larger reductions are reported for individual cases elsewhere, but those were not independently verified here.<Citation index={4} />

The evidence has honest limits. Colorado DOT's feasibility study of a Swedish-style 2+1 road with barrier states that its crash reduction estimate carries real statistical uncertainty, because the underlying study had a short after-period, and it recommends a limited pilot rather than full rollout.<Citation index={5} />

## Getting it built

Unlike many Corridor strategies, this one cannot start from paint: the cable barrier and the three-lane cross section are permanent construction. Colorado's study recommends a limited pilot before wider deployment.<Citation index={5} /> Kentucky's 2+1 design guidance reports construction cost savings of 50 to 90% compared with a full four-lane divided highway.<Citation index={3} /> See [Construction Methodology & The Build Spectrum](/guide/construction-methodology-spectrum/).

## Who can move this

Most rural two-lane roads of this kind are state or county highways, so the decision typically sits with the state department of transportation or the county road agency, through its design guidance and engineering review. See [Legal & Planning Mechanisms](/guide/legal-planning-mechanisms/) and [Decision & Evaluation Processes](/guide/decision-evaluation-processes/).

## Related retrofit strategies

[Depaving / pavement-to-gravel conversion](/retrofits/corridor/depaving-pavement-to-gravel/) (RFT-CDR-10) (the opposite response to a low-volume rural road: lowering its speed by changing the surface rather than adding a barrier)

## References

1. <span id="ref-1"></span><EvidenceChip tier="evidence" /> [Anna Vadeby, Swedish National Road and Transport Research Institute (VTI), network-wide safety effects of 2+1 roads with median barrier: fatalities down 77%, fatal-and-serious-injury crashes down 51% (110 km/h roads) to 63% (90 km/h roads).](https://bransch.trafikverket.se/contentassets/6af107d0cbe94281af73a57b9761c189/16_safety_benefits_vadeby.pdf)
2. <span id="ref-2"></span><EvidenceChip tier="legal" /> [Federal Highway Administration, "Median Barriers," Proven Safety Countermeasures.](https://rosap.ntl.bts.gov/view/dot/49401/dot_49401_DS1.pdf)
3. <span id="ref-3"></span><EvidenceChip tier="legal" /> [Kentucky Transportation Cabinet, Division of Highway Design, 2+1 road design guidance (August 2013), construction cost savings of 50 to 90% versus a full four-lane divided highway.](https://scholars.uky.edu/en/projects/spr-21-605-21-roadway-design-guidance-update/)
4. <span id="ref-4"></span><EvidenceChip tier="evidence" /> [Potts & Harwood, Missouri Department of Transportation, "Benefits and Design/Location Criteria for Passing Lanes" (RDT 04-008, 2004).](https://spexternal.modot.mo.gov/sites/cm/CORDT/RDT04008.pdf)
5. <span id="ref-5"></span><EvidenceChip tier="legal" /> [Colorado Department of Transportation, "2+1 Road with Barrier: Evaluation of the Feasibility of Deployment of Swedish 2+1 Road with Barrier in Colorado" (CDOT-2020-05, April 2020).](https://rosap.ntl.bts.gov/view/dot/88633/dot_88633_DS1.pdf)
