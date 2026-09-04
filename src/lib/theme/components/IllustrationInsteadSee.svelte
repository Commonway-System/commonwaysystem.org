<script lang="ts">
  interface LinkItem {
    label: string
    href: string
    id: string
    /** Separator rendered before this item; defaults to ", ". Use " + " to show two patterns as a combined alternative. */
    joiner?: string
  }

  interface Props {
    links: LinkItem[]
  }

  const { links }: Props = $props()
</script>

<!--
  Required closing field for Single-condition (Avoid-pattern) illustrations,
  per the Brand Guide spec. Takes a structured `links` prop and renders real
  <a> tags itself, rather than markdown [text](url) syntax in the page body:
  markdown link syntax doesn't resolve inside a component nested inside
  another component's children on this site's markdown pipeline (confirmed
  live - it rendered as literal bracket text), so no page anywhere nests a
  markdown link inside a component slot. These are internal links, so a
  hand-rendered <a> here needs no external-link auto-decoration, same
  reasoning as PageLayout's own edit link or Navbar's nav links.
-->
<p class="illustration-instead">
  <strong>Instead, see:</strong>
  {#each links as link, i (link.href)}
    {#if i > 0}{link.joiner ?? ', '}{/if}<a href={link.href}>{link.label}</a> ({link.id})
  {/each}
</p>

<style>
  .illustration-instead {
    flex: 1 1 100%;
    margin: 0.25rem 0 0;
    font-size: var(--cw-text-sm);
  }
</style>
