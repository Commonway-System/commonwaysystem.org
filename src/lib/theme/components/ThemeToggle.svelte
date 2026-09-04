<script lang="ts">
  import { isDark, toggleColorScheme } from '../layout.js'
  import Icon from './Icon.svelte'
</script>

<button
  type="button"
  class="toggle"
  onclick={toggleColorScheme}
  aria-label={$isDark ? 'Switch to light mode' : 'Switch to dark mode'}
  title={$isDark ? 'Switch to light mode' : 'Switch to dark mode'}
>
  <Icon name={$isDark ? 'sun' : 'moon'} size={18} />
</button>

<style>
  .toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: var(--cw-radius-md);
    border: 1px solid transparent;
    background: transparent;
    color: var(--cw-ink-soft);
    cursor: pointer;
  }

  .toggle:hover {
    background: var(--cw-primary-soft);
    color: var(--cw-primary);
  }
</style>
