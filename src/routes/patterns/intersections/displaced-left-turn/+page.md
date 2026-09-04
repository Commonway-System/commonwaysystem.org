---
title: "Displaced Left-Turn (DLT)"
description: "An intersection where the left-turn lane is shifted to the opposing side of oncoming traffic at a signalized crossover upstream of the main intersection, letting left-turning and opposing through traffic move on concurrent phases."
patternId: INT-DLT-14
date: 2026-09-03
llms: "An intersection, also known as a continuous flow intersection, where the left-turn lane is shifted to the opposing side of oncoming traffic upstream, letting left-turning and opposing through traffic move concurrently, Situational at high-volume urban and suburban intersections."
---

<script>
  import { Citation, DensityChip, EvidenceChip, PatternCard, RelatedMedia } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Displaced Left-Turn (DLT)" classification="intersections" status="situational">
An intersection where the left-turn lane is shifted to the opposing side of oncoming traffic at a signalized crossover upstream of the main intersection, letting left-turning and opposing through traffic move on concurrent phases. Also known as a continuous flow intersection.
</PatternCard>

<RelatedMedia id={fm.patternId} />

Typical at: <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" />

Rural is an unlikely pairing. Core is an edge case.

*Working assessment: this pattern's status reflects a preliminary Commonway System judgment call, pending final review.*

## Design notes

This design resolves the same unprotected-left-turn conflict as Median U-Turn and Restricted Crossing U-Turn, but through signalized displacement rather than a median crossover, and at high-volume urban or suburban intersections rather than the higher-speed rural and suburban divided highways those two patterns typically suit. It's a faster, lower-cost alternative to a grade-separated interchange where volume is high enough that conventional protected left-turn phasing creates severe delay. The additional right-of-way this pattern requires upstream of the main intersection, and its higher construction cost relative to Median U-Turn or Restricted Crossing U-Turn, keep it Situational rather than broadly Recommended.

## Related patterns

[Median U-Turn](/patterns/intersections/median-u-turn/) (INT-MUT-12), [Restricted Crossing U-Turn](/patterns/intersections/restricted-crossing-u-turn/) (INT-RCU-13) (the two lower-cost alternatives addressing the same underlying unprotected-left-turn problem in a different speed and volume context), [Grade-Separated Interchange](/patterns/intersections/grade-separated-interchange/) (INT-GSI-10) (the higher-cost alternative this pattern is often chosen instead of)

## Getting there: Retrofit path options

[Displaced Left-Turn (DLT) retrofit](/retrofits/intersection/displaced-left-turn-dlt-retrofit/) (RFT-INT-04) reroutes an existing conventional intersection's left-turn movement to this geometry.

## References

1. <span id="ref-1"></span><EvidenceChip tier="evidence" /> "Unconventional Arterial Intersection Designs under Connected and Automated Vehicle Environment: A Survey," on Displaced Left-turn Intersection design and cost tradeoffs relative to grade-separated interchanges.
2. <span id="ref-2"></span><EvidenceChip tier="legal" /> U.S. Patent 7,135,989, "Parallel flow vehicle turn system for traffic intersections," on displaced left-turn design and right-of-way considerations.
