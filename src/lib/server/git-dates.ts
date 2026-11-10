import { execFileSync } from 'node:child_process'

/**
 * The date a file was last committed, read from git history at build time
 * so it's the true last-edit date rather than a filesystem mtime (a fresh CI
 * checkout, Netlify's included, resets every file's mtime to the checkout
 * moment). `relPath` is relative to the repo root (the process cwd).
 *
 * Returns git's raw `%cI` string (ISO 8601 with the committer's UTC offset;
 * callers slice the first 10 characters for YYYY-MM-DD), or null if the file
 * has no commit yet or git itself isn't available.
 */
export function lastCommitDate(relPath: string): string | null {
  try {
    const output = execFileSync('git', ['log', '-1', '--format=%cI', '--', relPath], {
      cwd: process.cwd(),
      encoding: 'utf-8',
    }).trim()
    return output || null
  }
  catch {
    return null
  }
}

/** The +page.md source path for a route id ("/" or "/guide/foo", no trailing slash required). */
export function pageSourcePath(route: string): string {
  const id = route.replace(/\/+$/, '')
  return id === '' ? 'src/routes/+page.md' : `src/routes${id}/+page.md`
}
