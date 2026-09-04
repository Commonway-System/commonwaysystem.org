---
title: "Conventional Bike Lane"
description: "A striped, dedicated on-street lane for bicycle travel, separated from the adjacent vehicle travel lane by paint markings alone, with no physical buffer or barrier."
patternId: ELM-CBL-34
date: 2026-08-31
llms: "A striped, dedicated on-street lane for bicycle travel, separated from the adjacent vehicle travel lane by paint markings alone, with no physical buffer or barrier."
---

<script>
  import { PatternCard, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Conventional Bike Lane" classification="element" status="situational">
A striped, dedicated on-street lane for bicycle travel, separated from the adjacent vehicle travel lane by paint markings alone, with no physical buffer or barrier.
</PatternCard>

*Working assessment: this pattern’s status reflects a preliminary Commonway System judgment call, pending final review.*

## Why this pattern exists

A conventional bike lane provides a clearly delineated, expected space for cyclists that a shared travel lane does not, improving predictability for both cyclists and drivers at a lower cost and space requirement than a buffered or protected facility. This pattern exists to document where this baseline level of separation is adequate versus where a stronger treatment is warranted.<Citation index={1} />

## Key considerations

- Adequacy depends heavily on adjacent vehicle speed and volume; paint-only separation becomes less appropriate as speed and volume increase<Citation index={2} />
- Lane width should accommodate safe passing distance from parked cars where relevant, to avoid the door-zone conflict
- Should be considered a baseline treatment rather than the ceiling; upgrading to a buffered or protected facility should be the default aspiration on higher-stress corridors

## Related patterns

[Buffered Bike Lane](/patterns/elements/buffered-bike-lane/) (ELM-BBL-35), [Protected Bike Lane/Cycle Track](/patterns/elements/protected-bike-lane-cycle-track/) (ELM-PBL-37) (stronger-separation alternatives); [Sharrow](/patterns/elements/sharrow/) (ELM-SHR-39) (a lesser treatment for contexts where even this pattern is not feasible)

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> AASHTO, *Guide for the Development of Bicycle Facilities*. Adopted by most state DOTs as the foundational lane-width and design standard.
2. <span id="ref-2"></span><EvidenceChip tier="precedent" /> NACTO, *Urban Bikeway Design Guide*, 3rd Ed. (2025), "Design User, Design Speed, and Design Year." Protected lanes become the only all-ages-and-abilities-permissible option above 25 mph or 6,000 vehicles per day.
