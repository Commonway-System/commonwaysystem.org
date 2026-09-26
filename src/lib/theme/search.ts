import { writable } from 'svelte/store'
import { thumbUrl } from '$lib/thumbs.js'

// Client side of the site search. The index itself is built after the site
// build by scripts/build-search-index.mjs (Pagefind) into /pagefind/, and is
// loaded lazily, only the first time someone actually searches, so no page
// pays for it. Everything runs in the browser: no query ever leaves it.

/** Whether the search dialog is open (SearchDialog.svelte listens; the navbar button, mobile drawer and Cmd/Ctrl+K set it). */
export const searchOpen = writable(false)

export function openSearch() {
  searchOpen.set(true)
}

export interface SearchHit {
  url: string
  title: string
  /** HTML from Pagefind with <mark> around matches; built from our own indexed content only. */
  excerpt: string
  section: string
  /** Pattern ID, or "Video · Source" for media items. */
  detail: string
  /** Up to 3 headings on the page that also match. */
  headings: { title: string, url: string }[]
  /** Only for content types that have images (Patterns, Retrofits, Blog, Media); undefined for the rest. */
  thumb?: SearchThumb
}

export interface SearchThumb {
  /** The 160px copy (or the placeholder). */
  src: string
  /** Full-size original, the fallback if the small copy is missing. */
  original?: string
  /** Pattern/Retrofit line art is white-on-transparent-ish, so it gets its classification color behind it (same idea as the index cards). Undefined for photos. */
  tone?: string
}

export interface SearchFacetValue {
  value: string
  count: number
}

export interface SearchOutcome {
  hits: SearchHit[]
  total: number
  /** filter key -> values with the number of results each would give for this query. */
  facets: Record<string, SearchFacetValue[]>
}

/* eslint-disable @typescript-eslint/no-explicit-any */
let loading: Promise<any> | null = null

/** Loads and initializes Pagefind once. Rejects (and can be retried) if /pagefind/ isn't there, as under `pnpm run dev` before any build. */
export function loadPagefind(): Promise<any> {
  loading ??= (async () => {
    // A variable URL keeps Vite from trying to bundle the generated file.
    const url = '/pagefind/pagefind.js'
    const pf = await import(/* @vite-ignore */ url)
    await pf.init()
    // Loading the filter index up front is what makes facet counts correct on the first query.
    await pf.filters()
    return pf
  })().catch((error) => {
    loading = null
    throw error
  })
  return loading
}

export async function searchSite(
  query: string,
  selected: Record<string, string[]>,
  limit: number,
): Promise<SearchOutcome> {
  const pf = await loadPagefind()
  const filters: Record<string, { any: string[] }> = {}
  for (const [key, values] of Object.entries(selected)) {
    if (values.length)
      filters[key] = { any: values }
  }
  const result = await pf.search(query, { filters })
  const data = await Promise.all(result.results.slice(0, limit).map((r: any) => r.data()))

  const hits: SearchHit[] = data.map((d: any) => ({
    url: d.url,
    title: d.meta?.title ?? d.url,
    excerpt: d.excerpt ?? '',
    section: d.meta?.section ?? d.filters?.section?.[0] ?? '',
    detail: d.meta?.detail ?? '',
    thumb: thumbFor(d),
    headings: (d.sub_results ?? [])
      .filter((s: any) => typeof s.url === 'string' && s.url.includes('#'))
      .slice(0, 3)
      .map((s: any) => ({ title: s.title, url: s.url })),
  }))

  const facets: Record<string, SearchFacetValue[]> = {}
  for (const [key, counts] of Object.entries<Record<string, number>>(result.totalFilters ?? {})) {
    facets[key] = Object.entries(counts).map(([value, count]) => ({ value, count }))
  }
  return { hits, total: result.results.length, facets }
}

const CLASS_TONES: Record<string, string> = {
  'Network': 'network',
  'Corridor': 'corridor',
  'Local': 'local',
  'Collector': 'collector',
  'Arterial': 'arterial',
  'Freeway': 'freeway',
  'Intersections and Crossings': 'intersections',
  'Facility': 'facility',
  'Element': 'element',
}

// A Retrofit Strategy's card borrows the color of its functional peer among the Patterns.
const RETROFIT_TONES: Record<string, string> = { corridor: 'corridor', intersection: 'intersections', network: 'network' }

/** Which results get a thumbnail, and which image: the page's own (frontmatter `image:`), or the type's placeholder for the four content types that always show one. */
function thumbFor(d: any): SearchThumb | undefined {
  const section: string = d.meta?.section ?? d.filters?.section?.[0] ?? ''
  // `thumb`, not Pagefind's own auto-detected `image` (see PageLayout.svelte).
  const image: string | undefined = d.meta?.thumb
  if (section === 'Media')
    return image ? { src: thumbUrl(image, 160), original: image } : { src: '/media-assets/media-placeholder.svg' }
  if (section === 'Patterns' || section === 'Retrofits') {
    const tone = section === 'Patterns'
      ? CLASS_TONES[d.filters?.class?.[0] ?? '']
      : RETROFIT_TONES[String(d.url).split('/')[2] ?? '']
    return image
      ? { src: thumbUrl(image, 160), original: image, tone }
      : { src: '/patterns/pattern-placeholder.svg', tone }
  }
  if (section === 'Blog')
    return image ? { src: thumbUrl(image, 160), original: image } : { src: '/media-assets/media-placeholder.svg' }
  // Any other page (Guide, About, Reference, Home) can opt in with an `image:` in its frontmatter;
  // without one it gets no thumbnail at all, not a placeholder (these pages don't have an image concept).
  return image ? { src: thumbUrl(image, 160), original: image } : undefined
}
