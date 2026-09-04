---
title: Report a Problem
description: How to flag an error, an unsourced claim, or a dead citation link in the Commonway System.
date: 2026-08-29
llms: Explains how to report a factual error, an unsourced claim, a dead citation link, or an accessibility issue in the Commonway System, and how a report is handled after it's filed.
---

<script>
  import { Citation } from '$lib/theme/components'
</script>

Noticed something wrong but don't want to fix it yourself? This is the fast path: no writing, no pull request, just flag it and someone else takes it from here.

If you'd rather submit the actual fix yourself, correcting the text, adding the missing citation, see [Submit a Change](/about/contributing/) instead.

## What to report here

- **A factual error**: a wrong figure, an outdated rule, a description that no longer matches the current guidance
- **An unsourced claim**: something that should carry the unsourced-claim flag<Citation unsourced /> but doesn't, or something flagged that you believe now has a source available
- **A dead citation link**: a source URL that no longer resolves or redirects somewhere unexpected
- **An accessibility issue**: anything that makes the site harder to use with a screen reader, keyboard navigation, or at different zoom levels

## How to report it

Open a GitHub issue using the [issue template that matches what you're reporting](https://github.com/Commonway-System/commonwaysystem.org/issues/new/choose): Factual error, Missing citation, Dead link, or Accessibility issue. Each template asks for the page URL and what's wrong, so a report can be triaged without back-and-forth. If your report doesn't fit any of those, a blank issue works too. You don't need a GitHub account to read an issue, but you do need one to open one, since that's how the maintainer can follow up with you if there are questions.

## What happens after you report something

A reported error is checked against the same evidence-tier system used everywhere else in the guide: legal/regulatory sources outrank evidence-based sources, which outrank precedent-based ones. A dead citation link gets one of two treatments: if the source moved, the link is updated and an archive snapshot is kept as a backup; if the source is genuinely gone, the citation is re-flagged with the unsourced-claim flag until a replacement is found.

Reports don't require a response window or a guaranteed timeline, since this is a single-maintainer project, but every report is read and triaged.

## Safety-relevant errors

If you're reporting something you believe could lead someone to make an unsafe real-world design decision, say so explicitly in the issue, the Factual error, Missing citation, and Dead link templates each ask directly. Those get looked at first.
