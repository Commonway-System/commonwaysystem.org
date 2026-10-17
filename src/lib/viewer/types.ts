// Data model for the Pattern viewer (PatternViewer.svelte and friends).
//
// One data file per pattern or Retrofit Strategy lives in
// src/lib/data/street-configs/<id>.ts and default-exports a ViewerData. The
// page imports it and hands it to <PatternViewer data={...} />, so the data
// is typed and checked by `pnpm run check`, and another page (Stroad showing
// Boulevard, a Retrofit Strategy's before and after) can import the same file
// instead of copying it.
//
// A configuration is drawn from data, never from hand-made artwork. Four layers:
//   1. Segments: strips edge to edge across the street (Streetmix-like:
//      type, width in feet, variant), each able to hold items (trees AND
//      street lights in one furnishing strip).
//   2. Features along the street: things at a spot (speed hump, PHB,
//      crosswalk), placed by distance along the street.
//   3. Shape overrides: features that change segment widths over a stretch
//      (curb extension, pinch point, turn pocket).
//   4. Intersections: legs (each a segment list) plus a junction type.
// Lengths are always stored in feet; the reader's ft/m choice is display only.

/** Pattern IDs of the Element patterns, e.g. "ELM-PBL-37". Not checked against the routes here. */
export type ElementId = string

// ---------------------------------------------------------------------------
// The ladder

/**
 * Rungs, always shown in this order, lowest first. A view lists only the
 * rungs it has. The reader lands on the highest one present (the Commonway
 * System answer) and steps down to see what the minimum would have been.
 */
export const RUNGS = ['baseline', 'nacto', 'complete-streets', 'commonway'] as const
export type RungId = (typeof RUNGS)[number]

/** Configurations shown for comparison, outside the ladder. */
export const REFERENCES = ['dutch'] as const
export type ReferenceId = (typeof REFERENCES)[number]

/** A Retrofit Strategy's two states: the source pattern and the target pattern. */
export const RETROFIT_STATES = ['before', 'after'] as const
export type RetrofitStateId = (typeof RETROFIT_STATES)[number]

export type ConfigId = RungId | ReferenceId | RetrofitStateId

/** Default labels; a configuration can override its own (Stroad's "build a Boulevard instead"). */
export const CONFIG_LABELS: Record<ConfigId, string> = {
  'baseline': 'Federal / State minimum',
  'nacto': 'NACTO enhancement',
  'complete-streets': 'Complete Streets',
  'commonway': 'Commonway System',
  'dutch': 'Dutch practice',
  'before': 'Before',
  'after': 'After',
}

/** Short labels for the ladder steps at narrow widths. */
export const CONFIG_SHORT_LABELS: Record<ConfigId, string> = {
  'baseline': 'Minimum',
  'nacto': 'NACTO',
  'complete-streets': 'Complete Streets',
  'commonway': 'Commonway',
  'dutch': 'Dutch',
  'before': 'Before',
  'after': 'After',
}

// ---------------------------------------------------------------------------
// Layer 1: segments and the items inside them

export type SegmentType =
  | 'sidewalk'
  | 'furnishing'
  | 'curb'
  | 'parking'
  | 'bike-lane'
  | 'protected-bike-lane'
  | 'buffer'
  | 'travel-lane'
  | 'turn-lane'
  | 'transit-lane'
  | 'median'
  | 'shoulder'

/** Which way traffic in a segment moves, relative to the drawing (left to right across the street). */
export type Direction = 'inbound' | 'outbound' | 'both'

export type ItemType =
  | 'tree'
  | 'street-light'
  | 'bench'
  | 'bike-rack'
  | 'bollard'
  | 'planter'
  | 'transit-shelter'
  | 'sign'
  | 'barrier'
  | 'curb-stop'

export interface SegmentItem {
  type: ItemType
  /** Position across the segment, feet from its left edge. Omit to center it. */
  offset?: number
  /** Repeat every this many feet along the street (trees every 30 ft). Omit for a single item. */
  spacing?: number
  /** Feet along the street of the first one (default 0). Lets lights and trees alternate in one strip. */
  start?: number
  elementId?: ElementId
  label?: string
}

export interface Segment {
  /** Stable within a pattern's data file: the "what changed" comparison matches segments by id. */
  id: string
  type: SegmentType
  /** Feet. */
  width: number
  /** Free-form refinement of the type ("painted", "raised", "flex-post"). */
  variant?: string
  direction?: Direction
  items?: SegmentItem[]
  /** Overrides the type's default label in the drawing. */
  label?: string
  elementId?: ElementId
  /** Citation numbers from the page's own References list. */
  cite?: number[]
}

// ---------------------------------------------------------------------------
// Layer 2: features along the street

export type FeatureType =
  | 'speed-hump'
  | 'speed-table'
  | 'speed-cushion'
  | 'raised-crosswalk'
  | 'crosswalk'
  | 'phb'
  | 'rrfb'
  | 'signal'
  | 'stop-sign'
  | 'modal-filter'
  | 'bus-stop'
  | 'refuge-island'
  | 'driveway'

export interface StreetFeature {
  id: string
  type: FeatureType
  /** Feet along the street. */
  at: number
  /** Feet along the street the feature occupies (a speed table, a bus stop). */
  length?: number
  /** Segment ids the feature spans; omit for the whole width. */
  across?: string[]
  elementId?: ElementId
  label?: string
  cite?: number[]
}

// ---------------------------------------------------------------------------
// Layer 3: features that change the street's shape over a stretch

export type OverrideType = 'curb-extension' | 'pinch-point' | 'chicane' | 'turn-pocket' | 'median-break' | 'median-start'

