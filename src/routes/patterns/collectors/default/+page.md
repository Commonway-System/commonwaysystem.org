---
title: Default (Standard Collector)
description: The baseline Collector street typology, carrying the base modal hierarchy and 30 mph standard speed with no named override.
patternId: COL-DEF-01
status: recommended
date: 2026-08-29
llms: The baseline Collector street, applying the base modal hierarchy and 30 mph standard speed with no named override.
---

<script>
  import viewerData from '$lib/data/street-configs/col-def-01'
  import { Citation, DensityChip, EvidenceChip, GuidanceTable, IdPill, ModalHierarchySection, PatternViewer, RelatedMedia, SpeedLimitSection, SpeedModalHierarchyCard } from '$lib/theme/components'

  const csSeg = '/patterns/collectors/default/#speed-and-modal-hierarchy'
  const guidanceRows = [
    {
      label: 'Travel lane width',
      cells: [
        { summary: '10 ft lanes.', content: ['10 ft. The federal range is a binding mandate, so nothing below 10 ft is legally available. NACTO\'s 10 ft sits at the safe end of that mandated range, so it is simultaneously the floor and the best available option.'] },
        { summary: '10 to 12 ft range.', content: ['10 to 12 ft, the AASHTO Green Book\'s Collector range.', { cite: 2 }] },
        { summary: '10 ft urban, avoid over 11.', content: ['10 ft recommended in urban contexts; lanes over 11 ft discouraged.', { cite: 3 }] },
        { summary: 'Narrower lanes.', content: ['Narrower travel lanes listed as a typical element.', { cite: 4 }] },
        { summary: 'Not regulated separately.', content: ['Not a separately regulated dimension. Folded into overall speed-and-separation design instead.'] },
      ],
    },
    {
      label: 'Number of travel lanes',
      cells: [
        { summary: 'Two lanes, one each way.', content: ['Two lanes, one per direction, as the standard cross-section. Additional lanes are a documented exception requiring a stated volume threshold, not a default. Unmatched lane capacity without matching access control is exactly the failure mode ', { href: '/patterns/arterials/stroad/', label: 'Stroad' }, ' describes.'] },
        { summary: 'Set by volume and level of service.', content: ['AASHTO\'s Green Book bases lane count on projected traffic volume and level-of-service analysis rather than fixing one number, in the same Collector chapter that sets the lane-width range.', { cite: 2 }, { note: ' Needs verification: that source was read for width guidance, not confirmed for lane-count methodology.' }] },
        { summary: 'Favors narrower over more lanes.', content: ['Favors narrower lanes over more of them.', { cite: 3 }, { note: ' Open gap: NACTO\'s position on lane count itself was not separately sourced.' }] },
        { summary: 'Not specified.', content: ['Not specified in the typical-elements list.', { cite: 4 }] },
        { summary: 'Typically 2×1 to 2×2 lanes.', content: ['Dutch distributor roads, the closest functional peer, typically run 2×1 to 2×2 lanes. See the ', { href: '/guide/street-types/#for-readers-coming-from-dutch-crow-practice', label: 'CROW comparison table' }, '.'] },
      ],
    },
    {
      label: 'Traffic volume (vehicles per day)',
      cells: [
        { summary: 'About 1,500 to 6,000 vehicles per day.', content: ['About 1,500 to 6,000 vehicles per day. Both ends come from NACTO\'s bikeway guidance. Once traffic passes 1,000 to 2,000 vehicles a day, most people will only ride in the street if cars stay under 20 mph, so below about 1,500 a street can work as a Local street with shared lanes. Above about 6,000, NACTO says only a protected bike lane makes a street safe for riders of all ages and abilities.', { cite: 24 }, ' This page\'s 30 mph speed rule already calls for a protected bike lane, so 6,000 marks the end of the Collector\'s job: a street carrying more is working as an Arterial. The answer is to plan it as one, or to bring its traffic back down, not to add lanes. The federal urban range, 1,100 to 6,300, lands in nearly the same place.', { cite: 23 }] },
        { summary: 'Urban 1,100 to 6,300; rural 150 to 2,600.', content: ['FHWA\'s functional classification guidelines give typical daily volume (AADT) ranges, not limits. Urban Major and Minor Collectors: 1,100 to 6,300. Rural Major Collectors: 300 to 2,600. Rural Minor Collectors: 150 to 1,110. FHWA notes the urban figures are approximate, from a small number of states reporting, and the ranges for neighboring classes deliberately overlap, so volume is one input to classification, not a cutoff.', { cite: 23 }, { note: ' Not checked: whether the AASHTO Green Book sets its own Collector volume range.' }] },
        { summary: 'No street range; 6,000 is the bikeway line.', content: ['NACTO does not classify streets by volume, so it gives no Collector range. Its volume numbers choose the bikeway instead. At 25 mph or less, a conventional or buffered bike lane can serve all ages and abilities up to 1,500 to 3,000 vehicles a day, and a buffered or protected lane up to 6,000. Above 6,000, or above 25 mph, the answer is a protected bike lane, or lower speeds.', { cite: 24 }, { note: ' Not checked: NACTO\'s Urban Street Design Guide street types, which could not be read for this row.' }] },
        { summary: 'Not specified.', content: ['No volume range. Complete Streets is a policy approach, and its typical-elements list sets no volume figures.', { cite: 4 }] },
        { summary: 'Not researched.', content: [{ note: 'Open gap: CROW\'s volume guidance for distributor roads is in paid publications that were not read. Dutch municipal documents quoting it were found, but they are not treated as a source here.' }] },
      ],
    },
    {
      label: 'Bicycle facility',
      cells: [
        { summary: 'Protected bike lane, one-way on both sides. Two-way on one side only as a fallback.', content: ['Protected bike lane / cycle track, not merely buffered. This page\'s own Collector speed rule runs 30 to 35 mph, above the Dutch mixing threshold, so NACTO\'s enhanced recommendation is not optional here. It is what the speed rule already requires for internal consistency. One-way lanes on both sides are the default, 7 ft wide, FHWA\'s preferred width.', { cite: 1 }, ' A two-way bike lane on one side is a fallback, discouraged wherever it isn\'t truly needed: use it only where one-way lanes on both sides won\'t fit, or where one side has far fewer driveways and side streets, or holds most of the places people ride to. Drivers turning across a two-way lane look for riders coming the usual way and miss the ones coming the other way, so it brings more crashes at side streets and driveways.', { cite: 1 }, { cite: 32 }, ' Where one is built, make it 12 ft wide,', { cite: 1 }, ' with a dotted yellow center line,', { cite: 5 }, ' and plan both ends, where riders heading one of the two ways must cross the street to rejoin their own side.', { cite: 1 }] },
        { summary: 'Not mandated; FHWA guide prefers one-way lanes on both sides.', content: ['Not mandated by default. FHWA\'s Separated Bike Lane Planning and Design Guide is the federal design reference for when one is provided.', { cite: 1 }, ' On a two-way street it prefers one-way lanes on each side, for predictability: at least 5 ft wide, 7 ft or more preferred. A two-way lane on one side should be at least 12 ft wide combined, with a center line. It may suit a street with many more driveways and side streets on one side, such as along a waterfront, but it confuses drivers at intersections and driveways, so the guide says it is best used where there is no room for lanes on both sides. Its ends need special care: riders have to cross through traffic to reach it, and some keep riding the wrong way after it ends.', { cite: 1 }] },
        { summary: 'Protected over painted; two-way lanes get a dotted yellow center line.', content: ['Protected bike lane / cycle track recommended over a painted lane.', { cite: 5 }, ' NACTO also gives guidance for two-way and contraflow protected bike lanes: a dotted yellow center line along the lane and through its crossings, BIKE LANE symbols or markings after driveways and intersections and at least every 500 ft, and green surfacing used the same way as in a one-way lane.', { cite: 5 }] },
        { summary: 'Bike lanes or wide shoulders.', content: ['Bicycle lanes or wide paved shoulders listed as a typical element.', { cite: 4 }] },
        { summary: 'Separate above 30 km/h; one-way tracks.', content: ['Physical separation required above a 30 km/h (about 19 mph) design speed. Cycle tracks measured 50 to 60% fewer bicycle crashes than painted lanes or mixed traffic on comparable roads.', { cite: 6 }, ' CROW\'s ideal for a distributor road inside a built-up area is a separate cycle track, preferably red, with a sidewalk beside it.', { cite: 28 }, ' A Dutch study of 540 unsignalized intersections in built-up areas found about 75% more crashes with riders going straight through on the main road where the cycle track was two-way rather than one-way.', { cite: 32 }, { note: ' Read through FHWA\'s CMF Clearinghouse, which reproduces the study\'s abstract and records the factor (1.75, with a wide standard error of 0.5); the full paper is behind a paywall and was not read.' }] },
      ],
    },
    {
      label: 'Pedestrian facility',
      cells: [
        { summary: 'Sidewalks both sides, NACTO widths.', content: ['Sidewalk required on both sides, sized to NACTO\'s range, not PROWAG\'s floor. PROWAG\'s 4 ft is an accessibility minimum, not a comfort or capacity target, so it is the legal floor here, not the design target.'] },
        { summary: '4 ft minimum, sidewalk not required.', content: ['PROWAG requires a 4 ft minimum clear pedestrian access route where a sidewalk exists, 5 ft at medians and refuge islands, but does not require that a sidewalk be built in the first place.', { cite: 7 }] },
        { summary: '5 to 7 ft residential, 8 to 12 ft downtown.', content: ['Pedestrian through zone of 5 to 7 ft in residential settings, 8 to 12 ft in downtown and commercial areas.', { cite: 8 }] },
        { summary: 'Sidewalks always included.', content: ['Sidewalks listed as the first typical element, on the premise a street is not complete without one.', { cite: 4 }] },
        { summary: 'Separate above 30 km/h.', content: ['Follows the same 30 km/h separation logic as the bicycle row above.', { cite: 6 }] },
      ],
    },
    {
      label: 'Speed management',
      cells: [
        { summary: '30 mph; 35 only with rigid barrier.', content: ['30 mph standard, 35 mph only with rigid crash-protective separation, as locked in ', { href: csSeg, label: 'Speed and modal hierarchy' }, ' above. 35 mph sits well above the Dutch 30 km/h threshold, so that rigid-separation requirement is functionally the Dutch safety principle already built into this page\'s speed rule, just never labeled that way before.'] },
        { summary: 'Set from 85th-percentile speed.', content: ['Traditionally set from the 85th-percentile observed speed.', { cite: 12 }] },
        { summary: 'Narrower lanes calm traffic.', content: ['Narrower lanes as the primary calming lever, same source as the lane-width row.', { cite: 3 }] },
        { summary: 'Narrow lanes, curb extensions, roundabouts.', content: ['Narrower lanes, curb extensions, and roundabouts listed as typical calming elements.', { cite: 4 }] },
        { summary: 'Separate above 30 km/h.', content: ['30 km/h (about 19 mph) is the explicit threshold above which separation, not just marking, is required.', { cite: 9 }] },
      ],
    },
    {
      label: 'Intersection treatment',
      cells: [
        { summary: 'Roundabout first; raised junction at Local streets.', content: ['Depends on what the Collector meets. Collector to Local: ', { href: '/patterns/intersections/continuous-sidewalk/', label: 'Continuous Sidewalk / Raised Junction' }, '. Collector to Collector: ', { href: '/patterns/intersections/roundabout/', label: 'Roundabout' }, '. Collector to Arterial: prefer ', { href: '/patterns/intersections/roundabout/', label: 'Roundabout' }, ', falling back to ', { href: '/patterns/intersections/protected-intersection/', label: 'Protected Intersection' }, ' or, only when neither works, ', { href: '/patterns/intersections/signal/', label: 'Signal' }, '. A Collector connecting directly to a Freeway gets no treatment, since that combination should not occur in this publication\'s network hierarchy.'] },
        { summary: 'Roundabouts favored over signals.', content: ['FHWA identifies roundabouts as a Proven Safety Countermeasure, a 37 to 90% reduction across collision types depending on severity, and recommends considering them ahead of signals on federally funded projects.', { cite: 10 }, ' MUTCD\'s signal-warrant standard supports the same choice: an engineering study is required before installing a signal, and satisfying a warrant does not by itself require installing one.', { cite: 14 }, ' A jurisdiction that meets a warrant and still chooses a roundabout is acting inside federal doctrine, not deviating from it.'] },
        { summary: 'Depends on what the street meets.', content: ['Two different answers depending on what meets the Collector. Collector to Local: "gateway" treatments, curb extensions, raised crossings, and tight curb radii mark the transition.', { cite: 15 }, ' Collector to Collector or Arterial: geometry, signal timing, and pedestrian islands are weighed against each other rather than one control type being endorsed.', { cite: 16 }, ' NACTO does not take FHWA\'s explicit "prefer roundabouts" position. Its Traffic Circle treatment is scoped to small, uncontrolled minor intersections for calming, not a substitute for a multi-lane roundabout at a major intersection.', { cite: 17 }] },
        { summary: 'Roundabouts and curb extensions.', content: ['Roundabouts and curb extensions listed as typical elements.', { cite: 4 }] },
        { summary: 'Raised intersections.', content: ['Raised intersections. See ', { href: '/patterns/intersections/continuous-sidewalk/', label: 'Continuous Sidewalk / Raised Junction' }, ', which documents the concept with its own citations.'] },
      ],
    },
    {
      label: 'Separation / buffer between modes',
      cells: [
        { summary: 'Rigid barrier: no minimum. Otherwise 3 ft.', content: ['Where a rigid crash-protective barrier separates bicycles from the car lanes, no minimum buffer width is required. Where there is no such barrier, use NACTO\'s 3 ft parking-adjacent minimum, which clears the door-swing zone. The barrier does the separating job the buffer would otherwise do, and NACTO\'s number is the best-sourced answer for the case without one.', { cite: 5 }] },
        { summary: 'Buffers permitted, no minimum width.', content: ['MUTCD permits buffered preferential lane markings but sets no minimum buffer width itself.', { cite: 11 }] },
        { summary: '2 ft minimum, 3 ft beside parking.', content: ['2 ft minimum buffer, wider preferred. 3 ft minimum adjacent to on-street parking, to clear the door-swing zone.', { cite: 5 }] },
        { summary: 'Not specified.', content: ['Not separately specified. Folded into the general infrastructure list.', { cite: 4 }] },
        { summary: 'Full separation, not paint.', content: ['Not a separate step. Once a street crosses the 30 km/h threshold, Dutch practice moves straight to full physical separation rather than a painted buffer.', { cite: 6 }] },
      ],
    },
    {
      label: 'On-street parking',
      cells: [
        { summary: 'Allowed but discouraged, most of all on both sides. 8 ft beside a street-level bike lane, 7 ft when the bike lane is next to the sidewalk. Raised brick or permeable pavers. None within 30 ft of a crosswalk.', content: ['Allowed, but discouraged, and discouraged most of all on both sides of the street. Parked cars bring more crashes. On two-lane urban streets, parallel parking along both curbs is linked to about 47% more crashes on residential streets and about twice as many on commercial ones, and the added risk grows with how much of the curb is parked, so parking on one side carries about half the added risk of parking on both.', { cite: 25 }, ' Dutch guidance prefers no parking along a road of this class at all.', { cite: 28 }, ' The curb has better uses first: bikeways, transit stops, loading and green infrastructure.', { cite: 27 }, ' Where parking is provided anyway, end it at least 30 ft before every crosswalk, on both approaches, so drivers and people crossing can see each other.', { cite: 26 }, ' Where provided beside a street-level bike lane, use AASHTO\'s 8 ft desirable width rather than the 7 ft minimum, since the extra width also protects the door-swing zone the bicycle-facility answer depends on. Where the bike lane runs next to the sidewalk, behind the planting strip, no rider passes the car doors, so the 7 ft minimum is enough.', { cite: 13 }, ' Either way, the parking lane follows Dutch practice: brick or permeable pavers that let rain soak in, raised partway to sidewalk height behind a mountable curb, with a white brick T at each stall line. Next to the street, the bike lane and door buffer beside the parking are raised with it.', { cite: 20 }, { cite: 21 }] },
        { summary: '7 to 8 ft wide; more parking, more crashes; none within 30 ft of a crosswalk.', content: ['Most vehicles park 6 to 12 inches from the curb and occupy roughly 7 ft. The Green Book recommends a 7 ft minimum on urban streets and 8 ft as the desirable width where parking is provided.', { cite: 13 }, ' The NCHRP research that built the Highway Safety Manual\'s crash method for urban and suburban arterials treats on-street parking as a crash factor scaled by the share of curb that is parked, counting both sides. With parallel parking along both curbs of a two-lane street, the factor is 1.465 (residential) and 2.074 (commercial or industrial); parking on one side gives half the increase. Angle parking is worse: 3.428 and 4.853.', { cite: 25 }, { note: ' Measured on arterials; no equivalent model was found for collectors.' }, ' FHWA also tells agencies to strongly consider restricting parking on both approaches to every marked midblock crossing: at least 20 ft back where speeds are 25 mph or less, 30 ft at 26 to 35 mph. It credits the restriction with about 30% fewer pedestrian crashes.', { cite: 26 }, ' The legal floor is lower: a typical state vehicle code, such as Texas\'s, bars parking on a crosswalk, and within 20 ft of a crosswalk only at an intersection, so at a midblock crossing parking may run right up to the stripes.', { cite: 29 }] },
        { summary: '7 ft beside a protected bike lane; daylight crossings; curb goes to transit and bikes first.', content: ['Parking lanes of 7 to 9 ft are generally recommended,', { cite: 3 }, ' but beside a protected bike lane they should be minimized, typically to 7 ft, to give the bike lane more width.', { cite: 5 }, ' Before a midblock crosswalk, NACTO calls for daylighting, restricting parking and/or adding a curb extension so drivers and people crossing can see each other, without giving a length.', { cite: 30 }, ' NACTO\'s curbside paper describes leading cities giving the curb to reliable transit and safe bikeways first, then to deliveries, passenger pick-ups, green stormwater infrastructure and small public spaces, with managed parking alongside. In the Seattle method it holds up as a model, car storage takes what is left, and free long-term parking is a low priority.', { cite: 27 }] },
        { summary: 'Not treated as essential.', content: ['Absent from the typical-elements list. On-street parking is not treated as a completeness requirement the way sidewalks and bike facilities are.', { cite: 4 }] },
        { summary: 'Ideally none; at minimum, parallel bays only.', content: ['CROW\'s design manual sets the ideal for a 50 km/h distributor road as no parking on or along the roadway. Its minimum layout allows parking only in marked parallel bays beside the roadway, made extra wide, never on the roadway itself; angle or perpendicular parking next to a bike lane is called unsafe at 50 km/h, and a separate cycle track on the sidewalk side of the parking is better. Removing parking is listed as a compensating safety measure.', { cite: 28 }] },
      ],
    },
    {
      label: 'Property access',
      cells: [
        { summary: 'One driveway per block face, shared where possible.', content: ['Minimal, consolidated access, not zero access. No more than one driveway per block face, with shared or cross-access driveways used instead of new individual ones wherever multiple parcels front the same block. A block-face count rather than a fixed distance scales to whatever the local block length already is, so it stays a usable target in a tight urban grid and a long suburban block alike, without this page inventing a distance that would only fit some jurisdictions. The Arterial sibling, ', { href: '/patterns/arterials/default/', label: 'Default (No Parking, No Direct Property Access)' }, ', already draws the hard line at zero. A Collector\'s answer sits between that zero and a Local street\'s assumption of open frontage access: restrictive, but not absolute.'] },
        { summary: 'No single number; crash reduction proven.', content: ['No single federal number. Driveway spacing follows the Transportation Research Board\'s Access Management Manual methodology, which ties spacing to speed and volume rather than fixing one distance, and states and localities adopt their own numbers from it. What is concrete and federal: FHWA designates Corridor Access Management, reducing driveway density along a roadway, as a Proven Safety Countermeasure, with a documented 25 to 31% reduction in fatal and injury crashes on urban and suburban arterials and a measurable benefit on two-lane roads as well.', { cite: 18 }] },
        { summary: 'Limit driveways; one per block face at most.', content: ['The Minneapolis Street Design Guide, built directly on NACTO\'s framework, is explicit: new driveways should be limited to locations without alley or cross-street access in the first place, and where one is unavoidable, no more than one curb cut per block face, sited midblock.', { cite: 19 }] },
        { summary: 'Not specified.', content: ['Absent from the typical-elements list. Property access is not treated as a completeness requirement.', { cite: 4 }] },
        { summary: 'No direct property access on distributor roads.', content: ['Distributor roads, the Dutch functional peer to a Collector, carry no direct property access at all. It is a defining structural rule of the classification, not a discouraged practice. See the ', { href: '/guide/street-types/#for-readers-coming-from-dutch-crow-practice', label: 'CROW comparison table' }, '.'] },
      ],
    },
  ]
