<script lang="ts">
  import { onMount } from 'svelte'
  import type { ViewerData } from '$lib/viewer/types'
  import { openSearch } from '../search'
  import Icon from './Icon.svelte'
  import InkHalftone from './InkHalftone.svelte'
  import StreetBeforeAfter from './StreetBeforeAfter.svelte'

  interface Showcase {
    data: ViewerData
    before: string
    after: string
    title: string
    caption: string
    href: string
    linkLabel: string
  }

  interface Props {
    eyebrow: string
    /** First part of the h1. */
    title: string
    /** Second part of the h1, set in the accent color and italic. */
    titleAccent?: string
    lede: string
    primaryHref: string
    primaryLabel: string
    secondaryHref: string
    secondaryLabel: string
    /** Text on the search button. */
    searchLabel?: string
    /** A before/after street drawing beside the text (StreetBeforeAfter). */
    showcase?: Showcase
  }

  const { eyebrow, title, titleAccent, lede, primaryHref, primaryLabel, secondaryHref, secondaryLabel, searchLabel = 'Search the guidebook', showcase }: Props = $props()

  // WCAG 2.2.2 (Pause, Stop, Hide): the background animation plays
  // automatically for more than five seconds alongside other content, so
  // readers get a way to stop it. Covers both the canvas halftone and the
  // glow's float animation. The choice is remembered per browser; storage
  // can be unavailable (private window, blocked), so every access is
  // wrapped and the page works without it. Under prefers-reduced-motion
  // nothing animates at all, and the button is hidden (see the style block).
  const STORAGE_KEY = 'commonway-hero-motion-paused'
  let paused = $state(false)

  onMount(() => {
    try {
      paused = localStorage.getItem(STORAGE_KEY) === '1'
    }
    catch {
      // Storage unavailable; start playing.
    }
  })

  function toggleMotion() {
    paused = !paused
    try {
      localStorage.setItem(STORAGE_KEY, paused ? '1' : '0')
    }
    catch {
      // Not remembered this visit; the toggle itself still works.
    }
  }
</script>

<!--
  Renders its own h1 rather than relying on PageLayout's usual
  fm.title-driven one (see PageLayout.svelte's hideTitle flag): the title
  needs to sit inside this section's own layout, next to the lede,
  description and actions, not as a bare heading above everything.

  Deliberately full-bleed and permanently dark, regardless of the site's
  own light/dark toggle (see GlobalLayout.svelte's isHome grid collapse,
  which is what makes the full-bleed part possible): the ask this answers
  is "contrast with the rest of the page," and a hero whose background
  tracked the toggle would read the same as the page around it half the
  time. --hero-bg still gets a themed override below so it stays visibly
  distinct from the page's own dark-mode paper color (both dark, but not
  the same dark), not just from the light-mode one.
