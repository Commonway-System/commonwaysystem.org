---
title: All-Way Stop
description: A stop-controlled intersection where every approach stops, tapering off past Compact and Urban density as volumes exceed safe stop-control capacity.
patternId: INT-AWS-04
date: 2026-08-29
llms: A stop-controlled intersection where every approach stops, tapering off past Compact and Urban density as intersection volumes exceed what stop control can safely handle.
---

<script>
  import { Citation, DensityChip, EvidenceChip, PatternCard, RelatedMedia } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="All-Way Stop" classification="intersections" status="situational">
An intersection where every approach carries a stop sign, with right-of-way determined by arrival order.
</PatternCard>

<RelatedMedia id={fm.patternId} />

Typical at: <DensityChip tier="Suburban" /> <DensityChip tier="Compact" />

Rural and Urban are edge cases. Undeveloped and Core are unlikely pairings.

## Design notes

All-Way Stop tapers off past Compact and Urban density, as intersection volumes exceed what stop control can handle safely. This is the same taper logic that applies to Stop/Yield control, just shifted one tier higher on the density range.<Citation index={1} />

## Related patterns

[Stop / Yield (Two-Way)](/patterns/intersections/stop-yield/) (INT-SYD-05) (explicitly named on this page as sharing the same density-taper logic, one tier lower), [Neighborhood Traffic Circle / Mini-Roundabout](/patterns/elements/neighborhood-traffic-circle-mini-roundabout/) (ELM-NTC-46) (a control type this pattern sometimes replaces at a Local intersection)

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> Manual on Uniform Traffic Control Devices, 11th Edition with Revision 1 (FHWA, December 2025; effective March 5, 2026), Section 2B.13-2B.17.
