---
title: All-Way Stop
description: A stop-controlled intersection where every approach stops, tapering off past Compact and Urban density as volumes exceed safe stop-control capacity.
patternId: INT-AWS-04
status: situational
date: 2026-08-29
image: /patterns/int-aws-04-all-way-stop.png
llms: A stop-controlled intersection where every approach stops, tapering off past Compact and Urban density as intersection volumes exceed what stop control can safely handle.
---

<script>
  import { Citation, DensityChip, EvidenceChip, IdPill, PatternViewer, RelatedMedia } from '$lib/theme/components'
</script>

An intersection where every approach carries a stop sign, with right-of-way determined by arrival order.

<PatternViewer image={fm.image} title={fm.title} classification="intersections" />

<RelatedMedia id={fm.patternId} />

<div class="cw-context">

<span class="cw-context__label">Typical at:</span> <DensityChip tier="Suburban" /> <DensityChip tier="Compact" />

Rural and Urban are edge cases. Undeveloped and Core are unlikely pairings.

</div>

## Design notes

All-Way Stop tapers off past Compact and Urban density, as intersection volumes exceed what stop control can handle safely. This is the same taper logic that applies to Stop/Yield control, just shifted one tier higher on the density range.<Citation index={1} />

## Related patterns

<div class="cw-links">

- [Stop / Yield (Two-Way)](/patterns/intersections/stop-yield/) <IdPill id="INT-SYD-05" /> (explicitly named on this page as sharing the same density-taper logic, one tier lower)
- [Neighborhood Traffic Circle / Mini-Roundabout](/patterns/elements/neighborhood-traffic-circle-mini-roundabout/) <IdPill id="ELM-NTC-46" /> (a control type this pattern sometimes replaces at a Local intersection)

</div>

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> [Manual on Uniform Traffic Control Devices, 11th Edition with Revision 1 (FHWA, December 2025; effective March 5, 2026), Section 2B.13-2B.17.](https://mutcd.fhwa.dot.gov/pdfs/11th_Editionr1/mutcd11theditionr1hl.pdf)
