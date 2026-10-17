import type { ViewerData } from '$lib/viewer/types'

// Four-to-three lane road diet, RFT-CDR-01.
// Source: this page's reference [4], FHWA's Road Diet Informational Guide
// (FHWA-SA-14-028, 2014): lane widths of 10 to 12 ft typically used, a
// center two-way left-turn lane of 10 to 16 ft, 5 ft typical one-way bike
// lanes, and the first known Road Diet (Billings, Montana, 1979) on a 40 ft
// roadway. Both states are drawn at that 40 ft curb to curb, with the
// narrowest widths in FHWA's ranges so the bike lanes fit at 5 ft. The 5 ft
// sidewalks are illustrative and don't change.

const data: ViewerData = {
  id: 'RFT-CDR-01',
  views: [
    { id: 'section', label: 'Cross-section', kind: 'cross-section' },
    { id: 'plan', label: 'Top down', kind: 'plan' },
  ],
  configs: [
    {
      id: 'before',
      description: 'A four-lane undivided road, 40 ft curb to curb (the width of the first known Road Diet, in Billings, Montana, in 1979): two 10 ft through lanes each direction, with left-turning drivers stopping in the inside through lane.',
      cite: [4],
      config: {
        kind: 'street',
        segments: [
          { id: 'sw-l', type: 'sidewalk', width: 5 },
          { id: 'ln-1', type: 'travel-lane', width: 10, direction: 'inbound' },
          { id: 'ln-2', type: 'travel-lane', width: 10, direction: 'inbound' },
          { id: 'ln-3', type: 'travel-lane', width: 10, direction: 'outbound' },
          { id: 'ln-4', type: 'travel-lane', width: 10, direction: 'outbound' },
          { id: 'sw-r', type: 'sidewalk', width: 5 },
        ],
      },
    },
    {
      id: 'after',
      description: 'The same 40 ft, restriped as three lanes: one 10 ft through lane each direction and a 10 ft center two-way left-turn lane, which separates turning traffic from through traffic. The freed width becomes a 5 ft bike lane on each side, FHWA\'s typical one-way bike lane width.',
      cite: [4],
      config: {
        kind: 'street',
        segments: [
          { id: 'sw-l', type: 'sidewalk', width: 5 },
          { id: 'bk-l', type: 'bike-lane', width: 5, direction: 'inbound' },
          { id: 'ln-1', type: 'travel-lane', width: 10, direction: 'inbound' },
          { id: 'tl', type: 'turn-lane', width: 10, direction: 'both' },
          { id: 'ln-4', type: 'travel-lane', width: 10, direction: 'outbound' },
          { id: 'bk-r', type: 'bike-lane', width: 5, direction: 'outbound' },
          { id: 'sw-r', type: 'sidewalk', width: 5 },
        ],
      },
    },
  ],
}

export default data
