<script lang="ts">
  import { AUDIT_DATE, categories, items, score } from '$lib/audit.js'
  import type { Status } from '$lib/audit.js'

  // /about/website-audit/: renders src/lib/audit.ts. Every number on the page
  // is computed from that file, so the page can't drift from the data.
  const labels: Record<Status, string> = {
    pass: 'Pass',
    partial: 'Partial',
    fail: 'Fail',
    na: 'Not applicable',
    unchecked: 'Not yet reviewed',
  }
  // A shape per status, so the badge never relies on color alone.
  const marks: Record<Status, string> = { pass: '✓', partial: '½', fail: '✕', na: '–', unchecked: '?' }
  const order: Status[] = ['pass', 'partial', 'fail', 'unchecked', 'na']

  const overall = score(items)
  const reviewed = overall.total - overall.counts.unchecked
  const sections = categories.map((name) => {
    const list = items.filter(i => i.category === name)
    return { name, id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), list, s: score(list) }
  })
  const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1))
  const pct = (n: number) => `${Math.round(n)}%`

  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const [y, m, d] = AUDIT_DATE.split('-').map(Number)
  const dateLabel = `${MONTHS[m - 1]} ${d}, ${y}`

  let filter = $state<Status | 'all'>('all')
  const shownCount = $derived(filter === 'all' ? items.length : items.filter(i => i.status === filter).length)
</script>

