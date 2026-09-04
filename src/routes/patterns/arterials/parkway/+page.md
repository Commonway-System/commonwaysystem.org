---
title: "Parkway"
description: "A roadway historically designed as a scenic, landscaped route, typically featuring a planted median and limited access, whose modern implementations vary widely between two distinct traditions: a limited-access, freeway-like facility, and a slower, arterial-scale boulevard-like facility running through or alongside parkland."
patternId: ART-PKY-08
date: 2026-08-31
llms: "A roadway historically designed as a scenic, landscaped route, typically featuring a planted median and limited access, whose modern implementations vary widely between two distinct traditions: a limited-access, freeway-like facility, and a slower, arterial-scale boulevard-like facility running through or alongside parkland."
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Parkway" classification="arterial" status="situational">
A roadway historically designed as a scenic, landscaped route, typically featuring a planted median and limited access, whose modern implementations vary widely between two distinct traditions: a limited-access, freeway-like facility, and a slower, arterial-scale boulevard-like facility running through or alongside parkland.
</PatternCard>

Typical at: <DensityChip tier="Rural" /> <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" />

## Why this pattern exists

The term "parkway" carries genuinely conflicting meanings across different eras and regions of American road-building,<Citation index={1} /> and this pattern exists to resolve that ambiguity for Commonway System’s classification system rather than leave it unclassified. A Parkway cannot qualify as a Freeway under CS’s Functional Classification system, since Freeway is explicitly out of CS’s prescriptive scope and reserved for fully limited-access, grade-separated facilities; any Parkway that follows genuine freeway design standards should be treated and read as a Freeway pattern instead, and this page exists specifically to redirect that reader there. Where a Parkway does not meet freeway standards, which is the more common historical case, it must be classified and designed as an Arterial, subject to all Arterial standards including the no-direct-access, no-on-street-parking principle, since AASHTO's own functional classification system has no separate parkway category.<Citation index={2} /> This pattern’s working-assessment status is Discouraged, a stronger caution than an ordinary Situational tradeoff, specifically because of this classification ambiguity: the term itself invites confusion that a clearer classification avoids. It renders here under the site’s combined Situational/Discouraged badge, since Discouraged is not yet a distinct status value in the site’s badge system.

## Key considerations

- If your parkway is a fully limited-access, grade-separated facility, refer to the Freeway pattern instead; this page’s guidance does not apply
- If your parkway does not meet freeway standards (the more historically common case), it must follow all Arterial standards, including no direct property access and no on-street parking
- The "scenic, landscaped" character historically associated with parkways can and should be retained through median plantings, tree canopy, and generous right-of-way, but character alone does not exempt the facility from Arterial access-management rules
- Significant inconsistency exists across how different regions and eras have implemented parkways, which is part of why this pattern carries a stronger Discouraged caution rather than an ordinary Situational one

## Related patterns

[default Freeway pattern](/patterns/freeways/default/) (FRE-DEF-01) (redirect target for freeway-standard parkways); [default Arterial pattern](/patterns/arterials/default/) (ART-DEF-01) (the standards a non-freeway parkway must follow); [Boulevard](/patterns/arterials/boulevard/) (ART-BLV-02), [Scenic Highway/Byway](/patterns/arterials/scenic-highway-byway/) (ART-SCB-03) (related but distinct Arterial subtypes)

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> National Park Service, *Park Roads and Parkways: A History*. Documents the freeway-standard vs. boulevard-standard tension in American parkway design, and the National Trust for Historic Preservation's unsuccessful push to AASHTO's own Task Force on Geometric Design for a distinct parkway classification.
2. <span id="ref-2"></span><EvidenceChip tier="legal" /> American Association of State Highway and Transportation Officials, *A Policy on Geometric Design of Highways and Streets* ("Green Book").
