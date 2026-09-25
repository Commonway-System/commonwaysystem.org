---
title: Rural Collector / Farm-to-Market Road
description: A Collector Typology moving vehicle and freight traffic through low-density agricultural or undeveloped land, the norm at Undeveloped and Rural density.
patternId: COL-FTM-02
date: 2026-08-29
llms: A Collector street typology serving vehicle and freight movement through low-density agricultural or undeveloped land, the norm at Undeveloped and Rural density and effectively absent past Suburban.
---

<script>
  import { Citation, DensityChip, EvidenceChip, GuidanceTable, ModalHierarchySection, PatternCard, RelatedMedia, SpeedLimitSection, SpeedModalHierarchyCard, SpeedTerrainTable } from '$lib/theme/components'

  const cROW = { href: '/guide/street-types/#for-readers-coming-from-dutch-crow-practice', label: 'CROW comparison table' }
  const retro = { href: '/retrofits/corridor/two-plus-one-road-cable-barrier/', label: '2+1 road with cable median barrier' }
  const na = (why) => ({ summary: 'Not applicable.', content: [why] })
  const unspec = { summary: 'Not specified.', content: ['Not specified in the typical-elements list.'] }
  const gap = (why) => ({ summary: 'Not researched.', content: [{ note: why }] })
  const terrainHead = ['Terrain', 'ADT under 400', 'ADT 400 to 2,000', 'ADT over 2,000']
  const terrainRows = [
    { label: 'Level', cells: [{ text: '40 mph' }, { text: '50 mph', retrofit: true }, { text: '60 mph', retrofit: true }] },
    { label: 'Rolling', cells: [{ text: '35 mph' }, { text: '40 mph' }, { text: '50 mph', retrofit: true }] },
    { label: 'Mountainous', cells: [{ text: '20 mph' }, { text: '30 mph' }, { text: '40 mph' }] },
  ]
  const guidanceRows = [
    {
      label: 'Travel lane width',
      cells: [
        { summary: '10 ft below 45 mph; 12 ft at 45+.', content: [
          { tier: { label: 'Below 45 mph', body: ['10 ft. This is the specific low-speed, low-volume exception this Typology qualifies for at its typical case (rolling terrain, low volume), not a universal rural answer.', { cite: 2 }] } },
          { tier: { label: '45 mph and above', body: ['12 ft. This is the general rural collector standard, not a downgrade. The 10 ft figure was always the exception, so a design that crosses into the higher-speed tier returns to the standard.', { cite: 2 }] } },
        ] },
        { summary: '12 ft default; 10 ft at low volume.', content: ['Rural collectors are generally designed to 12 ft, given the higher operating speeds typically found on them. 10 ft is permitted at operating speeds of 55 mph or below with future traffic under 400 vehicles per day.', { cite: 2 }] },
        na('Scoped to urban streets.'),
        unspec,
        { summary: 'Not regulated separately.', content: ['Not regulated as a separate dimension. Folded into overall speed-and-separation design instead.'] },
      ],
    },
    {
      label: 'Number of travel lanes',
      cells: [
        { summary: 'Two lanes, one each way.', content: ['Two lanes, one per direction, the same as ', { href: '/patterns/collectors/default/', label: 'Default (Standard Collector)' }, '. No change for rural context.'] },
        gap('Not separately researched for this Typology.'),
        na('Scoped to urban streets.'),
        unspec,
        gap('Not separately researched for this Typology.'),
      ],
    },
    {
      label: 'Bicycle facility',
      cells: [
        { summary: 'Below 45 mph: 4+ ft shoulder. 45+: separated path.', content: [
          { tier: { label: 'Below 45 mph', body: ['Paved shoulder with a painted edge line, 4 ft minimum, widening toward the top of that range as speed and volume rise within the tier. Rumble strips are a real roadway-departure countermeasure, but they can make a shoulder unrideable for cyclists unless a clear, sufficiently wide gap is left, so do not add them here without that gap.', { cite: 3 }] } },
          { tier: { label: '45 mph and above', body: ['A genuinely separated facility, a shared-use path or equivalent physical separation, not a shoulder. FHWA\'s Bikeway Selection Guide (2019) recommends exactly this, a separated path in place of a shoulder, above roughly 45 mph and/or 3,000 to 6,000 vehicles per day on a rural road.', { cite: 8 }, ' Speeding is one of the most common factors in motor vehicle crashes,', { cite: 10 }, ' which is why the answer at higher speeds is separation rather than a wider stripe.'] } },
        ] },
        { summary: 'Shoulders; separated path above ~45 mph.', content: ['Paved shoulders are the standard rural bicycle accommodation. AASHTO\'s Guide for the Development of Bicycle Facilities calls for at least 4 ft, wider above 50 mph.', { cite: 3 }, ' FHWA\'s Bikeway Selection Guide sets rural shoulder width by speed and volume and recommends a separated facility above approximately 45 mph and/or 3,000 to 6,000 vehicles per day.', { cite: 8 }] },
        { summary: 'Not applicable; rural guide instead.', content: ['Not applicable, scoped to urban streets. This is the exact context FHWA\'s Small Town and Rural Multimodal Networks guide (2016) exists to cover instead.', { cite: 3 }] },
        unspec,
        { summary: 'Marked bike strip or path at 60 km/h.', content: ['This Typology\'s real counterpart, Erftoegangsweg (rural access road), uses a marked bike strip or path at the same 60 km/h design speed this page sets. See the ', cROW, '.'] },
      ],
    },
    {
      label: 'Pedestrian facility',
      cells: [
        { summary: 'Shoulder below 45 mph; separated path above.', content: [
          { tier: { label: 'Below 45 mph', body: ['No dedicated sidewalk required at this Typology\'s stated density tiers (Undeveloped, Rural). The paved shoulder is the fallback if pedestrian presence exists, which is defensible given negligible pedestrian demand.'] } },
          { tier: { label: '45 mph and above', body: ['Sharing a shoulder stops being defensible. A pedestrian\'s risk of death reaches 50% at 42 mph, 75% at 50 mph, and 90% at 58 mph, according to federal crash data analyzed for the AAA Foundation for Traffic Safety.', { cite: 9 }, ' That is outcome data, not a design opinion. Provide the same separated facility the bicycle row calls for: one separated path serves both, so pedestrian and bicycle accommodation are one problem at this speed tier, not two.'] } },
        ] },
        { summary: 'PROWAG applies only if provided.', content: ['PROWAG applies only if a pedestrian facility is actually provided, and one typically is not at this density and demand.'] },
        na('Scoped to urban streets.'),
        unspec,
        { summary: 'Open gap.', content: [{ note: 'Not independently sourced for the pedestrian-specific case. Left as an open gap rather than extending the bicycle row\'s source.' }] },
      ],
    },
    {
      label: 'Speed management',
      cells: [
        { summary: '35 mph typical; up to 40 to 60 by terrain and volume.', content: ['35 mph typical, up to 40 to 60 mph depending on terrain and volume. See the table in ', { href: '/patterns/collectors/rural-collector/#speed-and-modal-hierarchy', label: 'Speed and modal hierarchy' }, ' above. Cells above 45 mph call for the ', retro, ' retrofit.', { cite: 4 }] },
        { summary: 'Green Book minimums; Texas will not go below 40.', content: ['AASHTO Green Book Table 6-1 sets minimum design speeds for rural collectors by terrain and traffic volume.', { cite: 4 }, ' Real state practice commonly runs above that minimum: Texas\'s own manual will not go below 40 mph even in rolling terrain at low volume.', { cite: 5 }] },
        na('Scoped to urban streets.'),
        unspec,
        { summary: '60 km/h for rural access roads.', content: ['60 km/h (about 35 mph) for Erftoegangsweg, the rural access-road tier, is the design speed at which mixed traffic continues without requiring full physical separation.', { cite: 1 }, ' See the ', cROW, '.'] },
      ],
    },
    {
      label: 'Intersection treatment',
      cells: [
        { summary: 'Local: stop control. Collector or Arterial: roundabout.', content: [
          { tier: { label: 'Meets a Local street', body: [
            'Stop / Yield on the Local approach, always, regardless of the Collector\'s own speed tier. A rural Local street\'s volume is too low to justify a roundabout\'s cost or footprint under any condition this Typology covers. What changes with speed is how the stop control is built, not whether one exists.',
            { tier: { label: 'Below 45 mph', body: ['A plain, well-marked ', { href: '/patterns/intersections/stop-yield/', label: 'Stop / Yield (Two-Way)' }, '.'] } },
            { tier: { label: '45 mph and above', body: ['FHWA\'s low-cost rural intersection research applies directly: rumble strips and a painted median island on the Collector\'s approach, and a channelizing island with a supplemental stop sign on the Local approach.', { cite: 16 }] } },
            'This differs from the Collector-to-Local answer on ', { href: '/patterns/collectors/default/', label: 'Default (Standard Collector)' }, ', ', { href: '/patterns/intersections/continuous-sidewalk/', label: 'Continuous Sidewalk / Raised Junction' }, ', because that is an urban, pedestrian-priority treatment. It does not fit this Typology\'s rural context or negligible pedestrian volume, so a different, speed-appropriate answer is correct here, not an inconsistency with the urban page.',
          ] } },
          { tier: { label: 'Meets another Collector', body: [
            { tier: { label: 'Below 45 mph', body: ['Prefer a mini-roundabout (see ', { href: '/patterns/elements/neighborhood-traffic-circle-mini-roundabout/', label: 'Neighborhood Traffic Circle / Mini-Roundabout' }, ') over a plain Stop / Yield where the intersection can physically support one. A North Carolina DOT-funded study developed crash modification factors from 25 real mini-roundabout conversions across eight states (Georgia, Iowa, Michigan, Minnesota, Missouri, North Carolina, Virginia, Washington), and its own scope targeted rural intersections at 35 mph and above, not urban ones.', { cite: 14 }, ' Total crashes and fatal-and-injury crashes both decreased after conversion. The trade-off is real: property-damage-only crashes increased, meaning severe crashes are being converted into low-speed fender-benders, not vanishing. A mini-roundabout\'s central island is mountable, which suits this Typology\'s farm-equipment traffic better than a standard roundabout sized only for passenger-vehicle turning radii. Fall back to a well-marked ', { href: '/patterns/intersections/stop-yield/', label: 'Stop / Yield (Two-Way)' }, ' only where geometry or right-of-way rules a mini-roundabout out.'] } },
            { tier: { label: '45 mph and above', body: ['A full ', { href: '/patterns/intersections/roundabout/', label: 'Roundabout' }, ' where volume justifies it, FHWA\'s enhanced stop-control treatment where it does not, never a plain uncontrolled crossing. The strongest matching evidence is a North Carolina DOT evaluation of 13 intersections, every one in a rural area, every one converted from a minor-road stop control, every one with at least one approach posted at 55 mph, with average major-road volume around 6,000 vehicles a day and minor-road volume around 3,600. It found 41% fewer total crashes, 79% fewer fatal-and-injury crashes, and 62% fewer frontal-impact crashes.', { cite: 15 }, ' Those conditions, rural, high-speed, stop-to-roundabout, match this tier directly. Where volume does not justify a roundabout, FHWA\'s research on low-cost safety concepts for two-way stop-controlled rural intersections on high-speed two-lane roads applies: rumble strips on shoulders and painted median islands on the major approach, and channelizing islands with supplemental stop signs on the minor approach.', { cite: 16 }] } },
          ] } },
          { tier: { label: 'Meets an Arterial', body: ['A ', { href: '/patterns/intersections/roundabout/', label: 'Roundabout' }, ' is preferred, with a ', { href: '/patterns/intersections/signal/', label: 'Signal' }, ' only where volume genuinely warrants one. A rural Arterial is plausibly running 55 mph or faster, which is close to the exact condition the rural high-speed roundabout study cited on this page was built around.', { cite: 15 }, ' This is not a new claim for this connection type, it is the same evidence this page already relies on, applied one tier up.'] } },
          { tier: { label: 'Meets a Freeway', body: ['Not applicable. A Collector does not connect to a Freeway at grade. That is an interchange condition and belongs to ', { href: '/patterns/intersections/grade-separated-interchange/', label: 'Grade-Separated Interchange' }, ', not a fifth case to solve here.'] } },
        ] },
        { summary: 'FHWA mini-roundabout guide; low-cost stop-control concepts.', content: ['FHWA\'s Mini-Roundabouts Technical Summary is the federal design reference for the below-45 mph tier.', { cite: 13 }, ' For the 45 mph and above tier, FHWA\'s research on low-cost safety concepts for two-way stop-controlled rural intersections on high-speed two-lane roads is the federal source.', { cite: 16 }] },
        gap('Not independently researched for this row on this page.'),
        gap('Not independently researched for this row on this page.'),
        { summary: 'Roundabouts where distributors meet.', content: [
          { tier: { label: 'Where two distributor roads meet', body: ['Sustainable Safety advises roundabouts.', { cite: 11 }] } },
          { tier: { label: 'Where an access road meets a distributor', body: ['SWOV research recommends either a well-controlled priority intersection or a driveway-like exit construction that forces the minor road to yield unambiguously.', { cite: 12 }] } },
        ] },
      ],
    },
    {
      label: 'Separation / buffer between modes',
      cells: [
        { summary: 'Shoulder below 45 mph; physical gap above.', content: [
          { tier: { label: 'Below 45 mph', body: ['The paved shoulder is the buffer. There is no separate painted-buffer question, the way there is on the urban Default page.'] } },
          { tier: { label: '45 mph and above', body: ['Once the facility is a separated path rather than a shoulder, the relevant separation is the physical gap and/or barrier between the path and the roadway, not a painted stripe width. See ', { href: '/patterns/corridors/road-adjacent-greenway/', label: 'Road-Adjacent Greenway' }, ' and ', { href: '/patterns/local-streets/shared-use-path/', label: 'Shared-Use Path' }, '. ', { note: 'This publication does not yet specify a gap width for that separation, so none is stated here.' }] } },
        ] },
        na('Not applicable in the same shape as the urban Default page\'s version of this row.'),
        na('Not applicable in the same shape as the urban Default page\'s version of this row.'),
        na('Not applicable in the same shape as the urban Default page\'s version of this row.'),
        na('Not applicable in the same shape as the urban Default page\'s version of this row.'),
      ],
    },
    {
      label: 'On-street parking',
      cells: [
        { summary: 'None.', content: ['Not applicable. No adjacent development generates curbside parking demand.'] },
        na('No curbside parking demand at this density.'),
        na('No curbside parking demand at this density.'),
        na('No curbside parking demand at this density.'),
        na('No curbside parking demand at this density.'),
      ],
    },
    {
      label: 'Property access',
      cells: [
        { summary: 'Field access only, as needed.', content: ['Minimal, consolidated field access: one driveway per parcel where feasible, with agricultural-equipment-use conditions on the permit. On the urban ', { href: '/patterns/collectors/default/', label: 'Default (Standard Collector)' }, ' page, minimal means working toward as little access as possible. Here, direct farm access is this Typology\'s functional purpose, so minimal means no more than legitimately needed, not an aspiration toward eliminating it.'] },
        { summary: 'One field driveway per property, minimum needed.', content: ['TxDOT\'s current Access Management Standards treat field driveways specifically: permitted where a field has no other reasonable access, typically one per property under common ownership, kept to the minimum necessary, and conditioned on agricultural-equipment use.', { cite: 6 }, ' FHWA\'s Corridor Access Management Proven Safety Countermeasure, also cited on Default (Standard Collector), applies here too.', { cite: 7 }] },
        na('Scoped to urban streets.'),
        unspec,
        { summary: 'Direct access is expected on access roads.', content: ['This Typology\'s real Dutch counterpart is the access-road tier, where direct property access is the defining, expected feature, not something excluded. That differs from the distributor roads on the Default (Standard Collector) page, which carry no direct property access at all. See the ', cROW, '.'] },
      ],
    },
  ]
