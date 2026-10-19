import type { ViewerData } from '$lib/viewer/types'
import { multiwayBoulevard } from './art-blv-02'

// Stroad (Commercial Arterial), ART-STD-05: an Avoid pattern, so its ladder
// has two rungs: the Stroad as typically built, and the Commonway System
// answer, which is to replace it. The top rung reuses Boulevard's own
// configuration (imported, not copied) and links to that page.
// Citation numbers are this page's References: [1] Strong Towns on what a
// Stroad is, [3] NCHRP Report 420 on access density and crash rates.
// The widths drawn for the Stroad itself (12 ft lanes, 12 ft center turn
// lane, 8 ft parking, 5 ft sidewalks) are typical, not sourced; the driveway
// spacing (every 150 ft) sits inside the 100 to 200 ft this page describes.

const driveways = [30, 180].flatMap((at, k) => [
  { id: `dw-l-${k}`, type: 'driveway' as const, at, across: ['sw-l'] },
  { id: `dw-r-${k}`, type: 'driveway' as const, at: at + 75, across: ['sw-r'] },
])

const data: ViewerData = {
  id: 'ART-STD-05',
  views: [
    { id: 'section', label: 'Cross-section', kind: 'cross-section' },
    { id: 'plan', label: 'Top down', kind: 'plan' },
  ],
  configs: [
    {
      id: 'baseline',
      label: 'Stroad as built',
      shortLabel: 'As built',
      description: 'Through traffic and local access share one road: two wide lanes each way and a center turn lane, on-street parking along the curb, and a driveway into a business every 100 to 200 ft, with no frontage road to gather them. Every driveway is a conflict point; corridors with dense access run about three times the crash rate of well-managed ones.',
      cite: [1, 3],
      config: {
        kind: 'street',
        frontage: { left: 'parking-lot', right: 'parking-lot' },
        segments: [
          { id: 'sw-l', type: 'sidewalk', width: 5 },
          { id: 'pk-l', type: 'parking', width: 8 },
          { id: 'ln-1', type: 'travel-lane', width: 12, direction: 'inbound' },
          { id: 'ln-2', type: 'travel-lane', width: 12, direction: 'inbound' },
          { id: 'tl', type: 'turn-lane', width: 12, direction: 'both' },
          { id: 'ln-3', type: 'travel-lane', width: 12, direction: 'outbound' },
          { id: 'ln-4', type: 'travel-lane', width: 12, direction: 'outbound' },
          { id: 'pk-r', type: 'parking', width: 8 },
          { id: 'sw-r', type: 'sidewalk', width: 5 },
        ],
        features: driveways,
      },
    },
    {
      id: 'commonway',
      label: 'Commonway System: a Boulevard instead',
      shortLabel: 'Boulevard instead',
      description: 'The Commonway System doesn\'t improve a Stroad, it replaces it. Where a pedestrian-first frontage fits the corridor, the replacement is a Boulevard: through traffic in the center lanes, local access and parking moved to slow side lanes behind tree-lined medians. Where it doesn\'t fit, the alternative is Default Arterial with a separate Local or Frontage / Service Road.',
      link: { href: '/patterns/arterials/boulevard/', label: 'See Boulevard (ART-BLV-02)' },
      config: multiwayBoulevard,
    },
  ],
}

export default data
