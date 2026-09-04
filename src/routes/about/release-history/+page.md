---
title: Release History & Roadmap
description: How Commonway System versioning works, what changed in each release, and what's planned next.
date: 2026-08-31
llms: Explains the Commonway System's CalVer versioning, the current version, the changelog, and the public roadmap of work not yet built.
---

<script>
  // Counts real Street Typology pattern pages (patterns/<classification>/<slug>/),
  // not the Pattern Index itself, which sits one path segment shallower.
  // Computed from the routes themselves so this number can't drift stale
  // the way a hardcoded count would, the same reasoning
  // src/lib/server/content.ts already applies to llms.txt. Points at
  // patterns/, not guide/, since the sitewide URL restructure moved every
  // pattern page out of guide/ into its own top-level patterns/ section.
  const patternModules = import.meta.glob('/src/routes/patterns/**/+page.md')
  const patternPageCount = Object.keys(patternModules).filter((path) => {
    const rel = path.replace('/src/routes/patterns/', '').replace('/+page.md', '')
    return rel.split('/').length === 2
  }).length

  // Newest first. A quiet day can stay a one-line `summary`; a heavier day
  // can add `items` for a bulleted breakdown instead, per-entry, not a
  // shape every entry is forced into.
  const releases = [
    {
      date: '2026.09.04',
      items: [
        'New top-level Media Gallery section (`/media/`), added between Retrofits and Reference in the nav. A Media item is a small external reference, a YouTube video, podcast, or article, tagged with which Pattern pages, Retrofit Strategy pages, or Guide pages it relates to; the Gallery itself is a real, filterable/sortable index (search, plus checkbox filters for media type, source, and topic), not a static list. Launched with one seed entry (a Not Just Bikes video on continuous sidewalks); see below for same-day additions.',
        'A companion "Related Media" section now appears on every Pattern page, every Retrofit Strategy page, and select Guide pages (Foundations, Make It Happen, and About → The Commonway System), showing only the media items tagged to that specific page. If nothing is tagged, the section renders nothing at all, no empty state, so it\'s live on all of those page types now even though only a handful currently show anything.',
        'Two real gaps in the source ticket were found and resolved before building, rather than built around silently: the ticket described reusing "the existing Form Controls component pattern already used on the Pattern Index" for the Gallery\'s filters, but no working version of that exists anywhere on the site (the closest match is an explicitly decorative, non-functional Brand Guide mockup); the Gallery\'s filtering is new, real client-side logic. Separately, the ticket\'s media-tagging field only supported Pattern IDs and Retrofit Strategy IDs, but Related Media was also specified for Guide/About pages, which have neither; that field now also accepts a page\'s own route path. See CLAUDE.md for the full writeup.',
        'Data architecture note for future sessions: media items are the first "data record" content type on this site, distinct from Patterns/Retrofit Strategies/Guide pages (which are full hand-authored content pages with no queryable structure behind them). Each media item is one small TypeScript file, checked by `pnpm run check` against a shared schema, not a markdown page — see CLAUDE.md\'s new "Media Gallery & Related Media" section for the reasoning, and for what a future session needs to hand over to add another item to the library.',
        'Follow-up layout request: `/media/` was rebuilt from the sitewide 3-column template (sidebar, content, table of contents) into a page-specific 2-column layout, main content on the left, search/filter/sort controls stacked vertically on the right in place of the table of contents, since neither a sidebar nor page headings made sense for this page. A second follow-up capped Related Media\'s own card grid at 2 columns, decoupled from the Media Gallery page\'s own grid, which stays at 3.',
        'Same-day second batch: four more Media Gallery entries added (MED-002 through MED-005, three City Beautiful videos and one BicycleDutch video), from a second written ticket. The Gallery now shows 5 items and 3 distinct sources; Related Media now shows real content on a much wider set of pages, including several tagged by more than one entry at once (Protected Intersection carries both a general "are streets too complicated" video and a Dutch protected-intersection design video, for instance). The ticket asked for one specific check before implementing: that all 47 `relatedTo` IDs across the four new entries actually resolve to live pages, rather than trusting the list as given. All 47 did; nothing needed flagging or fixing.',
      ],
    },
    {
      date: '2026.09.03',
      items: [
        'Retrofit Strategies Batch 1 scaffolding: five new Guide pages, built from a written ticket (an instructions file plus five content files), that lay the groundwork for the Retrofit Strategy catalog landing in Batch 2. No Retrofit Strategy entries exist yet, none of these pages have anything real to cross-link to as a catalog entry, they only build what a future entry will point at.',
        'Four new pages published under Guide → Make It Happen: Legal & Planning Mechanisms (right-of-way control tools and policy mechanisms that make a retrofit possible in the first place), Funding & Financing Mechanisms (eight value-capture tools in a structured what-it-is/purpose/revenue/leveraging format), Decision & Evaluation Processes (Intersection Control Evaluation and the Road Safety Audit), and Construction Methodology & The Build Spectrum (the four-stage demonstration/pilot/quick-build/permanent framework, plus CS\'s own "test before you pour" position). All four carry real, tiered citations.',
        'A fifth new page, How to read a retrofit strategy, was placed in Foundations directly under How to Read a Pattern rather than in Make It Happen. It documents the future `RFT-SCALE-##` ID format (SCALE is Corridor/Intersection/Network) and what each section of a Retrofit Strategy entry will contain, once real entries exist. Initially scaffolded into Make It Happen alongside its four batch-mates, then corrected once flagged: it\'s structurally How to Read a Pattern\'s sibling, not a Make It Happen tool, and pagination follows sidebar position. See CLAUDE.md for the full reasoning and the house rule this sets for future batches that mix structural roles.',
        'How to Read a Pattern and How Road Changes Actually Happen both gained cross-references into the new pages at their existing natural attachment points (a corridor-preservation aside, an engineering-study/warrant discussion, a capital-project discussion), rather than a bolted-on "see also" list.',
        'Citation format in the source ticket (italic evidence-tier labels, no inline markers in the prose) was translated to the site\'s real `EvidenceChip`/`Citation` components rather than transcribed literally, per the standing ticket-verification rule; inline citation badges were added by hand at the closest topical match for each reference, so nothing in the four new References lists sits orphaned with no inline attachment point.',
        'Retrofit Strategies Batch 2: the catalog itself. A new top-level Retrofits section (`/retrofits/`, sibling to Patterns in the navbar) now holds all 17 real `RFT-SCALE-##` entries, 10 Corridor, 4 Intersection, 3 Network, plus its own index page, built from a second written ticket (an instructions file plus 23 content files). A new `RetrofitCard` component gives each entry the same visual ID-card treatment Patterns use, with a Corridor/Intersection/Network scale label in place of a status badge, since Retrofit Strategies are never endorsed or discouraged, only applicable or not.',
        'Six new patterns landed alongside the catalog, needed as real destinations for the new strategies: Modal Filter / Point Closure, Median Island, and Neighborhood Traffic Circle / Mini-Roundabout (Elements); Median U-Turn, Restricted Crossing U-Turn, and Displaced Left-Turn (Intersections & Crossings, all three Situational by design, a narrow-context fit rather than a broad default).',
        'A new "Getting there: Retrofit path options" section, the piece deliberately deferred from Batch 1, is now live on 22 pattern pages, pointing each one at the Retrofit Strategy or Strategies that lead to it. Ten existing pages (Bollard, Curb Extension, Bicycle Boulevard, Pedestrian Safety Island/Refuge, Boulevard, Roundabout, All-Way Stop, Vertical Speed Control, Signal, Grade-Separated Interchange) also gained reciprocal Related Patterns links back to the six new patterns.',
        'Verified against a real `pnpm run build`, not just `pnpm run check`: all 24 new pages\' internal links and citation anchors resolved cleanly under strict prerendering on the first build. See CLAUDE.md for the full build, including the Network-scale "applies within, not leads to" phrasing rule and the mixed-scale Pattern-ID reference in the three protected-bike-lane retrofits.',
        'Same-day follow-up: the Retrofit Strategy Index (`/retrofits/`) was rebuilt from a plain numbered list into a card grid matching the Pattern Index, via a new `RetrofitIndexCard` component. Coloring for both the new index card and the existing Retrofit Strategy ID card now follows each strategy\'s functional Pattern peer rather than a separate palette: Intersection strategies use the real Intersections & Crossings ramp, Corridor and Network strategies share Patterns\' own still-placeholder Freeway-gray. Both components are now documented on the Brand Guide alongside their Pattern-catalog counterparts.',
      ],
    },
    {
      date: '2026.09.02',
      items: [
        'Merged Commercial Arterial (ART-CAR-07) into Stroad (ART-STD-05). Commercial Arterial and Stroad were the same failure mode under two names; Stroad\'s page now covers both, with citations merged from both original pages. ART-CAR-07 is retired and not reassigned. 301 redirect in place.',
        'All 11 Intersections & Crossings pattern pages gained a Recommended/Situational status badge, applied to both the page\'s own Pattern ID card and its Pattern Index row (Protected Intersection already had Recommended; the other 10 are new). Reverses the site\'s prior documented convention that intersections carry no status; see CLAUDE.md. Uncontrolled\'s Design notes also gained one sentence pointing to Stop / Yield as the next control tier once volume rises past the point Uncontrolled stays safe.',
        'New "Descriptive" status badge added for patterns documented as an existing condition rather than a design recommendation. Applied to Organic/Irregular (NET-ORG-04), resolving its previously flagged pending-decision callout. No other pattern currently qualifies.',
        'New `static/_redirects` file added for a real Netlify-level 301 (the Commercial Arterial → Stroad merge above needed one, and `adapter-static` has no server-side way to produce a redirect on its own). CLAUDE.md updated throughout to document all of the above, including a new working-convention note on verifying a written ticket\'s concrete claims (citation markup, token values) against the actual code rather than transcribing them literally.',
        'Bicycle Boulevard / Neighborhood Greenway (LOC-BBG-12) fully rewritten, dropping its "demonstrates the components" placeholder framing for real content: a Paired illustration, Modal hierarchy, Design notes with 2 real tiered citations, and a Related patterns section. It was the last of the 106 live pattern pages still carrying placeholder content or the "Unsourced claim" flag.',
        'Four pattern pages converted off a non-standard "Why this pattern exists" / "Key considerations" template onto the site\'s standard Modal hierarchy → Design notes structure: Parkway, Downtown Thoroughfare, Multi-Use Trail / Greenway, and Shared-Use Path. Existing citation numbers and their attachment points were preserved on all four; only the surrounding prose and headings changed.',
        'New `Illustration` component system built for the Brand Guide\'s illustration spec (a Paired/Single-condition/Diagram/Descriptive/Conditional frame-and-callout renderer, standing in for real vector art until each pattern\'s illustration gets drawn) and applied to Local Default (LOC-DEF-01, replacing its old "no illustration yet" placeholder note, and adding a new NACTO reference) and Stroad (ART-STD-05, a required Single-condition illustration plus a justified plan-view supplemental). This is a sitewide component now available for every pattern page\'s Illustration section, but illustration content has only been authored for these 2 pages plus Bicycle Boulevard above; the other ~103 pattern pages still have none.',
        'Fixed a cosmetic sidebar bug: the Patterns sidebar showed "Stroad / Commercial Arterial (Avoid)" for the Stroad entry, inconsistent with the page\'s own "Stroad (Commercial Arterial)" title set during the 2026.09.02 merge above. Now matches.',
        'Related patterns rollout completed: the 35 pattern pages still missing a Related patterns section (11 Local, 5 Collector, 5 Arterial, 4 Freeway, 10 Intersections) all got one. Every one of the 105 live pattern pages now carries exactly one. Protected Bike Lane / Cycle Track (ELM-PBL-37) also gained a 4th Key Considerations bullet citing its existing NACTO reference, which had been listed but never cited inline.',
        'How to Read a Pattern gained two new sections matching the site\'s current pattern-page structure: "Illustrations," explaining the Paired/Single-condition/Diagram/Descriptive illustration forms in reader-facing terms, and "Related patterns," describing the cross-reference list every pattern page now ends with. Two stale cross-references on the same page were also fixed: the citation-example pointer and the Caution-admonition example both used to point at Bicycle Boulevard sections that no longer exist after its rewrite above; the Caution example now points at a real, verified example on One-Way Street instead.',
        'Post-verification cleanup: a leaked instruction sentence ("Citation badge 1 also appears once more, in Illustration callout 3 above") was found rendering as live page text on Bicycle Boulevard, immediately after Design notes — meta-commentary from the drafting process that should never have been visible content. Removed; a sitewide scan turned up no other instances. The Pattern Index\'s Arterial table had a visible numbering gap (skipping straight from 6 to 8) left over from the Commercial Arterial retirement, since the Pattern Index card\'s number badge is drawn directly from the Pattern ID\'s own trailing digits. Closing it meant renumbering Parkway from ART-PKY-08 to ART-PKY-07, a one-time, explicitly authorized exception to the site\'s normal "IDs are never reassigned" rule, made only because the site is four days old and not yet public; see CLAUDE.md for the full reasoning and the house rule this sets for any future case. The Commercial Arterial → Stroad redirect itself was double-checked and confirmed already correctly in place from earlier the same day.',
        'New Guide page, "Design Speed & Speed Limits" (guide/design-speed/, under Foundations): explains why design speed, operating speed, and posted speed limit diverge, and states the Commonway System\'s own rule, design speed always equals posted speed, with concrete numbers by Character Type. Built from a user-supplied ticket; its raw citation HTML was translated to this site\'s real Citation/EvidenceChip components rather than transcribed literally.',
        'New Speed & Modal Hierarchy card component system (SpeedModalHierarchyCard, SpeedLimitSection, ModalHierarchySection, ModalHierarchyRow, ModalHierarchyPill, SpeedLimitSign), replacing the old plain "Modal hierarchy" heading and list on all 23 automobile-allowing Local, Collector, and Arterial pattern pages, and extended in a Modal-Hierarchy-only form to the 4 patterns that exclude automobiles entirely (Pedestrian-only Street/Plaza, Shared-Use Path, Bike Highway/Greenway, Multi-Use Trail/Greenway). Section A renders one MUTCD-style speed-limit sign per applicable speed (stacked above the description on Arterial pages, which can carry up to 5 at once; side by side on Local/Collector); Section B renders one colored pill per mode, ">" between ranked modes and "=" for an explicit tie (a real case on Shared-Use Path and Multi-Use Trail/Greenway\'s own equal-priority Pedestrian/Bicycle pairing). Two further special cases: Stroad shows signs with no pill row at all, since it has no ranked hierarchy to show; Festival Street and School Street each show two labeled pill rows, since their hierarchy changes by time of day.',
        'Pill icons are 5 exact icons from the Lucide icon set (person-standing, bike, tram-front, car, truck), supplied directly by the user and used under Lucide\'s ISC license. New THIRD-PARTY-NOTICES file added at the repo root for this and any future embedded (not npm-dependency) third-party asset, linked from the Terms and Conditions page\'s "Code and content licensing" section.',
        'Arterial\'s pill color is a documented accessibility exception, not a silent pass: black technically clears WCAG contrast against Arterial\'s green in both light and dark mode, but reads far less legibly in practice than white, so Arterial pills are fixed white in both modes with a dark text-shadow/icon-shadow glow standing in for the missing contrast margin, a real, computed shortfall rather than an estimate. Documented as a "Fail (mitigated)" row in the Brand Guide\'s Accessibility notes table, the same treatment already given the site\'s other known, flagged color exceptions.',
        'How to Read a Pattern gained a new "The Speed & Modal Hierarchy card" section (between Density tiers and Admonitions) with a live rendered demo. Brand Guide\'s Components section gained two new entries, "Speed & Modal Hierarchy card" and "Modal hierarchy pills," plus 6 new Accessibility notes rows with contrast ratios computed directly against the real tokens.css values.',
      ],
    },
    {
      date: '2026.09.01',
      items: [
        'Full citation sourcing completed for the rest of the guide: 93 pattern pages gained real References sections and inline citation badges (46 pages already had References from an earlier session but no inline badges, so those got badges only; 47 pages, mostly Corridor, Local Street, Collector, Arterial, Freeway, and Intersection typologies, got References and badges built from scratch). 105 of the 106 live pattern pages now carry real citations; only Bicycle Boulevard / Neighborhood Greenway remains flagged, a confirmed placeholder page left that way on purpose. Sources include AASHTO, MUTCD (11th Edition with Revision 1), NACTO, PROWAG, FHWA, NCHRP research reports, and CROW/SWOV for the Dutch Sustainable Safety citations, each tagged Legal/regulatory, Evidence-based, or Precedent-based.',
        'Fixed a real bug in the navbar’s CalVer version number: it was computed from the build machine’s wall clock at build time, which isn’t always the same moment as the last real push, so re-running a Netlify build against an already-published commit (a manual redeploy, a cache-clear-and-rebuild, an automatic retry) silently advanced the version past the date anything was actually published, confirmed live when the navbar read one day ahead of every page’s own "Last updated" text. The version is now computed from the last commit’s own date instead (`src/routes/+layout.server.ts`), so it only changes when new content is actually pushed, and stays correct no matter how many times the same commit gets rebuilt. The development server is unaffected and still shows the live current date while editing.',
        'New Pattern IDs page published under Guide → Foundations: the nine-prefix Scale table and status-badge explanation that used to live inline on How to Read a Pattern now have their own page, linked from How to Read a Pattern, Scale Hierarchy, and Street Types & Classifications. How to Read a Pattern\'s own Pattern ID card section is now shorter and leads with a live example card (reusing the Brand Guide\'s illustrative "Urban main street" sample) instead of the full reference table, so a reader sees a real card before reading about its parts.',
        'Make It Happen chapter published under Guide, resolving the Roadmap\'s "Process-explainer chapter" item: "How Road Changes Actually Happen," a four-question method for finding out who has authority over a specific road and how to actually request a change, covering restoring vs. adding vs. changing a standard everywhere, public vs. private roads, splits in jurisdiction, and the seven ways a request gets processed once the right authority is found. A companion reference page, "When Jurisdiction Doesn\'t Follow the Pattern," catalogs real documented exceptions (consolidated city-counties, independent cities, tribal land overlaps, special districts, and more) that don\'t fit the general method cleanly. Both carry real citations. The Guide intro page and the Make It Happen sidebar group were updated to match.',
      ],
    },
    {
      date: '2026.08.31',
      items: [
        'Pattern ID scheme corrected sitewide: Segment/Intersection (LOC/COL/ART/FRE/INT) was previously the only Scale documented as encoding Scale in its prefix. The full nine-prefix system is now in place and documented: NET (Network), CDR (Corridor), FAC (Facility), and ELM (Element) as flat, non-subdividing Scale prefixes, alongside the existing five Functional Classification prefixes at Segment/Intersection. How to Read a Pattern, Scale Hierarchy, and Street Types & Classifications all rewritten to describe the corrected scheme.',
        'Three new live Segment/Intersection pattern pages: Shared-Use Path (LOC-SUP-13), Multi-Use Trail / Greenway (COL-MUT-06), and Protected Intersection (INT-PRI-11, the first new Intersections & Crossings entry since the original ten). Added to the Pattern Index card grid and sidebar; pattern count reached 40.',
        'A new "On the Horizon" section was briefly added to the Pattern Index listing 63 named-and-scoped-but-not-yet-built patterns as descriptive reference tables; superseded later the same day, see below, once all 63 became real pattern pages.',
        'Full Network/Corridor/Facility/Element pattern batch built out: all 63 previously-scoped patterns (4 Network, 6 Corridor, 10 Facility, 43 Element) now have real pattern pages, plus 3 more new Segment/Intersection patterns resolving every item on the old "under review" list: Downtown Thoroughfare (COL-DTH-07), Commercial Arterial (ART-CAR-07, a documented anti-pattern), and Parkway (ART-PKY-08). Live pattern count is now 106. Avenue and the Downtown One-Way/Two-Way Street cluster, also once "under review," were deliberately not built: Downtown One-Way is just the existing One-Way Street (ART-OWS-06), and Avenue was dropped from consideration.',
        'Pattern Index page fully restructured: the old five-classification-plus-two-appendix layout (Local/Collector/Arterial/Freeway/Intersections, "Under review," "On the Horizon") is now nine Scale-ordered sections (Network, Corridor, Local street, Collector street, Arterial street, Freeway, Intersections and crossings, Facility level, Element level), every section a full card grid, no more plain-bullet or table-only appendix sections. Sidebar restructured to match, 9 groups in the same order. JSON-LD Pattern Index ItemList now reflects all 106 patterns automatically, since it derives from the sidebar tree rather than being hand-counted.',
        'PatternCard and PatternIndexCard gained four new classification values (network, corridor, facility, element), all sharing Freeway’s existing neutral-gray ramp as a placeholder color pending real Brand Guide colors for those Scales, flagged inline in both components. Organic/Irregular (NET-ORG-04) renders without a status badge, a flagged, not-yet-confirmed treatment for its own descriptive (not prescriptive) case, since the site’s Recommended/Situational/Avoid system doesn’t have an equivalent value; see the page’s own note callout and this file’s Known gaps section.',
        'Brand Guide’s illustrative "Urban main street" PatternCard demo renumbered from ART-UMS-07 to ART-UMS-09: the collision this file had been flagging as a future risk actually happened once Commercial Arterial and Parkway became real 7th/8th Arterial Typologies.',
      ],
    },
    {
      date: '2026.08.30',
      items: [
        'Homepage rebuilt from scaffold placeholder text into a real Hero / differentiator-strip / features-grid page, with three new components (Hero, EvidenceStrip, FeatureGrid) and two new PageLayout frontmatter flags (hideTitle, wide) for pages that need their own custom-placed h1 or a wider-than-prose content column.',
        'Homepage hero redesigned to be full-bleed edge to edge and permanently dark regardless of the site’s own light/dark toggle, with a subtle animated lane-line texture and a teal glow behind the logomark (both respecting prefers-reduced-motion), and a 60vh minimum height. New GlobalLayout mechanism (isHome) collapses the sidebar/toc grid to a single full-width column on the homepage only, since neither ever has content there.',
        'Differentiator strip (the "why this guide is different" evidence-tier callout) redesigned from an amber box, which read as a warning notice, to a teal feature-highlight treatment matching the evidence chips’ own palette; its "learn more" link now uses the site’s standard hyperlink styling instead of a custom color.',
        'Differentiator strip and feature grid widened to match the navbar’s own 88rem measure, instead of the narrower 46rem prose column every article page uses.',
        '/about/credits/ moved for real to /about/acknowledgments/ (route, not just display title this time), with every cross-link updated to match.',
        'Guide section rebuilt: sidebar regrouped into Foundations, Find Your Pattern, and Make It Happen (the Introduction page now an ungrouped "Start Here" entry at the top, same idea as About’s own Overview item). New Scale Hierarchy page split out of the Introduction page’s old content. Two new placeholder pages, Find Your Pattern and Make It Happen, each with real explanatory copy and the standing "planned but not yet written" callout, one per new sidebar group so nothing has to move once each becomes a real page sequence.',
        'JSON-LD structured data added site-wide: an Organization and WebSite block on every page, plus a BreadcrumbList and a template-appropriate schema.org type (TechArticle for Guide/Reference/pattern pages, CollectionPage for the Pattern Index, AboutPage/WebPage for About, Blog/BlogPosting for the blog) generated from each page’s own frontmatter, no per-page authoring. Every page’s frontmatter gained a date field (datePublished, backfilled from its existing "last updated" date) and every pattern page gained a patternId field, now the single source for the Pattern ID card’s id instead of a hardcoded literal.',
        'Pattern Index page (/patterns/) rebuilt from a plain bulleted list into a card grid: a new PatternIndexCard component per Street Typology, with a recolored image area (classification-ramp tint, swappable per-pattern illustration once one exists), a number badge, and a status badge for Situational/Avoid entries. A new shared StatusBadge component now backs both this and the existing Pattern ID card’s own status pill. Real illustrations added for 11 of the 37 patterns so far, all of Local Streets except Bicycle Boulevard, plus Roundabout. Added to the Brand Guide’s component showcase. The classification section intros on this page were also rewritten into plainer-language prose.',
        'New Intersections & Crossings color ramp (six tiers, built from #8A5A13), resolving the classification’s old single-color placeholder the same way the guide’s other four ramps work; documented on the Brand Guide alongside them. Flagged, not resolved: this hue sits within about a degree of the site’s reserved warning amber.',
        'Mobile navbar layout fixed: below 940px, the version date, GitHub icon, and theme toggle used to clump on the left with empty space on the right once the primary nav links collapsed into the hamburger drawer. All five elements (logo, hamburger, version, GitHub, toggle) now space evenly edge to edge, with icon tap targets kept at their full size and the wordmark logo shrunk to make room on the narrowest phones.',
        'Known incomplete: the new Scale Hierarchy page’s Network/Corridor/Facility/Element definitions carry over wording from an earlier planning session that was never formally re-confirmed as final; pending a maintainer read-through. Separately, found but did not fix a pre-existing bug: the mobile hamburger button doesn’t actually open the sidebar drawer on any viewport, confirmed on an unmodified copy of the site, so the drawer’s nav links and page sidebar are currently unreachable on mobile.',
      ],
    },
    {
      date: '2026.08.29',
      items: [
        'Pattern ID format finalized as CLASS-CTXCODE-## (e.g. LOC-BBG-12), replacing the old SCALE-CTXCODE-### scheme. Applied across every pattern page, the Pattern Index, and every illustrative example, confirmed with a full-repo search for zero remaining old-format IDs.',
        'Bicycle Boulevard’s placeholder ID resolved to LOC-BBG-12; the Brand Guide’s separate "Urban main street" demo card migrated to ART-UMS-07.',
        'PatternCard gained a status badge (Recommended, Situational/Discouraged, Avoid), applied to every Local, Collector, Arterial, and Freeway pattern page. Intersections & Crossings entries intentionally carry no status, matching the master reference.',
        'Default (Standard Local Street) rewritten with real content and cross-links to every other Local Typology and to Continuous Sidewalk/Raised Junction.',
        'New Release History & Roadmap page published under About, with a live pattern-page count and current-version date computed from the site’s own routes rather than hardcoded.',
        'Google Analytics wired up (GA4), loading only in production builds, never during local development.',
        'sitemap.xml added and submitted to Google Search Console; robots.txt now points crawlers at it.',
        'Fixed a mobile navigation bug: the hamburger drawer only ever showed a page’s own sidebar tree, never the navbar’s primary links (Guide, Pattern Index, About), which made them unreachable on narrow viewports, including the homepage.',
        'Density Tiers and Street Types & Classifications published under Guide: the six density tiers with their ITE/CNU transect equivalents and unit-per-acre ranges, and what a Functional Classification and a Street Typology actually are, indexing every Typology by classification.',
        'How to Read a Pattern rewritten with real content: the Pattern ID format, classification colors and status badges, all five admonition kinds, and how citation badges work.',
        'Citation badges now link down to their numbered source entry site-wide, instead of being plain unlinked numbers.',
        'About section filled in with real content: Contributing / Volunteering, Governance, Reporting, and a new Credits page (a data-driven contributor list, currently empty pending the first real contribution). New Terms and Conditions, Privacy Policy, and AI Policy pages published alongside them.',
        'Added the GitHub-side contributor infrastructure those About pages point to: issue templates (factual error, missing citation, dead link, accessibility), a pull request template, and a CODE_OF_CONDUCT.md. Added a root LICENSE (MIT, covering the site’s code only) and documented the code/content license split in the README.',
        'Every page now shows a real "Last updated" date next to its edit link, sourced from git history at build time rather than filesystem metadata (which a fresh deploy checkout would otherwise reset on every file).',
        'Added "Share" buttons (X, Facebook, LinkedIn, Reddit, Bluesky, email, copy-link) to every page: plain outbound links only, no third-party share-button script or tracking, consistent with the Privacy Policy.',
        'The version number in the navbar is now a link to this page.',
        'Fixed a real production-build failure: the Brand Guide’s illustrative citation demo linked to a citation anchor that doesn’t exist, which `adapter-static`’s strict prerendering treats as a hard build error rather than a soft dead link.',
        'Street Types & Classifications gained 10 real citations (Stroad, Street Typology, Living Street/Woonerf, Yield Street, Turbo-Roundabout, plus the three sources behind the Dutch CROW comparison table), mph conversions alongside every km/h speed figure, and working links from that comparison table straight to each pattern’s real CS equivalent page.',
        'Wide tables now scroll horizontally in their own box instead of overflowing the page: a themed edge-fade shadow, a thin scrollbar, and a “scroll for more” hint shown only once a table actually overflows. Applied site-wide through a new rehype plugin, not hand-added per table, and built as a wrapper around the table rather than changing the table’s own CSS display, so screen readers keep the table’s native semantics.',
        'Evidence-tier chips (Legal/regulatory, Evidence-based, Precedent-based) rolled out to every citation on Density Tiers and Street Types & Classifications, and made a standing house rule going forward: every new citation gets one. The Contributing page’s review checklist now says so explicitly.',
        'Sitewide URL restructure: the navbar is now Home / Guide / Patterns / Reference / Blog / About. All 37 pattern pages and the Pattern Index moved out of Guide into their own Patterns section; Guide now holds only its 4 remaining non-pattern pages. Two new sections launched: Reference (explaining the technical-detail layer planned beneath pattern pages, not yet populated) and Blog (a dynamically generated index, one welcome post so far).',
        'About’s sidebar split into three groups, About/Development/Terms and Policies, and four of its pages got new display titles without changing their URLs: Governance → Project Governance, Contributing / Volunteering → Submit a Change, Reporting → Report a Problem, Credits → Acknowledgments.',
        'Fixed this page’s own live pattern-page count, which had silently dropped to 0 after the Patterns move since the script computing it still pointed at the old guide/ path.',
      ],
    },
    {
      date: '2026.08.28',
      summary: `Initial public launch of commonwaysystem.org, deployed through Netlify with a custom SveltePress theme. Guide structure established: Introduction, Pattern Index, How to Read a Pattern, and the first ${patternPageCount} Street Typology pattern pages across Local, Collector, Arterial, Freeway, and Intersections & Crossings.`,
    },
  ]

  const currentVersion = releases[0]

  // Built here, not inline in the markdown body below, because backticks in
  // a template literal read as CommonMark inline-code delimiters when they
  // appear in prose text: two stray backticks around HTML in the page body
  // got misparsed and mangled the Svelte {#if}/{@html} block around it.
  // Script-block content isn't reprocessed as markdown, so it's safe here.
  function releaseBodyHtml(release) {
    if (release.items)
      return `<ul>${release.items.map((item) => `<li>${item}</li>`).join('')}</ul>`
    return `<p>${release.summary}</p>`
  }
