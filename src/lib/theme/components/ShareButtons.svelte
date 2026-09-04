<script lang="ts">
  import { SITE_URL } from '$lib/site.js'
  import Icon from './Icon.svelte'

  interface Props {
    title: string
    /** Absolute pathname of the current page, e.g. "/guide/density-tiers/". */
    path: string
  }

  const { title, path }: Props = $props()

  const pageUrl = $derived(new URL(path, SITE_URL).toString())

  // Every network here gets a plain outbound "intent" URL, no share-button
  // SDK/widget script (Twitter's widgets.js, Facebook's SDK, AddThis,
  // ShareThis). Those all set their own third-party cookies, which would
  // contradict /about/privacy-policy/'s "no other tracking beyond what's
  // listed" claim. A plain <a> to a public intent URL needs no JS and
  // tracks nothing itself.
  const networks = $derived([
    // x.com is the platform's current domain; twitter.com still works but
    // just redirects here, confirmed directly rather than assumed stale.
    { name: 'x-twitter' as const, label: 'Share on X', href: `https://x.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(title)}` },
    { name: 'facebook' as const, label: 'Share on Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`, filled: true },
    { name: 'linkedin' as const, label: 'Share on LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`, filled: true },
    { name: 'reddit' as const, label: 'Share on Reddit', href: `https://www.reddit.com/submit?url=${encodeURIComponent(pageUrl)}&title=${encodeURIComponent(title)}`, filled: true },
    { name: 'bluesky' as const, label: 'Share on Bluesky', href: `https://bsky.app/intent/compose?text=${encodeURIComponent(`${title} ${pageUrl}`)}`, filled: true },
    { name: 'mail' as const, label: 'Share by email', href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(pageUrl)}` },
  ])

  let copied = $state(false)
  let copyTimeout: ReturnType<typeof setTimeout> | undefined

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(pageUrl)
      copied = true
      clearTimeout(copyTimeout)
      copyTimeout = setTimeout(() => (copied = false), 2000)
    }
    catch {
      // Clipboard API can be unavailable (older browser, insecure context,
      // permission denied); the link is still right there to select and
      // copy by hand, so failing silently is fine, nothing to recover.
    }
  }
</script>

<span class="share-group">
  <span class="share__label" aria-hidden="true">Share:</span>
  <span class="share" role="group" aria-label="Share this page">
    {#each networks as network (network.name)}
      <a
        href={network.href}
        target="_blank"
        rel="nofollow noopener noreferrer"
        class="share__btn"
        aria-label={network.label}
        title={network.label}
      >
        <Icon name={network.name} size={16} filled={network.filled} />
      </a>
    {/each}
    <button type="button" class="share__btn" onclick={copyLink} aria-label="Copy link" title={copied ? 'Copied!' : 'Copy link'}>
      <Icon name={copied ? 'check' : 'link'} size={16} />
    </button>
  </span>
</span>

<style>
  /*
    The root is a <span>, not a <div>: this component is mounted inside
    PageLayout.svelte's <p class="page__meta">, and a block-level root
    there is invalid HTML (browsers silently force-close the <p> early to
    cope with it). Only the icon row (.share) is inline-flex; the "Share:"
    label stays plain inline text in the surrounding paragraph's own flow,
    so it sits on the same text baseline as "Suggest changes..." and "Last
    updated..." instead of being vertically centered against the icon
    buttons' taller box height, which is what pushed it a couple of
    pixels down when all three were on one line together (desktop only,
    the only width where they actually share a row).
  */
  .share {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    vertical-align: middle;
  }

  .share__label {
    margin-right: 0.3rem;
  }

  .share__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.75rem;
    height: 1.75rem;
    border-radius: var(--cw-radius-md);
    border: none;
    background: transparent;
    color: var(--cw-ink-soft);
    cursor: pointer;
  }

  .share__btn:hover {
    background: var(--cw-primary-soft);
    color: var(--cw-primary);
  }
</style>
