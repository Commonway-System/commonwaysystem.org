import { writable } from 'svelte/store'
import type { CompareTarget, ConfigEntry, ConfigId, Facet, Units, ViewerData } from './types.js'
import { REFERENCES, RETROFIT_STATES, RUNGS } from './types.js'

// ---------------------------------------------------------------------------
// Units: a reader preference, remembered between pages (browser only).

const UNITS_KEY = 'commonway-viewer-units'

export const units = writable<Units>('ft')

let unitsLoaded = false

/** Read the saved choice once, on the client. */
export function loadUnits() {
  if (unitsLoaded)
    return
  unitsLoaded = true
  try {
    const saved = localStorage.getItem(UNITS_KEY)
    if (saved === 'ft' || saved === 'm')
      units.set(saved)
  }
  catch {}
  units.subscribe((u) => {
    try {
      localStorage.setItem(UNITS_KEY, u)
    }
    catch {}
  })
}

/** Lengths are stored in feet; this is the only place they are converted. */
export function formatLength(feet: number, u: Units): string {
  if (u === 'm') {
    const m = feet * 0.3048
    return `${m < 10 ? m.toFixed(1) : Math.round(m)} m`
  }
  return `${Number.isInteger(feet) ? feet : feet.toFixed(1)} ft`
}

// ---------------------------------------------------------------------------
// Which configurations exist, in what order

const ORDER: ConfigId[] = [...RETROFIT_STATES, ...RUNGS, ...REFERENCES]

/** Distinct configuration ids in the data, in display order. */
export function configIds(data: ViewerData): ConfigId[] {
  const present = new Set(data.configs.map(c => c.id))
  return ORDER.filter(id => present.has(id))
}

/** The ladder: rungs (or before/after), not references. */
export function ladderIds(data: ViewerData): ConfigId[] {
  return configIds(data).filter(id => !(REFERENCES as readonly string[]).includes(id))
}

export function referenceIds(data: ViewerData): ConfigId[] {
  return configIds(data).filter(id => (REFERENCES as readonly string[]).includes(id))
}

export function defaultConfig(data: ViewerData): ConfigId | undefined {
  const ladder = ladderIds(data)
  return data.defaultConfig ?? ladder.at(-1) ?? configIds(data)[0]
}

export function defaultCompare(data: ViewerData, current: ConfigId | undefined): ConfigId | undefined {
  if (data.defaultCompare && data.defaultCompare !== current)
    return data.defaultCompare
  return configIds(data).find(id => id !== current)
}

export function facetDefaults(facets: Facet[] = []): Record<string, string> {
  return Object.fromEntries(facets.map(f => [f.id, f.default ?? f.options[0]?.id ?? '']))
}

/**
 * The entry for a configuration under the chosen facet values. An entry
 * whose `when` names more matching facets wins over a more general one, so a
 * page can give one general entry and override it for, say, the Urban tier.
 */
export function resolveEntry(data: ViewerData, id: ConfigId | undefined, facets: Record<string, string>): ConfigEntry | undefined {
  if (!id)
    return undefined
  let best: ConfigEntry | undefined
  let bestScore = -1
  for (const entry of data.configs) {
    if (entry.id !== id)
      continue
    const when = entry.when ?? {}
    const keys = Object.keys(when)
    if (keys.some(k => facets[k] !== undefined && facets[k] !== when[k]))
      continue
    if (keys.length > bestScore) {
      best = entry
      bestScore = keys.length
    }
  }
  return best
}

/** Whether a facet changes anything on this configuration (some entry for it names the facet in `when`). */
export function facetApplies(data: ViewerData, facetId: string, id: ConfigId | undefined): boolean {
  return data.configs.some(e => e.id === id && e.when?.[facetId] !== undefined)
}

/** A "facet:option" compare target, split; undefined for a plain configuration id. */
export function parseOptionTarget(target: CompareTarget | undefined): { facet: string, option: string } | undefined {
  const i = target?.indexOf(':') ?? -1
  return target && i > 0 ? { facet: target.slice(0, i), option: target.slice(i + 1) } : undefined
}

/** One rung down the ladder, for the "what changed" highlight. References and the lowest rung have none. */
export function rungBelow(data: ViewerData, id: ConfigId | undefined): ConfigId | undefined {
  const ladder = ladderIds(data)
  const i = id ? ladder.indexOf(id) : -1
  return i > 0 ? ladder[i - 1] : undefined
}

// ---------------------------------------------------------------------------
// Deep links: ?view=plan&config=nacto&compare=baseline&<facet>=<option>
// Only values that differ from the defaults are written, so an untouched
// viewer leaves the URL clean.

export interface ViewerUrlState {
  view?: string
  config?: ConfigId
  compare?: CompareTarget
  facets: Record<string, string>
}

export function readUrlState(params: URLSearchParams, data: ViewerData | undefined, viewIds: string[]): ViewerUrlState {
  const ids = data ? configIds(data) : []
  const view = params.get('view') ?? undefined
  const config = params.get('config') as ConfigId | null
  const compare = params.get('compare') as CompareTarget | null
  const option = parseOptionTarget(compare ?? undefined)
  const optionOk = option && data?.facets?.some(f => f.id === option.facet && f.options.some(o => o.id === option.option))
  const facets: Record<string, string> = {}
  for (const f of data?.facets ?? []) {
    const v = params.get(f.id)
    if (v && f.options.some(o => o.id === v))
      facets[f.id] = v
  }
  return {
    view: view && viewIds.includes(view) ? view : undefined,
    config: config && ids.includes(config) ? config : undefined,
    compare: compare && (ids.includes(compare as ConfigId) || optionOk) ? compare : undefined,
    facets,
  }
}

/** Facet ids that would collide with the viewer's own parameters or another page feature's. */
export const RESERVED_PARAMS = ['view', 'config', 'compare', 'cut', 'q', 'for', 'section', 'class']

export function writeUrlState(url: URL, state: ViewerUrlState, defaults: ViewerUrlState): URL {
  const next = new URL(url)
  const set = (key: string, value: string | undefined, fallback: string | undefined) => {
    if (value && value !== fallback)
      next.searchParams.set(key, value)
    else
      next.searchParams.delete(key)
  }
  set('view', state.view, defaults.view)
  set('config', state.config, defaults.config)
  set('compare', state.compare, undefined)
  for (const [k, v] of Object.entries(state.facets))
    set(k, v, defaults.facets[k])
  return next
}