</script>

## How versioning works

The Commonway System uses CalVer, a version number built from the date rather than an arbitrary sequence: year, month, day (for example, 2026.08.28). The version shown in the site header is always the date of the most recent publish, and the most recently published version is the official current version of the guide. There is no separate "stable" or "beta" release; whatever is live is the current one.

This site is statically generated. Publishing happens by pushing to GitHub, which triggers an automatic build. There's no manual deploy step and no delay between a push landing and the site reflecting it, so the version number in the header updates the moment a change goes live.

The web version at commonwaysystem.org is canonical. Print editions of the Commonway System Guidebook are dated snapshots: each print copy carries the CalVer date it was produced under, and reflects the guide as it existed on that date. If something in a print copy conflicts with the current web version, the web version is the more current source.

If more than one push happens on the same calendar day, they share a single version number and a single changelog entry below. The changelog entry for that date covers everything that shipped that day, not just the first or last push.

## Current version

**{currentVersion.date}**

The guide currently documents {patternPageCount} Street Typology pattern pages across Local, Collector, Arterial, Freeway, and Intersections & Crossings. None are content stubs, every published pattern page carries real modal-hierarchy, density-applicability, and design-notes content, and every one now carries real citations rather than the "Unsourced claim" flag. Find Your Pattern is still the one remaining placeholder page in the Guide, pending its own diagnostic sequence. The site is actively expanding, not a finished publication.

