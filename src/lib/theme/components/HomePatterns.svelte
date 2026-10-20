<script lang="ts">
  import { page } from '$app/state'
  import { onMount } from 'svelte'
  import HomeSection from './HomeSection.svelte'
  import PatternIndexCard from './PatternIndexCard.svelte'

  type Classification = 'network' | 'corridor' | 'local' | 'collector' | 'arterial' | 'freeway' | 'intersections' | 'facility' | 'element'

  interface Featured {
    href: string
    id: string
    title: string
    classification: Classification
    status?: 'situational' | 'avoid' | 'descriptive'
  }

  interface Props {
    eyebrow?: string
    title: string
    intro?: string
    /** Patterns on the shelf, in order. Their images come from each page's `image:` frontmatter. */
    featured: Featured[]
    allLabel: string
  }

  const { eyebrow, title, intro, featured, allLabel }: Props = $props()

  // The nine Scales, in Pattern Index order, with that page's section anchors.
  const scales: { key: Classification, label: string, anchor: string }[] = [
    { key: 'network', label: 'Network', anchor: 'network-level-patterns' },
    { key: 'corridor', label: 'Corridor', anchor: 'corridor-level-patterns' },
    { key: 'local', label: 'Local street', anchor: 'local-street-patterns' },
    { key: 'collector', label: 'Collector street', anchor: 'collector-street-patterns' },
    { key: 'arterial', label: 'Arterial street', anchor: 'arterial-street-patterns' },
    { key: 'freeway', label: 'Freeway', anchor: 'freeway-patterns' },
    { key: 'intersections', label: 'Intersections', anchor: 'intersections-and-crossings' },
    { key: 'facility', label: 'Facility', anchor: 'facility-level-patterns' },
    { key: 'element', label: 'Element', anchor: 'element-level-patterns' },
  ]

  const counts = $derived((page.data.home?.scaleCounts ?? {}) as Record<string, number>)

  let shelf: HTMLUListElement | undefined = $state()
  let atStart = $state(true)
  let atEnd = $state(false)

  function update() {
    if (!shelf)
      return
    atStart = shelf.scrollLeft < 4
    atEnd = shelf.scrollLeft + shelf.clientWidth >= shelf.scrollWidth - 4
  }

  function step(dir: 1 | -1) {
    if (!shelf)
      return
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    shelf.scrollBy({ left: dir * shelf.clientWidth * 0.85, behavior: reduce ? 'auto' : 'smooth' })
  }

  onMount(() => {
    update()
    const ro = new ResizeObserver(update)
    if (shelf)
      ro.observe(shelf)
    return () => ro.disconnect()
  })
</script>

<HomeSection tone="tint" {eyebrow} {title} {intro}>
  <ul class="hp__scales" aria-label="Patterns by scale">
    {#each scales as s (s.key)}
      <li>
        <a class="hp__scale" href="/patterns/#{s.anchor}" data-classification={s.key}>
          <span class="hp__count">{counts[s.key] ?? ''}</span>
          <span class="hp__label">{s.label}</span>
        </a>
      </li>
    {/each}
  </ul>

  <div class="hp__shelf-wrap">
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <ul class="hp__shelf" bind:this={shelf} onscroll={update} tabindex="0" aria-label="Featured patterns, scrolls sideways">
      {#each featured as p (p.href)}
        <li class="hp__item">
          <PatternIndexCard href={p.href} id={p.id} title={p.title} classification={p.classification} status={p.status} showNumber={false} />
        </li>
      {/each}
    </ul>
    <div class="hp__controls">
      <a class="hp__all" href="/patterns/">{allLabel} <span aria-hidden="true">&rarr;</span></a>
      <span class="hp__btns">
        <button type="button" aria-label="Previous patterns" aria-disabled={atStart} onclick={() => !atStart && step(-1)}>&larr;</button>
        <button type="button" aria-label="More patterns" aria-disabled={atEnd} onclick={() => !atEnd && step(1)}>&rarr;</button>
      </span>
    </div>
  </div>
</HomeSection>

<style>
  .hp__scales {
    list-style: none;
    margin: 0 0 2rem;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(9, minmax(0, 1fr));
    gap: 4px;
  }

  .hp__scales li {
    margin: 0;
  }

  /* Each Scale's own ramp: Core-tier top bar (the Scale's single
     representative token), the soft Undeveloped tier behind the text. */
  .hp__scale {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0.65rem 0.6rem 0.6rem;
    border-top: 6px solid var(--c);
    border-radius: 0 0 var(--cw-radius-md) var(--cw-radius-md);
    background: var(--cs);
    color: var(--cw-ink);
    text-decoration: none;
    line-height: 1.25;
  }

  .hp__scale:hover .hp__label {
    text-decoration: underline;
  }

  .hp__count {
    font-family: var(--cw-font-display);
    font-size: 1.375rem;
    font-weight: 600;
  }

  .hp__label {
    font-size: 0.8125rem;
  }

  .hp__scale[data-classification='network'] { --c: var(--cw-network); --cs: var(--cw-network-soft); }
  .hp__scale[data-classification='corridor'] { --c: var(--cw-corridor); --cs: var(--cw-corridor-soft); }
  .hp__scale[data-classification='local'] { --c: var(--cw-local); --cs: var(--cw-local-soft); }
  .hp__scale[data-classification='collector'] { --c: var(--cw-collector); --cs: var(--cw-collector-soft); }
  .hp__scale[data-classification='arterial'] { --c: var(--cw-arterial); --cs: var(--cw-arterial-soft); }
  .hp__scale[data-classification='freeway'] { --c: var(--cw-freeway); --cs: var(--cw-freeway-soft); }
  .hp__scale[data-classification='intersections'] { --c: var(--cw-intersections); --cs: var(--cw-intersections-soft); }
  .hp__scale[data-classification='facility'] { --c: var(--cw-facility); --cs: var(--cw-facility-soft); }
  .hp__scale[data-classification='element'] { --c: var(--cw-element); --cs: var(--cw-element-soft); }

  .hp__shelf {
    list-style: none;
    margin: 0;
    padding: 0.25rem 0.25rem 1.25rem;
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: thin;
    scrollbar-color: var(--cw-hairline-strong) transparent;
  }

  .hp__shelf:focus-visible {
    outline: 2px solid var(--cw-primary);
    outline-offset: 2px;
  }

  .hp__item {
    flex: 0 0 16rem;
    margin: 0;
    scroll-snap-align: start;
  }

  .hp__controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  .hp__all {
    font-weight: 600;
    text-decoration: none;
  }

  .hp__all:hover {
    text-decoration: underline;
  }

  .hp__btns {
    display: flex;
    gap: 0.5rem;
  }

  .hp__btns button {
    width: 2.75rem;
    height: 2.75rem;
    border: 1px solid var(--cw-hairline-strong);
    border-radius: 50%;
    background: var(--hs-card);
    color: var(--cw-ink);
    font-size: 1.125rem;
    cursor: pointer;
  }

  .hp__btns button[aria-disabled='true'] {
    opacity: 0.4;
    cursor: default;
  }

  @media (max-width: 1000px) {
    .hp__scales {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media (max-width: 640px) {
    .hp__item {
      flex-basis: 78%;
    }
  }

  /* Simplified view and print: the shelf becomes an ordinary wrapping grid. */
  :global(html[data-view='simple']) .hp__shelf {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
    overflow: visible;
  }

  :global(html[data-view='simple']) .hp__btns {
    display: none;
  }

  @media print {
    .hp__shelf {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      overflow: visible;
    }

    .hp__btns {
      display: none;
    }
  }
</style>
