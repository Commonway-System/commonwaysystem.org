<script lang="ts">
  import { page } from '$app/state'
  import { getMediaItems } from '$lib/data/media/index.js'
  import type { MediaType } from '$lib/data/media/index.js'
  import {
    mediaSearch,
    mediaSelectedPatterns,
    mediaSelectedRetrofits,
    mediaSelectedSources,
    mediaSelectedTopics,
    mediaSelectedTypes,
    mediaSortBy,
  } from '../media-filters.js'

  import MediaFilterList from './MediaFilterList.svelte'

  interface Props {
    /**
     * 'desktop' (default): a plain, always-expanded panel with no toggle
     * at all - GlobalLayout mounts this one in the toc-column slot,
     * CSS-hidden below 940px. 'mobile': a collapsible <details> version,
     * collapsed by default, meant to be mounted inline in a page's own
     * content flow (see /media/+page.md, between the intro paragraph and
     * <MediaGallery/>) rather than in GlobalLayout's separate column,
     * CSS-hidden at 940px and up.
     *
     * Two small mounts of the same controls, not one instance
     * repositioned with CSS: the desktop slot and the requested mobile
     * position live in genuinely different DOM subtrees (a GlobalLayout-
     * level grid sibling vs. a descendant inside the page's own content
     * column, itself nested inside a completely different grid
     * container), and no CSS mechanism moves an element between two
     * unrelated grid contexts. Both instances read/write the same
     * media-filters.ts stores, so they always agree - this is only ever a
     * rendering-location difference, never two independent copies of the
     * actual filter state.
     */
    variant?: 'desktop' | 'mobile'
  }

  const { variant = 'desktop' }: Props = $props()

  const allItems = getMediaItems()

  const typeOptions: { value: MediaType, label: string }[] = [
    { value: 'video', label: 'Video' },
    { value: 'podcast', label: 'Podcast' },
    { value: 'article', label: 'Article' },
  ]

  // 60+ sources, most with one or two items: list the busiest first with
  // their item counts, and let the reader type to narrow the list.
  const sourceCounts = new Map<string, number>()
  for (const item of allItems)
    sourceCounts.set(item.sourceName, (sourceCounts.get(item.sourceName) ?? 0) + 1)
  const sourceOptions = [...sourceCounts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name, count]) => ({ name, count }))

  // Pattern and Retrofit Strategy groups: every ID some item is tagged to,
  // labelled "Name (ID)" from the page titles the /media/ page supplies, so
  // each can be found by ID or by name. Guide and About route paths are not
  // patterns or strategies and are left out.
  const idCounts = new Map<string, number>()
  for (const item of allItems)
    for (const id of item.relatedTo)
      if (!id.startsWith('/'))
        idCounts.set(id, (idCounts.get(id) ?? 0) + 1)
  const mediaPages = $derived(page.data.mediaPages as Record<string, { title: string, href: string }> | undefined)
  const idOptions = $derived(
    [...idCounts.entries()]
      .map(([value, count]) => ({ value, count, label: mediaPages?.[value]?.title ?? value }))
      .sort((x, y) => x.value.localeCompare(y.value)),
  )
  const patternOptions = $derived(idOptions.filter(o => !o.value.startsWith('RFT-')))
  const retrofitOptions = $derived(idOptions.filter(o => o.value.startsWith('RFT-')))
  const sourceListOptions = sourceOptions.map(({ name, count }) => ({ value: name, label: name, count }))

  // Topic combines patternTaxonomyTags and mediaTags into one filter group,
  // per the ticket (Section 3): a reader picking "Explainer" or "Local"
  // shouldn't need to know which underlying field it came from.
  const topicCounts = new Map<string, number>()
  for (const item of allItems)
    for (const topic of new Set([...item.patternTaxonomyTags, ...item.mediaTags]))
      topicCounts.set(topic, (topicCounts.get(topic) ?? 0) + 1)
  const topicOptions = [...topicCounts.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([value, count]) => ({ value, label: value, count }))

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

  function togglePattern(value: string) {
    mediaSelectedPatterns.update((current) => {
      const next = new Set(current)
      next.has(value) ? next.delete(value) : next.add(value)
      return next
    })
  }

  function toggleRetrofit(value: string) {
    mediaSelectedRetrofits.update((current) => {
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

{#snippet fields()}
  <label class="mf__field">
    <span>Search media</span>
    <input type="search" placeholder="e.g. continuous sidewalk, MED-013 or ART-BLV-02" bind:value={$mediaSearch} />
  </label>

  <fieldset class="mf__field">
    <legend>Media type</legend>
    <div class="mf__checks mf__checks--row">
      {#each typeOptions as { value, label } (value)}
        <label class="mf__check">
          <input type="checkbox" checked={$mediaSelectedTypes.has(value)} onchange={() => toggleType(value)} />
          {label}
        </label>
      {/each}
    </div>
  </fieldset>

  <MediaFilterList
    legend="Source"
    noun="source"
    plural="sources"
    options={sourceListOptions}
    selected={$mediaSelectedSources}
    ontoggle={toggleSource}
    onclear={() => mediaSelectedSources.set(new Set())}
  />

  <MediaFilterList
    legend="Pattern"
    noun="pattern"
    plural="patterns"
    options={patternOptions}
    selected={$mediaSelectedPatterns}
    ontoggle={togglePattern}
    onclear={() => mediaSelectedPatterns.set(new Set())}
  />

  <MediaFilterList
    legend="Retrofit Strategy"
    noun="retrofit strategy"
    plural="retrofit strategies"
    options={retrofitOptions}
    selected={$mediaSelectedRetrofits}
    ontoggle={toggleRetrofit}
    onclear={() => mediaSelectedRetrofits.set(new Set())}
  />

  <MediaFilterList
    legend="Topic"
    noun="topic"
    plural="topics"
    options={topicOptions}
    selected={$mediaSelectedTopics}
    ontoggle={toggleTopic}
    onclear={() => mediaSelectedTopics.set(new Set())}
  />

  <label class="mf__field">
    <span>Sort by</span>
    <select bind:value={$mediaSortBy}>
      <option value="date-desc">Newest added</option>
      <option value="date-asc">Oldest added</option>
      <option value="title-asc">Title (A to Z)</option>
      <option value="title-desc">Title (Z to A)</option>
      <option value="channel-asc">Channel (A to Z)</option>
      <option value="channel-desc">Channel (Z to A)</option>
      <option value="id-asc">Media ID (lowest first)</option>
      <option value="id-desc">Media ID (highest first)</option>
    </select>
  </label>
{/snippet}

{#if variant === 'mobile'}
  <details class="mf mf--mobile" data-pagefind-ignore="all">
    <summary class="mf__summary">Search &amp; filter</summary>
    <div class="mf__body">
      {@render fields()}
    </div>
  </details>
{:else}
  <aside class="mf mf--desktop" aria-label="Media filters" data-pagefind-ignore="all">
    <p class="mf__label">Search &amp; filter</p>
    <div class="mf__body">
      {@render fields()}
    </div>
  </aside>
{/if}

<style>
  /* Shared field styling, both variants. */
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

  /* Short labels (Video / Podcast / Article) sit side by side. */
  .mf__checks--row {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.35rem 1rem;
  }

  .mf__check {
    display: flex;
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

  .mf__body {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  /* Desktop variant: plain always-expanded panel, no toggle affordance at
     all - occupies the same grid-area GlobalLayout normally gives
     Toc.svelte (see isMedia there). Sticky only makes sense here, next to
     the much taller results column; CSS-hidden below 940px, where the
     mobile variant (rendered inline in the page content instead) takes
     over. */
  .mf--desktop {
    grid-area: toc;
    align-self: start;
    position: sticky;
    top: calc(var(--cw-navbar-height) + 1.5rem);
    max-height: calc(100vh - var(--cw-navbar-height) - 3rem);
    overflow-y: auto;
    padding: 0 0.5rem 1.5rem;
  }

  .mf--desktop .mf__body {
    margin-top: 1.25rem;
  }

  .mf__label {
    margin: 0;
    font-family: var(--cw-font-display);
    font-weight: 600;
    font-size: var(--cw-text-sm);
    color: var(--cw-ink-faint);
  }

  @media (max-width: 939px) {
    .mf--desktop {
      display: none;
    }
  }

  /* Mobile variant: collapsed by default (no `open` attribute - works
     with no JS, native <details> semantics), sits in normal document flow
     wherever it's placed in the page's own markdown rather than in a
     separate grid column - CSS-hidden at 940px and up, where the desktop
     variant (always expanded, no toggle) takes over instead. */
  .mf--mobile {
    margin: 1.5rem 0;
  }

  .mf--mobile .mf__body {
    padding-top: 1rem;
  }

  .mf__summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border-radius: var(--cw-radius-lg);
    border: 1px solid var(--cw-hairline-strong);
    background: var(--cw-paper-raised);
    font-family: var(--cw-font-display);
    font-weight: 600;
    font-size: var(--cw-text-sm);
    color: var(--cw-ink);
    cursor: pointer;
    list-style: none;
  }

  .mf__summary::-webkit-details-marker {
    display: none;
  }

  /* Plain CSS triangle, rotated when open, standing in for the marker
     ::-webkit-details-marker/list-style: none just removed - a visible
     affordance that this row toggles, not just a static label. */
  .mf__summary::after {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    margin-left: 0.5rem;
    border-right: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
    transform: rotate(45deg);
    transition: transform 0.15s ease;
    flex-shrink: 0;
  }

  .mf--mobile[open] > .mf__summary::after {
    transform: rotate(-135deg);
  }

  @media (min-width: 940px) {
    .mf--mobile {
      display: none;
    }
  }
</style>
