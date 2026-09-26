---
title: Roundabout (Single / Multi-Lane)
description: The default intersection control wherever two Collector-or-higher streets meet, per the Commonway System's locked intersection philosophy.
patternId: INT-RAB-01
date: 2026-08-29
llms: The default intersection control wherever two Collector-or-higher streets meet, single or multi-lane, per the Commonway System's locked intersection philosophy.
---

<script>
  import { Citation, DensityChip, EvidenceChip, PatternCard, RelatedMedia } from '$lib/theme/components'
</script>

<PatternCard id={fm.patternId} title="Roundabout (Single / Multi-Lane)" classification="intersections" status="recommended">
A circular intersection where entering traffic yields to the circulating flow, sized single or multi-lane to the volume it carries.
</PatternCard>

<RelatedMedia id={fm.patternId} />

Typical at: <DensityChip tier="Suburban" /> <DensityChip tier="Compact" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Rural is an edge case. Undeveloped is an unlikely pairing.

## Design notes

Roundabout is the default control wherever two Collector-or-higher streets meet within the Commonway System's intersection philosophy. Traffic signals remain available but only as a documented last resort, and turbo-roundabouts take over at the highest-volume Arterial-to-Arterial junctions.<Citation index={1} /><Citation index={2} />

## Freight-priority streets

When this pattern serves a freight-priority street ([Industrial Collector](/patterns/collectors/industrial-collector/) or any Typology carrying significant truck volume), size the inscribed circle diameter to the current NCHRP Research Report 1043 guidance for large vehicles, rather than the base passenger and bus vehicle range.<Citation index={1} />

The truck apron is for the occasional oversize check vehicle. The everyday design vehicle should clear the roundabout within the traveled way without off-tracking onto the apron.<Citation index={3} />

Two cautions apply. Designing every movement for the largest conceivable truck degrades safety for vulnerable users without a demonstrated need, so confirm actual vehicle-classification counts first.<Citation index={3} /> And oversized intersections carry their own costs: more crash exposure, more confusion, more right-of-way, and longer pedestrian crossings.<Citation index={4} />

## Related patterns

[Turbo-Roundabout](/patterns/intersections/turbo-roundabout/) (INT-TRB-02) (the step up for higher-volume Arterial-to-Arterial junctions, per this page), [Signal](/patterns/intersections/signal/) (INT-SIG-03) (the alternative control competing for the same higher-volume intersections, per Signal's own Design notes), [Neighborhood Traffic Circle / Mini-Roundabout](/patterns/elements/neighborhood-traffic-circle-mini-roundabout/) (ELM-NTC-46) (the much smaller, unsized analogue for a Local-to-Local intersection), [Industrial Collector](/patterns/collectors/industrial-collector/) (COL-IND-03) (a freight-priority street whose intersection answer depends on this page's freight-street sizing note)

## Getting there: Retrofit path options

[Signal-to-roundabout conversion](/retrofits/intersection/signal-to-roundabout-conversion/) (RFT-INT-01)

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> [Transportation Research Board, *Guide for Roundabouts*, NCHRP Research Report 1043 (2023). Supersedes NCHRP Report 672.](https://www.nationalacademies.org/publications/27069)
2. <span id="ref-2"></span><EvidenceChip tier="evidence" /> [Persaud, B. et al., "Safety Effect of Roundabout Conversions in the United States: Empirical Bayes Observational Before-After Study," Insurance Institute for Highway Safety (2001).](https://www.iihs.org/topics/bibliography/ref/1248)
3. <span id="ref-3"></span><EvidenceChip tier="legal" /> [Delaware Department of Transportation, *Design Guidance Memorandum* (DGM) 1-26, "Roundabouts" (design vehicle versus check vehicle, and the caution against over-designing for the largest possible truck).](https://deldot.gov/Publications/manuals/dgm/pdfs/1-26_Roundabouts.pdf)
4. <span id="ref-4"></span><EvidenceChip tier="legal" /> [Wisconsin Department of Transportation, *Facilities Development Manual*, FDM 11-25 (costs of oversized truck-accommodating intersections).](https://wisconsindot.gov/rdwy/fdm/fd-11-25.pdf)
