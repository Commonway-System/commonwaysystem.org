<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    /** e.g. "--type-h1" */
    token: string
    px: number
    family?: 'display' | 'body'
    weight?: number
    uppercase?: boolean
    tracking?: string
    children?: Snippet
  }

  const { token, px, family = 'body', weight = 400, uppercase = false, tracking, children }: Props = $props()
</script>

<div class="type-sample">
  <span class="type-sample__meta">{token}<br />{px}px</span>
  <span
    class="type-sample__text"
    class:type-sample__text--uppercase={uppercase}
    style:font-family={family === 'display' ? 'var(--cw-font-display)' : 'var(--cw-font-body)'}
    style:font-size="{px}px"
    style:font-weight={weight}
    style:letter-spacing={tracking}
  >
    {@render children?.()}
  </span>
</div>

<style>
  .type-sample {
    display: flex;
    align-items: baseline;
    gap: 1.25rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--cw-hairline);
  }

  .type-sample:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .type-sample:first-child {
    padding-top: 0;
  }

  .type-sample__meta {
    flex: 0 0 6rem;
    font-family: var(--cw-font-mono);
    font-size: 0.7rem;
    line-height: 1.3;
    color: var(--cw-ink-faint);
  }

  .type-sample__text {
    color: var(--cw-ink);
    line-height: 1.25;
    min-width: 0;
    overflow-wrap: break-word;
  }

  .type-sample__text--uppercase {
    text-transform: uppercase;
  }

  /* The largest sizes (--type-display, --type-h1) don't fit next to a
     fixed-width meta label on narrow screens; stack instead of overflowing. */
  @media (max-width: 480px) {
    .type-sample {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.35rem;
    }

    .type-sample__meta {
      flex: 0 0 auto;
    }
  }
</style>
