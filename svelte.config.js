import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: vitePreprocess(),
  kit: {
    // Inline every stylesheet into the page (about 95 KB raw, around 15 KB
    // compressed) so no CSS request blocks first paint. Measured with
    // Lighthouse (mobile, slow 4G) on 2026.10.14: Lighthouse performance
    // 87-91 became 91-93, and LCP on Design Speed fell from 6.4 s to 2.9 s.
    inlineStyleThreshold: 100000,
    // Static adapter builds the whole guidebook to plain HTML/CSS/JS, which is
    // what commonwaysystem.org needs: no server required, easy to host anywhere,
    // and every pattern page is a real crawlable, linkable URL.
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      // Netlify serves build/404.html, with a real 404 status, for any URL
      // that has no file. It is SvelteKit's app shell, so the router renders
      // src/routes/+error.svelte inside the normal navbar/sidebar layout.
      fallback: '404.html',
      precompress: false,
      strict: true,
    }),
    prerender: {
      // '*' crawls every page reachable by a link, same as the default.
      // robots.txt, llms.txt, and sitemap.xml are +server.ts routes nothing
      // links to, so they need listing explicitly or the crawler never
      // finds them.
      entries: ['*', '/robots.txt', '/llms.txt', '/sitemap.xml', '/rss.xml', '/.well-known/agent-skills/index.json', '/.well-known/agent-skills/commonway-system/SKILL.md', '/.well-known/ai-catalog.json'],
      // Same for each page's JSON-LD copy (<page>.jsonld), /schemamap.xml and
      // the OKF bundle (/okf/, /okf.tar.gz), written by
      // scripts/generate-agent-files.mjs after this prerender.
      // Every page links to its text-only version under /text/ and its
      // markdown version (<page>.md, via <link rel="alternate">), and the Site Map
      // links /llms-full.txt. All are
      // written by scripts/generate-text-pages.mjs AFTER this prerender
      // finishes, so the crawler can't find those targets yet. Anything else
      // that 404s still fails the build.
      handleHttpError: ({ path, message }) => {
        if (path.startsWith('/text/') || path.endsWith('.md') || path.endsWith('.jsonld') || ['/llms-full.txt', '/schemamap.xml', '/okf.tar.gz'].includes(path) || path.startsWith('/okf/'))
          return
        throw new Error(message)
      },
    },
  },
}

export default config
