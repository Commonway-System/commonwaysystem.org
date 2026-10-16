// Counts real Street Typology pattern pages (patterns/<classification>/<slug>/),
// not the Pattern Index itself, which sits one path segment shallower.
// Computed from the routes themselves so the number can't drift stale the way
// a hardcoded count would. Shared by Start Here and Release History.
const patternModules = import.meta.glob('/src/routes/patterns/**/+page.md')

export const patternPageCount = Object.keys(patternModules).filter((path) => {
  const rel = path.replace('/src/routes/patterns/', '').replace('/+page.md', '')
  return rel.split('/').length === 2
}).length
