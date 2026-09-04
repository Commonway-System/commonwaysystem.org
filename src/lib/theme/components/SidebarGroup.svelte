<script lang="ts">
  import { page } from '$app/state'
  import { externalLinkAttrs, isExternalHref } from '$lib/site.js'
  import type { SidebarLink } from '../config.js'
  import Icon from './Icon.svelte'
  import SidebarGroup from './SidebarGroup.svelte'

  interface Props {
    item: SidebarLink
    depth?: number
  }

  const { item, depth = 0 }: Props = $props()

  const hasChildren = $derived((item.items?.length ?? 0) > 0)
  const isCurrentPath = $derived(item.to ? page.url.pathname.replace(/\/$/, '') === item.to.replace(/\/$/, '') : false)

  let open = $state(true)
</script>

{#if hasChildren}
  <div class="group" style:--depth={depth}>
    {#if item.collapsible}
      <button type="button" class="group__label group__label--button" onclick={() => (open = !open)} aria-expanded={open}>
        <Icon name={open ? 'chevron-down' : 'chevron-right'} size={14} />
        {item.title}
      </button>
    {:else}
      <p class="group__label">{item.title}</p>
    {/if}
    {#if open}
      <div class="group__children">
        {#each item.items ?? [] as child (child.title)}
          <SidebarGroup item={child} depth={depth + 1} />
        {/each}
      </div>
    {/if}
  </div>
{:else if item.to}
  <a href={item.to} class="link" class:link--current={isCurrentPath} style:--depth={depth} {...externalLinkAttrs(item.to)}>
    {item.title}
    {#if isExternalHref(item.to)}
      <span class="cw-external-indicator">
        <Icon name="external" size={12} />
        <span class="cw-sr-only"> (opens in new tab)</span>
      </span>
    {/if}
  </a>
{/if}

<style>
  .group {
    margin: 0 0 0.25rem;
  }

  .group__label {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    margin: 0;
    padding: 0.4rem 0.5rem;
    padding-left: calc(0.5rem + var(--depth, 0) * 0.85rem);
    font-family: var(--cw-font-display);
    font-weight: 600;
    font-size: var(--cw-text-sm);
    color: var(--cw-ink-soft);
  }

  .group__label--button {
    width: 100%;
    text-align: left;
    background: transparent;
    border: none;
    cursor: pointer;
    border-radius: var(--cw-radius-sm);
  }

  .group__label--button:hover {
    background: var(--cw-primary-soft);
    color: var(--cw-ink);
  }

  .link {
    display: block;
    padding: 0.4rem 0.5rem;
    padding-left: calc(0.5rem + var(--depth, 0) * 0.85rem + 1.05rem);
    border-radius: var(--cw-radius-sm);
    font-size: var(--cw-text-sm);
    color: var(--cw-ink-soft);
    text-decoration: none;
    line-height: 1.4;
  }

  .link:hover {
    background: var(--cw-primary-soft);
    color: var(--cw-ink);
  }

  .link--current {
    background: var(--cw-primary-soft);
    color: var(--cw-primary);
    font-weight: 600;
  }
</style>
