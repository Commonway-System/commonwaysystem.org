<script lang="ts">
  interface Props {
    /** e.g. "/diagrams/density-tier-diagram.png" */
    src: string
    /**
     * Describes what the image shows, for anyone who can't see it.
     * Keep this focused on content, not context or attribution — that's
     * what `caption` is for. The two aren't meant to duplicate each
     * other: a caption doesn't reliably stand in for alt text on every
     * assistive technology, so alt still has to carry the real
     * description on its own.
     */
    alt: string
    /**
     * Real pixel dimensions of the source file, when known (all four
     * current diagrams are 1280x720). Setting both lets the browser
     * compute the image's aspect ratio from these HTML attributes and
     * reserve its layout space before a lazy-loaded image actually
     * finishes downloading — the standard CLS-prevention technique, and
     * why this matters more now that loading="lazy" is on by default
     * below. No CSS needed on top of this: base.css's sitewide
     * `img { max-width: 100% }` rule already scales it down responsively
     * without upsetting the reserved ratio. Omit both (the default) to
     * fall back to the previous unreserved-space behavior.
     */
    width?: number
    height?: number
    /**
     * CSS aspect-ratio value (e.g. "16/9" or "1280/720"), for when the
     * ratio is known but the exact pixel dimensions aren't. Ignored if
     * width and height are both given, since real dimensions are more
     * precise. Unlike width/height, this forces the image to its
     * container's full available width so the ratio has a dimension to
     * resolve against — width/height don't need that, since the browser
     * already has a real intrinsic size to start from.
     */
    aspectRatio?: string
    /**
     * Visible caption text under the image. Renders the image inside a
     * <figure>/<figcaption> pair instead of a bare <img> — real HTML
     * semantics an assistive technology already understands as a
     * labeled figure, no extra ARIA required. Omit for the previous
     * bare-<img> behavior. Independent of width/height/aspectRatio:
     * add a caption without touching sizing, or size without a caption.
     */
    caption?: string
  }

  const { src, alt, width, height, aspectRatio, caption }: Props = $props()

  // width+height (real intrinsic dimensions) win when both are known;
  // aspectRatio is the fallback for "ratio known, exact pixels aren't."
  const sizeStyle = $derived(
    !(width && height) && aspectRatio ? `aspect-ratio: ${aspectRatio}; width: 100%;` : undefined
  )
</script>

{#if caption}
  <!--
    Wrapped in <figure> here specifically, not the bare-<img> path below:
    base.css's `.cw-content > img` / `.cw-content p > img:only-child`
    rules (see CLAUDE.md's markdown-images note) target the <img>
    structurally and can't reach one that's no longer a direct child of
    .cw-content, so the border/radius/shadow treatment is reproduced in
    this component's own <style> block below instead. Keep the two in
    sync if that treatment ever changes.
  -->
  <figure>
    <img {src} {alt} {width} {height} style={sizeStyle} loading="lazy" decoding="async" />
    <figcaption>{caption}</figcaption>
  </figure>
{:else}
  <img {src} {alt} {width} {height} style={sizeStyle} loading="lazy" decoding="async" />
{/if}

<style>
  figure {
    margin: 0;
  }

  /* Mirrors base.css's `.cw-content > img` treatment exactly (same
     tokens, same values), since that global rule can't reach an <img>
     once it's wrapped in a <figure> above. */
  figure img {
    display: block;
    width: 100%;
    border-radius: var(--cw-radius-lg);
    border: 1px solid var(--cw-hairline);
    box-shadow: 0 1px 2px rgba(20, 20, 20, 0.04);
  }

  figcaption {
    margin-top: 0.5rem;
    font-size: var(--cw-text-sm);
    color: var(--cw-ink-soft);
  }
</style>
