// Vehicles, front or rear view (toward or away from the reader) and top view.
// Feet, origin at the ground point (front) or the center (top).

import { ellipse, facing, path, pick, rect, rng, shade } from './core'

const BODY = ['#b9bec4', '#4f6d8f', '#e9e9e6', '#b5413a', '#c9a24a', '#6d7b5a'] as const

export type VehicleVariant = 'sedan' | 'suv' | 'bus' | 'truck'

/** Width across the lane, feet. */
export const VEHICLE_WIDTH: Record<VehicleVariant, number> = { sedan: 6, suv: 6.5, bus: 8.5, truck: 8 }

/** Length along the street, feet (top views). */
export const VEHICLE_LENGTH: Record<VehicleVariant, number> = { sedan: 15, suv: 16, bus: 40, truck: 24 }

/** Body color for a seed, shared by the front and top views of the same car. */
export const carColor = (seed: number): string => pick(BODY, rng(seed))

const TIRE = '#1d1d1d'
const LAMP_FRONT = '#f4f1e4'
const LAMP_REAR = '#c0392b'
const BUS_BODY = '#e9e9e6'
const BUS_STRIPE = '#2f6f6a'

function lamps(towardReader: boolean, x: number, y: number, w: number, h: number): string {
  const c = towardReader ? LAMP_FRONT : LAMP_REAR
  return rect(-x - w, y, w, h, c, 'rx="0.15"') + rect(x, y, w, h, c, 'rx="0.15"')
}

/** A sedan: 6 ft wide, 4.8 ft tall. */
function sedan(color: string, towardReader: boolean): string {
  const dk = shade(color, -0.3)
  const lt = shade(color, 0.3)
  let s = ellipse(0, 0, 3.3, 0.2, 'shadow')
  s += rect(-2.95, -1.15, 0.78, 1.15, TIRE, 'rx="0.25"') + rect(2.17, -1.15, 0.78, 1.15, TIRE, 'rx="0.25"')
  s += path('M-2.45 -2.85 L-1.95 -4.55 Q-1.85 -4.8 -1.5 -4.8 L1.5 -4.8 Q1.85 -4.8 1.95 -4.55 L2.45 -2.85 Z', color)
  s += path('M-2.2 -2.95 L-1.78 -4.45 Q-1.7 -4.63 -1.45 -4.63 L1.45 -4.63 Q1.7 -4.63 1.78 -4.45 L2.2 -2.95 Z', 'glass')
  s += path('M-1.15 -4.63 L-0.45 -4.63 L-1.35 -2.95 L-2.05 -2.95 Z', '#ffffff', 'opacity="0.16"')
  s += path('M-3.05 -1.0 Q-3.1 -0.55 -2.7 -0.5 L2.7 -0.5 Q3.1 -0.55 3.05 -1.0 L3.0 -2.5 Q2.9 -2.85 2.5 -2.9 L-2.5 -2.9 Q-2.9 -2.85 -3.0 -2.5 Z', color)
  s += path('M-2.5 -2.9 L2.5 -2.9 Q2.9 -2.85 3.0 -2.5 L3.0 -2.4 L-3.0 -2.4 L-3.0 -2.5 Q-2.9 -2.85 -2.5 -2.9 Z', lt, 'opacity="0.7"')
  s += path('M-3.05 -1.05 L3.05 -1.05 Q3.1 -0.55 2.7 -0.5 L-2.7 -0.5 Q-3.1 -0.55 -3.05 -1.05 Z', dk)
  s += path('M-2.3 -3.2 L-2.95 -3.2 Q-3.05 -2.95 -2.7 -2.9 L-2.3 -2.9 Z M2.3 -3.2 L2.95 -3.2 Q3.05 -2.95 2.7 -2.9 L2.3 -2.9 Z', dk)
  s += lamps(towardReader, 1.65, -2.25, 1.05, 0.38)
  if (towardReader)
    s += rect(-1.1, -2.05, 2.2, 0.55, '#2a2b2c', 'rx="0.2"')
  return s + rect(-0.5, -1.0, 1.0, 0.32, '#f4f4f2', 'rx="0.05"')
}

