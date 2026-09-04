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
      // robots.txt and llms.txt are +server.ts routes nothing links to,
      // so they need listing explicitly or the crawler never finds them.
      entries: ['*', '/robots.txt', '/llms.txt'],
    },
  },
}

export default config
