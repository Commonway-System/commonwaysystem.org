<script lang="ts">
  import { afterNavigate } from '$app/navigation'
  import { page } from '$app/state'
  import { onMount, tick } from 'svelte'
  import type { Snippet } from 'svelte'
  import { SITE_URL, externalLinkAttrs, isExternalHref, jsonldPath, markdownPath } from '$lib/site.js'
  import options from 'virtual:commonway/options'
  import { reopenConsent } from '../consent.js'
  import { pageAnchors } from '../layout.js'
  import { patternClassOf, searchSectionOf } from '../search-meta.js'
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

  // Markdown version for AI/LLM consumption, advertised in <head> below
  // (same generator as the text-only version, so also absent under dev).
  const markdownHref = $derived(markdownPath(page.url.pathname))

  // Search indexing (Pagefind, see scripts/build-search-index.mjs). Only
  // <main> is indexed, via data-pagefind-body below, so navbar/sidebar/footer
  // text never pollutes results. `utility` pages (currently /search/) are
  // left out of the index, the text-only/markdown versions, and search engines.
  const searchable = $derived(!fm.utility)
  const searchSection = $derived(searchSectionOf(page.url.pathname))
  const searchClass = $derived(patternClassOf(fm.patternId))

  // Head metadata. Every page is reachable at exactly one URL (trailing
  // slash, no query), which is also its canonical. Pages without their own
  // featured image share the site's social card (static/og/).
  const canonical = $derived(`${SITE_URL}${page.url.pathname}`)
  const pageTitle = $derived(fm.title ? `${fm.title} \u00b7 ${options.siteTitle}` : options.siteTitle)
  const pageDescription = $derived(fm.description || options.siteDescription || '')
  const ogImage = $derived(fm.image ? `${SITE_URL}${fm.image}` : `${SITE_URL}/og/commonway-system-card.png`)
  const ogImageAlt = $derived(fm.image ? `Illustration for ${fm.title ?? options.siteTitle}` : 'Commonway System logo')
  const isArticle = $derived(page.url.pathname !== '/' && !page.url.pathname.startsWith('/about/') && page.url.pathname.split('/').filter(Boolean).length > 1)

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
  {#if !fm.utility}
    <link rel="alternate" type="text/markdown" href={markdownHref} />
    <!-- Schemamap: this page's JSON-LD on its own, and the index of every page's. -->
    <link rel="alternate" type="application/ld+json" href={jsonldPath(page.url.pathname)} />
    <link rel="schemamap" type="application/xml" href="/schemamap.xml" />
  {/if}
  <title>{pageTitle}</title>
  <link rel="canonical" href={canonical} />
  {#if fm.utility}
    <meta name="robots" content="noindex, follow" />
  {:else}
    <meta name="robots" content="index, follow, max-image-preview:large" />
  {/if}
  {#if pageDescription}
    <meta name="description" content={pageDescription} />
    <meta property="og:description" content={pageDescription} />
  {/if}
  <meta property="og:title" content={fm.title ?? options.siteTitle} />
  <meta property="og:url" content={canonical} />
  <meta property="og:type" content={isArticle ? 'article' : 'website'} />
  <meta property="og:site_name" content={options.siteTitle} />
  <meta property="og:locale" content="en_US" />
  <meta property="og:image" content={ogImage} />
  <meta property="og:image:alt" content={ogImageAlt} />
  {#if !fm.image}
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  {/if}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content={ogImage} />
  <meta name="twitter:image:alt" content={ogImageAlt} />
</svelte:head>

<JsonLd schemas={jsonLdSchemas} />

<!-- tabindex="-1" (not in the tab order) lets the skip link move focus here. -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<main class="page" id="main-content" tabindex="-1" data-pagefind-body={searchable ? '' : undefined}>
  {#if searchable}
    <!-- Empty marker elements: Pagefind reads one filter/meta pair per attribute. -->
    <span data-pagefind-filter={`section:${searchSection}`}></span>
    <span data-pagefind-meta={`section:${searchSection}`}></span>
    {#if searchClass}
      <span data-pagefind-filter={`class:${searchClass}`}></span>
    {/if}
    {#if fm.image}
      <!-- Search results show this (the client swaps in the 160px copy, see search.ts). -->
      <!-- Named `thumb`, not `image`: Pagefind fills `image` itself with the first <img> on any page, and only an explicit frontmatter image should get a thumbnail. -->
      <span data-pagefind-meta={`thumb:${fm.image}`}></span>
    {/if}
    {#if fm.patternId}
      <span data-pagefind-meta={`detail:${fm.patternId}`}></span>
      <!-- The ID card is left out of the index (its title just repeats the
           page's), so the Pattern ID is indexed here instead, once, and
           weighted so an ID search finds its own page first. -->
      <span hidden data-pagefind-weight="8">{fm.patternId}</span>
    {/if}
  {/if}
  {#if page.url.pathname !== '/media/' && page.url.pathname !== '/'}
    <TocMobile />
  {/if}
  <div class="cw-content" class:cw-content--wide={fm.wide} bind:this={contentEl}>
    <!-- hideTitle: for pages (currently only the homepage) whose own body
         markup renders the h1 itself, inside a custom section like Hero,
         instead of as a bare heading floating above the content. -->
    {#if fm.title && !fm.hideTitle}
      <h1 data-pagefind-weight="10">{fm.title}</h1>
    {/if}
    {@render children?.()}

    <p class="page__meta" data-pagefind-ignore>
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
      {#if !fm.utility}
        <a href={textHref}>Text-only version</a>
        <span aria-hidden="true"> &middot; </span>
      {/if}
      {#if page.data.lastModified}
        <span>Last updated {page.data.lastModified}</span>
        <span aria-hidden="true"> &middot; </span>
      {/if}
      <ShareButtons title={fm.title ?? options.siteTitle} path={page.url.pathname} />
    </p>

    <PageNav />

    <div class="page__legal" data-pagefind-ignore>
      <span>&copy; {new Date().getFullYear()} <span translate="no">Commonway System</span></span>
      <nav aria-label="Footer">
        <a href="/about/sitemap/">Site Map</a>
        <a href="/about/reporting/">Report a Problem</a>
        <a href="/about/terms-and-conditions/">Terms and Conditions</a>
        <a href="/about/privacy-policy/">Privacy Policy</a>
        <a href="/about/ai-policy/">AI Policy</a>
        <a href="/about/accessibility-policy/">Accessibility Policy</a>
        {#if options.googleAnalyticsId}
          <button type="button" class="page__legal-btn" onclick={reopenConsent}>Cookie settings</button>
        {/if}
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

  /* "Cookie settings" reopens the consent banner, so it's a real button,
     dressed like the footer links beside it. */
  .page__legal-btn {
    padding: 0;
    border: 0;
    background: none;
    font: inherit;
    color: var(--cw-link);
    text-decoration: underline;
    text-decoration-color: color-mix(in srgb, var(--cw-link) 40%, transparent);
    text-underline-offset: 0.15em;
    cursor: pointer;
  }

  .page__legal-btn:hover {
    color: var(--cw-link-hover);
    text-decoration-color: currentColor;
  }
</style>
