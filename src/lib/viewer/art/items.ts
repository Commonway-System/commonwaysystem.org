// Street furniture and pavement markings. Feet, origin at the ground point
// (front views) or the item's center (top views). Top views run along the
// street on the y axis.

import type { ItemType } from '../types'
import type { Ids } from './core'
import { ellipse, facing, limb, path, r2, rect } from './core'
import { shrub, shrubTop, tree, treeTop } from './nature'

/** `toward` is +1 if the arm reaches right (toward the street), -1 if left. */
export function streetLight(toward: 1 | -1): string {
  const t = toward
  let s = ellipse(0, 0, 0.6, 0.1, 'shadow')
  s += path('M-0.22 0 L-0.12 -16.8 L0.12 -16.8 L0.22 0 Z', 'pole')
  s += rect(-0.34, -0.7, 0.68, 0.7, 'pole', 'rx="0.08"')
  s += `<path d="M0 -16.6 Q0 -17.5 ${r2(t * 1.1)} -17.5 L${r2(t * 3.9)} -17.5" style="fill:none;stroke:var(--pvx-pole);stroke-width:0.17;stroke-linecap:round"/>`
  s += path(`M${r2(t * 3.2)} -17.7 L${r2(t * 5)} -17.7 Q${r2(t * 5.25)} -17.45 ${r2(t * 4.85)} -17.25 L${r2(t * 3.4)} -17.25 Z`, 'pole')
  s += rect(Math.min(t * 3.5, t * 4.7), -17.3, 1.2, 0.1, '#fff6d0')
  return s
}

/** How far a street light's arm reaches, in feet, so layout can keep it clear of things. */
export const STREET_LIGHT_REACH = 5.25

export function streetLightTop(toward: 1 | -1): string {
  return `<circle cx="0" cy="0" r="0.35" style="fill:var(--pvx-pole)"/>`
    + limb([[0, 0], [toward * 4.6, 0]], 'pole', 0.18)
    + rect(Math.min(toward * 3.4, toward * 5.1), -0.45, 1.7, 0.9, 'pole', 'rx="0.3"')
}

/** A precast concrete separator, 1.7 ft wide at the base and 2.25 ft tall. */
export function barrier(): string {
  return ellipse(0, 0, 1, 0.1, 'shadow')
    + path('M-0.85 0 L-0.75 -0.3 L-0.35 -2.1 Q-0.3 -2.25 -0.15 -2.25 L0.15 -2.25 Q0.3 -2.25 0.35 -2.1 L0.75 -0.3 L0.85 0 Z', 'concrete')
    + path('M0.05 -2.25 L0.15 -2.25 Q0.3 -2.25 0.35 -2.1 L0.75 -0.3 L0.85 0 L0.2 0 Z', 'concrete-shade')
}

/** A low post marking the property line on lawn frontages. */
export function fencePost(): string {
  return rect(-0.18, -3.2, 0.36, 3.2, 'concrete-shade', 'rx="0.05"') + rect(-0.24, -3.35, 0.48, 0.2, 'concrete')
}

/** A precast separator from above, as a run `len` feet long with joints every 10 ft. */
export function barrierTop(len: number): string {
  let s = rect(-0.55, -len / 2 + 0.3, 1.7, len, 'shadow') + rect(-0.85, -len / 2, 1.7, len, 'p-curb')
  for (let y = -len / 2 + 10; y < len / 2; y += 10)
    s += rect(-0.85, y, 1.7, 0.08, 'p-joint')
  return s
}

const METAL = '#5d6266'
const WOOD = '#a87b4f'

/** A bench seen end-on (it runs along the street): seat 1.5 ft up, back to 2.9 ft. */
export function bench(): string {
  return ellipse(0, 0, 1.0, 0.1, 'shadow')
    + limb([[-0.7, 0], [-0.55, -1.5], [-0.75, -2.9]], METAL, 0.12) + limb([[0.65, 0], [0.6, -1.5]], METAL, 0.12)
    + rect(-0.8, -1.62, 1.55, 0.2, WOOD, 'rx="0.05"') + rect(-0.92, -2.85, 0.22, 1.1, WOOD, 'rx="0.05"')
}

export function benchTop(): string {
  let s = rect(-0.5, -2.3, 1.6, 5, 'shadow', 'rx="0.15"') + rect(-0.8, -2.5, 1.6, 5, WOOD, 'rx="0.15"')
  for (let i = 1; i < 4; i++)
    s += rect(-0.8 + i * 0.4, -2.5, 0.05, 5, '#8a6340')
  return s
}

