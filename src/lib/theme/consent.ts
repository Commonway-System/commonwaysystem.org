import { browser } from '$app/environment'
import { writable } from 'svelte/store'

/**
 * Analytics consent (Google Analytics only; nothing else on the publication
 * sets cookies). GoogleAnalytics.svelte loads gtag only once this is
 * 'granted'; CookieBanner.svelte asks; the footer's "Cookie settings"
 * button reopens the choice. Stored in localStorage, never a cookie.
 */
export type Consent = 'granted' | 'denied' | null

const KEY = 'commonway-cookie-consent'

/** Global Privacy Control: the browser-level "do not sell or share" signal. */
function gpcOn(): boolean {
  return browser && (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true
}

function read(): Consent {
  if (!browser)
    return null
  try {
    const v = localStorage.getItem(KEY)
    if (v === 'granted' || v === 'denied')
      return v
  }
  catch {}
  // No stored choice: a GPC signal counts as declining analytics. The reader
  // can still opt in from "Cookie settings" in the footer.
  return gpcOn() ? 'denied' : null
}

/** The reader's analytics choice; null until they choose. */
export const consent = writable<Consent>(read())

/** True while the banner should show (first visit, or reopened from the footer). */
export const consentPanelOpen = writable<boolean>(browser ? read() === null : false)

export function setConsent(value: Exclude<Consent, null>) {
  try {
    localStorage.setItem(KEY, value)
  }
  catch {}
  consent.set(value)
  consentPanelOpen.set(false)
}

export function reopenConsent() {
  consentPanelOpen.set(true)
}
