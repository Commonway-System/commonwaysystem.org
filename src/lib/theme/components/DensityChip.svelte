<script lang="ts">
  type Tier = 'Undeveloped' | 'Rural' | 'Suburban' | 'Compact' | 'Urban' | 'Core'

  interface Props {
    tier: Tier
  }

  const { tier }: Props = $props()

  // Undeveloped through Core reads as a light-to-dark ramp on one hue family,
  // deliberately distinct from the amber accent and the classification colors
  // so it never gets confused with either system.
  const shades: Record<Tier, string> = {
    Undeveloped: '#efe9dd',
    Rural: '#dccdaf',
    Suburban: '#c3a97e',
    Compact: '#a3844f',
    Urban: '#7c6238',
    Core: '#4a3a20',
  }

  const ink: Record<Tier, string> = {
    Undeveloped: '#4a3a20',
    Rural: '#4a3a20',
    Suburban: '#3a2c14',
    // Dark ink, not the light cream Urban/Core use: cream on Compact's mid-tan
    // was only 3.29:1 (fails the 4.5:1 text minimum); this is 4.87:1.
    Compact: '#241a0a',
    Urban: '#fbf7ee',
    Core: '#fbf7ee',
  }
</script>

<span class="chip" style:background={shades[tier]} style:color={ink[tier]}>
  {tier}
</span>

<style>
  .chip {
    display: inline-flex;
    align-items: center;
    padding: 0.15rem 0.55rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.01em;
  }
</style>
