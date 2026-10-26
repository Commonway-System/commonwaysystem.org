// The Road Agency Directory's data model (/references/road-agencies/).
// Built for more than one country: every agency carries an ISO 3166-1
// country code, and its state, province or territory as an ISO 3166-2 code.
// The words a reader sees for each level ("State or territory", "Province
// or territory") come from that country's entry in countries.ts.
//
// Only researched agencies go in: no placeholder rows. Every contact is a
// link or number read on the agency's own official site, and `checked` is
// the date it was last confirmed there.

/**
 * Where an agency sits. The same keys work in every country; countries.ts
 * gives each one its local name.
 *   national     federal agencies (FHWA, the National Park Service)
 *   subnational  state, district and territory DOTs (provinces in Canada)
 *   regional     metropolitan planning organizations and regional councils
 *   county       counties, parishes, boroughs, county road commissions
 *   local        cities, towns, villages, townships
 *   tribal       tribal nations' transportation departments
 */
export type AgencyLevel = 'national' | 'subnational' | 'regional' | 'county' | 'local' | 'tribal'

export const agencyLevels: AgencyLevel[] = ['national', 'subnational', 'regional', 'county', 'local', 'tribal']

/**
 * What a contact is for. Listed in the order a reader sees them on a card.
 *   website        the agency's home page
 *   request        a form for traffic-safety or street-change requests
 *   report         a form or 311 line for reporting a problem (potholes, signals)
 *   ownership-map  a map or lookup showing who maintains which road
 *   bike-ped       the bicycle and pedestrian coordinator or program
 *   ada            the ADA coordinator (curb ramps, sidewalk gaps)
 *   policy         a Complete Streets or similar street-design policy
 *   safety-plan    a Vision Zero, Safe System or road safety action plan
 *   plan           the long-range transportation plan or improvement program
 *   meetings       where public meetings and comment periods are posted
 *   contact        a general contact page
 *   phone          main phone number
 *   email          a general inbox (an office's, never a named person's)
 */
export type ContactType =
  | 'website'
  | 'request'
  | 'report'
  | 'ownership-map'
  | 'bike-ped'
  | 'ada'
  | 'policy'
  | 'safety-plan'
  | 'plan'
  | 'meetings'
  | 'contact'
  | 'phone'
  | 'email'

export interface AgencyContact {
  type: ContactType
  /** A page on the agency's own site (or the official host it uses). */
  url?: string
  /** Written as the agency writes it, e.g. "(503) 555-0100". */
  phone?: string
  email?: string
  /** Overrides the default label for this contact type. */
  label?: string
  /** YYYY-MM-DD, when this one contact was confirmed later than the agency's `checked`. */
  checked?: string
}

export interface Agency {
  /** Permanent, never reused: country, region, then a short name, e.g. "us-or-odot". */
  id: string
  /** Official name, written out. */
  name: string
  /** The abbreviation the agency uses for itself, e.g. "ODOT". */
  abbr?: string
  /** ISO 3166-1 alpha-2, e.g. "US". */
  country: string
  /** ISO 3166-2, e.g. "US-OR". Omit for a national agency. */
  region?: string
  level: AgencyLevel
  /** The place it serves, for county, local, regional and tribal agencies, e.g. "Multnomah County". */
  area?: string
  /** One plain sentence: what to contact this agency about. */
  handles?: string
  contacts: AgencyContact[]
  /** YYYY-MM-DD, when the entry was last confirmed on the agency's own site. */
  checked: string
  /** [latitude, longitude] of the main office. Not drawn yet; kept for pins on the map later. */
  location?: [number, number]
}
