---
title: Pattern Index
description: Every Street Typology in the Commonway System, grouped by Functional Classification, from Local streets through Freeways and Intersections & Crossings.
date: 2026-08-28
llms: Index of every pattern in the Commonway System guidebook, grouped by Functional Classification and Street Typology.
---

<script>
  import { PatternIndexCard } from '$lib/theme/components'
</script>

Every Street Typology in the current Commonway System working set, grouped by Functional Classification. Scale hierarchy runs Network, Corridor, then Segment and Intersection as siblings, then Facility and Element; every entry below is Segment scale except the Intersections & Crossings group, which is Intersection scale.

## Local

Local streets have many access points and short trips, so keeping speeds under 20 mph, no exceptions, matters more than moving vehicles quickly. Walking and biking come first, then transit, then vehicles and freight.

<div class="pattern-index-grid">
  <PatternIndexCard href="/patterns/local-streets/default/" id="LOC-DEF-01" title="Default (Standard Local Street)" classification="local" />
  <PatternIndexCard href="/patterns/local-streets/alley/" id="LOC-ALY-02" title="Alley" classification="local" image="/patterns/loc-aly-02-alley.png" />
  <PatternIndexCard href="/patterns/local-streets/cul-de-sac/" id="LOC-CDS-03" title="Cul-de-sac" classification="local" status="situational" image="/patterns/loc-cds-03-cul-de-sac.png" />
  <PatternIndexCard href="/patterns/local-streets/frontage-service-road/" id="LOC-FSR-04" title="Frontage / Service Road" classification="local" image="/patterns/loc-fsr-04-frontage-service-road.png" />
  <PatternIndexCard href="/patterns/local-streets/main-street/" id="LOC-MST-05" title="Main Street" classification="local" image="/patterns/loc-mst-05-main-street.png" />
  <PatternIndexCard href="/patterns/local-streets/living-street-woonerf/" id="LOC-LSW-06" title="Living Street / Woonerf" classification="local" image="/patterns/loc-lsw-06-living-street-woonerf.png" />
  <PatternIndexCard href="/patterns/local-streets/yield-street/" id="LOC-YLD-07" title="Yield Street" classification="local" image="/patterns/loc-yld-07-yield-street.png" />
  <PatternIndexCard href="/patterns/local-streets/festival-street/" id="LOC-FES-08" title="Festival Street" classification="local" image="/patterns/loc-fes-08-festival-street.png" />
  <PatternIndexCard href="/patterns/local-streets/pedestrian-plaza/" id="LOC-PED-09" title="Pedestrian-only Street / Plaza" classification="local" status="situational" image="/patterns/loc-ped-09-pedestrian-only-street-plaza.png" />
  <PatternIndexCard href="/patterns/local-streets/local-transit/" id="LOC-LTR-10" title="Local Transit" classification="local" image="/patterns/loc-ltr-10-local-transit.png" />
  <PatternIndexCard href="/patterns/local-streets/school-street/" id="LOC-SCH-11" title="School Street" classification="local" image="/patterns/loc-sch-11-school-street.png" />
  <PatternIndexCard href="/patterns/local-streets/bicycle-boulevard/" id="LOC-BBG-12" title="Bicycle Boulevard / Neighborhood Greenway" classification="local" />
</div>

## Collector

Collectors link local streets to the arterial network, carrying more through traffic while still running past homes and storefronts. Speeds top out at 30 mph, 35 only behind rigid crash-protective separation, with walking, biking, and transit still taking priority.

<div class="pattern-index-grid">
  <PatternIndexCard href="/patterns/collectors/default/" id="COL-DEF-01" title="Default (Standard Collector)" classification="collector" />
  <PatternIndexCard href="/patterns/collectors/rural-collector/" id="COL-FTM-02" title="Rural Collector / Farm-to-Market Road" classification="collector" />
  <PatternIndexCard href="/patterns/collectors/industrial-collector/" id="COL-IND-03" title="Industrial Collector" classification="collector" />
  <PatternIndexCard href="/patterns/collectors/bike-highway-greenway/" id="COL-BHG-04" title="Bike Highway / Greenway" classification="collector" />
  <PatternIndexCard href="/patterns/collectors/collector-transit/" id="COL-CTR-05" title="Collector Transit" classification="collector" />
</div>

## Arterial

Arterials move higher volumes of through traffic over longer distances, so the core rule is separation: no on-street parking or driveway access competing with through movement. Posted speed always matches the road's actual design speed. Transit takes priority here, ahead of people walking and biking.

