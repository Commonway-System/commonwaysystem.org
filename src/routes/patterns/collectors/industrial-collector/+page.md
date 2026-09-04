---
title: Industrial Collector
description: A Collector Typology serving industrial land use, where freight movement outranks vehicle, pedestrian, bicycle, and transit priority.
patternId: COL-IND-03
date: 2026-08-29
llms: A Collector street typology serving industrial land use, where freight movement is prioritized above vehicle, pedestrian, bicycle, and transit use.
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Industrial Collector" classification="collector" status="recommended">
A Collector road serving warehouses, freight yards, or manufacturing land use, designed around truck movement and loading rather than the base Collector priority order.
</PatternCard>

Typical at: <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" />

Undeveloped, Rural, and Core are edge cases.

## Modal hierarchy

Freight, then Vehicle, then Pedestrian, then Bicycle, then Transit, an override justified because the Typology's stated purpose is freight movement to and from industrial land use.

## Design notes

Industrial land use exists across a wide density range, which is why this Typology's realistic range is broader than most Collector entries, spanning Suburban through Urban with Undeveloped, Rural, and Core all plausible as edge cases rather than clean exclusions.<Citation index={1} />

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> NACTO, *Urban Street Design Guide*, "Design Vehicle" (citing AASHTO Green Book §2-1).
