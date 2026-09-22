<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    src: string
    alt: string
    /** Visible line under the photo, e.g. a name and title. */
    caption?: string
    children?: Snippet
  }

  const { src, alt, caption, children }: Props = $props()
</script>

<div class="author-bio">
  <div class="author-bio__text">
    {@render children?.()}
  </div>
  {#if caption}
    <figure class="author-bio__figure">
      <img class="author-bio__photo" {src} {alt} loading="lazy" decoding="async" />
      <figcaption>{caption}</figcaption>
    </figure>
  {:else}
    <img class="author-bio__photo" {src} {alt} loading="lazy" decoding="async" />
  {/if}
</div>

<style>
  .author-bio {
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
    margin: 1.5rem 0;
  }

  .author-bio__text {
    flex: 1 1 auto;
    min-width: 0;
  }

  .author-bio__text :global(> *:first-child) {
    margin-top: 0;
  }

  .author-bio__text :global(> *:last-child) {
    margin-bottom: 0;
  }

  /* object-fit: cover crops the source photo (894x946, not natively
     square) down to a true 1:1 square rather than distorting it — the
     aspect-ratio box is the source of truth for the shape, cover just
     picks which part of the taller original fills it. */
  .author-bio__photo {
    flex: 0 0 auto;
    width: 160px;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: var(--cw-radius-lg);
    border: 1px solid var(--cw-hairline);
    box-shadow: 0 1px 2px rgba(20, 20, 20, 0.04);
  }

  .author-bio__figure {
    flex: 0 0 auto;
    width: 160px;
    margin: 0;
  }

  /* The figure's own width, not the img's, drives sizing once a caption
     is present, so the img rule above can stay a flat 160px shared by
     both the bare-<img> and <figure>-wrapped paths. */
  .author-bio__figure .author-bio__photo {
    width: 100%;
  }

  .author-bio__figure figcaption {
    margin-top: 0.5rem;
    font-size: var(--cw-text-sm);
    color: var(--cw-ink-soft);
    text-align: center;
  }

  /* Stacks instead of staying side-by-side once the row gets too narrow
     for both a comfortable text measure and the photo, same 560px
     breakpoint base.css already uses elsewhere for narrow-viewport
     layout changes. */
  @media (max-width: 560px) {
    .author-bio {
      flex-direction: column;
    }

    .author-bio__photo,
    .author-bio__figure {
      width: 140px;
    }
  }
</style>
