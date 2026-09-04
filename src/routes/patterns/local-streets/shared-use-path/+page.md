---
title: Shared-Use Path
description: An off-street Local Typology physically separated from the roadway, shared by pedestrians and bicyclists under roughly equal priority.
patternId: LOC-SUP-13
date: 2026-08-31
llms: A Local street typology for an off-street path physically separated from the roadway, shared by pedestrians and bicyclists under roughly equal priority, connecting local-scale destinations.
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Shared-Use Path" classification="local" status="recommended">
An off-street path physically separated from the roadway, shared by pedestrians and bicyclists under roughly equal priority, connecting local-scale destinations.
</PatternCard>

Typical at: <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Undeveloped and Rural contexts are unlikely to carry a purpose-built shared-use path.

## Design notes

Width should accommodate two-way pedestrian and bicycle travel without forcing conflict between users. Connections back to the street network should occur at logical, safe, visible points, not incidental gaps.<Citation index={1} />

Distinct from [Bicycle Boulevard / Neighborhood Greenway](/patterns/local-streets/bicycle-boulevard/) (LOC-BBG-12), which uses a shared on-street roadway rather than off-street separation. This pattern provides a fully separated alternative useful for connecting cul-de-sacs, parks, schools, or short gaps in the local street grid where an on-street treatment isn't appropriate or sufficient.

Distinct from [Multi-Use Trail / Greenway](/patterns/collectors/multi-use-trail-greenway/) (COL-MUT-06): this pattern is local-connector scale, not a longer-distance destination trail.

## Related patterns

- [Bicycle Boulevard / Neighborhood Greenway](/patterns/local-streets/bicycle-boulevard/) (LOC-BBG-12)
- [Multi-Use Trail / Greenway](/patterns/collectors/multi-use-trail-greenway/) (COL-MUT-06)

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> AASHTO, *Guide for the Development of Bicycle Facilities*, 5th Edition, 2024.
