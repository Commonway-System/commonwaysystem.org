<script lang="ts">
  import { page } from '$app/state'
  import type { MediaItem } from '$lib/data/media'
  import HomeSection from './HomeSection.svelte'
  import MediaCard from './MediaCard.svelte'

  interface Props {
    eyebrow?: string
    title: string
    intro?: string
    action?: { href: string, label: string }
  }

  const { eyebrow, title, intro, action }: Props = $props()

  // Chosen in src/routes/+page.server.ts (FEATURED_MEDIA).
  const items = $derived((page.data.home?.media ?? []) as MediaItem[])
</script>

<HomeSection tone="tint" {eyebrow} {title} {intro} {action}>
  <div class="hm pattern-index-grid">
    {#each items as item (item.id)}
      <MediaCard {item} />
    {/each}
  </div>
</HomeSection>

<style>
  .hm {
    margin: 0;
  }
</style>
