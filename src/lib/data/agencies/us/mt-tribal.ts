import type { Agency } from '../types.js'

// Tribal transportation departments in the state, listed under the state
// where the tribal government is headquartered. Only tribes whose own site
// shows a roads or transportation office are listed.

const agencies: Agency[] = [
  {
    id: 'us-mt-blackfeet-transportation',
    name: 'Blackfeet Nation Transportation Planners',
    aka: ['Blackfeet Tribe'],
    country: 'US',
    region: 'US-MT',
    level: 'tribal',
    area: 'Blackfeet Nation (Blackfeet Indian Reservation)',
    contacts: [
      { type: 'website', url: 'https://blackfeetnation.com/tribaldirectory/', label: 'Tribal directory' },
      { type: 'phone', phone: '(406) 338-7445' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-mt-crow-transportation',
    name: 'Crow Tribe Transportation Department',
    country: 'US',
    region: 'US-MT',
    level: 'tribal',
    area: 'Crow Tribe (Crow Indian Reservation)',
    handles: 'Runs the Tribal Transportation Program: planning, design, construction and maintenance of BIA and tribal roads on the reservation.',
    contacts: [
      { type: 'website', url: 'https://www.crow-nsn.gov/transportation.html' },
      { type: 'plan', url: 'https://www.crow-nsn.gov/uploads/1/5/6/0/15609006/2023_crow_tribe_ttip.pdf', label: '2023 Tribal Transportation Improvement Plan' },
      { type: 'phone', phone: '(406) 661-6609' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-mt-fort-peck-ttp',
    name: 'Fort Peck Tribal Transportation Program',
    aka: ['Assiniboine and Sioux Tribes of the Fort Peck Indian Reservation'],
    country: 'US',
    region: 'US-MT',
    level: 'tribal',
    area: 'Assiniboine and Sioux Tribes of the Fort Peck Indian Reservation',
    contacts: [
      { type: 'website', url: 'https://fortpecktribes.org/government/departments/', label: 'Tribal departments directory' },
      { type: 'phone', phone: '(406) 768-3208' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-mt-fort-belknap-transportation',
    name: 'Fort Belknap Indian Community Transportation Department',
    country: 'US',
    region: 'US-MT',
    level: 'tribal',
    area: 'Fort Belknap Indian Reservation (Assiniboine and Gros Ventre)',
    handles: 'The Transportation/Transit office handles transportation planning and transit; a separate Roads Maintenance shop in Harlem maintains reservation roads.',
    contacts: [
      { type: 'website', url: 'https://www.ftbelknap.org/departments', label: 'Fort Belknap Indian Community departments' },
      { type: 'contact', url: 'https://img1.wsimg.com/blobby/go/d94bfdb9-dd85-49bd-94c2-4822ef04bf3b/downloads/a102452c-d146-43b2-b793-834ff1a58fd6/2026%20FBIC%20Program%20and%20Enterprise%20Directory.pdf', label: '2026 Program and Enterprise Directory (PDF)' },
      { type: 'phone', phone: '(406) 353-8436', label: 'Transportation/Transit office' },
      { type: 'phone', phone: '(406) 353-2844', label: 'Roads Maintenance' },
    ],
    checked: '2026-10-26',
  },
]

export default agencies
