// People: pedestrians (front view and top view) and cyclists. Feet, origin
// at the ground point.
//
// Every person is a plain silhouette in one figure tone (fig-a, fig-b or
// fig-c, picked from the seed so a group varies gently in Muted render), and
// everything they carry or ride (bicycle, stroller, wheelchair, cane, leash,
// cargo box, helmet) is fig-gear, so a rider reads apart from the bike. The
// tones are palette tokens (viewer-figures.css): in Drafting ink and Two-ink
// print all of them resolve to the same ink. No fixed colors here: every
// shape follows the drawing style and theme.

import type { PersonVariant } from '../types'
import { ellipse, facing, limb, path, pick, rect, rng } from './core'

/** Figure tones for pedestrians, darkest first in light mode. */
const TONES = ['fig-a', 'fig-b', 'fig-c'] as const
/** Riders and wheelchair users skip the tone nearest fig-gear so the person reads apart from the equipment. */
const RIDER = ['fig-b', 'fig-c'] as const
const GEAR = 'fig-gear'
/** A top-view figure gets a paper outline in Two-ink print (.po), where it may cross a dark lane. */
const PO = 'class="po"'

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
  /** The figure tone token for the whole body. */
  tone: string
  hairLong: boolean
  bag: boolean
}

function look(seed: number, tones: readonly string[] = TONES): Look {
  const r = rng(seed)
  return { tone: pick(tones, r), hairLong: r() < 0.45, bag: r() < 0.4 }
}

/** Another tone than `t`, for a second person in the same group. */
const otherTone = (t: string): string => TONES[(TONES.indexOf(t as typeof TONES[number]) + 1) % TONES.length]

function head(o: Look, y: number): string {
  let s = rect(-0.12, y + 0.27, 0.24, 0.4, o.tone)
  if (o.hairLong)
    s += path(`M-0.38 ${y - 0.03} Q-0.46 ${y + 0.62} -0.52 ${y + 0.87} L0.52 ${y + 0.87} Q0.46 ${y + 0.62} 0.38 ${y - 0.03} Z`, o.tone)
  return s + ellipse(0, y - 0.02, 0.35, 0.43, o.tone)
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
  const c = o.tone
  const legW = pose.dress ? 0.24 : 0.38
  let s = ellipse(0, 0, 0.95, 0.14, 'shadow')
  if (pose.running) {
    s += limb([[-0.17, -2.8], [-0.36, -1.45], [-0.42, -0.18]], c, legW) + ellipse(-0.45, -0.1, 0.22, 0.12, c)
    s += limb([[0.17, -2.8], [0.42, -1.9], [0.3, -1.15]], c, legW) + ellipse(0.33, -1.05, 0.23, 0.13, c)
  }
  else {
    s += limb([[-0.17, -2.8], [-0.24, -1.4], [-0.3, -0.18]], c, legW) + ellipse(-0.33, -0.1, 0.22, 0.12, c)
    s += limb([[0.17, -2.8], [0.27, -1.5], [0.24, -0.38]], c, legW) + ellipse(0.27, -0.28, 0.23, 0.13, c)
  }
  s += limb(pose.running ? [[-0.62, -4.35], [-0.92, -3.6], [-0.62, -3.25]] : [[-0.62, -4.35], [-0.8, -3.5], [-0.72, -2.75]], c, 0.25)
  s += pose.dress
    ? path('M-0.6 -4.55 Q-0.8 -4.5 -0.76 -4.2 L-0.55 -3.1 L-0.85 -1.55 L0.85 -1.55 L0.55 -3.1 L0.76 -4.2 Q0.8 -4.5 0.6 -4.55 Z', c)
    : path('M-0.6 -4.55 Q-0.8 -4.5 -0.76 -4.2 L-0.62 -2.5 L0.62 -2.5 L0.76 -4.2 Q0.8 -4.5 0.6 -4.55 Z', c)
  if (o.bag && !pose.running && !pose.hand)
    s += limb([[-0.5, -4.5], [0.5, -3.0]], c, 0.07) + rect(0.38, -3.35, 0.55, 0.65, c, 'rx="0.1"')
  let frontArm: [number, number][] = [[0.62, -4.35], [0.86, -3.6], [0.74, -2.85]]
  if (pose.running)
    frontArm = [[0.62, -4.35], [0.9, -3.75], [0.6, -4.15]]
  else if (pose.hand)
    frontArm = [[0.62, -4.35], [(0.62 + pose.hand[0]) / 2 + 0.12, (-4.35 + pose.hand[1]) / 2], pose.hand]
  if (pose.cane)
    s += limb([[0.78, -2.95], [0.98, 0]], GEAR, 0.09) + limb([[0.6, -3.0], [0.82, -2.95]], GEAR, 0.09)
  s += limb(frontArm, c, 0.25)
  s += head(o, -5.12)
  return `<g transform="scale(${(h / 5.6).toFixed(3)})">${s}</g>`
}

