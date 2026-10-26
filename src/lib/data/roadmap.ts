// The open items list, which the Roadmap on /about/release-history/ renders.
// This file is the canonical list: add, remove or reword items only on
// Kevin's explicit instruction. IDs are never reused. When an item ships,
// delete it here and record it in that day's entry in releases.ts.
//
// Each item has:
//   id           permanent integer, never reused
//   title        short name, shown in bold
//   category     one of the categories below, in display order
//   description  one or two plain sentences for the public Roadmap (markdown
//                links allowed); keep any URL tied to the item verbatim
//   next         optional: the next 5-to-10-minute step; not rendered
//   hidden       optional: true keeps an item on the list but off the page

export const highestIdAssigned = 39

export const roadmapCategories = [
  'New content',
  'Structure changes',
  'Existing content',
  'Audits',
  'New features',
  'Standing / ongoing',
  'External',
] as const

export type RoadmapCategory = (typeof roadmapCategories)[number]

export interface RoadmapItem {
  id: number
  title: string
  category: RoadmapCategory
  description: string
  next?: string
  hidden?: boolean
}

export const roadmap: RoadmapItem[] = [
  { id: 2, category: 'New content', title: 'Traffic Calming page',
    description: 'A new Guide page on traffic calming, connected to the patterns and retrofit strategies it relates to.' },
  { id: 3, category: 'New content', title: 'Hoofdnet/Plusnet methodology page',
    description: 'A new Guide page on the Dutch Hoofdnet/Plusnet road-network methodology.' },
  { id: 4, category: 'Structure changes', title: 'Classification overview pages',
    description: 'Landing pages for Local, Collector, Arterial, and Freeway, sitting between the Pattern Index and individual Street Typology pages, which currently jump straight from one to the other.' },
  { id: 5, category: 'Structure changes', title: 'Dutch CROW reconciliation',
    description: 'Folding an internal CROW-comparison reference into the actual Commonway System patterns.' },
  { id: 7, category: 'Existing content', title: 'Brand Guide page update',
    description: 'Finalizing `/about/brand-guide/` as the canonical brand reference, including documentation for components not yet covered there.' },
  { id: 8, category: 'Existing content', title: 'Related Media placement decision',
    description: 'Finalizing which page a specific Related Media item currently tagged to the Commonway System page actually belongs on.' },
  { id: 12, category: 'Audits', title: 'Website specification audit, remaining items',
    description: "The first full pass against the checklist at specification.website is published on the [Website Audit](/about/website-audit/) page; the items still marked Partial, Fail or Not yet reviewed there are what's left." },
  { id: 37, category: 'Audits', title: 'Manual accessibility testing', hidden: true,
    description: 'Testing with a screen reader, keyboard only, 200 and 400 percent zoom, and forced-colors mode, beyond the automated axe scans.' },
  { id: 13, category: 'New features', title: 'Find Your Pattern tool',
    description: 'A two-part diagnostic tool plus an interactive, clickable hotspot map.',
    next: 'Deferred until pattern coverage is more complete and the Hoofdnet/Plusnet page (item 3) is further along.' },
  { id: 14, category: 'New features', title: 'Photo Gallery feature',
    description: 'A new media type usable on any page: ordinary photos, before/after comparison sliders, and map-based street-level photos.' },
  { id: 15, category: 'New features', title: 'Related Media refinements',
    description: 'Improvements to how the Related Media component displays.' },
  { id: 38, category: 'New features', title: 'Road Agency Directory map view',
    description: 'A third way to browse the [Road Agency Directory](/references/road-agencies/): a map of the states and territories, each one a link that filters the list, shaded by how much of it has been researched. The list stays the full text alternative.',
    next: 'Self-hosted SVG map, no map tiles or third-party hosts. Canada and other countries need their own outlines later.' },
  { id: 39, category: 'Standing / ongoing', title: 'Road Agency Directory research',
    description: 'Filling in the [Road Agency Directory](/references/road-agencies/) a few agencies at a time: request forms, bike and pedestrian programs, ADA coordinators and road-ownership maps for state DOTs, then metropolitan planning organizations, counties, cities and tribal transportation departments, then Canada.',
    next: 'Use /add-agency. Start with each state DOT\'s bike and pedestrian coordinator and road-ownership map. American Samoa\'s public works department is still missing.' },
  { id: 24, category: 'Standing / ongoing', title: 'Pattern viewer drawings rollout',
    description: 'Drawn, interactive views for every pattern and Retrofit Strategy, beyond the six that have them now; the rest show their illustration or a placeholder until then.' },
  { id: 36, category: 'Standing / ongoing', title: 'Layered guidance across sources rollout',
    description: 'A side-by-side table of what the Commonway System, federal and state baselines, NACTO, Complete Streets and Dutch Sustainable Safety each recommend, added to every Local, Collector, Arterial, and Intersections & Crossings pattern page.',
    next: 'Done on Collector Default, Rural Collector and Industrial Collector; Local Default and Arterial Default not started.' },
  { id: 27, category: 'Standing / ongoing', title: 'Bike Highway / Downtown Thoroughfare content pass',
    description: 'A future revision pass on these two pattern pages.' },
  { id: 28, category: 'Standing / ongoing', title: 'Binding-adoption template',
    description: 'A future, separate model template for formal municipal adoption.' },
  { id: 29, category: 'Standing / ongoing', title: 'More media items',
    description: 'Ongoing additions to the Media Gallery as new sources come up.' },
  { id: 30, category: 'External', title: 'Rosetta Places citation',
    description: 'Rosetta Places will cite the Commonway System by name once it reaches a citable state.' },
]
