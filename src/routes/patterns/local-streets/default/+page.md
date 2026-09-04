---
title: Default (Standard Local Street)
description: The baseline Local street typology, carrying the base modal hierarchy and 20 mph speed cap with no named override.
patternId: LOC-DEF-01
date: 2026-08-29
llms: The baseline Local street, applying the base modal hierarchy and 20 mph design speed with no named override.
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation, Illustration, IllustrationFrame, IllustrationCallouts, IllustrationCallout } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Default (Standard Local Street)" classification="local" status="recommended">
The baseline Local street. No special access pattern, event use, or dedicated mode gives it a name of its own, so it carries the base Local modal hierarchy and speed rule unmodified. Every other Local Typology is defined as a departure from this one: a Typology earns its own name only when its entire reason for existing is a specific access pattern, a specific event use, or a specific mode.
</PatternCard>

## Illustration

<Illustration type="Paired" format="Segment / cross-section (~2.8:1)">
  <IllustrationFrame label="Typical condition" tone="grayscale">
    Oversized suburban local cross-section: no planting buffer, a narrow or absent sidewalk, and an overly wide travel lane.
  </IllustrationFrame>
  <IllustrationFrame label="Commonway recommendation" tone="amber">
    Sidewalk 5 ft, planting/furnishing zone 5 ft (standard, not optional), shared two-way undivided travel lane 18 ft, sized to self-enforce 20 mph.<Citation index={1} />
  </IllustrationFrame>
  <IllustrationCallouts>
    <IllustrationCallout number={1} kind="physical">Sidewalk sized for comfortable two-way pedestrian travel.</IllustrationCallout>
    <IllustrationCallout number={2} kind="physical">Planting/furnishing zone buffering pedestrians from the travel lane.</IllustrationCallout>
    <IllustrationCallout number={3} kind="physical">Travel lane narrowed to self-enforce 20 mph.<Citation index={2} /></IllustrationCallout>
  </IllustrationCallouts>
</Illustration>

## Where this pattern applies

Typical at: <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Rural is an edge case, not the norm. Farm and rural-residential contexts more often produce a [Rural Collector / Farm-to-Market Road](/patterns/collectors/rural-collector/) pattern instead, since a genuinely Local-scale street needs enough nearby development to serve. Undeveloped contexts are unlikely to carry a Local street at all, for the same reason.

## Speed and modal hierarchy

20 mph hard maximum, no exceptions. This is not a target or an aspirational limit: under CS's self-enforcing roadway principle, design speed always equals posted speed, so the street's geometry itself has to make 20 mph the comfortable driving speed, not just the posted number.<Citation index={1} />

Modal hierarchy follows the Local base order without an override:

1. Pedestrian
2. Bicycle
3. Transit
4. Vehicle
5. Freight

This order follows directly from Local's access-priority role in the Functional Classification system, not from a judgment call specific to this Typology. A named Typology only reorders it when the Typology's whole purpose is a specific mode, for example [Alley](/patterns/local-streets/alley/) (Vehicle and Freight first, since the entire point is service and driveway access) or [Bicycle Boulevard / Neighborhood Greenway](/patterns/local-streets/bicycle-boulevard/) (Bicycle first, since shared-street bicycle priority is the entire point).

## Relationship to other Local Typologies

This entry is the reference point, not one option among equals. Reading the other eleven Local Typologies as departures from this baseline makes the whole set easier to hold in mind:

- **Access-pattern departures:** [Alley](/patterns/local-streets/alley/), [Cul-de-sac](/patterns/local-streets/cul-de-sac/), [Frontage / Service Road](/patterns/local-streets/frontage-service-road/)
- **Land-use departures:** [Main Street](/patterns/local-streets/main-street/)
- **Traffic-model departures:** [Living Street / Woonerf](/patterns/local-streets/living-street-woonerf/), [Yield Street](/patterns/local-streets/yield-street/)
- **Temporary or event-based departures:** [Festival Street](/patterns/local-streets/festival-street/), [School Street](/patterns/local-streets/school-street/)
- **Full-time single-mode departures:** [Pedestrian-only Street / Plaza](/patterns/local-streets/pedestrian-plaza/), [Local Transit](/patterns/local-streets/local-transit/), [Bicycle Boulevard / Neighborhood Greenway](/patterns/local-streets/bicycle-boulevard/)

## Where a Local street meets a bigger street

The default intersection treatment where this pattern meets a Collector is a [Continuous Sidewalk / Raised Junction](/patterns/intersections/continuous-sidewalk/): the sidewalk and bike path stay uninterrupted, and the roadway ramps up to meet them rather than the reverse.

## Design notes

This entry is the standard against which every other Local Typology is defined as an override. A Typology only departs from the base modal order when its entire reason for existing is a specific mode.

## Related patterns

[Continuous Sidewalk / Raised Junction](/patterns/intersections/continuous-sidewalk/) (INT-CSJ-06) (this pattern's own default intersection treatment where it meets a Collector), [Default (Standard Collector)](/patterns/collectors/default/) (COL-DEF-01) (the equivalent baseline one Functional Classification up)

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> FHWA, "Self-Enforcing Roadways: A Guidance Report," FHWA-HRT-17-098, 2018.
2. <span id="ref-2"></span><EvidenceChip tier="precedent" /> National Association of City Transportation Officials, *Urban Street Design Guide*, "Street Design Principles: Lane Width."
