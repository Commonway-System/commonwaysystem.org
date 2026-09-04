import type { PluginOption } from 'vite'
import rehypeSlug from 'rehype-slug'
import remarkDirective from 'remark-directive'
import remarkGfm from 'remark-gfm'
import { admonitions } from './markdown/admonitions.js'
import { externalLinks } from './markdown/external-links.js'
import { createHighlighter } from './highlighter.js'
import { headingAnchors } from './markdown/heading-anchors.js'
import type { CommonwayThemeOptions } from './config.js'

export type { CommonwayThemeOptions, NavLink, SidebarLink } from './config.js'

export const OPTIONS_MODULE_ID = 'virtual:commonway/options'
const RESOLVED_OPTIONS_MODULE_ID = `\0${OPTIONS_MODULE_ID}`

function optionsPlugin(options: CommonwayThemeOptions): PluginOption {
  return {
    name: 'commonway-theme-options',
    resolveId(id) {
      if (id === OPTIONS_MODULE_ID)
        return RESOLVED_OPTIONS_MODULE_ID
    },
    load(id) {
      if (id === RESOLVED_OPTIONS_MODULE_ID)
        return `export default ${JSON.stringify(options)}`
    },
  }
}

/**
 * The Commonway theme for SveltePress. Keeps the layout shell (navbar,
 * collapsible sidebar, on-this-page rail, prev/next footer) that SveltePress's
 * default theme is known for, rebuilt from scratch with Commonway System
 * branding: Fraunces + Inter type, the jewel-tone palette, amber reserved for
 * pattern highlighting and unsourced-claim flags, and no borrowed CSS.
 */
export function commonwayTheme(options: CommonwayThemeOptions) {
  return {
    name: 'commonway-theme',
    globalLayout: '$lib/theme/components/GlobalLayout.svelte',
    pageLayout: '$lib/theme/components/PageLayout.svelte',
    vitePlugins: [optionsPlugin(options)],
    highlighter: createHighlighter,
    remarkPlugins: [remarkGfm, remarkDirective, admonitions],
    rehypePlugins: [rehypeSlug, headingAnchors, externalLinks],
  }
}
