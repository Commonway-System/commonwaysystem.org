<script lang="ts">
  import type { Annotations, CompareTarget, ConfigId, Facet, Units } from '$lib/viewer/types'
  import { untrack } from 'svelte'
  import { CONFIG_COMPACT_LABELS, CONFIG_SHORT_LABELS } from '$lib/viewer/types'
  import Icon from './Icon.svelte'

  // The controls under (or, in full view, beside) the drawing: the
  // configuration ladder, any reference configurations, compare mode,
  // facets, and drawing options. All native form controls, so keyboard,
  // screen reader and touch behavior come from the browser. Every name and
  // id carries this instance's own prefix (see the DisplaySettingsPanel note
  // in CLAUDE.md: radios sharing a name across the document form one group).
  interface Props {
    idPrefix: string
    ladder: ConfigId[]
    references: ConfigId[]
    labelFor: (id: ConfigId) => string
    /** The short name shown on the ladder button. */
    shortLabelFor: (id: ConfigId) => string
    config: ConfigId | undefined
    onconfig: (id: ConfigId) => void
    /** Offer compare mode at all (this view allows it and there are two or more configurations). */
    canCompare: boolean
    compare: CompareTarget | undefined
    oncompare: (id: CompareTarget | undefined) => void
    compareDefault: ConfigId | undefined
    /** The same configuration with one facet set otherwise ("parking:both"), offered in the compare list. */
    optionTargets?: { value: CompareTarget, label: string }[]
    facets: Facet[]
    /** Whether a facet changes anything on the configuration on show. */
    facetApplicable?: (facetId: string) => boolean
    facetValues: Record<string, string>
    onfacet: (id: string, value: string) => void
    annotations: Annotations
    onannotation: (key: keyof Annotations, on: boolean) => void
    units: Units
    onunits: (u: Units) => void
    /** Retrofit pages: Before/After instead of the ladder. */
    retrofit?: boolean
    /** Cross-section cut points, when the configuration offers more than one. */
    cuts?: { id: string, label: string }[]
    cut?: string
    oncut?: (id: string) => void
    /** Offer the top-down slice toggle (cross-section view). */
    sliceOption?: boolean
  }

  const {
    idPrefix,
    ladder,
    references,
    labelFor,
    shortLabelFor,
    config,
    onconfig,
    canCompare,
    compare,
    oncompare,
    compareDefault,
    optionTargets = [],
    facets,
    facetApplicable = () => true,
    facetValues,
    onfacet,
    annotations,
    onannotation,
    units,
    onunits,
    retrofit = false,
    cuts = [],
    cut,
    oncut,
    sliceOption = false,
  }: Props = $props()

  const all = $derived([...ladder, ...references])
  const compareOptions = $derived(all.filter(id => id !== config))

  // The ladder shows short names; the full name is the control's accessible
  // name and the tooltip.
  const tipFor = (id: ConfigId) => labelFor(id) + (references.includes(id) ? ' (for comparison)' : '')

  // Compact labels ("Base", "Complete") whenever the short ones don't fit:
  // full view's side panel, a phone, a narrow column. Measured, not a
  // breakpoint, since the room depends on the column and the Text size
  // setting. The ladder fills its column, so a label that doesn't fit shows
  // as a face narrower than its text. `needed` remembers the room the short
  // labels took so it switches back once there's room again.
  let wrapEl: HTMLDivElement | undefined = $state()
  let ladderEl: HTMLDivElement | undefined = $state()
  // Each step keeps the ones before it: compact labels; less padding and
  // 13px text (a phone with five rungs); the references (Dutch) on a line of
  // their own (a phone at a larger Text size); the rungs split evenly over
  // two lines (a phone at the largest Text sizes). A step that wouldn't
  // change anything (no references, two rungs) is left out.
  type FitStep = 'short' | 'compact' | 'tight' | 'wrap' | 'split'
  const steps = $derived<FitStep[]>(['short', 'compact', 'tight',
    ...(references.length ? ['wrap' as const] : []),
    ...(ladder.length > 2 ? ['split' as const] : [])])
  let fit = $state(0)
  const reached = (step: FitStep) => steps.indexOf(step) !== -1 && fit >= steps.indexOf(step)
  const compact = $derived(fit > 0)
  const maxFit = $derived(steps.length - 1)
  const needed = [0, 0, 0, 0, 0]
  // The second line of a split ladder starts here (two to a line at most).
  const breakAt = $derived(Math.ceil(ladder.length / 2))
  $effect(() => {
    if (!wrapEl || !ladderEl)
      return
    const check = () => {
      if (!wrapEl || !ladderEl)
        return
      // In rem, since the labels scale with the Text size setting and the
      // column may not.
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
      const room = wrapEl.clientWidth / rem
      const short = [...ladderEl.querySelectorAll<HTMLElement>('.pvc__face')]
        .reduce((sum, face) => sum + Math.max(0, face.scrollWidth - face.clientWidth), 0) / rem
      if (fit < maxFit && short > 0) {
        needed[fit] = room + short
        fit += 1
        // The column hasn't changed size, so look again once the new labels are in.
        requestAnimationFrame(check)
      }
      else if (fit > 0 && room >= needed[fit - 1]) {
        fit -= 1
        requestAnimationFrame(check)
      }
    }
    // Untracked: the check reads `fit` and must not re-run itself when it changes.
    untrack(check)
    document.fonts?.ready.then(check)
    const ro = new ResizeObserver(check)
    ro.observe(wrapEl)
    return () => ro.disconnect()
  })
  /** The label on a ladder button: a pattern's own short label wins over the compact default. */
  function faceLabel(id: ConfigId) {
    const short = shortLabelFor(id)
    return compact && short === CONFIG_SHORT_LABELS[id] ? CONFIG_COMPACT_LABELS[id] : short
  }

  // One shared tooltip, outside the clipped ladder: shown on hover and on
  // keyboard focus, dismissed with Escape (WCAG 1.4.13). Kept inside the
  // ladder's width, and shown below the ladder where a scrolling panel (full
  // view) would clip it above.
  let tip = $state<{ id: ConfigId, x: number } | undefined>()
  let tipEl: HTMLSpanElement | undefined = $state()
  let tipLeft = $state(0)
  let tipBelow = $state(false)
  function showTip(id: ConfigId, el: HTMLElement) {
    tip = { id, x: el.offsetLeft + el.offsetWidth / 2 }
  }
  const hideTip = () => { tip = undefined }
  $effect(() => {
    if (!tip || !tipEl || !wrapEl)
      return
    const half = tipEl.offsetWidth / 2
    const room = wrapEl.clientWidth
    tipLeft = half * 2 >= room ? room / 2 : Math.min(Math.max(tip.x, half), room - half)
    const panel = wrapEl.closest('.pv__panel')
    const clips = panel && getComputedStyle(panel).overflowY !== 'visible'
    tipBelow = Boolean(clips && panel && wrapEl.getBoundingClientRect().top - panel.getBoundingClientRect().top < tipEl.offsetHeight + 8)
  })
  function onladderkey(event: KeyboardEvent) {
    if (event.key === 'Escape' && tip) {
      hideTip()
      event.stopPropagation()
    }
  }
