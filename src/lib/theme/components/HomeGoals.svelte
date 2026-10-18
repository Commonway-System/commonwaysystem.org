<script lang="ts">
  import HomeSection from './HomeSection.svelte'
  import Icon from './Icon.svelte'

  type GoalIcon = 'road' | 'grid' | 'retrofit' | 'question' | 'play' | 'shield-check'

  interface Goal {
    href: string
    icon: GoalIcon
    title: string
    text: string
    /** Where the card goes, said plainly (shown under the text). */
    cta: string
  }

  interface Props {
    eyebrow?: string
    title: string
    goals: Goal[]
  }

  const { eyebrow, title, goals }: Props = $props()
</script>

<HomeSection {eyebrow} {title}>
  <ul class="hg">
    {#each goals as goal (goal.href)}
      <li>
        <!-- One link per card: title, text and destination read as one name. -->
        <a class="hg__card" href={goal.href}>
          <span class="hg__icon" aria-hidden="true"><Icon name={goal.icon} size={22} /></span>
          <div class="hg__body">
            <h3 class="hg__title">{goal.title}</h3>
            <span class="hg__text">{goal.text}</span>
            <span class="hg__cta">{goal.cta} <span aria-hidden="true">&rarr;</span></span>
          </div>
        </a>
      </li>
    {/each}
  </ul>
</HomeSection>

<style>
  .hg {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }

  .hg li {
    margin: 0;
  }

  .hg__card {
    display: flex;
    gap: 1rem;
    height: 100%;
    padding: 1.4rem;
    background: var(--hs-card);
    border: 1px solid var(--cw-hairline);
    border-radius: var(--cw-radius-lg);
    color: var(--hs-ink);
    text-decoration: none;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.05);
    transition: transform 0.15s ease, border-color 0.15s ease;
  }

  .hg__card:hover {
    border-color: var(--cw-primary);
    transform: translateY(-2px);
  }

  .hg__icon {
    flex: none;
    display: grid;
    place-items: center;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: var(--cw-radius-md);
    background: var(--cw-primary-soft);
    color: var(--cw-primary);
  }

  .hg__body {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .hg__title {
    margin: 0;
    font-family: var(--cw-font-body);
    font-size: 1.0625rem;
    color: var(--hs-ink);
    font-weight: 600;
    line-height: 1.3;
  }

  .hg__text {
    font-size: 0.9375rem;
    line-height: 1.5;
    color: var(--hs-soft);
  }

  .hg__cta {
    margin-top: auto;
    padding-top: 0.4rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--hs-link);
  }

  .hg__card:hover .hg__cta {
    text-decoration: underline;
  }

  @media (prefers-reduced-motion: reduce) {
    .hg__card {
      transition: none;
    }

    .hg__card:hover {
      transform: none;
    }
  }

  @media (max-width: 1000px) {
    .hg {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 640px) {
    .hg {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  :global(html[data-view='simple']) .hg {
    grid-template-columns: minmax(0, 1fr);
  }
</style>
