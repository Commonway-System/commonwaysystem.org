<script lang="ts">
  import { getMediaItems } from '$lib/data/media/index.js'
  import {
    mediaSearch,
    mediaSelectedSources,
    mediaSelectedTopics,
    mediaSelectedTypes,
    mediaSortBy,
  } from '../media-filters.js'
  import MediaCard from './MediaCard.svelte'

  const allItems = getMediaItems()

  // Filter controls themselves live in MediaFilters.svelte, rendered in a
  // separate grid area by GlobalLayout (see isMedia there) rather than
  // inline here, per the two-column /media/ layout: this component only
  // owns the results grid, reading the same shared stores.
  const filtered = $derived.by(() => {
    const q = $mediaSearch.trim().toLowerCase()
    const items = allItems.filter((item) => {
      if ($mediaSelectedTypes.size > 0 && !$mediaSelectedTypes.has(item.type))
        return false
      if ($mediaSelectedSources.size > 0 && !$mediaSelectedSources.has(item.sourceName))
        return false
      if ($mediaSelectedTopics.size > 0) {
        const itemTopics = new Set([...item.patternTaxonomyTags, ...item.mediaTags])
        if (![...$mediaSelectedTopics].some(topic => itemTopics.has(topic)))
          return false
      }
      if (q) {
        const haystack = `${item.title} ${item.blurb} ${item.sourceName}`.toLowerCase()
        if (!haystack.includes(q))
          return false
      }
      return true
    })
    return items.sort((a, b) => $mediaSortBy === 'alpha' ? a.title.localeCompare(b.title) : b.dateAdded.localeCompare(a.dateAdded))
  })
</script>

<div class="mg">
  <p class="mg__count">{filtered.length} of {allItems.length} media items</p>

  {#if filtered.length > 0}
    <div class="pattern-index-grid">
      {#each filtered as item (item.id)}
        <MediaCard {item} />
      {/each}
    </div>
  {:else}
    <p class="mg__empty">No media items match these filters.</p>
  {/if}
</div>

<style>
  .mg__count {
    margin: 0 0 0.75rem;
    font-size: var(--cw-text-sm);
    color: var(--cw-ink-soft);
  }

  .mg__empty {
    padding: 2rem;
    text-align: center;
    color: var(--cw-ink-soft);
    border: 1px dashed var(--cw-hairline-strong);
    border-radius: var(--cw-radius-lg);
  }
</style>
