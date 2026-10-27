import type { Agency } from '../types.js'

// Tribal transportation departments in the state, listed under the state
// where the tribal government is headquartered. Only tribes whose own site
// shows a roads or transportation office are listed.

const agencies: Agency[] = [
  {
    id: 'us-ma-mashpee-wampanoag-public-works',
    name: 'Mashpee Wampanoag Tribe Public Works',
    country: 'US',
    region: 'US-MA',
    level: 'tribal',
    area: 'Mashpee Wampanoag Tribe (Mashpee, Massachusetts)',
    handles: 'Plans, designs, builds and maintains BIA and tribal roads and parking lots, clears snow and ice, and coordinates the Tribe\'s transportation requests.',
    contacts: [
      { type: 'website', url: 'https://www.mashpeewampanoagtribe-nsn.gov/public-works', label: 'Public Works' },
      { type: 'phone', phone: '(508) 477-0208', label: 'Tribal government main line (Public Works is extension 125)' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-ma-aquinnah-wampanoag-transportation',
    name: 'Wampanoag Tribe of Gay Head (Aquinnah) Transportation Program',
    country: 'US',
    region: 'US-MA',
    level: 'tribal',
    area: 'Wampanoag Tribe of Gay Head (Aquinnah), Martha\'s Vineyard',
    aka: ['Aquinnah Wampanoag'],
    handles: 'Works toward safe tribal transportation infrastructure and services for members on the island and the mainland, under its Long Range Transportation Plan.',
    contacts: [
      { type: 'website', url: 'https://www.wampanoagtribe-nsn.gov/transportation', label: 'Transportation Program' },
      { type: 'phone', phone: '(508) 645-9265', label: 'Tribal office main line' },
    ],
    checked: '2026-10-26',
  },
]

export default agencies
