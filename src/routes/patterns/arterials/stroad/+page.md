---
title: Stroad (Commercial Arterial)
description: An Arterial anti-pattern, Avoid status, mixing on-street parking or direct property access with through traffic. This page exists to help identify and replace it.
patternId: ART-STD-05
status: avoid
date: 2026-08-29
image: /patterns/art-std-05-stroad-commercial-arterial.png
llms: An Arterial anti-pattern marked Avoid, formed by mixing on-street parking or direct property access with through traffic. This page exists to help identify and replace it with Boulevard or Default Arterial.
---

<script>
  import viewerData from '$lib/data/street-configs/art-std-05'
  import { Citation, DensityChip, EvidenceChip, IdPill, ModalHierarchySection, PatternViewer, RelatedMedia, SpeedLimitSection, SpeedModalHierarchyCard } from '$lib/theme/components'
</script>

A street and Arterial hybrid, known under two common names, Stroad (coined by Strong Towns) and Commercial Arterial: through traffic mixed with on-street parking, frequent direct commercial driveway access, or both, along the same corridor.<Citation index={1} /> This is the exact combination the Arterial core safety rule prohibits: arterials should carry through traffic without direct property access or on-street parking competing for the same space.<Citation index={2} />

<PatternViewer data={viewerData} image={fm.image} title={fm.title} classification="arterial" />

Occurs most often at: <DensityChip tier="Rural" /> <DensityChip tier="Suburban" /> <DensityChip tier="Compact" />

Undeveloped and Urban are edge cases. Core is an unlikely pairing.

:::danger
Stroad is an explicit **Avoid** pattern within the Commonway System, not a Typology to design toward. No default modal order is assigned, since the pattern itself is the anti-pattern being flagged.
:::

## Speed and modal hierarchy

<SpeedModalHierarchyCard>
<SpeedLimitSection speeds={[55, 45, 40]} stacked>
Stroad mixes through traffic with on-street parking and direct driveway access, the exact combination the Arterial core safety rule prohibits. No single design speed is safe for this mismatch; the signs above show the density-tiered baseline this pattern violates, not a speed to design toward.

</SpeedLimitSection>

<ModalHierarchySection>
No default modal order is assigned, since the pattern itself is the anti-pattern being flagged.

</ModalHierarchySection>

</SpeedModalHierarchyCard>

<RelatedMedia id={fm.patternId} />

## Design notes

The density figures above track how often this pattern actually occurs in the built environment, not whether it should. It is most common from Rural through Compact density, matching the typical state-highway-turned-suburban-corridor problem: a road built for through movement that gradually accumulates driveways and curb cuts as adjacent land develops.

Every direct driveway or curb cut along the corridor is a conflict point undermining both through-traffic flow and safety: access-point density correlates directly with crash rate, with high-density segments running roughly three times the crash rate of well-managed comparison segments.<Citation index={3} />

This page exists to help readers identify a Stroad and replace it, with Boulevard where a pedestrian-first frontage fits the corridor, or with Default Arterial paired with a separate Local or Frontage/Service Road where it does not.

A stroad that crosses a bridge, or passes under a rail viaduct, keeps its problems there. When the structure is reworked, it should take the pattern the street is moving toward, not the stroad's. See [Streets on Bridges](/guide/streets-on-bridges/).

## Related patterns

<div class="cw-links">

- [Boulevard](/patterns/arterials/boulevard/) <IdPill id="ART-BLV-02" />
- [Default (No Parking, No Direct Access)](/patterns/arterials/default/) <IdPill id="ART-DEF-01" />
- [Frontage / Service Road](/patterns/local-streets/frontage-service-road/) <IdPill id="LOC-FSR-04" />

</div>

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> [Marohn, C., "What's a STROAD and Why Does It Matter?", Strong Towns.](https://www.strongtowns.org/journal/2018-3-1-whats-a-stroad-and-why-does-it-matter)
2. <span id="ref-2"></span><EvidenceChip tier="legal" /> [American Association of State Highway and Transportation Officials, *A Policy on Geometric Design of Highways and Streets* ("Green Book").](https://store.transportation.org/Item/PublicationDetail?ID=4127)
3. <span id="ref-3"></span><EvidenceChip tier="evidence" /> [Gluck, J., Levinson, H.S., and Stover, V., *Impacts of Access Management Techniques*, NCHRP Report 420, Transportation Research Board, 1999. Crash rates rise consistently with access-point density; high-density segments show crash rates approximately 3x well-managed comparison segments.](http://onlinepubs.trb.org/onlinepubs/nchrp/nchrp_rpt_420.pdf)
