import type { Agency } from '../types.js'

// Tribal transportation departments in the state, listed under the state
// where the tribal government is headquartered. Only tribes whose own site
// shows a roads or transportation office are listed.

const agencies: Agency[] = [
  {
    id: 'us-fl-seminole-transportation',
    name: 'Seminole Tribe of Florida Transportation Department',
    country: 'US',
    region: 'US-FL',
    level: 'tribal',
    area: 'Seminole Tribe of Florida reservations',
    handles: 'Builds and maintains more than 200 miles of tribal roads across the reservations, including bridges, signs, sidewalks and drainage.',
    contacts: [
      { type: 'website', url: 'https://auttcd.semtribe.com/services/transportation', label: 'Transportation Department' },
      { type: 'phone', phone: '(954) 966-6300, ext. 10909' },
      { type: 'email', email: 'TCD@semtribe.com', label: 'Tribal Community Development inbox' },
    ],
    checked: '2026-10-26',
  },
]

export default agencies
