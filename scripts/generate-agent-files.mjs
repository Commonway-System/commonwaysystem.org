// Post-build step, run by `pnpm run build` after generate-text-pages.mjs (it
// reads the .md copies that script writes). Produces two machine-readable
// views of the publication for AI agents, both checked on the Website Audit
// page (/about/website-audit/, src/lib/audit.ts):
//
//   1. Schemamap: build/<page>.jsonld (each page's own JSON-LD, the blocks in
//      its <head>, as one @graph) and build/schemamap.xml indexing them.
//      https://specification.website/spec/agent-readiness/schemamap/
//   2. An Open Knowledge Format (OKF v0.2) bundle: build/okf/, one Markdown
//      concept per page with typed front matter, a `sources` list from the
//      page's References (each cited work mirrored once under
//      okf/references/), an index.md per folder, log.md from the changelog,
//      and the whole tree as build/okf.tar.gz.
//      https://specification.website/spec/agent-readiness/okf-bundle/
//
// Everything is derived from the built pages, so nothing here needs editing
// when content changes.
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'node-html-parser'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const buildDir = join(root, 'build')
const okfDir = join(buildDir, 'okf')
const siteSource = readFileSync(join(root, 'src/lib/site.ts'), 'utf8')
const SITE_URL = (siteSource.match(/SITE_URL\s*=\s*['"]([^'"]+)['"]/)?.[1] ?? '').replace(/\/$/, '')

function findPages(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) {
      if (['text', '_app', 'okf', 'pagefind'].includes(name) && dir === buildDir)
        continue
      findPages(full, out)
    }
    else if (name === 'index.html') {
      out.push(full)
    }
  }
  return out
}

function routeOf(file) {
  const rel = relative(buildDir, dirname(file)).split('\\').join('/')
  return rel ? `/${rel}/` : '/'
}

const pathFor = (route, ext) => (route === '/' ? `/index.${ext}` : `${route.replace(/\/$/, '')}.${ext}`)
const xmlEsc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const yq = s => JSON.stringify(String(s)) // a JSON string is a valid YAML double-quoted scalar
const slug = s => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60).replace(/-$/, '')

// ---- Collect every content page --------------------------------------------

const pages = []
for (const file of findPages(buildDir)) {
  const html = readFileSync(file, 'utf8')
  const doc = parse(html)
  if (!doc.querySelector('main#main-content'))
    continue
  if (doc.querySelector('meta[name="robots"][content*="noindex"]'))
    continue // utility page (search): no copies, not in the bundle
  const route = routeOf(file)
  const nodes = []
  for (const s of doc.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      const j = JSON.parse(s.text)
      for (const n of Array.isArray(j) ? j : [j]) {
        const { '@context': _ctx, ...rest } = n
        nodes.push(rest)
      }
    }
    catch {}
  }
  const title = (doc.querySelector('title')?.text ?? route).trim().replace(/\s*[·|]\s*Commonway System\s*$/, '')
  const description = doc.querySelector('meta[name="description"]')?.getAttribute('content')?.trim()
  const page = nodes.find(n => n.dateModified || n.identifier) ?? {}

  // References: <h2 id="references"> followed by an <ol> of entries, each
  // with an evidence-tier chip and (usually) one outbound link.
  const sources = []
  const refsHeading = doc.querySelector('h2#references')
  let list = refsHeading?.nextElementSibling
  while (list && list.tagName !== 'OL' && list.tagName !== 'H2')
    list = list.nextElementSibling
  if (list?.tagName === 'OL') {
    for (const li of list.querySelectorAll(':scope > li')) {
      li.querySelectorAll('.cw-external-indicator').forEach(n => n.remove())
      const tier = li.querySelector('.evidence-chip')?.text.trim()
      li.querySelectorAll('.evidence-chip').forEach(n => n.remove())
      const link = li.querySelector('a[href^="http"]')
      const text = li.text.replace(/\s+/g, ' ').trim()
      if (!text)
        continue
      sources.push({ n: sources.length + 1, title: text, url: link?.getAttribute('href'), tier })
    }
  }

  const status = doc.querySelector('.pattern-card .status-badge')?.text.replace(/\s+/g, ' ').trim()
  pages.push({ route, title, description, nodes, modified: page.dateModified, id: page.identifier, sources, status })
}

