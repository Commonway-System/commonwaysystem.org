---
title: Freeway-scale Transit (Commuter / Heavy Rail)
description: The one Freeway-scale Typology that gets more typical as density rises, since commuter and heavy rail exist to move volume into dense cores.
patternId: FRE-FTR-04
date: 2026-08-29
llms: A Freeway-scale transit typology, commuter or heavy rail, the one Freeway-scale pattern that becomes more typical as density rises rather than less.
---

<script>
  import { PatternCard, DensityChip, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Freeway-scale Transit (Commuter / Heavy Rail)" classification="freeway" status="recommended">
Grade-separated commuter or heavy rail, moving passenger volume at Freeway scale without the limited-access roadway itself.<Citation index={1} />
</PatternCard>

Typical at: <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Rural is an edge case. Undeveloped is an unlikely pairing.

## Design notes

This is the mirror image of the other three Freeway entries. Default, Expressway, and Beltway/Ring Road all taper off as density rises, while commuter and heavy rail exist specifically to move volume into dense cores, so this Typology becomes more typical, not less, as density increases.

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> FTA, National Transit Database Glossary.
