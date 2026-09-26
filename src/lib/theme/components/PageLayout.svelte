<script lang="ts">
  import { afterNavigate } from '$app/navigation'
  import { page } from '$app/state'
  import { onMount, tick } from 'svelte'
  import type { Snippet } from 'svelte'
  import { externalLinkAttrs, isExternalHref } from '$lib/site.js'
  import options from 'virtual:commonway/options'
  import { pageAnchors } from '../layout.js'
  import { buildBreadcrumbs } from '../schema/breadcrumbs.js'
  import { buildPageSchemas } from '../schema/page.js'
  import Icon from './Icon.svelte'
  import JsonLd from './JsonLd.svelte'
  import PageNav from './PageNav.svelte'
  import TocMobile from './TocMobile.svelte'
  import ShareButtons from './ShareButtons.svelte'

  interface Props {
    fm: Record<string, any>
    children?: Snippet
  }

  const { fm, children }: Props = $props()

  // Plain text-only version of this page, generated after the build by
  // scripts/generate-text-pages.mjs (so it 404s under `pnpm run dev`).
  const textHref = $derived(`/text${page.url.pathname}`)

  const editHref = $derived(
    options.editLink ? options.editLink.replace(':route', `${page.route.id ?? ''}`) : undefined,
  )

  // Structured data: BreadcrumbList plus whichever schema.org type fits this
  // page's template (see schema/breadcrumbs.ts and schema/page.ts). Both are
  // pure functions of the route and this page's own frontmatter, no
  // per-page authoring. dateModifiedISO comes from the same git-derived
  // value already shown as "Last updated" below (+layout.server.ts), one
  // source of truth for both.
  const breadcrumbs = $derived(
    buildBreadcrumbs(page.url.pathname, fm.title ?? options.siteTitle, options.navbar ?? [], options.sidebar ?? {}),
  )
  const pageSchemas = $derived(
    buildPageSchemas({
      pathname: page.url.pathname,
      fm,
      dateModifiedISO: page.data.lastModifiedISO ?? null,
      sidebar: options.sidebar ?? {},
    }),
  )
  const jsonLdSchemas = $derived([...(breadcrumbs ? [breadcrumbs] : []), ...pageSchemas])

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

<JsonLd schemas={jsonLdSchemas} />

<!-- tabindex="-1" (not in the tab order) lets the skip link move focus here. -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<main class="page" id="main-content" tabindex="-1">
  {#if page.url.pathname !== '/media/'}
    <TocMobile />
  {/if}
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
      <a href={textHref}>Text-only version</a>
      <span aria-hidden="true"> &middot; </span>
      {#if page.data.lastModified}
        <span>Last updated {page.data.lastModified}</span>
        <span aria-hidden="true"> &middot; </span>
      {/if}
      <ShareButtons title={fm.title ?? options.siteTitle} path={page.url.pathname} />
    </p>

    <PageNav />

    <div class="page__legal">
      <span>&copy; {new Date().getFullYear()} Commonway System</span>
      <nav aria-label="Policies">
        <a href="/about/terms-and-conditions/">Terms and Conditions</a>
        <a href="/about/privacy-policy/">Privacy Policy</a>
        <a href="/about/ai-policy/">AI Policy</a>
        <a href="/about/accessibility-policy/">Accessibility Policy</a>
      </nav>
    </div>
  </div>
</main>

<style>
  /* Programmatically focused by the skip link (GlobalLayout.svelte); a focus
     ring around the whole content column would just be noise. */
  .page:focus {
    outline: none;
  }

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

  .page__legal {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.35rem 1.25rem;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid var(--cw-hairline);
    font-size: var(--cw-text-sm);
    color: var(--cw-ink-soft);
  }

  .page__legal nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem 1.25rem;
  }
</style>
