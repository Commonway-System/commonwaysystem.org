---
title: Grade-Separated Walk and Bike Crossing
description: A crossing that takes people walking and biking under or over a barrier, on a separate level from motor traffic, where a safe crossing at street level isn't possible.
patternId: INT-GSW-16
status: situational
date: 2026-10-22
llms: A grade-separated crossing for people walking and biking, an underpass or a bridge, used only where a safe street-level crossing isn't possible. Underpass first, with the road changing level rather than the person wherever it can; bridges where the barrier is water, a rail line or a road already in a cut.
---

<script>
  import { Citation, DensityChip, EvidenceChip, IdPill, PatternViewer, RelatedMedia } from '$lib/theme/components'
</script>

A crossing that takes people walking and biking under or over a barrier, on a separate level from motor traffic, where a safe crossing at street level isn't possible.

<PatternViewer image={fm.image} title={fm.title} classification="intersections" />

<RelatedMedia id={fm.patternId} />

<div class="cw-context">

<span class="cw-context__label">Typical at:</span> <DensityChip tier="Rural" /> <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" />

Possible at any tier where a freeway, rail line, waterway or high-speed road cuts a walking or biking route.

</div>

## Design notes

A crossing at street level comes first. Minnesota DOT calls at-grade improvements the first choice, since they usually cost less and people take the direct route.<Citation index={1} /> Texas DOT reserves grade separation for places where an at-grade crossing can't be made safe or the barrier rules one out, such as a freeway, water or a rail line in a cut.<Citation index={2} /> CROW, the Dutch design manual, uses it where other crossings fail on directness and safety.<Citation index={3} /> People skip a crossing that costs them time: many will cross at street level instead when it takes about as long.<Citation index={4} /><Citation index={1} /> CS classifies this pattern as Situational, informed by that shared state, federal and Dutch guidance.

Where grades must separate, the person should climb as little as possible. CROW's ideal is that the car, not the cyclist, changes level: an underpass with the road raised about 2 m, so the path dips only part of the way, is its preferred form.<Citation index={3} /><Citation index={5} /> An underpass needs about 2.5 m (10 ft in US practice) of headroom; a bridge over a road needs 4.5 m in the Netherlands and 17.5 ft in Texas.<Citation index={5} /><Citation index={6} /><Citation index={2} /><Citation index={7} /> The bigger climb means longer ramps, more land and more effort.<Citation index={8} /> Over water, over a rail line, or over a road already in a cut, a bridge can sit close to ground level and is the natural form. A bridge that lifts a bike route over a road at street level is its own, discouraged pattern: [Walk and Bike Overpass](/patterns/intersections/walk-bike-overpass/) <IdPill id="INT-OVP-17" />.

An underpass has to feel safe to be used. Pedestrians in one UK study would walk 5.3 extra minutes to avoid an underpass, against 2.4 to avoid a footbridge, and both ranked below a signalized crossing.<Citation index={9} /> CROW's answer is design: short and straight, with the exit visible from the entrance, walls sloping outward, daylight, and no hiding places at the entrances.<Citation index={3} /><Citation index={5} />

<div class="cw-tiles">

- **Headroom and width.** Underpass headroom at least 2.50 m (CROW) or 10 ft (Texas DOT); width 14 to 16 ft in Texas, at least 3.50 m without a footpath in CROW. A bridge has at least 8 ft of clear width, never less than the sidewalk leading to it.<Citation index={5} /><Citation index={2} />
- **Slopes.** Ramps meet ADA: a 5 percent running slope, or up to 8.3 percent with a landing every 30 in of rise. The climb must be rideable; stairs, lifts and escalators only add to a ramp.<Citation index={2} /><Citation index={3} />
- **Sightlines.** The exit visible on entering; no tall planting, corners or niches near the entrances.<Citation index={5} /><Citation index={2} />
- **Light.** As much daylight as possible, plus recessed, vandal-resistant lighting bright enough for users to see each other at night.<Citation index={5} /><Citation index={2} />
- **Drainage.** A 2 percent cross-fall on the underpass floor. Flooding and debris can close a badly drained underpass for a season.<Citation index={5} /><Citation index={1} />
- **Railings.** On a bridge where people ride next to the railing, at least 42 in, 54 in preferred (Wisconsin DOT); CROW uses at least 1.30 m.<Citation index={8} /><Citation index={6} />

</div>

## Related patterns

<div class="cw-links">

