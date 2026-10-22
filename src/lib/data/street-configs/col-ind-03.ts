import type { ConfigEntry, Segment, StreetConfig, ViewerData } from '$lib/viewer/types'

// Industrial Collector, COL-IND-03.
// The descriptions follow this page's Layered guidance table (citation
// numbers are this page's own References). Sourced widths: 12 ft travel lanes
// [1, 9, 29]; the 10 ft parking and loading lane [1], FHWA's 10 ft minimum
// loading zone [5] (Raleigh's 8.5 ft [29] is a narrower precedent); Portland's
// industrial-road sidewalk corridor, a 6 ft through zone plus a 0.5 ft
// frontage zone (drawn as one 6.5 ft sidewalk) and a 5 ft continuous planting
// strip [28]; FHWA's preferred protected bike lane widths, 7 ft one-way and
// 12 ft two-way, and its 3 ft minimum buffer [5]; NACTO's dotted yellow
// center line on a two-way lane [36]; the Commonway System's planting strip
// of at least 6.5 ft (2 m) between road and bike lane, the bottom of the 2 to
// 5 m crossing setback [26, 27]; FHWA's 30 ft parking setback at a crosswalk
// at 26 to 35 mph [30]; street trees every 40 ft (Raleigh [29]); at the
// driveway, FHWA's 20 ft parking and 15 ft clear-view distances beside a
// separated bike lane [5] and MassDOT's green conflict marking [27]; CROW's
// 2.00 m one-way cycle track and its verge of at least 1.0 m [32]. Not
// sourced, drawn as typical: the street lights' spacing, the crosswalk and
// curb extension placement (Complete Streets lists curb extensions as
// typical [35]), the driveway's place and 30 ft width, its apron's 3 ft
// flares and the conflict marking's dash lengths, the raised bike lanes on
// the NACTO and Complete Streets rungs, and the Dutch reference's 11 ft
// lanes, 6 ft median, 4 ft verge and 6.5 ft sidewalks. The truck in one
// travel lane and the parking lot and lawn beyond the property lines are
// drawn context only.
//
// Rungs (Kevin, 2026.10.21): the NACTO and Complete Streets rungs start from
// the baseline street and change only what that source says for a truck
// street. NACTO asks for protected bike lanes on truck routes regardless of
// speed and volume, with wide separation such as planting strips or parked
// cars [25], so it adds them, at FHWA's widths [5]; Complete Streets lists
// curb extensions as a typical element [35], so it adds them at the
// crosswalk where there's parking. On both, as on the Commonway System, a
// bike lane without parking beside it runs next to the sidewalk behind the
// planting strip (Kevin, 2026.10.21: next to the travel lanes was too close
// on a truck street), and the two-way choice is offered, rated highly
// discouraged. The baseline stops parking 20 ft
// before the crosswalk (Ohio [14]), which the drawing doesn't show: no curb
// is built there, only paint and signs.
//
// The Commonway System bike lanes always run next to the sidewalk, raised
// partway to sidewalk height (there is no next-to-the-street option on this
// page), so every driveway and side street crossing sits 2 to 5 m from the
// travel lane [26, 27]. On a side without parking, a planting strip of at
// least 6.5 ft lies between the road and the bike lane. On a side with
// parking, the 10 ft raised brick parking lane and an empty 3 ft brick door
// buffer, raised with it, protect the bike lane (about 4 m of setback), and
// the 5 ft planting strip moves between the sidewalk and the bike lane, so
// the street keeps its trees. Parking, as on Collector Default, is brick or
// permeable pavers raised partway behind a mountable curb with a white brick
// T at each stall line; the tan brick is only an illustration. A two-way
// bike lane is a strongly discouraged fallback here. Every combination is
// built from the side() parts below; segment ids are the same in all of
// them, so "what changed" and "moved" line up.
//
// The Dutch reference draws CROW's ideal distributor road inside built-up
// areas [33] with its cycle track rules [32]: a median between the
// directions, one-way red cycle tracks behind a planted verge, a sidewalk
// beside them, no parking along the roadway and no midblock crossing. It is
// not an industrial-estate standard; none was found in public sources.

