<script lang="ts">
  import type { Snippet } from 'svelte'
  import StatusBadge from './StatusBadge.svelte'

  type Classification = 'local' | 'collector' | 'arterial' | 'freeway' | 'intersections'
  type Status = 'recommended' | 'situational' | 'avoid'

  interface Props {
    /** e.g. "LOC-BBG-12" */
    id: string
    title: string
    classification: Classification
    /**
     * Omit entirely for Intersections & Crossings entries: the master
     * Typology reference only tracks a Recommended/Situational/Avoid status
     * for Local, Collector, Arterial, and Freeway rows, not intersections.
     */
    status?: Status
    children?: Snippet
  }

  const { id, title, classification, status, children }: Props = $props()

  const labels: Record<Classification, string> = {
    local: 'Local',
    collector: 'Collector',
    arterial: 'Arterial',
    freeway: 'Freeway',
    intersections: 'Intersections & Crossings',
  }
</script>

<div class="pattern-card" data-classification={classification}>
  <div class="pattern-card__head">
    <code class="pattern-card__id">{id}</code>
    <div class="pattern-card__head-end">
      {#if status}
        <StatusBadge {status} />
      {/if}
      <span class="pattern-card__classification">{labels[classification]}</span>
    </div>
  </div>
  <h3 class="pattern-card__title">{title}</h3>
  {#if children}
    <div class="pattern-card__body">
      {@render children()}
    </div>
  {/if}
</div>

<style>
  .pattern-card {
    margin: 1.5rem 0;
    padding: 1.1rem 1.25rem;
    border-radius: var(--cw-radius-lg);
    border: 1px solid var(--cw-hairline);
    border-left: 4px solid var(--cw-classification-color, var(--cw-primary));
    background: var(--cw-paper-raised);
  }

  .pattern-card[data-classification='local'] {
    --cw-classification-color: var(--cw-local);
  }
  .pattern-card[data-classification='collector'] {
    --cw-classification-color: var(--cw-collector);
  }
  .pattern-card[data-classification='arterial'] {
    --cw-classification-color: var(--cw-arterial);
  }
  .pattern-card[data-classification='freeway'] {
    --cw-classification-color: var(--cw-freeway);
  }
  .pattern-card[data-classification='intersections'] {
    --cw-classification-color: var(--cw-intersections);
  }

  .pattern-card__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }

  .pattern-card__id {
    font-family: var(--cw-font-mono);
    font-size: 0.8125rem;
    font-weight: 600;
    /* Always ink, per the Brand Guide: "a constant identity mark distinct
       from classification color, which appears elsewhere on the card"
       (the left border, below). Also a real contrast requirement, not
       just a style choice: Arterial and Freeway's real ramp colors only
       reach 3-6:1 on paper, below the 4.5:1 text minimum. */
    color: var(--cw-ink);
    letter-spacing: 0.02em;
  }

  .pattern-card__head-end {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .pattern-card__classification {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--cw-ink-faint);
  }

  .pattern-card__title {
    font-family: var(--cw-font-display);
    font-size: var(--cw-text-lg);
    font-weight: 600;
    margin: 0 0 0.4rem;
    color: var(--cw-ink);
  }

  .pattern-card__body :global(p:last-child) {
    margin-bottom: 0;
  }
</style>
