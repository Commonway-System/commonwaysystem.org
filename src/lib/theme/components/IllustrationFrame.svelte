<script lang="ts">
  import type { Snippet } from 'svelte'

  type Tone = 'grayscale' | 'amber'

  interface Props {
    /** Locked frame label per the Brand Guide, e.g. "Typical condition" / "Commonway recommendation". */
    label: string
    tone?: Tone
    children?: Snippet
  }

  const { label, tone = 'grayscale', children }: Props = $props()
</script>

<figure class="illustration-frame" data-tone={tone}>
  <figcaption class="illustration-frame__label">{label}</figcaption>
  <div class="illustration-frame__scene">
    {#if children}
      {@render children()}
    {/if}
  </div>
</figure>

<style>
  .illustration-frame {
    flex: 1 1 260px;
    margin: 0;
    padding: 1rem;
    border: 1px solid var(--cw-hairline-strong);
    border-radius: calc(var(--cw-radius-lg) - 0.25rem);
    background: var(--cw-paper);
  }

  /* Amber trigger applies per frame, not just per page (Brand Guide rule):
     a grayscale "typical condition" frame next to an amber-flooded
     "recommendation" frame within the same Paired illustration. */
  .illustration-frame[data-tone='amber'] {
    border-color: var(--cw-amber);
    background: var(--cw-amber-soft);
  }

  .illustration-frame__label {
    font-size: var(--cw-text-sm);
    font-weight: 600;
    margin: 0 0 0.5rem;
    color: var(--cw-ink);
  }

  .illustration-frame__scene {
    font-size: var(--cw-text-sm);
    color: var(--cw-ink);
  }

  .illustration-frame__scene :global(p:last-child) {
    margin-bottom: 0;
  }
</style>
