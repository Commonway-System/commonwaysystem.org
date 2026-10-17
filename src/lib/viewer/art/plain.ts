// The plain symbol set: the viewer's original outline glyphs, kept for
// Simplified view (html[data-view='simple']), which swaps the illustrated
// layer for this one. Same feet and origin conventions as the rest of art/,
// styled by the .g / .g-line / .g-solid / .g-canopy classes in viewer.css
// (constant-width outlines in ink, no fills to speak of).

import type { ItemType } from '../types'
import type { CyclistVariant, PedestrianVariant } from './people'
import type { VehicleVariant } from './vehicles'

const person = (dx = 0, k = 1): string =>
  `<g transform="translate(${dx} 0) scale(${k})"><circle class="g" cx="0" cy="-5.15" r="0.45"/><path class="g-line" d="M0 -4.65 V -2.6 M0 -2.6 L -0.35 0 M0 -2.6 L 0.35 0 M -0.65 -3.2 L 0 -4.3 L 0.65 -3.2"/></g>`

export function plainPedestrian(variant: PedestrianVariant): string {
  switch (variant) {
    case 'adult-child': return person(-0.8) + person(0.95, 0.64)
    case 'wheelchair': return '<circle class="g" cx="0" cy="-4.4" r="0.42"/><path class="g-line" d="M0 -3.95 V -2.0 H 0.7 V -0.6 M -0.6 -3.3 L 0 -3.7 L 0.6 -3.3"/><circle class="g-line" cx="-0.2" cy="-1.0" r="1"/>'
    case 'cane': return `${person()}<path class="g-line" d="M0.65 -3.2 L0.95 0"/>`
    case 'stroller': return `${person(-0.75)}<rect class="g" x="0.5" y="-2.4" width="1.1" height="1.0" rx="0.3"/><path class="g-line" d="M0.55 -1.4 V -0.2 M1.55 -1.4 V -0.2 M0.4 -3.35 H 1.6"/>`
    case 'dog-walker': return `${person(-0.7)}<ellipse class="g" cx="1.2" cy="-1.0" rx="0.36" ry="0.32"/><circle class="g" cx="1.2" cy="-1.5" r="0.24"/>`
    default: return person()
  }
}

export function plainCyclist(variant: CyclistVariant): string {
  const s = '<rect class="g-solid" x="-0.16" y="-2.3" width="0.32" height="2.3" rx="0.16"/><circle class="g" cx="0" cy="-5.1" r="0.45"/><path class="g-line" d="M0 -4.6 V -2.6 M -1.1 -3.5 H 1.1 M 0 -4.3 L -0.9 -3.5 M 0 -4.3 L 0.9 -3.5"/>'
  if (variant === 'cargo')
    return `${s}<rect class="g" x="-1.15" y="-2.35" width="2.3" height="1.6" rx="0.12"/>`
  return variant === 'child' ? `<g transform="scale(0.72)">${s}</g>` : s
}

export function plainVehicle(variant: VehicleVariant): string {
  if (variant === 'bus')
    return '<rect class="g" x="-4.25" y="-10.4" width="8.5" height="9.5" rx="0.6"/><rect class="g-line" x="-3.5" y="-9.6" width="7" height="3.2" rx="0.3"/><rect class="g-solid" x="-3.9" y="-0.95" width="1.2" height="0.95" rx="0.2"/><rect class="g-solid" x="2.7" y="-0.95" width="1.2" height="0.95" rx="0.2"/>'
  if (variant === 'truck')
    return '<rect class="g" x="-4" y="-11" width="8" height="10" rx="0.3"/><rect class="g-line" x="-3.4" y="-6" width="6.8" height="2.3" rx="0.3"/><rect class="g-solid" x="-3.7" y="-1" width="1.2" height="1" rx="0.2"/><rect class="g-solid" x="2.5" y="-1" width="1.2" height="1" rx="0.2"/>'
  const k = variant === 'suv' ? 1.15 : 1
  return `<g transform="scale(${k})"><path class="g" d="M -2.3 -3.4 L -1.8 -4.9 H 1.8 L 2.3 -3.4 Z"/><rect class="g" x="-3" y="-3.4" width="6" height="2.5" rx="0.5"/><rect class="g-solid" x="-2.7" y="-0.95" width="0.9" height="0.95" rx="0.2"/><rect class="g-solid" x="1.8" y="-0.95" width="0.9" height="0.95" rx="0.2"/></g>`
}

export function plainItem(type: ItemType, toward: 1 | -1): string {
  switch (type) {
    case 'tree': return '<rect class="g" x="-0.4" y="-8" width="0.8" height="8"/><circle class="g-canopy" cx="0" cy="-13.2" r="5.5"/>'
    case 'street-light': return `<rect class="g" x="-0.25" y="-18" width="0.5" height="18"/><path class="g-line" d="M 0 -17.7 H ${toward * 3.5}"/><rect class="g-solid" x="${toward * 3.5 - 0.8}" y="-17.8" width="1.6" height="0.6" rx="0.2"/>`
    case 'bollard': return '<rect class="g" x="-0.4" y="-3.3" width="0.8" height="3.3" rx="0.35"/>'
    case 'barrier': return '<path class="g" d="M -1 0 L -0.6 -0.9 L -0.3 -2.7 H 0.3 L 0.6 -0.9 L 1 0 Z"/>'
    case 'bench': return '<path class="g" d="M -2.5 -1.6 H 2.5 V -1.3 H -2.5 Z M -2.5 -2.9 H 2.5 V -2.6 H -2.5 Z"/><path class="g-line" d="M -2.2 -1.3 V 0 M 2.2 -1.3 V 0"/>'
    case 'planter': return '<circle class="g-canopy" cx="0" cy="-3" r="1.4"/><rect class="g" x="-1.5" y="-2" width="3" height="2"/>'
    case 'bike-rack': return '<path class="g-line" d="M -1 0 V -2.4 Q -1 -3 0 -3 Q 1 -3 1 -2.4 V 0"/>'
    case 'transit-shelter': return '<rect class="g" x="-2.6" y="-8.4" width="5.2" height="0.5"/><path class="g-line" d="M -2.3 -7.9 V 0 M 2.3 -7.9 V 0"/>'
    case 'sign': return '<path class="g-line" d="M 0 0 V -7"/><rect class="g" x="-1" y="-9" width="2" height="2"/>'
    case 'curb-stop': return '<rect class="g" x="-1" y="-0.5" width="2" height="0.5"/>'
  }
}
