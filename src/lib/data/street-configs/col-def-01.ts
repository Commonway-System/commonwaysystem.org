import type { ConfigEntry, Segment, StreetConfig, ViewerData } from '$lib/viewer/types'

// Default (Standard Collector), COL-DEF-01.
// The descriptions follow this page's Layered guidance table (citation
// numbers are this page's own References). Sourced widths: 10 to 12 ft lanes
// [2], NACTO's 10 ft [3], 7 ft parking minimum and 8 ft desirable [13], PROWAG's
// 4 ft sidewalk minimum [7], NACTO's 5 to 7 ft residential sidewalk [8], 2 ft
// buffer minimum and 3 ft beside parking [5]. Not sourced, drawn as typical:
// the 6 ft protected bike lanes, the 4 ft furnishing strips, the flexible
// posts in NACTO's no-parking buffer, the 7 ft cycle tracks in the Dutch
// reference, and the crosswalk and curb extension placement (Complete
// Streets lists curb extensions as typical [4]). NACTO's parking lanes are
// 7 ft: it recommends 7 to 9 ft generally [3] and "typically 7 ft" beside a
// protected bike lane [5].
//
// Parking at the crosswalk, every rung (each has the crosswalk): no car is
// ever drawn on the crosswalk itself (the renderers' onCrosswalk()). The
// baseline stops there: a state code like Texas's bars parking on a crosswalk,
// and within 20 ft of one only at an intersection [29]. NACTO daylights the
// approach with a curb extension [30], over a typical length (NACTO gives
// none), as does Complete Streets [4]. The Commonway System stops parking
// 30 ft before the crosswalk on both approaches, FHWA's setback at 26 to
// 35 mph [26]. Every curb extension is planting in the place of the parking
// lane and its door buffer (the zero-wide ce- strip the override grows, the
// buffer going to 0 there), with a walkway paved through
// it, and through any planting strip, along the crosswalk to the sidewalk.
//
// Commonway System parking lanes follow Dutch practice on streets that have
// parking (Haarlem's Harmenjansweg is the precedent [20]): brick or permeable
// pavers [21, 22], raised partway to the sidewalk behind a mountable curb,
// with a white brick T at each stall line. Next to the street, the bike lane
// and door buffer beside parking are raised with it, the buffer paved in the
// same brick; a side without parking stays at road level (raising it too is
// optional, said in the text only). The tan brick is only an illustration.
// Parking itself is allowed but discouraged, both sides most of all [25].
//
// Two facets: on-street parking (none, left, right, both) on every rung but
// the Dutch reference, and where the bike lane sits (next to the street or
// next to the sidewalk) on the Commonway System rung only. The Commonway
// System layouts are the publication's own: parked cars protect a bike lane,
// so it needs only an empty 3 ft door buffer, no barrier; and a planting
// strip of trees between a raised bike lane and the road is a buffer and
// barrier in its own right, the same protection in another form. Every
// combination is built from the side() parts below; segment ids are the same
// in all of them, so "what changed" and "moved" line up. Commonway System
// parking lanes are 8 ft beside a street-level bike lane and 7 ft when the
// bike lane is next to the sidewalk.

type Side = 'l' | 'r'
type Parking = 'none' | 'left' | 'right' | 'both'
type Bikes = 'street' | 'sidewalk'
type Rung = 'baseline' | 'nacto' | 'complete-streets' | 'commonway'

const PARKING: Parking[] = ['none', 'left', 'right', 'both']
const BIKES: Bikes[] = ['street', 'sidewalk']

const parkedOn = (p: Parking, side: Side) => p === 'both' || (side === 'l' ? p === 'left' : p === 'right')

const sidewalk = (side: Side, width: number): Segment => ({ id: `sw-${side}`, type: 'sidewalk', width })
const planting = (side: Side): Segment => ({ id: `fs-${side}`, type: 'furnishing', width: 4, items: [{ type: 'tree', spacing: 30 }, { type: 'street-light', spacing: 60, start: 15 }] })
// Every parking lane gets a white T at each stall line, so it reads as parking.
const parking = (side: Side, width: number): Segment => ({ id: `pk-${side}`, type: 'parking', width, marking: 'stalls' })
// The Commonway System's parking lane: brick, raised partway, T-marked stalls.
const brickParking = (side: Side, width: number): Segment => ({ ...parking(side, width), level: 'intermediate', surface: 'brick', marking: 'stalls' })
// A curb extension's planting, beside a parking lane. Zero wide along the
// street; the curb extension override grows it where the parking ends, and
// the crosswalk paves a walkway through it to the sidewalk.
const extension = (side: Side): Segment => ({ id: `ce-${side}`, type: 'furnishing', width: 0, label: 'Curb extension' })
const dir = (side: Side) => side === 'l' ? 'inbound' as const : 'outbound' as const

