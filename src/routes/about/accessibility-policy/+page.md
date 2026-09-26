---
title: Accessibility Policy
description: Where accessibility efforts on the Commonway System publication stand today, the standard we're working toward, known limitations, and how to report a barrier.
date: 2026-09-26
llms: Describes the publication's accessibility goal (WCAG 2.2 Level AA), states plainly that it has not been independently audited, lists known limitations and planned improvements, and explains how to report an accessibility barrier.
---

**Effective date:** September 26, 2026

Commonway System wants everyone, including people with disabilities, to be able to read and use this publication. This page describes where accessibility efforts stand today, honestly, rather than claiming a finished result.

## Standard we're working toward

We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA, the current internationally recognized standard for web accessibility. This publication has not undergone an independent accessibility audit, and we don't claim full conformance. Where we know of a specific gap, it's documented below.

## Known limitations

Accessibility has not been comprehensively tested against every WCAG 2.2 success criterion, and gaps likely exist beyond those listed here. What follows is what an automated audit found, plus a few things that audit can't check.

### How this was audited

On September 26, 2026, every page of the publication (165 pages) was scanned with axe-core 4.10.2, an automated accessibility checker, against the WCAG 2.0, 2.1, and 2.2 Level A and AA rules plus axe's own best-practice rules. Each page was scanned three ways: desktop width in dark mode, desktop width in light mode, and a 375px phone width in light mode. Automated scanning typically catches only a portion of real accessibility problems, so a clean result on any item below does not mean it is fully accessible. Every issue the audit found was fixed the same day: a missing main landmark, two unlabeled side landmarks, a skipped heading level before the Pattern ID and Retrofit Strategy cards, two light-mode text colors below the contrast minimum, small tap targets on citation badges, empty table header cells, and stray images without alt text in the Release History.

### Result of the automated audit

No open items from the automated audit remain. Each of the issues it found was fixed, which does not mean the publication is fully accessible. The audit also prompted two additions: a "Skip to main content" link on every page, and a pause button on the homepage's animated background (the choice is remembered, and the button is hidden for anyone whose device is set to reduce motion). See the sections below for what has been checked by hand and what has not.

### Flagged by the audit for manual review, then checked by hand

Axe couldn't compute a verdict for a few contrast checks and asked for a human decision. Each was checked directly, and none is a failure:

- **Numbered citation badges** (129 pages): axe said the text was too short to evaluate. Measured directly, the badge text (`#002d27`) on its fill (`#00a896`) is 5.01:1, above the 4.5:1 minimum, and it is the same in light and dark mode because both colors are fixed.
- **Sidebar links** (about 100 pages): axe said an element partly covered the link, so it couldn't find the background. In the rendered page nothing sits over the links. The link text measures 8.5:1 in light mode and 10.6:1 in dark mode, and the current-page link measures 6.7:1 in light and 8.2:1 in dark. Axe raised the flag because the sidebar is a sticky panel that is partly out of view during the scan.
- **Speed-limit sign graphics** (`SpeedLimitSign.svelte`): axe couldn't read the background behind text drawn inside an SVG. The sign's text is fixed black (`#000`) on a fixed white face (`#fff`), 21:1, in both themes, since a real regulatory sign is black on white regardless of the site's theme.

Axe will keep listing these as "needs review" on future scans, because it can't evaluate them on its own.

### Not covered by the automated audit

- **Not yet tested:** full keyboard-only walkthroughs, screen reader testing (NVDA, VoiceOver, JAWS), 200% and 400% zoom, Windows forced-colors mode, and touch-screen use beyond the phone-width scan above.

## Display settings

The "Aa" button in the header (and "Display settings" in the mobile menu) opens a panel with these options. Choices are saved in your browser only. With no saved choice, the site follows your device's own "more contrast" setting.

- **Reading font:** replaces the publication's fonts with Lexend, Atkinson Hyperlegible Next, or OpenDyslexic. All three are served from this publication's own files, never from an outside font service. Research has not shown that any dyslexia-specific font makes reading faster for everyone; some readers simply find one easier, so the choice is yours.
- **Color symbols:** a small symbol tab on colored cards, using the free ColorSym system, for readers who cannot tell the colors apart. Text labels already carry the same information; the symbols are an extra. The key is on the [Brand Guide](/about/brand-guide/#color-symbols).
- **Text size:** four steps up to 150%, scaled from your browser's own text size. Your browser's zoom and your operating system's text settings still work on top of it.
- **High contrast:** pure black and white, solid borders, underlined links, and a text label for every classification color (Local street, Arterial street, and so on) so color is never the only signal.
- **Reading ruler:** shades the page except for a clear window of one to three lines that follows your mouse, a finger, or keyboard focus (Alt plus the up or down arrow key also moves it). You choose the window height and how dark the shading is. Text in the shaded area is deliberately dimmer, so choose Light if you need more contrast there. It turns off the pointer highlight, does nothing in forced-colors mode or in print, and is not available on the text-only pages.
- **Simplified view:** one column in a plain system font, with hero art, card illustrations, and animation removed, and every collapsed section expanded.
- **Enhanced focus outline:** a thicker two-color outline around whatever has keyboard focus, visible on light and dark backgrounds.
- **Large pointer:** a larger mouse arrow over the page. Your operating system's pointer-size setting works everywhere, including outside the page, and is the better option if you can use it.
- **Pointer highlight:** a translucent yellow circle that follows the mouse pointer.

## Text-only pages

Every page has a text-only version, linked as "Text-only version" beneath the page and from the Display settings panel. These are plain, unstyled pages with no images, scripts, or animation, built from the same content as the full page and linked to each other. An index of all of them is at [All text pages](/text/all-pages/). Text-only pages ask search engines not to index them and point back to the full page as the canonical version.

## Search

The Search button in the header (in the mobile menu at phone width) opens a search dialog, and Ctrl+K (Cmd+K on a Mac) opens it from anywhere. The dialog is a native modal: focus moves into it, the page behind it is inert, Escape closes it, and focus returns to where you were. Results are ordinary links, and the arrow keys move between them (Tab works too). The number of results is announced as you type. The same search is available as a full page at [Search](/search/), which is also where "See all results" leads. If you would rather browse than search, the [Site Map](/about/sitemap/) lists every page, grouped like the navigation, without needing JavaScript. There is deliberately no single-key shortcut such as "/", because single-key shortcuts need a way to be turned off or remapped. Search needs JavaScript; without it, the [text-only page index](/text/all-pages/) and the Pattern Index are the way to browse. It has been checked with automated tools only, not yet with a screen reader.

## What we're planning

Further accessibility work will be added here as testing turns up issues. This page will be updated to reflect the current state rather than the intended one.

## External and third-party content

The guidebook links extensively to external sources: government manuals, published studies, agency sites. We don't control the accessibility of those external pages. Some embedded media (video, for example) may not have captions or transcripts if the source platform doesn't provide them.

## Feedback

If you run into an accessibility barrier anywhere on this publication, we want to know. Contact us at [info@commonwaysystem.org](mailto:info@commonwaysystem.org), and describe the page and the problem you ran into. We'll do our best to respond and address it, though as a small, independently maintained project, response times will vary.

## Changes to this policy

This page is updated as accessibility work on the publication progresses. Updates are reflected in the publication's version history; see [Release History & Roadmap](/about/release-history/).

## Contact

Questions about this policy can be directed to [info@commonwaysystem.org](mailto:info@commonwaysystem.org).
