---
title: "Curb"
description: "The raised edge separating the roadway from the sidewalk or shoulder, marking the physical boundary between space allocated to vehicles and space allocated to pedestrians or the roadway edge condition."
patternId: ELM-CRB-01
date: 2026-08-31
llms: "The raised edge separating the roadway from the sidewalk or shoulder, marking the physical boundary between space allocated to vehicles and space allocated to pedestrians or the roadway edge condition."
---

<script>
  import { PatternCard, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Curb" classification="element" status="recommended">
The raised edge separating the roadway from the sidewalk or shoulder, marking the physical boundary between space allocated to vehicles and space allocated to pedestrians or the roadway edge condition.
</PatternCard>

*Working assessment: this pattern’s status reflects a preliminary Commonway System judgment call, pending final review.*

## Why this pattern exists

The curb is the single most foundational physical element separating modes on a street; its height, material, and continuity determine drainage behavior, accessibility, and how legible the vehicle/pedestrian boundary reads to everyone using the street. Nearly every other Element pattern in this family (extensions, ramps, cuts) is a modification or interruption of this base condition, so it needs its own definition first.<Citation index={1} />

## Key considerations

- Height should be sufficient to discourage casual vehicle encroachment onto the sidewalk while not creating a tripping hazard where pedestrians cross it
- Material and profile should be durable against snowplow damage in climates where that applies
- Continuity matters: an interrupted or inconsistent curb line undermines drainage design and the clarity of the mode boundary

## Related patterns

[Curb Extension](/patterns/elements/curb-extension/) (ELM-CBE-02), [Curb Ramp](/patterns/elements/curb-ramp/) (ELM-CRP-03), [Curb Cut/Driveway Apron](/patterns/elements/curb-cut-driveway-apron/) (ELM-CCA-04) (all modifications of this base element); [Crosswalk](/patterns/elements/crosswalk/) (ELM-CRW-08) (a common interruption point)

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> NACTO Urban Street Design Guide, "Curbs." Height, material, and continuity design guidance for the base element.