</script>

The baseline Collector street. No special land use, freight function, or dedicated mode gives it a name of its own, so it carries the base Collector modal hierarchy and speed rule unmodified.

<PatternViewer data={viewerData} image={fm.image} title={fm.title} classification="collector" />

<RelatedMedia id={fm.patternId} />

<div class="cw-context">

<span class="cw-context__label">Typical at:</span> <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Rural is an edge case. Undeveloped is an unlikely pairing.

</div>

## Speed and modal hierarchy

<SpeedModalHierarchyCard>
<SpeedLimitSection speeds={[30, 35]} guideLink={false}>
30 mph standard. 35 mph is permitted only with rigid crash-protective separation, a concrete barrier rather than delineator posts, following FHWA's own distinction between the two.<Citation index={1} />

</SpeedLimitSection>
<ModalHierarchySection classification="collector" rows={[{ tiers: ['pedestrian', 'bicycle', 'transit', 'vehicle', 'freight'] }]}>
Modal hierarchy follows the Collector base order, the same shape as Local. The higher speed tier loosens the practical design treatment, crossing spacing and separation, without changing the rank order.

</ModalHierarchySection>

</SpeedModalHierarchyCard>

## Layered guidance across sources

The Commonway System column comes first: it is the answer. The four columns after it show the layered sources it was built from, from the federal and state baseline through NACTO, Complete Streets, and Dutch practice. The number-of-lanes row is a first pass, less fully resolved than the others.

