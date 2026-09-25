<script lang="ts">
  interface Cell {
    text: string
    /** Speed above 45 mph: links to the retrofit that makes it acceptable. */
    retrofit?: boolean
  }

  interface Row {
    label: string
    cells: Cell[]
  }

  interface Props {
    /** Column headings, first one for the row-label column. */
    head: string[]
    rows: Row[]
    /** Where a `retrofit` cell links. */
    retrofitHref: string
    caption?: string
  }

  const { head, rows, retrofitHref, caption }: Props = $props()
</script>

<!--
  Used inside SpeedLimitSection's slot, where a markdown table would not
  parse (nested-component slot, see CLAUDE.md), so this renders real markup
  from data. Small enough not to need the sitewide scroll wrapper: four
  short columns inside the stacked speed card.
-->
<div class="stt">
  {#if caption}<p class="stt__caption">{caption}</p>{/if}
  <table class="stt__table">
    <thead>
      <tr>{#each head as h}<th scope="col">{h}</th>{/each}</tr>
    </thead>
    <tbody>
      {#each rows as row}
        <tr>
          <th scope="row">{row.label}</th>
          {#each row.cells as c}
            <td>{c.text}{#if c.retrofit}, <a href={retrofitHref}>requires the retrofit</a>{/if}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .stt {
    margin: 0.75rem 0;
  }
  .stt__caption {
    margin: 0 0 0.4rem;
    font-size: var(--cw-text-sm);
    font-weight: 600;
  }
  .stt :global(.stt__table) {
    width: 100%;
    margin: 0;
    font-size: var(--cw-text-sm);
  }
  .stt :global(.stt__table th),
  .stt :global(.stt__table td) {
    padding: 0.4rem 0.6rem;
    vertical-align: top;
  }
  .stt :global(.stt__table thead th) {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--cw-ink-faint);
  }
</style>
