import type { Agency } from '../types.js'

// Tribal transportation departments in the state, listed under the state
// where the tribal government is headquartered. Only tribes whose own site
// shows a roads or transportation office are listed.

const agencies: Agency[] = [
  {
    id: 'us-mn-leech-lake-roads',
    name: 'Leech Lake Tribal Roads and Maintenance Department',
    country: 'US',
    region: 'US-MN',
    level: 'tribal',
    area: 'Leech Lake Reservation',
    aka: ['Leech Lake Band of Ojibwe'],
    handles: 'Plans, surveys, designs and maintains the 117 miles of BIA roads on the Leech Lake Reservation, including plowing, pothole sealing, grading and ditch mowing; state and county roads are MnDOT\'s and the counties\'.',
    contacts: [
      { type: 'website', url: 'https://www.llojibwe.org/rs/roads.html', label: 'Roads and Survey' },
      { type: 'phone', phone: '(218) 335-8200', label: 'Leech Lake Band main line' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-mn-red-lake-engineering',
    name: 'Red Lake Nation Engineering Division (Tribal Roads)',
    country: 'US',
    region: 'US-MN',
    level: 'tribal',
    area: 'Red Lake Nation',
    handles: 'Manages and plans roads for the Red Lake Nation, which keeps an inventory of over 1,600 miles of paved and maintained highways and roads: survey and design, construction management and transportation planning.',
    contacts: [
      { type: 'website', url: 'https://www.redlakenation.org/engineering-and-tribal-roads/', label: 'Engineering and Tribal Roads' },
      { type: 'phone', phone: '218-679-2416', label: 'Engineering Division office' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-mn-fond-du-lac-public-works',
    name: 'Fond du Lac Band Public Works Division',
    country: 'US',
    region: 'US-MN',
    level: 'tribal',
    area: 'Fond du Lac Reservation',
    handles: 'The Highway Department builds and maintains Band-owned streets and roads; state and county roads are MnDOT\'s and the counties\'.',
    contacts: [
      { type: 'website', url: 'https://www.fdlband.org/community/public_works/index.php', label: 'Public Works' },
      { type: 'phone', phone: '218-879-4593', label: 'Band main line' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-mn-mille-lacs-public-works',
    name: 'Mille Lacs Band of Ojibwe Public Works',
    country: 'US',
    region: 'US-MN',
    level: 'tribal',
    area: 'Mille Lacs Reservation',
    handles: 'Public Works, part of the Department of Community Development, handles road maintenance on Band roads, along with water, wastewater, solid waste and facilities.',
    contacts: [
      { type: 'website', url: 'https://millelacsband.com/government/resources1/department-of-community-development', label: 'Department of Community Development (includes Public Works)' },
      { type: 'phone', phone: '320-532-4181', label: 'Government Center' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-mn-bois-forte-public-works',
    name: 'Bois Forte Band of Chippewa Public Works',
    country: 'US',
    region: 'US-MN',
    level: 'tribal',
    area: 'Bois Forte Reservation',
    handles: 'Public Works staff plow snow, replace culverts, mow roadsides and maintain roads, and the Band runs the Indian Reservation Roads program from planning through construction.',
    contacts: [
      { type: 'website', url: 'https://boisforte.com/departments/public-works/', label: 'Public Works' },
      { type: 'phone', phone: '218-757-0193', label: 'Public Works office' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-mn-lower-sioux-roads',
    name: 'Lower Sioux Indian Community Roads and Maintenance',
    country: 'US',
    region: 'US-MN',
    level: 'tribal',
    area: 'Lower Sioux Indian Community, Morton',
    handles: 'Maintains the community\'s roads and tribal buildings and grounds.',
    contacts: [
      { type: 'website', url: 'https://lowersioux.com/departments/roads-maintenance/', label: 'Roads and Maintenance' },
      { type: 'phone', phone: '507-697-6185', label: 'Roads and Maintenance' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-mn-white-earth-dot',
    name: 'White Earth Department of Transportation',
    abbr: 'WEDOT',
    country: 'US',
    region: 'US-MN',
    level: 'tribal',
    area: 'White Earth Nation (White Earth Reservation)',
    handles: 'WEDOT maintains about 150 miles of roads on the reservation (about 100 miles of gravel and earthen roads and 50 miles of paved), builds and rebuilds roads in its inventory, and schedules the work on the Tribal Transportation Improvement Program.',
    contacts: [
      { type: 'website', url: 'https://www.whiteearth.com/divisions/public-works', label: 'Public Works division (Transportation, Fleet, Transit)' },
      { type: 'contact', url: 'https://www.whiteearth.com/contact', label: 'White Earth Nation contact page' },
      { type: 'phone', phone: '(218) 983-3263', label: 'Transportation' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-mn-shakopee-public-works',
    name: 'Shakopee Mdewakanton Sioux Community Public Works',
    abbr: 'SMSC',
    country: 'US',
    region: 'US-MN',
    level: 'tribal',
    area: 'Shakopee Mdewakanton Sioux Community (Scott County, Minnesota)',
    handles: 'The Public Works Department maintains the Community\'s infrastructure, including its streets, bridges, sidewalks and walking paths.',
    contacts: [
      { type: 'website', url: 'https://shakopeedakota.org/department/public-works/', label: 'Public Works' },
      { type: 'contact', url: 'https://shakopeedakota.org/contact/', label: 'Contact the SMSC (choose a department)' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-mn-upper-sioux-roads',
    name: 'Upper Sioux Community Roads',
    country: 'US',
    region: 'US-MN',
    level: 'tribal',
    area: 'Upper Sioux Community (Pezihutazizi Oyate), Granite Falls, Minnesota',
    aka: [{ name: 'Pezihutazizi Oyate', lang: 'dak' }],
    handles: 'The Roads department handles road maintenance for the Community; it is a separate office from USC Public Works, which covers utilities and facilities.',
    contacts: [
      { type: 'website', url: 'https://www.uppersiouxcommunity-nsn.gov/roads', label: 'USC Roads (Road Maintenance)' },
      { type: 'contact', url: 'https://www.uppersiouxcommunity-nsn.gov/public-works', label: 'USC Public Works (utilities and facilities)' },
      { type: 'phone', phone: '(320) 564-3853', label: 'Community office' },
    ],
    checked: '2026-10-26',
  },
]

export default agencies
