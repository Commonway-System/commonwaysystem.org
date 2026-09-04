import type { Element, Root } from 'hast'

function arrowIcon(d: string): Element {
  return {
    type: 'element',
    tagName: 'svg',
    properties: {
      viewBox: '0 0 24 24',
      width: 13,
      height: 13,
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '1.8',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      ariaHidden: 'true',
    },
    children: [{ type: 'element', tagName: 'path', properties: { d }, children: [] }],
  }
}

function scrollHint(): Element {
  return {
    type: 'element',
    tagName: 'div',
    properties: { className: ['cw-table-hint'], ariaHidden: 'true' },
    children: [
      arrowIcon('M19 12H5M11 6l-6 6 6 6'),
      { type: 'element', tagName: 'span', properties: {}, children: [{ type: 'text', value: 'Scroll for more' }] },
      arrowIcon('M5 12h14M13 6l6 6-6 6'),
    ],
  }
}

function wrapTable(table: Element): Element {
  return {
    type: 'element',
    tagName: 'div',
    properties: { className: ['cw-table-wrap'] },
    children: [
      scrollHint(),
      {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['cw-table-scroll'],
          tabIndex: 0,
          role: 'group',
          ariaLabel: 'Scrollable table. Use arrow keys, or swipe, to see columns beyond the visible area.',
        },
        children: [table],
      },
    ],
  }
}

function walk(nodes: any[]): any[] {
  return nodes.map((node) => {
    if (node.type === 'element' && node.tagName === 'table')
      return wrapTable(node)

    if (node.children)
      node.children = walk(node.children)

    return node
  })
}

/**
 * Wraps every markdown table in a keyboard-focusable, horizontally
 * scrollable container plus a small "scroll for more" hint (shown only
 * once client JS confirms the table actually overflows, see
 * layout.ts's initTableScrollHints), so a table wider than the content
 * column scrolls in its own box instead of bleeding past the page (see
 * base.css's .cw-table-* rules for the scroll shadow and scrollbar
 * styling). Deliberately a plain div wrapper rather than CSS `display:
 * block`/`overflow-x` on the <table> itself: forcing a table's own
 * display off `table` strips its implicit ARIA table/row/cell roles in
 * some browsers, breaking screen-reader table semantics.
 *
 * Exported as a zero-arg function, not a plugin instance created inline,
 * to match SveltePress's rehype pipeline convention (see the same note on
 * headingAnchors and externalLinks).
 */
export function tableScroll() {
  return (tree: Root) => {
    tree.children = walk(tree.children as any[]) as Root['children']
  }
}