/** An SUV: 6.5 ft wide, 5.9 ft tall, boxier and higher than a sedan. */
function suv(color: string, towardReader: boolean): string {
  const dk = shade(color, -0.3)
  const lt = shade(color, 0.3)
  let s = ellipse(0, 0, 3.55, 0.22, 'shadow')
  s += rect(-3.2, -1.45, 0.9, 1.45, TIRE, 'rx="0.3"') + rect(2.3, -1.45, 0.9, 1.45, TIRE, 'rx="0.3"')
  s += path('M-2.85 -3.4 L-2.55 -5.6 Q-2.45 -5.9 -2.1 -5.9 L2.1 -5.9 Q2.45 -5.9 2.55 -5.6 L2.85 -3.4 Z', color)
  s += path('M-2.6 -3.5 L-2.35 -5.45 Q-2.28 -5.7 -2.0 -5.7 L2.0 -5.7 Q2.28 -5.7 2.35 -5.45 L2.6 -3.5 Z', 'glass')
  s += path('M-1.45 -5.7 L-0.75 -5.7 L-1.6 -3.5 L-2.3 -3.5 Z', '#ffffff', 'opacity="0.16"')
  s += path('M-3.3 -1.2 Q-3.35 -0.75 -2.95 -0.7 L2.95 -0.7 Q3.35 -0.75 3.3 -1.2 L3.25 -3.05 Q3.15 -3.45 2.75 -3.5 L-2.75 -3.5 Q-3.15 -3.45 -3.25 -3.05 Z', color)
  s += rect(-3.25, -3.5, 6.5, 0.12, lt, 'opacity="0.7"')
  s += path('M-3.3 -1.3 L3.3 -1.3 Q3.35 -0.75 2.95 -0.7 L-2.95 -0.7 Q-3.35 -0.75 -3.3 -1.3 Z', dk)
  s += rect(-3.0, -6.05, 6.0, 0.12, '#3a3a3a', 'rx="0.05"')
  s += path('M-2.6 -3.85 L-3.25 -3.85 Q-3.35 -3.55 -3.0 -3.5 L-2.6 -3.5 Z M2.6 -3.85 L3.25 -3.85 Q3.35 -3.55 3.0 -3.5 L2.6 -3.5 Z', dk)
  s += lamps(towardReader, 1.8, -2.75, 1.15, 0.42)
  if (towardReader)
    s += rect(-1.3, -2.6, 2.6, 0.8, '#2a2b2c', 'rx="0.2"')
  return s + rect(-0.5, -1.25, 1.0, 0.32, '#f4f4f2', 'rx="0.05"')
}

/** A city bus: 8.5 ft wide, 10.5 ft tall. */
function bus(towardReader: boolean): string {
  let s = ellipse(0, 0, 4.6, 0.25, 'shadow')
  s += rect(-4.1, -1.5, 1.0, 1.5, TIRE, 'rx="0.3"') + rect(3.1, -1.5, 1.0, 1.5, TIRE, 'rx="0.3"')
  s += rect(-4.25, -10.5, 8.5, 9.7, BUS_BODY, 'rx="0.7"')
  s += rect(-4.25, -10.5, 8.5, 0.5, shade(BUS_BODY, -0.12), 'rx="0.5"')
  s += rect(-4.25, -2.6, 8.5, 0.7, BUS_STRIPE)
  if (towardReader) {
    s += rect(-3.5, -9.75, 7.0, 1.0, '#1d1d1d', 'rx="0.15"') + rect(-2.4, -9.5, 4.8, 0.5, '#f2a93b', 'rx="0.1"')
    s += rect(-3.7, -8.5, 7.4, 4.6, 'glass', 'rx="0.4"')
    s += path('M-2.3 -8.5 L-1.2 -8.5 L-2.6 -3.9 L-3.7 -3.9 Z', '#ffffff', 'opacity="0.14"')
    s += rect(-3.2, -1.55, 6.4, 0.25, '#3a3a3a', 'rx="0.1"')
    s += lamps(true, 2.6, -3.35, 1.1, 0.45)
    s += rect(-0.6, -1.9, 1.2, 0.35, '#f4f4f2', 'rx="0.05"')
  }
  else {
    s += rect(-3.2, -9.0, 6.4, 2.6, 'glass', 'rx="0.3"')
    s += rect(-2.6, -5.6, 5.2, 2.2, shade(BUS_BODY, -0.18), 'rx="0.2"')
    for (let i = 0; i < 5; i++)
      s += rect(-2.3, -5.3 + i * 0.4, 4.6, 0.12, shade(BUS_BODY, -0.35))
    s += lamps(false, 2.9, -3.6, 0.9, 1.0)
    s += rect(-0.6, -1.9, 1.2, 0.35, '#f4f4f2', 'rx="0.05"')
  }
  return s
}

