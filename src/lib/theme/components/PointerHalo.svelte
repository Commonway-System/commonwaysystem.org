<script lang="ts">
  import { displaySettings } from '../display-settings.js'

  let el: HTMLDivElement | undefined = $state()
  let visible = $state(false)

  // Mouse/pen only: on touch there is no hovering pointer to highlight.
  function onMove(e: PointerEvent) {
    if (!el)
      return
    if (e.pointerType === 'touch') {
      visible = false
      return
    }
    visible = true
    el.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
  }
</script>

<svelte:window onpointermove={onMove} />
<svelte:document onpointerleave={() => (visible = false)} />

{#if $displaySettings.pointerHalo}
  <div class="halo" class:halo--visible={visible} bind:this={el} aria-hidden="true"></div>
{/if}

<style>
  .halo {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2000;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    /* Fill kept at 20% so text underneath stays above 4.5:1 even in dark
       mode (the teal accent text measures 5.0:1 under it; 30% dropped it to
       3.8:1); the ring keeps the edge visible where a faint fill alone
       would barely register. Never intercepts clicks. */
    background: rgba(255, 214, 10, 0.2);
    border: 2px solid rgba(255, 214, 10, 0.85);
    pointer-events: none;
    opacity: 0;
  }

  .halo--visible {
    opacity: 1;
  }
</style>
