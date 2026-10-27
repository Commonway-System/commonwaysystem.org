import type { Agency } from '../types.js'

// Tribal transportation departments in the state, listed under the state
// where the tribal government is headquartered. Only tribes whose own site
// shows a roads or transportation office are listed.

const agencies: Agency[] = [
  {
    id: 'us-wy-eastern-shoshone-roads',
    name: 'Eastern Shoshone Tribe Shoshone Roads Department',
    aka: ['Shoshone Tribe of the Wind River Reservation'],
    country: 'US',
    region: 'US-WY',
    level: 'tribal',
    area: 'Eastern Shoshone Tribe (Wind River Reservation, shared with the Northern Arapaho Tribe)',
    contacts: [
      { type: 'website', url: 'https://easternshoshone.org/contact/', label: 'Tribal contact directory' },
      { type: 'phone', phone: '(307) 349-5708' },
    ],
    checked: '2026-10-26',
  },
]

export default agencies
