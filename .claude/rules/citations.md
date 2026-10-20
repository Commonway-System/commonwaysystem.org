---
paths:
  - "src/routes/**/*.md"
---

# Citations and References lists

Moved from CLAUDE.md on 2026.10.20 without rewriting. Words like "above" and "below" may now point to another file in `docs/engineering/` or `.claude/rules/`; the index at the end of CLAUDE.md lists them all.

## Citation link-out audit, Item 22 (2026.09.09–2026.09.10)

**All 315 citations sitewide (Pattern, Retrofit Strategy, and Guide pages with a `## References` section) now carry a real outbound `href`, except the 5 that are deliberately unlinked print/ebook sources** (see below). The 2026.09.01 "Citations" work described above got every citation a numbered entry with an evidence-tier chip and an inline badge — it never added the actual source URL. This batch closed that gap, across five separate ticket files worked in one continuous session:

1. Guide pages (4) + all 17 Retrofit Strategy pages (68 citations)
2. The Design Speed guide page (partial, 22 of 29) + Network/Corridor/Local Street/Collector/Arterial patterns (64 citations)
3. Freeway/Intersection/Facility patterns (41 citations, plus 3 pages needing inline badges added at the same time — see below)
4. Element patterns (69 citations, plus 3 more badge-placement pages)
5. Closing batch: 2 citation text corrections (a retired source swapped for a live replacement) and the final sitewide tally

**Mechanics, worth reusing verbatim for a future citation batch:** each `## References` line is `N. <span id="ref-N"></span><EvidenceChip tier="..." /> citation text.` — linking it means wrapping only the citation-text portion in standard markdown `[text](url)` syntax, immediately after the `EvidenceChip` self-closing tag. This is safe here specifically because the reference list is top-level page prose, not content nested inside another component's children slot — the nested-component markdown-parsing gotchas documented elsewhere in this file (the "content inside a nested component slot isn't parsed as markdown the normal way" class of bug) don't apply to a References list. A markdown link placed here goes through the real rehype pipeline and gets the full automatic external-link treatment (`target="_blank"`, `rel="nofollow noopener noreferrer"`, the icon, the `.cw-sr-only` text) — confirmed live in-browser every batch, not assumed.

**A handful of citations already had a bare "Available at: https://…" URL in their text** (`design-speed`'s refs 2/5/6/15/16/19/24, `radial`'s ref-1) — these already resolve as real links via `remark-gfm`'s autolinking, so a ticket instruction like "leave these alone, they already have links" means exactly that: don't wrap them in `[...]()`, the bare URL is already sufficient.

**Automated link-checking has a high false-positive rate on this sitography and needs a live-browser follow-up before trusting a non-200, every time.** A plain scripted `urllib`/`curl` request against `nacto.org`, `highways.dot.gov`, `transit.dot.gov`, `store.transportation.org`, `store.ies.org`, `ecommerce.ite.org`, `astm.org`, `apbp.org`, `sciencedirect.com`, and `sagepub.com`/`doi.org` reliably comes back 403, every batch, because these sites run bot/WAF challenges (Cloudflare's "Just a moment…" interstitial is the most common) that a real browser or search-engine crawler sails through but a bare scripted request cannot. The fix each time was the same: open the URL in the actual Browser tool and confirm the real page loads (or, for one government domain that the sandbox's own DNS couldn't resolve at all — `greenstep.pca.state.mn.us` — confirm indexing and content via `WebSearch` instead, since the browser tool couldn't reach it either). Never take a scripted 403/404/timeout as final on this repo's citation domains; always verify live before treating a link as broken.

**Genuinely dead links found and fixed (not false positives) across the five batches:** the Burlington VT "Quick Build Design + Materials Standards" PDF (retargeted to its still-live program landing page), CROW's old `/vakgebieden/verkeer-en-vervoer` path (retargeted to the site's current `/Onderwerpen/verkeer-en-vervoer/` equivalent, found via search since the old URL 404s), and TRB's `onlinepubs.trb.org/.../tcrp_rpt_95c3.pdf` (retargeted to the same chapter's live National Academies Press page). None of these were guessed at — each replacement was confirmed live in-browser, matching the original citation's title, before being used.

**Three items were deliberately left unlinked pending Kevin's call, and all three were later resolved in the closing batch:** `/patterns/elements/curb/` (NACTO's site no longer has a standalone "Curbs" page — confirmed by search, not just a missing-link guess — retargeted to an FHWA source covering the same ground) and `/patterns/elements/street-light/` + `/patterns/elements/pedestrian-scale-lighting/` (both cited a formally-withdrawn IES standard, RP-8-22; updated to its real replacement, RP-8-25, in both the citation text and the link, not just the link). **The general pattern: when a cited source has moved, been retired, or been superseded, that's a content decision (what should the citation now say), not a pure link-add — flag it rather than silently relinking to something adjacent.**

**A written ticket's own header/summary numbers are not reliable — always run the actual crawl before publishing a "fully linked" claim.** The closing batch's ticket said "the 4 Network-pattern citations" were the only intentionally-unlinked print/ebook sources; a real crawl found 5 (Grid and Dendritic/Hierarchical each cite _two_ print sources, not one, plus Organic/Irregular's one) across 3 pages, not 4. The final published tally (315 total, 310 linked, 5 intentional exceptions) came from a fresh script-driven crawl of every `## References` line sitewide, not from carrying forward any ticket's own count. Same standing lesson as the dev-server-port and `relatedTo`-ID mismatches documented elsewhere in this file: a ticket drafted without live access to this repo can be wrong about its own numbers, and the fix is always to run the mechanical check yourself rather than trust the figure as given.

## Guide restructure, rewrites and ticket workflow (2026.10.15) (continued)

- **Link checking:** curl 403s from NACTO, AASHTO, SWOV and highways.dot.gov are the known bot walls, not dead links; a real 404 (checked in the Browser pane, not curl alone) is the signal.
