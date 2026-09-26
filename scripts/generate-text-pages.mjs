// Post-build step: for every prerendered page in build/, writes two derived
// versions from the page's already-rendered <main> content:
//   1. a plain, text-only HTML page at build/text/<same path>/index.html (the
//      homepage's is build/text/index.html), for readers (accessibility);
//   2. a markdown file at build/<path>.md (build/index.md for the homepage),
//      for AI/LLM consumption, linked from each page's <head> and llms.txt.
// Both start from the same cleaned <main>. Working from the rendered HTML (not the source markdown) is what
// keeps components' output (cards, tables, the layered guidance table,
// callouts) intact: much of the content lives in Svelte components and data,
// not plain markdown.
//
// Run automatically by `pnpm run build` (see package.json). Nothing here
// runs at request time; the result is static files like everything else.
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'node-html-parser'
import TurndownService from 'turndown'
import gfmPlugin from 'turndown-plugin-gfm'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const buildDir = join(root, 'build')
const siteSource = readFileSync(join(root, 'src/lib/site.ts'), 'utf8')
const SITE_URL = (siteSource.match(/SITE_URL\s*=\s*['"]([^'"]+)['"]/)?.[1] ?? '').replace(/\/$/, '')

const KEEP_ATTRS = new Set(['href', 'id', 'colspan', 'rowspan', 'scope', 'open', 'lang'])
const DROP_SELECTORS = [
  'script', 'style', 'canvas', 'button', 'iframe', 'video', 'audio', 'form', 'input', 'select', 'textarea',
  '.toc-mobile', '.page__meta', '.page__legal', '.pagenav', '.svp-heading-anchor',
  '[hidden]', '.cw-external-indicator', 'a .cw-sr-only', '.cw-table-hint', '.hero__motion', '.hero-glow', '.ink-halftone',
]

function findPages(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) {
      if (full === join(buildDir, 'text') || name === '_app')
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

// Utility pages (the search page, marked noindex) get no text or markdown
// version, so they aren't link targets to rewrite.
const routes = new Set(
  findPages(buildDir)
    .filter(file => !/<meta name="robots" content="[^"]*noindex/.test(readFileSync(file, 'utf8')))
    .map(routeOf),
)

