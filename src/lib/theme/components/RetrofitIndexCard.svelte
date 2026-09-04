<script lang="ts">
  type Scale = 'corridor' | 'intersection' | 'network'

  interface Props {
    href: string
    /** e.g. "RFT-CDR-01" */
    id: string
    title: string
    scale: Scale
    /**
     * Real per-strategy illustration, once one exists. Omit to fall back
     * to the shared generic placeholder graphic, same mechanism and same
     * file as PatternIndexCard.svelte uses - no Retrofit Strategy has its
     * own illustration yet, so every card currently falls back.
     */
    image?: string
  }

  const { href, id, title, scale, image }: Props = $props()

  // Same mechanism as PatternIndexCard.svelte: the trailing number in the
  // ID, doubling as the per-scale counter since RFT numbering already
  // restarts at 01 within each scale.
  const number = $derived(Number(id.split('-').pop()))
</script>

<a class="ric" {href} data-scale={scale}>
  <div class="ric__image">
    <img src={image ?? '/patterns/pattern-placeholder.svg'} alt="" />
    <div class="ric__overlay"></div>
    <span class="ric__number">{number}</span>
  </div>
  <div class="ric__body">
    <h3 class="ric__title">{title}</h3>
    <div class="ric__meta">
      <code class="ric__id">{id}</code>
    </div>
  </div>
</a>

<style>
  /* Coloring shares whichever Pattern classification is this strategy's
     scale/functional peer, per the user's own instruction, rather than
     inventing a separate Retrofit-only palette: an Intersection strategy's
     peers on the Pattern Index are Intersections & Crossings patterns, so
     it gets that ramp's real color, same overlay/hover-border tiers
     PatternIndexCard.svelte uses for classification="intersections".
     Corridor and Network strategies' peers (Patterns' own "corridor" and
     "network" classifications) are still on the Freeway-gray placeholder
     themselves, so these two inherit that same placeholder rather than
     getting a color Patterns' own equivalent classifications don't have
     yet - swap both together if/when real Corridor/Network colors land. */
  .ric[data-scale='corridor'],
  .ric[data-scale='network'] {
    --ric-overlay: var(--cw-freeway-suburban);
    --ric-hover-border: var(--cw-freeway-core);
  }
  .ric[data-scale='intersection'] {
    --ric-overlay: var(--cw-intersections-suburban);
    --ric-hover-border: var(--cw-intersections-core);
  }

  /* Same card shell, hover, and overlay mechanics as PatternIndexCard.svelte
     - one card style sitewide, not a competing one. */
  .ric {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    border-radius: var(--cw-radius-lg);
    border: 1px solid var(--cw-hairline);
    background: var(--cw-paper-raised);
    text-decoration: none;
    color: inherit;
    box-shadow: 0 1px 2px rgba(20, 20, 20, 0.04);
    transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
  }

  .ric:hover {
    border-color: var(--ric-hover-border);
    box-shadow: 0 10px 24px -12px rgba(20, 20, 20, 0.28);
    transform: translateY(-2px);
  }

  .ric__image {
    position: relative;
    aspect-ratio: 4 / 3;
  }

  .ric__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: brightness(90%);
  }

  .ric__overlay {
    position: absolute;
    inset: 0;
    background: var(--ric-overlay);
    mix-blend-mode: color;
  }

  .ric__number {
    position: absolute;
    top: 12px;
    left: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    font-family: var(--cw-font-display);
    font-weight: 700;
    font-size: 0.95rem;
    background: var(--cw-ink-fixed);
    color: var(--cw-paper-fixed);
  }

  .ric__body {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem 1.1rem 1.1rem;
  }

  .ric__title {
    margin: 0;
    font-family: var(--cw-font-display);
    font-size: var(--cw-text-lg);
    font-weight: 600;
    color: var(--cw-ink);
  }

  .ric__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    margin-top: auto;
  }

  .ric__id {
    color: var(--cw-ink);
  }
</style>
