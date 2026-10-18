<script lang="ts">
  // The Release History changelog. Each release gets a heading (linkable,
  // listed in "On this page") and a count line; the newest `openCount`
  // releases show their changes directly, older ones fold them into a
  // native <details>. Changes are grouped by type, and each one is a
  // one-sentence summary that opens to its full description. Everything is
  // native <details>, so it works without JavaScript; the text-only and
  // markdown copies open them all.
  import { onMount } from 'svelte'
  import type { Change, ChangeType, Release } from '$lib/data/releases'

  interface Props {
    releases: Release[]
    openCount?: number
  }

  let { releases, openCount = 1 }: Props = $props()

  const order: ChangeType[] = ['new', 'improved', 'fixed', 'removed', 'note']
  const groupLabel: Record<ChangeType, string> = {
    new: 'New',
    improved: 'Improved',
    fixed: 'Fixed',
    removed: 'Removed',
    note: 'Checks and notes',
  }
  const badgeLabel: Record<ChangeType, string> = {
    new: 'New',
    improved: 'Improved',
    fixed: 'Fixed',
    removed: 'Removed',
    note: 'Note',
  }
  const areaLabel = { content: 'Content', site: 'Site' }

  function idFor(date: string) {
    return `release-${date.replace(/\./g, '-')}`
  }

  function groups(changes: Change[]) {
    return order
      .map(type => ({ type, items: changes.filter(c => c.type === type) }))
      .filter(g => g.items.length)
  }

  function countLine(changes: Change[]) {
    const parts = order
      .filter(t => t !== 'note')
      .map(t => [t, changes.filter(c => c.type === t).length] as const)
      .filter(([, n]) => n)
      .map(([t, n]) => `${n} ${groupLabel[t].toLowerCase()}`)
    const notes = changes.filter(c => c.type === 'note').length
    if (notes)
      parts.push(`${notes} ${notes === 1 ? 'note' : 'notes'}`)
    return parts.join(' · ')
  }

  function changeCount(changes: Change[]) {
    const n = changes.filter(c => c.type !== 'note').length
    return `${n} ${n === 1 ? 'change' : 'changes'}`
  }

  // `code` spans in changelog text render as <code>.
  function parts(text: string) {
    return text.split(/`([^`]+)`/).map((value, i) => ({ value, code: i % 2 === 1 }))
  }

  let root: HTMLDivElement | undefined = $state()
  let mounted = $state(false)
  let expanded = $state(false)

  function setAll(open: boolean) {
    root?.querySelectorAll('details').forEach((d) => { d.open = open })
    expanded = open
  }

  // A link to a release (#release-2026-09-02) opens that release's changes.
  function openFromHash() {
    const id = decodeURIComponent(location.hash.slice(1))
    if (!id.startsWith('release-'))
      return
    const section = root?.querySelector<HTMLElement>(`[data-release="${CSS.escape(id)}"]`)
    const more = section?.querySelector<HTMLDetailsElement>('.cl-more')
    if (more)
      more.open = true
  }

  onMount(() => {
    mounted = true
    openFromHash()
    window.addEventListener('hashchange', openFromHash)
    return () => window.removeEventListener('hashchange', openFromHash)
  })
</script>

{#snippet text(value: string)}{#each parts(value) as p, i (i)}{#if p.code}<code>{p.value}</code>{:else}{p.value}{/if}{/each}{/snippet}

{#snippet changeList(changes: Change[])}
  {#each groups(changes) as g (g.type)}
    <h4 class="cl-group" class:cl-group--note={g.type === 'note'}>{groupLabel[g.type]}</h4>
    <ul class="cl-list">
      {#each g.items as c, i (i)}
        <li class="cl-item">
          {#if c.details}
            <details class="cl-change">
              <summary class="cl-line">
                <span class="cl-badge cl-badge--{c.type}">{badgeLabel[c.type]}<span class="cw-sr-only">:</span></span>
                <span class="cl-summary">{@render text(c.summary)} {#if c.area}<span class="cl-area"><span class="cw-sr-only">(</span>{areaLabel[c.area]}<span class="cw-sr-only">)</span></span>{/if}</span>
                <span class="cl-chevron" aria-hidden="true"></span>
              </summary>
              <p class="cl-details">{@render text(c.details)}</p>
            </details>
          {:else}
            <p class="cl-line cl-line--plain">
              <span class="cl-badge cl-badge--{c.type}">{badgeLabel[c.type]}<span class="cw-sr-only">:</span></span>
              <span class="cl-summary">{@render text(c.summary)} {#if c.area}<span class="cl-area"><span class="cw-sr-only">(</span>{areaLabel[c.area]}<span class="cw-sr-only">)</span></span>{/if}</span>
            </p>
          {/if}
        </li>
      {/each}
    </ul>
  {/each}
{/snippet}

<div class="cl" bind:this={root}>
  {#if mounted}
    <p class="cl-tools">
      <button type="button" class="cl-toggle" onclick={() => setAll(!expanded)}>
        {expanded ? 'Collapse all' : 'Expand all'}
      </button>
    </p>
  {/if}

  {#each releases as release, index (release.date)}
    <section class="cl-release" data-release={idFor(release.date)} aria-labelledby={idFor(release.date)}>
      <h3 id={idFor(release.date)} class="cl-date"><a class="svp-heading-anchor" href="#{idFor(release.date)}" aria-label="Link to this heading">#</a>{release.date}</h3>
      <p class="cl-counts">{countLine(release.changes)}</p>
      {#if index < openCount}
        {@render changeList(release.changes)}
      {:else}
        <details class="cl-more">
          <summary class="cl-more__summary">Show the {changeCount(release.changes)}</summary>
          {@render changeList(release.changes)}
        </details>
      {/if}
    </section>
  {/each}
</div>

<style>
  .cl-tools {
    margin: 0 0 1rem;
  }

  .cl-toggle {
    font: inherit;
    font-size: var(--cw-text-sm, 0.875rem);
    color: var(--cw-primary);
    background: none;
    border: 1px solid var(--cw-hairline);
    border-radius: 999px;
    padding: 0.35rem 0.9rem;
    min-height: 2rem;
    cursor: pointer;
  }

  .cl-toggle:hover {
    border-color: var(--cw-primary);
  }

  .cl-release {
    border-top: 1px solid var(--cw-hairline);
    padding-top: 0.25rem;
    margin-bottom: 1.25rem;
  }

  :global(.cw-content) .cl-date {
    position: relative;
    margin: 0.75rem 0 0.15rem;
    font-family: var(--cw-font-mono, ui-monospace, monospace);
    font-size: 1.05rem;
    letter-spacing: 0.01em;
  }

  :global(.cw-content) .cl-counts {
    margin: 0 0 0.6rem;
    font-size: 0.875rem;
    color: var(--cw-ink-soft);
  }

  :global(.cw-content) .cl-group {
    margin: 0.9rem 0 0.35rem;
    font-family: var(--cw-font-body);
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--cw-ink-soft);
  }

  :global(.cw-content) .cl-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  :global(.cw-content) .cl-item {
    margin: 0;
    padding: 0;
    border-bottom: 1px solid var(--cw-hairline);
  }

  :global(.cw-content) .cl-item:last-child {
    border-bottom: 0;
  }

  :global(.cw-content) .cl-line {
    display: flex;
    align-items: baseline;
    gap: 0.6rem;
    margin: 0;
    padding: 0.45rem 0;
    line-height: 1.45;
  }

  summary.cl-line {
    cursor: pointer;
    list-style: none;
    border-radius: 4px;
  }

  summary.cl-line::-webkit-details-marker {
    display: none;
  }

  summary.cl-line:hover .cl-summary {
    text-decoration: underline;
    text-decoration-color: var(--cw-ink-faint);
    text-underline-offset: 0.18em;
  }

  .cl-summary {
    flex: 1 1 auto;
    min-width: 0;
  }

  .cl-badge {
    flex: none;
    display: inline-block;
    min-width: 5.4rem;
    text-align: center;
    padding: 0.05rem 0.5rem;
    border-radius: 999px;
    border: 1px solid transparent;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1.5;
    position: relative;
    top: -0.05em;
  }

  .cl-badge--new {
    background: var(--cw-primary-soft);
    color: var(--cw-primary);
  }

  .cl-badge--improved {
    color: var(--cw-descriptive-ink);
    border-color: currentColor;
  }

  .cl-badge--fixed {
    background: var(--cw-tip-soft);
    color: var(--cw-tip-ink);
  }

  .cl-badge--removed {
    background: var(--cw-danger-soft);
    color: var(--cw-danger);
  }

  .cl-badge--note {
    color: var(--cw-ink-soft);
    border-color: var(--cw-hairline);
  }

  .cl-area {
    display: inline-block;
    margin-left: 0.2rem;
    padding: 0 0.4rem;
    border: 1px solid var(--cw-hairline);
    border-radius: 4px;
    font-size: 0.72rem;
    line-height: 1.5;
    color: var(--cw-ink-soft);
    white-space: nowrap;
    vertical-align: 0.08em;
  }

  .cl-chevron {
    flex: none;
    width: 0.55rem;
    height: 0.55rem;
    margin: 0 0.25rem 0 0;
    border-right: 2px solid var(--cw-ink-faint);
    border-bottom: 2px solid var(--cw-ink-faint);
    transform: translateY(-0.15em) rotate(45deg);
    transition: transform 0.15s ease;
  }

  details[open] > summary .cl-chevron {
    transform: translateY(0.1em) rotate(-135deg);
  }

  :global(.cw-content) .cl-details {
    margin: 0 0 0.75rem;
    padding: 0.1rem 0 0 calc(5.4rem + 0.6rem);
    font-size: 0.925rem;
    color: var(--cw-ink-soft);
  }

  .cl-more__summary {
    cursor: pointer;
    color: var(--cw-primary);
    font-size: 0.925rem;
    padding: 0.3rem 0;
    min-height: 1.5rem;
  }

  .cl-more__summary:hover {
    text-decoration: underline;
  }

  @media (max-width: 560px) {
    :global(.cw-content) .cl-line {
      flex-wrap: wrap;
      row-gap: 0.2rem;
    }

    .cl-badge {
      min-width: 0;
    }

    .cl-summary {
      flex-basis: calc(100% - 2rem);
      order: 3;
    }

    .cl-chevron {
      order: 2;
      margin-left: auto;
    }

    :global(.cw-content) .cl-details {
      padding-left: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .cl-chevron {
      transition: none;
    }
  }

  @media print {
    .cl-tools,
    .cl-chevron {
      display: none;
    }

    .cl details::details-content {
      content-visibility: visible;
    }
  }
</style>
