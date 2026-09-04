<script lang="ts">
  interface Props {
    mph: number
  }

  const { mph }: Props = $props()
</script>

<!--
  A simplified MUTCD R2-1 Speed Limit sign: white face, black border and
  rule, "SPEED"/"LIMIT" over the numeral. Colors are hardcoded black/white
  rather than theme tokens on purpose, the same reasoning as EvidenceChip's
  fixed fills: a real regulatory sign is legally black-on-white, not a
  brand-token pairing that should shift with dark mode.
-->
<svg
  class="speed-limit-sign"
  viewBox="0 0 100 120"
  role="img"
  aria-label="Speed limit {mph} miles per hour sign"
>
  <rect x="4" y="4" width="92" height="112" rx="7" fill="#fff" stroke="#000" stroke-width="6" />
  <rect x="12" y="12" width="76" height="96" rx="3" fill="none" stroke="#000" stroke-width="1.5" />
  <text x="50" y="28" class="speed-limit-sign__word">SPEED</text>
  <text x="50" y="43" class="speed-limit-sign__word">LIMIT</text>
  <text x="50" y="94" class="speed-limit-sign__number">{mph}</text>
</svg>

<style>
  .speed-limit-sign {
    display: block;
    width: 3.5rem;
    height: auto;
    flex-shrink: 0;
  }

  .speed-limit-sign__word {
    font-family: 'Arial Narrow', Arial, sans-serif;
    font-weight: 700;
    font-size: 11px;
    letter-spacing: 0.03em;
    text-anchor: middle;
    fill: #000;
  }

  .speed-limit-sign__number {
    font-family: Arial, sans-serif;
    font-weight: 900;
    font-size: 44px;
    text-anchor: middle;
    fill: #000;
  }

  @media (max-width: 560px) {
    .speed-limit-sign {
      width: 2.9rem;
    }
  }
</style>
