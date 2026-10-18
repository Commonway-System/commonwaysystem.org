---
title: "Crash Cushion / End Terminal"
description: "An energy-absorbing device installed at the exposed end of a traffic barrier or in front of a fixed hazard, designed to decelerate an impacting vehicle gradually rather than presenting a rigid, unshielded end or face."
patternId: ELM-CCT-24
status: recommended
date: 2026-08-31
llms: "An energy-absorbing device installed at the exposed end of a traffic barrier or in front of a fixed hazard, designed to decelerate an impacting vehicle gradually rather than presenting a rigid, unshielded end or face."
---

<script>
  import { Citation, EvidenceChip, IdPill, PatternViewer, RelatedMedia } from '$lib/theme/components'
</script>

An energy-absorbing device installed at the exposed end of a traffic barrier or in front of a fixed hazard, designed to decelerate an impacting vehicle gradually rather than presenting a rigid, unshielded end or face.

<PatternViewer image={fm.image} title={fm.title} classification="element" />

<RelatedMedia id={fm.patternId} />

## Why this pattern exists

An unshielded barrier end or exposed fixed object can spear or abruptly stop an impacting vehicle, causing more severe injury than a properly designed energy-absorbing terminal would; this pattern exists specifically to address that exposure, since it is a distinct failure mode from the barrier’s general run.<Citation index={1} />

## Key considerations

- Required wherever a traffic barrier’s end is exposed to head-on or angled impact from the direction of travel
- Device selection must match the expected impact speed and angle for the specific location, not be applied as a generic default
- Regular inspection and maintenance is necessary, since a damaged or improperly reset device may not perform as designed in a subsequent impact<Citation index={2} />

## Related patterns

<div class="cw-links">

- [Traffic Barrier](/patterns/elements/traffic-barrier/) <IdPill id="ELM-TRB-23" /> (the element this pattern terminates)
- [Bollard](/patterns/elements/bollard/) <IdPill id="ELM-BOL-25" /> (a related but distinct safety hardware type)

</div>

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> [American Association of State Highway and Transportation Officials, *Manual for Assessing Safety Hardware* (MASH), 2016.](https://store.transportation.org/item/publicationdetail/2707)
2. <span id="ref-2"></span><EvidenceChip tier="legal" /> [Federal Highway Administration / American Association of State Highway and Transportation Officials, Joint Implementation Agreement guidance on MASH transition deadlines.](https://rosap.ntl.bts.gov/view/dot/78583)
