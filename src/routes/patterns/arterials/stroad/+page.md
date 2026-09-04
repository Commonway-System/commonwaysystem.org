---
title: Stroad
description: An Arterial anti-pattern, Avoid status, mixing on-street parking or direct property access with through traffic. This page exists to help identify and replace it.
llms: An Arterial anti-pattern marked Avoid, formed by mixing on-street parking or direct property access with through traffic. This page exists to help identify and replace it with Boulevard or Default Arterial.
---

<script>
  import { PatternCard, DensityChip } from '$lib/theme/components'
</script>

<PatternCard id="ART-STD-05" title="Stroad" classification="arterial" status="avoid">
A street and Arterial hybrid: through traffic mixed with on-street parking and direct property access along the same corridor. This is the exact combination the Arterial core safety rule prohibits.
</PatternCard>

Occurs most often at: <DensityChip tier="Rural" /> <DensityChip tier="Suburban" /> <DensityChip tier="Compact" />

Undeveloped and Urban are edge cases. Core is an unlikely pairing.

:::danger
Stroad is an explicit **Avoid** pattern within the Commonway System, not a Typology to design toward. No default modal order is assigned, since the pattern itself is the anti-pattern being flagged.
:::

## Design notes

The density figures above track how often this pattern actually occurs in the built environment, not whether it should. It is most common from Rural through Compact density, matching the typical state-highway-turned-suburban-corridor problem: a road built for through movement that gradually accumulates driveways and curb cuts as adjacent land develops.

This page exists to help readers identify a Stroad and replace it, with Boulevard where a pedestrian-first frontage fits the corridor, or with Default Arterial paired with a separate Local or Frontage/Service Road where it does not.

:::unsourced
Formal citations for this pattern have not yet been compiled from primary sources.
:::
