---
title: "Crosswalk"
description: "A marked pedestrian crossing point, located at an intersection or midblock, delineated with pavement markings ranging from a simple two-line crosswalk to high-visibility continental or ladder striping."
patternId: ELM-CRW-08
date: 2026-08-31
llms: "A marked pedestrian crossing point, located at an intersection or midblock, delineated with pavement markings ranging from a simple two-line crosswalk to high-visibility continental or ladder striping."
---

<script>
  import { PatternCard, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Crosswalk" classification="element" status="recommended">
A marked pedestrian crossing point, located at an intersection or midblock, delineated with pavement markings ranging from a simple two-line crosswalk to high-visibility continental or ladder striping.
</PatternCard>

*Working assessment: this pattern’s status reflects a preliminary Commonway System judgment call, pending final review.*

## Why this pattern exists

A crosswalk establishes a legally and visually defined place for pedestrians to cross, giving both pedestrians and drivers a shared, predictable expectation about where crossing will occur. This pattern exists to document marking types and the considerations that determine where and how a crossing should be marked, distinct from the signals or islands that may accompany it.<Citation index={2} />

## Key considerations

- Marking visibility (continental/ladder striping vs. simple parallel lines) should scale with vehicle speed and pedestrian volume at the location
- A marked crosswalk alone does not guarantee driver yielding; higher-speed or multi-lane crossings typically need a supporting treatment (signal, beacon, refuge island)<Citation index={1} />
- Midblock crossings need particular care in sight-distance and driver expectation, since they occur outside the predictable intersection pattern

## Related patterns

[Pedestrian Safety Island/Refuge](/patterns/elements/pedestrian-safety-island-refuge/) (ELM-PSI-09), [Detectable Warning Surface](/patterns/elements/detectable-warning-surface/) (ELM-DWS-10), [Curb Ramp](/patterns/elements/curb-ramp/) (ELM-CRP-03) (companion elements at any crossing); [RRFB](/patterns/elements/rrfb/) (ELM-RRF-17), [Pedestrian Hybrid Beacon](/patterns/elements/pedestrian-hybrid-beacon/) (ELM-PHB-18) (supporting treatments for higher-speed or higher-volume crossings)

## References

1. <span id="ref-1"></span><EvidenceChip tier="evidence" /> Zegeer, C. et al., "Safety Effects of Marked Versus Unmarked Crosswalks at Uncontrolled Locations," FHWA-RD-01-075 (2002). A study of 1,000 marked and 1,000 unmarked sites, basis for the finding that markings alone aren't sufficient at higher speed, volume, or multi-lane crossings.
2. <span id="ref-2"></span><EvidenceChip tier="legal" /> MUTCD 11th Edition with Revision 1 (FHWA, December 2025; effective March 5, 2026), Part 3 (Markings). Governs marking types, including transverse lines and continental/ladder striping.
