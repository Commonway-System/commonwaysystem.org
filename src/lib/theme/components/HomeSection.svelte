<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    /** plain = page paper, tint = a slightly darker band, dark = fixed dark band like the hero. */
    tone?: 'plain' | 'tint' | 'dark'
    eyebrow?: string
    title: string
    intro?: string
    /** A link shown at the end of the header row (e.g. "Open the Media Gallery"). */
    action?: { href: string, label: string }
    children: Snippet
  }

  const { tone = 'plain', eyebrow, title, intro, action, children }: Props = $props()
  const uid = $props.id()
</script>

<!--
  One full-width band of the homepage. Same full-bleed breakout as Hero.svelte
  (left: 50%; margin-left: -50vw; width: 100vw), which works because the
  homepage's GlobalLayout shell is a single column and base.css sets
  scrollbar-gutter: stable. Every class selector below outranks base.css's
  .cw-content h2 / p rules (which are one class plus an element), so the
  prose margins and the h2's top rule don't leak in.
-->
<section class="hs hs--{tone}" aria-labelledby="{uid}-h">
  <div class="hs__inner">
    <div class="hs__head" class:hs__head--action={action}>
      <div class="hs__headtext">
        {#if eyebrow}
          <p class="hs__eyebrow">{eyebrow}</p>
        {/if}
        <h2 class="hs__title" id="{uid}-h">{title}</h2>
        {#if intro}
          <p class="hs__intro">{intro}</p>
        {/if}
      </div>
      {#if action}
        <a class="hs__action" href={action.href}>{action.label} <span aria-hidden="true">&rarr;</span></a>
      {/if}
    </div>
    {@render children()}
  </div>
</section>

<style>
  .hs {
    position: relative;
    left: 50%;
    right: 50%;
    width: 100vw;
    margin-left: -50vw;
    margin-right: -50vw;
    /* Section colors as custom properties so children (and Simplified view)
       can follow them: --hs-ink for text, --hs-soft for secondary text,
       --hs-accent for the eyebrow and accent figures. */
    --hs-bg: var(--cw-paper);
    --hs-ink: var(--cw-ink);
    --hs-soft: var(--cw-ink-soft);
    --hs-accent: var(--cw-primary);
    --hs-card: var(--cw-paper-raised);
    --hs-link: var(--cw-link);
    background: var(--hs-bg);
    color: var(--hs-ink);
  }

  .hs--tint {
    --hs-bg: color-mix(in srgb, var(--cw-ink) 4%, var(--cw-paper));
    border-block: 1px solid var(--cw-hairline);
  }

  /* Fixed light-on-dark, same colors as the hero (the dark-theme values of
     the ink tokens, 10:1 or better on both backgrounds). */
  .hs--dark {
    --hs-bg: var(--cw-ink-fixed);
    --hs-ink: var(--cw-paper-fixed);
    --hs-soft: #c9c4b8;
    --hs-accent: #4ddbc4;
    --hs-card: rgba(253, 250, 243, 0.06);
    --hs-link: #9fe9dc;
  }

  :global([data-theme='dark']) .hs--dark {
    --hs-bg: #0e211d;
  }

  /* Simplified view drops the dark band so the page reads as plain text on
     the page's own colors, the same treatment the hero gets in base.css. */
  :global(html[data-view='simple']) .hs {
    --hs-bg: var(--cw-paper);
    --hs-ink: var(--cw-ink);
    --hs-soft: var(--cw-ink-soft);
    --hs-accent: var(--cw-primary);
    --hs-card: var(--cw-paper-raised);
    --hs-link: var(--cw-link);
    border-block: 0;
  }

  .hs__inner {
    max-width: 88rem;
    margin: 0 auto;
    padding: 4.5rem 1.5rem;
  }

  /* Simplified view is one plain 46rem column sitewide; the homepage too. */
  :global(html[data-view='simple']) .hs__inner {
    max-width: 46rem;
  }

  .hs__head {
    margin-bottom: 2.25rem;
  }

  .hs__head--action {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1rem 2rem;
  }

  .hs__headtext {
    max-width: 46rem;
  }

  .hs__eyebrow {
    margin: 0 0 0.75rem;
    font-family: var(--cw-font-body);
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--hs-accent);
  }

  .hs__title {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: clamp(1.75rem, 1.2rem + 1.8vw, 2.5rem);
    line-height: 1.15;
    color: var(--hs-ink);
  }

  .hs__intro {
    margin: 0.9rem 0 0;
    font-size: var(--cw-text-lg);
    line-height: 1.6;
    color: var(--hs-soft);
  }

  .hs__action {
    color: var(--hs-link);
    font-weight: 600;
    text-decoration: none;
  }

  .hs__action:hover {
    text-decoration: underline;
  }

  @media (max-width: 640px) {
    .hs__inner {
      padding: 3.25rem 1rem;
    }
  }
</style>
