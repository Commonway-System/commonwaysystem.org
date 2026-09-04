---
title: Stop / Yield (Two-Way)
description: The lowest-volume intersection control, common from Undeveloped through Compact density and tapering off past that as volumes rise.
patternId: INT-SYD-05
date: 2026-08-29
llms: Two-way stop or yield intersection control, common from Undeveloped through Compact density and tapering off past that point as volumes rise.
---

<script>
  import { Citation, DensityChip, EvidenceChip, PatternCard, RelatedMedia } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Stop / Yield (Two-Way)" classification="intersections" status="situational">
An intersection where only the minor-street approaches stop or yield, and the major street proceeds without control.
</PatternCard>

<RelatedMedia id={fm.patternId} />

Typical at: <DensityChip tier="Undeveloped" /> <DensityChip tier="Rural" /> <DensityChip tier="Suburban" /> <DensityChip tier="Compact" />

Urban is an edge case. Core is an unlikely pairing.

## Design notes

Two-way stop or yield control is the lowest-volume intersection treatment in the Commonway System's set, realistic across the widest density range of any control type before tapering off past Compact, the same taper logic that applies to All-Way Stop one tier higher.<Citation index={1} />

## Related patterns

[All-Way Stop](/patterns/intersections/all-way-stop/) (INT-AWS-04) (the reciprocal pattern, explicitly named on this page as sharing the same taper logic one tier higher)

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> Manual on Uniform Traffic Control Devices, 11th Edition with Revision 1 (FHWA, December 2025; effective March 5, 2026), Section 2B.05 and 2B.10.
