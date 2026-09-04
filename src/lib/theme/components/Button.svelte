<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    variant?: 'primary' | 'secondary' | 'dark' | 'disabled'
    children?: Snippet
  }

  const { variant = 'secondary', children }: Props = $props()
</script>

<!--
  Secondary/disabled use theme tokens (--cw-ink/--cw-paper etc.), so they
  adapt correctly to dark mode like any other UI element. Primary and
  dark are self-contained fills with a fixed, guide-verified text pairing
  (--cw-ink-fixed / --cw-paper-fixed), same reasoning as Citation.svelte's
  badges: the exact contrast ratio documented on /about/brand-guide/ only
  holds for that specific pairing, not "whichever ink the current theme
  happens to use."
-->
<button type="button" class="cw-demo-btn" data-variant={variant} disabled={variant === 'disabled'}>
  {@render children?.()}
</button>

<style>
  .cw-demo-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.55rem 1.1rem;
    border-radius: var(--cw-radius-md);
    font-family: var(--cw-font-body);
    font-size: var(--cw-text-sm);
    font-weight: 600;
    border: 1px solid transparent;
    cursor: pointer;
  }

  .cw-demo-btn[data-variant='primary'] {
    background: var(--cw-teal);
    color: var(--cw-ink-fixed);
    text-shadow: 0 0 3px #ffffff;
  }

  .cw-demo-btn[data-variant='secondary'] {
    background: transparent;
    color: var(--cw-ink);
    border-color: var(--cw-ink);
  }

  .cw-demo-btn[data-variant='dark'] {
    background: var(--cw-ink-fixed);
    color: var(--cw-paper-fixed);
  }

  .cw-demo-btn[data-variant='disabled'] {
    background: color-mix(in srgb, var(--cw-ink) 12%, var(--cw-paper));
    color: var(--cw-ink-faint);
    cursor: not-allowed;
  }
</style>
