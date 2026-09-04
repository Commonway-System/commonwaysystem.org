---
title: Beltway / Ring Road
description: A Freeway Typology circling a city or metro area rather than passing through its core. Out of the Commonway System's detailed design scope.
patternId: FRE-BLT-03
date: 2026-08-29
llms: A Freeway street typology circling a city or metro area rather than passing through its core. Out of the Commonway System's detailed design scope.
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Beltway / Ring Road" classification="freeway" status="recommended">
A limited-access Freeway circling a metro area's outer edge, connecting radial corridors without routing through-traffic into the urban core. Out of the Commonway System's detailed design scope.<Citation index={1} />
</PatternCard>

Typical at: <DensityChip tier="Rural" /> <DensityChip tier="Suburban" />

Undeveloped, Compact, and Urban are edge cases. Core is an unlikely pairing.

## Design notes

A Beltway's purpose, routing traffic around a metro area rather than through its densest core, means it realistically sits at Rural and Suburban density even in large metros, with Compact and Urban only appearing as the ring tightens around a fast-growing edge.

## Related patterns

[Default (Freeway)](/patterns/freeways/default/) (FRE-DEF-01) (the base form this extends), [Radial](/patterns/network/radial/) (NET-RAD-03) (the Network topology a Beltway completes by connecting radial corridors around, rather than through, the core)

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> FHWA, *Highway Functional Classification Concepts, Criteria and Procedures*.
