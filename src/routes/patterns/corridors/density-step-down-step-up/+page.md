---
title: "Density Step-Down / Step-Up"
description: "The pattern governing how a road’s cross-section, speed, and character adjust where the surrounding density tier changes along its length."
patternId: CDR-DSD-01
date: 2026-08-31
llms: "The pattern governing how a road’s cross-section, speed, and character adjust where the surrounding density tier changes along its length."
---

<script>
  import { PatternCard } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Density Step-Down / Step-Up" classification="corridor" status="recommended">
The pattern governing how a road’s cross-section, speed, and character adjust where the surrounding density tier changes along its length.
</PatternCard>

*Working assessment: this pattern’s status reflects a preliminary Commonway System judgment call, pending final review.*

## Why this pattern exists

A road built to Urban-tier standards does not automatically become wrong when the buildings around it thin out, but it does need to change; a road that ignores the transition sends the wrong signal to drivers about what kind of place they are in. Density tiers already carry design implications (speed, cross-section, access spacing) at the Segment/Intersection scale; this pattern is what governs the handoff between two tiers along one continuous route, so the transition itself gets designed rather than left as an arbitrary jurisdictional boundary or abrupt lane-width jump.

## Key considerations

- The transition point should be marked by a deliberate, legible design change, not just a sign
- Direction of change matters: stepping down (Urban to Rural) generally means widening/simplifying; stepping up (Rural to Urban) means narrowing/adding modal infrastructure
- Transition length should scale with the speed differential between the two tiers (a bigger speed drop needs a longer, more gradual transition zone)

## Related patterns

[Rural-to-Town Gateway](/patterns/corridors/rural-to-town-gateway/) (CDR-RTG-02) (a special case of stepping down at a jurisdictional/settlement edge specifically, rather than a general tier change); relevant Segment-scale patterns at each density tier

:::unsourced
Formal citations for this pattern have not yet been compiled from primary sources.
:::
