---
title: Pattern Index
description: Every pattern in the Commonway System, grouped by Scale, from the whole Network down to individual Elements.
date: 2026-08-31
llms: Index of every pattern in the Commonway System guidebook, grouped by Scale (Network, Corridor, Segment/Intersection by Functional Classification, Facility, Element).
---

<script>
  import { PatternIndexCard } from '$lib/theme/components'
</script>

Every pattern currently in the Commonway System, grouped by Scale: Network, Corridor, Segment/Intersection (the one Scale that further subdivides by Functional Classification), Facility, and Element. See [Scale Hierarchy](/guide/scale-hierarchy/) for what each Scale covers and how they relate.

## Network level patterns

Network patterns describe the topology of a whole connected system, or a defined sub-system within it, not any single physical place. You would not stand in one spot and see a Network pattern, you would see it on a map: a grid versus a radial layout, how branching or connectivity shapes route choice across an entire area.

<div class="pattern-index-grid">
  <PatternIndexCard href="/patterns/network/grid/" id="NET-GRD-01" title="Grid" classification="network" />
  <PatternIndexCard href="/patterns/network/dendritic-hierarchical/" id="NET-DEN-02" title="Dendritic / Hierarchical" classification="network" status="situational" />
  <PatternIndexCard href="/patterns/network/radial/" id="NET-RAD-03" title="Radial" classification="network" status="situational" />
  <PatternIndexCard href="/patterns/network/organic-irregular/" id="NET-ORG-04" title="Organic / Irregular" classification="network" />
</div>

## Corridor level patterns

Corridor patterns describe a linear stretch of the network connecting two places, often crossing multiple contexts along the way. This is the level where transitions get designed on purpose, a road's character changing as it moves from farmland into town, or a fixed transit alignment shaping a cross-section for miles at a stretch, rather than being left to happen segment by segment with no coordination.

<div class="pattern-index-grid">
  <PatternIndexCard href="/patterns/corridors/density-step-down-step-up/" id="CDR-DSD-01" title="Density Step-Down / Step-Up" classification="corridor" />
  <PatternIndexCard href="/patterns/corridors/rural-to-town-gateway/" id="CDR-RTG-02" title="Rural-to-Town Gateway" classification="corridor" />
  <PatternIndexCard href="/patterns/corridors/character-transect/" id="CDR-CTR-03" title="Character Transect" classification="corridor" />
  <PatternIndexCard href="/patterns/corridors/rail-with-trail-corridor/" id="CDR-RWT-04" title="Rail-With-Trail Corridor" classification="corridor" status="situational" />
  <PatternIndexCard href="/patterns/corridors/road-adjacent-greenway/" id="CDR-RAG-05" title="Road-Adjacent Greenway" classification="corridor" />
  <PatternIndexCard href="/patterns/corridors/transit-alignment-corridor/" id="CDR-TAC-06" title="Transit Alignment Corridor" classification="corridor" status="situational" />
</div>

## Local street patterns

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
  <PatternIndexCard href="/patterns/local-streets/shared-use-path/" id="LOC-SUP-13" title="Shared-Use Path" classification="local" />
</div>

## Collector street patterns

Collectors link local streets to the arterial network, carrying more through traffic while still running past homes and storefronts. Speeds top out at 30 mph, 35 only behind rigid crash-protective separation, with walking, biking, and transit still taking priority.

<div class="pattern-index-grid">
  <PatternIndexCard href="/patterns/collectors/default/" id="COL-DEF-01" title="Default (Standard Collector)" classification="collector" />
  <PatternIndexCard href="/patterns/collectors/rural-collector/" id="COL-FTM-02" title="Rural Collector / Farm-to-Market Road" classification="collector" />
  <PatternIndexCard href="/patterns/collectors/industrial-collector/" id="COL-IND-03" title="Industrial Collector" classification="collector" />
  <PatternIndexCard href="/patterns/collectors/bike-highway-greenway/" id="COL-BHG-04" title="Bike Highway / Greenway" classification="collector" />
  <PatternIndexCard href="/patterns/collectors/collector-transit/" id="COL-CTR-05" title="Collector Transit" classification="collector" />
  <PatternIndexCard href="/patterns/collectors/multi-use-trail-greenway/" id="COL-MUT-06" title="Multi-Use Trail / Greenway" classification="collector" />
  <PatternIndexCard href="/patterns/collectors/downtown-thoroughfare/" id="COL-DTH-07" title="Downtown Thoroughfare" classification="collector" status="situational" />
