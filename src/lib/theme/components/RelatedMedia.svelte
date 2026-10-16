<script lang="ts">
  import { onMount } from 'svelte'
  import { getMediaItemsFor } from '$lib/data/media/index.js'
  import MediaCard from './MediaCard.svelte'

  interface Props {
    /** This page's Pattern ID, Retrofit Strategy ID, or trailing-slashed route path. */
    id: string
  }

  const { id }: Props = $props()

  // Already ordered Aligned, then Context only, then Counterexample.
  const items = $derived(getMediaItemsFor(id))

  // One or two items fit in a single row of the grid as-is. Three or more
  // become a one-row carousel: a native horizontal scroller with snap points
  // (keyboard, touch, trackpad and wheel all work without help, and it still
  // scrolls if the script never runs), plus Previous/Next buttons and a
  // position line. Never auto-advances.
  const carousel = $derived(items.length >= 3)

  const headingId = $props.id()

  let track: HTMLUListElement | undefined = $state()
  let first = $state(0)
  let last = $state(-1)
  let atStart = $state(true)
  let atEnd = $state(false)
  let ready = $state(false)

  // Which cards are at least mostly in view. Recomputed after scrolling
  // settles (debounced), not on every scroll frame, so the polite live
  // region doesn't chatter while someone is mid-swipe.
  function measure() {
    if (!track)
      return
    const box = track.getBoundingClientRect()
    let f = -1
    let l = -1
    Array.from(track.children).forEach((child, i) => {
      const r = child.getBoundingClientRect()
      const visible = Math.min(r.right, box.right) - Math.max(r.left, box.left)
      if (visible >= r.width * 0.6) {
        if (f < 0)
          f = i
        l = i
      }
    })
    first = Math.max(f, 0)
    last = l
    atStart = track.scrollLeft <= 2
    atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2
    ready = true
  }

  let settle: ReturnType<typeof setTimeout> | undefined
  function onScroll() {
    clearTimeout(settle)
    settle = setTimeout(measure, 120)
  }

  function step(direction: 1 | -1) {
    if (!track || (direction < 0 ? atStart : atEnd))
      return
    const children = Array.from(track.children) as HTMLElement[]
    // Next: bring the first card that isn't fully shown to the start.
    // Previous: move back by as many cards as are on screen.
    const shown = Math.max(last - first + 1, 1)
    const target = direction > 0 ? Math.min(last + 1, children.length - 1) : Math.max(first - shown, 0)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const offset = children[target].getBoundingClientRect().left - track.getBoundingClientRect().left - parseFloat(getComputedStyle(track).paddingLeft)
    track.scrollTo({ left: track.scrollLeft + offset, behavior: reduce ? 'auto' : 'smooth' })
  }

  onMount(() => {
    if (!carousel || !track)
      return
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    return () => {
      ro.disconnect()
      clearTimeout(settle)
    }
  })

  const status = $derived(
    ready && last >= 0
      ? (first === last ? `Showing ${first + 1} of ${items.length}` : `Showing ${first + 1}–${last + 1} of ${items.length}`)
      : `${items.length} items`,
  )
</script>

