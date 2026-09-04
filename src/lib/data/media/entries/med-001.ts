import type { MediaItem } from '../types.js'

// Seed entry (feature ticket Section 7). Video content verified
// independently before writing the blurb: a real, existing Not Just Bikes
// video (published November 2019) about Dutch continuous-sidewalk
// crossings and their Sustainable Safety / Vision Zero rationale.
const item: MediaItem = {
  id: 'MED-001',
  type: 'video',
  title: 'The Dutch Solution for Safer Sidewalks - Continuous Sidewalks',
  url: 'https://www.youtube.com/watch?v=9OfBpQgLXUc',
  sourceName: 'Not Just Bikes',
  sourceIcon: 'https://yt3.googleusercontent.com/txNeBAcuSUUxKuIPzA9BF9enVh11NHs2Vdirh2wPfVs6DZW94uGodyVhI5sJPeL7iGE8Wl-5vpE=s160-c-k-c0x00ffffff-no-rj',
  image: 'https://img.youtube.com/vi/9OfBpQgLXUc/maxresdefault.jpg',
  blurb: 'Shows the same sidewalk-continuity concept behind Continuous Sidewalk / Raised Junction in practice: the roadway rises to meet the sidewalk at a crossing, rather than the sidewalk dropping to meet the road, so geometry itself signals the priority shift.',
  endorsementStatus: 'aligned',
  patternTaxonomyTags: ['Local', 'Collector'],
  mediaTags: ['Explainer'],
  relatedTo: [
    'INT-CSJ-06',
    'LOC-DEF-01',
    'LOC-BBG-12',
    'COL-DEF-01',
    'RFT-CDR-01',
    'RFT-CDR-02',
    'RFT-CDR-04',
  ],
  dateAdded: '2026-09-04',
}

export default item
