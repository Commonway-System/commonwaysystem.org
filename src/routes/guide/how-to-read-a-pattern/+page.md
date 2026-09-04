---
title: How to Read a Pattern
description: How to read a Commonway System pattern entry, Pattern ID cards, classification colors, status badges, density tier chips, the Speed & Modal Hierarchy card, and the citation system.
date: 2026-08-29
llms: Explains how to read a Commonway System pattern entry, Pattern ID cards, classification colors and status badges, density tier chips, the Speed & Modal Hierarchy card, admonitions, and the citation and unsourced-claim system.
---

<script>
  import { DensityChip, Citation, ExampleCard, PatternCard, SpeedModalHierarchyCard, SpeedLimitSection, ModalHierarchySection } from '$lib/theme/components'
</script>

Every pattern in this guide is built from the same handful of parts, repeated consistently: a Pattern ID card, density tier chips, admonition blocks, and citations. This page walks through what each one means, so the rest of the guide can be read without re-explaining itself on every page.

## The Pattern ID card

<ExampleCard>
  <PatternCard id="ART-UMS-09" title="Urban main street" classification="arterial" status="recommended">
    An Urban main street is an Arterial typology combining retail frontage access with continuous pedestrian priority along both edges.
  </PatternCard>
</ExampleCard>

Each pattern opens with a card naming its ID, title, [Functional Classification](/guide/street-types/), and (for most classifications) a status. The colored left edge matches the classification, Local, Collector, Arterial, Freeway, or Intersections & Crossings, so a reader flipping through the guide can tell at a glance what kind of pattern they're looking at, even before reading the title.

The ID itself follows a fixed format, `[PREFIX]-[CTXCODE]-[##]`, like `LOC-BBG-12`, with an optional trailing `(DENSITY)` suffix once more than one page exists for the same Typology at different density tiers.

The label in the upper right corner shows the pattern's Functional Classification when one applies: Local, Collector, Arterial, Freeway, or Intersections & Crossings. For the four Scales that don't subdivide by classification, Network, Corridor, Facility, and Element, that same corner shows the Scale name itself instead. See [Scale Hierarchy](/guide/scale-hierarchy/) for what each of the nine Scale prefixes covers.

Read the [Pattern IDs](/guide/pattern-ids/) page for what each part of the ID means, the full nine-prefix Scale breakdown, and what each status badge means.

## Illustrations

Every pattern now opens with an illustration, placed right after the ID card and before the page's main text. Most patterns show a pair: a grayscale "Typical condition" alongside a "Commonway recommendation" with the specific fix highlighted. A few patterns use a different form instead:

- Avoid patterns show a single flagged condition, with an "Instead, see" pointing to the alternative.
- Network-scale patterns show a plan-view diagram rather than a cross-section.
- A small number of patterns that document an existing condition without recommending for or against it show one plain illustration with no verdict implied.
- One or two hard-to-classify patterns use whichever form fits best.

Most patterns need just one illustration. A few carry a second when the main illustration's format can't show something the page depends on, a driveway-spacing claim that only reads clearly from above, for instance, rather than in cross-section.

Illustrations still being drawn show as a placeholder: a bordered box with a caption describing the scene and numbered callouts pointing to what matters, standing in for the finished artwork.

## Density tiers

Density tiers appear as a small chip next to any guidance that changes by context:

<DensityChip tier="Suburban" /> <DensityChip tier="Urban" /> <DensityChip tier="Core" />

Six tiers run from Undeveloped to Core, describing how much housing and activity sit on the land around a street, not the street itself. Read the [Density Tiers](/guide/density-tiers/) page for what each tier means, where the names and unit-per-acre ranges come from, and how to handle a segment that falls between two tiers.

## The Speed & Modal Hierarchy card

Every Local, Collector, and Arterial pattern that allows automobiles carries a second card, split into two parts: Section A, Design Speed & Speed Limit, and Section B, Modal Hierarchy. A handful of patterns exclude automobiles entirely, Shared-Use Path and Bike Highway / Greenway among them, and show Section B on its own, with no speed section at all, since [Design Speed & Speed Limits](/guide/design-speed/) has nothing to say about a street with no cars on it.

<ExampleCard>
<SpeedModalHierarchyCard>
<SpeedLimitSection speeds={[20]}>
Follows the Local Character Type's rule: 20 mph hard maximum, no exceptions.
</SpeedLimitSection>
<ModalHierarchySection classification="local" rows={[{ tiers: ['pedestrian', 'bicycle', 'transit', 'vehicle', 'freight'] }]}>
No override: this Typology follows the Local base order.
</ModalHierarchySection>
</SpeedModalHierarchyCard>
</ExampleCard>

**Section A, Design Speed & Speed Limit,** shows one MUTCD-style speed-limit sign per applicable speed, paired with a short line stating whether the pattern inherits its Character Type's rule as written or carries a documented override, and a link to [Design Speed & Speed Limits](/guide/design-speed/) for the full rule and its citations. Arterial cards stack the sign(s) above that text instead of running them side by side, since an Arterial pattern can carry up to five signs, one per density tier, where Local always shows one and Collector shows at most two.

**Section B, Modal Hierarchy,** shows a row of pills, one per mode, each pairing a small icon with the mode's name, left to right in ranked order. A ">" between two pills means the left one outranks the right; an "=" means the two are explicitly tied, [Shared-Use Path](/patterns/local-streets/shared-use-path/)'s Pedestrian = Bicycle pairing is a real example. Pill color follows the pattern's own Functional Classification, the same color family as the Pattern ID card's left edge above.

Two patterns bend this format further. [Stroad](/patterns/arterials/stroad/) shows Section A's signs with no pill row underneath at all, since it's an explicit Avoid pattern with no ranked hierarchy to show. [Festival Street](/patterns/local-streets/festival-street/) and [School Street](/patterns/local-streets/school-street/) each show two labeled pill rows instead of one, since their modal hierarchy changes by time of day.

## Admonitions

Callout blocks flag content that needs to stand apart from the surrounding text. Five kinds exist, each with its own color and label:

:::note
A note adds background or context that isn't itself an instruction.
:::

:::tip
A tip is a specific, actionable recommendation worth calling out on its own.
:::

:::warning
Renders with the label "Caution." Flags a real risk or a rule that's easy to get wrong, like the speeding risk called out on the [One-Way Street](/patterns/arterials/one-way-street/) page.
:::

:::danger
Renders with the label "Avoid." Marks a pattern or approach the Commonway System recommends against outright, stronger than a Situational status badge.
:::

:::unsourced
Flags a claim that still needs a citation before publication. The amber color is reserved for this and for pattern highlighting, so it never doubles as a general-purpose warning color elsewhere in the system.
:::

## Citations

Citations are numbered, superscript badges that link down to a source list at the end of the page, under a `## References` heading. Clicking a badge jumps straight to its numbered entry. A claim still waiting on a source is flagged inline instead of cited, using the same amber as the `:::unsourced` block above but sized for a single word or number rather than a whole paragraph<Citation unsourced />.

See the [Bicycle Boulevard](/patterns/local-streets/bicycle-boulevard/) page's Design notes section for numbered citations linking to a real References list in action.

## Related patterns

Every pattern page ends with a short Related Patterns list before its References, pointing to the other patterns most worth reading alongside it: a companion, an override, or a lower or higher tier of the same idea. Not every pattern in the same family is listed, only the ones with something specific to add.

Patterns describe what a street should be. If you're trying to figure out how to move an existing street toward one, see [How to read a retrofit strategy](/guide/how-to-read-a-retrofit-strategy/).
