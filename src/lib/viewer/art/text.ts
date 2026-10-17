// Text widths for laying out labels in the drawings.
//
// The browser can measure text (canvas measureText), but the build can't, and
// the first render in the browser must match the prerendered markup exactly.
// So layout starts from this table: Inter Variable's advance widths, measured
// in Chrome on 2026.10.17 at 100px, as fractions of the font size. After
// mount, a renderer may switch to measureWith() so a reader's chosen reading
// font (Lexend, Atkinson Hyperlegible, OpenDyslexic, or Simplified view's
// system font) is measured as it really renders.

const CHARS = ' ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789·.,:;-–/\'"()+&%#?!’'

const W600 = [0.25, 0.73, 0.66, 0.74, 0.72, 0.61, 0.59, 0.75, 0.75, 0.28, 0.58, 0.7, 0.57, 0.92, 0.76, 0.77, 0.64, 0.77, 0.65, 0.65, 0.66, 0.74, 0.73, 1.02, 0.72, 0.71, 0.65, 0.57, 0.62, 0.58, 0.62, 0.59, 0.39, 0.63, 0.61, 0.26, 0.26, 0.57, 0.26, 0.9, 0.61, 0.61, 0.62, 0.62, 0.4, 0.55, 0.35, 0.61, 0.59, 0.84, 0.57, 0.59, 0.57, 0.66, 0.42, 0.62, 0.64, 0.67, 0.61, 0.64, 0.58, 0.64, 0.64, 0.32, 0.32, 0.32, 0.32, 0.33, 0.47, 0.5, 0.38, 0.33, 0.52, 0.37, 0.37, 0.67, 0.66, 1, 0.64, 0.54, 0.32, 0.29]
const W700 = [0.24, 0.75, 0.66, 0.74, 0.72, 0.61, 0.59, 0.75, 0.75, 0.28, 0.58, 0.72, 0.57, 0.93, 0.76, 0.77, 0.65, 0.78, 0.66, 0.65, 0.67, 0.73, 0.75, 1.04, 0.74, 0.73, 0.66, 0.58, 0.63, 0.59, 0.63, 0.6, 0.4, 0.63, 0.62, 0.27, 0.27, 0.58, 0.27, 0.91, 0.62, 0.61, 0.63, 0.63, 0.41, 0.56, 0.37, 0.62, 0.6, 0.85, 0.58, 0.6, 0.57, 0.67, 0.43, 0.63, 0.65, 0.68, 0.62, 0.65, 0.58, 0.65, 0.65, 0.33, 0.33, 0.33, 0.33, 0.34, 0.47, 0.5, 0.39, 0.34, 0.55, 0.38, 0.38, 0.68, 0.67, 1.02, 0.65, 0.56, 0.34, 0.31]

const TABLES = { 600: new Map([...CHARS].map((c, i) => [c, W600[i]])), 700: new Map([...CHARS].map((c, i) => [c, W700[i]])) }
const FALLBACK = 0.62

export interface TextStyle {
  /** Font size in px. */
  size: number
  /** 600 (labels) or 700 (numbers, band text). */
  weight?: 600 | 700
  /** Letter spacing in em, as the SVG letter-spacing attribute. */
  tracking?: number
}

/** Width in px of a string as it will render, letter spacing included. */
export type Measure = (text: string, style: TextStyle) => number

/** Table-based measure: identical at build time and in the browser. */
export const measureText: Measure = (text, { size, weight = 600, tracking = 0 }) => {
  const table = TABLES[weight]
  let em = 0
  for (const c of text) em += table.get(c) ?? FALLBACK
  return (em + text.length * tracking) * size
}

/**
 * A measure that asks the browser, for the font the drawing actually uses
 * (pass getComputedStyle(svg).fontFamily). Call only after mount; falls back
 * to the table if canvas isn't available.
 */
export function measureWith(fontFamily: string): Measure {
  const ctx = typeof document === 'undefined' ? null : document.createElement('canvas').getContext('2d')
  if (!ctx)
    return measureText
  return (text, { size, weight = 600, tracking = 0 }) => {
    ctx.font = `${weight} ${size}px ${fontFamily}`
    return ctx.measureText(text).width + text.length * tracking * size
  }
}
