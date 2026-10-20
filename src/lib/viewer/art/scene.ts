// Scene pieces for the cross-section, in pixels: sky and clouds, the ground
// cut under each strip (surface, base course, soil, curbs, tree pits), and
// the frontage past the property lines. The renderer lays the columns out
// and passes them in; objects standing in the scene are placed in feet with
// place() at the glyph scale.

import { isBrick, levelOf, surfaceOf } from '../geometry'
import type { FrontageType, Segment } from '../types'
import type { Ids } from './core'
import { ellipse, place, r2, rect, rng, seedOf } from './core'
import { fencePost, streetLight } from './items'
import { cloud, shrub } from './nature'
import { car } from './vehicles'

/** One strip of the street, laid out in pixels. */
export interface SceneColumn {
  s: Segment
  x0: number
  x1: number
}

/** Vertical layout shared by every scene piece. */
export interface SceneBox {
  /** Drawing width, px. */
  w: number
  /** Left and right property lines, px. */
  left: number
  right: number
  /** Road surface, px from the top. */
  road: number
  /** Height a raised strip (sidewalk, curb) sits above the road, px. */
  curbH: number
  /** Bottom of the ground cut, px. */
  cutBottom: number
  /** Pixels per foot across the street. */
  S: number
  /** Pixels per foot for standing objects (smaller than S when the tallest wouldn't fit). */
  gs: number
}

/** Strips above the road surface (sidewalk level or a step below it). */
export function isRaisedSegment(s: Segment): boolean {
  return levelOf(s) !== 'road'
}

/** Strips that are planted rather than paved. */
const isPlanted = (s: Segment) => s.type === 'furnishing' || s.type === 'median'

/** Palette token for a strip's surface in section (see surfaceOf). */
export function surfacePaint(s: Segment): string {
  return { 'asphalt': 'asphalt', 'green': 'paint-green', 'red': 'paint-red', 'concrete': 'concrete', 'pavers': 'pavers', 'brick': 'brick', 'brick-red': 'brick-red' }[surfaceOf(s)]
}

/** Surface y of a column, px. */
export const surfaceY = (c: SceneColumn, b: SceneBox): number => {
  const level = levelOf(c.s)
  return level === 'sidewalk' ? b.road - b.curbH : level === 'intermediate' ? b.road - b.curbH * INTERMEDIATE : b.road
}

/** An intermediate strip's height as a share of the curb (a little under half, so the step up to the sidewalk reads). */
const INTERMEDIATE = 0.4

/** A sloped edge between two heights: which side is lower, and which strip the slope sits in. */
export interface EdgeStrip {
  low: 'left' | 'right'
  within: 'left' | 'right'
}

/**
 * Edges drawn as a narrow sloped strip (a mountable curb) rather than a
 * step. Where a raised bike lane meets a sidewalk, a rider who drifts onto
 * it can ride up without falling; the slope is in the bike lane. Where a
 * parking lane raised partway to the sidewalk meets the road, cars pull up
 * over it; the slope is in the parking lane, so the travel lane keeps its
 * full width. Undefined for any other edge.
 */
export function edgeStrip(a: Segment, c: Segment): EdgeStrip | undefined {
  const walk = (s: Segment) => (s.type === 'sidewalk' || s.type === 'curb') && levelOf(s) === 'sidewalk'
  if (levelOf(a) === 'intermediate' && walk(c))
    return { low: 'left', within: 'left' }
  if (levelOf(c) === 'intermediate' && walk(a))
    return { low: 'right', within: 'right' }
  const raisedParking = (s: Segment) => s.type === 'parking' && levelOf(s) === 'intermediate'
  if (raisedParking(a) && levelOf(c) === 'road')
    return { low: 'right', within: 'left' }
  if (raisedParking(c) && levelOf(a) === 'road')
    return { low: 'left', within: 'right' }
  return undefined
}

