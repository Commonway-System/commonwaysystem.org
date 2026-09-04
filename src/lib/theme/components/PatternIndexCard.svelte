<script lang="ts">
  import StatusBadge from './StatusBadge.svelte'

  type Classification = 'local' | 'collector' | 'arterial' | 'freeway' | 'intersections'
  type Status = 'situational' | 'avoid'

  interface Props {
    href: string
    /** e.g. "LOC-BBG-12" */
    id: string
    title: string
    classification: Classification
    /**
     * Omit for Recommended (the unremarkable default, no badge at all here,
     * unlike the Pattern ID card's own quiet "Recommended" pill) and for
     * every Intersections & Crossings entry (no status is tracked for that
     * group, see PatternCard.svelte).
     */
    status?: Status
    /**
     * Real per-pattern illustration, once one exists for this Typology.
     * Omit to fall back to the shared generic placeholder graphic (see
     * pattern-placeholder.svg) — this prop is the one thing the original
     * placeholder design anticipated changing later, the mix-blend-mode
     * recolor mechanism below works unchanged either way.
     */
    image?: string
  }

  const { href, id, title, classification, status, image }: Props = $props()

  // The trailing number in the Pattern ID, leading zero stripped. Doubles
  // as the per-classification counter the number circle needs for free:
  // each classification's own numeric suffix already restarts at 01 (see
  // the Pattern ID scheme in CLAUDE.md), so no separate counter prop is
  // needed here.
  const number = $derived(Number(id.split('-').pop()))
</script>

<a class="pic" {href} data-classification={classification}>
  <div class="pic__image">
    <img src={image ?? '/patterns/pattern-placeholder.svg'} alt="" />
    <div class="pic__overlay"></div>
    <span class="pic__number">{number}</span>
  </div>
  <div class="pic__body">
    <h3 class="pic__title">{title}</h3>
    <div class="pic__meta">
      <code class="pic__id">{id}</code>
      {#if status}
        <StatusBadge {status} />
      {/if}
    </div>
  </div>
</a>

<style>
  /* Same overlay-tier and hover-border-tier reasoning as PatternCard's own
     left-edge accent (see tokens.css): Core is the darkest step in each
     6-tier ramp, so it's what a thin colored line clears the 3:1
     UI-component contrast minimum with regardless of classification.
     Suburban (the ramp's midpoint) is deliberately one step lighter for
     the image overlay, a resting-state tint rather than a UI-contrast
     requirement, since it's blended over art, not read as text or a line.
     Intersections & Crossings now has its own site-only ramp too (see
     tokens.css), built from the same base color the old gray/primary
     fallback used to stand in for. */
  .pic[data-classification='local'] {
    --pic-overlay: var(--cw-local-suburban);
    --pic-hover-border: var(--cw-local-core);
  }
  .pic[data-classification='collector'] {
    --pic-overlay: var(--cw-collector-suburban);
    --pic-hover-border: var(--cw-collector-core);
  }
  .pic[data-classification='arterial'] {
    --pic-overlay: var(--cw-arterial-suburban);
    --pic-hover-border: var(--cw-arterial-core);
  }
  .pic[data-classification='freeway'] {
    --pic-overlay: var(--cw-freeway-suburban);
    --pic-hover-border: var(--cw-freeway-core);
  }
  .pic[data-classification='intersections'] {
    --pic-overlay: var(--cw-intersections-suburban);
    --pic-hover-border: var(--cw-intersections-core);
  }

  /* Border/radius/shadow/lift treatment matches the homepage feature cards
     (FeatureGrid.svelte) for visual consistency, one card style sitewide
     rather than a competing one. */
  .pic {
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

  .pic:hover {
    border-color: var(--pic-hover-border);
    box-shadow: 0 10px 24px -12px rgba(20, 20, 20, 0.28);
    transform: translateY(-2px);
  }

  .pic__image {
    position: relative;
    aspect-ratio: 4 / 3;
  }

  .pic__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    /* Real illustrations are mostly-white line art (by design, see
       pattern-placeholder.svg's own light background too), and white has
       nowhere to go under mix-blend-mode: color below, it stays
       near-white regardless of the overlay's hue, reading as washed out.
       A flat brightness cut before the blend darkens that white just
       enough to actually pick up the overlay tint. */
    filter: brightness(90%);
  }

  /* mix-blend-mode: color takes the overlay's hue/saturation and the base
     image's own luminosity, recoloring the placeholder entirely while
     still letting its light/dark shape show through. Same mechanism will
     work unchanged once pattern-placeholder.svg is replaced by a real
     per-pattern illustration, only the <img src> needs to change later. */
  .pic__overlay {
    position: absolute;
    inset: 0;
    background: var(--pic-overlay);
    mix-blend-mode: color;
  }

  .pic__number {
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
    /* -fixed tokens, not --cw-ink/--cw-paper: this circle sits on top of a
       colored image overlay, not the page background, so it needs a
       theme-invariant dark fill with light text in both modes. --cw-ink
       flips to near-white in dark mode and would go invisible against its
       own dark fill, the same pitfall Button.svelte's "dark" variant
       already hit (see CLAUDE.md). */
    background: var(--cw-ink-fixed);
    color: var(--cw-paper-fixed);
  }

  .pic__body {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem 1.1rem 1.1rem;
  }

  .pic__title {
    margin: 0;
    font-family: var(--cw-font-display);
    font-size: var(--cw-text-lg);
    font-weight: 600;
    color: var(--cw-ink);
  }

  .pic__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    margin-top: auto;
  }

  .pic__id {
    /* Same ink-color override as PatternCard's own ID text, for the exact
       same reason: "a constant identity mark distinct from classification
       color" (Brand Guide). Background/padding/font/radius all come from
       base.css's global .cw-content code rule, the real reuse this is
       meant to get: no separate pill styling declared here. */
    color: var(--cw-ink);
  }
</style>
