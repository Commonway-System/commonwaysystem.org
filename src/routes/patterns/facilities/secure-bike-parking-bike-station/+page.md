---
title: "Secure Bike Parking / Bike Station"
description: "An enclosed or attended facility offering higher-security, longer-term bike parking than an open-air rack or corral, ranging from a lockable cage to a staffed bike station with additional services."
patternId: FAC-SBP-10
date: 2026-08-31
llms: "An enclosed or attended facility offering higher-security, longer-term bike parking than an open-air rack or corral, ranging from a lockable cage to a staffed bike station with additional services."
---

<script>
  import { PatternCard, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Secure Bike Parking / Bike Station" classification="facility" status="situational">
An enclosed or attended facility offering higher-security, longer-term bike parking than an open-air rack or corral, ranging from a lockable cage to a staffed bike station with additional services.
</PatternCard>

*Working assessment: this pattern’s status reflects a preliminary Commonway System judgment call, pending final review.*

## Why this pattern exists

Commuters and long-term parkers need protection from theft and weather that an open rack cannot provide; this pattern exists to document the access control, capacity, and siting considerations specific to an enclosed facility, distinct from the simpler open-air patterns that serve short-term parking needs.<Citation index={1} />

## Key considerations

- Access control method (key, fob, membership, staffed attendant) should match the expected user base and usage duration
- Siting works best near major trip generators (transit hubs, large employers) where sustained demand justifies the higher cost per space
- Capacity planning should account for growth in demand over time, since retrofitting an enclosed facility is more disruptive than adding open racks

## Related patterns

[Bike Parking Corral](/patterns/facilities/bike-parking-corral/) (FAC-BPC-08), [Bike Parking / Rack](/patterns/elements/bike-parking-rack/) (ELM-BPR-40) (lower-security alternatives); [Bike-Share Station](/patterns/facilities/bike-share-station/) (FAC-BSS-09), [Transit Hub/Station](/patterns/facilities/transit-hub-station/) (FAC-THS-03) (common co-location sites)

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> Association of Pedestrian and Bicycle Professionals (APBP), *Bicycle Parking Guidelines*, 2nd Ed. Long-term/enclosed parking recommendations, access control approaches.
