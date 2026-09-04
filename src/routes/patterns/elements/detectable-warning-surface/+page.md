---
title: "Detectable Warning Surface"
description: "A textured ground surface, typically a grid of truncated domes, installed at the edge of a curb ramp or platform to alert pedestrians with vision impairments to an approaching street edge or crossing point through underfoot texture."
patternId: ELM-DWS-10
date: 2026-08-31
llms: "A textured ground surface, typically a grid of truncated domes, installed at the edge of a curb ramp or platform to alert pedestrians with vision impairments to an approaching street edge or crossing point through underfoot texture."
---

<script>
  import { PatternCard, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Detectable Warning Surface" classification="element" status="recommended">
A textured ground surface, typically a grid of truncated domes, installed at the edge of a curb ramp or platform to alert pedestrians with vision impairments to an approaching street edge or crossing point through underfoot texture.
</PatternCard>

*Working assessment: this pattern’s status reflects a preliminary Commonway System judgment call, pending final review.*

## Why this pattern exists

A curb ramp removes the vertical cue (a step down) that traditionally signaled a street edge to a pedestrian using a cane or with low vision; the detectable warning surface restores that cue through texture instead of height. This pattern exists because it is a baseline accessibility requirement everywhere a curb ramp meets a street, not an optional accessory.

## Key considerations

- Should be present at every curb ramp and transit platform edge reaching a vehicular way, without exception
- Color contrast with the surrounding surface improves detectability for pedestrians with low vision, not just those who are fully blind<Citation index={1} />
- Material must remain detectable underfoot over time; a worn-down or damaged surface fails its purpose even if visually still present

## Related patterns

[Curb Ramp](/patterns/elements/curb-ramp/) (ELM-CRP-03) (required companion element); [Transit Platform](/patterns/facilities/transit-platform/) (FAC-TPL-02) (Facility pattern where this also applies at platform edges)

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> PROWAG (U.S. Access Board, 2023 final rule; adopted into DOT's ADA regulations effective January 17, 2025), Section R305, "Detectable Warning Surfaces." Dome size, spacing, visual contrast, and placement requirements.
