---
title: Midblock Pedestrian Crossing
description: A dedicated pedestrian crossing placed between intersections, used where block length or destination demand makes waiting for the corner impractical.
patternId: INT-MPC-08
status: recommended
date: 2026-08-29
llms: A dedicated pedestrian crossing placed between intersections, used where block length or destination demand makes waiting for the corner impractical.
---

<script>
  import { Citation, DensityChip, EvidenceChip, IdPill, PatternViewer, RelatedMedia } from '$lib/theme/components'
</script>

A marked, and typically signalized or raised, pedestrian crossing placed mid-block rather than at a corner, serving a specific crossing demand between intersections.

<PatternViewer image={fm.image} title={fm.title} classification="intersections" />

<RelatedMedia id={fm.patternId} />

<div class="cw-context">

<span class="cw-context__label">Typical at:</span> <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Suburban is an edge case. Undeveloped and Rural are unlikely pairings.

</div>

## Design notes

Midblock crossings supplement, rather than replace, intersection-level crossing treatment. They concentrate at higher density, where longer blocks and denser pedestrian destinations make a corner-only crossing pattern insufficient on its own.<Citation index={1} />

## Related patterns

<div class="cw-links">

- [Crosswalk](/patterns/elements/crosswalk/) <IdPill id="ELM-CRW-08" /> (the Element-scale pattern this is a specific placement context for)
- [Pedestrian Hybrid Beacon](/patterns/elements/pedestrian-hybrid-beacon/) <IdPill id="ELM-PHB-18" /> (the Element most often used to control this crossing type at higher speeds or volumes)

</div>

## References

1. <span id="ref-1"></span><EvidenceChip tier="evidence" /> [Zegeer, C. et al., "Safety Effects of Marked vs. Unmarked Crosswalks at Uncontrolled Locations," FHWA-RD-01-075 (Federal Highway Administration, 2002).](https://rosap.ntl.bts.gov/view/dot/15480/dot_15480_DS1.pdf)
