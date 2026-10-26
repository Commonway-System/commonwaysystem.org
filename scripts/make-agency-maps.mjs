// Writes the Road Agency Directory's map outlines to
// src/lib/data/agencies/maps/us.ts, so the page ships plain SVG paths and no
// mapping library. Run it only when the map's layout or source data changes:
//   node scripts/make-agency-maps.mjs
//
// Source: us-atlas 3 (ISC license), built from the U.S. Census Bureau's
// cartographic boundary files (public domain), at 1:10,000,000.
// The 50 states and DC use the Albers USA projection, which already insets
// Alaska and Hawaii. The five territories each get their own small box along
// the bottom. States too small to tap or label get a callout box to the right.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import { geoAlbersUsa, geoArea, geoMercator, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import { presimplify, quantile, simplify } from 'topojson-simplify'

const require = createRequire(import.meta.url)
const raw = JSON.parse(readFileSync(require.resolve('us-atlas/states-10m.json'), 'utf8'))
// Simplify on the topology, so neighboring states keep a shared border.
// quantile() here is the share of points kept, ranked by visual weight;
// a tenth is plenty at this size (about 21 KB for the whole map).
const pre = presimplify(raw)
const topo = simplify(pre, quantile(pre, 0.1))
const states = feature(topo, topo.objects.states).features
// Territories are drawn enlarged in their own boxes, from the unsimplified
// data: simplifying would erase the smaller islands entirely.
const fullDetail = feature(raw, raw.objects.states).features

const FIPS = {
  '01': 'AL', '02': 'AK', '04': 'AZ', '05': 'AR', '06': 'CA', '08': 'CO', '09': 'CT', '10': 'DE', '11': 'DC',
  '12': 'FL', '13': 'GA', '15': 'HI', '16': 'ID', '17': 'IL', '18': 'IN', '19': 'IA', '20': 'KS', '21': 'KY',
  '22': 'LA', '23': 'ME', '24': 'MD', '25': 'MA', '26': 'MI', '27': 'MN', '28': 'MS', '29': 'MO', '30': 'MT',
  '31': 'NE', '32': 'NV', '33': 'NH', '34': 'NJ', '35': 'NM', '36': 'NY', '37': 'NC', '38': 'ND', '39': 'OH',
  '40': 'OK', '41': 'OR', '42': 'PA', '44': 'RI', '45': 'SC', '46': 'SD', '47': 'TN', '48': 'TX', '49': 'UT',
  '50': 'VT', '51': 'VA', '53': 'WA', '54': 'WV', '55': 'WI', '56': 'WY',
  '60': 'AS', '66': 'GU', '69': 'MP', '72': 'PR', '78': 'VI',
}
const TERRITORIES = ['PR', 'VI', 'GU', 'MP', 'AS']
// Small states get a labeled box in a column to the right of the map,
// joined to the state by a leader line.
const CALLOUTS = ['VT', 'NH', 'MA', 'RI', 'CT', 'NJ', 'DE', 'MD', 'DC']
// Hand-placed label positions where the centroid falls badly (in a lake,
// off a peninsula, or on a neighbor's label).
const LABEL_NUDGE = { MI: [12, 22], FL: [14, 6], LA: [-10, 0], KY: [6, 2], HI: [24, 6], ID: [0, 22], CA: [-8, 6], WV: [-2, 4], VA: [8, 4], NY: [6, 0], ME: [-2, 4] }

const MAIN_W = 975
const MAIN_H = 610
const CALLOUT_X = 990
const CALLOUT_W = 52
const CALLOUT_H = 28
const WIDTH = CALLOUT_X + CALLOUT_W + 8
const STRIP_Y = 640
const BOX_H = 104
const BOX_GAP = 12
const BOX_W = (WIDTH - BOX_GAP * (TERRITORIES.length - 1)) / TERRITORIES.length
const HEIGHT = STRIP_Y + BOX_H + 4

const r1 = n => Math.round(n * 10) / 10
const projection = geoAlbersUsa().scale(1300).translate([MAIN_W / 2, MAIN_H / 2])
const path = geoPath(projection).digits(0)

