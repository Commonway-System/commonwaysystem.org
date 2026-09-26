<script lang="ts">
  import { displaySettings } from '../display-settings.js'
  import type { RulerDim } from '../display-settings.js'

  // Two shaded panels with a clear window between them, so 1-3 lines of text
  // stand out. Follows the mouse, pen or a finger; from the keyboard it follows
  // focus, and Alt+Up / Alt+Down move it. Never intercepts clicks. Only the
  // ruler element's own inline style changes while moving (not <html>'s), so
  // following the pointer doesn't restyle the whole page.
  let el: HTMLDivElement | undefined = $state()
  let y = 0
  let started = false

  const dimAlpha: Record<RulerDim, number> = { light: 0.35, medium: 0.6, dark: 0.8 }

  function place(next: number) {
    started = true
    y = Math.max(0, Math.min(window.innerHeight, next))
    el?.style.setProperty('--rr-y', `${y}px`)
  }

  // On first show, start near the upper third, where reading usually begins.
  $effect(() => {
    if ($displaySettings.readingRuler && el)
      place(started ? y : window.innerHeight * 0.35)
  })

  function onPointerMove(e: PointerEvent) {
    if ($displaySettings.readingRuler && e.pointerType !== 'touch')
      place(e.clientY)
  }

  // Touch: pointer events are cancelled once the browser starts scrolling,
  // touch events keep coming, so the window can follow a finger mid-scroll.
  function onTouch(e: TouchEvent) {
    if ($displaySettings.readingRuler && e.touches[0])
      place(e.touches[0].clientY)
  }

  function onFocusIn(e: FocusEvent) {
    if (!$displaySettings.readingRuler || !(e.target instanceof HTMLElement))
      return
    const r = e.target.getBoundingClientRect()
    if (r.height > 0 && r.bottom > 0 && r.top < window.innerHeight)
      place(r.top + Math.min(r.height, 80) / 2)
  }

  function onKeydown(e: KeyboardEvent) {
    if (!$displaySettings.readingRuler || !e.altKey || e.ctrlKey || e.metaKey)
      return
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown')
      return
    e.preventDefault()
    const step = 1.7 * parseFloat(getComputedStyle(document.documentElement).fontSize)
    place(y + (e.key === 'ArrowDown' ? step : -step))
  }
</script>

<svelte:window onpointermove={onPointerMove} ontouchstart={onTouch} ontouchmove={onTouch} onfocusin={onFocusIn} onkeydown={onKeydown} />

{#if $displaySettings.readingRuler}
  <div
    class="rr"
    bind:this={el}
    aria-hidden="true"
    style:--rr-lines={$displaySettings.rulerLines}
    style:--rr-alpha={dimAlpha[$displaySettings.rulerDim]}
  >
    <div class="rr__shade rr__shade--top"></div>
    <div class="rr__shade rr__shade--bottom"></div>
  </div>
{/if}

<style>
  /* Below the navbar (z 50), and the shade starts under it: the navbar is
     slightly translucent, so shading beneath it would dim its text below
     contrast. The header and the Display settings panel, where the ruler
     is adjusted, stay clear and usable. */
  .rr {
    --rr-y: 35vh;
    --rr-h: calc(var(--rr-lines, 2) * 1.7rem + 0.6rem);
    position: fixed;
    inset: 0;
    z-index: 40;
    pointer-events: none;
  }

  .rr__shade {
    position: absolute;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, var(--rr-alpha, 0.6));
  }

  /* A thin teal edge keeps the window visible even at the lightest shading. */
  .rr__shade--top {
    top: var(--cw-navbar-height, 0px);
    height: max(0px, calc(var(--rr-y) - var(--rr-h) / 2 - var(--cw-navbar-height, 0px)));
    border-bottom: 2px solid var(--cw-primary);
  }

  .rr__shade--bottom {
    top: max(var(--cw-navbar-height, 0px), calc(var(--rr-y) + var(--rr-h) / 2));
    bottom: 0;
    border-top: 2px solid var(--cw-primary);
  }

  /* Forced colors turn these translucent panels opaque, which would hide the
     whole page; the setting simply does nothing there. */
  @media (forced-colors: active), print {
    .rr {
      display: none;
    }
  }
</style>
