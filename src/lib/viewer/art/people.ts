// People: pedestrians (front view and top view) and cyclists. Feet, origin
// at the ground point. Each figure's colors come from a seed, so a drawing
// shows varied people that stay the same from one page load to the next.

import type { PersonVariant } from '../types'
import { ellipse, facing, limb, path, pick, rect, rng, shade } from './core'

const SKIN = ['#8d5524', '#b98260', '#c68e63', '#e2b591', '#f0c9a5', '#5c3a21'] as const
const HAIR = ['#1c1714', '#3b2b22', '#5f432b', '#8a5a33', '#d9b56a', '#9a9a96'] as const
const GRAY = ['#b8b6b0', '#d6d4ce', '#9a9a96'] as const
const SHIRT = ['#c4664a', '#4e7aa6', '#2f6f6a', '#7b4f8f', '#d08b2f', '#efc23a', '#5b6b3a', '#9b3b4f'] as const
const PANTS = ['#2f3a4a', '#334155', '#3a3a3a', '#557a52', '#6b5b4b', '#2b2f36'] as const
const SPORT = ['#e4572e', '#29a3a3', '#f2c14e', '#7a4fbf'] as const
const HELMET = ['#f2f2ee', '#e2a43a', '#c94f3d', '#3a6ea5'] as const
const FRAME = ['#c94f3d', '#2f6fa8', '#2b2b2b', '#5f8f4e'] as const
const DOG = ['#c8a26b', '#3b3029', '#e8e1d4', '#8a5a33'] as const

/** The data type's name for the same set (types.ts is the source). */
export type PedestrianVariant = PersonVariant

/** The variants picked at random for a sidewalk (the wheelchair user is placed on purpose). */
export const PEDESTRIAN_POOL: readonly PedestrianVariant[] = ['walker', 'walker-dress', 'adult-child', 'cane', 'stroller', 'dog-walker', 'runner']

/** Width across the strip, in feet, that each variant needs (for placement). */
export const PEDESTRIAN_WIDTH: Record<PedestrianVariant, number> = {
  'walker': 1.9,
  'walker-dress': 1.9,
  'adult-child': 3.3,
  'wheelchair': 2.4,
  'cane': 2.2,
  'stroller': 3.4,
  'dog-walker': 3.3,
  'runner': 2.2,
}

export type CyclistVariant = 'commuter' | 'child' | 'cargo'

/** Width across the lane, in feet, that each cyclist needs. */
export const CYCLIST_WIDTH: Record<CyclistVariant, number> = { commuter: 1.8, child: 1.4, cargo: 2.4 }

interface Look {
  skin: string
  hair: string
  shirt: string
  pants: string
  hairLong: boolean
  bag?: string
}

function look(seed: number): Look {
  const r = rng(seed)
  return { skin: pick(SKIN, r), hair: pick(HAIR, r), shirt: pick(SHIRT, r), pants: pick(PANTS, r), hairLong: r() < 0.45, bag: r() < 0.4 ? pick(['#3b3b3b', '#7a5236', '#2f4f6f'], r) : undefined }
}

function head(o: Look, y: number): string {
  const skinB = shade(o.skin, -0.18)
  let s = rect(-0.12, y + 0.27, 0.24, 0.4, skinB)
  if (o.hairLong)
    s += path(`M-0.38 ${y - 0.03} Q-0.46 ${y + 0.62} -0.52 ${y + 0.87} L0.52 ${y + 0.87} Q0.46 ${y + 0.62} 0.38 ${y - 0.03} Z`, o.hair)
  s += ellipse(0, y, 0.33, 0.41, o.skin)
  s += path(`M-0.35 ${y + 0.07} Q-0.4 ${y - 0.48} 0 ${y - 0.46} Q0.4 ${y - 0.48} 0.35 ${y + 0.07} Q0.28 ${y - 0.18} 0 ${y - 0.24} Q-0.28 ${y - 0.18} -0.35 ${y + 0.07} Z`, o.hair)
  return s
}

