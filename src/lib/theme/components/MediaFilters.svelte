<script lang="ts">
  import { getMediaItems } from '$lib/data/media/index.js'
  import type { MediaType } from '$lib/data/media/index.js'
  import {
    mediaSearch,
    mediaSelectedSources,
    mediaSelectedTopics,
    mediaSelectedTypes,
    mediaSortBy,
  } from '../media-filters.js'

  const allItems = getMediaItems()

  const typeOptions: { value: MediaType, label: string }[] = [
    { value: 'video', label: 'Video' },
    { value: 'podcast', label: 'Podcast' },
    { value: 'article', label: 'Article' },
  ]

  const sourceOptions = [...new Set(allItems.map(item => item.sourceName))].sort((a, b) => a.localeCompare(b))

  // Topic combines patternTaxonomyTags and mediaTags into one filter group,
  // per the ticket (Section 3): a reader picking "Explainer" or "Local"
  // shouldn't need to know which underlying field it came from.
  const topicOptions = [...new Set(allItems.flatMap(item => [...item.patternTaxonomyTags, ...item.mediaTags]))].sort((a, b) => a.localeCompare(b))

  function toggleType(value: MediaType) {
    mediaSelectedTypes.update((current) => {
      const next = new Set(current)
      next.has(value) ? next.delete(value) : next.add(value)
      return next
    })
  }

  function toggleSource(value: string) {
    mediaSelectedSources.update((current) => {
      const next = new Set(current)
      next.has(value) ? next.delete(value) : next.add(value)
      return next
    })
  }

  function toggleTopic(value: string) {
    mediaSelectedTopics.update((current) => {
      const next = new Set(current)
      next.has(value) ? next.delete(value) : next.add(value)
      return next
    })
  }
</script>

<aside class="mf">
  <p class="mf__label">Search &amp; filter</p>

  <label class="mf__field">
    <span>Search media</span>
    <input type="search" placeholder="e.g. continuous sidewalk" bind:value={$mediaSearch} />
  </label>

  <fieldset class="mf__field">
    <legend>Media type</legend>
    <div class="mf__checks">
      {#each typeOptions as { value, label } (value)}
        <label class="mf__check">
          <input type="checkbox" checked={$mediaSelectedTypes.has(value)} onchange={() => toggleType(value)} />
          {label}
        </label>
      {/each}
    </div>
  </fieldset>

  <fieldset class="mf__field">
    <legend>Source</legend>
    <div class="mf__checks">
      {#each sourceOptions as source (source)}
        <label class="mf__check">
          <input type="checkbox" checked={$mediaSelectedSources.has(source)} onchange={() => toggleSource(source)} />
          {source}
        </label>
      {/each}
    </div>
  </fieldset>

  <fieldset class="mf__field">
    <legend>Topic</legend>
    <div class="mf__checks">
      {#each topicOptions as topic (topic)}
        <label class="mf__check">
          <input type="checkbox" checked={$mediaSelectedTopics.has(topic)} onchange={() => toggleTopic(topic)} />
          {topic}
        </label>
      {/each}
    </div>
  </fieldset>

  <label class="mf__field">
    <span>Sort by</span>
    <select bind:value={$mediaSortBy}>
      <option value="date">Date Added</option>
      <option value="alpha">Alphabetical</option>
    </select>
  </label>
</aside>

<style>
  /* Occupies the same grid-area GlobalLayout normally gives Toc.svelte
     (see isMedia there) - a vertical control stack in place of the "On
     this page" rail, since a filter/sort page has nothing for that rail
     to list anyway. */
  .mf {
    grid-area: toc;
    align-self: start;
    position: sticky;
    top: calc(var(--cw-navbar-height) + 1.5rem);
    max-height: calc(100vh - var(--cw-navbar-height) - 3rem);
    overflow-y: auto;
    padding: 0 0.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .mf__label {
    margin: 0;
    font-family: var(--cw-font-display);
    font-weight: 600;
    font-size: var(--cw-text-sm);
    color: var(--cw-ink-faint);
  }

  .mf__field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin: 0;
    padding: 0;
    border: none;
  }

  .mf__field > span,
  .mf__field legend {
    font-size: var(--cw-text-sm);
    font-weight: 600;
    color: var(--cw-ink);
    padding: 0;
  }

  .mf input[type='search'],
  .mf select {
    font: inherit;
    font-size: var(--cw-text-sm);
    padding: 0.5rem 0.65rem;
    border-radius: var(--cw-radius-sm);
    border: 1px solid var(--cw-hairline-strong);
    background: var(--cw-paper);
    color: var(--cw-ink);
  }

  .mf__checks {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .mf__check {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: var(--cw-text-sm);
    font-weight: 400;
    color: var(--cw-ink-soft);
  }

  .mf input:focus-visible,
  .mf select:focus-visible {
    outline: 2px solid var(--cw-teal);
    outline-offset: 1px;
    border-radius: var(--cw-radius-sm);
  }
</style>
