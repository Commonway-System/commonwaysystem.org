import type { Element } from 'hast'
import rehypeExternalLinksPlugin from 'rehype-external-links'
import { isExternalHref } from '../../site.js'

const icon: Element = {
  type: 'element',
  tagName: 'svg',
  properties: {
    viewBox: '0 0 24 24',
    width: 13,
    height: 13,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    ariaHidden: 'true',
  },
  children: [
    { type: 'element', tagName: 'path', properties: { d: 'M7 17L17 7M8 7h9v9' }, children: [] },
  ],
}

const newTabNote: Element = {
  type: 'element',
  tagName: 'span',
  properties: { className: ['cw-sr-only'] },
  children: [{ type: 'text', value: ' (opens in new tab)' }],
}

/**
 * Every link in page content (citations, prose links, image-links) pointing
 * at a different hostname gets target="_blank" and
 * rel="nofollow noopener noreferrer" automatically, no markdown authoring
 * required. noopener/noreferrer close the reverse-tabnabbing hole target
 * _blank otherwise opens; nofollow matches the reference-site convention
 * (Wikipedia does the same) of citing sources without editorially vouching
 * for them. The appended icon + sr-only text satisfy WCAG 3.2.5: opening a
 * new tab is an unannounced context change unless assistive tech is told,
 * not just sighted users looking at the icon.
 *
 * Exported as a zero-arg function, not `rehypeExternalLinksPlugin(options)`
 * called inline, because SveltePress's rehype pipeline only calls
 * `.use(plugin)` on each rehypePlugins entry and does not unwrap
 * `[plugin, options]` tuples (see the same note on headingAnchors). Wrapping
 * the configured call in a zero-arg function reproduces `.use(plugin,
 * options)` semantics by hand.
 */
export function externalLinks() {
  return rehypeExternalLinksPlugin({
    target: '_blank',
    rel: ['nofollow', 'noopener', 'noreferrer'],
    test: (element: Element) => isExternalHref(element.properties?.href),
    content: [icon, newTabNote],
    contentProperties: { className: ['cw-external-indicator'] },
  })
}
