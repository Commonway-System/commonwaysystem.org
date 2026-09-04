<script lang="ts">
  import { externalLinkAttrs, isExternalHref } from '$lib/site.js'
  import type { EndorsementStatus, MediaItem, MediaType } from '$lib/data/media/index.js'
  import Icon from './Icon.svelte'

  interface Props {
    item: MediaItem
  }

  const { item }: Props = $props()

  const endorsementLabels: Record<EndorsementStatus, string> = {
    'aligned': 'Aligned',
    'context-only': 'Context only',
    'counterexample': 'Counterexample',
  }

  const typeLabels: Record<MediaType, string> = {
    video: 'Video',
    podcast: 'Podcast',
    article: 'Article',
  }

  // Lucide icons (circle-play, headphones, file-text, mic, video), ISC
  // license: see /THIRD-PARTY-NOTICES. Same {@html}-injected inline-markup
  // convention as ModalHierarchyPill.svelte, trusted hardcoded markup, not
  // user input.
  const typeIconMarkup: Record<MediaType, string> = {
    video: '<path d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z"/><circle cx="12" cy="12" r="10"/>',
    podcast: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
    article: '<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  }

  // Generic fallback shown next to sourceName when `sourceIcon` is absent
  // (e.g. no podcast show logo available) - a different icon serving a
  // different purpose than the type-overlay icon above, per the ticket's
  // own note not to conflate the two.
  const sourceFallbackIconMarkup: Record<MediaType, string> = {
    video: '<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
    podcast: '<path d="M12 19v3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><rect x="9" y="2" width="6" height="13" rx="3"/>',
    article: '<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  }

  const alt = $derived(item.image ? item.title : 'No preview image available for this item')
</script>

<a
  class="mc"
  href={item.url}
  {...externalLinkAttrs(item.url)}
>
  <div class="mc__image">
    <img src={item.image ?? '/media-assets/media-placeholder.svg'} {alt} />
    <span class="mc__type-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        {@html typeIconMarkup[item.type]}
      </svg>
      <span class="cw-sr-only">{typeLabels[item.type]}</span>
    </span>
    <span class="mc__endorsement">{endorsementLabels[item.endorsementStatus]}</span>
  </div>
  <div class="mc__body">
    <h3 class="mc__title">{item.title}</h3>
    <div class="mc__source">
      {#if item.sourceIcon}
        <img class="mc__source-icon" src={item.sourceIcon} alt="" />
      {:else}
        <svg class="mc__source-icon mc__source-icon--fallback" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          {@html sourceFallbackIconMarkup[item.type]}
        </svg>
      {/if}
      <span>{item.sourceName}</span>
    </div>
    <p class="mc__blurb">{item.blurb}</p>
  </div>
  {#if isExternalHref(item.url)}
    <span class="cw-external-indicator mc__external-indicator">
      <Icon name="external" size={13} />
      <span class="cw-sr-only"> (opens in new tab)</span>
    </span>
  {/if}
</a>

<style>
  /* Same card shell/hover mechanics as PatternIndexCard.svelte and
     RetrofitIndexCard.svelte - one card style sitewide - but with its own
     image-forward layout per the ticket, no classification-color overlay
     since media items don't carry one. */
  .mc {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    border-radius: var(--cw-radius-lg);
    border: 1px solid var(--cw-hairline);
    background: var(--cw-paper-raised);
    text-decoration: none;
    color: inherit;
    box-shadow: 0 1px 2px rgba(20, 20, 20, 0.04);
    transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
  }

  .mc:hover {
    border-color: var(--cw-teal);
    box-shadow: 0 10px 24px -12px rgba(20, 20, 20, 0.28);
    transform: translateY(-2px);
  }

  .mc:focus-visible {
    outline: 2px solid var(--cw-teal);
    outline-offset: 2px;
  }

  .mc__image {
    position: relative;
    aspect-ratio: 16 / 9;
    background: var(--cw-hairline);
  }

  .mc__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .mc__type-icon {
    position: absolute;
    top: 10px;
    left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    /* Solid -fixed tokens, not a semi-transparent overlay: sits on top of
       a photographic image whose colors vary per item, so contrast has to
       be guaranteed regardless of what's underneath, the same reasoning
       and the same tokens as PatternIndexCard's number circle. A
       translucent fill would blend with the image and could fail contrast
       on a light photo. */
    background: var(--cw-ink-fixed);
    color: var(--cw-paper-fixed);
  }

  .mc__type-icon svg {
    width: 18px;
    height: 18px;
  }

  .mc__endorsement {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.01em;
    /* Uniform neutral styling for all three statuses, no color
       differentiation, per the ticket: this is deliberately the same
       solid, theme-invariant dark pill as .mc__type-icon, not a status
       color, and not translucent for the same guaranteed-contrast reason. */
    background: var(--cw-ink-fixed);
    color: var(--cw-paper-fixed);
  }

  .mc__external-indicator {
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: var(--cw-ink-soft);
  }

  .mc__body {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem 1.1rem 1.1rem;
  }

  .mc__title {
    margin: 0;
    font-family: var(--cw-font-display);
    font-size: var(--cw-text-lg);
    font-weight: 600;
    color: var(--cw-ink);
  }

  .mc__source {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    font-size: var(--cw-text-sm);
    color: var(--cw-ink-soft);
  }

  .mc__source-icon {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
  }

  .mc__source-icon--fallback {
    border-radius: 0;
    color: var(--cw-ink-soft);
  }

  .mc__blurb {
    margin: 0;
    font-size: var(--cw-text-sm);
    color: var(--cw-ink-soft);
  }
</style>
