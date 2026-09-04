<script lang="ts">
  import { page } from '$app/state'
  import { calVerToday, externalLinkAttrs, isExternalHref } from '$lib/site.js'
  import options from 'virtual:commonway/options'
  import { isDark, sidebarOpen } from '../layout.js'
  import Icon from './Icon.svelte'
  import ThemeToggle from './ThemeToggle.svelte'

  const version = calVerToday()

  const navLinks = options.navbar ?? []
  const wordmark = options.logoText ?? options.siteTitle

  function isActive(to: string) {
    if (to === '/')
      return page.url.pathname === '/'
    return page.url.pathname.startsWith(to.replace(/\/$/, ''))
  }
</script>

<header class="navbar">
  <div class="navbar__inner">
    <div class="navbar__start">
      <a class="navbar__brand" href="/">
        <img
          class="navbar__brand-mark"
          src={$isDark ? '/logos/full-logo-light-variation-commonway-for-dark-backgrounds.svg' : '/logos/full-logo-dark-variation-commonway-for-light-backgrounds.svg'}
          alt={wordmark}
        />
      </a>
      <button
        type="button"
        class="navbar__menu-btn"
        aria-label={$sidebarOpen ? 'Close navigation' : 'Open navigation'}
        onclick={() => sidebarOpen.update((v) => !v)}
      >
        <Icon name={$sidebarOpen ? 'close' : 'menu'} />
      </button>
    </div>

    <nav class="navbar__links" aria-label="Primary">
      {#each navLinks as link (link.to)}
        <a
          href={link.to}
          class="navbar__link"
          class:navbar__link--active={isActive(link.to)}
          {...externalLinkAttrs(link.to)}
        >
          {link.title}
          {#if isExternalHref(link.to)}
            <span class="cw-external-indicator">
              <Icon name="external" size={13} />
              <span class="cw-sr-only"> (opens in new tab)</span>
            </span>
          {/if}
        </a>
      {/each}
    </nav>

    <div class="navbar__end">
      <a class="navbar__version" href="/about/release-history/" title="CalVer, updated on each publish, see the changelog">
        <span class="navbar__version-label navbar__version-label--full">Version</span>
        <span class="navbar__version-label navbar__version-label--short">V.</span>
        {version}
      </a>
      {#if options.github}
        <a
          class="navbar__icon-link"
          href={options.github}
          {...externalLinkAttrs(options.github)}
          aria-label={isExternalHref(options.github) ? 'View source on GitHub (opens in new tab)' : 'View source on GitHub'}
        >
          <Icon name="github" size={19} />
        </a>
      {/if}
      <ThemeToggle />
    </div>
  </div>
</header>

<style>
  .navbar {
    position: sticky;
    top: 0;
    z-index: 50;
    height: var(--cw-navbar-height);
    background: color-mix(in srgb, var(--cw-paper) 88%, transparent);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--cw-hairline);
  }

  .navbar__inner {
    height: 100%;
    max-width: 88rem;
    margin: 0 auto;
    padding: 0 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
  }

  .navbar__start {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 0 0 auto;
  }

  .navbar__menu-btn {
    display: none;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    flex-shrink: 0;
    border: none;
    background: transparent;
    color: var(--cw-ink);
    border-radius: var(--cw-radius-md);
    cursor: pointer;
  }

  .navbar__brand {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    text-decoration: none;
    white-space: nowrap;
  }

  .navbar__brand-mark {
    height: 2.5rem;
    width: auto;
  }

  .navbar__links {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex: 1 1 auto;
  }

  .navbar__link {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: var(--cw-text-sm);
    font-weight: 500;
    color: var(--cw-ink-soft);
    text-decoration: none;
    padding: 0.35rem 0;
    border-bottom: 2px solid transparent;
  }

  .navbar__link:hover {
    color: var(--cw-ink);
  }

  .navbar__link--active {
    color: var(--cw-ink);
    /* --cw-primary (teal), not amber: amber is reserved for the
       unsourced-claim flag and pattern highlighting, never a general
       UI accent, per the Brand Guide. */
    border-bottom-color: var(--cw-primary);
  }

  .navbar__end {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    flex: 0 0 auto;
  }

  .navbar__version {
    font-family: var(--cw-font-mono);
    font-size: 0.75rem;
    color: var(--cw-ink-faint);
    text-decoration: none;
    padding: 0 0.4rem;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .navbar__version:hover {
    color: var(--cw-primary);
  }

  .navbar__version-label--short {
    display: none;
  }

  @media (max-width: 940px) {
    .navbar__version-label--full {
      display: none;
    }
    .navbar__version-label--short {
      display: inline;
    }
  }

  /* Below 560px the version link drops its "V." label too, leaving just
     the bare date (the un-wrapped {version} text after both label spans)
     rather than disappearing outright: see the @media (max-width: 940px)
     block below, which also unwraps navbar__start/navbar__end into flat
     flex children of navbar__inner so all 5 elements (logo, hamburger,
     version, GitHub, theme toggle) space evenly edge-to-edge instead of
     clumping on the left once the hamburger drawer hides the primary nav
     links that used to fill the middle. */
  @media (max-width: 560px) {
    .navbar__version-label--short {
      display: none;
    }
  }

  .navbar__icon-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    flex-shrink: 0;
    border-radius: var(--cw-radius-md);
    color: var(--cw-ink-soft);
  }

  .navbar__icon-link:hover {
    background: var(--cw-primary-soft);
    color: var(--cw-primary);
  }

  @media (max-width: 940px) {
    /* The full "Commonway System" wordmark measures ~147px wide at its
       desktop 2.5rem height, the single biggest element in the bar, wider
       than all 4 icons/buttons combined, real overflow at 375px once
       flex-shrink is disabled below (see navbar__brand/menu-btn/icon-link/
       toggle flex-shrink: 0). Shrinking it here is what actually made room
       for 5 evenly-spaced elements, not the version-text shortening alone. */
    .navbar__brand-mark {
      height: 1.75rem;
    }
    .navbar__menu-btn {
      display: inline-flex;
    }
    .navbar__links {
      display: none;
    }
    /* display: contents removes navbar__start/navbar__end's own box (and
       the gap between the two-groups-worth of items it used to enforce)
       without touching the DOM, so their children (logo, hamburger button,
       version link, GitHub icon, theme toggle) become direct flex items of
       navbar__inner and its justify-content: space-between spreads all 5
       evenly across the full width instead of leaving them clumped on the
       left with an empty gap on the right. */
    .navbar__start,
    .navbar__end {
      display: contents;
    }
    /* navbar__inner's 1.5rem gap is sized for the desktop 3-group layout
       (brand block / nav links / icon block); once navbar__start and
       navbar__end unwrap into 5 flat children above, that same gap would
       apply 4 times over (~96px) on top of whatever justify-content:
       space-between already distributes, real overflow at 375px. A small
       floor here just stops items from visually touching if space-between
       ever compresses all the way down; it isn't doing the primary
       spacing job on mobile the way it does on desktop.
    */
    .navbar__inner {
      gap: 0.5rem;
    }
  }
</style>
