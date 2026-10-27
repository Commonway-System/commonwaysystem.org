import type { Agency } from '../types.js'

// Tribal transportation departments in the state, listed under the state
// where the tribal government is headquartered.

const agencies: Agency[] = [
  {
    id: 'us-ut-ute-indian-tribe-transit',
    name: 'Ute Indian Tribe Transit',
    country: 'US',
    region: 'US-UT',
    level: 'tribal',
    area: 'Ute Indian Tribe (Uintah and Ouray Reservation, Fort Duchesne)',
    handles: 'Runs the Tribe\'s public transit service; the Tribe\'s site shows no separate roads program.',
    contacts: [
      { type: 'website', url: 'https://utetribe.com/transit/' },
      { type: 'phone', phone: '(435) 725-4984' },
    ],
    checked: '2026-10-26',
  },
]

export default agencies
