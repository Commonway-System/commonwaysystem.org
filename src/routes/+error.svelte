<script lang="ts">
  import { page } from '$app/state'
  import options from 'virtual:commonway/options'

  // Custom error page. On the live site this is what build/404.html shows
  // (svelte.config.js's `fallback`): Netlify serves that file with a 404
  // status for any address that has no page, and the router renders this
  // inside the normal navbar and sidebar. <main id="main-content"> keeps the
  // skip link and landmarks working the same as on every content page.
  const is404 = $derived(page.status === 404)
  const title = $derived(is404 ? 'Page not found' : 'Something went wrong')
  const links = (options.navbar ?? []).filter((l: { to?: string }) => l.to && l.to !== '/')
</script>

<svelte:head>
  <title>{title} · {options.siteTitle}</title>
  <meta name="robots" content="noindex, follow" />
</svelte:head>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<main class="error" id="main-content" tabindex="-1">
  <p class="error__code">{page.status}</p>
  <h1>{title}</h1>
  {#if is404}
    <p>
      There's no page at <code>{page.url.pathname}</code>. It may have moved when a pattern was renamed or merged,
      or the address may have a typo.
    </p>
  {:else}
    <p>The page couldn't be shown. Try reloading, or come back in a few minutes.</p>
  {/if}
  <p>
    Try <a href="/search/">searching the guidebook</a>, browsing the <a href="/about/sitemap/">Site Map</a>,
    or start from one of the main sections:
  </p>
  <nav aria-label="Main sections">
    <ul>
      <li><a href="/">Home</a></li>
      {#each links as link}
        <li><a href={link.to}>{link.title}</a></li>
      {/each}
    </ul>
  </nav>
  <p class="error__report">
    Followed a broken link on this publication? <a href="/about/reporting/">Report a Problem</a> so it can be fixed.
  </p>
</main>

<style>
  .error {
    grid-area: content;
    max-width: var(--cw-content-max-width);
    width: 100%;
    margin: 0 auto;
    padding: 3rem 1.5rem 4rem;
    box-sizing: border-box;
  }

  .error:focus {
    outline: none;
  }

  .error__code {
    margin: 0;
    font-family: var(--cw-font-mono);
    font-size: var(--cw-text-sm);
    font-weight: 600;
    letter-spacing: 0.08em;
    color: var(--cw-ink-soft);
  }

  h1 {
    margin: 0.25rem 0 1rem;
    font-family: var(--cw-font-display);
    font-size: clamp(2rem, 5vw, 2.75rem);
    line-height: 1.1;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.25rem;
    padding: 0;
    margin: 0 0 1.5rem;
    list-style: none;
  }

  ul a {
    display: inline-block;
    padding: 0.25rem 0;
    font-weight: 600;
  }

  .error__report {
    padding-top: 1rem;
    border-top: 1px solid var(--cw-hairline);
    color: var(--cw-ink-soft);
    font-size: var(--cw-text-sm);
  }
</style>
