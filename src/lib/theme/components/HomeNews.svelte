<script lang="ts">
  import { page } from '$app/state'
  import HomeSection from './HomeSection.svelte'

  interface Props {
    eyebrow?: string
    title: string
    intro?: string
    action?: { href: string, label: string }
    /** The "take part" card beside the changelog lines. */
    join: { title: string, text: string, links: { href: string, label: string }[] }
  }

  const { eyebrow, title, intro, action, join }: Props = $props()

  const typeLabels: Record<string, string> = { new: 'New', improved: 'Improved', fixed: 'Fixed', removed: 'Removed' }

  // The newest few changelog lines (src/lib/data/releases.ts), picked in +page.server.ts.
  const changes = $derived((page.data.home?.latestChanges ?? []) as { date: string, type: string, summary: string }[])
</script>

<HomeSection {eyebrow} {title} {intro} {action}>
  <div class="hn">
    <ul class="hn__list">
      {#each changes as c, i (i)}
        <li>
          <a class="hn__date" href="/about/release-history/#release-{c.date.replaceAll('.', '-')}"><time datetime={c.date.replaceAll('.', '-')}>{c.date}</time></a>
          <span><span class="hn__type">{typeLabels[c.type] ?? c.type}:</span> {c.summary}</span>
        </li>
      {/each}
    </ul>
    <div class="hn__join">
      <h3 class="hn__join-title">{join.title}</h3>
      <p>{join.text}</p>
      <ul>
        {#each join.links as l (l.href)}
          <li><a href={l.href}>{l.label}</a></li>
        {/each}
      </ul>
    </div>
  </div>
</HomeSection>

<style>
  .hn {
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
    gap: 2.5rem;
    align-items: start;
  }

  .hn__list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .hn__list li {
    display: grid;
    grid-template-columns: 7rem 1fr;
    gap: 1rem;
    margin: 0;
    padding: 0.9rem 0;
    border-top: 1px solid var(--cw-hairline);
    font-size: 0.9688rem;
    line-height: 1.5;
  }

  .hn__date {
    font-family: var(--cw-font-mono, ui-monospace, monospace);
    font-size: 0.875rem;
  }

  .hn__type {
    font-weight: 600;
  }

  .hn__join {
    padding: 1.6rem;
    border-radius: var(--cw-radius-lg);
    background: var(--cw-primary-soft);
  }

  .hn__join-title {
    margin: 0 0 0.5rem;
    padding: 0;
    border: 0;
    font-size: 1.375rem;
  }

  .hn__join p {
    margin: 0 0 1rem;
    color: var(--hs-soft);
  }

  .hn__join ul {
    margin: 0;
    padding-left: 1.2rem;
  }

  .hn__join li {
    margin: 0.35rem 0 0;
  }

  @media (max-width: 900px) {
    .hn {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  @media (max-width: 480px) {
    .hn__list li {
      grid-template-columns: minmax(0, 1fr);
      gap: 0.2rem;
    }
  }

  :global(html[data-view='simple']) .hn {
    grid-template-columns: minmax(0, 1fr);
  }
</style>
