import type { Agency } from '../types.js'

// Tribal transportation departments in the state, listed under the state
// where the tribal government is headquartered. Only tribes whose own site
// shows a roads or transportation office are listed.

const agencies: Agency[] = [
  {
    id: 'us-nv-pyramid-lake-transportation-planning',
    name: 'Pyramid Lake Paiute Tribe Transportation Planning Department',
    country: 'US',
    region: 'US-NV',
    level: 'tribal',
    area: 'Pyramid Lake Paiute Reservation',
    handles: 'The department runs the Tribe\'s Tribal Transportation Program, keeps its Tribal Transportation Improvement Program and Long Range Transportation Plan, and leads road safety audits; roads maintenance is a separate tribal department.',
    contacts: [
      { type: 'website', url: 'https://plpt.nsn.us/transportation-planning/' },
      { type: 'phone', phone: '(775) 574-1000', label: 'Tribal main line' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-nv-walker-river-roads',
    name: 'Walker River Paiute Tribe Roads Department',
    country: 'US',
    region: 'US-NV',
    level: 'tribal',
    area: 'Walker River Reservation',
    handles: 'The department maintains tribal and BIA roads inside the reservation; county roads are Mineral County\'s and Highways 95 and 95A are NDOT\'s.',
    contacts: [
      { type: 'website', url: 'https://www.wrpt.org/roads-projects/' },
      { type: 'phone', phone: '(775) 773-2000' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-nv-reno-sparks-public-works',
    name: 'Reno-Sparks Indian Colony Public Works',
    country: 'US',
    region: 'US-NV',
    level: 'tribal',
    area: 'Reno-Sparks Indian Colony',
    handles: 'The department\'s road maintenance division keeps Colony roads safe, and its maintenance and operations division handles street and walkway upkeep including snow and ice control.',
    contacts: [
      { type: 'website', url: 'https://www.rsic.org/196/Public-Works' },
      { type: 'phone', phone: '775-785-1341' },
      { type: 'email', email: 'publicworks@rsic.org' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-nv-washoe-roads',
    name: 'Washoe Roads Department',
    country: 'US',
    region: 'US-NV',
    level: 'tribal',
    area: 'Washoe Tribe of Nevada and California (Nevada communities and Woodfords, California)',
    handles: 'Maintains the tribe\'s transportation facilities and runs its Tribal Transportation Program.',
    contacts: [
      { type: 'website', url: 'https://washoetribe.us/departmentlandingpage/1230-page-washoe-roads-department', label: 'Roads Department' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-nv-fallon-paiute-shoshone-transportation-roads',
    name: 'Fallon Paiute-Shoshone Tribe Transportation/Roads Department',
    country: 'US',
    region: 'US-NV',
    level: 'tribal',
    area: 'Fallon Paiute-Shoshone Reservation and Colony',
    handles: 'The department also runs the Tribe\'s Transit Bus Program, scheduled rides for tribal members in the City of Fallon, the Reservation and the Colony.',
    contacts: [
      { type: 'website', url: 'https://fpst.org/176/TransportationRoads' },
      { type: 'phone', phone: '(775) 423-3725' },
      { type: 'contact', url: 'https://fpst.org/177/Transit-Bus-Program', label: 'Transit Bus Program' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-nv-fort-mcdermitt-bia-roads-maintenance',
    name: 'Fort McDermitt Paiute and Shoshone Tribe BIA Roads and Maintenance',
    country: 'US',
    region: 'US-NV',
    level: 'tribal',
    area: 'Fort McDermitt Indian Reservation (also in Oregon)',
    handles: 'The department builds and repairs roadways for the Tribe and does other community maintenance.',
    contacts: [
      { type: 'website', url: 'https://www.fmpst.org/bia-roads-maintenance' },
      { type: 'phone', phone: '(775) 375-5989', label: 'Tribal office' },
      { type: 'email', email: 'info@fmpst.org', label: 'Tribal office' },
    ],
    checked: '2026-10-26',
  },
]

export default agencies
