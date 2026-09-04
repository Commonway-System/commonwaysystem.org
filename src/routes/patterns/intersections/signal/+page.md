---
title: Signal
description: Traffic signal control, available within the Commonway System only as a documented last resort, never the presumed choice.
patternId: INT-SIG-03
date: 2026-08-29
llms: Traffic signal control, available within the Commonway System only as a documented last resort against the safer roundabout default, never the presumed choice.
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Signal" classification="intersections" status="situational">
A signalized intersection, controlling conflicting movements with timed lights.
</PatternCard>

Typical at: <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Suburban is an edge case. Undeveloped and Rural are unlikely pairings.

:::note
Signal remains available within the Commonway System, but only as a last resort requiring documented burden-of-proof justification, modeled on WSDOT's Roundabout First and Intersection Control Evaluation policy.<Citation index={1} /><Citation index={2} /> It is not banned, just never presumed. Where a roundabout or turbo-roundabout can serve the same volume, that is the default choice instead.
:::

## Design notes

Signal's realistic density range overlaps heavily with Roundabout and Turbo-Roundabout, since all three ultimately compete for the same higher-volume intersections. The difference is which one the Commonway System treats as the presumed choice absent a documented reason otherwise.

## Related patterns

[Roundabout (Single/Multi-Lane)](/patterns/intersections/roundabout/) (INT-RAB-01) and [Turbo-Roundabout](/patterns/intersections/turbo-roundabout/) (INT-TRB-02) (explicitly named on this page as competing for the same higher-volume intersections); [Median U-Turn](/patterns/intersections/median-u-turn/) (INT-MUT-12), [Restricted Crossing U-Turn](/patterns/intersections/restricted-crossing-u-turn/) (INT-RCU-13), and [Displaced Left-Turn](/patterns/intersections/displaced-left-turn/) (INT-DLT-14) (unconventional geometries that modify rather than replace this pattern to remove unprotected left turns)

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> Washington State Department of Transportation, *WSDOT Design Manual*, Chapter 1300, "Intersection Control Evaluation."
2. <span id="ref-2"></span><EvidenceChip tier="legal" /> Manual on Uniform Traffic Control Devices, 11th Edition with Revision 1 (FHWA, December 2025; effective March 5, 2026), Chapter 4C.
