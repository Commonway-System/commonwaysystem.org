<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    children?: Snippet
  }

  const { children }: Props = $props()
</script>

<!--
  Reusable card replacing the old plain "Modal hierarchy" heading and the
  ad hoc "Speed and modal hierarchy" prose on the three Default patterns.
  Composed the same way as Illustration/IllustrationFrame: this shell just
  lays out whatever SpeedLimitSection/ModalHierarchySection children are
  passed in, one level of component nesting, matching the one confirmed-
  working depth on this site (see IllustrationInsteadSee's note on the
  markdown-link-inside-nested-component-children bug).
-->
<div class="speed-modal-card">
  {#if children}
    {@render children()}
  {/if}
</div>

<style>
  .speed-modal-card {
    margin: 1.5rem 0;
    padding: 1.1rem 1.25rem;
    border: 1px solid var(--cw-hairline);
    border-radius: var(--cw-radius-lg);
    background: var(--cw-paper-raised);
  }

  /* The four non-automobile patterns pass only a ModalHierarchySection,
     no SpeedLimitSection: when it's the card's first (only) child, the
     divider that normally separates Section A from Section B has
     nothing above it to divide from. */
  .speed-modal-card > :global(.modal-hierarchy-section:first-child) {
    margin-top: 0;
    padding-top: 0;
    border-top: none;
  }
</style>
