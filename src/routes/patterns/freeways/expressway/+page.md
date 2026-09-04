---
title: Expressway
description: A Freeway Typology with partial access control, sitting between a full Freeway and an Arterial. Out of the Commonway System's detailed design scope.
patternId: FRE-EXP-02
date: 2026-08-29
llms: A Freeway street typology with partial access control, between a full Freeway and an Arterial in character. Out of the Commonway System's detailed design scope.
---

<script>
  import { Citation, DensityChip, EvidenceChip, PatternCard, RelatedMedia } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Expressway" classification="freeway" status="recommended">
A high-speed road with partial access control, some at-grade intersections remain, unlike a fully grade-separated Freeway. Out of the Commonway System's detailed design scope.<Citation index={1} />
</PatternCard>

<RelatedMedia id={fm.patternId} />

Typical at: <DensityChip tier="Rural" /> <DensityChip tier="Suburban" /> <DensityChip tier="Compact" />

Undeveloped and Urban are edge cases. Core is an unlikely pairing.

## Design notes

Expressway sits between full Freeway and Arterial in character, partial rather than complete access control, which is why its realistic density range skews slightly narrower than the full Freeway Default entry.

## Related patterns

[Default (Freeway)](/patterns/freeways/default/) (FRE-DEF-01) (the fully grade-separated form this sits just short of), [Default (No Parking, No Direct Property Access)](/patterns/arterials/default/) (ART-DEF-01) (the Arterial-scale end of the spectrum this sits between), [Signal](/patterns/intersections/signal/) (INT-SIG-03) (the control type governing the at-grade intersections this pattern still retains)

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> FHWA, *Highway Functional Classification Concepts, Criteria and Procedures*.
