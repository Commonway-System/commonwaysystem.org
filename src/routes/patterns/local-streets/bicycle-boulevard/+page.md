---
title: Bicycle Boulevard / Neighborhood Greenway
description: A Local street where traffic calming and diversion discourage through car traffic while prioritizing bicycle through-movement in the shared roadway.
patternId: LOC-BBG-12
date: 2026-08-29
llms: A Local street typology using traffic calming and diversion to discourage through car traffic while prioritizing bicycle through-movement in the shared roadway, distinguished from Bike Highway/Greenway's full physical separation.
---

<script>
  import { PatternCard, DensityChip, Citation, EvidenceChip, Illustration, IllustrationFrame, IllustrationCallouts, IllustrationCallout, SpeedModalHierarchyCard, SpeedLimitSection, ModalHierarchySection } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Bicycle Boulevard / Neighborhood Greenway" classification="local" status="recommended">
A Local street where traffic calming and diversion discourage through car traffic while prioritizing bicycle through-movement in the shared roadway.
</PatternCard>

Typical at: <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Suburban is an edge case, thinning for the same reason as [Continuous Sidewalk / Raised Junction](/patterns/intersections/continuous-sidewalk/): a disconnected, cul-de-sac-heavy grid gives it fewer parallel, low-traffic routes to use. Undeveloped and Rural are unlikely pairings.

## Illustration

<Illustration type="Paired" format="Segment / cross-section (~2.8:1)">
  <IllustrationFrame label="Typical condition" tone="grayscale">
    An ordinary Local street cross-section: unrestricted through car traffic, a cyclist taking the lane alongside car volumes, no diverters, no wayfinding.
  </IllustrationFrame>
  <IllustrationFrame label="Commonway recommendation" tone="amber">
    A modal diverter or traffic circle blocks car through-movement while a bicycle-width gap passes through; wayfinding signage marks the route; a calmed, low-volume, low-speed shared roadway.
  </IllustrationFrame>
  <IllustrationCallouts>
    <IllustrationCallout number={1} kind="physical">Modal diverter / traffic circle blocking through car movement; a bicycle-width gap allows continuous bicycle passage.</IllustrationCallout>
    <IllustrationCallout number={2} kind="physical">Wayfinding signage marking the route as a through bicycle connection.</IllustrationCallout>
    <IllustrationCallout number={3} kind="control-timing">At crossings of higher-volume streets, a signalized or protected crossing reduces bicyclist delay.<Citation index={1} /></IllustrationCallout>
  </IllustrationCallouts>
</Illustration>

No supplemental illustration needed.

## Speed and modal hierarchy

<SpeedModalHierarchyCard>
<SpeedLimitSection speeds={[20]}>
Follows the Local default: 20 mph hard maximum, no exceptions. A separate 85th/95th-percentile operating-speed threshold of 25 mph is used as a trigger for additional traffic calming, not as a substitute design speed.

</SpeedLimitSection>
<ModalHierarchySection classification="local" rows={[{ tiers: ['bicycle', 'pedestrian', 'transit', 'vehicle', 'freight'] }]}>
An override justified because shared-street bicycle priority is this Typology's entire reason for existing.

</ModalHierarchySection>

</SpeedModalHierarchyCard>

## Design notes

Traffic calming and diverters discourage through car traffic while retaining local access, the reverse of a Collector-scale Bike Highway / Greenway's full physical separation. NACTO's guidance sets the design threshold where the treatment works: daily motor vehicle volume at or below 3,000 and a 95th-percentile speed at or below 25 mph, with heavier calming needed above those figures.<Citation index={1} />

A comparison of Berkeley's bicycle boulevards to their parallel arterials found bicyclist collision rates two to eight times lower on the boulevards.<Citation index={2} />

## Related patterns

[Bike Highway / Greenway](/patterns/collectors/bike-highway-greenway/) (COL-BHG-04) — the Collector-scale pattern this one is explicitly distinguished from on that page: physical separation there, a shared, calmed roadway here.

[Continuous Sidewalk / Raised Junction](/patterns/intersections/continuous-sidewalk/) (INT-CSJ-06) — the Local-to-Collector intersection default, explicitly named alongside this pattern on that page as thinning in Suburban for the same grid-connectivity reason.

[Modal Filter / Point Closure](/patterns/elements/modal-filter-point-closure/) (ELM-MFP-44) — the Element pattern most frequently paired with this one to build the diversion shown above.

## Getting there: Retrofit path options

[Parking-lane reallocation](/retrofits/corridor/parking-lane-reallocation/) (RFT-CDR-05), [Modal filtering / Low Traffic Neighborhood retrofit](/retrofits/network/modal-filtering-low-traffic-neighborhood-retrofit/) (RFT-NET-01, applies *within* this pattern rather than transforming it into something else)

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> National Association of City Transportation Officials, *Urban Bikeway Design Guide*, 3rd ed. (2025), "Bike Boulevards," in *Designing Bikeways for All Ages and Abilities*.
2. <span id="ref-2"></span><EvidenceChip tier="evidence" /> Minikel, E., "Cyclist Safety on Bicycle Boulevards and Parallel Arterial Routes in Berkeley, California," *Accident Analysis & Prevention* 45 (2012): 241–247.
