import type { ViewerData } from '$lib/viewer/types'

// A made-up sample street for the documentation demos (How to Read a
// Pattern, the Brand Guide), same precedent as the fictional ART-UMS-09
// Pattern ID card: decoupled from any real pattern so a real page's data
// can change without breaking the explanation. Not a recommendation, and
// none of its numbers come from a source.

const sections = [
  { id: 'midblock', label: 'Midblock', at: 70 },
  { id: 'crossing', label: 'At the crosswalk', at: 170 },
]
const crosswalk = { id: 'xw', type: 'crosswalk' as const, at: 170, length: 10 }

const data: ViewerData = {
  id: 'SAMPLE',
  views: [
    { id: 'section', label: 'Cross-section', kind: 'cross-section' },
    { id: 'plan', label: 'Top down', kind: 'plan' },
  ],
  configs: [
    {
      id: 'baseline',
      description: 'Sample only: two wide lanes, parking on both sides, narrow sidewalks, nothing for bicycles.',
      config: {
        kind: 'street',
        frontage: { left: 'buildings', right: 'lawn' },
        segments: [
          { id: 'sw-l', type: 'sidewalk', width: 5 },
          { id: 'pk-l', type: 'parking', width: 8 },
          { id: 'ln-l', type: 'travel-lane', width: 12, direction: 'inbound' },
          { id: 'ln-r', type: 'travel-lane', width: 12, direction: 'outbound' },
          { id: 'pk-r', type: 'parking', width: 8 },
          { id: 'sw-r', type: 'sidewalk', width: 5 },
        ],
      },
    },
    {
      id: 'nacto',
      description: 'Sample only: lanes narrowed, and the width they give up becomes a painted bike lane on each side.',
      config: {
        kind: 'street',
        frontage: { left: 'buildings', right: 'lawn' },
        segments: [
          { id: 'sw-l', type: 'sidewalk', width: 5 },
          { id: 'pk-l', type: 'parking', width: 8 },
          { id: 'bk-l', type: 'bike-lane', width: 5, direction: 'inbound' },
          { id: 'ln-l', type: 'travel-lane', width: 10, direction: 'inbound' },
          { id: 'ln-r', type: 'travel-lane', width: 10, direction: 'outbound' },
          { id: 'bk-r', type: 'bike-lane', width: 5, direction: 'outbound' },
          { id: 'pk-r', type: 'parking', width: 8 },
          { id: 'sw-r', type: 'sidewalk', width: 5 },
        ],
      },
    },
    {
      id: 'commonway',
      description: 'Sample only: the bike lanes move to the curb behind a buffer, street trees go in, and curb extensions shorten the crossing.',
      config: {
        kind: 'street',
        frontage: { left: 'buildings', right: 'lawn' },
        segments: [
          { id: 'sw-l', type: 'sidewalk', width: 5, items: [{ type: 'tree', spacing: 30, offset: 4 }] },
          { id: 'bk-l', type: 'protected-bike-lane', width: 5, direction: 'inbound' },
          { id: 'buf-l', type: 'buffer', width: 3 },
          { id: 'pk-l', type: 'parking', width: 7 },
          { id: 'ln-l', type: 'travel-lane', width: 10, direction: 'inbound' },
          { id: 'ln-r', type: 'travel-lane', width: 10, direction: 'outbound' },
          { id: 'pk-r', type: 'parking', width: 7 },
          { id: 'buf-r', type: 'buffer', width: 3 },
          { id: 'bk-r', type: 'protected-bike-lane', width: 5, direction: 'outbound' },
          { id: 'sw-r', type: 'sidewalk', width: 5, items: [{ type: 'tree', spacing: 30, offset: 1 }] },
        ],
        sections,
        features: [crosswalk],
        overrides: [{ id: 'ce', type: 'curb-extension', from: 158, to: 182, taper: 5, widths: { 'pk-l': 0, 'buf-l': 10, 'pk-r': 0, 'buf-r': 10 } }],
      },
    },
    {
      id: 'dutch',
      description: 'Sample only: cycle tracks raised to sidewalk level, no on-street parking.',
      config: {
        kind: 'street',
        frontage: { left: 'buildings', right: 'lawn' },
        segments: [
          { id: 'sw-l', type: 'sidewalk', width: 6 },
          { id: 'bk-l', type: 'protected-bike-lane', width: 7, direction: 'both', variant: 'cycle-track' },
          { id: 'fs-l', type: 'furnishing', width: 4, items: [{ type: 'tree', spacing: 30 }] },
          { id: 'ln-l', type: 'travel-lane', width: 10, direction: 'inbound' },
          { id: 'ln-r', type: 'travel-lane', width: 10, direction: 'outbound' },
          { id: 'fs-r', type: 'furnishing', width: 4, items: [{ type: 'tree', spacing: 30 }] },
          { id: 'bk-r', type: 'protected-bike-lane', width: 7, direction: 'both', variant: 'cycle-track' },
          { id: 'sw-r', type: 'sidewalk', width: 6 },
        ],
      },
    },
  ],
}

export default data
