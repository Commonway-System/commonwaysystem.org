<script lang="ts">
  import ModalHierarchyPill from './ModalHierarchyPill.svelte'

  type Mode = 'pedestrian' | 'bicycle' | 'transit' | 'vehicle' | 'freight'
  type Classification = 'local' | 'collector' | 'arterial'

  interface Props {
    /**
     * Ranked left to right. Each entry is either a single mode, or an
     * array of modes tied at the same rank (rendered joined by "=" with
     * no live pattern currently using a tie, but the capability exists
     * for when one does, e.g. Shared-Use Path's Pedestrian/Bicycle
     * equal-priority pairing).
     */
    tiers: (Mode | Mode[])[]
    classification: Classification
    /** e.g. "During events:" / "Off-hours:" for the two time-conditional patterns. */
    label?: string
  }

  const { tiers, classification, label }: Props = $props()
</script>

<div class="modal-hierarchy-row">
  {#if label}
    <span class="modal-hierarchy-row__label">{label}</span>
  {/if}
  <div class="modal-hierarchy-row__pills">
    {#each tiers as tier, i (i)}
      {#if i > 0}<span class="modal-hierarchy-row__glyph" aria-hidden="true">&gt;</span>{/if}
      {#each Array.isArray(tier) ? tier : [tier] as mode, j (mode)}
        {#if j > 0}<span class="modal-hierarchy-row__glyph" aria-hidden="true">=</span>{/if}
        <ModalHierarchyPill {mode} {classification} />
      {/each}
    {/each}
  </div>
</div>

<style>
  .modal-hierarchy-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    margin: 0.5rem 0;
  }

  .modal-hierarchy-row__label {
    font-size: var(--cw-text-sm);
    font-weight: 600;
    color: var(--cw-ink-faint);
  }

  .modal-hierarchy-row__pills {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.4rem;
  }

  .modal-hierarchy-row__glyph {
    color: var(--cw-ink-faint);
    font-weight: 600;
    font-size: 0.75rem;
  }
</style>
