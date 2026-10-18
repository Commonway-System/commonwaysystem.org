---
title: "Curb"
description: "The raised edge separating the roadway from the sidewalk or shoulder, marking the physical boundary between space allocated to vehicles and space allocated to pedestrians or the roadway edge condition."
patternId: ELM-CRB-01
status: recommended
date: 2026-08-31
llms: "The raised edge separating the roadway from the sidewalk or shoulder, marking the physical boundary between space allocated to vehicles and space allocated to pedestrians or the roadway edge condition."
---

<script>
  import { Citation, EvidenceChip, IdPill, PatternViewer, RelatedMedia } from '$lib/theme/components'
</script>

The raised edge separating the roadway from the sidewalk or shoulder, marking the physical boundary between space allocated to vehicles and space allocated to pedestrians or the roadway edge condition.

<PatternViewer image={fm.image} title={fm.title} classification="element" />

<RelatedMedia id={fm.patternId} />

## Why this pattern exists

The curb is the single most foundational physical element separating modes on a street; its height, material, and continuity determine drainage behavior, accessibility, and how legible the vehicle/pedestrian boundary reads to everyone using the street. Nearly every other Element pattern in this family (extensions, ramps, cuts) is a modification or interruption of this base condition, so it needs its own definition first.<Citation index={1} />

## Key considerations

- Height should be sufficient to discourage casual vehicle encroachment onto the sidewalk while not creating a tripping hazard where pedestrians cross it
- Material and profile should be durable against snowplow damage in climates where that applies
- Continuity matters: an interrupted or inconsistent curb line undermines drainage design and the clarity of the mode boundary

## Related patterns

<div class="cw-links">

- [Curb Extension](/patterns/elements/curb-extension/) <IdPill id="ELM-CBE-02" />
- [Curb Ramp](/patterns/elements/curb-ramp/) <IdPill id="ELM-CRP-03" />
- [Curb Cut/Driveway Apron](/patterns/elements/curb-cut-driveway-apron/) <IdPill id="ELM-CCA-04" /> (all modifications of this base element)
- [Crosswalk](/patterns/elements/crosswalk/) <IdPill id="ELM-CRW-08" /> (a common interruption point)

</div>

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> [Federal Highway Administration, *Designing Sidewalks and Trails for Access*, Chapter 4, Section 4.4.11 ("Roadway Design"). Curb height and material guidance by roadway functional class (Table 4-1).](https://www.fhwa.dot.gov/environment/bicycle_pedestrian/publications/sidewalks/chap4b.cfm)
