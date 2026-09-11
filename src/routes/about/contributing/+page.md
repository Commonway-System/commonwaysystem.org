---
title: Submit a Change
description: How to propose a pattern, suggest a correction, or help build out the Commonway System guidebook.
date: 2026-08-30
llms: Explains how to contribute to the Commonway System, what counts as a contribution, how a pull request is reviewed, the terms of contributing, and how contributors are credited.
---

<script>
  import { Citation } from '$lib/theme/components'
</script>

Commonway System is public and built in the open on GitHub. If you've noticed something that could be stronger, more accurate, or missing entirely, you can help fix it directly.

This page covers submitting an actual change yourself, a correction, a new citation, or a new pattern proposal. If you've spotted a problem but aren't able to fix it yourself, see [Report a Problem](/about/reporting/) instead: that's the faster, no-writing-required path for flagging an error, a dead link, or an unsourced claim.

## New to Git and GitHub? Start here

Git and GitHub are the tools this project uses to track changes and let
people propose edits. If you've never used them, here's the shape of it:
you make a personal copy of this repository (a "fork"), edit the file you
want to change, and submit your edit back as a "pull request", a formal
request asking the maintainers to review and merge it. Everything below
assumes you've read this repo's own README for the mechanics of forking
and getting a copy running.

Which path makes sense depends on what you're fixing:

**A small text-only fix** (a typo, a broken link, a wording tweak): you
can edit the file directly on GitHub's website, no downloads required.
[How to create a pull request with no coding required](https://www.youtube.com/watch?v=j1MUcVQn40g)
walks through the whole process, start to finish, editing a single
markdown file with no coding experience.

**Anything larger, or any change to a pattern page:** pattern pages use
custom layout components (Pattern ID cards, citation badges, and so on),
so you'll want to preview your change locally before submitting rather
than editing blind on GitHub's website. Follow this repository's own
README to get a full local copy running, then use GitHub Desktop instead
of the command line if you're not comfortable with a terminal.
[Learn GitHub without needing the terminal](https://www.youtube.com/watch?v=2SgI1kAczfk)
walks through the GitHub Desktop app specifically, no terminal required.

Once you've made your change, whichever path you took, the checklist
below is what every contribution gets held to.

## What you can contribute

- **A correction** to an existing pattern page: a wrong figure, an outdated citation, a broken link, an unclear description
- **A missing citation** for a claim currently marked with the unsourced-claim flag<Citation unsourced />
- **A new pattern proposal**, when you believe a Street Typology, an intersection treatment, or a related pattern is missing from the guidebook
- **General improvements**: clearer wording, a better example, a fix to the publication itself

One thing worth knowing before you start on something large: foundational structure, the Functional Classification system, the pattern ID format, core safety rules like the Local speed cap, isn't open to change through a routine pull request. See [Project Governance](/about/governance/) for how that's decided. If you're proposing something that touches the guidebook's underlying structure rather than its content, open an issue to discuss it first, before putting in the work on a full pull request.

## How a contribution moves through review

Commonway System uses the standard GitHub workflow: fork the [repository](https://github.com/Commonway-System/commonwaysystem.org), make your change, and open a pull request. The [pull request template](https://github.com/Commonway-System/commonwaysystem.org/blob/main/.github/PULL_REQUEST_TEMPLATE.md) bakes in the checklist below, so you can self-check before submitting.

Every contribution is checked against the same standard every existing page is held to:

- **Does it cite a source?** New or changed factual claims need a citation, ranked by evidence tier (legal/regulatory, evidence-based, or precedent-based). Every citation's entry in that page's `## References` list needs its evidence-tier chip alongside it, added at the same time as the citation itself, not as a follow-up. A claim without a source gets the unsourced-claim flag rather than getting rejected outright, but citing it yourself gets it merged faster.
- **Does it match the house style?** Third-person voice for pattern entries, no first-person framing, no words implying certification or guaranteed compliance ("code-approved," "certified"), and no reproduced excerpts from source manuals like MUTCD or CROW, paraphrase and cite instead.
- **Does it fit the existing structure?** A correction or new pattern within an existing Functional Classification moves through normal review. A change to the structure itself needs the discussion described above before a pull request is the right next step.

Once a pull request is approved and merged, it goes live on the next publish, and shows up in the changelog on the [Release History & Roadmap](/about/release-history/) page.

## Terms of contributing

Everything submitted through a pull request becomes part of a public repository, visible to anyone. By submitting a contribution, you're confirming it's your own work, or something you have the right to share, and you're granting Commonway System a license to use, edit, and publish it as part of the guidebook. You're not asked to give up authorship of your own words, and you're not asked for payment or ownership in return, but you also aren't granting yourself any ownership claim over the guidebook itself: Commonway System retains the rights to the compiled work, the same way a publisher retains rights to a book that many people contributed research to.

The publication's underlying code, Svelte components, configuration, and build tooling, is licensed separately and far more permissively, under [MIT](https://github.com/Commonway-System/commonwaysystem.org/blob/main/LICENSE). Only the guidebook content itself, the pattern pages and prose, follows the terms described above.

## Credit

Contributors are credited by name (or GitHub handle, if you'd rather not use your name) on the [Acknowledgments](/about/acknowledgments/) page. Credit reflects that you helped build this, it isn't authorship of the guidebook itself, and it isn't a claim on any part of it.

## Code of conduct

Transportation design attracts strong opinions, and not all of them are evidence-based. Contributors are expected to engage in good faith and keep disagreements focused on evidence, not volume or persistence. See the project's [code of conduct](https://github.com/Commonway-System/commonwaysystem.org/blob/main/CODE_OF_CONDUCT.md) for the full expectations.
