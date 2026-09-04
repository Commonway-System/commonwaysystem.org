<script lang="ts">
  import { onMount, tick } from 'svelte'
  import { afterNavigate } from '$app/navigation'
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

<div class="shell">
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
</style>
