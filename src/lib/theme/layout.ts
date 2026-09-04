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

/** Call once on mount in the browser: applies saved/system preference before first paint jank. */
export function initColorScheme() {
  const saved = localStorage.getItem(STORAGE_KEY)
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const dark = saved ? saved === 'dark' : prefersDark
  applyColorScheme(dark)
}

export function toggleColorScheme() {
  isDark.update((current) => {
    const next = !current
    applyColorScheme(next)
    localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light')
    return next
  })
}

function applyColorScheme(dark: boolean) {
  isDark.set(dark)
  document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  document
    .querySelector<HTMLLinkElement>('link[rel="icon"]')
    ?.setAttribute('href', dark ? '/favicons/light-favicon.svg' : '/favicons/dark-favicon.svg')
}
