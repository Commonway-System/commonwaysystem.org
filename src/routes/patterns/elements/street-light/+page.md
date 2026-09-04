---
title: "Street Light"
description: "A pole-mounted luminaire providing illumination for the roadway, typically mounted at a height and spacing designed primarily to serve vehicle visibility and drivers, though its light also reaches the surrounding sidewalk and public realm."
patternId: ELM-STL-26
date: 2026-08-31
llms: "A pole-mounted luminaire providing illumination for the roadway, typically mounted at a height and spacing designed primarily to serve vehicle visibility and drivers, though its light also reaches the surrounding sidewalk and public realm."
---

<script>
  import { PatternCard, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Street Light" classification="element" status="recommended">
A pole-mounted luminaire providing illumination for the roadway, typically mounted at a height and spacing designed primarily to serve vehicle visibility and drivers, though its light also reaches the surrounding sidewalk and public realm.
</PatternCard>

*Working assessment: this pattern’s status reflects a preliminary Commonway System judgment call, pending final review.*

## Why this pattern exists

Adequate roadway illumination reduces nighttime crash risk by improving driver visibility of the roadway edge, other vehicles, and pedestrians; this pattern exists to document the mounting height, spacing, and output considerations specific to vehicle-oriented lighting, distinct from the pedestrian-scale lighting that serves a different visual task.<Citation index={1} />

## Key considerations

- Mounting height and spacing should follow established illumination standards for the roadway’s classification and speed, not a uniform default across all street types
- Light spillover and glare onto adjacent properties should be minimized through fixture selection and shielding
- Uniformity of illumination along a corridor matters more than peak brightness at any single point; dark gaps between light poles undermine the pattern’s purpose

## Related patterns

[Pedestrian-scale Lighting](/patterns/elements/pedestrian-scale-lighting/) (ELM-PSL-27) (the companion lighting pattern serving a different visual task and height); relevant Segment patterns this lighting serves

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> ANSI/IES RP-8-22, "Lighting Roadway and Parking Facilities." Current American National Standard for mounting height, spacing, and illuminance-level tables by roadway classification.
