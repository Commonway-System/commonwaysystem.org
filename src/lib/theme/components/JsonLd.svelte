<script lang="ts">
  import type { Thing, WithContext } from 'schema-dts'

  interface Props {
    schemas: WithContext<Thing>[]
  }

  const { schemas }: Props = $props()

  // Same concatenated-tag trick as GoogleAnalytics.svelte: a literal
  // "<script" substring inside this file's own script block confuses
  // Svelte's tokenizer into misreading it as a nested tag boundary, even
  // quoted inside a JS string.
  const TAG_OPEN = `<${'script'} type="application/ld+json">`
  const TAG_CLOSE = `<${'/script'}>`

  // A script element's content isn't HTML-entity-decoded by the browser
  // (unlike normal text nodes), so escaping the angle bracket as <, not
  // an HTML entity, is what keeps a closing-tag sequence inside a string
  // value (a headline quoting something, say) from prematurely ending the
  // tag when this is injected via @html, while still parsing back as valid
  // JSON afterward.
  function toScriptTag(schema: WithContext<Thing>): string {
    return `${TAG_OPEN}${JSON.stringify(schema).replace(/</g, '\\u003c')}${TAG_CLOSE}`
  }
</script>

<svelte:head>
  {#each schemas as schema}
    {@html toScriptTag(schema)}
  {/each}
</svelte:head>
