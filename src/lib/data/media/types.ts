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
  /** Same dual-sourcing rule as sourceIcon. Omit to fall back to the shared placeholder graphic. */
  image?: string
  /** 1-2 sentences on how this item relates to CS content, not a neutral summary of the item itself. */
  blurb: string
  endorsementStatus: EndorsementStatus
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
