import type { Agency } from '../types.js'

// U.S. federal agencies a road change can run into. Most requests start at
// the state or local level; these matter on federal land, tribal roads, and
// for the federal rules and money behind state programs.

const agencies: Agency[] = [
  {
    id: 'us-usdot',
    name: 'U.S. Department of Transportation',
    abbr: 'USDOT',
    country: 'US',
    level: 'national',
    handles: 'Federal transportation policy and grant programs; it doesn\'t run local streets.',
    contacts: [{ type: 'website', url: 'https://www.transportation.gov/' }],
    checked: '2026-10-26',
  },
  {
    id: 'us-fhwa',
    name: 'Federal Highway Administration',
    abbr: 'FHWA',
    country: 'US',
    level: 'national',
    handles: 'Federal highway rules and funding, through a division office in each state; state DOTs carry out the work.',
    contacts: [
      { type: 'website', url: 'https://highways.dot.gov/' },
      { type: 'contact', url: 'https://highways.dot.gov/about/contact-us', label: 'Contact FHWA headquarters' },
      { type: 'contact', url: 'https://highways.dot.gov/about/field-offices', label: 'Field and division offices (one in each state)' },
      { type: 'phone', phone: '202-366-4000', label: 'U.S. DOT mainline, as listed by FHWA' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-fhwa-flh',
    name: 'FHWA Office of Federal Lands Highway',
    abbr: 'FLH',
    country: 'US',
    level: 'national',
    handles: 'Roads that serve national parks, forests, wildlife refuges and tribal lands, built with the land agencies that own them.',
    contacts: [
      { type: 'website', url: 'https://highways.dot.gov/federal-lands' },
      { type: 'contact', url: 'https://highways.dot.gov/federal-lands/about/contacts', label: 'Headquarters and the three division offices' },
      { type: 'plan', url: 'https://highways.dot.gov/federal-lands/planning/tip', label: 'Transportation Improvement Program' },
      { type: 'phone', phone: '(202) 366-9494', label: 'Headquarters' },
      { type: 'email', email: 'federallands.fhwa@dot.gov', label: 'Headquarters inbox' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-bia-dot',
    name: 'Bureau of Indian Affairs, Division of Transportation',
    abbr: 'BIA',
    country: 'US',
    level: 'national',
    handles: 'The federal side of the Tribal Transportation Program, for roads serving tribal lands.',
    contacts: [
      { type: 'website', url: 'https://www.bia.gov/bia/ois/division-transportation' },
      { type: 'contact', url: 'https://www.bia.gov/regional-offices', label: 'BIA regional offices' },
      { type: 'phone', phone: '(505) 563-3320', label: 'Division of Transportation, West (Albuquerque)' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-nps',
    name: 'National Park Service',
    abbr: 'NPS',
    country: 'US',
    level: 'national',
    handles: 'Parkways and park roads, including commuter routes through federal parkland inside cities.',
    contacts: [{ type: 'website', url: 'https://www.nps.gov/' }],
    checked: '2026-10-26',
  },
]

export default agencies
