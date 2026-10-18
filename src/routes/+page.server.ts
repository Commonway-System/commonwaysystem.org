import { getMediaItems } from '$lib/data/media/index.js'
import { releases } from '$lib/data/releases.js'
import { getSitePages } from '$lib/server/content.js'

// Everything the homepage shows that comes from elsewhere in the repo:
// counted or looked up at prerender time so the numbers can't go stale.
// The homepage's own copy (headings, goals, facts, positions, featured
// patterns) lives in src/routes/+page.md; only the featured media IDs live
// here, because resolving them needs the whole media collection, which
// shouldn't be shipped to the browser just for three cards.

/** Media Gallery items featured on the homepage, in order. */
const FEATURED_MEDIA = ['MED-008', 'MED-001', 'MED-048']

/** How many changelog lines "What's new" shows. */
const NEWS_COUNT = 3

const pageSources = import.meta.glob('/src/routes/**/+page.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

// One folder per Scale under patterns/ (patterns/<scale folder>/<slug>/).
const SCALE_FOLDERS: Record<string, string> = {
  'network': 'network',
  'corridors': 'corridor',
  'local-streets': 'local',
  'collectors': 'collector',
  'arterials': 'arterial',
  'freeways': 'freeway',
  'intersections': 'intersections',
  'facilities': 'facility',
  'elements': 'element',
}

export function load() {
  const scaleCounts: Record<string, number> = {}
  let citationCount = 0
  for (const [path, raw] of Object.entries(pageSources)) {
    citationCount += raw.match(/<span id="ref-\d+"/g)?.length ?? 0
    const m = path.match(/^\/src\/routes\/patterns\/([^/]+)\/[^/]+\/\+page\.md$/)
    const scale = m && SCALE_FOLDERS[m[1]]
    if (scale)
      scaleCounts[scale] = (scaleCounts[scale] ?? 0) + 1
  }

  const media = getMediaItems()
  const byId = new Map(media.map(item => [item.id, item]))
  const homeMedia = FEATURED_MEDIA.map(id => byId.get(id)).filter(item => item !== undefined)

  const latestChanges = releases
    .flatMap(r => r.changes.filter(c => c.type !== 'note').map(c => ({ date: r.date, type: c.type, summary: c.summary })))
    .slice(0, NEWS_COUNT)

  return {
    // PatternIndexCard looks its illustration up here by href, as on /patterns/.
    pageImages: Object.fromEntries(getSitePages().filter(p => p.image).map(p => [p.routePath, p.image])),
    home: {
      scaleCounts,
      citationCount,
      mediaCount: media.length,
      media: homeMedia,
      latestChanges,
    },
  }
}
