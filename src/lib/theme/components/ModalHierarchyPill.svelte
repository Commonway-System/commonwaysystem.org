<script lang="ts">
  type Mode = 'pedestrian' | 'bicycle' | 'transit' | 'vehicle' | 'freight'
  type Classification = 'local' | 'collector' | 'arterial'

  interface Props {
    mode: Mode
    classification: Classification
  }

  const { mode, classification }: Props = $props()

  const labels: Record<Mode, string> = {
    pedestrian: 'Pedestrian',
    bicycle: 'Bicycle',
    transit: 'Transit',
    vehicle: 'Vehicle',
    freight: 'Freight',
  }

  // Lucide icons (person-standing, bike, tram-front, car, truck), ISC
  // license: see /THIRD-PARTY-NOTICES in the repo root (also linked from
  // /about/terms-and-conditions/'s "Code and content licensing" section).
  // Trusted, hardcoded markup (not user input), same viewBox/stroke
  // convention Lucide ships (24x24, stroke-width 2, round caps/joins),
  // injected via {@html} since each icon is several shapes (circles +
  // paths), not one path string like Icon.svelte's set.
  const iconMarkup: Record<Mode, string> = {
    pedestrian: '<circle cx="12" cy="5" r="1"/><path d="m9 20 3-6 3 6"/><path d="m6 8 6 2 6-2"/><path d="M12 10v4"/>',
    bicycle: '<circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/>',
    transit: '<rect width="16" height="16" x="4" y="3" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><path d="m8 19-2 3"/><path d="m18 22-2-3"/><path d="M8 15h.01"/><path d="M16 15h.01"/>',
    vehicle: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
    freight: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
  }
</script>

<span class="modal-pill" data-classification={classification}>
  <span class="modal-pill__icon-circle">
    <svg class="modal-pill__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      {@html iconMarkup[mode]}
    </svg>
  </span>
  {labels[mode]}
</span>

<style>
  .modal-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.15rem 0.55rem 0.15rem 0.15rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.01em;
    white-space: nowrap;
  }

  .modal-pill[data-classification='local'] {
    background: var(--cw-local);
    color: var(--cw-local-pill-fg);
  }

  .modal-pill[data-classification='collector'] {
    background: var(--cw-collector);
    color: var(--cw-collector-pill-fg);
  }

  /* Arterial's green only clears ~2.3-3.6:1 against either black or
     white text, short of the 4.5:1 text minimum either way. White reads
     far more clearly than black here, so per the user's own call, a
     dark glow (text-shadow / icon drop-shadow) stands in for contrast
     rather than picking the "technically passing" but harder-to-read
     black. */
  .modal-pill[data-classification='arterial'] {
    background: var(--cw-arterial);
    color: var(--cw-arterial-pill-fg);
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.75);
  }

  .modal-pill[data-classification='arterial'] .modal-pill__icon {
    filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.75));
  }

  .modal-pill__icon-circle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.2);
    flex-shrink: 0;
  }

  .modal-pill__icon {
    width: 0.8rem;
    height: 0.8rem;
  }
</style>
