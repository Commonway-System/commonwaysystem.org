---
title: Railroad Grade Crossing
description: An at-grade crossing where a street meets an active rail line, with its own geometry, warning devices, and low-clearance-vehicle risk distinct from any road-to-road intersection.
patternId: INT-RGC-15
date: 2026-09-25
llms: An at-grade crossing where any street type meets an active rail line, with its own geometry standard, required warning devices, sight-distance rules, and low-clearance-vehicle risk distinct from any road-to-road intersection.
---

<script>
  import { Citation, DensityChip, EvidenceChip, PatternCard, RelatedMedia } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Railroad Grade Crossing" classification="intersections" status="situational">
An at-grade crossing where any street type meets an active rail line, with its own geometry, warning devices, and low-clearance-vehicle risk distinct from any road-to-road intersection.
</PatternCard>

<RelatedMedia id={fm.patternId} />

Typical at: <DensityChip tier="Undeveloped" /> <DensityChip tier="Rural" /> <DensityChip tier="Suburban" />

Compact, Urban, and Core are also possible wherever an active rail line crosses a public street. The pattern is most common near industrial or agricultural rail spurs, but it is not exclusive to them.

*Working assessment: this pattern's status reflects a preliminary Commonway System judgment call, pending final review.*

## Design notes

This is its own pattern, not a row on another page, because it has its own geometry standard, its own required warning devices (distinct from any road-only intersection control), and its own sight-distance rules that vary by railroad company. It also applies across street types, not just [Industrial Collector](/patterns/collectors/industrial-collector/) (COL-IND-03) or [Rural Collector / Farm-to-Market Road](/patterns/collectors/rural-collector/) (COL-FTM-02), where an active spur is a realistic condition.

The core hazard is a "humped" or high-profile crossing that can strand a low-ground-clearance or long-wheelbase vehicle on the tracks. This is a distinct failure mode from any other intersection risk in this guidebook.<Citation index={1} /><Citation index={2} />

- **Approach grade.** The maximum approach grade should not exceed 3 inches of rail elevation at a point 30 ft from the center of the nearest rail, on both sides.<Citation index={3} />
- **Warning device.** Where an existing humped crossing cannot be corrected, the MUTCD W10-5 Low Ground Clearance sign, with its W10-5P plaque, is the required warning device.<Citation index={3} />
- **Sight lines.** Required sight-line distances vary by the specific railroad company operating the line, not a single national number.<Citation index={3} />
- **Storage and queuing.** A crossing located near a highway intersection carries a higher collision rate in part because of the short vehicle storage area between the crossing and the intersection. Queues can form across the crossing itself.<Citation index={4} />
- **Pedestrians.** Pedestrian-specific treatments are a separate design discipline from vehicle treatments: inter-track fencing, pedestrian gates, swing gates, channelization, and detectable warning surfaces.<Citation index={5} />

## Related patterns

[Industrial Collector](/patterns/collectors/industrial-collector/) (COL-IND-03) (an active rail spur is a realistic condition on industrial land), [Rural Collector / Farm-to-Market Road](/patterns/collectors/rural-collector/) (COL-FTM-02) (rail spurs are plausible in agricultural contexts), [Signal](/patterns/intersections/signal/) (INT-SIG-03) (a nearby signalized intersection is the storage and queuing interaction described above)

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> [Federal Highway Administration and Federal Railroad Administration, *Highway-Rail Crossing Handbook*, Third Edition.](https://railroads.dot.gov/sites/fra.dot.gov/files/2024-10/GXHandbook2019FRAFHWA.pdf)
2. <span id="ref-2"></span><EvidenceChip tier="evidence" /> [Eck, R.W. and Kang, S.K., "Low-Clearance Vehicles at Rail-Highway Grade Crossings: An Overview of the Problem and Potential Solutions," *Transportation Research Record* 1327 (1991), pp. 27 to 35.](https://onlinepubs.trb.org/Onlinepubs/trr/1991/1327/1327-005.pdf)
3. <span id="ref-3"></span><EvidenceChip tier="legal" /> [Florida Department of Transportation, *FDOT Design Manual*, Topic #625-000-002, Section 220 "Railroads" (humped crossing definition and MUTCD W10-5 sign requirement).](https://fdotwww.blob.core.windows.net/sitefinity/docs/default-source/roadway/fdm/2024/2024fdm220rr.pdf)
4. <span id="ref-4"></span><EvidenceChip tier="legal" /> [Federal Highway Administration, *Highway-Rail Crossing Handbook*, Appendix B, "Components of a Highway-Rail Grade Crossing."](https://highways.dot.gov/safety/hsip/xings/highway-rail-crossing-handbook-third-edition/b-appendix-components-highway-rail)
5. <span id="ref-5"></span><EvidenceChip tier="legal" /> [Federal Railroad Administration, "Engineering Design for Pedestrian Safety at Highway-Rail Grade Crossings."](https://railroads.dot.gov/sites/fra.dot.gov/files/fra_net/16553/Engineering_for_Ped_Safety_At_Crossings_final.pdf)
