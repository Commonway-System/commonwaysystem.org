---
title: Industrial Collector
description: A Collector Typology serving industrial land use, where freight movement outranks vehicle, pedestrian, bicycle, and transit priority.
patternId: COL-IND-03
status: recommended
date: 2026-08-29
llms: A Collector street typology serving industrial land use, where freight movement is prioritized above vehicle, pedestrian, bicycle, and transit use.
---

<script>
  import viewerData from '$lib/data/street-configs/col-ind-03'
  import { Citation, DensityChip, EvidenceChip, GuidanceTable, IdPill, ModalHierarchySection, PatternViewer, RelatedMedia, SpeedLimitSection, SpeedModalHierarchyCard } from '$lib/theme/components'

  const na = (why) => ({ summary: 'Not applicable.', content: [why] })
  const unspec = { summary: 'Not specified.', content: ['Not specified in the typical-elements list.', { cite: 35 }] }
  const gap = (why) => ({ summary: 'Not researched.', content: [{ note: why }] })
  const notResearched = gap('Not separately researched for this Typology.')
  const dutchGeneral = ' No Dutch cross-section made for industrial estates was found in public sources; this is CROW\'s general guidance for distributor roads.'
  const guidanceRows = [
    {
      label: 'Travel lane width',
      cells: [
        { summary: '12 ft.', content: ['12 ft. Truck volume is the reason: this is the width freight movement needs, not a rural or comfort-driven choice.'] },
        { summary: '10 to 12 ft; 12 ft on industrial streets.', content: ['10 to 12 ft depending on volume and speed, with industrial streets built to 12 ft where truck volume is significant. Portland\'s standard for local streets in industrial zones uses two 12 ft travel lanes,', { cite: 1 }, ' as do Raleigh\'s industrial street', { cite: 29 }, ' and the curb-side lanes of Seattle\'s Industrial Access street.', { cite: 9 }, ' Minneapolis names the WB-62 design vehicle for highly industrialized streets.', { cite: 2 }] },
        { summary: 'Not applicable at these volumes.', content: ['NACTO\'s general guidance narrows lanes where feasible, but notes 10 ft lanes still support truck uses only at 35 mph and under. Industrial Collector truck volumes exceed that threshold, so the narrowing guidance does not carry over.', { cite: 3 }] },
        { summary: 'Narrower lanes.', content: ['Narrower travel lanes listed as a typical element, without a width.', { cite: 35 }] },
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
      label: 'Traffic volume (vehicles per day)',
      cells: [
        { summary: 'About 1,500 to 6,000 vehicles per day, with a high share of trucks.', content: ['About 1,500 to 6,000 vehicles per day, the same range as ', { href: '/patterns/collectors/default/', label: 'Default (Standard Collector)' }, ': a street carrying more is working as an Arterial.', { cite: 25 }, { cite: 31 }, ' What sets this street apart is the share of trucks. FHWA asks for more separation between people on bikes and motor traffic where heavy vehicles are more than 5 percent of traffic,', { cite: 23 }, ' and an industrial road carries "a significant percentage" of its trips by truck.', { cite: 28 }, ' Plan this street as above that line.'] },
        { summary: 'Urban 1,100 to 6,300; rural 150 to 2,600.', content: ['FHWA\'s functional classification guidelines give typical daily volume (AADT) ranges, not limits. Urban Major and Minor Collectors: 1,100 to 6,300. Rural Major Collectors: 300 to 2,600. Rural Minor Collectors: 150 to 1,110. FHWA notes the urban figures are approximate, and the ranges for neighboring classes deliberately overlap.', { cite: 31 }, ' FHWA\'s bikeway guidance separately treats a heavy-vehicle share above 5 percent as a reason for more separation.', { cite: 23 }] },
        { summary: 'No street range; truck routes get protected lanes regardless.', content: ['NACTO gives no Collector volume range. Its volume numbers choose the bikeway: above 6,000 vehicles a day, or above 25 mph, a protected bike lane.', { cite: 25 }, ' On observed or designated truck routes it asks for protected bike lanes, or at minimum buffered ones, regardless of general traffic speed and volume.', { cite: 25 }] },
        { summary: 'Not specified.', content: ['No volume range. Complete Streets is a policy approach, and its typical-elements list sets no volume figures.', { cite: 35 }] },
        gap('CROW\'s volume guidance for distributor roads is in paid publications that were not read.'),
      ],
    },
    {
      label: 'Bicycle facility',
      cells: [
        { summary: 'Required within a 3 mi bike / 0.5 mi walk catchment: one-way protected lanes, 7 ft, next to the sidewalk.', content: ['A bicycle facility is required, not contingent on a master plan naming this corridor, whenever any population that could plausibly use this street segment for any purpose falls within a 3-mile bicycle catchment or a 0.5-mile pedestrian catchment of it.', { cite: 22 }, ' Measure the catchment against the street segment as a whole, not against any single business or job site along it. This is public right-of-way, and the relevant population is whoever could use it, not only people employed at adjacent industrial land uses.', { cite: 22 }, { cite: 24 }, ' Only in the genuine edge case, an isolated segment with no population within either catchment at all, does the facility become context-dependent rather than required.', ' The facility is a protected bike lane, one-way on each side of the street, 7 ft wide, FHWA\'s preferred width,', { cite: 5 }, ' running next to the sidewalk and raised partway to sidewalk height. It never runs next to the travel lanes on this street: set back from the road, it crosses every driveway and side street where a turning truck driver can see riders and stop for them (see Separation / buffer below). A two-way bike lane on one side, 12 ft wide,', { cite: 5 }, ' is a strongly discouraged fallback here, because driveways are this street\'s main hazard and two-way lanes bring more crashes at them.', { cite: 26 }, { cite: 32 }] },
        { summary: 'FTA 0.5 mi walk / 3 mi bike distances; FHWA selects by context; 7 ft preferred width.', content: ['FTA\'s adopted eligibility policy treats pedestrian improvements within one-half mile, and bicycle improvements within three miles, of a public transportation stop or station as having a de facto relationship to public transportation. Those are transit-funding thresholds, and this page borrows the same distances as its catchment.', { cite: 22 }, ' Separately, FHWA\'s Bikeway Selection Guide selects bikeway facility type from roadway speed and volume, truck mix, and land use context, not from whether a corridor appears in an adopted bicycle plan.', { cite: 23 }, ' FHWA\'s preferred widths for a separated bike lane are 7 ft one-way and 12 ft two-way; the one-way minimum is 5 ft.', { cite: 5 }] },
        { summary: 'Protected lanes on truck routes; coordinate truck and bike routes up front.', content: ['NACTO asks for protected bike lanes, or at minimum buffered ones, on observed or designated truck routes regardless of general traffic speed and volume, with buffers that widen the distance between truck and bicycle paths and protected intersection geometry at crossings.', { cite: 25 }, ' Truck route designation should be coordinated with bicycle network mapping up front, rather than resolved after the fact. Bollards are recommended at truck-route corners because of a documented pattern of truck wheels overrunning curbs and striking people nearby.', { cite: 6 }, ' Seattle\'s freight standards go further: a protected bicycle lane is recommended where a bicycle facility is planned on a truck street, though the standard\'s first preference is routing the bicycle network away from major truck streets where an alternative exists.', { cite: 13 }] },
        { summary: 'Bike lanes or wide shoulders.', content: ['Bicycle lanes or wide paved shoulders listed as a typical element.', { cite: 35 }] },
        { summary: 'Separate cycle track, one-way, 2.00 m and up.', content: ['On a distributor road, people cycle on a separate cycle track, preferably red. A one-way track is 2.00 m (about 6.5 ft) wide for up to 150 riders an hour in one direction, wider above that. CROW lists conflicts at junctions and driveways, where riders are out of drivers\' sight, as the cycle track\'s weak point, with extra conflicts on two-way tracks, where riders come from an unexpected direction.', { cite: 32 }, dutchGeneral] },
      ],
    },
    {
      label: 'Pedestrian facility',
      cells: [
        { summary: 'Sidewalk both sides: 6 ft through zone, 0.5 ft frontage zone, 5 ft planting strip.', content: ['Sidewalk on both sides: a 6 ft pedestrian through zone, a 0.5 ft frontage zone at the property line, and a continuous planting strip of street trees at least 5 ft wide, Portland\'s minimums for an industrial road.', { cite: 28 }, ' Where there is no on-street parking, the planting strip sits between the bike lane and the travel lanes and is at least 6.5 ft wide (see Separation / buffer below). Driveway and curb-cut count is the real design lever here, not sidewalk width.'] },
        { summary: 'PROWAG width applies.', content: ['PROWAG\'s general minimum access-route width applies regardless of adjacent land use.', { cite: 7 }, ' Raleigh\'s industrial street sets a 6 ft sidewalk and a 6 ft planting area, a tree lawn with street trees about 40 ft apart.', { cite: 29 }] },
        gap('Not researched.'),
        { summary: 'Sidewalks always included.', content: ['Sidewalks listed as the first typical element.', { cite: 35 }] },
        { summary: 'Sidewalk beside the cycle track.', content: ['CROW\'s ideal distributor road inside a built-up area has a sidewalk beside the separate cycle track.', { cite: 33 }, dutchGeneral] },
      ],
    },
    {
      label: 'Speed management',
      cells: [
        { summary: '30 mph, unchanged from base Collector.', content: ['30 mph, unchanged from the base Collector rule. See ', { href: '/patterns/collectors/default/', label: 'Default (Standard Collector)' }, '.'] },
        { summary: 'Design speed equals posted speed.', content: ['FHWA\'s design-speed-equals-posted-speed framework, the same source cited across this publication.', { cite: 8 }] },
        { summary: 'Narrower lanes calm traffic.', content: ['The same logic as Default (Standard Collector): narrower lanes calm traffic. Here that logic is limited by the 12 ft truck lane width above, so speed is held by the 30 mph rule and geometry at intersections instead.'] },
        { summary: 'Narrow lanes, curb extensions, roundabouts.', content: ['Narrower lanes, curb extensions, and roundabouts listed as typical elements.', { cite: 35 }] },
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
          { tier: { label: 'Bike lane and crosswalk at every corner', body: ['The bike lane crossing and the crosswalk are set back 2 to 5 m (about 6.5 to 16.5 ft) from the travel lane, in protected intersection geometry, so a turning truck finishes most of its turn before it reaches them.', { cite: 26 }, { cite: 27 }] } },
        ] },
        { summary: 'NCHRP Research Report 1043; recessed bike crossings.', content: ['NCHRP Research Report 1043 is the current national roundabout guide and supersedes NCHRP Report 672.', { cite: 10 }, ' MassDOT recommends bike crossings set back 6 to 16.5 ft from the travel lane, citing crash reductions at that offset, and a mountable truck apron no more than 3 in high, with bike stop bars and detectable warnings behind it.', { cite: 27 }] },
        { summary: 'Design vehicle vs. check vehicle.', content: ['NACTO separates the design vehicle from the check vehicle, and favors rerouting truck routes over reconstructing a corner to fit the largest possible truck.', { cite: 6 }] },
        { summary: 'Roundabouts and curb extensions.', content: ['Roundabouts and curb extensions listed as typical elements.', { cite: 35 }] },
        { summary: 'Cycle track bent away from the road, 2 to 5 m.', content: ['In a study of 540 Dutch priority intersections inside built-up areas, crashes with riders were less likely where the cycle track approach was bent away from the main road by 2 to 5 m; FHWA records about 45% fewer crashes for that setback, and no benefit below 2 m.', { cite: 26 }, { note: ' Read from the abstract and crash modification factors in FHWA\'s CMF Clearinghouse; the paper itself was not read.' }] },
      ],
    },
    {
      label: 'Separation / buffer between modes',
      cells: [
        { summary: 'Physical separation required: a planted strip at least 6.5 ft wide, or parked cars behind a 3 ft door buffer.', content: ['Physical separation is required on this Typology, not merely preferred, and the reason is the trucks, not the speed. FHWA\'s speed-and-volume chart alone would allow a buffered bike lane at 30 mph and under about 6,000 vehicles a day,', { cite: 23 }, ' but FHWA also asks for more separation where heavy vehicles are more than 5 percent of traffic,', { cite: 23 }, ' and NACTO asks for protected bike lanes on truck routes regardless of speed and volume.', { cite: 25 }, ' Where there is no on-street parking, a continuous planting strip at least 6.5 ft (2 m) wide, with street trees, sits between the travel lane and the raised bike lane. Where there is parking, the parked cars protect the bike lane, behind an empty 3 ft door buffer. Either way the bike lane crosses each driveway and side street 2 to 5 m (about 6.5 to 16.5 ft) from the travel lane, the setback linked to about 45% fewer crashes with riders at Dutch intersections', { cite: 26 }, ' and recommended by MassDOT.', { cite: 27 }, ' Not a painted line, and not flexible delineator posts alone.'] },
        { summary: 'FHWA: separated from about 35 mph or 6,000 to 7,000 vpd; more separation where trucks exceed 5%; 3 ft minimum buffer.', content: ['FHWA\'s Bikeway Selection Guide points to a separated bike lane or shared-use path from about 35 mph, or above roughly 6,000 to 7,000 vehicles per day, and to a bike lane, buffer preferred, below that. Separately, it asks for more separation, including extra buffer at intersections, on moderate- to high-volume streets where heavy vehicles are more than 5 percent of traffic.', { cite: 23 }, ' FHWA\'s Separated Bike Lane Planning and Design Guide sets a 3 ft minimum buffer width for maneuvering and door-opening clearance, and documents curbs, planters, bollards, and flexible delineator posts as vertical-element options, with a 3 inch mountable curb as the standard detail where street-sweeper access is needed.', { cite: 5 }] },
        { summary: 'Wide buffers, planting strips or parked cars; setback stop bars.', content: ['On truck streets NACTO asks for wide lateral separation, such as wide buffers, planters or planting strips, or parking-protected bike lanes, to put distance between truck and bicycle paths.', { cite: 25 }, ' Seattle\'s freight standards describe stop bars that can be set back from the intersection and crosswalk to leave room for a turning truck\'s swept path, and bicycle signals that can separate bicycle and truck movements in time. Both are offered as design tools, not requirements.', { cite: 13 }] },
        unspec,
        { summary: 'Verge at least 1.0 m.', content: ['On a 50 km/h distributor road inside a built-up area, the verge between the cycle track and the roadway is at least 1.0 m (about 3.3 ft); it can hold street furniture, low planting and trees.', { cite: 32 }, dutchGeneral] },
      ],
    },
    {
      label: 'On-street parking',
      cells: [
        { summary: 'Discouraged; where present, a 10 ft raised brick parking and loading lane. None within 30 ft of a crosswalk or 20 ft of a driveway.', content: ['Discouraged; off-street is always preferred. Where parking exists anyway, it is a 10 ft parking and loading lane, Portland\'s width for local industrial streets', { cite: 1 }, ' and FHWA\'s minimum for a loading zone,', { cite: 5 }, ' paved in brick or permeable pavers and raised partway to sidewalk height, as on ', { href: '/patterns/collectors/default/', label: 'Default (Standard Collector)' }, '. The parked cars protect the bike lane, behind an empty 3 ft door buffer. No parking or loading within 30 ft of a marked crosswalk, FHWA\'s setback where speeds are 26 to 35 mph,', { cite: 30 }, ' or within 20 ft of a driveway edge.', { cite: 5 }] },
        { summary: '20 ft crosswalk setback; 30 ft at 26 to 35 mph. 8.5 to 10 ft lanes.', content: ['A 20 ft setback before a marked crosswalk keeps sight distance clear and stops drivers pulling forward onto a raised crossing to back into the first space.', { cite: 14 }, ' FHWA\'s guide for uncontrolled crossings sets 20 ft where speeds are 25 mph or less and 30 ft between 26 and 35 mph.', { cite: 30 }, ' Portland\'s local industrial streets use 10 ft parking and loading lanes;', { cite: 1 }, ' Raleigh\'s industrial street, 8.5 ft.', { cite: 29 }] },
        { summary: 'Designated loading zones; protect the bike lane.', content: ['Where freight loading is frequent, NACTO asks for designated truck loading zones so the bike lane isn\'t blocked, and protected bike lanes regardless of speed and volume.', { cite: 25 }] },
        { summary: 'Not treated as essential.', content: ['Absent from the typical-elements list. On-street parking is not treated as a completeness requirement the way sidewalks and bike facilities are.', { cite: 35 }] },
        { summary: 'Ideally none; at minimum, parallel bays only.', content: ['CROW\'s design manual sets the ideal for a 50 km/h distributor road as no parking on or along the roadway. Its minimum layout allows parking only in marked parallel bays beside the roadway, never on the roadway itself.', { cite: 33 }, dutchGeneral] },
      ],
    },
    {
      label: 'Property access',
      cells: [
        { summary: 'Curb cuts limited by code; forward entry; sidewalk and bike lane continue across every driveway.', content: ['Curb cuts limited by code, not "as needed." The driveway and on-site apron are sized so the design vehicle enters forward and never backs across the public sidewalk to reach a loading position. See ', { href: '/patterns/elements/curb-cut-driveway-apron/', label: 'Curb Cut / Driveway Apron' }, '. The sidewalk and bike lane run continuous at sidewalk level across every driveway, with a green conflict marking where the bike lane crosses, so drivers cross them rather than riders and walkers crossing the driveway.', { cite: 27 }, ' No parking within 20 ft of a driveway edge, and no planting or street furniture that blocks the view within 15 ft of one, so drivers and riders can see each other.', { cite: 5 }, ' At busy truck driveways, use protected intersection geometry.', { cite: 27 }] },
        { summary: 'Curb-cut counts capped; no backing into the street; protected geometry at industrial driveways.', content: ['Curb-cut counts are limited by land use code.', { cite: 15 }, ' Backing onto a public street or sidewalk to leave a site is prohibited in multiple adopted jurisdictions: Knightdale, NC bars loading areas from relying on backing movements into the right-of-way,', { cite: 17 }, ' and Bakersfield, CA bars vehicles backing onto any street to leave a site, explicitly once the street is classified arterial or collector.', { cite: 18 }, ' Houston bars back-in loading berths on a major thoroughfare and, where a back-out berth is used, requires it to be deep enough that no part of the vehicle protrudes over the property line.', { cite: 16 }, ' Where a separated bike lane crosses any industrial driveway, MassDOT prefers protected intersection design, and otherwise a raised crossing with green conflict markings.', { cite: 27 }, ' FHWA asks for parking to stop at least 20 ft from a driveway edge and for driveways to be consolidated.', { cite: 5 }] },
        { summary: 'Confirm the actual truck mix.', content: ['Confirm actual truck mix before assuming the largest design vehicle at every driveway.', { cite: 19 }] },
        { summary: 'Not specified.', content: ['Absent from the typical-elements list. Property access is not treated as a completeness requirement.', { cite: 35 }] },
        { summary: 'Cycle track continues across driveways.', content: ['Where the cycle track has priority, its paving continues across side streets on a driveway-style crossing (CROW publication 344).', { cite: 32 }, dutchGeneral] },
      ],
    },
  ]
