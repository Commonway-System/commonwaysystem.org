// Trees, shrubs and clouds. Feet, origin at the ground point (front views:
// y up is negative; top views: centered on the trunk).
//
// One crown serves all three drawing styles (see "Drawing styles" in
// viewer.css): a single scalloped outline, drawn once in <defs> and reused.
// Muted render fills it in two greens, the lighter copy shifted up and left
// so a darker shade is left at the lower right; Drafting ink strokes the
// outline over a see-through paper fill and shows the shifted copy as a thin
// inner line; Two-ink print fills it teal and lets a halftone crescent show
// through at the lower right. Branches are drawn over the crown, faint in
// Muted and ink, solid in print.

import type { Ids, PatternSpace } from './core'
import { ellipse, fillOf, path, patternDefs, r2, rng } from './core'

/**
 * A scalloped closed outline: `n` arcs through seeded points on an ellipse,
 * each bulging outward. Light markup (one path) for a soft, leafy edge.
 */
export function scallop(cx: number, cy: number, rx: number, ry: number, n: number, seed: number, jit = 0.1, bulge = 0.62): string {
  const r = rng(seed)
  const pts: [number, number][] = []
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + (r() - 0.5) * 0.25
    const k = 1 + (r() - 0.5) * 2 * jit
    pts.push([r2(cx + Math.cos(a) * rx * k), r2(cy + Math.sin(a) * ry * k)])
  }
  let d = `M${pts[0][0]} ${pts[0][1]}`
  for (let i = 1; i <= n; i++) {
    const p = pts[i % n]
    const q = pts[i - 1]
    const rad = r2(Math.hypot(p[0] - q[0], p[1] - q[1]) * bulge)
    d += `A${rad} ${rad} 0 0 1 ${p[0]} ${p[1]}`
  }
  return `${d}Z`
}

/** Scallops for a crown of this size: more for big trees, never under 7. */
const bumps = (rx: number): number => Math.max(7, Math.min(14, Math.round(7 + rx * 0.9)))

/**
 * The crown itself, in `space` ('front' for elevations, 'top' for plan
 * views, so its halftone keeps its screen size). `cast` adds the soft drop
 * shadow a top view throws (light from the top left; Muted only, since the
 * shadow token is clear in the other styles).
 */
function crown(ids: Ids, cx: number, cy: number, rx: number, ry: number, seed: number, space: PatternSpace, cast: boolean): string {
  const p = ids.next('cr')
  const c = ids.next('cc')
  let s = `<defs><path id="${p}" d="${scallop(cx, cy, rx, ry, bumps(rx), seed)}" vector-effect="non-scaling-stroke"/><clipPath id="${c}"><use href="#${p}"/></clipPath></defs>`
  // Top views are stamped (drawn once, placed with <use>), and stylesheet
  // selectors don't reach inside a nested <use>: so what differs by style
  // here is driven by inherited custom properties, not classes.
  const line = cast ? 'top' : 'front'
  if (cast)
    s += `<use href="#${p}" transform="translate(${r2(rx * 0.16)} ${r2(ry * 0.2)})" style="fill:var(--pvx-shadow)"/>`
  s += `<g style="opacity:var(--pvx-canopy-a)"><use href="#${p}" style="fill:var(--pvx-canopy-dk);stroke:var(--pvx-crown-${line});stroke-width:var(--pvx-crown-${line}-w)"/>`
  s += `<use href="#${p}" style="fill:${fillOf(ids, 'ht-d3', space)};display:var(--pvx-d-print)"/>`
  s += `<g clip-path="url(#${c})"><use href="#${p}" transform="translate(${r2(-rx * 0.16)} ${r2(-ry * 0.22)})" style="fill:var(--pvx-canopy-md);stroke:var(--pvx-crown-in);stroke-width:0.7"/>`
  s += `<ellipse cx="${r2(cx - rx * 0.3)}" cy="${r2(cy - ry * 0.38)}" rx="${r2(rx * 0.36)}" ry="${r2(ry * 0.26)}" style="fill:var(--pvx-canopy-lt);opacity:0.45;display:var(--pvx-d-muted)"/></g></g>`
  return s + patternDefs(ids, space)
}

/**
 * A crown shape. With `flat` it's one path in a single paint ('shadow' for
 * a cast shadow, or a palette token), otherwise the full styled crown.
 * Kept for callers that want a crown without a trunk.
 */
