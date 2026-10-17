// Trees, shrubs and clouds. Feet, origin at the ground point (front views:
// y up is negative; top views: centered on the trunk).

import type { Ids } from './core'
import { ellipse, limb, paint, path, r2, rect, rng } from './core'

/** Tenth-of-a-foot rounding for crown circles: invisible at drawing scale, and it keeps the markup small. */
const r1 = (n: number): number => Math.round(n * 10) / 10

/**
 * A lumpy crown: a union of seeded circles, shaded with light from the top
 * left. `flat` draws the same silhouette in one paint (background shapes,
 * cast shadows) without the clip path or shading.
 */
export function canopy(ids: Ids, cx: number, cy: number, rx: number, ry: number, seed: number, flat?: 'shadow' | string): string {
  const r = rng(seed)
  const rb = Math.min(rx, ry) * 0.38
  let c = ''
  const n = Math.round(9 + (rx * ry) / 4)
  for (let i = 0; i < n; i++) {
    const a = r() * Math.PI * 2
    const d = Math.sqrt(r())
    c += `<circle cx="${r1(cx + Math.cos(a) * d * (rx - rb))}" cy="${r1(cy + Math.sin(a) * d * (ry - rb))}" r="${r1(rb * (0.75 + r() * 0.5))}"/>`
  }
  const m = Math.round(10 + rx * 1.2)
  for (let i = 0; i < m; i++) {
    const a = (i / m) * Math.PI * 2 + r() * 0.3
    c += `<circle cx="${r1(cx + Math.cos(a) * (rx - rb * 0.7))}" cy="${r1(cy + Math.sin(a) * (ry - rb * 0.7))}" r="${r1(rb * (0.55 + r() * 0.4))}"/>`
  }
  // Overlapping translucent circles would darken where they overlap, so a
  // shadow is drawn solid and faded as one group.
  if (flat === 'shadow')
    return `<g style="fill:#000;opacity:var(--pvx-shadow-a)">${c}</g>`
  if (flat)
    return `<g style="fill:${paint(flat)}">${c}</g>`

  const id = ids.next('cp')
  let s = `<defs><clipPath id="${id}">${c}</clipPath></defs><g clip-path="url(#${id})">`
  s += rect(cx - rx - 2, cy - ry - 2, 2 * rx + 4, 2 * ry + 4, 'canopy-md')
  s += ellipse(cx + rx * 0.35, cy + ry * 0.5, rx * 1.05, ry * 0.8, 'canopy-dk', 'opacity="0.6"')
  s += ellipse(cx - rx * 0.32, cy - ry * 0.38, rx * 0.55, ry * 0.45, 'canopy-lt', 'opacity="0.3"')
  for (let i = 0; i < 8; i++) {
    const a = 3.4 + r() * 1.9
    const d = 0.35 + r() * 0.55
    s += `<circle cx="${r1(cx + Math.cos(a) * d * rx)}" cy="${r1(cy + Math.sin(a) * d * ry)}" r="${r1(rb * (0.15 + r() * 0.2))}" style="fill:var(--pvx-canopy-lt);opacity:0.35"/>`
  }
  // Leaf speckle: a fixed count keeps the markup light (the page-weight budget
  // is about 60 KB per drawing).
  for (let i = 0; i < 18; i++) {
    const a = r() * Math.PI * 2
    const d = Math.sqrt(r())
    s += `<circle cx="${r1(cx + Math.cos(a) * d * rx)}" cy="${r1(cy + Math.sin(a) * d * ry)}" r="${r1(rb * (0.1 + r() * 0.12))}" style="fill:var(--pvx-${i % 2 ? 'canopy-dk' : 'canopy-lt'});opacity:0.45"/>`
  }
  return `${s}</g>`
}

/** A street tree in elevation, `h` feet tall (22 ft is a typical mature street tree). */
export function tree(ids: Ids, h: number, seed: number): string {
  const cy = -h * 0.66
  const rx = h * 0.34
  const ry = h * 0.3
  let s = ellipse(0, 0, 1.6, 0.2, 'shadow')
  s += limb([[0, -h * 0.42], [-1.6, cy + ry * 0.3], [-2.6, cy - ry * 0.1]], 'trunk', 0.32)
  s += limb([[0, -h * 0.45], [1.4, cy + ry * 0.15], [2.2, cy - ry * 0.25]], 'trunk', 0.28)
  s += path(`M-0.42 0 Q-0.3 ${r2(-h * 0.2)} -0.22 ${r2(-h * 0.5)} L0.22 ${r2(-h * 0.5)} Q0.3 ${r2(-h * 0.2)} 0.42 0 Z`, 'trunk')
  return s + canopy(ids, 0, cy, rx, ry, seed)
}

/** Crown radius in feet of tree(h), for drawing the same tree from above. */
export const crownRadius = (h: number): number => h * 0.34

/** The same tree from above: crown with its cast shadow (light from the top left). */
export function treeTop(ids: Ids, h: number, seed: number): string {
  const rr = crownRadius(h)
  return canopy(ids, rr * 0.19, rr * 0.19, rr, rr, seed, 'shadow') + canopy(ids, 0, 0, rr, rr, seed)
}

/** A shrub in elevation, `w` wide and `h` tall. */
export function shrub(ids: Ids, w: number, h: number, seed: number): string {
  return ellipse(0, 0, w * 0.55, 0.15, 'shadow') + canopy(ids, 0, -h * 0.5, w / 2, h / 2, seed)
}

/** A shrub from above. */
export function shrubTop(ids: Ids, w: number, seed: number): string {
  return canopy(ids, w * 0.16, w * 0.16, w / 2, w / 2, seed, 'shadow') + canopy(ids, 0, 0, w / 2, w / 2, seed)
}

/** A flat-bottomed cloud `w` px wide, centered on its base line. Pixel space, not feet. */
export function cloud(w: number, seed: number): string {
  const r = rng(seed)
  let c = ''
  const n = 4 + Math.floor(r() * 3)
  for (let i = 0; i < n; i++) {
    const t = (i + 0.5) / n
    const rad = w * (0.12 + r() * 0.1) * (1 - Math.abs(t - 0.5) * 0.9)
    c += `<circle cx="${r2((t - 0.5) * w * 0.8)}" cy="${r2(-rad * 0.7)}" r="${r2(rad)}"/>`
  }
  c += `<rect x="${r2(-w * 0.45)}" y="${r2(-w * 0.09)}" width="${r2(w * 0.9)}" height="${r2(w * 0.09)}" rx="${r2(w * 0.045)}"/>`
  return `<g class="pvx-cloud" style="fill:var(--pvx-cloud);opacity:var(--pvx-cloud-a)">${c}</g>`
}
