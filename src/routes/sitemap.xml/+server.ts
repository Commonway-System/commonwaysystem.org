import { getSitePages } from '$lib/server/content.js'
import { SITE_URL } from '$lib/site.js'

// Prerendered to a plain static file, same as robots.txt and llms.txt (see
// kit.prerender.entries in svelte.config.js, nothing links to this route so
// it needs listing explicitly). Generated from every +page.md at build
// time, so a new page shows up here automatically, nothing to hand-maintain.
export const prerender = true

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function GET() {
  const pages = getSitePages()

  // W3C datetime (YYYY-MM-DD), the format the sitemap spec wants, not
  // CalVer's dot-separated one. Same "this build's date" freshness signal
  // used elsewhere on the site (the navbar version, llms.txt), since there
  // is no per-page last-modified data to draw from instead.
  const lastmod = new Date().toISOString().slice(0, 10)

  const urls = pages
    .map(page => `  <url>\n    <loc>${escapeXml(`${SITE_URL}${page.routePath}`)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
    .join('\n')

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`

  return new Response(body, {
    headers: { 'content-type': 'application/xml; charset=utf-8' },
  })
}
