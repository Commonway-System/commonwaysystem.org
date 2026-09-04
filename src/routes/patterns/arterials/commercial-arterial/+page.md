---
title: "Commercial Arterial"
description: "An arterial-classified roadway lined with direct commercial driveway access and often on-street or adjacent surface parking serving those businesses, combining through-traffic movement with frequent access-point conflicts along its length."
patternId: ART-CAR-07
date: 2026-08-31
llms: "An arterial-classified roadway lined with direct commercial driveway access and often on-street or adjacent surface parking serving those businesses, combining through-traffic movement with frequent access-point conflicts along its length."
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Commercial Arterial" classification="arterial" status="avoid">
An arterial-classified roadway lined with direct commercial driveway access and often on-street or adjacent surface parking serving those businesses, combining through-traffic movement with frequent access-point conflicts along its length.
</PatternCard>

Typical at: <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" />

## Why this pattern exists

(Documented anti-pattern) This is one of the most common current commercial-corridor patterns in the US (the typical suburban commercial-strip arterial), and it violates Commonway System’s core Arterial design principle that arterials should carry through-traffic without direct property access or on-street parking, the same principle that defines a Stroad.<Citation index={2} /> Documenting it as an anti-pattern gives it a name and a citation-backed explanation, paired with a route to the correct alternative treatment.

## Key considerations

- Every direct commercial driveway onto the arterial is a conflict point that undermines both through-traffic flow and safety<Citation index={1} />
- The correct alternative is a Frontage/Service Road pattern parallel to the arterial, aggregating access points before they reach the arterial itself
- Closely related to, but distinct from, Stroad: a Commercial Arterial may not necessarily include on-street parking, but shares the same core access-management failure

## Related patterns

[Stroad](/patterns/arterials/stroad/) (ART-STD-05) (closely related anti-pattern), [Frontage/Service Road](/patterns/local-streets/frontage-service-road/) (LOC-FSR-04) (the correct alternative), [default Arterial pattern](/patterns/arterials/default/) (ART-DEF-01) (the no-direct-access principle this pattern violates)

## References

1. <span id="ref-1"></span><EvidenceChip tier="evidence" /> Gluck, J., Levinson, H.S., and Stover, V., *Impacts of Access Management Techniques*, NCHRP Report 420, Transportation Research Board, 1999. Crash rates rise consistently with access-point density; high-density segments show crash rates approximately 3x well-managed comparison segments.
2. <span id="ref-2"></span><EvidenceChip tier="legal" /> American Association of State Highway and Transportation Officials, *A Policy on Geometric Design of Highways and Streets* ("Green Book").
