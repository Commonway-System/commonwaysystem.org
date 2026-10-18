<script lang="ts">
  import { onMount } from 'svelte'
  import { diffStreets } from '$lib/viewer/geometry'
  import { loadUnits, units } from '$lib/viewer/state'
  import type { Annotations, ConfigEntry, ViewerData } from '$lib/viewer/types'
  import PatternViewerSection from './PatternViewerSection.svelte'
  import '../styles/viewer.css'

  interface Props {
    /** A Pattern viewer data file (src/lib/data/street-configs/). */
    data: ViewerData
    /** Config ids to switch between, e.g. 'before' and 'after'. */
    before: string
    after: string
    beforeLabel?: string
    afterLabel?: string
    /** Accessible name of the drawing, e.g. "Four-to-three lane road diet". */
    title: string
    /** One short line under the drawing (plain text). */
    caption: string
    href: string
    linkLabel: string
  }

  const { data, before, after, beforeLabel = 'Before', afterLabel = 'After', title, caption, href, linkLabel }: Props = $props()

  const uid = $props.id()
  let showing = $state<'before' | 'after'>('after')

  onMount(loadUnits)

  const view = $derived(data.views.find(v => v.kind === 'cross-section') ?? data.views[0])
  const entryBefore = $derived(data.configs.find(c => c.id === before) as ConfigEntry)
  const entryAfter = $derived(data.configs.find(c => c.id === after) as ConfigEntry)

  // The "what changed" highlight on the After drawing, numbered the same way
  // the Pattern viewer numbers it.
  const changes = $derived(
    entryBefore?.config?.kind === 'street' && entryAfter?.config?.kind === 'street'
      ? diffStreets(entryAfter.config, entryBefore.config, $units)
      : [],
  )

  const plain: Annotations = { labels: true, dimensions: true, changes: false, slice: false }
  const highlighted: Annotations = { labels: true, dimensions: true, changes: true, slice: false }
</script>

<!--
  A compact before/after of one Pattern viewer drawing, for the homepage
  hero. Both drawings are rendered (so the prerendered page has both and
  the box never changes height when switching); the hidden one is
  visibility: hidden, which also takes it out of the accessibility tree.
  The two text descriptions are always in the page, so screen readers,
  the text-only page and the markdown copy get both states.
-->
<figure class="sba" data-pagefind-ignore="all">
  <div class="sba__top">
    <span class="sba__id" translate="no">{data.id}</span>
    <div class="sba__seg" role="group" aria-label="Show the street">
      <button type="button" aria-pressed={showing === 'before'} onclick={() => { showing = 'before' }}>{beforeLabel}</button>
      <button type="button" aria-pressed={showing === 'after'} onclick={() => { showing = 'after' }}>{afterLabel}</button>
    </div>
  </div>
  <div class="sba__stage pvx-sky">
    <div class="sba__pane" class:sba__pane--off={showing !== 'before'}>
      <PatternViewerSection {view} entry={entryBefore} units={$units} annotations={plain} expanded={false} changes={[]} descriptionId="{uid}-before" label="{title}, {beforeLabel.toLowerCase()}" />
    </div>
    <div class="sba__pane" class:sba__pane--off={showing !== 'after'}>
      <PatternViewerSection {view} entry={entryAfter} changedFrom={entryBefore} units={$units} annotations={highlighted} expanded={false} {changes} descriptionId="{uid}-after" label="{title}, {afterLabel.toLowerCase()}" />
    </div>
  </div>
  <div class="cw-sr-only">
    <p id="{uid}-before">{beforeLabel}: {entryBefore.description}</p>
    <p id="{uid}-after">{afterLabel}: {entryAfter.description}</p>
  </div>
  <p class="sba__live cw-sr-only" aria-live="polite">{showing === 'before' ? `Showing ${beforeLabel.toLowerCase()}` : `Showing ${afterLabel.toLowerCase()}`}</p>
  <figcaption class="sba__cap">
    {caption} <a href={href}>{linkLabel}</a>
  </figcaption>
</figure>

<style>
  .sba {
    margin: 0;
    padding: 1rem;
    background: #1d2a2f;
    border: 1px solid rgba(253, 250, 243, 0.14);
    border-radius: var(--cw-radius-lg);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
    color: var(--cw-paper-fixed);
  }

  .sba__top {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem 1rem;
    margin-bottom: 0.75rem;
  }

  .sba__id {
    font-family: var(--cw-font-mono, ui-monospace, monospace);
    font-size: 0.8125rem;
    font-weight: 600;
    color: #c9c4b8;
  }

  .sba__seg {
    display: inline-flex;
    padding: 3px;
    border-radius: 999px;
    background: rgba(253, 250, 243, 0.1);
  }

  .sba__seg button {
    min-height: 32px;
    padding: 0.3rem 1rem;
    border: 0;
    border-radius: 999px;
    background: transparent;
    color: #c9c4b8;
    font: inherit;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
  }

  .sba__seg button[aria-pressed='true'] {
    background: var(--cw-paper-fixed);
    color: var(--cw-ink-fixed);
  }

  .sba__seg button:focus-visible {
    outline: 2px solid #4ddbc4;
    outline-offset: 2px;
  }

  /* Both panes in one grid cell: the cell is as tall as the taller one. */
  .sba__stage {
    display: grid;
    border-radius: var(--cw-radius-md);
    overflow: hidden;
    container-type: inline-size;
  }

  .sba__pane {
    grid-area: 1 / 1;
    align-self: end;
    transition: opacity 0.35s ease, visibility 0.35s;
  }

  .sba__pane--off {
    opacity: 0;
    visibility: hidden;
  }

  @media (prefers-reduced-motion: reduce) {
    .sba__pane {
      transition: none;
    }
  }

  .sba__cap {
    margin: 0.85rem 0.15rem 0;
    font-size: 0.9375rem;
    line-height: 1.5;
    color: #c9c4b8;
  }

  .sba__cap a {
    color: #9fe9dc;
    font-weight: 600;
  }

  /* Simplified view: the hero's dark background is gone, so the card follows the page. */
  :global(html[data-view='simple']) .sba {
    background: var(--cw-paper-raised);
    border-color: var(--cw-hairline-strong);
    box-shadow: none;
    color: var(--cw-ink);
  }

  :global(html[data-view='simple']) .sba__id,
  :global(html[data-view='simple']) .sba__cap {
    color: var(--cw-ink-soft);
  }

  :global(html[data-view='simple']) .sba__cap a {
    color: var(--cw-link);
  }

  :global(html[data-view='simple']) .sba__seg {
    background: transparent;
    border: 1px solid var(--cw-hairline-strong);
  }

  :global(html[data-view='simple']) .sba__seg button {
    color: var(--cw-ink);
  }

  :global(html[data-view='simple']) .sba__seg button[aria-pressed='true'] {
    background: var(--cw-ink);
    color: var(--cw-paper);
  }
</style>
