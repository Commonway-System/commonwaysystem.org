// Shared by the street renderers (cross-section, top down) and the parent
// viewer: segment labels, widths along the street (shape overrides), and the
// "what changed" comparison. Pure functions, no DOM, so they run during
// prerendering too.
import { formatLength } from './state.js'
import type { Change, ConfigEntry, FeatureType, ItemType, Level, Marking, Segment, SegmentType, ShapeOverride, StreetConfig, StreetFeature, Surface, Units } from './types.js'

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

const SURFACE_WORDS: Record<Surface, string> = { 'asphalt': 'plain asphalt', 'green': 'green paint', 'red': 'red paint', 'concrete': 'concrete', 'pavers': 'pavers', 'brick': 'brick pavers', 'brick-red': 'red brick pavers' }
const MARKING_WORDS: Record<Marking, string> = { 'bike-symbol': 'bike lane markings', 'sharrow': 'shared lane markings', 'stalls': 'T marks at each parking stall', 'none': 'no markings' }

/** Length of one parallel parking stall, ft (where a parking lane's marking is 'stalls'). */
export const STALL_LENGTH = 22

/** Strips people walk on: a crosswalk paints no stripes there. */
export function isWalkable(s: Segment): boolean {
  return s.type === 'sidewalk' || s.type === 'furnishing' || s.type === 'curb' || s.type === 'median'
}

/** Detectable warning surfaces are 24 inches deep in the direction of travel (PROWAG R305.1.4). */
export const WARNING_DEPTH = 2

/**
 * How a crosswalk meets the strips it crosses, given the strips actually
 * there (in order, by index into the street's segments). Its stripes mark
 * every strip a vehicle or bicycle uses, at any height, and skip the strips
 * people walk on. With detectable warnings, each walkable strip gets one at
 * every edge where the crosswalk leaves it for a crossed strip.
 */
export function crossing(f: StreetFeature, shown: { i: number, s: Segment }[]): { crossed: number[], warnings: { i: number, edge: 'start' | 'end' }[] } {
  const crossed = shown.filter(x => f.across?.length ? f.across.includes(x.s.id) : !isWalkable(x.s)).map(x => x.i)
  const warnings: { i: number, edge: 'start' | 'end' }[] = []
  if (f.detectableWarnings) {
    for (let n = 0; n < shown.length - 1; n++) {
      const [a, b] = [shown[n], shown[n + 1]]
      if (isWalkable(a.s) && crossed.includes(b.i))
        warnings.push({ i: a.i, edge: 'end' })
      if (crossed.includes(a.i) && isWalkable(b.s))
        warnings.push({ i: b.i, edge: 'start' })
    }
  }
  return { crossed, warnings }
}

/**
 * Whether a stretch along the street overlaps a crosswalk. Nobody may park
 * on a crosswalk (state vehicle codes), so the drawings never put a parked
 * car or a stall mark there.
 */
export function onCrosswalk(features: StreetFeature[] | undefined, from: number, to = from): boolean {
  return (features ?? []).some((f) => {
    if (f.type !== 'crosswalk' && f.type !== 'raised-crosswalk')
      return false
    const half = (f.length ?? 10) / 2
    return to >= f.at - half && from <= f.at + half
  })
}

/** Clear gap between a barrier's end and the crosswalk's edge, in feet. */
export const BARRIER_GAP = 1

/**
 * The stretches of [from, to] a continuous barrier covers: it stops short of
 * every crosswalk, since people on the crosswalk walk through it.
 */
export function barrierRuns(features: StreetFeature[] | undefined, from: number, to: number): [number, number][] {
  const cuts = (features ?? [])
    .filter(f => f.type === 'crosswalk' || f.type === 'raised-crosswalk')
    .map(f => [f.at - (f.length ?? 10) / 2 - BARRIER_GAP, f.at + (f.length ?? 10) / 2 + BARRIER_GAP] as [number, number])
    .sort((p, q) => p[0] - q[0])
  const runs: [number, number][] = []
  let a = from
  for (const [c0, c1] of cuts) {
    if (c1 <= a || c0 >= to)
      continue
    if (c0 > a)
      runs.push([a, c0])
    a = Math.max(a, c1)
  }
  if (a < to)
    runs.push([a, to])
  return runs
}

/** Brick or permeable pavers (either color). */
export const isBrick = (s: Segment): boolean => surfaceOf(s) === 'brick' || surfaceOf(s) === 'brick-red'

export function segmentLabel(s: Segment): string {
  return s.label ?? SEGMENT_LABELS[s.type]
}

