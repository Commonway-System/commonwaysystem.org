---
title: "Sharrow"
description: "A shared-lane marking, a painted symbol combining a bicycle icon and chevron arrows, placed within a shared vehicle travel lane to indicate that cyclists may use the full lane and to suggest proper positioning within it."
patternId: ELM-SHR-39
date: 2026-08-31
llms: "A shared-lane marking, a painted symbol combining a bicycle icon and chevron arrows, placed within a shared vehicle travel lane to indicate that cyclists may use the full lane and to suggest proper positioning within it."
---

<script>
  import { PatternCard, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Sharrow" classification="element" status="avoid">
A shared-lane marking, a painted symbol combining a bicycle icon and chevron arrows, placed within a shared vehicle travel lane to indicate that cyclists may use the full lane and to suggest proper positioning within it.
</PatternCard>

*Working assessment: this pattern’s status reflects a preliminary Commonway System judgment call, pending final review.*

## Why this pattern exists

On a roadway too narrow to provide any dedicated bike space, a sharrow at least communicates that cyclists are expected users of the lane and suggests where they should position themselves relative to parked cars and the travel lane’s edge; this pattern exists to document this lowest tier of bike accommodation and its real limitations.

## Key considerations

- Provides no physical or even painted separation from vehicle traffic, and research has generally found it does little to improve comfort or safety for cyclists<Citation index={1} />
- Should be treated as a last-resort or interim treatment rather than a target outcome; a corridor relying on sharrows is a candidate for future upgrade to a dedicated facility
- May still hold value narrowly for wayfinding continuity between two stronger-facility segments where a short interruption cannot otherwise be avoided

## Related patterns

[Conventional Bike Lane](/patterns/elements/conventional-bike-lane/) (ELM-CBL-34), [Advisory Bike Lane](/patterns/elements/advisory-bike-lane/) (ELM-ABL-36) (facilities this pattern should generally be upgraded toward); [Stroad](/patterns/arterials/stroad/) (ART-STD-05) (the explicit Avoid-status pattern this shares status logic with)

## References

1. <span id="ref-1"></span><EvidenceChip tier="evidence" /> Ferenchak, N.N. and Marshall, W.E. (2019), "Advancing Healthy Cities Through Safer Cycling: An Examination of Shared Lane Markings," *International Journal of Transportation Science and Technology* 8(2). Chicago before/after study: sharrows produced no statistically significant safety improvement, underperforming both bike lanes and no treatment on injury reduction.
