<script lang="ts">
  import { tick } from 'svelte'
  import { searchOpen } from '../search.js'
  import Icon from './Icon.svelte'
  import SearchPanel from './SearchPanel.svelte'

  // One dialog for the whole site, mounted once by GlobalLayout. A native
  // <dialog> opened with showModal() gives the parts that are easiest to get
  // wrong for free: focus stays inside, the rest of the page is inert, Escape
  // closes it, and focus returns to whatever opened it. The panel mounts the
  // first time it opens and then stays, so reopening keeps the last search.
  let dialog: HTMLDialogElement | undefined = $state()
  let panel: SearchPanel | undefined = $state()
  let everOpened = $state(false)

  $effect(() => {
    if (!dialog)
      return
    if ($searchOpen && !dialog.open) {
      everOpened = true
      dialog.showModal()
      document.documentElement.style.overflow = 'hidden'
      tick().then(() => panel?.focusInput(true))
    }
    else if (!$searchOpen && dialog.open) {
      dialog.close()
    }
  })

  function onClose() {
    document.documentElement.style.overflow = ''
    searchOpen.set(false)
  }

  // A click on the dialog element itself (not its panel) is a click on the backdrop.
  function onBackdropClick(event: MouseEvent) {
    if (event.target === dialog)
      searchOpen.set(false)
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog bind:this={dialog} class="sd" aria-labelledby="search-dialog-title" onclose={onClose} onclick={onBackdropClick}>
  <div class="sd__panel">
    <div class="sd__head">
      <h2 id="search-dialog-title">Search the guidebook</h2>
      <button type="button" class="sd__close" onclick={() => searchOpen.set(false)}>
        <Icon name="close" size={18} />
        <span class="cw-sr-only">Close search</span>
      </button>
    </div>
    {#if everOpened}
      <SearchPanel bind:this={panel} variant="dialog" onnavigate={() => searchOpen.set(false)} />
    {/if}
  </div>
</dialog>

<style>
  .sd {
    width: min(42rem, calc(100vw - 1.5rem));
    max-height: min(85vh, 46rem);
    max-height: min(85dvh, 46rem);
    margin: 4vh auto auto;
    padding: 0;
    border: 1px solid var(--cw-hairline-strong);
    border-radius: var(--cw-radius-lg);
    background: var(--cw-paper);
    color: var(--cw-ink);
    box-shadow: var(--cw-shadow-drawer);
    overflow: hidden;
  }

  .sd::backdrop {
    background: rgba(20, 20, 20, 0.55);
  }

  .sd__panel {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-height: inherit;
    padding: 1rem 1.25rem 1.25rem;
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  .sd__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .sd__head h2 {
    margin: 0;
    font-size: var(--cw-text-lg);
  }

  .sd__close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border: 1px solid transparent;
    border-radius: var(--cw-radius-md);
    background: transparent;
    color: var(--cw-ink-soft);
    cursor: pointer;
  }

  .sd__close:hover {
    color: var(--cw-ink);
    background: var(--cw-primary-soft);
  }

  @media (max-width: 560px) {
    .sd {
      width: calc(100vw - 1rem);
      max-height: calc(100dvh - 1rem);
      margin-top: 0.5rem;
    }
  }
</style>