/** An inverted-U bike rack, 3 ft tall, seen face-on. */
export function bikeRack(): string {
  return ellipse(0, 0, 1.2, 0.08, 'shadow') + `<path d="M-0.95 0 V-2.4 Q-0.95 -3 0 -3 Q0.95 -3 0.95 -2.4 V0" style="fill:none;stroke:${METAL};stroke-width:0.16;stroke-linecap:round"/>`
}

export function bikeRackTop(): string {
  return rect(-0.95, 0.1, 1.9, 0.16, 'shadow') + rect(-0.95, -0.08, 1.9, 0.16, METAL, 'rx="0.08"')
}

/** A bollard, 3.3 ft tall, with a reflective band. */
export function bollard(): string {
  return ellipse(0, 0, 0.5, 0.08, 'shadow') + rect(-0.35, -3.3, 0.7, 3.3, '#4b5055', 'rx="0.3"')
    + rect(-0.35, -2.75, 0.7, 0.3, '#f2c14e') + rect(0.05, -3.3, 0.3, 3.3, 'rgba(0,0,0,0.15)', 'rx="0.15"')
}

export function bollardTop(): string {
  return `<circle cx="0.2" cy="0.2" r="0.35" style="fill:var(--pvx-shadow)"/><circle cx="0" cy="0" r="0.35" style="fill:#4b5055"/>`
}

/** A concrete planter, 3 ft square and 2 ft tall, with a shrub. */
export function planter(ids: Ids, seed: number): string {
  return rect(-1.5, -2, 3, 2, 'concrete') + rect(0.3, -2, 1.2, 2, 'concrete-shade') + `<g transform="translate(0 -1.9)">${shrub(ids, 2.6, 2.2, seed)}</g>`
}

export function planterTop(ids: Ids, seed: number): string {
  return rect(-1.2, -1.2, 3, 3, 'shadow') + rect(-1.5, -1.5, 3, 3, 'concrete') + shrubTop(ids, 2.4, seed)
}

/** A bus shelter seen end-on: roof at 8.5 ft over a glass back wall and a bench. */
export function transitShelter(toward: 1 | -1): string {
  const back = -toward * 2.3
  return ellipse(0, 0, 2.8, 0.12, 'shadow')
    + rect(Math.min(back, back - toward * 0.1), -8.2, 0.1, 8.2, METAL)
    + rect(back - (toward > 0 ? 0 : 0.15), -7.6, 0.15, 7.2, 'glass', 'opacity="0.55"')
    + limb([[toward * 2.4, 0], [toward * 2.4, -8.3]], METAL, 0.12)
    + path(`M${-2.8} -8.2 L2.8 -8.6 L2.8 -8.3 L-2.8 -7.9 Z`, METAL)
    + `<g transform="translate(${back + toward * 0.8} 0) scale(0.9)">${bench()}</g>`
}

export function transitShelterTop(): string {
  return rect(-2.4, -5.6, 5.6, 12, 'shadow') + rect(-2.8, -6, 5.6, 12, '#6e7378', 'opacity="0.85"') + '<rect x="-2.8" y="-6" width="5.6" height="12" style="fill:none;stroke:#3a3e42;stroke-width:0.12"/>'
}

/** A post-mounted sign, plate 2 ft square at 7 ft, seen face-on. */
export function sign(): string {
  return ellipse(0, 0, 0.4, 0.06, 'shadow') + rect(-0.08, -8, 0.16, 8, METAL)
    + rect(-1, -9.6, 2, 2, '#f4f4f2', 'rx="0.12"') + `<rect x="-0.9" y="-9.5" width="1.8" height="1.8" rx="0.08" style="fill:none;stroke:#1d1d1d;stroke-width:0.1"/>`
    + rect(-0.6, -9.0, 1.2, 0.18, '#1d1d1d') + rect(-0.6, -8.55, 1.2, 0.18, '#1d1d1d')
}

export function signTop(): string {
  return `<circle cx="0" cy="0" r="0.12" style="fill:${METAL}"/>` + rect(-1, -0.06, 2, 0.12, '#1d1d1d')
}

/** A wheel stop: a low concrete block 6 ft long, 0.5 ft tall, seen end-on. */
export function curbStop(): string {
  return path('M-0.4 0 L-0.3 -0.5 L0.3 -0.5 L0.4 0 Z', 'concrete')
}

