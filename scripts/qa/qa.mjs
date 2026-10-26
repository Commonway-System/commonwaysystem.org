// axe-core + console check on built or dev pages, in several widths/themes (not part of the build).
// Borrows puppeteer-core and axe-core from another local project's QA folder
// (QA_MODULES, default pro-how-com's scripts/qa) and drives the installed Google Chrome.
//   node scripts/qa/qa.mjs http://localhost:5180 / /about/ --modes=1280:light,375:dark
//   --storage='{"commonway-display-settings":"{\"contrast\":\"high\"}"}'  (localStorage before load)
//   --setup="document.querySelector('.dsb__toggle').click()"             (JS run before scanning;
//      an expression, so wrap code that awaits as --setup="(async()=>{ ... })()")
// Prints axe violations plus any console warning/error (CSP violations and
// "Failed to hydrate" show up there). Exit summary: "axe violations: N".

import { createRequire } from 'node:module'
import fs from 'node:fs'
const req = createRequire(process.env.QA_MODULES ?? '/Users/kevinyoung/Documents/pro-how-com/scripts/qa/package.json')
const puppeteer = req('puppeteer-core')
const axeSrc = fs.readFileSync(req.resolve('axe-core/axe.min.js'), 'utf8')
const args = process.argv.slice(2)
const opt = Object.fromEntries(args.filter(a => a.startsWith('--')).map(a => a.slice(2).split(/=(.*)/s)))
const [base, ...paths] = args.filter(a => !a.startsWith('--'))
const modes = (opt.modes || '1280:light,1280:dark,375:light,375:dark').split(',').map(m => m.split(':'))
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true })
let total = 0
for (const path of paths) for (const [w, theme] of modes) {
  const p = await b.newPage(); await p.setViewport({ width: +w, height: 900 })
  const logs = []
  p.on('console', m => { if (['warn', 'error'].includes(m.type())) logs.push(`${m.type()}: ${m.text().slice(0, 160)}`) })
  p.on('pageerror', e => logs.push(`pageerror: ${e.message.slice(0, 160)}`))
  if (opt.storage) await p.evaluateOnNewDocument(s => { for (const [k, v] of Object.entries(JSON.parse(s))) localStorage.setItem(k, v) }, opt.storage)
  await p.goto(base + path, { waitUntil: 'networkidle0' })
  await new Promise(r => setTimeout(r, 800))
  await p.evaluate(t => { document.documentElement.dataset.theme = t }, theme)
  if (opt.setup) { await p.evaluate(opt.setup); }
  await new Promise(r => setTimeout(r, 2500))
  await p.addScriptTag({ content: axeSrc })
  const res = await p.evaluate(async () => (await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice'] } })).violations.map(v => `${v.id} (${v.impact}) x${v.nodes.length}: ${v.nodes.slice(0, 3).map(n => n.target.join(' ')).join(' ; ')}`))
  const quiet = logs.filter(l => !/Failed to load resource.*404|Not found: \//.test(l) || !path.includes('nope'))
  total += res.length
  if (res.length || quiet.length) console.log(`${path} ${w} ${theme}\n  ` + [...res, ...quiet].join('\n  '))
  await p.close()
}
console.log('axe violations:', total); await b.close()
