<script lang="ts">
  interface Props {
    name: 'menu' | 'close' | 'chevron-down' | 'chevron-right' | 'sun' | 'moon' | 'arrow-left' | 'arrow-right' | 'github' | 'external' | 'x-twitter' | 'facebook' | 'linkedin' | 'reddit' | 'bluesky' | 'mail' | 'link' | 'check'
    size?: number
    /**
     * Most icons here are line-drawn (stroke, fill="none"), the original
     * set's whole style. The share-button brand marks (facebook, linkedin,
     * reddit, bluesky) are solid logomarks that only read correctly filled
     * solid, so this switches the svg to fill="currentColor" stroke="none"
     * for just that icon instance, default false leaves every existing
     * icon's rendering untouched.
     */
    filled?: boolean
  }

  const { name, size = 20, filled = false }: Props = $props()

  const paths: Record<Props['name'], string> = {
    'menu': 'M4 7h16M4 12h16M4 17h16',
    'close': 'M6 6l12 12M18 6L6 18',
    'chevron-down': 'M6 9l6 6 6-6',
    'chevron-right': 'M9 6l6 6-6 6',
    'sun': 'M12 4V2M12 22v-2M4.9 4.9L3.5 3.5M20.5 20.5l-1.4-1.4M4 12H2M22 12h-2M4.9 19.1l-1.4 1.4M20.5 3.5l-1.4 1.4M12 17a5 5 0 100-10 5 5 0 000 10z',
    'moon': 'M20.5 14.5A8.5 8.5 0 119.5 3.5a7 7 0 0011 11z',
    'arrow-left': 'M19 12H5M11 6l-6 6 6 6',
    'arrow-right': 'M5 12h14M13 6l6 6-6 6',
    'github': 'M12 2C6.5 2 2 6.6 2 12.3c0 4.5 2.9 8.4 7 9.8.5.1.7-.2.7-.5v-1.8c-2.9.6-3.5-1.4-3.5-1.4-.5-1.2-1.1-1.6-1.1-1.6-.9-.6.1-.6.1-.6 1 .1 1.5 1.1 1.5 1.1.9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.6-1.4-2.3-.3-4.7-1.2-4.7-5.2 0-1.1.4-2 1.1-2.8-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1a10 10 0 015.4 0c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.7 1.1 2.8 0 4-2.4 4.9-4.7 5.2.4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 4.1-1.4 7-5.3 7-9.8C22 6.6 17.5 2 12 2z',
    'external': 'M7 17L17 7M8 7h9v9',
    // A simple crossed-line X, matching the platform's own current wordmark.
    'x-twitter': 'M4 4l16 16M20 4L4 20',
    'facebook': 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l.5-4H14V7a1 1 0 0 1 1-1h3z',
    'linkedin': 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v1.5A5.98 5.98 0 0 1 16 8zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z',
    // Simplified alien-head mark, all closed filled shapes (head + two
    // eyes): matches the spirit of Reddit's Snoo, not a pixel-exact trace.
    'reddit': 'M12 8a8 8 0 1 0 0.01 0zM9.3 12.7a1.3 1.3 0 1 0 0.01 0zM14.7 12.7a1.3 1.3 0 1 0 0.01 0z',
    // Simplified two-wing mark (a closed bowtie silhouette), matching the
    // spirit of Bluesky's wing shape, not a pixel-exact trace of it.
    'bluesky': 'M12 9L2 6L10 17L12 9L22 6L14 17Z',
    'mail': 'M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM4 6l8 7 8-7',
    'link': 'M8 3h10a2 2 0 0 1 2 2v10M4 7h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z',
    'check': 'M5 13l4 4L19 7',
  }
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill={filled ? 'currentColor' : 'none'}
  stroke={filled ? 'none' : 'currentColor'}
  stroke-width="1.8"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
>
  <!--
    evenodd matters only for `filled` icons whose subpaths overlap, the
    reddit mark's two eye circles sit fully inside its head circle and
    need to punch through as holes rather than double-fill invisibly, the
    way nonzero (the SVG default) would render them with matching winding.
    A no-op for every stroked (fill="none") icon and every filled icon
    without overlapping subpaths (facebook, linkedin, bluesky), so safe
    to apply globally rather than special-casing just reddit's path.
  -->
  <path d={paths[name]} fill-rule="evenodd" />
</svg>
