---
title: All-Way Stop
description: A stop-controlled intersection where every approach stops, tapering off past Compact and Urban density as volumes exceed safe stop-control capacity.
patternId: INT-AWS-04
date: 2026-08-29
llms: A stop-controlled intersection where every approach stops, tapering off past Compact and Urban density as intersection volumes exceed what stop control can safely handle.
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="All-Way Stop" classification="intersections">
An intersection where every approach carries a stop sign, with right-of-way determined by arrival order.
</PatternCard>

Typical at: <DensityChip tier="Suburban" /> <DensityChip tier="Compact" />

Rural and Urban are edge cases. Undeveloped and Core are unlikely pairings.

## Design notes

All-Way Stop tapers off past Compact and Urban density, as intersection volumes exceed what stop control can handle safely. This is the same taper logic that applies to Stop/Yield control, just shifted one tier higher on the density range.<Citation index={1} />

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> Manual on Uniform Traffic Control Devices, 11th Edition with Revision 1 (FHWA, December 2025; effective March 5, 2026), Section 2B.13-2B.17.
