---
title: Industrial Collector
description: A Collector Typology serving industrial land use, where freight movement outranks vehicle, pedestrian, bicycle, and transit priority.
patternId: COL-IND-03
date: 2026-08-29
llms: A Collector street typology serving industrial land use, where freight movement is prioritized above vehicle, pedestrian, bicycle, and transit use.
---

<script>
  import { Citation, DensityChip, EvidenceChip, GuidanceTable, ModalHierarchySection, PatternCard, RelatedMedia, SpeedLimitSection, SpeedModalHierarchyCard } from '$lib/theme/components'

  const na = (why) => ({ summary: 'Not applicable.', content: [why] })
  const unspec = { summary: 'Not specified.', content: ['Not specified in the typical-elements list.'] }
  const gap = (why) => ({ summary: 'Not researched.', content: [{ note: why }] })
  const notResearched = gap('Not separately researched for this Typology.')
  const guidanceRows = [
    {
      label: 'Travel lane width',
      cells: [
        { summary: '12 ft.', content: ['12 ft. Truck volume is the reason: this is the width freight movement needs, not a rural or comfort-driven choice.'] },
        { summary: '10 to 12 ft; 12 ft in industrial zones.', content: ['10 to 12 ft depending on volume and speed, with industrial zones specifically built to 12 ft where truck volume is significant. Portland\'s industrial-zone cross-section uses two 12 ft travel lanes.', { cite: 1 }, ' Minneapolis names the WB-62 design vehicle for highly industrialized streets.', { cite: 2 }] },
        { summary: 'Not applicable at these volumes.', content: ['NACTO\'s general guidance narrows lanes where feasible, but notes 10 ft lanes still support truck uses only at 35 mph and under. Industrial Collector truck volumes exceed that threshold, so the narrowing guidance does not carry over.', { cite: 3 }] },
        unspec,
        gap('Not researched.'),
      ],
    },
    {
      label: 'Number of travel lanes',
      cells: [
        { summary: 'Two lanes, plus turn lanes as needed.', content: ['Two lanes, one each way, with additional turn lanes as needed at intersections to accommodate slow-turning trucks.'] },
        { summary: 'Two to four lanes, plus turn lanes.', content: ['Two to four lanes are typical for industrial roads, with additional turning lanes as needed.', { cite: 4 }] },
        gap('Not researched.'),
        unspec,
        gap('Not researched.'),
      ],
    },
    {
      label: 'Bicycle facility',
      cells: [
        { summary: 'Required within a 3 mi bike / 0.5 mi walk catchment; must be physically separated.', content: ['A bicycle facility is required, not contingent on a master plan naming this corridor, whenever any population that could plausibly use this street segment for any purpose falls within a 3-mile bicycle catchment or a 0.5-mile pedestrian catchment of it.', { cite: 22 }, ' Measure the catchment against the street segment as a whole, not against any single business or job site along it. This is public right-of-way, and the relevant population is whoever could use it, not only people employed at adjacent industrial land uses.', { cite: 22 }, { cite: 24 }, ' Only in the genuine edge case, an isolated segment with no population within either catchment at all, does the facility become context-dependent rather than required. Once required, it must be physically separated, not a painted or buffered-only lane, per the Separation / buffer row below.'] },
        { summary: 'FTA 0.5 mi walk / 3 mi bike distances; FHWA selects by context, not plan status.', content: ['FTA\'s adopted eligibility policy treats pedestrian improvements within one-half mile, and bicycle improvements within three miles, of a public transportation stop or station as having a de facto relationship to public transportation. Those are transit-funding thresholds, and this page borrows the same distances as its catchment.', { cite: 22 }, ' Separately, FHWA\'s Bikeway Selection Guide selects bikeway facility type from roadway speed and volume, truck mix, and land use context, not from whether a corridor appears in an adopted bicycle plan.', { cite: 23 }] },
        { summary: 'Coordinate truck and bike routes up front.', content: ['Truck route designation should be coordinated with bicycle network mapping up front, rather than resolved after the fact. Bollards are recommended at truck-route corners because of a documented pattern of truck wheels overrunning curbs and striking people nearby.', { cite: 6 }, ' Seattle\'s freight standards go further: a protected bicycle lane is recommended where a bicycle facility is planned on a truck street, though the standard\'s first preference is routing the bicycle network away from major truck streets where an alternative exists.', { cite: 13 }] },
        unspec,
        gap('Not researched.'),
      ],
    },
    {
      label: 'Pedestrian facility',
      cells: [
        { summary: 'Sidewalk both sides, about 6 ft.', content: ['Sidewalk on both sides, roughly a 6 ft pedestrian through-zone, with a minimal (roughly 0.5 ft) frontage zone. Driveway and curb-cut count is the real design lever here, not sidewalk width.'] },
        { summary: 'PROWAG width applies.', content: ['PROWAG\'s general minimum access-route width applies regardless of adjacent land use.', { cite: 7 }] },
        gap('Not researched.'),
        unspec,
        gap('Not researched.'),
      ],
    },
    {
      label: 'Speed management',
      cells: [
        { summary: '30 mph, unchanged from base Collector.', content: ['30 mph, unchanged from the base Collector rule. See ', { href: '/patterns/collectors/default/', label: 'Default (Standard Collector)' }, '.'] },
        { summary: 'Design speed equals posted speed.', content: ['FHWA\'s design-speed-equals-posted-speed framework, the same source cited across this publication.', { cite: 8 }] },
        { summary: 'Narrower lanes calm traffic.', content: ['The same logic as Default (Standard Collector): narrower lanes calm traffic. Here that logic is limited by the 12 ft truck lane width above, so speed is held by the 30 mph rule and geometry at intersections instead.'] },
        unspec,
        gap('Not researched.'),
      ],
    },
    {
      label: 'Intersection treatment',
      cells: [
        { summary: 'Local: stop control. Collector or Arterial: roundabout.', content: [
          { tier: { label: 'Meets a Local street', body: ['Stop / Yield on the Local approach. Low volume does not justify a roundabout. The curb radius on the Industrial Collector\'s own approach still follows freight-street sizing, not a normal Local-street radius, since the truck is still turning even where the cross street is minor.', { cite: 9 }] } },
          { tier: { label: 'Meets another Collector', body: ['A ', { href: '/patterns/intersections/roundabout/', label: 'Roundabout' }, ' is preferred, sized per NCHRP Research Report 1043\'s current large-vehicle guidance with a truck apron for the occasional oversize check vehicle. The everyday design vehicle should clear the roundabout without off-tracking onto the apron.', { cite: 10 }, ' Confirm actual vehicle-classification counts before defaulting to the largest conceivable design vehicle everywhere. Oversizing has its own safety and cost consequences.', { cite: 11 }, { cite: 12 }] } },
          { tier: { label: 'Meets an Arterial', body: ['A ', { href: '/patterns/intersections/roundabout/', label: 'Roundabout' }, ' is preferred, with a ', { href: '/patterns/intersections/signal/', label: 'Signal' }, ' only where volume genuinely warrants one, the same logic as Default (Standard Collector). Size it at the higher end, since both legs likely carry freight designation.'] } },
          { tier: { label: 'Meets a Freeway', body: ['Not applicable. A Collector does not connect to a Freeway at grade. That is an interchange condition and belongs to ', { href: '/patterns/intersections/grade-separated-interchange/', label: 'Grade-Separated Interchange' }, '.'] } },
        ] },
        { summary: 'NCHRP Research Report 1043.', content: ['NCHRP Research Report 1043 is the current national roundabout guide and supersedes NCHRP Report 672.', { cite: 10 }] },
        { summary: 'Design vehicle vs. check vehicle.', content: ['NACTO separates the design vehicle from the check vehicle, and favors rerouting truck routes over reconstructing a corner to fit the largest possible truck.', { cite: 6 }] },
        unspec,
        gap('Not researched.'),
      ],
    },
    {
      label: 'Separation / buffer between modes',
      cells: [
        { summary: 'Physical separation required: 3 ft minimum buffer plus a durable vertical element, not paint alone.', content: ['Physical separation is required on this Typology, not merely preferred: a minimum 3 ft buffer plus a durable vertical element (a curb, planter, or bollard), not a painted line alone, and not flexible delineator posts alone given the truck volumes this street carries. This is not a sliding scale on this page. Industrial Collector\'s speed is fixed at 30 mph (see Speed management above), and FHWA\'s bikeway-selection guidance calls for a fully separated facility once a street\'s speed and volume reach roughly 30 mph and/or approximately 7,000 vehicles per day.', { cite: 23 }, ' A Collector carrying freight-level truck volume meets or exceeds that threshold as a matter of course, so there is no lower tier of separation available on this Typology to fall back to.'] },
        { summary: 'FHWA: full separation above ~30 mph / ~7,000 vpd; 3 ft minimum buffer, curb, planter, or bollard.', content: ['FHWA\'s Bikeway Selection Guide generally recommends a separated bike lane or shared-use path, not a painted or buffered-only lane, once a street\'s motor vehicle speed and volume exceed roughly 30 to 35 mph and/or approximately 6,000 to 7,000 vehicles per day.', { cite: 23 }, ' FHWA\'s separate Separated Bike Lane Planning and Design Guide sets a 3 ft minimum buffer width for maneuvering and door-opening clearance, and documents curbs, planters, bollards, and flexible delineator posts as vertical-element options, with a 3 inch mountable curb as the standard detail where street-sweeper access is needed.', { cite: 5 }] },
        { summary: 'Setback stop bars; bicycle signal phasing.', content: ['Seattle\'s freight standards describe stop bars that can be set back from the intersection and crosswalk to leave room for a turning truck\'s swept path, and bicycle signals that can separate bicycle and truck movements in time. Both are offered as design tools, not requirements.', { cite: 13 }] },
        unspec,
        gap('Not researched.'),
      ],
    },
    {
      label: 'On-street parking',
      cells: [
        { summary: 'Discouraged; buffered lane if unavoidable.', content: ['Discouraged; off-street is always preferred. Where unavoidable, a buffered lane (10 to 14 ft plus a 2 to 4 ft painted buffer), never bare curbside. No parking or loading within 20 ft of a marked crosswalk.'] },
        { summary: '20 ft crosswalk setback.', content: ['A 20 ft setback before a marked crosswalk keeps sight distance clear and stops drivers pulling forward onto a raised crossing to back into the first space.', { cite: 14 }] },
        gap('Not researched.'),
        unspec,
        gap('Not researched.'),
      ],
    },
    {
      label: 'Property access',
      cells: [
        { summary: 'Curb cuts limited by code; forward entry.', content: ['Curb cuts limited by code, not "as needed." The driveway and on-site apron are sized so the design vehicle enters forward and never backs across the public sidewalk to reach a loading position. See ', { href: '/patterns/elements/curb-cut-driveway-apron/', label: 'Curb Cut / Driveway Apron' }, '.'] },
        { summary: 'Curb-cut counts capped; no backing into the street.', content: ['Curb-cut counts are limited by land use code.', { cite: 15 }, ' Backing onto a public street or sidewalk to leave a site is prohibited in multiple adopted jurisdictions: Knightdale, NC bars loading areas from relying on backing movements into the right-of-way,', { cite: 17 }, ' and Bakersfield, CA bars vehicles backing onto any street to leave a site, explicitly once the street is classified arterial or collector.', { cite: 18 }, ' Houston bars back-in loading berths on a major thoroughfare and, where a back-out berth is used, requires it to be deep enough that no part of the vehicle protrudes over the property line.', { cite: 16 }] },
        { summary: 'Confirm the actual truck mix.', content: ['Confirm actual truck mix before assuming the largest design vehicle at every driveway.', { cite: 19 }] },
        unspec,
        gap('Not researched.'),
      ],
    },
  ]
