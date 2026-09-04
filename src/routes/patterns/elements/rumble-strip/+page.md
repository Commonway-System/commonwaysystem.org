---
title: "Rumble Strip"
description: "A textured roadway surface, typically a series of shallow grooves or raised bars, that alerts drivers through vibration and sound when a vehicle crosses it."
patternId: ELM-RMS-07
date: 2026-08-31
llms: "A textured roadway surface, typically a series of shallow grooves or raised bars, that alerts drivers through vibration and sound when a vehicle crosses it."
---

<script>
  import { PatternCard, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Rumble Strip" classification="element" status="situational">
A textured roadway surface, typically a series of shallow grooves or raised bars, that alerts drivers through vibration and sound when a vehicle crosses it.
</PatternCard>

*Working assessment: this pattern’s status reflects a preliminary Commonway System judgment call, pending final review.*

## Why this pattern exists

Rumble strips address inattention and lane departure rather than speed directly, giving a driver an audible and tactile cue at a specific location or along a stretch of roadway, distinct from the speed-reduction goal of vertical deflection treatments. This pattern exists to document that separate function and its own siting considerations.<Citation index={1} />

## Key considerations

- Placement near residences requires care, since the noise generated can create a livability conflict for adjacent properties
- Not effective at reducing speed on its own; better suited to alerting for an upcoming change (stop condition, curve, edge of pavement) than as a substitute for vertical speed control
- Should not be used where it may pose a hazard to bicyclists sharing the roadway without an alternative path around it<Citation index={2} />

## Related patterns

[Vertical Speed Control](/patterns/elements/vertical-speed-control/) (ELM-VSC-06) (related but functionally distinct calming treatment); [Warning Sign](/patterns/elements/warning-sign/) (ELM-WNS-12) (often paired to alert of an upcoming condition)

## References

1. <span id="ref-1"></span><EvidenceChip tier="evidence" /> Persaud, B., Lyon, C., Eccles, K., and Soika, J., "Safety Evaluation of Centerline Plus Shoulder Rumble Strips," FHWA-HRT-15-048 (Federal Highway Administration, 2015); NCHRP Report 641.
2. <span id="ref-2"></span><EvidenceChip tier="evidence" /> Federal Highway Administration, "Rumble Strips and Bicycle Accommodation," fact sheet.
