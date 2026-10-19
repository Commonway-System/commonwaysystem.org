<script lang="ts">
  import { onMount } from 'svelte'
  import { barrierTop, bikeLaneSymbol, laneArrow, makeIds, makeStamps, seedOf, sharrow, streetItemTop } from '$lib/viewer/art'
  import { breakpoints, FEATURE_LABELS, isRaised, levelOf, markingOf, OVERRIDE_LABELS, segmentLabel, spread, widthsAt } from '$lib/viewer/geometry'
  import { formatLength } from '$lib/viewer/state'
  import type { RendererProps, Segment, StreetConfig, StreetFeature } from '$lib/viewer/types'

  // Top-down renderer: the street runs left to right; the cross-section's
  // left edge is the top band. Drawn to one scale in both directions, from
  // the same configuration as the cross-section, plus the things that sit
  // at a spot along the street (features) and the stretches where the shape
  // changes (overrides, e.g. a curb extension).
  const { entry, units, annotations, cut, changes, descriptionId, label, expanded }: RendererProps = $props()
  const uid = $props.id()

  let box: HTMLDivElement | undefined = $state()
  let boxW = $state(720)
  let boxH = $state(405)
  // In full view on a tall, narrow screen (a phone held upright) the street
  // is drawn running up and down so it fills the screen. The layout is done
  // in landscape, in a box with width and height swapped, then turned a
  // quarter turn (left edge of the cross-section stays on the left).
  const portrait = $derived(expanded && boxH > boxW * 1.15)
  const w = $derived(portrait ? boxH : boxW)
  const h = $derived(portrait ? boxW : boxH)

  onMount(() => {
    if (!box)
      return
    const ro = new ResizeObserver(([e]) => {
      if (e.contentRect.width > 0 && e.contentRect.height > 0) {
        boxW = e.contentRect.width
        boxH = e.contentRect.height
      }
    })
    ro.observe(box)
    return () => ro.disconnect()
  })

  const config = $derived(entry.config?.kind === 'street' ? entry.config : undefined)
  const badgeForSeg = $derived(new Map(changes.flatMap(c => c.segments.map(id => [id, c.n] as const))))
  const badgeForMark = $derived(new Map(changes.flatMap(c => c.marks.map(id => [id, c.n] as const))))

  const LANES = new Set<Segment['type']>(['travel-lane', 'turn-lane', 'transit-lane'])
  const ARROWED = new Set<Segment['type']>(['travel-lane', 'turn-lane', 'transit-lane', 'bike-lane', 'protected-bike-lane'])

  /** Segment index range a feature spans: its `across` list, or the roadway (everything between the curbs). */
  function spanOf(c: StreetConfig, f: { across?: string[] }) {
    const idx = f.across?.length
      ? f.across.map(id => c.segments.findIndex(s => s.id === id)).filter(i => i >= 0)
      : c.segments.map((s, i) => (isRaised(s) ? -1 : i)).filter(i => i >= 0)
    return idx.length ? [Math.min(...idx), Math.max(...idx)] : [0, c.segments.length - 1]
  }

  const P = $derived.by(() => {
    if (!config)
      return undefined
    const m = 14
    const font = w < 480 ? 10 : 11.5
    const hasSegBadges = changes.some(c => c.segments.length)
    const leftPad = hasSegBadges ? 26 : 0
    // Feature and override labels sit in one row above the street, or two
    // when they wouldn't fit side by side.
    const markTexts = [
      ...(config.features ?? []).map(f => ({ id: f.id, at: f.at, text: f.label ?? FEATURE_LABELS[f.type] })),
      ...(config.overrides ?? []).map(o => ({ id: o.id, at: (o.from + o.to) / 2, text: o.label ?? OVERRIDE_LABELS[o.type] })),
    ].sort((a, b) => a.at - b.at)
    const markW = Math.max(0, ...markTexts.map(mk => mk.text.length * (font - 0.5) * 0.56)) + 10
    const twoRows = markTexts.length * markW > w - 2 * m
    const markRows = annotations.labels && markTexts.length ? (twoRows ? 2 : 1) : 0
    const topPad = 8 + markRows * (font + 6) + (markRows ? 6 : 0) + (changes.some(c => c.marks.length) ? 22 : 0)
    const sections = config.sections ?? []
    const bottomPad = 8 + (sections.length ? font + 8 : 0) + (annotations.dimensions ? font + 14 : 0)

    const probe = breakpoints(config, config.length ?? 1000)
    const maxTotal = Math.max(...probe.map(x => widthsAt(config, x).reduce((a, b) => a + b, 0)))
    const availW = w - 2 * m - leftPad
    const availH = Math.max(h - topPad - bottomPad, 20)
    let scale: number
    let length: number
    if (config.length) {
      length = config.length
      scale = Math.min(availW / length, availH / maxTotal)
    }
    else {
      // Long enough to show everything placed along the street, plus room either side.
      const needed = Math.max(
        80,
        ...(config.features ?? []).map(f => f.at + (f.length ?? defaultLength(f)) / 2 + 30),
        ...(config.overrides ?? []).map(o => o.to + (o.taper ?? 0) + 30),
        ...(config.sections ?? []).map(sec => sec.at + 30),
      )
      scale = availH / maxTotal
      length = availW / scale
      if (length < needed) {
        length = needed
        scale = availW / length
      }
      else if (length > 400) {
        length = 400
        scale = availW / length
      }
    }
    const x0 = m + leftPad
    const streetH = maxTotal * scale
    const y0 = topPad + (availH - streetH) / 2
    const X = (ft: number) => x0 + ft * scale

    // Each segment's top edge and width at every breakpoint.
    const xs = breakpoints(config, length)
    const at = xs.map((x) => {
      const ws = widthsAt(config, x)
      const total = ws.reduce((a, b) => a + b, 0)
      // Keep the street centered where its total width changes.
      let y = y0 + ((maxTotal - total) * scale) / 2
      return ws.map((wd) => {
        const top = y
        y += wd * scale
        return { top, bottom: y }
      })
    })
    const bandAt = (i: number, ft: number) => {
      const ws = widthsAt(config, ft)
      const total = ws.reduce((a, b) => a + b, 0)
      let y = y0 + ((maxTotal - total) * scale) / 2
      for (let k = 0; k < i; k++) y += ws[k] * scale
      return { top: y, bottom: y + ws[i] * scale }
    }

    const bands = config.segments.map((s, i) => {
      const top = xs.map((x, k) => `${X(x)},${at[k][i].top}`)
      const bottom = xs.map((x, k) => `${X(x)},${at[k][i].bottom}`).reverse()
      const edge = xs.map((x, k) => `${k ? 'L' : 'M'} ${X(x)} ${at[k][i].bottom}`).join(' ')
      return { s, i, points: [...top, ...bottom].join(' '), edge, base: at[0][i] }
    })

    // Markings on the boundary between segment i and i + 1.
    const markings = bands.slice(0, -1).flatMap(({ s, i, edge }) => {
      const next = config.segments[i + 1]
      const pair = (a: Segment['type'], b: Segment['type']) => (s.type === a && next.type === b) || (s.type === b && next.type === a)
      const off = (d: number) => xs.map((x, k) => `${k ? 'L' : 'M'} ${X(x)} ${at[k][i].bottom + d}`).join(' ')
      if (levelOf(s) !== levelOf(next))
        return [{ d: edge, cls: 'curb-line', dash: '' }]
      if (LANES.has(s.type) && LANES.has(next.type)) {
        if (s.type === 'turn-lane' || next.type === 'turn-lane')
          return [{ d: edge, cls: 'mk-yellow', dash: '' }]
        if ((s.direction ?? 'outbound') !== (next.direction ?? 'outbound'))
          return [{ d: off(-1.6), cls: 'mk-yellow', dash: '' }, { d: off(1.6), cls: 'mk-yellow', dash: '' }]
        return [{ d: edge, cls: 'mk-white', dash: `${10 * scale} ${30 * scale}` }]
      }
      if ([s.type, next.type].some(t => LANES.has(t)) && [s.type, next.type].some(t => t === 'bike-lane' || t === 'buffer' || t === 'parking'))
        return [{ d: edge, cls: 'mk-white', dash: '' }]
      if (pair('bike-lane', 'parking') || pair('buffer', 'parking') || pair('buffer', 'bike-lane'))
        return [{ d: edge, cls: 'mk-white', dash: '' }]
      return [{ d: edge, cls: 'edge', dash: '' }]
    })

    // Direction arrows, every 80 ft, starting clear of the strip labels.
    const labelChars = annotations.labels || annotations.dimensions
      ? Math.max(0, ...config.segments.map(sg => [annotations.labels ? segmentLabel(sg) : '', annotations.dimensions ? formatLength(sg.width, units) : ''].filter(Boolean).join(' · ').length))
      : 0
    const firstArrow = Math.max(30, (labelChars * font * 0.56 + 40) / scale)
    const arrowStep = Math.min(80, Math.max(30, length - firstArrow - 10))
    const isBike = (t: Segment['type']) => t === 'bike-lane' || t === 'protected-bike-lane'
    const arrows = bands.filter(b => ARROWED.has(b.s.type)).flatMap((b) => {
      const out = []
      for (let ft = firstArrow; ft < length - 10; ft += arrowStep) {
        const band = bandAt(b.i, ft)
        const bh = band.bottom - band.top
        if (bh < 6)
          continue
        out.push({ x: X(ft), y: (band.top + band.bottom) / 2, size: Math.min(bh * 0.32, 9), dir: b.s.direction ?? 'outbound', key: `${b.s.id}-${ft}`, bike: isBike(b.s.type), marking: markingOf(b.s), bh })
      }
      return out
    })

    // Items placed along each strip at their spacing.
    const items = bands.flatMap((b) => {
      const list = b.s.items ?? []
      const types = [...new Set(list.map(it => it.type))]
      return list.flatMap((it) => {
        const out = []
        const j = types.indexOf(it.type)
        const first = it.start ?? (it.spacing ? 0 : length / 2)
        for (let ft = first; ft <= length; ft += it.spacing ?? Number.POSITIVE_INFINITY) {
          const band = bandAt(b.i, ft)
          const bw = (band.bottom - band.top) / scale
          if (bw < 0.5)
            continue
          const across = it.offset !== undefined ? it.offset : types.length > 1 && it.type !== 'tree' ? ((j + 1) * bw) / (types.length + 1) : bw / 2
          out.push({ type: it.type, x: X(ft), y: band.top + across * scale, key: `${b.s.id}-${it.type}-${ft}`, continuous: !it.spacing && it.type === 'barrier' })
          if (!it.spacing)
            break
        }
        return out
      })
    })

    const streetTop = y0
    const streetBottom = y0 + streetH

    // Illustrated items and markings, drawn from above. The art runs along
    // its y axis, so each piece is turned 90 degrees: the street runs left to
    // right here. Arms and open sides reach toward the middle of the street.
    const ids = makeIds(uid)
    const stamps = makeStamps(ids)
    const mid = (streetTop + streetBottom) / 2
    const turn = (x: number, y: number, inner: string) => `<g transform="translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(90) scale(${scale.toFixed(3)})">${inner}</g>`
    let art = ''
    for (const it of items) {
      if (it.type === 'barrier' && it.continuous) {
        art += turn(x0 + (length * scale) / 2, it.y, barrierTop(length))
        continue
      }
      // Toward the street's middle: art +x becomes plan +y after the turn.
      const toward = it.y < mid ? 1 : -1
      const strip = it.key.slice(0, it.key.lastIndexOf('-'))
      art += turn(it.x, it.y, stamps.use(`${strip}|${toward}`, () => streetItemTop(ids, it.type, seedOf(strip), toward)))
    }
    // Bike lanes: the bike lane symbol with its arrow ahead (art "toward the
    // reader" becomes leftward here, which is the inbound direction).
    // A shared travel lane gets a sharrow where its arrow would be.
    for (const a of arrows.filter(a => a.dir === 'both' && a.marking === 'sharrow')) {
      // Two-way shared lane: one sharrow each way, inbound in the upper half.
      const q = a.bh / 4
      art += turn(a.x, a.y - q, sharrow(true)) + turn(a.x, a.y + q, sharrow(false))
    }
    for (const a of arrows.filter(a => a.dir !== 'both' && (a.bike || a.marking === 'sharrow'))) {
      const toward = a.dir === 'inbound'
      const ahead = (toward ? -1 : 1) * 3.2 * scale
      if (a.marking === 'sharrow')
        art += turn(a.x, a.y, sharrow(toward))
      else if (a.marking === 'bike-symbol')
        art += turn(a.x - ahead * 0.8, a.y, bikeLaneSymbol(toward)) + turn(a.x + ahead, a.y, laneArrow(4.2, toward))
    }
    art = stamps.defs() + art
    // Sidewalk score joints every 5 ft.
    const joints = bands.filter(b => b.s.type === 'sidewalk').flatMap((b) => {
      const out = []
      for (let ft = 5; ft < length; ft += 5) {
        const band = bandAt(b.i, ft)
        if (band.bottom - band.top > 1)
          out.push({ key: `${b.s.id}-${ft}`, d: `M ${X(ft)} ${band.top} V ${band.bottom}` })
      }
      return out
    })
    const feats = (config.features ?? []).map((f) => {
      const [a, b] = spanOf(config, f)
      const top = bandAt(a, f.at).top
      const bottom = bandAt(b, f.at).bottom
      return { f, top, bottom, x: X(f.at), len: (f.length ?? defaultLength(f)) * scale }
    })
    const overrides = (config.overrides ?? []).map(o => ({ o, x: X((o.from + o.to) / 2), x0: X(o.from), x1: X(o.to) }))

    const marks = markTexts.map((mk, k) => ({ ...mk, x: X(mk.at), row: twoRows ? k % 2 : 0 }))
    const markX = spread(marks.map(mk => mk.x), twoRows ? markW / 2 : markW, m + markW / 2, w - m - markW / 2)

    // Callouts for things along the street, spread so two at one spot don't overlap.
    const marked = [...feats.map(f => ({ id: f.f.id, x: f.x })), ...overrides.map(o => ({ id: o.o.id, x: o.x }))]
      .filter(mk => badgeForMark.has(mk.id))
      .sort((a, b) => a.x - b.x)
    const markBadgeX = spread(marked.map(mk => mk.x), 22, m + 10, w - m - 10)
    const markBadges = marked.map((mk, k) => ({ ...mk, bx: markBadgeX[k], n: badgeForMark.get(mk.id)! }))

    const segBadges = bands.filter(b => badgeForSeg.has(b.s.id))
    const badgeY = spread(segBadges.map(b => (b.base.top + b.base.bottom) / 2), 21, streetTop + 4, streetBottom - 4)

    // A scale bar with a round number.
    const target = 100 / scale
    const steps = units === 'm' ? [2 / 0.3048, 5 / 0.3048, 10 / 0.3048, 20 / 0.3048, 50 / 0.3048] : [5, 10, 20, 50, 100]
    const barFt = steps.find(s => s >= target * 0.6) ?? steps[steps.length - 1]

    return { m, font, scale, length, X, x0, markRows, markBadges, bands, markings, arrows: arrows.filter(a => a.marking !== 'sharrow' && (a.dir === 'both' || !a.bike)), feats, overrides, marks, markX, segBadges, badgeY, streetTop, streetBottom, sections, barFt, art, joints }
  })

  function defaultLength(f: StreetFeature): number {
    switch (f.type) {
      case 'crosswalk':
      case 'raised-crosswalk': return 10
      case 'speed-hump': return 12
      case 'speed-table': return 22
      case 'speed-cushion': return 12
      case 'bus-stop': return 40
      case 'refuge-island': return 20
      case 'driveway': return 12
      default: return 2
    }
  }

  function bandLabel(s: Segment) {
    return [annotations.labels ? segmentLabel(s) : '', annotations.dimensions ? formatLength(s.width, units) : ''].filter(Boolean).join(' · ')
  }
