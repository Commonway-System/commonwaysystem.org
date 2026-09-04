<script lang="ts">
  interface Props {
    /** Numbered badge shown in text, linking to the source list. */
    index?: number
    /** Flags a claim that still needs a citation, using the reserved amber. */
    unsourced?: boolean
    /** Overrides the default `#ref-{index}` anchor, for the rare page whose reference list ids don't follow that pattern. */
    href?: string
  }

  const { index, unsourced = false, href }: Props = $props()
  const resolvedHref = $derived(href ?? (index !== undefined ? `#ref-${index}` : undefined))
</script>

<!--
  These are self-contained pill badges (fixed background + fixed text
  color from --cw-evidence-fg / --cw-ink-fixed), so unlike body text they
  don't need a separate dark-mode variant, the pairing's contrast doesn't
  depend on the surrounding page background.

  Font-size is 12px, not the guide's --type-micro (10px). The 10px spec
  passes WCAG's 4.5:1 contrast minimum on paper (5.01:1), but that ratio
  doesn't account for a numeral actually being legible at 10px in a tight
  colored pill; it read as an illegible dot in testing. Sized up for real
  legibility, a deliberate correction to the working draft, documented in
  the Brand Guide's Accessibility notes. The white text-shadow is a further
  legibility aid, a soft halo that sharpens the dark glyph edges against the
  saturated fill; it doesn't change the underlying text color or contrast
  ratio, both already documented above.
-->
{#if unsourced}
  <sup class="citation citation--unsourced" title="Unsourced claim">&#9888;</sup>
{:else if index !== undefined}
  <sup class="citation">
    <a href={resolvedHref}>{index}</a>
  </sup>
{/if}

<style>
  .citation {
    line-height: 1;
  }

  .citation a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.5em;
    padding: 1px 6px;
    border-radius: 9px;
    margin-left: 2px;
    background: var(--cw-evidence-evidence);
    color: var(--cw-evidence-fg);
    text-decoration: none;
    font-size: 12px;
    font-weight: 600;
    text-shadow: 0 0 3px #ffffff;
  }

  .citation a:hover {
    background: var(--cw-teal-hover);
  }

  .citation--unsourced {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1px 7px;
    border-radius: 9px;
    margin-left: 2px;
    background: var(--cw-amber);
    color: var(--cw-ink-fixed);
    font-size: 12px;
    font-weight: 600;
    text-shadow: 0 0 3px #ffffff;
    cursor: help;
  }
</style>
