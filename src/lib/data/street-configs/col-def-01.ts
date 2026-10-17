import type { ViewerData } from '$lib/viewer/types'

// Default (Standard Collector), COL-DEF-01.
// The descriptions follow this page's Layered guidance table (citation
// numbers are this page's own References). Sourced widths: 10 to 12 ft lanes
// [2], NACTO's 10 ft [3], 7 ft parking minimum and 8 ft desirable [13], PROWAG's
// 4 ft sidewalk minimum [7], NACTO's 5 to 7 ft residential sidewalk [8], 2 ft
// buffer minimum and 3 ft beside parking [5]. Not sourced, drawn as typical:
// the 6 ft protected bike lanes, the 4 ft furnishing strips, the 7 ft cycle
// tracks in the Dutch reference, and the crosswalk and curb extension
// placement (Complete Streets lists curb extensions as typical [4]). NACTO's
// parking width wasn't sourced, so its rungs keep the 7 ft baseline lane.

const sidewalk = (id: string, width: number) => ({ id, type: 'sidewalk' as const, width })
const lane = (id: string, width: number, direction: 'inbound' | 'outbound') => ({ id, type: 'travel-lane' as const, width, direction })

// Where the cross-section can be cut, and the crosswalk both upper rungs share.
const sections = [
  { id: 'midblock', label: 'Midblock', at: 80 },
  { id: 'crossing', label: 'At the crosswalk', at: 200 },
]
const crosswalk = { id: 'xw', type: 'crosswalk' as const, at: 200, length: 10 }

