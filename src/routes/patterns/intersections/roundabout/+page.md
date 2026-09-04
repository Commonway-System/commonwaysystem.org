---
title: Roundabout (Single / Multi-Lane)
description: The default intersection control wherever two Collector-or-higher streets meet, per the Commonway System's locked intersection philosophy.
patternId: INT-RAB-01
date: 2026-08-29
llms: The default intersection control wherever two Collector-or-higher streets meet, single or multi-lane, per the Commonway System's locked intersection philosophy.
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Roundabout (Single / Multi-Lane)" classification="intersections">
A circular intersection where entering traffic yields to the circulating flow, sized single or multi-lane to the volume it carries.
</PatternCard>

Typical at: <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Rural is an edge case. Undeveloped is an unlikely pairing.

## Design notes

Roundabout is the default control wherever two Collector-or-higher streets meet within the Commonway System's intersection philosophy. Traffic signals remain available but only as a documented last resort, and turbo-roundabouts take over at the highest-volume Arterial-to-Arterial junctions.<Citation index={1} /><Citation index={2} />

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> Rodegerdts, L. et al., *Roundabouts: An Informational Guide*, 2nd ed., NCHRP Report 672 (Washington, DC: Transportation Research Board, 2010).
2. <span id="ref-2"></span><EvidenceChip tier="evidence" /> Persaud, B. et al., "Safety Effect of Roundabout Conversions in the United States: Empirical Bayes Observational Before-After Study," Insurance Institute for Highway Safety (2001).
