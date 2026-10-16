import { getMediaItems } from '$lib/data/media/index.js'
import { getSitePages } from '$lib/server/content.js'

// "See all N in the Media Gallery" links from a page's Related Media row land
// here as /media/?for=<id>, where <id> is a Pattern ID, Retrofit Strategy ID
// or route path. This map lets the Gallery name that page and link back to it.
// Only pages some media item is tagged to are included. Built at prerender time.
export function load() {
  const tagged = new Set(getMediaItems().flatMap(item => item.relatedTo))
  const mediaPages: Record<string, { title: string, href: string }> = {}
  for (const p of getSitePages()) {
    const title = p.patternId ? `${p.title} (${p.patternId})` : p.title
    if (p.patternId && tagged.has(p.patternId))
      mediaPages[p.patternId] = { title, href: p.routePath }
    if (tagged.has(p.routePath))
      mediaPages[p.routePath] = { title, href: p.routePath }
  }
  return { mediaPages }
}
