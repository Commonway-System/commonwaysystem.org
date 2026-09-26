<script module lang="ts">
  /** The standard five-source column set. Pages omit `columns` to use it. */
  export const defaultGuidanceColumns = [
    { label: 'Commonway System', highlight: true },
    { label: 'Federal / State baseline' },
    { label: 'NACTO enhancement' },
    { label: 'Complete Streets layer' },
    { label: 'Dutch / Sustainable Safety' },
  ]
</script>

<script lang="ts">
  import Citation from './Citation.svelte'

  /**
   * One piece of cell content: plain text, a citation badge, an internal
   * link, a muted "open gap" note, or a small nested table (`head` labels
   * the columns; the first cell of each body row is its row header).
   */
  export type Segment =
    | string
    | { cite: number }
    | { href: string; label: string }
    | { note: string }
    | { tier: { label: string; body: Segment[] } }
    | { table: { head: string[]; rows: Segment[][][] } }

  export interface GuidanceColumn {
    label: string
    /** The "this is the answer" column: teal tint, teal edge, filled header. */
    highlight?: boolean
  }

  export interface GuidanceCell {
    /** Very short summary shown while the cell is collapsed. */
    summary: string
    /** Full cell content, shown when expanded. */
    content: Segment[]
  }

  export interface GuidanceRow {
    /** Row header, e.g. "Travel lane width". */
    label: string
    /** One entry per column, in column order. */
    cells: GuidanceCell[]
  }

  interface Props {
    /** Defaults to the standard five columns. Each row's `cells` must match this length and order. */
    columns?: GuidanceColumn[]
    rows: GuidanceRow[]
    /** Screen-reader caption. */
    caption?: string
  }

  const { columns = defaultGuidanceColumns, rows, caption }: Props = $props()

  // Per-cell open state; each cell is a native <details>, so it also works
  // by keyboard and without JS. Row headers and the "expand all" button
  // just set these flags in bulk.
  // The highlighted (Commonway System) column counts as two shares of the
  // width left after the row-label column, every other column as one.
  // Plain percentages: calc() widths on <col> aren't honored.
  const LABEL_PCT = 11
  const shares = $derived(columns.reduce((n, c) => n + (c.highlight ? 2 : 1), 0))

  // svelte-ignore state_referenced_locally
  let open = $state(rows.map((r) => r.cells.map(() => false)))
  const rowOpen = (i: number) => open[i].every(Boolean)
  const allOpen = $derived(open.every((r) => r.every(Boolean)))
  const toggleRow = (i: number) => {
    const next = !rowOpen(i)
    open[i] = open[i].map(() => next)
  }
  const toggleAll = () => {
    const next = !allOpen
    open = open.map((r) => r.map(() => next))
  }
</script>

<!--
  Renders the same .cw-table-wrap > .cw-table-scroll > table structure the
  table-scroll.ts rehype plugin produces for markdown tables (a component's
  own <table> never passes through that plugin), so base.css's scroll
  shadow/scrollbar and layout.ts's overflow hint apply unchanged. Cells are
  structured segments, not markdown, since markdown inside a nested
  component slot isn't parsed normally on this site (see CLAUDE.md).
