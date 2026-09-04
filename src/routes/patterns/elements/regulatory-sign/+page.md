---
title: "Regulatory Sign"
description: "A sign conveying a legally enforceable traffic rule, such as a stop sign, yield sign, speed limit sign, or turn restriction, whose message carries the force of law rather than merely advising or informing."
patternId: ELM-RGS-11
date: 2026-08-31
llms: "A sign conveying a legally enforceable traffic rule, such as a stop sign, yield sign, speed limit sign, or turn restriction, whose message carries the force of law rather than merely advising or informing."
---

<script>
  import { Citation, EvidenceChip, PatternCard, RelatedMedia } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Regulatory Sign" classification="element" status="recommended">
A sign conveying a legally enforceable traffic rule, such as a stop sign, yield sign, speed limit sign, or turn restriction, whose message carries the force of law rather than merely advising or informing.
</PatternCard>

<RelatedMedia id={fm.patternId} />

*Working assessment: this pattern’s status reflects a preliminary Commonway System judgment call, pending final review.*

## Why this pattern exists

Regulatory signs are how a jurisdiction communicates enforceable rules to the traveling public; consistent placement, sizing, and messaging across the network is what allows a driver to trust and act on a sign without hesitation. This pattern exists to document the category as distinct from warning and guide signs, since its legal weight demands a different level of rigor in application.<Citation index={1} /><Citation index={2} />

## Key considerations

- Placement and sizing should follow established uniform standards so meaning is consistent and immediately recognizable across contexts
- Overuse undermines effectiveness; a corridor with excessive regulatory signage trains drivers to tune out individual signs
- A regulatory sign should reflect the roadway’s actual design and self-explaining cues, not attempt to compensate for a mismatched design through signage alone

## Related patterns

[Warning Sign](/patterns/elements/warning-sign/) (ELM-WNS-12), [Guide Sign](/patterns/elements/guide-sign/) (ELM-GDS-13) (related but functionally distinct sign categories); relevant Segment and Intersection patterns the sign is regulating

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> MUTCD 11th Edition with Revision 1 (FHWA, December 2025; effective March 5, 2026), Section 2A.03, "Classification of Signs."
2. <span id="ref-2"></span><EvidenceChip tier="legal" /> MUTCD 11th Edition with Revision 1 (FHWA, December 2025; effective March 5, 2026), Chapter 2B, "Regulatory Signs, Barricades, and Gates."
