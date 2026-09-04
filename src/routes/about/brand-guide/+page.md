---
title: Brand Guide
description: The Commonway System's visual and editorial system, colors, typography, voice, illustration rules, citation format, and logo usage.
date: 2026-08-29
llms: The Commonway System's full visual and editorial system, colors, typography, voice and editorial rules, illustration rules, citation format, and logo usage.
---

<script>
  import { Button, Citation, ColorSwatch, EvidenceChip, ExampleCard, FormControlsPreview, LogoPreview, PatternCard, PatternIndexCard, TypeSample } from '$lib/theme/components'
</script>

The visual and editorial system behind the Commonway System (CS): how it looks, how it's written, and how its evidence is presented. This page transcribes the working brand reference; treat the color values and rules below as the source of truth over anything in the site's theme.

:::note
This is a working draft (CalVer 2026.08.26), maintained as an internal reference. The site's color tokens (`src/lib/theme/styles/tokens.css`) are synced to the palette documented here, with one exception: `--cw-danger` (the guide doesn't define a danger-admonition color; kept independent rather than reusing Freeway, since Freeway's real color is a neutral gray). The `:::warning` admonition still uses amber, which is a known conflict with the reservation rule below, flagged rather than silently changed since it's a content-semantics call, not a color-value one.
:::

:::note
Intersections & Crossings has no color family in the working draft, which only documents Local, Collector, Arterial, and Freeway. The ramp shown below for it is a site-only addition (added 2026.08.30, not part of the guide), built the same way the guide's own four ramps were, from a single base color rather than an invented palette.
:::

## Voice attributes

| CS voice is...                                          | CS voice is not...                                    |
| ------------------------------------------------------- | ----------------------------------------------------- |
| Encyclopedic                                            | Conversational or chatty                              |
| Evidence-led (claims trace to citations)                | Opinion-led or persuasive                             |
| Layered (plain language first, technical depth beneath) | Dumbed-down, or gatekept behind jargon                |
| Precise (specific numbers, named sources)               | Vague or hand-wavy                                    |
| Confident through sourcing                              | Confident through authority or credential-claiming    |
| Neutral and descriptive                                 | Salesy, urgent, or marketing-toned                    |
| Inclusive of total beginners                            | Exclusionary of experts who already know the material |

### The disagreement-phrasing pattern

Every place CS takes a position against, or beyond, conventional practice uses the same underlying shape: name the origin (an intentional baseline practice, or an emergent structural pattern), then close with a classification backed by specific evidence. A baseline source is never called "wrong," "outdated," or "flawed."

- **Opening A** (intentional practice): "[Baseline source] recommends/practices [X]."
- **Opening B** (emergent/structural): "[Pattern] emerges when [structural cause]."
- **Closer, always:** "CS classifies this as [Default / Situational-Discouraged / Avoid], informed by [specific evidence source and finding]."

<ExampleCard label="Correct" tone="good">
NACTO's guidance allows Local street design speeds up to 25 mph in many contexts. CS sets a 20 mph hard maximum with no exceptions, informed by Dutch Sustainable Safety research linking pedestrian survival rates to impact speed.
</ExampleCard>

## Editorial standards

Sentence-level production rules, distinct from the voice attributes above.

- **Word-lite principle.** Say as little as possible while conveying as much meaning and nuance as possible. Every sentence gets tested for whether it can be shorter without losing precision.
- **Layered sentence complexity.** Plain-language passages use short, direct sentences with common words. Technical-layer passages, sitting just beneath, can carry longer sentences with precise technical terms and multiple citation badges. The two layers never mix mid-paragraph.

:::warning
No em-dashes, ever, anywhere in CS content. This is a standing, non-negotiable rule. Use a comma for a brief interruption, a period to split into two sentences, a semicolon to connect related independent clauses, parentheses for a true aside, or a colon to introduce an explanation or list.
:::

- **Plain-language-first terminology.** The first time a technical term appears in a plain-language passage, it's introduced in accessible language before the formal term is used, not the reverse.

## Color system

### Base tokens

<div class="swatch-grid">
  <ColorSwatch hex="#141414" label="Ink" />
  <ColorSwatch hex="#FDFAF3" label="Paper" />
  <ColorSwatch hex="#00A896" label="Commonway teal" />
  <ColorSwatch hex="#3D3AAB" label="Deep indigo" />
  <ColorSwatch hex="#FF9F1C" label="Amber (reserved)" />
