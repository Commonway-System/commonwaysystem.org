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

{#snippet fields()}
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
{/snippet}

{#if variant === 'mobile'}
  <details class="mf mf--mobile">
    <summary class="mf__summary">Search &amp; filter</summary>
    <div class="mf__body">
      {@render fields()}
    </div>
  </details>
{:else}
  <aside class="mf mf--desktop">
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
