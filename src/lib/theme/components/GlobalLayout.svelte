<script lang="ts">
  import { onMount } from 'svelte'
  import { afterNavigate } from '$app/navigation'
  import type { Snippet } from 'svelte'
  import { initColorScheme, sidebarOpen } from '../layout.js'
  import '../styles/base.css'
  import Backdrop from './Backdrop.svelte'
  import Navbar from './Navbar.svelte'
  import Sidebar from './Sidebar.svelte'
  import Toc from './Toc.svelte'

  interface Props {
    children?: Snippet
  }

  const { children }: Props = $props()

  onMount(() => {
    initColorScheme()
  })

  afterNavigate(() => {
    sidebarOpen.set(false)
  })
</script>

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
