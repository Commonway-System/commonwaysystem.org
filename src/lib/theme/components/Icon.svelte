<script lang="ts">
  interface Props {
    name: 'menu' | 'close' | 'chevron-down' | 'chevron-right' | 'sun' | 'moon' | 'arrow-left' | 'arrow-right' | 'github' | 'external'
    size?: number
  }

  const { name, size = 20 }: Props = $props()

  const paths: Record<Props['name'], string> = {
    'menu': 'M4 7h16M4 12h16M4 17h16',
    'close': 'M6 6l12 12M18 6L6 18',
    'chevron-down': 'M6 9l6 6 6-6',
    'chevron-right': 'M9 6l6 6-6 6',
    'sun': 'M12 4V2M12 22v-2M4.9 4.9L3.5 3.5M20.5 20.5l-1.4-1.4M4 12H2M22 12h-2M4.9 19.1l-1.4 1.4M20.5 3.5l-1.4 1.4M12 17a5 5 0 100-10 5 5 0 000 10z',
    'moon': 'M20.5 14.5A8.5 8.5 0 119.5 3.5a7 7 0 0011 11z',
    'arrow-left': 'M19 12H5M11 6l-6 6 6 6',
    'arrow-right': 'M5 12h14M13 6l6 6-6 6',
    'github': 'M12 2C6.5 2 2 6.6 2 12.3c0 4.5 2.9 8.4 7 9.8.5.1.7-.2.7-.5v-1.8c-2.9.6-3.5-1.4-3.5-1.4-.5-1.2-1.1-1.6-1.1-1.6-.9-.6.1-.6.1-.6 1 .1 1.5 1.1 1.5 1.1.9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.6-1.4-2.3-.3-4.7-1.2-4.7-5.2 0-1.1.4-2 1.1-2.8-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1a10 10 0 015.4 0c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.7 1.1 2.8 0 4-2.4 4.9-4.7 5.2.4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 4.1-1.4 7-5.3 7-9.8C22 6.6 17.5 2 12 2z',
    'external': 'M7 17L17 7M8 7h9v9',
  }
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="1.8"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
>
  <path d={paths[name]} />
</svg>
