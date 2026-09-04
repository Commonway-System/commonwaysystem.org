import type {
  AboutPage,
  Blog,
  BlogPosting,
  CollectionPage,
  DefinedTerm,
  ListItem,
  Organization,
  TechArticle,
  Thing,
  WebSite,
  WithContext,
} from 'schema-dts'
import { SITE_URL } from '$lib/site.js'
import type { SidebarLink } from '../config.js'
import { getBlogPosts } from '../blog.js'

// Plain WebSite, no @context: this is only ever nested inside another
// object's isPartOf below, never emitted as its own top-level JSON-LD block
// (that's buildWebSite() in organization.ts, GlobalLayout's sitewide
// singleton) — a nested object repeating @context is redundant, not just
// stylistically but per JSON-LD's own scoping rules.
const site: WebSite = { '@type': 'WebSite', name: 'Commonway System', url: SITE_URL }
const author: Organization = { '@type': 'Organization', name: 'Commonway System' }

interface PageSchemaParams {
  pathname: string
  fm: Record<string, any>
  /** Same git-derived date as the visible "Last updated" text, see +layout.server.ts. */
  dateModifiedISO: string | null
  sidebar: Record<string, SidebarLink[]>
}

/**
 * Flattens sidebar['/patterns/']'s grouped tree into a plain list, the same
 * data that renders the sidebar itself and (by hand, today) /patterns/'s
 * body content, so the CollectionPage's ItemList never drifts from what a
 * reader actually sees in the sidebar.
 */
function flattenPatternLinks(groups: SidebarLink[]): { title: string, to: string }[] {
  const out: { title: string, to: string }[] = []
  for (const group of groups) {
    if (group.to)
      out.push({ title: group.title, to: group.to })
    if (group.items)
      out.push(...flattenPatternLinks(group.items))
  }
  return out
}

function buildTechArticle(fm: Record<string, any>, dateModifiedISO: string | null, extra: Partial<TechArticle> = {}): WithContext<TechArticle> {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    'headline': fm.title,
    ...(fm.description ? { description: fm.description } : {}),
    'isPartOf': site,
    author,
    ...(fm.date ? { datePublished: fm.date } : {}),
    ...(dateModifiedISO ? { dateModified: dateModifiedISO } : {}),
    ...extra,
  }
}

function buildWebPage(fm: Record<string, any>, dateModifiedISO: string | null): WithContext<{ '@type': 'WebPage' } & Record<string, unknown>> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': fm.title,
    ...(fm.description ? { description: fm.description } : {}),
    ...(fm.date ? { datePublished: fm.date } : {}),
    ...(dateModifiedISO ? { dateModified: dateModifiedISO } : {}),
  } as WithContext<{ '@type': 'WebPage' } & Record<string, unknown>>
}

function buildAboutPage(fm: Record<string, any>): WithContext<AboutPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    'name': fm.title,
    ...(fm.description ? { description: fm.description } : {}),
    'about': { '@type': 'Organization', name: 'Commonway System' },
  }
}

/**
 * Picks the schema.org type(s) for the current page from its route, mirroring
 * the plan's per-template grouping: Guide + Reference overview use
 * TechArticle, the Pattern Index is a CollectionPage/ItemList, pattern pages
 * are enriched TechArticles, About splits into AboutPage vs. plain WebPage,
 * and Blog gets Blog/BlogPosting. Deliberately does NOT add a `citation`
 * array from each page's References list (most pattern pages have none yet,
 * see the plan) or force any non-standard evidence-tier vocabulary into the
 * output, schema.org has no equivalent for Legal/Evidence-based/
 * Precedent-based and inventing one would be invalid structured data.
 */
export function buildPageSchemas({ pathname, fm, dateModifiedISO, sidebar }: PageSchemaParams): WithContext<Thing>[] {
  if (pathname === '/')
    return []

  if (pathname === '/patterns/') {
    const links = flattenPatternLinks(sidebar['/patterns/'] ?? [])
    const itemListElement: ListItem[] = links.map((link, i) => ({
      '@type': 'ListItem',
      'position': i + 1,
      'name': link.title,
      'url': `${SITE_URL}${link.to}`,
    }))
    const collectionPage: WithContext<CollectionPage> = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': fm.title,
      ...(fm.description ? { description: fm.description } : {}),
      'mainEntity': {
        '@type': 'ItemList',
        itemListElement,
      },
    }
    return [collectionPage]
  }

  if (pathname.startsWith('/patterns/')) {
    const about: DefinedTerm = {
      '@type': 'DefinedTerm',
      name: fm.title,
      inDefinedTermSet: `${SITE_URL}/patterns/`,
    }
    return [buildTechArticle(fm, dateModifiedISO, {
      ...(fm.patternId ? { identifier: fm.patternId } : {}),
      about,
    })]
  }

  if (pathname.startsWith('/guide/') || pathname === '/references/')
    return [buildTechArticle(fm, dateModifiedISO)]

  if (pathname === '/blog/') {
    const posts = getBlogPosts()
    const blog: WithContext<Blog> = {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      'name': fm.title,
      ...(fm.description ? { description: fm.description } : {}),
      'blogPost': posts.map(post => ({
        '@type': 'BlogPosting',
        headline: post.title,
        url: `${SITE_URL}${post.routePath}`,
      })),
    }
    return [blog]
  }

  if (pathname.startsWith('/blog/')) {
    const blogPosting: WithContext<BlogPosting> = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': fm.title,
      ...(fm.description ? { description: fm.description } : {}),
      ...(fm.date ? { datePublished: fm.date } : {}),
      ...(dateModifiedISO ? { dateModified: dateModifiedISO } : {}),
      'author': author,
      'isPartOf': {
        '@type': 'Blog',
        name: 'Commonway System Blog',
        url: `${SITE_URL}/blog/`,
      },
    }
    return [blogPosting]
  }

  if (pathname === '/about/' || pathname === '/about/commonway-system/')
    return [buildAboutPage(fm)]

  if (pathname.startsWith('/about/'))
    return [buildWebPage(fm, dateModifiedISO)]

  return []
}
