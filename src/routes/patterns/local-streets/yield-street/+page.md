---
title: Yield Street
description: A Local Typology narrow enough that opposing vehicles yield to each other, viable only where traffic volume genuinely stays low.
patternId: LOC-YLD-07
date: 2026-08-29
llms: A narrow Local street typology where opposing vehicles yield to each other by design, viable only at genuinely low traffic volumes.
---

<script>
  import { Citation, DensityChip, EvidenceChip, ModalHierarchySection, PatternCard, RelatedMedia, SpeedLimitSection, SpeedModalHierarchyCard } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Yield Street" classification="local" status="recommended">
A Local street narrow enough that two vehicles cannot pass without one yielding, using the street's width itself as a traffic-calming device.
</PatternCard>

<RelatedMedia id={fm.patternId} />

Typical at: <DensityChip tier="Suburban" /> <DensityChip tier="Compact" />

Rural and Urban are edge cases. Undeveloped and Core are unlikely pairings, since local street volumes at Core density typically exceed what yield control can handle safely.

## Speed and modal hierarchy

<SpeedModalHierarchyCard>
<SpeedLimitSection speeds={[20]}>
Follows the Local default: 20 mph hard maximum, no exceptions.

</SpeedLimitSection>
<ModalHierarchySection classification="local" rows={[{ tiers: ['pedestrian', 'bicycle', 'vehicle', 'transit', 'freight'] }]}>
Marked as needing confirmation rather than fully locked.

</ModalHierarchySection>

</SpeedModalHierarchyCard>

## Design notes

This pattern only functions where traffic volume is genuinely low. It thins out toward Urban and Core, where local street volumes typically outgrow what a shared, yield-controlled width can safely absorb.<Citation index={1} />

## Related patterns

[Living Street / Woonerf](/patterns/local-streets/living-street-woonerf/) (LOC-LSW-06) (the reciprocal pattern, sharing width-as-calming-device but going further to treat vehicles as guests)

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> NACTO, *Urban Street Design Guide*, "Yield Street."
