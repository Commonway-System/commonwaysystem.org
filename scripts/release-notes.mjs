// Writes the GitHub Release notes for one publish date, from that date's entry
// in src/lib/data/releases.ts (the Release History changelog). Used by
// .github/workflows/release.yml on every push to main, and for backfills.
//
//   node scripts/release-notes.mjs              notes for HEAD's CalVer date
//   node scripts/release-notes.mjs 2026.10.27   notes for that date
//   node scripts/release-notes.mjs --version    just print HEAD's CalVer date
//
// HEAD's date is its committer date in the committer's own time zone, the same
// rule as siteVersion() in src/routes/+layout.server.ts, so the tag always
// matches the navbar version even on a UTC runner. Exits 2 when releases.ts has
// no entry for the date (the workflow then writes a short fallback note).
import { execFileSync } from 'node:child_process'

const SITE = 'https://commonwaysystem.org'
const ORDER = ['new', 'improved', 'fixed', 'removed', 'note']
const GROUP_LABEL = { new: 'New', improved: 'Improved', fixed: 'Fixed', removed: 'Removed', note: 'Checks and notes' }
const AREA_LABEL = { content: 'Content', site: 'Site' }

function headVersion() {
  const iso = execFileSync('git', ['log', '-1', '--format=%cI'], { encoding: 'utf-8' }).trim()
  return iso.slice(0, 10).replaceAll('-', '.')
}

const arg = process.argv[2]
if (arg === '--version') {
  console.log(headVersion())
  process.exit(0)
}
const version = arg ?? headVersion()
if (!/^\d{4}\.\d{2}\.\d{2}$/.test(version)) {
  console.error(`Not a CalVer date: ${version}`)
  process.exit(1)
}

// Node 24 strips the TypeScript types itself; releases.ts has no imports.
const { releases } = await import('../src/lib/data/releases.ts')
const release = releases.find(r => r.date === version)
if (!release) {
  console.error(`No entry for ${version} in src/lib/data/releases.ts`)
  process.exit(2)
}

const lines = []
for (const type of ORDER) {
  const changes = release.changes.filter(c => c.type === type)
  if (!changes.length) continue
  lines.push(`## ${GROUP_LABEL[type]}`, '')
  for (const c of changes) {
    const area = c.area ? ` *(${AREA_LABEL[c.area]})*` : ''
    lines.push(`- ${c.summary}${area}`)
    if (c.details) lines.push('', `  ${c.details}`, '')
  }
  lines.push('')
}
lines.push(`Full changelog: [Release History, ${version}](${SITE}/about/release-history/#release-${version.replaceAll('.', '-')})`)
console.log(lines.join('\n').replace(/\n{3,}/g, '\n\n'))
