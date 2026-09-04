<script lang="ts">
  import { getBlogPosts } from '../blog.js'

  const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]

  // Parses the ISO date string's digits directly rather than through
  // `new Date(iso)`, so this can't drift a day depending on the reader's
  // browser timezone, same reasoning as +layout.server.ts's commit-date
  // formatter.
  function formatDate(iso: string): string {
    const [year, month, day] = iso.split('-').map(Number)
    return `${MONTHS[month - 1]} ${day}, ${year}`
  }

  const posts = getBlogPosts()
</script>

{#if posts.length === 0}
  <p class="blog-index__empty">No posts yet.</p>
{:else}
  <ol class="blog-index">
    {#each posts as post (post.routePath)}
      <li class="blog-index__item">
        <a class="blog-index__title" href={post.routePath}>{post.title}</a>
        {#if post.date}
          <span class="blog-index__date">{formatDate(post.date)}</span>
        {/if}
        {#if post.description}
          <p class="blog-index__description">{post.description}</p>
        {/if}
      </li>
    {/each}
  </ol>
{/if}

<style>
  .blog-index {
    list-style: none;
    margin: 1.5rem 0;
    padding: 0;
  }

  .blog-index__item {
    padding: 1rem 0;
    border-bottom: 1px solid var(--cw-hairline);
  }

  .blog-index__item:first-child {
    padding-top: 0;
  }

  .blog-index__title {
    font-family: var(--cw-font-display);
    font-weight: 600;
    font-size: var(--cw-text-lg);
  }

  .blog-index__date {
    display: block;
    margin-top: 0.2rem;
    font-size: var(--cw-text-sm);
    color: var(--cw-ink-faint);
  }

  .blog-index__description {
    margin: 0.5rem 0 0;
    color: var(--cw-ink-soft);
  }

  .blog-index__empty {
    color: var(--cw-ink-faint);
  }
</style>
