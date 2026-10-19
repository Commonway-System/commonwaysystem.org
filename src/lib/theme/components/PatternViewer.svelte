<script lang="ts">
  import { onDestroy, onMount, tick } from 'svelte'
  import { replaceState } from '$app/navigation'
  import type { Annotations, Change, CompareTarget, ConfigEntry, ConfigId, Units, ViewerData, ViewSpec } from '$lib/viewer/types'
  import { CONFIG_LABELS, CONFIG_SHORT_LABELS } from '$lib/viewer/types'
  import { diffEntries } from '$lib/viewer/geometry'
  import {
    configIds,
    defaultCompare,
    defaultConfig,
    facetApplies,
    facetDefaults,
    ladderIds,
    loadUnits,
    parseOptionTarget,
    readUrlState,
    referenceIds,
    RESERVED_PARAMS,
    resolveEntry,
    rungBelow,
    units,
    writeUrlState,
  } from '$lib/viewer/state'
  import Citation from './Citation.svelte'
  import PatternViewerControls from './PatternViewerControls.svelte'
  import PatternViewerStage from './PatternViewerStage.svelte'
  import PatternViewerTabs from './PatternViewerTabs.svelte'

  // The Pattern viewer: sits right after the Pattern ID card (or a Retrofit
  // Strategy's card). The page hands it everything: `data` from the
  // pattern's own file in src/lib/data/street-configs/, plus the page's
  // frontmatter image and title. All state (view, configuration, compare,
  // facets, drawing options, full view) lives here and flows down.
  //
  // With no data, the frontmatter image becomes a single Overview view; with
  // no image either, the tinted placeholder. So the viewer is never empty.
  type Classification = 'network' | 'corridor' | 'local' | 'collector' | 'arterial' | 'freeway' | 'intersections' | 'facility' | 'element'

  interface Props {
    data?: ViewerData
    /** The page's frontmatter `image:` (fm.image). */
    image?: string
    /** The page's title (fm.title), used in accessible names. */
    title: string
    /** The pattern's classification, or the Retrofit Strategy's peer (corridor, intersections, network). */
    classification: Classification
    /** Retrofit Strategy pages: Before/After instead of the ladder, landing on After. */
    retrofit?: boolean
    heading?: string
    /**
     * A sample on a documentation page (Brand Guide, How to Read a Pattern):
     * no heading of its own (so it stays out of that page's outline and
     * can't duplicate the #pattern-viewer id) and no deep-link URL writing.
     */
    demo?: boolean
  }

  const { data, image, title, classification, retrofit = false, heading, demo = false }: Props = $props()

  // "Before and after" only once a Retrofit Strategy has both states to show.
  const headingText = $derived(heading ?? (retrofit ? (data?.configs.some(c => c.id === 'after') ? 'Before and after' : 'Strategy viewer') : 'Pattern viewer'))

  const uid = $props.id()
  const panelId = `${uid}-panel`
  const descriptionId = `${uid}-desc`

  // ---------------------------------------------------------------------
  // Views

  const views = $derived.by((): ViewSpec[] => {
    const list: ViewSpec[] = [...(data?.views ?? [])]
    if (image && !list.some(v => v.kind === 'image')) {
      list.push({
        id: 'overview',
        label: 'Overview',
        kind: 'image',
        src: image,
        alt: `Overview illustration of ${title}`,
        description: list.length
          ? `An overview illustration of ${title}.`
          : `An overview illustration of ${title}. Interactive views haven't been built yet.`,
      })
    }
    if (!list.length) {
      list.push({
        id: 'overview',
        label: 'Overview',
        kind: 'image',
        description: `No illustration of ${title} has been made yet. Interactive views are planned for every pattern and Retrofit Strategy.`,
      })
    }
    return list
  })

  let viewId = $state<string | undefined>()
  const view = $derived(views.find(v => v.id === viewId) ?? views[0])
  const isConfigView = $derived(Boolean(data) && view.kind !== 'image')

  // ---------------------------------------------------------------------
  // Configurations and facets

  const allIds = $derived(data ? configIds(data) : [])
  const ladder = $derived(data ? ladderIds(data) : [])
  const references = $derived(data ? referenceIds(data) : [])
  const baseConfig = $derived(data ? defaultConfig(data) : undefined)

  let chosenConfig = $state<ConfigId | undefined>()
  const config = $derived(chosenConfig && allIds.includes(chosenConfig) ? chosenConfig : baseConfig)

  let chosenFacets = $state<Record<string, string>>({})
  const facetValues = $derived({ ...facetDefaults(data?.facets), ...chosenFacets })

  // Compare against another configuration, or against this one with one
  // facet set to another option ("parking:both").
  let compare = $state<CompareTarget | undefined>()
  const compareActive = $derived.by((): CompareTarget | undefined => {
    if (!isConfigView || !data || view.compare === false || compare === undefined)
      return undefined
    const opt = parseOptionTarget(compare)
    if (opt) {
      const facet = data.facets?.find(f => f.id === opt.facet)
      const ok = facet?.options.some(o => o.id === opt.option) && opt.option !== facetValues[opt.facet] && facetApplies(data, opt.facet, config)
      return ok ? compare : undefined
    }
    return compare !== config && allIds.includes(compare as ConfigId) ? compare : undefined
  })

  /** "On-street parking: Both sides" */
  function choiceText(facetId: string, optionId: string | undefined) {
    const facet = data?.facets?.find(f => f.id === facetId)
    return `${facet?.label ?? facetId}: ${facet?.options.find(o => o.id === optionId)?.label ?? optionId}`
  }

  // The other choices compare mode can show for the configuration on show.
  const optionTargets = $derived((data?.facets ?? [])
    .filter(f => data && facetApplies(data, f.id, config))
    .flatMap(f => f.options.filter(o => o.id !== facetValues[f.id]).map(o => ({ value: `${f.id}:${o.id}` as CompareTarget, label: `${f.label}: ${o.label}` }))))
  const facetApplicable = (facetId: string) => Boolean(data && facetApplies(data, facetId, config))

  let annotations = $state<Annotations>({ labels: true, dimensions: true, changes: true, slice: true })

  const labelFor = (id: ConfigId) => (data ? resolveEntry(data, id, facetValues)?.label : undefined) ?? CONFIG_LABELS[id]

  const shortLabelFor = (id: ConfigId) => {
    const entry = data ? resolveEntry(data, id, facetValues) : undefined
    return entry?.shortLabel ?? (entry?.label ? entry.label : CONFIG_SHORT_LABELS[id])
  }

  function entryFor(id: ConfigId | undefined): ConfigEntry | undefined {
    return data ? resolveEntry(data, id, facetValues) : undefined
  }

  interface Pane { key: string, entry: ConfigEntry, changedFrom?: ConfigEntry, changedLabel?: string, caption: string, changes: Change[] }

  // One pane, or two in compare mode: the lower rung (or Before) first, or,
  // comparing two choices, the one on show first and the other choice
  // second, its changes counted from the first.
  const panes = $derived.by((): Pane[] => {
    if (!isConfigView || !data)
      return []
    const opt = parseOptionTarget(compareActive)
    if (opt && config) {
      const a = entryFor(config)
      const b = resolveEntry(data, config, { ...facetValues, [opt.facet]: opt.option })
      if (!a || !b)
        return []
      const below = entryFor(rungBelow(data, config))
      const capA = `${labelFor(config)} (${choiceText(opt.facet, facetValues[opt.facet])})`
      const capB = `${labelFor(config)} (${choiceText(opt.facet, opt.option)})`
      return [
        { key: 'a', entry: a, changedFrom: below, changedLabel: below ? labelFor(below.id) : undefined, caption: capA, changes: annotations.changes ? diffEntries(a, below, $units) : [] },
        { key: 'b', entry: b, changedFrom: a, changedLabel: capA, caption: capB, changes: annotations.changes ? diffEntries(b, a, $units) : [] },
      ]
    }
    const ids = (compareActive ? [config, compareActive as ConfigId] : [config])
      .filter((id): id is ConfigId => Boolean(id))
      .sort((a, b) => allIds.indexOf(a) - allIds.indexOf(b))
    return ids.flatMap((id) => {
      const entry = entryFor(id)
      if (!entry)
        return []
      const changedFrom = entryFor(rungBelow(data, id))
      const changes = annotations.changes ? diffEntries(entry, changedFrom, $units) : []
      return [{ key: id, entry, changedFrom, changedLabel: changedFrom ? labelFor(changedFrom.id) : undefined, caption: labelFor(id), changes }]
    })
  })

  // Cross-section cut points come from the configuration on show.
  const cuts = $derived.by(() => {
    const c = entryFor(config)?.config
    return view.kind === 'cross-section' && c?.kind === 'street' ? (c.sections ?? []) : []
  })
  let chosenCut = $state<string | undefined>()
  const cut = $derived(cuts.some(c => c.id === chosenCut) ? chosenCut : cuts[0]?.id)

  function setConfig(id: ConfigId) {
    // Picking the configuration already shown as the comparison swaps them.
    if (compare === id)
      compare = config
    chosenConfig = id
  }

  // ---------------------------------------------------------------------
  // Deep links (?view=&config=&compare=&<facet>=), read once on mount,
  // written back with replaceState so Back isn't flooded with every click.

  let ready = $state(false)

  onMount(() => {
    loadUnits()
    if (import.meta.env.DEV) {
      for (const f of data?.facets ?? []) {
        if (RESERVED_PARAMS.includes(f.id))
          console.warn(`Pattern viewer: facet id "${f.id}" collides with a URL parameter the site already uses; rename it.`)
      }
    }
    window.addEventListener('beforeprint', openAllDetails)
    if (demo) {
      ready = true
      return
    }
    const fromUrl = readUrlState(new URL(window.location.href).searchParams, data, views.map(v => v.id))
    if (fromUrl.view)
      viewId = fromUrl.view
    if (fromUrl.config)
      chosenConfig = fromUrl.config
    if (fromUrl.compare)
      compare = fromUrl.compare
    const urlCut = new URL(window.location.href).searchParams.get('cut')
    if (urlCut)
      chosenCut = urlCut
    chosenFacets = fromUrl.facets
    ready = true
  })

  $effect(() => {
    if (!ready || demo)
      return
    const current = new URL(window.location.href)
    const next = writeUrlState(
      current,
      { view: view.id, config, compare: compareActive, facets: facetValues },
      { view: views[0].id, config: baseConfig, facets: facetDefaults(data?.facets) },
    )
    if (cut && cut !== cuts[0]?.id)
      next.searchParams.set('cut', cut)
    else
      next.searchParams.delete('cut')
    if (next.href !== current.href) {
      try {
        replaceState(next, {})
      }
      catch {
        // The router isn't ready yet on a first paint; the next change writes it.
      }
    }
  })

  // ---------------------------------------------------------------------
  // Announce changes (not the initial state) to screen readers.

  let liveText = $state('')
  let lastKey = ''
  $effect(() => {
    const key = `${view.id}|${config}|${compareActive}|${JSON.stringify(facetValues)}`
    if (!ready) {
      lastKey = key
      return
    }
    if (key === lastKey)
      return
    lastKey = key
    if (!isConfigView) {
      liveText = `${view.label}. ${view.description ?? ''}`
      return
    }
    liveText = `${view.label}. ${panes.map(p => `${p.caption}: ${p.entry.description}`).join(' ')}`
  })

  // ---------------------------------------------------------------------
  // Full view: a native modal <dialog> (Escape, focus trap, inert page and
  // the top layer for free; the Fullscreen API doesn't work on iPhone).
  // The body is rendered in exactly one place at a time, so state carries
  // over and ids stay unique.

  let expanded = $state(false)
  let dialog: HTMLDialogElement | undefined = $state()
  let expandButton: HTMLButtonElement | undefined = $state()
  let box: HTMLDivElement | undefined = $state()
  let reservedHeight = $state(0)

  function toggleExpanded() {
    if (expanded) {
      closeDialog()
      return
    }
    reservedHeight = box?.offsetHeight ?? 0
    expanded = true
  }

  $effect(() => {
    if (expanded && dialog && !dialog.open) {
      dialog.showModal()
      document.documentElement.style.overflow = 'hidden'
      tick().then(() => expandButton?.focus())
    }
  })

  // A same-page link followed from inside full view (a citation badge).
  let pendingHash: string | undefined

  // The viewer's own close paths finish the close directly rather than
  // waiting for the dialog's close event (only Escape relies on that), so a
  // delayed or missing event can't leave the page locked.
  function closeDialog() {
    dialog?.close()
    onDialogClose()
  }

  function onDialogClose() {
    if (!expanded)
      return
    expanded = false
    document.documentElement.style.overflow = ''
    const hash = pendingHash
    pendingHash = undefined
    tick().then(() => {
      const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
      if (!target) {
        expandButton?.focus()
        return
      }
      // Go where the link pointed, not back to the Expand button.
      history.replaceState(history.state, '', hash)
      target.scrollIntoView({ behavior: 'instant' })
      if (!target.hasAttribute('tabindex'))
        target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
    })
  }

  function onDialogClick(event: MouseEvent) {
    const link = (event.target as HTMLElement).closest('a')
    const href = link?.getAttribute('href')
    if (!href?.startsWith('#'))
      return
    event.preventDefault()
    pendingHash = href
    closeDialog()
  }

  onDestroy(() => {
    if (expanded && typeof document !== 'undefined')
      document.documentElement.style.overflow = ''
    if (typeof window !== 'undefined')
      window.removeEventListener('beforeprint', openAllDetails)
  })

  // ---------------------------------------------------------------------
  // "All configurations, in words": the full text alternative, opened for print.

  let allDetails: HTMLDetailsElement | undefined = $state()
  function openAllDetails() {
    if (allDetails)
      allDetails.open = true
  }

  /** "On-street parking: None; Bike lane: Next to the street" */
  function whenText(entry: ConfigEntry) {
    if (!entry.when || !data?.facets)
      return ''
    return Object.entries(entry.when).map(([k, v]) => choiceText(k, v)).join('; ')
  }

  // Grouped by configuration, each group's variants (one per facet choice) listed under it.
  const describedGroups = $derived(data ? allIds.map(id => ({ id, entries: data.configs.filter(e => e.id === id) })) : [])
