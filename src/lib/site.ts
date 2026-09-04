/**
 * Canonical production origin, used to build absolute URLs for llms.txt
 * and anywhere else that needs one (not just the relative paths links
 * elsewhere in the theme use). Update this when the real domain is set.
 */
export const SITE_URL = 'https://commonwaysystem.org'

const SITE_HOSTNAME = new URL(SITE_URL).hostname

/**
 * True for any http(s) link resolving to a different hostname than
 * SITE_URL. Relative paths, hash links, and non-http(s) schemes (mailto:,
 * tel:) all resolve to false, either because they share SITE_URL's
 * hostname once resolved against it, or because they aren't real
 * navigations a "leaving the site" rule should apply to.
 */
export function isExternalHref(href: unknown): boolean {
  if (typeof href !== 'string' || href.length === 0)
    return false
  let url: URL
  try {
    url = new URL(href, SITE_URL)
  }
  catch {
    return false
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:')
    return false
  return url.hostname !== SITE_HOSTNAME
}

/** target/rel to spread onto an `<a>` when its href is external, `{}` otherwise. */
export function externalLinkAttrs(href: unknown): { target?: '_blank', rel?: string } {
  return isExternalHref(href) ? { target: '_blank', rel: 'nofollow noopener noreferrer' } : {}
}

/**
 * Formats a CalVer string (YYYY.MM.DD) from explicit calendar-date parts.
 * Pure formatting only, deliberately takes plain numbers rather than a
 * `Date` so callers control exactly which calendar date gets stamped
 * (a live wall-clock read in dev, a specific git commit's date in
 * production) rather than this function silently defaulting to "now".
 * See `src/routes/+layout.server.ts`'s `siteVersion()` for where this
 * is actually used, and why it isn't computed here.
 */
export function formatCalVer(year: number, month: number, day: number): string {
  return `${year}.${String(month).padStart(2, '0')}.${String(day).padStart(2, '0')}`
}
