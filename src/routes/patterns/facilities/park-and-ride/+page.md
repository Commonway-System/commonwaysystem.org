---
title: "Park-and-Ride"
description: "A parking facility, surface or structured, designed specifically for commuters to leave a personal vehicle and transfer to transit for the remainder of their trip."
patternId: FAC-PNR-06
date: 2026-08-31
llms: "A parking facility, surface or structured, designed specifically for commuters to leave a personal vehicle and transfer to transit for the remainder of their trip."
---

<script>
  import { Citation, EvidenceChip, PatternCard, RelatedMedia } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Park-and-Ride" classification="facility" status="situational">
A parking facility, surface or structured, designed specifically for commuters to leave a personal vehicle and transfer to transit for the remainder of their trip.
</PatternCard>

<RelatedMedia id={fm.patternId} />

*Working assessment: this pattern’s status reflects a preliminary Commonway System judgment call, pending final review.*

## Why this pattern exists

Park-and-ride serves a distinct trip purpose (a single daily transfer at a predictable time) rather than general destination parking, which shapes its sizing, its relationship to the transit stop it serves, and its access design in ways a generic lot or garage does not need to consider. This pattern exists to document that specific use case rather than leaving it as an unstated variant of Surface Parking Lot or Parking Garage/Structure.<Citation index={1} />

## Key considerations

- Walking distance and path quality between the parking area and the transit platform should be prioritized, since a poor connection undermines the facility’s entire purpose
- Sizing should be based on realistic transit ridership projections; an oversized facility encourages unnecessary driving while an undersized one turns away potential riders
- Peak-period arrival and departure surges concentrated around transit schedules require different circulation design than a steady-demand lot<Citation index={2} />

## Related patterns

[Surface Parking Lot](/patterns/facilities/surface-parking-lot/) (FAC-SPL-04), [Parking Garage/Structure](/patterns/facilities/parking-garage-structure/) (FAC-PGS-05) (the physical forms this pattern typically takes); [Transit Hub/Station](/patterns/facilities/transit-hub-station/) (FAC-THS-03), [Transit Platform](/patterns/facilities/transit-platform/) (FAC-TPL-02) (the transit facility being served)

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> TCRP Report 153, "Guidelines for Providing Access to Public Transportation Stations." Station access planning and mode-tradeoff analysis for sizing against ridership projections.
2. <span id="ref-2"></span><EvidenceChip tier="evidence" /> TCRP Report 95, Chapter 3, "Park-and-Ride/Pool," Transportation Research Board. Facility classification by size (small, 200 spaces or fewer; large, more than 1,000 spaces) and peak-period demand patterns.