interface Pose {
  dress?: boolean
  /** Holding a cane in the front hand. */
  cane?: boolean
  /** Mid-stride running: knee up, elbows bent. */
  running?: boolean
  /** Where the front hand reaches (a stroller handle, a leash), in unscaled feet. */
  hand?: [number, number]
}

/** A standing adult facing the reader, 5.6 ft before scaling to `h`. */
function figure(o: Look, h: number, pose: Pose = {}): string {
  const skinB = shade(o.skin, -0.18)
  const legC = pose.dress ? o.skin : o.pants
  const legW = pose.dress ? 0.24 : 0.38
  let s = ellipse(0, 0, 0.95, 0.14, 'shadow')
  if (pose.running) {
    s += limb([[-0.17, -2.8], [-0.36, -1.45], [-0.42, -0.18]], shade(legC, -0.2), legW)
    s += ellipse(-0.45, -0.1, 0.22, 0.12, '#f2f2ee')
    s += limb([[0.17, -2.8], [0.42, -1.9], [0.3, -1.15]], legC, legW)
    s += ellipse(0.33, -1.05, 0.23, 0.13, '#f2f2ee')
  }
  else {
    s += limb([[-0.17, -2.8], [-0.24, -1.4], [-0.3, -0.18]], shade(legC, -0.2), legW)
    s += ellipse(-0.33, -0.1, 0.22, 0.12, '#2b2b2b')
    s += limb([[0.17, -2.8], [0.27, -1.5], [0.24, -0.38]], legC, legW)
    s += ellipse(0.27, -0.28, 0.23, 0.13, '#2b2b2b')
  }
  const backArm: [number, number][] = pose.running ? [[-0.62, -4.35], [-0.92, -3.6], [-0.62, -3.25]] : [[-0.62, -4.35], [-0.8, -3.5], [-0.72, -2.75]]
  s += limb(backArm, skinB, 0.24)
  s += limb([[-0.62, -4.35], [-0.72, -3.85]], shade(o.shirt, -0.2), 0.3)
  if (pose.dress) {
    s += path('M-0.6 -4.55 Q-0.8 -4.5 -0.76 -4.2 L-0.55 -3.1 L-0.85 -1.55 L0.85 -1.55 L0.55 -3.1 L0.76 -4.2 Q0.8 -4.5 0.6 -4.55 Z', o.shirt)
    s += path('M0.15 -4.55 L0.6 -4.55 Q0.8 -4.5 0.76 -4.2 L0.55 -3.1 L0.85 -1.55 L0.3 -1.55 Z', 'rgba(0,0,0,0.12)')
  }
  else {
    s += path('M-0.6 -2.9 L0.6 -2.9 L0.62 -2.5 L-0.62 -2.5 Z', o.pants)
    s += path('M-0.6 -4.55 Q-0.8 -4.5 -0.76 -4.2 L-0.58 -2.75 L0.58 -2.75 L0.76 -4.2 Q0.8 -4.5 0.6 -4.55 Z', o.shirt)
    s += path('M0.15 -4.55 L0.6 -4.55 Q0.8 -4.5 0.76 -4.2 L0.58 -2.75 L0.25 -2.75 Z', 'rgba(0,0,0,0.12)')
  }
  if (o.bag && !pose.running && !pose.hand) {
    s += limb([[-0.5, -4.5], [0.5, -3.0]], shade(o.bag, -0.2), 0.07)
    s += rect(0.38, -3.35, 0.55, 0.65, o.bag, 'rx="0.1"')
  }
  let frontArm: [number, number][] = [[0.62, -4.35], [0.86, -3.6], [0.74, -2.85]]
  if (pose.running)
    frontArm = [[0.62, -4.35], [0.9, -3.75], [0.6, -4.15]]
  else if (pose.hand)
    frontArm = [[0.62, -4.35], [(0.62 + pose.hand[0]) / 2 + 0.12, (-4.35 + pose.hand[1]) / 2], pose.hand]
  if (pose.cane)
    s += limb([[0.78, -2.95], [0.98, 0]], '#4a3a2c', 0.09) + limb([[0.6, -3.0], [0.82, -2.95]], '#4a3a2c', 0.09)
  s += limb(frontArm, o.skin, 0.25)
  s += limb([frontArm[0], [frontArm[0][0] + (frontArm[1][0] - frontArm[0][0]) * 0.5, frontArm[0][1] + (frontArm[1][1] - frontArm[0][1]) * 0.5]], o.shirt, 0.31)
  s += head(o, -5.12)
  return `<g transform="scale(${(h / 5.6).toFixed(3)})">${s}</g>`
}