</script>

<div class="pvc">
  {#if all.length > 1}
    <fieldset class="pvc__group">
      <legend class="pvc__legend">{retrofit ? 'Show' : 'Configuration'}</legend>
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="pvc__ladder-wrap" class:pvc__ladder-wrap--compact={compact} class:pvc__ladder-wrap--tight={reached('tight')} class:pvc__ladder-wrap--wrapped={reached('wrap')} class:pvc__ladder-wrap--split={reached('split')} bind:this={wrapEl} onkeydown={onladderkey}>
        <div class="pvc__ladder" bind:this={ladderEl} onpointerleave={hideTip}>
          {#each [ladder, references] as group, g (g)}
            {#if group.length}
              <div class="pvc__rungs" class:pvc__rungs--refs={g === 1} class:pvc__rungs--split={g === 0 && references.length > 0} style:flex-grow={group.length}>
                {#each group as id, i (id)}
                  <label
                    class="pvc__seg"
                    class:pvc__seg--notch={g === 0 && i > 0 && !(i === breakAt && reached('split'))}
                    class:pvc__seg--point={g === 0 && i < ladder.length - 1 && !(i === breakAt - 1 && reached('split'))}
                    class:pvc__seg--top={g === 0 && !retrofit && i === ladder.length - 1}
                    onpointerenter={e => showTip(id, e.currentTarget)}
                    onfocusin={e => showTip(id, e.currentTarget)}
                    onfocusout={hideTip}
                  >
                    <input type="radio" name="{idPrefix}-config" value={id} aria-label={tipFor(id)} checked={config === id} onchange={() => onconfig(id)} />
                    <span class="pvc__face">{faceLabel(id)}</span>
                  </label>
                {/each}
              </div>
            {/if}
          {/each}
        </div>
        {#if tip}
          <span class="pvc__tip" class:pvc__tip--below={tipBelow} aria-hidden="true" bind:this={tipEl} style:left="{tipLeft || tip.x}px">{tipFor(tip.id)}</span>
        {/if}
      </div>
    </fieldset>
  {/if}

  {#if cuts.length > 1}
    <div class="pvc__row">
      <label class="pvc__field">
        <span>Cut at</span>
        <select value={cut} onchange={e => oncut?.(e.currentTarget.value)}>
          {#each cuts as option (option.id)}
            <option value={option.id}>{option.label}</option>
          {/each}
        </select>
      </label>
    </div>
  {/if}

  <!-- One row of buttons per facet. Disabled, with a note, where the
       configuration on show doesn't vary that way (no bike lane to move on
       the Federal / State minimum). An option the system rates carries an
       icon and its rating in words for screen readers; a discouraged one,
       while chosen, turns caution orange (red when highly discouraged) and
       shows its note under the buttons. The note sits in a live region that
       is always there, so a screen reader hears it appear. -->
  {#each facets as facet (facet.id)}
    {@const applies = facetApplicable(facet.id)}
    {@const chosen = facet.options.find(o => o.id === facetValues[facet.id])}
    {@const note = applies && chosen?.note ? chosen : undefined}
    <fieldset class="pvc__group pvc__facet" disabled={!applies} aria-describedby={applies ? (note ? `${idPrefix}-advice-${facet.id}` : undefined) : `${idPrefix}-na-${facet.id}`}>
      <legend class="pvc__legend">{facet.label}</legend>
      <div class="pvc__choices">
        {#each facet.options as option (option.id)}
          <label class="pvc__choice" class:pvc__choice--discouraged={option.advice === 'discouraged'} class:pvc__choice--highly={option.advice === 'highly-discouraged'}>
            <input type="radio" name="{idPrefix}-facet-{facet.id}" value={option.id} checked={facetValues[facet.id] === option.id} onchange={() => onfacet(facet.id, option.id)} />
            <span>
              {option.label}
              {#if option.advice}
                <span class="pvc__advice-icon"><Icon name={option.advice === 'preferred' ? 'check' : option.advice === 'discouraged' ? 'caution' : 'stop'} filled={option.advice === 'highly-discouraged'} size={16} /></span>
                <span class="cw-sr-only">({option.advice === 'highly-discouraged' ? 'highly discouraged' : option.advice})</span>
              {/if}
            </span>
          </label>
        {/each}
      </div>
      {#if !applies && config}
        <p class="pvc__na" id="{idPrefix}-na-{facet.id}">Doesn't apply to {labelFor(config)}.</p>
      {/if}
      {#if facet.options.some(o => o.note)}
        <div class="pvc__advice" id="{idPrefix}-advice-{facet.id}" aria-live="polite">
          {#if note}
            <p class="pvc__note" class:pvc__note--highly={note.advice === 'highly-discouraged'}>
              <span class="pvc__note-icon"><Icon name={note.advice === 'highly-discouraged' ? 'stop' : 'caution'} filled={note.advice === 'highly-discouraged'} size={18} /></span>
              <span>
                {note.note}
                {#if facet.why}<a href={facet.why.href}>{facet.why.label}</a>{/if}
              </span>
            </p>
          {/if}
        </div>
      {/if}
    </fieldset>
  {/each}

  <div class="pvc__row">
    {#if canCompare && (compareOptions.length || optionTargets.length)}
      <label class="pvc__check">
        <input type="checkbox" checked={compare !== undefined} onchange={e => oncompare(e.currentTarget.checked ? (compareDefault && compareDefault !== config ? compareDefault : compareOptions[0] ?? optionTargets[0]?.value) : undefined)} />
        <span>Compare side by side</span>
      </label>
      {#if compare !== undefined}
        <label class="pvc__field">
          <span>with</span>
          <select value={compare} onchange={e => oncompare(e.currentTarget.value as CompareTarget)}>
            {#each compareOptions as id (id)}
              <option value={id}>{labelFor(id)}</option>
            {/each}
            {#if optionTargets.length}
              <optgroup label="{config ? labelFor(config) : 'This configuration'}, with">
                {#each optionTargets as t (t.value)}
                  <option value={t.value}>{t.label}</option>
                {/each}
              </optgroup>
            {/if}
          </select>
        </label>
      {/if}
    {/if}
  </div>

  <fieldset class="pvc__group pvc__group--inline">
    <legend class="pvc__legend">Drawing</legend>
    <label class="pvc__check">
      <input type="checkbox" checked={annotations.labels} onchange={e => onannotation('labels', e.currentTarget.checked)} />
      <span>Labels</span>
    </label>
    <label class="pvc__check">
      <input type="checkbox" checked={annotations.dimensions} onchange={e => onannotation('dimensions', e.currentTarget.checked)} />
      <span>Dimensions</span>
    </label>
    {#if sliceOption}
      <label class="pvc__check">
        <input type="checkbox" checked={annotations.slice} onchange={e => onannotation('slice', e.currentTarget.checked)} />
        <span>Top-down slice</span>
      </label>
    {/if}
    {#if ladder.length > 1}
      <label class="pvc__check">
        <input type="checkbox" checked={annotations.changes} onchange={e => onannotation('changes', e.currentTarget.checked)} />
        <span>Highlight changes</span>
      </label>
    {/if}
    <span class="pvc__units" role="radiogroup" aria-label="Units">
      <label class="pvc__unit">
        <input type="radio" name="{idPrefix}-units" value="ft" checked={units === 'ft'} onchange={() => onunits('ft')} />
        <span>ft</span>
      </label>
      <label class="pvc__unit">
        <input type="radio" name="{idPrefix}-units" value="m" checked={units === 'm'} onchange={() => onunits('m')} />
        <span>m</span>
      </label>
    </span>
  </fieldset>
</div>

<style>
  .pvc {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    font-size: var(--cw-text-sm);
  }

  .pvc__group {
    margin: 0;
    padding: 0;
    border: 0;
    min-width: 0;
  }

  .pvc__group--inline {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.25rem 1rem;
  }

  .pvc__legend {
    padding: 0;
    margin-bottom: 0.35rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--cw-ink-soft);
  }

  .pvc__group--inline .pvc__legend {
    float: left;
    margin: 0 0.25rem 0 0;
  }

  /* One segmented control. Each group's own background shows through the
     1px gaps between faces, which makes the dividers; faces between two
     rungs are clipped to chevrons (notch on the left, point on the right,
     overlapping by the chevron's depth less 1px) so the points read "better
     than". Dutch practice is outside the ladder, so it sits apart in its own
     box, with straight edges on both sides of the gap. The ladder fills its
     column. The real radio inputs stay in the accessibility tree and
     keyboard order. */
  .pvc__ladder-wrap {
    position: relative;
    --pvc-d: 0.45rem;
  }

  .pvc__ladder {
    display: flex;
    gap: 3px;
    width: 100%;
    border-radius: 999px;
  }

  .pvc__ladder:has(input:focus-visible) {
    outline: 2px solid var(--cw-primary);
    outline-offset: 2px;
  }

  .pvc__rungs {
    display: flex;
    flex: 1 1 auto;
    min-width: 0;
    border: 1px solid var(--cw-hairline-strong);
    border-radius: 999px;
    background: var(--cw-hairline-strong);
    overflow: hidden;
  }

  .pvc__rungs--split {
    border-radius: 999px 0 0 999px;
  }

  .pvc__rungs--refs {
    border-radius: 0 999px 999px 0;
  }

  .pvc__seg {
    position: relative;
    display: flex;
    flex: 1 1 auto;
    min-width: 0;
    cursor: pointer;
  }

  .pvc__seg + .pvc__seg {
    margin-left: 1px;
  }

  .pvc__seg + .pvc__seg--notch {
    margin-left: calc(1px - var(--pvc-d));
  }

  .pvc__seg input {
    position: absolute;
    inset: 0;
    margin: 0;
    opacity: 0;
    cursor: pointer;
  }

  .pvc__face {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
    min-height: 2rem;
    padding: 0.25rem 0.6rem;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
    line-height: 1.15;
    color: var(--cw-ink);
    background: var(--cw-paper);
  }

  .pvc__seg--notch .pvc__face {
    padding-left: calc(var(--pvc-d) + 0.35rem);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, var(--pvc-d) 50%);
  }

  .pvc__seg--point .pvc__face {
    padding-right: calc(var(--pvc-d) + 0.35rem);
    clip-path: polygon(0 0, calc(100% - var(--pvc-d)) 0, 100% 50%, calc(100% - var(--pvc-d)) 100%, 0 100%);
  }

  .pvc__seg--notch.pvc__seg--point .pvc__face {
    clip-path: polygon(0 0, calc(100% - var(--pvc-d)) 0, 100% 50%, calc(100% - var(--pvc-d)) 100%, 0 100%, var(--pvc-d) 50%);
  }

  .pvc__seg--top .pvc__face {
    font-weight: 600;
  }

  .pvc__seg input:checked + .pvc__face {
    background: var(--cw-primary);
    color: var(--cw-paper);
  }

  .pvc__seg input:focus-visible + .pvc__face {
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 3px;
  }

  .pvc__tip {
    position: absolute;
    bottom: calc(100% + 0.35rem);
    transform: translateX(-50%);
    z-index: 5;
    max-width: 16rem;
    padding: 0.3rem 0.6rem;
    border-radius: var(--cw-radius-md, 0.5rem);
    background: var(--cw-ink);
    color: var(--cw-paper);
    font-size: 0.8125rem;
    line-height: 1.3;
    white-space: nowrap;
    pointer-events: none;
  }

  .pvc__tip--below {
    bottom: auto;
    top: calc(100% + 0.35rem);
  }

  /* Compact labels: a little less padding too, so five fit a 22rem panel. */
  .pvc__ladder-wrap--compact {
    --pvc-d: 0.35rem;
  }

  .pvc__ladder-wrap--compact .pvc__face {
    padding-inline: 0.3rem;
  }

  .pvc__ladder-wrap--compact .pvc__seg--notch .pvc__face {
    padding-left: calc(var(--pvc-d) + 0.15rem);
  }

  .pvc__ladder-wrap--compact .pvc__seg--point .pvc__face {
    padding-right: calc(var(--pvc-d) + 0.15rem);
  }

  /* Tight: compact labels still too wide (five rungs on a phone), so the
     padding goes and the text drops one step, to 13px. */
  .pvc__ladder-wrap--tight {
    --pvc-d: 0.3rem;
  }

  .pvc__ladder-wrap--tight .pvc__face {
    padding-inline: 0.15rem;
    font-size: 0.8125rem;
  }

  .pvc__ladder-wrap--tight .pvc__seg--notch .pvc__face {
    padding-left: calc(var(--pvc-d) + 0.05rem);
  }

  .pvc__ladder-wrap--tight .pvc__seg--point .pvc__face {
    padding-right: calc(var(--pvc-d) + 0.05rem);
  }

  /* Wrapped: still too wide (a larger Text size on a phone), so Dutch
     practice moves to a line of its own, full width, both ends rounded. */
  .pvc__ladder-wrap--wrapped .pvc__ladder {
    flex-wrap: wrap;
    border-radius: 1.25rem;
  }

  .pvc__ladder-wrap--wrapped .pvc__rungs {
    flex-basis: 100%;
    border-radius: 999px;
  }

  /* Split: the rungs themselves too wide (a phone at the largest Text
     sizes), so they break evenly over two lines, at most two to a line (a
     ladder has at most four rungs). The 1px row gap shows the group's
     background, like the dividers. Each line ends square and its buttons
     share it evenly, unless one label needs more. */
  .pvc__ladder-wrap--split .pvc__ladder {
    border-radius: 1.25rem;
  }

  .pvc__ladder-wrap--split .pvc__rungs:not(.pvc__rungs--refs) {
    flex-wrap: wrap;
    row-gap: 1px;
    border-radius: 1.25rem;
  }

  .pvc__ladder-wrap--split .pvc__rungs:not(.pvc__rungs--refs) .pvc__seg {
    flex: 1 1 34%;
    min-width: max-content;
  }

  @media (forced-colors: active) {
    .pvc__seg input:checked + .pvc__face {
      forced-color-adjust: none;
      background: Highlight;
      color: HighlightText;
    }

    .pvc__tip {
      border: 1px solid CanvasText;
    }
  }

  /* Facet choices: a row of pill buttons, wrapping on a narrow viewer. */
  .pvc__choices {
    display: flex;
    flex-wrap: wrap;
    width: fit-content;
    max-width: 100%;
    border: 1px solid var(--cw-hairline-strong);
    border-radius: var(--cw-radius-md);
    background: var(--cw-hairline-strong);
    gap: 1px;
    overflow: hidden;
  }

  .pvc__choices:has(input:focus-visible) {
    outline: 2px solid var(--cw-primary);
    outline-offset: 2px;
  }

  .pvc__choice {
    position: relative;
    display: flex;
    flex: 1 1 auto;
    cursor: pointer;
  }

  .pvc__choice input {
    position: absolute;
    inset: 0;
    margin: 0;
    opacity: 0;
    cursor: pointer;
  }

  .pvc__choice > span {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 2rem;
    padding: 0.25rem 0.7rem;
    gap: 0.3rem;
    white-space: nowrap;
    color: var(--cw-ink);
    background: var(--cw-paper);
  }

  .pvc__choice input:checked + span {
    background: var(--cw-primary);
    color: var(--cw-paper);
  }

  /* Ratings: the icon takes the rating's color on an unchosen button and
     the text color on a chosen one. */
  .pvc__advice-icon {
    display: inline-flex;
    color: var(--cw-primary);
  }

  .pvc__choice--discouraged .pvc__advice-icon {
    color: var(--cw-caution);
  }

  .pvc__choice--highly .pvc__advice-icon {
    color: var(--cw-danger);
  }

  .pvc__choice input:checked + span .pvc__advice-icon {
    color: inherit;
  }

  .pvc__choice--discouraged input:checked + span {
    background: var(--cw-caution);
  }

  .pvc__choice--highly input:checked + span {
    background: var(--cw-danger);
    font-weight: 600;
  }

  .pvc__note {
    display: flex;
    align-items: flex-start;
    gap: 0.4rem;
    max-width: 40rem;
    margin: 0.4rem 0 0;
    color: var(--cw-caution);
    font-size: 0.875rem;
    line-height: 1.45;
  }

  .pvc__note--highly {
    color: var(--cw-danger);
    font-weight: 600;
  }

  .pvc__note-icon {
    display: inline-flex;
    flex: none;
    margin-top: 0.05rem;
  }

  .pvc__note a {
    color: var(--cw-link);
    font-weight: 400;
  }

  .pvc__choice input:focus-visible + span {
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 3px;
  }

  /* Not applicable: the chosen option stays visible, quietly. */
  .pvc__facet:disabled .pvc__choice {
    cursor: not-allowed;
  }

  .pvc__facet:disabled .pvc__choice > span,
  .pvc__facet:disabled .pvc__advice-icon {
    color: var(--cw-ink-soft);
  }

  .pvc__facet:disabled .pvc__choice input:checked + span {
    background: var(--cw-hairline);
    color: var(--cw-ink-soft);
  }

  .pvc__na {
    margin: 0.3rem 0 0;
    color: var(--cw-ink-soft);
    font-size: 0.8125rem;
  }

  @media (forced-colors: active) {
    .pvc__choice input:checked + span {
      forced-color-adjust: none;
      background: Highlight;
      color: HighlightText;
    }

    .pvc__facet:disabled .pvc__choice input:checked + span {
      background: GrayText;
      color: Canvas;
    }
  }

  .pvc__row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem 1rem;
  }

  .pvc__row:empty {
    display: none;
  }

  .pvc__field {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }

  .pvc__field select {
    min-height: 2rem;
    padding: 0.2rem 0.4rem;
    border: 1px solid var(--cw-hairline-strong);
    border-radius: var(--cw-radius-sm);
    background: var(--cw-paper);
    color: var(--cw-ink);
    font: inherit;
  }

  .pvc__check {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    min-height: 1.5rem;
    cursor: pointer;
  }

  .pvc__check input {
    width: 1rem;
    height: 1rem;
    margin: 0;
    accent-color: var(--cw-primary);
  }

  .pvc__units {
    display: inline-flex;
    border: 1px solid var(--cw-hairline-strong);
    border-radius: var(--cw-radius-sm);
    overflow: hidden;
  }

  .pvc__unit {
    position: relative;
    display: inline-flex;
    cursor: pointer;
  }

  .pvc__unit input {
    position: absolute;
    inset: 0;
    margin: 0;
    opacity: 0;
    cursor: pointer;
  }

  .pvc__unit span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2.25rem;
    min-height: 1.75rem;
    padding: 0 0.5rem;
    color: var(--cw-ink);
  }

  .pvc__unit input:checked + span {
    background: var(--cw-primary);
    color: var(--cw-paper);
  }

  .pvc__unit input:focus-visible + span {
    outline: 2px solid var(--cw-primary);
    outline-offset: -2px;
  }

  /* Forced colors drop background fills, which is how a chosen pill shows;
     use the system highlight colors instead. */
  @media (forced-colors: active) {
    .pvc__unit input:checked + span {
      forced-color-adjust: none;
      background: Highlight;
      color: HighlightText;
      border-color: Highlight;
    }
  }
</style>
