<script lang="ts">
  import { page } from '$app/state'
  import { displaySettings, resetDisplaySettings, updateDisplaySettings } from '../display-settings.js'
  import type { TextSize } from '../display-settings.js'

  const sizes: { value: TextSize, label: string, aria: string }[] = [
    { value: 'default', label: 'A', aria: 'Default text size' },
    { value: 'large', label: 'A', aria: 'Large text (112%)' },
    { value: 'larger', label: 'A', aria: 'Larger text (125%)' },
    { value: 'largest', label: 'A', aria: 'Largest text (150%)' },
  ]
</script>

<div class="ds">
  <fieldset class="ds__group">
    <legend>Text size</legend>
    <div class="ds__sizes">
      {#each sizes as size, i (size.value)}
        <label class="ds__size" style:--step={i}>
          <input
            type="radio"
            name="cw-text-size"
            value={size.value}
            checked={$displaySettings.textSize === size.value}
            onchange={() => updateDisplaySettings({ textSize: size.value })}
          />
          <span aria-hidden="true">{size.label}</span>
          <span class="cw-sr-only">{size.aria}</span>
        </label>
      {/each}
    </div>
  </fieldset>

  <fieldset class="ds__group">
    <legend>Contrast</legend>
    <label class="ds__check">
      <input
        type="checkbox"
        checked={$displaySettings.contrast === 'high'}
        onchange={(e) => updateDisplaySettings({ contrast: e.currentTarget.checked ? 'high' : 'default' })}
      />
      <span>High contrast<small>Pure black and white, solid borders, underlined links, and text labels for classification colors.</small></span>
    </label>
  </fieldset>

  <fieldset class="ds__group">
    <legend>Page layout</legend>
    <label class="ds__check">
      <input
        type="checkbox"
        checked={$displaySettings.simplifiedView}
        onchange={(e) => updateDisplaySettings({ simplifiedView: e.currentTarget.checked })}
      />
      <span>Simplified view<small>One column, plain font, no decoration or animation, everything expanded.</small></span>
    </label>
  </fieldset>

  <fieldset class="ds__group">
    <legend>Keyboard focus</legend>
    <label class="ds__check">
      <input
        type="checkbox"
        checked={$displaySettings.enhancedFocus}
        onchange={(e) => updateDisplaySettings({ enhancedFocus: e.currentTarget.checked })}
      />
      <span>Enhanced focus outline<small>A thicker two-color ring that stays visible on any background.</small></span>
    </label>
  </fieldset>

  <fieldset class="ds__group">
    <legend>Mouse pointer</legend>
    <label class="ds__check">
      <input
        type="checkbox"
        checked={$displaySettings.largePointer}
        onchange={(e) => updateDisplaySettings({ largePointer: e.currentTarget.checked })}
      />
      <span>Large pointer<small>Larger arrow over the page. Your operating system's pointer-size setting works everywhere, including outside this page.</small></span>
    </label>
    <label class="ds__check">
      <input
        type="checkbox"
        checked={$displaySettings.pointerHalo}
        onchange={(e) => updateDisplaySettings({ pointerHalo: e.currentTarget.checked })}
      />
      <span>Pointer highlight<small>A translucent yellow circle that follows the pointer.</small></span>
    </label>
  </fieldset>

  <a class="ds__textlink" href={`/text${page.url.pathname}`}>Open the text-only version of this page</a>

  <button type="button" class="ds__reset" onclick={resetDisplaySettings}>Reset to defaults</button>
</div>

<style>
  .ds {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-size: var(--cw-text-sm);
    color: var(--cw-ink);
  }

  .ds__group {
    margin: 0;
    padding: 0;
    border: 0;
    min-width: 0;
  }

  .ds__group legend {
    padding: 0;
    margin-bottom: 0.4rem;
    font-family: var(--cw-font-display);
    font-weight: 600;
    color: var(--cw-ink-faint);
  }

  .ds__sizes {
    display: flex;
    gap: 0.4rem;
  }

  .ds__size {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 1 1 0;
    min-height: 44px;
    border: 1px solid var(--cw-hairline-strong);
    border-radius: var(--cw-radius-md);
    cursor: pointer;
    font-family: var(--cw-font-display);
    font-weight: 600;
    /* Each step's "A" is drawn larger than the last, as a preview. */
    font-size: calc(0.875rem + var(--step) * 0.25rem);
  }

  .ds__size input {
    position: absolute;
    inset: 0;
    opacity: 0;
    margin: 0;
    cursor: pointer;
  }

  .ds__size:has(input:checked) {
    background: var(--cw-primary-soft);
    border-color: var(--cw-primary);
    color: var(--cw-primary);
  }

  .ds__size:has(input:focus-visible) {
    outline: 2px solid var(--cw-primary);
    outline-offset: 2px;
  }

  .ds__check {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    padding: 0.4rem 0;
    min-height: 44px;
    cursor: pointer;
  }

  .ds__check input {
    flex: none;
    width: 1.15rem;
    height: 1.15rem;
    margin: 0.15rem 0 0;
    accent-color: var(--cw-primary);
  }

  .ds__check small {
    display: block;
    margin-top: 0.15rem;
    color: var(--cw-ink-soft);
    line-height: 1.35;
  }

  .ds__textlink {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    font-weight: 600;
  }

  .ds__reset {
    align-self: flex-start;
    min-height: 36px;
    padding: 0.3rem 0.8rem;
    background: transparent;
    color: var(--cw-ink);
    border: 1px solid var(--cw-hairline-strong);
    border-radius: var(--cw-radius-md);
    font: inherit;
    cursor: pointer;
  }

  .ds__reset:hover {
    background: var(--cw-primary-soft);
  }
</style>
