// Local stand-in for Netlify, for checking the BUILT site (not part of the build).
// Serves build/, applies static/_headers rules (incl. the CSP), gzips text,
// 301s /dir to /dir/, and serves 404.html with a 404 status for unknown paths.
// Netlify's _redirects are NOT applied. It reads _headers once at startup:
// restart it after editing headers.
//   node scripts/qa/netlify-like.mjs build 5180
// (also the "commonway-build" entry in .claude/launch.json, for preview_start)
import http from 'node:http'; import zlib from 'node:zlib'; import fs from 'node:fs'; import path from 'node:path'
const root = process.argv[2]; const port = +process.argv[3] || 5180
const types = { '.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.jpeg':'image/jpeg','.woff2':'font/woff2','.wasm':'application/wasm','.xml':'application/xml','.txt':'text/plain','.ico':'image/x-icon','.md':'text/markdown','.webmanifest':'application/manifest+json' }
const rules = []; let cur = null
for (const line of fs.readFileSync(path.join(root,'_headers'),'utf8').split('\n')) {
  if (!line.trim() || line.trim().startsWith('#')) continue
  if (!/^\s/.test(line)) { cur = { pat: line.trim(), h: [] }; rules.push(cur) } else { const i=line.indexOf(':'); cur.h.push([line.slice(0,i).trim(), line.slice(i+1).trim()]) }
}
const match = (pat, p) => new RegExp('^' + pat.replace(/[.+?^${}()|[\]\\]/g,'\\$&').replace(/\*/g,'.*') + '$').test(p)
http.createServer((req, res) => {
  const u = new URL(req.url, 'http://x'); let p = decodeURIComponent(u.pathname); let f = path.join(root, p); let status = 200
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) { if (!p.endsWith('/')) { res.writeHead(301,{Location:p+'/'}); return res.end() } f = path.join(f,'index.html') }
  if (!fs.existsSync(f)) { f = path.join(root,'404.html'); status = 404 }
  const h = { 'Content-Type': types[path.extname(f)] || 'application/octet-stream' }
  for (const r of rules) if (match(r.pat, p)) for (const [k,v] of r.h) h[k] = v
  if (/gzip/.test(req.headers['accept-encoding'] || '') && /text|javascript|json|xml|svg|markdown|manifest|wasm/.test(h['Content-Type'])) { h['Content-Encoding'] = 'gzip'; h['Vary'] = 'Accept-Encoding'; res.writeHead(status, h); return res.end(zlib.gzipSync(fs.readFileSync(f))) }
  res.writeHead(status, h); fs.createReadStream(f).pipe(res)
}).listen(port, () => console.log('serving', root, 'on', port))
