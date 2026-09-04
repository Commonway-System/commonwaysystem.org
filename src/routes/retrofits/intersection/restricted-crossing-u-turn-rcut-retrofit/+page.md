---
title: "Restricted Crossing U-Turn (RCUT) retrofit"
description: "Reroutes both left-turn and through movements from the minor road, requiring drivers to turn right onto the major road first, then complete a U-turn at a designated median crossover."
patternId: RFT-INT-03
date: 2026-09-03
llms: "Also known as a J-turn or superstreet, reroutes both left-turn and through movements from the minor road to a right turn plus U-turn at a median crossover, letting the main intersection focus on major-road through traffic."
---

<script>
  import { Citation, EvidenceChip, RelatedMedia, RetrofitCard } from '$lib/theme/components'
</script>

<RetrofitCard id={fm.patternId} title="Restricted Crossing U-Turn (RCUT) retrofit" scale="intersection">
Reroutes both left-turn and through movements from the minor road, requiring drivers to turn right onto the major road first, then complete a U-turn at a designated median crossover. Also known as a J-turn or superstreet.
</RetrofitCard>

## Overview

RCUT goes a step further than a standard median U-turn retrofit: it removes the minor road's direct through movement across the major road entirely, not just its left turn. A driver crossing the major road from the minor approach turns right, merges, then makes a U-turn to continue in the direction they originally needed. This lets the main intersection focus entirely on major-road through movement, since it no longer needs to serve conflicting minor-road crossing traffic at all.

<RelatedMedia id={fm.patternId} />

## Where this leads: Target patterns

[Restricted Crossing U-Turn (RCUT)](/patterns/intersections/restricted-crossing-u-turn/) (INT-RCU-13)

## Applicability and thresholds

Used primarily on high-speed, four-lane-or-larger divided highways, both signalized and unsignalized versions exist, with median width sized to the design vehicle's turning requirements.<Citation index={1} /> Particularly beneficial where large trucks are common, since the design gives them a single direction of traffic to focus on rather than requiring a gap-judgment across the full width of opposing traffic.

## Evidence and effectiveness

FHWA reports RCUT intersections reduce fatal and injury crashes substantially compared to the conventional intersections they replace, primarily by eliminating the right-angle and left-turn crash types associated with direct crossing and turning movements at a conventional design.<Citation index={3} />

## Getting it built

Cannot be piloted informally. Wisconsin DOT notes RCUT designs are easily retrofitted, often without purchasing additional right-of-way, since the crossover reuses existing median width, but the crossover construction itself is still real, permanent infrastructure.<Citation index={2} /> This strategy effectively starts at Permanent on the construction spectrum. See [Construction Methodology & The Build Spectrum](/guide/construction-methodology-spectrum/).

An Intersection Control Evaluation is standard practice for this geometry. See [Decision & Evaluation Processes](/guide/decision-evaluation-processes/).

## Who can move this

Typically a state DOT capital project, since RCUT is used almost exclusively on state-maintained highways rather than local streets. See [Legal & Planning Mechanisms](/guide/legal-planning-mechanisms/).

## Related retrofit strategies

[Median U-Turn (MUT) retrofit](/retrofits/intersection/median-u-turn-mut-retrofit/) (RFT-INT-02) (the related, less restrictive geometry that still allows a direct minor-road through movement), [Displaced Left-Turn (DLT) retrofit](/retrofits/intersection/displaced-left-turn-dlt-retrofit/) (RFT-INT-04) (an alternative approach to the same unprotected-left-turn and through-crossing problem)

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> Texas Department of Transportation, "14.6 Restricted Crossing U-Turn Intersection (RCUT)."
2. <span id="ref-2"></span><EvidenceChip tier="precedent" /> Wisconsin Department of Transportation, "Restricted Crossing U-Turn (RCUT) Intersections."
3. <span id="ref-3"></span><EvidenceChip tier="evidence" /> Kentucky Transportation Cabinet, "Reduced Conflict U-Turn," SAFERoads Solutions, before-after crash data.
