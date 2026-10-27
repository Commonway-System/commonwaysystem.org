import type { Agency } from '../types.js'

// Tribal transportation departments in the state, listed under the state
// where the tribal government is headquartered. Only tribes whose own site
// shows a roads or transportation office are listed.

const agencies: Agency[] = [
  {
    id: 'us-me-penobscot-public-works',
    name: 'Penobscot Nation Public Works',
    country: 'US',
    region: 'US-ME',
    level: 'tribal',
    area: 'Penobscot Nation (Indian Island and trust lands)',
    handles: 'Maintains streets, bridges, sidewalks, storm drains and signs, plows the roads and sidewalks, and runs road and bridge construction and paving projects on the island and trust lands.',
    contacts: [
      { type: 'website', url: 'https://www.penobscotnation.org/services/maintenance_public_works.php', label: 'Maintenance & Public Works' },
      { type: 'phone', phone: '(207) 817-7300', label: 'Penobscot Nation main office' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-me-mikmaq-tram',
    name: 'Mi\'kmaq Nation TRAM Department (Transportation, Realty, and Assets Management)',
    country: 'US',
    region: 'US-ME',
    level: 'tribal',
    area: 'Mi\'kmaq Nation (Presque Isle, Maine)',
    aka: ['Aroostook Band of Micmacs'],
    handles: 'Manages and maintains the Nation\'s facilities and infrastructure, including road construction and transit services.',
    contacts: [
      { type: 'website', url: 'https://micmac-nsn.gov/tram-department/', label: 'TRAM Department' },
      { type: 'phone', phone: '(207) 764-1972', label: 'Tribal administration main line (TRAM is extension 131)' },
    ],
    checked: '2026-10-26',
  },
]

export default agencies
