<script lang="ts">
  import type { RegionMap } from '$lib/data/agencies/maps/index.js'

  // The Road Agency Directory's map view: one link per state or territory,
  // shaded by how many agencies have been researched there. Choosing one
  // filters the list to it. Each link's name carries the place and its count,
  // and the list is the full text alternative, so the shading is never the
  // only way to read it.

  interface Props {
    map: RegionMap
    /** Region code to name. */
    names: Record<string, string>
    /** Region code to the number of researched agencies based there. */
    counts: Record<string, number>
    selected: string
    onselect: (code: string) => void
  }

  const { map, names, counts, selected, onselect }: Props = $props()

  // Screen readers and the Tab key meet the places in alphabetical order.
  const regions = $derived([...map.regions].sort((a, b) => (names[a.code] ?? a.code).localeCompare(names[b.code] ?? b.code)))

  function step(n: number): 0 | 1 | 2 | 3 {
    if (n <= 0)
      return 0
    if (n === 1)
      return 1
    return n < 10 ? 2 : 3
  }

  const legend = [
    { step: 0, label: 'None researched yet' },
    { step: 1, label: '1 agency' },
    { step: 2, label: '2 to 9 agencies' },
    { step: 3, label: '10 or more' },
  ]

  function label(code: string): string {
    const n = counts[code] ?? 0
    const name = names[code] ?? code
    return n === 0 ? `${name}: none researched yet` : `${name}: ${n} ${n === 1 ? 'agency' : 'agencies'}`
  }

  function choose(event: MouseEvent, code: string) {
    // Let a modified click open the filtered list in a new tab, as a link would.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0)
      return
    event.preventDefault()
    onselect(code)
  }
</script>

<figure class="ram">
  <svg viewBox={map.viewBox.join(' ')} role="group" aria-label="Map of states and territories">
    <defs>
      <pattern id="ram-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="6" height="6" class="ram__s0" />
        <line x1="0" y1="0" x2="0" y2="6" class="ram__hatch-line" />
      </pattern>
    </defs>
    {#each regions as r (r.code)}
      {@const s = step(counts[r.code] ?? 0)}
      <a
        href="?region={r.code}"
        class="ram__region"
        class:ram__region--selected={selected === r.code}
        aria-label={label(r.code)}
        aria-current={selected === r.code ? 'true' : undefined}
        onclick={e => choose(e, r.code)}
      >
        <title>{label(r.code)}</title>
        {#if r.inset}
          <rect class="ram__inset" x={r.inset.x} y={r.inset.y} width={r.inset.w} height={r.inset.h} rx="6" />
          <text class="ram__inset-name" x={r.label[0]} y={r.label[1]} aria-hidden="true">{names[r.code]}</text>
        {/if}
        <path d={r.d} class="ram__shape ram__s{s}" />
        {#if r.callout}
          <line class="ram__leader" x1={r.callout.from[0]} y1={r.callout.from[1]} x2={r.callout.x} y2={r.callout.y + r.callout.h / 2} aria-hidden="true" />
          <rect class="ram__shape ram__s{s}" x={r.callout.x} y={r.callout.y} width={r.callout.w} height={r.callout.h} rx="4" />
        {/if}
        {#if !r.inset}
          <text class="ram__label" x={r.label[0]} y={r.label[1]} aria-hidden="true">{r.abbr}</text>
        {/if}
      </a>
    {/each}
  </svg>
  <figcaption>
    <ul class="ram__legend" aria-label="Map shading">
      {#each legend as l (l.step)}
        <li><svg class="ram__swatch" viewBox="0 0 20 14" aria-hidden="true"><rect width="20" height="14" rx="2" class="ram__shape ram__s{l.step}" /></svg>{l.label}</li>
      {/each}
    </ul>
    <p class="ram__source">Outlines: U.S. Census Bureau cartographic boundary files, via us-atlas. Alaska, Hawaii and the territories are not to scale or position.</p>
  </figcaption>
</figure>

<style>
  .ram {
    margin: 0;
  }

  .ram svg {
    display: block;
    width: 100%;
    height: auto;
  }

  .ram__shape {
    stroke: var(--cw-map-stroke);
    stroke-width: 0.75;
    stroke-linejoin: round;
  }

  .ram__s0 {
    fill: var(--cw-map-0);
  }

  path.ram__s0,
  rect.ram__shape.ram__s0 {
    fill: url(#ram-hatch);
  }

  .ram__s1 {
    fill: var(--cw-map-1);
  }

  .ram__s2 {
    fill: var(--cw-map-2);
  }

  .ram__s3 {
    fill: var(--cw-map-3);
  }

  .ram__hatch-line {
    stroke: var(--cw-map-hatch);
    stroke-width: 2;
  }

  .ram__leader {
    stroke: var(--cw-map-stroke);
    stroke-width: 1;
  }

  /* A territory's whole box is part of its link, so it's easy to hit. */
  .ram__inset {
    fill: var(--cw-paper-raised);
    stroke: var(--cw-map-stroke);
    stroke-width: 1;
  }

  /* Labels are ink on a paper halo, so they read on every shade. */
  .ram__label,
  .ram__inset-name {
    fill: var(--cw-ink);
    stroke: var(--cw-paper);
    stroke-width: 3px;
    paint-order: stroke;
    font-family: var(--cw-font-body);
    font-size: 15px;
    font-weight: 600;
    pointer-events: none;
  }

  .ram__label {
    text-anchor: middle;
    dominant-baseline: central;
  }

  .ram__inset-name {
    font-size: 16px;
  }

  .ram__region {
    cursor: pointer;
    outline: none;
  }

  /* Hover, keyboard focus and the chosen state all get a heavy ink outline
     (3.5:1 or more against every shade, in every theme). Focus adds a dash
     so it stays distinct from the chosen state. */
  .ram__region:hover .ram__shape,
  .ram__region--selected .ram__shape,
  .ram__region:focus-visible .ram__shape,
  .ram__region:focus-visible .ram__inset {
    stroke: var(--cw-ink);
    stroke-width: 3;
  }

  .ram__region:focus-visible .ram__shape,
  .ram__region:focus-visible .ram__inset {
    stroke-dasharray: 6 3;
  }

  .ram__legend {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem 1.25rem;
    margin: 0.75rem 0 0;
    padding: 0;
    list-style: none;
    font-size: var(--cw-text-sm);
    color: var(--cw-ink-soft);
  }

  .ram__source {
    margin: 0.5rem 0 0;
    font-size: 0.8125rem;
    color: var(--cw-ink-soft);
  }

  .ram__legend li {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    margin: 0;
  }

  .ram svg.ram__swatch {
    width: 1.5rem;
    height: auto;
    flex: none;
  }
</style>
