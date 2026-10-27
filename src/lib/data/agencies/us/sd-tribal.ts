import type { Agency } from '../types.js'

// Tribal transportation departments in the state, listed under the state
// where the tribal government is headquartered. Only tribes whose own site
// shows a roads or transportation office are listed.

const agencies: Agency[] = [
  {
    id: 'us-sd-rosebud-transportation',
    name: 'Rosebud Sioux Tribe Transportation Program',
    country: 'US',
    region: 'US-SD',
    level: 'tribal',
    area: 'Rosebud Sioux Tribe (Rosebud Indian Reservation)',
    handles: 'Rehabilitates roads and bridges from the Tribal Priority Listing, keeps the Tribal Transportation Improvement Plan and the road inventory.',
    contacts: [
      { type: 'website', url: 'https://www.rosebudsiouxtribe-nsn.gov/natural-res', label: 'Natural Resources and transportation page' },
      { type: 'phone', phone: '605-856-2944' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-sd-rosebud-roads',
    name: 'Rosebud Sioux Tribe Roads Department',
    country: 'US',
    region: 'US-SD',
    level: 'tribal',
    area: 'Rosebud Sioux Tribe (Rosebud Indian Reservation)',
    handles: 'Maintains Rosebud Sioux Tribe and BIA roads.',
    contacts: [
      { type: 'website', url: 'https://www.rosebudsiouxtribe-nsn.gov/natural-res', label: 'Natural Resources and transportation page' },
      { type: 'phone', phone: '605-747-2251' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-sd-yankton-roads',
    name: 'Yankton Sioux Tribe Roads Maintenance',
    country: 'US',
    region: 'US-SD',
    level: 'tribal',
    area: 'Yankton Sioux Tribe (Yankton Reservation)',
    handles: 'Maintains tribal and BIA roads and rights of way.',
    contacts: [
      { type: 'website', url: 'https://www.yanktonsiouxtribe.net/roads-maintenance' },
      { type: 'contact', url: 'https://www.yanktonsiouxtribe.net/yst-transportation', label: 'YST Transportation page' },
      { type: 'phone', phone: '605-384-3641' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-sd-sisseton-wahpeton-dot',
    name: 'Sisseton Wahpeton Oyate Department of Transportation',
    country: 'US',
    region: 'US-SD',
    level: 'tribal',
    area: 'Sisseton Wahpeton Oyate (Lake Traverse Reservation; also North Dakota)',
    handles: 'Plans and manages transportation on the Lake Traverse Reservation, including BIA routes and community transit; the Tribal Roads program builds and maintains tribal roads.',
    contacts: [
      { type: 'website', url: 'https://swo-nsn.gov/departments/department-of-commerce/department-of-transportation/' },
      { type: 'contact', url: 'https://swo-nsn.gov/departments/department-of-commerce/tribal-roads/', label: 'Tribal Roads program' },
      { type: 'phone', phone: '605-698-3911' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-sd-cheyenne-river-dot',
    name: 'Cheyenne River Sioux Tribe Department of Transportation',
    country: 'US',
    region: 'US-SD',
    level: 'tribal',
    area: 'Cheyenne River Sioux Reservation (Dewey and Ziebach counties)',
    handles: 'Maintains and rebuilds the tribe\'s road system (blading, crack sealing, pothole repair), runs an Elderly Roads Program for home-road repairs and snow removal, and operates CRST Transit with River Cities Public Transit.',
    contacts: [
      { type: 'website', url: 'https://cheyenneriversioux.com/department-of-transporation', label: 'Department of Transportation' },
      { type: 'plan', url: 'https://cheyenneriversioux.com/_files/ugd/17ce4a_0d88650984dc406b9df870d6bf367f19.pdf', label: 'Long Range Transportation Plan (2021)' },
      { type: 'phone', phone: '(605) 964-6960', label: 'Department of Transportation' },
      { type: 'phone', phone: '(605) 964-7433', label: 'CRST Transit' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-sd-flandreau-santee-roads',
    name: 'Flandreau Santee Sioux Tribe Roads & Transportation Department',
    country: 'US',
    region: 'US-SD',
    level: 'tribal',
    area: 'Flandreau Santee Sioux Reservation (Moody County)',
    handles: 'Part of the Department of Facilities Management; maintains the tribal road network, pathways and bridges on the reservation.',
    contacts: [
      { type: 'website', url: 'https://fsst-nsn.gov/programs/road-maintenance', label: 'Road Maintenance' },
      { type: 'contact', url: 'https://fsst-nsn.gov/contact-us', label: 'Contact the Tribe' },
      { type: 'phone', phone: '(605) 997-3891 ext. 1209', label: 'Roads & Transportation' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-sd-lower-brule-roads',
    name: 'Lower Brule Sioux Tribe Roads Department',
    country: 'US',
    region: 'US-SD',
    level: 'tribal',
    area: 'Lower Brule Sioux Tribe, Lower Brule Reservation',
    contacts: [
      { type: 'website', url: 'https://www.lowerbrulesiouxtribe.com/copy-of-icwa-1', label: 'Roads Department' },
      { type: 'phone', phone: '(605) 473-5354', label: 'Roads Department' },
    ],
    checked: '2026-10-26',
  },
]

export default agencies
