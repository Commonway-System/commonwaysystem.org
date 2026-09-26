<script lang="ts">
  import { onMount } from 'svelte'
  import { replaceState } from '$app/navigation'
  import { page } from '$app/state'
  import { SEARCH_FILTER_GROUPS } from '../search-meta.js'
  import { searchSite } from '../search.js'
  import type { SearchOutcome } from '../search.js'
  import Icon from './Icon.svelte'

  /**
   * The whole search interface: input, filters, live result count, results.
   * Two mounts share it: the dialog opened from the navbar (variant
   * 'dialog', 8 results plus a link to the full page) and the /search/ page
   * (variant 'page', 20 at a time, state mirrored into the URL so a search
   * is linkable). Results are ordinary links; nothing here needs a pointer.
   */
  interface Props {
    variant?: 'dialog' | 'page'
    /** Called when a result link is clicked (the dialog closes itself). */
    onnavigate?: () => void
  }

  const { variant = 'page', onnavigate }: Props = $props()

  const inputId = $derived(`search-input-${variant}`)
  const hintId = $derived(`search-hint-${variant}`)
  // A component is mounted with one fixed variant, so reading it once is intended.
  // svelte-ignore state_referenced_locally
  const pageSize = variant === 'dialog' ? 8 : 20

  let root: HTMLElement | undefined = $state()
  let inputEl: HTMLInputElement | undefined = $state()
  let query = $state('')
  let selected = $state<Record<string, string[]>>({})
  let limit = $state(pageSize)
  let status = $state<'idle' | 'loading' | 'ready' | 'unavailable'>('idle')
  let outcome = $state<SearchOutcome | null>(null)
  let ready = $state(false)

  let runId = 0

  const trimmed = $derived(query.trim())

  onMount(() => {
    if (variant === 'page') {
      const params = page.url.searchParams
      query = params.get('q') ?? ''
      selected = Object.fromEntries(
        SEARCH_FILTER_GROUPS.map(g => [g.key, params.getAll(g.key)]).filter(([, v]) => v.length),
      )
    }
    ready = true
  })

  // Re-run whenever the query, the filters or the "show more" limit change.
  // The delay keeps a fast typist from firing one search per keystroke.
  $effect(() => {
    if (!ready)
      return
    const q = trimmed
    const filters = JSON.parse(JSON.stringify(selected)) as Record<string, string[]>
    const max = limit
    if (variant === 'page')
      syncUrl(q, filters)
    if (!q) {
      runId++
      outcome = null
      status = 'idle'
      return
    }
    status = 'loading'
    const timer = setTimeout(() => run(q, filters, max), 160)
    return () => clearTimeout(timer)
  })

  async function run(q: string, filters: Record<string, string[]>, max: number) {
    const id = ++runId
    try {
      const result = await searchSite(q, filters, max)
      if (id !== runId)
        return
      outcome = result
      status = 'ready'
    }
    catch (error) {
      if (id !== runId)
        return
      if (import.meta.env.DEV)
        console.info('Search index not found. Run `pnpm run build` once so the dev server can serve build/pagefind/.', error)
      status = 'unavailable'
    }
  }

  function searchUrl(q: string, filters: Record<string, string[]>) {
    const params = new URLSearchParams()
    if (q)
      params.set('q', q)
    for (const [key, values] of Object.entries(filters)) {
      for (const value of values)
        params.append(key, value)
    }
    const qs = params.toString()
    return `/search/${qs ? `?${qs}` : ''}`
  }

  function syncUrl(q: string, filters: Record<string, string[]>) {
    const next = searchUrl(q, filters)
    // Compare as parsed parameters, not raw text: the address bar may encode
    // the same query differently ("%20" vs "+"), and an unchanged search must
    // not touch history at all (this effect first runs during startup, before
    // SvelteKit's router is ready, when replaceState throws).
    const current = new URLSearchParams(page.url.search).toString()
    const wanted = new URLSearchParams(next.split('?')[1] ?? '').toString()
    if (current === wanted)
      return
    try {
      replaceState(next, page.state)
    }
    catch {
      // Router not ready yet; the next change to the search will sync the URL.
    }
  }

  function toggle(key: string, value: string, on: boolean) {
    const current = selected[key] ?? []
    selected = { ...selected, [key]: on ? [...current, value] : current.filter(v => v !== value) }
    limit = pageSize
  }

  function clearFilters() {
    selected = {}
    limit = pageSize
  }

  const hasFilters = $derived(Object.values(selected).some(v => v.length > 0))
  const selectedCount = $derived(Object.values(selected).reduce((n, v) => n + v.length, 0))

  const groups = $derived(
    SEARCH_FILTER_GROUPS.map((group) => {
      const values = (outcome?.facets[group.key] ?? [])
        .filter(v => v.count > 0 || selected[group.key]?.includes(v.value))
        .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value))
      return { ...group, values }
    }).filter(group => group.values.length > 0),
  )

  const announcement = $derived.by(() => {
    if (!trimmed)
      return ''
    if (status === 'loading')
      return 'Searching'
    if (status !== 'ready' || !outcome)
      return ''
    if (outcome.total === 0)
      return `No results for ${trimmed}`
    const count = `${outcome.total} result${outcome.total === 1 ? '' : 's'}`
    return outcome.hits.length < outcome.total ? `${count}, showing the first ${outcome.hits.length}` : count
  })

  // If a small copy is missing (a forgotten `pnpm run thumbs`), show the full-size original instead.
  function useOriginal(event: Event, original?: string) {
    const img = event.currentTarget as HTMLImageElement
    if (original && !img.dataset.original) {
      img.dataset.original = 'true'
      img.src = original
    }
  }

  function titleLinks(): HTMLAnchorElement[] {
    return root ? Array.from(root.querySelectorAll<HTMLAnchorElement>('a.sp__title')) : []
  }

  // Arrow keys move between results (Tab still works too). From the input,
  // Down goes to the first result; from the first result, Up returns to
  // the input. Enter in the dialog's input opens the top result.
  function onInputKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      const first = titleLinks()[0]
      if (first) {
        event.preventDefault()
        first.focus()
      }
    }
    else if (event.key === 'Escape' && variant === 'dialog') {
      // A type=search input clears itself on Escape and swallows the key, so
      // a second press would be needed to close the dialog. Close directly.
      event.preventDefault()
      onnavigate?.()
    }
    else if (event.key === 'Enter' && variant === 'dialog') {
      const first = titleLinks()[0]
      if (first && status === 'ready') {
        event.preventDefault()
        first.click()
      }
    }
  }

  function onResultsKeydown(event: KeyboardEvent) {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp')
      return
    const active = document.activeElement as HTMLElement | null
    const item = active?.closest('li')
    const current = item?.querySelector<HTMLAnchorElement>('a.sp__title')
    const links = titleLinks()
    const index = current ? links.indexOf(current) : -1
    if (index < 0)
      return
    event.preventDefault()
    if (event.key === 'ArrowDown')
      links[Math.min(index + 1, links.length - 1)]?.focus()
    else if (index === 0)
      inputEl?.focus()
    else
      links[index - 1]?.focus()
  }

  export function focusInput(selectText = false) {
    inputEl?.focus()
    if (selectText)
      inputEl?.select()
  }
