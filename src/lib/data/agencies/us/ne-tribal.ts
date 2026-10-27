import type { Agency } from '../types.js'

// Tribal transportation departments in the state, listed under the state
// where the tribal government is headquartered. Only tribes whose own site
// shows a roads or transportation office are listed.

const agencies: Agency[] = [
  {
    id: 'us-ne-winnebago-roads',
    name: 'Winnebago Tribe of Nebraska Tribal Roads Department',
    country: 'US',
    region: 'US-NE',
    level: 'tribal',
    area: 'Winnebago Tribe of Nebraska (Winnebago Reservation)',
    handles: 'Maintains the BIA roads on the reservation, including grading, pothole repair and snow removal.',
    contacts: [
      { type: 'website', url: 'https://winnebagotribe.com/tribal-roads/' },
      { type: 'phone', phone: '(402) 878-2519' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-ne-omaha-roads',
    name: 'Omaha Tribe of Nebraska Roads Department',
    country: 'US',
    region: 'US-NE',
    level: 'tribal',
    area: 'Omaha Tribe of Nebraska (Omaha Reservation; also Iowa)',
    handles: 'Manages the paved, gravel and dirt roads on the reservation that BIA funding supports.',
    contacts: [
      { type: 'website', url: 'https://www.omahatribe.com/tribe-departments/roads/' },
      { type: 'phone', phone: '(712) 208-0611' },
    ],
    checked: '2026-10-26',
  },
]

export default agencies