</div>

## Arterial street patterns

Arterials move higher volumes of through traffic over longer distances, so the core rule is separation: no on-street parking or driveway access competing with through movement. Posted speed always matches the road's actual design speed. Transit takes priority here, ahead of people walking and biking.

<div class="pattern-index-grid">
  <PatternIndexCard href="/patterns/arterials/default/" id="ART-DEF-01" title="Default (No Parking, No Direct Access)" classification="arterial" />
  <PatternIndexCard href="/patterns/arterials/boulevard/" id="ART-BLV-02" title="Boulevard" classification="arterial" />
  <PatternIndexCard href="/patterns/arterials/scenic-highway-byway/" id="ART-SCB-03" title="Scenic Highway / Byway" classification="arterial" />
  <PatternIndexCard href="/patterns/arterials/arterial-transit/" id="ART-ATR-04" title="Arterial Transit (BRT/LRT)" classification="arterial" />
  <PatternIndexCard href="/patterns/arterials/stroad/" id="ART-STD-05" title="Stroad" classification="arterial" status="avoid" />
  <PatternIndexCard href="/patterns/arterials/one-way-street/" id="ART-OWS-06" title="One-Way Street" classification="arterial" status="situational" />
  <PatternIndexCard href="/patterns/arterials/commercial-arterial/" id="ART-CAR-07" title="Commercial Arterial" classification="arterial" status="avoid" />
  <PatternIndexCard href="/patterns/arterials/parkway/" id="ART-PKY-08" title="Parkway" classification="arterial" status="situational" />
</div>

## Freeway patterns

Freeways sit outside the Commonway System's detailed design scope entirely. They're listed here for completeness, not because the system sets rules for them: no modal hierarchy, no speed regulation.

<div class="pattern-index-grid">
  <PatternIndexCard href="/patterns/freeways/default/" id="FRE-DEF-01" title="Default (Freeway)" classification="freeway" />
  <PatternIndexCard href="/patterns/freeways/expressway/" id="FRE-EXP-02" title="Expressway" classification="freeway" />
  <PatternIndexCard href="/patterns/freeways/beltway-ring-road/" id="FRE-BLT-03" title="Beltway / Ring Road" classification="freeway" />
  <PatternIndexCard href="/patterns/freeways/freeway-transit/" id="FRE-FTR-04" title="Freeway-scale Transit (Commuter / Heavy Rail)" classification="freeway" />
</div>

## Intersections and crossings

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
  <PatternIndexCard href="/patterns/intersections/protected-intersection/" id="INT-PRI-11" title="Protected Intersection" classification="intersections" />
</div>

## Facility level patterns

Facility patterns describe something that attaches to a segment or intersection rather than being one: a bus shelter, a parking garage, a plaza. Each is internally complex enough to have its own element-level layout inside it.

