---
title: Alley
description: A narrow Local Typology carrying service and driveway access, with vehicle and freight movement prioritized over through pedestrian and bicycle traffic.
patternId: LOC-ALY-02
status: recommended
date: 2026-08-29
image: /patterns/loc-aly-02-alley.png
llms: A narrow Local street typology for service and driveway access, where vehicle and freight movement outrank pedestrian and bicycle through-traffic.
---

<script>
  import { Citation, DensityChip, EvidenceChip, IdPill, ModalHierarchySection, PatternViewer, RelatedMedia, SpeedLimitSection, SpeedModalHierarchyCard } from '$lib/theme/components'
</script>

A narrow Local street serving rear or side property access, service vehicles, and utility placement rather than through movement of any mode.

<PatternViewer image={fm.image} title={fm.title} classification="local" />

<RelatedMedia id={fm.patternId} />

<div class="cw-context">

<span class="cw-context__label">Typical at:</span> <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Suburban is an edge case. Undeveloped and Rural contexts are unlikely to carry a purpose-built alley.

</div>

## Speed and modal hierarchy

<SpeedModalHierarchyCard>
<SpeedLimitSection speeds={[20]}>
Follows the Local default: 20 mph hard maximum, no exceptions.

</SpeedLimitSection>
<ModalHierarchySection classification="local" rows={[{ tiers: ['vehicle', 'freight', 'pedestrian', 'bicycle', 'transit'] }]}>
Alley inverts the Local base order. The override is justified because the Typology's stated purpose is service and driveway access, not through movement, one of the closed set of triggers that permits a departure from the base order.<Citation index={1} />

</ModalHierarchySection>

</SpeedModalHierarchyCard>

## Design notes

Because an alley is not a through-route for people walking or biking, its narrow width and service function do not conflict with the 20 mph Local speed cap. The override applies to mode priority, not to the speed rule.

On a bridge, or where it passes under a rail viaduct, this pattern carries through unchanged: its sidewalks, bike lanes, separation and speed continue across the structure. See [Streets on Bridges](/guide/streets-on-bridges/).

## Related patterns

<div class="cw-links">

- [Default (Standard Local Street)](/patterns/local-streets/default/) <IdPill id="LOC-DEF-01" /> (the base modal order this pattern inverts)
- [Curb Cut / Driveway Apron](/patterns/elements/curb-cut-driveway-apron/) <IdPill id="ELM-CCA-04" /> (the Element governing the driveway access this Typology exists to serve)

</div>

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> [NACTO, *Urban Street Design Guide*, "Green Alley" and "Commercial Alley."](https://nacto.org/publication/urban-street-design-guide/streets/green-alley/)