</script>

<div class="pvx" bind:this={box}>
  {#if config && P}
    <svg viewBox="0 0 {boxW} {boxH}" width={boxW} height={boxH} role="img" aria-label={label} aria-describedby={descriptionId}>
      <g transform={portrait ? `translate(0 ${boxH}) rotate(-90)` : undefined}>
      <defs>
        <clipPath id="pvx-street-{entry.id}">
          <rect x={P.x0} y={P.streetTop - 40} width={P.length * P.scale} height={P.streetBottom - P.streetTop + 80} />
        </clipPath>
      </defs>

      <g clip-path="url(#pvx-street-{entry.id})">
        {#each P.bands as b (b.s.id)}
          <polygon class="s-{b.s.type}{b.s.surface && b.s.type !== 'furnishing' && b.s.type !== 'median' ? ` sf-${b.s.surface}` : ''}" points={b.points} />
          {#if b.s.type === 'buffer' && !(b.s.items ?? []).some(i => i.type === 'barrier')}
            {#each Array.from({ length: Math.ceil(P.length / 8) }) as _, k (k)}
              {@const xx = P.X(k * 8)}
              <path class="hatch" d="M {xx} {b.base.bottom} L {xx + (b.base.bottom - b.base.top)} {b.base.top}" />
            {/each}
          {/if}
        {/each}

        {#each P.joints as j (j.key)}
          <path class="s-joint" d={j.d} />
        {/each}

        {#each P.markings as mk, k (k)}
          <path class={mk.cls} d={mk.d} stroke-dasharray={mk.dash || undefined} stroke-width={mk.cls.startsWith('mk') ? 1.5 : undefined} />
        {/each}

        {#each P.arrows as a (a.key)}
          <g transform="translate({a.x} {a.y}) scale({a.dir === 'inbound' ? -1 : 1} 1)">
            {#if a.dir === 'both'}
              <path class="g-arrow" d="M {-a.size * 2} 0 L {-a.size * 1.1} {-a.size * 0.7} V {-a.size * 0.25} H {a.size * 1.1} V {-a.size * 0.7} L {a.size * 2} 0 L {a.size * 1.1} {a.size * 0.7} V {a.size * 0.25} H {-a.size * 1.1} V {a.size * 0.7} Z" />
            {:else}
              <path class="g-arrow" d="M {-a.size * 2} {-a.size * 0.25} H {a.size * 0.6} V {-a.size * 0.8} L {a.size * 2} 0 L {a.size * 0.6} {a.size * 0.8} V {a.size * 0.25} H {-a.size * 2} Z" />
            {/if}
          </g>
        {/each}

        <!-- Things at a spot along the street -->
        {#each P.feats as ft (ft.f.id)}
          {@const f = ft.f}
          {#if f.type === 'crosswalk' || f.type === 'raised-crosswalk'}
            {#if f.type === 'raised-crosswalk'}
              <rect class="s-sidewalk" x={ft.x - ft.len / 2 - 3 * P.scale} y={ft.top} width={ft.len + 6 * P.scale} height={ft.bottom - ft.top} opacity="0.55" />
            {/if}
            {#each Array.from({ length: Math.floor((ft.bottom - ft.top) / (4 * P.scale)) }) as _, k (k)}
              <rect class="mk-fill-white" x={ft.x - ft.len / 2} y={ft.top + (k + 0.5) * 4 * P.scale} width={ft.len} height={2 * P.scale} />
            {/each}
          {:else if f.type === 'speed-hump' || f.type === 'speed-table' || f.type === 'speed-cushion'}
            <rect class="mk-fill-white" x={ft.x - ft.len / 2} y={ft.top} width={ft.len} height={ft.bottom - ft.top} opacity="0.35" />
            {#each Array.from({ length: Math.max(1, Math.floor((ft.bottom - ft.top) / (6 * P.scale))) }) as _, k (k)}
              {@const yy = ft.top + (k + 0.5) * 6 * P.scale}
              <path class="mk-white" stroke-width="1.5" d="M {ft.x - ft.len / 4} {yy - 1.5 * P.scale} L {ft.x} {yy} L {ft.x - ft.len / 4} {yy + 1.5 * P.scale}" />
            {/each}
          {:else if f.type === 'modal-filter'}
            {#each Array.from({ length: Math.max(2, Math.floor((ft.bottom - ft.top) / (5 * P.scale))) }) as _, k (k)}
              <circle class="g" cx={ft.x} cy={ft.top + (k + 0.5) * 5 * P.scale} r={Math.max(1.6, 0.5 * P.scale)} />
            {/each}
          {:else if f.type === 'refuge-island'}
            <rect class="s-median" x={ft.x - ft.len / 2} y={ft.top} width={ft.len} height={ft.bottom - ft.top} rx={2 * P.scale} />
            <rect class="edge" x={ft.x - ft.len / 2} y={ft.top} width={ft.len} height={ft.bottom - ft.top} rx={2 * P.scale} />
          {:else if f.type === 'bus-stop'}
            <rect class="g" x={ft.x - ft.len / 2} y={ft.top} width={ft.len} height={ft.bottom - ft.top} />
          {:else if f.type === 'driveway'}
            <rect class="s-curb" x={ft.x - ft.len / 2} y={ft.top} width={ft.len} height={ft.bottom - ft.top} />
          {:else}
            <!-- Beacons, signals and signs: a post at each edge of what they span -->
            {#each [ft.top, ft.bottom] as yy (yy)}
              <circle class="g-solid" cx={ft.x} cy={yy} r={Math.max(2.5, 0.8 * P.scale)} />
            {/each}
            <path class="dim" stroke-dasharray="3 3" d="M {ft.x} {ft.top} V {ft.bottom}" />
          {/if}
        {/each}

        <!-- Street items and bike lane markings, illustrated from above (kept in Simplified view: this is already a plan) -->
        <g class="art art--slice" aria-hidden="true">{@html P.art}</g>
      </g>

      <path class="edge" d="M {P.x0} {P.streetTop} H {P.x0 + P.length * P.scale} M {P.x0} {P.streetBottom} H {P.x0 + P.length * P.scale}" />

      <!-- Cut lines matching the cross-section's "Cut at" choice -->
      {#each P.sections as sec (sec.id)}
        {@const sx = P.X(sec.at)}
        <path class="cutline" d="M {sx} {P.streetTop - 6} V {P.streetBottom + 6}" opacity={sec.id === (cut ?? P.sections[0]?.id) ? 1 : 0.45} />
        <text class="t" x={sx} y={P.streetBottom + 8 + P.font} text-anchor="middle" font-size={P.font - 1}>{sec.label}</text>
      {/each}

      <!-- Strip labels where a band is tall enough to hold one -->
      {#if annotations.labels || annotations.dimensions}
        {#each P.bands as b (b.s.id)}
          {@const bh = b.base.bottom - b.base.top}
          {@const text = bandLabel(b.s)}
          {#if bh >= P.font + 3 && text}
            <rect class="t-bg" x={P.x0 + 4} y={(b.base.top + b.base.bottom) / 2 - P.font / 2 - 2} width={text.length * P.font * 0.56 + 8} height={P.font + 4} rx="2" />
            <text class="t" x={P.x0 + 8} y={(b.base.top + b.base.bottom) / 2 + P.font * 0.35} font-size={P.font}>{text}</text>
          {/if}
        {/each}
      {/if}

      {#if annotations.labels}
        {#each P.marks as mk, k (mk.id)}
          {@const ly = P.streetTop - 10 - mk.row * (P.font + 6)}
          <path class="leader" d="M {P.markX[k]} {ly + 2} L {mk.x} {P.streetTop}" />
          <text class="t" x={P.markX[k]} y={ly - 2} text-anchor="middle" font-size={P.font - 0.5}>{mk.text}</text>
        {/each}
      {/if}

      <!-- Change highlights and numbered callouts -->
      {#each P.bands as b (b.s.id)}
        {#if badgeForSeg.has(b.s.id)}
          <polygon class="hl" points={b.points} />
        {/if}
      {/each}
      {#each P.segBadges as b, k (b.s.id)}
        {@const by = P.badgeY[k]}
        <path class="leader" d="M {P.m + 10} {by} L {P.x0} {(b.base.top + b.base.bottom) / 2}" />
        <circle class="badge" cx={P.m + 9} cy={by} r="9.5" />
        <text class="badge-t" x={P.m + 9} y={by + 4} text-anchor="middle" font-size="11">{badgeForSeg.get(b.s.id)}</text>
      {/each}
      {#each P.markBadges as mk (mk.id)}
        {@const by = P.streetTop - 12 - P.markRows * (P.font + 6) - (P.markRows ? 6 : 0)}
        <circle class="hl-ring" cx={mk.x} cy={(P.streetTop + P.streetBottom) / 2} r={Math.min(18, (P.streetBottom - P.streetTop) / 2)} />
        <path class="leader" d="M {mk.bx} {by + 9} L {mk.x} {P.streetTop}" />
        <circle class="badge" cx={mk.bx} cy={by} r="9.5" />
        <text class="badge-t" x={mk.bx} y={by + 4} text-anchor="middle" font-size="11">{mk.n}</text>
      {/each}

      {#if annotations.dimensions}
        {@const bx = P.x0}
        {@const by = h - 10}
        {@const bw = P.barFt * P.scale}
        <path class="dim" d="M {bx} {by - 5} V {by} H {bx + bw} V {by - 5}" />
        <text class="t" x={bx + bw + 6} y={by} font-size={P.font - 1}>{formatLength(P.barFt, units)}</text>
      {/if}
      </g>
    </svg>
  {/if}
</div>