{#if items.length > 0}
  <section class="related-media" aria-labelledby={headingId} data-pagefind-ignore="all">
    <h2 id={headingId}>Related Media</h2>
    <p class="related-media__intro">
      The items below come from outside the Commonway System, external videos, podcasts, and articles related to this page's topic, not part of the guidebook itself.
    </p>
    <div class="related-media__box">
      {#if carousel}
        <div class="rm__controls">
          <p class="rm__status" aria-live="polite">{status}</p>
          <div class="rm__buttons">
            <button type="button" class="rm__btn" aria-label="Previous items" aria-disabled={atStart} onclick={() => step(-1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button type="button" class="rm__btn" aria-label="Next items" aria-disabled={atEnd} onclick={() => step(1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
        </div>
        <div class="rm__frame" data-at-start={atStart} data-at-end={atEnd}>
          <ul class="rm__track" role="list" aria-label="Related Media items" bind:this={track} onscroll={onScroll}>
            {#each items as item (item.id)}
              <li class="rm__item">
                <MediaCard {item} pageId={id} />
              </li>
            {/each}
          </ul>
        </div>
        <p class="rm__all">
          <a href={`/media/?for=${encodeURIComponent(id)}`}>See all {items.length} in the Media Gallery</a>
        </p>
      {:else}
        <div class="related-media__grid">
          {#each items as item (item.id)}
            <MediaCard {item} pageId={id} />
          {/each}
        </div>
      {/if}
    </div>
  </section>
{/if}

<style>
  /* Boxed callout treatment consistent with the site's other bordered
     containers (e.g. EvidenceStrip's card), a soft-teal bordered box
     rather than a plain heading + grid, so it reads as a distinct
     "outside this guidebook" zone. */
  .related-media {
    margin: 2rem 0;
  }

  .related-media__intro {
    margin: 0.5rem 0 1rem;
    color: var(--cw-ink-soft);
  }

  .related-media__box {
    padding: 1.25rem;
    border-radius: var(--cw-radius-lg);
    border: 1px solid var(--cw-hairline-strong);
    background: var(--cw-paper-raised);
  }

  /* Deliberately its own grid, not a reuse of base.css's shared
     .pattern-index-grid (which MediaGallery.svelte's own results grid on
     /media/ still uses, unchanged, at 3/2/1 columns): Related Media's
     boxed callout is narrower and meant to show at most a couple of
     items at a glance, so it caps at 2 columns instead of 3. */
  .related-media__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }

  /* Carousel (3+ items) */
  .rm__controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 0.75rem;
  }

  .rm__status {
    margin: 0;
    font-size: var(--cw-text-sm);
    color: var(--cw-ink-soft);
  }

  .rm__buttons {
    display: flex;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  .rm__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    border: 1px solid var(--cw-hairline-strong);
    border-radius: 50%;
    background: var(--cw-paper);
    color: var(--cw-ink);
    cursor: pointer;
  }

  .rm__btn:hover:not([aria-disabled='true']) {
    border-color: var(--cw-primary);
    color: var(--cw-primary);
  }

  /* aria-disabled, not disabled: a disabled button drops keyboard focus the
     moment the row reaches its end, which strands the person who pressed it. */
  .rm__btn[aria-disabled='true'] {
    cursor: default;
    opacity: 0.45;
  }

  .rm__btn svg {
    width: 1.25rem;
    height: 1.25rem;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .rm__frame {
    position: relative;
  }

  /* Edge fades show there is more in that direction; hidden at each end. */
  .rm__frame::before,
  .rm__frame::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;
    width: 1.5rem;
    pointer-events: none;
    transition: opacity 0.2s ease;
  }

  .rm__frame::before {
    left: 0;
    background: linear-gradient(to right, var(--cw-paper-raised), transparent);
  }

  .rm__frame::after {
    right: 0;
    background: linear-gradient(to left, var(--cw-paper-raised), transparent);
  }

  .rm__frame[data-at-start='true']::before,
  .rm__frame[data-at-end='true']::after {
    opacity: 0;
  }

  .rm__track {
    display: flex;
    gap: 1.25rem;
    margin: -6px;
    padding: 6px;
    list-style: none;
    overflow-x: auto;
    overscroll-behavior-x: contain;
    scroll-snap-type: x mandatory;
    scroll-padding-inline: 6px;
    scrollbar-width: thin;
    scrollbar-color: var(--cw-hairline-strong) transparent;
  }

  @media (prefers-reduced-motion: no-preference) {
    .rm__track {
      scroll-behavior: smooth;
    }
  }

  /* Two cards plus a peek of the third, so it's visible that the row goes on. */
  .rm__item {
    display: flex;
    flex: 0 0 calc((100% - 1.25rem) / 2.2);
    margin: 0;
    scroll-snap-align: start;
  }

  .rm__item > :global(.mc) {
    width: 100%;
  }

  .rm__all {
    margin: 1rem 0 0;
    font-size: var(--cw-text-sm);
  }

  @media (max-width: 560px) {
    .related-media__grid {
      grid-template-columns: 1fr;
    }

    .rm__item {
      flex-basis: 85%;
    }
  }

  /* Simplified view and print: every card in a plain stacked list, no row
     to scroll, no buttons. */
  :global(html[data-view='simple']) .rm__track {
    display: grid;
    grid-template-columns: 1fr;
    overflow: visible;
  }

  :global(html[data-view='simple']) .rm__controls,
  :global(html[data-view='simple']) .rm__frame::before,
  :global(html[data-view='simple']) .rm__frame::after {
    display: none;
  }

  @media print {
    .rm__track {
      display: grid;
      grid-template-columns: 1fr 1fr;
      overflow: visible;
    }

    .rm__controls,
    .rm__frame::before,
    .rm__frame::after {
      display: none;
    }
  }
</style>
