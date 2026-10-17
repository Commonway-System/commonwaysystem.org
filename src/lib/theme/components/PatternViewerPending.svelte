<script lang="ts">
  import type { RendererProps } from '$lib/viewer/types'

  // Stand-in for a view kind whose renderer isn't built yet (all of them, as
  // of the viewer shell). Same props as a real renderer, so swapping one in
  // is a one-line change in PatternViewerStage's registry.
  const { label, descriptionId }: RendererProps = $props()
</script>

<div class="pvp" role="img" aria-label={label} aria-describedby={descriptionId}>
  <p class="pvp__title">{label}</p>
  <p class="pvp__note">This drawing hasn't been built yet. The description below says what it will show.</p>
</div>

<style>
  .pvp {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    width: 100%;
    height: 100%;
    padding: 1rem;
    border: 2px dashed var(--cw-hairline-strong);
    border-radius: var(--cw-radius-md);
    text-align: center;
  }

  .pvp__title {
    margin: 0;
    font-weight: 600;
    color: var(--cw-ink);
  }

  .pvp__note {
    margin: 0;
    max-width: 28rem;
    font-size: var(--cw-text-sm);
    color: var(--cw-ink-soft);
  }
</style>