const PARKING_NOTE = 'The Commonway System discourages on-street parking and loading on an Industrial Collector. Off-street parking and loading are always preferred; it is shown here because it happens anyway.'
const TWO_WAY_NOTE = 'The Commonway System strongly discourages two-way bike lanes on an Industrial Collector. Drivers turning in and out of driveways look for riders coming the usual way and miss the ones coming the other way, and this street is lined with driveways.'

type Side = 'l' | 'r'
type Parking = 'none' | 'left' | 'right' | 'both'
type Bikeway = 'one-way' | 'two-way-left' | 'two-way-right'
type Rung = 'baseline' | 'nacto' | 'complete-streets' | 'commonway'

const PARKING: Parking[] = ['none', 'left', 'right', 'both']
const BIKEWAYS: Bikeway[] = ['one-way', 'two-way-left', 'two-way-right']
/** The side a two-way bike lane is on, or null for one-way lanes on both sides. */
const twoWaySide = (w: Bikeway): Side | null => w === 'one-way' ? null : w === 'two-way-left' ? 'l' : 'r'
/** Protected bike lane widths, FHWA's preferred: 7 ft one-way, 12 ft combined two-way [5]. */
const ONE_WAY_WIDTH = 7
const TWO_WAY_WIDTH = 12
/** Portland's industrial-road planting strip [28]; the Commonway System's strip between road and bike lane [26, 27]. */
const PLANTING_WIDTH = 5
const SETBACK_PLANTING_WIDTH = 6.5

const parkedOn = (p: Parking, side: Side) => p === 'both' || (side === 'l' ? p === 'left' : p === 'right')
const sideName = (s: Side) => s === 'l' ? 'left' : 'right'
const where = (p: Parking) => p === 'both' ? 'on both sides' : `on the ${p} side only (as drawn)`

const sidewalk = (side: Side): Segment => ({ id: `sw-${side}`, type: 'sidewalk', width: 6.5 })
// Street trees 40 ft apart, Raleigh's industrial street [29]; lights between them (typical).
const planting = (side: Side, width = PLANTING_WIDTH): Segment => ({ id: `fs-${side}`, type: 'furnishing', width, items: [{ type: 'tree', spacing: 40 }, { type: 'street-light', spacing: 80, start: 20 }] })
// A 10 ft parking and loading lane; a white T at each stall line.
const parking = (side: Side): Segment => ({ id: `pk-${side}`, type: 'parking', width: 10, marking: 'stalls', label: 'Parking / loading', shortLabel: 'Parking' })
// The Commonway System's: brick, raised partway, as on Collector Default.
const brickParking = (side: Side): Segment => ({ ...parking(side), level: 'intermediate', surface: 'brick' })
// A curb extension's planting, zero wide until the override grows it.
const extension = (side: Side): Segment => ({ id: `ce-${side}`, type: 'furnishing', width: 0, label: 'Curb extension' })
const dir = (side: Side) => side === 'l' ? 'inbound' as const : 'outbound' as const

/**
 * One side of the street, from the property line in to the center line. On
 * every rung but the baseline, a bike lane with no parking beside it runs
 * next to the sidewalk, raised partway, behind the planting strip (Kevin,
 * 2026.10.21); a bike lane with parking beside it runs next to the parking,
 * behind a 3 ft door buffer, with the planting strip next to the sidewalk.
 */
