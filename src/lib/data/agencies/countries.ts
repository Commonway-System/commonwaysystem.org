import type { AgencyLevel, ContactType } from './types.js'

// One entry per country the directory covers. Adding a country (Canada is
// next) means adding its entry here, with its own words for each level and
// its list of subdivisions, then a folder of agency files beside us/.

export interface CountryInfo {
  name: string
  /** What a reader calls each level here. A level with no label isn't offered as a filter. */
  levelLabels: Partial<Record<AgencyLevel, string>>
  /** The word for this country's subdivisions, e.g. "State or territory". */
  regionNoun: string
  /** ISO 3166-2 code to name. */
  regions: Record<string, string>
}

export const countries: Record<string, CountryInfo> = {
  US: {
    name: 'United States',
    levelLabels: {
      national: 'Federal',
      subnational: 'State or territory',
      regional: 'Regional (MPO)',
      county: 'County',
      local: 'City or town',
      tribal: 'Tribal',
    },
    regionNoun: 'State or territory',
    regions: {
      'US-AL': 'Alabama',
      'US-AK': 'Alaska',
      'US-AS': 'American Samoa',
      'US-AZ': 'Arizona',
      'US-AR': 'Arkansas',
      'US-CA': 'California',
      'US-CO': 'Colorado',
      'US-CT': 'Connecticut',
      'US-DE': 'Delaware',
      'US-DC': 'District of Columbia',
      'US-FL': 'Florida',
      'US-GA': 'Georgia',
      'US-GU': 'Guam',
      'US-HI': 'Hawaii',
      'US-ID': 'Idaho',
      'US-IL': 'Illinois',
      'US-IN': 'Indiana',
      'US-IA': 'Iowa',
      'US-KS': 'Kansas',
      'US-KY': 'Kentucky',
      'US-LA': 'Louisiana',
      'US-ME': 'Maine',
      'US-MD': 'Maryland',
      'US-MA': 'Massachusetts',
      'US-MI': 'Michigan',
      'US-MN': 'Minnesota',
      'US-MS': 'Mississippi',
      'US-MO': 'Missouri',
      'US-MT': 'Montana',
      'US-NE': 'Nebraska',
      'US-NV': 'Nevada',
      'US-NH': 'New Hampshire',
      'US-NJ': 'New Jersey',
      'US-NM': 'New Mexico',
      'US-NY': 'New York',
      'US-NC': 'North Carolina',
      'US-ND': 'North Dakota',
      'US-MP': 'Northern Mariana Islands',
      'US-OH': 'Ohio',
      'US-OK': 'Oklahoma',
      'US-OR': 'Oregon',
      'US-PA': 'Pennsylvania',
      'US-PR': 'Puerto Rico',
      'US-RI': 'Rhode Island',
      'US-SC': 'South Carolina',
      'US-SD': 'South Dakota',
      'US-TN': 'Tennessee',
      'US-TX': 'Texas',
      'US-VI': 'U.S. Virgin Islands',
      'US-UT': 'Utah',
      'US-VT': 'Vermont',
      'US-VA': 'Virginia',
      'US-WA': 'Washington',
      'US-WV': 'West Virginia',
      'US-WI': 'Wisconsin',
      'US-WY': 'Wyoming',
    },
  },
}

/** The label a reader sees for each contact type, in display order. */
export const contactLabels: Record<ContactType, string> = {
  'website': 'Website',
  'request': 'Request a street change',
  'report': 'Report a problem',
  'ownership-map': 'Who maintains this road',
  'bike-ped': 'Bike and pedestrian program',
  'ada': 'ADA coordinator',
  'policy': 'Complete Streets policy',
  'safety-plan': 'Safety plan',
  'plan': 'Transportation plan',
  'meetings': 'Public meetings',
  'contact': 'Contact page',
  'phone': 'Phone',
  'email': 'Email',
}
