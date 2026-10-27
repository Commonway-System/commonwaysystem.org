import type { Agency } from '../types.js'

// Tribal transportation departments in the state, listed under the state
// where the tribal government is headquartered. Only tribes whose own site
// shows a roads or transportation office are listed.

const agencies: Agency[] = [
  {
    id: 'us-co-southern-ute-dot',
    name: 'Southern Ute Division of Transportation',
    abbr: 'SUDOT',
    country: 'US',
    region: 'US-CO',
    level: 'tribal',
    area: 'Southern Ute Indian Reservation',
    handles: 'SUDOT maintains roads within the exterior boundaries of the Southern Ute Reservation and works with County, BIA, Town and State partners on shared routes.',
    contacts: [
      { type: 'website', url: 'https://www.southernute-nsn.gov/property-and-facilities/sudot', label: 'Division of Transportation (Property and Facilities)' },
      { type: 'request', url: 'https://www.southernute-nsn.gov/property-and-facilities/sudot/contact-sudot/', label: 'Road concern form (signs, road damage, drainage, speed limits, hazards)' },
      { type: 'phone', phone: '970-563-4755', label: 'Non-emergency road concerns' },
    ],
    checked: '2026-10-26',
  },
]

export default agencies