function side(rung: Rung, s: Side, parked: boolean, bikeway: Bikeway = 'one-way'): Segment[] {
  if (rung === 'baseline')
    return [sidewalk(s), planting(s), ...(parked ? [parking(s)] : [])]
  const cw = rung === 'commonway'
  const lot = cw ? brickParking(s) : parking(s)
  const tw = twoWaySide(bikeway)
  // A two-way bike lane on the other side: no bike lane here, and parking
  // sits beside the planting strip with no door buffer.
  if (tw && tw !== s)
    return [sidewalk(s), planting(s), ...(parked ? [extension(s), lot] : [])]
  const bike = (raised: boolean): Segment => ({
    id: `bk-${s}`,
    type: 'protected-bike-lane',
    width: tw ? TWO_WAY_WIDTH : ONE_WAY_WIDTH,
    direction: tw ? 'both' : dir(s),
    ...(cw ? { elementId: 'ELM-PBL-37' } : {}),
    ...(raised ? { level: 'intermediate' as const, label: tw ? 'Raised two-way bike lane' : 'Raised bike lane', shortLabel: 'Bike lane' } : tw ? { label: 'Two-way bike lane', shortLabel: 'Bike lane' } : {}),
  })
  if (!parked)
    return [sidewalk(s), bike(true), planting(s, cw ? SETBACK_PLANTING_WIDTH : PLANTING_WIDTH)]
  const buffer: Segment = cw ? { id: `buf-${s}`, type: 'buffer', width: 3, level: 'intermediate', surface: 'brick' } : { id: `buf-${s}`, type: 'buffer', width: 3 }
  return [sidewalk(s), planting(s), bike(cw), buffer, extension(s), lot]
}

// Where the cross-section can be cut: midblock, the crosswalk every rung
// shares, and a driveway on the left side (30 ft wide, typical).
const sections = [
  { id: 'midblock', label: 'Midblock', at: 80 },
  { id: 'crossing', label: 'At the crosswalk', at: 200 },
  { id: 'driveway', label: 'At the driveway', at: 320 },
]
// Detectable warnings at each curb ramp: US accessibility guidelines [34].
const crosswalk = { id: 'xw', type: 'crosswalk' as const, at: 200, length: 10, detectableWarnings: true }
/**
 * The driveway: the baseline keeps parking off only the driveway itself;
 * beside a separated bike lane, FHWA keeps parking 20 ft back and view-
 * blocking planting 15 ft back [5]; the Commonway System adds MassDOT's
 * green conflict marking [27].
 */
const driveway = (rung: Rung) => ({
  id: 'dw',
  type: 'driveway' as const,
  at: 320,
  length: 30,
  side: 'left' as const,
  ...(rung === 'baseline' ? {} : { noParking: 20, clearView: 15 }),
  ...(rung === 'commonway' ? { conflictMarking: true } : {}),
})

function street(rung: Rung, p: Parking, bikeway: Bikeway = 'one-way'): StreetConfig {
  const segments: Segment[] = [
    ...side(rung, 'l', parkedOn(p, 'l'), bikeway),
    // One lane carries a delivery truck: drawn context, the street's purpose.
    { id: 'ln-l', type: 'travel-lane', width: 12, direction: 'inbound', vehicle: 'truck' },
    { id: 'ln-r', type: 'travel-lane', width: 12, direction: 'outbound' },
    ...side(rung, 'r', parkedOn(p, 'r'), bikeway).reverse(),
  ]
  const config: StreetConfig = { kind: 'street', frontage: { left: 'parking-lot', right: 'lawn' }, segments, sections, features: [crosswalk, driveway(rung)] }
  if (p === 'none' || rung === 'baseline' || rung === 'nacto')
    return config
  // A planted curb extension takes the parking lane's place, and the door
  // buffer's beside it, at the crosswalk.
  const width = (id: string) => segments.find(sg => sg.id === id)?.width ?? 0
  const widths: Record<string, number> = {}
  for (const s of ['l', 'r'] as Side[]) {
    if (!parkedOn(p, s))
      continue
    const buffer = width(`buf-${s}`)
    Object.assign(widths, { [`pk-${s}`]: 0, [`ce-${s}`]: width(`pk-${s}`) + buffer }, buffer ? { [`buf-${s}`]: 0 } : {})
  }
  // Complete Streets: a typical length. The Commonway System: parking ends
  // 30 ft before each edge of the crosswalk (195 and 205 ft) [30].
  config.overrides = [rung === 'commonway'
    ? { id: 'ce', type: 'curb-extension', from: 171, to: 229, taper: 6, widths, elementId: 'ELM-CBE-02' }
    : { id: 'ce', type: 'curb-extension', from: 186, to: 214, taper: 6, widths, elementId: 'ELM-CBE-02' }]
  return config
}

