<script lang="ts">
  import EvidenceChip from './EvidenceChip.svelte'

  interface Props {
    text: string
    learnMoreHref: string
  }

  const { text, learnMoreHref }: Props = $props()

  const tiers = [
    { tier: 'legal' as const, label: 'Legal / regulatory' },
    { tier: 'evidence' as const, label: 'Evidence-based' },
    { tier: 'precedent' as const, label: 'Precedent-based' },
  ]
</script>

<!--
  Teal/primary treatment, not amber: an earlier version used
  --cw-amber-soft, the same background the :::warning admonition uses,
  which read as a caution notice instead of a feature highlight (this was
  also a genuine judgment call against the Brand Guide's "amber reserved
  for pattern highlighting and the unsourced-claim flag" rule, not a clean
  fit). The evidence-tier chips are already teal-toned on their own terms
  (EvidenceChip's legal/evidence/precedent colors), so a teal card ties
  together with them instead of clashing. The "Learn how evidence tiers
  work" link is deliberately a plain content link with no color override,
  per feedback that a recolored link didn't read as a normal hyperlink:
  it just inherits base.css's global `a` styling like every other content
  link on the site.
-->
<section class="evidence-strip">
  <div class="evidence-strip__intro">
    <p class="evidence-strip__eyebrow">Why this guide is different</p>
    <p class="evidence-strip__text">
      {text}
      <a href={learnMoreHref}>Learn how evidence tiers work</a>.
    </p>
  </div>
  <ul class="evidence-strip__tiers">
    {#each tiers as { tier, label } (tier)}
      <li>
        <EvidenceChip {tier} />
        <span>{label}</span>
      </li>
    {/each}
  </ul>
</section>

<style>
  .evidence-strip {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem 2rem;
    margin: 0 0 3rem;
    padding: 1.75rem 2rem;
    border-radius: var(--cw-radius-lg);
    background: var(--cw-primary-soft);
    border: 1px solid color-mix(in srgb, var(--cw-primary) 30%, transparent);
    border-left: 4px solid var(--cw-primary);
    box-shadow: 0 10px 24px -16px rgba(20, 20, 20, 0.25);
  }

  /* :global(.evidence-strip) prefix: outranks base.css's .cw-content p
     rule on specificity, same reasoning as Hero.svelte's title/tagline. */
  :global(.evidence-strip) .evidence-strip__eyebrow {
    margin: 0 0 0.4rem;
    font-family: var(--cw-font-display);
    font-size: var(--cw-text-sm);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--cw-primary);
  }

  :global(.evidence-strip) .evidence-strip__text {
    margin: 0;
    color: var(--cw-ink-soft);
    line-height: 1.6;
  }

  .evidence-strip__intro {
    flex: 1 1 22rem;
  }

  /* :global(.cw-content) prefix: outranks base.css's generic .cw-content
     ul / li + li prose-list rules on specificity, same reasoning as
     FeatureGrid.svelte, so this list's own margin/gap isn't overridden. */
  :global(.cw-content) .evidence-strip__tiers {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0;
    padding: 0;
    list-style: none;
    flex: 0 0 auto;
  }

  :global(.cw-content) .evidence-strip__tiers li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    font-size: var(--cw-text-sm);
    color: var(--cw-ink-soft);
    white-space: nowrap;
  }
</style>
