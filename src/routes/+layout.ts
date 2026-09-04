// The guidebook has no server-only data, every page can be built to plain
// HTML ahead of time. This is what makes `@sveltejs/adapter-static` work.
export const prerender = true

// Every link in the theme (navbar, sidebar, prev/next) is written with a
// trailing slash, so build folder+index.html per route rather than flat
// route.html files. Keeps clean URLs working on any static host, not just
// ones that rewrite trailing slashes automatically.
export const trailingSlash = 'always'
