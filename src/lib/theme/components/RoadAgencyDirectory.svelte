<script lang="ts">
  import { onMount, tick, untrack } from 'svelte'
  import { afterNavigate, replaceState } from '$app/navigation'
  import { page } from '$app/state'
  import { agencyLevels, altNames, contactLabels, countries, getAgencies, regionName } from '$lib/data/agencies/index.js'
  import type { Agency, AgencyContact, AgencyLevel, ContactType } from '$lib/data/agencies/index.js'
  import { externalLinkAttrs, isExternalHref } from '$lib/site.js'
  import { mapLoaders } from '$lib/data/agencies/maps/index.js'
  import type { RegionMap } from '$lib/data/agencies/maps/index.js'
  import Icon from './Icon.svelte'
  import RoadAgencyMap from './RoadAgencyMap.svelte'

  // The Road Agency Directory on /references/road-agencies/. The full list
  // prerenders as a plain table, so it works with JavaScript off and lands
  // in the text-only and markdown copies; the search, filters, sort and the
  // List / Cards / Map switch appear once the page hydrates. Filter state lives in
  // the URL (?q=, level=, region=, has=, sort=, view=), so a filtered view
  // can be shared. Each entry is also an anchor (#us-or-odot) that site
  // search and other pages link to; arriving at one clears the filters that
  // would hide it. The map view is RoadAgencyMap.svelte.

  const REPO = 'https://github.com/Commonway-System/commonwaysystem.org'
  const all = getAgencies()

  type SortKey = 'name' | 'level' | 'region' | 'checked'
  type View = 'list' | 'cards' | 'map'
  const sortOptions: { value: SortKey, label: string }[] = [
    { value: 'name', label: 'Name (A to Z)' },
    { value: 'level', label: 'Level (federal first)' },
    { value: 'region', label: 'State or territory (A to Z)' },
    { value: 'checked', label: 'Most recently checked' },
  ]
  // Contact types worth filtering on. A checkbox appears only once some
  // agency has that contact, so the filter grows with the research.
  const filterableContacts: ContactType[] = ['request', 'report', 'ownership-map', 'bike-ped', 'ada', 'safety-plan']

  let mounted = $state(false)
  let query = $state('')
  let levels = $state<Set<AgencyLevel>>(new Set())
  let country = $state('')
  let region = $state('')
  let has = $state<Set<ContactType>>(new Set())
  let sort = $state<SortKey>('name')
  let view = $state<View>('list')
  let countEl: HTMLParagraphElement | undefined = $state()
  /** The agency named by the URL's #hash, highlighted and given focus. */
  let target = $state('')

  const countryCodes = [...new Set(all.map(a => a.country))].sort()
  // With one country there's nothing to choose; its labels apply directly.
  const activeCountry = $derived(country || (countryCodes.length === 1 ? countryCodes[0] : ''))
  const levelLabel = (a: Pick<Agency, 'country' | 'level'>) => countries[a.country]?.levelLabels[a.level] ?? a.level

  const levelOptions = $derived(agencyLevels
    .filter(l => countryCodes.some(c => countries[c].levelLabels[l]))
    .map(l => ({
      value: l,
      label: activeCountry ? countries[activeCountry].levelLabels[l] ?? l : l,
      count: all.filter(a => a.level === l && (!activeCountry || a.country === activeCountry)).length,
    })))

  const regionOptions = $derived.by(() => {
    const codes = activeCountry ? [activeCountry] : countryCodes
    return codes.flatMap(c => Object.entries(countries[c].regions).map(([value, name]) => ({
      value,
      name,
      count: all.filter(a => a.region === value).length,
    }))).sort((x, y) => x.name.localeCompare(y.name))
  })
  const regionNoun = $derived(activeCountry ? countries[activeCountry].regionNoun : 'Region')

  const contactOptions = filterableContacts
    .map(t => ({ value: t, label: contactLabels[t], count: all.filter(a => a.contacts.some(c => c.type === t)).length }))
    .filter(o => o.count > 0)

  const filtered = $derived.by(() => {
    const q = query.trim().toLowerCase()
    const items = all.filter((a) => {
      if (activeCountry && a.country !== activeCountry)
        return false
      if (levels.size > 0 && !levels.has(a.level))
        return false
      // A national agency covers every region, so it stays in a region's results.
      if (region && a.region !== region && a.level !== 'national')
        return false
      if (region && a.level === 'national' && a.country !== region.slice(0, 2))
        return false
      for (const t of has)
        if (!a.contacts.some(c => c.type === t))
          return false
      if (q) {
        const haystack = `${a.name} ${a.abbr ?? ''} ${altNames(a).map(n => n.name).join(' ')} ${a.area ?? ''} ${regionName(a)} ${a.handles ?? ''} ${levelLabel(a)}`.toLowerCase()
        if (!haystack.includes(q))
          return false
      }
      return true
    })
    const byName = (x: Agency, y: Agency) => x.name.localeCompare(y.name, 'en', { sensitivity: 'base' })
    const levelRank = (a: Agency) => agencyLevels.indexOf(a.level)
    const compare: Record<SortKey, (x: Agency, y: Agency) => number> = {
      name: byName,
      level: (x, y) => levelRank(x) - levelRank(y) || regionName(x).localeCompare(regionName(y)) || byName(x, y),
      region: (x, y) => regionName(x).localeCompare(regionName(y)) || levelRank(x) - levelRank(y) || byName(x, y),
      checked: (x, y) => y.checked.localeCompare(x.checked) || byName(x, y),
    }
    // With a place chosen, its own agencies come before the federal ones
    // listed alongside them, whatever the sort.
    const local = (a: Agency) => (region && a.region === region ? 0 : 1)
    return items.sort((x, y) => local(x) - local(y) || compare[sort](x, y))
  })

  // The map view needs one country with a map; its outlines load on first use.
  const hasMap = $derived(!!activeCountry && !!mapLoaders[activeCountry])
  let loadedMap = $state<{ country: string, map: RegionMap }>()
  const activeMap = $derived(loadedMap?.country === activeCountry ? loadedMap.map : undefined)
  $effect(() => {
    const cc = activeCountry
    if (view === 'map' && hasMap && loadedMap?.country !== cc)
      mapLoaders[cc]().then(m => (loadedMap = { country: cc, map: m.default }))
  })
  const regionCounts: Record<string, number> = {}
  for (const a of all)
    if (a.region)
      regionCounts[a.region] = (regionCounts[a.region] ?? 0) + 1

  // Choosing a place on the map lists its agencies and moves focus to the
  // result count, so keyboard and screen-reader users land on the change.
  async function chooseRegion(code: string) {
    region = code
    view = 'list'
    await tick()
    countEl?.focus()
  }

  const filtersActive = $derived(query.trim() !== '' || levels.size > 0 || region !== '' || has.size > 0 || country !== '')

  function toggle<T>(set: Set<T>, value: T): Set<T> {
    const next = new Set(set)
    next.has(value) ? next.delete(value) : next.add(value)
    return next
  }

  function clearFilters() {
    query = ''
    levels = new Set()
    region = ''
    has = new Set()
    country = ''
  }

  function readUrl() {
    const p = page.url.searchParams
    query = p.get('q') ?? ''
    const validLevels = (p.get('level') ?? '').split(',').filter((l): l is AgencyLevel => agencyLevels.includes(l as AgencyLevel))
    levels = new Set(validLevels)
    const c = p.get('country') ?? ''
    country = countries[c] ? c : ''
    const r = p.get('region') ?? ''
    region = Object.values(countries).some(info => r in info.regions) ? r : ''
    has = new Set((p.get('has') ?? '').split(',').filter((t): t is ContactType => filterableContacts.includes(t as ContactType)))
    const s = p.get('sort')
    sort = sortOptions.some(o => o.value === s) ? s as SortKey : 'name'
    view = 'list'
    if (p.get('view') === 'cards')
      view = 'cards'
    if (p.get('view') === 'map' && mapLoaders[region.slice(0, 2) || activeCountry])
      view = 'map'
  }

  onMount(() => {
    readUrl()
    mounted = true
  })

  // A link to this page from this page (a site search result opened here,
  // the browser's back button) keeps the component, so read the URL again.
  // The URL sync below uses replaceState, which doesn't come through here.
  afterNavigate(({ type }) => {
    if (mounted && type !== 'enter')
      readUrl()
  })

  // Links to #agency-id: from site search, other pages, or an entry's own
  // "Link to this agency". Make sure the entry is on screen, then move focus
  // to it so keyboard and screen-reader users land there too.
  async function showTarget(hash: string) {
    const id = decodeURIComponent(hash.slice(1))
    if (!id || !all.some(a => a.id === id))
      return
    target = id
    if (!filtered.some(a => a.id === id))
      clearFilters()
    if (view === 'map')
      view = 'list'
    await tick()
    const el = document.getElementById(id)
    el?.scrollIntoView({ block: 'start', behavior: 'instant' })
    el?.focus({ preventScroll: true })
  }

  // On load and on every change of #hash, including a same-page link,
  // which SvelteKit's afterNavigate doesn't report.
  $effect(() => {
    const hash = page.url.hash
    if (mounted && hash)
      untrack(() => showTarget(hash))
  })

  // Keep the URL in step with the controls, without adding history entries.
  $effect(() => {
    if (!mounted)
      return
    const params = new URLSearchParams()
    if (query.trim())
      params.set('q', query.trim())
    if (levels.size)
      params.set('level', [...levels].join(','))
    if (country)
      params.set('country', country)
    if (region)
      params.set('region', region)
    if (has.size)
      params.set('has', [...has].join(','))
    if (sort !== 'name')
      params.set('sort', sort)
    if (view !== 'list')
      params.set('view', view)
    const search = params.toString()
    // Compare with location, untracked: reading page.url here would rerun
    // this on every navigation, with the old filters, and write them back
    // over the new URL before readUrl() picks it up.
    untrack(() => {
      if (`?${search}` === location.search || (!search && !location.search))
        return
      // Keep #agency only while the filters still show that agency.
      const keepHash = !!target && filtered.some(a => a.id === target)
      if (!keepHash)
        target = ''
      try {
        replaceState(`${search ? `?${search}` : location.pathname}${keepHash ? location.hash : ''}`, page.state)
      }
      catch {
        // Router not ready yet; the controls still work.
      }
    })
  })

  function contactHref(c: AgencyContact): string | undefined {
    if (c.url)
      return c.url
    if (c.phone)
      return `tel:${c.phone.replace(/[^\d+]/g, '')}`
    if (c.email)
      return `mailto:${c.email}`
  }

  function contactText(c: AgencyContact): string {
    if (c.type === 'phone' && c.phone)
      return c.label ? `${c.label}: ${c.phone}` : c.phone
    if (c.type === 'email' && c.email)
      return c.label ? `${c.label}: ${c.email}` : c.email
    return c.label ?? contactLabels[c.type]
  }

  const typeOrder = Object.keys(contactLabels) as ContactType[]
  const sortedContacts = (a: Agency) => [...a.contacts].sort((x, y) => typeOrder.indexOf(x.type) - typeOrder.indexOf(y.type))

  function formatDate(iso: string): string {
    return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
  }

  const where = (a: Agency) => [a.area, regionName(a) || countries[a.country]?.name].filter(Boolean).join(', ')

  function correctionHref(a: Agency): string {
    return `${REPO}/issues/new?template=road-agency.yml&title=${encodeURIComponent(`[Road agency]: ${a.name}`)}&agency=${encodeURIComponent(a.id)}`
  }
