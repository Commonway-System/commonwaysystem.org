import { writable } from 'svelte/store'

/** Below this width the sidebar becomes an off-canvas drawer. */
export const MOBILE_EDGE_WIDTH = 940

/** Mobile sidebar drawer open/closed. Desktop ignores this and always shows the sidebar. */
export const sidebarOpen = writable(false)

/** Anchors for the current page's "On this page" rail, set by PageLayout per page. */
export const pageAnchors = writable<{ id: string, text: string, depth: number }[]>([])

/** True once the reader has picked a color scheme, either from storage or system preference. */
export const isDark = writable(false)

const STORAGE_KEY = 'commonway-color-scheme'

/**
 * Call once on mount in the browser. The inline script in src/app.html has
 * already set the theme before first paint using this same rule (saved choice
 * wins, otherwise system preference); this re-applies it and syncs the
 * `isDark` store. Storage may be blocked, so a failed read falls back to the
 * system preference.
 */
export function initColorScheme() {
  let saved: string | null = null
  try {
    saved = localStorage.getItem(STORAGE_KEY)
  }
  catch {}
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const dark = saved ? saved === 'dark' : prefersDark
  applyColorScheme(dark)
}

/** Flips the scheme and saves it; if storage is blocked the theme still changes for this visit. */
export function toggleColorScheme() {
  isDark.update((current) => {
    const next = !current
    applyColorScheme(next)
    try {
      localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light')
    }
    catch {}
    return next
  })
}

function applyColorScheme(dark: boolean) {
  isDark.set(dark)
  document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  // The SVG icon link (not the .ico one); the dark theme uses the light icon.
  document
    .querySelector<HTMLLinkElement>('link[rel="icon"][type="image/svg+xml"]')
    ?.setAttribute('href', dark ? '/favicons/light-favicon.svg' : '/favicons/dark-favicon.svg')
}

let listeningForResize = false

/**
 * Shows each table's "scroll for more" hint only when that table actually
 * overflows its column (see markdown/table-scroll.ts for the wrapper
 * markup, base.css's .cw-table-wrap--overflowing rule for the hint
 * itself). Call once on mount and again after every client-side
 * navigation, since SvelteKit swaps page content without a full reload;
 * the resize listener is attached once and just re-measures whatever
 * tables are on the page at the time.
 */
export function initTableScrollHints() {
  updateTableScrollHints()
  // Fraunces/Inter are variable web fonts; if they finish loading after
  // this first pass, a table's measured width can shift enough to change
  // whether it counts as overflowing.
  document.fonts?.ready.then(updateTableScrollHints)
  if (!listeningForResize) {
    window.addEventListener('resize', updateTableScrollHints)
    listeningForResize = true
  }
}

function updateTableScrollHints() {
  document.querySelectorAll<HTMLElement>('.cw-table-wrap').forEach((wrap) => {
    const scroller = wrap.querySelector<HTMLElement>('.cw-table-scroll')
    if (!scroller)
      return
    const overflowing = scroller.scrollWidth > scroller.clientWidth + 1
    wrap.classList.toggle('cw-table-wrap--overflowing', overflowing)
  })
}