function textHref(href) {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || /^[a-z][a-z0-9+.-]*:/i.test(href))
    return href
  const m = href.match(/^([^#?]*)(.*)$/)
  let path = m[1]
  if (!path.startsWith('/'))
    return href
  if (!path.endsWith('/'))
    path += '/'
  if (!routes.has(path))
    return href
  return `/text${path === '/' ? '/' : path}${m[2]}`
}

function cleanMain(main, mapHref = textHref) {
  // A button that is the label of a table header (the layered guidance
  // table's row headers) keeps its text; every other button is a control
  // with no meaning in a static page and is dropped below.
  main.querySelectorAll('th button, td button, summary button').forEach((b) => {
    b.replaceWith(b.text)
  })

  for (const sel of DROP_SELECTORS)
    main.querySelectorAll(sel).forEach(n => n.remove())

  // Images: keep meaningful alt text, drop the picture itself.
  main.querySelectorAll('img').forEach((img) => {
    const alt = (img.getAttribute('alt') ?? '').trim()
    // An image inside a link that already has its own text (a media card)
    // would just repeat that text as "[Image: ...]"; drop it.
    const link = img.closest('a')
    const linkHasText = link && link.text.replace(alt, '').trim().length > 0
    img.replaceWith(alt && !linkHasText ? `[Image: ${alt}]` : '')
  })

  // SVGs: keep any text they draw (a speed-limit sign's "SPEED LIMIT 30"),
  // drop pure graphics.
  main.querySelectorAll('svg').forEach((svg) => {
    const text = svg.querySelectorAll('text').map(t => t.text.trim()).filter(Boolean).join(' ')
    svg.replaceWith(text ? ` [${text}] ` : '')
  })

  // Drop now-empty spans/divs (icon wrappers and the like) so no stray gaps
  // are left; repeat because removing a child can empty its parent.
  for (let pass = 0; pass < 3; pass++) {
    main.querySelectorAll('span, div, p, li').forEach((el) => {
      if (!el.text.trim() && el.querySelectorAll('img, a, table, [id]').length === 0 && !el.getAttribute('id'))
        el.remove()
    })
  }

  main.querySelectorAll('details').forEach(d => d.setAttribute('open', ''))

  main.querySelectorAll('*').forEach((el) => {
    for (const name of Object.keys(el.attributes)) {
      if (!KEEP_ATTRS.has(name))
        el.removeAttribute(name)
    }
    if (el.tagName === 'A') {
      const href = el.getAttribute('href')
      if (href)
        el.setAttribute('href', mapHref(href))
    }
  })
}

const CSS = `
:root{color-scheme:light dark}
body{font:1.125rem/1.6 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;max-width:46rem;margin:0 auto;padding:1rem 1.25rem 3rem;color:#000;background:#fff}
a{color:#1f1c73;text-decoration:underline}
@media (prefers-color-scheme:dark){body{color:#fff;background:#000}a{color:#b3c4ff}}
a:focus-visible{outline:3px solid #ffd60a;outline-offset:2px}
h1,h2,h3,h4{line-height:1.25}
.top{border-bottom:2px solid currentColor;padding-bottom:.5rem;margin-bottom:1.5rem;font-size:1rem}
table{border-collapse:collapse;width:100%;margin:1rem 0;font-size:1rem}
th,td{border:1px solid currentColor;padding:.4rem .6rem;text-align:left;vertical-align:top}
pre,code{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:.95em}
pre{overflow-x:auto;border:1px solid currentColor;padding:.75rem}
details{margin:.75rem 0}
summary{font-weight:700}
footer{border-top:2px solid currentColor;margin-top:2rem;padding-top:.75rem;font-size:1rem}
`

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function shell({ title, canonicalPath, body, fullHref }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} (text version) · Commonway System</title>
<meta name="robots" content="noindex, follow">
${canonicalPath ? `<link rel="canonical" href="${esc(SITE_URL + canonicalPath)}">` : ''}
<style>${CSS}</style>
</head>
<body>
<header><p class="top">Text-only version. ${fullHref ? `<a href="${esc(fullHref)}">View the full version of this page</a> · ` : ''}<a href="/text/all-pages/">All text pages</a></p></header>
<main>
${body}
</main>
<footer><p>&copy; ${new Date().getFullYear()} Commonway System. <a href="/text/about/terms-and-conditions/">Terms and Conditions</a> · <a href="/text/about/privacy-policy/">Privacy Policy</a> · <a href="/text/about/ai-policy/">AI Policy</a> · <a href="/text/about/accessibility-policy/">Accessibility Policy</a></p></footer>
</body>
</html>
`
}

// ---------------------------------------------------------------------------
// Markdown versions (for AI/LLM consumption)
// ---------------------------------------------------------------------------

/** Route ('/patterns/foo/') to its markdown path ('/patterns/foo.md'; the homepage is '/index.md'). */
function markdownPath(route) {
  return route === '/' ? '/index.md' : `${route.replace(/\/$/, '')}.md`
}

/** Absolute URL for any internal link so a .md file still works when read on its own. */
function markdownHref(href) {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || /^[a-z][a-z0-9+.-]*:/i.test(href))
    return href
  const m = href.match(/^([^#?]*)(.*)$/)
  let path = m[1]
  if (!path.startsWith('/'))
    return href
  const asRoute = path.endsWith('/') ? path : `${path}/`
  if (routes.has(asRoute))
    return `${SITE_URL}${markdownPath(asRoute)}${m[2]}`
  return `${SITE_URL}${path}${m[2]}`
}

// A table whose cells hold block content (the layered guidance table's
// expandable cells, nested tables) can't be a markdown table. Flatten it to
// one h3 per row and one h4 per column, which reads well as plain markdown.
function flattenComplexTables(main) {
  const hasTableAncestor = (node) => {
    for (let p = node.parentNode; p; p = p.parentNode) {
      if (p.tagName === 'TABLE')
        return true
    }
    return false
  }
  main.querySelectorAll('table').filter(t => !hasTableAncestor(t)).forEach((table) => {
    const complex = table.querySelectorAll('td').some(td => td.querySelector('details, div, p, ul, ol, table, pre'))
    if (!complex)
      return
    const headRow = table.querySelector('thead tr') ?? table.querySelector('tr')
    const cols = headRow ? headRow.querySelectorAll('th, td').map(c => c.text.trim()) : []
    const caption = table.querySelector('caption')?.text.trim()
    let out = caption ? `<p>${esc(caption)}</p>` : ''
    const rows = table.querySelectorAll('tbody tr').length ? table.querySelectorAll('tbody tr') : table.querySelectorAll('tr').slice(1)
    for (const row of rows) {
      const cells = row.querySelectorAll(':scope > th, :scope > td')
      if (!cells.length)
        continue
      out += `<h3>${esc(cells[0].text.trim())}</h3>`
      cells.slice(1).forEach((cell, i) => {
        out += `<h4>${esc(cols[i + 1] ?? '')}</h4><div>${cell.innerHTML}</div>`
      })
    }
    table.replaceWith(`<div>${out}</div>`)
  })
}

function makeTurndown() {
  const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced', bulletListMarker: '-', emDelimiter: '_' })
  td.use(gfmPlugin.gfm)
  // <details> is always open in these files: keep its summary as a bold lead-in line.
  td.addRule('summary', {
    filter: 'summary',
    replacement: content => `\n\n**${content.trim()}**\n\n`,
  })
  return td
}

function frontMatter(doc, title, route) {
  const desc = doc.querySelector('meta[name="description"]')?.getAttribute('content')?.trim()
  let updated
  let id
  for (const s of doc.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      const j = JSON.parse(s.text)
      for (const node of Array.isArray(j) ? j : [j]) {
        updated ??= node.dateModified
        id ??= node.identifier
      }
    }
    catch {}
  }
  const q = v => JSON.stringify(String(v))
  const lines = ['---', `title: ${q(title)}`, `url: ${q(SITE_URL + route)}`]
  if (id)
    lines.push(`id: ${q(id)}`)
  if (desc)
    lines.push(`description: ${q(desc)}`)
  if (updated)
    lines.push(`updated: ${q(updated)}`)
  lines.push('---', '')
  return lines.join('\n')
}

function toMarkdown(file, route, title, td) {
  const doc = parse(readFileSync(file, 'utf8'))
  const main = doc.querySelector('main#main-content')
  // The Media Gallery's filter controls do nothing in a static file.
  main.querySelectorAll('.mf').forEach(n => n.remove())
  cleanMain(main, markdownHref)
  // Numbered citation badges become [N], pointing at the numbered References list.
  main.querySelectorAll('sup').forEach((sup) => {
    const a = sup.querySelector('a')
    if (a && (a.getAttribute('href') ?? '').startsWith('#'))
      sup.replaceWith(`@@C${a.text.trim()}@@`)
  })
  // A card that is one big link (media cards) would become a multi-line
  // markdown link: link its heading instead and keep the rest as plain text.
  main.querySelectorAll('a').forEach((a) => {
    if (!a.querySelector('h2, h3, h4, p, div'))
      return
    const href = a.getAttribute('href')
    const heading = a.querySelector('h2, h3, h4')
    if (heading && href)
      heading.set_content(`<a href="${esc(href)}">${heading.innerHTML}</a>`)
    a.replaceWith(`<div>${a.innerHTML}</div>`)
  })
  // Modal-hierarchy pills separate ranks with '>' (or '=' for ties) in their own spans.
  main.querySelectorAll('span').forEach((sp) => {
    const t = sp.text.trim()
    if (t === '>' || t === '=')
      sp.replaceWith(` @@S${t === '>' ? 'G' : 'E'}@@ `)
  })
  flattenComplexTables(main)
  const body = td.turndown(main.innerHTML)
    .replace(/@@C(\d+)@@/g, '[$1]')
    .replace(/@@SG@@/g, '>')
    .replace(/@@SE@@/g, '=')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
  return `${frontMatter(doc, title, route)}\n${body}\n`
}

const turndown = makeTurndown()
let mdCount = 0
const fullDocs = []

const listing = []
let count = 0

for (const file of findPages(buildDir)) {
  const route = routeOf(file)
  const doc = parse(readFileSync(file, 'utf8'))
  const main = doc.querySelector('main#main-content')
  if (!main)
    continue // not a content page (nothing to make a text version of)
  if (doc.querySelector('meta[name="robots"][content*="noindex"]'))
    continue // utility page (the search page): no text or markdown version

  const rawTitle = (doc.querySelector('title')?.text ?? route).trim()
  const title = rawTitle.replace(/\s*[·|]\s*Commonway System\s*$/, '')
  cleanMain(main)

  const outDir = route === '/' ? join(buildDir, 'text') : join(buildDir, 'text', route)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), shell({ title, canonicalPath: route, body: main.innerHTML, fullHref: route }))
  listing.push({ route, title })
  count++

  const md = toMarkdown(file, route, title, turndown)
  writeFileSync(join(buildDir, markdownPath(route).slice(1)), md)
  fullDocs.push({ route, md })
  mdCount++
}

// Index of every text page.
listing.sort((a, b) => a.route.localeCompare(b.route))
const items = listing.map(p => `<li><a href="${esc(p.route === '/' ? '/text/' : `/text${p.route}`)}">${esc(p.title)}</a> <small>(${esc(p.route)})</small></li>`).join('\n')
mkdirSync(join(buildDir, 'text', 'all-pages'), { recursive: true })
writeFileSync(
  join(buildDir, 'text', 'all-pages', 'index.html'),
  shell({ title: 'All pages', canonicalPath: null, fullHref: '/', body: `<h1>All pages, text-only</h1>\n<ul>\n${items}\n</ul>` }),
)

console.log(`Text pages: wrote ${count} pages + index to build/text/`)
// llms-full.txt: every page's markdown in one file (home first, then by
// route), each preceded by a separator and its URL, so a model can load the
// whole guidebook in one fetch. Front matter is dropped; the URL line and the
// page's own H1 carry the same information.
fullDocs.sort((a, b) => (a.route === '/' ? -1 : b.route === '/' ? 1 : a.route.localeCompare(b.route)))
const fullText = fullDocs
  .map(({ route, md }) => `Source: ${SITE_URL}${route}\n\n${md.replace(/^---\n[\s\S]*?\n---\n/, '').trim()}`)
  .join('\n\n---\n\n')
writeFileSync(join(buildDir, 'llms-full.txt'), `# Commonway System, full text\n\nEvery page of the Commonway System guidebook as markdown, concatenated. Index and per-page files: ${SITE_URL}/llms.txt\n\n---\n\n${fullText}\n`)

console.log(`Markdown pages: wrote ${mdCount} .md files next to their pages, plus build/llms-full.txt`)