</script>

<PatternCard id={fm.patternId} title="Rural Collector / Farm-to-Market Road" classification="collector" status="recommended">
A Collector road connecting low-density or agricultural land to the wider network, prioritizing vehicle and freight movement over pedestrian, bicycle, and transit use, which have little demand at this density.
</PatternCard>

<RelatedMedia id={fm.patternId} />

Typical at: <DensityChip tier="Undeveloped" /> <DensityChip tier="Rural" />

Suburban is an edge case. Compact, Urban, and Core are unlikely pairings.

## Speed and modal hierarchy

<SpeedModalHierarchyCard>
<SpeedLimitSection speeds={[35]} stacked>
35 mph is this Typology's own set point for the common case (rolling terrain, low volume), not inherited from the base Collector rule. Matches Dutch Sustainable Safety's design speed for a rural access road carrying mixed traffic without full separation.<Citation index={1} /> See the Layered guidance across sources section below for the full terrain-by-volume range and when a faster design requires a specific safety retrofit rather than just a higher number.

<SpeedTerrainTable head={terrainHead} rows={terrainRows} retrofitHref="/retrofits/corridor/two-plus-one-road-cable-barrier/" caption="Design speed by terrain and traffic volume (ADT, vehicles per day)" />

Every cell is either AASHTO's own permitted minimum for that terrain and volume combination, or, where real Dutch mixed-traffic evidence exists (rolling terrain, low volume), a number set by that evidence rather than AASHTO's minimum.<Citation index={4} /> Cells above 45 mph need the 2+1 road with cable median barrier retrofit. Past that threshold, two vehicles closing head-on hit each other at roughly 90 mph or more combined, and collision energy scales with the square of closing speed, not linearly, so the safety answer changes qualitatively, not just numerically.