<section class="wa-summary" aria-label="Overall score">
  <p class="wa-summary__big">
    <span class="wa-summary__pct">{pct(overall.percent)}</span>
    <span class="wa-summary__of">{fmt(overall.earned)} of {overall.possible} applicable points</span>
  </p>
  <div class="wa-meter" role="img" aria-label="{pct(overall.percent)} of applicable points earned">
    <span style:width="{overall.percent}%"></span>
  </div>
  <p class="wa-summary__meta">
    {reviewed} of {overall.total} items reviewed. The {overall.counts.unchecked} not yet reviewed and
    {overall.counts.na} not applicable are left out of the score. Last updated {dateLabel}.
  </p>
  <ul class="wa-tally">
    {#each order as st}
      <li><span class="wa-badge wa-badge--{st}"><span aria-hidden="true">{marks[st]}</span> {labels[st]}</span> {overall.counts[st]}</li>
    {/each}
  </ul>
</section>

<h2 id="scores-by-section">Scores by section</h2>
<div class="wa-sections">
  <table>
    <thead>
      <tr><th scope="col">Section</th><th scope="col">Points</th><th scope="col">Score</th></tr>
    </thead>
    <tbody>
      {#each sections as sec}
        <tr>
          <th scope="row"><a href="#{sec.id}">{sec.name}</a></th>
          <td>{fmt(sec.s.earned)} / {sec.s.possible}</td>
          <td>{pct(sec.s.percent)}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<div class="wa-filters" role="group" aria-label="Show items by status" data-pagefind-ignore>
  <button type="button" aria-pressed={filter === 'all'} onclick={() => (filter = 'all')}>All</button>
  {#each order as st}
    <button type="button" aria-pressed={filter === st} onclick={() => (filter = st)}>{labels[st]}</button>
  {/each}
</div>
<p class="cw-sr-only" role="status">
  {filter === 'all' ? `Showing all ${shownCount} items` : `Showing ${shownCount} ${shownCount === 1 ? 'item' : 'items'} marked ${labels[filter].toLowerCase()}`}
</p>

{#each sections as sec}
  {@const shown = sec.list.filter(i => filter === 'all' || i.status === filter)}
  <section class="wa-cat" aria-labelledby={sec.id} hidden={shown.length === 0}>
    <div class="wa-cat__head">
      <h2 id={sec.id}>{sec.name}</h2>
      <p class="wa-cat__score">{fmt(sec.s.earned)} / {sec.s.possible} points ({pct(sec.s.percent)})</p>
    </div>
    <ul class="wa-items">
      {#each shown as it}
        <li class="wa-item">
          <div class="wa-item__tags">
            <span class="wa-badge wa-badge--{it.status}"><span aria-hidden="true">{marks[it.status]}</span> {labels[it.status]}</span>
            <span class="wa-item__tier">{it.tier}</span>
          </div>
          <div>
            <h3>{it.name}</h3>
            <p>{it.note}</p>
          </div>
        </li>
      {/each}
    </ul>
  </section>
{/each}

<style>
  .wa-summary {
    margin: 1.5rem 0 2rem;
    padding: 1.25rem 1.5rem;
    background: var(--cw-paper-raised);
    border: 1px solid var(--cw-hairline);
    border-left: 4px solid var(--cw-primary);
    border-radius: var(--cw-radius-lg);
  }

  :global(.cw-content) .wa-summary__big {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.25rem 1rem;
    margin: 0 0 0.75rem;
  }

  .wa-summary__pct {
    font-family: var(--cw-font-display);
    font-size: clamp(3rem, 9vw, 4rem);
    font-weight: 700;
    line-height: 1;
    color: var(--cw-primary);
  }

  .wa-summary__of {
    color: var(--cw-ink-soft);
    font-weight: 600;
  }

  .wa-meter {
    height: 0.75rem;
    border-radius: 999px;
    background: var(--cw-hairline);
    overflow: hidden;
  }

  .wa-meter span {
    display: block;
    height: 100%;
    background: var(--cw-primary);
  }

  :global(.cw-content) .wa-summary__meta {
    margin: 0.85rem 0;
    color: var(--cw-ink-soft);
    font-size: var(--cw-text-sm);
  }

  :global(.cw-content) .wa-tally {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.25rem;
    margin: 0;
    padding: 0.75rem 0 0;
    list-style: none;
    border-top: 1px solid var(--cw-hairline);
    font-weight: 600;
  }

  :global(.cw-content) .wa-tally li {
    margin: 0;
  }

  /* Status pills. Text label plus a shape, so color is never the only cue. */
  .wa-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.1rem 0.55rem;
    border: 1px solid currentColor;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1.5;
    white-space: nowrap;
  }

  .wa-badge--pass {
    color: var(--cw-primary);
    background: var(--cw-primary-soft);
  }

  .wa-badge--partial {
    color: var(--cw-descriptive-ink);
    background: color-mix(in srgb, var(--cw-descriptive-ink) 12%, var(--cw-paper));
  }

  .wa-badge--fail {
    color: var(--cw-danger);
    background: var(--cw-danger-soft);
  }

  .wa-badge--na,
  .wa-badge--unchecked {
    color: var(--cw-ink-soft);
    background: color-mix(in srgb, var(--cw-ink) 6%, var(--cw-paper));
  }

  .wa-badge--unchecked {
    border-style: dashed;
  }

  .wa-sections table {
    width: 100%;
  }

  .wa-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 2rem 0 0.5rem;
  }

  .wa-filters button {
    min-height: 2.25rem;
    padding: 0 0.9rem;
    border: 1px solid var(--cw-hairline-strong);
    border-radius: 999px;
    background: var(--cw-paper);
    color: var(--cw-ink);
    font: 600 var(--cw-text-sm) / 1 var(--cw-font-body);
    cursor: pointer;
  }

  .wa-filters button:hover {
    border-color: var(--cw-ink);
  }

  .wa-filters button[aria-pressed='true'] {
    background: var(--cw-ink);
    border-color: var(--cw-ink);
    color: var(--cw-paper);
  }

  .wa-cat {
    margin-top: 2.5rem;
  }

  .wa-cat[hidden] {
    display: none;
  }

  .wa-cat__head {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.25rem 1rem;
    border-bottom: 2px solid var(--cw-ink);
  }

  :global(.cw-content) .wa-cat__head h2 {
    margin: 0 0 0.35rem;
    border: 0;
    padding: 0;
  }

  :global(.cw-content) .wa-cat__score {
    margin: 0 0 0.35rem;
    color: var(--cw-ink-soft);
    font-weight: 600;
    font-size: var(--cw-text-sm);
  }

  :global(.cw-content) .wa-items {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  :global(.cw-content) .wa-item {
    display: grid;
    grid-template-columns: 9.5rem minmax(0, 1fr);
    gap: 0.4rem 1rem;
    margin: 0;
    padding: 0.85rem 0;
    border-bottom: 1px solid var(--cw-hairline);
  }

  .wa-item__tags {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
  }

  .wa-item__tier {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--cw-ink-soft);
  }

  :global(.cw-content) .wa-item h3 {
    margin: 0 0 0.2rem;
    font-family: var(--cw-font-body);
    font-size: var(--cw-text-base);
    font-weight: 700;
  }

  :global(.cw-content) .wa-item p {
    margin: 0;
    color: var(--cw-ink-soft);
    font-size: var(--cw-text-sm);
  }

  @media (max-width: 560px) {
    :global(.cw-content) .wa-item {
      grid-template-columns: minmax(0, 1fr);
    }
    .wa-item__tags {
      flex-direction: row;
      align-items: center;
    }
  }
</style>