/** One side of the street, from the property line in to the center line. */
function side(rung: Rung, s: Side, parked: boolean, bikes: Bikes): Segment[] {
  const bike = (extra: Partial<Segment> = {}): Segment => ({ id: `bk-${s}`, type: 'protected-bike-lane', width: 6, direction: dir(s), ...extra })
  switch (rung) {
    case 'baseline':
      return [sidewalk(s, 4), ...(parked ? [parking(s, 7)] : [])]
    case 'nacto':
    case 'complete-streets': {
      const buffer: Segment = parked
        ? { id: `buf-${s}`, type: 'buffer', width: 3 }
        : { id: `buf-${s}`, type: 'buffer', width: 2, items: [{ type: 'bollard' }] }
      return [
        sidewalk(s, 6),
        ...(rung === 'complete-streets' ? [planting(s)] : []),
        bike(parked ? {} : { variant: 'flex-post' }),
        buffer,
        ...(parked ? [extension(s), parking(s, 7)] : []),
      ]
    }
    case 'commonway': {
      const pbl = { elementId: 'ELM-PBL-37' }
      if (bikes === 'sidewalk') {
        return [
          sidewalk(s, 6),
          bike({ ...pbl, level: 'intermediate', label: 'Raised bike lane', shortLabel: 'Bike lane' }),
          planting(s),
          ...(parked ? [extension(s), brickParking(s, 7)] : []),
        ]
      }
      return parked
        ? [sidewalk(s, 6), planting(s), bike({ ...pbl, level: 'intermediate' }), { id: `buf-${s}`, type: 'buffer', width: 3, level: 'intermediate', surface: 'brick' }, extension(s), brickParking(s, 8)]
        : [sidewalk(s, 6), planting(s), bike({ ...pbl, variant: 'rigid-barrier' }), { id: `buf-${s}`, type: 'buffer', width: 2, items: [{ type: 'barrier' }] }]
    }
  }
}

// Where the cross-section can be cut, and the crosswalk every rung shares.
const sections = [
  { id: 'midblock', label: 'Midblock', at: 80 },
  { id: 'crossing', label: 'At the crosswalk', at: 200 },
]
// Detectable warnings at each curb ramp: US accessibility guidelines [31].
const crosswalk = { id: 'xw', type: 'crosswalk' as const, at: 200, length: 10, detectableWarnings: true }

function street(rung: Rung, p: Parking, bikes: Bikes): StreetConfig {
  const laneW = rung === 'baseline' ? 12 : 10
  const segments = [
    ...side(rung, 'l', parkedOn(p, 'l'), bikes),
    { id: 'ln-l', type: 'travel-lane' as const, width: laneW, direction: 'inbound' as const },
    { id: 'ln-r', type: 'travel-lane' as const, width: laneW, direction: 'outbound' as const },
    ...side(rung, 'r', parkedOn(p, 'r'), bikes).reverse(),
  ]
  const config: StreetConfig = { kind: 'street', frontage: { left: 'lawn', right: 'lawn' }, segments, sections, features: [crosswalk] }
  // What takes the parking lane's place at the crosswalk, on a parked side only.
  // The baseline has nothing: parking runs right up to the crosswalk [29].
  const widths: Record<string, number> = {}
  for (const s of ['l', 'r'] as Side[]) {
    if (!parkedOn(p, s))
      continue
    // The curb extension's planting takes the whole width of the parking lane
    // and of the door buffer beside it: no buffer is needed inside it.
    const width = (id: string) => segments.find(sg => sg.id === id)?.width ?? 0
    if (rung !== 'baseline') {
      const buffer = bikes === 'sidewalk' && rung === 'commonway' ? 0 : width(`buf-${s}`)
      Object.assign(widths, { [`pk-${s}`]: 0, [`ce-${s}`]: width(`pk-${s}`) + buffer }, buffer ? { [`buf-${s}`]: 0 } : {})
    }
  }
  if (rung === 'nacto' && p !== 'none')
    config.overrides = [{ id: 'ce', type: 'curb-extension', from: 186, to: 214, taper: 6, widths, elementId: 'ELM-CBE-02' }]
  else if (rung === 'complete-streets' && p !== 'none')
    config.overrides = [{ id: 'ce', type: 'curb-extension', from: 186, to: 214, taper: 6, widths, elementId: 'ELM-CBE-02' }]
  // Parking ends 30 ft before each edge of the crosswalk (195 and 205 ft) [26].
  else if (rung === 'commonway' && p !== 'none')
    config.overrides = [{ id: 'ce', type: 'curb-extension', from: 171, to: 229, taper: 6, widths, elementId: 'ELM-CBE-02' }]
  return config
}

