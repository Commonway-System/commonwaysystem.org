import { getSitePages } from '$lib/server/content.js'
import { SITE_URL } from '$lib/site.js'

// Prerendered to a plain static file, same as robots.txt, generated from
// every +page.md's frontmatter at build time. Add a page, it shows up here
// automatically; nothing to hand-maintain.
export const prerender = true

const SECTION_LABELS: Record<string, string> = {
  guide: 'Guide',
  patterns: 'Patterns',
  retrofits: 'Retrofits',
  media: 'Media',
  references: 'Reference',
  blog: 'Blog',
  about: 'About',
}

function sectionOf(routePath: string): string {
  if (routePath === '/')
    return ''
  return routePath.split('/').filter(Boolean)[0] ?? ''
}

export function GET() {
  const pages = getSitePages()

  // Pages flagged llmsOptional (stub/placeholder content) go in their own
  // "## Optional" section at the end, per the llms.txt spec's convention
  // for lower-priority links a context-constrained reader can skip,
  // instead of their normal section.
  const optionalPages = pages.filter(page => page.llmsOptional)
  const mainPages = pages.filter(page => !page.llmsOptional)

  const sections = new Map<string, typeof pages>()
  for (const page of mainPages) {
    const key = sectionOf(page.routePath)
    if (!sections.has(key))
      sections.set(key, [])
    sections.get(key)!.push(page)
  }

  function bullet(page: (typeof pages)[number]) {
    const summary = page.llms ?? page.description ?? page.title
    return `- [${page.title}](${SITE_URL}${page.routePath}): ${summary}`
  }

  const lines: string[] = [
    '# Commonway System',
    '',
    '> A Pattern Language for Roads and Streets. One system, grounded in what\'s proven.',
    '',
    'The Commonway System (CS) organizes established transportation design knowledge, from NACTO\'s guides to Dutch Sustainable Safety and Vision Zero research, into a single, cross-referenced pattern language. Every claim traces back to a cited source rather than a credential, and each page opens with a plain-language answer before the technical depth beneath it.',
    '',
  ]

  const home = sections.get('')
  if (home) {
    for (const page of home) lines.push(bullet(page))
    lines.push('')
    sections.delete('')
  }

  for (const [key, secPages] of sections) {
    lines.push(`## ${SECTION_LABELS[key] ?? key}`, '')
    for (const page of secPages) lines.push(bullet(page))
    lines.push('')
  }

  if (optionalPages.length) {
    lines.push('## Optional', '')
    for (const page of optionalPages) lines.push(bullet(page))
    lines.push('')
  }

  const body = `${lines.join('\n').trimEnd()}\n`

  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  })
}
