<script lang="ts">
  import { onMount } from 'svelte'
  import options from 'virtual:commonway/options'
  import { consentPanelOpen, setConsent } from '../consent.js'

  // Shown on the first visit (and again from the footer's "Cookie settings")
  // only when Google Analytics is configured, since it is the only thing on
  // the publication that sets cookies. Mounted only after hydration: the
  // prerendered HTML can't know a reader's stored choice.
  let mounted = $state(false)
  let el: HTMLElement | undefined = $state()
  onMount(() => (mounted = true))

  const show = $derived(Boolean(options.googleAnalyticsId) && mounted && $consentPanelOpen)

  // While the banner covers the bottom of the viewport, reserve its height
  // as scroll room (base.css reads --cw-consent-height) so the page's last
  // lines can scroll clear of it and keyboard focus is never hidden under it.
  $effect(() => {
    const root = document.documentElement
    if (!show || !el) {
      root.style.removeProperty('--cw-consent-height')
      return
    }
    const ro = new ResizeObserver(() => {
      if (el)
        root.style.setProperty('--cw-consent-height', `${el.offsetHeight + 16}px`)
    })
    ro.observe(el)
    return () => {
      ro.disconnect()
      root.style.removeProperty('--cw-consent-height')
    }
  })
</script>

{#if show}
  <section class="consent" aria-label="Cookie consent" bind:this={el} data-pagefind-ignore>
    <p>
      Commonway System would like to use Google Analytics cookies to see which pages get read.
      They stay off unless you accept, and the publication works the same either way.
      See the <a href="/about/privacy-policy/#cookies">Privacy Policy</a>.
    </p>
    <div class="consent__actions">
      <button type="button" class="consent__btn" onclick={() => setConsent('denied')}>Decline</button>
      <button type="button" class="consent__btn" onclick={() => setConsent('granted')}>Accept</button>
    </div>
  </section>
{/if}

<style>
  .consent {
    position: fixed;
    left: 1rem;
    right: 1rem;
    bottom: 1rem;
    z-index: 55;
    max-width: 44rem;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem 1.25rem;
    padding: 1rem 1.25rem;
    background: var(--cw-paper-raised);
    color: var(--cw-ink);
    border: 1px solid var(--cw-hairline-strong);
    border-left: 4px solid var(--cw-primary);
    border-radius: var(--cw-radius-lg);
    box-shadow: 0 10px 32px rgba(0, 0, 0, 0.22);
  }

  .consent p {
    flex: 1 1 20rem;
    margin: 0;
    font-size: var(--cw-text-sm);
    line-height: 1.5;
  }

  .consent__actions {
    display: flex;
    gap: 0.6rem;
  }

  /* Accept and Decline look the same on purpose: neither choice is nudged. */
  .consent__btn {
    min-height: 2.5rem;
    padding: 0 1.1rem;
    border: 1px solid var(--cw-ink);
    border-radius: var(--cw-radius-md);
    background: var(--cw-ink);
    color: var(--cw-paper);
    font: 600 var(--cw-text-sm) / 1 var(--cw-font-body);
    cursor: pointer;
  }

  .consent__btn:hover {
    background: var(--cw-ink-soft);
    border-color: var(--cw-ink-soft);
  }

  @media (forced-colors: active) {
    .consent {
      border: 2px solid CanvasText;
    }
    .consent__btn {
      border: 2px solid ButtonText;
    }
  }

  @media print {
    .consent {
      display: none;
    }
  }
</style>
