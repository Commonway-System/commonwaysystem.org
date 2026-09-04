---
title: "Pedestrian Safety Island / Refuge"
description: "A protected median space within a roadway allowing a pedestrian to cross in two stages, stopping partway across to wait for a gap in the second direction of traffic rather than crossing the full width in one movement."
patternId: ELM-PSI-09
date: 2026-08-31
llms: "A protected median space within a roadway allowing a pedestrian to cross in two stages, stopping partway across to wait for a gap in the second direction of traffic rather than crossing the full width in one movement."
---

<script>
  import { PatternCard, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Pedestrian Safety Island / Refuge" classification="element" status="recommended">
A protected median space within a roadway allowing a pedestrian to cross in two stages, stopping partway across to wait for a gap in the second direction of traffic rather than crossing the full width in one movement.
</PatternCard>

*Working assessment: this pattern’s status reflects a preliminary Commonway System judgment call, pending final review.*

## Why this pattern exists

Wide or multi-lane crossings ask a pedestrian to judge gaps in traffic across the full roadway width at once, a task that becomes harder and riskier as width and traffic volume increase; a refuge island breaks that judgment into two simpler, more manageable stages.<Citation index={1} /> This pattern exists to document the sizing and placement considerations that make an island genuinely usable rather than a token gesture.

## Key considerations

- Island width must be sufficient for a pedestrian, and ideally a pedestrian with a stroller or wheelchair, to wait comfortably, not just a painted sliver
- Cut-through openings at grade (rather than requiring a step up) improve accessibility and should be the default<Citation index={2} />
- Placement should align precisely with the crosswalk it serves; an offset island creates an awkward or unsafe crossing path

## Related patterns

[Crosswalk](/patterns/elements/crosswalk/) (ELM-CRW-08) (the crossing this pattern supports); [Curb Ramp](/patterns/elements/curb-ramp/) (ELM-CRP-03), [Detectable Warning Surface](/patterns/elements/detectable-warning-surface/) (ELM-DWS-10) (companion accessibility elements at the island itself)

## References

1. <span id="ref-1"></span><EvidenceChip tier="evidence" /> Zegeer, C. et al., "Safety Effects of Marked Versus Unmarked Crosswalks at Uncontrolled Locations," FHWA-RD-01-075 (2002). Documents a crash modification factor of 0.54 (a 46% crash reduction) for a raised median with a marked crosswalk compared to an unmarked comparison.
2. <span id="ref-2"></span><EvidenceChip tier="legal" /> PROWAG (U.S. Access Board, 2023 final rule; adopted into DOT's ADA regulations effective January 17, 2025), Section R306, "Pedestrian Street Crossings." Cut-through opening and accessibility requirements at medians and islands.
