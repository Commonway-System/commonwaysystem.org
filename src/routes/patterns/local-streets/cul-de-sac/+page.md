---
title: Cul-de-sac
description: A dead-end Local Typology, Situational status, that peaks at Suburban density and thins out toward Urban and Core.
patternId: LOC-CDS-03
date: 2026-08-29
llms: A dead-end Local street typology, marked Situational, that peaks at Suburban density and becomes incompatible with Urban and Core connectivity.
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation, SpeedModalHierarchyCard, SpeedLimitSection, ModalHierarchySection } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Cul-de-sac" classification="local" status="situational">
A dead-end Local street with no through connection for any mode.
</PatternCard>

Typical at: <DensityChip tier="Suburban" />

Compact is an edge case. Undeveloped, Rural, Urban, and Core are unlikely pairings.

:::warning
Cul-de-sac carries Situational status. The connectivity and walkability expectations that define Urban and Core density are close to incompatible with a dead-end street pattern, so this Typology's realistic range is narrow, peaking at Suburban.<Citation index={1} />
:::

## Speed and modal hierarchy

<SpeedModalHierarchyCard>
<SpeedLimitSection speeds={[20]}>
Follows the Local default: 20 mph hard maximum, no exceptions.

</SpeedLimitSection>
<ModalHierarchySection classification="local" rows={[{ tiers: ['pedestrian', 'bicycle', 'vehicle', 'freight'] }]}>
The Local base order minus Transit, since a dead-end street rarely carries a transit route.

</ModalHierarchySection>

</SpeedModalHierarchyCard>

## Design notes

A cul-de-sac trades network connectivity for a quiet, low-through-traffic environment. That trade only holds up at lower densities, where a disconnected street grid does not yet conflict with pedestrian and bicycle route continuity.

## Related patterns

[Grid](/patterns/network/grid/) (NET-GRD-01) (the connected Network topology this pattern structurally departs from, the basis of this page's cited connectivity/safety research), [Default (Standard Local Street)](/patterns/local-streets/default/) (LOC-DEF-01) (the base order this pattern drops Transit from)

## References

1. <span id="ref-1"></span><EvidenceChip tier="evidence" /> Marshall, W.E. and Garrick, N.W. (2011), "Street network types and road safety: A study of 24 California cities," *Urban Design International* 16(2).
