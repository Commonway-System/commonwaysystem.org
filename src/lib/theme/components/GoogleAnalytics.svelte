<script lang="ts">
  import options from 'virtual:commonway/options'
  import { consent } from '../consent.js'

  const gaId = options.googleAnalyticsId

  type GtagWindow = Window & { dataLayer?: unknown[], gtag?: (...args: unknown[]) => void } & Record<string, unknown>

  // Opt-in only (see consent.ts and CookieBanner.svelte). Built with
  // document.createElement rather than {@html}: script tags inserted as
  // HTML strings never run after client-side navigation, and this has to
  // run whenever consent flips to 'granted', not just on first load.
  // Production builds only, so `pnpm run dev` never sends traffic.
  $effect(() => {
    if (!gaId || !import.meta.env.PROD || $consent !== 'granted')
      return
    const w = window as unknown as GtagWindow
    w[`ga-disable-${gaId}`] = false
    if (document.getElementById('cw-gtag'))
      return
    w.dataLayer = w.dataLayer || []
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer!.push(arguments)
    }
    w.gtag('js', new Date())
    w.gtag('config', gaId, { cookie_flags: 'SameSite=Lax;Secure' })
    const el = document.createElement('script')
    el.id = 'cw-gtag'
    el.async = true
    el.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    document.head.appendChild(el)
  })

  // Opt-out after opting in: stop further hits at once and delete the
  // cookies Google Analytics set (_ga, _ga_<id>).
  $effect(() => {
    if (!gaId || $consent !== 'denied')
      return
    ;(window as unknown as GtagWindow)[`ga-disable-${gaId}`] = true
    const host = location.hostname.replace(/^www\./, '')
    for (const name of document.cookie.split(';').map(c => c.split('=')[0].trim())) {
      if (!/^_ga(_|$)/.test(name))
        continue
      for (const domain of ['', `; domain=${host}`, `; domain=.${host}`])
        document.cookie = `${name}=; max-age=0; path=/${domain}`
    }
  })
</script>
