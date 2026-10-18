---
title: "Displaced Left-Turn (DLT) retrofit"
description: "Shifts the left-turn lane to the opposing side of oncoming traffic upstream of the main intersection, letting left-turning and opposing through traffic move simultaneously without a dedicated protected phase."
patternId: RFT-INT-04
date: 2026-09-03
llms: "Also known as a continuous flow intersection, shifts the left-turn lane to the opposing side of oncoming traffic upstream, letting left-turning and through traffic move simultaneously, a lower-cost alternative to a grade-separated interchange."
---

<script>
  import { Citation, EvidenceChip, IdPill, PatternViewer, RelatedMedia } from '$lib/theme/components'
</script>

Shifts the left-turn lane to the opposing side of oncoming traffic upstream of the main intersection, letting left-turning and opposing through traffic move simultaneously without a dedicated protected phase.

<PatternViewer image={fm.image} title={fm.title} classification="intersections" retrofit />

## Overview

Also known as a continuous flow intersection, this retrofit resolves the same unprotected-left-turn conflict that Median U-Turn and RCUT address, but through signalized displacement rather than a median crossover. A driver turning left crosses opposing traffic at a signal well before the main intersection, then proceeds through the main intersection on a green phase running concurrently with through traffic in both directions, since the crossing conflict has already been resolved upstream.

<RelatedMedia id={fm.patternId} />

## Where this leads: Target patterns

<div class="cw-links">

- [Displaced Left-Turn (DLT)](/patterns/intersections/displaced-left-turn/) <IdPill id="INT-DLT-14" />

</div>

<div class="cw-facts">
<div class="cw-fact">

## Applicability and thresholds

Requires substantial additional right-of-way width upstream of the main intersection to build the displaced left-turn crossing, which is this retrofit's primary limitation compared to Median U-Turn or RCUT.<Citation index={2} /> Most viable at high-volume urban or suburban intersections where a grade-separated interchange isn't justified but conventional signal delay from protected left-turn phasing is severe.

</div>
<div class="cw-fact">

## Evidence and effectiveness

DLT is documented as a faster, lower-cost alternative to a grade-separated interchange at high-volume intersections, resolving left-turn and through-movement conflicts without the cost of a flyover or underpass, though at higher construction cost and impact than Median U-Turn or RCUT.<Citation index={1} />

</div>
<div class="cw-fact">

## Getting it built

Cannot be piloted informally. Widening for the displaced left-turn crossing is real, costly construction, frequently impacting adjoining properties given the additional area required. This strategy effectively starts at Permanent on the construction spectrum. See [Construction Methodology & The Build Spectrum](/guide/construction-methodology-spectrum/).

An Intersection Control Evaluation is standard practice, and given the higher cost and impact of this design relative to Median U-Turn or RCUT, is particularly important for justifying the additional expense. See [Decision & Evaluation Processes](/guide/decision-evaluation-processes/).

</div>
<div class="cw-fact">

## Who can move this

Typically a state DOT or large-city capital project, given the cost and right-of-way scope involved. See [Legal & Planning Mechanisms](/guide/legal-planning-mechanisms/) and [Funding & Financing Mechanisms](/guide/funding-financing-mechanisms/).

</div>
</div>

## Related retrofit strategies

<div class="cw-links">

- [Median U-Turn (MUT) retrofit](/retrofits/intersection/median-u-turn-mut-retrofit/) <IdPill id="RFT-INT-02" />
- [Restricted Crossing U-Turn (RCUT) retrofit](/retrofits/intersection/restricted-crossing-u-turn-rcut-retrofit/) <IdPill id="RFT-INT-03" /> (the two lower-cost alternatives addressing the same underlying unprotected-left-turn problem)

</div>

## References

1. <span id="ref-1"></span><EvidenceChip tier="evidence" /> ["Unconventional Arterial Intersection Designs under Connected and Automated Vehicle Environment: A Survey," on Displaced Left-turn Intersection design and cost tradeoffs relative to grade-separated interchanges.](https://arxiv.org/abs/1811.03074)
2. <span id="ref-2"></span><EvidenceChip tier="legal" /> [U.S. Patent 7,135,989, "Parallel flow vehicle turn system for traffic intersections," on displaced left-turn retrofit considerations and right-of-way impacts.](https://patents.google.com/patent/US7135989B2/en)
