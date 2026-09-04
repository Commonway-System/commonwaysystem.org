<script lang="ts">
  import { page } from '$app/state'
  import options from 'virtual:commonway/options'
  import type { SidebarLink } from '../config.js'
  import Icon from './Icon.svelte'

  function flatten(items: SidebarLink[]): SidebarLink[] {
    return items.flatMap((item) => [
      ...(item.to ? [item] : []),
      ...(item.items ? flatten(item.items) : []),
    ])
  }

  const flatPages = $derived.by(() => {
    const path = page.url.pathname.replace(/\/$/, '')
    const sections = options.sidebar ?? {}
    const key = Object.keys(sections).find((prefix) => path.startsWith(prefix.replace(/\/$/, '')))
    return key ? flatten(sections[key]) : []
  })

  const currentIndex = $derived(
    flatPages.findIndex((item) => item.to?.replace(/\/$/, '') === page.url.pathname.replace(/\/$/, '')),
  )
  const prevPage = $derived(currentIndex > 0 ? flatPages[currentIndex - 1] : undefined)
  const nextPage = $derived(
    currentIndex >= 0 && currentIndex < flatPages.length - 1 ? flatPages[currentIndex + 1] : undefined,
  )
</script>

{#if prevPage || nextPage}
  <nav class="pagenav" aria-label="Page navigation">
    <a class="pagenav__slot pagenav__slot--prev" href={prevPage?.to} class:is-empty={!prevPage} tabindex={prevPage ? 0 : -1}>
      {#if prevPage}
        <Icon name="arrow-left" size={16} />
        <span>
          <small>Previous</small>
          {prevPage.title}
        </span>
      {/if}
    </a>
    <a class="pagenav__slot pagenav__slot--next" href={nextPage?.to} class:is-empty={!nextPage} tabindex={nextPage ? 0 : -1}>
      {#if nextPage}
        <span>
          <small>Next</small>
          {nextPage.title}
        </span>
        <Icon name="arrow-right" size={16} />
      {/if}
    </a>
  </nav>
{/if}

<style>
  .pagenav {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin: 3rem 0 1rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--cw-hairline);
  }

  .pagenav__slot {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.75rem 0.9rem;
    border: 1px solid var(--cw-hairline);
    border-radius: var(--cw-radius-md);
    text-decoration: none;
    color: var(--cw-ink);
    min-height: 3.25rem;
  }

  .pagenav__slot:hover:not(.is-empty) {
    border-color: var(--cw-primary);
    background: var(--cw-primary-soft);
  }

  .pagenav__slot--next {
    justify-content: flex-end;
    text-align: right;
  }

  .pagenav__slot.is-empty {
    visibility: hidden;
  }

  .pagenav__slot small {
    display: block;
    color: var(--cw-ink-faint);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 0.1rem;
  }
</style>
