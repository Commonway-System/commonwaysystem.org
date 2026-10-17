// Annotation layout for the cross-section, under the ground cut: the strip
// row (each strip's name above a dimension line, its width below), the
// curb-to-curb row, the right-of-way row, and the zone band that says who
// each strip is for. Pure: positions come from the columns and a text
// measure, so the prerendered drawing and the browser agree.

import type { Measure } from './art/text'
import { segmentLabel } from './geometry'
import { formatLength } from './state'
import type { Segment, SegmentType, Units } from './types'

/** Short names, used when a strip is too narrow for its full name. */
const SHORT: Record<SegmentType, string> = {
  'sidewalk': 'Walk',
  'furnishing': 'Planting',
  'curb': 'Curb',
  'parking': 'Parking',
  'bike-lane': 'Bike lane',
  'protected-bike-lane': 'Bike lane',
  'buffer': 'Buffer',
  'travel-lane': 'Lane',
  'turn-lane': 'Turn lane',
  'transit-lane': 'Bus lane',
  'median': 'Median',
  'shoulder': 'Shoulder',
}

export type Zone = 'ped' | 'bike' | 'transit' | 'car' | 'sep'

/** Who each strip is for. Separators (buffers, medians) are hatched in their neighbors' colors. */
const ZONE: Record<SegmentType, Zone> = {
  'sidewalk': 'ped',
  'furnishing': 'ped',
  'curb': 'ped',
  'parking': 'car',
  'bike-lane': 'bike',
  'protected-bike-lane': 'bike',
  'buffer': 'sep',
  'travel-lane': 'car',
  'turn-lane': 'car',
  'transit-lane': 'transit',
  'median': 'sep',
  'shoulder': 'car',
}

const ZONE_TEXT: Record<Exclude<Zone, 'sep'>, [string, string]> = {
  ped: ['PEDESTRIAN', 'WALK'],
  bike: ['BICYCLE', 'BIKE'],
  transit: ['TRANSIT', 'BUS'],
  car: ['VEHICLE', 'DRIVE'],
}

export interface LayoutColumn {
  s: Segment
  wd: number
  x0: number
  x1: number
  cx: number
}

export interface StripLabel {
  cx: number
  /** Name lines set across the strip, above the line (empty if names are off). */
  lines: string[]
  /** Width set across the strip, below the line ('' if dimensions are off). */
  width: string
  /** When the strip is too narrow: one string set vertically above the line, reading upward. */
  rotated?: string
}

export interface Span {
  x0: number
  x1: number
  text: string
}

export interface BandRun {
  x0: number
  x1: number
  zone: Zone
  /** For separators: the zones on either side, for the hatch colors. */
  left?: Zone
  right?: Zone
  text: string
}

export interface AnnotationLayout {
  font: number
  numFont: number
  lineH: number
  tracking: number
  labels: StripLabel[]
  /** All y values are offsets below the top of the annotation area. */
  height: number
  stripY?: number
  stripWidthY?: number
  curbY?: number
  curbSpans: Span[]
  rowY?: number
  row?: Span
  varies: { x0: number, x1: number, text: string }[]
  bandY?: number
  bandH: number
  band: BandRun[]
  /** Strip boundaries (px) for ticks and guides. */
  edges: number[]
}

export interface AnnotationInput {
  cols: LayoutColumn[]
  /** Property lines, px. */
  left: number
  right: number
  w: number
  h: number
  labels: boolean
  dimensions: boolean
  units: Units
  /** Appended to the right-of-way text when the street has more than one cut point. */
  cutLabel?: string
  isRaised: (s: Segment) => boolean
  measure: Measure
}

