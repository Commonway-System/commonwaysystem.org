<script lang="ts">
  import EvidenceChip from './EvidenceChip.svelte'
  import HomeSection from './HomeSection.svelte'

  interface Fact {
    /** The common belief, shown in quotes above the figure. */
    claim: string
    /** A big figure, e.g. "10.3"; omit when `bars` is used instead. */
    figure?: string
    /** Small text after the figure, e.g. "%" or "billion". */
    figureUnit?: string
    /** A small labeled bar chart instead of a figure (values are percentages). */
    bars?: { label: string, value: number }[]
    /** What the bars measure, read by screen readers before the list. */
    barsLabel?: string
    title: string
    text: string
    /** Evidence tier of the source behind the figure (cited on the linked page). */
    tier: 'legal' | 'evidence' | 'precedent'
    href: string
    linkLabel: string
  }

  interface Props {
    eyebrow?: string
    title: string
    intro?: string
    facts: Fact[]
  }

  const { eyebrow, title, intro, facts }: Props = $props()
</script>

<HomeSection tone="tint" {eyebrow} {title} {intro}>
  <div class="hf">
    {#each facts as fact (fact.href)}
      <article class="hf__card">
        <p class="hf__claim">&ldquo;{fact.claim}&rdquo;</p>
        {#if fact.bars}
          <ul class="hf__bars" aria-label={fact.barsLabel}>
            {#each fact.bars as bar (bar.label)}
              <li>
                <span class="hf__bar-label">{bar.label}</span>
                <span class="hf__bar" aria-hidden="true"><span style:width="{bar.value}%"></span></span>
                <span class="hf__bar-value">{bar.value}%</span>
              </li>
            {/each}
          </ul>
        {:else if fact.figure}
          <p class="hf__figure">{fact.figure}{#if fact.figureUnit}<span class="hf__unit">{fact.figureUnit}</span>{/if}</p>
        {/if}
        <h3 class="hf__title">{fact.title}</h3>
        <p class="hf__text">{fact.text}</p>
        <div class="hf__src">
          <EvidenceChip tier={fact.tier} />
          <a href={fact.href}>{fact.linkLabel} <span aria-hidden="true">&rarr;</span></a>
        </div>
      </article>
    {/each}
  </div>
</HomeSection>

<style>
  .hf {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.25rem;
  }

  .hf__card {
    display: flex;
    flex-direction: column;
    padding: 1.75rem 1.5rem 1.4rem;
    background: var(--hs-card);
    border: 1px solid var(--cw-hairline);
    border-radius: var(--cw-radius-lg);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.05);
  }

  .hf__claim {
    margin: 0 0 1rem;
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--cw-ink-faint);
  }

  .hf__figure {
    margin: 0;
    font-family: var(--cw-font-display);
    font-size: clamp(2.6rem, 2rem + 2vw, 3.5rem);
    font-weight: 600;
    line-height: 1;
    color: var(--cw-primary);
  }

  .hf__unit {
    margin-left: 0.15em;
    font-size: 0.42em;
    font-weight: 500;
    color: var(--hs-soft);
  }

  .hf__bars {
    list-style: none;
    margin: 0.25rem 0 0;
    padding: 0;
    display: grid;
    gap: 0.45rem;
  }

  .hf__bars li {
    display: grid;
    grid-template-columns: 4.25rem 1fr 2.75rem;
    align-items: center;
    gap: 0.6rem;
    margin: 0;
    font-size: 0.875rem;
    color: var(--hs-soft);
  }

  .hf__bar-value {
    text-align: right;
    font-variant-numeric: tabular-nums;
    font-weight: 600;
    color: var(--hs-ink);
  }

  .hf__bar {
    height: 0.65rem;
    border-radius: 999px;
    background: var(--cw-hairline);
    overflow: hidden;
  }

  .hf__bar span {
    display: block;
    height: 100%;
    border-radius: 999px;
    background: var(--cw-network);
  }

  .hf__title {
    margin: 1rem 0 0.5rem;
    padding: 0;
    border: 0;
    font-size: 1.3rem;
    line-height: 1.25;
    color: var(--hs-ink);
  }

  .hf__text {
    margin: 0 0 1.25rem;
    font-size: 0.9688rem;
    line-height: 1.55;
    color: var(--hs-soft);
  }

  .hf__src {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem 1rem;
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid var(--cw-hairline);
    font-size: 0.875rem;
  }

  .hf__src a {
    font-weight: 600;
    text-decoration: none;
  }

  .hf__src a:hover {
    text-decoration: underline;
  }

  @media (max-width: 1000px) {
    .hf {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 640px) {
    .hf {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  :global(html[data-view='simple']) .hf {
    grid-template-columns: minmax(0, 1fr);
  }
</style>