<GuidanceTable rows={guidanceRows} caption="Collector street design guidance by source, from federal and state baseline through the Commonway System answer" />

## Design notes

This entry is the standard against which every other Collector Typology is defined as an override, the same role Default plays within Local.

### Two-way bike lanes

One-way bike lanes on both sides of the street are the Commonway System default, and next to the sidewalk is the preferred place for them. A two-way bike lane on one side, with riders going both ways, is a fallback, discouraged wherever it isn't truly needed. The Pattern viewer offers it under Bike lanes so readers can see what it looks like.

Use one only where it is the better of two hard choices: where one-way lanes on both sides won't fit, or where one side of the street has far fewer driveways and side streets, or holds most of the places people ride to, such as a waterfront or a park.<Citation index={1} />

The reason to avoid it is safety where streets and driveways cross it. Drivers turning in or out look for riders coming the usual way, with traffic, and miss the ones coming from the other direction.<Citation index={1} /> In a Dutch study of intersections in built-up areas, crashes with riders going straight through were about 75% more common along two-way cycle tracks than along one-way ones.<Citation index={32} /> It also saves less space than it seems: at FHWA's preferred widths, a two-way lane is 12 ft and two one-way lanes are 7 ft each, so it saves only a few feet, 2 ft of lane plus any buffer the other side no longer needs.<Citation index={1} />

