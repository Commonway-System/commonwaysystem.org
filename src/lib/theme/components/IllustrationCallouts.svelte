<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    children?: Snippet
  }

  const { children }: Props = $props()
</script>

<div class="illustration-callouts">
  <p class="illustration-callouts__label">Callouts</p>
  <ol>
    {#if children}
      {@render children()}
    {/if}
  </ol>
</div>

<style>
  .illustration-callouts {
    flex: 1 1 100%;
  }

  .illustration-callouts__label {
    font-size: var(--cw-text-sm);
    font-weight: 600;
    margin: 0.25rem 0 0.4rem;
    color: var(--cw-ink);
  }

  .illustration-callouts ol {
    margin: 0;
    padding-left: 1.4rem;
  }

  .illustration-callouts :global(li) {
    margin-bottom: 0.35rem;
    font-size: var(--cw-text-sm);
  }
</style>
