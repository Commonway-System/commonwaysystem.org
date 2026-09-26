<script lang="ts">
  import DisplaySettingsPanel from './DisplaySettingsPanel.svelte'

  let open = $state(false)
  let root: HTMLElement | undefined = $state()
  let scroller: HTMLElement | undefined = $state()
  // The "more below" hint shows while the panel overflows and disappears for
  // good (until reopened) as soon as the reader scrolls it.
  let overflows = $state(false)
  let scrolled = $state(false)

  function measure() {
    if (scroller)
      overflows = scroller.scrollHeight > scroller.clientHeight + 4
  }

  $effect(() => {
    if (!open) {
      scrolled = false
      return
    }
    if (!scroller)
      return
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(scroller)
    if (scroller.firstElementChild)
      ro.observe(scroller.firstElementChild)
    return () => ro.disconnect()
  })

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
      <div class="dsb__scroll" bind:this={scroller} onscroll={() => { if (scroller && scroller.scrollTop > 4) scrolled = true }}>
        <DisplaySettingsPanel />
      </div>
      <!-- Decorative: the scrollbar and edge shadow are the accessible cues;
           this only points sighted readers at the hidden options. -->
      <div class="dsb__more" class:dsb__more--shown={overflows && !scrolled} aria-hidden="true">
        <span class="dsb__more-label">
          Scroll for more
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
        </span>
      </div>
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
    padding: 0;
    background: var(--cw-paper);
    border: 1px solid var(--cw-hairline-strong);
    border-radius: var(--cw-radius-lg);
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.18);
    overflow: hidden;
  }

  .dsb__scroll {
    /* Never taller than the space below the navbar: with enlarged text or a
       short window the content scrolls inside the panel instead of running
       off-screen where it can't be reached. */
    max-height: calc(100vh - var(--cw-navbar-height) - 1.5rem);
    max-height: calc(100dvh - var(--cw-navbar-height) - 1.5rem);
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: 1rem;
    /* Signal that there is more to scroll to: an always-visible thin
       scrollbar (overlay scrollbars hide themselves until you scroll) plus
       the same CSS-only "scroll shadow" the table wrapper uses, vertical
       here. The two paper-colored covers scroll with the content
       (local) and hide whichever edge shadow has nothing further to show;
       the two shadows stay fixed to the panel. Shadow color follows
       --cw-ink, so it reads in dark mode too. */
    scrollbar-width: thin;
    scrollbar-color: var(--cw-ink-faint) transparent;
    background:
      linear-gradient(var(--cw-paper) 40%, transparent) 0 0 / 100% 2.5rem no-repeat local,
      linear-gradient(to top, var(--cw-paper) 40%, transparent) 0 100% / 100% 2.5rem no-repeat local,
      linear-gradient(color-mix(in srgb, var(--cw-ink) 32%, transparent), transparent) 0 0 / 100% 0.9rem no-repeat scroll,
      linear-gradient(to top, color-mix(in srgb, var(--cw-ink) 32%, transparent), transparent) 0 100% / 100% 0.9rem no-repeat scroll,
      var(--cw-paper);
  }

  /* "Scroll for more" pill at the bottom edge, only while there is more below
     and the reader hasn't scrolled yet. */
  .dsb__more {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 1.6rem 0 0.4rem;
    background: linear-gradient(to top, var(--cw-paper) 55%, transparent);
    color: var(--cw-ink-soft);
    font-size: var(--cw-text-sm);
    font-weight: 600;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  /* Text and arrow share one centered row so the arrow sits on the text's
     middle line instead of hanging below it. */
  .dsb__more-label {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    line-height: 1;
  }

  .dsb__more-label svg {
    display: block;
    flex: none;
  }

  .dsb__more--shown {
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    .dsb__more {
      transition: none;
    }
  }

  .dsb__scroll::-webkit-scrollbar {
    width: 8px;
  }
  .dsb__scroll::-webkit-scrollbar-track {
    background: transparent;
  }
  .dsb__scroll::-webkit-scrollbar-thumb {
    background: var(--cw-ink-faint);
    border-radius: var(--cw-radius-lg);
  }

  /* Below 940px the drawer (Sidebar.svelte) carries this panel instead:
     the navbar has no room for a sixth item at phone width. */
  @media (max-width: 940px) {
    .dsb {
      display: none;
    }
  }
</style>
