---
title: Default (Standard Collector)
description: The baseline Collector street typology, carrying the base modal hierarchy and 30 mph standard speed with no named override.
patternId: COL-DEF-01
date: 2026-08-29
llms: The baseline Collector street, applying the base modal hierarchy and 30 mph standard speed with no named override.
---

<script>
  import { Citation, DensityChip, EvidenceChip, GuidanceTable, ModalHierarchySection, PatternCard, RelatedMedia, SpeedLimitSection, SpeedModalHierarchyCard } from '$lib/theme/components'

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
      label: 'Bicycle facility',
      cells: [
        { summary: 'Protected bike lane.', content: ['Protected bike lane / cycle track, not merely buffered. This page\'s own Collector speed rule runs 30 to 35 mph, above the Dutch mixing threshold, so NACTO\'s enhanced recommendation is not optional here. It is what the speed rule already requires for internal consistency.'] },
        { summary: 'Not mandated; FHWA guide applies.', content: ['Not mandated by default. FHWA\'s Separated Bike Lane Planning and Design Guide is the federal design reference for when one is provided.', { cite: 1 }] },
        { summary: 'Protected over painted.', content: ['Protected bike lane / cycle track recommended over a painted lane.', { cite: 5 }] },
        { summary: 'Bike lanes or wide shoulders.', content: ['Bicycle lanes or wide paved shoulders listed as a typical element.', { cite: 4 }] },
        { summary: 'Separate above 30 km/h.', content: ['Physical separation required above a 30 km/h (about 19 mph) design speed. Cycle tracks measured 50 to 60% fewer bicycle crashes than painted lanes or mixed traffic on comparable roads.', { cite: 6 }] },
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
        { summary: 'Optional; 8 ft if provided.', content: ['Optional and context-dependent, not a required element. Where provided, use AASHTO\'s 8 ft desirable width rather than the 7 ft minimum, since the extra width also protects the door-swing zone the bicycle-facility answer depends on.'] },
        { summary: '7 ft minimum, 8 ft desirable.', content: ['Most vehicles park 6 to 12 inches from the curb and occupy roughly 7 ft. The Green Book recommends a 7 ft minimum on urban streets and 8 ft as the desirable width where parking is provided.', { cite: 13 }] },
        { summary: 'Not yet sourced.', content: [{ note: 'Open gap: not independently sourced.' }] },
        { summary: 'Not treated as essential.', content: ['Absent from the typical-elements list. On-street parking is not treated as a completeness requirement the way sidewalks and bike facilities are.', { cite: 4 }] },
        { summary: 'None on distributor roads.', content: ['Not separately cited. A distributor-class road carries no direct property access by design, which excludes on-street parking from the through carriageway itself. Parking belongs on the local access streets Dutch classification keeps separate.'] },
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

<PatternCard id={fm.patternId} title="Default (Standard Collector)" classification="collector" status="recommended">
The baseline Collector street. No special land use, freight function, or dedicated mode gives it a name of its own, so it carries the base Collector modal hierarchy and speed rule unmodified.
</PatternCard>

<RelatedMedia id={fm.patternId} />

Typical at: <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Rural is an edge case. Undeveloped is an unlikely pairing.

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

The Commonway System column comes first: it is the answer. The four columns after it show the layered sources it was built from, from the federal and state baseline through NACTO, Complete Streets, and Dutch practice. The number-of-lanes and on-street-parking rows are a first pass, less fully resolved than the others.

<GuidanceTable rows={guidanceRows} caption="Collector street design guidance by source, from federal and state baseline through the Commonway System answer" />

## Design notes

This entry is the standard against which every other Collector Typology is defined as an override, the same role Default plays within Local.

## Related patterns

[Default (Standard Local Street)](/patterns/local-streets/default/) (LOC-DEF-01) and [Default (No Parking, No Direct Property Access)](/patterns/arterials/default/) (ART-DEF-01) (the equivalent baseline reference point one Functional Classification down and up, completing the three-tier chain)

## Getting there: Retrofit path options

[Four-to-three lane road diet](/retrofits/corridor/four-to-three-lane-road-diet/) (RFT-CDR-01), [Lane diet](/retrofits/corridor/lane-diet/) (RFT-CDR-03), [Protected bike lane retrofit via lane-width reallocation](/retrofits/corridor/protected-bike-lane-width-reallocation/) (RFT-CDR-07), [Protected bike lane retrofit via parking reduction](/retrofits/corridor/protected-bike-lane-parking-reduction/) (RFT-CDR-09)

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
