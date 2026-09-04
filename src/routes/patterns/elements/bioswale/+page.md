---
title: "Bioswale"
description: "A vegetated, shallow channel designed to collect, convey, and filter stormwater runoff from an adjacent roadway or hard surface, using soil and plant material to slow flow and remove pollutants before water reaches a storm drain or waterway."
patternId: ELM-BIO-19
date: 2026-08-31
llms: "A vegetated, shallow channel designed to collect, convey, and filter stormwater runoff from an adjacent roadway or hard surface, using soil and plant material to slow flow and remove pollutants before water reaches a storm drain or waterway."
---

<script>
  import { Citation, EvidenceChip, PatternCard, RelatedMedia } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Bioswale" classification="element" status="recommended">
A vegetated, shallow channel designed to collect, convey, and filter stormwater runoff from an adjacent roadway or hard surface, using soil and plant material to slow flow and remove pollutants before water reaches a storm drain or waterway.
</PatternCard>

<RelatedMedia id={fm.patternId} />

*Working assessment: this pattern’s status reflects a preliminary Commonway System judgment call, pending final review.*

## Why this pattern exists

Conventional curb-and-gutter drainage moves runoff, and whatever pollutants it carries, directly into the storm system with no filtration; a bioswale intercepts that runoff at the source, reducing both the volume reaching the storm system and the pollutant load it carries. This pattern exists to document the design considerations that make a swale function as intended rather than as an underperforming ditch.<Citation index={1} />

## Key considerations

- Sizing must be based on the contributing drainage area and expected runoff volume; an undersized swale simply overflows during real storm events<Citation index={2} />
- Plant selection should tolerate both periodic inundation and dry periods, since swale conditions vary significantly between storm events
- Inlet design (curb cuts or similar) should prevent sediment and debris from clogging the swale’s inlet point over time

## Related patterns

[Flow-Through Planter](/patterns/elements/flow-through-planter/) (ELM-FTP-20), [Pervious Strip](/patterns/elements/pervious-strip/) (ELM-PVS-21), [Pervious Pavement](/patterns/elements/pervious-pavement/) (ELM-PVP-22) (related green stormwater treatments); [Curb Cut/Driveway Apron](/patterns/elements/curb-cut-driveway-apron/) (ELM-CCA-04) (relevant where a curb cut serves as the swale’s inlet)

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> U.S. Environmental Protection Agency, *Green Streets* / *Green Street Design Manual*, 2021.
2. <span id="ref-2"></span><EvidenceChip tier="precedent" /> National Association of City Transportation Officials, *Urban Street Stormwater Guide*.

*"Legal / regulatory" here refers to the EPA guidance that municipal NPDES stormwater permits are legally built around, not a single mandatory design spec like MUTCD or PROWAG.*