<div class="pattern-index-grid">
  <PatternIndexCard href="/patterns/facilities/transit-shelter/" id="FAC-TSH-01" title="Transit Shelter" classification="facility" />
  <PatternIndexCard href="/patterns/facilities/transit-platform/" id="FAC-TPL-02" title="Transit Platform" classification="facility" />
  <PatternIndexCard href="/patterns/facilities/transit-hub-station/" id="FAC-THS-03" title="Transit Hub / Station" classification="facility" />
  <PatternIndexCard href="/patterns/facilities/surface-parking-lot/" id="FAC-SPL-04" title="Surface Parking Lot" classification="facility" status="situational" />
  <PatternIndexCard href="/patterns/facilities/parking-garage-structure/" id="FAC-PGS-05" title="Parking Garage / Structure" classification="facility" status="situational" />
  <PatternIndexCard href="/patterns/facilities/park-and-ride/" id="FAC-PNR-06" title="Park-and-Ride" classification="facility" status="situational" />
  <PatternIndexCard href="/patterns/facilities/plaza-parklet/" id="FAC-PLZ-07" title="Plaza / Parklet" classification="facility" />
  <PatternIndexCard href="/patterns/facilities/bike-parking-corral/" id="FAC-BPC-08" title="Bike Parking Corral" classification="facility" />
  <PatternIndexCard href="/patterns/facilities/bike-share-station/" id="FAC-BSS-09" title="Bike-Share Station" classification="facility" status="situational" />
  <PatternIndexCard href="/patterns/facilities/secure-bike-parking-bike-station/" id="FAC-SBP-10" title="Secure Bike Parking / Bike Station" classification="facility" status="situational" />
</div>

## Element level patterns

Element patterns describe the physical components a segment, intersection, or facility is built from: curbs, medians, signage, striping, signals, street trees, lighting. This is the most granular Scale in the system, and the level most other patterns eventually point down to.