Where one is built, make it 12 ft wide,<Citation index={1} /> with a dotted yellow center line between the two directions and bike lane markings after every driveway and intersection.<Citation index={5} /> Plan both ends from the start. Where a two-way bike lane ends, riders heading one of the two ways have to cross the street, through traffic, to rejoin their own side of the road; that may need a bicycle signal or a two-stage turn box, and some riders carry on the wrong way instead.<Citation index={1} /> The Pattern viewer draws only a midblock stretch, so it doesn't show these ends.

### Parking lanes

On-street parking is allowed on a Collector but discouraged, and parking on both sides most of all. Crashes rise with the share of curb given to parked cars, and parking on both sides doubles that share.<Citation index={25} /> Where a street has parking anyway, it stops at least 30 ft before each crosswalk, so drivers and people crossing can see each other.<Citation index={26} />

Where a Collector has on-street parking, the Commonway System borrows from recent Dutch practice. Dutch guidance prefers no parking on streets of this class and otherwise allows only parallel bays beside the roadway (see the guidance table above), so the idea comes from Dutch local streets that have parking, such as Haarlem's Harmenjansweg: the parking was moved up off the roadway behind an angled curb, and each space is marked in the paving.<Citation index={20} />

The parking lane is paved in brick or permeable pavers. Rain soaks through into the ground instead of running off into drains, which helps against flooding. Dutch national guidance pairs permeable paving with a base that stores water under the street, and names parking spaces as a place to hold water from heavy downpours.<Citation index={21} /> In a U.S. field test, permeable pavement in a parking area sharply cut surface runoff.<Citation index={22} /> No standard sets the brick color: the tan in the drawings is only an illustration.

