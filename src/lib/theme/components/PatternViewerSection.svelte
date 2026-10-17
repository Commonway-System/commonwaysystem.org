<script lang="ts">
  import { onMount } from 'svelte'
  import { isRaised, segmentLabel, spread, widthsAt } from '$lib/viewer/geometry'
  import { formatLength } from '$lib/viewer/state'
  import type { ItemType, RendererProps, Segment } from '$lib/viewer/types'

  // Cross-section renderer: a cut across the street, edge to edge, drawn to
  // scale from the configuration's segment list. Measures its own box and
  // lays out in real pixels, so text stays readable at every size (a fixed
  // viewBox would shrink 12px labels to 4px on a phone).
  const { entry, units, annotations, cut, changes, descriptionId, label }: RendererProps = $props()

  let box: HTMLDivElement | undefined = $state()
  let w = $state(720)
  let h = $state(405)

  onMount(() => {
    if (!box)
      return
    const ro = new ResizeObserver(([e]) => {
      if (e.contentRect.width > 0 && e.contentRect.height > 0) {
        w = e.contentRect.width
        h = e.contentRect.height
      }
    })
    ro.observe(box)
    return () => ro.disconnect()
  })

  const config = $derived(entry.config?.kind === 'street' ? entry.config : undefined)
  const section = $derived(config?.sections?.find(s => s.id === cut) ?? config?.sections?.[0])

  // Which segments each callout number points at.
  const badgeFor = $derived(new Map(changes.flatMap(c => c.segments.map(id => [id, c.n] as const))))

  // Items people use, drawn on the strip by default (separate from the items in the data).
  const USER: Partial<Record<Segment['type'], 'person' | 'car' | 'bus' | 'cyclist'>> = {
    'sidewalk': 'person',
    'travel-lane': 'car',
    'parking': 'car',
    'transit-lane': 'bus',
    'bike-lane': 'cyclist',
    'protected-bike-lane': 'cyclist',
  }

  const L = $derived.by(() => {
    if (!config)
      return undefined
    const widths = widthsAt(config, section?.at)
    const segs = config.segments.map((s, i) => ({ s, wd: widths[i] })).filter(x => x.wd > 0.05)
    const total = segs.reduce((a, x) => a + x.wd, 0)
    const m = 14
    const showText = annotations.labels || annotations.dimensions
    const texts = segs.map(({ s, wd }) => [annotations.labels ? segmentLabel(s) : '', annotations.dimensions ? formatLength(wd, units) : ''].filter(Boolean).join(' · '))
    const chars = Math.max(1, ...texts.map(t => t.length))
    // Labels get at most about a third of the height; the font shrinks
    // (never below 9px) before they're allowed more.
    const room = h * 0.34
    const font = Math.max(9, Math.min(w < 480 ? 10.5 : 12, room / (chars * 0.56)))
    const longest = chars * font * 0.56
    const below = showText ? Math.min(longest, h * 0.42) + 26 : 8
    const totalRow = annotations.dimensions ? 26 : 6
    const badgeRow = changes.some(c => c.segments.length) ? 26 : 0
    const top = totalRow + badgeRow
    const slabH = Math.max(6, Math.min(12, h * 0.03))
    const scale = (w - 2 * m) / Math.max(total, 1)
    const groundY = h - below - slabH
    const avail = Math.max(groundY - top - 4, 10)
    // One glyph scale for every drawn object, true to the street's scale
    // unless the tallest objects (19 ft trees and lights) wouldn't fit.
    const gs = Math.min(scale, avail / 19)
    const raise = Math.max(3, Math.min(8, 0.5 * scale))

    let x = m
    const cols = segs.map(({ s, wd }, i) => {
      const x0 = x
      x += wd * scale
      return { s, wd, x0, x1: x, cx: (x0 + x) / 2, y: isRaised(s) ? groundY - raise : groundY, text: texts[i] }
    })

    // Fan labels out so neighbors never overlap.
    const anchors = spread(cols.map(c => c.cx), font + 3, m + font / 2, w - m - font / 2)
    const labelTop = groundY + slabH + 16

    const badged = cols.filter(c => badgeFor.has(c.s.id))
    const badgeX = spread(badged.map(c => c.cx), 21, m + 10, w - m - 10)
    const badges = badged.map((c, i) => ({ c, x: badgeX[i], n: badgeFor.get(c.s.id)! }))

    return { cols, total, m, font, scale, groundY, slabH, gs, anchors, labelTop, top, totalRow, badgeRow, badges, showText }
  })

  function itemXs(c: { s: Segment, x0: number, x1: number }, scale: number) {
    const items = c.s.items ?? []
    const types = [...new Set(items.map(i => i.type))]
    return types.map((type, j) => {
      const withOffset = items.find(i => i.type === type && i.offset !== undefined)
      const x = withOffset ? c.x0 + withOffset.offset! * scale : c.x0 + ((j + 1) * (c.x1 - c.x0)) / (types.length + 1)
      return { type, x }
    })
  }
