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
    { title: 'Guide', to: '/guide/introduction/' },
    { title: 'Pattern Index', to: '/guide/patterns/' },
    { title: 'About', to: '/about/' },
  ],
  github: 'https://github.com/Commonway-System/commonwaysystem.org',
  editLink: 'https://github.com/Commonway-System/commonwaysystem.org/edit/main/src/routes/:route',
  footerNote: 'Commonway System Guidebook \u00b7 A Pattern Language for Roads and Streets',
  // Manual sidebar, keyed by route prefix, same shape as SveltePress's
  // default theme. Replace this placeholder structure with the real
  // Functional Classification / Street Typology tree as it firms up.
  sidebar: {
    '/guide/': [
      {
        title: 'Introduction',
        collapsible: true,
        items: [
          { title: 'What is the Commonway System', to: '/guide/introduction/' },
          { title: 'Pattern Index', to: '/guide/patterns/' },
          { title: 'How to read a pattern', to: '/guide/how-to-read-a-pattern/' },
        ],
      },
      {
        title: 'Local Streets',
        collapsible: true,
        items: [
          { title: 'Default (Standard Local Street)', to: '/guide/local-streets/default/' },
          { title: 'Alley', to: '/guide/local-streets/alley/' },
          { title: 'Cul-de-sac', to: '/guide/local-streets/cul-de-sac/' },
          { title: 'Frontage / Service Road', to: '/guide/local-streets/frontage-service-road/' },
          { title: 'Main Street', to: '/guide/local-streets/main-street/' },
          { title: 'Living Street / Woonerf', to: '/guide/local-streets/living-street-woonerf/' },
          { title: 'Yield Street', to: '/guide/local-streets/yield-street/' },
          { title: 'Festival Street', to: '/guide/local-streets/festival-street/' },
          { title: 'Pedestrian-only Street / Plaza', to: '/guide/local-streets/pedestrian-plaza/' },
          { title: 'Local Transit', to: '/guide/local-streets/local-transit/' },
          { title: 'Bicycle Boulevard / Neighborhood Greenway', to: '/guide/local-streets/bicycle-boulevard/' },
          { title: 'School Street', to: '/guide/local-streets/school-street/' },
        ],
      },
      {
        title: 'Collectors',
        collapsible: true,
        items: [
          { title: 'Default (Standard Collector)', to: '/guide/collectors/default/' },
          { title: 'Rural Collector / Farm-to-Market Road', to: '/guide/collectors/rural-collector/' },
          { title: 'Industrial Collector', to: '/guide/collectors/industrial-collector/' },
          { title: 'Bike Highway / Greenway', to: '/guide/collectors/bike-highway-greenway/' },
          { title: 'Collector Transit', to: '/guide/collectors/collector-transit/' },
        ],
      },
      {
        title: 'Arterials',
        collapsible: true,
        items: [
          { title: 'Default (No Parking, No Direct Access)', to: '/guide/arterials/default/' },
          { title: 'Boulevard', to: '/guide/arterials/boulevard/' },
          { title: 'Scenic Highway / Byway', to: '/guide/arterials/scenic-highway-byway/' },
          { title: 'Arterial Transit (BRT/LRT)', to: '/guide/arterials/arterial-transit/' },
          { title: 'Stroad (Avoid)', to: '/guide/arterials/stroad/' },
          { title: 'One-Way Street', to: '/guide/arterials/one-way-street/' },
        ],
      },
      {
        title: 'Freeways',
        collapsible: true,
        items: [
          { title: 'Default (Freeway)', to: '/guide/freeways/default/' },
          { title: 'Expressway', to: '/guide/freeways/expressway/' },
          { title: 'Beltway / Ring Road', to: '/guide/freeways/beltway-ring-road/' },
          { title: 'Freeway-scale Transit (Commuter/Heavy Rail)', to: '/guide/freeways/freeway-transit/' },
        ],
      },
      {
        title: 'Intersections and Crossings',
        collapsible: true,
        items: [
          { title: 'Roundabout (Single/Multi-Lane)', to: '/guide/intersections/roundabout/' },
          { title: 'Turbo-Roundabout', to: '/guide/intersections/turbo-roundabout/' },
          { title: 'Signal', to: '/guide/intersections/signal/' },
          { title: 'All-Way Stop', to: '/guide/intersections/all-way-stop/' },
          { title: 'Stop / Yield (Two-Way)', to: '/guide/intersections/stop-yield/' },
          { title: 'Continuous Sidewalk / Raised Junction', to: '/guide/intersections/continuous-sidewalk/' },
          { title: 'Uncontrolled', to: '/guide/intersections/uncontrolled/' },
          { title: 'Midblock Pedestrian Crossing', to: '/guide/intersections/midblock-crossing/' },
          { title: 'Driveway / Curb Cut', to: '/guide/intersections/driveway-curb-cut/' },
          { title: 'Grade-Separated Interchange', to: '/guide/intersections/grade-separated-interchange/' },
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
          { title: 'Contributing / Volunteering', to: '/about/contributing/' },
          { title: 'Governance', to: '/about/governance/' },
          { title: 'Reporting', to: '/about/reporting/' },
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
