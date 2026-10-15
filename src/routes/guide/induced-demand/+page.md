---
title: Induced Demand
description: Why adding lanes rarely cures congestion, what the research shows, and what works instead.
date: 2026-10-15
image: /diagrams/induced-demand-cycle.png
llms: Explains induced demand, the finding that added road capacity brings more driving and rarely cures congestion; the Katy Freeway case; the research evidence; what works instead (pricing, reallocating road space, counting the extra driving first); and how the Commonway System treats added lanes as a cost, not a cure.
---

<script>
  import { Citation, EvidenceChip, GuideDiagram, RelatedMedia } from '$lib/theme/components'
</script>

_Why wider roads don't fix traffic_

In 2008, Texas finished a $2.8 billion rebuild of Houston's Katy Freeway: six through lanes each way, plus toll lanes down the middle. The goal was to end congestion that lasted up to 11 hours a day.<Citation index={1} />

In its first years, it worked. The evening drive between Taylor Street and Barker-Cypress fell from about 38 minutes to 28.<Citation index={2} />

Then the new lanes began to fill. Peak-hour travel times rose in the years after opening, and researchers working for the state tied the rise to growing traffic.<Citation index={3} /> By 2013, the round trip from Pin Oak took 32 minutes longer each day than in 2011.<Citation index={4} />

The lanes got wider. The gains got smaller. This pattern has a name: induced demand.

<GuideDiagram priority src="/diagrams/induced-demand-cycle.png" alt="Commonway System diagram of the widening cycle: traffic jams lead to widening, trips get faster, more people drive, and the lanes fill again, returning to traffic jams." width={1280} height={720} />

## What it is

Lanes are free to use, so the real price of driving is time. Add lanes and that price drops. When something gets cheaper, people use more of it. They drive at rush hour instead of before it, take trips they used to skip, and move farther out.<Citation index={5} /> Within a few years, the new space is full again.

## Why you should care

- **Your time.** The faster commute a widening promises fades within 3 to 10 years.<Citation index={5} />
- **Your money.** One corridor cost $2.8 billion.<Citation index={1} /> Money spent on lanes that refill is money not spent on fixes that last.
- **Your streets.** The extra driving spreads across the whole network, not just the new lanes.<Citation index={5} />
- **Your town.** Homes and businesses spread outward to follow the road, which locks in longer drives.<Citation index={5} />

## How it happens

Some of it comes fast. People switch from transit or carpools to driving alone, take longer or more frequent trips, or move trips into the busy hours.<Citation index={5} /> Some comes slowly. People move farther from work, businesses relocate, and development follows the road.<Citation index={5} />

A study of 228 US metro areas traced the largest shares of the new traffic to residents driving more and to trucking. People moving into the area and traffic shifted from other roads mattered much less.<Citation index={6} />

<RelatedMedia id="/guide/induced-demand/" />

## How strong is the evidence

:::note
On major roads, added capacity typically brings 8 to 10 percent or more driving per 10 percent more capacity within 3 to 10 years, less at first, and less is known for local streets.<Citation index={5} />
:::

A University of California, Davis review of 12 studies rated this evidence high quality and found the added driving is new, not shifted from other roads.<Citation index={5} /> The national study's best estimate: 10 percent more interstate lanes brought 10.3 percent more driving.<Citation index={6} /> Researchers have measured the effect since at least the 1940s.<Citation index={6} />

## Fair questions

**Isn't it just drivers who were already stuck in traffic?**
Partly. Some trips were held back by congestion. But the added driving is mostly new, not shifted from other roads, and it keeps growing for years as homes and jobs move.<Citation index={6} /><Citation index={5} />

**Won't more transit fix it?**
Not on its own. The national study found no evidence that added transit service changed total driving, because others fill the freed space.<Citation index={6} /> Transit still serves its riders well.

**So should we never widen a road?**
No. New capacity can open access to places that were hard to reach before.<Citation index={5} /> The point is narrower: widening doesn't cure congestion.

**Does this apply to my street?**
The evidence is strongest for highways and major roads. The effect may be smaller at first in rural areas, and less is known about local streets.<Citation index={5} />

## What works

**Price the road.** The national study names congestion pricing as the main remaining tool.<Citation index={6} /> New York began tolling vehicles entering Manhattan's central business district in January 2025. In the first year, 27 million fewer vehicles entered, an 11.7 percent drop, according to the MTA, which runs the program.<Citation index={7} />

**Give road space to other modes.** Researchers reviewed more than 70 cases where road space moved from cars to buses, bikes, and walking. In 51 of 62 measured results, traffic fell, with a median drop of about 11 percent of the traffic that had used the treated road or area.<Citation index={8} /> Results depend on local conditions, and in some cases traffic crept back.<Citation index={8} />

Seoul tore down a 10-lane road and a 4-lane elevated highway that carried over 170,000 vehicles a day, and restored the stream beneath them. Bus ridership rose 15.1 percent and subway ridership 3.3 percent from 2003 to 2008, and cutting lane capacity cut traffic.<Citation index={9} />