</script>

{#snippet item(type: ItemType | 'person' | 'car' | 'bus' | 'cyclist', x: number, y: number, gs: number, toward: number)}
  <g transform="translate({x} {y}) scale({gs})">
    {#if type === 'person'}
      <circle class="g" cx="0" cy="-5.15" r="0.45" />
      <path class="g-line" d="M0 -4.65 V -2.6 M0 -2.6 L -0.35 0 M0 -2.6 L 0.35 0 M -0.65 -3.2 L 0 -4.3 L 0.65 -3.2" />
    {:else if type === 'car'}
      <path class="g" d="M -2.3 -3.4 L -1.8 -4.9 H 1.8 L 2.3 -3.4 Z" />
      <rect class="g" x="-3" y="-3.4" width="6" height="2.5" rx="0.5" />
      <rect class="g-solid" x="-2.7" y="-0.95" width="0.9" height="0.95" rx="0.2" />
      <rect class="g-solid" x="1.8" y="-0.95" width="0.9" height="0.95" rx="0.2" />
    {:else if type === 'bus'}
      <rect class="g" x="-4.25" y="-10.4" width="8.5" height="9.5" rx="0.6" />
      <rect class="g-line" x="-3.5" y="-9.6" width="7" height="3.2" rx="0.3" />
      <rect class="g-solid" x="-3.9" y="-0.95" width="1.2" height="0.95" rx="0.2" />
      <rect class="g-solid" x="2.7" y="-0.95" width="1.2" height="0.95" rx="0.2" />
    {:else if type === 'cyclist'}
      <rect class="g-solid" x="-0.16" y="-2.3" width="0.32" height="2.3" rx="0.16" />
      <circle class="g" cx="0" cy="-5.1" r="0.45" />
      <path class="g-line" d="M0 -4.6 V -2.6 M -1.1 -3.5 H 1.1 M 0 -4.3 L -0.9 -3.5 M 0 -4.3 L 0.9 -3.5" />
    {:else if type === 'tree'}
      <rect class="g" x="-0.4" y="-8" width="0.8" height="8" />
      <circle class="g-canopy" cx="0" cy="-13.2" r="5.5" />
    {:else if type === 'street-light'}
      <rect class="g" x="-0.25" y="-18" width="0.5" height="18" />
      <path class="g-line" d="M 0 -17.7 H {toward * 3.5}" />
      <rect class="g-solid" x={toward * 3.5 - 0.8} y="-17.8" width="1.6" height="0.6" rx="0.2" />
    {:else if type === 'bollard'}
      <rect class="g" x="-0.4" y="-3.3" width="0.8" height="3.3" rx="0.35" />
    {:else if type === 'barrier'}
      <path class="g" d="M -1 0 L -0.6 -0.9 L -0.3 -2.7 H 0.3 L 0.6 -0.9 L 1 0 Z" />
    {:else if type === 'bench'}
      <path class="g" d="M -2.5 -1.6 H 2.5 V -1.3 H -2.5 Z M -2.5 -2.9 H 2.5 V -2.6 H -2.5 Z" />
      <path class="g-line" d="M -2.2 -1.3 V 0 M 2.2 -1.3 V 0" />
    {:else if type === 'planter'}
      <circle class="g-canopy" cx="0" cy="-3" r="1.4" />
      <rect class="g" x="-1.5" y="-2" width="3" height="2" />
    {:else if type === 'bike-rack'}
      <path class="g-line" d="M -1 0 V -2.4 Q -1 -3 0 -3 Q 1 -3 1 -2.4 V 0" />
    {:else if type === 'transit-shelter'}
      <rect class="g" x="-2.6" y="-8.4" width="5.2" height="0.5" />
      <path class="g-line" d="M -2.3 -7.9 V 0 M 2.3 -7.9 V 0" />
    {:else if type === 'sign'}
      <path class="g-line" d="M 0 0 V -7" />
      <rect class="g" x="-1" y="-9" width="2" height="2" />
    {:else if type === 'curb-stop'}
      <rect class="g" x="-1" y="-0.5" width="2" height="0.5" />
    {/if}
  </g>
{/snippet}

<div class="pvx" bind:this={box}>
  {#if config && L}
    <svg viewBox="0 0 {w} {h}" width={w} height={h} role="img" aria-label={label} aria-describedby={descriptionId}>
      <!-- Overall width -->
      {#if annotations.dimensions}
        {@const text = `${formatLength(L.total, units)}${section && (config.sections?.length ?? 0) > 1 ? `, ${section.label.toLowerCase()}` : ''}`}
        <path class="dim" d="M {L.m} 8 V 18 M {L.m} 13 H {w - L.m} M {w - L.m} 8 V 18" />
        <rect class="t-bg" x={w / 2 - (text.length * L.font * 0.56) / 2 - 6} y="5" width={text.length * L.font * 0.56 + 12} height={L.font + 6} rx="3" />
        <text class="t" x={w / 2} y={13 + L.font * 0.35} text-anchor="middle" font-size={L.font}>{text}</text>
      {/if}

      <!-- Change highlights behind everything else -->
      {#each L.cols as c (c.s.id)}
        {#if badgeFor.has(c.s.id)}
          <rect class="hl" x={c.x0 + 1} y={L.top - 2} width={Math.max(c.x1 - c.x0 - 2, 2)} height={L.groundY + L.slabH - L.top + 2} rx="3" />
        {/if}
      {/each}

      <!-- Ground: each strip as a slab, raised ones at curb height -->
      {#each L.cols as c (c.s.id)}
        <rect class="s-{c.s.type}" x={c.x0} y={c.y} width={c.x1 - c.x0} height={L.groundY + L.slabH - c.y} />
        <path class="edge" d="M {c.x1} {c.y} V {L.groundY + L.slabH}" />
        {#if c.s.type === 'buffer' && !(c.s.items ?? []).some(i => i.type === 'barrier')}
          <path class="hatch" d="M {c.x0 + 2} {c.y + L.slabH} L {c.x1 - 2} {c.y}" />
        {/if}
      {/each}
      <path class="edge" d="M {L.m} {L.groundY + L.slabH} H {w - L.m}" />

      <!-- People, vehicles and street items, at the street's own scale -->
      {#each L.cols as c (c.s.id)}
        {@const user = USER[c.s.type]}
        {#if user && (c.s.items ?? []).length === 0}
          {@render item(user, c.cx, c.y, L.gs, 1)}
        {:else if user}
          {@render item(user, c.x0 + (c.x1 - c.x0) * 0.5, c.y, L.gs, 1)}
        {/if}
        {#each itemXs(c, L.scale) as it (it.type)}
          {@render item(it.type, it.x, c.y, L.gs, c.cx < w / 2 ? 1 : -1)}
        {/each}
      {/each}

      <!-- Labels: fanned out under the slab, read bottom to top -->
      {#if L.showText}
        {#each L.cols as c, i (c.s.id)}
          <path class="leader" d="M {c.cx} {L.groundY + L.slabH + 2} L {L.anchors[i]} {L.labelTop - 5}" />
          <text class="t" font-size={L.font} text-anchor="end" transform="translate({L.anchors[i] + L.font * 0.35} {L.labelTop}) rotate(-90)">{c.text}</text>
        {/each}
      {/if}

      <!-- Numbered callouts, matching the "What changed" list -->
      {#each L.badges as b (b.c.s.id)}
        {@const by = L.totalRow + 11}
        {#if Math.abs(b.x - b.c.cx) > 1}
          <path class="leader" d="M {b.x} {by + 9} L {b.c.cx} {L.top}" />
        {/if}
        <circle class="badge" cx={b.x} cy={by} r="9.5" />
        <text class="badge-t" x={b.x} y={by + 4} text-anchor="middle" font-size="11">{b.n}</text>
      {/each}
    </svg>
  {/if}
</div>
