import type { Root } from 'hast'
import { visit } from 'unist-util-visit'

const HEADING_TAGS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])

/**
 * Pairs with rehype-slug: once headings have an id, this prepends a small
 * "#" anchor link so any heading can be linked to directly. Kept as a
 * standalone plugin (rather than rehype-autolink-headings) so it takes no
 * options object, since SveltePress's rehype pipeline only calls
 * `.use(plugin)` and does not unwrap `[plugin, options]` tuples for rehype.
 */
export function headingAnchors(): ReturnType<Plugin<[], Root>> {
  return (tree: any) => {
    visit(tree, 'element', (node: any) => {
      if (!HEADING_TAGS.has(node.tagName) || !node.properties?.id)
        return

      node.children = [
        {
          type: 'element',
          tagName: 'a',
          properties: {
            href: `#${node.properties.id}`,
            className: ['svp-heading-anchor'],
            ariaLabel: 'Link to this heading',
          },
          children: [{ type: 'text', value: '#' }],
        },
        ...node.children,
      ]
    })
  }
}
