---
title: "Guide Sign"
description: "A sign providing wayfinding or informational content, such as destination names, distances, route numbers, or facility identification, helping travelers navigate rather than regulating or warning them."
patternId: ELM-GDS-13
status: recommended
date: 2026-08-31
llms: "A sign providing wayfinding or informational content, such as destination names, distances, route numbers, or facility identification, helping travelers navigate rather than regulating or warning them."
---

<script>
  import { Citation, EvidenceChip, IdPill, PatternViewer, RelatedMedia } from '$lib/theme/components'
</script>

A sign providing wayfinding or informational content, such as destination names, distances, route numbers, or facility identification, helping travelers navigate rather than regulating or warning them.

<PatternViewer image={fm.image} title={fm.title} classification="element" />

<RelatedMedia id={fm.patternId} />

## Why this pattern exists

Travelers, whether driving, cycling, or walking, need to know where they are and how to reach their destination; guide signage is the network’s navigational layer, distinct from the rule-setting and hazard-alerting functions of the other two sign categories. This pattern exists to document its own legibility and placement considerations.<Citation index={1} /><Citation index={2} />

## Key considerations

- Message content should be concise and prioritized; a sign trying to convey too much information at once becomes unreadable at travel speed
- Consistency in symbol and terminology use across the network helps build traveler trust and reduces confusion at decision points
- Placement should occur far enough ahead of a decision point (an intersection, an exit) to allow safe lane positioning or route choice

## Related patterns

<div class="cw-links">

- [Regulatory Sign](/patterns/elements/regulatory-sign/) <IdPill id="ELM-RGS-11" />
- [Warning Sign](/patterns/elements/warning-sign/) <IdPill id="ELM-WNS-12" /> (related sign categories)
- wayfinding provisions in relevant Guide-level content

</div>

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> [MUTCD 11th Edition with Revision 1 (FHWA, December 2025; effective March 5, 2026), Section 2A.03, "Classification of Signs."](https://mutcd.fhwa.dot.gov/pdfs/11th_Editionr1/mutcd11theditionr1hl.pdf)
2. <span id="ref-2"></span><EvidenceChip tier="legal" /> [MUTCD 11th Edition with Revision 1 (FHWA, December 2025; effective March 5, 2026), Chapter 2D, "Guide Signs — Conventional Roads."](https://mutcd.fhwa.dot.gov/pdfs/11th_Editionr1/mutcd11theditionr1hl.pdf)
