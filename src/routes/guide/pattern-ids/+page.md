---
title: Pattern IDs
description: What each part of a Commonway System Pattern ID means, the nine Scale prefixes, and what the status badges mean.
date: 2026-09-01
llms: Explains the Commonway System Pattern ID format (PREFIX-CTXCODE-##), the nine Scale prefixes, and the Recommended/Situational/Avoid status badges.
---

Every pattern in this guide carries a unique ID, shown on its Pattern ID card as described on the [How to Read a Pattern](/guide/how-to-read-a-pattern/) page. This page explains what each part of that ID means, why it's structured the way it is, and what the status badge next to it tells you.

## The ID format

Every pattern ID follows a fixed format:

**`[PREFIX]-[CTXCODE]-[##]`**

For example, `LOC-BBG-12`, with an optional trailing `(DENSITY)` suffix once more than one page exists for the same Typology at different density tiers.

- **PREFIX** encodes Scale, covered in full below.
- **CTXCODE** is a short mnemonic for the specific Typology. `BBG` stands for Bicycle Boulevard / Neighborhood Greenway, for example. `DEF` is reserved for each classification's baseline default entry.
- **[##]** is a two-digit number assigned once, in the order the pattern was added to the guide. It never changes later, even if the pattern's position in the Pattern Index does.

## Scale prefixes

PREFIX is where the ID encodes Scale, one of nine values:

| Prefix | Meaning | Scale |
|---|---|---|
| `NET` | Network | Network |
| `CDR` | Corridor | Corridor |
| `LOC` | Local | Segment/Intersection |
| `COL` | Collector | Segment/Intersection |
| `ART` | Arterial | Segment/Intersection |
| `FRE` | Freeway | Segment/Intersection |
| `INT` | Intersections & Crossings | Segment/Intersection |
| `FAC` | Facility | Facility |
| `ELM` | Element | Element |

Network, Corridor, Facility, and Element each get exactly one flat prefix, with no further subdivision. Segment/Intersection is the one Scale that subdivides, into five prefixes, because Functional Classification carries real design implications, speed, modal hierarchy, that the other four Scales don't yet have an equivalent for. That's also why every pattern page live in the guide today is a Segment/Intersection pattern: `LOC`, `COL`, `ART`, `FRE`, or `INT`.

See [Scale Hierarchy](/guide/scale-hierarchy/) for what each of the nine Scale prefixes actually covers, and [Street Types & Classifications](/guide/street-types/) for what each Functional Classification and Typology means in plain language.

## Status badges

Where a status applies, it appears as a small badge next to the classification label on the Pattern ID card.

- **Recommended** is the quiet default, no color emphasis, since it's the unremarkable normal case.
- **Situational** reuses the amber warning color, meaning the pattern is real but context-dependent.
- **Avoid** reuses the rose danger color, meaning the Commonway System actively recommends against it.

Status is omitted entirely on Intersections & Crossings entries, since the master Typology reference doesn't track a status for those.

## How this connects to the rest of the guide

See [Bicycle Boulevard / Neighborhood Greenway](/patterns/local-streets/bicycle-boulevard/) for a full worked example of a Pattern ID card in context, and the [Pattern Index](/patterns/) for every pattern currently in the guide.
