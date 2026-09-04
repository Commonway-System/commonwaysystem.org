<script lang="ts">
  import { page } from '$app/state'
  import options from 'virtual:commonway/options'
  import { sidebarOpen } from '../layout.js'
  import SidebarGroup from './SidebarGroup.svelte'

  const sections = options.sidebar ?? {}

  const items = $derived.by(() => {
    const path = page.url.pathname.replace(/\/$/, '')
    const key = Object.keys(sections).find((prefix) => path.startsWith(prefix.replace(/\/$/, '')))
    return key ? sections[key] : []
  })
</script>

{#if items.length}
  <aside class="sidebar" class:sidebar--open={$sidebarOpen}>
    <nav class="sidebar__scroll" aria-label="Section">
      {#each items as item (item.title)}
        <SidebarGroup {item} />
      {/each}
    </nav>
  </aside>
{/if}

<style>
  .sidebar {
    grid-area: sidebar;
    align-self: start;
    position: sticky;
    top: var(--cw-navbar-height);
    height: calc(100vh - var(--cw-navbar-height));
    overflow-y: auto;
    padding: 1.5rem 0.75rem 2rem;
  }

  .sidebar__scroll {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 940px) {
    .sidebar {
      position: fixed;
      top: var(--cw-navbar-height);
      left: 0;
      bottom: 0;
      width: min(20rem, 84vw);
      background: var(--cw-paper-raised);
      border-right: 1px solid var(--cw-hairline);
      box-shadow: var(--cw-shadow-drawer);
      transform: translateX(-100%);
      transition: transform 0.18s ease;
      z-index: 45;
      padding: 1rem 1rem 2rem;
    }

    .sidebar--open {
      transform: translateX(0);
    }
  }
</style>
