import { execFileSync } from 'node:child_process'
import { dev } from '$app/environment'
import { formatCalVer } from '$lib/site.js'
import type { LayoutServerLoad } from './$types'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

// Formats a "YYYY-MM-DD..." date string (the leading slice of git's
// --format=%cI ISO 8601 output) as "August 29, 2026", without ever
// constructing a Date object. Parsing the ISO string's calendar-date
// digits directly, rather than letting `new Date(iso)` reinterpret it
// through a timezone, keeps this the exact calendar date the commit
// itself carries (%cI already includes the committer's own UTC offset),
// not whatever date that instant happens to fall on in the build
// server's timezone.
function formatCommitDate(isoDate: string): string {
  const [year, month, day] = isoDate.slice(0, 10).split('-').map(Number)
  return `${MONTHS[month - 1]} ${day}, ${year}`
}

/**
 * The navbar's CalVer version. Deliberately NOT a wall-clock read at
 * build time (that was the original design, `calVerToday()`, removed
 * 2026.09.01): a static build's clock reflects whenever Netlify happened
 * to run it, which isn't always the same moment as the last real push
 * (a manual "Trigger deploy"/"Clear cache and deploy site" click, or an
 * automatic retry, rebuilds the exact same commit later, silently
 * advancing the wall-clock date with it) — this bit in production on
 * 2026.09.01, when a same-day rebuild of the 2026.08.31 commit made the
 * navbar show a date one day ahead of every page's own git-derived "Last
 * updated" text. Tying the version to the last commit's own date instead
 * makes it idempotent: rebuilding the same commit, whenever that happens,
 * always reproduces the same version number, and the number only moves
 * when new content is actually committed, i.e. actually published. In
 * `pnpm run dev` there's no commit-per-edit to key off, so this still
 * falls back to a live wall-clock read there, same as the original
 * design intended, gated on SvelteKit's `dev` flag (true only for the
 * dev server, false for both `pnpm run build` and `pnpm run preview`).
 */
function siteVersion(): string {
  if (dev) {
    const now = new Date()
    return formatCalVer(now.getFullYear(), now.getMonth() + 1, now.getDate())
  }

  try {
    const output = execFileSync('git', ['log', '-1', '--format=%cI'], {
      cwd: process.cwd(),
      encoding: 'utf-8',
    }).trim()
    const [year, month, day] = output.slice(0, 10).split('-').map(Number)
    return formatCalVer(year, month, day)
  }
  catch {
    // No git available at build time: falls back to the build machine's
    // wall clock rather than crashing the build, same fallback the
    // original wall-clock-only design always used.
    const now = new Date()
    return formatCalVer(now.getFullYear(), now.getMonth() + 1, now.getDate())
  }
}

/**
 * The date each +page.md was last committed, read from git history at
 * build time so it's always the true last-edit date rather than a
 * filesystem mtime, which a fresh CI checkout (Netlify's included) resets
 * to the checkout moment on every file, not the actual last edit.
 *
 * A root +layout.server.ts still fully prerenders under adapter-static:
 * this load function runs once per route during the build, and its
 * result is baked into the static HTML/data, no runtime server involved.
 * Returns null (rendering no "Last updated" line at all, see
 * PageLayout.svelte) if the file has no commit yet, or if git itself
 * isn't available, rather than showing a wrong or misleading date.
 */
export const load: LayoutServerLoad = ({ route }) => {
  const relPath = route.id === '/' ? 'src/routes/+page.md' : `src/routes${route.id}/+page.md`
  const version = siteVersion()

  try {
    const output = execFileSync('git', ['log', '-1', '--format=%cI', '--', relPath], {
      cwd: process.cwd(),
      encoding: 'utf-8',
    }).trim()

    // lastModifiedISO keeps the raw "YYYY-MM-DD" slice (not the full %cI
    // offset-bearing timestamp) so it's a plain schema.org-valid date, and
    // reads from the exact same git call as the human-formatted string
    // above, one source of truth for both the visible "Last updated" text
    // and any JSON-LD dateModified field.
    return {
      lastModified: output ? formatCommitDate(output) : null,
      lastModifiedISO: output ? output.slice(0, 10) : null,
      siteVersion: version,
    }
  }
  catch {
    return { lastModified: null, lastModifiedISO: null, siteVersion: version }
  }
}
