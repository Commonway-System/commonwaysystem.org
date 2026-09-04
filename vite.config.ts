import { sveltepress } from '@sveltepress/vite'
import { defineConfig } from 'vite'
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
    { title: 'Reference', to: '/references/' },
    { title: 'Blog', to: '/blog/' },
    { title: 'About', to: '/about/' },
  ],
  github: 'https://github.com/Commonway-System/commonwaysystem.org',
  editLink: 'https://github.com/Commonway-System/commonwaysystem.org/edit/main/src/routes/:route',
  footerNote: 'Commonway System Guidebook \u00b7 A Pattern Language for Roads and Streets',
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
        title: 'Foundations',
        collapsible: false,
        items: [
          { title: 'How to read a pattern', to: '/guide/how-to-read-a-pattern/' },
          { title: 'Density Tiers', to: '/guide/density-tiers/' },
          { title: 'Street Types & Classifications', to: '/guide/street-types/' },
          { title: 'Scale Hierarchy', to: '/guide/scale-hierarchy/' },
        ],
      },
      {
        title: 'Find Your Pattern',
        collapsible: false,
        // One page for now, a placeholder for what will eventually be a
        // short diagnostic sequence; built as its own group already so
        // nothing has to move once that sequence exists.
        items: [{ title: 'Find Your Pattern', to: '/guide/find-your-pattern/' }],
      },
      {
        title: 'Make It Happen',
        collapsible: false,
        // Same reasoning as Find Your Pattern above: likely splits into
        // several pages (who decides, how it's funded, how to submit a
        // request) later, one placeholder page holds the slot for now.
        items: [{ title: 'Make It Happen', to: '/guide/make-it-happen/' }],
      },
    ],
    '/patterns/': [
      {
        title: 'Local Streets',
        collapsible: true,
        items: [
          { title: 'Default (Standard Local Street)', to: '/patterns/local-streets/default/' },
          { title: 'Alley', to: '/patterns/local-streets/alley/' },
          { title: 'Cul-de-sac', to: '/patterns/local-streets/cul-de-sac/' },
          { title: 'Frontage / Service Road', to: '/patterns/local-streets/frontage-service-road/' },
          { title: 'Main Street', to: '/patterns/local-streets/main-street/' },
          { title: 'Living Street / Woonerf', to: '/patterns/local-streets/living-street-woonerf/' },
          { title: 'Yield Street', to: '/patterns/local-streets/yield-street/' },
          { title: 'Festival Street', to: '/patterns/local-streets/festival-street/' },
          { title: 'Pedestrian-only Street / Plaza', to: '/patterns/local-streets/pedestrian-plaza/' },
          { title: 'Local Transit', to: '/patterns/local-streets/local-transit/' },
          { title: 'Bicycle Boulevard / Neighborhood Greenway', to: '/patterns/local-streets/bicycle-boulevard/' },
          { title: 'School Street', to: '/patterns/local-streets/school-street/' },
        ],
      },
      {
        title: 'Collectors',
        collapsible: true,
        items: [
          { title: 'Default (Standard Collector)', to: '/patterns/collectors/default/' },
          { title: 'Rural Collector / Farm-to-Market Road', to: '/patterns/collectors/rural-collector/' },
          { title: 'Industrial Collector', to: '/patterns/collectors/industrial-collector/' },
          { title: 'Bike Highway / Greenway', to: '/patterns/collectors/bike-highway-greenway/' },
          { title: 'Collector Transit', to: '/patterns/collectors/collector-transit/' },
        ],
      },
      {
        title: 'Arterials',
        collapsible: true,
        items: [
          { title: 'Default (No Parking, No Direct Access)', to: '/patterns/arterials/default/' },
          { title: 'Boulevard', to: '/patterns/arterials/boulevard/' },
          { title: 'Scenic Highway / Byway', to: '/patterns/arterials/scenic-highway-byway/' },
          { title: 'Arterial Transit (BRT/LRT)', to: '/patterns/arterials/arterial-transit/' },
          { title: 'Stroad (Avoid)', to: '/patterns/arterials/stroad/' },
          { title: 'One-Way Street', to: '/patterns/arterials/one-way-street/' },
        ],
      },
      {
        title: 'Freeways',
        collapsible: true,
        items: [
          { title: 'Default (Freeway)', to: '/patterns/freeways/default/' },
          { title: 'Expressway', to: '/patterns/freeways/expressway/' },
          { title: 'Beltway / Ring Road', to: '/patterns/freeways/beltway-ring-road/' },
          { title: 'Freeway-scale Transit (Commuter/Heavy Rail)', to: '/patterns/freeways/freeway-transit/' },
        ],
      },
      {
        title: 'Intersections and Crossings',
        collapsible: true,
        items: [
          { title: 'Roundabout (Single/Multi-Lane)', to: '/patterns/intersections/roundabout/' },
          { title: 'Turbo-Roundabout', to: '/patterns/intersections/turbo-roundabout/' },
          { title: 'Signal', to: '/patterns/intersections/signal/' },
          { title: 'All-Way Stop', to: '/patterns/intersections/all-way-stop/' },
          { title: 'Stop / Yield (Two-Way)', to: '/patterns/intersections/stop-yield/' },
          { title: 'Continuous Sidewalk / Raised Junction', to: '/patterns/intersections/continuous-sidewalk/' },
          { title: 'Uncontrolled', to: '/patterns/intersections/uncontrolled/' },
          { title: 'Midblock Pedestrian Crossing', to: '/patterns/intersections/midblock-crossing/' },
          { title: 'Driveway / Curb Cut', to: '/patterns/intersections/driveway-curb-cut/' },
          { title: 'Grade-Separated Interchange', to: '/patterns/intersections/grade-separated-interchange/' },
        ],
      },
    ],
    '/about/': [
      {
        title: 'About',
        collapsible: false,
        items: [
          { title: 'Overview', to: '/about/' },
          { title: 'The Commonway System', to: '/about/commonway-system/' },
          { title: 'Brand Guide', to: '/about/brand-guide/' },
        ],
      },
      {
        title: 'Development',
        collapsible: false,
        items: [
          { title: 'Release History & Roadmap', to: '/about/release-history/' },
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
        ],
      },
    ],
  },
})

export default defineConfig({
  plugins: [
    sveltepress({
      theme,
      siteConfig: {
        title: 'Commonway System',
        description: 'A Pattern Language for Roads and Streets',
      },
    }),
  ],
})
