---
title: Uncontrolled
description: An intersection with no assigned right-of-way control, realistic only at the lowest density and traffic volumes.
patternId: INT-UNC-07
date: 2026-08-29
llms: An uncontrolled intersection with no assigned right-of-way control, realistic only at the lowest density and traffic volume tiers.
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Uncontrolled" classification="intersections">
An intersection with no stop, yield, signal, or roundabout control, right-of-way resolved informally by the drivers and other road users present.
</PatternCard>

Typical at: <DensityChip tier="Undeveloped" /> <DensityChip tier="Rural" />

Suburban is an edge case. Compact, Urban, and Core are unlikely pairings.

## Design notes

Uncontrolled intersections are only realistic where traffic volume is low enough on every approach that informal right-of-way resolution stays safe, which narrows this pattern to the lowest end of the density range.<Citation index={1} />

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> SWOV Institute for Road Safety Research, "Principles for a Safe Road Network."