const totalWidth = (c: StreetConfig) => c.segments.reduce((t, s) => t + s.width, 0)
const rightOfWay = (c: StreetConfig) => `Right of way: ${totalWidth(c)} ft.`

const LANES = 'Two 12 ft travel lanes, one each way, the width truck traffic needs; one carries a delivery truck in the drawing.'
const WALK = 'On each side, a 6 ft sidewalk with a 0.5 ft frontage zone at the property line (drawn together, 6.5 ft) and a 5 ft planting strip with street trees every 40 ft.'

/** The bike lanes, their protection on each side, and (Commonway System only) why they're set back. */
function bikeText(rung: Rung, p: Parking, bikeway: Bikeway): { text: string, cite: number[] } {
  const cw = rung === 'commonway'
  const tw = twoWaySide(bikeway)
  const raisedText = cw ? 'raised partway to sidewalk height' : 'drawn raised partway to sidewalk height'
  const lanes = tw === null
    ? 'The protected bike lanes are 7 ft, FHWA\'s preferred width, one on each side.'
    : `The bike lanes are combined into one two-way bike lane on the ${sideName(tw)} side (as drawn), 12 ft wide, FHWA's preferred width, with a dotted yellow center line between the two directions, as NACTO calls for. The Commonway System strongly discourages it on this street: drivers turning in and out of driveways look for riders coming the usual way and miss the ones coming the other way, and this street is lined with driveways. The ${sideName(tw === 'l' ? 'r' : 'l')} side has no bike lane: its sidewalk and 5 ft planting strip stay${parkedOn(p, tw === 'l' ? 'r' : 'l') ? ', with parking beside the planting strip and no door buffer, since no rider passes the doors there' : ''}.`
  const bikeSides: Side[] = tw === null ? ['l', 'r'] : [tw]
  const open = bikeSides.filter(s => !parkedOn(p, s))
  const parked = bikeSides.filter(s => parkedOn(p, s))
  const on = (ss: Side[]) => ss.length === 2 ? 'On each side' : `On the ${sideName(ss[0])} side`
  const strip = cw ? 'a planting strip of street trees at least 6.5 ft (2 m) wide' : 'the 5 ft planting strip'
  const protection = [
    open.length ? `${on(open)}, with no parking, the bike lane runs next to the sidewalk, ${raisedText}, with a narrow sloped edge strip a rider can ride up onto safely if they drift, and ${strip} lies between it and the road: the buffer and the barrier.` : '',
    parked.length ? `${on(parked)}, the parked cars and trucks protect the bike lane, behind an empty 3 ft door buffer${cw ? ', all raised partway to sidewalk height' : ''}, and the planting strip lies between the sidewalk and the bike lane, so the street keeps its trees.` : '',
  ].filter(Boolean).join(' ')
  const setback = cw ? ' Set back from the road, the bike lane crosses every driveway and side street 2 to 5 m (about 6.5 to 16.5 ft) from the travel lane, where a turning truck driver has room to see a rider and stop: a Dutch study found about 45% fewer crashes with riders at that setback.' : ''
  return { text: `${lanes} ${protection}${setback}`, cite: [5, ...(tw === null ? [] : [36, 32]), ...(cw ? [26, 27] : [25])] }
}

