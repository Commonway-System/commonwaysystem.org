---
title: Walk and Bike Overpass
description: A bridge that lifts a walking and biking route over a road that stays at street level. Discouraged on bike routes, where an underpass asks for far less climbing; the right call over a road in a cut, for walking-only crossings, and where an underpass can't be kept safe or dry.
patternId: INT-OVP-17
status: situational
date: 2026-10-22
llms: A walking and biking bridge over a road that stays at street level. Situational / Discouraged on bike routes, because it must clear trucks (about 17.5 ft in US practice, 4.5 m in the Netherlands) where an underpass needs about 10 ft or 2.5 m. Still the right call over a road already in a cut, for walking-only crossings, and where an underpass can't be kept safe or dry.
---

<script>
  import { Citation, DensityChip, EvidenceChip, IdPill, PatternViewer, RelatedMedia } from '$lib/theme/components'
</script>

A bridge that lifts a walking and biking route over a road that stays at street level. Discouraged on bike routes, where an underpass asks for far less climbing.

<PatternViewer image={fm.image} title={fm.title} classification="intersections" />

<RelatedMedia id={fm.patternId} />

<div class="cw-context">

<span class="cw-context__label">Typical at:</span> <DensityChip tier="Rural" /> <DensityChip tier="Suburban" /> <DensityChip tier="Compact" />

Most common over freeways and high-speed arterials. Bridges over water and rail lines are covered by [Grade-Separated Walk and Bike Crossing](/patterns/intersections/grade-separated-walk-bike-crossing/) <IdPill id="INT-GSW-16" />.

</div>

## Design notes

US practice often builds overpasses. The 2003 edition of the MUTCD, the federal traffic control manual, found them more satisfactory than underpasses for school crossings, since they are easier to maintain and supervise.<Citation index={1} /> Over a road, though, a bridge has to clear trucks: 17.5 ft in Texas, 4.50 m in the Netherlands. An underpass needs about 10 ft, or 2.50 m.<Citation index={2} /><Citation index={3} /><Citation index={4} /><Citation index={5} /> Wisconsin and Minnesota DOT both note that an overpass usually needs the greater change in height, and so longer ramps, more land and more cost.<Citation index={6} /><Citation index={7} /> CROW, the Dutch design manual, rates an underpass as often better for cyclists than a bridge: the cyclist builds speed going down and spends it climbing out.<Citation index={3} /><Citation index={8} /> CS classifies a walk and bike overpass over a street-level road as Situational / Discouraged on bike routes, informed by CROW's bicycle bridge guidance and the height comparisons in the Wisconsin and Minnesota manuals. The preferred form is an underpass, ideally with the road raised a little: see [Grade-Separated Walk and Bike Crossing](/patterns/intersections/grade-separated-walk-bike-crossing/) <IdPill id="INT-GSW-16" />.

## When an overpass is the right call

<div class="cw-tiles">

- **The road is already in a cut.** Where the road sits below the land around it, a bridge needs little or no ramp. Overpasses work best where the ground allows a structure without ramps.<Citation index={9} />
- **Walking-only crossings.** Pedestrians in one UK study would walk 5.3 extra minutes to avoid an underpass, against 2.4 to avoid a footbridge.<Citation index={10} />
- **Where an underpass can't be kept safe.** CROW weighs personal safety more heavily in deserted places than in busy ones. A bridge in the open can be seen from all around; an underpass can't.<Citation index={8} /><Citation index={7} />
- **Where an underpass can't be kept dry.** High groundwater makes an underpass costlier, and flooding and debris can close one for a season.<Citation index={8} /><Citation index={7} />
- **Cost.** A bridge is often cheaper than an underpass.<Citation index={3} />

</div>

## Designing one well

<div class="cw-tiles">

- **Lower the road a little.** Where a bridge crosses a road, the road can sit slightly below ground level to shorten the climb.<Citation index={8} /><Citation index={3} />
- **A rideable climb.** The ramp itself must be rideable; stairs with a bike gutter, lifts and escalators only add to it. Switchbacks and spirals fit a ramp into less land.<Citation index={8} /><Citation index={3} />
- **Railings and wind.** At least 42 in where people ride next to the railing, 54 in preferred on long or high bridges (Wisconsin DOT); CROW uses at least 1.30 m. A wind screen helps on an exposed span.<Citation index={6} /><Citation index={3} />
- **Fear of heights.** Narrow, high, long bridges can cause it, made worse by low railings and poor sightlines.<Citation index={8} />
- **Width.** At least 8 ft of clear width in Texas, never less than the sidewalk leading to it; CROW sets at least 3.00 to 3.50 m for a bike path, depending on footpaths.<Citation index={4} /><Citation index={3} />

