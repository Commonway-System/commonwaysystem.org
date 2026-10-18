---
title: Commonway System
hideTitle: true
wide: true
description: A Pattern Language for Roads and Streets
date: 2026-08-28
llms: "Home page for the Commonway System Guidebook, a cross-referenced pattern language for road and street design grounded in cited evidence: where to start by goal, three findings about streets (induced demand, speed and pedestrian risk, the Los Angeles sidewalk settlement), a Stroad compared with a Boulevard, the patterns by scale, the positions the system takes, how its sources are tiered, featured media, and what's new."
---

<script>
  import { Hero, HomeCompare, HomeFacts, HomeGoals, HomeMedia, HomeNews, HomePatterns, HomePositions, HomeTrust } from '$lib/theme/components'
  import { patternPageCount, retrofitStrategyCount } from '$lib/pattern-count'
  import roadDiet from '$lib/data/street-configs/rft-cdr-01'
  import stroad from '$lib/data/street-configs/art-std-05'

  // Everything this page says lives here, section by section, top to bottom.
  // Counts, featured media and "What's new" come from +page.server.ts.

  const showcase = {
    data: roadDiet,
    before: 'before',
    after: 'after',
    title: 'Four-to-three lane road diet',
    caption: 'Same 40 feet of pavement: one lane each way, a center turn lane, and two bike lanes. FHWA reports 19 to 47 percent fewer crashes after this change.',
    href: '/retrofits/corridor/four-to-three-lane-road-diet/',
    linkLabel: 'See the road diet',
  }

  const goals = [
    { href: '/guide/make-it-happen/', icon: 'road', title: 'A street near you needs fixing', text: 'Who controls your road, and how to ask for a change.', cta: 'How road changes happen' },
    { href: '/patterns/', icon: 'grid', title: 'You want to see what good looks like', text: `${patternPageCount} patterns, from a whole street network down to a single curb.`, cta: 'Browse Patterns' },
    { href: '/retrofits/', icon: 'retrofit', title: 'You want to fix a street that exists', text: `${retrofitStrategyCount} retrofits, like a road diet or a signal-to-roundabout conversion.`, cta: 'Browse Retrofits' },
    { href: '/guide/how-the-transportation-ecosystem-fits-together/', icon: 'question', title: 'You want to know why streets work this way', text: "Who sets the rules, why the sign doesn't set the speed, and why added lanes fill up.", cta: 'Core Concepts' },
    { href: '/media/', icon: 'play', title: "You'd rather watch or listen", text: 'Videos, podcasts, and articles, each tied to the pages it supports.', cta: 'Media Gallery' },
    { href: '/about/governance/#how-disputes-over-evidence-are-resolved', icon: 'shield-check', title: "You're checking the work", text: 'Evidence tiers, the technical layer, and how disputes over evidence are settled.', cta: 'How evidence is judged' },
  ]

  const facts = [
    { claim: 'Wider roads fix traffic', figure: '10.3', figureUnit: '%', title: 'more driving from 10 percent more interstate lanes', text: 'The best estimate from a national study. Added lanes fill with new trips within 3 to 10 years, and researchers have measured the effect since at least the 1940s.', tier: 'evidence', href: '/guide/induced-demand/', linkLabel: 'Induced Demand' },
    { claim: 'The speed limit sets the speed', bars: [{ label: '23 mph', value: 10 }, { label: '32 mph', value: 25 }, { label: '42 mph', value: 50 }], barsLabel: 'Chance that a person on foot dies when hit by a car, by impact speed', title: "The street's design sets the speed", text: 'The faster a car is going, the likelier a person on foot dies. Changing the sign alone does little; a street built for the speed on its sign does the work.', tier: 'evidence', href: '/guide/design-speed/', linkLabel: 'Design Speed & Speed Limits' },
    { claim: 'Design guides are just suggestions', figure: '$1.37', figureUnit: 'billion', title: 'for Los Angeles sidewalks, by court settlement', text: 'Residents with disabilities sued under federal law, not a design guide, and won a 30-year commitment to fix sidewalks and crossings. Knowing which rules bind is power.', tier: 'legal', href: '/guide/how-the-transportation-ecosystem-fits-together/', linkLabel: 'How the Ecosystem Fits Together' },
  ]

  const compareFrom = { data: stroad, config: 'baseline', id: 'ART-STD-05', status: 'avoid', title: 'Stroad', text: 'Through traffic mixed with on-street parking and driveways. Its pattern page exists to help you spot one and replace it.', href: '/patterns/arterials/stroad/' }
  const compareTo = { data: stroad, config: 'commonway', id: 'ART-BLV-02', status: 'recommended', title: 'Multiway Boulevard', text: 'Through traffic in the center lanes; parking, driveways, and slow local traffic in side lanes behind tree-lined medians.', href: '/patterns/arterials/boulevard/' }

  const featured = [
    { href: '/patterns/local-streets/living-street-woonerf/', id: 'LOC-LSW-06', title: 'Living Street / Woonerf', classification: 'local' },
    { href: '/patterns/intersections/roundabout/', id: 'INT-RAB-01', title: 'Roundabout (Single / Multi-Lane)', classification: 'intersections' },
    { href: '/patterns/local-streets/bicycle-boulevard/', id: 'LOC-BBG-12', title: 'Bicycle Boulevard / Neighborhood Greenway', classification: 'local' },
    { href: '/patterns/intersections/protected-intersection/', id: 'INT-PRI-11', title: 'Protected Intersection', classification: 'intersections' },
    { href: '/patterns/local-streets/school-street/', id: 'LOC-SCH-11', title: 'School Street', classification: 'local' },
    { href: '/patterns/network/grid/', id: 'NET-GRD-01', title: 'Grid', classification: 'network' },
    { href: '/patterns/corridors/rural-to-town-gateway/', id: 'CDR-RTG-02', title: 'Rural-to-Town Gateway', classification: 'corridor' },
    { href: '/patterns/collectors/bike-highway-greenway/', id: 'COL-BHG-04', title: 'Bike Highway / Greenway', classification: 'collector' },
    { href: '/patterns/elements/modal-filter-point-closure/', id: 'ELM-MFP-44', title: 'Modal Filter / Point Closure', classification: 'element' },
    { href: '/patterns/local-streets/main-street/', id: 'LOC-MST-05', title: 'Main Street', classification: 'local' },
    { href: '/patterns/local-streets/cul-de-sac/', id: 'LOC-CDS-03', title: 'Cul-de-sac', classification: 'local', status: 'situational' },
    { href: '/patterns/elements/sharrow/', id: 'ELM-SHR-39', title: 'Sharrow', classification: 'element', status: 'avoid' },
  ]

  const positions = [
    { title: 'Build the street for the speed on its sign.', text: 'Design speed always equals the posted speed limit.', href: '/guide/design-speed/', linkLabel: 'Design Speed & Speed Limits' },
    { title: 'Neighborhood streets are 20 mph.', text: 'Local streets, with no exceptions.', href: '/patterns/local-streets/default/', linkLabel: 'Local Default (LOC-DEF-01)' },
    { title: 'Roundabouts come first.', text: 'The default wherever two Collector-or-higher streets meet; signals are a documented last resort.', href: '/patterns/intersections/roundabout/', linkLabel: 'Roundabout (INT-RAB-01)' },
    { title: 'Arterials move traffic, not parked cars.', text: 'The default Arterial has no on-street parking and no direct property access.', href: '/patterns/arterials/default/', linkLabel: 'Arterial Default (ART-DEF-01)' },
    { title: 'Added lanes are a cost, not a cure.', text: 'For congestion, pricing, reallocated road space, and a connected network come first; widening comes last.', href: '/guide/induced-demand/', linkLabel: 'Induced Demand' },
  ]

  const author = {
    name: 'Kevin Young',
    role: 'Author and compiler',
    photo: '/photos/kevinyoung.png',
    quote: 'Knowledge is power only when people can use it.',
    text: [
      "In 1977, Christopher Alexander's A Pattern Language argued that ordinary people, not just professionals, should be able to design their own streets and towns. The Commonway System applies that idea to roads and streets.",
      'It is compiled independently, not by an agency or firm, so it earns trust through citations rather than credentials. Every change is logged, and anyone can report a problem.',
    ],
    href: '/about/commonway-system/',
    linkLabel: 'About the Commonway System',
  }

  const patternsTitle = `${patternPageCount} patterns, from the whole network down to the curb`
  const patternsAll = `See all ${patternPageCount} patterns`
  const mediaAction = { href: '/media/', label: 'Open the Media Gallery' }
  const newsAction = { href: '/about/release-history/', label: 'Release history and roadmap' }

  const join = {
    title: 'Help build it',
    text: 'The Commonway System is maintained in the open. Spot something wrong, or know a source that belongs here?',
    links: [
      { href: '/about/reporting/', label: 'Report a problem' },
      { href: '/about/contributing/', label: 'Submit a change' },
      { href: '/rss.xml', label: 'Follow the blog by RSS' },
    ],
  }
