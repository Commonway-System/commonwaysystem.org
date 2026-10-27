import type { Agency } from '../types.js'

// Tribal transportation departments in the state, listed under the state
// where the tribal government is headquartered. Only tribes whose own site
// shows a roads or transportation office are listed.

const agencies: Agency[] = [
  {
    id: 'us-ny-seneca-nation-dot',
    name: 'Seneca Nation Department of Transportation',
    country: 'US',
    region: 'US-NY',
    level: 'tribal',
    area: 'Seneca Nation of Indians (Allegany, Cattaraugus and Oil Spring Territories)',
    handles: 'Oversees transportation on Nation lands: maintenance and safety of roads, bridges and paths, trail development, safety planning and project delivery, plus the Seneca Transit System.',
    contacts: [
      { type: 'website', url: 'https://sni.org/community-services/department-of-transportation/', label: 'Department of Transportation' },
      { type: 'request', url: 'https://sni.org/wp-content/uploads/2021/08/SNDOT-Work-Order-Request.pdf', label: 'SNDOT work order request form (PDF)' },
      { type: 'plan', url: 'https://sni.org/wp-content/uploads/2021/08/6-2024-SNI-LRTP-_-FINAL-w-Appendices.pdf', label: '2024 Long Range Transportation Plan (PDF)' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-ny-saint-regis-mohawk-planning',
    name: 'Saint Regis Mohawk Tribe Planning and Infrastructure Department',
    country: 'US',
    region: 'US-NY',
    level: 'tribal',
    area: 'Saint Regis Mohawk Tribe (Akwesasne)',
    handles: 'Handles roads maintenance and planning for tribal roads; state highways such as Route 37 also involve the New York State Department of Transportation.',
    contacts: [
      { type: 'website', url: 'https://www.srmt-nsn.gov/programs/planning-and-infrastructure', label: 'Planning and Infrastructure' },
      { type: 'plan', url: 'https://dvc479a3doke3.cloudfront.net/_uploads/site_files/2022-2025-control-schedule-signed.pdf', label: '2022-2025 Tribal Transportation Plan Control Schedule (PDF)' },
      { type: 'safety-plan', url: 'https://dvc479a3doke3.cloudfront.net/_uploads/site_files/SRMT-Safety-Plan-Final.pdf', label: 'SRMT Safety Plan 2022 (PDF)' },
      { type: 'phone', phone: '(518) 358-4205' },
    ],
    checked: '2026-10-26',
  },
  {
    id: 'us-ny-shinnecock-transportation',
    name: 'Shinnecock Indian Nation Department of Transportation',
    country: 'US',
    region: 'US-NY',
    level: 'tribal',
    area: 'Shinnecock Indian Nation (Southampton)',
    handles: 'Plans a multi-modal transportation network on the Nation\'s land, including roadway planning and design, and points riders to Suffolk Transit On-Demand.',
    contacts: [
      { type: 'website', url: 'https://www.shinnecock-nsn.gov/transporation', label: 'Department of Transportation' },
      { type: 'phone', phone: '(631) 283-6143 ext. 120', label: 'Transportation Coordinator' },
    ],
    checked: '2026-10-26',
  },
]

export default agencies