/** A wheelchair user facing the reader, seated (about 4.9 ft to the top of the head). */
function wheelchair(o: Look): string {
  const skinB = shade(o.skin, -0.18)
  let s = ellipse(0, 0, 1.25, 0.15, 'shadow')
  s += limb([[-0.72, -1.6], [-0.72, -3.15], [-0.6, -3.25]], '#4b5055', 0.09) + limb([[0.72, -1.6], [0.72, -3.15], [0.6, -3.25]], '#4b5055', 0.09)
  s += rect(-0.7, -3.1, 1.4, 1.25, '#3a3e42', 'rx="0.12"')
  for (const x of [-0.98, 0.98])
    s += ellipse(x, -1.0, 0.13, 1.0, '#262626') + `<ellipse cx="${x}" cy="-1" rx="0.05" ry="0.82" style="fill:none;stroke:#a7adb2;stroke-width:0.05"/>`
  s += ellipse(-0.5, -0.22, 0.07, 0.22, '#262626') + ellipse(0.5, -0.22, 0.07, 0.22, '#262626')
  s += limb([[-0.8, -1.65], [0.8, -1.65]], '#4b5055', 0.1)
  s += rect(-0.5, -0.5, 1.0, 0.1, '#4b5055', 'rx="0.04"')
  s += limb([[-0.24, -1.75], [-0.24, -0.62]], shade(o.pants, -0.15), 0.3) + limb([[0.24, -1.75], [0.24, -0.62]], o.pants, 0.3)
  s += ellipse(-0.26, -0.56, 0.2, 0.1, '#2b2b2b') + ellipse(0.26, -0.56, 0.2, 0.1, '#2b2b2b')
  s += rect(-0.58, -2.1, 1.16, 0.45, o.pants, 'rx="0.15"')
  s += path('M-0.55 -3.85 Q-0.74 -3.8 -0.7 -3.55 L-0.55 -2.0 L0.55 -2.0 L0.7 -3.55 Q0.74 -3.8 0.55 -3.85 Z', o.shirt)
  s += path('M0.12 -3.85 L0.55 -3.85 Q0.74 -3.8 0.7 -3.55 L0.55 -2.0 L0.22 -2.0 Z', 'rgba(0,0,0,0.12)')
  s += limb([[-0.58, -3.65], [-0.84, -2.75], [-0.95, -1.9]], skinB, 0.22) + limb([[0.58, -3.65], [0.84, -2.75], [0.95, -1.9]], o.skin, 0.22)
  s += limb([[-0.58, -3.65], [-0.7, -3.2]], shade(o.shirt, -0.2), 0.28) + limb([[0.58, -3.65], [0.7, -3.2]], o.shirt, 0.28)
  s += head({ ...o, hairLong: false }, -4.42)
  return s
}

/** A stroller seen from the front, about 3.4 ft tall to the handle. */
function stroller(color: string): string {
  let s = ellipse(0, 0, 0.75, 0.1, 'shadow')
  s += limb([[-0.42, -0.25], [-0.36, -1.4]], '#4b5055', 0.08) + limb([[0.42, -0.25], [0.36, -1.4]], '#4b5055', 0.08)
  s += ellipse(-0.45, -0.22, 0.09, 0.22, '#262626') + ellipse(0.45, -0.22, 0.09, 0.22, '#262626')
  s += rect(-0.55, -2.35, 1.1, 1.0, color, 'rx="0.3"')
  s += path('M-0.6 -2.25 Q-0.62 -3.25 0 -3.3 Q0.62 -3.25 0.6 -2.25 Z', shade(color, -0.2))
  s += ellipse(0, -2.15, 0.28, 0.24, '#f0c9a5')
  s += limb([[-0.5, -3.35], [0.5, -3.35]], '#3a3a3a', 0.1)
  return s
}