The parking lane is raised partway to sidewalk height, with a mountable curb between it and the travel lane so cars can pull up onto it comfortably. The raised parking narrows the roadway drivers see, which encourages slower driving, and when the spaces are empty it reads as part of the walking space rather than the road. A regular curb still separates it from the planting strip or sidewalk, so a blind pedestrian's cane finds the edge and cars stay off the sidewalk. A white T at each stall line, laid in white bricks along the edge nearest the travel lane, marks the spaces.

Where the bike lane runs next to the street, the bike lane and the door buffer beside the parking are raised to the same height, with the buffer paved in the same brick. On a side without parking, the drawings keep the bike lane at road level behind its rigid barrier. Raising it there too is an option, not a recommendation.

Two practical points for installers: the gutter moves to the mountable curb at the edge of the travel lane, and where streets are plowed, the mountable curb and the pavers should be checked against the local plow equipment.

## Related patterns

<div class="cw-links">

- [Default (Standard Local Street)](/patterns/local-streets/default/) <IdPill id="LOC-DEF-01" />
- [Default (No Parking, No Direct Property Access)](/patterns/arterials/default/) <IdPill id="ART-DEF-01" /> (the equivalent baseline reference point one Functional Classification down and up, completing the three-tier chain)

</div>

## Getting there: Retrofit path options