/** Width of the edge strip, px (a little over a foot, so the slope reads). */
export const edgeStripW = (b: { S: number }) => Math.max(1.2 * b.S, 5)

// ---------------------------------------------------------------------------

/** Sky gradient and a few clouds from the top of the drawing down to the road. */
export function sky(ids: Ids, b: SceneBox, seed: number): string {
  const id = ids.next('sky')
  let s = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--pvx-sky-top)"/><stop offset="1" style="stop-color:var(--pvx-sky-bottom)"/></linearGradient></defs>`
  s += rect(0, 0, b.w, b.road, `url(#${id})`)
  const r = rng(seed)
  const n = b.w < 480 ? 2 : b.w < 800 ? 3 : 4
  const span = b.road - b.curbH
  for (let i = 0; i < n; i++) {
    const cw = Math.max(48, Math.min(b.w * 0.2, 200)) * (0.7 + r() * 0.6)
    s += `<g transform="translate(${r2((i + 0.2 + r() * 0.6) * (b.w / n))} ${r2(span * (0.1 + r() * 0.22) + cw * 0.15)})">${cloud(cw, seed + i)}</g>`
  }
  return s
}

/** Patterns for soil, gravel and asphalt texture; returns their ids. */
function textures(ids: Ids, S: number): { defs: string, soil: string, gravel: string, brick: string } {
  const soil = ids.next('soil')
  const gravel = ids.next('gravel')
  const brick = ids.next('brick')
  // Brick ends seen in section: a joint every brick width (4 in), never under 4 px.
  const bw = Math.max(S / 3, 4)
  const defs = `<defs><pattern id="${soil}" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="2" cy="3" r="0.9" style="fill:var(--pvx-soil-dot)"/><circle cx="6.5" cy="7" r="0.7" style="fill:var(--pvx-soil-dot)"/><circle cx="7" cy="1.5" r="0.5" style="fill:var(--pvx-soil-dot)"/></pattern>`
    + `<pattern id="${gravel}" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1" style="fill:var(--pvx-gravel-dot)"/><circle cx="4.5" cy="4" r="0.8" style="fill:var(--pvx-gravel-dot)"/></pattern>`
    + `<pattern id="${brick}" width="${r2(bw)}" height="40" patternUnits="userSpaceOnUse"><rect x="0" y="0" width="0.8" height="40" style="fill:var(--pvx-brick-joint)"/></pattern></defs>`
  return { defs, soil: `url(#${soil})`, gravel: `url(#${gravel})`, brick: `url(#${brick})` }
}

/**
 * The cut through the ground: soil body edge to edge, then each strip's own
 * build-up (concrete slab on gravel for walks, asphalt on a base course for
 * the road, mulch and groundcover over a root zone for planted strips),
 * curbs at every raised edge, and the ground profile line on top.
 */
