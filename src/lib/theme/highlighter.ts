import type { BundledLanguage } from 'shiki/langs'
import { createHighlighter as createShikiHighlighter } from 'shiki'

// Code themes are named for the site's light/dark modes. Swap these for
// custom-built Shiki themes later if the jewel-tone palette needs to reach
// into syntax highlighting too; for now these are close, readable defaults.
const LIGHT_THEME = 'vitesse-light'
const DARK_THEME = 'vitesse-dark'

let highlighterPromise: ReturnType<typeof createShikiHighlighter> | undefined

async function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createShikiHighlighter({
      themes: [LIGHT_THEME, DARK_THEME],
      langs: ['svelte', 'sh', 'bash', 'js', 'ts', 'html', 'css', 'json', 'md', 'yaml'],
    })
  }
  return highlighterPromise
}

/**
 * Matches the `Highlighter` type SveltePress expects: a function that turns
 * a code string into an HTML string for a given language. Rendering both
 * themes and toggling with CSS keeps light/dark switching instant, with no
 * re-render needed when the reader flips modes.
 */
export async function createHighlighter(code: string, lang: BundledLanguage, meta?: string) {
  const highlighter = await getHighlighter()
  const loadedLangs = highlighter.getLoadedLanguages()
  const safeLang = loadedLangs.includes(lang) ? lang : 'text'
  return highlighter.codeToHtml(code, {
    lang: safeLang as BundledLanguage,
    themes: { light: LIGHT_THEME, dark: DARK_THEME },
    defaultColor: false,
    meta: meta ? { __raw: meta } : undefined,
  })
}
