<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    /** e.g. "Paired", "Single-condition", "Diagram", "Descriptive", "Conditional" */
    type: string
    /** e.g. "Segment / cross-section (~2.8:1)" */
    format: string
    children?: Snippet
  }

  const { type, format, children }: Props = $props()
</script>

<!--
  Placeholder-box renderer for the Brand Guide's illustration spec (Ticket
  F): every pattern page gets a real vector illustration eventually, but
  until that art is drawn, this renders the same structured
  scene/callout/citation content the final artwork will carry, so pages
  don't sit blocked on illustration production. Composed from
  IllustrationFrame / IllustrationCallouts / IllustrationCallout /
  IllustrationInsteadSee children, same nested-component-in-markdown
  pattern as PatternCard.
-->
<div class="illustration">
  <p class="illustration__meta"><strong>Type:</strong> {type}. <strong>Format:</strong> {format}.</p>
  <div class="illustration__body">
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>

<style>
  .illustration {
    margin: 1.5rem 0;
    padding: 1.1rem 1.25rem;
    border: 1px solid var(--cw-hairline);
    border-radius: var(--cw-radius-lg);
    background: var(--cw-paper-raised);
  }

  .illustration__meta {
    margin: 0 0 0.9rem;
    font-size: var(--cw-text-sm);
    color: var(--cw-ink-faint);
  }

  .illustration__body {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
</style>
