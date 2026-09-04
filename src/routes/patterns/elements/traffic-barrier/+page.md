---
title: "Traffic Barrier"
description: "A longitudinal barrier (guardrail, concrete barrier, or similar rigid or semi-rigid structure) installed to redirect an errant vehicle away from a roadside hazard or opposing traffic, rather than allowing the vehicle to travel further off-course."
patternId: ELM-TRB-23
date: 2026-08-31
llms: "A longitudinal barrier (guardrail, concrete barrier, or similar rigid or semi-rigid structure) installed to redirect an errant vehicle away from a roadside hazard or opposing traffic, rather than allowing the vehicle to travel further off-course."
---

<script>
  import { Citation, EvidenceChip, PatternCard, RelatedMedia } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Traffic Barrier" classification="element" status="situational">
A longitudinal barrier (guardrail, concrete barrier, or similar rigid or semi-rigid structure) installed to redirect an errant vehicle away from a roadside hazard or opposing traffic, rather than allowing the vehicle to travel further off-course.
</PatternCard>

<RelatedMedia id={fm.patternId} />

*Working assessment: this pattern’s status reflects a preliminary Commonway System judgment call, pending final review.*

## Why this pattern exists

Certain roadside conditions (a steep slope, a fixed object, an opposing travel lane with no separation) pose a severe risk if an errant vehicle reaches them; a traffic barrier is deployed specifically to intercept and redirect the vehicle before it does, at the cost of introducing its own fixed-object risk if struck directly. This pattern exists to document when that tradeoff is justified.

## Key considerations

- Should only be installed where the hazard being shielded is more severe than the barrier itself, since the barrier becomes a fixed object a vehicle can strike<Citation index={1} />
- End treatments matter significantly; an unshielded or improperly terminated barrier end can be more dangerous than no barrier at all
- Height and strength must be matched to the design vehicle and speed of the roadway it protects, crash-tested against current standards<Citation index={2} />

## Related patterns

[Crash Cushion/End Terminal](/patterns/elements/crash-cushion-end-terminal/) (ELM-CCT-24) (the treatment addressing this pattern’s exposed ends); [Bollard](/patterns/elements/bollard/) (ELM-BOL-25) (a related but functionally distinct barrier type)

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> American Association of State Highway and Transportation Officials, *Roadside Design Guide*, 4th ed.
2. <span id="ref-2"></span><EvidenceChip tier="legal" /> American Association of State Highway and Transportation Officials, *Manual for Assessing Safety Hardware* (MASH), 2016.
