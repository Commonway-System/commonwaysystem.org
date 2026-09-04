---
title: Retrofit Strategy Index
description: Every Retrofit Strategy currently in the Commonway System, grouped by scale, Corridor, Intersection, and Network.
date: 2026-09-03
llms: Index of every Retrofit Strategy in the Commonway System, grouped by scale (Corridor, Intersection, Network). A Retrofit Strategy describes how to move an existing street toward a Pattern.
---

<script>
  import { RetrofitIndexCard } from '$lib/theme/components'
</script>

Every Retrofit Strategy currently in the Commonway System, grouped by scale: Corridor, Intersection, and Network. See [How to read a retrofit strategy](/guide/how-to-read-a-retrofit-strategy/) for what each part of a Retrofit Strategy entry covers and how it relates to the Pattern catalog.

A Pattern describes what a street should be. A Retrofit Strategy describes how to move an existing street toward one. This index lists the strategies; [Patterns](/patterns/) has the destinations.

## Corridor level strategies

Corridor strategies change a single street segment's cross-section: lane count, lane width, curb use, or surface. Most can move through the construction spectrum starting from paint and temporary materials.

<div class="pattern-index-grid">
  <RetrofitIndexCard href="/retrofits/corridor/four-to-three-lane-road-diet/" id="RFT-CDR-01" title="Four-to-three lane road diet" scale="corridor" />
  <RetrofitIndexCard href="/retrofits/corridor/five-plus-lane-reallocation/" id="RFT-CDR-02" title="Five-plus lane reallocation" scale="corridor" />
  <RetrofitIndexCard href="/retrofits/corridor/lane-diet/" id="RFT-CDR-03" title="Lane diet" scale="corridor" />
  <RetrofitIndexCard href="/retrofits/corridor/one-way-to-two-way-conversion/" id="RFT-CDR-04" title="One-way to two-way conversion" scale="corridor" />
  <RetrofitIndexCard href="/retrofits/corridor/parking-lane-reallocation/" id="RFT-CDR-05" title="Parking-lane reallocation" scale="corridor" />
  <RetrofitIndexCard href="/retrofits/corridor/transit-priority-lane-retrofit/" id="RFT-CDR-06" title="Transit priority lane retrofit" scale="corridor" />
  <RetrofitIndexCard href="/retrofits/corridor/protected-bike-lane-width-reallocation/" id="RFT-CDR-07" title="Protected bike lane retrofit via lane-width reallocation" scale="corridor" />
  <RetrofitIndexCard href="/retrofits/corridor/protected-bike-lane-lane-removal/" id="RFT-CDR-08" title="Protected bike lane retrofit via lane removal" scale="corridor" />
  <RetrofitIndexCard href="/retrofits/corridor/protected-bike-lane-parking-reduction/" id="RFT-CDR-09" title="Protected bike lane retrofit via parking reduction" scale="corridor" />
  <RetrofitIndexCard href="/retrofits/corridor/depaving-pavement-to-gravel/" id="RFT-CDR-10" title="Depaving / pavement-to-gravel conversion" scale="corridor" />
</div>

## Intersection level strategies

Intersection strategies change how a single intersection controls conflicting movements. Several of these require real construction from the outset and can't be meaningfully piloted with temporary materials.

<div class="pattern-index-grid">
  <RetrofitIndexCard href="/retrofits/intersection/signal-to-roundabout-conversion/" id="RFT-INT-01" title="Signal-to-roundabout conversion" scale="intersection" />
  <RetrofitIndexCard href="/retrofits/intersection/median-u-turn-mut-retrofit/" id="RFT-INT-02" title="Median U-Turn (MUT) retrofit" scale="intersection" />
  <RetrofitIndexCard href="/retrofits/intersection/restricted-crossing-u-turn-rcut-retrofit/" id="RFT-INT-03" title="Restricted Crossing U-Turn (RCUT) retrofit" scale="intersection" />
  <RetrofitIndexCard href="/retrofits/intersection/displaced-left-turn-dlt-retrofit/" id="RFT-INT-04" title="Displaced Left-Turn (DLT) retrofit" scale="intersection" />
</div>

## Network level strategies

Network strategies change how an area functions as a whole, typically by restricting motor vehicle through-traffic without changing any single street's underlying topology classification.

<div class="pattern-index-grid">
  <RetrofitIndexCard href="/retrofits/network/modal-filtering-low-traffic-neighborhood-retrofit/" id="RFT-NET-01" title="Modal filtering / Low Traffic Neighborhood retrofit" scale="network" />
  <RetrofitIndexCard href="/retrofits/network/superblock-retrofit/" id="RFT-NET-02" title="Superblock retrofit" scale="network" />
  <RetrofitIndexCard href="/retrofits/network/barrier-crossing-network-reconnection-retrofit/" id="RFT-NET-03" title="Barrier-crossing / network reconnection retrofit" scale="network" />
</div>
