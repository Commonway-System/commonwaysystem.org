<script lang="ts">
  import type { Snippet } from 'svelte'

  type Scale = 'corridor' | 'intersection' | 'network'

  interface Props {
    /** e.g. "RFT-CDR-01" */
    id: string
    title: string
    scale: Scale
    children?: Snippet
  }

  const { id, title, scale, children }: Props = $props()

  const labels: Record<Scale, string> = {
    corridor: 'Corridor',
    intersection: 'Intersection',
    network: 'Network',
  }
</script>

<div class="retrofit-card" data-scale={scale}>
  <div class="retrofit-card__head">
    <code class="retrofit-card__id">{id}</code>
    <span class="retrofit-card__scale">{labels[scale]}</span>
  </div>
  <h3 class="retrofit-card__title">{title}</h3>
  {#if children}
    <div class="retrofit-card__body">
      {@render children()}
    </div>
  {/if}
</div>

<style>
  /* Same visual language as PatternCard, minus the status badge (Retrofit
     Strategies aren't endorsed/discouraged, see How to Read a Retrofit
     Strategy). Coloring matches whichever Pattern classification shares
     this strategy's scale/function, the same "peers on the Pattern Index
     page" rule RetrofitIndexCard.svelte uses (see there for the fuller
     comment): Intersection strategies get the real Intersections &
     Crossings ramp, since their Pattern peers already have one.
     PLACEHOLDER: Corridor and Network still reuse Freeway's neutral-gray
     ramp as a stand-in, the same open item as PatternCard's own
     network/corridor/facility/element classifications, since Patterns'
     "corridor"/"network" classifications are themselves still on that
     placeholder. */
  .retrofit-card {
    margin: 1.5rem 0;
    padding: 1.1rem 1.25rem;
    border-radius: var(--cw-radius-lg);
    border: 1px solid var(--cw-hairline);
    border-left: 4px solid var(--cw-retrofit-color, var(--cw-freeway));
    background: var(--cw-paper-raised);
  }

  .retrofit-card[data-scale='intersection'] {
    --cw-retrofit-color: var(--cw-intersections);
  }

  .retrofit-card__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }

  .retrofit-card__id {
    font-family: var(--cw-font-mono);
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--cw-ink);
    letter-spacing: 0.02em;
  }

  .retrofit-card__scale {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--cw-ink-faint);
  }

  .retrofit-card__title {
    font-family: var(--cw-font-display);
    font-size: var(--cw-text-lg);
    font-weight: 600;
    margin: 0 0 0.4rem;
    color: var(--cw-ink);
  }

  .retrofit-card__body :global(p:last-child) {
    margin-bottom: 0;
  }
</style>
