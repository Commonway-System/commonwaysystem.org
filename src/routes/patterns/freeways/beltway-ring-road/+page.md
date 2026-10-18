---
title: Beltway / Ring Road
description: A Freeway Typology circling a city or metro area rather than passing through its core. Out of the Commonway System's detailed design scope.
patternId: FRE-BLT-03
status: recommended
date: 2026-08-29
llms: A Freeway street typology circling a city or metro area rather than passing through its core. Out of the Commonway System's detailed design scope.
---

<script>
  import { Citation, DensityChip, EvidenceChip, IdPill, PatternViewer, RelatedMedia } from '$lib/theme/components'
</script>

A limited-access Freeway circling a metro area's outer edge, connecting radial corridors without routing through-traffic into the urban core. Out of the Commonway System's detailed design scope.<Citation index={1} />

<PatternViewer image={fm.image} title={fm.title} classification="freeway" />

<RelatedMedia id={fm.patternId} />

<div class="cw-context">

<span class="cw-context__label">Typical at:</span> <DensityChip tier="Rural" /> <DensityChip tier="Suburban" />

Undeveloped, Compact, and Urban are edge cases. Core is an unlikely pairing.

</div>

## Design notes

A Beltway's purpose, routing traffic around a metro area rather than through its densest core, means it realistically sits at Rural and Suburban density even in large metros, with Compact and Urban only appearing as the ring tightens around a fast-growing edge.

## Related patterns

<div class="cw-links">

- [Default (Freeway)](/patterns/freeways/default/) <IdPill id="FRE-DEF-01" /> (the base form this extends)
- [Radial](/patterns/network/radial/) <IdPill id="NET-RAD-03" /> (the Network topology a Beltway completes by connecting radial corridors around, rather than through, the core)

</div>

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> [FHWA, *Highway Functional Classification Concepts, Criteria and Procedures*.](https://www.fhwa.dot.gov/planning/processes/statewide/related/hwy-functional-classification-2023.pdf)