</div>

:::warning
Amber is reserved exclusively for the unsourced-claim flag and pattern-illustration highlighting. It never appears anywhere else in the system.
:::

### Evidence tiers (one hue, three depths)

Represents a strength gradient, not unrelated categories. Legal requirement is the strongest backing, precedent the weakest, so tiers separate by lightness and remain readable to red-green color blindness.

<div class="swatch-grid">
  <ColorSwatch hex="#005F52" label="Legal / regulatory" />
  <ColorSwatch hex="#00A896" label="Evidence-based" />
  <ColorSwatch hex="#7FDCCF" label="Precedent-based" />
</div>

**As rendered chips:**

<ExampleCard>
  <div class="demo-row">
    <EvidenceChip tier="legal" />
    <EvidenceChip tier="evidence" />
    <EvidenceChip tier="precedent" />
  </div>
</ExampleCard>

### Functional Classification ramps

Each Functional Classification gets a 6-step tint/shade ramp across density tiers, lightest at Undeveloped, darkest at Core. Revised and colorblind-checked against protanopia, deuteranopia, and tritanopia; Local's hue was shifted from an initial rose to a saturated violet-purple after simulation found a collision with Freeway under deuteranopia.

**Local**

<div class="swatch-grid">
  <ColorSwatch hex="#E5CDFE" label="Undeveloped" />
  <ColorSwatch hex="#CA9CFC" label="Rural" />
  <ColorSwatch hex="#AB60FB" label="Suburban" />
  <ColorSwatch hex="#891FF9" label="Compact" />
  <ColorSwatch hex="#6805D1" label="Urban" />
  <ColorSwatch hex="#4A0495" label="Core" />
</div>

**Collector**

<div class="swatch-grid">
  <ColorSwatch hex="#D9D8F2" label="Undeveloped" />
  <ColorSwatch hex="#B3B1E5" label="Rural" />
  <ColorSwatch hex="#8D8AD8" label="Suburban" />
  <ColorSwatch hex="#6764C4" label="Compact" />
  <ColorSwatch hex="#4A47B8" label="Urban" />
  <ColorSwatch hex="#302D82" label="Core" />
</div>

**Arterial**

<div class="swatch-grid">
  <ColorSwatch hex="#EAF5D0" label="Undeveloped" />
  <ColorSwatch hex="#D4EBA1" label="Rural" />
  <ColorSwatch hex="#BEE072" label="Suburban" />
  <ColorSwatch hex="#A3CE49" label="Compact" />
  <ColorSwatch hex="#8AB92E" label="Urban" />
  <ColorSwatch hex="#6B9420" label="Core" />
</div>

**Freeway**

<div class="swatch-grid">
  <ColorSwatch hex="#EDEEF0" label="Undeveloped" />
  <ColorSwatch hex="#D6D8DC" label="Rural" />
  <ColorSwatch hex="#B9BCC2" label="Suburban" />
  <ColorSwatch hex="#9CA0A8" label="Compact" />
  <ColorSwatch hex="#7D818A" label="Urban" />
  <ColorSwatch hex="#5C6068" label="Core" />
</div>

**Intersections & Crossings**

<div class="swatch-grid">
  <ColorSwatch hex="#F9E9D2" label="Undeveloped" />
  <ColorSwatch hex="#F2CF9D" label="Rural" />
  <ColorSwatch hex="#EAB668" label="Suburban" />
  <ColorSwatch hex="#E39C33" label="Compact" />
  <ColorSwatch hex="#BF7D1A" label="Urban" />
  <ColorSwatch hex="#8A5A13" label="Core" />
</div>

Color is for fast scanning; a text label is what makes classification colorblind-safe. Never color alone.

## Typography

Fraunces (variable serif) for headings, Inter (variable sans) for body text. Both free, open-source, true variable fonts that hold up in print and web. Fraunces carries warmth and distinctiveness at display size; Inter stays clean and legible through dense technical passages.

