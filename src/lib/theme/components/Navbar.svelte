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
    border: none;
    background: transparent;
    color: var(--cw-ink);
    border-radius: var(--cw-radius-md);
    cursor: pointer;
  }

  .navbar__brand {
    display: inline-flex;
    align-items: center;
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

  @media (max-width: 560px) {
    .navbar__version {
      display: none;
    }
  }

  .navbar__icon-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: var(--cw-radius-md);
    color: var(--cw-ink-soft);
  }

  .navbar__icon-link:hover {
    background: var(--cw-primary-soft);
    color: var(--cw-primary);
  }

  @media (max-width: 940px) {
    .navbar__menu-btn {
      display: inline-flex;
    }
    .navbar__links {
      display: none;
    }
  }
</style>
