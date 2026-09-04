<script lang="ts">
  import type { Snippet } from 'svelte'
  import ModalHierarchyRow from './ModalHierarchyRow.svelte'

  type Mode = 'pedestrian' | 'bicycle' | 'transit' | 'vehicle' | 'freight'
  type Classification = 'local' | 'collector' | 'arterial'

  interface Row {
    /** e.g. "During events:" for a time-conditional pattern's two-row case (Festival Street, School Street). */
    label?: string
    tiers: (Mode | Mode[])[]
  }

  interface Props {
    /**
     * Pill row(s) to render above the explanatory `children` prose. Omit
     * entirely for a pattern with no ranked hierarchy to show (Stroad):
     * `children` alone still renders its plain-text note.
     */
    classification?: Classification
    rows?: Row[]
    children?: Snippet
  }

  const { classification, rows, children }: Props = $props()
</script>

<div class="modal-hierarchy-section">
  <p class="modal-hierarchy-section__label">Modal hierarchy</p>
  <div class="modal-hierarchy-section__body">
    {#if classification && rows}
      {#each rows as row, i (row.label ?? i)}
        <ModalHierarchyRow tiers={row.tiers} {classification} label={row.label} />
      {/each}
    {/if}
    {@render children?.()}
  </div>
</div>

<style>
  .modal-hierarchy-section {
    margin-top: 1.1rem;
    padding-top: 1.1rem;
    border-top: 1px solid var(--cw-hairline);
  }

  .modal-hierarchy-section__label {
    font-size: var(--cw-text-sm);
    font-weight: 600;
    margin: 0 0 0.6rem;
    color: var(--cw-ink);
  }

  .modal-hierarchy-section__body {
    font-size: var(--cw-text-sm);
    color: var(--cw-ink);
  }

  .modal-hierarchy-section__body :global(p:first-child) {
    margin-top: 0;
  }

  .modal-hierarchy-section__body :global(p:last-child),
  .modal-hierarchy-section__body :global(ol:last-child) {
    margin-bottom: 0;
  }
</style>