<ExampleCard>
  <TypeSample token="--type-display" px={40} family="display" weight={600}>Commonway</TypeSample>
  <TypeSample token="--type-h1" px={28} family="display" weight={600}>Urban main street</TypeSample>
  <TypeSample token="--type-h2" px={20} family="display" weight={600}>Section header</TypeSample>
  <TypeSample token="--type-h3" px={16} family="display" weight={600}>Technical subhead</TypeSample>
  <TypeSample token="--type-body-lg" px={17} family="body" weight={400}>Pattern definition sentence</TypeSample>
  <TypeSample token="--type-body" px={14} family="body" weight={400}>Standard paragraph text</TypeSample>
  <TypeSample token="--type-meta" px={12} family="body" weight={600} uppercase tracking="0.05em">Pattern ID, classification labels</TypeSample>
  <TypeSample token="--type-micro" px={10} family="body" weight={600} uppercase tracking="0.04em">Citation badges, chips, flags</TypeSample>
</ExampleCard>

## Illustration & photography

Clean flat vector illustration, NACTO-inspired, warmed by human figures at true scale. Spot-color amber technique: context stays grayscale, the specific pattern being illustrated floods amber.

**The amber trigger rule.** Only the specific pattern a page is about floods amber. Adjacent patterns appearing in the same illustration for context stay grayscale, even if they're themselves named CS Typologies with their own pages elsewhere. One page, one amber subject, no exceptions. The amber-flooded pattern occupies roughly 60 to 70 percent of the frame, with just enough grayscale context to make the relationship legible.

**Human figures.** Render in a fixed, neutral ink-based treatment regardless of what's flooding amber around them, since their job is scale and presence, not representing the pattern. Cap at 2 to 3 figures per illustration. Across the book as a whole, figures should reflect a real range of ages and mobility.

**Sizing and aspect ratio by scale**

| Scale level        | Format                             |
| ------------------ | ---------------------------------- |
| Network / Corridor | Wide format (16:9 or wider)        |
| Segment            | Cross-section format (about 2.8:1) |
| Intersection       | Near-square or 4:3, plan-view      |
| Facility / Element | Smaller square detail insets       |

**Photography** is reserved for case-study and precedent documentation only (before/after material for a real corridor), never for core pattern definitions, which stay flat vector illustration.

## Components

### Pattern ID card

<ExampleCard>
  <PatternCard id="ART-UMS-07" title="Urban main street" classification="arterial">
    An Urban main street is an Arterial typology combining retail frontage access with continuous pedestrian priority along both edges.
  </PatternCard>
</ExampleCard>