</script>

A Collector road serving warehouses, freight yards, or manufacturing land use, designed around truck movement and loading rather than the base Collector priority order.

<PatternViewer data={viewerData} image={fm.image} title={fm.title} classification="collector" />

<RelatedMedia id={fm.patternId} />

<div class="cw-context">

<span class="cw-context__label">Typical at:</span> <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" />

Undeveloped, Rural, and Core are edge cases.

</div>

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

The opposite mistake is just as real. A corner too tight for the trucks that actually use it makes the blind zone worse: in one study of a semitrailer turning right, cutting the turning radius widened the strip its rear wheels sweep inside the turn, out of the driver's view, from about 2.6 m to 3.6 m, and once the tractor and trailer bend past about 20 degrees, the right mirror stops showing that strip at all.<Citation index={21} /> The two cautions meet in the same answer: size the corner for the design vehicle that actually uses the street, put a mountable truck apron behind it for the occasional larger check vehicle, and keep people out of the swept area by setting the crossings back from the corner, not by making the corner as tight as possible.<Citation index={10} /><Citation index={27} />

**Bicycle facility catchment.** The 3-mile bike and 0.5-mile walk threshold above borrows the distances in FTA's own adopted eligibility policy for pedestrian and bicycle improvements, which are themselves reasoned from equivalent travel time at each mode's typical speed: roughly a 15-to-30-minute walk at 2 mph, and the same time budget at a bicycle's roughly 10 mph average commute speed.<Citation index={22} /> The trigger is population, not land use classification. An industrial designation for this street does not mean its only legitimate users are people employed at businesses along it, and it should not be read as excusing the facility just because a bicycle plan has not caught up to the corridor. Industrial and logistics employment also skews toward a workforce with lower vehicle ownership and higher walk and bicycle mode share than the general population, including shift-work schedules that raise their own visibility and lighting needs. That is a reason to apply this trigger generously here, not a reason to scope it down to only the workers on-site.<Citation index={24} />