/** A box delivery truck: 8 ft wide, 11 ft tall. */
function truck(color: string, towardReader: boolean): string {
  const box = '#efefec'
  let s = ellipse(0, 0, 4.4, 0.25, 'shadow')
  s += rect(-3.85, -1.5, 1.0, 1.5, TIRE, 'rx="0.3"') + rect(2.85, -1.5, 1.0, 1.5, TIRE, 'rx="0.3"')
  if (towardReader) {
    s += rect(-4.0, -11.0, 8.0, 4.6, box, 'rx="0.25"') + rect(-4.0, -6.6, 8.0, 0.2, shade(box, -0.15))
    s += path('M-3.5 -1.0 L-3.5 -5.6 Q-3.5 -6.4 -2.8 -6.4 L2.8 -6.4 Q3.5 -6.4 3.5 -5.6 L3.5 -1.0 Z', color)
    s += rect(-3.0, -6.0, 6.0, 2.3, 'glass', 'rx="0.3"')
    s += path('M-1.6 -6.0 L-0.8 -6.0 L-1.9 -3.7 L-2.7 -3.7 Z', '#ffffff', 'opacity="0.15"')
    s += rect(-1.6, -3.2, 3.2, 1.0, '#2a2b2c', 'rx="0.2"')
    s += lamps(true, 2.2, -3.05, 1.0, 0.45)
    s += rect(-3.6, -1.35, 7.2, 0.4, shade(color, -0.3), 'rx="0.15"')
  }
  else {
    s += rect(-4.0, -11.0, 8.0, 10.0, box, 'rx="0.25"')
    for (let i = 0; i < 9; i++)
      s += rect(-3.6, -10.4 + i * 1.0, 7.2, 0.08, shade(box, -0.25))
    s += rect(-0.1, -6.0, 0.2, 1.4, shade(box, -0.4))
    s += lamps(false, 3.0, -3.0, 0.75, 1.0)
    s += rect(-3.9, -1.25, 7.8, 0.35, '#3a3a3a')
  }
  return s + rect(-0.5, -1.0, 1.0, 0.32, '#f4f4f2', 'rx="0.05"')
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
  const dk = shade(color, -0.3)
  const lt = shade(color, 0.22)
  const hw = w / 2
  const hl = l / 2
  let s = rect(-hw + 0.4, -hl + 0.4, w, l, 'shadow', 'rx="1.3"')
  s += rect(-hw, -hl, w, l, color, 'rx="1.3"')
  s += path(`M${-hw + 0.45} ${hl * 0.27} L${hw - 0.45} ${hl * 0.27} L${hw - 0.8} ${hl * 0.56} L${-hw + 0.8} ${hl * 0.56} Z`, 'glass')
  s += path(`M${-hw + 0.6} ${-hl * 0.48} L${hw - 0.6} ${-hl * 0.48} L${hw - 0.9} ${-hl * 0.67} L${-hw + 0.9} ${-hl * 0.67} Z`, 'glass')
  s += rect(-hw + 0.65, -hl * 0.46, w - 1.3, hl * 0.71, lt, 'rx="0.6"')
  s += rect(-hw - 0.45, hl * 0.21, 0.5, 0.7, dk, 'rx="0.15"') + rect(hw - 0.05, hl * 0.21, 0.5, 0.7, dk, 'rx="0.15"')
  s += rect(-hw + 0.3, hl - 0.5, 1.0, 0.35, LAMP_FRONT, 'rx="0.1"') + rect(hw - 1.3, hl - 0.5, 1.0, 0.35, LAMP_FRONT, 'rx="0.1"')
  s += rect(-hw + 0.3, -hl + 0.15, 1.0, 0.3, LAMP_REAR, 'rx="0.1"') + rect(hw - 1.3, -hl + 0.15, 1.0, 0.3, LAMP_REAR, 'rx="0.1"')
  return s
}

/** A vehicle from above, centered; drawn heading toward the reader, turned otherwise. */
export function vehicleTop(variant: VehicleVariant, seed: number, towardReader: boolean): string {
  const color = carColor(seed)
  let s: string
  if (variant === 'sedan')
    s = carBodyTop(color, 6, 15)
  else if (variant === 'suv')
    s = carBodyTop(color, 6.5, 16) + rect(-2.6, -4.2, 0.15, 7.5, '#3a3a3a') + rect(2.45, -4.2, 0.15, 7.5, '#3a3a3a')
  else if (variant === 'bus') {
    s = rect(-3.85, -19.6, 8.5, 40, 'shadow', 'rx="0.8"') + rect(-4.25, -20, 8.5, 40, BUS_BODY, 'rx="0.8"')
    s += rect(-3.6, 18.8, 7.2, 0.9, 'glass', 'rx="0.3"')
    for (const y of [-14, -6, 2, 10])
      s += rect(-2.2, y, 4.4, 3.0, shade(BUS_BODY, -0.1), 'rx="0.3"')
    s += rect(-4.25, -20, 0.5, 40, BUS_STRIPE) + rect(3.75, -20, 0.5, 40, BUS_STRIPE)
  }
  else {
    s = rect(-3.6, -11.6, 8, 24, 'shadow', 'rx="0.4"')
    s += rect(-4, -12, 8, 17, '#efefec', 'rx="0.3"') + rect(-3.6, -11.6, 7.2, 16.2, shade('#efefec', -0.06))
    s += rect(-3.6, 5.3, 7.2, 6.4, color, 'rx="0.8"') + path('M-3.1 8.6 L3.1 8.6 L2.7 10.6 L-2.7 10.6 Z', 'glass')
  }
  return facing(towardReader, s)
}

/** The sedan from above (kept for callers that want the default car). */
export const carTop = (seed: number, towardReader: boolean): string => vehicleTop('sedan', seed, towardReader)
