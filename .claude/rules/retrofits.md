---
paths:
  - "src/routes/retrofits/**"
  - "src/lib/theme/components/RetrofitIndexCard.svelte"
---

# Retrofit Strategy pages

How the Retrofit Strategy catalog works, as of 2026.10.20. The batch-by-batch history of how it was built (2026.09.03) is in `docs/engineering/history.md` under "Superseded: retrofits.md".

A Pattern describes what a street should be; a Retrofit Strategy describes how to move an existing street toward one. The navbar label and folder names say **Retrofits**; page titles and prose say **Retrofit Strategies**.

## IDs and folders

- IDs are `RFT-SCALE-##`, with SCALE `NET` (Network), `CDR` (Corridor) or `INT` (Intersection). Numbers are permanent within each scale, never reused or reordered. Frontmatter `patternId` holds the ID (the field name is shared with patterns).
- Pages live at `src/routes/retrofits/{network,corridor,intersection}/<slug>/+page.md`. `retrofitStrategyCount` in `src/lib/pattern-count.ts` counts them; never hardcode the count.
- A new strategy needs: its sidebar entry in `sidebar['/retrofits/']` (`vite.config.ts`), a card on the index, and reciprocal links (below).

## The index, `/retrofits/`

`src/routes/retrofits/+page.md` is a **card grid**, laid out like the Pattern Index: two short intro paragraphs (linking How to read a retrofit strategy and Patterns), then one `##` section per scale in the order **Network, Corridor, Intersection** (the same order as the sidebar), each with a one-paragraph description and a `<div class="pattern-index-grid">` of hand-written `<RetrofitIndexCard href="..." id="RFT-..." title="..." scale="..." />` tags, one per strategy, in ID order.

`RetrofitIndexCard` shows the ID, the title, a number circle (the ID's last two digits, so it restarts at 1 in each scale) and an image. The image comes from the strategy page's own `image:` frontmatter through `page.data.pageImages`, which `src/routes/retrofits/+page.server.ts` builds at prerender time; no strategy has an image yet, so every card shows the shared placeholder tinted in its scale's color. Colors follow each scale's Pattern peer: Network and Corridor strategies use the Network and Corridor ramps, Intersection strategies the Intersections & Crossings ramp. There is never a status badge. The index gets `CollectionPage`/`ItemList` JSON-LD from the sidebar.

## A strategy page

Every strategy page has the same shape:

1. Frontmatter: `title`, `description`, `patternId`, `date`, `llms` (and `image:` once there is one). No `status`: a Retrofit Strategy is never Recommended, Situational or Avoid; it applies to a street or it doesn't.
2. `PageHeader` (from `PageLayout`) is the ID card: the ID, the scale in the eyebrow, the title, tinted in the scale's color. The first paragraph after `<script>` is the one-sentence summary that joins the header band.
3. `<PatternViewer ... classification="<peer>" retrofit />` on one line (classification is `network`, `corridor` or `intersections`). Its heading reads "Before and after" when the data has an `after` configuration, otherwise "Strategy viewer". Only `RFT-CDR-01` has viewer data so far (`src/lib/data/street-configs/rft-cdr-01.ts`).
4. `## Overview`, then `<RelatedMedia id={fm.patternId} />` (it hides itself when nothing is tagged).
5. `## Where this leads: Target patterns` as a `cw-links` list.
6. A `<div class="cw-facts">` holding four `cw-fact` blocks: `## Applicability and thresholds`, `## Evidence and effectiveness`, `## Getting it built`, `## Who can move this` (each gets its own icon from the heading id).
7. `## Related retrofit strategies` as a `cw-links` list.
8. `## References`, with `EvidenceChip` and `ref-N` anchors as on every page.

All 21 strategies follow this order. Pages get `TechArticle` JSON-LD with `identifier` from `patternId`.

## Linking strategies and patterns

- Every Target pattern a strategy names should carry a `## Getting there: Retrofit path options` section pointing back to it (right after `## Related patterns`, before `## References`). 24 pattern pages have one. Don't add an empty one to a pattern nothing retrofits into. Default (No Parking, No Direct Property Access) and Scenic Highway / Byway don't yet link back to `RFT-CDR-11`.
- **Network strategies** (`RFT-NET-01` to `04`) change a property of the area they're applied to (permeability, interior-street use, connectivity) rather than producing a new pattern. Keep the standard headings; the prose says the strategy applies *within* a pattern rather than leading to one. Network topology patterns (Grid, Dendritic) get no "Getting there" entry; the Local patterns these strategies produce do.
- A target can be a Segment pattern plus an Element, written as one entry, for example "Default (No Parking, No Direct Access) `ART-DEF-01` with Protected Bike Lane / Cycle Track `ELM-PBL-37`" on the protected bike lane retrofits. That's the one case where a `cw-links` entry holds two links.
