---
title: "Restricted Crossing U-Turn (RCUT)"
description: "An at-grade intersection design in which minor-road through and left-turn movements are removed entirely and redirected via a right turn followed by a U-turn at a designated median crossover."
patternId: INT-RCU-13
date: 2026-09-03
llms: "An at-grade intersection design, also known as a J-turn or superstreet, that removes minor-road through and left-turn movements entirely, redirecting them via a right turn and a U-turn at a median crossover, Situational on high-speed divided highways."
---

<script>
  import { Citation, DensityChip, EvidenceChip, PatternCard, RelatedMedia } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Restricted Crossing U-Turn (RCUT)" classification="intersections" status="situational">
An at-grade intersection design in which minor-road through and left-turn movements are removed entirely and redirected via a right turn followed by a U-turn at a designated median crossover. Also known as a J-turn or superstreet.
</PatternCard>

<RelatedMedia id={fm.patternId} />

Typical at: <DensityChip tier="Rural" /> <DensityChip tier="Suburban" />

Compact is an edge case. Urban and Core are unlikely pairings.

*Working assessment: this pattern's status reflects a preliminary Commonway System judgment call, pending final review.*

## Design notes

RCUT goes further than a Median U-Turn intersection by removing the minor road's direct crossing movement as well as its left turn, letting the main intersection serve the major road's through traffic with minimal minor-road interference. This design carries particular benefit for large trucks, since a driver only has to judge a gap in one direction of traffic at a time rather than crossing the full width of a divided highway at once. Like Median U-Turn, this pattern is Situational: it's a strong fit for a high-speed, four-lane-or-larger divided highway, and a poor fit anywhere lower speed or lower volume already makes a Roundabout the better default.

## Related patterns

[Median U-Turn](/patterns/intersections/median-u-turn/) (INT-MUT-12) (the related, less restrictive geometry that still allows a direct minor-road through movement), [Displaced Left-Turn](/patterns/intersections/displaced-left-turn/) (INT-DLT-14) (an alternative approach to the same unprotected-left-turn and through-crossing problem), [Signal](/patterns/intersections/signal/) (INT-SIG-03) (the conventional intersection this pattern modifies rather than replaces outright)

## Getting there: Retrofit path options

[Restricted Crossing U-Turn (RCUT) retrofit](/retrofits/intersection/restricted-crossing-u-turn-rcut-retrofit/) (RFT-INT-03) reroutes an existing conventional intersection's minor-road movements to this geometry.

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> Texas Department of Transportation, "14.6 Restricted Crossing U-Turn Intersection (RCUT)."
2. <span id="ref-2"></span><EvidenceChip tier="precedent" /> Wisconsin Department of Transportation, "Restricted Crossing U-Turn (RCUT) Intersections."
3. <span id="ref-3"></span><EvidenceChip tier="evidence" /> Kentucky Transportation Cabinet, "Reduced Conflict U-Turn," SAFERoads Solutions, before-after crash data.
