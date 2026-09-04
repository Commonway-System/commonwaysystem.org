---
title: "One-way to two-way conversion"
description: "Converts a one-way street back to two-way operation, typically reducing lane width and count in the process."
patternId: RFT-CDR-04
date: 2026-09-03
llms: "Converts a one-way street back to two-way operation, typically reducing lane width and count, slowing traffic and restoring each direction's visibility to passing traffic."
---

<script>
  import { RetrofitCard, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<RetrofitCard id={fm.patternId} title="One-way to two-way conversion" scale="corridor">
Converts a one-way street back to two-way operation, typically reducing lane width and count in the process.
</RetrofitCard>

## Overview

Many one-way streets were converted from an original two-way configuration in the mid 20th century, aimed at speeding vehicle throughput through downtowns. Converting back to two-way slows traffic (drivers on a one-way street tend to travel faster and pay less attention, since they only need to watch one direction) and restores each direction's visibility to passing traffic, which research links to improved business exposure.

## Where this leads: Target patterns

[Default (No Parking, No Direct Access)](/patterns/arterials/default/) (ART-DEF-01), [Main Street](/patterns/local-streets/main-street/) (LOC-MST-05), [Downtown Thoroughfare](/patterns/collectors/downtown-thoroughfare/) (COL-DTH-07)

## Applicability and thresholds

Most commonly applied to downtown one-way pairs originally converted for vehicle throughput. A feasibility study is typically warranted first, since delivery access, transit routing, and turn restrictions all need re-evaluation under two-way operation.

## Evidence and effectiveness

Documented average speeds on one-way streets have measured roughly double those on comparable two-way streets in the same neighborhood.<Citation index={1} /> Separately, Louisville, Kentucky recorded a 23 percent decline in crime and a 42 percent reduction in robberies following conversion of a one-way pair to two-way, a result researchers attribute in part to slower speeds and increased pedestrian and cyclist presence.<Citation index={2} /><Citation index={3} />

## Getting it built

Two-way conversion is harder to pilot informally than a simple road diet, since it typically requires new signal phasing, new signage, and turn-restriction changes at every intersection along the corridor. A quick-build stage using temporary signage and striping is more realistic than a short demonstration. See [Construction Methodology & The Build Spectrum](/guide/construction-methodology-spectrum/).

An Intersection Control Evaluation is commonly warranted at each affected intersection, since signal phasing and turn movements change substantially. See [Decision & Evaluation Processes](/guide/decision-evaluation-processes/).

## Who can move this

A city council or transportation department decision, often requiring coordination across multiple city departments (signals, signage, parking) given the corridor-wide scope of the change. See [Legal & Planning Mechanisms](/guide/legal-planning-mechanisms/).

## Related retrofit strategies

None currently cataloged.

## References

1. <span id="ref-1"></span><EvidenceChip tier="evidence" /> Ayres Associates, "One-Way or the Other? Two-Way Traffic Conversion Requires Study."
2. <span id="ref-2"></span><EvidenceChip tier="precedent" /> "Student Corner: The State of the Debate: Two-Way Street Conversion," Community and Economic Development, UNC School of Government.
3. <span id="ref-3"></span><EvidenceChip tier="precedent" /> Steuteville, R., "Cities Benefit from Restoring Two-Way Traffic," Congress for the New Urbanism.
