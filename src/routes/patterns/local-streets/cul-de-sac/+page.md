---
title: Cul-de-sac
description: A dead-end Local Typology, Situational status, that peaks at Suburban density and thins out toward Urban and Core.
patternId: LOC-CDS-03
date: 2026-08-29
llms: A dead-end Local street typology, marked Situational, that peaks at Suburban density and becomes incompatible with Urban and Core connectivity.
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Cul-de-sac" classification="local" status="situational">
A dead-end Local street with no through connection for any mode.
</PatternCard>

Typical at: <DensityChip tier="Suburban" />

Compact is an edge case. Undeveloped, Rural, Urban, and Core are unlikely pairings.

:::warning
Cul-de-sac carries Situational status. The connectivity and walkability expectations that define Urban and Core density are close to incompatible with a dead-end street pattern, so this Typology's realistic range is narrow, peaking at Suburban.<Citation index={1} />
:::

## Modal hierarchy

Pedestrian, then Bicycle, then Vehicle, then Freight, the Local base order minus Transit, since a dead-end street rarely carries a transit route.

## Design notes

A cul-de-sac trades network connectivity for a quiet, low-through-traffic environment. That trade only holds up at lower densities, where a disconnected street grid does not yet conflict with pedestrian and bicycle route continuity.

## References

1. <span id="ref-1"></span><EvidenceChip tier="evidence" /> Marshall, W.E. and Garrick, N.W. (2011), "Street network types and road safety: A study of 24 California cities," *Urban Design International* 16(2).
