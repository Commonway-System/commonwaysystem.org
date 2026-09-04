<script lang="ts">
  import { page } from '$app/state'
  import { externalLinkAttrs, isExternalHref } from '$lib/site.js'
  import options from 'virtual:commonway/options'
  import { sidebarOpen } from '../layout.js'
  import Icon from './Icon.svelte'
  import SidebarGroup from './SidebarGroup.svelte'

  const sections = options.sidebar ?? {}
  const navLinks = options.navbar ?? []

  const items = $derived.by(() => {
    const path = page.url.pathname.replace(/\/$/, '')
    const key = Object.keys(sections).find((prefix) => path.startsWith(prefix.replace(/\/$/, '')))
    return key ? sections[key] : []
  })

  function isActiveNavLink(to: string) {
    return page.url.pathname.replace(/\/$/, '').startsWith(to.replace(/\/$/, ''))
  }
</script>

<aside class="sidebar" class:sidebar--open={$sidebarOpen}>
  <nav class="sidebar__scroll" aria-label="Section">
    {#if navLinks.length}
      <!-- Mobile-only (see the max-width: 940px rule below): the navbar's
           own primary links hide at that breakpoint behind the hamburger
           button, and this drawer is the only other place they can go, or
           they'd become completely unreachable on narrow viewports, on
           every page, not just ones with a page-specific sidebar tree. -->
      <div class="sidebar__primary-nav">
        {#each navLinks as link (link.to)}
          <a
            href={link.to}
            class="sidebar__primary-link"
            class:sidebar__primary-link--active={isActiveNavLink(link.to)}
            {...externalLinkAttrs(link.to)}
          >
            {link.title}
            {#if isExternalHref(link.to)}
              <span class="cw-external-indicator">
                <Icon name="external" size={12} />
                <span class="cw-sr-only"> (opens in new tab)</span>
              </span>
            {/if}
          </a>
        {/each}
      </div>
    {/if}
    {#each items as item (item.title)}
      <SidebarGroup {item} />
    {/each}
  </nav>
</aside>

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

  .sidebar__primary-nav {
    display: none;
  }

  .sidebar__primary-link {
    display: flex;
    align-items: center;
    padding: 0.5rem 0.5rem;
    border-radius: var(--cw-radius-sm);
    font-family: var(--cw-font-display);
    font-weight: 600;
    font-size: var(--cw-text-sm);
    color: var(--cw-ink-soft);
    text-decoration: none;
  }

  .sidebar__primary-link:hover {
    background: var(--cw-primary-soft);
    color: var(--cw-ink);
  }

  .sidebar__primary-link--active {
    color: var(--cw-primary);
  }

  @media (max-width: 940px) {
    .sidebar__primary-nav {
      display: flex;
      flex-direction: column;
      padding-bottom: 0.75rem;
      margin-bottom: 0.75rem;
      border-bottom: 1px solid var(--cw-hairline);
    }
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
