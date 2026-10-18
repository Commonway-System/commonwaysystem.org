import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Element, Root } from 'hast'
import { parse } from 'yaml'
import { thumbUrl } from '../../thumbs.js'

// Pattern and Retrofit Strategy link cards (the `<div class="cw-links">`
// lists under Related patterns, Target patterns, Related retrofit
// strategies and Retrofit path options) get a small featured image on the
// left, the same image and tint the index cards use. The markdown stays a
// plain list; this plugin adds one decorative <span> to each entry whose
// first link points at a Pattern or Retrofit Strategy page, and base.css
// lays it out (and stretches the first link over the whole card).
//
// The wrapper div is raw HTML in the markdown, so it is an opaque `raw` node
// at this stage (see CLAUDE.md's raw-HTML note): the `<ul>` is matched as a
// top-level sibling that follows a raw node mentioning `cw-links`.

const PLACEHOLDER = '/patterns/pattern-placeholder.svg'

// Route segment to the Pattern classification whose color the card borrows
// (a Retrofit Strategy borrows its Pattern peer's, as RetrofitIndexCard does).
const PATTERN_CLASS: Record<string, string> = {
  network: 'network',
  corridors: 'corridor',
  'local-streets': 'local',
  collectors: 'collector',
  arterials: 'arterial',
  freeways: 'freeway',
  intersections: 'intersections',
  facilities: 'facility',
  elements: 'element',
}
const RETROFIT_CLASS: Record<string, string> = {
  corridor: 'corridor',
  intersection: 'intersections',
  network: 'network',
}

const imageCache = new Map<string, string | null>()

function frontmatterImage(href: string): string | null {
  const cached = imageCache.get(href)
  if (cached !== undefined)
    return cached
  let image: string | null = null
  try {
    const raw = readFileSync(join(process.cwd(), 'src/routes', href, '+page.md'), 'utf8')
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
    const value = match ? parse(match[1])?.image : null
    image = typeof value === 'string' && value ? value : null
  }
  catch {
    image = null
  }
  imageCache.set(href, image)
  return image
}

function classificationFor(href: string): string | null {
  const [section, group] = href.split('/').filter(Boolean)
  if (section === 'patterns')
    return PATTERN_CLASS[group] ?? null
  if (section === 'retrofits')
    return RETROFIT_CLASS[group] ?? null
  return null
}

function cardImage(href: string, classification: string): Element {
  const source = frontmatterImage(href)
  return {
    type: 'element',
    tagName: 'span',
    properties: {
      className: ['cw-link-card__img'],
      dataClassification: classification,
      dataPagefindIgnore: 'all',
      ariaHidden: 'true',
    },
    children: [
      {
        type: 'element',
        tagName: 'img',
        properties: {
          src: source ? thumbUrl(source, 480) : PLACEHOLDER,
          alt: '',
          loading: 'lazy',
          decoding: 'async',
        },
        children: [],
      },
      { type: 'element', tagName: 'span', properties: { className: ['cw-link-card__tint'] }, children: [] },
    ],
  }
}

function decorate(list: Element) {
  for (const li of list.children as any[]) {
    if (li.type !== 'element' || li.tagName !== 'li')
      continue
    const link = (li.children as any[]).find((c) => c.type === 'element' && c.tagName === 'a')
    const href = link?.properties?.href
    if (typeof href !== 'string' || !href.startsWith('/'))
      continue
    const classification = classificationFor(href)
    if (!classification)
      continue
    const classes = (li.properties?.className as string[] | undefined) ?? []
    li.properties = { ...li.properties, className: [...classes, 'cw-link-card'] }
    li.children.push(cardImage(href, classification))
  }
}

export function linkCards() {
  return (tree: Root) => {
    let inside = false
    for (const node of tree.children as any[]) {
      if (node.type === 'raw' && typeof node.value === 'string') {
        if (node.value.includes('cw-links'))
          inside = true
        else if (inside && node.value.includes('</div>'))
          inside = false
      }
      else if (inside && node.type === 'element' && node.tagName === 'ul') {
        decorate(node)
      }
    }
  }
}
