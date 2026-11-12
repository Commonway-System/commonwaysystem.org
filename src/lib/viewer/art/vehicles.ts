// Vehicles, front or rear view (toward or away from the reader) and top view.
// Feet, origin at the ground point (front) or the center (top).
//
// Plain, quiet shapes: one body color from the palette (car-a .. car-d, picked
// by seed), glass, tires and lamps, at most one darker band low on the body,
// no highlights. Every color is a palette token (viewer-figures.css), so the
// drawing style decides it: Muted render paints the bodies, Drafting ink
// turns them to paper with an ink outline (class "o"), Two-ink print fills
// them with the dark ink. Top views read car-top / car-top-glass first,
// because in Two-ink print the road under them is the dark ink too.

import { ellipse, facing, path, pick, rect, rng } from './core'

const BODY = ['car-a', 'car-b', 'car-c', 'car-d'] as const

export type VehicleVariant = 'sedan' | 'suv' | 'bus' | 'truck'

/** Width across the lane, feet. */
export const VEHICLE_WIDTH: Record<VehicleVariant, number> = { sedan: 6, suv: 6.5, bus: 8.5, truck: 8 }

/** Length along the street, feet (top views). */
export const VEHICLE_LENGTH: Record<VehicleVariant, number> = { sedan: 15, suv: 16, bus: 40, truck: 24 }

/** Body color token for a seed, shared by the front and top views of the same car. */
export const carColor = (seed: number): string => pick(BODY, rng(seed))

const O = 'class="o"'
const GLASS = 'car-glass'
/** A top-view fill: the top-view override if the style sets one, else the front-view token. */
const top = (token: string): string => `var(--pvx-car-top,var(--pvx-${token}))`
const TOP_GLASS = 'var(--pvx-car-top-glass,var(--pvx-car-glass))'

/** Front views of cars are drawn 15 units to the foot, the mockup's grid, then scaled down. */
const grid = (inner: string): string => `<g transform="scale(0.0667)">${inner}</g>`

function lamps(towardReader: boolean, x: number, y: number, w: number, h: number, rx = 0.15): string {
  const c = towardReader ? 'lamp-front' : 'lamp-rear'
  return rect(-x - w, y, w, h, c, `rx="${rx}" ${O}`) + rect(x, y, w, h, c, `rx="${rx}" ${O}`)
}

/** A sedan: 6 ft wide (6.7 at the mirrors), 4.7 ft tall. */
function sedan(color: string, towardReader: boolean): string {
  let s = rect(-42, -14, 13, 14, 'tire', 'rx="2"') + rect(29, -14, 13, 14, 'tire', 'rx="2"')
  s += rect(-50, -50, 8, 5, color, `rx="1.5" ${O}`) + rect(42, -50, 8, 5, color, `rx="1.5" ${O}`)
  s += path('M-44 -12 L-44 -34 Q-44 -42 -37 -44 L-30 -66 Q-28 -71 -22 -71 L22 -71 Q28 -71 30 -66 L37 -44 Q44 -42 44 -34 L44 -12 Q44 -8 40 -8 L-40 -8 Q-44 -8 -44 -12 Z', color, O)
  s += path('M-44 -20 L44 -20 L44 -12 Q44 -8 40 -8 L-40 -8 Q-44 -8 -44 -12 Z', 'car-low')
  s += towardReader
    ? path('M-33 -46 L-27.5 -64 Q-26.5 -67 -23 -67 L23 -67 Q26.5 -67 27.5 -64 L33 -46 Z', GLASS, O) + rect(-15, -32, 30, 7, GLASS, 'rx="2"')
    : path('M-30 -49 L-26 -63 Q-25 -66 -22 -66 L22 -66 Q25 -66 26 -63 L30 -49 Z', GLASS, O)
  s += towardReader ? lamps(true, 26, -40, 14, 5, 2) : lamps(false, 29, -41, 12, 7, 2)
  return ellipse(0, 0, 3.3, 0.2, 'shadow') + grid(s)
}