/** A wheelchair user facing the reader, seated (about 4.9 ft to the top of the head). */
function wheelchair(o: Look): string {
  const c = o.tone
  let s = ellipse(0, 0, 1.25, 0.15, 'shadow')
  // Push handles and backrest behind the person, then the big wheels at the sides.
  s += limb([[-0.72, -1.6], [-0.72, -3.15], [-0.5, -3.3]], GEAR, 0.1) + limb([[0.72, -1.6], [0.72, -3.15], [0.5, -3.3]], GEAR, 0.1)
  s += rect(-0.7, -3.1, 1.4, 1.25, GEAR, 'rx="0.12"')
  s += ellipse(-1.0, -1.0, 0.15, 1.0, GEAR) + ellipse(1.0, -1.0, 0.15, 1.0, GEAR)
  s += ellipse(-0.5, -0.22, 0.08, 0.22, GEAR) + ellipse(0.5, -0.22, 0.08, 0.22, GEAR)
  s += limb([[-0.85, -1.65], [0.85, -1.65]], GEAR, 0.1)
  s += rect(-0.5, -0.5, 1.0, 0.1, GEAR, 'rx="0.04"')
  // The person: shins, feet on the footrest, lap, torso, arms down to the rims.
  s += limb([[-0.24, -1.75], [-0.24, -0.62]], c, 0.3) + limb([[0.24, -1.75], [0.24, -0.62]], c, 0.3)
  s += ellipse(-0.26, -0.56, 0.2, 0.1, c) + ellipse(0.26, -0.56, 0.2, 0.1, c)
  s += rect(-0.58, -2.1, 1.16, 0.45, c, 'rx="0.15"')
  s += path('M-0.55 -3.85 Q-0.74 -3.8 -0.7 -3.55 L-0.55 -2.0 L0.55 -2.0 L0.7 -3.55 Q0.74 -3.8 0.55 -3.85 Z', c)
  s += limb([[-0.58, -3.65], [-0.84, -2.75], [-0.92, -1.9]], c, 0.23) + limb([[0.58, -3.65], [0.84, -2.75], [0.92, -1.9]], c, 0.23)
  return s + head({ ...o, hairLong: false }, -4.42)
}

/** A stroller seen from the front, about 3.4 ft tall to the handle. */
function stroller(): string {
  let s = ellipse(0, 0, 0.75, 0.1, 'shadow')
  s += limb([[-0.42, -0.25], [-0.36, -1.4]], GEAR, 0.08) + limb([[0.42, -0.25], [0.36, -1.4]], GEAR, 0.08)
  s += ellipse(-0.45, -0.22, 0.09, 0.22, GEAR) + ellipse(0.45, -0.22, 0.09, 0.22, GEAR)
  s += rect(-0.55, -2.35, 1.1, 1.0, GEAR, 'rx="0.3"')
  s += path('M-0.6 -2.25 Q-0.62 -3.25 0 -3.3 Q0.62 -3.25 0.6 -2.25 Z', GEAR)
  return s + limb([[-0.5, -3.35], [0.5, -3.35]], GEAR, 0.1)
}

/** A dog seen from the front, about 1.8 ft tall. */
function dog(): string {
  let s = ellipse(0, 0, 0.55, 0.08, 'shadow')
  s += limb([[-0.18, -0.9], [-0.2, -0.05]], GEAR, 0.13) + limb([[0.18, -0.9], [0.2, -0.05]], GEAR, 0.13)
  s += ellipse(0, -1.0, 0.36, 0.32, GEAR) + ellipse(0, -1.48, 0.24, 0.26, GEAR)
  return s + path('M-0.2 -1.62 L-0.36 -1.35 L-0.18 -1.4 Z M0.2 -1.62 L0.36 -1.35 L0.18 -1.4 Z', GEAR)
}

