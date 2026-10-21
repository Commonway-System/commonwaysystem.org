// The top-down slice drawn under the cross-section: a short stretch of the
// same street seen from above, each strip directly under its column in the
// section (the street runs top to bottom; +y is toward the reader, the near
// end). Centered on the section's cut point, so items placed along the
// street by spacing land where the data puts them. Pixels, with objects
// placed in feet at the street's own scale.

import { crossing, isBrick, markingOf, onCrosswalk, STALL_LENGTH, surfaceOf, WARNING_DEPTH } from '../geometry'
import type { FrontageType, ItemType, Segment, StreetFeature } from '../types'
import type { Ids } from './core'
import { brickJoints, makeStamps, place, r2, rect, rng, seedOf } from './core'
import { barrierTop, bikeLaneSymbol, laneArrow, sharrow, streetItemTop } from './items'
import { crownRadius, shrubTop } from './nature'
import type { CyclistVariant, PedestrianVariant } from './people'
import { cyclistTop, PEDESTRIAN_WIDTH, pedestrianTop } from './people'
import type { VehicleVariant } from './vehicles'
import { VEHICLE_LENGTH, VEHICLE_WIDTH, vehicleTop } from './vehicles'
import { levelOf } from '../geometry'
import { edgeStrip, edgeStripW, isRaisedSegment } from './scene'

const HEIGHT = { road: 0, intermediate: 1, sidewalk: 2 } as const

export interface SliceColumn {
  s: Segment
  x0: number
  x1: number
  /** Items' x positions, the same as in the section above. */
  items: { type: ItemType, x: number }[]
  /** Who's on this strip in the section, so the slice shows the same people and vehicles. */
  users?: { kind: 'pedestrians', variants: PedestrianVariant[] } | { kind: 'vehicle', variant: VehicleVariant, toward: boolean } | { kind: 'cyclist', variant: CyclistVariant, toward: boolean }
}

export interface SliceBox {
  w: number
  left: number
  right: number
  /** Top of the slice, px. */
  y: number
  /** Height of the slice, px. */
  h: number
  /** Pixels per foot (the street's scale, both directions). */
  S: number
  /** Feet along the street at the middle of the slice (the section's cut point). */
  at: number
}

const LANES = new Set<Segment['type']>(['travel-lane', 'turn-lane', 'transit-lane'])

function surface(s: Segment): string {
  if (s.type === 'furnishing' || s.type === 'median')
    return 'p-grass'
  if (s.type === 'curb')
    return 'p-curb'
  return { 'asphalt': 'p-asphalt', 'green': 'p-green', 'red': 'p-red', 'concrete': 'p-concrete', 'pavers': 'p-pavers', 'brick': 'p-brick', 'brick-red': 'p-brick-red' }[surfaceOf(s)]
}

/** Seeded speckles of groundcover over a planted area. */
function speckles(x0: number, x1: number, y0: number, y1: number, S: number, seed: number): string {
  const r = rng(seed)
  const n = Math.min(28, Math.round(((x1 - x0) * (y1 - y0)) / (S * S * 3)))
  // Two groups, one per tone, with whole-pixel circles: the same look in far less markup.
  const tones = ['', '']
  for (let i = 0; i < n; i++)
    tones[i % 2] += `<circle cx="${Math.round(x0 + r() * (x1 - x0))}" cy="${Math.round(y0 + r() * (y1 - y0))}" r="${Math.max(1, Math.round(S * (0.18 + r() * 0.2)))}"/>`
  return `<g style="fill:var(--pvx-p-grass-dk)">${tones[0]}</g><g style="fill:var(--pvx-p-grass-lt)">${tones[1]}</g>`
}

/** Interval [a, b] of `along` feet a crown covers at column center x, or null. */
function crownSpan(cx: number, tx: number, ta: number, R: number, S: number): [number, number] | null {
  const dx = Math.abs(cx - tx) / S
  if (dx >= R)
    return null
  const h = Math.sqrt(R * R - dx * dx)
  return [ta - h, ta + h]
}