const data: ViewerData = {
  id: 'COL-DEF-01',
  views: [
    { id: 'section', label: 'Cross-section', kind: 'cross-section' },
    { id: 'plan', label: 'Top down', kind: 'plan' },
  ],
  configs: [
    {
      id: 'baseline',
      description: 'Two travel lanes within the AASHTO Green Book\'s 10 to 12 ft Collector range, drawn at 12 ft, with 7 ft parking lanes, the Green Book\'s urban minimum. No bike facility is required. Sidewalks are drawn at 4 ft, the PROWAG minimum clear width, though federal rules don\'t require a sidewalk to be built at all.',
      cite: [2, 13, 7],
      config: {
        kind: 'street',
        segments: [
          sidewalk('sw-l', 4),
          { id: 'pk-l', type: 'parking', width: 7 },
          lane('ln-l', 12, 'inbound'),
          lane('ln-r', 12, 'outbound'),
          { id: 'pk-r', type: 'parking', width: 7 },
          sidewalk('sw-r', 4),
        ],
      },
    },
    {
      id: 'nacto',
      description: 'Travel lanes narrow to 10 ft, NACTO\'s urban recommendation. Each side gets a protected bike lane instead of a painted one, with a buffer of at least 2 ft, 3 ft next to parking. The sidewalk widens to a 6 ft through zone, inside NACTO\'s 5 to 7 ft residential range.',
      cite: [3, 5, 8],
      config: {
        kind: 'street',
        segments: [
          sidewalk('sw-l', 6),
          { id: 'bk-l', type: 'protected-bike-lane', width: 6, direction: 'inbound' },
          { id: 'buf-l', type: 'buffer', width: 3 },
          { id: 'pk-l', type: 'parking', width: 7 },
          lane('ln-l', 10, 'inbound'),
          lane('ln-r', 10, 'outbound'),
          { id: 'pk-r', type: 'parking', width: 7 },
          { id: 'buf-r', type: 'buffer', width: 3 },
          { id: 'bk-r', type: 'protected-bike-lane', width: 6, direction: 'outbound' },
          sidewalk('sw-r', 6),
        ],
      },
    },
    {
      id: 'complete-streets',
      description: 'A Complete Streets policy lists sidewalks, bike lanes or wide shoulders, narrower travel lanes and curb extensions as typical elements, without setting widths. The drawing keeps the NACTO dimensions and adds a furnishing strip with street trees, and curb extensions where the sidewalk meets a marked crosswalk.',
      cite: [4],
      config: {
        kind: 'street',
        segments: [
          sidewalk('sw-l', 6),
          { id: 'fs-l', type: 'furnishing', width: 4, items: [{ type: 'tree', spacing: 30 }, { type: 'street-light', spacing: 60, start: 15 }] },
          { id: 'bk-l', type: 'protected-bike-lane', width: 6, direction: 'inbound' },
          { id: 'buf-l', type: 'buffer', width: 3 },
          { id: 'pk-l', type: 'parking', width: 7 },
          lane('ln-l', 10, 'inbound'),
          lane('ln-r', 10, 'outbound'),
          { id: 'pk-r', type: 'parking', width: 7 },
          { id: 'buf-r', type: 'buffer', width: 3 },
          { id: 'bk-r', type: 'protected-bike-lane', width: 6, direction: 'outbound' },
          { id: 'fs-r', type: 'furnishing', width: 4, items: [{ type: 'tree', spacing: 30 }, { type: 'street-light', spacing: 60, start: 15 }] },
          sidewalk('sw-r', 6),
        ],
        sections,
        features: [crosswalk],
        overrides: [
          { id: 'ce', type: 'curb-extension', from: 186, to: 214, taper: 6, widths: { 'pk-l': 0, 'fs-l': 11, 'pk-r': 0, 'fs-r': 11 }, elementId: 'ELM-CBE-02' },
        ],
      },
    },
    {
      id: 'commonway',
      description: 'Two 10 ft travel lanes, one each way. A protected bike lane on each side behind a rigid barrier, which needs no minimum buffer width. Sidewalks on both sides sized to NACTO\'s range, with a furnishing strip. On-street parking is optional and left out here; where it is provided, it gets 8 ft.',
      config: {
        kind: 'street',
        segments: [
          sidewalk('sw-l', 6),
          { id: 'fs-l', type: 'furnishing', width: 4, items: [{ type: 'tree', spacing: 30 }, { type: 'street-light', spacing: 60, start: 15 }] },
          { id: 'bk-l', type: 'protected-bike-lane', width: 6, direction: 'inbound', variant: 'rigid-barrier', elementId: 'ELM-PBL-37' },
          { id: 'buf-l', type: 'buffer', width: 2, items: [{ type: 'barrier' }] },
          lane('ln-l', 10, 'inbound'),
          lane('ln-r', 10, 'outbound'),
          { id: 'buf-r', type: 'buffer', width: 2, items: [{ type: 'barrier' }] },
          { id: 'bk-r', type: 'protected-bike-lane', width: 6, direction: 'outbound', variant: 'rigid-barrier', elementId: 'ELM-PBL-37' },
          { id: 'fs-r', type: 'furnishing', width: 4, items: [{ type: 'tree', spacing: 30 }, { type: 'street-light', spacing: 60, start: 15 }] },
          sidewalk('sw-r', 6),
        ],
        sections,
        features: [crosswalk],
      },
    },
    {
      id: 'dutch',
      description: 'The closest Dutch peer is a distributor road. Above 30 km/h (about 19 mph), cyclists get a physically separated cycle track, not a painted lane. There is no on-street parking and no direct property access; both belong on local access streets.',
      cite: [6],
      config: {
        kind: 'street',
        segments: [
          sidewalk('sw-l', 6),
          { id: 'bk-l', type: 'protected-bike-lane', width: 7, direction: 'both', variant: 'cycle-track' },
          { id: 'fs-l', type: 'furnishing', width: 4, items: [{ type: 'tree', spacing: 30 }] },
          lane('ln-l', 10, 'inbound'),
          lane('ln-r', 10, 'outbound'),
          { id: 'fs-r', type: 'furnishing', width: 4, items: [{ type: 'tree', spacing: 30 }] },
          { id: 'bk-r', type: 'protected-bike-lane', width: 7, direction: 'both', variant: 'cycle-track' },
          sidewalk('sw-r', 6),
        ],
      },
    },
  ],
}

export default data
