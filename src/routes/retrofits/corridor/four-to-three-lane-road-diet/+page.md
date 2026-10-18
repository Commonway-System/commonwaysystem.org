---
title: "Four-to-three lane road diet"
description: "Converts an existing four-lane undivided roadway into three lanes: one through lane each direction plus a center two-way left-turn lane, reclaiming the freed width for other uses."
patternId: RFT-CDR-01
date: 2026-09-03
llms: "Converts a four-lane undivided roadway into three lanes, one through lane each direction plus a center two-way left-turn lane, the classic road diet, reclaiming freed width for bike lanes, wider sidewalks, or parking."
---

<script>
  import viewerData from '$lib/data/street-configs/rft-cdr-01'
  import { Citation, EvidenceChip, IdPill, PatternViewer, RelatedMedia } from '$lib/theme/components'
</script>

Converts an existing four-lane undivided roadway (two through lanes each direction) into three lanes: one through lane each direction plus a center two-way left-turn lane, reclaiming the freed width for other uses.

<PatternViewer data={viewerData} image={fm.image} title={fm.title} classification="corridor" retrofit />

## Overview

This is the classic road diet. A road built with more through capacity than its traffic actually needs gets restriped, sometimes with minimal construction, to remove one lane of excess capacity and separate through traffic from left-turning traffic, which today shares a lane and creates rear-end and sideswipe conflicts. The reclaimed width typically becomes a bike lane, wider sidewalk, on-street parking, or landscaping.

<RelatedMedia id={fm.patternId} />

## Where this leads: Target patterns

<div class="cw-links">

- [Default (Standard Collector)](/patterns/collectors/default/) <IdPill id="COL-DEF-01" />
- [Default (No Parking, No Direct Access)](/patterns/arterials/default/) <IdPill id="ART-DEF-01" />
- [Downtown Thoroughfare](/patterns/collectors/downtown-thoroughfare/) <IdPill id="COL-DTH-07" />

</div>

<div class="cw-facts">
<div class="cw-fact">

## Applicability and thresholds

Most effective below roughly 19,000 vehicles per day; can succeed up to about 23,000 to 25,000 with careful signal coordination, though more extensive redesign is typically needed above the lower threshold. Corridors with closely spaced signals need timing coordination to avoid queuing impacts at adjacent intersections.

</div>
<div class="cw-fact">

## Evidence and effectiveness

FHWA reports an overall crash reduction of 19 to 47 percent for four-to-three lane road diets, driven by separating through and turning movements and reducing the speed variance between lanes that a four-lane cross-section otherwise creates.<Citation index={1} /><Citation index={2} />

</div>
<div class="cw-fact">

## Getting it built

Can move through the full construction spectrum. A road diet is frequently implemented as a low-cost restriping project, sometimes opportunistically bundled with routine repaving, making it one of the more common demonstration- and pilot-stage strategies before becoming permanent. See [Construction Methodology & The Build Spectrum](/guide/construction-methodology-spectrum/).

An Intersection Control Evaluation is not typically required unless the road diet is paired with a change in intersection control along the corridor. See [Decision & Evaluation Processes](/guide/decision-evaluation-processes/).

</div>
<div class="cw-fact">

## Who can move this

Usually a city or county public works or transportation department decision, often achievable without new legislation since it can be executed as a maintenance restriping project. See [Legal & Planning Mechanisms](/guide/legal-planning-mechanisms/) and [Funding & Financing Mechanisms](/guide/funding-financing-mechanisms/).

</div>
</div>

## Related retrofit strategies

<div class="cw-links">

- [Five-plus lane reallocation](/retrofits/corridor/five-plus-lane-reallocation/) <IdPill id="RFT-CDR-02" /> (the equivalent approach for wider roadways)
- [Lane diet](/retrofits/corridor/lane-diet/) <IdPill id="RFT-CDR-03" /> (a lighter-touch alternative that narrows lanes without removing one)

</div>

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> [Federal Highway Administration, "Road Diets (Roadway Reconfiguration)," Proven Safety Countermeasures, FHWA-SA-12-013.](https://highways.dot.gov/safety/proven-safety-countermeasures/road-diets-roadway-reconfiguration)
2. <span id="ref-2"></span><EvidenceChip tier="evidence" /> [Federal Highway Administration, Highway Safety Information System, "Evaluation of Lane Reduction 'Road Diet' Measures and Their Effects on Crashes and Injuries," 2010.](https://highways.dot.gov/research/publications/safety/hsis/FHWA-HRT-10-053)
3. <span id="ref-3"></span><EvidenceChip tier="precedent" /> [NACTO Urban Street Design Guide, "Neighborhood Main Street."](https://nacto.org/publication/urban-street-design-guide/streets/neighborhood-main-street/)
4. <span id="ref-4"></span><EvidenceChip tier="legal" /> [Federal Highway Administration, *Road Diet Informational Guide*, FHWA-SA-14-028, November 2014. Section 4.1.4 (lane widths of 10 to 12 ft typically used; center two-way left-turn lane typically 10 to 16 ft; one-way bike lane typically 5 ft) and Section 1.2.1 (the 1979 Billings, Montana installation on a 40 ft roadway).](https://highways.dot.gov/sites/fhwa.dot.gov/files/2022-06/rdig.pdf)
