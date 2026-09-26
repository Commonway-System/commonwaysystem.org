// Shape of the human site map (/about/sitemap/), built at prerender time by
// src/lib/server/sitemap-tree.ts and rendered by SiteMap.svelte. Kept apart
// from the builder because client components can't import from $lib/server.

export interface SiteMapLink {
  title: string
  href: string
  /** Pattern ID or Retrofit Strategy ID, shown beside the link. */
  id?: string
  children?: SiteMapLink[]
}

export interface SiteMapGroup {
  title: string
  links: SiteMapLink[]
}

export interface SiteMapSection {
  /** Anchor id for the section's h2 (the "On this page" outline lists these). */
  id: string
  title: string
  links: SiteMapLink[]
  groups: SiteMapGroup[]
}