<div class="pattern-index-grid">
  <PatternIndexCard href="/patterns/arterials/default/" id="ART-DEF-01" title="Default (No Parking, No Direct Access)" classification="arterial" />
  <PatternIndexCard href="/patterns/arterials/boulevard/" id="ART-BLV-02" title="Boulevard" classification="arterial" />
  <PatternIndexCard href="/patterns/arterials/scenic-highway-byway/" id="ART-SCB-03" title="Scenic Highway / Byway" classification="arterial" />
  <PatternIndexCard href="/patterns/arterials/arterial-transit/" id="ART-ATR-04" title="Arterial Transit (BRT/LRT)" classification="arterial" />
  <PatternIndexCard href="/patterns/arterials/stroad/" id="ART-STD-05" title="Stroad" classification="arterial" status="avoid" />
  <PatternIndexCard href="/patterns/arterials/one-way-street/" id="ART-OWS-06" title="One-Way Street" classification="arterial" status="situational" />
</div>

## Freeway

Freeways sit outside the Commonway System's detailed design scope entirely. They're listed here for completeness, not because the system sets rules for them: no modal hierarchy, no speed regulation.

<div class="pattern-index-grid">
  <PatternIndexCard href="/patterns/freeways/default/" id="FRE-DEF-01" title="Default (Freeway)" classification="freeway" />
  <PatternIndexCard href="/patterns/freeways/expressway/" id="FRE-EXP-02" title="Expressway" classification="freeway" />
  <PatternIndexCard href="/patterns/freeways/beltway-ring-road/" id="FRE-BLT-03" title="Beltway / Ring Road" classification="freeway" />
  <PatternIndexCard href="/patterns/freeways/freeway-transit/" id="FRE-FTR-04" title="Freeway-scale Transit (Commuter / Heavy Rail)" classification="freeway" />
</div>

## Intersections & Crossings

Intersections aren't tied to one Functional Classification, since any two street types can meet at a corner. The default is a roundabout wherever a Collector-or-larger street is involved, stepping up to a turbo-roundabout at busy Arterial-to-Arterial junctions. Signals are a documented last resort, and a continuous sidewalk is the default where a Local street meets a Collector.

<div class="pattern-index-grid">
  <PatternIndexCard href="/patterns/intersections/roundabout/" id="INT-RAB-01" title="Roundabout (Single/Multi-Lane)" classification="intersections" image="/patterns/int-rab-01-roundabout.png" />
  <PatternIndexCard href="/patterns/intersections/turbo-roundabout/" id="INT-TRB-02" title="Turbo-Roundabout" classification="intersections" />
  <PatternIndexCard href="/patterns/intersections/signal/" id="INT-SIG-03" title="Signal" classification="intersections" />
  <PatternIndexCard href="/patterns/intersections/all-way-stop/" id="INT-AWS-04" title="All-Way Stop" classification="intersections" />
  <PatternIndexCard href="/patterns/intersections/stop-yield/" id="INT-SYD-05" title="Stop / Yield (Two-Way)" classification="intersections" />
  <PatternIndexCard href="/patterns/intersections/continuous-sidewalk/" id="INT-CSJ-06" title="Continuous Sidewalk / Raised Junction" classification="intersections" />
  <PatternIndexCard href="/patterns/intersections/uncontrolled/" id="INT-UNC-07" title="Uncontrolled" classification="intersections" />
  <PatternIndexCard href="/patterns/intersections/midblock-crossing/" id="INT-MPC-08" title="Midblock Pedestrian Crossing" classification="intersections" />
  <PatternIndexCard href="/patterns/intersections/driveway-curb-cut/" id="INT-DCC-09" title="Driveway / Curb Cut" classification="intersections" />
  <PatternIndexCard href="/patterns/intersections/grade-separated-interchange/" id="INT-GSI-10" title="Grade-Separated Interchange" classification="intersections" />
</div>

## Under review, no confirmed Functional Classification

These Typologies are documented in Commonway System working notes but are not yet placed in the grid above, so they have no pattern page yet.

- **Downtown Thoroughfare** (Collector, NACTO term, ambiguous against Arterial scale)
- **Avenue / Commercial Arterial / Downtown One-Way & Two-Way Street cluster** (Arterial, conflicts with the no-parking/no-direct-access rule as conventionally defined)
- **Parkway** (Freeway, historically ambiguous between Arterial-scale and Freeway-scale meanings)
