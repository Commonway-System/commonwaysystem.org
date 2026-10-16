import type { EndorsementStatus, MediaItem } from './types.js'

// One file per entry (src/lib/data/media/entries/*.ts), globbed at build
// time - same import.meta.glob mechanism $lib/server/content.ts and
// $lib/theme/blog.ts already use for +page.md frontmatter, applied to plain
// data modules instead. Not under $lib/server/: this is imported by
// client-rendered components (MediaGallery, RelatedMedia), and $lib/server/*
// is off-limits to client code even on a fully static build (see blog.ts's
// own note on the same constraint).
const modules = import.meta.glob('./entries/*.ts', { eager: true }) as Record<string, { default: MediaItem }>

const allItems: MediaItem[] = Object.values(modules).map(mod => mod.default)

/** Every media item, newest dateAdded first. */
export function getMediaItems(): MediaItem[] {
  return [...allItems].sort((a, b) => b.dateAdded.localeCompare(a.dateAdded))
}

/**
 * Media items tagged to a given page: a Pattern ID, a Retrofit Strategy ID,
 * or a trailing-slashed route path (Guide/About pages, which have no ID of
 * their own - see relatedTo's own doc comment in types.ts).
 */
export function getMediaItemsFor(pageId: string): MediaItem[] {
  // Aligned items first, then Context only, then Counterexample (using the
  // per-page override when an item has one), so the strongest supporting
  // material fills the first slots of the Related Media row. The sort is
  // stable, so items keep their ID order within each status.
  return allItems
    .filter(item => item.relatedTo.includes(pageId))
    .sort((a, b) => statusRank[endorsementFor(a, pageId)] - statusRank[endorsementFor(b, pageId)])
}

const statusRank: Record<EndorsementStatus, number> = { 'aligned': 0, 'context-only': 1, 'counterexample': 2 }

/** An item's endorsement on a given page: the per-page override if it has one, else its base status. */
export function endorsementFor(item: MediaItem, pageId?: string): EndorsementStatus {
  return (pageId && item.endorsementOverrides?.[pageId]) || item.endorsementStatus
}

export { isExternalAsset } from './types.js'
export type { EndorsementStatus, MediaItem, MediaTag, MediaType } from './types.js'
