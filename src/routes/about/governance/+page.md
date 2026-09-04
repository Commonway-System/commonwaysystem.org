---
title: Governance
description: How decisions about the Commonway System get made and who makes them.
llms: Explains who has final say on the Commonway System, how classification decisions and evidence disputes are resolved, how project direction is set, and why participation isn't a vote.
---

<script>
  import { Citation } from '$lib/theme/components'
</script>

The Commonway System is maintained by a single person. Kevin Young compiles, edits, and has final say over everything published here. This isn't a committee project or a consensus process, and this page says so plainly rather than dressing it up as something more collaborative than it is.

That said, final say doesn't mean personal preference decides things. It means the maintainer applies a fixed set of rules consistently, the same rules described below, and is accountable to those rules in every decision.

## Who has final say on a pattern's classification

The maintainer does. But classification decisions aren't made by feel: they follow directly from the evidence and citation system already built into every pattern page. A Street Typology's status (Recommended, Situational/Discouraged, or Avoid), its density-tier fit, and its modal hierarchy all trace back to a cited source. Where the evidence is clear, the classification follows the evidence. Where it isn't yet, the page carries the unsourced-claim flag<Citation unsourced /> until it is.

## How disputes over evidence are resolved

When two sources point in different directions, the disagreement is resolved by evidence tier, not by who argued it more persuasively or how long a claim has been on the site. Sources rank in this order:

1. **Legal or regulatory** (a statute, an adopted code, a government manual)
2. **Evidence-based** (a peer-reviewed study, published crash data, a formal research report)
3. **Precedent-based** (a real place doing it successfully, without a formal study behind it)

A higher-tier source overrides a lower-tier one by default. The maintainer only makes a judgment call when two sources sit at the same tier and genuinely conflict, and when that happens, the reasoning behind the call is documented alongside the citation, not left implicit.

An opinion without a citation behind it doesn't move a classification, no matter how many people share it. This system exists specifically so the guide's credibility rests on its sources, not on anyone's personal authority, including the maintainer's own.

## How the project's direction is set

The maintainer sets priorities and decides what gets built next. The [Release History & Roadmap](/about/release-history/) page is the running record of both what's shipped and what's planned, and it's the place to look for where the project is headed.

Two different kinds of changes are held to two different bars:

**Foundational structure** (the Functional Classification system, the pattern ID format, the scale hierarchy, core safety rules like the Local speed cap) requires the maintainer's direct sign-off, regardless of how well a proposed change is cited. These decisions shape everything built on top of them, so they don't move on the strength of a single well-argued case.

**Content within the existing structure** (a new citation, a correction to a stated range, a new pattern proposal that fits into an existing Functional Classification) moves faster and follows the ordinary review process described on the [Contributing](/about/contributing/) page.

## Participation isn't a vote

Anyone can propose a change, and every contribution is genuinely reviewed on its merits. But Commonway System isn't run by majority opinion, and won't be swayed by volume of comments or repetition of a claim. If a proposed change doesn't carry evidence at least as strong as what it would replace, it doesn't get made, no matter how many people ask for it.

This project also covers a topic, how streets should prioritize different modes of travel, that reliably attracts strong, non-evidence-based opinions in both directions. Participants are expected to engage in good faith and to keep discussion evidence-focused; see the project's [code of conduct](https://github.com/Commonway-System/commonwaysystem.org/blob/main/CODE_OF_CONDUCT.md) for specifics.
