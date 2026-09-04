---
title: "Parking Garage / Structure"
description: "A multi-level parking structure, above-grade or underground, using ramp or helix circulation to move vehicles between levels."
patternId: FAC-PGS-05
date: 2026-08-31
llms: "A multi-level parking structure, above-grade or underground, using ramp or helix circulation to move vehicles between levels."
---

<script>
  import { PatternCard, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Parking Garage / Structure" classification="facility" status="situational">
A multi-level parking structure, above-grade or underground, using ramp or helix circulation to move vehicles between levels.
</PatternCard>

*Working assessment: this pattern’s status reflects a preliminary Commonway System judgment call, pending final review.*

## Why this pattern exists

Where land value or density makes surface parking impractical, a structure trades footprint for height and circulation complexity, introducing its own set of design problems (ramp grade and turning radius, pedestrian egress from upper levels, ground-floor treatment facing the street) that a surface lot never has to solve. This pattern exists to document those structure-specific considerations separately from surface parking.

## Key considerations

- Ground-floor frontage facing the street should avoid a blank wall; active uses or architectural treatment help the structure read as a building rather than a void
- Pedestrian egress routes (stairs, elevators) should be direct, well-lit, and clearly wayfinding-marked from every level<Citation index={2} />
- Ramp and turning geometry should be sized for the largest vehicle expected to use the facility, including service and emergency vehicles<Citation index={1} />

## Related patterns

[Surface Parking Lot](/patterns/facilities/surface-parking-lot/) (FAC-SPL-04) (lower-density alternative); [Park-and-Ride](/patterns/facilities/park-and-ride/) (FAC-PNR-06) (a specific use case that may take structured form)

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> ULI/National Parking Association, *The Dimensions of Parking*. Ramp grade, turning radius, and structural circulation design.
2. <span id="ref-2"></span><EvidenceChip tier="legal" /> 2010 ADA Standards for Accessible Design / PROWAG. Accessible egress (stairs, elevators) from every level.
