<script lang="ts">
  import options from 'virtual:commonway/options'

  const gaId = options.googleAnalyticsId

  // Built from concatenated pieces, and injected via {@html}, rather than
  // writing literal script tags directly below: a literal opening tag
  // spelled out inside this file's own script block confuses Svelte's
  // tokenizer into misreading it as a nested tag, even quoted inside a JS
  // string or comment. Splitting the tag name across a concatenation avoids
  // that literal substring ever appearing in the source at all.
  const TAG_OPEN = `<${'script'}`
  const TAG_CLOSE = `<${'/script'}>`

  const gaScriptHtml = gaId
    ? [
        `${TAG_OPEN} async src="https://www.googletagmanager.com/gtag/js?id=${gaId}">${TAG_CLOSE}`,
        `${TAG_OPEN}>`,
        `window.dataLayer = window.dataLayer || [];`,
        `function gtag(){dataLayer.push(arguments);}`,
        `gtag('js', new Date());`,
        `gtag('config', '${gaId}');`,
        TAG_CLOSE,
      ].join('\n')
    : ''
</script>

<svelte:head>
  {#if gaId && import.meta.env.PROD}
    {@html gaScriptHtml}
  {/if}
</svelte:head>