const rightOfWay = (c: StreetConfig) => `Right of way: ${c.segments.reduce((t, s) => t + s.width, 0)} ft.`

/** "on both sides" / "on the left side only (as drawn)" */
const where = (p: Parking) => p === 'both' ? 'on both sides' : `on the ${p} side only (as drawn)`
const other = (p: Parking) => p === 'left' ? 'right' : 'left'

function describe(rung: Rung, p: Parking, bikes: Bikes, c: StreetConfig): { description: string, cite?: number[] } {
  const parked = p !== 'none'
  switch (rung) {
    case 'baseline':
      return {
        description: `Two travel lanes within the AASHTO Green Book's 10 to 12 ft Collector range, drawn at 12 ft. ${parked ? `Parking lanes ${where(p)}, 7 ft, the Green Book's urban minimum.` : 'No on-street parking.'} ${parked ? ' Parking runs right up to the midblock crosswalk: a typical state code bars parking on a crosswalk, and within 20 ft of one only at an intersection.' : ''} No bike facility is required. Sidewalks are drawn at 4 ft, the PROWAG minimum clear width, though federal rules don't require a sidewalk to be built at all. ${rightOfWay(c)}`,
        cite: parked ? [2, 13, 29, 7] : [2, 7],
      }
    case 'nacto':
    case 'complete-streets': {
      const parkedText = 'parked cars protect it, with a 3 ft buffer for opening car doors'
      const postText = 'a 2 ft buffer with flexible posts protects it'
      const protection = p === 'both'
        ? `Parking lanes are 7 ft on both sides; ${parkedText}.`
        : p === 'none'
          ? `There's no on-street parking, so ${postText}.`
          : `Parking is 7 ft, on the ${p} side only (as drawn). On that side ${parkedText}; on the ${other(p)} side ${postText}.`
      if (rung === 'nacto') {
        return {
          description: `Travel lanes narrow to 10 ft, NACTO's urban recommendation. Each side gets a protected bike lane instead of a painted one. ${protection} ${parked ? ' At the crosswalk a planted curb extension takes the parking lane\'s place, so drivers and people crossing can see each other; NACTO calls this daylighting but gives no length, so it is drawn at a typical length, with a walkway through it to the sidewalk.' : ''} The sidewalk widens to a 6 ft through zone, inside NACTO's 5 to 7 ft residential range. ${rightOfWay(c)}`,
          cite: parked ? [3, 5, 30, 8] : [3, 5, 8],
        }
      }
      return {
        description: `A Complete Streets policy lists sidewalks, bike lanes or wide shoulders, narrower travel lanes and curb extensions as typical elements, without setting widths. The drawing keeps the NACTO dimensions and adds a furnishing strip with street trees. ${protection} ${parked ? `Curb extensions take the parking lane's place where the sidewalk meets a marked crosswalk, ${where(p)}.` : 'No curb extensions are drawn, since there\'s no parking lane for them to take the place of.'} ${rightOfWay(c)}`,
        cite: [4],
      }
    }
    case 'commonway': {
      const base = 'Two 10 ft travel lanes, one each way, and 6 ft sidewalks with a 4 ft planting strip of street trees on both sides.'
      const decision = 'This layout is a Commonway System decision.'
      const brick = `${p === 'both' ? 'The parking lanes are' : 'The parking lane is'} brick or permeable pavers, which let rain soak into the ground instead of running off, raised partway to sidewalk height behind a mountable curb that cars pull up over. The raised parking narrows the roadway drivers see, which slows them, and when no cars are parked it reads as part of the walking space. A white T, laid in white bricks, marks each stall line. No standard sets the brick color; the tan drawn here is only an illustration.`
      const parkedCite = [20, 21, 22, 25, 26]
      // Parking is allowed but discouraged, both sides most of all [25].
      const discouraged = p === 'both'
        ? 'Parking on both sides is the least recommended choice: crashes rise with the share of curb given to parked cars.'
        : 'Parking is discouraged on a Collector; on one side it adds about half the crash risk of parking on both.'
      const setback = `Parking stops 30 ft before the crosswalk on both approaches, and a planted curb extension takes its place, with a walkway through it from the crosswalk to the sidewalk.`
      if (bikes === 'street') {
        const protection = p === 'none'
          ? 'There\'s no on-street parking, so on each side a rigid barrier in a 2 ft buffer protects the bike lane.'
          : p === 'both'
            ? 'Parking lanes are 8 ft on both sides. The parked cars protect the bike lanes, so no barrier is needed, only an empty 3 ft buffer for opening car doors.'
            : `Parking is 8 ft, on the ${p} side only (as drawn). On that side the parked cars protect the bike lane, so it needs no barrier, only an empty 3 ft buffer for opening car doors; on the ${other(p)} side a rigid barrier in a 2 ft buffer protects it.`
        return {
          description: `${base} The 6 ft protected bike lanes run next to the street. ${protection}${parked ? ` ${discouraged} ${setback} ${brick} Beside parking, the bike lane and the door buffer are raised to the same height, the buffer paved in the same brick.${p === 'both' ? '' : ` On the ${other(p)} side, without parking, they're drawn at road level; raising them there too is an option, not a recommendation.`}` : ''} ${decision} ${rightOfWay(c)}`,
          cite: parked ? [3, 13, 5, ...parkedCite] : [3],
        }
      }
      const protection = p === 'none'
        ? 'There\'s no on-street parking, so the trees must be there: they are the barrier.'
        : p === 'both'
          ? 'Parking lanes are 7 ft on both sides, between the travel lanes and the planting strips; the parked cars protect the bike lanes too, so there the trees aren\'t what keeps riders safe.'
          : `Parking is 7 ft, on the ${p} side only (as drawn), where the parked cars protect the bike lane too. On the ${other(p)} side the trees must be there: they are the barrier.`
      return {
        description: `${base} The 6 ft bike lanes run next to the sidewalk instead, raised partway to sidewalk height, with a narrow sloped edge strip a rider can ride up onto safely if they drift. The planting strip and its trees are the buffer and the barrier between the bike lane and traffic: the same protection a rigid barrier gives, in another form. ${protection}${parked ? ` ${discouraged} ${setback} ${brick}` : ''} ${decision} ${rightOfWay(c)}`,
        cite: parked ? [3, 13, ...parkedCite] : [3],
      }
    }
  }
}

