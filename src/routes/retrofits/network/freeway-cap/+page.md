---
title: "Freeway cap"
description: "Builds a deck over a freeway that runs below the surrounding ground, usually carrying a park, so people cross where the freeway once divided the neighborhood, at ground level."
patternId: RFT-NET-04
date: 2026-10-22
llms: "Builds a deck (a cap or lid) over a freeway that runs in a cut below the surrounding ground, usually carrying a park, so people cross at ground level where the freeway once divided neighborhoods. FHWA's 2022 report to Congress reviewed 60 cap projects in 22 states; costs ran about 18 to 21 million dollars per acre. A cap never justifies widening the freeway beneath it."
---

<script>
  import { Citation, EvidenceChip, IdPill, PatternViewer, RelatedMedia } from '$lib/theme/components'
</script>

Builds a deck over a freeway that runs below the surrounding ground, usually carrying a park, so people cross where the freeway once divided the neighborhood, at ground level.

<PatternViewer image={fm.image} title={fm.title} classification="network" retrofit />

## Overview

A freeway can divide the neighborhoods on either side even where streets bridge over it. FHWA describes a cap as one way to reconnect them: technically a very wide bridge, from a few hundred feet to one or more city blocks long, that carries a park or buildings rather than only a street.<Citation index={1} /> It turns the trench into ground people use and cross at their own level, the freeway staying below. FHWA's 2022 report to Congress reviewed 60 cap projects in 22 states, 45 of them built.<Citation index={1} />

<RelatedMedia id={fm.patternId} />

## Where this leads: Target patterns

Like the other Network-scale retrofits, this applies *within* a network rather than producing a new pattern: the streets and paths on either side join up across the cap. The cap's surface usually takes the form of a [Plaza / Parklet](/patterns/facilities/plaza-parklet/) <IdPill id="FAC-PLZ-07" /> or park crossed by a [Shared-Use Path](/patterns/local-streets/shared-use-path/) <IdPill id="LOC-SUP-13" />, which is the ground-level form of a [Grade-Separated Walk and Bike Crossing](/patterns/intersections/grade-separated-walk-bike-crossing/) <IdPill id="INT-GSW-16" />.

<div class="cw-facts">
<div class="cw-fact">

## Applicability and thresholds

Fits a freeway that already runs below the ground around it, where it divides neighborhoods that want to be joined. Caps get built when a freeway is first built, when it is reconstructed or widened, or long after.<Citation index={1} /> A cap is judged on its own: it never justifies widening the freeway beneath it, since [added lanes are a cost, not a cure](/guide/induced-demand/). A scan of existing caps put the cost at roughly $18 to $21 million per acre.<Citation index={1} />

</div>
<div class="cw-fact">

## Evidence and effectiveness

FHWA groups the benefits as transportation (safer, more direct walking, wheelchair and bike trips), economic, social and environmental (less noise, cleaner local air, stormwater management). It also warns that rising nearby property values can bring gentrification and displacement, and that some economic gains may only move from elsewhere.<Citation index={1} /> After construction began on Dallas's Klyde Warren Park in 2012, Dallas built offices 18 percent and apartments 42 percent faster than other Texas cities, which the Federal Reserve Bank of Atlanta calls consistent with a cap effect but not definitive.<Citation index={2} /> The connection itself has been measured less than the development around it.

</div>
<div class="cw-fact">

## Getting it built

Permanent by nature, and costly and complex. The sponsor needs rights to the airspace over the freeway, and room for future transportation needs below. A long-term maintenance agreement should split the work, typically the state DOT keeping the deck and a city parks department or nonprofit running the park.<Citation index={1} /> See [Construction Methodology & The Build Spectrum](/guide/construction-methodology-spectrum/).

</div>
<div class="cw-fact">

## Who can move this

A partnership: the state DOT that owns the freeway and its airspace, the city, and often a nonprofit park manager. Funding usually combines federal, state, local and private sources, with value capture such as tax increment financing or business improvement districts. FHWA's practitioners advise engaging the community early and naming who gains and who bears the impacts before design.<Citation index={1} /> See [Funding & Financing Mechanisms](/guide/funding-financing-mechanisms/) and [Legal & Planning Mechanisms](/guide/legal-planning-mechanisms/).

</div>
</div>

## Related retrofit strategies

<div class="cw-links">

- [Barrier-crossing / network reconnection retrofit](/retrofits/network/barrier-crossing-network-reconnection-retrofit/) <IdPill id="RFT-NET-03" /> (a single crossing over or under the same kind of barrier)

</div>

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> [Federal Highway Administration, *The Benefits of Highway Cap Parks: A Report to Congress*, December 21, 2022.](https://www.pedbikeinfo.org/downloads/benefits_highway_cap_parks_report_congress.pdf)
2. <span id="ref-2"></span><EvidenceChip tier="evidence" /> [Cunningham, C., "Do Freeway Lids Spur Development in Cities? Evidence from Dallas," Federal Reserve Bank of Atlanta, *Policy Hub: Macroblog*, November 7, 2022.](https://www.atlantafed.org/research-and-data/publications/policy-hub-macroblog/2022/11/07/do-freeway-lids-spur-development-in-cities--evidence-from-dallas)
