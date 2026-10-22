---
title: "Bridge deck reallocation"
description: "Makes room for walking and biking on an existing bridge by repurposing deck space, narrower lanes, a removed median, a converted shoulder or a removed travel lane, without rebuilding the structure."
patternId: RFT-CDR-12
date: 2026-10-22
llms: "Makes room for walking and biking on an existing bridge by repurposing deck space (narrower lanes, a removed median, a converted shoulder, or a removed travel lane) without rebuilding the structure. Precedents include Missoula's Madison Street Bridge, the Richmond-San Rafael Bridge and the Brooklyn Bridge."
---

<script>
  import { Citation, EvidenceChip, IdPill, PatternViewer, RelatedMedia } from '$lib/theme/components'
</script>

Makes room for walking and biking on an existing bridge by repurposing deck space, narrower lanes, a removed median, a converted shoulder or a removed travel lane, without rebuilding the structure.

<PatternViewer image={fm.image} title={fm.title} classification="corridor" retrofit />

## Overview

A bridge is the one place on a route where a missing sidewalk or bike lane can't be walked or ridden around: the next crossing may be a mile away. Bridges are often the pinch point in a walking and biking network, and major work on one comes only every few decades.<Citation index={1} /> This strategy doesn't wait for that work. It takes width the deck already has, the same way a road diet or lane diet does on a street, and gives it to people walking and biking.

<RelatedMedia id={fm.patternId} />

## Where this leads: Target patterns

<div class="cw-links">

- [Default (Standard Collector)](/patterns/collectors/default/) <IdPill id="COL-DEF-01" /> with [Protected Bike Lane / Cycle Track](/patterns/elements/protected-bike-lane-cycle-track/) <IdPill id="ELM-PBL-37" />
- [Default (No Parking, No Direct Access)](/patterns/arterials/default/) <IdPill id="ART-DEF-01" /> with [Protected Bike Lane / Cycle Track](/patterns/elements/protected-bike-lane-cycle-track/) <IdPill id="ELM-PBL-37" /> (the bridge carries the same pattern as the street on either side)

</div>

<div class="cw-facts">
<div class="cw-fact">

## Applicability and thresholds

Fits a bridge whose approaches have, or are planned to have, sidewalks or bike lanes that the deck doesn't carry, or carries too narrow. The space comes from four places: narrower travel lanes ([Lane diet](/retrofits/corridor/lane-diet/) <IdPill id="RFT-CDR-03" />), a median, a shoulder, or a whole travel lane. Removing a lane follows the same volume limits as a [Four-to-three lane road diet](/retrofits/corridor/four-to-three-lane-road-diet/) <IdPill id="RFT-CDR-01" />. The system's default is one-way protected bike lanes, one on each side; a two-way lane on one side is a discouraged fallback for a deck too narrow for two.

</div>
<div class="cw-fact">

## Evidence and effectiveness

On Missoula's Madison Street Bridge, Montana DOT removed a 3 ft center median and narrowed the lanes from 12 to 11 ft, widening the sidewalks from 4 to 5.5 ft and the bike lanes from 4 to 5 ft. On the Richmond-San Rafael Bridge in California, a westbound shoulder became a two-way shared-use path behind a narrow movable barrier.<Citation index={1} />

On the Brooklyn Bridge, New York City turned the innermost Manhattan-bound car lane into a two-way protected bike lane in September 2021, leaving the walkway above to pedestrians. In October, DOT counted 4,206 average daily bike crossings, 88 percent more than October 2020. The nearby Manhattan Bridge lost 11 percent, so part of the gain moved from one bridge to the other; the two together still gained 1,218 riders a day.<Citation index={2} />

:::unsourced
The Brooklyn Bridge figures come from a news report of DOT's data (Brooklyn Paper, reprinted from amNewYork), not from DOT's own release, which is no longer online.
:::

</div>
<div class="cw-fact">

## Getting it built

Restriping and flexible posts can come first, as with any lane reallocation, with permanent separation later. Anything heavier than paint is a structural question on a bridge: on Portland's Hawthorne Bridge, widening the path took new steel supports and lighter deck panels.<Citation index={1} /> See [Construction Methodology & The Build Spectrum](/guide/construction-methodology-spectrum/).

</div>
<div class="cw-fact">

## Who can move this

The bridge owner, which is often not the city: a state DOT on Madison Street, a toll authority on the Richmond-San Rafael Bridge, a county on the Hawthorne Bridge.<Citation index={1} /> See [Jurisdiction Variants](/guide/make-it-happen/jurisdiction-variants/) and [Legal & Planning Mechanisms](/guide/legal-planning-mechanisms/).

</div>
</div>

## Related retrofit strategies

<div class="cw-links">

- [Bridge replacement cross-section](/retrofits/corridor/bridge-replacement-cross-section/) <IdPill id="RFT-CDR-13" /> (the same goal, when the deck is rebuilt)
- [Lane diet](/retrofits/corridor/lane-diet/) <IdPill id="RFT-CDR-03" />
- [Protected bike lane retrofit via lane removal](/retrofits/corridor/protected-bike-lane-lane-removal/) <IdPill id="RFT-CDR-08" /> (the street versions of the same moves)

</div>

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> [Cohn, J. and Sperling, E. (Fehr & Peers), *Improving Pedestrian and Bicycle Connectivity During Rehabilitation of Existing Bridges*, Pedestrian and Bicycle Information Center White Paper Series (FHWA-funded), November 2016.](https://www.pedbikeinfo.org/downloads/PBIC_WhitePaper_Bridges.pdf)
2. <span id="ref-2"></span><EvidenceChip tier="precedent" /> [Duggan, K., "Cycling on Brooklyn Bridge almost doubled after new bike lane opened, DOT says," *Brooklyn Paper*, November 8, 2021.](https://www.brooklynpaper.com/cycling-brooklyn-bridge-new-bike-lane/)
