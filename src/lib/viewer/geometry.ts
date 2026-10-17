// Shared by the street renderers (cross-section, top down) and the parent
// viewer: segment labels, widths along the street (shape overrides), and the
// "what changed" comparison. Pure functions, no DOM, so they run during
// prerendering too.
import { formatLength } from './state.js'
import type { Change, ConfigEntry, FeatureType, ItemType, Marking, Segment, SegmentType, ShapeOverride, StreetConfig, Surface, Units } from './types.js'

export const SEGMENT_LABELS: Record<SegmentType, string> = {
  'sidewalk': 'Sidewalk',
  'furnishing': 'Furnishing strip',
  'curb': 'Curb',
  'parking': 'Parking lane',
  'bike-lane': 'Bike lane',
  'protected-bike-lane': 'Protected bike lane',
  'buffer': 'Buffer',
  'travel-lane': 'Travel lane',
  'turn-lane': 'Turn lane',
  'transit-lane': 'Transit lane',
  'median': 'Median',
  'shoulder': 'Shoulder',
}

export const ITEM_LABELS: Record<ItemType, string> = {
  'tree': 'Street trees',
  'street-light': 'Street lights',
  'bench': 'Benches',
  'bike-rack': 'Bike racks',
  'bollard': 'Bollards',
  'planter': 'Planters',
  'transit-shelter': 'Transit shelter',
  'sign': 'Signs',
  'barrier': 'Barrier',
  'curb-stop': 'Curb stops',
}

export const FEATURE_LABELS: Record<FeatureType, string> = {
  'speed-hump': 'Speed hump',
  'speed-table': 'Speed table',
  'speed-cushion': 'Speed cushion',
  'raised-crosswalk': 'Raised crosswalk',
  'crosswalk': 'Crosswalk',
  'phb': 'Pedestrian Hybrid Beacon',
  'rrfb': 'Rectangular Rapid Flashing Beacon',
  'signal': 'Traffic signal',
  'stop-sign': 'Stop sign',
  'modal-filter': 'Modal filter',
  'bus-stop': 'Bus stop',
  'refuge-island': 'Refuge island',
  'driveway': 'Driveway',
}

export const OVERRIDE_LABELS: Record<ShapeOverride['type'], string> = {
  'curb-extension': 'Curb extension',
  'pinch-point': 'Pinch point',
  'chicane': 'Chicane',
  'turn-pocket': 'Turn pocket',
  'median-break': 'Median break',
  'median-start': 'Median',
}

/** A strip's surface: its own `surface`, or the default for its type. */
export function surfaceOf(s: Segment): Surface {
  if (s.surface)
    return s.surface
  if (s.type === 'bike-lane' || s.type === 'protected-bike-lane')
    return 'green'
  if (s.type === 'transit-lane')
    return 'red'
  if (s.type === 'sidewalk' || s.type === 'curb')
    return 'concrete'
  return 'asphalt'
}

/** A strip's pavement marking: its own `marking`, or the default for its type. */
export function markingOf(s: Segment): Marking {
  if (s.marking)
    return s.marking
  return s.type === 'bike-lane' || s.type === 'protected-bike-lane' ? 'bike-symbol' : 'none'
}

const SURFACE_WORDS: Record<Surface, string> = { asphalt: 'plain asphalt', green: 'green paint', red: 'red paint', concrete: 'concrete', pavers: 'pavers' }
const MARKING_WORDS: Record<Marking, string> = { 'bike-symbol': 'bike lane markings', 'sharrow': 'shared lane markings', 'none': 'no markings' }

export function segmentLabel(s: Segment): string {
  return s.label ?? SEGMENT_LABELS[s.type]
}

/** Segments raised to sidewalk level (drawn above the road surface). */
export function isRaised(s: Segment): boolean {
  return s.type === 'sidewalk' || s.type === 'furnishing' || s.type === 'median' || s.variant === 'raised' || s.variant === 'cycle-track'
}

export function totalWidth(config: StreetConfig, at?: number): number {
  return widthsAt(config, at).reduce((a, b) => a + b, 0)
}

/**
 * Each segment's width at a distance along the street, with shape overrides
 * applied (a curb extension widening the sidewalk and removing parking
 * there). Tapers interpolate linearly.
 */
export function widthsAt(config: StreetConfig, at?: number): number[] {
  return config.segments.map((seg) => {
    let width = seg.width
    if (at === undefined)
      return width
    for (const o of config.overrides ?? []) {
      const target = o.widths[seg.id]
      if (target === undefined)
        continue
      const taper = o.taper ?? 0
      let t = 0
      if (at >= o.from && at <= o.to)
        t = 1
      else if (taper > 0 && at < o.from && at > o.from - taper)
        t = (at - (o.from - taper)) / taper
      else if (taper > 0 && at > o.to && at < o.to + taper)
        t = (o.to + taper - at) / taper
      if (t > 0)
        width = width + (target - width) * t
    }
    return width
  })
}

/** Distances along the street where any segment's width changes slope: enough points to draw every edge as a polyline. */
export function breakpoints(config: StreetConfig, length: number): number[] {
  const xs = new Set<number>([0, length])
  for (const o of config.overrides ?? []) {
    const taper = o.taper ?? 0
    for (const x of [o.from - taper, o.from, o.to, o.to + taper]) {
      if (x > 0 && x < length)
        xs.add(x)
    }
  }
  return [...xs].sort((a, b) => a - b)
}

