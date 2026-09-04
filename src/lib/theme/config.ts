export interface NavLink {
  title: string
  to: string
}

export interface SidebarLink {
  title: string
  to?: string
  items?: SidebarLink[]
  collapsible?: boolean
}

export interface CommonwayThemeOptions {
  /** Shown in the browser tab and used as a fallback page title. */
  siteTitle: string
  siteDescription?: string
  /** Wordmark text in the navbar. Falls back to siteTitle. */
  logoText?: string
  navbar?: NavLink[]
  /** Manual sidebar, keyed by route prefix, e.g. "/guide/". */
  sidebar?: Record<string, SidebarLink[]>
  github?: string
  /** Template for the "Suggest changes" link. Use :route as a placeholder. */
  editLink?: string
  footerNote?: string
  /** GA4 Measurement ID, e.g. "G-VCDS38HY87". Omit to skip Google Analytics entirely. */
  googleAnalyticsId?: string
}
