import type { BreadcrumbList, ListItem, WithContext } from 'schema-dts'
import { SITE_URL } from '$lib/site.js'
import type { NavLink, SidebarLink } from '../config.js'

interface Crumb { name: string, url: string }

/**
 * Walks a sidebar[...] array looking for `pathname`, building the chain of
 * navigable ancestors along the way. A group header with no `to` of its own
 * (e.g. "Local Streets", "Foundations", "Development") is real in the
 * sidebar tree but isn't a real page anyone can land on, unlike what the
 * classification-landing-page example in the original plan draft assumed
 * (see CLAUDE.md's "Known gaps": those landing pages don't exist yet). A
 * ListItem pointing at a URL that 404s would be worse structured data than
 * a shorter, accurate chain, so group headers without a `to` are skipped
 * entirely rather than emitted with a fabricated or missing url.
 */
function findSidebarPath(items: SidebarLink[], pathname: string, trail: Crumb[] = []): Crumb[] | null {
  for (const item of items) {
    const nextTrail = item.to ? [...trail, { name: item.title, url: `${SITE_URL}${item.to}` }] : trail
    if (item.to === pathname)
      return nextTrail
    if (item.items) {
      const found = findSidebarPath(item.items, pathname, nextTrail)
      if (found)
        return found
    }
  }
  return null
}

/**
 * BreadcrumbList for every page except the homepage (see PageLayout.svelte,
 * which skips calling this for `/`). Built entirely from data already
 * driving real navigation, `options.navbar` and `options.sidebar` (same
 * virtual:commonway/options module PageLayout already imports), plus the
 * current page's own title for a leaf with no sidebar entry (blog posts,
 * section overview pages like /references/). No breadcrumb is hand-written
 * per page.
 */
export function buildBreadcrumbs(
  pathname: string,
  pageTitle: string,
  navbar: NavLink[],
  sidebar: Record<string, SidebarLink[]>,
): WithContext<BreadcrumbList> | null {
  if (pathname === '/')
    return null

  const section = navbar
    .filter(link => link.to !== '/' && pathname.startsWith(link.to))
    .sort((a, b) => b.to.length - a.to.length)[0]

  const crumbs: Crumb[] = [{ name: 'Home', url: `${SITE_URL}/` }]

  if (!section) {
    // Shouldn't happen for any real route today, but degrade to Home > page
    // rather than throwing if a future page sits outside every nav section.
    crumbs.push({ name: pageTitle, url: `${SITE_URL}${pathname}` })
  }
  else {
    crumbs.push({ name: section.title, url: `${SITE_URL}${section.to}` })

    const sectionSidebar = sidebar[section.to]
    const found = sectionSidebar ? findSidebarPath(sectionSidebar, pathname) : null
    const extra = (found ?? []).filter(crumb => crumb.url !== `${SITE_URL}${section.to}`)

    if (extra.length > 0)
      crumbs.push(...extra)
    else if (pathname !== section.to)
      crumbs.push({ name: pageTitle, url: `${SITE_URL}${pathname}` })
  }

  const itemListElement: ListItem[] = crumbs.map((crumb, i) => ({
    '@type': 'ListItem',
    'position': i + 1,
    'name': crumb.name,
    'item': crumb.url,
  }))

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  }
}