/** What the driveway on the left side looks like on each rung. */
function drivewayText(rung: Rung): { text: string, cite: number[] } {
  const apron = 'At the driveway on the left side, the planting strip is paved as the driveway apron, a ramp up toward the sidewalk, and the sidewalk runs straight across it.'
  if (rung === 'baseline')
    return { text: `${apron} Parking is kept off the driveway itself, and the street trees stand right up to it.`, cite: [] }
  const clear = 'Parking stops 20 ft before each edge of the driveway, and no tree stands within 15 ft of it, so drivers and riders can see each other, as FHWA asks beside a separated bike lane.'
  if (rung !== 'commonway')
    return { text: `${apron} ${clear}`, cite: [5] }
  return { text: `${apron} The bike lane keeps its own level across it too, with a dashed green conflict marking and dotted white edge lines where drivers cross it. ${clear}`, cite: [27, 5] }
}

function describe(rung: Rung, p: Parking, c: StreetConfig, bikeway: Bikeway): { description: string, cite: number[] } {
  const parked = p !== 'none'
  const parkingText = parked ? `A 10 ft parking and loading lane ${where(p)}.` : 'No on-street parking.'
  const dw = drivewayText(rung)
  if (rung === 'baseline') {
    return {
      description: `A typical US industrial street. ${LANES} ${WALK} ${parkingText}${parked ? ' A state rule like Ohio\'s keeps parking and loading 20 ft back from a marked crosswalk, with paint and signs, not a curb.' : ''} No bike facility. ${dw.text} ${rightOfWay(c)}`,
      cite: [1, 9, 29, 28, ...(parked ? [14] : [])],
    }
  }
  const bk = bikeText(rung, p, bikeway)
  if (rung === 'nacto' || rung === 'complete-streets') {
    const nacto = `The baseline street, plus what NACTO asks for on a truck route: protected bike lanes regardless of traffic speed and volume, with wide separation, such as a planting strip or parked cars, between truck and bicycle paths. ${bk.text} ${parkingText} ${LANES} ${WALK}`
    const intro = rung === 'nacto'
      ? nacto
      : `A Complete Streets policy lists sidewalks, bike lanes and curb extensions as typical elements, without setting widths, and says nothing specific about truck streets. The drawing keeps the NACTO street${parked ? ` and adds planted curb extensions where the sidewalk meets a marked crosswalk, ${where(p)}, in place of the parking lane` : ''}. ${nacto}`
    return {
      description: `${intro} ${dw.text} ${rightOfWay(c)}`,
      cite: [...(rung === 'complete-streets' ? [35] : []), 25, ...bk.cite, 1, 28, ...dw.cite],
    }
  }
  const parkingDetail = parked
    ? ` On-street parking and loading is discouraged on this street; off-street is always preferred. Where it happens anyway, it is a 10 ft lane ${where(p)}, brick or permeable pavers raised partway to sidewalk height behind a mountable curb, with a white brick T at each stall line, as on Default (Standard Collector); the tan brick is only an illustration. Parking and loading stop 30 ft before the crosswalk on both approaches, where a planted curb extension takes their place, with a walkway through it to the sidewalk.`
    : ''
  return {
    description: `${LANES} 6 ft sidewalks, with a 0.5 ft frontage zone at the property line (drawn together, 6.5 ft). ${bk.text}${parkingDetail} ${dw.text} This layout is a Commonway System decision. ${rightOfWay(c)}`,
    cite: [1, ...bk.cite, 28, ...(parked ? [30] : []), ...dw.cite],
  }
}

function entries(rung: Rung): ConfigEntry[] {
  const bikewayChoices: Bikeway[] = rung === 'baseline' ? ['one-way'] : BIKEWAYS
  return PARKING.flatMap(p => bikewayChoices.map((bikeway) => {
    const config = street(rung, p, bikeway)
    const when: Record<string, string> = rung === 'baseline' ? { parking: p } : { parking: p, bikeway }
    const d = describe(rung, p, config, bikeway)
    // Every US rung shares the crosswalk, its stripes and its detectable warnings.
    const crossingText = `At the crosswalk, ${rung === 'baseline' ? '' : 'the stripes continue across the bike lanes so riders see where people cross, and '}a yellow detectable warning strip of raised domes, 2 ft deep, marks each place a person walks off the curb or walkway into the crossing, as federal accessibility guidelines require.`
    const description = d.description.replace(/ Right of way:/, ` ${crossingText} Right of way:`)
    return { id: rung, ...d, description, cite: [...new Set([...d.cite, 34])], config, when }
  }))
}

