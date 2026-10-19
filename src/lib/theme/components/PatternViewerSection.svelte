<script lang="ts">
  import { onMount } from 'svelte'
  import type { CyclistVariant, Measure, PedestrianVariant, SceneBox, SceneColumn, SliceColumn, VehicleVariant } from '$lib/viewer/art'
  import { cyclist, frontage, groundCut, isRaisedSegment, surfaceY, laneVehicle, makeIds, measureText, measureWith, PEDESTRIAN_POOL, PEDESTRIAN_WIDTH, pedestrian, place, plainCyclist, plainItem, plainPedestrian, plainVehicle, rng, seedOf, sky, slice, streetItem, vehicle } from '$lib/viewer/art'
  import { spread, widthsAt } from '$lib/viewer/geometry'
  import { layoutAnnotations } from '$lib/viewer/section-layout'
  import { formatLength } from '$lib/viewer/state'
  import type { RendererProps, Segment } from '$lib/viewer/types'

  // Cross-section renderer: a cut across the street, edge to edge, drawn to
  // scale from the configuration's segment list, in the illustrated style
  // approved on 2026.10.17 (sky, frontage past the property lines, a cut
  // through the ground, people and vehicles from src/lib/viewer/art/).
  // Measures its own box and lays out in real pixels, so text stays readable
  // at every size (a fixed viewBox would shrink 12px labels to 4px on a phone).
  const { entry, units, annotations, cut, changes, expanded, descriptionId, label }: RendererProps = $props()

  // Unique per instance: Compare and full view put two drawings on the page.
  const uid = $props.id()

  let box: HTMLDivElement | undefined = $state()
  let svgEl: SVGSVGElement | undefined = $state()
  let w = $state(720)
  let h = $state(405)
  // Text widths come from a table of Inter's widths on the first render (so
  // it matches the prerendered page), then from the browser for the font the
  // drawing really uses: a reader's reading font, or Simplified view's.
  let measure: Measure = $state(measureText)
  let mounted = $state(false)

  onMount(() => {
    mounted = true
    if (!box)
      return
    const remeasure = () => {
      if (svgEl)
        measure = measureWith(getComputedStyle(svgEl).fontFamily)
    }
    remeasure()
    document.fonts?.ready.then(remeasure)
    const mo = new MutationObserver(remeasure)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-font', 'data-view'] })
    const ro = new ResizeObserver(([e]) => {
      if (e.contentRect.width > 0 && e.contentRect.height > 0) {
        w = e.contentRect.width
        h = e.contentRect.height
      }
    })
    ro.observe(box)
    return () => {
      ro.disconnect()
      mo.disconnect()
    }
  })

  const config = $derived(entry.config?.kind === 'street' ? entry.config : undefined)
  const section = $derived(config?.sections?.find(s => s.id === cut) ?? config?.sections?.[0])

  // Which segments each callout number points at.
  const badgeFor = $derived(new Map(changes.flatMap(c => c.segments.map(id => [id, c.n] as const))))

  /** Tallest standing object, feet (a mature street tree); sets the glyph scale when space is short. */
  const TALLEST = 22.5

  /** Gap above the top-down slice, and the caption row under it, px. */
  const SLICE_GAP = 12
  const SLICE_CAPTION = 20

  /**
   * The whole layout at a width. With `availH` null the drawing takes its
   * natural height: standing objects at the street's true scale, then the
   * ground cut, the dimension rows and band, and the top-down slice. With a
   * height (full view), everything is fitted into it instead.
   */
  function layoutAt(width: number, availH: number | null) {
    if (!config)
      return undefined
    const widths = widthsAt(config, section?.at)
    const segs = config.segments.map((s, i) => ({ s, wd: widths[i] })).filter(x => x.wd > 0.05)
    const total = segs.reduce((a, x) => a + x.wd, 0)
    const front = { left: config.frontage?.left ?? 'lawn', right: config.frontage?.right ?? 'lawn' } as const
    const frontW = (kind: string) => kind === 'buildings' ? Math.max(16, Math.min(width * 0.08, 90)) : Math.max(12, Math.min(width * 0.05, 64))
    const left = frontW(front.left)
    const right = width - frontW(front.right)

    const scale = (right - left) / Math.max(total, 1)

    let x = left
    const cols = segs.map(({ s, wd }) => {
      const x0 = x
      x += wd * scale
      return { s, wd, x0, x1: x, cx: (x0 + x) / 2 }
    })
    const ann = layoutAnnotations({
      cols,
      left,
      right,
      w: width,
      h: availH ?? width * 0.6,
      labels: annotations.labels,
      dimensions: annotations.dimensions,
      units,
      cutLabel: section && (config.sections?.length ?? 0) > 1 ? section.label : undefined,
      isRaised: isRaisedSegment,
      measure,
    })
    const top = changes.some(c => c.segments.length) ? 26 : 4
    const cutH = Math.max(12, Math.min(3.2 * scale, 40))
    const curbH = Math.max(3, Math.min(8, 0.5 * scale))
    // The slice shows about a third of the street's width in length (18 ft
    // of a 56 ft street), at the same scale.
    const sliceNatural = annotations.slice ? (right - left) * 0.32 : 0
    let road: number
    let sliceH: number
    if (availH === null) {
      sliceH = sliceNatural
      road = top + TALLEST * scale + 24 + curbH
    }
    else {
      sliceH = Math.min(sliceNatural, availH * 0.3)
      road = availH - ann.height - cutH - (sliceH ? SLICE_GAP + sliceH + SLICE_CAPTION : 0)
    }
    // One glyph scale for every standing object, true to the street's scale
    // unless the tallest wouldn't fit under the badge row.
    const gs = Math.min(scale, Math.max(road - curbH - top - 4, 10) / TALLEST)
    const b: SceneBox = { w: width, left, right, road, curbH, cutBottom: road + cutH, S: scale, gs }
    const placed = cols.map(c => ({ ...c, y: surfaceY(c, b) }))
    const ay = b.cutBottom
    const sliceY = ay + ann.height + SLICE_GAP
    const H = sliceH ? sliceY + sliceH + SLICE_CAPTION : ay + ann.height

    const badged = placed.filter(c => badgeFor.has(c.s.id))
    const badgeX = spread(badged.map(c => c.cx), 21, left + 10, right - 10)
    const badges = badged.map((c, i) => ({ c, x: badgeX[i], n: badgeFor.get(c.s.id)! }))

    return { cols: placed, total, left, right, scale, road, gs, b, front, top, badges, ann, ay, sliceY, sliceH, H }
  }

  // Normal view: the drawing sets its own height. Full view: it fits the box.
  const natural = $derived(!expanded)
  const L = $derived(layoutAt(w, natural ? null : h))
  const svgH = $derived(natural && L ? L.H : h)

  // The box's height before the browser has measured anything: a linear fit
  // of the natural height against the viewer's width (container query units),
  // so the prerendered page reserves about the right space and doesn't jump
  // when the drawing lays itself out. Exact pixels once mounted.
  const boxHeight = $derived.by(() => {
    if (!natural || !L)
      return undefined
    if (mounted)
      return `${Math.ceil(L.H)}px`
    const wide = layoutAt(720, null)?.H ?? 0
    const narrow = layoutAt(360, null)?.H ?? 0
    const k = (wide - narrow) / 360
    return `calc(${(k * 100).toFixed(3)}cqw + ${(wide - k * 720).toFixed(1)}px)`
  })
  const A = $derived(L?.ann)

  /** A dimension tick: an architectural slash plus a short extension line. */
  const tick = (x: number, y: number) => `M ${x - 3.5} ${y + 3.5} L ${x + 3.5} ${y - 3.5} M ${x} ${y - 5} V ${y + 5}`

  /** Pedestrians for one sidewalk: the data's own `people` if listed, else seeded; as many as fit. */
  function walkers(s: Segment, wd: number, wantWheelchair: boolean): PedestrianVariant[] {
    if (s.people?.length) {
      const out: PedestrianVariant[] = []
      let used = 0
      for (const v of s.people) {
        const need = PEDESTRIAN_WIDTH[v] + (out.length ? 0.4 : 0)
        if (used + need > wd - 0.8)
          break
        out.push(v)
        used += need
      }
      return out
    }
    const r = rng(seedOf(s.id, 'walkers'))
    const pool = PEDESTRIAN_POOL
    const out: PedestrianVariant[] = []
    let used = 0
    const room = wd - 0.8
    if (wantWheelchair && PEDESTRIAN_WIDTH.wheelchair <= room) {
      out.push('wheelchair')
      used += PEDESTRIAN_WIDTH.wheelchair
    }
    for (let tries = 0; tries < 4 && out.length < 2; tries++) {
      const v = pool[Math.floor(r() * pool.length)]
      if (used + PEDESTRIAN_WIDTH[v] + (out.length ? 0.4 : 0) <= room) {
        out.push(v)
        used += PEDESTRIAN_WIDTH[v] + (out.length > 1 ? 0.4 : 0)
      }
    }
    return out
  }

  /** Mostly commuters; cargo bikes where the lane has room; now and then a child. */
  function cyclistFor(seed: number, laneWidth: number): CyclistVariant {
    const x = rng(seed + 5)()
    if (x < 0.25 && laneWidth >= 5)
      return 'cargo'
    return x > 0.85 ? 'child' : 'commuter'
  }

  function itemXs(c: { s: Segment, x0: number, x1: number }, scale: number) {
    const items = c.s.items ?? []
    const types = [...new Set(items.map(i => i.type))]
    return types.map((type, j) => {
      const withOffset = items.find(i => i.type === type && i.offset !== undefined)
      const x = withOffset ? c.x0 + withOffset.offset! * scale : c.x0 + ((j + 1) * (c.x1 - c.x0)) / (types.length + 1)
      return { type, x }
    })
  }

  // The illustrated layers, as markup: everything here is a pure function of
  // the layout, so the prerendered page and the browser agree.
  const art = $derived.by(() => {
    if (!L)
      return { scene: '', objects: '', plain: '', slice: '' }
    const ids = makeIds(uid)
    const { b, cols, gs } = L
    const sceneCols: SceneColumn[] = cols
    const roadMid = (L.left + L.right) / 2
    let scene = sky(ids, b, seedOf('sky', L.total))
    scene += groundCut(ids, sceneCols, b)
    scene += frontage(ids, L.front.left, 'left', b, cols[0]?.s, seedOf('front-l', L.total))
    scene += frontage(ids, L.front.right, 'right', b, cols.at(-1)?.s, seedOf('front-r', L.total))

    // Two object layers from the same placements: the illustrated one, and
    // the plain outline symbols Simplified view shows instead.
    let objects = ''
    let plain = ''
    const put = (x: number, y: number, art: string, simple: string) => {
      objects += place(x, y, gs, art)
      plain += place(x, y, gs, simple)
    }
    let wheelchairPlaced = false
    // Who's on each strip, so the slice below shows the same people and vehicles.
    const sliceCols: SliceColumn[] = []
    // Which way a parked car faces: the nearest travel lane's direction.
    const laneDir = (i: number) => {
      for (let d = 1; d < cols.length; d++) {
        for (const j of [i - d, i + d]) {
          const s = cols[j]?.s
          if (s && (s.type === 'travel-lane' || s.type === 'turn-lane'))
            return s.direction !== 'outbound'
        }
      }
      return true
    }
    cols.forEach((c, i) => {
      const t = c.s.type
      const sc: SliceColumn = { s: c.s, x0: c.x0, x1: c.x1, items: itemXs(c, L.scale) }
      sliceCols.push(sc)
      // Items first, so people and vehicles stand in front of trees and poles.
      for (const it of sc.items) {
        const toward = it.x < roadMid ? 1 : -1
        put(it.x, c.y, streetItem(ids, it.type, seedOf(c.s.id, it.type), toward), plainItem(it.type, toward))
      }
      if (t === 'sidewalk') {
        const vs = walkers(c.s, c.wd, !wheelchairPlaced && c.wd >= 4)
        if (vs.includes('wheelchair'))
          wheelchairPlaced = true
        const widths = vs.map(v => PEDESTRIAN_WIDTH[v] * L.scale)
        const gap = (c.x1 - c.x0 - widths.reduce((a, v) => a + v, 0)) / (vs.length + 1)
        let px = c.x0 + gap
        sc.users = { kind: 'pedestrians', variants: vs }
        vs.forEach((v, k) => {
          put(px + widths[k] / 2, c.y, pedestrian(v, seedOf(c.s.id, 'p', k)), plainPedestrian(v))
          px += widths[k] + gap
        })
      }
      else if (t === 'travel-lane' || t === 'turn-lane' || t === 'parking' || t === 'transit-lane') {
        const seed = seedOf(c.s.id, 'car')
        const v: VehicleVariant = t === 'transit-lane' ? 'bus' : laneVehicle(seed)
        const toward = t === 'parking' ? laneDir(i) : c.s.direction !== 'outbound'
        sc.users = { kind: 'vehicle', variant: v, toward }
        put(c.cx, c.y, vehicle(v, seed, toward), plainVehicle(v))
      }
      else if (t === 'bike-lane' || t === 'protected-bike-lane') {
        const seed = seedOf(c.s.id, 'bike')
        const v = cyclistFor(seed, c.wd)
        sc.users = { kind: 'cyclist', variant: v, toward: c.s.direction !== 'outbound' }
        put(c.cx, c.y, cyclist(seed, c.s.direction !== 'outbound', v), plainCyclist(v))
      }
    })
    const sliceArt = L.sliceH && config
      ? slice(ids, sliceCols, { w: b.w, left: L.left, right: L.right, y: L.sliceY, h: L.sliceH, S: L.scale, at: section?.at ?? 0 }, L.front, config.features ?? [], seedOf('slice', L.total))
      : ''
    return { scene, objects, plain, slice: sliceArt }
  })
