import type { NavLink, SidebarLink } from './config.js'

/**
 * Page header helpers (PageLayout.svelte): the small label above each page's
 * title and the page's accent color. Both are worked out from data that
 * already drives navigation (the navbar and the manual sidebar tree in
 * vite.config.ts) and from the page's own Pattern ID, so no page sets them
 * by hand.
 */

/** Title of the sidebar group (a header with no `to` of its own) that holds `pathname`, if any. */
function groupOf(items: SidebarLink[], pathname: string, group?: string): string | undefined {
  for (const item of items) {
    if (item.to === pathname)
      return group
    if (item.items) {
      const found = groupOf(item.items, pathname, item.to ? group : item.title)
      if (found !== undefined)
        return found
    }
  }
  return undefined
}

/** "Guide · Make It Happen", "About · Development", or just "Guide" for a page outside any named group. */
export function pageEyebrow(
  pathname: string,
  title: string | undefined,
  navbar: NavLink[],
  sidebar: Record<string, SidebarLink[]>,
): string | undefined {
  const section = navbar
    .filter(link => link.to !== '/' && pathname.startsWith(link.to))
    .sort((a, b) => b.to.length - a.to.length)[0]
  if (!section)
    return undefined
  const group = sidebar[section.to] ? groupOf(sidebar[section.to], pathname) : undefined
  const parts = [section.title]
  if (group && group !== section.title && group !== title)
    parts.push(group)
  return parts.join(' · ')
}

const PREFIX_ACCENTS: Record<string, string> = {
  NET: 'network',
  CDR: 'corridor',
  LOC: 'local',
  COL: 'collector',
  ART: 'arterial',
  FRE: 'freeway',
  INT: 'intersections',
  FAC: 'facility',
  ELM: 'element',
}

/**
 * The page's accent, read by the --cw-accent-* tokens in tokens.css.
 * Patterns use their classification's color; Retrofit Strategies borrow the
 * color of their scale's Pattern peer, as their index cards do (RFT-CDR is
 * corridor, RFT-INT intersections, RFT-NET network); About pages are
 * indigo; everything else is the site's teal.
 */
export function pageAccent(pathname: string, patternId: unknown): string {
  if (typeof patternId === 'string') {
    const parts = patternId.split('-')
    const key = parts[0] === 'RFT' ? parts[1] : parts[0]
    if (PREFIX_ACCENTS[key])
      return PREFIX_ACCENTS[key]
  }
  if (pathname.startsWith('/about/'))
    return 'about'
  return 'primary'
}