</div>

## Related patterns

<div class="cw-links">

- [Grade-Separated Walk and Bike Crossing](/patterns/intersections/grade-separated-walk-bike-crossing/) <IdPill id="INT-GSW-16" /> (the preferred form, with an underpass first)
- [Midblock Pedestrian Crossing](/patterns/intersections/midblock-crossing/) <IdPill id="INT-MPC-08" /> (the street-level crossing that comes before either)
- [Grade-Separated Interchange](/patterns/intersections/grade-separated-interchange/) <IdPill id="INT-GSI-10" /> (grade separation for motor traffic)

</div>

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> [Federal Highway Administration, *Manual on Uniform Traffic Control Devices*, 2003 Edition, Section 7F.02 "Types of Grade-Separated Crossings."](https://mutcd.fhwa.dot.gov/htm/2003/part7/part7f.htm)
2. <span id="ref-2"></span><EvidenceChip tier="legal" /> [Texas Department of Transportation, *Roadway Design Manual*, Section 4.8.6, "Vertical Clearance."](https://www.txdot.gov/manuals/des/rdw/chapter-4--basic-design-criteria/4-8-vertical-alignment/4-8-6-vertical-clearance.html)
3. <span id="ref-3"></span><EvidenceChip tier="precedent" /> [CROW, *Ontwerpwijzer fietsverkeer*, V52 "Fietsbrug" (bicycle bridge), CROW Kennisbank (in Dutch).](https://kennisbank.crow.nl/public/gastgebruiker/WOBU/Ontwerpwijzer_fietsverkeer/V52_Fietsbrug/33079)
4. <span id="ref-4"></span><EvidenceChip tier="legal" /> [Texas Department of Transportation, *Roadway Design Manual*, Section 19.7.3, "Pedestrian/Bike Bridges and Underpasses."](https://www.txdot.gov/manuals/des/rdw/chapter-19-pedestrian-facilities/19-7-overcrossings-and-underpasses/19-7-3-pedestrian-bike-bridges-and-underpasses.html)
5. <span id="ref-5"></span><EvidenceChip tier="precedent" /> [CROW, *Ontwerpwijzer fietsverkeer*, V51 "Fietsonderdoorgang" (bicycle underpass), CROW Kennisbank (in Dutch).](https://kennisbank.crow.nl/public/gastgebruiker/WOBU/Ontwerpwijzer_fietsverkeer/V51_Fietsonderdoorgang/33078)
6. <span id="ref-6"></span><EvidenceChip tier="legal" /> [Wisconsin Department of Transportation, *Wisconsin Bicycle Facility Design Handbook* (2004, updated 2018), Section 4.15.7 "Grade separations," Table 4-12, and Section 4.16.1 "Bridges and overpasses."](https://wisconsindot.gov/documents/projects/multimodal/bike/facility.pdf)
7. <span id="ref-7"></span><EvidenceChip tier="legal" /> [Minnesota Department of Transportation, *Minnesota Bicycle Facility Design Manual* (2020), "Pedestrian and Bicycle Bridges and Underpasses," p. 7-8.](https://www.dot.state.mn.us/bike/bicycle-facility-design-manual.html)
8. <span id="ref-8"></span><EvidenceChip tier="precedent" /> [CROW, *Ontwerpwijzer fietsverkeer*, "Ongelijkvloerse oplossing" (grade-separated solutions), CROW Kennisbank (in Dutch).](https://kennisbank.crow.nl/public/gastgebruiker/WOBU/Ontwerpwijzer_fietsverkeer/Ongelijkvloerse_oplossing/32991)
9. <span id="ref-9"></span><EvidenceChip tier="precedent" /> [Pedestrian and Bicycle Information Center, "Pedestrian Overpasses/Underpasses," walkinginfo.org (FHWA-funded).](https://www.walkinginfo.org/engineering/crossings-overpasses/)
10. <span id="ref-10"></span><EvidenceChip tier="evidence" /> [Anciaes, P.R. and Jones, P., "Estimating preferences for different types of pedestrian crossing facilities," *Transportation Research Part F* 52 (2018), pp. 222 to 237.](https://discovery.ucl.ac.uk/id/eprint/10040652/)
