<script lang="ts">
  import { getMediaItemsFor } from '$lib/data/media/index.js'
  import MediaCard from './MediaCard.svelte'

  interface Props {
    /** This page's Pattern ID, Retrofit Strategy ID, or trailing-slashed route path. */
    id: string
  }

  const { id }: Props = $props()

  const items = $derived(getMediaItemsFor(id))
</script>

{#if items.length > 0}
  <section class="related-media">
    <h2>Related Media</h2>
    <p class="related-media__intro">
      The items below come from outside the Commonway System, external videos, podcasts, and articles related to this page's topic, not part of the guidebook itself.
    </p>
    <div class="related-media__box">
      <div class="related-media__grid">
        {#each items as item (item.id)}
          <MediaCard {item} />
        {/each}
      </div>
    </div>
  </section>
{/if}

<style>
  /* Boxed callout treatment consistent with the site's other bordered
     containers (e.g. EvidenceStrip's card), a soft-teal bordered box
     rather than a plain heading + grid, so it reads as a distinct
     "outside this guidebook" zone. */
  .related-media {
    margin: 2rem 0;
  }

  .related-media__intro {
    margin: 0.5rem 0 1rem;
    color: var(--cw-ink-soft);
  }

  .related-media__box {
    padding: 1.25rem;
    border-radius: var(--cw-radius-lg);
    border: 1px solid var(--cw-hairline-strong);
    background: var(--cw-paper-raised);
  }

  /* Deliberately its own grid, not a reuse of base.css's shared
     .pattern-index-grid (which MediaGallery.svelte's own results grid on
     /media/ still uses, unchanged, at 3/2/1 columns): Related Media's
     boxed callout is narrower and meant to show at most a couple of
     items at a glance, so it caps at 2 columns instead of 3. */
  .related-media__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }

  @media (max-width: 560px) {
    .related-media__grid {
      grid-template-columns: 1fr;
    }
  }
</style>