/** A pedestrian in front view, standing at the origin. */
export function pedestrian(variant: PedestrianVariant, seed: number): string {
  const o = look(seed, variant === 'wheelchair' ? RIDER : TONES)
  switch (variant) {
    case 'walker':
      return figure({ ...o, hairLong: false }, 5.6 + (seed % 5) * 0.06)
    case 'walker-dress':
      return figure({ ...o, hairLong: true }, 5.4 + (seed % 4) * 0.06, { dress: true })
    case 'wheelchair':
      return wheelchair(o)
    case 'cane':
      return figure({ ...o, bag: false }, 5.35, { cane: true })
    case 'runner':
      return figure({ ...o, bag: false, hairLong: false }, 5.7, { running: true })
    case 'adult-child': {
      const kid = { ...look(seed + 7), tone: otherTone(o.tone), bag: false, hairLong: false }
      return `<g transform="translate(-0.8 0)">${figure({ ...o, bag: false }, 5.7)}</g>`
        + limb([[-0.06, -2.88], [0.22, -2.4], [0.49, -1.85]], o.tone, 0.2)
        + `<g transform="translate(0.95 0)">${figure(kid, 3.6)}</g>`
    }
    case 'stroller':
      // The adult pushes from behind; seen from the front, the stroller stands beside the hand.
      return `<g transform="translate(-0.75 0)">${figure({ ...o, bag: false }, 5.6, { hand: [1.25, -3.35] })}</g>`
        + `<g transform="translate(1.0 0)">${stroller()}</g>`
    case 'dog-walker':
      return `<g transform="translate(-0.7 0)">${figure({ ...o, bag: false }, 5.6, { hand: [1.05, -2.9] })}</g>`
        + `<path d="M0.32 -2.9 Q0.9 -1.6 1.2 -1.25" style="fill:none;stroke:var(--pvx-${GEAR});stroke-width:0.05"/>`
        + `<g transform="translate(1.2 0)">${dog()}</g>`
  }
}

/** The variants that can be drawn crossing the street, seen from the side. */
export const CROSSING_POOL: readonly PedestrianVariant[] = ['walker', 'walker-dress', 'cane', 'wheelchair']

/** Width across the strip, in feet, that each side view needs (stride, cane, wheels). */
export const CROSSING_WIDTH: Partial<Record<PedestrianVariant, number>> = { 'walker': 1.7, 'walker-dress': 1.6, 'cane': 2.0, 'wheelchair': 2.6 }

/** A head in profile facing +x: nose forward, hair over the top and back. */
function headSide(o: Look, y: number): string {
  const c = o.tone
  let s = rect(-0.14, y + 0.27, 0.26, 0.4, c)
  s += ellipse(0.02, y, 0.31, 0.41, c)
  s += path(`M0.3 ${y - 0.02} L0.4 ${y + 0.1} L0.3 ${y + 0.14} Z`, c)
  return s + (o.hairLong
    ? path(`M0.3 ${y - 0.2} Q0.2 ${y - 0.5} -0.08 ${y - 0.46} Q-0.42 ${y - 0.4} -0.38 ${y + 0.1} L-0.44 ${y + 0.85} L-0.08 ${y + 0.85} L-0.06 ${y + 0.1} Q0.1 ${y - 0.22} 0.3 ${y - 0.2} Z`, c)
    : path(`M0.3 ${y - 0.2} Q0.2 ${y - 0.5} -0.08 ${y - 0.46} Q-0.42 ${y - 0.4} -0.34 ${y + 0.2} Q-0.2 ${y + 0.12} -0.08 ${y - 0.04} Q0.1 ${y - 0.22} 0.3 ${y - 0.2} Z`, c))
}

