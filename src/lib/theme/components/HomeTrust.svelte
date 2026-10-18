<script lang="ts">
  import { page } from '$app/state'
  import { patternPageCount, retrofitStrategyCount } from '$lib/pattern-count'
  import { thumbUrl } from '$lib/thumbs'
  import Citation from './Citation.svelte'
  import EvidenceChip from './EvidenceChip.svelte'
  import HomeSection from './HomeSection.svelte'

  interface Props {
    eyebrow?: string
    title: string
    intro?: string
    tiersHref: string
    /** The author card. */
    author: { name: string, role: string, photo: string, quote: string, text: string[], href: string, linkLabel: string }
  }

  const { eyebrow, title, intro, tiersHref, author }: Props = $props()

  const home = $derived(page.data.home as { citationCount: number, mediaCount: number } | undefined)

  const stats = $derived([
    { n: home?.citationCount, label: 'numbered citations' },
    { n: patternPageCount, label: 'patterns' },
    { n: retrofitStrategyCount, label: 'retrofit strategies' },
    { n: home?.mediaCount, label: 'videos, podcasts and articles' },
  ])
</script>

<HomeSection {eyebrow} {title} {intro}>
  <div class="ht">
    <div>
      <ul class="ht__tiers">
        <li><EvidenceChip tier="legal" />{' '}<span>A statute, adopted code, or government manual.</span></li>
        <li><EvidenceChip tier="evidence" />{' '}<span>Peer-reviewed research, published crash data, or a formal research report.</span></li>
        <li><EvidenceChip tier="precedent" />{' '}<span>A real place doing it successfully.</span></li>
        <li><span class="ht__flag"><Citation unsourced /></span>{' '}<span>A claim still waiting for a source is flagged in amber, so it never looks settled.</span></li>
      </ul>
      <p class="ht__more"><a href={tiersHref}>How evidence disputes are settled <span aria-hidden="true">&rarr;</span></a></p>
      <dl class="ht__stats">
        {#each stats as s (s.label)}
          <div class="ht__stat">
            <dt>{s.label}</dt>
            <dd>{s.n}</dd>
          </div>
        {/each}
      </dl>
    </div>
    <aside class="ht__author" aria-label="Who's behind it">
      <div class="ht__who">
        <img src={thumbUrl(author.photo, 160)} alt="" width="72" height="72" loading="lazy" decoding="async" />
        <p><strong>{author.name}</strong><br /><span>{author.role}</span></p>
      </div>
      <blockquote class="ht__quote"><p>{author.quote}</p></blockquote>
      {#each author.text as para (para)}
        <p class="ht__text">{para}</p>
      {/each}
      <p class="ht__more"><a href={author.href}>{author.linkLabel} <span aria-hidden="true">&rarr;</span></a></p>
    </aside>
  </div>
</HomeSection>

<style>
  .ht {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
    gap: 3rem;
    align-items: start;
  }

  .ht__tiers {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 0.7rem;
  }

  .ht__tiers li {
    display: grid;
    grid-template-columns: 9.5rem 1fr;
    align-items: baseline;
    gap: 0.75rem;
    margin: 0;
    font-size: 0.9688rem;
    color: var(--hs-soft);
  }

  .ht__flag {
    justify-self: start;
  }

  .ht__more {
    margin: 1.1rem 0 0;
    font-weight: 600;
  }

  .ht__more a {
    text-decoration: none;
  }

  .ht__more a:hover {
    text-decoration: underline;
  }

  .ht__stats {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    margin: 1.75rem 0 0;
  }

  /* Number above its label visually, but read label-first as a term/value pair. */
  .ht__stat {
    display: flex;
    flex-direction: column-reverse;
    padding: 1rem 1.1rem;
    background: var(--hs-card);
    border: 1px solid var(--cw-hairline);
    border-radius: var(--cw-radius-md);
  }

  .ht__stat dt {
    font-size: 0.875rem;
    color: var(--hs-soft);
  }

  .ht__stat dd {
    margin: 0;
    font-family: var(--cw-font-display);
    font-size: 2rem;
    font-weight: 600;
    line-height: 1.1;
    color: var(--cw-primary);
  }

  .ht__author {
    padding: 1.6rem;
    background: var(--hs-card);
    border: 1px solid var(--cw-hairline);
    border-radius: var(--cw-radius-lg);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.05);
  }

  .ht__who {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .ht__who img {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    object-fit: cover;
  }

  .ht__who p {
    margin: 0;
    line-height: 1.4;
  }

  .ht__who span {
    font-size: 0.9rem;
    color: var(--hs-soft);
  }

  .ht__quote {
    margin: 0 0 1rem;
    padding: 0;
    border: 0;
  }

  .ht__quote p {
    margin: 0;
    font-family: var(--cw-font-display);
    font-size: 1.25rem;
    font-style: italic;
    line-height: 1.4;
    color: var(--hs-ink);
  }

  .ht__text {
    margin: 0 0 0.8rem;
    font-size: 0.9688rem;
    line-height: 1.55;
    color: var(--hs-soft);
  }

  @media (max-width: 900px) {
    .ht {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  @media (max-width: 480px) {
    .ht__tiers li {
      grid-template-columns: minmax(0, 1fr);
      gap: 0.3rem;
    }
  }

  :global(html[data-view='simple']) .ht {
    grid-template-columns: minmax(0, 1fr);
  }
</style>