export interface ShapeOverride {
  id: string
  type: OverrideType
  /** Feet along the street where the change is complete. */
  from: number
  to: number
  /** Feet of transition before `from` and after `to` (default 0, a hard edge). */
  taper?: number
  /** New widths by segment id over the stretch; 0 removes a segment there. */
  widths: Record<string, number>
  elementId?: ElementId
  label?: string
  cite?: number[]
}

/** A named spot where the cross-section can be cut ("Midblock", "At the curb extension"). */
export interface CutSection {
  id: string
  label: string
  /** Feet along the street. */
  at: number
}

export interface StreetConfig {
  kind: 'street'
  segments: Segment[]
  features?: StreetFeature[]
  overrides?: ShapeOverride[]
  /** Length shown in plan views, feet (renderer default if omitted). */
  length?: number
  /** Cut points offered by the cross-section view; the first is the default. */
  sections?: CutSection[]
}

// ---------------------------------------------------------------------------
// Layer 4: intersections

export type JunctionType =
  | 'uncontrolled'
  | 'yield'
  | 'two-way-stop'
  | 'all-way-stop'
  | 'signal'
  | 'roundabout'
  | 'mini-roundabout'
  | 'protected-intersection'
  | 'raised-junction'

export interface IntersectionLeg {
  id: string
  /** Compass bearing of the leg leaving the junction, degrees (0 = north/up). */
  bearing: number
  street: StreetConfig
  label?: string
}

export type JunctionDetailType = 'corner-radius' | 'crosswalk' | 'refuge-island' | 'signal-head' | 'protected-corner' | 'stop-line' | 'bike-box'

export interface JunctionDetail {
  type: JunctionDetailType
  /** Which leg (or the corner after it, clockwise) it belongs to; omit for all. */
  leg?: string
  /** A size where it has one (corner radius in feet). */
  value?: number
  elementId?: ElementId
  label?: string
  cite?: number[]
}

export interface IntersectionConfig {
  kind: 'intersection'
  junction: JunctionType
  legs: IntersectionLeg[]
  details?: JunctionDetail[]
}

export type Configuration = StreetConfig | IntersectionConfig

// ---------------------------------------------------------------------------
// Facets: other dimensions (density tier, time of day)

export interface Facet {
  id: string
  label: string
  options: { id: string, label: string }[]
  /** Option id; the first option if omitted. */
  default?: string
}

// ---------------------------------------------------------------------------
// Configuration entries, views, and the whole data file

export interface ConfigEntry {
  id: ConfigId
  /**
   * The text alternative for this configuration, shown under the drawing and
   * announced when it changes. Write it so it stands on its own: it is the
   * only form a screen reader, the text-only page and the markdown copy get.
   */
  description: string
  config?: Configuration
  /** Overrides CONFIG_LABELS[id]. */
  label?: string
  cite?: number[]
  /** A related page to send the reader to (Stroad's top rung links to Boulevard). */
  link?: { href: string, label: string }
  /**
   * Facet values this entry applies to. Omitted facets match any value, so
   * an entry with no `when` is the one used whatever the reader picks.
   */
  when?: Record<string, string>
}

export type ViewKind = 'cross-section' | 'plan' | 'perspective' | 'intersection-plan' | 'image'

export interface ViewSpec {
  /** Used in the URL (?view=plan), so keep it short and stable. */
  id: string
  /** The tab label. */
  label: string
  kind: ViewKind
  /** Offer compare mode on this view (default true when there are two or more configurations). */
  compare?: boolean
  /** Still image shown where the live view can't run (no JS, no WebGL, print). Needed for canvas/3D views. */
  poster?: string
  /** For kind 'image'. */
  src?: string
  alt?: string
  /** For kind 'image', which has no configurations: the text shown under it. */
  description?: string
}

export interface ViewerData {
  /** The Pattern ID or Retrofit Strategy ID this file belongs to. */
  id: string
  views: ViewSpec[]
  configs: ConfigEntry[]
  facets?: Facet[]
  /** Which configuration a reader lands on; the highest rung (or "after") if omitted. */
  defaultConfig?: ConfigId
  /** The partner offered first in compare mode; the lowest rung (or "before") if omitted. */
  defaultCompare?: ConfigId
}

// ---------------------------------------------------------------------------
// What every view renderer receives (SVG and canvas/3D alike)

export type Units = 'ft' | 'm'

export interface Annotations {
  labels: boolean
  dimensions: boolean
  /** Highlight what differs from `changedFrom` (amber, plus numbered callouts). */
  changes: boolean
}

/** One numbered "what changed" callout (built by diffStreets in geometry.ts). */
export interface Change {
  /** Callout number shown in the drawing and in the list. */
  n: number
  kind: 'added' | 'changed' | 'removed'
  text: string
  /** Segment ids the callout points at (empty for removals and along-street features). */
  segments: string[]
  /** Feature or override ids, for the top-down view. */
  marks: string[]
}

export interface RendererProps {
  view: ViewSpec
  entry: ConfigEntry
  /** The configuration one rung down, for the "what changed" highlight; undefined on the lowest rung. */
  changedFrom?: ConfigEntry
  units: Units
  annotations: Annotations
  expanded: boolean
  /** Cut point id (a CutSection id) for cross-sections; top-down views mark every cut. */
  cut?: string
  /** What differs from `changedFrom`, numbered; empty when highlighting is off. */
  changes: Change[]
  /** id of the element holding this configuration's text description (for aria-describedby). */
  descriptionId: string
  /** Accessible name for the drawing. */
  label: string
}