// ---------------------------------------------------------------------------
// What changed between two configurations

function itemTypes(s?: Segment) {
  return [...new Set((s?.items ?? []).map(i => i.type))]
}

/**
 * Compares two street configurations by segment, feature and override id.
 * Identical descriptions (both travel lanes going from 12 to 10 ft) share one
 * number, so the drawing and the list stay short.
 */
export function diffStreets(current: StreetConfig, previous: StreetConfig, units: Units): Change[] {
  const raw: { kind: Change['kind'], text: string, segment?: string, mark?: string }[] = []
  const prevById = new Map(previous.segments.map(s => [s.id, s]))
  const curIds = new Set(current.segments.map(s => s.id))
  const len = (ft: number) => formatLength(ft, units)

  for (const seg of current.segments) {
    const old = prevById.get(seg.id)
    if (!old) {
      raw.push({ kind: 'added', text: `Added: ${segmentLabel(seg).toLowerCase()}, ${len(seg.width)}`, segment: seg.id })
      continue
    }
    const parts: string[] = []
    if (old.type !== seg.type || segmentLabel(old) !== segmentLabel(seg))
      parts.push(`now a ${segmentLabel(seg).toLowerCase()}`)
    if (old.width !== seg.width)
      parts.push(`${len(old.width)} to ${len(seg.width)}`)
    if ((old.variant ?? '') !== (seg.variant ?? '') && seg.variant)
      parts.push(`now ${seg.variant.replace(/-/g, ' ')}`)
    // Paint and markings, compared as drawn (a type change already says enough).
    if (old.type === seg.type && surfaceOf(old) !== surfaceOf(seg))
      parts.push(`now ${SURFACE_WORDS[surfaceOf(seg)]}`)
    if (old.type === seg.type && markingOf(old) !== markingOf(seg))
      parts.push(markingOf(seg) === 'none' ? 'markings removed' : `adds ${MARKING_WORDS[markingOf(seg)]}`)
    const added = itemTypes(seg).filter(t => !itemTypes(old).includes(t))
    const removed = itemTypes(old).filter(t => !itemTypes(seg).includes(t))
    if (added.length)
      parts.push(`adds ${added.map(t => ITEM_LABELS[t].toLowerCase()).join(' and ')}`)
    if (removed.length)
      parts.push(`drops ${removed.map(t => ITEM_LABELS[t].toLowerCase()).join(' and ')}`)
    if (parts.length)
      raw.push({ kind: 'changed', text: `${segmentLabel(old)}: ${parts.join(', ')}`, segment: seg.id })
  }
  for (const old of previous.segments) {
    if (!curIds.has(old.id))
      raw.push({ kind: 'removed', text: `Removed: ${segmentLabel(old).toLowerCase()}, ${len(old.width)}` })
  }

  const compareMarks = <T extends { id: string }>(cur: T[], prev: T[], label: (x: T) => string, same: (a: T, b: T) => boolean) => {
    const prevMap = new Map(prev.map(x => [x.id, x]))
    const curSet = new Set(cur.map(x => x.id))
    for (const x of cur) {
      const old = prevMap.get(x.id)
      if (!old)
        raw.push({ kind: 'added', text: `Added: ${label(x).toLowerCase()}`, mark: x.id })
      else if (!same(old, x))
        raw.push({ kind: 'changed', text: `${label(x)}: changed`, mark: x.id })
    }
    for (const old of prev) {
      if (!curSet.has(old.id))
        raw.push({ kind: 'removed', text: `Removed: ${label(old).toLowerCase()}` })
    }
  }
  compareMarks(current.features ?? [], previous.features ?? [], f => f.label ?? FEATURE_LABELS[f.type], (a, b) => JSON.stringify(a) === JSON.stringify(b))
  compareMarks(current.overrides ?? [], previous.overrides ?? [], o => o.label ?? OVERRIDE_LABELS[o.type], (a, b) => JSON.stringify(a) === JSON.stringify(b))

  const changes: Change[] = []
  for (const r of raw) {
    let c = changes.find(x => x.text === r.text)
    if (!c) {
      c = { n: changes.length + 1, kind: r.kind, text: r.text, segments: [], marks: [] }
      changes.push(c)
    }
    if (r.segment)
      c.segments.push(r.segment)
    if (r.mark)
      c.marks.push(r.mark)
  }
  return changes
}

/** Changes between two entries, or none when either isn't a street (intersections compare later). */
export function diffEntries(current: ConfigEntry | undefined, previous: ConfigEntry | undefined, units: Units): Change[] {
  if (current?.config?.kind !== 'street' || previous?.config?.kind !== 'street')
    return []
  return diffStreets(current.config, previous.config, units)
}

/**
 * Moves label positions apart so neighbors keep at least `gap` between
 * them, each staying as close to where it wants to be as it can, inside
 * [lo, hi]. Input must be sorted ascending.
 */
export function spread(xs: number[], gap: number, lo: number, hi: number): number[] {
  const a = [...xs]
  for (let i = 1; i < a.length; i++) a[i] = Math.max(a[i], a[i - 1] + gap)
  if (a.length)
    a[a.length - 1] = Math.min(a[a.length - 1], hi)
  for (let i = a.length - 2; i >= 0; i--) a[i] = Math.min(a[i], a[i + 1] - gap)
  if (a.length && a[0] < lo) {
    const shift = lo - a[0]
    for (let i = 0; i < a.length; i++) a[i] += shift * (1 - i / a.length)
  }
  return a
}
