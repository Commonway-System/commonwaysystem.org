import type { Agency } from '../types.js'

// Tribal transportation departments in the state, listed under the state
// where the tribal government is headquartered. Only tribes whose own site
// shows a roads or transportation office are listed.

const agencies: Agency[] = [
  {
    id: 'us-ct-mashantucket-pequot-public-works',
    name: 'Mashantucket Pequot Tribal Nation Public Works, Community Planning and Infrastructure Management',
    country: 'US',
    region: 'US-CT',
    level: 'tribal',
    area: 'Mashantucket Pequot Reservation',
    handles: 'The Public Works Operations Division maintains all roads and grounds on the Reservation; Community Planning maps BIA roads, federal highways and tribal transportation corridors for road funding.',
    contacts: [
      { type: 'website', url: 'https://www.mptn-nsn.gov/government/government-administration/public-works-community-planning-infrastructure-management/', label: 'Public Works, Community Planning & Infrastructure Management' },
      { type: 'contact', url: 'https://www.mptn-nsn.gov/contact-us/', label: 'Tribal Nation contact page' },
      { type: 'phone', phone: '860-396-6572', label: 'Tribal Nation main line' },
    ],
    checked: '2026-10-26',
  },
]

export default agencies
