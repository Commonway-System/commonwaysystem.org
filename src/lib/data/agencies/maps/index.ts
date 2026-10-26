import type { RegionMap } from './types.js'

// One map per country, keyed by ISO 3166-1 code, loaded only when someone
// opens the Map view: the outlines are about 22 KB and most visitors never
// need them. A country without a loader simply has no Map view.
export const mapLoaders: Record<string, () => Promise<{ default: RegionMap }>> = {
  US: () => import('./us.js'),
}

export type { MapRegion, RegionMap } from './types.js'
