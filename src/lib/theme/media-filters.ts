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
export const mediaSelectedTopics = writable<Set<string>>(new Set())
export const mediaSortBy = writable<'date' | 'alpha'>('date')
