---
title: "Transit Hub / Station"
description: "A compound facility where multiple transit patterns (platforms, shelters, wayfinding, sometimes multiple routes or modes) converge into a single coordinated site, documenting intermodal transfer and placemaking rather than a single boarding point."
patternId: FAC-THS-03
status: recommended
date: 2026-08-31
llms: "A compound facility where multiple transit patterns (platforms, shelters, wayfinding, sometimes multiple routes or modes) converge into a single coordinated site, documenting intermodal transfer and placemaking rather than a single boarding point."
---

<script>
  import { Citation, EvidenceChip, IdPill, PatternViewer, RelatedMedia } from '$lib/theme/components'
</script>

A compound facility where multiple transit patterns (platforms, shelters, wayfinding, sometimes multiple routes or modes) converge into a single coordinated site, documenting intermodal transfer and placemaking rather than a single boarding point.

<PatternViewer image={fm.image} title={fm.title} classification="facility" />

<RelatedMedia id={fm.patternId} />

## Why this pattern exists

Once a stop grows past a single platform and shelter, it becomes its own design problem: passengers transferring between routes or modes need legible wayfinding, adequate circulation space, and often supporting amenities (restrooms, retail, bike parking) that a simple stop never requires. This pattern exists to mark that threshold and give higher-order stops their own documentation rather than treating them as an oversized version of a basic stop.<Citation index={1} />

## Key considerations

- Circulation between platforms, modes, and site entrances should be direct and legible, minimizing backtracking or unclear paths
- Passenger volume and transfer patterns should drive the mix of amenities provided, not a fixed template applied regardless of site
- Where multiple agencies or modes share a hub, wayfinding and signage should read as one coordinated system, not stitched-together pieces

## Related patterns

<div class="cw-links">

- [Transit Shelter](/patterns/facilities/transit-shelter/) <IdPill id="FAC-TSH-01" />
- [Transit Platform](/patterns/facilities/transit-platform/) <IdPill id="FAC-TPL-02" /> (component facilities)
- [Park-and-Ride](/patterns/facilities/park-and-ride/) <IdPill id="FAC-PNR-06" /> (a related but distinct compound facility oriented around auto transfer rather than multimodal transfer)
- [Bike-Share Station](/patterns/facilities/bike-share-station/) <IdPill id="FAC-BSS-09" />
- [Secure Bike Parking/Bike Station](/patterns/facilities/secure-bike-parking-bike-station/) <IdPill id="FAC-SBP-10" /> (frequently co-located amenities)

</div>

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> [TCRP Report 153, "Guidelines for Providing Access to Public Transportation Stations," Transportation Research Board. Circulation, multimodal transfer, and amenity mix planning for higher-order stations.](https://nap.nationalacademies.org/catalog/14614/guidelines-for-providing-access-to-public-transportation-stations)
