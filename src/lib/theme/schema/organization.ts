import type { Organization, Person, WebSite, WithContext } from 'schema-dts'
import { SITE_URL } from '$lib/site.js'

/**
 * The person behind the Commonway System. Reused as both the sitewide
 * Organization's `founder` below and, alongside the Organization, as a
 * co-author on every TechArticle/BlogPosting (see page.ts's `author`
 * array) — one definition, so his name/url/sameAs can't drift between the
 * two. `sameAs` is schema.org's standard "this is the same real-world
 * entity as this profile" signal, read by Google's own author/E-E-A-T
 * guidance, not decorative metadata.
 */
export function buildAuthorPerson(): Person {
  return {
    '@type': 'Person',
    name: 'Kevin Young',
    url: 'https://kevinyoung.net',
    sameAs: [
      'https://www.linkedin.com/in/youngkev/',
      'https://github.com/rdytogokev',
      'https://www.facebook.com/rdytogo',
      'https://about.me/kevinyoung7',
    ],
  }
}

/**
 * Sitewide singletons, injected once via GlobalLayout so every page carries
 * exactly one Organization and one WebSite block (see GlobalLayout.svelte).
 */
export function buildOrganization(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Commonway System',
    url: SITE_URL,
    founder: buildAuthorPerson(),
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
