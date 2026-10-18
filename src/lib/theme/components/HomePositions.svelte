<script lang="ts">
  import HomeSection from './HomeSection.svelte'

  interface Position {
    title: string
    text: string
    href: string
    /** Name of the page that makes the case, used as the link text. */
    linkLabel: string
  }

  interface Props {
    eyebrow?: string
    title: string
    intro?: string
    positions: Position[]
    action?: { href: string, label: string }
  }

  const { eyebrow, title, intro, positions, action }: Props = $props()
</script>

<HomeSection tone="dark" {eyebrow} {title} {intro} {action}>
  <ol class="hpo">
    {#each positions as p, i (p.title)}
      <li class="hpo__item">
        <span class="hpo__n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
        <h3 class="hpo__title">{p.title}</h3>
        <p class="hpo__text">{p.text} <a href={p.href}>{p.linkLabel}</a></p>
      </li>
    {/each}
  </ol>
</HomeSection>

<style>
  .hpo {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0 3rem;
  }

  .hpo__item {
    position: relative;
    margin: 0;
    padding: 1.4rem 0 1.4rem 3.4rem;
    border-top: 1px solid color-mix(in srgb, var(--hs-ink) 16%, transparent);
  }

  .hpo__n {
    position: absolute;
    left: 0;
    top: 1.35rem;
    font-family: var(--cw-font-display);
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--hs-accent);
  }

  .hpo__title {
    margin: 0 0 0.35rem;
    padding: 0;
    border: 0;
    font-size: 1.3rem;
    line-height: 1.25;
    color: var(--hs-ink);
  }

  .hpo__text {
    margin: 0;
    font-size: 0.9688rem;
    line-height: 1.55;
    color: var(--hs-soft);
  }

  .hpo__text a {
    color: var(--hs-link);
    font-weight: 600;
  }

  @media (max-width: 900px) {
    .hpo {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  :global(html[data-view='simple']) .hpo {
    grid-template-columns: minmax(0, 1fr);
  }
</style>
