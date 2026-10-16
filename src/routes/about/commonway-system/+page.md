---
title: The Commonway System
description: "A pattern language for roads and streets: why the Commonway System exists, what its name means, the positions it takes, how it relates to NACTO, Complete Streets, and Strong Towns, and who compiles it."
date: 2026-08-29
llms: "Explains the Commonway System, a pattern language for roads and streets inspired by Christopher Alexander's A Pattern Language (1977): why it exists (street knowledge is scattered and hard to act on), what the name means, what it contains (patterns, retrofits, the Guide), the positions it takes (design speed equals posted speed, 20 mph Local streets, roundabouts first, no parking or direct access on Arterials, added lanes as a cost), its status labels (Recommended, Situational / Discouraged, Avoid, Descriptive), how it relates to NACTO, Complete Streets, and Strong Towns, how its claims can be checked, and its author, Kevin Young."
---

<script>
  import { AuthorPhoto, Citation, EvidenceChip, RelatedMedia } from '$lib/theme/components'
  import { patternPageCount, retrofitStrategyCount } from '$lib/pattern-count'
</script>

_A pattern language for roads and streets_

In 1977, Christopher Alexander and his colleagues published _A Pattern Language_: more than 250 patterns for building towns and homes, each one a design problem paired with its solution. Its premise was that ordinary people, not just professionals, should be able to design their own homes, streets, and communities.<Citation index={1} />

The Commonway System applies that idea to roads and streets.

## Why it exists

For most people, the transportation system feels beyond their control. Roads get widened, speed limits get raised, crosswalks never arrive, and it seems nothing an ordinary person does can change that.

The knowledge to change it isn't locked away. No one is gating it. But it is scattered across federal rules, professional manuals, research papers, and advocacy campaigns, each with its own authority and its own audience (see [How the Transportation Ecosystem Fits Together](/guide/how-the-transportation-ecosystem-fits-together/)). For anyone without years in the field, it is hard to find, harder to understand, and harder still to act on.

Knowledge is power only when people can use it. The Commonway System is built so they can.

## Why the name

**System,** because it is one: classifications, patterns, IDs, and rules that fit together, so an answer in one place agrees with an answer in another.

**Commonway** is the hope behind it: that this becomes the common way to understand street design, shared by neighbors and engineers alike.

## What it is

- **{patternPageCount} [patterns](/patterns/)** describe what a street, intersection, facility, or street element should be.
- **{retrofitStrategyCount} [retrofits](/retrofits/)** show how to move an existing street toward a pattern.
- **The [Guide](/guide/)** explains the core concepts, how to use the system, and how to get a street changed.

Every recommendation cites its source. Plain language comes first, with the technical detail underneath, so the same page serves a first-time reader and a practicing engineer. One system, grounded in what's proven.

## What it stands for

The Commonway System doesn't just summarize other guidance. Where the evidence supports it, it takes a position:

- **Design speed always equals the posted speed limit.** A street should be built for the speed on its sign. ([Design Speed & Speed Limits](/guide/design-speed/))
- **Local streets are 20 mph, with no exceptions.** ([Design Speed & Speed Limits](/guide/design-speed/))
- **Roundabouts come first.** They are the default wherever two Collector-or-higher streets meet; signals are a documented last resort. ([Roundabout, INT-RAB-01](/patterns/intersections/roundabout/))
- **Arterials move traffic, not parked cars.** The default Arterial has no on-street parking and no direct property access. ([Arterial Default, ART-DEF-01](/patterns/arterials/default/))
- **Added lanes are a cost, not a cure.** For congestion, pricing, reallocated road space, and a connected network come first; widening comes last. ([Induced Demand](/guide/induced-demand/))

## How it relates to NACTO, Complete Streets, and Strong Towns

The Commonway System doesn't replace or compete with them. It cites and builds on their work, and goes further only where the research supports it.

When it does go further, it says so plainly. It names the baseline practice, then gives each pattern a status: **Recommended**, **Situational / Discouraged**, or **Avoid**, each backed by a specific source. A pattern that documents an existing condition without endorsing it, such as an [organic, irregular street network](/patterns/network/organic-irregular/), is marked **Descriptive**. It never calls a baseline source wrong or outdated. Disagreements are about evidence, not authority.

## Why you can trust it

| <span class="cw-sr-only">Question</span> | <span class="cw-sr-only">Answer</span> |
| ------- | ------ |
| **Who** | Kevin Young, an enthusiast, researcher, and compiler, not a credentialed engineer or planner. The citations carry the authority, not a credential. See [About the author](#about-the-author). |
| **How** | Primary sources read directly and cross-referenced, not secondhand summaries. Every design claim traces to a named, dated, linked source. |
| **Why** | To make the evidence behind good street design something anyone can find, understand, and act on, in one place, with no credential required. |

And you can check the work:

- **Evidence tiers.** Every source is labeled Legal / regulatory, Evidence-based, or Precedent-based, so you can see what kind of authority stands behind each claim. ([How disputes over evidence are resolved](/about/governance/#how-disputes-over-evidence-are-resolved))
- **Visible gaps.** A claim still waiting for a source is flagged in amber instead of left looking settled.
- **Dated versions.** Every change is logged in [What's New](/about/release-history/).
- **Open correction.** Anyone can [report a problem](/about/reporting/) or [submit a change](/about/contributing/).
- **Disclosed tools.** How AI was used, and how a human reviews every classification and citation, is set out in the [AI Policy](/about/ai-policy/).

## How it's organized

Every pattern belongs to one of four Functional Classifications (Local, Collector, Arterial, Freeway) or the cross-cutting Intersections and Crossings set, and sits at one of five scales, from Network down to Element. Each has a permanent ID, such as `LOC-BBG-12`.

For the full map, see [Start Here](/guide/). For how to read a pattern page, see [Using the System](/guide/how-to-read-a-pattern/).

## About the author

<AuthorPhoto src="/photos/kevinyoung.png" alt="Kevin Young" caption="Kevin Young, Author, Commonway System">

Kevin Young is the author of the Commonway System. He started it in 2026, out of dissatisfaction with the status quo, as an enthusiast and compiler rather than a transportation professional. That is why the work rests on its citations, not on his credentials. Claims are cited to sources, and any not yet sourced carry a visible flag. Plain-language explanations come first, with technical detail beneath. The guidebook is published online and dated by version, so readers can see how current it is.

More about him at [kevinyoung.net](https://kevinyoung.net) and on [LinkedIn](https://www.linkedin.com/in/youngkev/).

</AuthorPhoto>

<RelatedMedia id="/about/commonway-system/" />

## References

1. <span id="ref-1"></span><EvidenceChip tier="precedent" /> [Alexander, Christopher, Sara Ishikawa, and Murray Silverstein. _A Pattern Language: Towns, Buildings, Construction_. New York: Oxford University Press, 1977.](https://www.oup.com.au/books/general-interest/art-technology/9780195019193)
