<script lang="ts">
  // A filter group for a long list: a "find" box, a scrolling checklist with
  // item counts, a selected-count in the legend and a clear link. Used for
  // Source, Pattern and Retrofit Strategy in MediaFilters.svelte.
  interface Option { value: string, label: string, count: number }

  interface Props {
    legend: string
    /** Singular noun for the find box and the clear link, e.g. "source". */
    noun: string
    /** Plural noun for the clear link, e.g. "retrofit strategies". */
    plural: string
    options: Option[]
    selected: Set<string>
    ontoggle: (value: string) => void
    onclear: () => void
  }

  const { legend, noun, plural, options, selected, ontoggle, onclear }: Props = $props()

  // Two copies of the filters mount (desktop column, phone drawer), so ids
  // must be unique per instance.
  const uid = $props.id()

  let query = $state('')
  const shown = $derived(options.filter(o => o.label.toLowerCase().includes(query.trim().toLowerCase())))
</script>

<details class="mfl">
  <summary id="{uid}-label" class="mfl__summary">
    <span class="mfl__legend">{legend}{#if selected.size > 0}<span class="mfl__selected">&nbsp;({selected.size} selected)</span>{/if}</span>
    <svg class="mfl__chevron" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
  </summary>
  <div class="mfl__body" role="group" aria-labelledby="{uid}-label">
    <input class="mfl__search" type="search" placeholder="Find a {noun}" aria-label="Find a {noun}" bind:value={query} />
    <div class="mfl__list">
      {#each shown as { value, label, count } (value)}
        <label class="mfl__check">
          <input type="checkbox" checked={selected.has(value)} onchange={() => ontoggle(value)} />
          <span class="mfl__name">{label}</span>
          <span class="mfl__count">{count}</span>
        </label>
      {:else}
        <p class="mfl__empty">No {noun} matches "{query}".</p>
      {/each}
    </div>
    {#if selected.size > 0}
      <button type="button" class="mfl__clear" onclick={onclear}>Clear {plural}</button>
    {/if}
  </div>
</details>

<style>
  /* Closed by default: a long filter group costs one line until opened, and
     the selected count stays visible in the closed heading. */
  .mfl {
    margin: 0;
    border-bottom: 1px solid var(--cw-hairline);
    padding-bottom: 0.5rem;
  }

  .mfl__summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    min-height: 2rem;
    cursor: pointer;
    list-style: none;
  }

  .mfl__summary::-webkit-details-marker {
    display: none;
  }

  .mfl__summary:focus-visible {
    outline: 2px solid var(--cw-teal);
    outline-offset: 2px;
    border-radius: var(--cw-radius-sm);
  }

  .mfl__legend {
    font-size: var(--cw-text-sm);
    font-weight: 600;
    color: var(--cw-ink);
  }

  .mfl__chevron {
    flex: none;
    color: var(--cw-ink-soft);
    transition: transform 0.15s ease;
  }

  .mfl[open] > .mfl__summary .mfl__chevron {
    transform: rotate(180deg);
  }

  @media (prefers-reduced-motion: reduce) {
    .mfl__chevron {
      transition: none;
    }
  }

  .mfl__body {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding-top: 0.4rem;
  }

  .mfl__selected {
    font-weight: 400;
    color: var(--cw-ink-soft);
  }

  .mfl__search {
    font: inherit;
    font-size: var(--cw-text-sm);
    padding: 0.5rem 0.65rem;
    border-radius: var(--cw-radius-sm);
    border: 1px solid var(--cw-hairline-strong);
    background: var(--cw-paper);
    color: var(--cw-ink);
  }

  .mfl__search:focus-visible,
  .mfl__check input:focus-visible {
    outline: 2px solid var(--cw-teal);
    outline-offset: 1px;
    border-radius: var(--cw-radius-sm);
  }

  /* Long lists scroll in their own box instead of pushing the rest of the
     filters off screen. */
  .mfl__list {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    max-height: 9rem;
    overflow-y: auto;
    padding: 0.35rem 0.5rem;
    border: 1px solid var(--cw-hairline);
    border-radius: var(--cw-radius-sm);
    scrollbar-width: thin;
    scrollbar-color: var(--cw-ink-faint) transparent;
    /* Same CSS-only scroll shadow as the Display settings panel: two
       paper-colored covers scroll with the content (local) and hide
       whichever edge shadow has nothing further to show; the two shadows
       stay fixed to the box. Shadow color follows --cw-ink, so it reads in
       dark mode too. */
    background:
      linear-gradient(var(--cw-paper) 40%, transparent) 0 0 / 100% 1.75rem no-repeat local,
      linear-gradient(to top, var(--cw-paper) 40%, transparent) 0 100% / 100% 1.75rem no-repeat local,
      linear-gradient(color-mix(in srgb, var(--cw-ink) 28%, transparent), transparent) 0 0 / 100% 0.75rem no-repeat scroll,
      linear-gradient(to top, color-mix(in srgb, var(--cw-ink) 28%, transparent), transparent) 0 100% / 100% 0.75rem no-repeat scroll,
      var(--cw-paper);
  }

  .mfl__check {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: var(--cw-text-sm);
    font-weight: 400;
    color: var(--cw-ink-soft);
  }

  .mfl__name {
    flex: 1 1 auto;
    min-width: 0;
  }

  .mfl__count {
    flex: none;
    font-size: var(--cw-text-xs, 0.75rem);
    font-variant-numeric: tabular-nums;
    color: var(--cw-ink-soft);
  }

  .mfl__empty {
    margin: 0;
    font-size: var(--cw-text-sm);
    color: var(--cw-ink-soft);
  }

  .mfl__clear {
    align-self: flex-start;
    min-height: 24px;
    padding: 0.2rem 0;
    border: none;
    background: none;
    font: inherit;
    font-size: var(--cw-text-sm);
    color: var(--cw-link);
    text-decoration: underline;
    cursor: pointer;
  }
</style>
