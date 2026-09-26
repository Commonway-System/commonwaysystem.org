<script lang="ts">
  /**
   * The key for the "Color symbols" display setting: every Scale hue beside
   * the ColorSym symbol(s) that mark it. Always visible, whether or not the
   * setting is on. The tab itself is styled in styles/color-symbols.css.
   */
  const rows: { key: string, reads: string, name: string, means: string }[] = [
    { key: 'network', reads: 'Dot', name: 'Network', means: 'Red' },
    { key: 'corridor', reads: 'Line', name: 'Corridor', means: 'Yellow' },
    { key: 'local', reads: 'Line, then green (line and chevron together)', name: 'Local street', means: 'Yellow leaning green' },
    { key: 'collector', reads: 'Green (line and chevron together)', name: 'Collector street', means: 'Green' },
    { key: 'arterial', reads: 'Green, then chevron', name: 'Arterial street', means: 'Green leaning blue' },
    { key: 'freeway', reads: 'Chevron, then green', name: 'Freeway', means: 'Blue leaning green' },
    { key: 'intersections', reads: 'Chevron', name: 'Intersections and crossings', means: 'Blue' },
    { key: 'facility', reads: 'Violet (dot and chevron together)', name: 'Facility', means: 'Violet' },
    { key: 'element', reads: 'Violet, then dot', name: 'Element', means: 'Violet leaning red' },
  ]
</script>

<div class="cw-table-wrap">
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div
    class="cw-table-scroll"
    tabindex="0"
    role="group"
    aria-label="Color symbol key. Use arrow keys, or swipe, to see columns beyond the visible area."
  >
    <table class="csk">
      <thead>
        <tr>
          <th scope="col">Scale or classification</th>
          <th scope="col">Color</th>
          <th scope="col">Symbol</th>
          <th scope="col">Reads as</th>
        </tr>
      </thead>
      <tbody>
        {#each rows as row (row.key)}
          <tr>
            <th scope="row">{row.name}</th>
            <td><span class="csk__chip" style:background={`var(--cw-${row.key}-suburban)`} aria-hidden="true"></span>{row.means}</td>
            <td><span class="cw-symtab" data-symkey={row.key} aria-hidden="true"></span></td>
            <td>{row.reads}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .csk__chip {
    display: inline-block;
    width: 0.9rem;
    height: 0.9rem;
    margin-right: 0.5rem;
    vertical-align: -0.1rem;
    border-radius: 50%;
    border: 1px solid var(--cw-hairline-strong);
  }
</style>
