// Sets package.json's "version" to today's CalVer date (2026.10.27), so
// package.json matches the navbar version and the GitHub tag. Runs first in
// `pnpm run build`; skipped on Netlify and other CI (NETLIFY or CI set), where
// the commit is already made and the file is never committed back.
//
// The navbar and the tag use the commit's date (siteVersion() in
// src/routes/+layout.server.ts, scripts/release-notes.mjs). The push checklist
// builds, then commits, on the push date, so today's date here matches them,
// as long as package.json goes into that commit. The Release workflow warns
// when package.json and the tag disagree.
//
// The zero-padded day and month aren't strict semver, which pnpm accepts for a
// private package that is never published.
import { readFileSync, writeFileSync } from 'node:fs'

if (process.env.NETLIFY || process.env.CI) process.exit(0)

const now = new Date()
const pad = n => String(n).padStart(2, '0')
const version = `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())}`

const path = new URL('../package.json', import.meta.url)
const text = readFileSync(path, 'utf-8')
const next = text.replace(/^(\s*"version":\s*")[^"]*(")/m, `$1${version}$2`)
if (next !== text) {
  writeFileSync(path, next)
  console.log(`package.json version set to ${version}; commit package.json with this publish`)
}