// ---- 1. Schemamap ------------------------------------------------------------

const typesOf = nodes => [...new Set(nodes.flatMap(n => [n['@type']].flat()).filter(Boolean))]
let jsonldCount = 0
const resources = []
for (const p of pages) {
  if (!p.nodes.length)
    continue
  const graph = { '@context': 'https://schema.org', '@graph': p.nodes }
  writeFileSync(join(buildDir, pathFor(p.route, 'jsonld').slice(1)), `${JSON.stringify(graph, null, 2)}\n`)
  jsonldCount++
  resources.push(`  <resource>
    <loc>${xmlEsc(SITE_URL + p.route)}</loc>
    <jsonld>${xmlEsc(SITE_URL + pathFor(p.route, 'jsonld'))}</jsonld>
${typesOf(p.nodes).map(t => `    <type>${xmlEsc(t)}</type>`).join('\n')}${p.modified ? `\n    <lastmod>${xmlEsc(p.modified)}</lastmod>` : ''}
  </resource>`)
}
writeFileSync(join(buildDir, 'schemamap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<schemamap xmlns="https://specification.website/schemas/schemamap/0.1">
${resources.join('\n')}
</schemamap>
`)
console.log(`Schemamap: wrote ${jsonldCount} .jsonld files and build/schemamap.xml`)

// ---- 2. OKF bundle -------------------------------------------------------------

rmSync(okfDir, { recursive: true, force: true })
mkdirSync(join(okfDir, 'references'), { recursive: true })

const SECTION = { guide: 'Guide', patterns: 'Patterns', retrofits: 'Retrofits', media: 'Media', references: 'Reference', blog: 'Blog', about: 'About' }
function conceptType(p) {
  const seg = p.route.split('/').filter(Boolean)
  if (seg[0] === 'patterns' && p.id)
    return 'Pattern'
  if (seg[0] === 'retrofits' && p.id)
    return 'RetrofitStrategy'
  if (seg.length === 1 && ['patterns', 'retrofits', 'blog', 'media'].includes(seg[0]))
    return 'Index'
  if (seg[0] === 'guide')
    return 'Guide'
  if (seg[0] === 'blog')
    return 'BlogPost'
  return 'Page'
}
// /patterns/collectors/default/ -> patterns/collectors/default.md; / -> home.md
const conceptPath = route => (route === '/' ? 'home.md' : `${route.slice(1, -1)}.md`)
const relLink = (fromFile, toFile) => {
  const r = relative(dirname(join(okfDir, fromFile)), join(okfDir, toFile)).split('\\').join('/')
  return r.startsWith('.') ? r : `./${r}`.replace(/^\.\//, '')
}

// Each distinct cited work becomes one mirrored reference concept.
const refs = new Map() // key -> { id, title, url, tier, citedBy: [] }
function refFor(src) {
  const key = src.url ?? src.title
  if (!refs.has(key)) {
    let id = slug(src.title) || 'source'
    const hash = createHash('sha256').update(key).digest('hex').slice(0, 6)
    id = `${id}-${hash}`
    refs.set(key, { id, title: src.title, url: src.url, tier: src.tier, citedBy: [] })
  }
  return refs.get(key)
}

const concepts = []
for (const p of pages) {
  const file = conceptPath(p.route)
  const mdFile = join(buildDir, pathFor(p.route, 'md').slice(1))
  if (!existsSync(mdFile))
    continue
  const body = readFileSync(mdFile, 'utf8').replace(/^---\n[\s\S]*?\n---\n/, '').trim()
  const seg = p.route.split('/').filter(Boolean)
  const tags = [SECTION[seg[0]] ? seg[0] : 'home']
  if (p.id)
    tags.push(p.id)
  if (seg[0] === 'patterns' && seg[1])
    tags.push(seg[1])
  const fm = ['---', `type: ${conceptType(p)}`, `title: ${yq(p.title)}`]
  if (p.description)
    fm.push(`description: ${yq(p.description)}`)
  fm.push(`resource: ${SITE_URL}${p.route}`)
  fm.push('tags:', ...tags.map(t => `  - ${yq(t)}`))
  if (p.modified)
    fm.push('generated:', `  at: ${yq(p.modified)}`)
  if (p.id)
    fm.push(`pattern_id: ${yq(p.id)}`)
  if (p.status)
    fm.push(`pattern_status: ${yq(p.status)}`)
  if (p.sources.length) {
    fm.push('sources:')
    for (const s of p.sources) {
      const ref = refFor(s)
      ref.citedBy.push({ file, title: p.title })
      fm.push(`  - id: ${ref.id}`, `    title: ${yq(s.title)}`)
      if (s.url)
        fm.push(`    resource: ${s.url}`)
      if (s.tier)
        fm.push(`    evidence_tier: ${yq(s.tier)}`)
      fm.push(`    citation_number: ${s.n}`, `    mirror: ${relLink(file, `references/${ref.id}.md`)}`)
    }
  }
  fm.push('---', '')
  mkdirSync(dirname(join(okfDir, file)), { recursive: true })
  writeFileSync(join(okfDir, file), `${fm.join('\n')}\n${body}\n`)
  concepts.push({ file, title: p.title, description: p.description })
}

for (const ref of refs.values()) {
  const fm = ['---', 'type: Reference', `title: ${yq(ref.title)}`]
  if (ref.url)
    fm.push(`resource: ${ref.url}`)
  if (ref.tier)
    fm.push(`evidence_tier: ${yq(ref.tier)}`)
  fm.push('---', '')
  const cited = ref.citedBy.map(c => `* [${c.title}](${relLink(`references/${ref.id}.md`, c.file)})`).join('\n')
  writeFileSync(join(okfDir, 'references', `${ref.id}.md`), `${fm.join('\n')}\n# ${ref.title}\n\n${ref.url ? `Source: ${ref.url}\n\n` : 'A print source with no online copy.\n\n'}${ref.tier ? `Evidence tier: ${ref.tier}.\n\n` : ''}## Cited by\n\n${cited}\n`)
}

// Folder indexes (no front matter, except the bundle root).
const dirs = new Map() // dir -> { concepts: [], subdirs: Set }
function dirEntry(d) {
  if (!dirs.has(d))
    dirs.set(d, { concepts: [], subdirs: new Set() })
  return dirs.get(d)
}
for (const c of concepts) {
  const d = dirname(c.file) === '.' ? '' : dirname(c.file)
  dirEntry(d).concepts.push(c)
  let child = d
  while (child) {
    const parent = dirname(child) === '.' ? '' : dirname(child)
    dirEntry(parent).subdirs.add(child)
    dirEntry(child)
    child = parent
  }
}
const conceptByFile = new Map(concepts.map(c => [c.file, c]))
const folderTitle = d => d.split('/').pop().replace(/-/g, ' ').replace(/^./, c => c.toUpperCase())
const line = (href, title, desc) => `* [${title}](${href})${desc ? ` - ${desc}` : ''}`
for (const [d, entry] of dirs) {
  if (!d)
    continue
  const self = conceptByFile.get(`${d}.md`) // e.g. patterns.md describes patterns/
  const heading = self?.title ?? folderTitle(d)
  const lines = [`# ${heading}`, '']
  if (self?.description)
    lines.push(self.description, '')
  if (self)
    lines.push(`Overview page: [${self.title}](../${d.split('/').pop()}.md)`, '')
  const subs = [...entry.subdirs].sort()
  if (subs.length) {
    lines.push('## Sections', '')
    for (const s of subs) {
      const sc = conceptByFile.get(`${s}.md`)
      lines.push(line(`${s.split('/').pop()}/index.md`, sc?.title ?? folderTitle(s), sc?.description))
    }
    lines.push('')
  }
  const own = entry.concepts.filter(c => !subs.includes(c.file.replace(/\.md$/, ''))).sort((a, b) => a.title.localeCompare(b.title))
  if (own.length) {
    lines.push('## Pages', '')
    for (const c of own) lines.push(line(c.file.split('/').pop(), c.title, c.description))
    lines.push('')
  }
  writeFileSync(join(okfDir, d, 'index.md'), `${lines.join('\n').trim()}\n`)
}

const refsSorted = [...refs.values()].sort((a, b) => a.title.localeCompare(b.title))
writeFileSync(join(okfDir, 'references', 'index.md'), `# References\n\nEvery source cited by a page in this bundle, one concept each, with its evidence tier and the pages that cite it.\n\n${refsSorted.map(r => line(`${r.id}.md`, r.title, r.tier)).join('\n')}\n`)

// log.md: the changelog from Release History & Roadmap, newest first.
const historyMd = readFileSync(join(buildDir, 'about/release-history.md'), 'utf8')
const changelog = historyMd.split(/^## Changelog\s*$/m)[1]?.split(/^## /m)[0] ?? ''
const log = changelog
  .replace(/^Entries run newest to oldest\..*$/m, '')
  .replace(/^\*\*(\d{4})\.(\d{2})\.(\d{2})\*\*\s*$/gm, '## $1-$2-$3\n')
  .replace(/^-\s{3}/gm, '* ')
  .replace(/\n{3,}/g, '\n\n')
  .trim()
writeFileSync(join(okfDir, 'log.md'), `# Change log\n\nHistory of the Commonway System guidebook, newest first, from ${SITE_URL}/about/release-history/.\n\n${log}\n`)

// Bundle root.
const rootEntry = dirs.get('') ?? { concepts: [], subdirs: new Set() }
const topSections = [...rootEntry.subdirs].sort()
const rootIndex = `---
okf_version: "0.2"
---

# Commonway System

> A pattern language for roads and streets. One system, grounded in what's proven.

An Open Knowledge Format bundle of the Commonway System guidebook: ${concepts.length} pages as concepts (Street Typology patterns with their Pattern IDs, Retrofit Strategies, Guide pages and more), derived from ${SITE_URL}/. Each concept's \`sources\` list carries the page's numbered references with their evidence tier (Legal / regulatory, Evidence-based, Precedent-based); \`references/\` mirrors every cited work once (${refs.size} in all). Canonical pages live at ${SITE_URL}/; every page is also available as Markdown at its URL with \`.md\` appended.

## Sections

${topSections.map(s => line(`${s}/index.md`, conceptByFile.get(`${s}.md`)?.title ?? s, conceptByFile.get(`${s}.md`)?.description)).join('\n')}

## Pages

${rootEntry.concepts.filter(c => !topSections.includes(c.file.replace(/\.md$/, ''))).sort((a, b) => a.file.localeCompare(b.file)).map(c => line(c.file, c.title, c.description)).join('\n')}

## Bundle

* [References](references/index.md) - Every cited source, with evidence tier and citing pages.
* [Change log](log.md) - History of the guidebook, newest first.
`
writeFileSync(join(okfDir, 'index.md'), rootIndex)

// The whole bundle as one archive. COPYFILE_DISABLE keeps macOS tar from
// adding ._ resource-fork files.
try {
  execFileSync('tar', ['-czf', join(buildDir, 'okf.tar.gz'), '-C', buildDir, 'okf'], { env: { ...process.env, COPYFILE_DISABLE: '1' } })
}
catch (e) {
  console.error(`OKF: could not write okf.tar.gz (${e.message}); the browsable /okf/ tree is still there`)
}
console.log(`OKF bundle: ${concepts.length} concepts, ${refs.size} mirrored references, ${dirs.size} folders, plus build/okf.tar.gz`)
