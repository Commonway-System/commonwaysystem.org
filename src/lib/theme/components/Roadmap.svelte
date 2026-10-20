<script lang="ts">
  // The Roadmap on /about/release-history/, rendered from the open items
  // list in src/lib/data/roadmap.ts. One h3 per category with a visible
  // item, in roadmapCategories order; two or more items sit in the
  // cw-tiles wrapper, a single item is a plain list. `id` and `next` never
  // render, and `hidden` items are left out. Descriptions allow markdown
  // links and `code`. The headings match what rehype-slug and the heading
  // anchor plugin produced when this was markdown, so "On this page" and
  // old #links keep working.
  import { roadmap, roadmapCategories } from '$lib/data/roadmap'
  import { externalLinkAttrs } from '$lib/site'

  const groups = roadmapCategories
    .map(category => ({ category, items: roadmap.filter(i => i.category === category && !i.hidden) }))
    .filter(g => g.items.length)

  // Same rule as github-slugger for these plain names.
  function slug(text: string) {
    return text.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/ /g, '-')
  }

  function escape(text: string) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  }

  function inline(text: string) {
    return escape(text)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
        const attrs = externalLinkAttrs(href)
        const extra = attrs.target ? ` target="${attrs.target}" rel="${attrs.rel}"` : ''
        const note = attrs.target ? '<span class="cw-sr-only"> (opens in new tab)</span>' : ''
        return `<a href="${href}"${extra}>${label}${note}</a>`
      })
  }
</script>

{#snippet list(items: typeof roadmap)}
  <ul>
    {#each items as item (item.id)}
      <li><strong>{item.title}.</strong> {@html inline(item.description)}</li>
    {/each}
  </ul>
{/snippet}

{#each groups as g (g.category)}
  <h3 id={slug(g.category)}><a href="#{slug(g.category)}" class="svp-heading-anchor" aria-label="Link to this heading" data-pagefind-ignore="all">#</a>{g.category}</h3>
  {#if g.items.length > 1}
    <div class="cw-tiles">{@render list(g.items)}</div>
  {:else}
    {@render list(g.items)}
  {/if}
{/each}
