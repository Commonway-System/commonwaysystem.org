// Shared plumbing for the Pattern viewer's illustrated art.
//
// Every art function is pure: it takes numbers (feet, or pixels for
// backgrounds) plus a seed and returns an SVG markup string, which the
// renderers place with {@html} inside a transformed <g>. Nothing here may
// read the clock, Math.random or the DOM: the same inputs must give the same
// markup at build time (prerender) and in the browser, or hydration fails.
//
// Drawn objects use feet with the origin at the point where they stand on
// the ground: front views have y up as negative, top views have +y toward the
// reader (the near end of the street). Colors are CSS custom properties from
// src/lib/theme/styles/viewer.css, so themes and contrast modes apply.

/** Rounds to 2 decimals, which keeps the markup short and stable. */
export const r2 = (n: number): number => Math.round(n * 100) / 100

/** A small, fast seeded PRNG (mulberry32). Returns values in [0, 1). */
export function rng(seed: number): () => number {
  let a = seed | 0
  return () => {
    a = (a + 0x6D2B79F5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** FNV-1a over the joined parts: a stable seed from ids ("COL-DEF-01", "commonway", "fs-l"). */
export function seedOf(...parts: (string | number)[]): number {
  let h = 2166136261
  for (const c of parts.join('|')) {
    h ^= c.charCodeAt(0)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** Picks one item from a list with a seeded generator. */
export function pick<T>(list: readonly T[], r: () => number): T {
  return list[Math.floor(r() * list.length) % list.length]
}

/** Darkens (k < 0) or lightens (k > 0) a #rrggbb color by a fraction. */
export function shade(hex: string, k: number): string {
  const n = Number.parseInt(hex.slice(1), 16)
  return `#${[n >> 16, (n >> 8) & 255, n & 255]
    .map(c => Math.round(k < 0 ? c * (1 + k) : c + (255 - c) * k))
    .map(v => v.toString(16).padStart(2, '0'))
    .join('')}`
}

/**
 * A paint value: a palette token name ("soil" becomes var(--pvx-soil)), or a
 * literal #hex / rgba() / url(#id) passed through. Fixed hexes are only for
 * things whose color is part of what they are (skin, clothing, car bodies,
 * lamps), never for anything that must follow the theme.
 */
export function paint(v: string): string {
  return /^(?:#|rgb|url|var)/.test(v) ? v : `var(--pvx-${v})`
}

/**
 * Hands out ids for clip paths and patterns, unique within one drawing.
 * The prefix must be unique on the page too (a viewer can show two drawings
 * at once in Compare and full view), so renderers pass $props.id() in.
 */
export interface Ids {
  next: (kind?: string) => string
}

export function makeIds(prefix: string): Ids {
  let n = 0
  const safe = prefix.replace(/[^\w-]/g, '')
  return { next: (kind = 'a') => `${safe}-${kind}${n++}` }
}

// ---------------------------------------------------------------------------
// Markup helpers. Coordinates are whatever space the caller is drawing in.

export const rect = (x: number, y: number, w: number, h: number, fill: string, extra = ''): string =>
  `<rect x="${r2(x)}" y="${r2(y)}" width="${r2(Math.max(w, 0))}" height="${r2(Math.max(h, 0))}" style="fill:${paint(fill)}"${extra ? ` ${extra}` : ''}/>`

export const ellipse = (cx: number, cy: number, rx: number, ry: number, fill: string, extra = ''): string =>
  `<ellipse cx="${r2(cx)}" cy="${r2(cy)}" rx="${r2(rx)}" ry="${r2(ry)}" style="fill:${paint(fill)}"${extra ? ` ${extra}` : ''}/>`

export const path = (d: string, fill: string, extra = ''): string =>
  `<path d="${d}" style="fill:${paint(fill)}"${extra ? ` ${extra}` : ''}/>`

/** A round-capped stroke through points: limbs, branches, poles, handlebars. */
export const limb = (pts: [number, number][], color: string, width: number): string =>
  `<path d="M${pts.map(p => `${r2(p[0])} ${r2(p[1])}`).join(' L')}" style="fill:none;stroke:${paint(color)};stroke-width:${r2(width)};stroke-linecap:round;stroke-linejoin:round"/>`

/** A straight line in screen space (dimension lines, guides): constant width. */
export const line = (x1: number, y1: number, x2: number, y2: number, color: string, width: number, dash?: string): string =>
  `<path d="M${r2(x1)} ${r2(y1)} L${r2(x2)} ${r2(y2)}" style="fill:none;stroke:${paint(color)};stroke-width:${width}${dash ? `;stroke-dasharray:${dash}` : ''}"/>`

/** Places feet-space art at a pixel point, scaled to pixels per foot. */
export const place = (x: number, y: number, scale: number, inner: string): string =>
  `<g transform="translate(${r2(x)} ${r2(y)}) scale(${r2(scale)})">${inner}</g>`

/** Rotates top-view art drawn for travel toward the reader so it faces away. */
export const facing = (towardReader: boolean, inner: string): string =>
  towardReader ? inner : `<g transform="rotate(180)">${inner}</g>`

/** Ground shadow under a front-view object. */
export const footShadow = (rx: number, ry = 0.15): string => ellipse(0, 0, rx, ry, 'shadow')

/** Escapes text for use inside SVG markup. */
export const esc = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * Draw-once, place-many: the first time a key is stamped its markup goes
 * into `defs()` under a unique id, and every placement (that one included)
 * is a <use> of it. For things repeated at a spacing along the street
 * (trees every 30 ft in the top-down views), which are identical because
 * their seed comes from the strip, not the position.
 */
export interface Stamps {
  use: (key: string, draw: () => string) => string
  defs: () => string
}

export function makeStamps(ids: Ids): Stamps {
  const made = new Map<string, string>()
  let defs = ''
  return {
    use(key, draw) {
      let id = made.get(key)
      if (!id) {
        id = ids.next('st')
        made.set(key, id)
        defs += `<g id="${id}">${draw()}</g>`
      }
      return `<use href="#${id}"/>`
    },
    defs: () => (defs ? `<defs>${defs}</defs>` : ''),
  }
}

/**
 * Brick joints seen from above, as a pattern to lay over any fill (the
 * brick color, or white for the bricks of a T mark): a running bond with
 * the long side along the street, which runs down the page (+y). Bricks are
 * 8 by 4 in at `S` px per foot, never under 10 by 5 px so the joints don't
 * turn to a gray blur. Pass `turned` for art that runs left to right.
 */
export function brickJoints(ids: Ids, S: number, turned = false): { def: string, fill: string } {
  const id = ids.next('brick')
  const bl = Math.max((2 / 3) * S, 10)
  const bw = bl / 2
  const j = 0.75
  const joint = (x: number, y: number, w: number, h: number) => `<rect x="${r2(x)}" y="${r2(y)}" width="${r2(w)}" height="${r2(h)}"/>`
  const lines = joint(0, 0, j, bl) + joint(bw, 0, j, bl) + joint(0, 0, bw, j) + joint(bw, bl / 2, bw, j)
  const def = `<defs><pattern id="${id}" width="${r2(2 * bw)}" height="${r2(bl)}" patternUnits="userSpaceOnUse"${turned ? ' patternTransform="rotate(90)"' : ''}><g style="fill:var(--pvx-brick-joint)">${lines}</g></pattern></defs>`
  return { def, fill: `url(#${id})` }
}
