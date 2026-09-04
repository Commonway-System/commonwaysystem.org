---
title: "Signal-to-roundabout conversion"
description: "Replaces an existing signalized intersection with a roundabout, removing signal equipment and phasing entirely in favor of continuous yield-controlled circulation."
patternId: RFT-INT-01
date: 2026-09-03
llms: "Replaces an existing signalized intersection with a roundabout, removing signal equipment and phasing in favor of continuous yield-controlled circulation, the concrete mechanism behind CS's roundabouts-first philosophy."
---

<script>
  import { RetrofitCard, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<RetrofitCard id={fm.patternId} title="Signal-to-roundabout conversion" scale="intersection">
Replaces an existing signalized intersection with a roundabout, removing signal equipment and phasing entirely in favor of continuous yield-controlled circulation.
</RetrofitCard>

## Overview

A signal manages conflict by separating movements in time; a roundabout manages it by separating movements in space, requiring every entering vehicle to yield to circulating traffic rather than wait for a green phase. This retrofit is the most direct route between Signal and the Commonway System's own default intersection control, and is the concrete mechanism behind the System's broader roundabouts-first philosophy.

## Where this leads: Target patterns

[Roundabout (Single/Multi-Lane)](/patterns/intersections/roundabout/) (INT-RAB-01), [Turbo-Roundabout](/patterns/intersections/turbo-roundabout/) (INT-TRB-02) at the highest-volume Arterial-to-Arterial locations

## Applicability and thresholds

Applicable at nearly any signalized intersection where right-of-way exists or can be acquired for the roundabout's circular footprint. Volume alone rarely disqualifies a location, since multi-lane and turbo-roundabout designs scale to high-volume conditions, but right-of-way constraints and adjacent property impacts are the most common practical limits.<Citation index={3} />

## Evidence and effectiveness

FHWA reports roundabouts reduce overall crashes by 35 percent, injury crashes by 76 percent, and fatal crashes by 90 to 100 percent compared to the signals or stop signs they replace.<Citation index={1} /> An Insurance Institute for Highway Safety empirical Bayes study of U.S. roundabout conversions found a crash modification factor of 0.801, an approximately 20 percent reduction in crashes overall.<Citation index={2} />

## Getting it built

Cannot be meaningfully piloted or demonstrated. A roundabout requires real construction, new pavement, curbs, and central island, to exist at all; there's no reversible, low-cost version of this conversion. This strategy effectively starts at Permanent on the construction spectrum. See [Construction Methodology & The Build Spectrum](/guide/construction-methodology-spectrum/).

An Intersection Control Evaluation is standard practice before this conversion, comparing the roundabout against retaining or upgrading the signal using the same safety and operational data. See [Decision & Evaluation Processes](/guide/decision-evaluation-processes/).

## Who can move this

Typically a city, county, or state DOT capital project, given the construction scope and cost. Right-of-way needs may bring in acquisition or easement tools. See [Legal & Planning Mechanisms](/guide/legal-planning-mechanisms/) and [Funding & Financing Mechanisms](/guide/funding-financing-mechanisms/).

## Related retrofit strategies

None currently cataloged.

## References

1. <span id="ref-1"></span><EvidenceChip tier="evidence" /> Federal Highway Administration, "Roundabouts," Intersection Safety.
2. <span id="ref-2"></span><EvidenceChip tier="evidence" /> Persaud, B. et al., "Safety Effect of Roundabout Conversions in the United States: Empirical Bayes Observational Before-After Study," Insurance Institute for Highway Safety, 2001.
3. <span id="ref-3"></span><EvidenceChip tier="legal" /> Rodegerdts, L. et al., *Roundabouts: An Informational Guide*, 2nd ed., NCHRP Report 672, Transportation Research Board, 2010.
