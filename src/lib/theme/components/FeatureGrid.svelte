<script lang="ts">
  interface Feature {
    href: string
    title: string
    description: string
  }

  interface Props {
    features: Feature[]
  }

  const { features }: Props = $props()
</script>

<!--
  Each card is a single <a> wrapping both the title and description, one
  tab stop and one accessible name per card (title + description read
  together), not a title link plus a separate "read more" inside it.
-->
<ul class="feature-grid">
  {#each features as feature (feature.href)}
    <li>
      <a class="feature-card" href={feature.href}>
        <h2 class="feature-card__title">{feature.title}</h2>
        <p class="feature-card__description">{feature.description}</p>
      </a>
    </li>
  {/each}
</ul>

<style>
  /* :global(.cw-content) prefix on the container and item rules below:
     base.css's generic `.cw-content ul` and `.cw-content li + li` rules
     (sized for prose lists) outrank a same-page selector on specificity
     alone, and would otherwise leave this grid with a stray bottom margin
     and uneven per-item top margins that break the grid rows. */
  :global(.cw-content) .feature-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
    margin: 0 0 2rem;
    padding: 0;
    list-style: none;
  }

  :global(.cw-content) .feature-grid > li {
    margin: 0;
  }

  .feature-card {
    display: block;
    height: 100%;
    padding: 1.5rem;
    border-radius: var(--cw-radius-lg);
    border: 1px solid var(--cw-hairline);
    background: var(--cw-paper-raised);
    text-decoration: none;
    color: inherit;
    box-shadow: 0 1px 2px rgba(20, 20, 20, 0.04);
    transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease, background 0.15s ease;
  }

  /* transform: translateY on hover isn't caught by base.css's global
     reduced-motion rule (that rule only zeroes transition/animation
     *duration*, not a hover state's end value), but a static +2px shift
     with no animation is a negligible, not disorienting, amount of
     motion, so it's left as-is rather than adding a third override. */
  .feature-card:hover {
    border-color: var(--cw-primary);
    background: var(--cw-primary-soft);
    box-shadow: 0 10px 24px -12px rgba(20, 20, 20, 0.28);
    transform: translateY(-2px);
  }

  .feature-card:hover .feature-card__title {
    color: var(--cw-primary);
  }

  /* Two classes on both sides of this selector, beating the global
     .cw-content h2 rule's specificity (border-top + big top margin meant
     for prose section headings) regardless of stylesheet order. */
  .feature-grid .feature-card__title {
    font-family: var(--cw-font-display);
    font-size: var(--cw-text-lg);
    font-weight: 600;
    color: var(--cw-ink);
    margin: 0 0 0.5rem;
    padding: 0;
    border: none;
  }

  .feature-grid .feature-card__description {
    margin: 0;
    font-size: var(--cw-text-sm);
    line-height: 1.55;
    color: var(--cw-ink-soft);
  }

  /* Same :global(.cw-content) prefix as the base rule above: without it
     these lose the specificity tie against the base rule's 3-column
     value (both would otherwise match at (0,2,0) via Svelte's own
     scoping attribute, and the earlier, un-prefixed base rule would win
     regardless of which media query is active), silently keeping the
     grid at 3 columns down to the narrowest viewport. */
  @media (max-width: 820px) {
    :global(.cw-content) .feature-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 560px) {
    :global(.cw-content) .feature-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
