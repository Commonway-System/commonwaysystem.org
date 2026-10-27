import type { Agency } from '../types.js'

// Tribal transportation departments in the state, listed under the state
// where the tribal government is headquartered. Only tribes whose own site
// shows a roads or transportation office are listed.

const agencies: Agency[] = [
  {
    id: 'us-la-jena-choctaw-public-works',
    name: 'Jena Band of Choctaw Indians Public Works',
    country: 'US',
    region: 'US-LA',
    level: 'tribal',
    area: 'Jena Band of Choctaw Indians tribal lands (Louisiana)',
    handles: 'The department designs, builds and maintains roads on tribal lands with BIA and tribal funds, to Louisiana DOTD and FHWA standards.',
    contacts: [
      { type: 'website', url: 'https://www.jenachoctaw.org/about-jbci/transportation' },
      { type: 'phone', phone: '318-992-0108' },
    ],
    checked: '2026-10-26',
  },
]

export default agencies
