// Every page still builds to plain HTML ahead of time, this is what makes
// `@sveltejs/adapter-static` work. The root +layout.server.ts's git-log
// lookup (for the "Last updated" date) is server-only load logic, but it
// still runs once per route at build time under prerendering, no runtime
// server needed after that.
export const prerender = true

// Every link in the theme (navbar, sidebar, prev/next) is written with a
// trailing slash, so build folder+index.html per route rather than flat
// route.html files. Keeps clean URLs working on any static host, not just
// ones that rewrite trailing slashes automatically.
export const trailingSlash = 'always'