</script>

{#snippet description(entry: ConfigEntry, label: string)}
  <p class="pv__desc-line">
    <strong>{label}.</strong> {entry.description}{#each entry.cite ?? [] as n (n)}<Citation index={n} />{/each}
    {#if entry.link}<a href={entry.link.href}>{entry.link.label}</a>{/if}
  </p>
{/snippet}

{#snippet body()}
  <div class="pv__bar">
    <PatternViewerTabs {views} active={view.id} idPrefix={uid} {panelId} onselect={(id) => { viewId = id }} />
    <button type="button" class="pv__expand" bind:this={expandButton} onclick={toggleExpanded}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {#if expanded}
          <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
        {:else}
          <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
        {/if}
      </svg>
      <span class="pv__expand-text">{expanded ? 'Exit full view' : 'Expand'}</span>{#if !expanded}<span class="cw-sr-only">&nbsp;viewer to full screen</span>{/if}
    </button>
  </div>
  <div class="pv__body">
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <div
      class="pv__stage"
      class:pv__stage--compare={panes.length > 1}
      class:pv__stage--natural={view.kind === 'cross-section' && !expanded}
      id={panelId}
      role={views.length > 1 ? 'tabpanel' : undefined}
      aria-labelledby={views.length > 1 ? `${uid}-tab-${view.id}` : undefined}
      tabindex={views.length > 1 ? 0 : undefined}
    >
      <PatternViewerStage {view} {panes} units={$units} {annotations} {expanded} {cut} {descriptionId} {title} />
    </div>
    <div class="pv__panel">
      {#if isConfigView}
        <div class="pv__controls">
          <PatternViewerControls
            idPrefix={uid}
            {ladder}
            {references}
            {labelFor}
            {shortLabelFor}
            {config}
            onconfig={setConfig}
            canCompare={view.compare !== false && (allIds.length > 1 || optionTargets.length > 0)}
            compare={compareActive}
            oncompare={(id) => { compare = id }}
            compareDefault={data ? defaultCompare(data, config) : undefined}
            {optionTargets}
            facets={data?.facets ?? []}
            {facetApplicable}
            {facetValues}
            onfacet={(id, value) => { chosenFacets = { ...chosenFacets, [id]: value } }}
            {annotations}
            onannotation={(key, on) => { annotations = { ...annotations, [key]: on } }}
            units={$units}
            onunits={(u: Units) => units.set(u)}
            {retrofit}
            {cuts}
            {cut}
            sliceOption={view.kind === 'cross-section'}
            oncut={(id) => { chosenCut = id }}
          />
        </div>
      {/if}
      <div class="pv__desc" id={descriptionId}>
        {#if isConfigView}
          {#each panes as pane (pane.key)}
            {@render description(pane.entry, pane.caption)}
            {#if pane.changes.length && pane.changedFrom}
              <p class="pv__changes-h">What changed from {pane.changedLabel}:</p>
              <ol class="pv__changes">
                {#each pane.changes as change (change.n)}
                  <li value={change.n}>{change.text}</li>
                {/each}
              </ol>
            {/if}
          {/each}
        {:else}
          <p class="pv__desc-line">{view.description}</p>
        {/if}
      </div>
    </div>
  </div>
  <p class="cw-sr-only pv__live" aria-live="polite">{liveText}</p>
{/snippet}

<section class="pv" data-classification={classification} aria-labelledby={demo ? undefined : 'pattern-viewer'} aria-label={demo ? `${headingText} example` : undefined}>
  {#if !demo}
    <h2 id="pattern-viewer">{headingText}</h2>
  {/if}
  <div class="pv__box" bind:this={box} data-pagefind-ignore="all">
    {#if expanded}
      <p class="pv__away" style:min-height="{reservedHeight}px">The viewer is open in full view.</p>
    {:else}
      {@render body()}
    {/if}
  </div>

  {#snippet allText(entry: ConfigEntry)}
    {entry.description}{#each entry.cite ?? [] as n (n)}<Citation index={n} />{/each}{#if entry.link}{' '}<a href={entry.link.href}>{entry.link.label}</a>{/if}
  {/snippet}

  {#if describedGroups.length}
    <details class="pv__all" bind:this={allDetails}>
      <summary>All configurations, in words</summary>
      <dl>
        {#each describedGroups as group (group.id)}
          <dt>{labelFor(group.id)}</dt>
          {#if group.entries.length === 1 && !group.entries[0].when}
            <dd>{@render allText(group.entries[0])}</dd>
          {:else}
            <dd>
              <ul class="pv__variants">
                {#each group.entries as entry, i (i)}
                  <li>{#if entry.when}<strong>{whenText(entry)}.</strong>{' '}{/if}{@render allText(entry)}</li>
                {/each}
              </ul>
            </dd>
          {/if}
        {/each}
      </dl>
    </details>
  {/if}

  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
  <dialog class="pv-dialog" data-classification={classification} bind:this={dialog} aria-label="{headingText}: {title}" onclose={onDialogClose} onclick={onDialogClick}>
    {#if expanded}
      <div class="pv__box pv__box--expanded">
        {@render body()}
      </div>
    {/if}
  </dialog>
</section>

<style>
  .pv {
    margin: 1.5rem 0;
  }

  .pv[data-classification='local'],
  .pv-dialog[data-classification='local'] { --pv-tint: var(--cw-local-suburban); }
  .pv[data-classification='collector'],
  .pv-dialog[data-classification='collector'] { --pv-tint: var(--cw-collector-suburban); }
  .pv[data-classification='arterial'],
  .pv-dialog[data-classification='arterial'] { --pv-tint: var(--cw-arterial-suburban); }
  .pv[data-classification='freeway'],
  .pv-dialog[data-classification='freeway'] { --pv-tint: var(--cw-freeway-suburban); }
  .pv[data-classification='intersections'],
  .pv-dialog[data-classification='intersections'] { --pv-tint: var(--cw-intersections-suburban); }
  .pv[data-classification='network'],
  .pv-dialog[data-classification='network'] { --pv-tint: var(--cw-network-suburban); }
  .pv[data-classification='corridor'],
  .pv-dialog[data-classification='corridor'] { --pv-tint: var(--cw-corridor-suburban); }
  .pv[data-classification='facility'],
  .pv-dialog[data-classification='facility'] { --pv-tint: var(--cw-facility-suburban); }
  .pv[data-classification='element'],
  .pv-dialog[data-classification='element'] { --pv-tint: var(--cw-element-suburban); }

  .pv__box {
    container: pv / inline-size;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 0.75rem;
    border: 1px solid var(--cw-hairline);
    border-radius: var(--cw-radius-lg);
    background: var(--cw-paper-raised);
  }

  .pv__bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    min-width: 0;
  }

  .pv__expand {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    min-height: 2.25rem;
    padding: 0.35rem 0.7rem;
    border: 1px solid var(--cw-hairline-strong);
    border-radius: var(--cw-radius-md);
    background: var(--cw-paper);
    color: var(--cw-ink);
    font: inherit;
    font-size: var(--cw-text-sm);
    cursor: pointer;
  }

  .pv__expand:hover {
    border-color: var(--cw-primary);
    color: var(--cw-primary);
  }

  .pv__expand svg {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  /* Icon only on a narrow viewer; the accessible name stays complete. */
  @container pv (max-width: 420px) {
    .pv__expand-text {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }
  }

  .pv__body {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  /* 1:1 on a narrow viewer, 16:9 once there's room. A container query, not a
     media query: the content column is narrower than the viewport, and media
     queries ignore the reader's Text size setting. */
  .pv__stage {
    aspect-ratio: 1 / 1;
    min-width: 0;
    border-radius: var(--cw-radius-md);
  }

  @container pv (min-width: 560px) {
    .pv__stage {
      aspect-ratio: 16 / 9;
    }
  }

  /* Compare on a narrow viewer stacks the two drawings; let the area grow so
     each keeps a full square (PatternViewerStage sizes the panes). */
  @container pv (max-width: 559px) {
    .pv__stage--compare {
      aspect-ratio: auto;
    }
  }

  /* The cross-section sets its own height from its width (sky, rows, slice). */
  .pv__stage.pv__stage--natural {
    aspect-ratio: auto;
  }

  @container pv (min-width: 560px) {
    .pv__stage.pv__stage--natural {
      aspect-ratio: auto;
    }
  }

  .pv__stage:focus-visible {
    outline: 2px solid var(--cw-primary);
    outline-offset: 3px;
  }

  .pv__panel {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    min-width: 0;
  }

  .pv__desc {
    padding-top: 0.6rem;
    border-top: 1px solid var(--cw-hairline);
    font-size: var(--cw-text-sm);
  }

  .pv__desc-line {
    margin: 0 0 0.4rem;
  }

  .pv__desc-line:last-child {
    margin-bottom: 0;
  }

  .pv__changes-h {
    margin: 0.5rem 0 0.2rem;
    font-weight: 600;
  }

  /* Numbers match the amber badges in the drawing. */
  .pv__changes {
    margin: 0 0 0.5rem;
    padding-left: 1.6rem;
  }

  .pv__changes li::marker {
    font-weight: 700;
  }

  .pv__away {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    color: var(--cw-ink-soft);
    font-size: var(--cw-text-sm);
  }

  .pv__all {
    margin-top: 0.75rem;
    font-size: var(--cw-text-sm);
  }

  .pv__all summary {
    cursor: pointer;
    color: var(--cw-ink-soft);
  }

  .pv__all dl {
    margin: 0.5rem 0 0;
  }

  .pv__all dt {
    font-weight: 600;
    margin-top: 0.5rem;
  }

  .pv__all dd {
    margin: 0.15rem 0 0;
  }

  .pv__variants {
    margin: 0.25rem 0 0;
    padding-left: 1.2rem;
  }

  .pv__variants li + li {
    margin-top: 0.35rem;
  }

  /* Full view: the whole viewport, phone safe areas respected. */
  .pv-dialog {
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    max-width: none;
    max-height: none;
    margin: 0;
    padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
    border: 0;
    background: var(--cw-paper);
    color: var(--cw-ink);
  }

  .pv-dialog::backdrop {
    background: var(--cw-paper);
  }

  .pv__box--expanded {
    height: 100%;
    border: 0;
    border-radius: 0;
  }

  .pv__box--expanded .pv__body {
    flex: 1 1 auto;
    min-height: 0;
  }

  .pv__box--expanded .pv__stage {
    flex: 1 1 auto;
    aspect-ratio: auto;
    min-height: 12rem;
  }

  .pv__box--expanded .pv__panel {
    flex: 0 1 auto;
    max-height: 45%;
    overflow-y: auto;
  }

  /* Full view on a phone: the drawing takes the whole screen below the tab
     bar, tall, and the controls and description sit below it, reached by
     scrolling the full view. (Capping the panel at 45% left the drawing close
     to a square.) */
  @container pv (max-width: 559px) {
    .pv__box--expanded .pv__body {
      overflow-y: auto;
      overscroll-behavior: contain;
    }

    .pv__box--expanded .pv__stage {
      flex: 0 0 auto;
      height: calc(100dvh - 5.5rem - env(safe-area-inset-top) - env(safe-area-inset-bottom));
    }

    .pv__box--expanded .pv__panel {
      flex: 0 0 auto;
      max-height: none;
      overflow-y: visible;
    }
  }

  /* Wide full view: drawing on the left, controls and description beside it. */
  @container pv (min-width: 900px) {
    .pv__box--expanded .pv__body {
      flex-direction: row;
    }

    .pv__box--expanded .pv__panel {
      flex: 0 0 22rem;
      max-height: none;
    }
  }

  @media print {
    .pv__bar,
    .pv__controls {
      display: none;
    }

    .pv__box {
      break-inside: avoid;
    }
  }
</style>
