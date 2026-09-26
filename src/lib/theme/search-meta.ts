// Search filter values shared by PageLayout.svelte (which writes them into
// each page as Pagefind filter/meta markers) and SearchPanel.svelte (which
// labels them). Keep in sync with the custom Media records in
// scripts/build-search-index.mjs, which use the same 'Media' section value.

const SECTIONS: Record<string, string> = {
  '': 'Home',
  'guide': 'Guide',
  'patterns': 'Patterns',
  'retrofits': 'Retrofits',
  'media': 'Media',
  'references': 'Reference',
  'blog': 'Blog',
  'about': 'About',
}

/** Top-level section of a route, e.g. '/patterns/foo/' -> 'Patterns'. */
export function searchSectionOf(pathname: string): string {
  const first = pathname.split('/').filter(Boolean)[0] ?? ''
  return SECTIONS[first] ?? 'Other'
}

const PATTERN_CLASSES: Record<string, string> = {
  NET: 'Network',
  CDR: 'Corridor',
  LOC: 'Local',
  COL: 'Collector',
  ART: 'Arterial',
  FRE: 'Freeway',
  INT: 'Intersections and Crossings',
  FAC: 'Facility',
  ELM: 'Element',
}

/** Pattern classification from a Pattern ID prefix ('LOC-DEF-01' -> 'Local'); undefined for Retrofit Strategy IDs and everything else. */
export function patternClassOf(patternId: unknown): string | undefined {
  if (typeof patternId !== 'string')
    return undefined
  return PATTERN_CLASSES[patternId.split('-')[0]]
}

/** Display order and labels for the filter groups in the search UI. */
export const SEARCH_FILTER_GROUPS = [
  { key: 'section', label: 'Section' },
  { key: 'class', label: 'Pattern type' },
] as const
