<script lang="ts">
  import { pageAnchors } from '../layout.js'
</script>

{#if $pageAnchors.length}
  <aside class="toc">
    <p class="toc__label">On this page</p>
    <nav aria-label="On this page">
      {#each $pageAnchors as anchor (anchor.id)}
        <a href="#{anchor.id}" class="toc__link" style:--depth={anchor.depth - 2}>{anchor.text}</a>
      {/each}
    </nav>
  </aside>
{/if}

<style>
  .toc {
    grid-area: toc;
    align-self: start;
    position: sticky;
    top: calc(var(--cw-navbar-height) + 1.5rem);
    max-height: calc(100vh - var(--cw-navbar-height) - 3rem);
    overflow-y: auto;
    padding: 0 0.5rem;
  }

  .toc__label {
    margin: 0 0 0.6rem;
    font-family: var(--cw-font-display);
    font-weight: 600;
    font-size: var(--cw-text-sm);
    color: var(--cw-ink-faint);
  }

  .toc__link {
    display: block;
    padding: 0.25rem 0 0.25rem calc(var(--depth, 0) * 0.75rem);
    font-size: 0.8125rem;
    color: var(--cw-ink-soft);
    text-decoration: none;
    line-height: 1.4;
    border-left: 2px solid transparent;
  }

  .toc__link:hover {
    color: var(--cw-primary);
  }

  @media (max-width: 1180px) {
    .toc {
      display: none;
    }
  }
</style>
