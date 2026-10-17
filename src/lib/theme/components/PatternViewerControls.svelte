<script lang="ts">
  import type { Annotations, ConfigId, Facet, Units } from '$lib/viewer/types'

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
    config: ConfigId | undefined
    onconfig: (id: ConfigId) => void
    /** Offer compare mode at all (this view allows it and there are two or more configurations). */
    canCompare: boolean
    compare: ConfigId | undefined
    oncompare: (id: ConfigId | undefined) => void
    compareDefault: ConfigId | undefined
    facets: Facet[]
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
    config,
    onconfig,
    canCompare,
    compare,
    oncompare,
    compareDefault,
    facets,
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
</script>

<div class="pvc">
  {#if all.length > 1}
    <fieldset class="pvc__group">
      <legend class="pvc__legend">{retrofit ? 'Show' : 'Configuration'}</legend>
      <div class="pvc__ladder">
        {#each ladder as id, i (id)}
          {#if i > 0}<span class="pvc__step" aria-hidden="true">›</span>{/if}
          <label class="pvc__rung" class:pvc__rung--top={!retrofit && i === ladder.length - 1}>
            <input type="radio" name="{idPrefix}-config" value={id} checked={config === id} onchange={() => onconfig(id)} />
            <span>{labelFor(id)}</span>
          </label>
        {/each}
      </div>
      {#if references.length}
        <div class="pvc__refs">
          <span class="pvc__refs-label" aria-hidden="true">For comparison</span>
          {#each references as id (id)}
            <label class="pvc__rung pvc__rung--ref">
              <input type="radio" name="{idPrefix}-config" value={id} checked={config === id} onchange={() => onconfig(id)} />
              <span>{labelFor(id)}<span class="cw-sr-only"> (for comparison, outside the ladder)</span></span>
            </label>
          {/each}
        </div>
      {/if}
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

  {#if facets.length}
    <div class="pvc__row">
      {#each facets as facet (facet.id)}
        <label class="pvc__field">
          <span>{facet.label}</span>
          <select value={facetValues[facet.id]} onchange={e => onfacet(facet.id, e.currentTarget.value)}>
            {#each facet.options as option (option.id)}
              <option value={option.id}>{option.label}</option>
            {/each}
          </select>
        </label>
      {/each}
    </div>
  {/if}

  <div class="pvc__row">
    {#if canCompare && compareOptions.length}
      <label class="pvc__check">
        <input type="checkbox" checked={compare !== undefined} onchange={e => oncompare(e.currentTarget.checked ? (compareDefault && compareDefault !== config ? compareDefault : compareOptions[0]) : undefined)} />
        <span>Compare side by side</span>
      </label>
      {#if compare !== undefined}
        <label class="pvc__field">
          <span>with</span>
          <select value={compare} onchange={e => oncompare(e.currentTarget.value as ConfigId)}>
            {#each compareOptions as id (id)}
              <option value={id}>{labelFor(id)}</option>
            {/each}
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

  .pvc__ladder,
  .pvc__refs {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.35rem;
  }

  .pvc__refs {
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px dashed var(--cw-hairline-strong);
  }

  .pvc__refs-label {
    font-size: 0.75rem;
    color: var(--cw-ink-soft);
    margin-right: 0.25rem;
  }

  .pvc__step {
    color: var(--cw-ink-faint);
  }

  /* A radio styled as a pill; the real input stays in the accessibility
     tree and keyboard order, visually replaced by the pill's own state. */
  .pvc__rung {
    position: relative;
    display: inline-flex;
    cursor: pointer;
  }

  .pvc__rung input {
    position: absolute;
    inset: 0;
    margin: 0;
    opacity: 0;
    cursor: pointer;
  }

  .pvc__rung > span {
    display: inline-flex;
    align-items: center;
    min-height: 2rem;
    padding: 0.25rem 0.75rem;
    border: 1px solid var(--cw-hairline-strong);
    border-radius: 999px;
    color: var(--cw-ink);
    background: var(--cw-paper);
  }

  .pvc__rung--top > span {
    font-weight: 600;
  }

  .pvc__rung--ref > span {
    border-style: dashed;
  }

  .pvc__rung input:checked + span {
    border-color: var(--cw-primary);
    background: var(--cw-primary);
    color: var(--cw-paper);
  }

  .pvc__rung input:focus-visible + span {
    outline: 2px solid var(--cw-primary);
    outline-offset: 2px;
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
    .pvc__rung input:checked + span,
    .pvc__unit input:checked + span {
      forced-color-adjust: none;
      background: Highlight;
      color: HighlightText;
      border-color: Highlight;
    }
  }
</style>