</script>

<div class="pvx" class:pvx--natural={natural} bind:this={box} style:height={boxHeight}>
  {#if config && L && A}
    <svg bind:this={svgEl} viewBox="0 0 {w} {svgH}" width={w} height={svgH} role="img" aria-label={label} aria-describedby={descriptionId}>
      <!-- Sky, ground cut and frontage -->
      <g aria-hidden="true">{@html art.scene}</g>

      <!-- Property lines through the scene -->
      {#each [L.left, L.right] as px (px)}
        <path class="propline" d="M {px} 0 V {L.b.cutBottom}" />
      {/each}

      <!-- Change highlights, over the ground and behind the people -->
      {#each L.cols as c (c.s.id)}
        {#if badgeFor.has(c.s.id)}
          <rect class="hl" x={c.x0 + 1} y={L.top - 2} width={Math.max(c.x1 - c.x0 - 2, 2)} height={Math.max(0, L.road + 3 - L.top + 2)} rx="3" />
        {/if}
      {/each}

      <!-- People, vehicles and street items, at the street's own scale -->
      <g class="art" aria-hidden="true">{@html art.objects}</g>
      <g class="art-plain" aria-hidden="true">{@html art.plain}</g>

      <!-- Guides: strip edges carried from the cut down through the rows -->
      {#if A.stripY !== undefined}
        {@const end = L.ay + (A.bandY ?? A.height - 6)}
        {#each A.edges.slice(1, -1) as ex (ex)}
          <path class="guide" d="M {ex} {L.b.cutBottom - 4} V {end}" />
        {/each}
      {/if}
      <!-- Property lines run down to the right-of-way row -->
      {#each [L.left, L.right] as px (px)}
        <path class="propline" d="M {px} {L.b.cutBottom} V {L.ay + (A.rowY ?? A.stripY ?? 0)}" />
      {/each}

      <!-- Strip row: names above the line, widths below -->
      {#if A.stripY !== undefined}
        {@const y1 = L.ay + A.stripY}
        <path class="dim" d="M {L.left} {y1} H {L.right}" />
        {#each A.edges as ex (ex)}
          <path class="dim dim--tick" d={tick(ex, y1)} />
        {/each}
        {#each A.labels as l, i (i)}
          {#if l.rotated}
            <text class="t t--label" font-size={A.font} letter-spacing="{A.tracking}em" transform="translate({l.cx + A.font * 0.36} {y1 - 7}) rotate(-90)">{l.rotated}</text>
          {:else}
            {#each l.lines as line, k (k)}
              <text class="t t--label" x={l.cx} y={y1 - 7 - (l.lines.length - 1 - k) * A.lineH} text-anchor="middle" font-size={A.font} letter-spacing="{A.tracking}em">{line}</text>
            {/each}
            {#if l.width}
              <text class="t t--num" x={l.cx} y={L.ay + A.stripWidthY!} text-anchor="middle" font-size={A.numFont} letter-spacing="0.02em">{l.width}</text>
            {/if}
          {/if}
        {/each}
      {/if}

      <!-- Curb to curb, and each side's curb-to-property-line realm -->
      {#if A.curbY !== undefined}
        {@const y2 = L.ay + A.curbY}
        <path class="dim" d="M {L.left} {y2} H {L.right}" />
        {#each A.curbSpans as sp, i (i)}
          <path class="dim dim--tick" d={tick(sp.x0, y2)} />
          {#if sp.text}
            <text class="t t--num" x={(sp.x0 + sp.x1) / 2} y={y2 + A.numFont + 4} text-anchor="middle" font-size={A.numFont} letter-spacing="0.02em">{sp.text}</text>
          {/if}
        {/each}
        <path class="dim dim--tick" d={tick(L.right, y2)} />
      {/if}

      <!-- Right of way, with the frontage beyond marked as varying -->
      {#if A.rowY !== undefined && A.row}
        {@const y3 = L.ay + A.rowY}
        <path class="dim" d="M {L.left} {y3} H {L.right}" />
        <path class="dim dim--tick" d={tick(L.left, y3)} />
        <path class="dim dim--tick" d={tick(L.right, y3)} />
        <text class="t t--num" x={(L.left + L.right) / 2} y={y3 + A.numFont + 4} text-anchor="middle" font-size={A.numFont} letter-spacing="0.04em">{A.row.text}</text>
        {#each A.varies as v, i (i)}
          {@const outer = v.x0 < L.left ? v.x0 : v.x1}
          <path class="dim" d="M {v.x0} {y3} H {v.x1}" />
          <path class="dim-arrow" d="M {outer} {y3} l {outer < L.left ? 5 : -5} -3 v 6 Z" />
          {#if v.text}
            <text class="t-soft" x={(v.x0 + v.x1) / 2} y={y3 + A.font + 5} text-anchor="middle" font-size={A.font - 1} font-weight="600" letter-spacing="0.06em">{v.text}</text>
          {/if}
        {/each}
      {/if}

      <!-- Zone band: who each strip is for (separators hatched in their neighbors' colors) -->
      {#if A.bandY !== undefined}
        {@const yb = L.ay + A.bandY}
        <defs>
          {#each A.band as r, i (i)}
            {#if r.zone === 'sep'}
              <pattern id="{uid}-hz{i}" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect class="zone zone--{r.right ?? r.left ?? 'car'}" width="7" height="7" />
                <!-- Same zone on both sides (a median between lanes): stripe it with a neutral. -->
                <rect class="zone zone--{r.left === r.right || !r.left ? 'sep' : r.left}" width="3.5" height="7" />
              </pattern>
            {/if}
          {/each}
        </defs>
        {#each A.band as r, i (i)}
          {#if r.zone === 'sep'}
            <rect class="zone zone--hatch" x={r.x0} y={yb} width={r.x1 - r.x0} height={A.bandH} style="fill:url(#{uid}-hz{i})" />
          {:else}
            <rect class="zone zone--{r.zone}" x={r.x0} y={yb} width={r.x1 - r.x0} height={A.bandH} />
            {#if r.text}
              <text class="zt" x={(r.x0 + r.x1) / 2} y={yb + A.bandH / 2 + A.font * 0.36} text-anchor="middle" font-size={A.font} font-weight="700" letter-spacing="0.12em">{r.text}</text>
            {/if}
          {/if}
        {/each}
      {/if}

      <!-- The aligned top-down slice -->
      {#if L.sliceH}
        <g aria-hidden="true">{@html art.slice}</g>
        <text class="t-soft" x={L.left} y={L.sliceY + L.sliceH + 14} font-size={A.font} font-weight="600" letter-spacing="0.06em">TOP-DOWN SLICE · {formatLength(Math.round(L.sliceH / L.scale), units)} OF STREET</text>
      {/if}

      <!-- Numbered callouts, matching the "What changed" list -->
      {#each L.badges as b (b.c.s.id)}
        {@const by = 13}
        {#if Math.abs(b.x - b.c.cx) > 1}
          <path class="leader" d="M {b.x} {by + 9} L {b.c.cx} {L.top}" />
        {/if}
        <circle class="badge" cx={b.x} cy={by} r="9.5" />
        <text class="badge-t" x={b.x} y={by + 4} text-anchor="middle" font-size="11">{b.n}</text>
      {/each}
    </svg>
  {/if}
</div>
