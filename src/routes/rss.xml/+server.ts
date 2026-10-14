import { getSitePages } from '$lib/server/content.js'
import { SITE_URL } from '$lib/site.js'
import { getBlogPosts } from '$lib/theme/blog.js'

// RSS 2.0 feed of the Blog, prerendered to /rss.xml (listed in
// svelte.config.js's prerender entries) and advertised with
// <link rel="alternate"> in src/app.html. Built from the same glob the Blog
// index uses, so a new post appears here automatically.
export const prerender = true

function esc(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

const rfc822 = (iso: string) => new Date(`${iso}T12:00:00Z`).toUTCString()

export function GET() {
  const posts = getBlogPosts().filter(p => p.date)
  const llms = new Map(getSitePages().map(p => [p.routePath, p.llms]))
  const items = posts.map((p) => {
    const url = `${SITE_URL}${p.routePath}`
    const description = p.description ?? llms.get(p.routePath) ?? ''
    return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(p.date)}</pubDate>
      <description>${esc(description)}</description>
    </item>`
  }).join('\n')

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Commonway System Blog</title>
    <link>${SITE_URL}/blog/</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>How the Commonway System guidebook gets built: research notes, structural decisions, new patterns and corrections.</description>
    <language>en-us</language>
${posts[0] ? `    <lastBuildDate>${rfc822(posts[0].date)}</lastBuildDate>\n` : ''}${items}
  </channel>
</rss>
`
  return new Response(body, { headers: { 'content-type': 'application/rss+xml; charset=utf-8' } })
}
