import { parse } from 'yaml'

export interface BlogPostMeta {
  /** Always trailing-slashed, e.g. "/blog/welcome/". */
  routePath: string
  title: string
  description?: string
  /** ISO date (YYYY-MM-DD) from frontmatter, required for every post so the index can sort. */
  date: string
}

// Same import.meta.glob + hand-rolled frontmatter approach as
// $lib/server/content.ts's getSitePages(), deliberately duplicated rather
// than shared: this file is imported from BlogIndex.svelte, a page-rendered
// component, and $lib/server/* is off-limits to client code (SvelteKit's
// own build-time guard rejects it), even though the underlying glob is
// itself just as build-time-static as content.ts's.
const postModules = import.meta.glob('/src/routes/blog/*/+page.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

function deriveRoutePath(filePath: string): string {
  return `${filePath.replace(/^\/src\/routes/, '').replace(/\/\+page\.md$/, '')}/`
}

function parseFrontmatter(raw: string): Record<string, unknown> {
  if (!raw.startsWith('---'))
    return {}
  const end = raw.indexOf('\n---', 3)
  if (end === -1)
    return {}
  try {
    return (parse(raw.slice(4, end)) as Record<string, unknown>) ?? {}
  }
  catch {
    return {}
  }
}

/** Every post under /blog/, newest first. A post without a `date` frontmatter field sorts last. */
export function getBlogPosts(): BlogPostMeta[] {
  const posts = Object.entries(postModules).map(([filePath, raw]) => {
    const fm = parseFrontmatter(raw)
    return {
      routePath: deriveRoutePath(filePath),
      title: typeof fm.title === 'string' ? fm.title : filePath,
      description: typeof fm.description === 'string' ? fm.description : undefined,
      date: typeof fm.date === 'string' ? fm.date : '',
    }
  })
  posts.sort((a, b) => b.date.localeCompare(a.date))
  return posts
}
