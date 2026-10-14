---
title: Website Audit
description: How the Commonway System publication measures up against the Website Specification checklist, with a score for each section and notes on what's done and what's next.
date: 2026-10-14
llms: A public self-assessment of commonwaysystem.org against the Website Specification checklist (specification.website), covering foundations, SEO, accessibility, security, well-known files, agent readiness, performance, privacy, resilience and internationalization, with a status and note for every item.
---

<script>
  import { WebsiteAudit } from '$lib/theme/components'
</script>

This page measures the publication against the [Website Specification checklist](https://specification.website/checklist/), a public list of what a well-built website should do, from basics like page titles and alt text to security headers, privacy, and how well AI tools can read it. The aim is to close the gaps a few at a time, and this page is updated whenever an item changes.

<WebsiteAudit />

## How to read this

Required and Avoid items are worth 3 points, Recommended items 2, and Optional items 1. A pass earns full points, a partial earns half, and a fail earns none. For Avoid items, a pass means the publication does not do the thing the checklist warns against. Items that don't apply, or haven't been reviewed yet, are left out of the score.

This is a self-assessment, made with Claude (an AI assistant, see the [AI Policy](/about/ai-policy/)) from the publication's source code, its built pages, and the live site's own responses for server-level items like HTTPS, redirects and compression. It is not an independent audit and doesn't claim certification of any kind. Accessibility results come from automated scans plus a manual review; what hasn't been tested yet is listed on the [Accessibility Policy](/about/accessibility-policy/) page.

Spotted something wrong here? [Report a Problem](/about/reporting/).
