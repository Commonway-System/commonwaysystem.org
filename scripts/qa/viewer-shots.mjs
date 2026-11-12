// Screenshots of the Pattern viewer's stage, per page, drawing style, theme and width (not part of the build).
// Borrows puppeteer-core the way qa.mjs does and drives the installed Google Chrome.
//   node scripts/qa/viewer-shots.mjs --out=<dir> --pages=col,park,cross,colplan --styles=muted,ink,print --themes=light,dark --widths=1280,375
//   --base=http://localhost:5180 (default: the dev server on :5173)   --dpr=1   --simple=1 (Simplified view) or --simple=hc (high contrast)
//   --weight=1 prints the first drawing's raw and gzip size   --noshot=1 skips the images
// Page keys are in PAGES below. Read the images (or tile them into a contact sheet with PIL) to review.
import { createRequire } from 'node:module'
import fs from 'node:fs'
import zlib from 'node:zlib'
const req = createRequire('/Users/kevinyoung/Documents/pro-how-com/scripts/qa/package.json')
const puppeteer = req('puppeteer-core')
const opt = Object.fromEntries(process.argv.slice(2).map(a => a.replace(/^--/, '').split(/=(.*)/s)))
const B = opt.base || 'http://localhost:5173'
const PAGES = {
  col: '/patterns/collectors/default/',
  colplan: '/patterns/collectors/default/?view=plan',
  dutch: '/patterns/collectors/default/?config=dutch',
  park: '/patterns/collectors/default/?parking=both',
  cross: '/patterns/collectors/default/?cut=crossing',
  ind: '/patterns/collectors/industrial-collector/',
  inddw: '/patterns/collectors/industrial-collector/?cut=driveway&parking=both',
  indplan: '/patterns/collectors/industrial-collector/?view=plan',
  blv: '/patterns/arterials/boulevard/',
  std: '/patterns/arterials/stroad/',
  rft: '/retrofits/corridor/four-to-three-lane-road-diet/',
  rftplan: '/retrofits/corridor/four-to-three-lane-road-diet/?view=plan',
  home: '/',
}
const pages = (opt.pages || 'col').split(',')
const styles = (opt.styles || 'muted,ink,print').split(',')
const themes = (opt.themes || 'light,dark').split(',')
const widths = (opt.widths || '1280,375').split(',').map(Number)
if (!opt.out) { console.error('Pass --out=<dir> (use a scratch folder, not the repo)'); process.exit(1) }
const out = opt.out
fs.mkdirSync(out, { recursive: true })
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true })
const logs = new Set()
for (const key of pages) for (const w of widths) {
  const p = await b.newPage()
  await p.setViewport({ width: w, height: 1000, deviceScaleFactor: opt.dpr ? +opt.dpr : 2 })
  p.on('console', m => { if (['warn', 'warning', 'error'].includes(m.type())) logs.add(`${key}@${w} ${m.type()}: ${m.text().slice(0, 200)}`) })
  p.on('pageerror', e => logs.add(`${key}@${w} pageerror: ${e.message.slice(0, 200)}`))
  await p.evaluateOnNewDocument((simple) => {
    localStorage.setItem('commonway-cookie-consent', 'denied')
    if (simple) localStorage.setItem('commonway-display-settings', JSON.stringify(simple === 'hc' ? { contrast: 'high' } : { simplifiedView: true }))
  }, opt.simple || '')
  await p.goto(B + PAGES[key], { waitUntil: 'networkidle0', timeout: 90000 })
  await new Promise(r => setTimeout(r, 1200))
  const sel = key === 'home' ? (opt.homesel || '.pvx') : '.pv__stage'
  for (const style of styles) for (const theme of themes) {
    await p.evaluate((s, t) => {
      const d = document.documentElement
      if (s === 'muted') delete d.dataset.art; else d.dataset.art = s
      d.dataset.theme = t
    }, style, theme)
    await new Promise(r => setTimeout(r, 250))
    if (opt.weight && style === styles[0] && theme === themes[0]) {
      const html = await p.evaluate(() => document.querySelector('.pvx')?.outerHTML ?? '')
      console.log(`weight ${key}@${w}: raw ${(html.length / 1024).toFixed(1)} KB, gzip ${(zlib.gzipSync(html).length / 1024).toFixed(1)} KB`)
    }
    if (opt.noshot) continue
    const el = (await p.$$(sel))[0]
    if (!el) { console.log('no element', key); continue }
    await el.scrollIntoView()
    const f = `${out}/${key}-${w}-${style}-${theme}${opt.simple ? '-simple' : ''}.png`
    await el.screenshot({ path: f })
  }
  await p.close()
}
await b.close()
for (const l of logs) console.log(l)
console.log('done')
