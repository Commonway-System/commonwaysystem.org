---
paths:
  - "src/lib/data/releases.ts"
  - "src/lib/data/roadmap.ts"
  - "src/routes/about/release-history/**"
  - "src/lib/theme/components/Changelog.svelte"
  - "src/lib/theme/components/Roadmap.svelte"
  - "src/lib/pattern-count.ts"
---

# Changelog, Roadmap and Release History

Moved from CLAUDE.md on 2026.10.20 without rewriting. Words like "above" and "below" may now point to another file in `docs/engineering/` or `.claude/rules/`; the index at the end of CLAUDE.md lists them all.

The Roadmap on `/about/release-history/` renders from `src/lib/data/roadmap.ts` (read its header; the rules are in `docs/decisions.md` under Open items). It is no longer a mirror of a list kept outside the repo; the old sync note is in `docs/engineering/history.md`.

**The changelog date is the date a change is published, not the date it was written.** A session that commits without pushing may file its entries under its own day; if that day was already published (or the push happens later), move those entries into the entry for the push date. Check with `git log origin/main..HEAD` and compare against the last pushed `releases.ts` (`git show origin/main:src/lib/data/releases.ts`). This happened on 2026.10.20: four entries committed under 2026.10.19 after that day's push.

## Pattern-count sync and a real live-interpolation bug, Item 33 (2026.09.10)

**106 → 111 is now the correct live count** (confirmed via `patternPageCount`'s own glob logic and a filesystem crawl), fixed everywhere it was hardcoded as stale prose: `CLAUDE.md`'s own "Known gaps" Illustration-section note, and `/about/release-history/`'s Roadmap section. Left unchanged, deliberately, everywhere else the old numbers (106, 105, 40, 37, etc.) appear: every dated `releases[]` changelog entry, since those are historical records of the count _at that date_, the same "changelog entries stay as written" rule the Parkway ID renumbering already established — retroactively bumping a historical entry's count would misrepresent history, not fix a bug.

**Real bug found, still unresolved:** the 2026.08.28 launch entry's `summary` field is the one changelog entry that does _not_ use a static historical number — it interpolates the _live_ `${patternPageCount}` directly (`` `...the first ${patternPageCount} Street Typology pattern pages...` ``), so that one entry's text silently drifts forward forever and will never actually describe launch day. Confirmed live: it currently renders "the first 111 Street Typology pattern pages," which is wrong for a launch-day entry (the true count then was well under 40, per the next day's entry mentioning "All 37 pattern pages"). Needs a decision on what number to hardcode there, not a mechanical fix — flagged here rather than guessed.

## Changelog format (2026.10.18)

The Release History changelog is data, `src/lib/data/releases.ts` (typed, read its header), rendered by `Changelog.svelte`; the page itself only imports it. Each release is `{ date, changes }` and each change is `{ type, area?, summary, details? }`: `type` is `new | improved | fixed | removed | note` (note = accessibility checks, known-incomplete items, link checks and other notes that aren't a change; shown last as "Checks and notes" and not counted as changes), `area` is `content | site` (notes have none), `summary` is one plain sentence without the type word (the badge says it), `details` is the full description (omit when the summary says everything). Write one change per item rather than a paragraph covering several; list them in any order, the component groups them by type. The newest release shows open (`openCount`), older ones fold behind "Show the N changes"; each date is an `h3` with id `release-YYYY-MM-DD` (in On this page; a link to it opens that release). Rules: summaries follow the editorial rules (no em-dashes, plain words); historical entries keep their date's counts and wording; backticks render as code. The 2026.10.18 conversion drafted every summary and type from the old one-paragraph items (kept unchanged as `details`, a few split where they bundled unrelated changes) for Kevin to review. `generate-agent-files.mjs`'s `log.md` parser reads the markdown copy's `###` date and `####` group headings, and `generate-text-pages.mjs` drops `.cl-more__summary`; keep both in step if the markup changes.

## Moving unpublished entries at push time (2026.10.22)

Several sessions filed their entries under 2026.10.21 and left them unpushed, while origin already had a 2026.10.21 entry. The fix that worked: compare the working file's 2026.10.21 block with `git show origin/main:src/lib/data/releases.ts`, match changes by their `summary` text, keep the ones origin has, and move the rest into today's block (a short Python script; do this before adding today's own lines so nothing is lost). Then check every unpushed commit (`git log origin/main..HEAD`) has a line, including ones that only touched data or docs.
