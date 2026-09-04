---
title: "Pedestrian Signal"
description: "A signal indication, typically a walking figure and countdown display, informing pedestrians when it is their turn to cross and how much time remains to do so at a signalized intersection or crossing."
patternId: ELM-PDS-15
date: 2026-08-31
llms: "A signal indication, typically a walking figure and countdown display, informing pedestrians when it is their turn to cross and how much time remains to do so at a signalized intersection or crossing."
---

<script>
  import { PatternCard, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Pedestrian Signal" classification="element" status="recommended">
A signal indication, typically a walking figure and countdown display, informing pedestrians when it is their turn to cross and how much time remains to do so at a signalized intersection or crossing.
</PatternCard>

*Working assessment: this pattern’s status reflects a preliminary Commonway System judgment call, pending final review.*

## Why this pattern exists

A vehicle-only signal phase gives pedestrians no explicit information about when or how long they have to cross; a pedestrian signal makes crossing timing an intentional, communicated part of the intersection’s operation. This pattern exists to document its own timing and placement considerations distinct from the vehicle signal it operates alongside.<Citation index={1} />

## Key considerations

- Crossing time allotted must accommodate a range of pedestrian walking speeds, not just an average adult pace<Citation index={2} />
- Should be provided at every signalized crossing where pedestrian activity is legal, not treated as optional
- Countdown displays improve pedestrian decision-making at the crossing’s edge and should be the default over a simple walk/don’t-walk indication

## Related patterns

[Traffic Signal](/patterns/elements/traffic-signal/) (ELM-TFS-14) (the companion vehicle control this pattern coordinates with); [Curb Ramp](/patterns/elements/curb-ramp/) (ELM-CRP-03), [Detectable Warning Surface](/patterns/elements/detectable-warning-surface/) (ELM-DWS-10) (companion accessibility elements)

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> MUTCD 11th Edition with Revision 1 (FHWA, December 2025; effective March 5, 2026), Chapter 4I, "Pedestrian Control Features" (renumbered from the 2009 edition's Chapter 4E), including Section 4D.02's leading pedestrian interval requirement.
2. <span id="ref-2"></span><EvidenceChip tier="legal" /> PROWAG (U.S. Access Board, 2023 final rule; adopted into DOT's ADA regulations effective January 17, 2025), Section R309, accessible pedestrian signal requirements.
