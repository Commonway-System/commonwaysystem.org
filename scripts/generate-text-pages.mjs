// Post-build step: for every prerendered page in build/, writes a plain,
// text-only version to build/text/<same path>/index.html (the homepage's is
// build/text/index.html), built from the page's already-rendered <main>
// content. Working from the rendered HTML (not the source markdown) is what
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

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const buildDir = join(root, 'build')
const siteSource = readFileSync(join(root, 'src/lib/site.ts'), 'utf8')
const SITE_URL = (siteSource.match(/SITE_URL\s*=\s*['"]([^'"]+)['"]/)?.[1] ?? '').replace(/\/$/, '')

const KEEP_ATTRS = new Set(['href', 'id', 'colspan', 'rowspan', 'scope', 'open', 'lang'])
const DROP_SELECTORS = [
  'script', 'style', 'canvas', 'button', 'iframe', 'video', 'audio', 'form', 'input', 'select', 'textarea',
  '.toc-mobile', '.page__meta', '.page__legal', '.pagenav', '.svp-heading-anchor',
  '.cw-external-indicator', 'a .cw-sr-only', '.cw-table-hint', '.hero__motion', '.hero-glow', '.ink-halftone',
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

const routes = new Set(findPages(buildDir).map(routeOf))

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

function cleanMain(main) {
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
        el.setAttribute('href', textHref(href))
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

const listing = []
let count = 0

for (const file of findPages(buildDir)) {
  const route = routeOf(file)
  const doc = parse(readFileSync(file, 'utf8'))
  const main = doc.querySelector('main#main-content')
  if (!main)
    continue // not a content page (nothing to make a text version of)

  const rawTitle = (doc.querySelector('title')?.text ?? route).trim()
  const title = rawTitle.replace(/\s*[·|]\s*Commonway System\s*$/, '')
  cleanMain(main)

  const outDir = route === '/' ? join(buildDir, 'text') : join(buildDir, 'text', route)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), shell({ title, canonicalPath: route, body: main.innerHTML, fullHref: route }))
  listing.push({ route, title })
  count++
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