</script>

<PatternCard id={fm.patternId} title="Industrial Collector" classification="collector" status="recommended">
A Collector road serving warehouses, freight yards, or manufacturing land use, designed around truck movement and loading rather than the base Collector priority order.
</PatternCard>

<RelatedMedia id={fm.patternId} />

Typical at: <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" />

Undeveloped, Rural, and Core are edge cases.

## Speed and modal hierarchy

<SpeedModalHierarchyCard>
<SpeedLimitSection speeds={[30]}>
Follows the Collector default: 30 mph standard. Freight priority in the modal hierarchy below does not change the vehicle speed cap.

</SpeedLimitSection>
<ModalHierarchySection classification="collector" rows={[{ tiers: ['freight', 'vehicle', 'pedestrian', 'bicycle', 'transit'] }]}>
An override justified because the Typology's stated purpose is freight movement to and from industrial land use.

</ModalHierarchySection>

</SpeedModalHierarchyCard>

## Layered guidance across sources

The Commonway System column comes first: it is the answer. The four columns after it show the layered sources it was built from. Open gaps are marked in the cells rather than guessed at.

<GuidanceTable rows={guidanceRows} caption="Industrial Collector design guidance by source, from the Commonway System answer through federal and state baseline, NACTO, Complete Streets, and Dutch practice" />

