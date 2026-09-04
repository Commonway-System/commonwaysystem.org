---
title: "Transit Shelter"
description: "A small- or large-format weather shelter installed at a transit stop, protecting waiting passengers from sun, rain, and wind, ranging from a simple lean-to canopy to a fully enclosed structure with seating and lighting."
patternId: FAC-TSH-01
date: 2026-08-31
llms: "A small- or large-format weather shelter installed at a transit stop, protecting waiting passengers from sun, rain, and wind, ranging from a simple lean-to canopy to a fully enclosed structure with seating and lighting."
---

<script>
  import { PatternCard, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Transit Shelter" classification="facility" status="recommended">
A small- or large-format weather shelter installed at a transit stop, protecting waiting passengers from sun, rain, and wind, ranging from a simple lean-to canopy to a fully enclosed structure with seating and lighting.
</PatternCard>

*Working assessment: this pattern’s status reflects a preliminary Commonway System judgment call, pending final review.*

## Why this pattern exists

Passenger comfort and perceived safety at a stop directly affect transit ridership; a stop with no protection from weather discourages waiting and signals that the route is not a priority investment. This pattern exists to document shelter as a distinct facility with its own siting, sizing, and structural considerations, separate from the platform it sits on and the route it serves.

## Key considerations

- Shelter footprint must not obstruct the required clear path of travel on the adjacent sidewalk<Citation index={1} />
- Sizing should scale with ridership volume at the stop, not be applied uniformly regardless of demand<Citation index={2} />
- Orientation should account for prevailing wind and sun exposure specific to the site, not follow a single default facing

## Related patterns

[Transit Platform](/patterns/facilities/transit-platform/) (FAC-TPL-02) (the boarding surface it typically pairs with); [Transit Hub/Station](/patterns/facilities/transit-hub-station/) (FAC-THS-03) (the compound facility this becomes part of at higher-order stops)

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> PROWAG, Section R309.2, "Transit Shelters" (federally adopted by DOT, effective January 17, 2025). Minimum clear space for mobility devices, connection to boarding areas via pedestrian access route.
2. <span id="ref-2"></span><EvidenceChip tier="precedent" /> TCRP Report 19, "Guidelines for the Location and Design of Bus Stops," Transportation Research Board. Sizing relative to ridership volume, siting and orientation.