// Drop islands too small to see at this size (a few square units), so the
// paths stay short. Territories are drawn in their own enlarged boxes and
// keep every island.
function dropSpecks(f, minArea) {
  if (f.geometry.type !== 'MultiPolygon')
    return f
  const polys = f.geometry.coordinates.filter(c => path.area({ type: 'Polygon', coordinates: c }) >= minArea)
  return { ...f, geometry: { ...f.geometry, coordinates: polys } }
}

const regions = []
const calloutAnchors = []

for (const f of states) {
  const code = FIPS[f.id]
  if (!code)
    throw new Error(`Unknown FIPS ${f.id} (${f.properties.name})`)
  if (TERRITORIES.includes(code))
    continue
  const shape = dropSpecks(f, 2)
  const d = path(shape)
  const [cx, cy] = path.centroid(shape)
  const nudge = LABEL_NUDGE[code] ?? [0, 0]
  const region = { code: `US-${code}`, abbr: code, d, label: [r1(cx + nudge[0]), r1(cy + nudge[1])] }
  if (CALLOUTS.includes(code))
    calloutAnchors.push({ region, anchor: [r1(cx), r1(cy)] })
  regions.push(region)
}

// Callout boxes in north-to-south order, spaced so they never overlap.
calloutAnchors.sort((a, b) => a.anchor[1] - b.anchor[1])
let nextY = 60
for (const { region, anchor } of calloutAnchors) {
  const y = Math.max(nextY, anchor[1] - CALLOUT_H / 2)
  nextY = y + CALLOUT_H + 8
  region.callout = { x: CALLOUT_X, y: r1(y), w: CALLOUT_W, h: CALLOUT_H, from: anchor }
  region.label = [r1(CALLOUT_X + CALLOUT_W / 2), r1(y + CALLOUT_H / 2)]
}

// Territories: each fitted into its own box, under a name line.
TERRITORIES.forEach((code, i) => {
  const f = fullDetail.find(s => FIPS[s.id] === code)
  const x = r1(i * (BOX_W + BOX_GAP))
  const pad = 10
  const top = STRIP_Y + 30
  // Fit the box to the main islands (each at least a twentieth the size of
  // the largest); remote atolls outside it are clipped off.
  const polys = f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates : [f.geometry.coordinates]
  const areas = polys.map(c => geoArea({ type: 'Polygon', coordinates: c }))
  const main = polys.filter((_, j) => areas[j] >= Math.max(...areas) / 20)
  const proj = geoMercator()
    .fitExtent([[x + pad, top], [x + BOX_W - pad, STRIP_Y + BOX_H - pad]], { type: 'MultiPolygon', coordinates: main })
    .clipExtent([[x + 2, top - 4], [x + BOX_W - 2, STRIP_Y + BOX_H - 2]])
  regions.push({
    code: `US-${code}`,
    abbr: code,
    d: geoPath(proj).digits(0)(f),
    label: [r1(x + pad), STRIP_Y + 20],
    inset: { x, y: STRIP_Y, w: r1(BOX_W), h: BOX_H },
  })
})

regions.sort((a, b) => a.code.localeCompare(b.code))

const out = `// Generated by scripts/make-agency-maps.mjs from us-atlas 3 (U.S. Census
// Bureau cartographic boundaries, 1:10,000,000). Don't edit by hand; change
// the script and run it again.

import type { RegionMap } from './types.js'

const map: RegionMap = ${JSON.stringify({ viewBox: [0, 0, WIDTH, HEIGHT], regions }, null, 2)
  .replace(/"([a-zA-Z]+)":/g, '$1:')
  .replace(/"/g, '\'')}

export default map
`
mkdirSync('src/lib/data/agencies/maps', { recursive: true })
writeFileSync('src/lib/data/agencies/maps/us.ts', out)
console.log(`Wrote ${regions.length} regions, ${(out.length / 1024).toFixed(1)} KB`)