/** A dog seen from the front, about 1.8 ft tall. */
function dog(color: string): string {
  const dk = shade(color, -0.25)
  let s = ellipse(0, 0, 0.55, 0.08, 'shadow')
  s += limb([[-0.18, -0.9], [-0.2, -0.05]], dk, 0.13) + limb([[0.18, -0.9], [0.2, -0.05]], dk, 0.13)
  s += ellipse(0, -1.0, 0.36, 0.32, color)
  s += ellipse(0, -1.48, 0.24, 0.26, color)
  s += path('M-0.2 -1.62 L-0.36 -1.35 L-0.18 -1.4 Z M0.2 -1.62 L0.36 -1.35 L0.18 -1.4 Z', dk)
  s += ellipse(0, -1.36, 0.08, 0.06, '#1d1d1d')
  s += rect(-0.18, -1.25, 0.36, 0.06, '#c0392b')
  return s
}

/** A pedestrian in front view, standing at the origin. */
export function pedestrian(variant: PedestrianVariant, seed: number): string {
  const o = look(seed)
  const r = rng(seed + 3)
  switch (variant) {
    case 'walker':
      return figure({ ...o, hairLong: false }, 5.6 + (seed % 5) * 0.06)
    case 'walker-dress':
      return figure({ ...o, hairLong: true }, 5.4 + (seed % 4) * 0.06, { dress: true })
    case 'wheelchair':
      return wheelchair(o)
    case 'cane':
      return figure({ ...o, hair: pick(GRAY, r), bag: undefined }, 5.35, { cane: true })
    case 'runner':
      return figure({ ...o, shirt: pick(SPORT, r), pants: '#2b2f36', bag: undefined, hairLong: false }, 5.7, { running: true })
    case 'adult-child': {
      const kid = look(seed + 7)
      return `<g transform="translate(-0.8 0)">${figure({ ...o, bag: undefined }, 5.7)}</g>`
        + limb([[-0.06, -2.88], [0.22, -2.4], [0.49, -1.85]], o.skin, 0.2)
        + `<g transform="translate(0.95 0)">${figure({ ...kid, skin: o.skin, bag: undefined, hairLong: false }, 3.6)}</g>`
    }
    case 'stroller':
      // The adult pushes from behind; seen from the front, the stroller stands beside the hand.
      return `<g transform="translate(-0.75 0)">${figure({ ...o, bag: undefined }, 5.6, { hand: [1.25, -3.35] })}</g>`
        + `<g transform="translate(1.0 0)">${stroller(pick(['#3a6ea5', '#5b6b3a', '#9b3b4f', '#4a4a4a'], r))}</g>`
    case 'dog-walker':
      return `<g transform="translate(-0.7 0)">${figure({ ...o, bag: undefined }, 5.6, { hand: [1.05, -2.9] })}</g>`
        + `<path d="M0.32 -2.9 Q0.9 -1.6 1.2 -1.25" style="fill:none;stroke:#2b2b2b;stroke-width:0.05"/>`
        + `<g transform="translate(1.2 0)">${dog(pick(DOG, r))}</g>`
  }
}

/** The variants that can be drawn crossing the street, seen from the side. */
export const CROSSING_POOL: readonly PedestrianVariant[] = ['walker', 'walker-dress', 'cane', 'wheelchair']

/** Width across the strip, in feet, that each side view needs (stride, cane, wheels). */
export const CROSSING_WIDTH: Partial<Record<PedestrianVariant, number>> = { 'walker': 1.7, 'walker-dress': 1.6, 'cane': 2.0, 'wheelchair': 2.6 }

