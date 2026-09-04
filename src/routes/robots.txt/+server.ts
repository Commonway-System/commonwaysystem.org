import { SITE_URL } from '$lib/site.js'

// Prerendered to a plain static file (see kit.prerender.entries in
// svelte.config.js, nothing links to this route so it needs listing
// explicitly). The whole guidebook is public, so this is deliberately a
// blanket allow; add Disallow lines here if that ever changes.
export const prerender = true

export function GET() {
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`

  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  })
}
