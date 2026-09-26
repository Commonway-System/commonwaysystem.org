// Makes the small copies of content images that search results and the
// Pattern / Retrofit / Media cards show (160 px and 480 px wide WebP), next to
// each original in a thumbs/ folder: static/patterns/foo.png ->
// static/patterns/thumbs/foo-160.webp and foo-480.webp. See src/lib/thumbs.ts
// for the naming rule the site code uses to find them.
//
//   pnpm run thumbs          make any missing (or out-of-date) thumbnails
//   pnpm run thumbs -- --force   remake all of them
//   node scripts/make-thumbs.mjs --check   just list missing ones (the build runs this)
//
// The thumbnails are committed to git, so Netlify's build does no image work.
// RUN THIS WHENEVER AN IMAGE IS ADDED OR REPLACED (a new file in static/patterns/,
// static/media-assets/, or any local `image:` in a page's frontmatter), then
// commit the new thumbs/ files. If you forget, the build warns and the site
// falls back to the full-size original, which works but is heavy.
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { basename, dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { parse } from 'yaml'
import { THUMB_WIDTHS, thumbUrl } from '../src/lib/thumbs.ts'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const staticDir = join(root, 'static')
const args = new Set(process.argv.slice(2))
const force = args.has('--force')
const checkOnly = args.has('--check')

const RASTER = /\.(png|jpe?g|webp)$/i
// Whole folders of content images (anything dropped in is picked up)...
const IMAGE_DIRS = ['patterns', 'media-assets']

function listRaster(dir) {
  const out = []
  if (!existsSync(dir))
    return out
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isFile() && RASTER.test(name))
      out.push(full)
  }
  return out
}

// ...plus any local image named by a page's frontmatter `image:` (a blog
// post's featured image, say) wherever in static/ it lives.
function frontmatterImages(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) {
      frontmatterImages(full, out)
    }
    else if (name === '+page.md') {
      const raw = readFileSync(full, 'utf8')
      const end = raw.startsWith('---') ? raw.indexOf('\n---', 3) : -1
      if (end === -1)
        continue
      try {
        const image = parse(raw.slice(4, end))?.image
        if (typeof image === 'string' && image.startsWith('/') && RASTER.test(image))
          out.push(join(staticDir, image))
      }
      catch {}
    }
  }
  return out
}

const sources = new Set([
  ...IMAGE_DIRS.flatMap(d => listRaster(join(staticDir, d))),
  ...frontmatterImages(join(root, 'src/routes')),
])

let made = 0
let missing = 0
for (const source of [...sources].sort()) {
  if (!existsSync(source)) {
    console.warn(`Thumbnails: ${source.replace(staticDir, '')} is named by a page but the file does not exist`)
    continue
  }
  const publicPath = source.replace(staticDir, '')
  for (const width of THUMB_WIDTHS) {
    const target = join(staticDir, thumbUrl(publicPath, width))
    const stale = !existsSync(target) || statSync(target).mtimeMs < statSync(source).mtimeMs
    if (!stale && !force)
      continue
    if (checkOnly) {
      console.warn(`Thumbnail missing for ${publicPath} (${width}px): run \`pnpm run thumbs\` and commit static/**/thumbs/`)
      missing++
      continue
    }
    mkdirSync(dirname(target), { recursive: true })
    await sharp(source).resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(target)
    made++
  }
}

if (checkOnly)
  console.log(missing ? `Thumbnails: ${missing} missing (see warnings above)` : `Thumbnails: all ${sources.size} images have thumbnails`)
else
  console.log(`Thumbnails: made ${made} file(s) for ${sources.size} source image(s)`)
