---
title: "Superblock retrofit"
description: "Groups several existing blocks into a single traffic cell, routing through-traffic around the perimeter while reclaiming the interior streets for pedestrians, bicyclists, and local access only."
patternId: RFT-NET-02
date: 2026-09-03
llms: "Groups several existing blocks into a single traffic cell, routing through-traffic around the perimeter while reclaiming interior streets for pedestrians, bicyclists, and local access only, a top-down area-wide planning model."
---

<script>
  import { RetrofitCard, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<RetrofitCard id={fm.patternId} title="Superblock retrofit" scale="network">
Groups several existing blocks into a single traffic cell, routing through-traffic around the perimeter while reclaiming the interior streets for pedestrians, bicyclists, and local access only.
</RetrofitCard>

## Overview

Where modal filtering works point by point, a superblock works by treatment area: an entire multi-block zone is reorganized at once, with clearly designated perimeter streets carrying all through-traffic and interior streets rebuilt for a much lower level of vehicle priority, sometimes fully pedestrianized. Barcelona's and Vienna's programs are the most documented examples, using this as a deliberate top-down planning model rather than an incremental, street-by-street change.

## Where this leads: Target patterns

As with modal filtering, this doesn't necessarily produce a different destination pattern, it applies *within* an existing network's topology rather than replacing it. A superblock applied within a [Grid](/patterns/network/grid/) (NET-GRD-01) leaves it a Grid. Interior streets within the superblock typically become [Living Street / Woonerf](/patterns/local-streets/living-street-woonerf/) (LOC-LSW-06) or [Pedestrian-only Street / Plaza](/patterns/local-streets/pedestrian-plaza/) (LOC-PED-09), while perimeter streets retain or gain through-traffic capacity.

## Applicability and thresholds

Requires a multi-block area with a genuine perimeter capable of absorbing the rerouted through-traffic without creating unacceptable congestion or diversion onto adjacent neighborhoods. A Grid topology is again the most amenable context, given its inherent route redundancy along the perimeter.

## Evidence and effectiveness

The superblock model is documented as reallocating street space from motorised traffic to active travel and public use at the scale of an entire neighborhood or set of residential blocks, a top-down urban planning model distinct from the more incremental, street-by-street approach of modal filtering alone.<Citation index={1} />

## Getting it built

Given its area-wide scope, this retrofit is rarely demonstrated at full scale in a single short pilot; a phased approach, testing perimeter rerouting and one or two interior streets before committing to the full superblock, is more typical than a citywide or neighborhood-wide launch. See [Construction Methodology & The Build Spectrum](/guide/construction-methodology-spectrum/).

## Who can move this

Typically a city-level planning and transportation department initiative, given the scale, often requiring a dedicated area plan or district designation rather than a single project approval. See [Legal & Planning Mechanisms](/guide/legal-planning-mechanisms/).

## Related retrofit strategies

[Modal filtering / Low Traffic Neighborhood retrofit](/retrofits/network/modal-filtering-low-traffic-neighborhood-retrofit/) (RFT-NET-01) (a related, more incremental approach that restricts through-traffic without necessarily rebuilding the interior streets themselves)

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> "Identification of Plausible Low Traffic Neighbourhoods Using Open Data," *ScienceDirect*, definition and comparison of the Superblock model against modal filtering and Low Traffic Neighbourhoods.