<div class="cw-links">

- [Four-to-three lane road diet](/retrofits/corridor/four-to-three-lane-road-diet/) <IdPill id="RFT-CDR-01" />
- [Lane diet](/retrofits/corridor/lane-diet/) <IdPill id="RFT-CDR-03" />
- [Protected bike lane retrofit via lane-width reallocation](/retrofits/corridor/protected-bike-lane-width-reallocation/) <IdPill id="RFT-CDR-07" />
- [Protected bike lane retrofit via parking reduction](/retrofits/corridor/protected-bike-lane-parking-reduction/) <IdPill id="RFT-CDR-09" />

</div>

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> [FHWA, *Separated Bike Lane Planning and Design Guide*.](https://www.fhwa.dot.gov/environment/bicycle_pedestrian/publications/separated_bikelane_pdg/page00.cfm)
2. <span id="ref-2"></span><EvidenceChip tier="legal" /> [AASHTO, *A Policy on Geometric Design of Highways and Streets* ("Green Book"), Collector lane width range, as summarized in Washington State DOT's own AASHTO-comparison reference.](https://wsdot.wa.gov/publications/fulltext/ProjectDev/ProjectSummary/Compare_AASHTO-08.pdf)
3. <span id="ref-3"></span><EvidenceChip tier="precedent" /> [NACTO, "Lane Width," *Urban Street Design Guide*.](https://nacto.org/publication/urban-street-design-guide/street-design-elements/lane-width/)
4. <span id="ref-4"></span><EvidenceChip tier="precedent" /> [Smart Growth America, National Complete Streets Coalition, "About" page, typical Complete Street elements.](https://www.smartgrowthamerica.org/programs-and-coalitions/national-complete-streets-coalition/about/)
5. <span id="ref-5"></span><EvidenceChip tier="precedent" /> [NACTO, "Designing Protected Bike Lanes," *Urban Bikeway Design Guide*.](https://nacto.org/publication/urban-bikeway-design-guide/designing-bikeways-for-all-ages-and-abilities/protected-bike-lanes/designing-protected-bike-lanes/)
6. <span id="ref-6"></span><EvidenceChip tier="evidence" /> [J.W.H. van Petegem, P. Schepers & G.J. Wijlhuizen, "The safety of physically separated cycle tracks compared to marked cycle lanes and mixed traffic conditions in Amsterdam," SWOV Institute for Road Safety Research / TU Delft, *European Journal of Transport and Infrastructure Research* 21(3), 2021.](https://journals.open.tudelft.nl/ejtir/article/download/5283/5126)
7. <span id="ref-7"></span><EvidenceChip tier="legal" /> [U.S. Access Board, PROWAG Chapter R3, Technical Requirements, pedestrian access route width.](https://www.access-board.gov/prowag/proposed/chapter-r3-technical-requirements/)
8. <span id="ref-8"></span><EvidenceChip tier="precedent" /> [NACTO, "Sidewalk Zones," *Urban Street Design Guide*.](https://nacto.org/publication/urban-street-design-guide/street-design-elements/sidewalks/sidewalk-zones/)
9. <span id="ref-9"></span><EvidenceChip tier="evidence" /> [TU Delft, *European Journal of Transport and Infrastructure Research*, Dutch road classification table (access/distributor/through roads, speed limits, and cyclist placement by class).](https://journals.open.tudelft.nl/ejtir/article/download/3000/3187/8330)
10. <span id="ref-10"></span><EvidenceChip tier="legal" /> [FHWA, "Roundabouts," CSS Design Tactics, Office of Planning, Environment, & Realty.](https://www.fhwa.dot.gov/planning/css/design/tactics/chap23.cfm)
11. <span id="ref-11"></span><EvidenceChip tier="legal" /> [MUTCD 11th Edition with Revision 1 (FHWA, December 2025; effective March 5, 2026), Chapter 3D, Section 3D.01, buffered preferential lane markings.](https://mutcd.fhwa.dot.gov/pdfs/11th_Editionr1/mutcd11theditionr1hl.pdf)
12. <span id="ref-12"></span><EvidenceChip tier="legal" /> [Federal Highway Administration. "Relationship Between Design Speed, Operating Speed, and Posted Speed."](https://www.fhwa.dot.gov/planning/css/resources/speed)
13. <span id="ref-13"></span><EvidenceChip tier="legal" /> [AASHTO, *A Policy on Geometric Design of Highways and Streets* ("Green Book"), on-street parking lane width, as quoted directly in a NACTO-hosted research citation.](https://nacto.org/wp-content/uploads/Part-III-Section-2-Citation-16_-Furth-and-Dulaski.pdf)
14. <span id="ref-14"></span><EvidenceChip tier="legal" /> [MUTCD 11th Edition with Revision 1 (FHWA, December 2025; effective March 5, 2026), Chapter 4C, Section 4C.01, traffic signal needs studies. An engineering study and warrant analysis are required, but satisfying a warrant does not itself require installing a signal.](https://mutcd.fhwa.dot.gov/pdfs/11th_Editionr1/mutcd11theditionr1hl.pdf)
15. <span id="ref-15"></span><EvidenceChip tier="precedent" /> [NACTO, "Intersections of Major and Minor Streets," *Urban Street Design Guide*.](https://nacto.org/publication/urban-street-design-guide/intersections/intersections-of-major-and-minor-streets/)
16. <span id="ref-16"></span><EvidenceChip tier="precedent" /> [NACTO, "Major Intersections," *Urban Street Design Guide*.](https://nacto.org/publication/urban-street-design-guide/intersections/major-intersections/)
17. <span id="ref-17"></span><EvidenceChip tier="precedent" /> [NACTO, "Traffic Circle," *Urban Street Design Guide*.](https://nacto.org/publication/urban-street-design-guide/intersections/traffic-circle/)
18. <span id="ref-18"></span><EvidenceChip tier="legal" /> [Federal Highway Administration, "Corridor Access Management," Proven Safety Countermeasures.](https://highways.dot.gov/sites/fhwa.dot.gov/files/2022-06/12_Corridor%20Access%20Management_508.pdf)
19. <span id="ref-19"></span><EvidenceChip tier="precedent" /> [City of Minneapolis, Street Design Guide, "Driveways" section (Boulevards and Furnishings).](https://sdg.minneapolismn.gov/design-guidance/boulevards-and-furnishings/driveways)
20. <span id="ref-20"></span><EvidenceChip tier="precedent" /> [Build the Lanes, "This Dutch Street is Brand New," video on the rebuilt Harmenjansweg in Haarlem, the Netherlands: parking raised off the roadway behind an angled curb, with each space marked in the paving.](https://www.youtube.com/watch?v=M9_bf6UZYi0)
21. <span id="ref-21"></span><EvidenceChip tier="legal" /> [Rijksdienst voor Ondernemend Nederland (RVO), "Inrichting/groot onderhoud openbare ruimte," climate adaptation guidance: permeable paving with a water-storing base, and water storage in parking spaces for heavy downpours (in Dutch).](https://www.rvo.nl/onderwerpen/klimaatadaptatie-dossier/financiering/slim-combineren/inrichtinggroot-onderhoud)
22. <span id="ref-22"></span><EvidenceChip tier="evidence" /> [U.S. EPA, *Field Evaluation of Permeable Pavements for Stormwater Management, Olympia, Washington* (EPA-841-B-00-005B, October 2000).](https://archive.epa.gov/water/test/web/pdf/pavements.pdf)
23. <span id="ref-23"></span><EvidenceChip tier="legal" /> [Federal Highway Administration, *Highway Functional Classification: Concepts, Criteria and Procedures*, 2023 Edition, Table 3-6, "VMT and Mileage Guidelines by Functional Classifications: Collectors and Locals" (typical AADT ranges).](https://rosap.ntl.bts.gov/view/dot/72430)
24. <span id="ref-24"></span><EvidenceChip tier="precedent" /> [NACTO, *Designing for All Ages & Abilities: Contextual Guidance for High-Comfort Bicycle Facilities* (December 2017), "Choosing an All Ages & Abilities Bicycle Facility" (page 4) and "Motor Vehicle Speed & Volume Increase Stress" (page 6).](https://nacto.org/wp-content/uploads/NACTO_Designing-for-All-Ages-Abilities.pdf)
25. <span id="ref-25"></span><EvidenceChip tier="evidence" /> [D.W. Harwood et al., *Methodology to Predict the Safety Performance of Urban and Suburban Arterials*, NCHRP Web-Only Document 129, Phases I and II (2008), Chapter 6, "On-Street Parking (AMF1r)," Equations 36 and 37 and Table 60 (pages 120 to 122), adapted from Bonneson's work for TxDOT.](https://nap.nationalacademies.org/catalog/23084/methodology-to-predict-the-safety-performance-of-urban-and-suburban-arterials)
26. <span id="ref-26"></span><EvidenceChip tier="legal" /> [FHWA, *Guide for Improving Pedestrian Safety at Uncontrolled Crossing Locations*, FHWA-SA-17-072 (July 2018, updated), parking restriction on crosswalk approach (pages 18 to 19) and crash modification factors (Appendix).](https://www.fhwa.dot.gov/innovation/everydaycounts/edc_5/docs/STEP-guide-improving-ped-safety.pdf)
27. <span id="ref-27"></span><EvidenceChip tier="precedent" /> [NACTO, *Curb Appeal: Curbside Management Strategies for Improving Transit Reliability* (November 2017), "From Parking Lane to Flex Zone" and "Seattle Right-of-Way Prioritization" (pages 2 to 3).](https://nacto.org/wp-content/uploads/NACTO-Curb-Appeal-Curbside-Management.pdf)
28. <span id="ref-28"></span><EvidenceChip tier="precedent" /> [CROW, *ASVV 2021*, "Gebiedsontsluitingswegen," CROW Kennisbank: design characteristics for distributor roads inside built-up areas, including B (direction separation), F (crossings), I (cycle facilities) and M (Parkeren), ideal and minimum layouts (in Dutch).](https://kennisbank.crow.nl/public/gastgebruiker/WOBI/ASVV_2021/Gebiedsontsluitingswegen/113433)
29. <span id="ref-29"></span><EvidenceChip tier="legal" /> [Texas Transportation Code, Section 545.302, "Stopping, Standing, or Parking Prohibited in Certain Places": no parking on a crosswalk, or within 20 ft of a crosswalk at an intersection; an example of a typical state vehicle code.](https://statutes.capitol.texas.gov/Docs/TN/htm/TN.545.htm#545.302)
30. <span id="ref-30"></span><EvidenceChip tier="precedent" /> [NACTO, "Midblock Crosswalks," *Urban Street Design Guide*: daylighting in advance of a crosswalk by restricting parking and/or installing a curb extension.](https://nacto.org/publication/urban-street-design-guide/intersection-design-elements/crosswalks-and-crossings/midblock-crosswalks/)
31. <span id="ref-31"></span><EvidenceChip tier="legal" /> [U.S. Access Board, *Public Right-of-Way Accessibility Guidelines* (final rule, August 8, 2023), R205 (detectable warning surfaces at curb ramps and blended transitions at crosswalks) and R305 (truncated domes, 24 in deep, contrasting with the walking surface).](https://www.access-board.gov/prowag/technical.html)
32. <span id="ref-32"></span><EvidenceChip tier="evidence" /> [J.P. Schepers, P.A. Kroeze, W. Sweers & J.C. Wüst, "Road factors and bicycle-motor vehicle crashes at unsignalized priority intersections," *Accident Analysis and Prevention* 43(3), 2011, pages 853 to 861, as recorded in FHWA's CMF Clearinghouse (study 259: the abstract, and a crash modification factor of 1.75 for a two-way cycle track against a one-way one).](https://cmfclearinghouse.fhwa.dot.gov/study_detail.php?stid=259)