## Design notes

Industrial land use exists across a wide density range, which is why this Typology's realistic range is broader than most Collector entries, spanning Suburban through Urban with Undeveloped, Rural, and Core all plausible as edge cases rather than clean exclusions.<Citation index={6} />

The corner and driveway geometry on this page is driven by more than fit. Federal analysis has found that large trucks are involved in a disproportionate share of fatal pedestrian and cyclist crashes relative to their share of the vehicle fleet, and that turning maneuvers carry far higher odds of a fatal outcome than going straight, largely because a truck's off-tracking during a turn puts a person standing or riding alongside the trailer in a blind zone with no escape path.<Citation index={20} /><Citation index={21} /> That is why curb-cut minimization and intersection design on this page are treated as life-safety measures, not just access-management or geometry problems. The general pattern for turning-vehicle risk is on the [Signal](/patterns/intersections/signal/) page, and this street is the acute case of it.

Two cautions apply when sizing anything on this page to the largest design vehicle. Designing every movement for the largest conceivable truck degrades safety and comfort for other users without a demonstrated need, and oversized intersections carry their own costs: more crash exposure, more confusion, more right-of-way, and longer pedestrian crossing distances.<Citation index={11} /><Citation index={12} /> Confirm actual vehicle mix before defaulting to the worst case.

