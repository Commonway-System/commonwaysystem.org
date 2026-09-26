import { getSitePages } from '$lib/server/content.js'

// The index cards find each page's image here (route -> `image:` frontmatter)
// instead of a hand-typed `image=` prop on every card, so adding an image to
// a page's frontmatter is the only step. Built at prerender time.
export function load() {
  return {
    pageImages: Object.fromEntries(getSitePages().filter(p => p.image).map(p => [p.routePath, p.image])),
  }
}
