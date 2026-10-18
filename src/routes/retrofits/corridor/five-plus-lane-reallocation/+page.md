---
title: "Five-plus lane reallocation"
description: "Reduces the through-lane count on a roadway of five or more lanes, applying road diet principles at a larger scale than the standard four-to-three conversion."
patternId: RFT-CDR-02
date: 2026-09-03
llms: "Reduces the through-lane count on a roadway of five or more lanes, applying road diet principles at a larger scale, adding or widening a center turn lane and requiring more careful traffic analysis than a standard four-to-three conversion."
---

<script>
  import { Citation, EvidenceChip, IdPill, PatternViewer, RelatedMedia } from '$lib/theme/components'
</script>

Reduces the through-lane count on a roadway of five or more lanes, applying road diet principles at a larger scale than the standard four-to-three conversion.

<PatternViewer image={fm.image} title={fm.title} classification="corridor" retrofit />

## Overview

Wider roadways, five lanes and up, carry enough volume and turning complexity that a straightforward four-to-three conversion doesn't apply directly. This strategy still removes excess through capacity and adds or widens a center turn lane, but requires more careful traffic analysis and often a phased approach, since five-lane-and-larger corridors typically carry higher volumes and more conflicting turning movements than the classic road diet case.

<RelatedMedia id={fm.patternId} />

## Where this leads: Target patterns

<div class="cw-links">

- [Default (No Parking, No Direct Access)](/patterns/arterials/default/) <IdPill id="ART-DEF-01" />
- [Boulevard](/patterns/arterials/boulevard/) <IdPill id="ART-BLV-02" />

</div>

<div class="cw-facts">
<div class="cw-fact">

## Applicability and thresholds

Evaluated specifically for roadways with five or more lanes in NCHRP-adjacent research, distinct from the four-to-three case. Sight-distance and conflict-point improvements follow the same underlying mechanism as a standard road diet, but volume thresholds run higher given the additional capacity these corridors typically carry.

</div>
<div class="cw-fact">

## Evidence and effectiveness

Research on five-lane-and-larger road diet projects documents conflict-point reduction and improved sight distance for turning drivers, using the same two-stage reasoning as smaller road diets: fewer lanes to scan, and a dedicated turn lane separating through and turning movements.<Citation index={1} />

</div>
<div class="cw-fact">

## Getting it built

Can move through the construction spectrum, though the larger scope, more lanes, more signal coordination, more turning-movement analysis, makes a formal pilot or quick-build stage more valuable here than on a simple four-to-three conversion. See [Construction Methodology & The Build Spectrum](/guide/construction-methodology-spectrum/).

An Intersection Control Evaluation is worth considering where the corridor's intersections will also see a change in turn-lane configuration. See [Decision & Evaluation Processes](/guide/decision-evaluation-processes/).

</div>
<div class="cw-fact">

## Who can move this

Typically a city or county transportation department decision, though the larger scope and often-higher-classification roadway makes state DOT coordination more likely than with a simple four-to-three road diet. See [Legal & Planning Mechanisms](/guide/legal-planning-mechanisms/).

</div>
</div>

## Related retrofit strategies

<div class="cw-links">

- [Four-to-three lane road diet](/retrofits/corridor/four-to-three-lane-road-diet/) <IdPill id="RFT-CDR-01" /> (the smaller-scale equivalent this strategy extends)

</div>

## References

1. <span id="ref-1"></span><EvidenceChip tier="evidence" /> ["An Evaluation of 'Road Diet' Projects on Five Lane and Larger Roadways," transportation research summary distributed via NACTO.](https://nacto.org/wp-content/uploads/An-Evaluation-of-Road-Diet-Projects-on-Five-Lane-and-Larger-Roadways.pdf)
2. <span id="ref-2"></span><EvidenceChip tier="legal" /> [Federal Highway Administration, "Road Diets (Roadway Reconfiguration)," Proven Safety Countermeasures, FHWA-SA-12-013.](https://highways.dot.gov/safety/proven-safety-countermeasures/road-diets-roadway-reconfiguration)