/** A head in profile facing +x: nose forward, hair over the top and back. */
function headSide(o: Look, y: number): string {
  let s = rect(-0.14, y + 0.27, 0.26, 0.4, shade(o.skin, -0.18))
  s += ellipse(0.02, y, 0.31, 0.41, o.skin)
  s += path(`M0.3 ${y - 0.02} L0.4 ${y + 0.1} L0.3 ${y + 0.14} Z`, o.skin)
  s += o.hairLong
    ? path(`M0.3 ${y - 0.2} Q0.2 ${y - 0.5} -0.08 ${y - 0.46} Q-0.42 ${y - 0.4} -0.38 ${y + 0.1} L-0.44 ${y + 0.85} L-0.08 ${y + 0.85} L-0.06 ${y + 0.1} Q0.1 ${y - 0.22} 0.3 ${y - 0.2} Z`, o.hair)
    : path(`M0.3 ${y - 0.2} Q0.2 ${y - 0.5} -0.08 ${y - 0.46} Q-0.42 ${y - 0.4} -0.34 ${y + 0.2} Q-0.2 ${y + 0.12} -0.08 ${y - 0.04} Q0.1 ${y - 0.22} 0.3 ${y - 0.2} Z`, o.hair)
  return s
}

/** An adult walking toward +x, seen from the side, 5.6 ft before scaling to `h`. */
function figureSide(o: Look, h: number, pose: Pose = {}): string {
  const skinB = shade(o.skin, -0.18)
  const legC = pose.dress ? o.skin : o.pants
  const legW = pose.dress ? 0.24 : 0.36
  let s = ellipse(0, 0, 0.95, 0.12, 'shadow')
  // Far leg behind, near leg ahead, mid-stride; shoes point forward.
  s += limb([[-0.02, -2.8], [-0.28, -1.45], [-0.5, -0.2]], shade(legC, -0.2), legW)
  s += ellipse(-0.38, -0.1, 0.24, 0.11, '#2b2b2b')
  s += limb([[0.02, -2.8], [0.26, -1.5], [0.4, -0.2]], legC, legW)
  s += ellipse(0.52, -0.1, 0.24, 0.11, '#2b2b2b')
  // The far arm swings forward (or holds the cane), the near arm back.
  const farArm: [number, number][] = [[0.02, -4.35], [0.22, -3.6], [0.42, -2.95]]
  s += limb(farArm, skinB, 0.22)
  if (pose.cane)
    s += limb([[0.42, -2.98], [0.8, 0]], '#4a3a2c', 0.09) + limb([[0.3, -3.0], [0.46, -2.98]], '#4a3a2c', 0.09)
  if (pose.dress) {
    s += path('M-0.26 -4.6 Q-0.44 -4.5 -0.38 -4.1 L-0.32 -3.1 L-0.62 -1.55 L0.66 -1.55 L0.36 -3.1 L0.38 -4.0 Q0.38 -4.5 0.18 -4.6 Z', o.shirt)
  }
  else {
    s += path('M-0.32 -2.95 L0.34 -2.95 L0.36 -2.5 L-0.34 -2.5 Z', o.pants)
    s += path('M-0.26 -4.6 Q-0.44 -4.5 -0.38 -4.1 L-0.32 -2.75 L0.34 -2.75 L0.38 -4.0 Q0.38 -4.5 0.18 -4.6 Z', o.shirt)
  }
  if (o.bag && !pose.cane) {
    s += limb([[0.14, -4.5], [-0.3, -3.1]], shade(o.bag, -0.2), 0.07)
    s += rect(-0.62, -3.4, 0.42, 0.62, o.bag, 'rx="0.1"')
  }
  const nearArm: [number, number][] = [[-0.02, -4.35], [-0.2, -3.6], [-0.38, -2.95]]
  s += limb(nearArm, o.skin, 0.24)
  s += limb([nearArm[0], [-0.11, -3.97]], o.shirt, 0.3)
  s += headSide(o, -5.12)
  return `<g transform="scale(${(h / 5.6).toFixed(3)})">${s}</g>`
}

