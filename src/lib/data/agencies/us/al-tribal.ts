import type { Agency } from '../types.js'

// Tribal transportation departments in the state, listed under the state
// where the tribal government is headquartered. Only tribes whose own site
// shows a roads or transportation office are listed.

const agencies: Agency[] = [
  {
    id: 'us-al-poarch-creek-public-works',
    name: 'Poarch Creek Indians Public Works Department',
    country: 'US',
    region: 'US-AL',
    level: 'tribal',
    area: 'Poarch Band of Creek Indians reservation (Escambia County)',
    handles: 'Keeps reservation infrastructure in repair, including roads, rights-of-way and bridges under Bureau of Indian Affairs designation.',
    contacts: [
      { type: 'website', url: 'https://pci-nsn.gov/our-government/operations/', label: 'Operations, including Public Works' },
      { type: 'website', url: 'https://pci-nsn.gov/road-construction-updates/', label: 'Road construction updates (Jack Springs Road)' },
      { type: 'contact', url: 'https://pci-nsn.gov/our-story/contact-us/', label: 'Tribal government contact page' },
      { type: 'phone', phone: '(251) 368-9136', label: 'Tribal government main line' },
    ],
    checked: '2026-10-26',
  },
]

export default agencies
