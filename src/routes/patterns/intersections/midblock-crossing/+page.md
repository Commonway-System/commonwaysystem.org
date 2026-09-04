---
title: Midblock Pedestrian Crossing
description: A dedicated pedestrian crossing placed between intersections, used where block length or destination demand makes waiting for the corner impractical.
patternId: INT-MPC-08
date: 2026-08-29
llms: A dedicated pedestrian crossing placed between intersections, used where block length or destination demand makes waiting for the corner impractical.
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Midblock Pedestrian Crossing" classification="intersections">
A marked, and typically signalized or raised, pedestrian crossing placed mid-block rather than at a corner, serving a specific crossing demand between intersections.
</PatternCard>

Typical at: <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Suburban is an edge case. Undeveloped and Rural are unlikely pairings.

## Design notes

Midblock crossings supplement, rather than replace, intersection-level crossing treatment. They concentrate at higher density, where longer blocks and denser pedestrian destinations make a corner-only crossing pattern insufficient on its own.<Citation index={1} />

## References

1. <span id="ref-1"></span><EvidenceChip tier="evidence" /> Zegeer, C. et al., "Safety Effects of Marked vs. Unmarked Crosswalks at Uncontrolled Locations," FHWA-RD-01-075 (Federal Highway Administration, 2002).
