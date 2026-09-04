---
title: "Pervious Strip"
description: "A linear strip of permeable surface (gravel, permeable pavers, or open-graded aggregate), allowing stormwater to infiltrate directly into the ground rather than running off to a drain, typically installed within a parking lane, shoulder, or buffer zone."
patternId: ELM-PVS-21
date: 2026-08-31
llms: "A linear strip of permeable surface (gravel, permeable pavers, or open-graded aggregate), allowing stormwater to infiltrate directly into the ground rather than running off to a drain, typically installed within a parking lane, shoulder, or buffer zone."
---

<script>
  import { Citation, EvidenceChip, PatternCard, RelatedMedia } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Pervious Strip" classification="element" status="situational">
A linear strip of permeable surface (gravel, permeable pavers, or open-graded aggregate), allowing stormwater to infiltrate directly into the ground rather than running off to a drain, typically installed within a parking lane, shoulder, or buffer zone.
</PatternCard>

<RelatedMedia id={fm.patternId} />

*Working assessment: this pattern’s status reflects a preliminary Commonway System judgment call, pending final review.*

## Why this pattern exists

A conventional impervious strip in this same location contributes runoff volume with no infiltration benefit; converting it to a pervious surface reduces runoff at a relatively low cost compared to a full bioswale or planter, without requiring a change in the strip’s basic use. This pattern exists to document that lower-intervention infiltration option.<Citation index={1} />

## Key considerations

- Underlying soil infiltration rate needs to be verified before installation; a pervious surface over poorly-draining soil underperforms significantly
- Surface material should be selected for the loads it will bear; a parking-lane application needs a different specification than a pedestrian-only buffer strip<Citation index={2} />
- Periodic maintenance (removing sediment buildup) is required to keep the surface functioning as intended over time

## Related patterns

[Pervious Pavement](/patterns/elements/pervious-pavement/) (ELM-PVP-22) (a related but distinct full-surface treatment); [Bioswale](/patterns/elements/bioswale/) (ELM-BIO-19), [Flow-Through Planter](/patterns/elements/flow-through-planter/) (ELM-FTP-20) (higher-intervention alternatives)

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> U.S. Environmental Protection Agency, National Menu of Best Management Practices, "Permeable Pavements" fact sheet.
2. <span id="ref-2"></span><EvidenceChip tier="precedent" /> National Association of City Transportation Officials, *Urban Street Stormwater Guide*.

*"Legal / regulatory" here refers to the EPA guidance that municipal NPDES stormwater permits are legally built around, not a single mandatory design spec like MUTCD or PROWAG.*
