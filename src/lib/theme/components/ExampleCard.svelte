<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    /** Small caption pill in the corner, e.g. "Correct" or "Preview". */
    label?: string
    tone?: 'neutral' | 'good' | 'avoid'
    children?: Snippet
  }

  const { label, tone = 'neutral', children }: Props = $props()
</script>

<div class="example-card">
  {#if label}
    <span class="example-card__label" data-tone={tone}>{label}</span>
  {/if}
  <div class="example-card__body">
    {@render children?.()}
  </div>
</div>

<style>
  .example-card {
    margin: 1.5rem 0;
    padding: 1.25rem 1.4rem;
    border-radius: var(--cw-radius-lg);
    border: 1px solid var(--cw-hairline);
    background: var(--cw-paper-raised);
  }

  .example-card__label {
    display: inline-block;
    margin-bottom: 0.9rem;
    padding: 0.15rem 0.55rem;
    border-radius: 999px;
    font-family: var(--cw-font-display);
    font-weight: 600;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--cw-ink-soft);
    background: var(--cw-primary-soft);
  }

  .example-card__label[data-tone='good'] {
    color: var(--cw-tip);
    background: var(--cw-tip-soft);
  }

  .example-card__label[data-tone='avoid'] {
    color: var(--cw-danger);
    background: var(--cw-danger-soft);
  }

  .example-card__body :global(> *:first-child) {
    margin-top: 0;
  }

  .example-card__body :global(> *:last-child) {
    margin-bottom: 0;
  }
</style>
