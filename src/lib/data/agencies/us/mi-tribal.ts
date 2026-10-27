import type { Agency } from '../types.js'

// Tribal transportation departments in the state, listed under the state
// where the tribal government is headquartered. Only tribes whose own site
// shows a roads or transportation office are listed.

const agencies: Agency[] = [
  {
    id: 'us-mi-sault-tribe-transportation',
    name: 'Sault Ste. Marie Tribe of Chippewa Indians Transportation Department',
    country: 'US',
    region: 'US-MI',
    level: 'tribal',
    area: 'Sault Tribe service area, eastern Upper Peninsula',
    handles: 'Monitors and repairs tribal roads, bridges, trails and sidewalks, manages construction projects, and plans regional tribal transit and safety.',
    contacts: [
      { type: 'website', url: 'https://www.saulttribe.com/about-us/transportation-department', label: 'Transportation Department' },
      { type: 'phone', phone: '906-635-6050', label: 'Transportation Department' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-mi-bay-mills-planning',
    name: 'Bay Mills Indian Community Planning and Development',
    country: 'US',
    region: 'US-MI',
    level: 'tribal',
    area: 'Bay Mills Indian Community (Chippewa County, Michigan)',
    handles: 'The Planning and Development office publishes the community\'s Transportation Plan and Transportation Safety Plan; the community also lists a public transportation schedule.',
    contacts: [
      { type: 'website', url: 'https://www.baymills.org/planning-development', label: 'Planning and Development (development plans)' },
      { type: 'safety-plan', url: 'https://www.baymills.org/_files/ugd/869f65_f4504103dd2c4ff79a55aabc6b4f3d19.pdf', label: 'Transportation Safety Plan' },
      { type: 'plan', url: 'https://www.baymills.org/_files/ugd/869f65_476addc06bce40338669dec89b7b3b78.pdf', label: 'Transportation Plan' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-mi-keweenaw-bay-public-works',
    name: 'Keweenaw Bay Indian Community Public Works Roads Division',
    abbr: 'KBIC',
    country: 'US',
    region: 'US-MI',
    level: 'tribal',
    area: 'Keweenaw Bay Indian Community (L\'Anse Reservation, Baraga, Michigan)',
    handles: 'The Public Works Roads Division runs the community\'s Tribal Transportation Program equipment and road work; the site has no dedicated roads page yet, so the contact is a public notice and the main office line.',
    contacts: [
      { type: 'website', url: 'https://www.kbic-nsn.gov/kbic-public-works-roads-division-seeks-bids-for-mid-size-wheel-loader-for-tribal-transportation-program/', label: 'Public notice from the Roads Division' },
      { type: 'phone', phone: '906-353-6623', label: 'KBIC main office' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-mi-little-traverse-bay-planning',
    name: 'Little Traverse Bay Bands of Odawa Indians Planning Department (Transportation)',
    abbr: 'LTBB',
    country: 'US',
    region: 'US-MI',
    level: 'tribal',
    area: 'Little Traverse Bay Bands of Odawa Indians (Harbor Springs, Michigan)',
    handles: 'The Planning Department includes the tribe\'s transportation planner and posts its Tribal Transportation Improvement Plan, tribal transit plan and a reservation road construction map.',
    contacts: [
      { type: 'website', url: 'https://ltbbodawa-nsn.gov/departments/planning-zoning-and-building-department/', label: 'Planning (Road Construction, Transit Plan)' },
      { type: 'ownership-map', url: 'https://ltbbodawa-nsn.gov/wp-content/uploads/2020/11/Reservation_Map_Road-Const_ResOnly_11x17.pdf', label: 'Reservation road construction map' },
      { type: 'plan', url: 'https://ltbbodawa-nsn.gov/news/proposed-tribal-transportation-plan/', label: 'Proposed Tribal Transportation Plan 2023 to 2026' },
      { type: 'phone', phone: '(231) 242-1591', label: 'Planning Department' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-mi-saginaw-chippewa-planning',
    name: 'Saginaw Chippewa Indian Tribe Planning Department',
    country: 'US',
    region: 'US-MI',
    level: 'tribal',
    area: 'Saginaw Chippewa Indian Tribe of Michigan (Isabella Reservation, Mount Pleasant)',
    handles: 'The Planning Department\'s stated mission includes maintaining and carrying out an effective transportation program within the Reservation, alongside building code and environmental work.',
    contacts: [
      { type: 'website', url: 'https://www.sagchip.org/planning/index.htm', label: 'Planning Department' },
      { type: 'phone', phone: '989-775-4014', label: 'Planning Department' },
    ],
    checked: '2026-10-26',
  },
]

export default agencies