### Bike lanes and driveways

On this street the danger to people on bikes is concentrated where trucks turn: at driveways and side streets. So the bike lane runs next to the sidewalk, raised partway to sidewalk height, and never next to the travel lanes. Set back from the road, it crosses each driveway and side street 2 to 5 m (about 6.5 to 16.5 ft) from the travel lane. That gives a turning driver room to finish most of the turn, straighten up and see a rider before reaching the crossing, and space to stop there without blocking the street. In a study of 540 Dutch intersections, cycle track crossings bent 2 to 5 m away from the main road had about 45% fewer crashes with riders; closer than 2 m, there was no benefit.<Citation index={26} /> MassDOT recommends the same offset, 6 to 16.5 ft, from research in three countries.<Citation index={27} />

Without on-street parking, the planting strip between the road and the bike lane does that job, so it is at least 6.5 ft (2 m) wide. Where there is parking, the 10 ft parking lane and the 3 ft door buffer beside it put the bike lane about 4 m from the travel lane, and the street trees move to a planting strip between the sidewalk and the bike lane.

At every driveway, the sidewalk and the bike lane keep their own level and surface across the driveway, with a green marking where the bike lane crosses, so it is clear that drivers are crossing them, not the other way round.<Citation index={27} /> Parking stops at least 20 ft before each driveway edge, and no planting or street furniture that blocks the view stands within 15 ft of one, so drivers and riders can see each other.<Citation index={5} /> At busy truck driveways, the crossing gets the same protected intersection geometry as a street corner.<Citation index={27} /> The Pattern viewer above shows a driveway on the left side of the street: choose At the driveway under Cut at.