export function curbStopTop(): string {
  return rect(-3, -0.25, 6, 0.5, 'p-curb') + rect(-3, 0.25, 6, 0.1, 'shadow')
}

/**
 * Any street item in front view. `toward` is +1 when the street is to the
 * item's right (a light's arm, a shelter's open side), -1 when to its left.
 */
export function streetItem(ids: Ids, type: ItemType, seed: number, toward: 1 | -1): string {
  switch (type) {
    case 'tree': return tree(ids, 22, seed)
    case 'street-light': return streetLight(toward)
    case 'barrier': return barrier()
    case 'bench': return bench()
    case 'bike-rack': return bikeRack()
    case 'bollard': return bollard()
    case 'planter': return planter(ids, seed)
    case 'transit-shelter': return transitShelter(toward)
    case 'sign': return sign()
    case 'curb-stop': return curbStop()
  }
}

/** Any street item from above. Barriers are drawn as runs with barrierTop(). */
export function streetItemTop(ids: Ids, type: ItemType, seed: number, toward: 1 | -1): string {
  switch (type) {
    case 'tree': return treeTop(ids, 22, seed)
    case 'street-light': return streetLightTop(toward)
    case 'barrier': return barrierTop(10)
    case 'bench': return benchTop()
    case 'bike-rack': return bikeRackTop()
    case 'bollard': return bollardTop()
    case 'planter': return planterTop(ids, seed)
    case 'transit-shelter': return transitShelterTop()
    case 'sign': return signTop()
    case 'curb-stop': return curbStopTop()
  }
}

// ---------------------------------------------------------------------------
// Pavement markings, in top view. Drawn for travel up the page (away from the
// reader) and turned with facing() for travel toward the reader.

const STENCIL = 'fill:none;stroke:var(--pvx-p-white);stroke-linecap:round;stroke-linejoin:round'

function bicycle(width: number): string {
  return `<circle cx="-1.05" cy="0" r="0.72" style="${STENCIL};stroke-width:${width}"/><circle cx="1.05" cy="0" r="0.72" style="${STENCIL};stroke-width:${width}"/>`
    + `<path d="M-1.05 0 L-0.3 -0.95 L0 0 Z M-0.3 -0.95 L0.75 -0.95 L1.05 0 M0 0 L0.75 -0.95 M0.75 -0.95 L0.62 -1.25 L0.9 -1.3 M-0.3 -0.95 L-0.42 -1.2 M-0.65 -1.22 L-0.2 -1.22" style="${STENCIL};stroke-width:${width}"/>`
}

/**
 * The bike lane symbol (MUTCD bicycle symbol): a bicycle in side view,
 * stretched 2.3 times along the lane so it reads upright to a rider coming
 * toward it. Pair it with laneArrow() ahead of it for the riding direction.
 * About 3.6 ft across and 4.9 ft long.
 */
export function bikeLaneSymbol(towardReader: boolean): string {
  return facing(!towardReader, `<g transform="scale(1 2.3)">${bicycle(0.2)}</g>`)
}

/**
 * A shared lane marking (sharrow) for lanes where bicycles and cars share
 * the lane: the bicycle with two chevrons ahead of it pointing the way.
 * About 3.6 ft across and 9.5 ft long.
 */
export function sharrow(towardReader: boolean): string {
  const chev = (y: number) => `<path d="M-1.4 ${r2(y + 1.1)} L0 ${r2(y)} L1.4 ${r2(y + 1.1)} L1.4 ${r2(y + 1.8)} L0 ${r2(y + 0.7)} L-1.4 ${r2(y + 1.8)} Z" style="fill:var(--pvx-p-white)"/>`
  return facing(!towardReader, `<g transform="translate(0 2.3) scale(1 2.3)">${bicycle(0.2)}</g>${chev(-4.6)}${chev(-2.7)}`)
}

/** A straight-ahead lane arrow, `len` feet long. */
export function laneArrow(len: number, towardReader: boolean): string {
  const h = len / 2
  return facing(!towardReader, `<path d="M-0.25 ${r2(h)} L0.25 ${r2(h)} L0.25 ${r2(-h + 2.2)} L1 ${r2(-h + 2.2)} L0 ${r2(-h)} L-1 ${r2(-h + 2.2)} L-0.25 ${r2(-h + 2.2)} Z" style="fill:var(--pvx-p-white)"/>`)
}
