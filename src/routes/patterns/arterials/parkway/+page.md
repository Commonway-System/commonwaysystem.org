---
title: "Parkway"
description: "A roadway historically designed as a scenic, landscaped route, typically featuring a planted median and limited access, whose modern implementations vary widely between two distinct traditions: a limited-access, freeway-like facility, and a slower, arterial-scale boulevard-like facility running through or alongside parkland."
patternId: ART-PKY-07
date: 2026-08-31
llms: "A roadway historically designed as a scenic, landscaped route, typically featuring a planted median and limited access, whose modern implementations vary widely between two distinct traditions: a limited-access, freeway-like facility, and a slower, arterial-scale boulevard-like facility running through or alongside parkland."
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation, SpeedModalHierarchyCard, SpeedLimitSection, ModalHierarchySection } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Parkway" classification="arterial" status="situational">
A roadway historically designed as a scenic, landscaped route, typically featuring a planted median and limited access, whose modern implementations vary widely between two distinct traditions: a limited-access, freeway-like facility, and a slower, arterial-scale boulevard-like facility running through or alongside parkland.
</PatternCard>

Typical at: <DensityChip tier="Rural" /> <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" />

## Speed and modal hierarchy

<SpeedModalHierarchyCard>
<SpeedLimitSection speeds={[55, 45, 40, 35]} stacked>
Follows the Arterial density-tiered baseline for its typical Rural, Suburban, Compact, and Urban contexts. A Parkway meeting genuine freeway design standards should be read as a Freeway pattern instead, which carries no speed rule at all.

</SpeedLimitSection>
<ModalHierarchySection classification="arterial" rows={[{ tiers: ['transit', 'pedestrian', 'bicycle', 'vehicle', 'freight'] }]}>
Follows the Arterial base order without an override. A Parkway meeting genuine freeway design standards should be read as a Freeway pattern instead, which carries no modal hierarchy at all.

</ModalHierarchySection>

</SpeedModalHierarchyCard>

## Design notes

The term "parkway" carries genuinely conflicting meanings across American road-building history, spanning a limited-access freeway-like facility and a slower boulevard-like facility through or alongside parkland.<Citation index={1} /> A Parkway built to genuine freeway standards falls outside CS's Functional Classification system entirely and should be read as a Freeway pattern instead; this page's guidance does not apply to it. The more historically common case, a Parkway that does not meet freeway standards, must be classified and designed as an Arterial, subject to all Arterial standards including the no-direct-access, no-on-street-parking rule, since AASHTO's own functional classification system carries no separate parkway category.<Citation index={2} /> The scenic, landscaped character historically associated with parkways can and should be retained through median plantings, tree canopy, and generous right-of-way, but character alone does not exempt the facility from Arterial access-management rules. This classification ambiguity, not a design tradeoff, is why the pattern carries the stronger Discouraged caution rather than an ordinary Situational one; it renders under the site's combined Situational/Discouraged badge since Discouraged is not yet a distinct status value.

## Related patterns

[default Freeway pattern](/patterns/freeways/default/) (FRE-DEF-01) (redirect target for freeway-standard parkways); [default Arterial pattern](/patterns/arterials/default/) (ART-DEF-01) (the standards a non-freeway parkway must follow); [Boulevard](/patterns/arterials/boulevard/) (ART-BLV-02), [Scenic Highway/Byway](/patterns/arterials/scenic-highway-byway/) (ART-SCB-03) (related but distinct Arterial subtypes)

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> National Park Service, *Park Roads and Parkways: A History*. Documents the freeway-standard vs. boulevard-standard tension in American parkway design, and the National Trust for Historic Preservation's unsuccessful push to AASHTO's own Task Force on Geometric Design for a distinct parkway classification.
2. <span id="ref-2"></span><EvidenceChip tier="legal" /> American Association of State Highway and Transportation Officials, *A Policy on Geometric Design of Highways and Streets* ("Green Book").