/** A wheelchair user rolling toward +x, seen from the side (about 4.9 ft to the top of the head). */
function wheelchairSide(o: Look): string {
  let s = ellipse(0, 0, 1.3, 0.13, 'shadow')
  // Frame: backrest, seat, footrest down to the caster.
  s += limb([[-0.7, -3.25], [-0.62, -1.75], [0.55, -1.75], [0.72, -0.5]], '#4b5055', 0.1)
  s += ellipse(0.78, -0.18, 0.18, 0.18, '#262626')
  // Seated: thigh forward, shin down to the footrest, torso upright.
  s += limb([[-0.3, -1.95], [0.5, -1.95], [0.62, -0.62]], o.pants, 0.36)
  s += ellipse(0.78, -0.55, 0.22, 0.1, '#2b2b2b')
  s += path('M-0.5 -3.85 Q-0.66 -3.75 -0.6 -3.4 L-0.52 -1.95 L0.1 -1.95 L0.22 -3.3 Q0.24 -3.8 0.02 -3.85 Z', o.shirt)
  // The big wheel in front of the body, its push rim, and the hand on it.
  s += `<circle cx="-0.3" cy="-1.05" r="1.02" style="fill:none;stroke:#262626;stroke-width:0.14"/>`
  s += `<circle cx="-0.3" cy="-1.05" r="0.86" style="fill:none;stroke:#a7adb2;stroke-width:0.05"/>`
  s += limb([[-0.3, -1.05], [-0.3, -0.2], [-0.3, -1.9]], '#a7adb2', 0.03)
  s += limb([[-0.16, -3.65], [0.1, -2.75], [0.3, -1.85]], o.skin, 0.22)
  s += limb([[-0.16, -3.65], [-0.04, -3.25]], o.shirt, 0.28)
  s += headSide({ ...o, hairLong: false }, -4.42)
  return s
}

/**
 * A pedestrian crossing the street, seen from the side and walking toward +x
 * (`towardRight`) or -x. For walkways cut at a crosswalk, where people walk
 * across the drawing rather than along the street. Only CROSSING_POOL variants
 * have a side view; anything else falls back to a walker.
 */
export function pedestrianSide(variant: PedestrianVariant, seed: number, towardRight: boolean): string {
  const o = look(seed)
  const r = rng(seed + 3)
  let s: string
  switch (variant) {
    case 'walker-dress':
      s = figureSide({ ...o, hairLong: true }, 5.4 + (seed % 4) * 0.06, { dress: true })
      break
    case 'cane':
      s = figureSide({ ...o, hair: pick(GRAY, r), bag: undefined }, 5.35, { cane: true })
      break
    case 'wheelchair':
      s = wheelchairSide(o)
      break
    default:
      s = figureSide({ ...o, hairLong: false }, 5.6 + (seed % 5) * 0.06)
  }
  return towardRight ? s : `<g transform="scale(-1 1)">${s}</g>`
}

function personTopBody(shirt: string, hair: string): string {
  return ellipse(0.35, 0.35, 0.85, 0.45, 'shadow') + ellipse(0, 0, 0.8, 0.4, shirt) + `<circle cx="0" cy="0.08" r="0.33" style="fill:${hair}"/>`
}

