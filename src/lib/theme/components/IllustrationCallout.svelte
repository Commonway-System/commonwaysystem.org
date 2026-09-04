<script lang="ts">
  import type { Snippet } from 'svelte'

  type Kind = 'physical' | 'connectivity' | 'control-timing'

  interface Props {
    /**
     * Explicit number rather than relying on <ol> auto-increment: a page
     * can split one illustration's callouts across a required + a
     * supplemental box (see Stroad), where the numbering isn't contiguous
     * within either box. Uses the HTML `<li value>` attribute, which the
     * browser honors for ordered-list numbering.
     */
    number: number
    kind: Kind
    children?: Snippet
  }

  const { number, kind, children }: Props = $props()

  const labels: Record<Kind, string> = {
    physical: 'Physical',
    connectivity: 'Connectivity',
    'control-timing': 'Control-timing',
  }
</script>

<li value={number}>
  <span class="illustration-callout__kind">({labels[kind]})</span>
  {#if children}
    {@render children()}
  {/if}
</li>

<style>
  .illustration-callout__kind {
    font-weight: 600;
    color: var(--cw-ink-faint);
    margin-right: 0.3em;
  }
</style>
