import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: vitePreprocess(),
  kit: {
    // Static adapter builds the whole guidebook to plain HTML/CSS/JS, which is
    // what commonwaysystem.org needs: no server required, easy to host anywhere,
    // and every pattern page is a real crawlable, linkable URL.
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true,
    }),
    prerender: {
      // '*' crawls every page reachable by a link, same as the default.
      // robots.txt, llms.txt, and sitemap.xml are +server.ts routes nothing
      // links to, so they need listing explicitly or the crawler never
      // finds them.
      entries: ['*', '/robots.txt', '/llms.txt', '/sitemap.xml'],
      // Every page links to its text-only version under /text/ and its
      // markdown version (<page>.md, via <link rel="alternate">), and the Site Map
      // links /llms-full.txt. All are
      // written by scripts/generate-text-pages.mjs AFTER this prerender
      // finishes, so the crawler can't find those targets yet. Anything else
      // that 404s still fails the build.
      handleHttpError: ({ path, message }) => {
        if (path.startsWith('/text/') || path.endsWith('.md') || path === '/llms-full.txt')
          return
        throw new Error(message)
      },
    },
  },
}

export default config
