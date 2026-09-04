---
title: Commonway System
hideTitle: true
wide: true
description: A Pattern Language for Roads and Streets
date: 2026-08-28
llms: Home page for the Commonway System Guidebook, a cross-referenced pattern language for road and street design grounded in cited evidence.
---

<script>
  import { EvidenceStrip, FeatureGrid, Hero } from '$lib/theme/components'

  const features = [
    {
      href: '/guide/',
      title: 'Guide',
      description: "Start here. How the system is put together, how patterns are classified, and how to read one.",
    },
    {
      href: '/patterns/',
      title: 'Patterns',
      description: 'Every Street Typology in the system, organized from Local to Freeway.',
    },
    {
      href: '/references/',
      title: 'Reference',
      description: 'The technical layer beneath each pattern: dimensions, criteria, specifications.',
    },
    {
      href: '/blog/',
      title: 'Blog',
      description: 'Process notes and research as the guide grows.',
    },
    {
      href: '/about/',
      title: 'About',
      description: 'What this is, who maintains it, how decisions get made.',
    },
    {
      href: '/about/release-history/',
      title: "What's New",
      description: "See what's changed recently, and what's coming next.",
    },
  ]
</script>

<Hero
  title="Commonway System"
  tagline="One system, grounded in what's proven."
  description="A pattern language for roads and streets, built on Vision Zero and Dutch Sustainable Safety evidence, layered on NACTO's foundation."
  primaryHref="/guide/"
  primaryLabel="Start with the Guide"
  secondaryHref="/patterns/"
  secondaryLabel="Browse Patterns"
/>

<EvidenceStrip
  text="Every prescriptive claim in this guide traces to a cited source, and every source carries an evidence tier, so you can see how strong the backing is before you decide whether to trust it."
  learnMoreHref="/about/governance/#how-disputes-over-evidence-are-resolved"
/>

<FeatureGrid features={features} />
