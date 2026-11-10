import { existsSync, readFileSync, statSync } from 'node:fs'
import { extname, resolve } from 'node:path'
import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { sveltepress } from '@sveltepress/vite'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import { commonwayTheme } from './src/lib/theme/index.js'

// All of the site's actual navigation, sidebar grouping, and branding text
// lives here. This is the file you edit as the guidebook grows, you should
// not need to touch anything under src/lib/theme for day-to-day content work.
const theme = commonwayTheme({
  siteTitle: 'Commonway System',
  logoText: 'Commonway',
  navbar: [
    { title: 'Home', to: '/' },
    { title: 'Guide', to: '/guide/' },
    { title: 'Patterns', to: '/patterns/' },
    { title: 'Retrofits', to: '/retrofits/' },
    { title: 'Media', to: '/media/' },
    { title: 'Reference', to: '/references/' },
    { title: 'Blog', to: '/blog/' },
    { title: 'About', to: '/about/' },
  ],
  github: 'https://github.com/Commonway-System/commonwaysystem.org',
  editLink:
    'https://github.com/Commonway-System/commonwaysystem.org/edit/main/src/routes/:route',
  footerNote:
    'Commonway System Guidebook \u00b7 A Pattern Language for Roads and Streets',
  googleAnalyticsId: 'G-VCDS38HY87',
  // Manual sidebar, keyed by route prefix, same shape as SveltePress's
  // default theme. Replace this placeholder structure with the real
  // Functional Classification / Street Typology tree as it firms up.
  sidebar: {
    '/guide/': [
      // Ungrouped landing-page entry, same idea as '/about/''s own Overview
      // item: the section's front page listed first, not buried a level
      // down inside one of the named groups below it.
      { title: 'Start Here', to: '/guide/' },
      {
        title: 'Core Concepts',
        collapsible: false,
        items: [
          {
            title: 'How the Transportation Ecosystem Fits Together',
            to: '/guide/how-the-transportation-ecosystem-fits-together/',
          },
          { title: 'Design Speed & Speed Limits', to: '/guide/design-speed/' },
          { title: 'Induced Demand', to: '/guide/induced-demand/' },
        ],
      },
      {
        title: 'Using the System',
        collapsible: false,
        // Find Your Pattern is a placeholder for a future diagnostic; it
        // stays in the sidebar here even though the tool isn't built yet.
        items: [
          {
            title: 'How to read a pattern',
            to: '/guide/how-to-read-a-pattern/',
          },
          {
            title: 'How to read a retrofit strategy',
            to: '/guide/how-to-read-a-retrofit-strategy/',
          },
          { title: 'Scale Hierarchy', to: '/guide/scale-hierarchy/' },
          {
            title: 'Street Types & Classifications',
            to: '/guide/street-types/',
          },
          { title: 'Density Tiers', to: '/guide/density-tiers/' },
          { title: 'Pattern IDs', to: '/guide/pattern-ids/' },
          { title: 'Find Your Pattern', to: '/guide/find-your-pattern/' },
          { title: 'Streets on Bridges', to: '/guide/streets-on-bridges/' },
        ],
      },
      {
        title: 'Make It Happen',
        collapsible: false,
        // This group was built to hold several pages (who decides, how it's funded, how to
        // submit a request) as they're written, one placeholder page
        // originally held the slot. As of 2026.09.01 the slot's real
        // content has landed: the process-explainer chapter itself, plus
        // its companion jurisdiction-variants reference page. As of
        // 2026.09.03, four more pages landed as Retrofit Strategies
        // scaffolding (Batch 1): two tool catalogs and two implementation-
        // mechanics pages. No Retrofit Strategy entries exist yet, this
        // batch only builds what they'll cross-link to; Batch 2 adds the
        // catalog itself. Slugs sit directly under /guide/, not nested
        // under /guide/make-it-happen/, only the sidebar grouping is
        // nested. The batch's fifth page, "How to read a retrofit
        // strategy," lives in Using the System instead, directly under
        // "How to read a pattern," since it's that page's sibling
        // instructional page, not a Make It Happen tool.
        items: [
          {
            title: 'How Road Changes Actually Happen',
            to: '/guide/make-it-happen/',
          },
          {
            title: "When Jurisdiction Doesn't Follow the Pattern",
            to: '/guide/make-it-happen/jurisdiction-variants/',
          },
          {
            title: 'Legal & Planning Mechanisms',
            to: '/guide/legal-planning-mechanisms/',
          },
          {
            title: 'Funding & Financing Mechanisms',
            to: '/guide/funding-financing-mechanisms/',
          },
          {
            title: 'Decision & Evaluation Processes',
            to: '/guide/decision-evaluation-processes/',
          },
          {
            title: 'Construction Methodology & The Build Spectrum',
            to: '/guide/construction-methodology-spectrum/',
          },
        ],
      },
    ],
    '/patterns/': [
      {
        title: 'Network',
        collapsible: true,
        items: [
          { title: 'Grid', to: '/patterns/network/grid/' },
          {
            title: 'Dendritic / Hierarchical',
            to: '/patterns/network/dendritic-hierarchical/',
          },
          { title: 'Radial', to: '/patterns/network/radial/' },
          {
            title: 'Organic / Irregular',
            to: '/patterns/network/organic-irregular/',
          },
        ],
      },
      {
        title: 'Corridors',
        collapsible: true,
        items: [
          {
            title: 'Density Step-Down / Step-Up',
            to: '/patterns/corridors/density-step-down-step-up/',
          },
          {
            title: 'Rural-to-Town Gateway',
            to: '/patterns/corridors/rural-to-town-gateway/',
          },
          {
            title: 'Character Transect',
            to: '/patterns/corridors/character-transect/',
          },
          {
            title: 'Rail-With-Trail Corridor',
            to: '/patterns/corridors/rail-with-trail-corridor/',
          },
          {
            title: 'Road-Adjacent Greenway',
            to: '/patterns/corridors/road-adjacent-greenway/',
          },
          {
            title: 'Transit Alignment Corridor',
            to: '/patterns/corridors/transit-alignment-corridor/',
          },
        ],
      },
      {
        title: 'Local Streets',
        collapsible: true,
        items: [
          {
            title: 'Default (Standard Local Street)',
            to: '/patterns/local-streets/default/',
          },
          { title: 'Alley', to: '/patterns/local-streets/alley/' },
          { title: 'Cul-de-sac', to: '/patterns/local-streets/cul-de-sac/' },
          {
            title: 'Frontage / Service Road',
            to: '/patterns/local-streets/frontage-service-road/',
          },
          { title: 'Main Street', to: '/patterns/local-streets/main-street/' },
          {
            title: 'Living Street / Woonerf',
            to: '/patterns/local-streets/living-street-woonerf/',
          },
          {
            title: 'Yield Street',
            to: '/patterns/local-streets/yield-street/',
          },
          {
            title: 'Festival Street',
            to: '/patterns/local-streets/festival-street/',
          },
          {
            title: 'Pedestrian-only Street / Plaza',
            to: '/patterns/local-streets/pedestrian-plaza/',
          },
          {
            title: 'Local Transit',
            to: '/patterns/local-streets/local-transit/',
          },
          {
            title: 'Bicycle Boulevard / Neighborhood Greenway',
            to: '/patterns/local-streets/bicycle-boulevard/',
          },
          {
            title: 'School Street',
            to: '/patterns/local-streets/school-street/',
          },
          {
            title: 'Shared-Use Path',
            to: '/patterns/local-streets/shared-use-path/',
          },
        ],
      },
      {
        title: 'Collectors',
        collapsible: true,
        items: [
          {
            title: 'Default (Standard Collector)',
            to: '/patterns/collectors/default/',
          },
          {
            title: 'Rural Collector / Farm-to-Market Road',
            to: '/patterns/collectors/rural-collector/',
          },
          {
            title: 'Industrial Collector',
            to: '/patterns/collectors/industrial-collector/',
          },
          {
            title: 'Bike Highway / Greenway',
            to: '/patterns/collectors/bike-highway-greenway/',
          },
          {
            title: 'Collector Transit',
            to: '/patterns/collectors/collector-transit/',
          },
          {
            title: 'Multi-Use Trail / Greenway',
            to: '/patterns/collectors/multi-use-trail-greenway/',
          },
          {
            title: 'Downtown Thoroughfare',
            to: '/patterns/collectors/downtown-thoroughfare/',
          },
        ],
      },
      {
        title: 'Arterials',
        collapsible: true,
        items: [
          {
            title: 'Default (No Parking, No Direct Access)',
            to: '/patterns/arterials/default/',
          },
          { title: 'Boulevard', to: '/patterns/arterials/boulevard/' },
          {
            title: 'Scenic Highway / Byway',
            to: '/patterns/arterials/scenic-highway-byway/',
          },
          {
            title: 'Arterial Transit (BRT/LRT)',
            to: '/patterns/arterials/arterial-transit/',
          },
          {
            title: 'Stroad (Commercial Arterial)',
            to: '/patterns/arterials/stroad/',
          },
          {
            title: 'One-Way Street',
            to: '/patterns/arterials/one-way-street/',
          },
          { title: 'Parkway', to: '/patterns/arterials/parkway/' },
        ],
      },
      {
        title: 'Freeways',
        collapsible: true,
        items: [
          { title: 'Default (Freeway)', to: '/patterns/freeways/default/' },
          { title: 'Expressway', to: '/patterns/freeways/expressway/' },
          {
            title: 'Beltway / Ring Road',
            to: '/patterns/freeways/beltway-ring-road/',
          },
          {
            title: 'Freeway-scale Transit (Commuter/Heavy Rail)',
            to: '/patterns/freeways/freeway-transit/',
          },
        ],
      },
      {
        title: 'Intersections and Crossings',
        collapsible: true,
        items: [
          {
            title: 'Roundabout (Single/Multi-Lane)',
            to: '/patterns/intersections/roundabout/',
          },
          {
            title: 'Turbo-Roundabout',
            to: '/patterns/intersections/turbo-roundabout/',
          },
          { title: 'Signal', to: '/patterns/intersections/signal/' },
          {
            title: 'All-Way Stop',
            to: '/patterns/intersections/all-way-stop/',
          },
          {
            title: 'Stop / Yield (Two-Way)',
            to: '/patterns/intersections/stop-yield/',
          },
          {
            title: 'Continuous Sidewalk / Raised Junction',
            to: '/patterns/intersections/continuous-sidewalk/',
          },
          {
            title: 'Uncontrolled',
            to: '/patterns/intersections/uncontrolled/',
          },
          {
            title: 'Midblock Pedestrian Crossing',
            to: '/patterns/intersections/midblock-crossing/',
          },
          {
            title: 'Driveway / Curb Cut',
            to: '/patterns/intersections/driveway-curb-cut/',
          },
          {
            title: 'Grade-Separated Interchange',
            to: '/patterns/intersections/grade-separated-interchange/',
          },
          {
            title: 'Protected Intersection',
            to: '/patterns/intersections/protected-intersection/',
          },
          {
            title: 'Median U-Turn (MUT)',
            to: '/patterns/intersections/median-u-turn/',
          },
          {
            title: 'Restricted Crossing U-Turn (RCUT)',
            to: '/patterns/intersections/restricted-crossing-u-turn/',
          },
          {
            title: 'Displaced Left-Turn (DLT)',
            to: '/patterns/intersections/displaced-left-turn/',
          },
          {
            title: 'Railroad Grade Crossing',
            to: '/patterns/intersections/railroad-grade-crossing/',
          },
          {
            title: 'Grade-Separated Walk and Bike Crossing',
            to: '/patterns/intersections/grade-separated-walk-bike-crossing/',
          },
          {
            title: 'Walk and Bike Overpass',
            to: '/patterns/intersections/walk-bike-overpass/',
          },
        ],
      },
      {
        title: 'Facilities',
        collapsible: true,
        items: [
          {
            title: 'Transit Shelter',
            to: '/patterns/facilities/transit-shelter/',
          },
          {
            title: 'Transit Platform',
            to: '/patterns/facilities/transit-platform/',
          },
          {
            title: 'Transit Hub / Station',
            to: '/patterns/facilities/transit-hub-station/',
          },
          {
            title: 'Surface Parking Lot',
            to: '/patterns/facilities/surface-parking-lot/',
          },
          {
            title: 'Parking Garage / Structure',
            to: '/patterns/facilities/parking-garage-structure/',
          },
          { title: 'Park-and-Ride', to: '/patterns/facilities/park-and-ride/' },
          {
            title: 'Plaza / Parklet',
            to: '/patterns/facilities/plaza-parklet/',
          },
          {
            title: 'Bike Parking Corral',
            to: '/patterns/facilities/bike-parking-corral/',
          },
          {
            title: 'Bike-Share Station',
            to: '/patterns/facilities/bike-share-station/',
          },
          {
            title: 'Secure Bike Parking / Bike Station',
            to: '/patterns/facilities/secure-bike-parking-bike-station/',
          },
        ],
      },
      {
        title: 'Elements',
        collapsible: true,
        items: [
          { title: 'Curb', to: '/patterns/elements/curb/' },
          { title: 'Curb Extension', to: '/patterns/elements/curb-extension/' },
          { title: 'Curb Ramp', to: '/patterns/elements/curb-ramp/' },
          {
            title: 'Curb Cut / Driveway Apron',
            to: '/patterns/elements/curb-cut-driveway-apron/',
          },
          { title: 'Wheel Stop', to: '/patterns/elements/wheel-stop/' },
          {
            title: 'Vertical Speed Control',
            to: '/patterns/elements/vertical-speed-control/',
          },
          { title: 'Rumble Strip', to: '/patterns/elements/rumble-strip/' },
          { title: 'Crosswalk', to: '/patterns/elements/crosswalk/' },
          {
            title: 'Pedestrian Safety Island / Refuge',
            to: '/patterns/elements/pedestrian-safety-island-refuge/',
          },
          {
            title: 'Detectable Warning Surface',
            to: '/patterns/elements/detectable-warning-surface/',
          },
          {
            title: 'Regulatory Sign',
            to: '/patterns/elements/regulatory-sign/',
          },
          { title: 'Warning Sign', to: '/patterns/elements/warning-sign/' },
          { title: 'Guide Sign', to: '/patterns/elements/guide-sign/' },
          { title: 'Traffic Signal', to: '/patterns/elements/traffic-signal/' },
          {
            title: 'Pedestrian Signal',
            to: '/patterns/elements/pedestrian-signal/',
          },
          { title: 'Bicycle Signal', to: '/patterns/elements/bicycle-signal/' },
          { title: 'RRFB', to: '/patterns/elements/rrfb/' },
          {
            title: 'Pedestrian Hybrid Beacon',
            to: '/patterns/elements/pedestrian-hybrid-beacon/',
          },
          { title: 'Bioswale', to: '/patterns/elements/bioswale/' },
          {
            title: 'Flow-Through Planter',
            to: '/patterns/elements/flow-through-planter/',
          },
          { title: 'Pervious Strip', to: '/patterns/elements/pervious-strip/' },
          {
            title: 'Pervious Pavement',
            to: '/patterns/elements/pervious-pavement/',
          },
          {
            title: 'Traffic Barrier',
            to: '/patterns/elements/traffic-barrier/',
          },
          {
            title: 'Crash Cushion / End Terminal',
            to: '/patterns/elements/crash-cushion-end-terminal/',
          },
          { title: 'Bollard', to: '/patterns/elements/bollard/' },
          { title: 'Street Light', to: '/patterns/elements/street-light/' },
          {
            title: 'Pedestrian-scale Lighting',
            to: '/patterns/elements/pedestrian-scale-lighting/',
          },
          { title: 'Street Tree', to: '/patterns/elements/street-tree/' },
          {
            title: 'Tree Pit / Tree Trench',
            to: '/patterns/elements/tree-pit-tree-trench/',
          },
          {
            title: 'Landscaped Buffer Strip',
            to: '/patterns/elements/landscaped-buffer-strip/',
          },
          { title: 'Bench', to: '/patterns/elements/bench/' },
          {
            title: 'Trash / Recycling Receptacle',
            to: '/patterns/elements/trash-recycling-receptacle/',
          },
          {
            title: 'Drinking Fountain',
            to: '/patterns/elements/drinking-fountain/',
          },
          {
            title: 'Conventional Bike Lane',
            to: '/patterns/elements/conventional-bike-lane/',
          },
          {
            title: 'Buffered Bike Lane',
            to: '/patterns/elements/buffered-bike-lane/',
          },
          {
            title: 'Advisory Bike Lane',
            to: '/patterns/elements/advisory-bike-lane/',
          },
          {
            title: 'Protected Bike Lane / Cycle Track',
            to: '/patterns/elements/protected-bike-lane-cycle-track/',
          },
          {
            title: 'Green Pavement / Conflict Marking',
            to: '/patterns/elements/green-pavement-conflict-marking/',
          },
          { title: 'Sharrow (Avoid)', to: '/patterns/elements/sharrow/' },
          {
            title: 'Bike Parking / Rack',
            to: '/patterns/elements/bike-parking-rack/',
          },
          {
            title: 'Transit Boarding Island',
            to: '/patterns/elements/transit-boarding-island/',
          },
          { title: 'Bike Box', to: '/patterns/elements/bike-box/' },
          {
            title: 'Two-Stage Turn Queue Box',
            to: '/patterns/elements/two-stage-turn-queue-box/',
          },
          {
            title: 'Modal Filter / Point Closure',
            to: '/patterns/elements/modal-filter-point-closure/',
          },
          { title: 'Median Island', to: '/patterns/elements/median-island/' },
          {
            title: 'Neighborhood Traffic Circle / Mini-Roundabout',
            to: '/patterns/elements/neighborhood-traffic-circle-mini-roundabout/',
          },
        ],
      },
    ],
    '/retrofits/': [
      { title: 'Retrofit Strategy Index', to: '/retrofits/' },
      {
        title: 'Network',
        collapsible: true,
        items: [
          {
            title: 'Modal filtering / Low Traffic Neighborhood retrofit',
            to: '/retrofits/network/modal-filtering-low-traffic-neighborhood-retrofit/',
          },
          {
            title: 'Superblock retrofit',
            to: '/retrofits/network/superblock-retrofit/',
          },
          {
            title: 'Barrier-crossing / network reconnection retrofit',
            to: '/retrofits/network/barrier-crossing-network-reconnection-retrofit/',
          },
          { title: 'Freeway cap', to: '/retrofits/network/freeway-cap/' },
        ],
      },
      {
        title: 'Corridor',
        collapsible: true,
        items: [
          {
            title: 'Four-to-three lane road diet',
            to: '/retrofits/corridor/four-to-three-lane-road-diet/',
          },
          {
            title: 'Five-plus lane reallocation',
            to: '/retrofits/corridor/five-plus-lane-reallocation/',
          },
          { title: 'Lane diet', to: '/retrofits/corridor/lane-diet/' },
          {
            title: 'One-way to two-way conversion',
            to: '/retrofits/corridor/one-way-to-two-way-conversion/',
          },
          {
            title: 'Parking-lane reallocation',
            to: '/retrofits/corridor/parking-lane-reallocation/',
          },
          {
            title: 'Transit priority lane retrofit',
            to: '/retrofits/corridor/transit-priority-lane-retrofit/',
          },
          {
            title: 'Protected bike lane retrofit via lane-width reallocation',
            to: '/retrofits/corridor/protected-bike-lane-width-reallocation/',
          },
          {
            title: 'Protected bike lane retrofit via lane removal',
            to: '/retrofits/corridor/protected-bike-lane-lane-removal/',
          },
          {
            title: 'Protected bike lane retrofit via parking reduction',
            to: '/retrofits/corridor/protected-bike-lane-parking-reduction/',
          },
          {
            title: 'Depaving / pavement-to-gravel conversion',
            to: '/retrofits/corridor/depaving-pavement-to-gravel/',
          },
          {
            title: '2+1 road with cable median barrier',
            to: '/retrofits/corridor/two-plus-one-road-cable-barrier/',
          },
          {
            title: 'Bridge deck reallocation',
            to: '/retrofits/corridor/bridge-deck-reallocation/',
          },
          {
            title: 'Bridge replacement cross-section',
            to: '/retrofits/corridor/bridge-replacement-cross-section/',
          },
        ],
      },
      {
        title: 'Intersection',
        collapsible: true,
        items: [
          {
            title: 'Signal-to-roundabout conversion',
            to: '/retrofits/intersection/signal-to-roundabout-conversion/',
          },
          {
            title: 'Median U-Turn (MUT) retrofit',
            to: '/retrofits/intersection/median-u-turn-mut-retrofit/',
          },
          {
            title: 'Restricted Crossing U-Turn (RCUT) retrofit',
            to: '/retrofits/intersection/restricted-crossing-u-turn-rcut-retrofit/',
          },
          {
            title: 'Displaced Left-Turn (DLT) retrofit',
            to: '/retrofits/intersection/displaced-left-turn-dlt-retrofit/',
          },
        ],
      },
    ],
    // Reference: lookup material beside the guidebook. The pattern
    // technical reference lives on the landing page until its first
    // entries exist.
    '/references/': [
      {
        title: 'Reference',
        collapsible: false,
        items: [
          { title: 'Overview', to: '/references/' },
          { title: 'Road Agency Directory', to: '/references/road-agencies/' },
        ],
      },
    ],
    '/about/': [
      {
        title: 'About',
        collapsible: false,
        items: [
          { title: 'Overview', to: '/about/' },
          { title: 'Site Map', to: '/about/sitemap/' },
          { title: 'The Commonway System', to: '/about/commonway-system/' },
          { title: 'Brand Guide', to: '/about/brand-guide/' },
        ],
      },
      {
        title: 'Development',
        collapsible: false,
        items: [
          { title: 'Release History & Roadmap', to: '/about/release-history/' },
          { title: 'Website Audit', to: '/about/website-audit/' },
          { title: 'Project Governance', to: '/about/governance/' },
          { title: 'Submit a Change', to: '/about/contributing/' },
          { title: 'Report a Problem', to: '/about/reporting/' },
          { title: 'Acknowledgments', to: '/about/acknowledgments/' },
        ],
      },
      {
        title: 'Terms and Policies',
        collapsible: false,
        items: [
          { title: 'Terms and Conditions', to: '/about/terms-and-conditions/' },
          { title: 'Privacy Policy', to: '/about/privacy-policy/' },
          { title: 'AI Policy', to: '/about/ai-policy/' },
          { title: 'Accessibility Policy', to: '/about/accessibility-policy/' },
        ],
      },
    ],
  },
})