export function layoutAnnotations(o: AnnotationInput): AnnotationLayout {
  const narrow = o.w < 480
  const font = narrow ? 9 : 10.5
  const numFont = font + 1.5
  const lineH = font + 3
  const tracking = 0.06
  const label = { size: font, tracking }
  const num = { size: numFont, weight: 700 as const, tracking: 0.02 }
  const maxRot = Math.max(40, Math.min(o.h * 0.2, 120))
  const fits = (t: string, room: number) => o.measure(t, label) <= room

  // Up to two lines across the strip, splitting at the most balanced word break.
  function across(text: string, room: number): string[] | null {
    if (fits(text, room))
      return [text]
    const words = text.split(' ')
    let best: { m: number, l: string[] } | null = null
    for (let i = 1; i < words.length; i++) {
      const a = words.slice(0, i).join(' ')
      const b = words.slice(i).join(' ')
      const m = Math.max(o.measure(a, label), o.measure(b, label))
      if (!best || m < best.m)
        best = { m, l: [a, b] }
    }
    return best && best.m <= room ? best.l : null
  }

  const labels: StripLabel[] = o.cols.map((c) => {
    const room = c.x1 - c.x0 - 6
    const full = o.labels ? segmentLabel(c.s).toUpperCase() : ''
    const short = o.labels ? (c.s.label ? c.s.label.split(' ')[0] : SHORT[c.s.type]).toUpperCase() : ''
    const width = o.dimensions ? formatLength(c.wd, o.units) : ''
    if (!width || o.measure(width, num) <= room + 2) {
      const lines = full ? (across(full, room) ?? across(short, room)) : []
      if (lines)
        return { cx: c.cx, lines, width }
    }
    let rotated = [full, width].filter(Boolean).join(' · ')
    if (full && o.measure(rotated, label) > maxRot)
      rotated = [short, width].filter(Boolean).join(' · ')
    return { cx: c.cx, lines: [], width: '', rotated }
  })

  const edges = [...o.cols.map(c => c.x0), o.cols.at(-1)?.x1 ?? o.right]
  let y = 10
  let stripY: number | undefined
  let stripWidthY: number | undefined
  if (o.labels || o.dimensions) {
    const nameH = Math.max(o.labels ? lineH : 0, ...labels.map(l => l.rotated ? o.measure(l.rotated, label) : l.lines.length * lineH))
    stripY = y + nameH + 6
    stripWidthY = stripY + numFont + 5
    y = labels.some(l => l.width) ? stripWidthY + 6 : stripY + 6
  }

  // Curb to curb, and the realm between each curb and its property line.
  const curbSpans: Span[] = []
  let curbY: number | undefined
  const inRoad = o.cols.map(c => !o.isRaised(c.s))
  const first = inRoad.indexOf(true)
  const last = inRoad.lastIndexOf(true)
  if (o.dimensions && first > 0 && last < o.cols.length - 1) {
    const a = o.cols[first].x0
    const b = o.cols[last].x1
    const feet = (i0: number, i1: number) => o.cols.slice(i0, i1 + 1).reduce((t, c) => t + c.wd, 0)
    const mid = formatLength(feet(first, last), o.units)
    const midText = `CURB TO CURB · ${mid}`
    curbSpans.push(
      { x0: o.left, x1: a, text: formatLength(feet(0, first - 1), o.units) },
      { x0: a, x1: b, text: o.measure(midText, num) <= b - a - 10 ? midText : mid },
      { x0: b, x1: o.right, text: formatLength(feet(last + 1, o.cols.length - 1), o.units) },
    )
    for (const s of curbSpans) {
      if (o.measure(s.text, num) > s.x1 - s.x0 - 4)
        s.text = ''
    }
    curbY = y + 8
    y = curbY + numFont + 9
  }

  // Right of way, with the private frontage beyond it marked "varies".
  let rowY: number | undefined
  let row: Span | undefined
  const varies: AnnotationLayout['varies'] = []
  if (o.dimensions) {
    const total = formatLength(o.cols.reduce((t, c) => t + c.wd, 0), o.units)
    const long = `RIGHT OF WAY · ${total}${o.cutLabel ? ` · ${o.cutLabel.toUpperCase()}` : ''}`
    const mid = `RIGHT OF WAY · ${total}`
    row = { x0: o.left, x1: o.right, text: [long, mid, total].find(t => o.measure(t, num) <= o.right - o.left - 10) ?? total }
    rowY = y + 8
    for (const [x0, x1] of [[4, o.left], [o.right, o.w - 4]]) {
      if (x1 - x0 > 8)
        varies.push({ x0, x1, text: fits('VARIES', x1 - x0 - 4) ? 'VARIES' : '' })
    }
    y = rowY + numFont + 9
  }

  // The zone band: who each strip is for.
  const band: BandRun[] = []
  let bandY: number | undefined
  const bandH = narrow ? 16 : 20
  if (o.labels && o.cols.length) {
    // A planting strip is pedestrian space when it borders a sidewalk; between
    // a cycle track and the road (the Dutch layout) it is a separator.
    const zoneOf = (i: number): Zone => {
      const t = o.cols[i].s.type
      if (t !== 'furnishing')
        return ZONE[t]
      const near = [o.cols[i - 1]?.s.type, o.cols[i + 1]?.s.type]
      return near.includes('sidewalk') || near.includes('curb') ? 'ped' : 'sep'
    }
    for (const [i, c] of o.cols.entries()) {
      const z = zoneOf(i)
      const prev = band.at(-1)
      if (prev && prev.zone === z && z !== 'sep')
        prev.x1 = c.x1
      else
        band.push({ x0: c.x0, x1: c.x1, zone: z, text: '' })
    }
    band.forEach((r, i) => {
      if (r.zone === 'sep') {
        r.left = band.slice(0, i).reverse().find(x => x.zone !== 'sep')?.zone
        r.right = band.slice(i + 1).find(x => x.zone !== 'sep')?.zone
        return
      }
      const [full, short] = ZONE_TEXT[r.zone]
      const st = { size: font, weight: 700 as const, tracking: 0.12 }
      const room = r.x1 - r.x0 - 6
      r.text = o.measure(full, st) <= room ? full : o.measure(short, st) <= room ? short : ''
    })
    bandY = y + 6
    y = bandY + bandH
  }

  return { font, numFont, lineH, tracking, labels, height: y + 6, stripY, stripWidthY, curbY, curbSpans, rowY, row, varies, bandY, bandH, band, edges }
}
