import type { Root } from 'mdast'
import { visit } from 'unist-util-visit'

const KNOWN_KINDS = new Set(['note', 'tip', 'warning', 'danger', 'unsourced'])

const KIND_LABELS: Record<string, string> = {
  note: 'Note',
  tip: 'Tip',
  warning: 'Caution',
  danger: 'Avoid',
  unsourced: 'Unsourced claim',
}

/**
 * Renders remark-directive container blocks as admonitions:
 *
 *   :::warning[Optional custom title]
 *   Content goes here.
 *   :::
 *
 * Requires remark-directive to run first in the plugin chain so ::: blocks
 * are already parsed into containerDirective nodes; this plugin only
 * reshapes the recognized ones into the `svp-admonition` markup the theme's
 * CSS styles. Unrecognized directive names are left alone.
 */
export function admonitions() {
  return (tree: Root) => {
    visit(tree, (node) => node.type === 'containerDirective', (node: any) => {
      const kind = node.name
      if (!KNOWN_KINDS.has(kind))
        return

      const data = node.data || (node.data = {})
      const label = node.attributes?.title || KIND_LABELS[kind] || kind

      data.hName = 'div'
      data.hProperties = {
        className: ['svp-admonition', `svp-admonition--${kind}`],
      }

      node.children = [
        {
          type: 'paragraph',
          data: {
            hName: 'p',
            hProperties: { className: ['svp-admonition__label'] },
          },
          children: [{ type: 'text', value: label }],
        },
        ...node.children,
      ]
    })
  }
}
