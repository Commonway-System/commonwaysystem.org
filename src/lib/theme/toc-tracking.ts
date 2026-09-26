import { get, writable } from 'svelte/store'
import { pageAnchors } from './layout.js'

/**
 * Shared scroll-position state for both "On this page" UIs (the desktop rail
 * in Toc.svelte and the compact bar in TocMobile.svelte), so the scroll
 * listener and the visible/current computation live in exactly one place.
 *
 * `visible`: heading ids currently on screen (below the navbar).
 * `current`: the last heading at or above the top of the viewport (the
 * section being read), or the first visible one if none has scrolled past yet.
 */
export const tocState = writable<{ visible: string[], current: string | null }>({
  visible: [],
  current: null,
})

function navbarHeightPx() {
  const cs = getComputedStyle(document.documentElement)
  const raw = cs.getPropertyValue('--cw-navbar-height').trim()
  const n = Number.parseFloat(raw)
  if (Number.isNaN(n))
    return 64
  return raw.endsWith('rem') ? n * Number.parseFloat(cs.fontSize) : n
}

function compute() {
  const navbar = navbarHeightPx()
  // The mobile bar sits under the navbar; leave room so a heading hidden
  // behind it isn't counted as "current"/visible.
  const bar = document.querySelector<HTMLElement>('.toc-mobile')
  const barH = bar && bar.offsetParent !== null ? bar.offsetHeight + 12 : 0
  const top = navbar + barH + 20
  const visible: string[] = []
  let current: string | null = null
  for (const a of get(pageAnchors)) {
    const el = document.getElementById(a.id)
    if (!el)
      continue
    const y = el.getBoundingClientRect().top
    if (y <= top)
      current = a.id
    if (y >= navbar + barH - 4 && y < window.innerHeight)
      visible.push(a.id)
  }
  if (!current)
    current = visible[0] ?? null
  if (current && !visible.includes(current))
    visible.unshift(current)
  tocState.set({ visible, current })
}

/** Call once from the root layout on mount; returns a cleanup function. */
export function startTocTracking() {
  // Computed directly on each scroll event rather than via
  // requestAnimationFrame: rAF is paused in a backgrounded tab (see the
  // same note in GlobalLayout.svelte), and the work is a handful of
  // getBoundingClientRect reads, cheap enough without throttling.
  const run = () => compute()
  window.addEventListener('scroll', run, { passive: true })
  window.addEventListener('resize', run)
  const unsub = pageAnchors.subscribe(() => queueMicrotask(run))
  return () => {
    window.removeEventListener('scroll', run)
    window.removeEventListener('resize', run)
    unsub()
  }
}