/** A pedestrian from above. `towardReader` is the walking direction. */
export function pedestrianTop(variant: PedestrianVariant, seed: number, towardReader: boolean): string {
  const o = look(seed)
  const r = rng(seed + 3)
  let s: string
  switch (variant) {
    case 'wheelchair':
      s = rect(-0.75, -1.0, 2.0, 2.6, 'shadow', 'rx="0.3"')
      s += rect(-1.12, -1.2, 0.2, 2.0, '#262626', 'rx="0.1"') + rect(0.92, -1.2, 0.2, 2.0, '#262626', 'rx="0.1"')
      s += rect(-0.8, -1.25, 1.6, 1.6, '#3a3e42', 'rx="0.2"')
      s += rect(-0.45, 0.35, 0.9, 0.95, '#555a60', 'rx="0.15"')
      s += ellipse(0, -0.35, 0.72, 0.36, o.shirt) + `<circle cx="0" cy="-0.28" r="0.31" style="fill:${o.hair}"/>`
      break
    case 'adult-child': {
      const kid = look(seed + 7)
      s = `<g transform="translate(-0.8 0)">${personTopBody(o.shirt, o.hair)}</g>`
        + `<g transform="translate(0.95 0.3) scale(0.68)">${personTopBody(kid.shirt, kid.hair)}</g>`
      break
    }
    case 'cane':
      s = personTopBody(o.shirt, pick(GRAY, r)) + `<circle cx="0.85" cy="0.55" r="0.09" style="fill:#4a3a2c"/>`
      break
    case 'runner':
      s = `<g transform="scale(0.95 1.12)">${personTopBody(pick(SPORT, r), o.hair)}</g>`
      break
    case 'stroller': {
      const c = pick(['#3a6ea5', '#5b6b3a', '#9b3b4f', '#4a4a4a'], r)
      s = personTopBody(o.shirt, o.hair) + rect(-0.6, 0.85, 1.2, 2.4, 'shadow', 'rx="0.3"') + rect(-0.55, 0.7, 1.1, 2.3, c, 'rx="0.35"') + rect(-0.5, 0.7, 1.0, 0.9, shade(c, -0.2), 'rx="0.35"')
      break
    }
    case 'dog-walker': {
      const d = pick(DOG, r)
      s = personTopBody(o.shirt, o.hair) + `<path d="M0.6 0.2 Q1.1 1.0 1.15 1.6" style="fill:none;stroke:#2b2b2b;stroke-width:0.05"/>` + ellipse(1.15, 2.3, 0.32, 0.8, d) + ellipse(1.15, 1.45, 0.22, 0.25, shade(d, -0.15))
      break
    }
    default:
      s = personTopBody(o.shirt, o.hair)
  }
  return facing(towardReader, s)
}