/** A strip's surface height: its own `level`, or the default for its type. */
export function levelOf(s: Segment): Level {
  if (s.level)
    return s.level
  if (s.type === 'sidewalk' || s.type === 'furnishing' || s.type === 'median' || s.type === 'curb' || s.variant === 'raised' || s.variant === 'cycle-track')
    return 'sidewalk'
  return 'road'
}

/** Segments above the road surface (sidewalk level or a step below it): outside the curb-to-curb roadway. */
export function isRaised(s: Segment): boolean {
  return levelOf(s) !== 'road'
}

const LEVEL_WORDS: Record<Level, string> = { 'road': 'at road level', 'intermediate': 'raised partway to sidewalk height', 'sidewalk': 'at sidewalk level' }

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
  // A zero-wide strip only appears inside a shape override (a curb
  // extension's planting); the override's own change line covers it.
  current = { ...current, segments: current.segments.filter(sg => sg.width > 0) }
  previous = { ...previous, segments: previous.segments.filter(sg => sg.width > 0) }
  const raw: { kind: Change['kind'], text: string, segment?: string, mark?: string }[] = []
  const prevById = new Map(previous.segments.map(s => [s.id, s]))
  const curIds = new Set(current.segments.map(s => s.id))
  const len = (ft: number) => formatLength(ft, units)
  const moved = movedIds(current.segments, previous.segments)

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
    if (segmentLabel(old) === segmentLabel(seg) && levelOf(old) !== levelOf(seg))
      parts.push(`now ${LEVEL_WORDS[levelOf(seg)]}`)
    if (moved.has(seg.id))
      parts.unshift(`moved, now ${placeOf(current.segments, seg.id)}`)
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
  // The whole street getting wider or narrower (adding parking, say).
  const was = totalWidth(previous)
  const now = totalWidth(current)
  if (Math.abs(was - now) > 0.05)
    raw.push({ kind: 'changed', text: `Right of way: ${len(was)} to ${len(now)}` })

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

/**
 * Which kept segments changed places. The segments both lists share are
 * matched in order (a heaviest common subsequence); whatever falls outside
 * the match moved. Travel modes weigh least, so when a bike lane and a
 * planting strip swap, the bike lane is the one reported as moved.
 */
const STAY_WEIGHT: Partial<Record<SegmentType, number>> = { 'sidewalk': 4, 'travel-lane': 4, 'turn-lane': 4, 'transit-lane': 4, 'median': 3, 'furnishing': 2, 'buffer': 2, 'curb': 2, 'parking': 1.5 }

function movedIds(current: Segment[], previous: Segment[]): Set<string> {
  const prevIds = new Set(previous.map(s => s.id))
  const curIds = new Set(current.map(s => s.id))
  const a = current.filter(s => prevIds.has(s.id))
  const b = previous.filter(s => curIds.has(s.id))
  const wt = (s: Segment) => STAY_WEIGHT[s.type] ?? 1
  const n = a.length
  const m = b.length
  const dp = Array.from({ length: n + 1 }, () => Array.from<number>({ length: m + 1 }).fill(0))
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = a[i].id === b[j].id
        ? dp[i + 1][j + 1] + wt(a[i])
        : Math.max(dp[i + 1][j], dp[i][j + 1])
    }
  }
  const kept = new Set<string>()
  for (let i = 0, j = 0; i < n && j < m;) {
    if (a[i].id === b[j].id) {
      kept.add(a[i].id)
      i++
      j++
    }
    else if (dp[i + 1][j] >= dp[i][j + 1]) {
      i++
    }
    else {
      j++
    }
  }
  return new Set(a.filter(s => !kept.has(s.id)).map(s => s.id))
}

/**
 * "between the sidewalk and the furnishing strip", from the segment's
 * neighbors, the one nearer its own property line first, so a lane that
 * moved the same way on both sides gets the same words (and one number).
 */
function placeOf(segments: Segment[], id: string): string {
  const i = segments.findIndex(s => s.id === id)
  const total = segments.reduce((t, s) => t + s.width, 0)
  const center = segments.slice(0, i).reduce((t, s) => t + s.width, 0) + segments[i].width / 2
  const name = (s?: Segment) => s ? `the ${segmentLabel(s).toLowerCase()}` : 'the property line'
  const pair = [name(segments[i - 1]), name(segments[i + 1])]
  if (center > total / 2)
    pair.reverse()
  return `between ${pair[0]} and ${pair[1]}`
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
