<script lang="ts">
  interface Props {
    show: boolean
    onclose: () => void
  }

  const { show, onclose }: Props = $props()
</script>

{#if show}
  <button type="button" class="backdrop" aria-label="Close menu" onclick={onclose}></button>
{/if}

<style>
  .backdrop {
    position: fixed;
    inset: var(--cw-navbar-height) 0 0 0;
    background: rgba(27, 21, 35, 0.45);
    border: none;
    padding: 0;
    z-index: 40;
    cursor: default;
  }
</style>
