---
title: "Traffic Signal"
description: "A signal-controlled device using red, yellow, and green indications to assign right-of-way among conflicting vehicle movements at an intersection."
patternId: ELM-TFS-14
date: 2026-08-31
llms: "A signal-controlled device using red, yellow, and green indications to assign right-of-way among conflicting vehicle movements at an intersection."
---

<script>
  import { PatternCard, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Traffic Signal" classification="element" status="situational">
A signal-controlled device using red, yellow, and green indications to assign right-of-way among conflicting vehicle movements at an intersection.
</PatternCard>

*Working assessment: this pattern’s status reflects a preliminary Commonway System judgment call, pending final review.*

## Why this pattern exists

Above a certain volume or conflict complexity, an uncontrolled or sign-controlled intersection can no longer safely and efficiently sort competing movements; a traffic signal imposes timed, positive control over who moves when. This pattern exists to document signal use as a documented departure from Commonway System’s roundabout-default intersection treatment, requiring its own justification.

## Key considerations

- Consistent with Commonway System’s intersection defaults, signal installation should require documented burden-of-proof justification rather than being a default choice<Citation index={1} />
- Timing and phasing should account for all modes present, not just vehicle throughput; pedestrian and bicycle phases need adequate crossing time
- Signal coordination along a corridor affects speed and platooning behavior well beyond the single intersection where it is installed

## Related patterns

[Roundabout](/patterns/intersections/roundabout/) (INT-RAB-01) (the CS default this pattern is a documented departure from); [Pedestrian Signal](/patterns/elements/pedestrian-signal/) (ELM-PDS-15), [Bicycle Signal](/patterns/elements/bicycle-signal/) (ELM-BCS-16) (companion signal types at a signalized intersection)

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> MUTCD 11th Edition with Revision 1 (FHWA, December 2025; effective March 5, 2026), Chapter 4C, "Traffic Control Signal Needs Studies." Establishes the nine signal warrants, and explicitly states that meeting a warrant does not itself require installation.
