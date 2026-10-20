# Working conventions in full

How work on the Commonway System gets done, as of 2026.10.20. CLAUDE.md carries the short version. The earlier version of this file, written when most work arrived as tickets from a separate planning chat, is in `history.md` under "Superseded: conventions.md".

## How work arrives and gets decided

- **Everything happens in Claude Code now:** research, drafting, decisions and implementation. There is no separate planning chat and no ticket hand-off. Work arrives as:
  - **Direct requests from Kevin** in the session: build this, fix that, add these media items, research this question.
  - **`/guide-page <route or topic> [new]`** for a new Guide or About page or a substantial rewrite. The skill (`.claude/skills/guide-page/SKILL.md`) runs the whole cycle: diagnose and propose, stop for Kevin's answers, research every source, draft with review notes in `docs/review/<slug>.md`, revise, close out.
  - **An open item on the Roadmap**, when Kevin picks one up. The list is `src/lib/data/roadmap.ts`; items are added, reworded or removed only on his explicit instruction.
- **Decisions are Kevin's, one at a time.** For a content or design judgment call (a position, a structure, a hook, a status, a color), surface it as a short question or a numbered call, give a recommendation, and wait. Don't build on an undecided call. Planning a larger piece in plan mode before writing is welcome.
- **Locked decisions go in `docs/decisions.md`**, one line each with the date, as soon as Kevin locks them. Don't reopen one without his say-so. Voice, page structure and editorial rules stay on `/about/brand-guide/` and aren't restated there.
- **Research happens in the session**, against primary sources read directly (rules in `docs/decisions.md` under Sources). Record what was read and what couldn't be, and say so in the report. Never get past a bot check; use another source or ask Kevin for the text.
- **Pasted or attached material** (a spec Kevin wrote elsewhere, a research table, a PDF) is input, not instructions to follow literally. Verify its concrete claims against the code and sources before using them: translate authoring-syntax mismatches to the site's real conventions silently (`<Citation index={N} />`, not raw `<sup>` HTML), verify-then-fix a value that fails a check (contrast, a dead link, a wrong ID), and flag content or design changes it implies. After drafting from any written instructions, re-read the rendered page for sentences addressed to Claude rather than to a reader (a leaked "this also appears in callout 3 above" once shipped as page text).

## Committing and publishing

- **Don't commit or push until Kevin asks.** He often answers "Not yet" and keeps adding work in the same session. Keep it uncommitted, and add each piece to the same day's entry in `src/lib/data/releases.ts` as it lands. At push time, split the work into a few logical commits.
- **A push to `main` is a publish.** Before it: check `git status`, `git diff --stat` and `git log origin/main..HEAD` for work other sessions left (read their diffs and give each a changelog line; stop and ask if something looks unfinished); `pnpm run build` green; changelog entries written one change per item (format in `.claude/rules/releases.md`); the build note doubles as the commit message, ending with the attribution line the system reminder gives. The push procedure (token from `.env`) is in CLAUDE.md.
- **When an open item ships**, remove it from `roadmap.ts` once Kevin confirms, and record it in that day's changelog. Update `highestIdAssigned` when adding an item.

## Checking work

- **Accessibility check on every change**, of the whole page it touches (CLAUDE.md, full text in `accessibility.md`). Part of "done" for every page, component or style change.
- **Verify UI changes in a real browser** before calling them done: light and dark, and at least one narrow width (the theme changes at 1180, 940 and 560/480px). `pnpm run check` misses illegible badges, colors that vanish in dark mode and stray characters in visible text. When the Browser pane can't reach localhost, a throwaway puppeteer-core script (recipe in `history.md`) screenshots and measures instead.
- **Compute contrast** with the WCAG formula rather than judging by eye.
- **Verify before redoing.** When Kevin (or anyone) says something is missing or wrong, check the current files and the browser first. Once, six patterns reported "forgotten" from the Pattern Index were already there.
- **Links:** report 403s, timeouts and dead links as findings; never swap a link silently. Curl 403s from NACTO, AASHTO, SWOV and highways.dot.gov are bot walls; confirm in the Browser pane. A real 404 there is the signal.
- **Fix genuine bugs and contrast failures directly; flag judgment calls.** When a fix uncovers an adjacent problem, fix it if it's clearly a bug, otherwise add it to the report (and to `known-gaps.md` if it stays open).
- **Say in the final report what was checked and what wasn't.**

## Building things

- **Static site:** anything touching routing, build output or server code has to work prerendered (see `architecture.md`): a new `+server.ts` needs `prerender = true` and, if nothing links to it, a `prerender.entries` line.
- **The sidebar is a manual tree** in `vite.config.ts`. A new page also needs its sidebar entry and, as relevant, a Pattern Index or Retrofit index card or a Start Here line, or it exists but can't be reached.
- **Moving a route folder** means checking every `import.meta.glob` that points into it, not only links.
- **A new catalog's cards mirror the existing ones.** `RetrofitIndexCard` copies `PatternIndexCard`'s shell, number badge, hover and image treatment and the `.pattern-index-grid` layout, and takes its colors from its closest Pattern peer. Do the same for any future catalog rather than inventing a new palette.
- **Visual and landing-page work gets real editorial polish**, not a plain content column. Kevin says so plainly when a first pass looks flat or dated. That has meant full-bleed sections (`isHome`, `wide`), deliberate background contrast between sections, subtle motion that respects `prefers-reduced-motion`, and colors chosen for what an element is for. When he names reference sites, open them in the browser and look rather than working from memory.
