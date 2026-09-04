<script lang="ts">
  import { onMount, tick } from 'svelte'
  import { afterNavigate } from '$app/navigation'
  import { page } from '$app/state'
  import type { Snippet } from 'svelte'
  import { initColorScheme, initTableScrollHints, sidebarOpen } from '../layout.js'
  import '../styles/base.css'
  import Backdrop from './Backdrop.svelte'
  import GoogleAnalytics from './GoogleAnalytics.svelte'
  import Navbar from './Navbar.svelte'
  import Sidebar from './Sidebar.svelte'
  import Toc from './Toc.svelte'

  interface Props {
    children?: Snippet
  }

  const { children }: Props = $props()

  // The homepage has no sidebar entry (see vite.config.ts's `sidebar` map)
  // and no page anchors for Toc to list, so both columns are always empty
  // there anyway; collapsing the grid to a single full-width column lets
  // its hero go edge-to-edge instead of sitting in the narrower middle
  // track. Sidebar itself stays mounted regardless (see .shell--full
  // :global(.sidebar) below): it's still the mobile hamburger drawer.
  const isHome = $derived(page.url.pathname === '/')

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
<Navbar />

<div class="shell" class:shell--full={isHome}>
  <Sidebar />
  <Backdrop show={$sidebarOpen} onclose={() => sidebarOpen.set(false)} />
  {@render children?.()}
  <Toc />
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
</style>