A two-way bike lane on one side of the street is strongly discouraged here. Drivers turning in or out look for riders coming the usual way and miss the ones coming from the other direction, and this street's driveways multiply those conflicts.<Citation index={5} /><Citation index={32} /> In the same Dutch study, crashes with riders going straight through were more common along two-way cycle tracks.<Citation index={26} /> Where one is built anyway, make it 12 ft wide, with a dotted yellow center line.<Citation index={5} /><Citation index={36} />

### Parking and loading lanes

On-street parking is discouraged on this street, and off-street parking and loading are always preferred. Where it happens anyway, the Pattern viewer shows it. It is a 10 ft parking and loading lane, wide enough for a delivery truck,<Citation index={1} /><Citation index={5} /> paved in brick or permeable pavers and raised partway to sidewalk height behind a mountable curb, the same treatment as on [Default (Standard Collector)](/patterns/collectors/default/#parking-lanes). The parked cars and trucks then protect the bike lane, with an empty 3 ft door buffer between them. Parking and loading stop at least 30 ft before each crosswalk, FHWA's setback where speeds are 26 to 35 mph,<Citation index={30} /> and 20 ft before each driveway edge.<Citation index={5} />

Where this pattern's street crosses an active rail spur, an increasingly common condition on industrial land, see [Railroad Grade Crossing](/patterns/intersections/railroad-grade-crossing/) <IdPill id="INT-RGC-15" />, which covers the geometry and warning devices this page does not.

## Related patterns

<div class="cw-links">

- [Default (Standard Collector)](/patterns/collectors/default/) <IdPill id="COL-DEF-01" /> (the base order this pattern overrides for Freight priority)
- [Alley](/patterns/local-streets/alley/) <IdPill id="LOC-ALY-02" /> (the other cross-Classification pattern overriding to a Vehicle/Freight-first order for a specific access purpose)
- [Roundabout (Single / Multi-Lane)](/patterns/intersections/roundabout/) <IdPill id="INT-RAB-01" /> (this pattern's intersection answer depends on that page's freight-street sizing note)
- [Curb Cut / Driveway Apron](/patterns/elements/curb-cut-driveway-apron/) <IdPill id="ELM-CCA-04" /> (this pattern's property-access answer depends on that Element's forward-entry requirement)
- [Railroad Grade Crossing](/patterns/intersections/railroad-grade-crossing/) <IdPill id="INT-RGC-15" /> (where an active rail spur crosses this street)

</div>

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> [City of Portland Bureau of Transportation, *PBOT Development Review Manual to Creating Public Streets and Connections*, Section II.G (local service streets in industrial zones: at least 44 ft curb-to-curb, two 12 ft travel lanes and two 10 ft parking/loading lanes; streets above Local are designed case by case).](https://www.portland.gov/transportation/documents/pbot-development-review-manual-creating-public-streets-and-connections/download)
2. <span id="ref-2"></span><EvidenceChip tier="legal" /> [City of Minneapolis, *Street Design Guidance* 3.7B, "Design and Control Vehicles" (WB-62 named for highly industrialized streets).](https://sdg.minneapolismn.gov/application/files/4116/1256/7848/3.7B_Design_and_control_vehicles.pdf)
3. <span id="ref-3"></span><EvidenceChip tier="precedent" /> [NACTO, *Urban Bikeway Design Guide*, "Protected Bike Lanes" (10 ft lanes support truck uses at 35 mph and under).](https://nacto.org/latest/urban-bikeway-design-guide-protected-bike-lanes/)
4. <span id="ref-4"></span><EvidenceChip tier="precedent" /> [City of Portland Bureau of Transportation, StreetsPDX, "Industrial Roads" street type (two to four lanes plus turn lanes as needed).](https://pbotapps.portland.gov/streets-pdx/street-types/industrial-road)
5. <span id="ref-5"></span><EvidenceChip tier="legal" /> [Federal Highway Administration, *Separated Bike Lane Planning and Design Guide* (2015), Chapter 5: widths (7 ft one-way and 12 ft two-way preferred), forms of separation and vertical separation type selection, and midblock driveways and loading zones (parking at least 20 ft from a driveway edge; loading zones at least 10 ft wide).](https://www.fhwa.dot.gov/environment/bicycle_pedestrian/publications/separated_bikelane_pdg/page00.cfm)
6. <span id="ref-6"></span><EvidenceChip tier="precedent" /> [NACTO, *Urban Street Design Guide*, "Design Vehicle" (truck route coordination with bike, transit, and pedestrian mapping; bollards at truck-route corners).](https://nacto.org/publication/urban-street-design-guide/design-controls/design-vehicle/)
7. <span id="ref-7"></span><EvidenceChip tier="legal" /> [U.S. Access Board, PROWAG Chapter R3, Technical Requirements, pedestrian access route width.](https://www.access-board.gov/prowag/proposed/chapter-r3-technical-requirements/)
8. <span id="ref-8"></span><EvidenceChip tier="legal" /> [Federal Highway Administration. "Relationship Between Design Speed, Operating Speed, and Posted Speed."](https://www.fhwa.dot.gov/planning/css/resources/speed)
9. <span id="ref-9"></span><EvidenceChip tier="precedent" /> Seattle Streets Illustrated, [3.9 Intersections](https://streetsillustrated.seattle.gov/design-standards/intersections/) and [2.13 Industrial Access](https://streetsillustrated.seattle.gov/street-type-standards/industrial-access/) (curb radius by connection type: 25 to 30 ft for truck-street intersections versus a 20 ft citywide default; 12 ft curb-side travel lanes on Industrial Access streets).
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
21. <span id="ref-21"></span><EvidenceChip tier="evidence" /> [Wang, Q. et al., "Exploring the Influencing Factors and Formation of the Blind Zone of a Semitrailer Truck in a Right-Turn Collision," *Sustainability* 14(16), 9805 (2022) (inner-wheel blind zone widening from 2.55 m to 3.57 m as the turning radius shrinks; right mirror coverage failing from a 20.5 degree tractor-trailer angle).](https://doi.org/10.3390/su14169805)
22. <span id="ref-22"></span><EvidenceChip tier="legal" /> [Federal Transit Administration, "Final Policy Statement on the Eligibility of Pedestrian and Bicycle Improvements Under Federal Transit Law," *Federal Register* 76(161), p. 52046 (August 19, 2011) (one-half mile pedestrian and three-mile bicycle distances from a transit stop or station).](https://www.federalregister.gov/documents/2011/08/19/2011-21273/final-policy-statement-on-the-eligibility-of-pedestrian-and-bicycle-improvements-under-federal)
23. <span id="ref-23"></span><EvidenceChip tier="legal" /> [Federal Highway Administration, *Bikeway Selection Guide*, FHWA-SA-18-077 (2019) (Figure 9, preferred bikeway type by speed and volume; "Traffic vehicle mix," more separation where heavy vehicles exceed 5 percent of traffic).](https://highways.dot.gov/sites/fhwa.dot.gov/files/2022-07/fhwasa18077.pdf)
24. <span id="ref-24"></span><EvidenceChip tier="evidence" /> [Chandra, S., Jimenez, J., and Radhakrishnan, R., "Accessibility evaluations for nighttime walking and bicycling for low-income shift workers," *Journal of Transport Geography* 64 (2017), pp. 97 to 108.](https://doi.org/10.1016/j.jtrangeo.2017.08.010)
25. <span id="ref-25"></span><EvidenceChip tier="precedent" /> [NACTO, *Designing for All Ages & Abilities: Contextual Guidance for High-Comfort Bicycle Facilities* (December 2017), "Choosing an All Ages & Abilities Bicycle Facility" and "Trucks & Large Vehicles" (protected bike lanes on observed or designated truck routes regardless of speed and volume).](https://nacto.org/wp-content/uploads/NACTO_Designing-for-All-Ages-Abilities.pdf)
26. <span id="ref-26"></span><EvidenceChip tier="evidence" /> [J.P. Schepers, P.A. Kroeze, W. Sweers & J.C. Wüst, "Road factors and bicycle-motor vehicle crashes at unsignalized priority intersections," *Accident Analysis and Prevention* 43(3), 2011, pages 853 to 861, as recorded in FHWA's CMF Clearinghouse (study 259: the abstract, and crash modification factors of 1.03 for a cycle track 0 to 2 m from the main road, 0.55 for 2 to 5 m and 0.93 for over 5 m).](https://cmfclearinghouse.fhwa.dot.gov/study_detail.php?stid=259)
27. <span id="ref-27"></span><EvidenceChip tier="legal" /> [Massachusetts Department of Transportation, *Separated Bike Lane Planning & Design Guide* (November 2015), Chapter 4, "Intersection Design" (recessed crossings 6 to 16.5 ft from the travel lane; protected intersection design preferred at any industrial driveway, otherwise a raised crossing with green conflict markings; mountable truck aprons).](https://www.mass.gov/doc/chapter-4-intersection-design-0/download)
28. <span id="ref-28"></span><EvidenceChip tier="legal" /> [City of Portland Bureau of Transportation, *Portland Pedestrian Design Guide* (May 2022), Tables B-3 and B-4 (Industrial Road: 0.5 ft frontage zone, 6 ft pedestrian through zone, 5 ft furnishing zone as a continuous planting strip).](https://www.portland.gov/transportation/engineering/documents/portland-pedestrian-design-guide/download)
29. <span id="ref-29"></span><EvidenceChip tier="legal" /> [City of Raleigh, *Unified Development Ordinance*, Sec. 8.5.7, "Industrial and Service Streets" (Industrial Street: 12 ft travel lanes, 8.5 ft parallel parking, 6 ft planting area with street trees about 40 ft apart, 6 ft sidewalk).](https://udo.raleighnc.gov/sec-857-industrial-and-service-streets)
30. <span id="ref-30"></span><EvidenceChip tier="legal" /> [FHWA, *Guide for Improving Pedestrian Safety at Uncontrolled Crossing Locations*, FHWA-SA-17-072 (July 2018, updated), parking restriction on crosswalk approach (pages 18 to 19: 20 ft at 25 mph or less, 30 ft at 26 to 35 mph).](https://www.fhwa.dot.gov/innovation/everydaycounts/edc_5/docs/STEP-guide-improving-ped-safety.pdf)
31. <span id="ref-31"></span><EvidenceChip tier="legal" /> [Federal Highway Administration, *Highway Functional Classification: Concepts, Criteria and Procedures*, 2023 Edition, Table 3-6, "VMT and Mileage Guidelines by Functional Classifications: Collectors and Locals" (typical AADT ranges).](https://rosap.ntl.bts.gov/view/dot/72430)
32. <span id="ref-32"></span><EvidenceChip tier="precedent" /> CROW, *Ontwerpwijzer fietsverkeer*, CROW Kennisbank (2016), [V16 "Vrijliggend fietspad"](https://kennisbank.crow.nl/public/gastgebruiker/WOBU/Ontwerpwijzer_fietsverkeer/V16_Vrijliggend_fietspad/33043) and [V18 "Tussenberm fietspad – rijbaan"](https://kennisbank.crow.nl/public/gastgebruiker/WOBU/Ontwerpwijzer_fietsverkeer/V18_Tussenberm/33045) (cycle track widths, conflicts at junctions and driveways, verge at least 1.0 m on a 50 km/h distributor road; in Dutch).
33. <span id="ref-33"></span><EvidenceChip tier="precedent" /> [CROW, *ASVV 2021*, "Gebiedsontsluitingswegen," CROW Kennisbank: design characteristics for distributor roads inside built-up areas, ideal and minimum layouts (in Dutch).](https://kennisbank.crow.nl/public/gastgebruiker/WOBI/ASVV_2021/Gebiedsontsluitingswegen/113433)
34. <span id="ref-34"></span><EvidenceChip tier="legal" /> [U.S. Access Board, *Public Right-of-Way Accessibility Guidelines* (final rule, August 8, 2023), R205 (detectable warning surfaces at curb ramps and blended transitions at crosswalks) and R305 (truncated domes, 24 in deep, contrasting with the walking surface).](https://www.access-board.gov/prowag/technical.html)
35. <span id="ref-35"></span><EvidenceChip tier="precedent" /> [Smart Growth America, National Complete Streets Coalition, "About" page, typical Complete Street elements.](https://www.smartgrowthamerica.org/programs-and-coalitions/national-complete-streets-coalition/about/)
36. <span id="ref-36"></span><EvidenceChip tier="precedent" /> [NACTO, "Designing Protected Bike Lanes," *Urban Bikeway Design Guide* (two-way protected bike lanes: dotted yellow center line).](https://nacto.org/publication/urban-bikeway-design-guide/designing-bikeways-for-all-ages-and-abilities/protected-bike-lanes/designing-protected-bike-lanes/)
