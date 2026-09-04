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
 * Today's date as CalVer (YYYY.MM.DD), e.g. "2026.08.28".
 *
 * Evaluated wherever it's called, so the same code gives two different
 * behaviors depending on when SvelteKit runs it: in `npm run dev` every
 * page is server-rendered live per request, so this shows the real
 * current date the whole time you're developing. In a prerendered
 * static build it runs exactly once, at build time, so the date gets
 * baked into the output as the deploy date, a real CalVer freshness
 * signal rather than a live clock.
 */
export function calVerToday(): string {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}.${month}.${day}`
}
