---
title: "Plaza / Parklet"
description: "A public gathering space reclaimed from roadway or parking space, ranging from a single parking-space-sized parklet to a full intersection-corner plaza."
patternId: FAC-PLZ-07
date: 2026-08-31
llms: "A public gathering space reclaimed from roadway or parking space, ranging from a single parking-space-sized parklet to a full intersection-corner plaza."
---

<script>
  import { Citation, EvidenceChip, PatternCard, RelatedMedia } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Plaza / Parklet" classification="facility" status="recommended">
A public gathering space reclaimed from roadway or parking space, ranging from a single parking-space-sized parklet to a full intersection-corner plaza.
</PatternCard>

<RelatedMedia id={fm.patternId} />

*Working assessment: this pattern’s status reflects a preliminary Commonway System judgment call, pending final review.*

## Why this pattern exists

Streets historically allocate nearly all their space to vehicle movement and storage; this pattern documents the deliberate conversion of some of that space into space for people to sit, gather, and linger, a use case with its own siting, furnishing, and drainage considerations distinct from a sidewalk widening alone.

## Key considerations

- Site selection should account for sun exposure, adjacent building frontage activity, and pedestrian flow; a plaza with no reason to stop rarely gets used<Citation index={2} />
- Drainage must be resolved deliberately, since converted roadway space was not designed to shed water toward a pedestrian-occupied surface<Citation index={1} />
- Where a parklet occupies a former parking space, physical protection from adjacent traffic (bollards, curb, planters) is necessary, not optional

## Related patterns

[Curb Extension](/patterns/elements/curb-extension/) (ELM-CBE-02) (related Element pattern, since a plaza often anchors at a curb extension or corner); [Bench](/patterns/elements/bench/) (ELM-BCH-31), [Street Tree](/patterns/elements/street-tree/) (ELM-STT-28) (common furnishing elements)

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> WSDOT Design Manual, Chapter 1238, "Parklets and Plazas." Drainage, catch-basin avoidance, and railing/planter separation from traffic.
2. <span id="ref-2"></span><EvidenceChip tier="precedent" /> NACTO Urban Street Design Guide, "Parklets, Pop-ups and Street Seats." Siting principles (sun exposure, adjacent frontage activity).
