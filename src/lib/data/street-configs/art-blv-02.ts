import type { StreetConfig, ViewerData } from '$lib/viewer/types'

// Boulevard, ART-BLV-02: the Multiway Boulevard variant.
// Sources (this page's References): [2] Jacobs, Rofé and Macdonald,
// "Guidelines for the Design of Multiple Roadway Boulevards" (UCTC): a 100 ft
// right-of-way is the feasible minimum, a 40 ft center roadway flanked by 30 ft
// pedestrian realms; medians from 5 ft up to 40 to 50 ft with closely spaced
// trees; parking lanes narrow, 6 or 7 ft; access roads with one moving lane.
// [3] San Francisco Better Streets Plan (archived): side medians preferably
// 10 ft, 6 ft of it planting.
// Drawn at the 100 ft minimum. The 9 ft access lane and 8 ft sidewalk are
// what's left of each 30 ft realm, not sourced numbers; the 20 ft tree
// spacing stands in for "closely spaced". Only the Commonway System
// configuration exists: no other source's version of a boulevard has been
// researched for this page.

/** Exported so Stroad (and later Retrofit Strategies) can show the same street. */
export const multiwayBoulevard: StreetConfig = {
  kind: 'street',
  segments: [
    { id: 'sw-l', type: 'sidewalk', width: 8 },
    { id: 'pk-l', type: 'parking', width: 7 },
    { id: 'ac-l', type: 'travel-lane', width: 9, direction: 'inbound', label: 'Access lane' },
    { id: 'md-l', type: 'median', width: 6, items: [{ type: 'tree', spacing: 20 }, { type: 'street-light', spacing: 80, start: 10 }] },
    { id: 'ln-1', type: 'travel-lane', width: 10, direction: 'inbound' },
    { id: 'ln-2', type: 'travel-lane', width: 10, direction: 'inbound' },
    { id: 'ln-3', type: 'travel-lane', width: 10, direction: 'outbound' },
    { id: 'ln-4', type: 'travel-lane', width: 10, direction: 'outbound' },
    { id: 'md-r', type: 'median', width: 6, items: [{ type: 'tree', spacing: 20 }, { type: 'street-light', spacing: 80, start: 10 }] },
    { id: 'ac-r', type: 'travel-lane', width: 9, direction: 'outbound', label: 'Access lane' },
    { id: 'pk-r', type: 'parking', width: 7 },
    { id: 'sw-r', type: 'sidewalk', width: 8 },
  ],
  sections: [{ id: 'midblock', label: 'Midblock', at: 60 }],
  features: [
    { id: 'xw-a', type: 'crosswalk', at: 230, length: 10, across: ['pk-l', 'ac-l', 'md-l', 'ln-1', 'ln-2', 'ln-3', 'ln-4', 'md-r', 'ac-r', 'pk-r'] },
  ],
}

export const multiwayDescription = 'A Multiway Boulevard: a center roadway of four through lanes, at least 40 ft wide, for faster traffic. On each side, a 30 ft pedestrian realm: a tree-lined median, then an access road with one slow moving lane and a 6 to 7 ft parking lane, then the sidewalk. Drawn at the 100 ft right-of-way the boulevard research calls the feasible minimum, with 6 ft medians; San Francisco prefers 10 ft side medians where the street is wider.'

const data: ViewerData = {
  id: 'ART-BLV-02',
  views: [
    { id: 'section', label: 'Cross-section', kind: 'cross-section' },
    { id: 'plan', label: 'Top down', kind: 'plan' },
  ],
  configs: [
    {
      id: 'commonway',
      description: multiwayDescription,
      cite: [2, 3],
      config: multiwayBoulevard,
    },
  ],
}

export default data