</SpeedLimitSection>
<ModalHierarchySection classification="collector" rows={[{ tiers: ['vehicle', 'freight', 'pedestrian', 'bicycle', 'transit'] }]}>
A judgment call reasoned from the Typology's purpose rather than derived cleanly from a listed override trigger, and open for correction.

</ModalHierarchySection>

</SpeedModalHierarchyCard>

## Layered guidance across sources

The Commonway System column comes first: it is the answer. The four columns after it show the layered sources it was built from. Open gaps are marked in the cells rather than guessed at.

<GuidanceTable rows={guidanceRows} caption="Rural Collector design guidance by source, from the Commonway System answer through federal and state baseline, NACTO, Complete Streets, and Dutch practice" />

## Design notes

This entry is the mirror image of Main Street: the norm at Undeveloped and Rural density, and effectively disappearing past Suburban as land use shifts away from agricultural or undeveloped character. The speed rule, and the terrain-by-volume ranges behind it, are laid out in the Layered guidance across sources section above.

## Related patterns

[Main Street](/patterns/local-streets/main-street/) (LOC-MST-05) (explicitly named on this page as this pattern's mirror image), [Default (Standard Collector)](/patterns/collectors/default/) (COL-DEF-01) (the base order this pattern overrides)

## Getting there: Retrofit path options

[Depaving / pavement-to-gravel conversion](/retrofits/corridor/depaving-pavement-to-gravel/) (RFT-CDR-10), [2+1 road with cable median barrier](/retrofits/corridor/two-plus-one-road-cable-barrier/) (RFT-CDR-11) (for the terrain and volume combinations above 45 mph)

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> [SWOV, "Principles for a Safe Road Network" (CROW Sustainable Safety framework).](https://sustainablesafety.nl/)
2. <span id="ref-2"></span><EvidenceChip tier="legal" /> [Texas Department of Transportation, *Roadway Design Manual*, Chapter 6, Section 6.1.6, "Travel Lane Width and Number of Lanes" (rural collector lane widths by operating speed and traffic volume).](https://www.txdot.gov/manuals/des/rdw/chapter-6--collectors--4r-/6-1-design-considerations/6-1-6-travel-lane-width-and-number-of-lanes.html)
3. <span id="ref-3"></span><EvidenceChip tier="legal" /> [FHWA, *Small Town and Rural Multimodal Networks* (2016), Chapter 3, paved shoulders.](https://www.fhwa.dot.gov/environment/bicycle_pedestrian/publications/small_towns/page00.cfm)
4. <span id="ref-4"></span><EvidenceChip tier="legal" /> [AASHTO, *A Policy on Geometric Design of Highways and Streets* ("Green Book"), Table 6-1, minimum design speeds for rural collectors by terrain and traffic volume.](https://store.transportation.org/Common/DownloadContentFiles?id=1776)
5. <span id="ref-5"></span><EvidenceChip tier="legal" /> [Texas Department of Transportation, *Roadway Design Manual*, Chapter 6, Section 6.1.3, "Design Speed."](https://www.txdot.gov/manuals/des/rdw/chapter-6--collectors--4r-/6-1-design-considerations/6-1-3-design-speed.html)
6. <span id="ref-6"></span><EvidenceChip tier="legal" /> [Texas Department of Transportation, *Access Management Manual*, "Field Driveways."](https://www.txdot.gov/manuals/des/acm/chapter-2--access-management-standards/section-3--number--location--and-spacing-of-access/field-driveways.html)
7. <span id="ref-7"></span><EvidenceChip tier="legal" /> [Federal Highway Administration, "Corridor Access Management," Proven Safety Countermeasures.](https://highways.dot.gov/sites/fhwa.dot.gov/files/2022-06/12_Corridor%20Access%20Management_508.pdf)
8. <span id="ref-8"></span><EvidenceChip tier="legal" /> [Federal Highway Administration, *Bikeway Selection Guide* (February 2019), rural shoulder width by speed and volume; separated facility recommended above approximately 45 mph and/or 3,000 to 6,000 ADT.](https://safety.fhwa.dot.gov/ped_bike/tools_solve/docs/fhwasa18077.pdf)
9. <span id="ref-9"></span><EvidenceChip tier="evidence" /> [Tefft, B.C. (2011), "Impact Speed and a Pedestrian's Risk of Severe Injury or Death," AAA Foundation for Traffic Safety.](https://aaafoundation.org/research/impact-speed-pedestrians-risk-severe-injury-death/)
10. <span id="ref-10"></span><EvidenceChip tier="evidence" /> [National Transportation Safety Board (2017), "Reducing Speeding-Related Crashes Involving Passenger Vehicles," Safety Study NTSB/SS-17/01.](https://www.ntsb.gov/safety/safety-studies/Pages/DCA15SS002.aspx)
11. <span id="ref-11"></span><EvidenceChip tier="evidence" /> [SWOV, "Roundabouts and other intersections," fact sheet.](https://swov.nl/en/fact-sheet/roundabouts-and-other-intersections)
12. <span id="ref-12"></span><EvidenceChip tier="evidence" /> [SWOV Report R-98-10 (1998), junction treatment recommendations where an access road meets a distributor road.](https://swov.nl/system/files/publication-downloads/r-98-10.pdf)
13. <span id="ref-13"></span><EvidenceChip tier="legal" /> [Federal Highway Administration, *Mini-Roundabouts Technical Summary* (FHWA-SA-10-007, 2010).](https://safety.fhwa.dot.gov/intersection/innovative/roundabouts/fhwasa10007/fhwasa10007.pdf)
14. <span id="ref-14"></span><EvidenceChip tier="evidence" /> [Pulugurtha, Mishra & Mathew, University of North Carolina at Charlotte, "Mini-Roundabout CMF Development" (NCDOT RP2020-32, 2021).](https://connect.ncdot.gov/projects/research/RNAProjDocs/RP2020-32_Final%20Report.pdf)
15. <span id="ref-15"></span><EvidenceChip tier="evidence" /> [North Carolina Department of Transportation, "Evaluation of Roundabouts on High-Speed Roadways."](https://connect.ncdot.gov/resources/safety/TrafficSafetyResources/One%20Pager_Highspeed%20Roundabouts.pdf)
16. <span id="ref-16"></span><EvidenceChip tier="legal" /> [Federal Highway Administration, "Two Low-Cost Safety Concepts for Two-Way STOP-Controlled, Rural Intersections on High-Speed Two-Lane, Two-Way Roadways" (FHWA-HRT-08-063, 2008).](https://highways.dot.gov/sites/fhwa.dot.gov/files/FHWA-HRT-08-063.pdf)
