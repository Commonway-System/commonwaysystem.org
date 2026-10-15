import type { MediaItem } from '../types.js'

const item: MediaItem = {
  id: 'MED-089',
  type: 'video',
  title: 'The Intersection That Makes Left Turns Impossible',
  url: 'https://www.youtube.com/watch?v=3nLK9GzfqHA',
  sourceName: 'Safe By Design',
  sourceIcon: '/channel-icons/safe-by-design.jpg',
  image: '/media-assets/med-089.jpg',
  blurb: 'This video explains how the Restricted Crossing U-Turn removes left turns and crossing movements from the side street, with crash-reduction results from Alabama, Nebraska and North Carolina and an honest look at the longer pedestrian crossings it can create. It is a close companion to the Commonway System\'s RCUT pattern and retrofit strategy, and to the related Median U-Turn and Displaced Left-Turn designs.',
  endorsementStatus: 'aligned',
  endorsementOverrides: { 'INT-SIG-03': 'context-only', 'ELM-CRW-08': 'context-only', 'INT-MPC-08': 'context-only' },
  patternTaxonomyTags: ['Collector', 'Arterial'],
  mediaTags: ['Explainer'],
  relatedTo: ['INT-RCU-13', 'RFT-INT-03', 'INT-MUT-12', 'RFT-INT-02', 'INT-SIG-03', 'ELM-MDI-45', 'INT-DLT-14', 'RFT-INT-04', 'ELM-CRW-08', 'INT-MPC-08'],
  dateAdded: '2026-10-14',
}

export default item
