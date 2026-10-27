import type { Agency } from '../types.js'

// Tribal transportation departments in the state, listed under the state
// where the tribal government is headquartered. Only tribes whose own site
// shows a roads or transportation office are listed.

const agencies: Agency[] = [
  {
    id: 'us-ks-prairie-band-road-bridge',
    name: 'Prairie Band Potawatomi Nation Road and Bridge Department',
    country: 'US',
    region: 'US-KS',
    level: 'tribal',
    area: 'Prairie Band Potawatomi Nation (reservation near Mayetta)',
    handles: 'Maintains more than 120 miles of asphalt, gravel and dirt roads, and the bridges, on the reservation.',
    contacts: [
      { type: 'website', url: 'https://www.pbpindiantribe.com/road-and-bridge' },
      { type: 'phone', phone: '(785) 966-2375' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-ks-kickapoo-road-maintenance',
    name: 'Kickapoo Tribe in Kansas Road Maintenance',
    country: 'US',
    region: 'US-KS',
    level: 'tribal',
    area: 'Kickapoo Tribe in Kansas (Kickapoo Reservation)',
    handles: 'Grades, repairs and clears snow from the reservation road network, and maintains its bridges, drainage and signs.',
    contacts: [
      { type: 'website', url: 'https://www.ktik-nsn.gov/road-maintenance' },
      { type: 'phone', phone: '(785) 933-2500' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-ks-iowa-tribe-road-maintenance',
    name: 'Iowa Tribe of Kansas and Nebraska Road Maintenance Department',
    country: 'US',
    region: 'US-KS',
    level: 'tribal',
    area: 'Iowa Tribe of Kansas and Nebraska (reservation near White Cloud; also Nebraska)',
    handles: 'Maintains the reservation and about 14 miles of access roads, including BIA roads, striping, guardrails and bridges.',
    contacts: [
      { type: 'website', url: 'https://iowatribeofkansasandnebraska.com/road-maintenance/' },
      { type: 'phone', phone: '785-595-3390' },
    ],
    checked: '2026-10-26',
  },
]

export default agencies
