import { execFileSync } from 'node:child_process'
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
 * The date each +page.md was last committed, read from git history at
 * build time so it's always the true last-edit date rather than a
 * filesystem mtime, which a fresh CI checkout (Netlify's included) resets
 * to the checkout moment on every file, not the actual last edit. Same
 * "computed once at build time, baked into the static output" reasoning
 * as calVerToday() in src/lib/site.ts.
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
    }
  }
  catch {
    return { lastModified: null, lastModifiedISO: null }
  }
}
