<script lang="ts">
  type Tier = 'legal' | 'evidence' | 'precedent'

  interface Props {
    tier: Tier
  }

  const { tier }: Props = $props()

  const labels: Record<Tier, string> = {
    legal: 'Legal / regulatory',
    evidence: 'Evidence-based',
    precedent: 'Precedent-based',
  }
</script>

<!-- Self-contained pills: fixed fill + fixed text color, same reasoning as Citation.svelte. -->
<span class="evidence-chip" data-tier={tier}>{labels[tier]}</span>

<style>
  .evidence-chip {
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0.65rem;
    border-radius: 999px;
    font-size: var(--cw-text-sm);
    font-weight: 600;
    color: var(--cw-evidence-fg);
  }

  .evidence-chip[data-tier='legal'] {
    background: var(--cw-evidence-legal);
    color: var(--cw-paper-fixed);
  }

  .evidence-chip[data-tier='evidence'] {
    background: var(--cw-evidence-evidence);
  }

  .evidence-chip[data-tier='precedent'] {
    background: var(--cw-evidence-precedent);
  }
</style>
