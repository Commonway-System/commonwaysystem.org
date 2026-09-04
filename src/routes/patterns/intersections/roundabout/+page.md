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

<PatternCard id={fm.patternId} title="Roundabout (Single / Multi-Lane)" classification="intersections" status="recommended">
A circular intersection where entering traffic yields to the circulating flow, sized single or multi-lane to the volume it carries.
</PatternCard>

Typical at: <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Rural is an edge case. Undeveloped is an unlikely pairing.

## Design notes

Roundabout is the default control wherever two Collector-or-higher streets meet within the Commonway System's intersection philosophy. Traffic signals remain available but only as a documented last resort, and turbo-roundabouts take over at the highest-volume Arterial-to-Arterial junctions.<Citation index={1} /><Citation index={2} />

## Related patterns

[Turbo-Roundabout](/patterns/intersections/turbo-roundabout/) (INT-TRB-02) (the step up for higher-volume Arterial-to-Arterial junctions, per this page), [Signal](/patterns/intersections/signal/) (INT-SIG-03) (the alternative control competing for the same higher-volume intersections, per Signal's own Design notes), [Neighborhood Traffic Circle / Mini-Roundabout](/patterns/elements/neighborhood-traffic-circle-mini-roundabout/) (ELM-NTC-46) (the much smaller, unsized analogue for a Local-to-Local intersection)

## Getting there: Retrofit path options

[Signal-to-roundabout conversion](/retrofits/intersection/signal-to-roundabout-conversion/) (RFT-INT-01)

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> Rodegerdts, L. et al., *Roundabouts: An Informational Guide*, 2nd ed., NCHRP Report 672 (Washington, DC: Transportation Research Board, 2010).
2. <span id="ref-2"></span><EvidenceChip tier="evidence" /> Persaud, B. et al., "Safety Effect of Roundabout Conversions in the United States: Empirical Bayes Observational Before-After Study," Insurance Institute for Highway Safety (2001).
