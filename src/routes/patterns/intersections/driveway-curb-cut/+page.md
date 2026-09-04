---
title: Driveway / Curb Cut
description: A minor access-point junction connecting a driveway or parking entrance to the street, realistic across nearly the full density range but dropping at Core.
patternId: INT-DCC-09
date: 2026-08-29
llms: A minor access-point junction connecting a driveway or parking entrance to the street, realistic across nearly the full density range but dropping off at Core density.
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Driveway / Curb Cut" classification="intersections" status="situational">
A break in the curb and sidewalk giving a driveway or parking entrance access to the street, a minor junction rather than a full intersection.
</PatternCard>

Typical at: <DensityChip tier="Undeveloped" /> <DensityChip tier="Rural" /> <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" />

Core is an edge case.

## Design notes

Driveways and curb cuts drop off at Core density, not because access needs disappear there, but because dense Core contexts typically consolidate individual curb cuts into shared alley or rear access instead, reducing how often each individual property needs its own street-facing break in the curb.<Citation index={1} />

## Related patterns

[Curb Cut / Driveway Apron](/patterns/elements/curb-cut-driveway-apron/) (ELM-CCA-04) (the Element-scale counterpart to this junction-level pattern), [Alley](/patterns/local-streets/alley/) (LOC-ALY-02) (the Local Typology whose purpose is moving this kind of access to the rear)

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> U.S. Access Board, Public Right-of-Way Accessibility Guidelines (PROWAG), Section R302, "Pedestrian Access Routes."
