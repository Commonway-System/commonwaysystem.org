---
title: Acknowledgments
description: Everyone who has helped correct, source, or build the Commonway System.
llms: Credits everyone who has helped correct, source, or build the Commonway System, or explains that no contributions have landed yet.
---

<script>
  import { externalLinkAttrs, isExternalHref } from '$lib/site.js'

  // Empty until the first real contribution lands. To credit someone, add
  // an entry: { name, href, contribution }. `href` is usually a GitHub
  // profile URL. `contribution` is optional plain-language text (e.g.
  // "citation correction," "new pattern proposal"), omit it if the credit
  // doesn't need further explanation. See /about/contributing/.
  const contributors = []

  // Built here, not inline in the markdown body below, because mixing
  // markdown block syntax (blank-line-separated paragraphs, *emphasis*)
  // with a Svelte {#if}/{:else} block in the body breaks the compiler:
  // remark wraps the {:else} in its own stray <p>, since it can't tell
  // it apart from prose. Same reasoning as release-history's
  // `releaseBodyHtml`, script-block content isn't reprocessed as markdown,
  // so it's safe to build the raw HTML here instead.
  function creditsListHtml() {
    if (contributors.length === 0)
      return `<p><em>No contributions yet. <a href="/about/contributing/">Be the first.</a></em></p>`

    const items = contributors.map((contributor) => {
      const attrs = externalLinkAttrs(contributor.href)
      const attrString = attrs.target ? ` target="${attrs.target}" rel="${attrs.rel}"` : ''
      const external = isExternalHref(contributor.href)
        ? ' <span class="cw-external-indicator"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9" /></svg><span class="cw-sr-only"> (opens in new tab)</span></span>'
        : ''
      const note = contributor.contribution
        ? ` <span style="color: var(--cw-ink-soft)">&mdash; ${contributor.contribution}</span>`
        : ''
      return `<li><a href="${contributor.href}"${attrString}>${contributor.name}</a>${external}${note}</li>`
    })
    return `<ul>${items.join('')}</ul>`
  }
</script>

Commonway System is compiled and maintained by Kevin Young. Everyone listed below has helped make it more accurate, more complete, or better built, through a correction, a citation, a new pattern proposal, or a contribution to the site itself. See [Submit a Change](/about/contributing/) for how to be added to this list.

{@html creditsListHtml()}
