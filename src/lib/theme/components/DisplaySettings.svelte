<script lang="ts">
  import DisplaySettingsPanel from './DisplaySettingsPanel.svelte'

  let open = $state(false)
  let root: HTMLElement | undefined = $state()

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && open) {
      open = false
      root?.querySelector<HTMLButtonElement>('.dsb__toggle')?.focus()
    }
  }
</script>

<svelte:window
  onkeydown={onKeydown}
  onpointerdown={(e) => {
    if (open && root && !root.contains(e.target as Node))
      open = false
  }}
/>

<div class="dsb" bind:this={root}>
  <button
    type="button"
    class="dsb__toggle"
    aria-expanded={open}
    aria-controls="display-settings-panel"
    aria-label="Display settings"
    title="Display settings"
    onclick={() => (open = !open)}
  >
    <span aria-hidden="true">Aa</span>
  </button>
  {#if open}
    <div id="display-settings-panel" class="dsb__panel" role="group" aria-label="Display settings">
      <DisplaySettingsPanel />
    </div>
  {/if}
</div>

<style>
  /* Deliberately not position: relative: the panel is positioned against
     the (sticky) navbar instead, so it always opens directly below the
     whole navbar even when enlarged text wraps the navbar to two rows. */
  .dsb {
    flex-shrink: 0;
  }

  .dsb__toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: var(--cw-radius-md);
    border: 1px solid transparent;
    background: transparent;
    color: var(--cw-ink-soft);
    font-family: var(--cw-font-display);
    font-weight: 700;
    font-size: 0.9375rem;
    cursor: pointer;
  }

  .dsb__toggle:hover,
  .dsb__toggle[aria-expanded='true'] {
    color: var(--cw-ink);
    background: var(--cw-primary-soft);
  }

  .dsb__panel {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 1rem;
    z-index: 60;
    width: min(20rem, calc(100vw - 2rem));
    /* Never taller than the space below the navbar: with enlarged text or a
       short window the content scrolls inside the panel instead of running
       off-screen where it can't be reached. */
    max-height: calc(100vh - var(--cw-navbar-height) - 1.5rem);
    max-height: calc(100dvh - var(--cw-navbar-height) - 1.5rem);
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: 1rem;
    background: var(--cw-paper);
    border: 1px solid var(--cw-hairline-strong);
    border-radius: var(--cw-radius-lg);
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.18);
  }

  /* Below 940px the drawer (Sidebar.svelte) carries this panel instead:
     the navbar has no room for a sixth item at phone width. */
  @media (max-width: 940px) {
    .dsb {
      display: none;
    }
  }
</style>
