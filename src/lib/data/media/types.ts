export type MediaType = 'video' | 'podcast' | 'article'

export type EndorsementStatus = 'aligned' | 'context-only' | 'counterexample'

// Locked vocabulary (CLAUDE.md / feature ticket): do not add values without
// confirming with Kevin first.
export type MediaTag = 'Case Study' | 'Explainer' | 'Interview' | 'News/Advocacy' | 'Historical'

export interface MediaItem {
  /** Permanent, e.g. "MED-001". Never renumbered or reused. */
  id: string
  type: MediaType
  title: string
  /** External destination. */
  url: string
  /** Channel, publication, or show name. */
  sourceName: string
  /**
   * Either a full external URL (hotlinked) or a local static path starting
   * with "/". Optional: omit when no channel/show icon is available (falls
   * back to a generic Lucide icon for the item's type, see MediaCard).
   */
  sourceIcon?: string
  /**
   * Self-hosted preview image, e.g. "/media-assets/med-001.jpg" (a ~640px
   * copy in static/media-assets/; run `pnpm run thumbs` after adding one).
   * Deliberately NOT hotlinked from YouTube or anywhere else: search results
   * show it on every page, and loading it from a third party would break the
   * site's "search sends nothing anywhere" promise. Omit to fall back to the
   * shared placeholder graphic.
   */
  image?: string
  /** 1-2 sentences on how this item relates to CS content, not a neutral summary of the item itself. */
  blurb: string
  endorsementStatus: EndorsementStatus
  /**
   * Optional per-page override of endorsementStatus, keyed by the same ids as
   * relatedTo. Use when one item relates differently to different pages
   * (e.g. Aligned with a Retrofit Strategy, Context-only on a Pattern whose
   * typical case the item doesn't describe). The Media Gallery always shows
   * the base endorsementStatus.
   */
  endorsementOverrides?: Record<string, EndorsementStatus>
  /** Reuses the existing Functional Classification / Scale taxonomy, e.g. "Local", "Collector". */
  patternTaxonomyTags: string[]
  mediaTags: MediaTag[]
  /**
   * Pattern IDs, Retrofit Strategy IDs, and/or trailing-slashed route paths
   * (e.g. "/guide/legal-planning-mechanisms/") this item is tagged against.
   * Route paths cover Guide/About pages, which have no ID of their own -
   * see the Related Media placement note in CLAUDE.md.
   */
  relatedTo: string[]
  /** ISO 8601 (YYYY-MM-DD). */
  dateAdded: string
}

/** "http..." = hotlink, "/..." = local static asset. Same resolution rule for sourceIcon and image. */
export function isExternalAsset(value: string): boolean {
  return value.startsWith('http')
}