/** An SUV: 6.5 ft wide, 5.9 ft tall, boxier and higher than a sedan. */
function suv(color: string, towardReader: boolean): string {
  let s = rect(-46, -21, 15, 21, 'tire', 'rx="3"') + rect(31, -21, 15, 21, 'tire', 'rx="3"')
  s += rect(-54, -62, 8, 6, color, `rx="1.5" ${O}`) + rect(46, -62, 8, 6, color, `rx="1.5" ${O}`)
  s += path('M-48 -15 L-48 -46 Q-48 -54 -41 -56 L-37 -84 Q-36 -88 -30 -88 L30 -88 Q36 -88 37 -84 L41 -56 Q48 -54 48 -46 L48 -15 Q48 -10 43 -10 L-43 -10 Q-48 -10 -48 -15 Z', color, O)
  s += path('M-48 -24 L48 -24 L48 -15 Q48 -10 43 -10 L-43 -10 Q-48 -10 -48 -15 Z', 'car-low')
  s += rect(-36, -91, 72, 3, 'tire', 'rx="1"')
  s += towardReader
    ? path('M-37 -58 L-33.5 -80 Q-32.5 -84 -28 -84 L28 -84 Q32.5 -84 33.5 -80 L37 -58 Z', GLASS, O) + rect(-18, -42, 36, 11, GLASS, 'rx="2"')
    : path('M-34 -60 L-31 -80 Q-30 -83 -27 -83 L27 -83 Q30 -83 31 -80 L34 -60 Z', GLASS, O)
  s += towardReader ? lamps(true, 28, -49, 16, 6, 2) : lamps(false, 32, -50, 13, 9, 2)
  return ellipse(0, 0, 3.55, 0.22, 'shadow') + grid(s)
}

/** A city bus: 8.5 ft wide, 10.5 ft tall. */
function bus(towardReader: boolean): string {
  let s = ellipse(0, 0, 4.6, 0.25, 'shadow')
  s += rect(-4.1, -1.5, 1.0, 1.5, 'tire', 'rx="0.3"') + rect(3.1, -1.5, 1.0, 1.5, 'tire', 'rx="0.3"')
  s += rect(-4.25, -10.5, 8.5, 9.7, 'bus-body', `rx="0.6" ${O}`)
  s += rect(-4.25, -2.6, 8.5, 0.6, 'bus-stripe')
  if (towardReader) {
    s += rect(-3.5, -9.85, 7.0, 0.95, GLASS, `rx="0.15" ${O}`)
    s += rect(-3.7, -8.5, 7.4, 4.6, GLASS, `rx="0.4" ${O}`)
    s += lamps(true, 2.6, -3.35, 1.1, 0.45)
  }
  else {
    s += rect(-3.2, -9.0, 6.4, 2.6, GLASS, `rx="0.3" ${O}`)
    s += rect(-2.6, -5.6, 5.2, 2.2, 'car-low', 'rx="0.2"')
    s += lamps(false, 2.9, -3.6, 0.9, 1.0)
  }
  return s + rect(-4.25, -1.55, 8.5, 0.5, 'tire', 'rx="0.2"')
}

/** A box delivery truck: 8 ft wide, 11 ft tall. */
function truck(color: string, towardReader: boolean): string {
  let s = ellipse(0, 0, 4.4, 0.25, 'shadow')
  s += rect(-3.85, -1.5, 1.0, 1.5, 'tire', 'rx="0.3"') + rect(2.85, -1.5, 1.0, 1.5, 'tire', 'rx="0.3"')
  if (towardReader) {
    s += rect(-4.0, -11.0, 8.0, 4.6, 'truck-box', `rx="0.25" ${O}`)
    s += path('M-3.5 -1.0 L-3.5 -5.6 Q-3.5 -6.4 -2.8 -6.4 L2.8 -6.4 Q3.5 -6.4 3.5 -5.6 L3.5 -1.0 Z', color, O)
    s += rect(-3.0, -6.0, 6.0, 2.3, GLASS, `rx="0.3" ${O}`)
    s += rect(-1.6, -3.2, 3.2, 1.0, GLASS, 'rx="0.2"')
    s += lamps(true, 2.2, -3.05, 1.0, 0.45)
    s += rect(-3.6, -1.35, 7.2, 0.4, 'tire', 'rx="0.15"')
  }
  else {
    s += rect(-4.0, -11.0, 8.0, 10.0, 'truck-box', `rx="0.25" ${O}`)
    // Roll-up door seams and the latch: thin lines, ink in Drafting ink.
    for (let i = 0; i < 4; i++)
      s += rect(-3.6, -9.6 + i * 2.0, 7.2, 0.08, 'veh-line')
    s += rect(-0.1, -6.0, 0.2, 1.4, 'veh-line')
    s += lamps(false, 3.0, -3.0, 0.75, 1.0)
    s += rect(-3.9, -1.25, 7.8, 0.35, 'tire')
  }
  return s
}

