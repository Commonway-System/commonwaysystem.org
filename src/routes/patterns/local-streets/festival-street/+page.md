---
title: Festival Street
description: A Local Typology that closes to vehicle traffic during scheduled events and reverts to the base modal hierarchy off-hours.
patternId: LOC-FES-08
date: 2026-08-29
llms: A Local street typology that closes to vehicle traffic during scheduled events and reverts to the base Local modal hierarchy off-hours.
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Festival Street" classification="local" status="recommended">
A Local street designed to convert between full vehicle access and a pedestrian-and-bicycle-only event space, on a schedule rather than permanently.
</PatternCard>

Typical at: <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Compact is an edge case. Undeveloped, Rural, and Suburban are unlikely pairings.

## Modal hierarchy

During scheduled events: Pedestrian and Bicycle only. Off-hours: reverts to the Local base order.

## Design notes

The dual-mode design, full street for events and normal Local operation otherwise, is what distinguishes this from a permanent Pedestrian-only Street or Plaza. It requires enough event demand and foot traffic to justify the conversion, which is why it concentrates at Urban and Core density.<Citation index={1} />

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> Seattle Municipal Code §11.14.203, "Festival Streets."
