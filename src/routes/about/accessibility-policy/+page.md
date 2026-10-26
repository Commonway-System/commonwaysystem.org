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

When a page has three or more Related Media items, they sit in a single row that scrolls sideways instead of a tall grid. It never moves on its own. Previous and Next buttons step through it, and a line above it (announced to screen readers) says which items are showing, such as "Showing 3–4 of 14". Tab, touch, trackpad and mouse-wheel scrolling all work too. A screen reader hears an ordinary list of every item, nothing is hidden, and the row still scrolls without JavaScript. Simplified view and print show every card stacked instead. A "See all" link under the row opens the Media Gallery filtered to that page's items. It has been checked with automated tools only, not yet with a screen reader.

The Search button in the header (in the mobile menu at phone width) opens a search dialog, and Ctrl+K (Cmd+K on a Mac) opens it from anywhere. The dialog is a native modal: focus moves into it, the page behind it is inert, Escape closes it, and focus returns to where you were. Results are ordinary links, and the arrow keys move between them (Tab works too). The number of results is announced as you type. The same search is available as a full page at [Search](/search/), which is also where "See all results" leads. If you would rather browse than search, the [Site Map](/about/sitemap/) lists every page, grouped like the navigation, without needing JavaScript. There is deliberately no single-key shortcut such as "/", because single-key shortcuts need a way to be turned off or remapped. Search needs JavaScript; without it, the [text-only page index](/text/all-pages/) and the Pattern Index are the way to browse. It has been checked with automated tools only, not yet with a screen reader.

## Pattern viewer

Every pattern and Retrofit Strategy page opens with a Pattern viewer: drawings of the street that change as you choose a view or a configuration. It's built to work without seeing the drawings:

- **Every drawing has a written description**, shown under it and linked to it, so a screen reader reads the description with the drawing. When you change the view or configuration, the new description is announced. "All configurations, in words" lists every configuration's description at once, and it's what the text-only and markdown versions of the page show in place of the drawing.
- **Changes are numbered and written out.** With Highlight changes on, each change is outlined in amber and given a numbered badge, and the same numbers appear in a "What changed" list in words. The outline alone is too faint on a light background to count as a signal, so it never stands alone.
- **The controls are standard.** The view tabs follow the usual tab pattern (arrow keys move between them, Home and End jump to the ends). The configuration and units choices, and choices within a configuration such as on-street parking, are ordinary radio buttons and checkboxes, so they work with a keyboard, a screen reader and touch the way any form does. A choice that doesn't apply to the configuration on show is disabled, with a note in words saying so. Where the system rates a choice, the rating is in words too: a screen reader hears "preferred", "discouraged" or "highly discouraged" with the button's name, and choosing a discouraged option shows, and announces, a short note saying why. The icons differ in shape (a check, a triangle, an octagon), and the color change when a discouraged option is chosen only backs them up.
- **Full view is a standard modal dialog.** Focus moves into it, the page behind it is inert, Escape closes it, and focus returns to the Expand button. A citation link followed from full view closes it and goes to the reference.
- **The drawings are illustrated, with the facts in words beside them.** Since October 17, 2026 the cross-section shows people, cyclists, vehicles, trees and buildings in color, a cut through the ground, and a short top-down slice of the same street under it. The illustrations are decorative: everything they show is in the written description. The strip names and widths under the drawing are real text, and the band that says who each strip is for (Pedestrian, Bicycle, Transit, Vehicle) uses words, with its colors only backing them up; every word on the band clears 4.5:1 in both themes.
- **Simplified view swaps the illustrations for plain outline symbols,** and drops the clouds. The top-down slice can be switched off with its own checkbox.
- **Nothing moves on its own,** and the drawings have no animation.
- **Your choices can be shared and kept.** The address bar records the view and configuration; feet or meters is remembered in your browser only.

<div class="cw-options cw-options--pair">

**How it was checked (October 16, 2026).** Axe (WCAG 2.0 to 2.2 Level A and AA plus best practice) found no violations on all 130 pattern and Retrofit Strategy pages, each in light and dark mode at desktop and 375px width (520 scans); on every configuration of every drawn view, in compare mode and at each cut point (96 more); in full view; and with high contrast, the largest text size, Simplified view, a reading font, color symbols and the enhanced focus outline switched on. By hand: a keyboard walk through the viewer (every stop shows a focus outline; arrow keys move between tabs and configurations; Escape closes full view and returns focus to Expand), no sideways scrolling at 320px width, and the drawings' own text and badge colors measured directly, since axe treats each drawing as one image. Forced-colors mode was checked in Chrome's emulation: the drawings keep their own fill colors, and their text and lines now follow the system's text and background colors, after the check found labels that could have disappeared on a light system palette.

**Checked again after the redesign (October 17, 2026).** Axe found no violations on all 132 pages with a Pattern viewer and 11 more drawn states (the Top down view, compare mode, a cut at a crosswalk, other configurations), each in light and dark mode at desktop and 375px width (572 scans), and again with high contrast at the largest text size, with Simplified view, and with OpenDyslexic, color symbols and the enhanced focus outline switched on. By hand: a keyboard walk through the viewer (every stop shows a focus outline, and Space toggles the top-down slice), no sideways scrolling at 320px width, Chrome's forced-colors emulation (the drawing's text, dimension lines and band follow the system colors, also when the site's dark theme meets a light system palette), and the band's colors measured directly. Still not tested: a screen reader, a real Windows high-contrast session, and real touch devices.

</div>

Known limitations: the drawing's labels keep their size when you change Text size in Display settings (browser zoom and full view do enlarge them). In forced-colors mode the drawings keep their own colors, including a dark fade under the ground in dark mode. The drawings themselves are images, so the detail of where each item sits is only in the drawing, while the descriptions give the widths and what's there. Not yet tested: a screen reader, a real Windows high-contrast session (only Chrome's emulation), and real touch devices beyond the phone-width scans.

## Road Agency Directory

The [Road Agency Directory](/references/road-agencies/) is a list you can search, filter and sort. Without JavaScript, it shows every agency in a plain table, and the text-only page carries the same table. The search box, menus and checkboxes are ordinary labeled form controls, and the number of matching agencies is announced as it changes. The List and Cards buttons say which is selected to a screen reader, and on screen with a heavier border and a fill, not color alone. At phone width, the list folds its Level and Where columns into the agency cell, so the table never scrolls sideways. Each entry's links name the agency to a screen reader, so a list of links isn't a row of identical "Website" links.

The Map view is an extra way in, never the only one. Every state and territory on it is an ordinary link named with the place and its count ("Oregon: 1 agency"), reached in alphabetical order with Tab, and choosing one lists its agencies and moves focus to the result count. The shading is backed by those names, a legend in words, and a hatch pattern for places with nothing researched yet, so color is never the only signal. Hover, keyboard focus and the chosen place get a heavy outline (focus is also dashed) that clears 3:1 against every shade in all four themes. It has been checked with automated tools (October 26, 2026: light and dark, desktop and 375px, high contrast, Simplified view) and by hand with a keyboard, not yet with a screen reader.

Known limitations: the map's labels are drawn into it and keep their size when you change Text size. At phone width they're tiny, and the smallest places (Rhode Island's box, the island territories) are well under 24 pixels to tap. The State or territory menu above the map does the same thing at full size, and the page says so on small screens.

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
