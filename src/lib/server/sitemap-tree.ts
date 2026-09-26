import type { CommonwayThemeOptions, SidebarLink } from '$lib/theme/config.js'
import type { SiteMapLink, SiteMapSection } from '$lib/theme/sitemap-types.js'
import type { PageMeta } from './content.js'

/**
 * Builds the human site map from the two sources of truth the site already
 * has, so nothing here is hand-maintained:
 *   1. The manual sidebar tree in vite.config.ts gives each section its
 *      groups, order and link labels (the same names a reader sees in the nav).
 *   2. Every +page.md (getSitePages) is checked against it: any page the
 *      sidebar doesn't reach lands under "Other pages" (and is logged at
 *      build time), so a new page can't silently go missing from the map.
 * Blog posts have no sidebar, so they're listed newest first from their dates.
 * Media items are data records with no page of their own; the map links to
 * the Media Gallery, and search covers the individual items.
 */
export function buildSiteMap(options: CommonwayThemeOptions, pages: PageMeta[]): SiteMapSection[] {
  const byRoute = new Map(pages.map(p => [p.routePath, p]))
  const seen = new Set<string>()
  const sidebar = options.sidebar ?? {}

  const idOf = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  function toLink(item: SidebarLink): SiteMapLink | null {
    const children = (item.items ?? []).map(toLink).filter((l): l is SiteMapLink => l !== null)
    if (!item.to)
      return children.length ? { title: item.title, href: '', children } : null
    seen.add(item.to)
    const link: SiteMapLink = { title: item.title, href: item.to }
    const patternId = byRoute.get(item.to)?.patternId
    if (patternId)
      link.id = patternId
    if (children.length)
      link.children = children
    return link
  }

  const sections: SiteMapSection[] = []

  for (const nav of options.navbar ?? []) {
    if (/^[a-z][a-z0-9+.-]*:/i.test(nav.to))
      continue // external nav link, not a page of this site
    const section: SiteMapSection = { id: idOf(nav.title), title: nav.title, links: [], groups: [] }
    const tree = sidebar[nav.to]

    if (tree) {
      for (const item of tree) {
        if (item.items?.length || !item.to) {
          const links = (item.items ?? []).map(toLink).filter((l): l is SiteMapLink => l !== null)
          if (links.length)
            section.groups.push({ title: item.title, links })
        }
        else {
          const link = toLink(item)
          if (link)
            section.links.push(link)
        }
      }
    }
    else {
      const own = byRoute.get(nav.to)
      section.links.push({ title: own?.title ?? nav.title, href: nav.to })
      seen.add(nav.to)
      if (nav.to === '/blog/') {
        const posts = pages
          .filter(p => p.routePath.startsWith('/blog/') && p.routePath !== '/blog/')
          .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
        for (const post of posts) {
          section.links.push({ title: post.title, href: post.routePath })
          seen.add(post.routePath)
        }
      }
    }
    // A section's own landing page (the Pattern Index, say) isn't always a sidebar
    // entry; always list it, first, so every section starts with its front page.
    if (tree && !seen.has(nav.to)) {
      section.links.unshift({ title: byRoute.get(nav.to)?.title ?? nav.title, href: nav.to })
      seen.add(nav.to)
    }
    sections.push(section)
  }

  // Anything not reached above (utility pages like /search/ are deliberately not part of the map).
  const orphans = pages.filter(p => !seen.has(p.routePath) && !p.utility)
  if (orphans.length) {
    console.warn(
      `Site map: ${orphans.length} page(s) are not in the sidebar or navbar and are listed under "Other pages": ${orphans.map(p => p.routePath).join(', ')}`,
    )
    sections.push({
      id: 'other-pages',
      title: 'Other pages',
      links: orphans.map(p => ({ title: p.title, href: p.routePath })),
      groups: [],
    })
  }

  return sections
}