- [Walk and Bike Overpass](/patterns/intersections/walk-bike-overpass/) <IdPill id="INT-OVP-17" /> (the discouraged form: a bridge that lifts a bike route over a road at street level)
- [Midblock Pedestrian Crossing](/patterns/intersections/midblock-crossing/) <IdPill id="INT-MPC-08" /> (the street-level crossing that comes first)
- [Shared-Use Path](/patterns/local-streets/shared-use-path/) <IdPill id="LOC-SUP-13" />
- [Multi-Use Trail / Greenway](/patterns/collectors/multi-use-trail-greenway/) <IdPill id="COL-MUT-06" /> (the paths a crossing like this usually carries)
- [Grade-Separated Interchange](/patterns/intersections/grade-separated-interchange/) <IdPill id="INT-GSI-10" /> (grade separation for motor traffic)

</div>

## Getting there: Retrofit path options

<div class="cw-links">

- [Barrier-crossing / network reconnection retrofit](/retrofits/network/barrier-crossing-network-reconnection-retrofit/) <IdPill id="RFT-NET-03" /> (adds a crossing where none exists)
- [Freeway cap](/retrofits/network/freeway-cap/) <IdPill id="RFT-NET-04" /> (covers a sunken freeway so people cross at ground level)

</div>

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> [Minnesota Department of Transportation, *Minnesota Bicycle Facility Design Manual* (2020), "Pedestrian and Bicycle Bridges and Underpasses," p. 7-8.](https://www.dot.state.mn.us/bike/bicycle-facility-design-manual.html)
2. <span id="ref-2"></span><EvidenceChip tier="legal" /> [Texas Department of Transportation, *Roadway Design Manual*, Section 19.7.3, "Pedestrian/Bike Bridges and Underpasses."](https://www.txdot.gov/manuals/des/rdw/chapter-19-pedestrian-facilities/19-7-overcrossings-and-underpasses/19-7-3-pedestrian-bike-bridges-and-underpasses.html)
3. <span id="ref-3"></span><EvidenceChip tier="precedent" /> [CROW, *Ontwerpwijzer fietsverkeer*, "Ongelijkvloerse oplossing" (grade-separated solutions), CROW Kennisbank (in Dutch).](https://kennisbank.crow.nl/public/gastgebruiker/WOBU/Ontwerpwijzer_fietsverkeer/Ongelijkvloerse_oplossing/32991)
4. <span id="ref-4"></span><EvidenceChip tier="precedent" /> [Pedestrian and Bicycle Information Center, "Pedestrian Overpasses/Underpasses," walkinginfo.org (FHWA-funded).](https://www.walkinginfo.org/engineering/crossings-overpasses/)
5. <span id="ref-5"></span><EvidenceChip tier="precedent" /> [CROW, *Ontwerpwijzer fietsverkeer*, V51 "Fietsonderdoorgang" (bicycle underpass), CROW Kennisbank (in Dutch).](https://kennisbank.crow.nl/public/gastgebruiker/WOBU/Ontwerpwijzer_fietsverkeer/V51_Fietsonderdoorgang/33078)
6. <span id="ref-6"></span><EvidenceChip tier="precedent" /> [CROW, *Ontwerpwijzer fietsverkeer*, V52 "Fietsbrug" (bicycle bridge), CROW Kennisbank (in Dutch).](https://kennisbank.crow.nl/public/gastgebruiker/WOBU/Ontwerpwijzer_fietsverkeer/V52_Fietsbrug/33079)
7. <span id="ref-7"></span><EvidenceChip tier="legal" /> [Texas Department of Transportation, *Roadway Design Manual*, Section 4.8.6, "Vertical Clearance."](https://www.txdot.gov/manuals/des/rdw/chapter-4--basic-design-criteria/4-8-vertical-alignment/4-8-6-vertical-clearance.html)
8. <span id="ref-8"></span><EvidenceChip tier="legal" /> [Wisconsin Department of Transportation, *Wisconsin Bicycle Facility Design Handbook* (2004, updated 2018), Section 4.15.7 "Grade separations," Table 4-12, and Section 4.16.1 "Bridges and overpasses."](https://wisconsindot.gov/documents/projects/multimodal/bike/facility.pdf)
9. <span id="ref-9"></span><EvidenceChip tier="evidence" /> [Anciaes, P.R. and Jones, P., "Estimating preferences for different types of pedestrian crossing facilities," *Transportation Research Part F* 52 (2018), pp. 222 to 237.](https://discovery.ucl.ac.uk/id/eprint/10040652/)
