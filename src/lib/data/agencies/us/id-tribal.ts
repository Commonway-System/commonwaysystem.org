import type { Agency } from '../types.js'

// Tribal transportation departments in the state, listed under the state
// where the tribal government is headquartered. Only tribes whose own site
// shows a roads or transportation office are listed.

const agencies: Agency[] = [
  {
    id: 'us-id-shoshone-bannock-dot',
    name: 'Shoshone-Bannock Tribes Department of Transportation',
    abbr: 'SBDOT',
    country: 'US',
    region: 'US-ID',
    level: 'tribal',
    area: 'Fort Hall Reservation',
    handles: 'Services and maintains the tribal road system on the Fort Hall Reservation.',
    contacts: [
      { type: 'website', url: 'https://www.shobandot.com' },
      { type: 'contact', url: 'https://www.shobandot.com/contact-us', label: 'Contact Us (mailing address and staff lines)' },
      { type: 'phone', phone: '(208) 237-1954', label: 'Department of Transportation' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-id-nez-perce-transportation',
    name: 'Nez Perce Tribe Transportation Planning',
    country: 'US',
    region: 'US-ID',
    level: 'tribal',
    area: 'Nez Perce Reservation (also parts of Washington and Oregon)',
    handles: 'Planning office for the Tribe\'s transportation program; most roads on the reservation are state and county roads.',
    contacts: [
      { type: 'website', url: 'https://nezperce.org/government/executive-direction/', label: 'Executive Direction (lists Transportation Planning)' },
      { type: 'phone', phone: '208-621-3682', label: 'Transportation Planning' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-id-coeur-dalene-public-works',
    name: 'Coeur d\'Alene Tribe Public Works, Roads Program',
    country: 'US',
    region: 'US-ID',
    level: 'tribal',
    area: 'Coeur d\'Alene Reservation',
    handles: 'Public Works coordinates reservation roads and other infrastructure.',
    contacts: [
      { type: 'website', url: 'https://www.cdatribe-nsn.gov/public-works/' },
      { type: 'plan', url: 'http://www.cdatribe-nsn.gov/public-works/wp-content/uploads/sites/16/2020/03/Public-Transit-and-Human-Services-Transportation-Coordination-Action-Plan.pdf', label: 'Public Transit and Human Services Transportation Coordination Action Plan' },
      { type: 'phone', phone: '208-686-5611', label: 'Public Works' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-id-kootenai-transportation',
    name: 'Kootenai Tribe of Idaho Transportation Program',
    country: 'US',
    region: 'US-ID',
    level: 'tribal',
    area: 'Kootenai Tribe of Idaho lands, Bonners Ferry',
    handles: 'The tribal administration page says the Tribe\'s administrative director administers its Tribal Transportation Program.',
    contacts: [
      { type: 'website', url: 'https://www.kootenai.org/administration' },
      { type: 'phone', phone: '(208) 267-3519' },
      { type: 'email', email: 'info@kootenai.org' },
    ],
    checked: '2026-10-26',
  },
]

export default agencies
