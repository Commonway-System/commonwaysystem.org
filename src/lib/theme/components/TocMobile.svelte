<script lang="ts">
  import { tick } from 'svelte'
  import { afterNavigate } from '$app/navigation'
  import { pageAnchors } from '../layout.js'
  import { tocState } from '../toc-tracking.js'

  let open = $state(false)
  let root: HTMLElement | undefined = $state()

  const currentText = $derived($pageAnchors.find((a) => a.id === $tocState.current)?.text ?? 'Jump to a section')

  afterNavigate(() => {
    open = false
  })

  async function pick(id: string, event: MouseEvent) {
    event.preventDefault()
    open = false
    await tick()
    // scroll-padding-top on <html> (base.css) clears the sticky navbar + this
    // bar. Focus moves to the target too, so the next Tab continues from the
    // section the reader jumped to (preventDefault skipped the browser's own
    // focus-navigation-starting-point behavior for hash links).
    const target = document.getElementById(id)
    if (target) {
      if (!target.hasAttribute('tabindex'))
        target.setAttribute('tabindex', '-1')
      target.scrollIntoView({ block: 'start' })
      target.focus({ preventScroll: true })
    }
    history.replaceState(null, '', `#${id}`)
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && open) {
      open = false
      root?.querySelector<HTMLButtonElement>('.toc-mobile__toggle')?.focus()
    }
  }
</script>

<svelte:window
  onkeydown={onKeydown}
  onpointerdown={(e) => {
    // Tap/click outside the bar closes the open list. Focus stays wherever
    // the reader's tap put it (no forced refocus, unlike Escape).
    if (open && root && !root.contains(e.target as Node))
      open = false
  }}
/>

{#if $pageAnchors.length >= 2}
  <div class="toc-mobile" bind:this={root}>
    <button
      type="button"
      class="toc-mobile__toggle"
      aria-expanded={open}
      aria-controls="toc-mobile-list"
      onclick={() => (open = !open)}
    >
      <span class="toc-mobile__label">On this page</span>
      <span class="toc-mobile__current">{currentText}</span>
      <svg class="toc-mobile__chevron" class:toc-mobile__chevron--open={open} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
    </button>
    {#if open}
      <nav id="toc-mobile-list" class="toc-mobile__list" aria-label="On this page">
        {#each $pageAnchors as anchor (anchor.id)}
          <a
            href="#{anchor.id}"
            class="toc-mobile__link"
            class:toc-mobile__link--visible={$tocState.visible.includes(anchor.id)}
            class:toc-mobile__link--current={$tocState.current === anchor.id}
            aria-current={$tocState.current === anchor.id ? 'location' : undefined}
            style:--depth={anchor.depth - 2}
            onclick={(e) => pick(anchor.id, e)}
          >{anchor.text}</a>
        {/each}
      </nav>
    {/if}
  </div>
{/if}

<style>
  /* Only where the desktop rail (Toc.svelte, hidden <=1180px) isn't shown. */
  .toc-mobile {
    display: none;
  }

  @media (max-width: 1180px) {
    .toc-mobile {
      display: block;
      position: sticky;
      top: calc(var(--cw-navbar-height) + 0.75rem);
      z-index: 5;
      margin: -1rem 0 1.25rem;
      background: var(--cw-paper);
      border: 1px solid var(--cw-hairline-strong);
      border-radius: 0.5rem;
      font-size: 0.875rem;
    }
  }

  .toc-mobile__toggle {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    width: 100%;
    min-height: 44px;
    padding: 0.5rem 0.75rem;
    background: none;
    border: 0;
    color: var(--cw-ink);
    font: inherit;
    text-align: left;
    cursor: pointer;
  }

  .toc-mobile__label {
    flex: none;
    font-family: var(--cw-font-display);
    font-weight: 600;
    color: var(--cw-ink-faint);
  }

  .toc-mobile__current {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 600;
    color: var(--cw-primary);
  }

  .toc-mobile__chevron {
    flex: none;
    transition: transform 0.15s;
  }

  .toc-mobile__chevron--open {
    transform: rotate(180deg);
  }

  @media (prefers-reduced-motion: reduce) {
    .toc-mobile__chevron {
      transition: none;
    }
  }

  .toc-mobile__list {
    display: flex;
    flex-direction: column;
    max-height: min(60vh, 24rem);
    overflow-y: auto;
    padding: 0.25rem 0;
    border-top: 1px solid var(--cw-hairline);
  }

  .toc-mobile__link {
    display: flex;
    align-items: center;
    min-height: 44px;
    padding: 0.25rem 0.75rem 0.25rem calc(0.75rem + var(--depth, 0) * 1rem);
    color: var(--cw-ink-soft);
    text-decoration: none;
    line-height: 1.3;
    border-left: 3px solid transparent;
  }

  .toc-mobile__link--visible {
    color: var(--cw-ink);
    font-weight: 500;
  }

  .toc-mobile__link--current {
    color: var(--cw-primary);
    font-weight: 700;
    border-left-color: var(--cw-primary);
  }
</style>
