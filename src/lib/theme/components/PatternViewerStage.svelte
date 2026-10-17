<script lang="ts">
  import type { Component } from 'svelte'
  import { onMount } from 'svelte'
  import { thumbUrl } from '$lib/thumbs'
  import type { Annotations, Change, ConfigEntry, RendererProps, Units, ViewKind, ViewSpec } from '$lib/viewer/types'
  import PatternViewerPending from './PatternViewerPending.svelte'
  import PatternViewerPlan from './PatternViewerPlan.svelte'
  import PatternViewerSection from './PatternViewerSection.svelte'
  import '../styles/viewer.css'

  // The drawing area. Picks a renderer for the view's kind from the registry
  // below and hands it the same RendererProps whatever kind it is, so an SVG
  // cross-section and a later canvas/3D view plug in the same way.
  interface Pane {
    entry: ConfigEntry
    changedFrom?: ConfigEntry
    /** Visible caption in compare mode ("NACTO enhancement"). */
    caption: string
    /** Numbered "what changed" callouts for this pane (empty when highlighting is off). */
    changes: Change[]
  }

  interface Props {
    view: ViewSpec
    /** One pane normally, two in compare mode (lower rung first). Empty for image and placeholder views. */
    panes: Pane[]
    units: Units
    annotations: Annotations
    expanded: boolean
    /** Cross-section cut point id. */
    cut?: string
    descriptionId: string
    /** The pattern's name, for accessible names. */
    title: string
  }

  const { view, panes, units, annotations, expanded, cut, descriptionId, title }: Props = $props()

  // SVG renderers: imported normally so they prerender and work without JS.
  // Add each one here as it is built (step 2: cross-section and plan).
  const renderers: Partial<Record<ViewKind, Component<RendererProps>>> = {
    'cross-section': PatternViewerSection,
    'plan': PatternViewerPlan,
  }

  // Canvas/3D renderers: loaded only when that view is opened, so their
  // library never ships to a page that doesn't use it. Until it loads (and
  // with no JS, or in print) the view's `poster` image is shown instead.
  // Libraries must come from npm and be bundled, never a CDN (privacy
  // policy, CSP). Example: perspective: () => import('./PatternViewer3d.svelte')
  const lazyRenderers: Partial<Record<ViewKind, () => Promise<{ default: Component<RendererProps> }>>> = {}

  let loaded = $state<Partial<Record<ViewKind, Component<RendererProps>>>>({})
  let mounted = $state(false)
  onMount(() => {
    mounted = true
  })

  $effect(() => {
    const kind = view.kind
    const load = lazyRenderers[kind]
    if (!mounted || !load || loaded[kind])
      return
    load().then((m) => {
      loaded = { ...loaded, [kind]: m.default }
    }).catch(() => {})
  })

  const Renderer = $derived(renderers[view.kind] ?? loaded[view.kind])
  const isLazy = $derived(Boolean(lazyRenderers[view.kind]))

  const imageSrc = $derived(view.src ?? '')
  const srcset = $derived(imageSrc ? `${thumbUrl(imageSrc, 480)} 480w, ${thumbUrl(imageSrc, 1280)} 1280w` : '')

  function paneLabel(pane: Pane) {
    return `${title}, ${view.label.toLowerCase()}: ${pane.caption}`
  }
</script>

<div class="pvs" class:pvs--compare={panes.length > 1} class:pvs--expanded={expanded}>
  {#if view.kind === 'image' && imageSrc}
    <figure class="pvs__pane pvs__pane--image">
      <img
        src={thumbUrl(imageSrc, 1280)}
        {srcset}
        sizes={expanded ? '100vw' : '(min-width: 800px) 46rem, 100vw'}
        alt={view.alt ?? ''}
        aria-describedby={descriptionId}
        width="1408"
        height="768"
        decoding="async"
        onerror={(e) => {
          const img = e.currentTarget as HTMLImageElement
          if (!img.src.endsWith(imageSrc)) {
            img.removeAttribute('srcset')
            img.src = imageSrc
          }
        }}
      />
    </figure>
  {:else if view.kind === 'image'}
    <!-- No illustration yet: the shared placeholder, tinted with the
         pattern's classification color the same way the index cards do. -->
    <figure class="pvs__pane pvs__pane--placeholder">
      <img src="/patterns/pattern-placeholder.svg" alt="" />
      <span class="pvs__tint" aria-hidden="true"></span>
      <figcaption class="pvs__placeholder-text">Illustration in progress</figcaption>
    </figure>
  {:else}
    {#each panes as pane (pane.entry.id)}
      <figure class="pvs__pane">
        {#if panes.length > 1}
          <figcaption class="pvs__caption">{pane.caption}</figcaption>
        {/if}
        <div class="pvs__draw">
          {#if Renderer}
            <Renderer {view} entry={pane.entry} changedFrom={pane.changedFrom} changes={pane.changes} {cut} {units} {annotations} {expanded} {descriptionId} label={paneLabel(pane)} />
          {:else if isLazy && view.poster}
            <img class="pvs__poster" src={view.poster} alt={paneLabel(pane)} aria-describedby={descriptionId} />
          {:else}
            <PatternViewerPending {view} entry={pane.entry} changedFrom={pane.changedFrom} changes={pane.changes} {cut} {units} {annotations} {expanded} {descriptionId} label={paneLabel(pane)} />
          {/if}
        </div>
      </figure>
    {/each}
  {/if}
</div>

<style>
  .pvs {
    display: flex;
    gap: 0.75rem;
    width: 100%;
    height: 100%;
  }

  /* Compare: side by side when there's room, stacked otherwise. */
  .pvs--compare {
    flex-direction: column;
  }

  @container pv (min-width: 560px) {
    .pvs--compare {
      flex-direction: row;
    }
  }

  .pvs__pane {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1 1 0;
    min-width: 0;
    min-height: 0;
    margin: 0;
  }

  @container pv (max-width: 559px) {
    .pvs--compare:not(.pvs--expanded) {
      height: auto;
    }

    .pvs--compare:not(.pvs--expanded) .pvs__pane {
      flex: 0 0 auto;
    }

    .pvs--compare:not(.pvs--expanded) .pvs__draw {
      aspect-ratio: 1 / 1;
    }
  }

  .pvs__caption {
    margin-bottom: 0.25rem;
    font-size: var(--cw-text-sm);
    font-weight: 600;
    color: var(--cw-ink);
  }

  .pvs__draw {
    flex: 1 1 auto;
    min-height: 0;
    display: flex;
  }

  .pvs__pane--image,
  .pvs__pane--placeholder {
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: var(--cw-radius-md);
    /* Pattern illustrations are line art on white; keep white behind them in dark mode too. */
    background: var(--cw-paper-fixed);
  }

  .pvs__pane--image img,
  .pvs__poster {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .pvs__pane--placeholder img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(90%);
  }

  .pvs__tint {
    position: absolute;
    inset: 0;
    background: var(--pv-tint, var(--cw-hairline-strong));
    mix-blend-mode: color;
  }

  .pvs__placeholder-text {
    position: relative;
    padding: 0.35rem 0.8rem;
    border-radius: 999px;
    background: var(--cw-ink-fixed);
    color: var(--cw-paper-fixed);
    font-size: var(--cw-text-sm);
    font-weight: 600;
  }
</style>