// CROW's ideal distributor road inside built-up areas [33], with its cycle
// track width and verge [32]; lane, median, verge and sidewalk widths typical.
const dutch: StreetConfig = {
  kind: 'street',
  frontage: { left: 'parking-lot', right: 'lawn' },
  segments: [
    sidewalk('l'),
    { id: 'bk-l', type: 'protected-bike-lane', width: 6.5, direction: 'inbound', variant: 'cycle-track', surface: 'red', label: 'Cycle track' },
    { id: 'fs-l', type: 'furnishing', width: 4, items: [{ type: 'tree', spacing: 30 }] },
    { id: 'ln-l', type: 'travel-lane', width: 11, direction: 'inbound', vehicle: 'truck' },
    { id: 'md', type: 'median', width: 6 },
    { id: 'ln-r', type: 'travel-lane', width: 11, direction: 'outbound' },
    { id: 'fs-r', type: 'furnishing', width: 4, items: [{ type: 'tree', spacing: 30 }] },
    { id: 'bk-r', type: 'protected-bike-lane', width: 6.5, direction: 'outbound', variant: 'cycle-track', surface: 'red', label: 'Cycle track' },
    sidewalk('r'),
  ],
}

const data: ViewerData = {
  id: 'COL-IND-03',
  views: [
    { id: 'section', label: 'Cross-section', kind: 'cross-section' },
    { id: 'plan', label: 'Top down', kind: 'plan' },
  ],
  facets: [
    {
      id: 'parking',
      label: 'On-street parking and loading',
      options: [
        { id: 'none', label: 'None', advice: 'preferred' },
        { id: 'left', label: 'Left side', advice: 'discouraged', note: PARKING_NOTE },
        { id: 'right', label: 'Right side', advice: 'discouraged', note: PARKING_NOTE },
        { id: 'both', label: 'Both sides', advice: 'discouraged', note: PARKING_NOTE },
      ],
      why: { href: '#parking-and-loading-lanes', label: 'More on parking and loading lanes' },
    },
    {
      id: 'bikeway',
      label: 'Bike lanes',
      default: 'one-way',
      options: [
        { id: 'one-way', label: 'One-way, both sides', advice: 'preferred' },
        { id: 'two-way-left', label: 'Two-way, left side', advice: 'highly-discouraged', note: TWO_WAY_NOTE },
        { id: 'two-way-right', label: 'Two-way, right side', advice: 'highly-discouraged', note: TWO_WAY_NOTE },
      ],
      why: { href: '#bike-lanes-and-driveways', label: 'More on bike lanes and driveways' },
    },
  ],
  configs: [
    ...entries('baseline'),
    ...entries('nacto'),
    ...entries('complete-streets'),
    ...entries('commonway'),
    {
      id: 'dutch',
      description: `Not an industrial-estate standard: no Dutch cross-section made for industrial estates was found in public sources, so this draws CROW's ideal distributor road inside a built-up area at 50 km/h (about 31 mph). A median separates the two directions of traffic; one lane carries a delivery truck in the drawing. People cycle on one-way cycle tracks, red, 2.00 m (about 6.5 ft) wide, CROW's width for up to 150 riders an hour, behind a planted verge; CROW asks for at least 1.0 m (about 3.3 ft) of verge on such a road. A sidewalk runs beside each cycle track. There is no parking on or along the roadway, and no crosswalk midblock: people walking and cycling cross at intersections. The 11 ft lanes, the 6 ft median, the 4 ft verges and the sidewalks are drawn as typical widths. ${rightOfWay(dutch)}`,
      cite: [33, 32],
      config: dutch,
    },
  ],
}

export default data
