<script lang="ts">
  import { onMount } from 'svelte'
  import { loadUnits, units } from '$lib/viewer/state'
  import type { Annotations, ConfigEntry, ViewerData } from '$lib/viewer/types'
  import HomeSection from './HomeSection.svelte'
  import PatternViewerSection from './PatternViewerSection.svelte'
  import StatusBadge from './StatusBadge.svelte'
  import '../styles/viewer.css'

  interface Side {
    /** Pattern viewer data file and the configuration to draw from it. */
    data: ViewerData
    config: string
    id: string
    status: 'recommended' | 'situational' | 'avoid' | 'descriptive'
    title: string
    text: string
    href: string
  }

  interface Props {
    eyebrow?: string
    title: string
    intro?: string
    from: Side
    to: Side
    /** The word between the two cards. */
    joiner?: string
  }

  const { eyebrow, title, intro, from, to, joiner = 'Instead' }: Props = $props()
  const uid = $props.id()

  onMount(loadUnits)

  const annotations: Annotations = { labels: true, dimensions: true, changes: false, slice: false }

  function entryOf(side: Side): ConfigEntry {
    return side.data.configs.find(c => c.id === side.config) as ConfigEntry
  }

  function viewOf(side: Side) {
    return side.data.views.find(v => v.kind === 'cross-section') ?? side.data.views[0]
  }

  const sides = $derived([{ key: 'from', side: from }, { key: 'to', side: to }])
</script>

<HomeSection {eyebrow} {title} {intro}>
  <div class="hc">
    {#each sides as { key, side }, i (key)}
      {#if i === 1}
        <p class="hc__joiner" aria-hidden="true"><span class="hc__word">{joiner}</span><span class="hc__arrow">&rarr;</span></p>
      {/if}
      {@const entry = entryOf(side)}
      <article class="hc__card">
        <div class="hc__draw pvx-sky">
          <PatternViewerSection view={viewOf(side)} {entry} units={$units} {annotations} expanded={false} changes={[]} descriptionId="{uid}-{key}" label="{side.title}, cross-section" />
        </div>
        <div class="hc__body">
          <div class="hc__meta">
            <code class="hc__id" translate="no">{side.id}</code>
            <StatusBadge status={side.status} />
          </div>
          <h3 class="hc__title"><a href={side.href}>{side.title}</a></h3>
          <p class="hc__text">{side.text}</p>
          <p class="cw-sr-only" id="{uid}-{key}">{entry.description}</p>
        </div>
      </article>
    {/each}
  </div>
</HomeSection>

<style>
  .hc {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    align-items: stretch;
    gap: 1.25rem;
  }

  .hc__card {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: var(--hs-card);
    border: 1px solid var(--cw-hairline);
    border-radius: var(--cw-radius-lg);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.05);
    transition: border-color 0.15s ease;
  }

  .hc__card:hover {
    border-color: var(--cw-primary);
  }

  /* The drawings differ in height; line their ground lines up at the bottom. */
  .hc__draw {
    flex: 1;
    display: flex;
    align-items: flex-end;
    container-type: inline-size;
  }

  .hc__draw > :global(*) {
    width: 100%;
  }

  .hc__body {
    padding: 1.1rem 1.3rem 1.4rem;
  }

  .hc__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .hc__id {
    font-size: 0.8125rem;
    font-weight: 600;
    background: none;
    padding: 0;
    color: var(--hs-ink);
  }

  .hc__title {
    margin: 0 0 0.4rem;
    padding: 0;
    border: 0;
    font-size: 1.375rem;
  }

  .hc__title a {
    color: var(--hs-ink);
    text-decoration: none;
  }

  /* The whole card is clickable through the title link's stretched hit area. */
  .hc__title a::after {
    content: '';
    position: absolute;
    inset: 0;
  }

  .hc__title a:hover {
    text-decoration: underline;
  }

  .hc__title a:focus-visible {
    outline: none;
  }

  .hc__card:has(.hc__title a:focus-visible) {
    outline: 2px solid var(--cw-primary);
    outline-offset: 3px;
  }

  .hc__text {
    margin: 0;
    font-size: 0.9688rem;
    line-height: 1.55;
    color: var(--hs-soft);
  }

  /* The word runs vertically between the cards; the arrow stays upright
     beside it so it points at the right-hand card (down when stacked). */
  .hc__joiner {
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--cw-ink-faint);
  }

  .hc__word {
    writing-mode: vertical-rl;
  }

  .hc__arrow {
    font-size: 1.125rem;
    letter-spacing: 0;
  }

  @media (max-width: 900px) {
    .hc {
      grid-template-columns: minmax(0, 1fr);
    }

    .hc__joiner {
      flex-direction: row;
      justify-self: center;
    }

    .hc__word {
      writing-mode: horizontal-tb;
    }

    .hc__arrow {
      transform: rotate(90deg);
    }
  }

  :global(html[data-view='simple']) .hc {
    grid-template-columns: minmax(0, 1fr);
  }

  :global(html[data-view='simple']) .hc__joiner {
    flex-direction: row;
    justify-self: center;
  }

  :global(html[data-view='simple']) .hc__word {
    writing-mode: horizontal-tb;
  }

  :global(html[data-view='simple']) .hc__arrow {
    transform: rotate(90deg);
  }
</style>