<div class="pattern-index-grid">
  <PatternIndexCard href="/patterns/elements/curb/" id="ELM-CRB-01" title="Curb" classification="element" />
  <PatternIndexCard href="/patterns/elements/curb-extension/" id="ELM-CBE-02" title="Curb Extension" classification="element" />
  <PatternIndexCard href="/patterns/elements/curb-ramp/" id="ELM-CRP-03" title="Curb Ramp" classification="element" />
  <PatternIndexCard href="/patterns/elements/curb-cut-driveway-apron/" id="ELM-CCA-04" title="Curb Cut / Driveway Apron" classification="element" status="situational" />
  <PatternIndexCard href="/patterns/elements/wheel-stop/" id="ELM-WHS-05" title="Wheel Stop" classification="element" status="situational" />
  <PatternIndexCard href="/patterns/elements/vertical-speed-control/" id="ELM-VSC-06" title="Vertical Speed Control" classification="element" />
  <PatternIndexCard href="/patterns/elements/rumble-strip/" id="ELM-RMS-07" title="Rumble Strip" classification="element" status="situational" />
  <PatternIndexCard href="/patterns/elements/crosswalk/" id="ELM-CRW-08" title="Crosswalk" classification="element" />
  <PatternIndexCard href="/patterns/elements/pedestrian-safety-island-refuge/" id="ELM-PSI-09" title="Pedestrian Safety Island / Refuge" classification="element" />
  <PatternIndexCard href="/patterns/elements/detectable-warning-surface/" id="ELM-DWS-10" title="Detectable Warning Surface" classification="element" />
  <PatternIndexCard href="/patterns/elements/regulatory-sign/" id="ELM-RGS-11" title="Regulatory Sign" classification="element" />
  <PatternIndexCard href="/patterns/elements/warning-sign/" id="ELM-WNS-12" title="Warning Sign" classification="element" />
  <PatternIndexCard href="/patterns/elements/guide-sign/" id="ELM-GDS-13" title="Guide Sign" classification="element" />
  <PatternIndexCard href="/patterns/elements/traffic-signal/" id="ELM-TFS-14" title="Traffic Signal" classification="element" status="situational" />
  <PatternIndexCard href="/patterns/elements/pedestrian-signal/" id="ELM-PDS-15" title="Pedestrian Signal" classification="element" />
  <PatternIndexCard href="/patterns/elements/bicycle-signal/" id="ELM-BCS-16" title="Bicycle Signal" classification="element" status="situational" />
  <PatternIndexCard href="/patterns/elements/rrfb/" id="ELM-RRF-17" title="RRFB" classification="element" />
  <PatternIndexCard href="/patterns/elements/pedestrian-hybrid-beacon/" id="ELM-PHB-18" title="Pedestrian Hybrid Beacon" classification="element" status="situational" />
  <PatternIndexCard href="/patterns/elements/bioswale/" id="ELM-BIO-19" title="Bioswale" classification="element" />
  <PatternIndexCard href="/patterns/elements/flow-through-planter/" id="ELM-FTP-20" title="Flow-Through Planter" classification="element" status="situational" />
  <PatternIndexCard href="/patterns/elements/pervious-strip/" id="ELM-PVS-21" title="Pervious Strip" classification="element" status="situational" />
  <PatternIndexCard href="/patterns/elements/pervious-pavement/" id="ELM-PVP-22" title="Pervious Pavement" classification="element" status="situational" />
  <PatternIndexCard href="/patterns/elements/traffic-barrier/" id="ELM-TRB-23" title="Traffic Barrier" classification="element" status="situational" />
  <PatternIndexCard href="/patterns/elements/crash-cushion-end-terminal/" id="ELM-CCT-24" title="Crash Cushion / End Terminal" classification="element" />
  <PatternIndexCard href="/patterns/elements/bollard/" id="ELM-BOL-25" title="Bollard" classification="element" />
  <PatternIndexCard href="/patterns/elements/street-light/" id="ELM-STL-26" title="Street Light" classification="element" />
  <PatternIndexCard href="/patterns/elements/pedestrian-scale-lighting/" id="ELM-PSL-27" title="Pedestrian-scale Lighting" classification="element" />
  <PatternIndexCard href="/patterns/elements/street-tree/" id="ELM-STT-28" title="Street Tree" classification="element" />
  <PatternIndexCard href="/patterns/elements/tree-pit-tree-trench/" id="ELM-TPT-29" title="Tree Pit / Tree Trench" classification="element" />
  <PatternIndexCard href="/patterns/elements/landscaped-buffer-strip/" id="ELM-LBS-30" title="Landscaped Buffer Strip" classification="element" />
  <PatternIndexCard href="/patterns/elements/bench/" id="ELM-BCH-31" title="Bench" classification="element" />
  <PatternIndexCard href="/patterns/elements/trash-recycling-receptacle/" id="ELM-TRR-32" title="Trash / Recycling Receptacle" classification="element" />
  <PatternIndexCard href="/patterns/elements/drinking-fountain/" id="ELM-DRF-33" title="Drinking Fountain" classification="element" status="situational" />
  <PatternIndexCard href="/patterns/elements/conventional-bike-lane/" id="ELM-CBL-34" title="Conventional Bike Lane" classification="element" status="situational" />
  <PatternIndexCard href="/patterns/elements/buffered-bike-lane/" id="ELM-BBL-35" title="Buffered Bike Lane" classification="element" />
  <PatternIndexCard href="/patterns/elements/advisory-bike-lane/" id="ELM-ABL-36" title="Advisory Bike Lane" classification="element" status="situational" />
  <PatternIndexCard href="/patterns/elements/protected-bike-lane-cycle-track/" id="ELM-PBL-37" title="Protected Bike Lane / Cycle Track" classification="element" />
  <PatternIndexCard href="/patterns/elements/green-pavement-conflict-marking/" id="ELM-GPM-38" title="Green Pavement / Conflict Marking" classification="element" />
  <PatternIndexCard href="/patterns/elements/sharrow/" id="ELM-SHR-39" title="Sharrow" classification="element" status="avoid" />
  <PatternIndexCard href="/patterns/elements/bike-parking-rack/" id="ELM-BPR-40" title="Bike Parking / Rack" classification="element" />
  <PatternIndexCard href="/patterns/elements/transit-boarding-island/" id="ELM-TBI-41" title="Transit Boarding Island" classification="element" />
  <PatternIndexCard href="/patterns/elements/bike-box/" id="ELM-BKB-42" title="Bike Box" classification="element" />
  <PatternIndexCard href="/patterns/elements/two-stage-turn-queue-box/" id="ELM-TSQ-43" title="Two-Stage Turn Queue Box" classification="element" />
</div>