The colored left edge always matches the pattern's Functional Classification, using each classification's real ramp color now that `tokens.css` is synced (Arterial, Freeway, and Intersections' real hues are naturally light, so the left border uses their darkest tier, Core, to clear the 3:1 UI-component contrast minimum). The ID text itself is always ink, per the guide: "a constant identity mark distinct from classification color."

### Pattern Index card

<ExampleCard>
  <div class="pattern-index-grid">
    <PatternIndexCard href="/patterns/local-streets/default/" id="LOC-DEF-01" title="Default (Standard Local Street)" classification="local" />
    <PatternIndexCard href="/patterns/arterials/stroad/" id="ART-STD-05" title="Stroad" classification="arterial" status="avoid" />
    <PatternIndexCard href="/patterns/arterials/one-way-street/" id="ART-OWS-06" title="One-Way Street" classification="arterial" status="situational" />
    <PatternIndexCard href="/patterns/intersections/roundabout/" id="INT-RAB-01" title="Roundabout (Single/Multi-Lane)" classification="intersections" image="/patterns/int-rab-01-roundabout.png" />
  </div>
</ExampleCard>

Used on the Pattern Index (`/patterns/`) in place of a plain bulleted list, one card per Street Typology. The image area recolors per classification with a `mix-blend-mode: color` overlay (Suburban tier at rest, Core tier as the hover border, same darkest-clears-contrast reasoning as the Pattern ID card's left edge above), including Intersections & Crossings, now that it has its own ramp too. Most patterns still use a single shared placeholder graphic; a handful have a real illustration in already, and swapping the rest in over time only means setting that pattern's own `image` prop, the recolor mechanism keeps working unchanged either way. The number circle restarts at 1 for each Functional Classification group and is always ink-fixed/paper-fixed regardless of theme, the same "constant identity mark" reasoning as the Pattern ID text. The status badge only appears for Situational and Avoid; Recommended (the unremarkable default) gets no badge here at all, unlike its quiet pill on the full pattern page.

### Citation badge

<ExampleCard>
Corner radii should not exceed 15 ft (4.6 m) at the crossing edge.<Citation index={14} href="#" />
</ExampleCard>

### Unsourced-claim flag

<ExampleCard>
This sentence is a placeholder for a claim that has not been sourced yet.<Citation unsourced />
</ExampleCard>

## Buttons, links & forms

The interactive-site build needs these regardless of how sparingly the book itself uses them, since search, filtering, and the eventual interactive Guide diagnostic tool all depend on real form controls. The site does not have production `<button>`/`<select>` styling wired up as reusable components yet, but these previews use the same `tokens.css` values everything else on the site does.

### Buttons

<ExampleCard>
  <div class="demo-row">
    <Button variant="primary">Primary action</Button>
    <Button variant="secondary">Secondary action</Button>
    <Button variant="dark">Dark / high-emphasis</Button>
    <Button variant="disabled">Disabled</Button>
  </div>
</ExampleCard>

Primary uses the signature teal fill with ink text, not paper text. Paper-on-teal only reaches 2.86:1 contrast and fails; ink-on-teal reaches 6.18:1. At most one primary button per view; everything else is secondary or dark.

### Hyperlinks

<ExampleCard>
Read more about the <a href="https://www.fhwa.dot.gov/" target="_blank" rel="nofollow noopener noreferrer">FHWA self-enforcing roadway framework<span class="cw-external-indicator"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9" /></svg><span class="cw-sr-only"> (opens in new tab)</span></span></a>, or see the <a href="/about/brand-guide/#citation-format">full citation format</a> for this pattern. Toggle dark mode to see the link color switch, and note the small "opens in new tab" icon this site adds to every outbound link automatically.
</ExampleCard>

Links use indigo, not teal, since teal is already committed to citations and evidence tiers. Underlined always, not just on hover, since this is a reference work first and a marketing site second. This example uses the site's real `--cw-link` token, which reflects both modes correctly.

<div class="swatch-grid">
  <ColorSwatch hex="#3D3AAB" label="Link, light mode" />
  <ColorSwatch hex="#A79EFF" label="Link, dark mode" />
</div>

The working draft's original indigo (`#3D3AAB`) reaches 8.28:1 contrast on light paper, but only 2.1:1 on a dark background, well below the 4.5:1 WCAG AA minimum. The dark-mode value is the same indigo/violet hue lightened, not a different color, and reaches 7.89:1 on dark paper. Dark mode isn't part of the original working draft; this pairing is a site-only addition, documented here since it's now the real token every hyperlink in the guidebook uses.

### Form controls

<ExampleCard>
  <FormControlsPreview />
</ExampleCard>

Focus state on text inputs and selects uses a teal outline ring, not a color change on the border alone, so keyboard navigation stays visible against every classification color context.

## Citation format

The house citation format is modeled on agency-reference conventions: source name, year, title, publisher (when distinct from the source), and URL. Entries are numbered to match their inline badges, sorted by publication date, and, within a single source cited multiple times, ordered by where the content appears in that source, not by citation number or alphabetically.

**Link maintenance**

| Link state | Handling                                                                                                    |
| ---------- | ----------------------------------------------------------------------------------------------------------- |
| Live       | URL shown as-is, with a last-checked date in the metadata line                                              |
| Redirected | Updated to the new URL, original URL noted, with the date the redirect was found                            |
| Dead       | Original URL retained, paired with an archive.org snapshot link, dated to when the page was last known live |

One citation, one purpose.

## SEO / AEO / GEO strategy

Google's own guidance treats generative AI search optimization as fundamentally the same discipline as SEO, rooted in the same core ranking and quality systems, and explicitly debunks several tactics marketed as "GEO best practices" (llms.txt for Google specifically, content "chunking," and structured data as a requirement rather than a nice-to-have). What actually drives visibility, per Google's guidance, is unique point-of-view content and non-commodity material with genuine expert insight, organized into clear sections with real navigational headings, which is exactly what CS already is by design.

**What CS does:**

- Lets the plain-language layer at the top of each pattern entry function as a natural, self-contained answer block.
- URL structure mirrors the Pattern ID system (e.g. `/patterns/art-ums-07`).
- Uses structured data (`DefinedTerm` or `Article` schema, `dateModified` tied to CalVer) for genuine rich-result eligibility, not because AI visibility requires it.
- Keeps entity clarity through the Functional Classification / Street Typology terminology discipline: consistent, unambiguous naming.
- Treats the citation system as a genuine GEO asset, not a performance of one. It exists for credibility reasons first.
- Surfaces CalVer versioning visibly on every page as a real freshness signal.

**What CS skips:** llms.txt treated as load-bearing for Google specifically, content chunking as an optimization tactic, and structured data treated as a hard requirement rather than a nice-to-have.

## Accessibility notes

A contrast issue was caught and fixed during design: the citation badge and Evidence-based chip originally used `#003D35` text on `#00A896`, a 4.10:1 contrast ratio, below the 4.5:1 WCAG AA requirement for text at that size. Corrected to `#002D27`, reaching 5.01:1 (the value used by the evidence chips above).

| Pairing                     | Ratio   | Status |
| --------------------------- | ------- | ------ |
| Citation badge (corrected)  | 5.01:1  | Pass   |
| Precedent-based chip        | 7.59:1  | Pass   |
| Legal/regulatory chip       | 6.41:1  | Pass   |
| Pattern ID / metadata label | 5.04:1  | Pass   |
| Unsourced-claim flag        | 8.97:1  | Pass   |
| Body text on paper          | 17.67:1 | Pass   |

The full palette is simulated against protanopia, deuteranopia, and tritanopia using the Machado-Oliveira-Fairchild model. Local's hue was moved from an initial muted rose, which collapsed toward Freeway's gray under deuteranopia, to a saturated violet-purple, chosen via a hue and saturation sweep maximizing worst-case separation while staying outside the red, orange, and yellow range reserved for the warning system.

A separate legibility issue surfaced after the contrast fix above: the citation badge and unsourced-claim flag pass their contrast ratios at the working draft's `--type-micro` size (10px), but a numeral at 10px in a tight colored pill was hard to actually read, a real-world legibility problem the contrast ratio alone doesn't catch. Both now render at 12px, semibold, independent of the type scale documented above. Contrast is unaffected, this is a size correction, not a color one.

## Logo & wordmark

The Commonway System mark is a set of flowing ribbon shapes rendered in a warm red-to-amber gradient, paired with the wordmark "Commonway System." This is the finalized, production logo system, delivered as clean vector art with a complete set of variants for light and dark contexts.

Two explicit exceptions to the rest of this guide, scoped to the logo only:

- **Gradient.** The red-to-amber gradient exists nowhere else in the Commonway System. Every other use of color in this guide, illustrations, UI components, classification ramps, stays flat, no gradients. The logo is the sole exception.
- **Typography.** "Commonway" is set in Fraunces Bold (700), heavier than the SemiBold (600) used for headings throughout the rest of the system. "SYSTEM" is set in Inter Light (300) with extended letter-spacing. Neither weight should be replicated in body headings, card titles, or any other heading context.

### Full lockup, standard use

<div class="logo-grid">
  <LogoPreview src="/logos/full-logo-dark-variation-commonway-for-light-backgrounds.svg" background="light" label="Dark variation, on light" />
  <LogoPreview src="/logos/full-logo-light-variation-commonway-for-dark-backgrounds.svg" background="dark" label="Light variation, on dark" />
</div>

This is what the site itself uses in its navbar, switching automatically with the reader's light/dark mode.

### Full lockup, muted / watermark use only

<div class="logo-grid">
  <LogoPreview src="/logos/full-logo-light-variation-commonway-for-light-backgrounds.svg" background="light" label="Light variation, on light" />
  <LogoPreview src="/logos/full-logo-dark-variation-commonway-for-dark-backgrounds.svg" background="dark" label="Dark variation, on dark" />
</div>

### Square lockup

<div class="logo-grid">
  <LogoPreview src="/logos/square-logo-dark-variation-commonway-for-light-backgrounds.svg" background="light" label="Dark variation, on light" />
  <LogoPreview src="/logos/square-logo-light-variation-commonway-for-dark-backgrounds.svg" background="dark" label="Light variation, on dark" />
  <LogoPreview src="/logos/square-logo-light-variation-commonway-for-light-backgrounds.svg" background="light" label="Light variation, on light (muted)" />
  <LogoPreview src="/logos/square-logo-dark-variation-commonway-for-dark-backgrounds.svg" background="dark" label="Dark variation, on dark (muted)" />
</div>

### Icon only, no wordmark

<div class="logo-grid">
  <LogoPreview src="/logos/logo-dark-no-text.svg" background="light" label="For light backgrounds" />
  <LogoPreview src="/logos/logo-light-no-text.svg" background="dark" label="For dark backgrounds" />
</div>

All logo variants ship in `static/logos/`, including the muted/watermark pairs, even where only the standard pair is used live on the site today.
