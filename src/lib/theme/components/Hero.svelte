<script lang="ts">
  import Icon from './Icon.svelte'

  interface Props {
    title: string
    tagline: string
    description: string
    primaryHref: string
    primaryLabel: string
    secondaryHref: string
    secondaryLabel: string
  }

  const { title, tagline, description, primaryHref, primaryLabel, secondaryHref, secondaryLabel }: Props = $props()
</script>

<!--
  Renders its own h1 rather than relying on PageLayout's usual
  fm.title-driven one (see PageLayout.svelte's hideTitle flag): the title
  needs to sit inside this section's own layout, next to the tagline,
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
<section class="hero-bleed">
  <div class="hero-lines" aria-hidden="true"></div>
  <div class="hero-glow" aria-hidden="true"></div>
  <div class="hero-inner">
    <div class="hero-grid">
      <div class="hero__text">
        <h1 class="hero__title">{title}</h1>
        <p class="hero__tagline">{tagline}</p>
        <p class="hero__description">{description}</p>
        <div class="hero__actions">
          <a class="hero__btn hero__btn--primary" href={primaryHref}>
            {primaryLabel}
            <Icon name="arrow-right" size={16} />
          </a>
          <a class="hero__btn hero__btn--secondary" href={secondaryHref}>{secondaryLabel}</a>
        </div>
      </div>
      <div class="hero__mark">
        <!--
          Decorative: the "Commonway System" title text sits right next to
          this in the DOM, so the logomark's alt text would just duplicate
          it for screen reader users. Always the light-on-dark logo
          variant now (not swapped via the site's $isDark store like
          Navbar.svelte's logo): this hero's background is permanently
          dark in both site themes, so the light variant is always the
          correct pairing, unlike the page background it used to sit on.
        -->
        <img class="hero__mark-img" src="/logos/logo-light-no-text.svg" alt="" />
      </div>
    </div>
  </div>
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
    margin-bottom: 3.5rem;
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

  /* Faint diagonal dashes, evoking lane markings, per the brief's "roads
     and streets" subject matter rather than a generic decorative pattern.
     Animates only under prefers-reduced-motion: no-preference (see
     below); static (just the faint diagonal texture) otherwise. */
  .hero-lines {
    position: absolute;
    inset: 0;
    background-image: repeating-linear-gradient(
      115deg,
      transparent 0 38px,
      rgba(253, 250, 243, 0.06) 38px 42px
    );
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
    .hero-lines {
      animation: hero-lines-drift 30s linear infinite;
    }

    .hero-glow {
      animation: hero-glow-float 9s ease-in-out infinite;
    }
  }

  @keyframes hero-lines-drift {
    from {
      background-position: 0 0;
    }
    to {
      background-position: -600px 300px;
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
     hero's text/logo column lines up with the navbar above it, not the
     46rem prose measure the rest of the site uses. min-height + flex
     centering here (not on .hero-bleed) so the auto-margin centering
     above stays a normal block-level calculation, not a flex-item one. */
  .hero-inner {
    position: relative;
    z-index: 1;
    max-width: 88rem;
    margin: 0 auto;
    padding: 3rem 1.5rem;
    min-height: 60vh;
    display: flex;
    align-items: center;
  }

  .hero-grid {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 3rem;
    width: 100%;
  }

  .hero__text {
    max-width: 34rem;
  }

  /* :global(.hero-bleed) prefix on the title/tagline/description rules
     below: base.css's generic .cw-content h1 / .cw-content p rules (sized
     for prose, and colored for the page's own reactive ink/paper tokens)
     outrank a single-class selector on specificity, and would otherwise
     win out over both these margins and this fixed light-on-dark text
     pairing that .hero-bleed's always-dark background needs. */
  :global(.hero-bleed) .hero__title {
    font-family: var(--cw-font-display);
    font-size: var(--cw-text-4xl);
    font-weight: 600;
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--cw-paper-fixed);
    margin: 0 0 0.75rem;
  }

  :global(.hero-bleed) .hero__tagline {
    font-family: var(--cw-font-display);
    font-size: var(--cw-text-xl);
    font-weight: 500;
    /* Dark theme's own --cw-primary value (not the light-mode one, which
       is a dark teal tuned for light paper and would nearly disappear on
       this always-dark background): 10.7:1 against --hero-bg either way. */
    color: #4ddbc4;
    margin: 0 0 1rem;
  }

  :global(.hero-bleed) .hero__description {
    font-size: var(--cw-text-lg);
    line-height: 1.6;
    /* Same reasoning as the tagline above: dark theme's own --cw-ink-soft
       value, fixed rather than reactive, 10.6:1 against --hero-bg. */
    color: #c9c4b8;
    margin: 0 0 2rem;
  }

  .hero__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.9rem;
  }

  .hero__btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.7rem 1.3rem;
    border-radius: var(--cw-radius-md);
    font-family: var(--cw-font-body);
    font-size: var(--cw-text-base);
    font-weight: 600;
    text-decoration: none;
    border: 1px solid transparent;
  }

  /* Self-contained fill + fixed text pairing, same reasoning as
     Button.svelte's primary variant and Citation.svelte's badges: this
     exact pairing is the one the Brand Guide verifies contrast for, not
     "whichever ink the current theme happens to use." */
  .hero__btn--primary {
    background: var(--cw-teal);
    color: var(--cw-ink-fixed);
    text-shadow: 0 0 3px #ffffff;
  }

  .hero__btn--primary:hover {
    background: var(--cw-teal-hover);
  }

  /* Fixed light-on-dark pairing, not the page's reactive ink/hairline
     tokens: this button sits on --hero-bg, which is dark in both site
     themes, not on the page background. */
  .hero__btn--secondary {
    background: transparent;
    color: var(--cw-paper-fixed);
    border-color: rgba(253, 250, 243, 0.35);
  }

  .hero__btn--secondary:hover {
    border-color: rgba(253, 250, 243, 0.7);
    background: rgba(253, 250, 243, 0.08);
  }

  .hero__mark {
    flex: none;
    position: relative;
  }

  .hero__mark-img {
    width: 10rem;
    height: 10rem;
  }

  @media (max-width: 900px) {
    .hero-glow {
      width: 18rem;
      height: 18rem;
    }
  }

  @media (max-width: 640px) {
    /* Lower floor than the desktop 60vh: stacked (column-reverse) content
       is already taller relative to a phone viewport, so 60vh here would
       mostly just add dead space below the buttons rather than presence. */
    .hero-inner {
      padding: 3.5rem 1.5rem;
      min-height: 42vh;
    }

    .hero-grid {
      flex-direction: column-reverse;
      align-items: flex-start;
      gap: 1.5rem;
    }

    .hero__mark-img {
      width: 5.5rem;
      height: 5.5rem;
    }

    /* :global(.hero-bleed) prefix, matching the base rule above: without
       it this loses the specificity tie against the base rule's 4xl
       value regardless of which media query is active. */
    :global(.hero-bleed) .hero__title {
      font-size: var(--cw-text-3xl);
    }
  }
</style>
