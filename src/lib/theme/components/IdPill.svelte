<script lang="ts">
  /**
   * A Pattern or Retrofit Strategy ID written in prose, drawn as a small pill
   * with a dot in its classification's color (a Retrofit Strategy's dot is
   * its scale's Pattern peer, as on its index card). The parentheses stay in
   * the text for screen readers, copy and the text-only and markdown copies;
   * only their glyphs are hidden. The dot is decoration: the ID's prefix
   * already names the classification.
   */
  import { pageAccent } from '../page-header.js'

  interface Props {
    id: string
  }

  const { id }: Props = $props()
  const kind = $derived(pageAccent('', id))
</script>

<span class="cw-id" data-kind={kind} translate="no"><span class="cw-id__paren">(</span>{id}<span class="cw-id__paren">)</span></span>