**Bicycle facility catchment.** The 3-mile bike and 0.5-mile walk threshold above borrows the distances in FTA's own adopted eligibility policy for pedestrian and bicycle improvements, which are themselves reasoned from equivalent travel time at each mode's typical speed: roughly a 15-to-30-minute walk at 2 mph, and the same time budget at a bicycle's roughly 10 mph average commute speed.<Citation index={22} /> The trigger is population, not land use classification. An industrial designation for this street does not mean its only legitimate users are people employed at businesses along it, and it should not be read as excusing the facility just because a bicycle plan has not caught up to the corridor. Industrial and logistics employment also skews toward a workforce with lower vehicle ownership and higher walk and bicycle mode share than the general population, including shift-work schedules that raise their own visibility and lighting needs. That is a reason to apply this trigger generously here, not a reason to scope it down to only the workers on-site.<Citation index={24} />

Where this pattern's street crosses an active rail spur, an increasingly common condition on industrial land, see [Railroad Grade Crossing](/patterns/intersections/railroad-grade-crossing/) (INT-RGC-15), which covers the geometry and warning devices this page does not.

## Related patterns

[Default (Standard Collector)](/patterns/collectors/default/) (COL-DEF-01) (the base order this pattern overrides for Freight priority), [Alley](/patterns/local-streets/alley/) (LOC-ALY-02) (the other cross-Classification pattern overriding to a Vehicle/Freight-first order for a specific access purpose), [Roundabout (Single / Multi-Lane)](/patterns/intersections/roundabout/) (INT-RAB-01) (this pattern's intersection answer depends on that page's freight-street sizing note), [Curb Cut / Driveway Apron](/patterns/elements/curb-cut-driveway-apron/) (ELM-CCA-04) (this pattern's property-access answer depends on that Element's forward-entry requirement), [Railroad Grade Crossing](/patterns/intersections/railroad-grade-crossing/) (INT-RGC-15) (where an active rail spur crosses this street)

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> [City of Portland Bureau of Transportation, *PBOT Development Review Manual*, industrial-zone cross-section standard (44 ft curb-to-curb, two 12 ft travel lanes).](https://www.portland.gov/transportation/permitting/documents/pbot-development-review-manual-creating-public-streets-and/download)
2. <span id="ref-2"></span><EvidenceChip tier="legal" /> [City of Minneapolis, *Street Design Guidance* 3.7B, "Design and Control Vehicles" (WB-62 named for highly industrialized streets).](https://sdg.minneapolismn.gov/application/files/4116/1256/7848/3.7B_Design_and_control_vehicles.pdf)
3. <span id="ref-3"></span><EvidenceChip tier="precedent" /> [NACTO, *Urban Bikeway Design Guide*, "Protected Bike Lanes" (10 ft lanes support truck uses at 35 mph and under).](https://nacto.org/latest/urban-bikeway-design-guide-protected-bike-lanes/)
4. <span id="ref-4"></span><EvidenceChip tier="precedent" /> [City of Portland Bureau of Transportation, StreetsPDX, "Industrial Roads" street type (two to four lanes plus turn lanes as needed).](https://pbotapps.portland.gov/streets-pdx/street-types/industrial-road)
5. <span id="ref-5"></span><EvidenceChip tier="legal" /> [Federal Highway Administration, *Separated Bike Lane Planning and Design Guide*, vertical separation type selection.](https://www.fhwa.dot.gov/environment/bicycle_pedestrian/publications/separated_bikelane_pdg/page08.cfm)
6. <span id="ref-6"></span><EvidenceChip tier="precedent" /> [NACTO, *Urban Street Design Guide*, "Design Vehicle" (truck route coordination with bike, transit, and pedestrian mapping; bollards at truck-route corners).](https://nacto.org/publication/urban-street-design-guide/design-controls/design-vehicle/)
7. <span id="ref-7"></span><EvidenceChip tier="legal" /> [U.S. Access Board, PROWAG Chapter R3, Technical Requirements, pedestrian access route width.](https://www.access-board.gov/prowag/proposed/chapter-r3-technical-requirements/)
8. <span id="ref-8"></span><EvidenceChip tier="legal" /> [Federal Highway Administration. "Relationship Between Design Speed, Operating Speed, and Posted Speed."](https://www.fhwa.dot.gov/planning/css/resources/speed)
9. <span id="ref-9"></span><EvidenceChip tier="precedent" /> Seattle Streets Illustrated, [3.9 Intersections](https://streetsillustrated.seattle.gov/design-standards/intersections/) and [2.13 Industrial Access](https://streetsillustrated.seattle.gov/street-type-standards/industrial-access/) (curb radius by connection type: 25 to 30 ft for truck-street intersections versus a 20 ft citywide default).
10. <span id="ref-10"></span><EvidenceChip tier="legal" /> [Transportation Research Board, *Guide for Roundabouts*, NCHRP Research Report 1043 (2023). Supersedes NCHRP Report 672.](https://www.nationalacademies.org/publications/27069)
11. <span id="ref-11"></span><EvidenceChip tier="legal" /> [Delaware Department of Transportation, *Design Guidance Memorandum* (DGM) 1-26, "Roundabouts" (design vehicle versus check vehicle, and the caution against over-designing for the largest possible truck).](https://deldot.gov/Publications/manuals/dgm/pdfs/1-26_Roundabouts.pdf)
12. <span id="ref-12"></span><EvidenceChip tier="legal" /> [Wisconsin Department of Transportation, *Facilities Development Manual*, FDM 11-25 (costs of oversized truck-accommodating intersections).](https://wisconsindot.gov/rdwy/fdm/fd-11-25.pdf)
13. <span id="ref-13"></span><EvidenceChip tier="precedent" /> [Seattle Streets Illustrated, 3.11 "Freight" (protected bicycle lane recommended on truck streets; setback stop bars and bicycle signals as tools against large-truck turning movements).](https://streetsillustrated.seattle.gov/design-standards/freight/)
14. <span id="ref-14"></span><EvidenceChip tier="legal" /> [Ohio Department of Transportation, *Location and Design Manual* Volume 1, pedestrian facilities (20 ft parking and loading restriction before a marked crosswalk).](https://www.transportation.ohio.gov/working/engineering/roadway/manuals-standards/multimodal/04)
15. <span id="ref-15"></span><EvidenceChip tier="legal" /> [City of Seattle, Land Use Code § 23.54.030, "Parking space and access standards" (curb-cut counts per lot frontage).](http://seattle-wa.elaws.us/code/mc_title23_subtitleiii_ch23.54_sec23.54.030)
16. <span id="ref-16"></span><EvidenceChip tier="legal" /> [City of Houston, *Houston Building Code* (2021), Chapter 31, § 3116.4.6 "Loading Berth" (§ 3112 in the 2015 edition).](https://up.codes/viewer/houston/ibc-2021/chapter/31/special-construction)
17. <span id="ref-17"></span><EvidenceChip tier="legal" /> [Town of Knightdale, NC, *Unified Development Ordinance*, Chapter 7, "Development Standards" (loading areas may not rely on backing movements into public rights-of-way).](https://www.knightdalenc.gov/sites/default/files/uploads/developmentservices/udo/07-development-standards-052226.pdf)
18. <span id="ref-18"></span><EvidenceChip tier="legal" /> [City of Bakersfield, *Zoning Code*, Chapter 32 (vehicles may not back onto any street or thoroughfare to leave a site, binding once a street is classified arterial or collector).](https://www.zoneomics.com/code/bakersfield-CA/chapter_32)
19. <span id="ref-19"></span><EvidenceChip tier="legal" /> [Los Angeles Department of Transportation, *Driveway Design Guide* (2024) (on-site reservoir and maneuvering space; confirm truck mix by turning-movement path evaluation).](https://ladot.lacity.gov/sites/default/files/2026-04/driveway-design-guide-march-2024.pdf)
20. <span id="ref-20"></span><EvidenceChip tier="evidence" /> [U.S. Government Accountability Office, *Pedestrian and Cyclist Safety: DOT Should Take Steps to Address Risks Related to Limited Driver Visibility*, GAO-26-107954 (2026).](https://www.gao.gov/products/gao-26-107954)
21. <span id="ref-21"></span><EvidenceChip tier="evidence" /> [Wang, Q. et al., "Exploring the Influencing Factors and Formation of the Blind Zone of a Semitrailer Truck in a Right-Turn Collision," *Sustainability* 14(16), 9805 (2022).](https://doi.org/10.3390/su14169805)
22. <span id="ref-22"></span><EvidenceChip tier="legal" /> [Federal Transit Administration, "Final Policy Statement on the Eligibility of Pedestrian and Bicycle Improvements Under Federal Transit Law," *Federal Register* 76(161), p. 52046 (August 19, 2011) (one-half mile pedestrian and three-mile bicycle distances from a transit stop or station).](https://www.federalregister.gov/documents/2011/08/19/2011-21273/final-policy-statement-on-the-eligibility-of-pedestrian-and-bicycle-improvements-under-federal)
23. <span id="ref-23"></span><EvidenceChip tier="legal" /> [Federal Highway Administration, *Bikeway Selection Guide*, FHWA-SA-18-077 (2019) (facility type by speed, volume, truck mix, and land use context; separated facility thresholds).](https://safety.fhwa.dot.gov/ped_bike/tools_solve/docs/fhwasa18077.pdf)
24. <span id="ref-24"></span><EvidenceChip tier="evidence" /> [Chandra, S., Jimenez, J., and Radhakrishnan, R., "Accessibility evaluations for nighttime walking and bicycling for low-income shift workers," *Journal of Transport Geography* 64 (2017), pp. 97 to 108.](https://doi.org/10.1016/j.jtrangeo.2017.08.010)
