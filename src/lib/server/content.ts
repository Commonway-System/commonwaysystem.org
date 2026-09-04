import { parse } from 'yaml'

export interface PageMeta {
  /** Always trailing-slashed, e.g. "/guide/introduction/", or "/" for home. */
  routePath: string
  title: string
  description?: string
  /** Short plain-language summary for llms.txt. Falls back to description, then title. */
  llms?: string
  /** Lists this page under llms.txt's "## Optional" section (the spec's term for lower-priority links a context-constrained reader can skip), instead of its normal section. For stub/placeholder pages. */
  llmsOptional?: boolean
}

// Raw source of every +page.md, read at build/dev time. `?raw` bypasses the
// Svelte/markdown compilation pipeline so this stays plain text, not a
// compiled component, and works from a +server.ts endpoint.
const pageModules = import.meta.glob('/src/routes/**/+page.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

function deriveRoutePath(filePath: string): string {
  const rel = filePath.replace(/^\/src\/routes/, '').replace(/\/\+page\.md$/, '')
  return rel === '' ? '/' : `${rel}/`
}

function parseFrontmatter(raw: string): Record<string, unknown> {
  if (!raw.startsWith('---'))
    return {}
  const end = raw.indexOf('\n---', 3)
  if (end === -1)
    return {}
  const yamlText = raw.slice(4, end)
  try {
    return (parse(yamlText) as Record<string, unknown>) ?? {}
  }
  catch {
    return {}
  }
}

/** Every page in the site, derived from the +page.md files themselves, so new pages show up automatically. */
export function getSitePages(): PageMeta[] {
  const pages = Object.entries(pageModules).map(([filePath, raw]) => {
    const fm = parseFrontmatter(raw)
    const routePath = deriveRoutePath(filePath)
    return {
      routePath,
      title: typeof fm.title === 'string' ? fm.title : routePath,
      description: typeof fm.description === 'string' ? fm.description : undefined,
      llms: typeof fm.llms === 'string' ? fm.llms : undefined,
      llmsOptional: fm.llmsOptional === true,
    }
  })
  pages.sort((a, b) => a.routePath.localeCompare(b.routePath))
  return pages
}