/** An adult walking toward +x, seen from the side, 5.6 ft before scaling to `h`. */
function figureSide(o: Look, h: number, pose: Pose = {}): string {
  const c = o.tone
  const legW = pose.dress ? 0.24 : 0.36
  let s = ellipse(0, 0, 0.95, 0.12, 'shadow')
  // Far leg behind, near leg ahead, mid-stride; shoes point forward.
  s += limb([[-0.02, -2.8], [-0.28, -1.45], [-0.5, -0.2]], c, legW) + ellipse(-0.38, -0.1, 0.24, 0.11, c)
  s += limb([[0.02, -2.8], [0.26, -1.5], [0.4, -0.2]], c, legW) + ellipse(0.52, -0.1, 0.24, 0.11, c)
  // The far arm swings forward (or holds the cane), the near arm back.
  s += limb([[0.02, -4.35], [0.22, -3.6], [0.42, -2.95]], c, 0.22)
  if (pose.cane)
    s += limb([[0.42, -2.98], [0.8, 0]], GEAR, 0.09) + limb([[0.3, -3.0], [0.46, -2.98]], GEAR, 0.09)
  s += pose.dress
    ? path('M-0.26 -4.6 Q-0.44 -4.5 -0.38 -4.1 L-0.32 -3.1 L-0.62 -1.55 L0.66 -1.55 L0.36 -3.1 L0.38 -4.0 Q0.38 -4.5 0.18 -4.6 Z', c)
    : path('M-0.26 -4.6 Q-0.44 -4.5 -0.38 -4.1 L-0.34 -2.5 L0.36 -2.5 L0.38 -4.0 Q0.38 -4.5 0.18 -4.6 Z', c)
  if (o.bag && !pose.cane)
    s += limb([[0.14, -4.5], [-0.3, -3.1]], c, 0.07) + rect(-0.62, -3.4, 0.42, 0.62, c, 'rx="0.1"')
  s += limb([[-0.02, -4.35], [-0.2, -3.6], [-0.38, -2.95]], c, 0.24)
  s += headSide(o, -5.12)
  return `<g transform="scale(${(h / 5.6).toFixed(3)})">${s}</g>`
}

/** A wheelchair user rolling toward +x, seen from the side (about 4.9 ft to the top of the head). */
function wheelchairSide(o: Look): string {
  const c = o.tone
  let s = ellipse(0, 0, 1.3, 0.13, 'shadow')
  // Frame: push handle, backrest, seat, footrest down to the caster.
  s += limb([[-0.95, -3.3], [-0.7, -3.25], [-0.62, -1.75], [0.55, -1.75], [0.72, -0.5]], GEAR, 0.1)
  s += ellipse(0.78, -0.18, 0.18, 0.18, GEAR)
  // Seated: thigh forward, shin down to the footrest, torso upright.
  s += limb([[-0.3, -1.95], [0.5, -1.95], [0.62, -0.62]], c, 0.36)
  s += ellipse(0.78, -0.55, 0.22, 0.1, c)
  s += path('M-0.5 -3.85 Q-0.66 -3.75 -0.6 -3.4 L-0.52 -1.95 L0.1 -1.95 L0.22 -3.3 Q0.24 -3.8 0.02 -3.85 Z', c)
  // The big wheel beside the body, its hub, and the hand on the rim.
  s += `<circle cx="-0.3" cy="-1.05" r="1.0" style="fill:none;stroke:var(--pvx-${GEAR});stroke-width:0.16"/>`
  s += limb([[-0.3, -0.25], [-0.3, -1.85]], GEAR, 0.05) + limb([[-1.1, -1.05], [0.5, -1.05]], GEAR, 0.05)
  s += `<circle cx="-0.3" cy="-1.05" r="0.14" style="fill:var(--pvx-${GEAR})"/>`
  s += limb([[-0.16, -3.65], [0.1, -2.75], [0.3, -1.85]], c, 0.22)
  return s + headSide({ ...o, hairLong: false }, -4.42)
}

/**
 * A pedestrian crossing the street, seen from the side and walking toward +x
 * (`towardRight`) or -x. For walkways cut at a crosswalk, where people walk
 * across the drawing rather than along the street. Only CROSSING_POOL variants
 * have a side view; anything else falls back to a walker.
 */