-->
{#snippet segs(list: Segment[])}
  {#each list as seg}
    {#if typeof seg === 'string'}{seg}{:else if 'cite' in seg}<Citation index={seg.cite} />{:else if 'href' in seg}<a href={seg.href}>{seg.label}</a>{:else if 'note' in seg}<span class="guidance__note">{seg.note}</span>{:else if 'tier' in seg}
      <div class="guidance__tier"><strong>{seg.tier.label}</strong> {@render segs(seg.tier.body)}</div>{:else}
      <table class="guidance__inner">
        <thead>
          <tr>{#each seg.table.head as h}<th scope="col">{h}</th>{/each}</tr>
        </thead>
        <tbody>
          {#each seg.table.rows as row}
            <tr>
              {#each row as c, ci}
                {#if ci === 0}<th scope="row">{@render segs(c)}</th>{:else}<td>{@render segs(c)}</td>{/if}
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  {/each}
{/snippet}

<div class="cw-table-wrap guidance">
  <button type="button" class="guidance__all" aria-pressed={allOpen} onclick={toggleAll}>
    {allOpen ? 'Collapse all' : 'Expand all'}
  </button>
  <div class="cw-table-hint" aria-hidden="true">
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
    <span>Scroll for more</span>
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  </div>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div
    class="cw-table-scroll"
    tabindex="0"
    role="group"
    aria-label="Scrollable table. Use arrow keys, or swipe, to see columns beyond the visible area."
  >
    <table class="guidance__table">
      {#if caption}<caption class="cw-sr-only">{caption}</caption>{/if}
      <colgroup>
        <col style="width: {LABEL_PCT}%" />
        {#each columns as col}
          <col style="width: {((100 - LABEL_PCT) * (col.highlight ? 2 : 1)) / shares}%" />
        {/each}
      </colgroup>
      <thead>
        <tr>
          <th scope="col" class="guidance__corner"><span class="cw-sr-only">Design element</span></th>
          {#each columns as col}
            <th scope="col" class="guidance__head" class:guidance__head--hl={col.highlight}>{col.label}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each rows as row, r}
          <tr>
            <th scope="row" class="guidance__rowhead">
              <button type="button" class="guidance__rowbtn" aria-expanded={rowOpen(r)} onclick={() => toggleRow(r)}>{row.label}</button>
            </th>
            {#each row.cells as cell, i}
              <td class="guidance__cell" class:guidance__cell--hl={columns[i]?.highlight}>
                <details bind:open={open[r][i]}>
                  <summary>{cell.summary}</summary>
                  <div class="guidance__full">
                    {@render segs(cell.content)}
                  </div>
                </details>
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .guidance__table {
    min-width: 72rem;
    table-layout: fixed;
  }

  .guidance__table .guidance__head {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--cw-ink-faint);
    vertical-align: bottom;
    border-bottom: 2px solid var(--cw-hairline-strong);
  }

  .guidance__table .guidance__head--hl {
    background: var(--cw-teal);
    color: var(--cw-ink-fixed);
    border-bottom-color: var(--cw-teal);
    border-radius: var(--cw-radius-sm) var(--cw-radius-sm) 0 0;
  }

  .guidance__table .guidance__rowhead {
    font-size: var(--cw-text-sm);
    font-weight: 600;
    vertical-align: top;
    color: var(--cw-ink);
  }

  .guidance__table .guidance__cell {
    vertical-align: top;
    line-height: 1.5;
  }

  .guidance__table .guidance__cell--hl {
    background: var(--cw-primary-soft);
    border-left: 3px solid var(--cw-teal);
    border-right: 1px solid var(--cw-teal);
    color: var(--cw-ink);
  }

  .guidance__all {
    display: block;
    margin: 0 0 0.5rem auto;
    padding: 0.2rem 0.65rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--cw-primary);
    background: transparent;
    border: 1px solid var(--cw-hairline-strong);
    border-radius: var(--cw-radius-sm);
    cursor: pointer;
  }

  .guidance__rowbtn {
    all: unset;
    cursor: pointer;
    font-weight: 600;
    color: var(--cw-ink);
  }
  .guidance__rowbtn:hover {
    color: var(--cw-primary);
    text-decoration: underline;
  }
  .guidance__rowbtn:focus-visible,
  .guidance__all:focus-visible,
  .guidance__cell summary:focus-visible {
    outline: 2px solid var(--cw-primary);
    outline-offset: 2px;
  }

  .guidance__cell summary {
    cursor: pointer;
    list-style: none;
    display: flex;
    gap: 0.4rem;
    align-items: baseline;
    justify-content: space-between;
    font-weight: 500;
  }
  .guidance__cell summary::-webkit-details-marker {
    display: none;
  }
  .guidance__cell summary::after {
    content: '+';
    flex: none;
    color: var(--cw-primary);
    font-weight: 700;
  }
  .guidance__cell details[open] > summary::after {
    content: '\2212';
  }
  .guidance__cell--hl summary {
    font-weight: 700;
    font-size: 1.02rem;
  }

  .guidance__full {
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px dashed var(--cw-hairline-strong);
    font-size: var(--cw-text-sm);
    font-weight: 400;
  }

  .guidance__table .guidance__inner {
    margin: 0.6rem 0 0.2rem;
    width: 100%;
    font-size: 0.85em;
    table-layout: auto;
    min-width: 0;
  }
  .guidance__inner th,
  .guidance__inner td {
    padding: 0.3rem 0.4rem;
    vertical-align: top;
  }

  .guidance__tier {
    margin-top: 0.55rem;
    padding-left: 0.6rem;
    border-left: 3px solid var(--cw-hairline-strong);
  }
  .guidance__tier:first-child {
    margin-top: 0;
  }
  .guidance__tier > strong {
    display: block;
    font-size: 0.72rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--cw-primary);
  }

  .guidance__note {
    /* --cw-ink-soft, not -faint: faint measured 4.47-4.49:1 on the highlighted
       column's tinted background (found expanding cells during the
       display-settings audit; collapsed cells were never scanned). */
    font-style: italic;
    color: var(--cw-ink-soft);
  }
</style>
