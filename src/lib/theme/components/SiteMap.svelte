<script lang="ts">
  import { page } from '$app/state'
  import type { SiteMapLink, SiteMapSection } from '../sitemap-types.js'

  // Rendered by /about/sitemap/. The data comes from that route's
  // +page.server.ts (built at prerender time from the sidebar tree and every
  // page's frontmatter), so there is no list to maintain by hand.
  const sections = $derived((page.data.siteMap ?? []) as SiteMapSection[])
</script>

{#snippet list(links: SiteMapLink[])}
  <ul>
    {#each links as link, i (`${link.href}-${i}`)}
      <li>
        {#if link.href}
          <a href={link.href}>{link.title}</a>
          {#if link.id}<code class="sm__id">{link.id}</code>{/if}
        {:else}
          {link.title}
        {/if}
        {#if link.children?.length}
          {@render list(link.children)}
        {/if}
      </li>
    {/each}
  </ul>
{/snippet}

{#each sections as section (section.id)}
  <section class="sm__section">
    <h2 id={section.id}>{section.title}</h2>
    {#if section.links.length}
      {@render list(section.links)}
    {/if}
    {#each section.groups as group (group.title)}
      <h3>{group.title}</h3>
      {@render list(group.links)}
    {/each}
  </section>
{/each}

<style>
  .sm__id {
    margin-left: 0.4rem;
    font-size: 0.8125rem;
    color: var(--cw-ink-soft);
  }
</style>