-->
<section class="hero-bleed" class:hero-bleed--paused={paused}>
  <InkHalftone {paused} />
  <div class="hero-glow" aria-hidden="true"></div>
  <div class="hero-inner">
    <div class="hero-grid" class:hero-grid--showcase={showcase}>
      <div class="hero__text">
        <p class="hero__eyebrow">{eyebrow}</p>
        <h1 class="hero__title">{title}{#if titleAccent}{' '}<em class="hero__accent">{titleAccent}</em>{/if}</h1>
        <p class="hero__description">{lede}</p>
        <div class="hero__actions">
          <a class="hero__btn hero__btn--primary" href={primaryHref}>
            {primaryLabel}
            <Icon name="arrow-right" size={16} />
          </a>
          <a class="hero__btn hero__btn--secondary" href={secondaryHref}>{secondaryLabel}</a>
        </div>
        <button type="button" class="hero__search" onclick={openSearch} data-pagefind-ignore>
          <Icon name="search" size={18} />
          <span>{searchLabel}</span>
          <kbd class="hero__kbd" aria-hidden="true">Ctrl K</kbd>
        </button>
      </div>
      {#if showcase}
        <div class="hero__showcase">
          <StreetBeforeAfter {...showcase} />
        </div>
      {/if}
    </div>
  </div>
  <button type="button" class="hero__motion" onclick={toggleMotion}>
    {#if paused}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><path d="M3 1.5v11l9-5.5z" /></svg>
      Play animation
    {:else}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><rect x="2.5" y="1.5" width="3" height="11" rx="0.5" /><rect x="8.5" y="1.5" width="3" height="11" rx="0.5" /></svg>
      Pause animation
    {/if}
  </button>
</section>

<style>
  .hero-bleed {
    /* Full-bleed breakout: escapes .cw-content's 46rem max-width (and the
       .page padding around it) regardless of how many centered ancestors
       sit in between, since 100vw is always the real viewport width, not
       a percentage of whichever ancestor. Relies on the global
       scrollbar-gutter: stable (base.css) so 100vw doesn't include a
       scrollbar and cause a horizontal overflow. */
    position: relative;
    left: 50%;
    right: 50%;
    width: 100vw;
    margin-left: -50vw;
    margin-right: -50vw;
    margin-top: -2.5rem;
    overflow: hidden;
    --hero-bg: var(--cw-ink-fixed);
    background: var(--hero-bg);
    color: var(--cw-paper-fixed);
  }

  /* Dark-mode page paper is the same #141414 as --cw-ink-fixed, so without
     this override the hero would be visually identical to the page
     background in dark mode, the one theme where "contrast with the rest
     of the page" matters most. A deep teal-charcoal keeps it dark (the
     logomark/text pairing above still needs a dark surface) but distinct. */
  :global([data-theme='dark']) .hero-bleed {
    --hero-bg: #0e211d;
  }

  .hero-glow {
    position: absolute;
    top: 50%;
    right: 6%;
    width: 26rem;
    height: 26rem;
    border-radius: 50%;
    background: radial-gradient(circle, color-mix(in srgb, var(--cw-teal) 40%, transparent) 0%, transparent 70%);
    filter: blur(20px);
    transform: translateY(-50%);
  }

  @media (prefers-reduced-motion: no-preference) {
    .hero-glow {
      animation: hero-glow-float 9s ease-in-out infinite;
    }
  }

  .hero-bleed--paused .hero-glow {
    animation-play-state: paused;
  }

  .hero__motion {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    z-index: 2;
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    min-height: 32px;
    padding: 0.3rem 0.75rem;
    background: rgba(0, 0, 0, 0.55);
    color: var(--cw-paper-fixed);
    border: 1px solid rgba(253, 250, 243, 0.45);
    border-radius: 999px;
    font: inherit;
    font-size: 0.8125rem;
    font-weight: 500;
    cursor: pointer;
  }

  .hero__motion:hover {
    background: rgba(0, 0, 0, 0.8);
    border-color: var(--cw-paper-fixed);
  }

  /* Nothing animates under reduced motion, so there is nothing to pause. */
  @media (prefers-reduced-motion: reduce) {
    .hero__motion {
      display: none;
    }
  }

  @keyframes hero-glow-float {
    0%,
    100% {
      transform: translateY(-50%) scale(1);
    }
    50% {
      transform: translateY(-54%) scale(1.06);
    }
  }

  /* 88rem to match Navbar.svelte's own .navbar__inner max-width, so the
     hero lines up with the navbar above it and the homepage sections below. */
  .hero-inner {
    position: relative;
    z-index: 1;
    max-width: 88rem;
    margin: 0 auto;
    padding: 4.5rem 1.5rem 5rem;
  }

  .hero-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    align-items: center;
    gap: 3rem;
  }

  @media (min-width: 980px) {
    .hero-grid--showcase {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
      gap: 3.5rem;
    }
  }

  .hero__text {
    max-width: 38rem;
  }

  /* :global(.hero-bleed) prefix on the text rules below: base.css's
     .cw-content h1 / p rules would otherwise compete on specificity, and
     the hero's fixed light-on-dark pairing must win. The colors are the
     dark theme's own --cw-primary and --cw-ink-soft values, fixed rather
     than reactive because the hero is dark in both themes (10:1 or better). */
  :global(.hero-bleed) .hero__eyebrow {
    margin: 0 0 1rem;
    font-family: var(--cw-font-body);
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #4ddbc4;
  }

  :global(.hero-bleed) .hero__title {
    font-family: var(--cw-font-display);
    font-size: clamp(2.375rem, 1.6rem + 3vw, 4rem);
    font-weight: 600;
    line-height: 1.08;
    letter-spacing: -0.01em;
    color: var(--cw-paper-fixed);
    margin: 0;
  }

  .hero__accent {
    font-style: italic;
    color: #4ddbc4;
  }

  :global(.hero-bleed) .hero__description {
    font-size: var(--cw-text-lg);
    line-height: 1.6;
    color: #c9c4b8;
    margin: 1.4rem 0 2rem;
  }

  .hero__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .hero__btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.8rem 1.3rem;
    border-radius: var(--cw-radius-md);
    font-family: var(--cw-font-body);
    font-size: var(--cw-text-base);
    font-weight: 600;
    text-decoration: none;
    border: 1px solid transparent;
  }

  /* Self-contained fill + fixed text pairing, same reasoning as
     Button.svelte's primary variant and Citation.svelte's badges. */
  .hero__btn--primary {
    background: var(--cw-teal);
    color: var(--cw-ink-fixed);
    text-shadow: 0 0 3px #ffffff;
  }

  .hero__btn--primary:hover {
    background: var(--cw-teal-hover);
  }

  .hero__btn--secondary {
    background: transparent;
    color: var(--cw-paper-fixed);
    border-color: rgba(253, 250, 243, 0.35);
  }

  .hero__btn--secondary:hover {
    border-color: rgba(253, 250, 243, 0.7);
    background: rgba(253, 250, 243, 0.08);
  }

  .hero__search {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    width: 100%;
    max-width: 30rem;
    min-height: 44px;
    margin-top: 1.5rem;
    padding: 0.6rem 0.9rem;
    border: 1px solid rgba(253, 250, 243, 0.25);
    border-radius: var(--cw-radius-md);
    background: rgba(253, 250, 243, 0.06);
    color: #c9c4b8;
    font: inherit;
    font-size: 0.9375rem;
    text-align: left;
    cursor: pointer;
  }

  .hero__search:hover {
    border-color: rgba(253, 250, 243, 0.5);
    color: var(--cw-paper-fixed);
  }

  .hero__kbd {
    margin-left: auto;
    padding: 0.1rem 0.4rem;
    border: 1px solid rgba(253, 250, 243, 0.3);
    border-radius: 4px;
    font-family: var(--cw-font-body);
    font-size: 0.75rem;
  }

  @media (hover: none) {
    .hero__kbd {
      display: none;
    }
  }

  .hero__showcase {
    min-width: 0;
  }

  :global(html[data-view='simple']) .hero-inner {
    max-width: 46rem;
  }

  :global(html[data-view='simple']) .hero-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  @media (max-width: 900px) {
    .hero-glow {
      width: 18rem;
      height: 18rem;
    }
  }

  @media (max-width: 640px) {
    .hero-inner {
      padding: 3rem 1rem 4.5rem;
    }

    .hero-grid {
      gap: 2.25rem;
    }
  }
</style>
