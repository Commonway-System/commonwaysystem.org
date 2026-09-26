// Small copies of content images, made by `pnpm run thumbs` (scripts/make-thumbs.mjs).
// One naming rule shared by everything that shows an image at a small size,
// so no component needs to know whether a thumbnail exists: it just asks for
// the conventional path (and falls back to the original if it 404s, see the
// onerror handlers). `/patterns/foo.png` -> `/patterns/thumbs/foo-160.webp`.

/** 160: search results. 480: index and gallery cards. */
export type ThumbWidth = 160 | 480

export const THUMB_WIDTHS: readonly ThumbWidth[] = [160, 480]

/** Local raster images only (png, jpg, jpeg, webp); anything else (an SVG, a full URL) is returned unchanged. */
export function thumbUrl(src: string, width: ThumbWidth): string {
  if (!src.startsWith('/'))
    return src
  const match = src.match(/^(.*\/)([^/]+)\.(png|jpe?g|webp)$/i)
  return match ? `${match[1]}thumbs/${match[2]}-${width}.webp` : src
}
