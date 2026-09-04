---
title: Default (Standard Local Street)
description: The baseline Local street typology, carrying the base modal hierarchy and 20 mph speed cap with no named override.
llms: The baseline Local street, applying the base modal hierarchy and 20 mph design speed with no named override.
---

<script>
  import { PatternCard, DensityChip } from '$lib/theme/components'
</script>

<PatternCard id="LOC-DEF-01" title="Default (Standard Local Street)" classification="local" status="recommended">
The baseline Local street. No special access pattern, event use, or dedicated mode gives it a name of its own, so it carries the base Local modal hierarchy and speed rule unmodified. Every other Local Typology is defined as a departure from this one: a Typology earns its own name only when its entire reason for existing is a specific access pattern, a specific event use, or a specific mode.
</PatternCard>

## Where this pattern applies

Typical at: <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Rural is an edge case, not the norm. Farm and rural-residential contexts more often produce a [Rural Collector / Farm-to-Market Road](/patterns/collectors/rural-collector/) pattern instead, since a genuinely Local-scale street needs enough nearby development to serve. Undeveloped contexts are unlikely to carry a Local street at all, for the same reason.

## Speed and modal hierarchy

20 mph hard maximum, no exceptions. This is not a target or an aspirational limit: under CS's self-enforcing roadway principle, design speed always equals posted speed, so the street's geometry itself has to make 20 mph the comfortable driving speed, not just the posted number.

Modal hierarchy follows the Local base order without an override:

1. Pedestrian
2. Bicycle
3. Transit
4. Vehicle
5. Freight

This order follows directly from Local's access-priority role in the Functional Classification system, not from a judgment call specific to this Typology. A named Typology only reorders it when the Typology's whole purpose is a specific mode, for example [Alley](/patterns/local-streets/alley/) (Vehicle and Freight first, since the entire point is service and driveway access) or [Bicycle Boulevard / Neighborhood Greenway](/patterns/local-streets/bicycle-boulevard/) (Bicycle first, since shared-street bicycle priority is the entire point).

## Cross-section

:::note
No cross-section illustration exists yet for this Typology. Per the Brand Guide, every pattern page should carry a grayscale cross-section with the specific element being described flooded in amber and human figures drawn at true scale. Lane width, sidewalk width, and whether a planting/furnishing zone is part of the Default cross-section (or an optional add-on) are not locked yet, so the illustration is pending those numbers rather than guessed. Placeholder zones only, left to right: sidewalk (width TBD), planting/furnishing zone (presence and width TBD), shared two-way travel lane (width TBD), sidewalk (width TBD).
:::

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

:::unsourced
Formal citations for this pattern have not yet been compiled from primary sources. The 20 mph cap and the self-enforcing roadway principle both trace back to FHWA sources already identified in earlier research, so this is a compiling task rather than an open research gap.
:::
