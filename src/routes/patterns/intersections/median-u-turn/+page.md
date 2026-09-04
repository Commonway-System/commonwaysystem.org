---
title: "Median U-Turn (MUT)"
description: "An intersection where left-turn movements from both the major and minor approaches are removed from the main crossing and rerouted through a downstream median crossover."
patternId: INT-MUT-12
date: 2026-09-03
llms: "An intersection where left-turn movements from both approaches are removed from the main crossing and rerouted through a downstream median crossover, Situational on wide, higher-speed divided roads."
---

<script>
  import { Citation, DensityChip, EvidenceChip, PatternCard, RelatedMedia } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Median U-Turn (MUT)" classification="intersections" status="situational">
An intersection where left-turn movements from both the major and minor approaches are removed from the main crossing and rerouted through a downstream median crossover, requiring a driver to travel past the intersection, make a U-turn, then complete the turn from the opposite direction.
</PatternCard>

<RelatedMedia id={fm.patternId} />

Typical at: <DensityChip tier="Rural" /> <DensityChip tier="Suburban" />

Compact is an edge case. Urban and Core are unlikely pairings.

*Working assessment: this pattern's status reflects a preliminary Commonway System judgment call, pending final review.*

## Design notes

This geometry exists to remove unprotected left turns from a major intersection entirely, rather than managing them with a longer signal phase. Doing so shortens the signal cycle the main intersection needs to run and reduces the conflict points a driver has to judge in a single movement. The tradeoff is a longer path for the rerouted turn and the median width needed to accommodate it, which is why this pattern is Situational rather than broadly Recommended: it solves a real problem well on a wide, higher-speed divided road, but doesn't fit a narrower cross-section or a genuinely low-speed context where Roundabout or a conventional Signal remains the better fit.

## Related patterns

[Restricted Crossing U-Turn](/patterns/intersections/restricted-crossing-u-turn/) (INT-RCU-13) (the related, more restrictive geometry that also removes the minor road's direct through movement), [Displaced Left-Turn](/patterns/intersections/displaced-left-turn/) (INT-DLT-14) (an alternative approach to the same unprotected-left-turn problem), [Signal](/patterns/intersections/signal/) (INT-SIG-03) (the conventional intersection this pattern modifies rather than replaces outright)

## Getting there: Retrofit path options

[Median U-Turn (MUT) retrofit](/retrofits/intersection/median-u-turn-mut-retrofit/) (RFT-INT-02) reroutes an existing conventional intersection's left-turn and through movements to this geometry.

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> Indiana Department of Transportation, "Median U-turns."
2. <span id="ref-2"></span><EvidenceChip tier="legal" /> Federal Highway Administration, "Chapter 2. Intersections," *Handbook for Designing Roadways for the Aging Population*.
