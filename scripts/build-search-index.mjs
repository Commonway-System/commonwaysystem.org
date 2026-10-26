// Post-build step: builds the site search index with Pagefind and writes it
// to build/pagefind/, which the browser loads lazily (src/lib/theme/search.ts).
// Everything here is build-time; nothing runs at request time and nothing is
// sent anywhere when someone searches.
//
// Three sources go into the index:
//   1. Every prerendered page's <main> (PageLayout.svelte marks it with
//      data-pagefind-body; pages without that marker, the /text/ pages and
//      /search/, are skipped by Pagefind itself).
//   2. One custom record per Media Gallery item. Media items have no page of
//      their own (they are data records, see CLAUDE.md), so they are added
//      here from src/lib/data/media/entries/*.ts. A media result links to
//      /media/?q=<title>, which the Gallery reads into its own search box.
//   3. Road Agency Directory records, from src/lib/data/agencies/<country>/*.ts
//      (the directory itself is data-pagefind-ignore, so its 60-odd entries
//      don't swamp the page's own excerpt). One record per agency, linking to
//      its #id on /references/road-agencies/, and one per state or territory
//      that has agencies of its own ("Road agencies in Oregon"), linking to
//      ?region=US-OR. The per-place records keep a search for a state to a
//      single result once counties and cities arrive. Contact labels are left
//      out on purpose: "ADA" or "Complete Streets" should find the site's
//      pages on those topics, not 55 state DOTs.
//
// A failure here is loud but not fatal: the site still deploys, and the
// search UI shows its "couldn't load" message instead of breaking pages.
import { readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import * as pagefind from 'pagefind'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const buildDir = join(root, 'build')
const entriesDir = join(root, 'src/lib/data/media/entries')
const agenciesDir = join(root, 'src/lib/data/agencies')
const DIRECTORY = '/references/road-agencies/'

const TYPE_LABELS = { video: 'Video', podcast: 'Podcast', article: 'Article' }

async function main() {
  // includeCharacters keeps "+" inside words so "2+1 road" is searchable as written.
  const { index, errors: createErrors } = await pagefind.createIndex({ forceLanguage: 'en', includeCharacters: '+' })
  if (!index)
    throw new Error(`Could not create the search index: ${createErrors?.join('; ')}`)

  const { page_count, errors } = await index.addDirectory({ path: buildDir })
  if (errors?.length)
    console.error('Search index warnings:', errors)

  // Node 24 strips the TypeScript types from these plain data modules on import.
  let mediaCount = 0
  for (const file of readdirSync(entriesDir).filter(f => f.endsWith('.ts')).sort()) {
    const item = (await import(pathToFileURL(join(entriesDir, file)).href)).default
    const type = TYPE_LABELS[item.type] ?? item.type
    const { errors: recordErrors } = await index.addCustomRecord({
      url: `/media/?q=${encodeURIComponent(item.title)}`,
      language: 'en',
      content: [
        item.title,
        item.id,
        item.blurb,
        `${type} from ${item.sourceName}.`,
        [...item.patternTaxonomyTags, ...item.mediaTags].join(', '),
      ].join(' '),
      meta: { title: item.title, section: 'Media', detail: `${item.id} · ${type} · ${item.sourceName}`, ...(item.image ? { thumb: item.image } : {}) },
      filters: { section: ['Media'] },
    })
    if (recordErrors?.length)
      console.error(`Search index: could not add ${item.id}:`, recordErrors)
    else
      mediaCount++
  }

  const agencyCount = await addAgencies(index)

  const { errors: writeErrors } = await index.writeFiles({ outputPath: join(buildDir, 'pagefind') })
  if (writeErrors?.length)
    throw new Error(`Could not write the search index: ${writeErrors.join('; ')}`)

  console.log(`Search index: ${page_count} pages + ${mediaCount} media items + ${agencyCount} agency and place records written to build/pagefind/`)
}

// Mirrors src/lib/data/agencies/index.ts, which globs the same folders with
// Vite's import.meta.glob (not available here).
async function addAgencies(index) {
  const { countries } = await import(pathToFileURL(join(agenciesDir, 'countries.ts')).href)
  const agencies = []
  for (const dir of readdirSync(agenciesDir, { withFileTypes: true })) {
    if (!dir.isDirectory() || dir.name === 'maps')
      continue
    for (const file of readdirSync(join(agenciesDir, dir.name)).filter(f => f.endsWith('.ts')).sort())
      agencies.push(...(await import(pathToFileURL(join(agenciesDir, dir.name, file)).href)).default)
  }

  let count = 0
  async function add(id, record) {
    const { errors } = await index.addCustomRecord({ language: 'en', filters: { section: ['Agencies'] }, ...record })
    if (errors?.length)
      console.error(`Search index: could not add ${id}:`, errors)
    else
      count++
  }

  for (const a of agencies) {
    const country = countries[a.country]
    const level = country?.levelLabels[a.level] ?? a.level
    const place = a.region ? country?.regions[a.region] ?? a.region : country?.name
    const altNames = (a.aka ?? []).map(n => (typeof n === 'string' ? n : n.name))
    const where = [a.area, place].filter(Boolean).join(', ')
    await add(a.id, {
      url: `${DIRECTORY}#${a.id}`,
      // Written as sentences: Pagefind's result excerpt is cut from this text.
      content: [
        `${a.name}${a.abbr || altNames.length ? ` (${[a.abbr, ...altNames].filter(Boolean).join('; ')})` : ''}.`,
        // Readers search "Ohio DOT" whatever the agency's own name is.
        `${level} road agency for ${where}${a.level === 'subnational' ? `: the ${place} DOT` : ''}.`,
        a.handles ?? '',
      ].filter(Boolean).join(' '),
      meta: { title: a.name, section: 'Agencies', detail: [a.abbr, level, where].filter(Boolean).join(' · ') },
    })
  }

  const byRegion = new Map()
  for (const a of agencies) {
    if (a.region && a.level !== 'national')
      byRegion.set(a.region, (byRegion.get(a.region) ?? 0) + 1)
  }
  for (const [region, n] of byRegion) {
    const country = countries[region.slice(0, 2)]
    const name = country.regions[region]
    const listed = `${n} ${n === 1 ? 'agency' : 'agencies'}, plus federal`
    await add(region, {
      url: `${DIRECTORY}?region=${region}`,
      content: `Road agencies in ${name}: ${n} listed, plus the federal agencies that cover every state. Who to contact about a road or street in ${name}.`,
      meta: { title: `Road agencies in ${name}`, section: 'Agencies', detail: `Road Agency Directory · ${listed}` },
    })
  }
  return count
}

try {
  await main()
}
catch (error) {
  console.error('Search index build FAILED (the site still deploys, but search will not load):', error)
}
finally {
  await pagefind.close()
}
