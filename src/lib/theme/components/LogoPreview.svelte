<script lang="ts">
  interface Props {
    src: string
    /** Fixed light or dark background, independent of the site's own theme, so the pairing this logo variant is meant for is always visible. */
    background: 'light' | 'dark'
    label: string
  }

  const { src, background, label }: Props = $props()
</script>

<figure class="logo-preview">
  <div class="logo-preview__stage" data-background={background}>
    <img src={src} alt={label} />
  </div>
  <figcaption>{label}</figcaption>
</figure>

<style>
  .logo-preview {
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .logo-preview__stage {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    border-radius: var(--cw-radius-md);
    border: 1px solid var(--cw-hairline);
  }

  .logo-preview__stage[data-background='light'] {
    background: #fdfaf3;
  }

  .logo-preview__stage[data-background='dark'] {
    background: #141414;
  }

  .logo-preview__stage img {
    max-width: 100%;
    max-height: 4rem;
  }

  figcaption {
    font-size: var(--cw-text-sm);
    color: var(--cw-ink-soft);
    text-align: center;
  }
</style>
