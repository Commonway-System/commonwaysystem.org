---
title: "Transit Platform"
description: "The boarding surface at a transit stop where passengers board and alight, varying by platform height (level or low), length (accommodating one or multiple vehicles), and configuration (island platform serving two directions, or side platforms serving one direction each)."
patternId: FAC-TPL-02
date: 2026-08-31
llms: "The boarding surface at a transit stop where passengers board and alight, varying by platform height (level or low), length (accommodating one or multiple vehicles), and configuration (island platform serving two directions, or side platforms serving one direction each)."
---

<script>
  import { Citation, EvidenceChip, PatternCard, RelatedMedia } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Transit Platform" classification="facility" status="recommended">
The boarding surface at a transit stop where passengers board and alight, varying by platform height (level or low), length (accommodating one or multiple vehicles), and configuration (island platform serving two directions, or side platforms serving one direction each).
</PatternCard>

<RelatedMedia id={fm.patternId} />

*Working assessment: this pattern’s status reflects a preliminary Commonway System judgment call, pending final review.*

## Why this pattern exists

Boarding is where accessibility, dwell time, and safety concerns concentrate most tightly; a platform that does not match vehicle floor height or lacks adequate length creates real barriers for wheelchair users and slows every boarding cycle. This pattern exists to separate platform design, a distinct engineering and accessibility problem, from the shelter, signage, and other amenities that sit on top of it.

## Key considerations

- Platform height should match the boarding vehicle’s floor height wherever feasible, to enable level boarding<Citation index={1} />
- Island platforms require special attention to the intersection or roadway crossing needed to reach them safely
- Length must accommodate the longest vehicle expected to serve the stop, including multi-unit or articulated vehicles

## Related patterns

[Transit Shelter](/patterns/facilities/transit-shelter/) (FAC-TSH-01) (typically paired amenity); [Transit Hub/Station](/patterns/facilities/transit-hub-station/) (FAC-THS-03) (compound facility); [Pedestrian Safety Island/Refuge](/patterns/elements/pedestrian-safety-island-refuge/) (ELM-PSI-09) (related Element pattern for reaching island platforms)

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> PROWAG, Section R309.1, "Boarding and Alighting Areas," and Section R309.1.2, "Platform and Vehicle Floor Coordination." Direct basis for platform height and vehicle floor coordination, and the 8 ft x 5 ft minimum boarding area.
