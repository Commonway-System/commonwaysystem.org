---
title: How to Read a Pattern
description: How to read a Commonway System pattern entry, Pattern ID cards, classification colors, status badges, the Pattern viewer, density tier chips, the Speed & Modal Hierarchy card, and the citation system.
date: 2026-08-29
llms: Explains how to read a Commonway System pattern entry, Pattern ID cards, classification colors and status badges, the Pattern viewer and its layered configurations, density tier chips, the Speed & Modal Hierarchy card, admonitions, and the citation and unsourced-claim system.
---

<script>
  import sampleViewer from '$lib/data/street-configs/_demo'
  import { Citation, DensityChip, ExampleCard, ModalHierarchySection, PageHeader, PatternViewer, RelatedMedia, SpeedLimitSection, SpeedModalHierarchyCard } from '$lib/theme/components'
</script>

Every pattern in this guidebook is built from the same handful of parts, repeated consistently: a Pattern ID card, the Pattern viewer, density tier chips, admonition blocks, and citations. This page walks through what each one means, so the rest of the guidebook can be read without re-explaining itself on every page.

<RelatedMedia id="/guide/how-to-read-a-pattern/" />

## The Pattern ID card

<ExampleCard>
  <PageHeader demo eyebrow="Patterns · Arterials" title="Urban main street" patternId="ART-UMS-09" status="recommended" accent="arterial" summary="An Urban main street is an Arterial typology combining retail frontage access with continuous pedestrian priority along both edges." />
</ExampleCard>

Each pattern opens with a header that is also its ID card, naming its ID, title, [Functional Classification](/guide/street-types/), and (for most classifications) a status, followed by a one-sentence summary. The header's color matches the classification, Local, Collector, Arterial, Freeway, or Intersections & Crossings, so a reader flipping through the guidebook can tell at a glance what kind of pattern they're looking at, even before reading the title.

The ID itself follows a fixed format, `[PREFIX]-[CTXCODE]-[##]`, like `LOC-BBG-12`, with an optional trailing `(DENSITY)` suffix once more than one page exists for the same Typology at different density tiers.

The small label above the title shows the pattern's Functional Classification when one applies: Local, Collector, Arterial, Freeway, or Intersections & Crossings. For the four Scales that don't subdivide by classification, Network, Corridor, Facility, and Element, that same label shows the Scale name itself instead. See [Scale Hierarchy](/guide/scale-hierarchy/) for what each of the nine Scale prefixes covers.

Read the [Pattern IDs](/guide/pattern-ids/) page for what each part of the ID means, the full nine-prefix Scale breakdown, and what each status badge means.

## The Pattern viewer

Right after the header, every pattern opens with the Pattern viewer: drawings of the pattern that you can change. The example below is a made-up sample street, not a real pattern.

<ExampleCard>
<PatternViewer data={sampleViewer} title="Sample street" classification="collector" demo />
</ExampleCard>

The tabs along the top switch between views of the same street, such as a cross-section (a cut straight across the street, edge to edge, as if you were standing in it) and a top-down view. Expand fills the screen, on a phone too; Exit full view or the Escape key brings it back.

**Reading the cross-section.** The drawing is a cut through the ground as well as the street, so you can see where curbs step up and where trees have soil to grow in. Under it, three rows of dimensions give each strip's width, the width from curb to curb, and the full right of way between the property lines (the dashed lines at either edge). Past those lines, the drawing shows lawns, buildings, a parking lot or open land as context; that part is the setting, not part of the pattern. A colored band under the dimensions says who each strip is for, Pedestrian, Bicycle, Transit or Vehicle, with buffers and medians hatched between them. The band's words carry the meaning; its colors only help. Under the band, a top-down slice shows a short stretch of the same street from above, every strip lined up under its column in the section: lane markings, bike lane symbols, crosswalks, and trees seen from above. Top-down slice switches it off.

**Stepping down the layers.** Street guidance comes in layers, explained in [How the Transportation Ecosystem Fits Together](/guide/how-the-transportation-ecosystem-fits-together/): a federal or state minimum, NACTO's enhancements, a Complete Streets policy, and the Commonway System's own answer. The viewer opens on the Commonway System and lets you step down to see what each earlier layer would have built. A pattern shows only the layers that have been researched for it, so some show fewer. Dutch practice, where it appears, sits apart under "For comparison": it isn't a step on the same ladder, it's a different system.

**What changed.** With Highlight changes on, anything that differs from the layer just below is outlined in amber and numbered, and the same numbers appear in a "What changed" list under the drawing, so the list says in words what the outline shows. A strip that moved says where it is now, and a change in the street's total width is listed as a change to the right of way.

**Choices within a layer.** Some patterns can be built more than one way within the same layer. On [Default (Standard Collector)](/patterns/collectors/default/), for instance, on-street parking can be left out or added on either side or both, and the Commonway System's bike lane can run next to the street or next to the sidewalk. Each choice is a row of buttons under the layers, and the drawing, its description and its dimensions change with it. A choice that doesn't change a layer, such as where the bike lane goes on a layer with no bike lane, is grayed out with a note saying so.

**Other controls.** Compare side by side puts two configurations next to each other, or the same configuration with a different choice, such as the bike lane next to the street beside the bike lane next to the sidewalk. Where a street changes along its length, at a crosswalk with curb extensions for instance, Cut at moves the cross-section to that spot, and the top-down view marks each cut with a dashed line. Labels, dimensions, and feet or meters can be switched; the units choice is remembered between pages. An Avoid pattern's top layer is the replacement rather than an improvement: [Stroad](/patterns/arterials/stroad/) steps up to a Boulevard. A Retrofit Strategy shows Before and After instead of layers.

**In words.** Each configuration has a written description under the drawing, which a screen reader announces when it changes, and "All configurations, in words" lists every one. The text-only and markdown versions of each page show those descriptions in place of the drawing.

**Sharing a view.** The address bar keeps your choices, so copying the link shares exactly the view you're looking at.

**What the drawings are, and aren't.** Drawings are to scale but illustrated: people, vehicles, trees and lights are drawn at their real size, and the people and cars change from strip to strip so the street looks lived in. Bike lanes are drawn painted green, as NACTO recommends, unless a pattern says otherwise. A drawing is one way to build the pattern, not a requirement. Simplified view (in Display settings) swaps the illustrations for plain outline symbols. The guidance and its citations live in the descriptions and the page text. Most patterns don't have drawn views yet; they show their illustration as an Overview, or a placeholder marked "Illustration in progress".

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
