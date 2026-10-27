import type { Agency } from '../types.js'

// Tribal transportation departments in the state, listed under the state
// where the tribal government is headquartered. Only tribes whose own site
// shows a roads or transportation office are listed.

const agencies: Agency[] = [
  {
    id: 'us-tx-kickapoo-road-and-bridge',
    name: 'Kickapoo Traditional Tribe of Texas Road and Bridge',
    country: 'US',
    region: 'US-TX',
    level: 'tribal',
    area: 'Kickapoo Traditional Tribe of Texas (Eagle Pass)',
    handles: 'Part of Tribal Reservation Services Administration: maintains the Tribe\'s roadway system; the Department of Urban Development builds and maintains infrastructure including roads.',
    contacts: [
      { type: 'website', url: 'https://kickapootexas.org/tribal-reservation-services-administration/', label: 'Tribal Reservation Services Administration' },
      { type: 'phone', phone: '(830) 872-0430', label: 'Road and Bridge' },
    ],
    checked: '2026-10-26',
  },
]

export default agencies
