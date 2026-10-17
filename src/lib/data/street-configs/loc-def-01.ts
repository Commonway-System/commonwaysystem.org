import type { ViewerData } from '$lib/viewer/types'

// Default (Standard Local Street), LOC-DEF-01.
// Moved from this page's old Illustration section (removed when the Pattern
// viewer replaced it): the Commonway recommendation's widths and both of its
// citations, [1] and [2], are this page's own References. Only the Commonway
// System configuration is drawn; the old "typical condition" frame gave no
// numbers. Tree spacing is illustrative.

const data: ViewerData = {
  id: 'LOC-DEF-01',
  views: [
    { id: 'section', label: 'Cross-section', kind: 'cross-section' },
    { id: 'plan', label: 'Top down', kind: 'plan' },
  ],
  configs: [
    {
      id: 'commonway',
      description: 'A 5 ft sidewalk and a 5 ft planting and furnishing strip on each side (standard, not optional), and one shared 18 ft travel lane for both directions, undivided and narrow enough to self-enforce 20 mph.',
      cite: [1, 2],
      config: {
        kind: 'street',
        frontage: { left: 'lawn', right: 'lawn' },
        segments: [
          { id: 'sw-l', type: 'sidewalk', width: 5 },
          { id: 'fs-l', type: 'furnishing', width: 5, items: [{ type: 'tree', spacing: 30 }] },
          { id: 'ln', type: 'travel-lane', width: 18, direction: 'both', label: 'Shared travel lane' },
          { id: 'fs-r', type: 'furnishing', width: 5, items: [{ type: 'tree', spacing: 30, start: 15 }] },
          { id: 'sw-r', type: 'sidewalk', width: 5 },
        ],
      },
    },
  ],
}

export default data