</script>

{#snippet contactList(a: Agency)}
  <ul class="rad__contacts">
    {#each sortedContacts(a) as c, i (i)}
      {@const href = contactHref(c)}
      <li>
        {#if href}
          <a {href} {...externalLinkAttrs(href)}>{contactText(c)}<span class="cw-sr-only">, {a.abbr ?? a.name}</span>{#if isExternalHref(href)}<span class="cw-external-indicator cw-external-indicator--css"><span class="cw-sr-only"> (opens in new tab)</span></span>{/if}</a>
        {:else}
          {contactText(c)}
        {/if}
      </li>
    {/each}
  </ul>
{/snippet}

{#snippet altNameList(a: Agency)}
  Also: {#each altNames(a) as n, i (i)}{#if i > 0}, {/if}<span lang={n.lang}>{n.name}</span>{/each}
{/snippet}

{#snippet permalink(a: Agency)}
  <a class="rad__fix" href="#{a.id}">Link to this agency<span class="cw-sr-only">: {a.name}</span></a>
{/snippet}

{#snippet correction(a: Agency)}
  <a class="rad__fix" href={correctionHref(a)} {...externalLinkAttrs(REPO)}>Suggest a correction<span class="cw-sr-only"> for {a.name}</span><span class="cw-external-indicator cw-external-indicator--css"><span class="cw-sr-only"> (opens in new tab)</span></span></a>
{/snippet}

<div class="rad" data-pagefind-ignore="all">
  {#if mounted}
    <form class="rad__controls" role="search" aria-label="Search and filter agencies" onsubmit={e => e.preventDefault()}>
      <label class="rad__field rad__field--search">
        <span>Search agencies</span>
        <input type="search" placeholder="e.g. Oregon, Caltrans or parkway" bind:value={query} />
      </label>

      {#if countryCodes.length > 1}
        <label class="rad__field">
          <span>Country</span>
          <select bind:value={country} onchange={() => (region = '')}>
            <option value="">All countries</option>
            {#each countryCodes as c (c)}
              <option value={c}>{countries[c].name}</option>
            {/each}
          </select>
        </label>
      {/if}

      <label class="rad__field">
        <span>{regionNoun}</span>
        <select bind:value={region}>
          <option value="">All</option>
          {#each regionOptions as r (r.value)}
            <option value={r.value}>{r.name} ({r.count})</option>
          {/each}
        </select>
      </label>

      <label class="rad__field">
        <span>Sort by</span>
        <select bind:value={sort}>
          {#each sortOptions as o (o.value)}
            <option value={o.value}>{o.label}</option>
          {/each}
        </select>
      </label>

      <fieldset class="rad__field rad__field--wide">
        <legend>Level</legend>
        <div class="rad__checks">
          {#each levelOptions as o (o.value)}
            <label class="rad__check">
              <input type="checkbox" checked={levels.has(o.value)} onchange={() => (levels = toggle(levels, o.value))} />
              {o.label} ({o.count})
            </label>
          {/each}
        </div>
      </fieldset>

      {#if contactOptions.length > 0}
        <fieldset class="rad__field rad__field--wide">
          <legend>Has</legend>
          <div class="rad__checks">
            {#each contactOptions as o (o.value)}
              <label class="rad__check">
                <input type="checkbox" checked={has.has(o.value)} onchange={() => (has = toggle(has, o.value))} />
                {o.label} ({o.count})
              </label>
            {/each}
          </div>
        </fieldset>
      {/if}
    </form>

    <div class="rad__bar">
      <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
      <p class="rad__count" role="status" tabindex="-1" bind:this={countEl}>{filtered.length} of {all.length} agencies</p>
      {#if filtersActive}
        <button type="button" class="rad__btn" onclick={clearFilters}>Clear filters</button>
      {/if}
      <div class="rad__views" role="group" aria-label="View">
        <button type="button" class="rad__btn" aria-pressed={view === 'list'} onclick={() => (view = 'list')}><Icon name="list" size={16} /> List</button>
        <button type="button" class="rad__btn" aria-pressed={view === 'cards'} onclick={() => (view = 'cards')}><Icon name="grid" size={16} /> Cards</button>
        {#if hasMap}
          <button type="button" class="rad__btn" aria-pressed={view === 'map'} onclick={() => (view = 'map')}><Icon name="map" size={16} /> Map</button>
        {/if}
      </div>
    </div>
  {:else}
    <p class="rad__count">{all.length} agencies</p>
  {/if}

  {#if view === 'map' && hasMap}
    <p class="rad__map-intro">Choose a state or territory to list its agencies; federal agencies are listed with every one. The shading shows how many agencies based there have been researched so far.</p>
    {#if activeMap}
      <RoadAgencyMap map={activeMap} names={countries[activeCountry].regions} counts={regionCounts} selected={region} onselect={chooseRegion} />
    {:else}
      <p class="rad__map-intro">Loading the map…</p>
    {/if}
    <p class="rad__map-small">On a small screen, the {regionNoun} menu above does the same thing and is easier to use.</p>
  {:else if filtered.length === 0}
    <div class="rad__empty">
      <p>No agencies match these filters yet. The directory lists only agencies whose contacts have been checked on their own sites, so many places aren't in it yet.</p>
      <p><a href="{REPO}/issues/new?template=road-agency.yml" {...externalLinkAttrs(REPO)}>Suggest an agency<span class="cw-external-indicator cw-external-indicator--css"><span class="cw-sr-only"> (opens in new tab)</span></span></a></p>
    </div>
  {:else if view !== 'cards'}
    <!-- Focusable so keyboard users can scroll the table sideways at narrow widths. -->
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <div class="rad__scroll" role="region" aria-label="Road agencies" tabindex="0">
      <table class="rad__table">
        <thead>
          <tr>
            <th scope="col" aria-sort={sort === 'name' ? 'ascending' : undefined}>Agency</th>
            <th scope="col" class="rad__wide" aria-sort={sort === 'level' ? 'ascending' : undefined}>Level</th>
            <th scope="col" class="rad__wide" aria-sort={sort === 'region' ? 'ascending' : undefined}>Where</th>
            <th scope="col">Contacts</th>
          </tr>
        </thead>
        <tbody>
          {#each filtered as a (a.id)}
            <tr id={a.id} class:is-target={target === a.id} tabindex={target === a.id ? -1 : undefined}>
              <th scope="row" class="rad__name">
                <span class="rad__title">{a.name}</span>
                {#if a.abbr}<span class="rad__abbr">{a.abbr}</span>{/if}
                {#if a.aka?.length}<span class="rad__aka">{@render altNameList(a)}</span>{/if}
                <span class="rad__narrow">{levelLabel(a)} · {where(a)}</span>
                {#if a.handles}<span class="rad__handles">{a.handles}</span>{/if}
                <span class="rad__checked">Checked {formatDate(a.checked)}</span>
              </th>
              <td class="rad__wide">{levelLabel(a)}</td>
              <td class="rad__wide">{where(a)}</td>
              <td>
                {@render contactList(a)}
                <span class="rad__links">
                  {@render permalink(a)}
                  {@render correction(a)}
                </span>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {:else}
    <ul class="rad__cards">
      {#each filtered as a (a.id)}
        <!-- tabindex is only ever -1 (focus target for a #link), never in the tab order. -->
        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
        <li class="rad__card" id={a.id} class:is-target={target === a.id} tabindex={target === a.id ? -1 : undefined}>
          <h3 class="rad__card-title">{a.name}{#if a.abbr}<span class="rad__abbr">{a.abbr}</span>{/if}</h3>
          {#if a.aka?.length}<p class="rad__aka">{@render altNameList(a)}</p>{/if}
          <p class="rad__meta">{levelLabel(a)} · {where(a)}</p>
          {#if a.handles}<p class="rad__handles">{a.handles}</p>{/if}
          {@render contactList(a)}
          <p class="rad__foot">
            <span class="rad__checked">Checked {formatDate(a.checked)}</span>
            <span class="rad__links">
              {@render permalink(a)}
              {@render correction(a)}
            </span>
          </p>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .rad {
    margin: 1.5rem 0 2.5rem;
  }

  .rad__controls {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    gap: 1rem 1.25rem;
    padding: 1rem 1.25rem 1.25rem;
    border: 1px solid var(--cw-hairline-strong);
    border-radius: var(--cw-radius-lg);
    background: var(--cw-paper-raised);
  }

  .rad__field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    min-width: 0;
    margin: 0;
    padding: 0;
    border: none;
  }

  .rad__field--search,
  .rad__field--wide {
    grid-column: 1 / -1;
  }

  .rad__field > span,
  .rad__field legend {
    padding: 0;
    font-size: var(--cw-text-sm);
    font-weight: 600;
    color: var(--cw-ink);
  }

  .rad input[type='search'],
  .rad select {
    min-height: 2.5rem;
    padding: 0.45rem 0.65rem;
    border: 1px solid var(--cw-hairline-strong);
    border-radius: var(--cw-radius-sm);
    background: var(--cw-paper);
    color: var(--cw-ink);
    font: inherit;
    font-size: var(--cw-text-sm);
  }

  .rad__checks {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem 1.25rem;
  }

  .rad__check {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    min-height: 1.75rem;
    font-size: var(--cw-text-sm);
    color: var(--cw-ink-soft);
  }

  .rad__check input {
    width: 1.1rem;
    height: 1.1rem;
    margin: 0;
    accent-color: var(--cw-primary);
  }

  .rad input:focus-visible,
  .rad select:focus-visible,
  .rad__btn:focus-visible,
  .rad__scroll:focus-visible {
    outline: 2px solid var(--cw-primary);
    outline-offset: 2px;
  }

  .rad__bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem 1rem;
    margin: 1.25rem 0 1rem;
  }

  .rad__count:focus {
    outline: none;
  }

  .rad__map-intro {
    margin: 0 0 0.75rem;
    font-size: var(--cw-text-sm);
    color: var(--cw-ink-soft);
  }

  .rad__map-small {
    display: none;
    margin: 0.75rem 0 0;
    font-size: var(--cw-text-sm);
    color: var(--cw-ink-soft);
  }

  @media (max-width: 39.99rem) {
    .rad__map-small {
      display: block;
    }
  }

  .rad__count {
    margin: 0;
    font-size: var(--cw-text-sm);
    color: var(--cw-ink-soft);
  }

  .rad__views {
    display: flex;
    gap: 0.4rem;
    margin-left: auto;
  }

  .rad__btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    min-height: 2.25rem;
    padding: 0.35rem 0.9rem;
    border: 1px solid var(--cw-hairline-strong);
    border-radius: 999px;
    background: var(--cw-paper);
    color: var(--cw-ink);
    font: inherit;
    font-size: var(--cw-text-sm);
    cursor: pointer;
  }

  .rad__btn:hover {
    border-color: var(--cw-primary);
    color: var(--cw-primary);
  }

  /* Pressed state: filled, not color alone; the border weight changes too. */
  .rad__btn[aria-pressed='true'] {
    border: 2px solid var(--cw-primary);
    background: var(--cw-primary-soft);
    color: var(--cw-ink);
    font-weight: 600;
    padding: calc(0.35rem - 1px) calc(0.9rem - 1px);
  }

  .rad__scroll {
    overflow-x: auto;
    border: 1px solid var(--cw-hairline);
    border-radius: var(--cw-radius-lg);
  }

  .rad__table {
    width: 100%;
    margin: 0;
    border-collapse: collapse;
    font-size: var(--cw-text-sm);
  }

  .rad__table thead th {
    padding: 0.6rem 0.75rem;
    background: var(--cw-accent-soft, var(--cw-primary-soft));
    color: var(--cw-accent-ink, var(--cw-ink));
    font-size: 0.75rem;
    letter-spacing: 0.06em;
    text-align: left;
    text-transform: uppercase;
  }

  .rad__table td,
  .rad__table tbody th {
    padding: 0.7rem 0.75rem;
    border-top: 1px solid var(--cw-hairline);
    text-align: left;
    vertical-align: top;
  }

  /* Base styles let long words break anywhere, which splits short cell
     text like "Federal" mid-word in a narrow column; break only at spaces. */
  .rad__table td,
  .rad__table th {
    overflow-wrap: normal;
  }

  .rad__name {
    width: 45%;
    font-family: var(--cw-font-body);
    font-weight: 400;
  }

  .rad__name > span {
    display: block;
  }

  .rad__name > span + span {
    margin-top: 0.2rem;
  }

  .rad__title {
    font-weight: 600;
    color: var(--cw-ink);
  }

  .rad__abbr {
    display: inline-block;
    margin-left: 0.4rem;
    font-family: var(--cw-font-mono);
    font-size: 0.8em;
    font-weight: 500;
    color: var(--cw-ink-soft);
  }

  .rad__name .rad__abbr {
    margin-left: 0;
  }

  .rad__table .rad__contacts {
    flex-direction: column;
  }

  /* Narrow screens: Level and Where fold into the agency cell, so the
     table fits without sideways scrolling. The hidden cells leave the
     accessibility tree too, and the same text is in the agency cell. */
  .rad__narrow {
    color: var(--cw-ink-soft);
  }

  @media (min-width: 40rem) {
    .rad__name > .rad__narrow {
      display: none;
    }
  }

  @media (max-width: 39.99rem) {
    .rad__wide {
      display: none;
    }

    .rad__name {
      width: 62%;
    }
  }

  .rad__aka {
    margin: 0;
    font-size: var(--cw-text-sm);
    color: var(--cw-ink-soft);
  }

  .rad__links {
    display: flex;
    flex-wrap: wrap;
    gap: 0 1rem;
  }

  /* The entry a #link points to. The tint marks it; focus moves there too. */
  .rad__table tr.is-target,
  .rad__card.is-target {
    background: var(--cw-primary-soft);
  }

  .rad__table tr.is-target:focus,
  .rad__card.is-target:focus {
    outline: 2px solid var(--cw-primary);
    outline-offset: -2px;
  }

  .rad__handles {
    margin: 0;
    color: var(--cw-ink-soft);
  }

  .rad__checked {
    font-size: 0.8125rem;
    color: var(--cw-ink-soft);
  }

  .rad__contacts {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 1rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .rad__contacts li {
    margin: 0;
  }

  .rad__contacts a,
  .rad__fix {
    display: inline-block;
    padding: 0.15rem 0;
  }

  .rad__fix {
    margin-top: 0.35rem;
    font-size: 0.8125rem;
    color: var(--cw-ink-soft);
  }

  .rad__cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
    gap: 1rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .rad__card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0;
    padding: 1rem 1.1rem;
    border: 1px solid var(--cw-hairline-strong);
    border-radius: var(--cw-radius-lg);
    background: var(--cw-paper-raised);
  }

  /* The browser skips layout and paint for entries far off screen, so a
     long list costs little until it's scrolled to. Unlike loading rows in
     batches, every entry stays in the page: find-in-page, #links and screen
     readers still reach all of them. The size is a placeholder until an
     entry has been drawn once; `auto` then remembers its real height. Paint
     is clipped to each entry, so focus outlines must stay inside its padding.
     Cards only: browsers don't apply it to table rows, and on cells it
     misbehaves (in Chrome every cell counted as skipped, on screen or not). */
  .rad__card {
    content-visibility: auto;
    contain-intrinsic-block-size: auto 7rem;
  }

  .rad__card-title {
    margin: 0;
    font-size: var(--cw-text-base);
    line-height: 1.3;
  }

  .rad__meta {
    margin: 0;
    font-size: var(--cw-text-sm);
    color: var(--cw-ink-soft);
  }

  .rad__card .rad__handles {
    font-size: var(--cw-text-sm);
  }

  .rad__foot {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.25rem 1rem;
    margin: auto 0 0;
    padding-top: 0.5rem;
    border-top: 1px solid var(--cw-hairline);
  }

  .rad__foot .rad__fix {
    margin-top: 0;
  }

  .rad__empty {
    padding: 1.5rem;
    border: 1px dashed var(--cw-hairline-strong);
    border-radius: var(--cw-radius-lg);
    text-align: center;
    color: var(--cw-ink-soft);
  }

  .rad__empty p {
    margin: 0.25rem 0;
  }
</style>