</script>

<!-- Each component tag stays on one line: CommonMark only treats a complete one-line opening tag as an HTML block. Split across lines, it gets wrapped in a <p>, which breaks hydration. -->
<Hero eyebrow="A pattern language for roads and streets" title="Your street was designed." titleAccent="It can be redesigned." lede="How wide it is, how fast it feels, whether a child can cross it alone: someone chose each of those, usually by following a standard. The Commonway System shows what good streets look like, cites a source for every recommendation, and explains how to get yours changed." primaryHref="/guide/make-it-happen/" primaryLabel="Change a street near you" secondaryHref="/patterns/" secondaryLabel="See what good streets look like" searchLabel="Search patterns, retrofits, guides, and media" showcase={showcase} />

<HomeGoals eyebrow="Start with what you need" title="What brings you here?" goals={goals} />

<HomeFacts eyebrow="What the evidence says" title="Three things most people believe about streets, and what the research found" facts={facts} />

<HomeCompare eyebrow="Not just a catalog" title="You know this street. Here's what to build instead." intro="Every pattern carries a status: Recommended, Situational / Discouraged, Avoid, or Descriptive. When a common design fails, the Commonway System says so, and points to the alternative." from={compareFrom} to={compareTo} />

<HomePatterns eyebrow="The patterns" title={patternsTitle} intro="Each one describes what a street, intersection, facility, or element should be, with the sources behind it." featured={featured} allLabel={patternsAll} />

<HomePositions eyebrow="What it stands for" title="Where the evidence supports it, the Commonway System takes a position" intro="It builds on NACTO, Complete Streets, and Strong Towns, and goes further only where the research does." positions={positions} />

<HomeTrust eyebrow="Why you can trust it" title="Every recommendation shows its source, and how strong it is" tiersHref="/about/governance/#how-disputes-over-evidence-are-resolved" author={author} />

<HomeMedia eyebrow="Prefer to watch or listen?" title="Videos, podcasts, and articles, each tied to the pages they support" action={mediaAction} />

<HomeNews eyebrow="Growing every week" title="What's new" action={newsAction} join={join} />
