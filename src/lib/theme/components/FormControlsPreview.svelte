<script lang="ts">
  const classifications = ['Local', 'Collector', 'Arterial', 'Freeway']
</script>

<!--
  Decorative preview of the eventual pattern-index filter controls. Not
  wired to real filtering, just demonstrates the control styling and the
  teal focus ring from the Brand Guide spec.
-->
<div class="form-preview">
  <label class="form-preview__field">
    <span>Search patterns</span>
    <input type="search" placeholder="e.g. bicycle boulevard" />
  </label>

  <fieldset class="form-preview__field">
    <legend>Functional Classification</legend>
    <div class="form-preview__checks">
      {#each classifications as name (name)}
        <label class="form-preview__check">
          <input type="checkbox" />
          {name}
        </label>
      {/each}
    </div>
  </fieldset>

  <label class="form-preview__field">
    <span>Sort by</span>
    <select>
      <option>Pattern ID</option>
      <option>Alphabetical</option>
    </select>
  </label>
</div>

<style>
  .form-preview {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
  }

  .form-preview__field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    margin: 0;
    padding: 0;
    border: none;
  }

  .form-preview__field > span,
  .form-preview__field legend {
    font-size: var(--cw-text-sm);
    font-weight: 600;
    color: var(--cw-ink);
    padding: 0;
  }

  .form-preview input[type='search'],
  .form-preview select {
    font: inherit;
    font-size: var(--cw-text-sm);
    padding: 0.5rem 0.65rem;
    border-radius: var(--cw-radius-sm);
    border: 1px solid var(--cw-hairline-strong);
    background: var(--cw-paper);
    color: var(--cw-ink);
  }

  .form-preview__checks {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 1rem;
  }

  .form-preview__check {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: var(--cw-text-sm);
    font-weight: 400;
    color: var(--cw-ink-soft);
  }

  .form-preview input:focus-visible,
  .form-preview select:focus-visible {
    outline: 2px solid var(--cw-teal);
    outline-offset: 1px;
    border-radius: var(--cw-radius-sm);
  }
</style>