export function pedestrianSide(variant: PedestrianVariant, seed: number, towardRight: boolean): string {
  const o = look(seed, variant === 'wheelchair' ? RIDER : TONES)
  let s: string
  switch (variant) {
    case 'walker-dress':
      s = figureSide({ ...o, hairLong: true }, 5.4 + (seed % 4) * 0.06, { dress: true })
      break
    case 'cane':
      s = figureSide({ ...o, bag: false }, 5.35, { cane: true })
      break
    case 'wheelchair':
      s = wheelchairSide(o)
      break
    default:
      s = figureSide({ ...o, hairLong: false }, 5.6 + (seed % 5) * 0.06)
  }
  return towardRight ? s : `<g transform="scale(-1 1)">${s}</g>`
}

/** Shoulders and head from above; the head carries a thin ring so it reads against the shoulders. */
function personTopBody(tone: string): string {
  return ellipse(0.35, 0.35, 0.85, 0.45, 'shadow') + ellipse(0, 0, 0.8, 0.4, tone, PO)
    + `<circle cx="0" cy="0.08" r="0.33" style="fill:var(--pvx-${tone});stroke:var(--pvx-fig-sep);stroke-width:0.05"/>`
}

/** A pedestrian from above. `towardReader` is the walking direction. */
export function pedestrianTop(variant: PedestrianVariant, seed: number, towardReader: boolean): string {
  const o = look(seed, variant === 'wheelchair' ? RIDER : TONES)
  let s: string
  switch (variant) {
    case 'wheelchair':
      s = rect(-0.75, -1.0, 2.0, 2.6, 'shadow', 'rx="0.3"')
      s += rect(-1.12, -1.2, 0.2, 2.0, GEAR, 'rx="0.1"') + rect(0.92, -1.2, 0.2, 2.0, GEAR, 'rx="0.1"')
      s += rect(-0.8, -1.25, 1.6, 1.6, GEAR, `rx="0.2" ${PO}`)
      s += rect(-0.45, 0.35, 0.9, 0.95, GEAR, 'rx="0.15"')
      s += ellipse(0, -0.35, 0.72, 0.36, o.tone) + `<circle cx="0" cy="-0.28" r="0.31" style="fill:var(--pvx-${o.tone});stroke:var(--pvx-fig-sep);stroke-width:0.05"/>`
      break
    case 'adult-child':
      s = `<g transform="translate(-0.8 0)">${personTopBody(o.tone)}</g>`
        + `<g transform="translate(0.95 0.3) scale(0.68)">${personTopBody(otherTone(o.tone))}</g>`
      break
    case 'cane':
      s = personTopBody(o.tone) + `<circle cx="0.85" cy="0.55" r="0.09" style="fill:var(--pvx-${GEAR})"/>`
      break
    case 'runner':
      s = `<g transform="scale(0.95 1.12)">${personTopBody(o.tone)}</g>`
      break
    case 'stroller':
      s = personTopBody(o.tone) + rect(-0.6, 0.85, 1.2, 2.4, 'shadow', 'rx="0.3"') + rect(-0.55, 0.7, 1.1, 2.3, GEAR, `rx="0.35" ${PO}`)
      break
    case 'dog-walker':
      s = personTopBody(o.tone) + `<path d="M0.6 0.2 Q1.1 1.0 1.15 1.6" style="fill:none;stroke:var(--pvx-${GEAR});stroke-width:0.05"/>`
        + ellipse(1.15, 2.3, 0.32, 0.8, GEAR, PO) + ellipse(1.15, 1.45, 0.22, 0.25, GEAR)
      break
    default:
      s = personTopBody(o.tone)
  }
  return facing(towardReader, s)
}

