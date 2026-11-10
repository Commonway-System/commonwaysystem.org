// Click-through test of the BUILT site's interactive parts (not part of the build):
// the search page and navbar dialog, the Road Agency Directory, the Media Gallery
// filters, the Pattern viewer controls, and page-to-page navigation with Back.
// It prints one PASS/FAIL line per check, counts address changes so an endless
// URL-rewrite loop shows up, and reports console and page errors. svelte-check,
// the build and axe all pass with these broken, so run this after any change to
// URL-synced state, navigation hooks or a SvelteKit upgrade.
//   node scripts/qa/netlify-like.mjs build 5180 &
//   node scripts/qa/clicks.mjs [group]        (QA_BASE overrides http://127.0.0.1:5180)
// Borrows puppeteer-core the same way qa.mjs does (QA_MODULES).
import { createRequire } from 'node:module'
const puppeteer = createRequire(process.env.QA_MODULES ?? '/Users/kevinyoung/Documents/pro-how-com/scripts/qa/package.json')('puppeteer-core')
const BASE = process.env.QA_BASE ?? 'http://127.0.0.1:5180'
const only = process.argv[2] // optional: run one group
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' })
const p = await b.newPage()
await p.evaluateOnNewDocument(() => { try { localStorage.setItem('commonway-cookie-consent', 'denied') } catch {} })
const logs = []
p.on('console', m => { if (['warn', 'warning', 'error'].includes(m.type())) logs.push(`[${m.type()}] ${m.text().slice(0, 200)}`) })
p.on('pageerror', e => logs.push(`[pageerror] ${e.message.slice(0, 200)}`))
let navs = 0
p.on('framenavigated', f => { if (f === p.mainFrame()) navs++ })
const sleep = ms => new Promise(r => setTimeout(r, ms))
let fails = 0
function line(name, ok, obs) { if (!ok) fails++; console.log(`${ok ? 'PASS' : 'FAIL'} ${name}: ${obs}`) }
const url = () => p.evaluate(() => location.pathname + location.search + location.hash)
const histLen = () => p.evaluate(() => history.length)
async function go(path) { await p.goto(BASE + path, { waitUntil: 'networkidle0' }); await sleep(300); navs = 0 }
// wait and make sure the URL settles (no loop)
async function settled() { const n = navs; await sleep(1200); return navs - n }
async function clickInputByLabel(scope, text, type = 'checkbox') {
  const h = await p.evaluateHandle((scope, text, type) => {
    const root = document.querySelector(scope) ?? document
    return [...root.querySelectorAll(`input[type=${type}]`)].find(i => i.offsetParent && (i.labels?.[0]?.textContent ?? '').includes(text)) ?? null
  }, scope, text, type)
  const el = h.asElement(); if (!el) throw new Error(`no ${type} "${text}" in ${scope}`)
  await el.click(); await sleep(400)
}
async function clickButton(text, scope = 'main') {
  const h = await p.evaluateHandle((text, scope) => [...(document.querySelector(scope) ?? document).querySelectorAll('button')].find(x => x.offsetParent && x.textContent.trim().startsWith(text)) ?? null, text, scope)
  const el = h.asElement(); if (!el) throw new Error(`no button "${text}"`)
  await el.click(); await sleep(400)
}
const svgHash = () => p.evaluate(() => { let s = ''; for (const g of document.querySelectorAll('main svg')) if (g.getBoundingClientRect().width > 100) s += g.outerHTML.replace(/\s(id|href|clip-path|mask|fill|filter|aria-labelledby|aria-describedby)="[^"]*(#|svelte|s\d)[^"]*"/g, '').replace(/svelte-[a-z0-9]+/g, '').replace(/\bc\d+-/g, 'cX-'); let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return `${s.length}:${h}` })

async function searchChecks(w) {
  await go('/search/')
  const h0 = await histLen()
  await p.click('.sp__input')
  for (const ch of 'roundabout') await p.type('.sp__input', ch, { delay: 80 })
  await sleep(900)
  const extra = await settled()
  const st = await p.evaluate(() => ({ focus: document.activeElement?.classList.contains('sp__input'), items: document.querySelectorAll('.sp__item').length }))
  const u = await url(); const h1 = await histLen()
  line(`${w} search type`, u.endsWith('?q=roundabout') && st.items > 0 && st.focus && h1 === h0 && navs < 25 && extra === 0, `url=${u} items=${st.items} focus=${st.focus} history ${h0}->${h1} navs=${navs} idleNavs=${extra}`)
  navs = 0
  const before = await p.evaluate(() => [...document.querySelectorAll('.sp__item')].map(e => e.textContent.slice(0, 30)).join('|'))
  await clickInputByLabel('main', 'Patterns')
  await sleep(700)
  const u2 = await url(); const after = await p.evaluate(() => [...document.querySelectorAll('.sp__item')].map(e => e.textContent.slice(0, 30)).join('|'))
  line(`${w} search filter`, /[?&][a-z]+=/.test(u2.replace('?q=roundabout', '')) && after !== before && navs < 5 && await settled() === 0, `url=${u2} resultsChanged=${after !== before} navs=${navs}`)
  navs = 0
  await clickButton('Clear filters')
  await sleep(500)
  const u3 = await url()
  line(`${w} search clear`, u3.endsWith('/search/?q=roundabout') && navs < 5 && await settled() === 0, `url=${u3} navs=${navs}`)
  // leave and come back with Back: is the query restored?
  await p.evaluate(() => { const a = document.createElement('a'); a.href = '/about/'; a.id = 'cwqa-out'; a.textContent = 'x'; document.querySelector('main').append(a) })
  await p.click('#cwqa-out'); await sleep(1200)
  await p.goBack(); await sleep(1500)
  const back = await p.evaluate(() => ({ u: location.pathname + location.search, v: document.querySelector('.sp__input')?.value, items: document.querySelectorAll('.sp__item').length }))
  line(`${w} search back-restore`, back.u === '/search/?q=roundabout' && back.v === 'roundabout' && back.items > 0, `url=${back.u} input="${back.v}" items=${back.items}`)
  await go('/search/?q=stroad'); await sleep(1200)
  const d = await p.evaluate(() => ({ v: document.querySelector('.sp__input').value, items: document.querySelectorAll('.sp__item').length }))
  line(`${w} search direct`, d.v === 'stroad' && d.items > 0 && await settled() === 0 && (await url()) === '/search/?q=stroad', `input=${d.v} items=${d.items} url=${await url()} navs=${navs}`)
}

async function dialogCheck() {
  await go('/guide/')
  const u0 = await url()
  await p.keyboard.down('Control'); await p.keyboard.press('k'); await p.keyboard.up('Control'); await sleep(500)
  const open = await p.evaluate(() => !!document.querySelector('dialog[open]'))
  await p.keyboard.type('bike lane', { delay: 50 }); await sleep(1500)
  const items = await p.evaluate(() => document.querySelectorAll('dialog[open] .sp__item').length)
  const u1 = await url()
  await p.keyboard.press('Escape'); await sleep(400)
  const closed = await p.evaluate(() => !document.querySelector('dialog[open]'))
  line('dialog search', open && items > 0 && u1 === u0 && closed && navs === 0, `open=${open} items=${items} url ${u0} -> ${u1} closedOnEsc=${closed} navs=${navs}`)
}

async function agencyChecks() {
  const R = '/references/road-agencies/'
  // Back test: come in from another page client-side
  await go('/references/')
  await p.evaluate(R => { const a = document.createElement('a'); a.href = R; a.id = 'cwqa-in'; a.textContent = 'x'; document.querySelector('main').append(a) }, R)
  await p.click('#cwqa-in'); await sleep(1500); navs = 0
  const S = 'input[type=search][aria-label], main input[type=search]'
  const sel = await p.evaluate(() => { const i = [...document.querySelectorAll('main input[type=search]')].find(i => i.offsetParent); i.id ||= 'cwqa-q'; return '#' + i.id })
  await p.click(sel)
  for (const ch of 'oregon') await p.type(sel, ch, { delay: 80 })
  await sleep(500)
  let st = await p.evaluate(sel => ({ focus: document.activeElement === document.querySelector(sel) }), sel)
  line('agencies type', (await url()).includes('?q=oregon') && st.focus && navs < 15 && await settled() === 0, `url=${await url()} focus=${st.focus} navs=${navs}`)
  // clear the query, then select region
  await p.click(sel, { clickCount: 3 }); await p.keyboard.press('Backspace'); await sleep(400); navs = 0
  const selects = await p.evaluate(() => [...document.querySelectorAll('main select')].filter(s => s.offsetParent).map((s, i) => { s.id ||= 'cwqa-s' + i; return { id: s.id, opts: [...s.options].map(o => o.value) } }))
  const regionSel = selects.find(s => s.opts.includes('US-OR')), sortSel = selects.find(s => s.opts.includes('name'))
  await p.select('#' + regionSel.id, 'US-OR'); await sleep(500)
  line('agencies region', (await url()).includes('region=US-OR') && navs < 4 && await settled() === 0, `url=${await url()} navs=${navs}`)
  navs = 0
  await clickInputByLabel('main', 'State or territory (')
  line('agencies level', (await url()).includes('level=') && navs < 4 && await settled() === 0, `url=${await url()} navs=${navs}`)
  navs = 0
  const sortVal = sortSel.opts.find(v => v !== 'name')
  await p.select('#' + sortSel.id, sortVal); await sleep(500)
  line('agencies sort', (await url()).includes('sort=' + sortVal) && navs < 4 && await settled() === 0, `url=${await url()} navs=${navs}`)
  navs = 0
  await clickButton('Cards'); const uc = await url()
  await clickButton('Map'); await sleep(800); const um = await url()
  line('agencies view', uc.includes('view=cards') && um.includes('view=map') && navs < 6 && await settled() === 0, `cards=${uc} map=${um} navs=${navs}`)
  navs = 0
  await clickButton('Clear filters'); await sleep(500)
  line('agencies clear', !/region=|level=/.test(await url()) && navs < 4 && await settled() === 0, `url=${await url()} navs=${navs}`)
  // type something then Back: should land on /references/ in one step
  await p.click(sel); await p.type(sel, 'dot', { delay: 50 }); await sleep(500)
  await p.goBack(); await sleep(1200)
  line('agencies back one step', (await url()) === '/references/', `after Back url=${await url()}`)
  // forward again: are the filters restored from the address bar?
  await p.goForward(); await sleep(1500)
  const fw = await p.evaluate(sel => ({ u: location.pathname + location.search, v: document.querySelector('main input[type=search]')?.value }), sel)
  line('agencies forward-restore', fw.v === 'dot', `url=${fw.u} input="${fw.v}"`)

  await go(R + '?region=US-OR&view=cards')
  const dc = await p.evaluate(() => ({ region: [...document.querySelectorAll('main select')].map(s => s.value).join(','), cardsPressed: [...document.querySelectorAll('.rad__btn')].filter(b => b.getAttribute('aria-pressed') === 'true' || b.getAttribute('aria-current')).map(b => b.textContent.trim()).join(',') }))
  line('agencies direct', dc.region.includes('US-OR') && /Cards/.test(dc.cardsPressed) && await settled() === 0 && (await url()) === R + '?region=US-OR&view=cards', `selects=${dc.region} pressed=${dc.cardsPressed} url=${await url()}`)

  await go(R + '#us-or-odot'); await sleep(800)
  const f = await p.evaluate(() => ({ active: document.activeElement?.id, exists: !!document.getElementById('us-or-odot') }))
  line('agencies hash focus', f.active === 'us-or-odot', `exists=${f.exists} activeElement#${f.active} url=${await url()}`)
  // filtered + permalink click
  await go(R + '?region=US-OR'); await sleep(500)
  const link = await p.evaluateHandle(() => [...document.querySelectorAll('a.rad__fix[href^="#"]')].find(a => a.offsetParent))
  const href = await link.evaluate(a => a.getAttribute('href'))
  await link.asElement().click(); await sleep(800)
  const u = await url(); const ae = await p.evaluate(() => document.activeElement?.id)
  line('agencies permalink', u === R + '?region=US-OR' + href && ae === href.slice(1) && await settled() === 0, `href=${href} url=${u} active#${ae}`)
}

async function mediaChecks(w) {
  const mobile = w === '375'
  await go('/media/')
  const scope = mobile ? 'details.mf--mobile' : 'aside.mf--desktop'
  if (mobile) { await p.click('details.mf--mobile summary'); await sleep(300) }
  const count = () => p.evaluate(() => ({ text: document.querySelector('.mg__count').textContent, cards: [...document.querySelectorAll('.mg .pattern-index-grid > *')].filter(e => e.offsetParent).length }))
  const c0 = await count()
  await clickInputByLabel(scope, 'Video'); await clickInputByLabel(scope, 'Podcast')
  const c1 = await count()
  line(`${w} media filters`, c1.cards < c0.cards && c1.text !== c0.text && navs === 0, `${c0.text}/${c0.cards} cards -> ${c1.text}/${c1.cards} url=${await url()} navs=${navs}`)
  await clickInputByLabel(scope, 'Video'); await clickInputByLabel(scope, 'Podcast')
  const c2 = await count()
  line(`${w} media unfilter`, c2.text === c0.text, `${c2.text}`)
  const sq = `${scope} input[type=search]`
  await p.click(sq); await p.type(sq, 'roundabout', { delay: 40 }); await sleep(500)
  const c3 = await count(); const fo = await p.evaluate(sq => document.activeElement === document.querySelector(sq), sq)
  line(`${w} media search`, c3.cards < c0.cards && fo && navs === 0, `${c3.text} focus=${fo} url=${await url()}`)
  await go('/media/?q=roundabout'); await sleep(400)
  const c4 = await count(); const qv = await p.evaluate(sq => document.querySelector(sq).value, sq)
  line(`${w} media direct q`, qv === 'roundabout' && c4.cards < c0.cards && await settled() === 0, `input=${qv} ${c4.text}`)
  await go('/media/?for=INT-RAB-01'); await sleep(400)
  const c5 = await count()
  await clickButton('Show all media'); await sleep(500)
  const c6 = await count(); const u6 = await url(); const fc = await p.evaluate(() => document.activeElement?.className)
  line(`${w} media for/show all`, c5.cards < c0.cards && u6 === '/media/' && c6.text === c0.text && navs < 3 && await settled() === 0, `for: ${c5.text} -> showAll: ${c6.text} url=${u6} focus=${fc} navs=${navs}`)
}

async function viewerChecks() {
  const P = '/patterns/collectors/default/'
  await go(P)
  const h0 = await histLen()
  let s = await svgHash()
  async function step(name, fn, expectUrl) {
    navs = 0; await fn(); await sleep(500)
    const s2 = await svgHash(); const u = await url(); const idle = await settled()
    line(`viewer ${name}`, s2 !== s && (expectUrl ? expectUrl.test(u) : true) && navs < 4 && idle === 0, `url=${u} svgChanged=${s2 !== s} navs=${navs}`)
    s = s2
  }
  await step('tab Top down', () => clickButton('Top down'), /view=/)
  await step('tab Cross-section', () => clickButton('Cross-section'), /^[^?]*(\?(?!.*view=).*)?$/)
  await step('config NACTO', () => p.click('input[value=nacto]'), /config=nacto/)
  await step('parking left', () => p.click('input[value=left]'), /parking=left/)
  await step('bikeway two-way-left', () => p.click('input[value=two-way-left]'), /bikeway=two-way-left/)
  await step('compare', () => clickInputByLabel('main', 'Compare side by side'), /compare=/)
  await step('units m', () => p.click('input[value=m][type=radio]'), null)
  const final = await url()
  const state = () => p.evaluate(() => [...document.querySelectorAll('main input:checked')].filter(i => i.closest('.pv, [class*=pv]')).map(i => i.value + (i.name ? '' : ':' + i.labels?.[0]?.textContent.trim().slice(0, 12))).join(','))
  const st1 = await state(); const hs = await svgHash()
  line('viewer history', (await histLen()) === h0, `history ${h0} -> ${await histLen()}`)
  await p.reload({ waitUntil: 'networkidle0' }); await sleep(600); navs = 0
  const st2 = await state(); const hs2 = await svgHash()
  line('viewer reload restore', (await url()) === final && st1 === st2 && hs === hs2 && await settled() === 0, `url=${await url()} sameControls=${st1 === st2} sameSvg=${hs === hs2}${st1 === st2 ? '' : ` [${st1}] vs [${st2}]`}`)

  await go('/guide/how-to-read-a-pattern/')
  const g0 = await svgHash(); const u0 = await url()
  const radio = await p.evaluateHandle(() => [...document.querySelectorAll('main input[type=radio]')].find(i => i.offsetParent && !i.checked && /config/.test(i.name)))
  if (radio.asElement()) await radio.asElement().click(); await sleep(500)
  const g1 = await svgHash()
  line('demo viewer', g1 !== g0 && (await url()) === u0 && navs === 0, `svgChanged=${g1 !== g0} url ${u0} -> ${await url()} navs=${navs}`)
}

async function clientNav() {
  await go('/')
  const h1 = () => p.evaluate(() => document.querySelector('h1')?.textContent.trim().slice(0, 50))
  const H = [await h1()]
  const clickFirst = async (pre) => { const a = await p.evaluateHandle(pre => [...document.querySelectorAll('main a'), ...document.querySelectorAll('a')].find(a => a.offsetParent && a.getAttribute('href')?.startsWith(pre) && a.getAttribute('href') !== location.pathname), pre); const href = await a.evaluate(a => a.getAttribute('href')); await a.asElement().click(); await sleep(1500); return href }
  const g = await clickFirst('/guide/'); H.push(await h1())
  const pt = await clickFirst('/patterns/'); H.push(await h1())
  await p.goBack(); await sleep(1200); const b1 = await h1()
  await p.goBack(); await sleep(1200); const b2 = await h1()
  line('client nav', b1 === H[1] && b2 === H[0] && H[1] !== H[0] && H[2] !== H[1], `/ "${H[0]}" -> ${g} "${H[1]}" -> ${pt} "${H[2]}"; back "${b1}", back "${b2}"`)
  await p.evaluate(() => { const a = document.createElement('a'); a.href = location.pathname; a.id = 'cwqa-self'; a.textContent = 'x'; document.querySelector('main').append(a) })
  const hl = await histLen(); navs = 0
  await p.click('#cwqa-self'); await sleep(1000)
  line('self link', (await h1()) === b2 && navs < 3, `h1="${await h1()}" url=${await url()} navs=${navs} history ${hl}->${await histLen()}`)
}

const groups = { search: null, dialog: dialogCheck, agencies: agencyChecks, media: null, viewer: viewerChecks, nav: clientNav }
await p.setViewport({ width: 1280, height: 900 })
for (const [k, fn] of Object.entries(groups)) {
  if (only && only !== k) continue
  const n = logs.length
  try {
    if (k === 'search') await searchChecks('1280')
    else if (k === 'media') await mediaChecks('1280')
    else await fn()
  } catch (e) { line(k, false, 'threw ' + e.message) }
  if (logs.length > n) console.log('  console: ' + logs.slice(n).join('\n  console: '))
}
await p.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: false })
for (const [k, fn] of [['search', searchChecks], ['media', mediaChecks]]) {
  if (only && only !== k) continue
  const n = logs.length
  try { await fn('375') } catch (e) { line('375 ' + k, false, 'threw ' + e.message) }
  if (logs.length > n) console.log('  console: ' + logs.slice(n).join('\n  console: '))
}
console.log(`${fails} failing; ${logs.length} console warnings/errors`)
await b.close()
