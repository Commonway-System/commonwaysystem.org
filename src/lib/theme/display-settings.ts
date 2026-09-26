import { writable } from 'svelte/store'

/**
 * Reader-chosen display settings (the "Display settings" panel). Applied as
 * data attributes on <html>, same mechanism as data-theme, so plain CSS in
 * base.css does the actual work. Stored in the browser only; nothing here
 * leaves the device. An inline script in app.html applies the saved values
 * before first paint (keep its attribute names in sync with apply() below).
 */
export type TextSize = 'default' | 'large' | 'larger' | 'largest'

export type Contrast = 'default' | 'high'

export interface DisplaySettings {
  textSize: TextSize
  contrast: Contrast
  simplifiedView: boolean
  enhancedFocus: boolean
  largePointer: boolean
  pointerHalo: boolean
}

export const DEFAULT_DISPLAY_SETTINGS: DisplaySettings = {
  textSize: 'default',
  contrast: 'default',
  simplifiedView: false,
  enhancedFocus: false,
  largePointer: false,
  pointerHalo: false,
}

const STORAGE_KEY = 'commonway-display-settings'

export const displaySettings = writable<DisplaySettings>({ ...DEFAULT_DISPLAY_SETTINGS })

/** Simplified view shows everything at once: open every collapsed <details> on the page. */
export function expandAllDetails() {
  document.querySelectorAll('details').forEach((d) => {
    d.open = true
  })
}

function apply(s: DisplaySettings) {
  const root = document.documentElement
  root.dataset.textSize = s.textSize
  root.dataset.contrast = s.contrast
  root.dataset.view = s.simplifiedView ? 'simple' : 'default'
  if (s.simplifiedView)
    expandAllDetails()
  root.dataset.focus = s.enhancedFocus ? 'enhanced' : 'default'
  root.dataset.pointer = s.largePointer ? 'large' : 'default'
  root.dataset.halo = s.pointerHalo ? 'on' : 'off'
}

/** Call once on mount in the browser: loads saved settings and applies them. */
export function initDisplaySettings() {
  let saved: Partial<DisplaySettings> = {}
  try {
    saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') ?? {}
  }
  catch {
    // Storage unavailable or corrupt; fall back to defaults.
  }
  // No saved contrast choice: follow the device's own "more contrast" setting.
  const prefersMore = window.matchMedia('(prefers-contrast: more)').matches
  const merged = {
    ...DEFAULT_DISPLAY_SETTINGS,
    ...(saved.contrast ? {} : { contrast: (prefersMore ? 'high' : 'default') as Contrast }),
    ...saved,
  }
  displaySettings.set(merged)
  apply(merged)
}

export function updateDisplaySettings(patch: Partial<DisplaySettings>) {
  displaySettings.update((current) => {
    const next = { ...current, ...patch }
    apply(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    }
    catch {
      // Not remembered this visit; the setting still applies now.
    }
    return next
  })
}

export function resetDisplaySettings() {
  updateDisplaySettings({ ...DEFAULT_DISPLAY_SETTINGS })
  try {
    localStorage.removeItem(STORAGE_KEY)
  }
  catch {
    // Ignore.
  }
}
