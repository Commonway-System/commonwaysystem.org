---
title: "Bike-Share Station"
description: "A docking location for a shared-bike program, where users check out and return bikes from a fixed station, either dock-based (physical docking points) or hybrid/dockless with a designated parking zone."
patternId: FAC-BSS-09
date: 2026-08-31
llms: "A docking location for a shared-bike program, where users check out and return bikes from a fixed station, either dock-based (physical docking points) or hybrid/dockless with a designated parking zone."
---

<script>
  import { Citation, EvidenceChip, PatternCard, RelatedMedia } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Bike-Share Station" classification="facility" status="situational">
A docking location for a shared-bike program, where users check out and return bikes from a fixed station, either dock-based (physical docking points) or hybrid/dockless with a designated parking zone.
</PatternCard>

<RelatedMedia id={fm.patternId} />

*Working assessment: this pattern’s status reflects a preliminary Commonway System judgment call, pending final review.*

## Why this pattern exists

A shared-bike system depends on station siting decisions (density, spacing, proximity to transit and destinations) that determine whether the system actually gets used; this pattern exists to document those siting and sizing considerations as their own facility type, separate from the bike parking infrastructure a station physically resembles.<Citation index={1} />

## Key considerations

- Station spacing and density should reflect the service area’s trip-length expectations; stations too far apart undermine the system’s utility for short trips<Citation index={2} />
- Proximity to transit stops strengthens first/last-mile connections and should be prioritized in siting
- Rebalancing access (space for a service vehicle to reach and restock the station) needs to be planned into the site, not assumed

## Related patterns

[Secure Bike Parking / Bike Station](/patterns/facilities/secure-bike-parking-bike-station/) (FAC-SBP-10) (a related but distinct higher-security facility type); [Transit Hub/Station](/patterns/facilities/transit-hub-station/) (FAC-THS-03) (a common co-location site)

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> NACTO, *Bike Share Station Siting Guide*. Station placement principles.
2. <span id="ref-2"></span><EvidenceChip tier="evidence" /> NACTO, "Walkable Station Spacing is Key to Successful, Equitable Bike Share." Approximately 28 stations per square mile, a station every 1,000 ft.