export function slice(ids: Ids, cols: SliceColumn[], b: SliceBox, frontage: { left: FrontageType, right: FrontageType }, features: StreetFeature[], seed: number): string {
  const L = b.h / b.S
  const a0 = b.at - L / 2
  const Y = (along: number) => b.y + (along - a0) * b.S
  const y1 = b.y + b.h
  const clip = ids.next('slice')
  let s = ''

  // Frontage past the property lines.
  for (const [x0, x1, side] of [[0, b.left, 'left'], [b.right, b.w, 'right']] as const) {
    const kind = frontage[side]
    const dir = side === 'left' ? 1 : -1
    if (kind === 'buildings') {
      s += rect(x0, b.y, x1 - x0, b.h, 'roof') + rect(x0 + 3, b.y, x1 - x0 - 6, b.h, 'roof-dk') + rect(x0 + 6, b.y, x1 - x0 - 12, b.h, 'roof')
      const r = rng(seedOf(seed, side, 'roof'))
      for (let i = 0; i < 2; i++) {
        const uw = 3 * b.S
        const ux = x0 + 8 + r() * Math.max(1, x1 - x0 - 16 - uw)
        const uy = b.y + 6 + r() * Math.max(1, b.h - 12 - 2.4 * b.S)
        s += rect(ux + 2, uy + 2, uw, 2.4 * b.S, 'shadow') + rect(ux, uy, uw, 2.4 * b.S, 'concrete')
      }
      // The building's shadow falls onto the walk (light from the top left).
      s += rect(dir > 0 ? x1 : x1 - 0.9 * b.S, b.y, 0.9 * b.S, b.h, 'shadow')
    }
    else if (kind === 'parking-lot') {
      s += rect(x0, b.y, x1 - x0, b.h, 'p-asphalt')
      const stall = 9 * b.S
      for (let y = b.y - ((b.y - Y(0)) % stall); y < y1; y += stall)
        s += rect(x0, y, x1 - x0, Math.max(1, 0.33 * b.S), 'p-white')
      const r = rng(seedOf(seed, side, 'lot'))
      for (let y = b.y - ((b.y - Y(0)) % stall) + stall / 2; y < y1 + stall; y += stall) {
        if (r() < 0.65)
          s += `<g transform="translate(${r2((x0 + x1) / 2 + dir * 1.5 * b.S)} ${r2(y)}) rotate(${dir > 0 ? -90 : 90}) scale(${r2(b.S)})">${vehicleTop('sedan', seedOf(seed, side, y), true)}</g>`
      }
    }
    else {
      s += rect(x0, b.y, x1 - x0, b.h, kind === 'field' ? 'p-grass-dk' : 'p-grass')
      s += speckles(x0, x1, b.y, y1, b.S, seedOf(seed, side, 'grass'))
      if (kind === 'lawn' && x1 - x0 > 2 * b.S)
        s += place((x0 + x1) / 2, Y(b.at + L * 0.25 * dir), b.S, shrubTop(ids, Math.min(5, (x1 - x0) / b.S * 0.8), seedOf(seed, side, 'shrub')))
    }
  }

  // Strip surfaces.
  const bricks = cols.some(c => isBrick(c.s)) ? brickJoints(ids, b.S) : undefined
  if (bricks)
    s += bricks.def
  for (const c of cols) {
    const t = c.s.type
    const w = c.x1 - c.x0
    s += rect(c.x0, b.y, w, b.h, surface(c.s))
    if (bricks && isBrick(c.s))
      s += rect(c.x0, b.y, w, b.h, bricks.fill)
    // A brick buffer still gets its painted chevrons, below.
    if (surfaceOf(c.s) === 'pavers' && t !== 'furnishing' && t !== 'median') {
      // A running-bond paving grid, 1 by 2 ft units.
      for (let a = Math.floor(a0); a < a0 + L; a += 1) {
        s += rect(c.x0, Y(a), w, 1, 'p-joint')
        for (let x = c.x0 + ((Math.round(a) % 2) ? b.S : 0); x < c.x1; x += 2 * b.S)
          s += rect(x, Y(a), 1, b.S, 'p-joint')
      }
    }
    else if (t === 'sidewalk' && surfaceOf(c.s) === 'concrete') {
      const first = Math.floor(a0 / 5) * 5
      for (let a = first, k = 0; a < a0 + L; a += 5, k++) {
        if (Math.abs(Math.round(a / 5)) % 2)
          s += rect(c.x0, Y(a), w, 5 * b.S, 'p-concrete-2')
        s += rect(c.x0, Y(a), w, 1, 'p-joint')
      }
    }
    else if (t === 'furnishing' || t === 'median') {
      s += speckles(c.x0, c.x1, b.y, y1, b.S, seedOf(c.s.id, 'grass'))
      // A crosswalk paves a planting strip it crosses: the walkway to the sidewalk.
      if (t === 'furnishing') {
        for (const f of features) {
          if (f.type !== 'crosswalk' && f.type !== 'raised-crosswalk')
            continue
          const half = (f.length ?? 10) / 2
          const ya = Math.max(b.y, Y(f.at - half))
          const yb = Math.min(y1, Y(f.at + half))
          if (yb > ya)
            s += rect(c.x0, ya, w, yb - ya, 'p-concrete')
        }
      }
    }
    else if (t === 'buffer' && !c.items.some(i => i.type === 'barrier')) {
      // A painted buffer: chevrons between its two edge stripes (drawn
      // with the markings below, centered `sm` inside each edge), ending on them.
      const sm = Math.max(0.33 * b.S, 1.4)
      for (let a = Math.floor(a0 / 8) * 8; a < a0 + L + 8; a += 8)
        s += `<path d="M${r2(c.x0 + sm)} ${r2(Y(a) + w - sm)} L${r2(c.x1 - sm)} ${r2(Y(a) + sm)}" style="fill:none;stroke:var(--pvx-p-white);stroke-width:${r2(Math.max(1, 0.33 * b.S))}"/>`
    }
  }

  // Curbs: the top of the curb, and its shadow on the road side.
  const curbW = Math.max(0.5 * b.S, 2)
  for (let i = 0; i < cols.length - 1; i++) {
    const a = cols[i]
    const c = cols[i + 1]
    const e = edgeStrip(a.s, c.s)
    if (e) {
      // The sloped edge strip: a light concrete band, no shadow.
      const ew = edgeStripW(b)
      s += rect(e.within === 'left' ? a.x1 - ew : a.x1, b.y, ew, b.h, 'p-concrete-2') + rect(a.x1 - 0.5, b.y, 1, b.h, 'p-joint')
      continue
    }
    const ha = HEIGHT[levelOf(a.s)]
    const hc = HEIGHT[levelOf(c.s)]
    if (ha === hc)
      continue
    const leftRaised = ha > hc
    const x = leftRaised ? a.x1 - curbW : c.x0
    s += rect(x, b.y, curbW, b.h, 'p-curb') + rect(leftRaised ? x + curbW : x - 2, b.y, 2, b.h, 'shadow')
  }

  // Lane markings, by the pair of strips either side of each edge.
  const mw = Math.max(0.33 * b.S, 1.4)
  const solid = (x: number, color: string) => rect(x - mw / 2, b.y, mw, b.h, color)
  for (let i = 0; i < cols.length - 1; i++) {
    const a = cols[i].s
    const c = cols[i + 1].s
    const x = cols[i].x1
    const lane = (t: Segment['type']) => LANES.has(t)
    // Every buffer has a white stripe down each side, just inside its edge.
    if (a.type === 'buffer' || c.type === 'buffer') {
      if (a.type === 'buffer')
        s += solid(x - mw, 'p-white')
      if (c.type === 'buffer')
        s += solid(x + mw, 'p-white')
    }
    else if (lane(a.type) && lane(c.type)) {
      if (a.type === 'turn-lane' || c.type === 'turn-lane')
        s += solid(x - mw, 'p-yellow') + solid(x + mw, 'p-yellow')
      else if ((a.direction ?? 'outbound') !== (c.direction ?? 'outbound'))
        s += solid(x - mw * 1.1, 'p-yellow') + solid(x + mw * 1.1, 'p-yellow')
      else
        for (let a2 = Math.floor(a0 / 40) * 40; a2 < a0 + L; a2 += 40)
          s += rect(x - mw / 2, Y(a2), mw, 10 * b.S, 'p-white')
    }
    else if ((lane(a.type) && !isRaisedSegment(c)) || (lane(c.type) && !isRaisedSegment(a))) {
      s += solid(lane(a.type) ? x - mw : x + mw, 'p-white')
    }
  }

  // Parking stalls: a white T at each stall line, laid in white bricks on
  // the edge nearest the travel lane (inside the mountable curb, if any).
  cols.forEach((c, i) => {
    if (c.s.type !== 'parking' || markingOf(c.s) !== 'stalls')
      return
    const left = cols[i - 1]
    const right = cols[i + 1]
    // The T goes on the edge toward the travel lane (or, failing that, the road-level side).
    const laneLeft = !!left && LANES.has(left.s.type)
    const laneRight = !!right && LANES.has(right.s.type)
    const streetLeft = laneLeft || laneRight ? laneLeft : !!left && !isRaisedSegment(left.s)
    const streetRight = laneLeft || laneRight ? laneRight : !!right && !isRaisedSegment(right.s)
    if (streetLeft === streetRight)
      return
    const other = streetLeft ? left : right
    const inset = edgeStrip(streetLeft ? other.s : c.s, streetLeft ? c.s : other.s) ? edgeStripW(b) : 0
    const tb = Math.max(b.S / 2, 4)
    const barX = streetLeft ? c.x0 + inset : c.x1 - inset - tb
    const stemX = streetLeft ? barX + tb : barX - 2.5 * b.S
    for (let a = Math.floor(a0 / STALL_LENGTH) * STALL_LENGTH; a <= a0 + L + 2; a += STALL_LENGTH) {
      if (onCrosswalk(features, a - 2, a + 2))
        continue
      for (const [x, y, w, h] of [[barX, Y(a - 2), tb, 4 * b.S], [stemX, Y(a) - tb / 2, 2.5 * b.S, tb]])
        s += rect(x, y, w, h, 'p-white') + (bricks && isBrick(c.s) ? rect(x, y, w, h, bricks.fill) : '')
    }
  })

  // Crosswalks inside the window: continental bars, parallel to traffic.
  // Their span stays clear of vehicles and of lane markings.
  const crossings: [number, number][] = []
  for (const f of features) {
    if (f.type !== 'crosswalk' && f.type !== 'raised-crosswalk')
      continue
    const len = f.length ?? 10
    if (f.at + len / 2 < a0 || f.at - len / 2 > a0 + L)
      continue
    // Stripes every 4 ft across the strips the crosswalk crosses (bike lanes
    // too, at any height), none on the strips people walk on.
    const { crossed, warnings } = crossing(f, cols.map((c, i) => ({ i, s: c.s })))
    if (!crossed.length)
      continue
    crossings.push([f.at - len / 2 - 1, f.at + len / 2 + 1])
    const xa = cols[crossed[0]].x0
    const xb = cols[crossed.at(-1)!].x1
    for (let x = xa + b.S; x < xb - b.S; x += 4 * b.S) {
      for (const i of crossed) {
        const x0 = Math.max(x, cols[i].x0 + 0.5 * b.S)
        const x1 = Math.min(x + 2 * b.S, cols[i].x1 - 0.5 * b.S)
        if (x1 - x0 > 0.4 * b.S)
          s += rect(x0, Y(f.at - len / 2), x1 - x0, len * b.S, 'p-white')
      }
    }
    // Detectable warnings: yellow truncated domes, 2 ft deep, at each edge
    // where the crosswalk leaves a walkable strip.
    for (const { i, edge } of warnings) {
      const c = cols[i]
      const d = Math.min(WARNING_DEPTH * b.S, c.x1 - c.x0)
      const x0 = edge === 'end' ? c.x1 - d : c.x0
      s += rect(x0, Y(f.at - len / 2), d, len * b.S, 'p-dw')
      const step = Math.max(0.5 * b.S, 4)
      for (let dx = step / 2; dx < d; dx += step) {
        for (let dy = step / 2; dy < len * b.S; dy += step)
          s += `<circle cx="${r2(x0 + dx)}" cy="${r2(Y(f.at - len / 2) + dy)}" r="${r2(step * 0.28)}" style="fill:var(--pvx-p-dw-dome)"/>`
      }
    }
  }

  // Items at their spacing, and the crowns they cast. Each strip's item is
  // drawn once and reused at every position.
  const stamps = makeStamps(ids)
  const crowns: { x: number, along: number, R: number }[] = []
  let itemsMarkup = ''
  for (const c of cols) {
    const list = c.s.items ?? []
    for (const it of c.items) {
      const spec = list.find(i => i.type === it.type)
      const toward = it.x < (b.left + b.right) / 2 ? 1 : -1
      if (it.type === 'barrier') {
        itemsMarkup += place(it.x, b.y + b.h / 2, b.S, barrierTop(L + 2))
        continue
      }
      const step = spec?.spacing
      const start = spec?.start ?? 0
      const positions: number[] = []
      if (step) {
        for (let a = start + Math.floor((a0 - start - 12) / step) * step; a <= a0 + L + 12; a += step)
          positions.push(a)
      }
      else {
        positions.push(b.at)
      }
      for (const a of positions) {
        if (it.type === 'tree')
          crowns.push({ x: it.x, along: a, R: crownRadius(22) })
        itemsMarkup += place(it.x, Y(a), b.S, stamps.use(`${c.s.id}|${it.type}|${toward}`, () => streetItemTop(ids, it.type, seedOf(c.s.id, it.type), toward)))
      }
    }
  }

  // People and vehicles, kept out from under the crowns where they can be.
  let users = ''
  const blocked = (cx: number) => crowns.map(k => crownSpan(cx, k.x, k.along, k.R, b.S)).filter((v): v is [number, number] => v !== null)
  // The first spot (seeded order) where a `len`-foot object fits clear of crowns and other things.
  const findSpot = (cx: number, len: number, taken: [number, number][], key: string, partial = false, throughCrossings = false): number | null => {
    const r = rng(seedOf(key))
    const lo = partial ? a0 - len * 0.3 : a0 + len / 2 + 0.5
    const hi = partial ? a0 + L + len * 0.3 : a0 + L - len / 2 - 0.5
    if (hi < lo)
      return null
    const clear = [...blocked(cx), ...taken, ...(partial || throughCrossings ? [] : crossings)]
    const tries = Array.from({ length: 24 }, () => lo + r() * (hi - lo))
    for (const a of tries) {
      if (clear.every(([p, q]) => a + len / 2 <= p || a - len / 2 >= q))
        return a
    }
    return null
  }
  for (const c of cols) {
    const u = c.users
    const cx = (c.x0 + c.x1) / 2
    const t = c.s.type
    const taken: [number, number][] = []
    if (u?.kind === 'pedestrians') {
      const widths = u.variants.map(v => PEDESTRIAN_WIDTH[v] * b.S)
      const gap = (c.x1 - c.x0 - widths.reduce((p, q) => p + q, 0)) / (u.variants.length + 1)
      let px = c.x0 + gap
      u.variants.forEach((v, k) => {
        const x = px + widths[k] / 2
        const a = findSpot(x, 4, taken, `${c.s.id}|ped|${k}`)
        px += widths[k] + gap
        if (a === null)
          return
        taken.push([a - 2, a + 2])
        users += place(x, Y(a), b.S, pedestrianTop(v, seedOf(c.s.id, 'p', k), k % 2 === 0))
      })
    }
    else if (u?.kind === 'vehicle') {
      const len = VEHICLE_LENGTH[u.variant]
      if (VEHICLE_WIDTH[u.variant] * b.S <= c.x1 - c.x0 + 2 * b.S) {
        // A car in a marked parking lane sits in the stall nearest the cut.
        const stall = Math.round((b.at - STALL_LENGTH / 2) / STALL_LENGTH) * STALL_LENGTH + STALL_LENGTH / 2
        const a = t === 'parking' && markingOf(c.s) === 'stalls'
          ? (onCrosswalk(features, stall - len / 2, stall + len / 2) ? null : stall)
          : findSpot(cx, len, [...taken, ...crossings], `${c.s.id}|veh`, true)
        if (a !== null) {
          taken.push([a - len / 2, a + len / 2])
          users += place(cx, Y(a), b.S, vehicleTop(u.variant, seedOf(c.s.id, 'car'), u.toward))
        }
      }
      if (LANES.has(t)) {
        // A shared lane gets its sharrow; any other lane, a direction arrow.
        const shared = markingOf(c.s) === 'sharrow'
        const a = findSpot(cx, shared ? 10 : 7, taken, `${c.s.id}|arrow`)
        // A two-way shared lane: one sharrow each way, each in its own half
        // (left half toward the reader, as the left lanes run in this data).
        if (a !== null && shared && c.s.direction === 'both')
          users += place(c.x0 + (c.x1 - c.x0) / 4, Y(a), b.S, sharrow(true)) + place(c.x1 - (c.x1 - c.x0) / 4, Y(a), b.S, sharrow(false))
        else if (a !== null)
          users += place(cx, Y(a), b.S, shared ? sharrow(u.toward) : laneArrow(6, u.toward))
      }
    }
    else if (u?.kind === 'cyclist') {
      const a = findSpot(cx, 6.5, taken, `${c.s.id}|bike`, false, true)
      if (a !== null) {
        taken.push([a - 3.25, a + 3.25])
        users += place(cx, Y(a), b.S, cyclistTop(seedOf(c.s.id, 'bike'), u.toward, u.variant))
      }
      // The lane's marking, if there's room: the bike lane symbol with its
      // arrow ahead of it, or a sharrow.
      const mark = markingOf(c.s)
      const g = mark === 'none' ? null : findSpot(cx, mark === 'sharrow' ? 9.5 : 10.5, taken, `${c.s.id}|symbol`)
      if (g !== null) {
        if (mark === 'sharrow')
          users += place(cx, Y(g), b.S, sharrow(u.toward))
        else
          users += place(cx, Y(g + (u.toward ? -2.6 : 2.6)), b.S, bikeLaneSymbol(u.toward)) + place(cx, Y(g + (u.toward ? 3.2 : -3.2)), b.S, laneArrow(4.2, u.toward))
      }
    }
  }

  // Vehicles and people first, so crowns pass over them; the slice stays drawn in Simplified view (it is already a plan diagram).
  const art = `<g class="art art--slice">${stamps.defs()}${users}${itemsMarkup}</g>`
  return `<defs><clipPath id="${clip}"><rect x="0" y="${r2(b.y)}" width="${r2(b.w)}" height="${r2(b.h)}"/></clipPath></defs><g clip-path="url(#${clip})">${s}${art}</g>`
    + `<rect x="0.5" y="${r2(b.y)}" width="${r2(b.w - 1)}" height="${r2(b.h)}" style="fill:none;stroke:var(--pvx-cut-line);stroke-width:1"/>`
}
