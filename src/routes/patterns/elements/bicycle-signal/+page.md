---
title: "Bicycle Signal"
description: "A signal indication, typically a bicycle-shaped symbol in red, yellow, and green, giving cyclists their own dedicated phase or right-of-way instruction distinct from vehicle and pedestrian signals."
patternId: ELM-BCS-16
date: 2026-08-31
llms: "A signal indication, typically a bicycle-shaped symbol in red, yellow, and green, giving cyclists their own dedicated phase or right-of-way instruction distinct from vehicle and pedestrian signals."
---

<script>
  import { Citation, EvidenceChip, PatternCard, RelatedMedia } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Bicycle Signal" classification="element" status="situational">
A signal indication, typically a bicycle-shaped symbol in red, yellow, and green, giving cyclists their own dedicated phase or right-of-way instruction distinct from vehicle and pedestrian signals.
</PatternCard>

<RelatedMedia id={fm.patternId} />

*Working assessment: this pattern’s status reflects a preliminary Commonway System judgment call, pending final review.*

## Why this pattern exists

Where a bicycle facility crosses or interacts with an intersection in a way that a shared vehicle or pedestrian phase does not safely accommodate, a dedicated bicycle signal resolves the conflict explicitly rather than leaving cyclists to interpret a signal meant for another mode. This pattern exists to document where that dedicated treatment is warranted.<Citation index={1} />

## Key considerations

- Most appropriate where a protected bike lane or cycle track meets an intersection with a conflicting turning movement that a shared phase cannot resolve safely
- Should be clearly distinguishable from the vehicle signal to avoid driver confusion about which indication applies to them
- Leading bicycle intervals (giving cyclists a head start before conflicting vehicle movements) are a common and effective use of this pattern<Citation index={2} />

## Related patterns

[Traffic Signal](/patterns/elements/traffic-signal/) (ELM-TFS-14) (the vehicle control this pattern separates from); [Protected Bike Lane/Cycle Track](/patterns/elements/protected-bike-lane-cycle-track/) (ELM-PBL-37) (the facility type most commonly paired with this treatment)

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> MUTCD 11th Edition with Revision 1 (FHWA, December 2025; effective March 5, 2026), Chapter 9D, "Signals for Bicycle Facilities." The current binding standard; bicycle signals existed only as FHWA Interim Approval IA-16 (2013) until the 11th edition made them standard.
2. <span id="ref-2"></span><EvidenceChip tier="precedent" /> NACTO Urban Bikeway Design Guide, 3rd ed. (2025), "Bike Signal Design." Leading bicycle interval and actuation-versus-recall design guidance.
