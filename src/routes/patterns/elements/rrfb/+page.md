---
title: "RRFB"
description: "A Rectangular Rapid Flashing Beacon, a pedestrian- or cyclist-activated warning device using bright, irregularly-flashing LED lights mounted near a crosswalk sign to increase driver yielding at an uncontrolled crossing."
patternId: ELM-RRF-17
date: 2026-08-31
llms: "A Rectangular Rapid Flashing Beacon, a pedestrian- or cyclist-activated warning device using bright, irregularly-flashing LED lights mounted near a crosswalk sign to increase driver yielding at an uncontrolled crossing."
---

<script>
  import { Citation, EvidenceChip, PatternCard, RelatedMedia } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="RRFB" classification="element" status="recommended">
A Rectangular Rapid Flashing Beacon, a pedestrian- or cyclist-activated warning device using bright, irregularly-flashing LED lights mounted near a crosswalk sign to increase driver yielding at an uncontrolled crossing.
</PatternCard>

<RelatedMedia id={fm.patternId} />

*Working assessment: this pattern’s status reflects a preliminary Commonway System judgment call, pending final review.*

## Why this pattern exists

An uncontrolled crosswalk relies entirely on driver attentiveness and willingness to yield; an RRFB gives the crossing a strong, attention-getting visual cue exactly when a pedestrian or cyclist is present, without the cost and delay of a full traffic signal. This pattern exists to document this lighter-weight treatment and where it fits relative to a full signal or hybrid beacon.<Citation index={1} />

## Key considerations

- Most effective at midblock or lower-volume crossings where a full signal is not warranted but a marked crosswalk alone yields inconsistent results<Citation index={2} /><Citation index={3} />
- User-activated designs (push button or passive detection) should be reliable and low-friction to use; a device people cannot easily activate will not get used
- Should be paired with adequate crosswalk marking and, where relevant, a refuge island rather than deployed as a standalone fix

## Related patterns

[Crosswalk](/patterns/elements/crosswalk/) (ELM-CRW-08) (the crossing this pattern supports); [Pedestrian Hybrid Beacon](/patterns/elements/pedestrian-hybrid-beacon/) (ELM-PHB-18) (a stronger-control alternative for busier crossings); [Traffic Signal](/patterns/elements/traffic-signal/) (ELM-TFS-14) (the higher-control alternative this pattern is meant to avoid triggering)

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> MUTCD 11th Edition with Revision 1 (FHWA, December 2025; effective March 5, 2026). Formerly Interim Approval IA-21, now standardized.
2. <span id="ref-2"></span><EvidenceChip tier="evidence" /> NCHRP Research Report 841 (2017), "Development of Crash Modification Factors for Uncontrolled Pedestrian Crossing Treatments," Transportation Research Board. Documents a crash modification factor of 0.53 for vehicle-pedestrian crashes.
3. <span id="ref-3"></span><EvidenceChip tier="evidence" /> Fitzpatrick, K. et al., "Will You Stop for Me?," Report No. TTI-CTS-0010, Texas A&M Transportation Institute (2016). Driver-yielding research underlying its particular effectiveness at multilane crossings.
