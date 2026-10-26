import type { Agency } from './types.js'
import { countries } from './countries.js'

// Every file under a country folder (us/federal.ts, us/states.ts, and later
// one file per state or province for its counties, cities and regional
// agencies, e.g. us/or.ts) default-exports an Agency[]. They're globbed at
// build time, so a new file needs no change here. Same mechanism as the
// media entries; not under $lib/server/ because the directory component
// filters on the client.
// maps/ holds the map view's outlines, not agencies.
const modules = import.meta.glob(['./*/*.ts', '!./maps/*.ts'], { eager: true }) as Record<string, { default: Agency[] }>

const allAgencies: Agency[] = Object.values(modules).flatMap(mod => mod.default)

// Catch data mistakes at build time rather than on the page: a duplicate
// id, a country or region the directory doesn't know, or a bad date.
const seen = new Set<string>()
for (const a of allAgencies) {
  if (seen.has(a.id))
    throw new Error(`Road Agency Directory: duplicate id "${a.id}"`)
  seen.add(a.id)
  const country = countries[a.country]
  if (!country)
    throw new Error(`Road Agency Directory: "${a.id}" has unknown country "${a.country}"; add it to countries.ts`)
  if (a.region && !country.regions[a.region])
    throw new Error(`Road Agency Directory: "${a.id}" has unknown region "${a.region}"`)
  if (a.level !== 'national' && !a.region)
    throw new Error(`Road Agency Directory: "${a.id}" needs a region`)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(a.checked))
    throw new Error(`Road Agency Directory: "${a.id}" checked date must be YYYY-MM-DD`)
  if (a.contacts.length === 0)
    throw new Error(`Road Agency Directory: "${a.id}" has no contacts; only researched agencies go in`)
}

/** Every agency in the directory, in no particular order. */
export function getAgencies(): Agency[] {
  return allAgencies
}

/** The region's name, e.g. "Oregon" for "US-OR". */
export function regionName(a: Pick<Agency, 'country' | 'region'>): string {
  return a.region ? countries[a.country]?.regions[a.region] ?? a.region : ''
}

/** The agency's other names, each with its language when it isn't English. */
export function altNames(a: Pick<Agency, 'aka'>): { name: string, lang?: string }[] {
  return (a.aka ?? []).map(n => (typeof n === 'string' ? { name: n } : n))
}

export { contactLabels, countries } from './countries.js'
export type { CountryInfo } from './countries.js'
export { agencyLevels } from './types.js'
export type { Agency, AgencyAltName, AgencyContact, AgencyLevel, ContactType } from './types.js'
