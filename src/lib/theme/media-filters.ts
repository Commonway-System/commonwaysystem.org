import { writable } from 'svelte/store'
import type { MediaType } from '$lib/data/media/index.js'

// Shared filter state between MediaFilters.svelte (the control panel,
// rendered in GlobalLayout's toc-column slot on /media/, see isMedia
// there) and MediaGallery.svelte (the results grid, rendered in the normal
// content column). Same writable-store mechanism as layout.ts's own
// sidebarOpen/pageAnchors/isDark, not Svelte 5 runes, so both components
// can subscribe without one being a descendant of the other - GlobalLayout
// renders them as two separate grid-area siblings, not nested.
export const mediaSearch = writable('')
export const mediaSelectedTypes = writable<Set<MediaType>>(new Set())
export const mediaSelectedSources = writable<Set<string>>(new Set())
export const mediaSelectedPatterns = writable<Set<string>>(new Set())
export const mediaSelectedRetrofits = writable<Set<string>>(new Set())
export const mediaSelectedTopics = writable<Set<string>>(new Set())
export type MediaSort =
  | 'date-desc' | 'date-asc'
  | 'title-asc' | 'title-desc'
  | 'channel-asc' | 'channel-desc'
  | 'id-asc' | 'id-desc'
export const mediaSortBy = writable<MediaSort>('date-desc')
/** Set from /media/?for=<id> (a page's "See all in the Media Gallery" link): only items tagged to that page. */
export const mediaForPage = writable<string | null>(null)
