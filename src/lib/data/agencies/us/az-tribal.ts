import type { Agency } from '../types.js'

// Tribal transportation departments in the state, listed under the state
// where the tribal government is headquartered. Only tribes whose own site
// shows a roads or transportation office are listed.

const agencies: Agency[] = [
  {
    id: 'us-az-navajo-dot',
    name: 'Navajo Division of Transportation',
    abbr: 'NDOT',
    country: 'US',
    region: 'US-AZ',
    level: 'tribal',
    area: 'Navajo Nation (Arizona, New Mexico and Utah)',
    handles: 'The division builds and maintains roads, bridges and airports on the Navajo Nation; its Department of Roads blades earth roads and clears snow, and its Planning section keeps the Long Range Transportation Plan and the Tribal Transportation Improvement Program.',
    contacts: [
      { type: 'website', url: 'https://www.navajodot.org/' },
      { type: 'report', url: 'https://www.navajodot.org/report-a-pot-hole', label: 'Report a pothole' },
      { type: 'plan', url: 'https://www.navajodot.org/planning', label: 'Planning (Long Range Transportation Plan, Tribal Transportation Improvement Program)' },
      { type: 'contact', url: 'https://www.navajodot.org/contact-us-2' },
      { type: 'phone', phone: '(505) 481-2018' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-az-hopi-dot',
    name: 'Hopi Department of Transportation',
    abbr: 'HDOT',
    country: 'US',
    region: 'US-AZ',
    level: 'tribal',
    area: 'Hopi Reservation',
    handles: 'The department handles road maintenance and construction projects on Hopi lands and runs Hopi Senom Transit.',
    contacts: [
      { type: 'website', url: 'https://www.hopi-nsn.gov/tribal-services/public-works-transportation/department-of-transportation/' },
      { type: 'phone', phone: '(928) 734-3182', label: 'Kykotsmovi administrative office' },
      { type: 'phone', phone: '(928) 401-6873', label: 'Keams Canyon road maintenance' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-az-white-mountain-apache-dot',
    name: 'White Mountain Apache Tribe Division of Transportation',
    abbr: 'WMAT DOT',
    country: 'US',
    region: 'US-AZ',
    level: 'tribal',
    area: 'Fort Apache Indian Reservation',
    handles: 'The division plans, designs, builds and maintains roads and runs transit on the Fort Apache Reservation.',
    contacts: [
      { type: 'website', url: 'https://wmatdot.com/' },
      { type: 'contact', url: 'https://www.wmatdot.com/about-5-3' },
      { type: 'phone', phone: '928-338-5155' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-az-san-carlos-apache-transportation',
    name: 'San Carlos Apache Tribe Transportation Department',
    country: 'US',
    region: 'US-AZ',
    level: 'tribal',
    area: 'San Carlos Apache Reservation',
    contacts: [
      { type: 'website', url: 'https://www.scat-nsn.gov/tribal-transportation/' },
      { type: 'phone', phone: '(928) 475-3222' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-az-gila-river-dot',
    name: 'Gila River Indian Community Department of Transportation',
    country: 'US',
    region: 'US-AZ',
    level: 'tribal',
    area: 'Gila River Indian Community',
    handles: 'The department, part of Community Development Services, covers planning and rights of way, road construction and surveying, and road maintenance inside the Community.',
    contacts: [
      { type: 'website', url: 'https://www.gilariver.org/index.php/departments/tribal-development-services' },
      { type: 'phone', phone: '(520) 562-6301' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-az-salt-river-public-works-roads',
    name: 'Salt River Pima-Maricopa Indian Community Public Works, Roads',
    country: 'US',
    region: 'US-AZ',
    level: 'tribal',
    area: 'Salt River Pima-Maricopa Indian Community',
    handles: 'The Roads division plans, builds and maintains about 153 miles of roads in the Community, including dirt road grading, signs and street lighting.',
    contacts: [
      { type: 'website', url: 'https://www.srpmic-nsn.gov/government/public-works/roads/' },
      { type: 'phone', phone: '480-362-5600', label: 'Public Works' },
      { type: 'email', email: 'PWCustomerService@srpmic-nsn.gov', label: 'Public Works customer service' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-az-tohono-oodham-roads-program',
    name: 'Tohono O\'odham Nation Roads Program',
    country: 'US',
    region: 'US-AZ',
    level: 'tribal',
    area: 'Tohono O\'odham Nation',
    handles: 'The program, under Planning and Economic Development, manages the Nation\'s Tribal Transportation Improvement Program and road safety studies.',
    contacts: [
      { type: 'website', url: 'https://www.tonation-nsn.gov/departments/planning-economic-development/roads-program/' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-az-hualapai-public-services',
    name: 'Hualapai Public Services Department, Roads Program',
    country: 'US',
    region: 'US-AZ',
    level: 'tribal',
    area: 'Hualapai Reservation',
    handles: 'The Road Maintenance Program fixes potholes, maintains paved and unpaved roads and grades the BIA roads listed on its page.',
    contacts: [
      { type: 'website', url: 'https://hualapai-nsn.gov/services/public_works/index.php', label: 'Public Works and Roads' },
      { type: 'plan', url: 'https://hualapai-nsn.gov/services/public_works/hualapai_tribe_transportation_project_list.php', label: 'Transportation project list' },
    ],
    checked: '2026-10-26',
  },
]

export default agencies
