import type { Agency } from '../types.js'

// Tribal transportation departments in the state, listed under the state
// where the tribal government is headquartered. Only tribes whose own site
// shows a roads or transportation office are listed.

const agencies: Agency[] = [
  {
    id: 'us-nd-standing-rock-transportation',
    name: 'Standing Rock Sioux Tribe Transportation Department',
    country: 'US',
    region: 'US-ND',
    level: 'tribal',
    area: 'Standing Rock Sioux Reservation (North Dakota and South Dakota)',
    contacts: [
      { type: 'website', url: 'https://www.standingrock.org/programs/', label: 'Tribal programs directory' },
      { type: 'phone', phone: '701-854-8611' },
      { type: 'phone', phone: '701-854-7432', label: 'Tribal Roads Department (North Dakota)' },
      { type: 'phone', phone: '605-823-2200', label: 'Tribal Roads Department (South Dakota)' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-nd-spirit-lake-roads',
    name: 'Spirit Lake Tribe Tribal Roads',
    aka: ['Spirit Lake Nation'],
    country: 'US',
    region: 'US-ND',
    level: 'tribal',
    area: 'Spirit Lake Nation (Spirit Lake Reservation)',
    contacts: [
      { type: 'website', url: 'https://www.spiritlakenation.com/programs/tribal-roads/' },
      { type: 'phone', phone: '701-766-1297' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-nd-mha-nation-road-maintenance',
    name: 'MHA Nation Road Maintenance',
    aka: ['Three Affiliated Tribes', 'Mandan, Hidatsa and Arikara Nation'],
    country: 'US',
    region: 'US-ND',
    level: 'tribal',
    area: 'Fort Berthold Indian Reservation',
    handles: 'Maintains and upgrades BIA and tribal routes on the reservation, and does tribally funded home road construction, maintenance and snow removal, with field offices at New Town, Mandaree, Twin Buttes and White Shield.',
    contacts: [
      { type: 'website', url: 'https://www.mhanation.com/road-maintenance', label: 'Road Maintenance' },
      { type: 'contact', url: 'https://www.mhanation.com/directory/', label: 'Tribal directory' },
      { type: 'phone', phone: '701-627-3716', label: 'Road Maintenance office, New Town' },
      { type: 'phone', phone: '(701) 627-4781', label: 'MHA Nation main line' },
    ],
    checked: '2026-10-26',
  },
]

export default agencies