/** A vehicle seen from the front (toward the reader) or the rear. */
export function vehicle(variant: VehicleVariant, seed: number, towardReader: boolean): string {
  const color = carColor(seed)
  switch (variant) {
    case 'sedan':
      return sedan(color, towardReader)
    case 'suv':
      return suv(color, towardReader)
    case 'bus':
      return bus(towardReader)
    case 'truck':
      return truck(color, towardReader)
  }
}

/** A sedan, front or rear (kept for callers that want the default car). */
export const car = (seed: number, towardReader: boolean): string => sedan(carColor(seed), towardReader)

/** Picks a passenger vehicle for a lane: mostly sedans, some SUVs. */
export function laneVehicle(seed: number): VehicleVariant {
  return rng(seed + 11)() < 0.35 ? 'suv' : 'sedan'
}

function carBodyTop(color: string, w: number, l: number): string {
  const hw = w / 2
  const hl = l / 2
  let s = rect(-hw + 0.4, -hl + 0.4, w, l, 'shadow', 'rx="1.3"')
  s += rect(-hw - 0.45, hl * 0.21, 0.5, 0.7, top(color), 'rx="0.15"') + rect(hw - 0.05, hl * 0.21, 0.5, 0.7, top(color), 'rx="0.15"')
  s += rect(-hw, -hl, w, l, top(color), `rx="1.3" ${O}`)
  s += path(`M${-hw + 0.45} ${hl * 0.27} L${hw - 0.45} ${hl * 0.27} L${hw - 0.8} ${hl * 0.56} L${-hw + 0.8} ${hl * 0.56} Z`, TOP_GLASS, O)
  s += path(`M${-hw + 0.6} ${-hl * 0.48} L${hw - 0.6} ${-hl * 0.48} L${hw - 0.9} ${-hl * 0.67} L${-hw + 0.9} ${-hl * 0.67} Z`, TOP_GLASS, O)
  s += rect(-hw + 0.3, hl - 0.5, 1.0, 0.35, 'lamp-front', 'rx="0.1"') + rect(hw - 1.3, hl - 0.5, 1.0, 0.35, 'lamp-front', 'rx="0.1"')
  s += rect(-hw + 0.3, -hl + 0.15, 1.0, 0.3, 'lamp-rear', 'rx="0.1"') + rect(hw - 1.3, -hl + 0.15, 1.0, 0.3, 'lamp-rear', 'rx="0.1"')
  return s
}

/** A vehicle from above, centered; drawn heading toward the reader, turned otherwise. */
export function vehicleTop(variant: VehicleVariant, seed: number, towardReader: boolean): string {
  const color = carColor(seed)
  let s: string
  if (variant === 'sedan')
    s = carBodyTop(color, 6, 15)
  else if (variant === 'suv')
    s = carBodyTop(color, 6.5, 16) + rect(-2.6, -4.2, 0.15, 7.5, 'tire') + rect(2.45, -4.2, 0.15, 7.5, 'tire')
  else if (variant === 'bus') {
    s = rect(-3.85, -19.6, 8.5, 40, 'shadow', 'rx="0.8"') + rect(-4.25, -20, 8.5, 40, top('bus-body'), `rx="0.8" ${O}`)
    s += rect(-3.6, 18.8, 7.2, 0.9, TOP_GLASS, 'rx="0.3"')
    // Roof hatches and the air-conditioning unit.
    for (const y of [-14, -6, 2, 10])
      s += rect(-2.2, y, 4.4, 3.0, 'car-low', 'rx="0.3"')
  }
  else {
    s = rect(-3.6, -11.6, 8, 24, 'shadow', 'rx="0.4"')
    s += rect(-4, -12, 8, 17, top('truck-box'), `rx="0.3" ${O}`)
    s += rect(-3.6, 5.3, 7.2, 6.4, top(color), `rx="0.8" ${O}`) + path('M-3.1 8.6 L3.1 8.6 L2.7 10.6 L-2.7 10.6 Z', TOP_GLASS, O)
  }
  return facing(towardReader, s)
}

/** The sedan from above (kept for callers that want the default car). */
export const carTop = (seed: number, towardReader: boolean): string => vehicleTop('sedan', seed, towardReader)
