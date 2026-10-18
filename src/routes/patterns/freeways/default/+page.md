---
title: Default (Freeway)
description: The baseline Freeway typology, a limited-access road, intentionally out of the Commonway System's detailed design scope.
patternId: FRE-DEF-01
status: recommended
date: 2026-08-29
llms: The baseline Freeway typology, a limited-access road, listed for completeness but intentionally out of the Commonway System's detailed design scope.
---

<script>
  import { Citation, DensityChip, EvidenceChip, IdPill, PatternViewer, RelatedMedia } from '$lib/theme/components'
</script>

A limited-access road with grade-separated interchanges and no direct property access. Freeway is intentionally out of the Commonway System's detailed design scope; no modal hierarchy or speed regulation applies within CS.<Citation index={1} />

<PatternViewer image={fm.image} title={fm.title} classification="freeway" />

<RelatedMedia id={fm.patternId} />

<div class="cw-context">

<span class="cw-context__label">Typical at:</span> <DensityChip tier="Undeveloped" /> <DensityChip tier="Rural" /> <DensityChip tier="Suburban" /> <DensityChip tier="Compact" />

Urban is an edge case. Core is an unlikely pairing, marked unlikely rather than edge case on purpose: a limited-access road cutting through a Core-density area is the kind of pattern the Commonway System would flag for retrofit, not treat as a realistic design target.

</div>

## Design notes

Freeway entries are listed in the Commonway System for completeness and cross-reference, not as a detailed design guide the way Local, Collector, and Arterial patterns are. CS's scope is street and road design; Freeway-scale interchange and alignment design belongs to a different discipline.

## Related patterns

<div class="cw-links">

- [Grade-Separated Interchange](/patterns/intersections/grade-separated-interchange/) <IdPill id="INT-GSI-10" /> (the Intersection pattern governing where this pattern's design guidance resumes)
- [Default (No Parking, No Direct Property Access)](/patterns/arterials/default/) <IdPill id="ART-DEF-01" /> (the Arterial pattern a Freeway interchange typically connects into)

</div>

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> [FHWA, *Highway Functional Classification Concepts, Criteria and Procedures*.](https://www.fhwa.dot.gov/planning/processes/statewide/related/hwy-functional-classification-2023.pdf)
