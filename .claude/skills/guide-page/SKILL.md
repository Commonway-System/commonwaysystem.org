---
name: guide-page
description: Research and write a new Guide page, or rewrite an existing Guide or About page, in the Commonway System's reader-first style with fully verified sources. Use for any new page or substantial rewrite under /guide/ or /about/.
argument-hint: "<route or topic> [new]"
---

# Guide page: research, write, verify

Target: $ARGUMENTS

This is the full workflow for a new Guide page or a substantial rewrite. Kevin decides the structure, the hook and every judgment call; Claude researches, drafts, verifies and reports. Stop where this file says stop.

## 0. Load the rules

Read these before anything else:

- `/about/brand-guide/` source (`src/routes/about/brand-guide/+page.md`): Voice attributes, Two kinds of page, Editorial standards, Citation format. Guide and About pages are reader-first.
- `docs/decisions.md`: locked positions and source rules.
- The page itself, for a rewrite. For a new page: its item in `src/lib/data/roadmap.ts`, and the patterns and retrofit strategies it relates to.
- Two pages already in the house style, as voice models: `src/routes/guide/induced-demand/+page.md` and `src/routes/guide/make-it-happen/+page.md`.
- The Related Media tagged to the page: `grep -l "<route>" src/lib/data/media/entries/*.ts`.

## 1. Diagnose and propose, then stop

For a rewrite, say in a few bullets why the page falls flat (opens with a definition, stakes come late, no next step, best material buried, and so on). For a new page, say what a first-time reader needs from it.

Then propose:

- **Structure**, in the reader-first order: hook, why you should care, how it works, what the Commonway System does, fair questions, what you can do, Related Media, References. Adapt it to the page; don't force sections that have nothing to say.
- **Hook**: two or three real-case candidates, each one sentence, with what research it needs.
- **Two to four questions** for Kevin: the calls that change what gets written.
- **Problems already spotted** in the existing sources, as a short table.

Stop and wait for Kevin's answers. Don't research in depth or write copy before he answers. Plan mode suits this step.

## 2. Research

- **Re-read every existing source.** Open each one, and check every claim that cites it against what the source actually says. Record each mismatch: what the page says, what the source says, the fix.
- **Research the hook against primary sources.** It must be real and verifiable: no composites, no invented neighbors. If the sources don't support the hook as proposed, tell Kevin right away and offer the closest true version before continuing.
- **Add new material only where it serves the structure Kevin approved.**
- Keep every existing source unless it's disproven. A source replaced by a better one isn't lost; list the replacement.

Source traps that have recurred:

- **Wrong attributions:** a page cites an organization's About page for a claim the page doesn't make. Re-point to the real source.
- **Stale status claims:** "now enforceable," "adopted," "pending." Recheck against the newest primary or official record.
- **Overstated summaries:** a secondary write-up (LegalClarity, FiscalNote, a blog) paraphrases a statute or rule loosely. Read the statute or rule.
- **Wikipedia:** replace it with the primary source it cites where one can be read. If none can, keep it with the unsourced flag.
- **Blocked sites:** FHWA (fhwa.dot.gov), VDOT, SWOV, iris.who.int, cga.ct.gov, NACTO's Cloudflare check and some Congress.gov pages refuse automated reading. Use a reputable secondary source with the unsourced flag, or ask Kevin for the text. Never try to get past a bot wall.
- **Undated pages:** say so in the reference note; don't guess a date.

## 3. Draft

Write the page directly in its `+page.md`, in the repo's own syntax:

- Frontmatter: `title`, `description`, `date` (keep the original date on a rewrite), `llms` (a full one-paragraph summary of what the page covers).
- `<script>` importing `{ Citation, EvidenceChip, RelatedMedia } from '$lib/theme/components'`.
- An italic lede line under the frontmatter.
- Inline badges: `<Citation index={n} />`, numbered by first appearance.
- References: `n. <span id="ref-n"></span><EvidenceChip tier="legal|evidence|precedent" /> [Citation text.](url)`, plus a short note after the link when needed.
- A secondary-verified reference: `<Citation unsourced />` after the chip, and a note naming what was read instead.
- Callouts: `:::note` ... `:::`.
- `<RelatedMedia id="<route>" />` directly before `## References`.
- No em dashes. Check with a search before reporting.

For a new page, also add it to `sidebar['/guide/']` in `vite.config.ts` and to Start Here's page list (`src/routes/guide/+page.md`).

At the same time, write `docs/review/<slug>.md` with:

1. **Corrections:** old ref, what the page said, what the source says, the fix.
2. **Flags:** every unsourced or undated reference and why.
3. **New material:** what was added and from where.
4. **Calls for Kevin:** numbered, each answerable in a word or two.
5. **Old-to-new map:** where each old section went (rewrites only).
6. **Related Media:** each tagged item with a proposed action (keep, untag, retag elsewhere, blurb fix) and its endorsement status rechecked.

Then stop. Tell Kevin the page is ready on the dev server and summarize the calls in a few lines.

## 4. Revise

Kevin reviews the real page on the dev server and asks for changes. Make them in place. When a call is decided, update the page and the review notes. If a call locks a new cross-page position, add it to `docs/decisions.md`, one line, with the date.

Apply Related Media changes only after Kevin approves them.

## 5. Close out

When Kevin says the page is done, follow CLAUDE.md's standing procedures: the whole-page accessibility check, the link check (report 403s and timeouts as not machine-verified; never swap a link silently), the changelog entry in `src/lib/data/releases.ts`, and, if the page completes an open item, removing it from `src/lib/data/roadmap.ts`, only once Kevin confirms. Delete `docs/review/<slug>.md` once Kevin approves the page. Don't commit or push until Kevin asks.
