---
title: "Pedestrian Hybrid Beacon"
description: "A pedestrian-activated signal, sometimes called a HAWK beacon, that remains dark until activated, then displays a sequence progressing through flashing and solid indications to stop traffic and allow a pedestrian to cross, before returning to dark."
patternId: ELM-PHB-18
date: 2026-08-31
llms: "A pedestrian-activated signal, sometimes called a HAWK beacon, that remains dark until activated, then displays a sequence progressing through flashing and solid indications to stop traffic and allow a pedestrian to cross, before returning to dark."
---

<script>
  import { Citation, EvidenceChip, PatternCard, RelatedMedia } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Pedestrian Hybrid Beacon" classification="element" status="situational">
A pedestrian-activated signal, sometimes called a HAWK beacon, that remains dark until activated, then displays a sequence progressing through flashing and solid indications to stop traffic and allow a pedestrian to cross, before returning to dark.
</PatternCard>

<RelatedMedia id={fm.patternId} />

*Working assessment: this pattern’s status reflects a preliminary Commonway System judgment call, pending final review.*

## Why this pattern exists

A pedestrian hybrid beacon provides stronger, legally binding stop control than an RRFB while avoiding the ongoing delay a full traffic signal would impose on a corridor at a location that does not have enough pedestrian volume to justify constant signal timing. This pattern exists to document this middle-tier crossing treatment between an RRFB and a full signal.<Citation index={1} /><Citation index={2} />

## Key considerations

- Most appropriate at crossings with meaningful but intermittent pedestrian volume on a higher-speed or higher-volume roadway where an RRFB’s advisory-only nature is not sufficient
- The dark-until-activated design should be paired with clear driver education or signage, since an unfamiliar driver may not immediately understand the sequence
- Requires adequate signage and lighting so the beacon itself is visible and comprehensible well before the crossing point

## Related patterns

[RRFB](/patterns/elements/rrfb/) (ELM-RRF-17) (the lighter-control alternative this pattern exceeds); [Traffic Signal](/patterns/elements/traffic-signal/) (ELM-TFS-14) (the heavier-control alternative this pattern avoids); [Crosswalk](/patterns/elements/crosswalk/) (ELM-CRW-08), [Pedestrian Safety Island/Refuge](/patterns/elements/pedestrian-safety-island-refuge/) (ELM-PSI-09) (companion crossing elements)

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> MUTCD 11th Edition with Revision 1 (FHWA, December 2025; effective March 5, 2026), Chapter 4J, "Pedestrian Hybrid Beacons" (renumbered from the 2009 edition's Chapter 4F). Warrant conditions.
2. <span id="ref-2"></span><EvidenceChip tier="evidence" /> Fitzpatrick, K. and Park, E.S., "Safety Effectiveness of the HAWK Pedestrian Crossing Treatment," FHWA-HRT-10-042 (2010). Tucson before/after study of 21 treatment sites versus 102 reference intersections: a 29% reduction in total crashes and a 69% reduction in pedestrian crashes.
