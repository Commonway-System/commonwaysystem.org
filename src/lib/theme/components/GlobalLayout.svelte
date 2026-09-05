<script lang="ts">
  import { onMount, tick } from 'svelte'
  import { afterNavigate } from '$app/navigation'
  import { page } from '$app/state'
  import type { Snippet } from 'svelte'
  import { initColorScheme, initTableScrollHints, sidebarOpen } from '../layout.js'
  import { buildOrganization, buildWebSite } from '../schema/organization.js'
  import '../styles/base.css'
  import Backdrop from './Backdrop.svelte'
  import GoogleAnalytics from './GoogleAnalytics.svelte'
  import JsonLd from './JsonLd.svelte'
  import MediaFilters from './MediaFilters.svelte'
  import Navbar from './Navbar.svelte'
  import Sidebar from './Sidebar.svelte'
  import Toc from './Toc.svelte'

  interface Props {
    children?: Snippet
  }

  const { children }: Props = $props()

  // Sitewide singletons: exactly one Organization and one WebSite block on
  // every page, computed once since neither varies per route (see
  // src/lib/theme/schema/organization.ts). Per-page schema (breadcrumbs,
  // TechArticle/WebPage/etc.) lives in PageLayout.svelte instead, since
  // that's the layout that actually receives each page's frontmatter.
  const siteSchemas = [buildOrganization(), buildWebSite()]

  // The homepage has no sidebar entry (see vite.config.ts's `sidebar` map)
  // and no page anchors for Toc to list, so both columns are always empty
  // there anyway; collapsing the grid to a single full-width column lets
  // its hero go edge-to-edge instead of sitting in the narrower middle
  // track. Sidebar itself stays mounted regardless (see .shell--full
  // :global(.sidebar) below): it's still the mobile hamburger drawer.
  const isHome = $derived(page.url.pathname === '/')

  // /media/ has no sidebar entry (single top-level page, same as
  // /references/ and /blog/) and its own headings give Toc nothing useful
  // to list either. Rather than the isHome treatment (collapse to one
  // column, hide both side columns), this route repurposes the toc
  // column for MediaFilters's always-expanded desktop variant instead of
  // leaving it empty, and widens the content column to also cover the
  // sidebar's own width, since sidebar is hidden here the same way isHome
  // hides it. Below 940px that toc column disappears entirely (same as
  // the base .shell) - MediaFilters' own collapsible mobile variant is
  // mounted separately, inline in /media/+page.md's own content, not
  // here; see MediaFilters.svelte's `variant` prop doc comment for why
  // this needs two small mounts rather than one repositioned element. See
  // .shell--media below.
  const isMedia = $derived(page.url.pathname === '/media/')

  onMount(() => {
    initColorScheme()
    // tick(), not requestAnimationFrame: rAF is throttled/paused while the
    // tab is backgrounded, which would leave the scroll hint permanently
    // hidden on a table that loads in a background tab. tick() just waits
    // for Svelte's own pending DOM updates to flush, no visibility
    // dependency, before the table wrapper's real layout width is measured.
    tick().then(initTableScrollHints)
  })

  afterNavigate(() => {
    sidebarOpen.set(false)
    tick().then(initTableScrollHints)
  })
</script>

<GoogleAnalytics />
<JsonLd schemas={siteSchemas} />
<Navbar />

<div class="shell" class:shell--full={isHome} class:shell--media={isMedia}>
  <Sidebar />
  <Backdrop show={$sidebarOpen} onclose={() => sidebarOpen.set(false)} />
  {@render children?.()}
  {#if isMedia}
    <MediaFilters variant="desktop" />
  {:else}
    <Toc />
  {/if}
</div>

<style>
  .shell {
    display: grid;
    grid-template-columns: var(--cw-sidebar-width) minmax(0, 1fr) var(--cw-toc-width);
    grid-template-areas: 'sidebar content toc';
    max-width: 88rem;
    margin: 0 auto;
    min-height: calc(100vh - var(--cw-navbar-height));
  }

  @media (max-width: 1180px) {
    .shell {
      grid-template-columns: var(--cw-sidebar-width) minmax(0, 1fr);
      grid-template-areas: 'sidebar content';
    }
  }

  @media (max-width: 940px) {
    .shell {
      grid-template-columns: minmax(0, 1fr);
      grid-template-areas: 'content';
    }
  }

  /* .shell--full declared last so it wins the specificity tie against the
     two max-width rules above at every viewport, not just where it's
     declared: same class-count (0,1,0) as .shell, source order decides. */
  .shell--full {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: 'content';
  }

  /* Sidebar is position: sticky (in normal grid flow) at >=940px, so once
     'sidebar' drops out of grid-template-areas above it would otherwise
     auto-place into the single remaining 'content' cell and overlap the
     real content. Below 940px Sidebar switches to position: fixed (see
     Sidebar.svelte), which already takes it out of grid flow entirely, so
     it needs no help there and stays mounted as the mobile drawer. */
  @media (min-width: 940px) {
    .shell--full :global(.sidebar) {
      display: none;
    }
  }

  /* .shell--media: /media/'s own two-column layout (see isMedia in the
     script) - content folds in the sidebar's own width since sidebar is
     hidden here too, and the toc column holds MediaFilters' always-
     expanded desktop variant instead of being left empty. Declared last
     for the same specificity-tie reasoning as .shell--full above. Kept
     two columns down through the 1180px breakpoint (unlike the base
     .shell, which drops its toc column there): that desktop filter panel
     is the only way to narrow results at that width, not a nice-to-have
     nav aid, so it shouldn't disappear before the same 940px mobile edge
     every other column-hiding decision on this site already uses. Below
     940px this collapses to a single content column, same as the base
     .shell there - MediaFilters' own collapsible mobile variant lives
     inline in the page content itself at that point, not in this grid,
     see MediaFilters.svelte. */
  .shell--media {
    grid-template-columns: minmax(0, 1fr) var(--cw-toc-width);
    grid-template-areas: 'content toc';
  }

  @media (max-width: 940px) {
    .shell--media {
      grid-template-columns: minmax(0, 1fr);
      grid-template-areas: 'content';
    }
  }

  @media (min-width: 940px) {
    .shell--media :global(.sidebar) {
      display: none;
    }
  }
</style>