/** A cyclist riding toward the reader (front) or away (rear). Commuters are about 6.6 ft tall. */
export function cyclist(seed: number, towardReader: boolean, variant: CyclistVariant = 'commuter'): string {
  const r = rng(seed)
  const o = look(seed)
  const helmet = pick(HELMET, r)
  const frame = pick(FRAME, r)
  const skinB = shade(o.skin, -0.18)
  let s = ellipse(0, 0, variant === 'cargo' ? 1.1 : 0.8, 0.14, 'shadow')
  s += limb([[-0.28, -3.9], [-0.5, -2.75], [-0.42, -1.55]], shade(o.pants, -0.2), 0.36)
  s += limb([[0.28, -3.9], [0.52, -2.95], [0.45, -2.05]], o.pants, 0.36)
  s += ellipse(-0.42, -1.45, 0.2, 0.11, '#2b2b2b') + ellipse(0.45, -1.95, 0.2, 0.11, '#2b2b2b')
  s += path('M-0.5 -3.75 L-0.72 -5.25 Q-0.7 -5.45 -0.45 -5.45 L0.45 -5.45 Q0.7 -5.45 0.72 -5.25 L0.5 -3.75 Z', o.shirt)
  s += path('M0.12 -5.45 L0.45 -5.45 Q0.7 -5.45 0.72 -5.25 L0.5 -3.75 L0.2 -3.75 Z', 'rgba(0,0,0,0.12)')
  s += ellipse(0, -1.12, 0.17, 1.12, '#262626')
  s += limb([[-0.13, -1.1], [-0.1, -3.0]], '#5d6266', 0.1) + limb([[0.13, -1.1], [0.1, -3.0]], '#5d6266', 0.1)
  s += rect(-0.11, -3.35, 0.22, 0.45, frame, 'rx="0.05"')
  s += towardReader ? rect(-0.12, -3.2, 0.24, 0.14, '#f6f2df', 'rx="0.04"') : rect(-0.1, -2.3, 0.2, 0.28, '#c0392b', 'rx="0.04"')
  s += '<path d="M-0.85 -3.3 Q0 -3.45 0.85 -3.3" style="fill:none;stroke:#333;stroke-width:0.12;stroke-linecap:round"/>'
  s += limb([[-0.7, -5.2], [-0.84, -4.2], [-0.8, -3.32]], skinB, 0.22) + limb([[0.7, -5.2], [0.84, -4.2], [0.8, -3.32]], o.skin, 0.22)
  s += limb([[-0.7, -5.2], [-0.78, -4.75]], shade(o.shirt, -0.2), 0.28) + limb([[0.7, -5.2], [0.78, -4.75]], o.shirt, 0.28)
  s += rect(-0.11, -5.75, 0.22, 0.35, skinB)
  s += ellipse(0, -6.0, 0.32, 0.4, towardReader ? o.skin : o.hair)
  s += path('M-0.4 -5.95 Q-0.42 -6.55 0 -6.55 Q0.42 -6.55 0.4 -5.95 Z', helmet)
  if (variant === 'cargo') {
    // A front box (seen ahead of the rider when coming toward the reader, behind when going away),
    // with a child riding in it.
    const box = `${rect(-1.15, -2.35, 2.3, 1.6, '#a87b4f', 'rx="0.12"')}${rect(-1.15, -2.35, 2.3, 0.18, '#8a6340')}${rect(-1.15, -1.25, 2.3, 0.12, '#8a6340')}`
      + `${ellipse(-0.72, -0.35, 0.12, 0.35, '#262626')}${ellipse(0.72, -0.35, 0.12, 0.35, '#262626')}`
    const kid = `${ellipse(0, -2.7, 0.24, 0.3, o.skin)}${path('M-0.26 -2.68 Q-0.28 -3.1 0 -3.1 Q0.28 -3.1 0.26 -2.68 Z', pick(HELMET, r))}`
    return towardReader ? s + kid + box : kid + box + s
  }
  return variant === 'child' ? `<g transform="scale(0.72)">${s}</g>` : s
}

/** A cyclist from above: 5.8 ft long (cargo bikes 8.5 ft). */
export function cyclistTop(seed: number, towardReader: boolean, variant: CyclistVariant = 'commuter'): string {
  const r = rng(seed)
  const o = look(seed)
  const helmet = pick(HELMET, r)
  let s = rect(0.25, -2.6, 0.3, 5.8, 'shadow', 'rx="0.15"')
  s += rect(-0.09, -2.95, 0.18, 2.2, '#262626', 'rx="0.09"') + rect(-0.09, 0.75, 0.18, 2.2, '#262626', 'rx="0.09"')
  s += limb([[0, -1.6], [0, 1.9]], '#5d6266', 0.12)
  s += limb([[-0.8, 1.9], [0.8, 1.9]], '#333333', 0.12)
  s += limb([[-0.65, 0.4], [-0.78, 1.85]], shade(o.shirt, -0.15), 0.2) + limb([[0.65, 0.4], [0.78, 1.85]], shade(o.shirt, -0.15), 0.2)
  s += ellipse(0, 0.3, 0.78, 0.38, o.shirt)
  s += ellipse(0, 0.75, 0.32, 0.36, helmet)
  if (variant === 'cargo')
    s += rect(-1.05, 2.9, 2.5, 2.4, 'shadow', 'rx="0.2"') + rect(-1.15, 2.6, 2.3, 2.4, '#a87b4f', 'rx="0.2"') + `<circle cx="0" cy="3.6" r="0.3" style="fill:${pick(HELMET, r)}"/>`
  if (variant === 'child')
    s = `<g transform="scale(0.72)">${s}</g>`
  return facing(towardReader, s)
}