## Changelog

Entries run newest to oldest. Each entry covers everything published under that date, even if it shipped across more than one push.

{#each releases as release (release.date)}

<!--
  Bold text, not a `###` heading: rehype-slug assigns heading ids from the
  literal source text at build time, before Svelte interpolates {release.date}
  here, so every entry's heading would get the same id ("releasedate") and
  collide the moment a second changelog entry exists.
-->
**{release.date}**

{@html releaseBodyHtml(release)}

{/each}

## Publishing checklist and build notes

Before pushing a batch of work to GitHub, draft a short build note summarizing what changed since the last push. This does two things: it gives the changelog entry above something accurate to draw from, and it gives a checkpoint to review the work before it goes live.

A build note doesn't need to be long. Cover:

- What content changed (new pattern pages, edits to existing ones, corrected data)
- What structural or site changes shipped (new components, navigation changes, styling updates)
- Anything left in a known-incomplete state (a page that's live but flagged with an unsourced claim, a section still under review)

## Roadmap

Work that's planned but not yet built:

- **Real Brand Guide colors for Network, Corridor, Facility, and Element.** All 106 patterns across all nine Scale prefixes now have live pages, but the four newest classifications still render on a placeholder neutral-gray card color (reused from Freeway's own ramp) pending real per-Scale colors.
- **Classification-level overview pages.** Local, Collector, Arterial, and Freeway currently jump straight from the Patterns index into individual Typology pages, with no landing page explaining the classification itself.
- **A final verification pass on MUTCD citations.** MUTCD 11th Edition with Revision 1 citations are now in place site-wide, but their section/chapter numbers weren't individually re-checked against the actual Revision 1 PDF (Revision 1 itself was confirmed as editorial/technical corrections only, not a renumbering, but that's not the same as a section-by-section check).
- **Dutch CROW reference table reconciliation.** A temporary comparison table sits in the internal density-matrix document and needs to be folded into the actual Commonway patterns once they're fully planned.
- **Entity formation and attorney review**, ahead of treating any part of the guide as a finished publication.
- **Arterial speed baseline figures.** The density-tiered principle is locked; the specific mph figures per density tier are not.
