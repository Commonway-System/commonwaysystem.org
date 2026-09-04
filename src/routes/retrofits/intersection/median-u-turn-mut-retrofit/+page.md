---
title: "Median U-Turn (MUT) retrofit"
description: "Reroutes left-turn and through movements from a minor approach away from the main intersection, requiring drivers to turn right first, then complete a U-turn at a median opening downstream."
patternId: RFT-INT-02
date: 2026-09-03
llms: "Also known as a Michigan U-turn, reroutes left-turn and through movements from a minor approach away from the main intersection to a median crossover downstream, reducing conflict points and signal complexity."
---

<script>
  import { Citation, EvidenceChip, RelatedMedia, RetrofitCard } from '$lib/theme/components'
</script>

<RetrofitCard id={fm.patternId} title="Median U-Turn (MUT) retrofit" scale="intersection">
Reroutes left-turn and through movements from a minor approach away from the main intersection, requiring drivers to turn right first, then complete a U-turn at a median opening downstream.
</RetrofitCard>

## Overview

Also known as a Michigan U-turn, this retrofit removes direct and unprotected left turns from the main intersection entirely by relocating them to a signalized or unsignalized median crossover a short distance away. This reduces the conflict points at the primary intersection and shortens the left-turn phase a signal there needs to serve, in exchange for a slightly longer path for the rerouted movement.

<RelatedMedia id={fm.patternId} />

## Where this leads: Target patterns

[Median U-Turn (MUT)](/patterns/intersections/median-u-turn/) (INT-MUT-12)

## Applicability and thresholds

Requires a wide enough median, or the ability to widen one, to accommodate the U-turn movement, sized to the corridor's design vehicle. Most commonly applied on divided arterials and highways with four or more lanes, where a conventional left turn from the minor approach would otherwise cross multiple lanes of opposing traffic at once.<Citation index={2} />

## Evidence and effectiveness

State DOT data (Indiana) shows a MUT-style retrofit improving traffic capacity by 20 to 50 percent at the retrofitted intersection, through more efficient signal phasing, timing, and progression with adjacent intersections, and reduces stops by a third or more.<Citation index={1} /><Citation index={3} />

## Getting it built

Cannot be piloted informally. Retrofitting a standard intersection to this geometry costs from a few hundred thousand dollars to more than a million, and requires real median construction and, often, signal relocation. This strategy effectively starts at Permanent on the construction spectrum. See [Construction Methodology & The Build Spectrum](/guide/construction-methodology-spectrum/).

An Intersection Control Evaluation is standard practice, comparing this geometry against a conventional signal or other alternative intersection designs using safety and operational data. See [Decision & Evaluation Processes](/guide/decision-evaluation-processes/).

## Who can move this

Typically a state DOT capital project, given the scale of median reconstruction involved, though a state highway running through a small city may still be responsive to local advocacy given the safety case. See [Legal & Planning Mechanisms](/guide/legal-planning-mechanisms/) and [Funding & Financing Mechanisms](/guide/funding-financing-mechanisms/).

## Related retrofit strategies

[Restricted Crossing U-Turn (RCUT) retrofit](/retrofits/intersection/restricted-crossing-u-turn-rcut-retrofit/) (RFT-INT-03) (a closely related median U-turn geometry that also restricts the minor-road through movement), [Displaced Left-Turn (DLT) retrofit](/retrofits/intersection/displaced-left-turn-dlt-retrofit/) (RFT-INT-04) (an alternative approach to the same unprotected-left-turn problem)

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> Indiana Department of Transportation, "Median U-turns."
2. <span id="ref-2"></span><EvidenceChip tier="legal" /> Federal Highway Administration, "Chapter 2. Intersections," *Handbook for Designing Roadways for the Aging Population*.
3. <span id="ref-3"></span><EvidenceChip tier="evidence" /> "Evaluating the Operational Features of an Unconventional Dual-Bay U-Turn Design for Intersections."
