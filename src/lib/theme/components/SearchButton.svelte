<script lang="ts">
  import { onMount } from 'svelte'
  import { openSearch } from '../search.js'
  import Icon from './Icon.svelte'

  // Navbar entry point to the search dialog. Below 940px the navbar has no
  // room, so the mobile drawer (Sidebar.svelte) carries its own button.
  let hint = $state('')

  onMount(() => {
    hint = /mac|iphone|ipad/i.test(navigator.platform || navigator.userAgent) ? '⌘K' : 'Ctrl K'
  })
</script>

<button
  type="button"
  class="sb"
  aria-haspopup="dialog"
  aria-keyshortcuts="Control+K Meta+K"
  onclick={openSearch}
>
  <Icon name="search" size={17} />
  <span class="sb__label">Search</span>
  {#if hint}
    <kbd class="sb__kbd" aria-hidden="true">{hint}</kbd>
  {/if}
</button>

<style>
  .sb {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    flex-shrink: 0;
    min-height: 2.25rem;
    padding: 0 0.6rem;
    border: 1px solid var(--cw-hairline-strong);
    border-radius: var(--cw-radius-md);
    background: transparent;
    color: var(--cw-ink-soft);
    font: inherit;
    font-size: var(--cw-text-sm);
    cursor: pointer;
  }

  .sb:hover {
    color: var(--cw-ink);
    background: var(--cw-primary-soft);
  }

  .sb__kbd {
    padding: 0.05rem 0.35rem;
    border: 1px solid var(--cw-hairline-strong);
    border-radius: var(--cw-radius-sm);
    font-family: var(--cw-font-body);
    font-size: 0.75rem;
    color: var(--cw-ink-soft);
  }

  @media (max-width: 1180px) {
    .sb__kbd {
      display: none;
    }
  }

  @media (max-width: 940px) {
    .sb {
      display: none;
    }
  }
</style>
