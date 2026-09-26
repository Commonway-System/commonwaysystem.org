// Post-build step: builds the site search index with Pagefind and writes it
// to build/pagefind/, which the browser loads lazily (src/lib/theme/search.ts).
// Everything here is build-time; nothing runs at request time and nothing is
// sent anywhere when someone searches.
//
// Two sources go into the index:
//   1. Every prerendered page's <main> (PageLayout.svelte marks it with
//      data-pagefind-body; pages without that marker, the /text/ pages and
//      /search/, are skipped by Pagefind itself).
//   2. One custom record per Media Gallery item. Media items have no page of
//      their own (they are data records, see CLAUDE.md), so they are added
//      here from src/lib/data/media/entries/*.ts. A media result links to
//      /media/?q=<title>, which the Gallery reads into its own search box.
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
        item.blurb,
        `${type} from ${item.sourceName}.`,
        [...item.patternTaxonomyTags, ...item.mediaTags].join(', '),
      ].join(' '),
      meta: { title: item.title, section: 'Media', detail: `${type} · ${item.sourceName}`, ...(item.image ? { thumb: item.image } : {}) },
      filters: { section: ['Media'] },
    })
    if (recordErrors?.length)
      console.error(`Search index: could not add ${item.id}:`, recordErrors)
    else
      mediaCount++
  }

  const { errors: writeErrors } = await index.writeFiles({ outputPath: join(buildDir, 'pagefind') })
  if (writeErrors?.length)
    throw new Error(`Could not write the search index: ${writeErrors.join('; ')}`)

  console.log(`Search index: ${page_count} pages + ${mediaCount} media items written to build/pagefind/`)
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
