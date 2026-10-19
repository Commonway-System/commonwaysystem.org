<script lang="ts">
  import type { Annotations, CompareTarget, ConfigId, Facet, Units } from '$lib/viewer/types'
  import { CONFIG_SHORT_LABELS } from '$lib/viewer/types'

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

  // One shared tooltip, outside the clipped ladder: shown on hover and on
  // keyboard focus, dismissed with Escape (WCAG 1.4.13).
  let tip = $state<{ id: ConfigId, left: number } | undefined>()
  function showTip(id: ConfigId, el: HTMLElement) {
    tip = { id, left: el.offsetLeft + el.offsetWidth / 2 }
  }
  const hideTip = () => { tip = undefined }
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
      <div class="pvc__ladder-wrap" onkeydown={onladderkey}>
        <div class="pvc__ladder" onpointerleave={hideTip}>
          {#each [...ladder, ...references] as id, i (id)}
            {@const isRef = i >= ladder.length}
            <label
              class="pvc__seg"
              class:pvc__seg--notch={!isRef && i > 0}
              class:pvc__seg--point={!isRef && i < ladder.length - 1}
              class:pvc__seg--ref={isRef}
              class:pvc__seg--top={!retrofit && i === ladder.length - 1}
              onpointerenter={e => showTip(id, e.currentTarget)}
              onfocusin={e => showTip(id, e.currentTarget)}
              onfocusout={hideTip}
            >
              <input type="radio" name="{idPrefix}-config" value={id} aria-label={tipFor(id)} checked={config === id} onchange={() => onconfig(id)} />
              <span class="pvc__face">{#if id === 'commonway' && shortLabelFor(id) === CONFIG_SHORT_LABELS[id]}Commonway<span class="pvc__sys">&nbsp;System</span>{:else}{shortLabelFor(id)}{/if}</span>
            </label>
          {/each}
        </div>
        {#if tip}
          <span class="pvc__tip" aria-hidden="true" style:left="{tip.left}px">{tipFor(tip.id)}</span>
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
       the Federal / State minimum). -->
  {#each facets as facet (facet.id)}
    {@const applies = facetApplicable(facet.id)}
    <fieldset class="pvc__group pvc__facet" disabled={!applies} aria-describedby={applies ? undefined : `${idPrefix}-na-${facet.id}`}>
      <legend class="pvc__legend">{facet.label}</legend>
      <div class="pvc__choices">
        {#each facet.options as option (option.id)}
          <label class="pvc__choice">
            <input type="radio" name="{idPrefix}-facet-{facet.id}" value={option.id} checked={facetValues[facet.id] === option.id} onchange={() => onfacet(facet.id, option.id)} />
            <span>{option.label}</span>
          </label>
        {/each}
      </div>
      {#if !applies && config}
        <p class="pvc__na" id="{idPrefix}-na-{facet.id}">Doesn't apply to {labelFor(config)}.</p>
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

  /* One segmented control. The group's own background shows through the
     gaps between faces, which makes the dividers; faces between two rungs
     are clipped to chevrons (notch on the left, point on the right) so the
     points read "better than". Dutch practice is outside the ladder, so it
     has straight edges. The real radio inputs stay in the accessibility tree
     and keyboard order. */
  .pvc__ladder-wrap {
    position: relative;
    --pvc-d: 0.45rem;
  }

  .pvc__ladder {
    display: flex;
    width: fit-content;
    max-width: 100%;
    flex-wrap: nowrap;
    border: 1px solid var(--cw-hairline-strong);
    border-radius: 999px;
    background: var(--cw-hairline-strong);
    overflow: hidden;
  }

  .pvc__ladder:has(input:focus-visible) {
    outline: 2px solid var(--cw-primary);
    outline-offset: 2px;
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

  .pvc__seg--notch {
    margin-left: calc(1px - var(--pvc-d));
  }

  .pvc__seg--ref {
    flex: 0 1 auto;
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
    min-height: 2rem;
    padding: 0.25rem 0.6rem;
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

  @media (max-width: 480px) {
    .pvc__ladder-wrap {
      --pvc-d: 0.3rem;
    }

    .pvc__seg--top .pvc__face {
      font-weight: 500;
    }

    .pvc__sys {
      display: none;
    }

    .pvc__face {
      padding-inline: 0.1rem;
      font-size: 0.6875rem;
    }

    .pvc__seg--notch .pvc__face {
      padding-left: calc(var(--pvc-d) + 0.05rem);
    }

    .pvc__seg--point .pvc__face {
      padding-right: calc(var(--pvc-d) + 0.05rem);
    }
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

  .pvc__choice span {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 2rem;
    padding: 0.25rem 0.7rem;
    white-space: nowrap;
    color: var(--cw-ink);
    background: var(--cw-paper);
  }

  .pvc__choice input:checked + span {
    background: var(--cw-primary);
    color: var(--cw-paper);
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

  .pvc__facet:disabled .pvc__choice span {
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
