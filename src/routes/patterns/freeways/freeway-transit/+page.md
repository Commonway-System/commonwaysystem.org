---
title: Freeway-scale Transit (Commuter / Heavy Rail)
description: The one Freeway-scale Typology that gets more typical as density rises, since commuter and heavy rail exist to move volume into dense cores.
patternId: FRE-FTR-04
status: recommended
date: 2026-08-29
llms: A Freeway-scale transit typology, commuter or heavy rail, the one Freeway-scale pattern that becomes more typical as density rises rather than less.
---

<script>
  import { Citation, DensityChip, EvidenceChip, IdPill, PatternViewer, RelatedMedia } from '$lib/theme/components'
</script>

Grade-separated commuter or heavy rail, moving passenger volume at Freeway scale without the limited-access roadway itself.<Citation index={1} />

<PatternViewer image={fm.image} title={fm.title} classification="freeway" />

<RelatedMedia id={fm.patternId} />

<div class="cw-context">

<span class="cw-context__label">Typical at:</span> <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Rural is an edge case. Undeveloped is an unlikely pairing.

</div>

## Design notes

This is the mirror image of the other three Freeway entries. Default, Expressway, and Beltway/Ring Road all taper off as density rises, while commuter and heavy rail exist specifically to move volume into dense cores, so this Typology becomes more typical, not less, as density increases.

## Related patterns

<div class="cw-links">

- [Arterial Transit (BRT/LRT)](/patterns/arterials/arterial-transit/) <IdPill id="ART-ATR-04" /> (the Arterial-scale equivalent transit pattern)
- [Transit Hub/Station](/patterns/facilities/transit-hub-station/) <IdPill id="FAC-THS-03" /> (the Facility pattern where riders interface with this rail scale)

</div>

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> [FTA, National Transit Database Glossary.](https://www.transit.dot.gov/ntd/national-transit-database-ntd-glossary)
