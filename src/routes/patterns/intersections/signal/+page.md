---
title: Signal
description: Traffic signal control, available within the Commonway System only as a documented last resort, never the presumed choice.
patternId: INT-SIG-03
date: 2026-08-29
llms: Traffic signal control, available within the Commonway System only as a documented last resort against the safer roundabout default, never the presumed choice.
---

<script>
  import { Citation, DensityChip, EvidenceChip, PatternCard, RelatedMedia } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Signal" classification="intersections" status="situational">
A signalized intersection, controlling conflicting movements with timed lights.
</PatternCard>

<RelatedMedia id={fm.patternId} />

Typical at: <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Suburban is an edge case. Undeveloped and Rural are unlikely pairings.

:::note
Signal remains available within the Commonway System, but only as a last resort requiring documented burden-of-proof justification, modeled on WSDOT's Roundabout First and Intersection Control Evaluation policy.<Citation index={1} /><Citation index={2} /> It is not banned, just never presumed. Where a roundabout or turbo-roundabout can serve the same volume, that is the default choice instead.
:::

## Design notes

Signal's realistic density range overlaps heavily with Roundabout and Turbo-Roundabout, since all three ultimately compete for the same higher-volume intersections. The difference is which one the Commonway System treats as the presumed choice absent a documented reason otherwise.

## Turning-maneuver risk to people walking and biking

Vehicles making a turn are involved in a disproportionate share of fatal pedestrian and cyclist crashes relative to vehicles going straight, and that risk rises sharply with vehicle size.<Citation index={3} /><Citation index={4} /> This applies to every signal installation, not just those on freight-priority streets. [Industrial Collector](/patterns/collectors/industrial-collector/) is the acute case of it.

- **Leading pedestrian intervals.** Give pedestrians a several-second head start into the crosswalk before the parallel vehicle phase turns green, so a turning driver has a chance to see the pedestrian before beginning the turn.<Citation index={5} />
- **Curb extensions.** They shorten crossing exposure time and place waiting pedestrians directly in the turning driver's line of sight.<Citation index={5} /> See [Curb Extension](/patterns/elements/curb-extension/).

## Related patterns

[Roundabout (Single/Multi-Lane)](/patterns/intersections/roundabout/) (INT-RAB-01) and [Turbo-Roundabout](/patterns/intersections/turbo-roundabout/) (INT-TRB-02) (explicitly named on this page as competing for the same higher-volume intersections); [Median U-Turn](/patterns/intersections/median-u-turn/) (INT-MUT-12), [Restricted Crossing U-Turn](/patterns/intersections/restricted-crossing-u-turn/) (INT-RCU-13), and [Displaced Left-Turn](/patterns/intersections/displaced-left-turn/) (INT-DLT-14) (unconventional geometries that modify rather than replace this pattern to remove unprotected left turns)

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> [Washington State Department of Transportation, *WSDOT Design Manual*, Chapter 1300, "Intersection Control Evaluation."](https://wsdot.wa.gov/publications/manuals/fulltext/m22-01/1300.pdf)
2. <span id="ref-2"></span><EvidenceChip tier="legal" /> [Manual on Uniform Traffic Control Devices, 11th Edition with Revision 1 (FHWA, December 2025; effective March 5, 2026), Chapter 4C.](https://mutcd.fhwa.dot.gov/pdfs/11th_Editionr1/mutcd11theditionr1hl.pdf)
3. <span id="ref-3"></span><EvidenceChip tier="evidence" /> [U.S. Government Accountability Office, *Pedestrian and Cyclist Safety: DOT Should Take Steps to Address Risks Related to Limited Driver Visibility*, GAO-26-107954 (2026).](https://www.gao.gov/products/gao-26-107954)
4. <span id="ref-4"></span><EvidenceChip tier="evidence" /> [Wang, Q. et al., "Exploring the Influencing Factors and Formation of the Blind Zone of a Semitrailer Truck in a Right-Turn Collision," *Sustainability* 14(16), 9805 (2022).](https://doi.org/10.3390/su14169805)
5. <span id="ref-5"></span><EvidenceChip tier="evidence" /> [Insurance Institute for Highway Safety, "Vehicles with big blind zones spell danger to pedestrians during left turns" (November 19, 2025) (leading pedestrian intervals and curb extensions as blind-zone mitigations).](https://www.iihs.org/news/detail/vehicles-with-big-blind-zones-spell-danger-to-pedestrians-during-left-turns)
