<script lang="ts">
  import type { Snippet } from 'svelte'
  import SpeedLimitSign from './SpeedLimitSign.svelte'

  interface Props {
    /** mph values to render as signs; deduped and sorted ascending regardless of authoring order. */
    speeds: number[]
    /**
     * Append a real, component-rendered link to Design Speed & Speed Limits
     * after the description. Off for the three Default patterns, whose own
     * prose already carries the full sourced rule; on for every other page,
     * per the ticket's per-pattern content table.
     */
    guideLink?: boolean
    /**
     * Sign(s) stacked above the description instead of side by side.
     * Arterial-only (round 2 ticket): Arterial is the one Character Type
     * where 3+ signs can appear together, and the side-by-side layout
     * got cramped there. Local and Collector keep the original layout.
     */
    stacked?: boolean
    children?: Snippet
  }

  const { speeds, guideLink = true, stacked = false, children }: Props = $props()

  const signs = $derived([...new Set(speeds)].sort((a, b) => a - b))
</script>

<div class="speed-limit-section">
  <p class="speed-limit-section__label">Design speed &amp; speed limit</p>
  <div class="speed-limit-section__body" data-stacked={stacked}>
    <div class="speed-limit-section__signs">
      {#each signs as mph (mph)}
        <SpeedLimitSign {mph} />
      {/each}
    </div>
    <div class="speed-limit-section__text">
      {@render children?.()}
      {#if guideLink}
        <p class="speed-limit-section__guide-link">
          See <a href="/guide/design-speed/">Design Speed &amp; Speed Limits</a>.
        </p>
      {/if}
    </div>
  </div>
</div>

<style>
  .speed-limit-section__label {
    font-size: var(--cw-text-sm);
    font-weight: 600;
    margin: 0 0 0.6rem;
    color: var(--cw-ink);
  }

  .speed-limit-section__body {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 1rem;
  }

  .speed-limit-section__body[data-stacked='true'] {
    flex-direction: column;
  }

  .speed-limit-section__signs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }

  .speed-limit-section__text {
    flex: 1 1 260px;
    font-size: var(--cw-text-sm);
    color: var(--cw-ink);
  }

  /* In stacked mode, flex-basis runs along the (now vertical) main axis,
     so the 260px meant as a side-by-side min-width would instead force
     a 260px min-height, leaving a visible gap under short descriptions
     (Boulevard's 3-sign case, most visibly). Content should just set
     its own height here. */
  .speed-limit-section__body[data-stacked='true'] .speed-limit-section__text {
    flex: 0 1 auto;
  }

  .speed-limit-section__text :global(p:first-child) {
    margin-top: 0;
  }

  .speed-limit-section__guide-link {
    margin: 0.6rem 0 0;
  }
</style>