**Count the extra driving first.** Before approving a widening, estimate the driving it will add. UC Davis publishes a calculator for this.<Citation index={5} />

## What the Commonway System does

The guidebook treats added lanes as a cost, not a cure. When a road is congested, it looks first at pricing, at moving road space to buses, bikes, and walking, and at a connected street network that gives trips more than one route. Widening is the last option, and any forecast for it should include the extra driving it will create.<Citation index={5} />

**Arterials.** The [Arterial Default (ART-DEF-01)](/patterns/arterials/default/) keeps through traffic apart from parking and driveways. [Boulevard (ART-BLV-02)](/patterns/arterials/boulevard/) pairs through lanes with a frontage built for people. [Stroad (ART-STD-05)](/patterns/arterials/stroad/) is marked Avoid. [One-Way Street (ART-OWS-06)](/patterns/arterials/one-way-street/) and [Parkway (ART-PKY-07)](/patterns/arterials/parkway/) are Situational or Discouraged.

**Freeways.** The [Freeway Default (FRE-DEF-01)](/patterns/freeways/default/), [Expressway (FRE-EXP-02)](/patterns/freeways/expressway/), and [Beltway or Ring Road (FRE-BLT-03)](/patterns/freeways/beltway-ring-road/) sit outside the guidebook's detailed design scope. This page states the guidebook's position on whether to widen them.

## What you can do

When a widening is proposed near you, ask:

- Does the traffic forecast account for induced travel?
- What will travel times be in ten years, not just on opening day?
- What would pricing, bus lanes, or a better-connected street network deliver for the same money?

See [How Road Changes Actually Happen](/guide/make-it-happen/) for how to raise these at a public meeting.

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> [Federal Highway Administration. "Project Profile: Katy Freeway Reconstruction."](https://www.fhwa.dot.gov/ipd/project_profiles/tx_katy_freeway.aspx)
2. <span id="ref-2"></span><EvidenceChip tier="precedent" /> <Citation unsourced /> [Freemantle, Tony. "Expanded Katy Freeway Shaves Minutes from Commute." _Houston Chronicle_, 2012.](https://preview-prod.w.houstonchronicle.com/news/houston-texas/article/expanded-katy-freeway-shaves-minutes-from-commute-3941203.php) Reports Texas A&M Transportation Institute data; the original TTI study has not yet been located.
3. <span id="ref-3"></span><EvidenceChip tier="precedent" /> [Goodin, Ginger, Robert Benz, Mark Burris, Marcus Brewer, Nick Wood, and Tina Geiselbrecht. _Katy Freeway: An Evaluation of a Second-Generation Managed Lanes Project_. Report 0-6688-1. Texas A&M Transportation Institute, 2013.](https://rosap.ntl.bts.gov/view/dot/20485/dot_20485_DS1.pdf)
4. <span id="ref-4"></span><EvidenceChip tier="precedent" /> [Reyna, Jennifer. "Houston Commute Times Quickly Increasing." KPRC Click2Houston, February 4, 2014.](https://www.click2houston.com/news/2014/02/04/houston-commute-times-quickly-increasing)
5. <span id="ref-5"></span><EvidenceChip tier="evidence" /> [Volker, Jamey, and Susan Handy. "Increasing Highway Capacity Induces More Auto Travel." Policy brief. National Center for Sustainable Transportation, UC Davis, January 2023.](https://rosap.ntl.bts.gov/view/dot/67337/dot_67337_DS1.pdf)
6. <span id="ref-6"></span><EvidenceChip tier="evidence" /> [Duranton, Gilles, and Matthew A. Turner. "The Fundamental Law of Road Congestion: Evidence from US Cities." _American Economic Review_ 101, no. 6 (2011): 2616–52.](https://doi.org/10.1257/aer.101.6.2616)
7. <span id="ref-7"></span><EvidenceChip tier="precedent" /> [MTA Bridges and Tunnels. _Key Performance Metrics, January 2026_. Metropolitan Transportation Authority, 2026.](https://www.mta.info/document/196856)
8. <span id="ref-8"></span><EvidenceChip tier="evidence" /> [Cairns, Sally, Stephen Atkins, and Phil Goodwin. "Disappearing Traffic? The Story So Far." _Proceedings of the ICE: Municipal Engineer_ 151, no. 1 (2002): 13–22.](https://nacto.org/wp-content/uploads/disappearing_traffic_cairns.pdf)
9. <span id="ref-9"></span><EvidenceChip tier="precedent" /> [Global Designing Cities Initiative. "Case Study: Cheonggyecheon; Seoul, Korea." _Global Street Design Guide_.](https://globaldesigningcities.org/publication/global-street-design-guide/streets/special-conditions/elevated-structure-removal/case-study-cheonggyecheon-seoul-korea/)