export function groundCut(ids: Ids, cols: SceneColumn[], b: SceneBox): string {
  const t = textures(ids, b.S)
  const top = b.road - b.curbH
  const esW = edgeStripW(b)
  // Sloped edges, found first: a slope inside a strip shortens that strip's slab.
  const edges = cols.slice(0, -1).map((a, i) => surfaceY(a, b) === surfaceY(cols[i + 1], b) ? undefined : edgeStrip(a.s, cols[i + 1].s))
  const insetL = (i: number) => (edges[i - 1]?.within === 'right' && surfaceY(cols[i], b) < surfaceY(cols[i - 1], b) ? esW : 0)
  const insetR = (i: number) => (edges[i]?.within === 'left' && surfaceY(cols[i], b) < surfaceY(cols[i + 1], b) ? esW : 0)
  let s = t.defs
  s += rect(0, top, b.w, b.cutBottom - top, 'soil') + rect(0, top, b.w, b.cutBottom - top, t.soil)

  const slabT = Math.max(0.4 * b.S, 3)
  const walkBase = Math.max(0.5 * b.S, 3)
  const asphaltT = Math.max(0.35 * b.S, 2.5)
  const roadBase = Math.max(0.8 * b.S, 5)
  cols.forEach((c, ci) => {
    const y = surfaceY(c, b)
    const w = c.x1 - c.x0
    if (isPlanted(c.s)) {
      const trees = (c.s.items ?? []).some(i => i.type === 'tree')
      if (trees)
        s += ellipse(c.x0 + w / 2, y + (b.cutBottom - y) * 0.45, w * 0.42, (b.cutBottom - y) * 0.35, 'root', 'opacity="0.45"')
      s += rect(c.x0, y, w, Math.max(0.25 * b.S, 2), c.s.type === 'median' && !trees ? 'grass' : 'mulch')
      const r = rng(seedOf(c.s.id, 'tufts'))
      const n = Math.max(2, Math.round(w / 6))
      for (let i = 0; i < n; i++) {
        const tx = c.x0 + ((i + 0.5) * w) / n + (r() - 0.5) * Math.min(4, w / n / 2)
        const th = (0.5 + r() * 0.6) * b.gs
        const hw = 0.35 * b.gs
        s += `<path d="M${r2(tx - hw)} ${r2(y)} L${r2(tx - hw * 0.3)} ${r2(y - th)} L${r2(tx)} ${r2(y - th * 0.5)} L${r2(tx + hw * 0.35)} ${r2(y - th * 0.9)} L${r2(tx + hw)} ${r2(y)} Z" style="fill:var(--pvx-${i % 2 ? 'grass' : 'grass-dk'})"/>`
      }
    }
    else if (surfaceOf(c.s) === 'concrete' || surfaceOf(c.s) === 'pavers' || isBrick(c.s)) {
      // Brick and pavers sit on a sand and gravel bed like a walk's slab.
      const x0 = c.x0 + insetL(ci)
      const sw = w - insetL(ci) - insetR(ci)
      s += rect(x0, y + slabT, sw, walkBase, 'gravel') + rect(x0, y + slabT, sw, walkBase, t.gravel)
      s += rect(x0, y, sw, slabT, surfacePaint(c.s)) + rect(x0, y + slabT - 1, sw, 1, 'concrete-shade')
      if (isBrick(c.s))
        s += rect(x0, y, sw, slabT, t.brick)
    }
    else {
      s += rect(c.x0, y + asphaltT, w, roadBase, 'base') + rect(c.x0, y + asphaltT, w, roadBase, t.gravel)
      s += rect(c.x0, y, w, asphaltT, surfacePaint(c.s))
    }
    // Every buffer shows its two white edge stripes in section.
    if (c.s.type === 'buffer') {
      const lw = Math.max(2, 0.33 * b.S)
      s += rect(c.x0 + 1, y - 0.5, lw, 1.5, 'p-white') + rect(c.x1 - 1 - lw, y - 0.5, lw, 1.5, 'p-white')
    }
  })

  // Curbs: a concrete section at every edge between two heights, from the
  // higher surface down into the base; a sloped edge strip where a raised
  // bike lane meets a sidewalk, or raised parking meets the road.
  const curbW = Math.max(0.5 * b.S, 3)
  const curbDeep = b.road + Math.max(1.5 * b.S, 10)
  const bevelL = new Set<number>()
  const bevelR = new Set<number>()
  for (let i = 0; i < cols.length - 1; i++) {
    const a = cols[i]
    const c = cols[i + 1]
    const ya = surfaceY(a, b)
    const yc = surfaceY(c, b)
    if (ya === yc)
      continue
    const e = edges[i]
    if (e) {
      // The slope runs from the low end to the high end across esW, inside
      // the strip named by `within`.
      const x = a.x1
      const toward = e.within === 'left' ? -1 : 1
      const xLowEnd = e.within === e.low ? x + toward * esW : x
      const xHighEnd = e.within === e.low ? x : x + toward * esW
      const yHigh = Math.min(ya, yc)
      const yLow = Math.max(ya, yc)
      const deep = yLow + Math.max(0.6 * b.S, 4)
      s += `<path d="M${r2(xLowEnd)} ${r2(yLow)} L${r2(xHighEnd)} ${r2(yHigh)} L${r2(xHighEnd)} ${r2(deep)} L${r2(xLowEnd)} ${r2(deep)} Z" style="fill:var(--pvx-concrete);stroke:var(--pvx-cut-line);stroke-width:0.75"/>`
      if (e.within === 'left')
        bevelR.add(i)
      else
        bevelL.add(i + 1)
      continue
    }
    const x = ya < yc ? a.x1 - curbW : c.x0
    s += `<path d="M${r2(x)} ${r2(Math.min(ya, yc))} L${r2(x + curbW)} ${r2(Math.min(ya, yc))} L${r2(x + curbW)} ${r2(curbDeep)} L${r2(x)} ${r2(curbDeep)} Z" style="fill:var(--pvx-concrete);stroke:var(--pvx-cut-line);stroke-width:0.75"/>`
  }

  // Ground profile line (sloping across each edge strip), then a fade into
  // the page at the bottom of the cut.
  let d = `M0 ${r2(top)} L${r2(b.left)} ${r2(top)}`
  cols.forEach((c, i) => {
    const y = surfaceY(c, b)
    d += ` L${r2(bevelL.has(i) ? c.x0 + esW : c.x0)} ${r2(y)} L${r2(bevelR.has(i) ? c.x1 - esW : c.x1)} ${r2(y)}`
  })
  d += ` L${r2(b.w)} ${r2(top)}`
  s += `<path d="${d}" style="fill:none;stroke:var(--pvx-cut-line);stroke-width:1"/>`
  const fade = ids.next('fade')
  const fh = Math.min(16, (b.cutBottom - top) * 0.6)
  s += `<defs><linearGradient id="${fade}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--cw-paper-raised);stop-opacity:0"/><stop offset="1" style="stop-color:var(--cw-paper-raised);stop-opacity:1"/></linearGradient></defs>`
  s += rect(0, b.cutBottom - fh, b.w, fh, `url(#${fade})`)
  return s
}

