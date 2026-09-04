<script lang="ts">
  interface Props {
    hex: string
    label?: string
  }

  const { hex, label }: Props = $props()
</script>

<div class="swatch">
  <span class="swatch__chip" style:background={hex}></span>
  <span class="swatch__text">
    {#if label}<span class="swatch__label">{label}</span>{/if}
    <span class="swatch__hex">{hex}</span>
  </span>
</div>

<style>
  .swatch {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
  }

  .swatch__chip {
    width: 2rem;
    height: 2rem;
    flex: 0 0 auto;
    border-radius: var(--cw-radius-sm);
    border: 1px solid var(--cw-hairline-strong);
  }

  .swatch__text {
    display: flex;
    flex-direction: column;
    line-height: 1.25;
  }

  .swatch__label {
    font-size: var(--cw-text-sm);
    color: var(--cw-ink);
  }

  .swatch__hex {
    font-family: var(--cw-font-mono);
    font-size: 0.75rem;
    color: var(--cw-ink-faint);
  }
</style>