export function canopy(ids: Ids, cx: number, cy: number, rx: number, ry: number, seed: number, flat?: 'shadow' | string): string {
  if (flat)
    return path(scallop(cx, cy, rx, ry, bumps(rx), seed), flat)
  return crown(ids, cx, cy, rx, ry, seed, 'front', false)
}

/**
 * Branch strokes, as [x0, y0, x1, y1] in a unit space where the crown's
 * center is (0, -196), its radii 84 by 76, and the trunk ends at -124.
 */
const BRANCHES = [[0, -112, -34, -188], [0, -124, 30, -198], [0, -100, 0, -222], [-17, -150, -52, -168], [14, -160, 50, -172], [0, -172, -20, -228], [0, -184, 22, -236], [-26, -170, -40, -214], [22, -180, 44, -214]]

/** A street tree in elevation, `h` feet tall (22 ft is a typical mature street tree). */
export function tree(ids: Ids, h: number, seed: number): string {
  const cy = -h * 0.66
  const rx = h * 0.34
  const ry = h * 0.3
  // Half the trees are mirrored, so a row doesn't repeat one silhouette.
  const kx = (rx / 84) * (seed % 2 ? -1 : 1)
  const ky = -cy / 196
  const X = (x: number) => r2(x * kx)
  const Y = (y: number) => r2(y * ky)
  let s = ellipse(0, 0, 1.6, 0.2, 'shadow')
  s += path(`M${X(-4.5)} 0L${X(-2.6)} ${Y(-124)}L${X(2.6)} ${Y(-124)}L${X(4.5)} 0Z`, 'trunk', 'class="o"')
  s += crown(ids, 0, cy, rx, ry, seed, 'front', false)
  return `${s}<path class="br" d="${BRANCHES.map(([a, b, c, d]) => `M${X(a)} ${Y(b)}L${X(c)} ${Y(d)}`).join('')}"/>`
}

/** Crown radius in feet of tree(h), for drawing the same tree from above. */
export const crownRadius = (h: number): number => h * 0.34

/** The same tree from above: crown with its cast shadow (light from the top left). */
export function treeTop(ids: Ids, h: number, seed: number): string {
  const rr = crownRadius(h)
  const r = rng(seed)
  const a0 = r() * Math.PI
  let spokes = ''
  for (let i = 0; i < 9; i++) {
    const a = a0 + (i / 9) * Math.PI * 2
    spokes += `M0 0L${r2(Math.cos(a) * rr * 0.78)} ${r2(Math.sin(a) * rr * 0.78)}`
  }
  // Drafting ink shows the branches as spokes under the see-through crown;
  // ink and print mark the trunk with a dot.
  return crown(ids, 0, 0, rr, rr, seed, 'top', true)
    + `<path d="${spokes}" vector-effect="non-scaling-stroke" style="fill:none;stroke:var(--pvx-ink-soft);stroke-width:0.7;display:var(--pvx-d-ink)"/><circle r="${r2(rr * 0.05)}" style="fill:var(--pvx-ink);display:var(--pvx-d-no-muted)"/>`
}

/** A shrub in elevation, `w` wide and `h` tall. */
export function shrub(ids: Ids, w: number, h: number, seed: number): string {
  return ellipse(0, 0, w * 0.55, 0.15, 'shadow') + crown(ids, 0, -h * 0.5, w / 2, h / 2, seed, 'front', false)
}

/** A shrub from above. */
export function shrubTop(ids: Ids, w: number, seed: number): string {
  return crown(ids, 0, 0, w / 2, w / 2, seed, 'top', true)
}

/**
 * A flat cloud `w` px wide, centered on its base line: two rounded pills.
 * Pixel space, not feet. Muted render only (and never in Simplified view).
 */
export function cloud(w: number, seed: number): string {
  const r = rng(seed)
  const h = Math.max(8, w * 0.1)
  const tw = w * (0.45 + r() * 0.2)
  const tx = -w / 2 + w * (0.12 + r() * 0.3)
  return `<g class="pvx-cloud only-muted" style="fill:var(--pvx-cloud);opacity:var(--pvx-cloud-a)"><rect x="${r2(-w / 2)}" y="${r2(-h)}" width="${r2(w)}" height="${r2(h)}" rx="${r2(h / 2)}"/><rect x="${r2(tx)}" y="${r2(-h * 1.8)}" width="${r2(tw)}" height="${r2(h)}" rx="${r2(h / 2)}"/></g>`
}