</script>

<div class="sp" class:sp--dialog={variant === 'dialog'} bind:this={root}>
  <form class="sp__form" role="search" onsubmit={(event) => event.preventDefault()}>
    <label class="cw-sr-only" for={inputId}>Search the guidebook</label>
    <div class="sp__field">
      <Icon name="search" size={20} />
      <input
        bind:this={inputEl}
        bind:value={query}
        id={inputId}
        class="sp__input"
        type="search"
        placeholder="Search patterns, guides, media, or a Pattern ID"
        autocomplete="off"
        autocapitalize="off"
        spellcheck="false"
        enterkeyhint="search"
        aria-describedby={hintId}
        oninput={() => (limit = pageSize)}
        onkeydown={onInputKeydown}
      />
    </div>
    <p id={hintId} class="sp__hint">
      {#if variant === 'dialog'}
        Arrow keys move through results; Enter opens the first.
      {:else}
        Try a topic, a street type, or a Pattern ID such as LOC-DEF-01.
      {/if}
    </p>
    <p class="sp__browse">
      Prefer to browse? Open the <a href="/about/sitemap/" onclick={onnavigate}>Site Map</a>.
    </p>
  </form>

  <noscript>
    <p class="sp__notice">
      Search needs JavaScript. Without it, browse the <a href="/patterns/">Pattern Index</a>,
      the <a href="/retrofits/">Retrofit Strategy Index</a>, or the <a href="/text/all-pages/">text-only list of every page</a>.
    </p>
  </noscript>

  <div class="cw-sr-only" role="status">{announcement}</div>

{#snippet filterControls()}
    <div class="sp__filters">
      {#each groups as group (group.key)}
        <fieldset class="sp__group">
          <legend>{group.label}</legend>
          {#each group.values as facet (facet.value)}
            <label class="sp__chip">
              <input
                type="checkbox"
                checked={selected[group.key]?.includes(facet.value) ?? false}
                onchange={(event) => toggle(group.key, facet.value, event.currentTarget.checked)}
              />
              <span>{facet.value} <span class="sp__count">({facet.count})</span></span>
            </label>
          {/each}
        </fieldset>
      {/each}
      {#if hasFilters}
        <button type="button" class="sp__clear" onclick={clearFilters}>Clear filters</button>
      {/if}
    </div>
{/snippet}

  {#if groups.length > 0}
    {#if variant === 'dialog'}
      <!-- In the dialog the filters fold away so results stay in view; the full page keeps them open. -->
      <details class="sp__filterbox">
        <summary>
          <span>Filters{#if selectedCount > 0} ({selectedCount} selected){/if}</span>
          <span class="sp__chevron"><Icon name="chevron-down" size={16} /></span>
        </summary>
        {@render filterControls()}
      </details>
    {:else}
      {@render filterControls()}
    {/if}
  {/if}

  {#if status === 'unavailable'}
    <p class="sp__notice">
      Search couldn't load. Try reloading the page, or browse the <a href="/patterns/">Pattern Index</a>
      or the <a href="/retrofits/">Retrofit Strategy Index</a>.
      {#if import.meta.env.DEV}
        (In the development server, run <code>pnpm run build</code> once so the search index exists.)
      {/if}
    </p>
  {:else if status === 'idle'}
    <div class="sp__start">
      <p>Search every Pattern, Retrofit Strategy, Guide page, and media item. Or start from one of these:</p>
      <ul>
        <li><a href="/guide/" onclick={onnavigate}>Start Here</a></li>
        <li><a href="/patterns/" onclick={onnavigate}>Pattern Index</a></li>
        <li><a href="/retrofits/" onclick={onnavigate}>Retrofit Strategy Index</a></li>
        <li><a href="/media/" onclick={onnavigate}>Media Gallery</a></li>
      </ul>
    </div>
  {:else if status === 'ready' && outcome && outcome.total === 0}
    <p class="sp__notice">
      No results for “{trimmed}”. Try fewer or different words, remove a filter, or browse the
      <a href="/patterns/" onclick={onnavigate}>Pattern Index</a>.
    </p>
  {:else if outcome && outcome.hits.length > 0}
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <ul class="sp__results" class:sp__results--stale={status === 'loading'} onkeydown={onResultsKeydown}>
      {#each outcome.hits as hit (hit.url)}
        <li class="sp__item" class:sp__item--thumb={hit.thumb}>
          {#if hit.thumb}
            <!-- Decorative: the title beside it says what the result is. -->
            <span class="sp__thumb" data-tone={hit.thumb.tone} style:--sp-tone={hit.thumb.tone ? `var(--cw-${hit.thumb.tone}-rural)` : undefined} aria-hidden="true">
              <img src={hit.thumb.src} alt="" width="160" height="90" loading="lazy" decoding="async" onerror={(event) => useOriginal(event, hit.thumb?.original)} />
            </span>
          {/if}
          <div class="sp__body">
          <a class="sp__title" href={hit.url} onclick={onnavigate}>{hit.title}</a>
          <p class="sp__meta">
            {hit.section}{#if hit.detail}<span aria-hidden="true">&nbsp;·&nbsp;</span><span class="cw-sr-only">, </span>{hit.detail}{/if}
          </p>
          {#if hit.excerpt}
            <p class="sp__excerpt">{@html hit.excerpt}</p>
          {/if}
          {#if hit.headings.length > 0}
            <p class="sp__headings">
              Also in:
              {#each hit.headings as heading, i (heading.url)}
                <a href={heading.url} onclick={onnavigate}>{heading.title}</a>{#if i < hit.headings.length - 1}<span aria-hidden="true">,&nbsp;</span>{/if}
              {/each}
            </p>
          {/if}
          </div>
        </li>
      {/each}
    </ul>

    {#if outcome.hits.length < outcome.total}
      <p class="sp__more">
        {#if variant === 'dialog'}
          <a href={searchUrl(trimmed, selected)} onclick={onnavigate}>See all {outcome.total} results</a>
        {:else}
          <button type="button" class="sp__showmore" onclick={() => (limit += pageSize)}>
            Show more results ({outcome.total - outcome.hits.length} more)
          </button>
        {/if}
      </p>
    {/if}
  {/if}
</div>

<style>
  .sp {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: 0;
  }

  .sp__form {
    margin: 0;
  }

  .sp__field {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0 0.85rem;
    min-height: 3rem;
    background: var(--cw-paper-raised);
    /* --cw-ink-faint, not the hairline: this border is what identifies the
       field, so it needs the 3:1 non-text contrast (about 5:1 here, both themes). */
    border: 1px solid var(--cw-ink-faint);
    border-radius: var(--cw-radius-md);
    color: var(--cw-ink-soft);
  }

  .sp__field:focus-within {
    border-color: var(--cw-primary);
  }

  .sp__input {
    flex: 1 1 auto;
    min-width: 0;
    min-height: 2.75rem;
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--cw-ink);
    font: inherit;
    font-size: var(--cw-text-base);
  }

  /* The global :focus-visible ring is drawn around the whole field
     (.sp__field:focus-within) instead of a second ring inside it. */
  .sp__input:focus,
  .sp__input:focus-visible {
    outline: none;
  }

  .sp__field:has(.sp__input:focus-visible) {
    outline: 2px solid var(--cw-primary);
    outline-offset: 2px;
  }

  .sp__input::placeholder {
    color: var(--cw-ink-soft);
    opacity: 1;
  }

  .sp__hint {
    margin: 0.4rem 0 0;
    font-size: var(--cw-text-sm);
    color: var(--cw-ink-soft);
  }

  .sp__browse {
    margin: 0.15rem 0 0;
    font-size: var(--cw-text-sm);
    color: var(--cw-ink-soft);
  }

  /* Styled as a button (border, chevron, hover), since a bare word doesn't
     look clickable. It is still the native <details> summary, so it keeps
     its built-in keyboard behavior and "expanded/collapsed" announcement. */
  .sp__filterbox summary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    min-height: 2.25rem;
    padding: 0.25rem 0.75rem;
    border: 1px solid var(--cw-ink-faint);
    border-radius: var(--cw-radius-md);
    cursor: pointer;
    font-size: var(--cw-text-sm);
    font-weight: 600;
    color: var(--cw-ink);
    list-style: none;
  }

  .sp__filterbox summary::-webkit-details-marker {
    display: none;
  }

  .sp__filterbox summary:hover {
    background: var(--cw-primary-soft);
  }

  .sp__chevron {
    display: inline-flex;
  }

  .sp__filterbox[open] .sp__chevron {
    transform: rotate(180deg);
  }

  .sp__filterbox[open] summary {
    margin-bottom: 0.75rem;
  }

  .sp__filters {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 0.75rem 1.5rem;
  }

  .sp__group {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 0.5rem;
    margin: 0;
    padding: 0;
    border: 0;
    min-width: 0;
  }

  .sp__group legend {
    padding: 0;
    margin: 0 0 0.25rem;
    font-size: var(--cw-text-sm);
    font-weight: 600;
    color: var(--cw-ink-soft);
  }

  .sp__chip {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    min-height: 1.75rem;
    padding: 0.15rem 0.6rem 0.15rem 0.45rem;
    border: 1px solid var(--cw-hairline-strong);
    border-radius: 999px;
    font-size: var(--cw-text-sm);
    color: var(--cw-ink);
    cursor: pointer;
  }

  .sp__chip:has(input:checked) {
    background: var(--cw-primary-soft);
    border-color: var(--cw-primary);
  }

  .sp__chip input {
    margin: 0;
    width: 1rem;
    height: 1rem;
    accent-color: var(--cw-primary);
  }

  .sp__count {
    color: var(--cw-ink-soft);
  }

  .sp__clear,
  .sp__showmore {
    min-height: 1.75rem;
    padding: 0.15rem 0.75rem;
    border: 1px solid var(--cw-hairline-strong);
    border-radius: var(--cw-radius-md);
    background: transparent;
    color: var(--cw-ink);
    font: inherit;
    font-size: var(--cw-text-sm);
    cursor: pointer;
  }

  .sp__showmore {
    min-height: 2.5rem;
    padding: 0.4rem 1rem;
  }

  .sp__clear:hover,
  .sp__showmore:hover {
    background: var(--cw-primary-soft);
  }

  .sp__notice {
    margin: 0;
    color: var(--cw-ink-soft);
  }

  .sp__start p {
    margin: 0 0 0.5rem;
    color: var(--cw-ink-soft);
  }

  .sp__start ul {
    margin: 0;
    padding-left: 1.25rem;
  }

  .sp__results {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  .sp__results--stale {
    opacity: 0.6;
  }

  .sp__item {
    padding: 0.85rem 0;
    border-top: 1px solid var(--cw-hairline);
  }

  .sp__item--thumb {
    display: flex;
    gap: 0.85rem;
    align-items: flex-start;
  }

  .sp__body {
    flex: 1 1 auto;
    min-width: 0;
  }

  .sp__thumb {
    flex: 0 0 6.5rem;
    width: 6.5rem;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border: 1px solid var(--cw-hairline);
    border-radius: var(--cw-radius-sm);
    background: var(--sp-tone, var(--cw-paper-raised));
  }

  .sp__thumb img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Pattern and Retrofit illustrations are dark line art on white: multiplying
     over the classification color tints the white, keeps the lines black. */
  .sp__thumb[data-tone] img {
    mix-blend-mode: multiply;
  }

  /* Simplified view removes card and hero images; thumbnails go too. */
  :global(html[data-view='simple']) .sp__thumb {
    display: none;
  }

  @media (max-width: 560px) {
    .sp__thumb {
      flex-basis: 5rem;
      width: 5rem;
    }
  }

  .sp__item:first-child {
    border-top: 0;
    padding-top: 0;
  }

  .sp__title {
    display: inline-block;
    font-family: var(--cw-font-display);
    font-size: var(--cw-text-lg);
    font-weight: 600;
    line-height: 1.3;
  }

  .sp__item p {
    margin: 0.2rem 0 0;
  }

  .sp__meta {
    font-size: var(--cw-text-sm);
    color: var(--cw-ink-soft);
  }

  .sp__excerpt {
    font-size: var(--cw-text-base);
    color: var(--cw-ink);
    overflow-wrap: anywhere;
  }

  .sp__excerpt :global(mark) {
    background: var(--cw-primary-soft);
    color: var(--cw-ink);
    border-radius: 2px;
    padding: 0 0.1em;
    font-weight: 600;
  }

  .sp__headings {
    font-size: var(--cw-text-sm);
    color: var(--cw-ink-soft);
  }

  .sp__more {
    margin: 0;
  }
</style>
