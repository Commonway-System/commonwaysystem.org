<script lang="ts">
  import { onDestroy, onMount } from 'svelte'

  /*
    Replaces .hero-lines' repeating-linear-gradient diagonal texture (Item
    19): a canvas grid of small dots whose radius swells near a couple of
    curving "road" paths drawn through the hero, instead of a single flat
    wavefront sweeping the whole rectangle. Only dots near a road react at
    all; the rest of the grid sits at rest, so the reactive shape itself
    reads as a street, not a generic wipe. Native canvas +
    requestAnimationFrame, no third-party effects bundle.

    The swelling along each road comes from a small 2D value-noise field
    (a cheap, license-free stand-in for Perlin/simplex noise, see fbm()
    below) that flows diagonally through the canvas over time, instead
    of a couple of discrete pulses on a fixed loop (an earlier version of
    this did that, and it read as exactly two clean blobs repeating on
    an obvious cycle) or a handful of summed sine waves (a version after
    that, which read as one blob shape breathing in and out rather than
    varied ink spatter). Multiple noise octaves at different spatial
    scales, summed together, is what actually produces blobs of
    different sizes at different moments, since the small- and
    large-scale octaves reinforce or cancel each other differently at
    every point; a single-frequency wave can't do that no matter how
    it's remapped.

    Dot spacing/radius and the road/wave geometry are tuned by eye
    against the hero's actual dark background, not derived from a
    formula; adjust the constants below directly on the dev server
    rather than threading them through as props, nothing else needs to
    configure this component.
  */

  interface Props {
    // Ticket flagged this as the one open tuning value: chosen partway
    // through the requested 10-20% range on the reasoning that discrete
    // dots read fainter than a continuous gradient at the same opacity.
    // Tune here and reload to compare.
    opacity?: number
    /** Freezes the animation on its current frame (WCAG 2.2.2 Pause, Stop, Hide); the hero's pause button drives this. */
    paused?: boolean
  }

  const { opacity = 0.16, paused = false }: Props = $props()

  const DOT_SPACING = 10
  // At rest a dot has zero radius (invisible); only a nearby pulse grows
  // it. A true, unjittered grid, since rows/columns misaligning defeats
  // the printed-halftone look this is going for.
  const BASE_RADIUS = 0
  const PEAK_RADIUS = 4.4
  const DOT_COLOR = '253, 250, 243' // --cw-paper-fixed, as an rgb() triple
  const SAMPLE_COUNT = 120

  type Point = { x: number; y: number }

  interface RoadDef {
    // Bezier control points as fractions of canvas width/height, allowed
    // to run past 0-1 so the road visibly enters/exits the frame rather
    // than starting or ending mid-canvas.
    controls: [Point, Point, Point, Point]
    // "Visual width" of the road: how far a dot can sit from the
    // centerline and still react at all.
    sigmaLateral: number
  }

  // Two curving roads rather than one straight line, loosely echoing the
  // diagonal orientation of the texture this replaces, crossing once for
  // a network feel rather than reading as two parallel wipes. Direction
  // of travel lives on the noise octaves below now, not per road, so it
  // can be biased rightward everywhere rather than per-road.
  const ROAD_DEFS: RoadDef[] = [
    {
      controls: [
        { x: -0.15, y: 1.05 },
        { x: 0.22, y: 0.48 },
        { x: 0.68, y: 0.82 },
        { x: 1.15, y: 0.08 },
      ],
      sigmaLateral: 65,
    },
    {
      controls: [
        { x: -0.1, y: 0.18 },
        { x: 0.32, y: 0.12 },
        { x: 0.58, y: 0.72 },
        { x: 1.12, y: 0.6 },
      ],
      sigmaLateral: 55,
    },
  ]

  // Value-noise octaves at different spatial scales (px), summed with
  // decreasing weight for smaller features: this is what actually gives
  // blobs varied size and shape, since the scales reinforce in some
  // places and cancel in others, unlike a single wavelength. Smallest
  // scale raised from 70 to 100 so even the smallest blobs read as an
  // actual blob rather than a speck; largest raised to 720 so the top
  // end still runs meaningfully bigger than the smallest.
  //
  // Each octave also drifts in its own direction/speed (angleDeg is the
  // CSS-gradient convention: 90deg is due right, smaller pulls the
  // trajectory upward while drifting right, larger pulls it downward).
  // Three of the four angles sit between 75-110deg, i.e. rightward with
  // some vertical wander; the fourth (largest scale, smallest weight)
  // drifts up-left, so the occasional big, slow blob bucks the trend
  // without it reading as "half the field moves left."
  const NOISE_OCTAVES = [
    { scale: 100, amplitude: 0.32, angleDeg: 95, speed: 0.032 },
    { scale: 210, amplitude: 0.28, angleDeg: 78, speed: 0.024 },
    { scale: 400, amplitude: 0.22, angleDeg: 108, speed: 0.017 },
    { scale: 720, amplitude: 0.18, angleDeg: 300, speed: 0.01 },
  ].map((octave) => {
    const rad = (octave.angleDeg * Math.PI) / 180
    return { ...octave, dirX: Math.sin(rad), dirY: -Math.cos(rad) }
  })
  const NOISE_OCTAVE_TOTAL = NOISE_OCTAVES.reduce(
    (sum, o) => sum + o.amplitude,
    0,
  )
  // Only the top slice of the noise field's range renders as visible ink,
  // smoothly feathered out below it: this is what keeps most of the
  // field invisible between islands of actual swelling, rather than a
  // continuous half-bright wash. Floor lowered from 0.52 to widen that
  // slice, so more of the field's local peaks clear it at once (more
  // blobs visible simultaneously) without touching the ceiling, which is
  // what keeps the brightest peaks just as bright as before.
  const NOISE_FLOOR = 0.44
  const NOISE_CEILING = 0.82

  // Fast, deterministic pseudo-random in [0, 1) for one integer lattice
  // point; not cryptographic, just needs to look unrelated from point to
  // point for value noise to read as organic.
  function hash(x: number, y: number): number {
    const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123
    return s - Math.floor(s)
  }

  // Bilinear-interpolated value noise, smoothstepped at the cell edges
  // so it has no visible seams. Standard technique, not third-party
  // code: see e.g. Inigo Quilez's write-ups on value noise.
  function valueNoise(x: number, y: number): number {
    const xi = Math.floor(x)
    const yi = Math.floor(y)
    const xf = x - xi
    const yf = y - yi
    const topLeft = hash(xi, yi)
    const topRight = hash(xi + 1, yi)
    const bottomLeft = hash(xi, yi + 1)
    const bottomRight = hash(xi + 1, yi + 1)
    const u = xf * xf * (3 - 2 * xf)
    const v = yf * yf * (3 - 2 * yf)
    const top = topLeft + (topRight - topLeft) * u
    const bottom = bottomLeft + (bottomRight - bottomLeft) * u
    return top + (bottom - top) * v
  }

  // Sum of value noise at several scales, each sampled at a
  // position offset by its own flow direction/speed and the current
  // time, normalized back to [0, 1].
  function fbm(x: number, y: number, time: number): number {
    let total = 0
    for (const octave of NOISE_OCTAVES) {
      const flowX = time * octave.speed * octave.dirX
      const flowY = time * octave.speed * octave.dirY
      total +=
        valueNoise((x - flowX) / octave.scale, (y - flowY) / octave.scale) *
        octave.amplitude
    }
    return total / NOISE_OCTAVE_TOTAL
  }

  interface RoadSample {
    x: number
    y: number
    s: number
  }

  interface Road {
    samples: RoadSample[]
    length: number
    def: RoadDef
  }

  interface DotRoadHit {
    roadIndex: number
    d: number
    s: number
  }

  interface Dot {
    x: number
    y: number
    hits: DotRoadHit[]
  }

  let container: HTMLDivElement
  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D | null = null
  let resizeObserver: ResizeObserver | undefined
  let motionQuery: MediaQueryList | undefined
  let rafId: number | null = null
  let reduced = false
  // Timestamp of the last frame drawn, so a resize while paused redraws the
  // frozen frame instead of jumping to a new moment.
  let lastTime = 0

  let width = 0
  let height = 0
  let dots: Dot[] = []
  let roads: Road[] = []

  function cubicBezier(
    [p0, p1, p2, p3]: [Point, Point, Point, Point],
    t: number,
  ): Point {
    const mt = 1 - t
    const a = mt * mt * mt
    const b = 3 * mt * mt * t
    const c = 3 * mt * t * t
    const d = t * t * t
    return {
      x: a * p0.x + b * p1.x + c * p2.x + d * p3.x,
      y: a * p0.y + b * p1.y + c * p2.y + d * p3.y,
    }
  }

  function buildRoads() {
    roads = ROAD_DEFS.map((def) => {
      const controls: [Point, Point, Point, Point] = [
        { x: def.controls[0].x * width, y: def.controls[0].y * height },
        { x: def.controls[1].x * width, y: def.controls[1].y * height },
        { x: def.controls[2].x * width, y: def.controls[2].y * height },
        { x: def.controls[3].x * width, y: def.controls[3].y * height },
      ]
      const samples: RoadSample[] = []
      let prev: Point | null = null
      let cumulative = 0
      for (let i = 0; i <= SAMPLE_COUNT; i++) {
        const point = cubicBezier(controls, i / SAMPLE_COUNT)
        if (prev) cumulative += Math.hypot(point.x - prev.x, point.y - prev.y)
        samples.push({ x: point.x, y: point.y, s: cumulative })
        prev = point
      }
      return { samples, length: cumulative, def }
    })
  }

  // Nearest-sample distance/arc-length for one dot on one road. Dots
  // farther than the road's own reaction radius are left out of the
  // dot's hit list entirely, so the per-frame loop only ever touches
  // dots that can actually be visible near a road.
  function nearestOnRoad(
    road: Road,
    x: number,
    y: number,
  ): { d: number; s: number } {
    let bestDist2 = Infinity
    let bestS = 0
    for (const sample of road.samples) {
      const dx = x - sample.x
      const dy = y - sample.y
      const dist2 = dx * dx + dy * dy
      if (dist2 < bestDist2) {
        bestDist2 = dist2
        bestS = sample.s
      }
    }
    return { d: Math.sqrt(bestDist2), s: bestS }
  }

  function buildGrid() {
    buildRoads()
    dots = []
    const cols = Math.ceil(width / DOT_SPACING) + 1
    const rows = Math.ceil(height / DOT_SPACING) + 1
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * DOT_SPACING
        const y = row * DOT_SPACING
        const hits: DotRoadHit[] = []
        roads.forEach((road, roadIndex) => {
          const { d, s } = nearestOnRoad(road, x, y)
          if (d <= road.def.sigmaLateral * 3) hits.push({ roadIndex, d, s })
        })
        dots.push({ x, y, hits })
      }
    }
  }

  function resize() {
    if (!container || !canvas) return
    const rect = container.getBoundingClientRect()
    width = rect.width
    height = rect.height
    if (width === 0 || height === 0) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx = canvas.getContext('2d')
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
    buildGrid()
    draw(reduced ? null : paused && lastTime ? lastTime : performance.now())
  }

  // time === null renders the reduced-motion resting frame: a fixed,
  // uniform dot size (not BASE_RADIUS, which is 0, or the grid would just
  // vanish for those users). Otherwise every dot sits at BASE_RADIUS
  // (invisible) except where a road's wave currently swells it.
  const STATIC_RADIUS = 1.1

  function draw(time: number | null) {
    if (!ctx) return
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = `rgba(${DOT_COLOR}, ${opacity})`

    // One path for the whole grid, one fill() call, rather than a
    // beginPath/fill pair per dot: this runs every frame on every
    // homepage visit, so batching the draw call matters more here than
    // the readability cost of a slightly denser loop body.
    ctx.beginPath()
    for (const dot of dots) {
      let radius = time === null ? STATIC_RADIUS : BASE_RADIUS
      if (time !== null && dot.hits.length > 0) {
        // The noise field itself no longer varies per road (direction
        // lives on the octaves now, see NOISE_OCTAVES), so it only needs
        // evaluating once per dot; only the lateral "how close to this
        // road" term still varies per hit.
        const raw = fbm(dot.x, dot.y, time)
        // Only the top slice of the noise field (see NOISE_FLOOR/
        // NOISE_CEILING) counts as visible ink, smoothstepped so the
        // edge of a blob fades rather than cuts off hard.
        const t = Math.min(
          1,
          Math.max(0, (raw - NOISE_FLOOR) / (NOISE_CEILING - NOISE_FLOOR)),
        )
        const wave = t * t * (3 - 2 * t)

        let maxLateral = 0
        for (const hit of dot.hits) {
          const road = roads[hit.roadIndex]
          const lateral = Math.exp(
            -(hit.d * hit.d) /
              (2 * road.def.sigmaLateral * road.def.sigmaLateral),
          )
          if (lateral > maxLateral) maxLateral = lateral
        }
        const factor = maxLateral * wave
        radius = BASE_RADIUS + (PEAK_RADIUS - BASE_RADIUS) * factor
      }
      ctx.moveTo(dot.x + radius, dot.y)
      ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2)
    }
    ctx.fill()
  }

  function loop(time: number) {
    lastTime = time
    draw(time)
    rafId = requestAnimationFrame(loop)
  }

  function startAnimation() {
    if (rafId !== null) cancelAnimationFrame(rafId)
    rafId = null
    if (reduced) {
      draw(null)
    } else if (paused) {
      draw(lastTime || performance.now())
    } else {
      rafId = requestAnimationFrame(loop)
    }
  }

  onMount(() => {
    motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduced = motionQuery.matches
    resize()
    startAnimation()

    resizeObserver = new ResizeObserver(() => resize())
    resizeObserver.observe(container)

    const handleMotionChange = (event: MediaQueryListEvent) => {
      reduced = event.matches
      startAnimation()
    }
    motionQuery.addEventListener('change', handleMotionChange)

    return () => {
      motionQuery?.removeEventListener('change', handleMotionChange)
    }
  })

  // Pause/resume after mount (the initial state is handled by startAnimation
  // in onMount). Pausing just stops scheduling frames, so the canvas keeps
  // showing the last one drawn.
  $effect(() => {
    const isPaused = paused
    if (!ctx || reduced)
      return
    if (isPaused) {
      if (rafId !== null)
        cancelAnimationFrame(rafId)
      rafId = null
    }
    else if (rafId === null) {
      startAnimation()
    }
  })

  onDestroy(() => {
    if (rafId !== null) cancelAnimationFrame(rafId)
    resizeObserver?.disconnect()
  })
</script>

<div class="ink-halftone" bind:this={container} aria-hidden="true">
  <canvas bind:this={canvas}></canvas>
</div>

<style>
  .ink-halftone {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  canvas {
    display: block;
  }
</style>