// ---------------------------------------------------------------------------
// Frontage past the property lines

/**
 * One side's frontage, clipped to its own area so nothing spills past the
 * drawing. `next` is the strip just inside the property line (an awning only
 * reaches over a sidewalk).
 */
export function frontage(ids: Ids, kind: FrontageType, side: 'left' | 'right', b: SceneBox, next: Segment | undefined, seed: number): string {
  const a = side === 'left' ? 0 : b.right
  const z = side === 'left' ? b.left : b.w
  const face = side === 'left' ? b.left : b.right
  const dir = side === 'left' ? 1 : -1
  const top = b.road - b.curbH
  const w = z - a
  const clip = ids.next('front')
  let s = ''

  if (kind === 'buildings') {
    const fl = 12 * b.gs
    const color = side === 'left' ? 'bldg-a' : 'bldg-b'
    s += rect(a, 0, w, top, color)
    s += rect(a, top, w, b.cutBottom - top, color) + rect(a, top, w, b.cutBottom - top, 'shadow')
    const floors = Math.ceil(top / fl)
    for (let k = 1; k <= floors; k++) {
      const yb = top - k * fl
      s += rect(a, yb - 1.5, w, 2.5, 'bldg-trim')
      if (k === 1)
        continue
      const pitch = 3.5 * b.gs + 6
      const nW = Math.max(1, Math.floor((w - 8) / pitch))
      const ww = Math.min(3.5 * b.gs, (w - 8) / nW - 6)
      const wh = 5.5 * b.gs
      for (let i = 0; i < nW; i++) {
        const wx = a + 4 + i * ((w - 8) / nW) + ((w - 8) / nW - ww) / 2
        const wy = yb + fl * 0.3
        s += rect(wx, wy, ww, wh, seedOf(seed, k, i) % 3 === 0 ? 'window-lit' : 'window') + rect(wx, wy + wh, ww, 2, 'bldg-trim')
      }
    }
    // Storefront glass and mullions, a base course, and an awning over the walk.
    const sf = top - 10 * b.gs
    s += rect(a + 3, sf, w - 6, 10 * b.gs, 'glass') + rect(a + 3, sf, w - 6, 10 * b.gs, 'shadow')
    for (let i = 1; i < 3; i++)
      s += rect(a + 3 + (i * (w - 6)) / 3 - 1, sf, 2, 10 * b.gs, 'bldg-trim')
    s += rect(a, top - 0.6 * b.gs, w, 0.6 * b.gs, 'bldg-trim')
    // The awning reaches over the sidewalk, past the clip, so it's added after.
    let awning = ''
    if (next?.type === 'sidewalk') {
      const reach = Math.min(3.5, next.width * 0.6) * b.S
      const ay = top - 9 * b.gs
      awning = `<path d="M${r2(face)} ${r2(ay - 1.6 * b.gs)} L${r2(face + dir * reach)} ${r2(ay)} L${r2(face + dir * reach)} ${r2(ay + 0.6 * b.gs)} L${r2(face)} ${r2(ay + 0.6 * b.gs)} Z" style="fill:var(--pvx-awning)"/>`
    }
    return `<defs><clipPath id="${clip}"><rect x="${r2(a)}" y="0" width="${r2(w)}" height="${r2(b.cutBottom)}"/></clipPath></defs><g clip-path="url(#${clip})">${s}</g>${awning}`
  }

  if (kind === 'parking-lot') {
    s += rect(a, top - 1, w, Math.max(0.35 * b.S, 2.5), 'asphalt')
    const cx = a + w / 2
    s += place(cx, top - 1, b.gs, car(seed, side === 'left'))
    s += rect(face - dir * (0.8 * b.S) - (dir > 0 ? 0.6 * b.S : 0), top - 0.5 * b.gs, 0.6 * b.S, 0.5 * b.gs, 'concrete')
    s += place(a + w * (side === 'left' ? 0.15 : 0.85), top - 1, b.gs, streetLight(side === 'left' ? 1 : -1))
  }
  else if (kind === 'field') {
    s += rect(a, top - 2, w, 4, 'grass-dk')
    const r = rng(seed)
    const n = Math.max(3, Math.round(w / 8))
    for (let i = 0; i < n; i++) {
      const tx = a + ((i + 0.5) * w) / n
      const th = (1.2 + r() * 1.2) * b.gs
      s += `<path d="M${r2(tx - 0.25 * b.gs)} ${r2(top)} L${r2(tx - 0.5 * b.gs)} ${r2(top - th)} L${r2(tx)} ${r2(top - th * 0.4)} L${r2(tx + 0.45 * b.gs)} ${r2(top - th * 0.9)} L${r2(tx + 0.3 * b.gs)} ${r2(top)} Z" style="fill:var(--pvx-${i % 2 ? 'grass' : 'grass-dk'})"/>`
    }
    // A fence post at the property line (its wire runs along the street, out of the cut).
    s += place(face - dir * 0.3 * b.gs, top, b.gs, fencePost())
  }
  else {
    s += rect(a, top - 2, w, 4, 'grass')
    const sw = Math.min(5, (w / b.gs) * 0.8)
    if (sw > 1.5)
      s += place(a + w / 2 - dir * 0.1 * w, top - 1, b.gs, shrub(ids, sw, sw * 0.8, seed))
    s += place(face - dir * 0.3 * b.gs, top, b.gs, fencePost())
  }
  return `<defs><clipPath id="${clip}"><rect x="${r2(a)}" y="0" width="${r2(w)}" height="${r2(b.cutBottom)}"/></clipPath></defs><g clip-path="url(#${clip})">${s}</g>`
}