// Serves the last build's search index (build/pagefind/, written by
// scripts/build-search-index.mjs) at /pagefind/ under `pnpm run dev`, so
// search works while developing after at least one `pnpm run build`. It's
// the previous build's index, so results can lag recent edits. Not part of
// the production build (the built site has the real /pagefind/ folder).
function devSearchIndex(): Plugin {
  const types: Record<string, string> = { '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.wasm': 'application/wasm' }
  return {
    name: 'commonway-dev-search-index',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/pagefind', (req, res, next) => {
        const rel = decodeURIComponent((req.url ?? '/').split('?')[0]).replace(/^\/+/, '')
        const file = resolve(process.cwd(), 'build/pagefind', rel)
        if (!file.startsWith(resolve(process.cwd(), 'build/pagefind')) || !existsSync(file) || !statSync(file).isFile())
          return next()
        res.setHeader('Content-Type', types[extname(file)] ?? 'application/octet-stream')
        res.end(readFileSync(file))
      })
    },
  }
}

// The components barrel (src/lib/theme/components/index.ts) only re-exports.
// Compiled Svelte components count as having side effects, so without this
// the bundler keeps every component the barrel names in one shared chunk that
// every page preloads, including single-page ones like MediaGallery and
// PatternViewer. Telling it the barrel itself has no side effects lets each
// page pull in only the components it imports.
function sideEffectFreeBarrel(): Plugin {
  const barrel = resolve(process.cwd(), 'src/lib/theme/components/index.ts')
  return {
    name: 'commonway-side-effect-free-barrel',
    transform(code, id) {
      if (id.split('?')[0] === barrel)
        return { code, map: null, moduleSideEffects: false }
    },
  }
}

// SvelteKit 3 no longer reads svelte.config.js: its options go to the
// sveltekit() plugin, which sveltepress() sets up internally and forwards
// svelteKitOptions to.
const svelteKitOptions = {
  extensions: ['.svelte', '.md'],
  preprocess: vitePreprocess(),
  // Kit 3 dropped the automatic $lib alias (its replacement is #lib through
  // package.json imports). Declaring it here keeps every existing $lib
  // import working, for Vite and for the generated tsconfig paths.
  alias: { $lib: 'src/lib' },
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
} satisfies NonNullable<Parameters<typeof sveltepress>[0]>['svelteKitOptions']

export default defineConfig({
  plugins: [
    devSearchIndex(),
    sideEffectFreeBarrel(),
    sveltepress({
      // Narrow cast: the rehype plugins are typed against hast `Root` (and
      // rehype-external-links' own types), while SveltePress's `ResolvedTheme`
      // wants unified's generic `Plugin`. Same functions at runtime.
      theme: theme as unknown as NonNullable<Parameters<typeof sveltepress>[0]>['theme'],
      siteConfig: {
        title: 'Commonway System',
        description: 'A Pattern Language for Roads and Streets',
      },
      svelteKitOptions,
    }),
  ],
})
