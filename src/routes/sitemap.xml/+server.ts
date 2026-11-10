import { getSitePages } from '$lib/server/content.js'
import { lastCommitDate, pageSourcePath } from '$lib/server/git-dates.js'
import { SITE_URL } from '$lib/site.js'

// Prerendered to a plain static file, same as robots.txt and llms.txt (see
// prerender.entries in vite.config.ts's svelteKitOptions, nothing links to this route so
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
  const pages = getSitePages().filter(page => !page.utility)

  // Image sitemap extension: a page's featured image (frontmatter image:),
  // the same picture its social card and search thumbnail use.
  const urls = pages
    .map((page) => {
      const image = page.image ? `\n    <image:image>\n      <image:loc>${escapeXml(`${SITE_URL}${page.image}`)}</image:loc>\n    </image:image>` : ''
      // Each page's own last git commit date (the same one behind its visible
      // "Last updated" line and JSON-LD dateModified), W3C datetime format
      // (YYYY-MM-DD). Omitted when there's no git date (new uncommitted file,
      // or git unavailable) rather than guessing one.
      const committed = lastCommitDate(pageSourcePath(page.routePath))
      const lastmod = committed ? `\n    <lastmod>${committed.slice(0, 10)}</lastmod>` : ''
      return `  <url>\n    <loc>${escapeXml(`${SITE_URL}${page.routePath}`)}</loc>${lastmod}${image}\n  </url>`
    })
    .join('\n')

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`

  return new Response(body, {
    headers: { 'content-type': 'application/xml; charset=utf-8' },
  })
}
