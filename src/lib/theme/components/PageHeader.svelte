<script lang="ts">
  import { pageAccent } from '../page-header.js'
  import StatusBadge from './StatusBadge.svelte'

  type Status = 'recommended' | 'situational' | 'avoid' | 'descriptive'

  interface Props {
    title: string
    /** Small label above the title, e.g. "Guide · Make It Happen" (page-header.ts). */
    eyebrow?: string
    /** Pattern or Retrofit Strategy ID. With it, the header is also the page's ID card. */
    patternId?: string
    status?: Status
    /**
     * Documentation samples (How to Read a Pattern, the Brand Guide): the
     * title is drawn as a paragraph, not an h1, so a sample never adds a
     * second h1 to the page; `accent` colors it like the real page would be,
     * and `summary` stands in for the paragraph that follows a real header.
     */
    demo?: boolean
    accent?: string
    summary?: string
  }

  const { title, eyebrow, patternId, status, demo = false, accent, summary }: Props = $props()
  // Color symbols (Display settings): the tab for this ID's hue, shown only
  // when the setting is on (color-symbols.css).
  const symkey = $derived(patternId ? pageAccent('', patternId) : undefined)
</script>

<header class="page-head" class:page-head--id={!!patternId} class:page-head--demo={demo} data-accent={accent}>
  <div class="page-head__row">
    {#if eyebrow}
      <p class="page-head__eyebrow" data-pagefind-ignore>{eyebrow}</p>
    {/if}
    {#if patternId}
      <span class="page-head__id" translate="no">{patternId}</span>
      <span class="cw-symtab page-head__sym" data-symkey={symkey} aria-hidden="true"></span>
    {/if}
    {#if status}
      <StatusBadge {status} />
    {/if}
  </div>
  {#if demo}
    <p class="page-head__title">{title}</p>
  {:else}
    <h1 data-pagefind-weight="10">{title}</h1>
  {/if}
  {#if summary}
    <p class="page-head__summary">{summary}</p>
  {/if}
</header>
