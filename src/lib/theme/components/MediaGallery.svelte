<script lang="ts">
  import { tick } from 'svelte'
  import { replaceState } from '$app/navigation'
  import { page } from '$app/state'
  import { getMediaItems } from '$lib/data/media/index.js'
  import type { MediaItem } from '$lib/data/media/types.js'
  import {
    mediaForPage,
    mediaSearch,
    mediaSelectedPatterns,
    mediaSelectedRetrofits,
    mediaSelectedSources,
    mediaSelectedTopics,
    mediaSelectedTypes,
    mediaSortBy,
  } from '../media-filters.js'
  import MediaCard from './MediaCard.svelte'

  const allItems = getMediaItems()

  // A site-search result for a media item lands here as /media/?q=<title>.
  // Effects don't run during prerendering, so reading the query is safe.
  $effect(() => {
    const q = page.url.searchParams.get('q')
    if (q !== null)
      mediaSearch.set(q)
    mediaForPage.set(page.url.searchParams.get('for'))
  })

  const mediaPages = $derived(page.data.mediaPages as Record<string, { title: string, href: string }> | undefined)
  const forPage = $derived($mediaForPage ? (page.data.mediaPages as Record<string, { title: string, href: string }> | undefined)?.[$mediaForPage] : undefined)

  let countEl: HTMLParagraphElement | undefined = $state()

  async function showAll() {
    mediaForPage.set(null)
    // The banner (and the button just pressed) disappears; move focus to the
    // count line so keyboard and screen-reader users aren't dropped to <body>.
    tick().then(() => countEl?.focus())
    const params = new URLSearchParams(page.url.search)
    params.delete('for')
    const query = params.toString()
    try {
      replaceState(query ? `?${query}` : page.url.pathname, page.state)
    }
    catch {
      // Router not ready; the filter is already cleared.
    }
  }

  // Filter controls themselves live in MediaFilters.svelte, rendered in a
  // separate grid area by GlobalLayout (see isMedia there) rather than
  // inline here, per the two-column /media/ layout: this component only
  // owns the results grid, reading the same shared stores.
  const filtered = $derived.by(() => {
    const q = $mediaSearch.trim().toLowerCase()
    const items = allItems.filter((item) => {
      if ($mediaForPage && !item.relatedTo.includes($mediaForPage))
        return false
      if ($mediaSelectedTypes.size > 0 && !$mediaSelectedTypes.has(item.type))
        return false
      if ($mediaSelectedSources.size > 0 && !$mediaSelectedSources.has(item.sourceName))
        return false
      if ($mediaSelectedPatterns.size > 0 && !item.relatedTo.some(id => $mediaSelectedPatterns.has(id)))
        return false
      if ($mediaSelectedRetrofits.size > 0 && !item.relatedTo.some(id => $mediaSelectedRetrofits.has(id)))
        return false
      if ($mediaSelectedTopics.size > 0) {
        const itemTopics = new Set([...item.patternTaxonomyTags, ...item.mediaTags])
        if (![...$mediaSelectedTopics].some(topic => itemTopics.has(topic)))
          return false
      }
      if (q) {
        // Also searches the pages an item is tagged to: their Pattern or
        // Retrofit Strategy ID, and the page title (which carries the ID too).
        const related = item.relatedTo.map(id => `${id} ${mediaPages?.[id]?.title ?? ''}`).join(' ')
        const haystack = `${item.id} ${item.title} ${item.blurb} ${item.sourceName} ${related}`.toLowerCase()
        if (!haystack.includes(q))
          return false
      }
      return true
    })
    // Items added in one batch share a dateAdded, so every sort falls back to
    // the permanent ID to keep the order stable and predictable.
    const byId = (a: MediaItem, b: MediaItem) => a.id.localeCompare(b.id, 'en', { numeric: true })
    const text = (x: string, y: string) => x.localeCompare(y, 'en', { sensitivity: 'base' })
    const [key, dir] = $mediaSortBy.split('-') as ['date' | 'title' | 'channel' | 'id', 'asc' | 'desc']
    const compare = (a: MediaItem, b: MediaItem) => {
      if (key === 'date') return a.dateAdded.localeCompare(b.dateAdded)
      if (key === 'title') return text(a.title, b.title)
      if (key === 'channel') return text(a.sourceName, b.sourceName)
      return byId(a, b)
    }
    return items.sort((a, b) => (dir === 'desc' ? -1 : 1) * compare(a, b) || byId(a, b))
  })
</script>

<div class="mg" data-pagefind-ignore="all">
  {#if $mediaForPage}
    <div class="mg__for">
      <p>
        {#if forPage}
          Showing the media related to <a href={forPage.href}>{forPage.title}</a>.
        {:else}
          Showing the media related to one page.
        {/if}
      </p>
      <button type="button" class="mg__for-clear" onclick={showAll}>Show all media</button>
    </div>
  {/if}

  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <p class="mg__count" tabindex="-1" bind:this={countEl}>{filtered.length} of {allItems.length} media items</p>

  {#if filtered.length > 0}
    <div class="pattern-index-grid">
      {#each filtered as item (item.id)}
        <MediaCard {item} headingLevel={2} />
      {/each}
    </div>
  {:else}
    <p class="mg__empty">No media items match these filters.</p>
  {/if}
</div>

<style>
  .mg__count:focus {
    outline: none;
  }

  .mg__count {
    margin: 0 0 0.75rem;
    font-size: var(--cw-text-sm);
    color: var(--cw-ink-soft);
  }

  .mg__for {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem 1rem;
    margin: 0 0 1rem;
    padding: 0.75rem 1rem;
    border: 1px solid var(--cw-hairline-strong);
    border-left: 4px solid var(--cw-primary);
    border-radius: var(--cw-radius-lg);
    background: var(--cw-paper-raised);
  }

  .mg__for p {
    margin: 0;
  }

  .mg__for-clear {
    min-height: 2.25rem;
    padding: 0.35rem 0.9rem;
    border: 1px solid var(--cw-hairline-strong);
    border-radius: 999px;
    background: var(--cw-paper);
    color: var(--cw-ink);
    font: inherit;
    font-size: var(--cw-text-sm);
    cursor: pointer;
  }

  .mg__for-clear:hover {
    border-color: var(--cw-primary);
    color: var(--cw-primary);
  }

  .mg__empty {
    padding: 2rem;
    text-align: center;
    color: var(--cw-ink-soft);
    border: 1px dashed var(--cw-hairline-strong);
    border-radius: var(--cw-radius-lg);
  }
</style>
