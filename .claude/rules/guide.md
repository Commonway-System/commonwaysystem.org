---
paths:
  - "src/routes/guide/**"
---

# Guide section pages

Moved from CLAUDE.md on 2026.10.20 without rewriting. Words like "above" and "below" may now point to another file in `docs/engineering/` or `.claude/rules/`; the index at the end of CLAUDE.md lists them all.

## Guide restructure, rewrites and ticket workflow (2026.10.15)

- **Guide sections are Core Concepts (Ecosystem, Design Speed, Induced Demand), Using the System (How to read a pattern, How to read a retrofit strategy, Scale Hierarchy, Street Types, Density Tiers, Pattern IDs, Find Your Pattern) and Make It Happen.** "Foundations" survives only in historical changelog entries, the Brand Guide's diagram note, and `audit.ts`'s unrelated checklist category; don't "fix" those. Section intros live only in Start Here's copy and `llms`, not in the sidebar config (it has no description field). The Start Here page lists the three sections' pages by hand; update it when a Guide page is added or moved.
- **Shared counts: `src/lib/pattern-count.ts` exports `patternPageCount` and (since 2026.10.16) `retrofitStrategyCount`**, both counted from the route folders (two path segments below `patterns/` or `retrofits/`), imported by Start Here, the About page and Release History (`import { patternPageCount, retrofitStrategyCount } from '$lib/pattern-count'`, then `{patternPageCount}` in markdown). Never hardcode either number in a page.
- **`How to read a retrofit strategy` now carries a live ID card sample** (a `PageHeader demo` since 2026.10.18) (the real `RFT-CDR-01`, text copied from that page). The pattern page's sample is a made-up card (`ART-UMS-09`), the retrofit page's is real; if `RFT-CDR-01`'s summary changes, update the copy on the sample too.
- **Rewritten from tickets:** Transportation Ecosystem (26 references; Related Media only MED-013 and MED-061; a media item belongs on the page it supports most, so eight general items were untagged), the About page (`about/commonway-system/`, Alexander opening, a single reference) and the Pattern IDs status section (four statuses: Recommended, Situational / Discouraged, Avoid, Descriptive; every pattern page passes `status`). Open: Ecosystem reference 13 is a 404 (see Known gaps).
