<script lang="ts">
  type Status = 'recommended' | 'situational' | 'avoid' | 'descriptive'

  interface Props {
    status: Status
  }

  const { status }: Props = $props()

  const labels: Record<Status, string> = {
    recommended: 'Recommended',
    situational: 'Situational / Discouraged',
    avoid: 'Avoid',
    descriptive: 'Descriptive',
  }
</script>

<span class="status-badge" data-status={status}>{labels[status]}</span>

<style>
  /* Extracted from PatternCard's own status pill so PatternIndexCard can
     reuse the exact same badge rather than re-declaring these rules a
     second time (Svelte's CSS scoping means a class name alone can't be
     shared across components). Quiet by design, per the Brand Guide's
     status-badge intent: Recommended is the unremarkable default, so it
     gets no color emphasis, just a neutral pill, while Situational and
     Avoid reuse the same warning/danger tokens the :::warning and
     :::danger admonitions already use. */
  .status-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.15rem 0.55rem;
    border-radius: 999px;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.01em;
  }

  .status-badge[data-status='recommended'] {
    background: var(--cw-paper);
    color: var(--cw-ink-soft);
    border: 1px solid var(--cw-hairline-strong);
  }

  .status-badge[data-status='situational'] {
    background: var(--cw-warning-soft);
    color: var(--cw-amber-ink);
  }

  .status-badge[data-status='avoid'] {
    background: var(--cw-danger-soft);
    color: var(--cw-danger);
  }

  /* Descriptive: an existing condition being documented, not a design
     choice being weighed (e.g. Organic/Irregular, NET-ORG-04). Reuses
     --cw-primary-soft (cool slate-blue) rather than the warning/danger
     tokens, since it isn't a caution, just a different badge intent -
     "this is real and named" instead of "recommended/situational/avoid." */
  .status-badge[data-status='descriptive'] {
    background: var(--cw-primary-soft);
    color: var(--cw-descriptive-ink);
  }
</style>