function entries(rung: Rung): ConfigEntry[] {
  const bikeChoices: Bikes[] = rung === 'commonway' ? BIKES : ['street']
  return PARKING.flatMap(p => bikeChoices.map((bikes) => {
    const config = street(rung, p, bikes)
    const when: Record<string, string> = rung === 'commonway' ? { parking: p, bikes } : { parking: p }
    const d = describe(rung, p, bikes, config)
    // Every US rung shares the crosswalk, its stripes and its detectable warnings.
    const crossingText = `At the crosswalk, ${rung === 'baseline' ? '' : 'the stripes continue across the bike lanes so riders see where people cross, and '}a yellow detectable warning strip of raised domes, 2 ft deep, marks each place a person walks off the curb or walkway into the crossing, as federal accessibility guidelines require.`
    const description = d.description.replace(/ Right of way:/, ` ${crossingText} Right of way:`)
    return { id: rung, ...d, description, cite: [...(d.cite ?? []), 31], config, when }
  }))
}

const data: ViewerData = {
  id: 'COL-DEF-01',
  views: [
    { id: 'section', label: 'Cross-section', kind: 'cross-section' },
    { id: 'plan', label: 'Top down', kind: 'plan' },
  ],
  facets: [
    {
      id: 'parking',
      label: 'On-street parking',
      options: [
        { id: 'none', label: 'None' },
        { id: 'left', label: 'Left side' },
        { id: 'right', label: 'Right side' },
        { id: 'both', label: 'Both sides' },
      ],
    },
    {
      id: 'bikes',
      label: 'Bike lane',
      default: 'sidewalk',
      options: [
        { id: 'street', label: 'Next to the street' },
        { id: 'sidewalk', label: 'Next to the sidewalk' },
      ],
    },
  ],
  configs: [
    ...entries('baseline'),
    ...entries('nacto'),
    ...entries('complete-streets'),
    ...entries('commonway'),
    {
      id: 'dutch',
      description: 'The closest Dutch peer is a distributor road. Above 30 km/h (about 19 mph), cyclists get a physically separated cycle track, not a painted lane. CROW\'s ideal for this class has no parking on or along the roadway, and there is no direct property access; both belong on local access streets.',
      cite: [6, 28],
      config: {
        kind: 'street',
        frontage: { left: 'lawn', right: 'lawn' },
        segments: [
          sidewalk('l', 6),
          { id: 'bk-l', type: 'protected-bike-lane', width: 7, direction: 'both', variant: 'cycle-track' },
          { id: 'fs-l', type: 'furnishing', width: 4, items: [{ type: 'tree', spacing: 30 }] },
          { id: 'ln-l', type: 'travel-lane', width: 10, direction: 'inbound' },
          { id: 'ln-r', type: 'travel-lane', width: 10, direction: 'outbound' },
          { id: 'fs-r', type: 'furnishing', width: 4, items: [{ type: 'tree', spacing: 30 }] },
          { id: 'bk-r', type: 'protected-bike-lane', width: 7, direction: 'both', variant: 'cycle-track' },
          sidewalk('r', 6),
        ],
      },
    },
  ],
}

export default data
