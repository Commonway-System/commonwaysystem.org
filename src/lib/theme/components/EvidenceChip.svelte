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
    padding: 0.1rem 0.45rem;
    margin-right: 0.4rem;
    border-radius: 999px;
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.01em;
    color: var(--cw-evidence-fg);
    vertical-align: 0.05em;
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
