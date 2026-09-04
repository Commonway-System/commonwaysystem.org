---
title: Grade-Separated Interchange
description: Freeway-scale intersection treatment, an acknowledged fallback for volume or speed beyond what a turbo-roundabout can manage.
patternId: INT-GSI-10
date: 2026-08-29
llms: Freeway-scale grade-separated intersection treatment, an acknowledged fallback for genuinely freeway-scale volume or speed beyond what a turbo-roundabout can manage.
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Grade-Separated Interchange" classification="intersections" status="situational">
An interchange carrying conflicting movements on separate vertical levels, connected by ramps, eliminating at-grade conflict entirely. Freeway-scale only.
</PatternCard>

Typical at: <DensityChip tier="Undeveloped" /> <DensityChip tier="Rural" /> <DensityChip tier="Suburban" />

Compact and Urban are edge cases. Core is an unlikely pairing.

## Design notes

This is an acknowledged fallback for genuinely Freeway-scale volume or speed beyond what even a turbo-roundabout can manage, not a general-purpose alternative to the Commonway System's roundabout-first intersection philosophy. It stays confined to the density range where full Freeway-scale roads themselves are realistic.<Citation index={1} />

## Related patterns

[Default (Freeway)](/patterns/freeways/default/) (FRE-DEF-01) (reciprocal link to the Freeway-scale pattern this connects into), [Turbo-Roundabout](/patterns/intersections/turbo-roundabout/) (INT-TRB-02) (explicitly named on this page as the tier just below it), [Displaced Left-Turn](/patterns/intersections/displaced-left-turn/) (INT-DLT-14) (the faster, lower-cost alternative often chosen over this pattern at high-volume urban and suburban intersections)

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> American Association of State Highway and Transportation Officials, *A Policy on Geometric Design of Highways and Streets*.
