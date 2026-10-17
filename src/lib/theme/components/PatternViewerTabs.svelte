<script lang="ts">
  import type { ViewSpec } from '$lib/viewer/types'

  // WAI-ARIA tabs: one tab stop for the whole row (roving tabindex), arrow
  // keys move between tabs, Home/End jump to the ends. Switching a view is
  // cheap, so a tab activates as soon as it gets focus. With a single view
  // there is nothing to switch, so a plain label is shown instead.
  interface Props {
    views: ViewSpec[]
    active: string
    /** Prefix for each tab's id; the tab for view "plan" is `${idPrefix}-tab-plan`. */
    idPrefix: string
    panelId: string
    onselect: (id: string) => void
  }

  const { views, active, idPrefix, panelId, onselect }: Props = $props()

  let list: HTMLDivElement | undefined = $state()

  function onkeydown(event: KeyboardEvent) {
    const i = views.findIndex(v => v.id === active)
    let next = -1
    if (event.key === 'ArrowRight')
      next = (i + 1) % views.length
    else if (event.key === 'ArrowLeft')
      next = (i - 1 + views.length) % views.length
    else if (event.key === 'Home')
      next = 0
    else if (event.key === 'End')
      next = views.length - 1
    if (next < 0)
      return
    event.preventDefault()
    onselect(views[next].id)
    list?.querySelector<HTMLElement>(`#${CSS.escape(`${idPrefix}-tab-${views[next].id}`)}`)?.focus()
  }
</script>

{#if views.length > 1}
  <!-- svelte-ignore a11y_interactive_supports_focus -->
  <div class="pvt" role="tablist" aria-label="Views" bind:this={list} {onkeydown}>
    {#each views as view (view.id)}
      <button
        type="button"
        role="tab"
        class="pvt__tab"
        id="{idPrefix}-tab-{view.id}"
        aria-selected={view.id === active}
        aria-controls={panelId}
        tabindex={view.id === active ? 0 : -1}
        onclick={() => onselect(view.id)}
      >{view.label}</button>
    {/each}
  </div>
{:else}
  <p class="pvt__single" id="{idPrefix}-tab-{views[0]?.id}">{views[0]?.label}</p>
{/if}

<style>
  .pvt {
    display: flex;
    gap: 0.25rem;
    min-width: 0;
    overflow-x: auto;
    scrollbar-width: thin;
  }

  .pvt__tab {
    flex: 0 0 auto;
    min-height: 2.25rem;
    padding: 0.35rem 0.8rem;
    border: 1px solid transparent;
    border-radius: var(--cw-radius-md, 0.5rem);
    background: transparent;
    color: var(--cw-ink-soft);
    font: inherit;
    font-size: var(--cw-text-sm, 0.9rem);
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
  }

  .pvt__tab:hover {
    color: var(--cw-ink);
    background: var(--cw-hairline);
  }

  .pvt__tab[aria-selected='true'] {
    color: var(--cw-primary);
    border-color: var(--cw-primary);
    background: var(--cw-primary-soft);
  }

  @media (forced-colors: active) {
    .pvt__tab[aria-selected='true'] {
      border-color: Highlight;
      border-width: 2px;
    }
  }

  .pvt__single {
    margin: 0;
    padding: 0.35rem 0.25rem;
    font-size: var(--cw-text-sm, 0.9rem);
    font-weight: 600;
    color: var(--cw-ink);
  }
</style>
