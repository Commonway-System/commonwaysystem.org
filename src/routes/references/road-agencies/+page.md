---
title: Road Agency Directory
description: Find the government office that can change your street. A searchable, filterable list of road agencies at the federal, state, regional, county, city and tribal levels, with links checked on each agency's own site.
date: 2026-10-26
llms: "A searchable, filterable directory of road agencies, with list, card and map views, starting with the United States: federal agencies (USDOT, FHWA, Federal Lands Highway, the Bureau of Indian Affairs Division of Transportation, the National Park Service) and every state, District of Columbia and territorial transportation department except American Samoa's. Each entry lists the agency's level, where it serves, and contact links checked on its own site, with the date checked. It also lists 177 tribal transportation departments and, for South Carolina, every county, council of governments, metropolitan planning organization, city and town; other states' counties, cities and metropolitan planning organizations are added as they're researched, and Canada comes next. Companion to How Road Changes Actually Happen and When Jurisdiction Doesn't Follow the Pattern."
---

<script>
  // Imported directly, not from the components index: everything exported
  // there ships in a chunk every page loads.
  import RoadAgencyDirectory from '$lib/theme/components/RoadAgencyDirectory.svelte'
</script>

_Find the government office that can change your street_

[How Road Changes Actually Happen](/guide/make-it-happen/) asks four questions. The third, which government has authority, is where many requests stall. This directory is the next step: once you know which government it is, find where to reach it.

Each entry links to the agency's website. Over time, entries will add the contacts that get a street changed: request forms, places to report a problem like a pothole or a broken signal, maps of who maintains which road, bike and pedestrian programs, ADA coordinators and safety plans.

## How to use it

<div class="cw-ranked">

1. **Work out who owns the road.** A state route number usually means the state DOT. In some places the answer is stranger; see [When Jurisdiction Doesn't Follow the Pattern](/guide/make-it-happen/jurisdiction-variants/).
2. **Filter by level and by state or territory,** or pick a place on the Map view. Choosing a state also keeps the federal agencies in the list, since they cover every state.
3. **Use the most specific contact.** A request form is tracked; a main phone line often isn't.

</div>

## Find an agency

<RoadAgencyDirectory />

## What's in it today

The directory lists only agencies that have been researched. Each entry shows the date it was last checked, and its contacts are read on the agency's own official site. A place that's missing simply hasn't been researched yet.

<div class="cw-tiles">

- **Federal:** five agencies whose work reaches local streets, including the Federal Highway Administration and the National Park Service.
- **State and territory:** every state's transportation department, the District of Columbia's, and four of the five territories', with request forms, reporting tools, bike and pedestrian programs and ADA coordinators where each has them.
- **Tribal:** 177 tribal transportation departments across 29 states.
- **South Carolina, in full:** all 46 counties, the councils of governments and metropolitan planning organizations, and all 271 cities and towns. 58 small towns have no working official website, so they list only the town hall phone, labeled as taken from the Municipal Association of South Carolina's directory, until a site appears.
- **Coming next:** counties, cities and metropolitan planning organizations in the other states, added a few at a time.
- **Other countries:** Canada first, then others.

</div>

## Help fill it in

Know a request form, a better contact, or a link that's moved? [Suggest a correction or a new agency on GitHub](https://github.com/Commonway-System/commonwaysystem.org/issues/new?template=road-agency.yml). Each entry also has its own "Suggest a correction" link. GitHub issues are public, so share an office's contacts, not personal ones.
