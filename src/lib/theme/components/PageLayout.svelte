<script lang="ts">
  import { afterNavigate } from '$app/navigation'
  import { page } from '$app/state'
  import { onMount, tick } from 'svelte'
  import type { Snippet } from 'svelte'
  import { externalLinkAttrs, isExternalHref } from '$lib/site.js'
  import options from 'virtual:commonway/options'
  import { pageAnchors } from '../layout.js'
  import Icon from './Icon.svelte'
  import PageNav from './PageNav.svelte'
  import ShareButtons from './ShareButtons.svelte'

  interface Props {
    fm: Record<string, any>
    children?: Snippet
  }

  const { fm, children }: Props = $props()

  const editHref = $derived(
    options.editLink ? options.editLink.replace(':route', `${page.route.id ?? ''}`) : undefined,
  )

  let contentEl: HTMLDivElement | undefined = $state()

  async function collectAnchors() {
    await tick()
    if (!contentEl)
      return
    const headings = Array.from(contentEl.querySelectorAll('h2[id], h3[id]'))
    pageAnchors.set(
      headings.map((h) => {
        // h.textContent picks up the hidden "#" from the .svp-heading-anchor
        // link (see heading-anchors.ts), which is always the heading's
        // first child; strip it before reading the visible label.
        const clone = h.cloneNode(true) as HTMLElement
        clone.querySelector('.svp-heading-anchor')?.remove()
        return {
          id: h.id,
          text: clone.textContent ?? '',
          depth: h.tagName === 'H2' ? 2 : 3,
        }
      }),
    )
  }

  onMount(collectAnchors)
  afterNavigate(collectAnchors)
</script>

<svelte:head>
  <title>{fm.title ? `${fm.title} \u00b7 ${options.siteTitle}` : options.siteTitle}</title>
  {#if fm.description || options.siteDescription}
    <meta name="description" content={fm.description || options.siteDescription} />
  {/if}
</svelte:head>

<div class="page">
  <div class="cw-content" class:cw-content--wide={fm.wide} bind:this={contentEl}>
    <!-- hideTitle: for pages (currently only the homepage) whose own body
         markup renders the h1 itself, inside a custom section like Hero,
         instead of as a bare heading floating above the content. -->
    {#if fm.title && !fm.hideTitle}
      <h1>{fm.title}</h1>
    {/if}
    {@render children?.()}

    <p class="page__meta">
      {#if editHref}
        <a href={editHref} {...externalLinkAttrs(editHref)}>
          Suggest changes to this page
          {#if isExternalHref(editHref)}
            <span class="cw-external-indicator">
              <Icon name="external" size={13} />
              <span class="cw-sr-only"> (opens in new tab)</span>
            </span>
          {/if}
        </a>
        <span aria-hidden="true"> &middot; </span>
      {/if}
      {#if page.data.lastModified}
        <span>Last updated {page.data.lastModified}</span>
        <span aria-hidden="true"> &middot; </span>
      {/if}
      <ShareButtons title={fm.title ?? options.siteTitle} path={page.url.pathname} />
    </p>

    <PageNav />
  </div>
</div>

<style>
  .page {
    grid-area: content;
    padding: 2.5rem 1.5rem 4rem;
  }

  .cw-content {
    max-width: var(--cw-content-max-width);
    margin: 0 auto;
  }

  /* Opt-in via frontmatter (fm.wide), same mechanism as hideTitle above:
     for pages (currently only the homepage) whose sections want the same
     88rem measure as the navbar's own .navbar__inner, not the 46rem prose
     column every article-style page uses. Declared after .cw-content so
     it wins the specificity tie (both single-class, same scope) without
     needing :global(). */
  .cw-content--wide {
    max-width: 88rem;
  }

  .page__meta {
    margin-top: 2.5rem;
    font-size: var(--cw-text-sm);
    color: var(--cw-ink-soft);
  }
</style>
