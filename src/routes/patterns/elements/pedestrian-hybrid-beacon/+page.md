---
title: "Pedestrian Hybrid Beacon"
description: "A pedestrian-activated signal, sometimes called a HAWK beacon, that remains dark until activated, then displays a sequence progressing through flashing and solid indications to stop traffic and allow a pedestrian to cross, before returning to dark."
patternId: ELM-PHB-18
status: situational
date: 2026-08-31
image: /patterns/elm-phb-18-pedestrian-hybrid-beacon.png
llms: "A pedestrian-activated signal, sometimes called a HAWK beacon, that remains dark until activated, then displays a sequence progressing through flashing and solid indications to stop traffic and allow a pedestrian to cross, before returning to dark."
---

<script>
  import { Citation, EvidenceChip, IdPill, PatternViewer, RelatedMedia } from '$lib/theme/components'
</script>

A pedestrian-activated signal, sometimes called a HAWK beacon, that remains dark until activated, then displays a sequence progressing through flashing and solid indications to stop traffic and allow a pedestrian to cross, before returning to dark.

<PatternViewer image={fm.image} title={fm.title} classification="element" />

<RelatedMedia id={fm.patternId} />

## Why this pattern exists

A pedestrian hybrid beacon provides stronger, legally binding stop control than an RRFB while avoiding the ongoing delay a full traffic signal would impose on a corridor at a location that does not have enough pedestrian volume to justify constant signal timing. This pattern exists to document this middle-tier crossing treatment between an RRFB and a full signal.<Citation index={1} /><Citation index={2} />

## Key considerations

- Most appropriate at crossings with meaningful but intermittent pedestrian volume on a higher-speed or higher-volume roadway where an RRFB’s advisory-only nature is not sufficient
- The dark-until-activated design should be paired with clear driver education or signage, since an unfamiliar driver may not immediately understand the sequence
- Requires adequate signage and lighting so the beacon itself is visible and comprehensible well before the crossing point

## Related patterns

<div class="cw-links">

- [RRFB](/patterns/elements/rrfb/) <IdPill id="ELM-RRF-17" /> (the lighter-control alternative this pattern exceeds)
- [Traffic Signal](/patterns/elements/traffic-signal/) <IdPill id="ELM-TFS-14" /> (the heavier-control alternative this pattern avoids)
- [Crosswalk](/patterns/elements/crosswalk/) <IdPill id="ELM-CRW-08" />
- [Pedestrian Safety Island/Refuge](/patterns/elements/pedestrian-safety-island-refuge/) <IdPill id="ELM-PSI-09" /> (companion crossing elements)

</div>

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> [MUTCD 11th Edition with Revision 1 (FHWA, December 2025; effective March 5, 2026), Chapter 4J, "Pedestrian Hybrid Beacons" (renumbered from the 2009 edition's Chapter 4F). Warrant conditions.](https://mutcd.fhwa.dot.gov/pdfs/11th_Editionr1/mutcd11theditionr1hl.pdf)
2. <span id="ref-2"></span><EvidenceChip tier="evidence" /> [Fitzpatrick, K. and Park, E.S., "Safety Effectiveness of the HAWK Pedestrian Crossing Treatment," FHWA-HRT-10-042 (2010). Tucson before/after study of 21 treatment sites versus 102 reference intersections: a 29% reduction in total crashes and a 69% reduction in pedestrian crashes.](https://www.fhwa.dot.gov/publications/research/safety/10042/10042.pdf)
