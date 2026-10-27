import type { Agency } from '../types.js'

// Tribal transportation departments in the state, listed under the state
// where the tribal government is headquartered. Only tribes whose own site
// shows a roads or transportation office are listed.

const agencies: Agency[] = [
  {
    id: 'us-ia-meskwaki-public-works',
    name: 'Meskwaki Public Works',
    aka: ['Sac & Fox Tribe of the Mississippi in Iowa'],
    country: 'US',
    region: 'US-IA',
    level: 'tribal',
    area: 'Meskwaki Nation (Meskwaki Settlement near Tama)',
    handles: 'Plans and maintains the tribal road system, with snow, ice and dust control on tribal roads.',
    contacts: [
      { type: 'website', url: 'https://meskwaki.org/government/public-works' },
      { type: 'phone', phone: '(641) 484-4600' },
    ],
    checked: '2026-10-26',
  },
]

export default agencies
