import options from 'virtual:commonway/options'
import { getSitePages } from '$lib/server/content.js'
import { buildSiteMap } from '$lib/server/sitemap-tree.js'

// Runs once at build time (the whole site prerenders, see +layout.ts), so the
// site map is baked into static HTML and updates itself on every build.
export function load() {
  return { siteMap: buildSiteMap(options, getSitePages()) }
}
