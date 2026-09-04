import type { Organization, WebSite, WithContext } from 'schema-dts'
import { SITE_URL } from '$lib/site.js'

/**
 * Sitewide singletons, injected once via GlobalLayout so every page carries
 * exactly one Organization and one WebSite block (see GlobalLayout.svelte).
 * Kevin is named `founder` here, not `author` on individual pages: the site
 * already frames it this way in prose (About > The Commonway System), the
 * citation trail carries authority, not a named credential on every article.
 */
export function buildOrganization(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Commonway System',
    url: SITE_URL,
    founder: {
      '@type': 'Person',
      name: 'Kevin',
    },
    // The square icon (no wordmark), matching Google's own Logo rich-result
    // guidance: a roughly square raster image, not the full wordmark lockup.
    logo: `${SITE_URL}/logos/square-logo-dark-variation-commonway-for-light-backgrounds.png`,
  }
}

export function buildWebSite(): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Commonway System',
    url: SITE_URL,
    // No SearchAction: no site search exists yet. Add one if that's ever built.
  }
}