/** A cyclist riding toward the reader (front) or away (rear). Commuters are about 6.6 ft tall. */
export function cyclist(seed: number, towardReader: boolean, variant: CyclistVariant = 'commuter'): string {
  const o = look(seed, RIDER)
  const c = o.tone
  let s = ellipse(0, 0, variant === 'cargo' ? 1.1 : 0.8, 0.14, 'shadow')
  // The bicycle: wheel seen edge-on, fork, head tube, handlebar.
  s += ellipse(0, -1.12, 0.17, 1.12, GEAR)
  s += limb([[-0.13, -1.1], [-0.1, -3.0]], GEAR, 0.1) + limb([[0.13, -1.1], [0.1, -3.0]], GEAR, 0.1)
  s += rect(-0.11, -3.35, 0.22, 0.45, GEAR, 'rx="0.05"')
  // The rider over it: legs on the pedals, torso, arms to the bar, head and helmet.
  s += limb([[-0.28, -3.9], [-0.5, -2.75], [-0.42, -1.55]], c, 0.36) + limb([[0.28, -3.9], [0.52, -2.95], [0.45, -2.05]], c, 0.36)
  s += ellipse(-0.42, -1.45, 0.2, 0.11, c) + ellipse(0.45, -1.95, 0.2, 0.11, c)
  s += path('M-0.5 -3.75 L-0.72 -5.25 Q-0.7 -5.45 -0.45 -5.45 L0.45 -5.45 Q0.7 -5.45 0.72 -5.25 L0.5 -3.75 Z', c)
  s += `<path d="M-0.85 -3.3 Q0 -3.45 0.85 -3.3" style="fill:none;stroke:var(--pvx-${GEAR});stroke-width:0.12;stroke-linecap:round"/>`
  s += limb([[-0.7, -5.2], [-0.84, -4.2], [-0.8, -3.32]], c, 0.23) + limb([[0.7, -5.2], [0.84, -4.2], [0.8, -3.32]], c, 0.23)
  s += rect(-0.11, -5.75, 0.22, 0.35, c)
  s += ellipse(0, -6.0, 0.32, 0.4, c)
  s += path('M-0.4 -5.95 Q-0.42 -6.55 0 -6.55 Q0.42 -6.55 0.4 -5.95 Z', GEAR)
  if (variant === 'cargo') {
    // A front box (seen ahead of the rider when coming toward the reader, behind when going away),
    // with a child riding in it.
    const box = rect(-1.15, -2.35, 2.3, 1.6, GEAR, 'rx="0.12"') + ellipse(-0.72, -0.35, 0.12, 0.35, GEAR) + ellipse(0.72, -0.35, 0.12, 0.35, GEAR)
    const kidTone = otherTone(c)
    const kid = rect(-0.3, -2.55, 0.6, 0.4, kidTone, 'rx="0.12"') + ellipse(0, -2.75, 0.24, 0.3, kidTone) + path('M-0.26 -2.73 Q-0.28 -3.15 0 -3.15 Q0.28 -3.15 0.26 -2.73 Z', GEAR)
    return towardReader ? s + kid + box : kid + box + s
  }
  return variant === 'child' ? `<g transform="scale(0.72)">${s}</g>` : s
}

/** A cyclist from above: 5.8 ft long (cargo bikes 8.5 ft). */
export function cyclistTop(seed: number, towardReader: boolean, variant: CyclistVariant = 'commuter'): string {
  const o = look(seed, RIDER)
  let s = rect(0.25, -2.6, 0.3, 5.8, 'shadow', 'rx="0.15"')
  s += rect(-0.09, -2.95, 0.18, 2.2, GEAR, 'rx="0.09"') + rect(-0.09, 0.75, 0.18, 2.2, GEAR, 'rx="0.09"')
  s += limb([[0, -1.6], [0, 1.9]], GEAR, 0.12)
  s += limb([[-0.8, 1.9], [0.8, 1.9]], GEAR, 0.12)
  s += limb([[-0.65, 0.4], [-0.78, 1.85]], o.tone, 0.2) + limb([[0.65, 0.4], [0.78, 1.85]], o.tone, 0.2)
  s += ellipse(0, 0.3, 0.78, 0.38, o.tone, PO)
  s += `<ellipse cx="0" cy="0.75" rx="0.32" ry="0.36" style="fill:var(--pvx-${GEAR});stroke:var(--pvx-fig-sep);stroke-width:0.05"/>`
  if (variant === 'cargo')
    s += rect(-1.05, 2.9, 2.5, 2.4, 'shadow', 'rx="0.2"') + rect(-1.15, 2.6, 2.3, 2.4, GEAR, `rx="0.2" ${PO}`)
      + `<circle cx="0" cy="3.6" r="0.3" style="fill:var(--pvx-${otherTone(o.tone)})"/>`
  if (variant === 'child')
    s = `<g transform="scale(0.72)">${s}</g>`
  return facing(towardReader, s)
}
