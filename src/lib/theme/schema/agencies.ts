import type { CollectionPage, GovernmentOrganization, WithContext } from 'schema-dts'
import { altNames, countries, getAgencies, regionName } from '$lib/data/agencies/index.js'
import type { Agency } from '$lib/data/agencies/index.js'
import { SITE_URL } from '$lib/site.js'

// The Road Agency Directory's JSON-LD. Imported only by
// src/routes/references/road-agencies/+page.md, which renders it with
// <JsonLd>, never by schema/page.ts: PageLayout imports page.ts on every
// page, so importing the agency data there would bundle all of it into a
// chunk every page preloads (it did until 2026.11.10, about 525 KB raw).

/**
 * One Road Agency Directory entry as a GovernmentOrganization. Its @id is the
 * entry's anchor on the directory page; `url` is the agency's own site.
 * Office phone and email only (the data never holds a named person's), and
 * only unlabeled ones.
 */
function buildAgency(a: Agency): GovernmentOrganization {
  const website = a.contacts.find(c => c.type === 'website')?.url
  // Only a general line or inbox: a labeled one is for something narrower
  // (Alabama's planning inbox), not the agency's own number.
  const phone = a.contacts.find(c => c.type === 'phone' && !c.label)?.phone
  const email = a.contacts.find(c => c.type === 'email' && !c.label)?.email
  const alternateName = [a.abbr, ...altNames(a).map(n => n.name)].filter((n): n is string => !!n)
  const country = countries[a.country]?.name ?? a.country
  const region = regionName(a)
  return {
    '@type': 'GovernmentOrganization',
    '@id': `${SITE_URL}/references/road-agencies/#${a.id}`,
    'name': a.name,
    ...(alternateName.length ? { alternateName } : {}),
    ...(website ? { url: website } : {}),
    ...(a.handles ? { description: a.handles } : {}),
    'areaServed': a.area
      ? { '@type': 'AdministrativeArea', 'name': `${a.area}, ${region}` }
      : region
        ? { '@type': 'AdministrativeArea', 'name': region, 'containedInPlace': { '@type': 'Country', name: country } }
        : { '@type': 'Country', 'name': country },
    ...(phone ? { telephone: phone } : {}),
    ...(email ? { email } : {}),
  }
}

/**
 * The directory page's CollectionPage, every agency in its ItemList. Every
 * agency is in the prerendered table, so marking them up here describes what
 * the page already shows. `fm` is the page's frontmatter and
 * `dateModifiedISO` the same git date PageLayout uses (page.data.lastModifiedISO).
 */
export function buildAgencyDirectorySchemas(fm: Record<string, any>, dateModifiedISO: string | null): WithContext<CollectionPage>[] {
  const agencies = [...getAgencies()].sort((x, y) => x.name.localeCompare(y.name, 'en'))
  return [{
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': fm.title,
    ...(fm.description ? { description: fm.description } : {}),
    ...(dateModifiedISO ? { dateModified: dateModifiedISO } : {}),
    'mainEntity': {
      '@type': 'ItemList',
      'numberOfItems': agencies.length,
      'itemListElement': agencies.map((a, i) => ({ '@type': 'ListItem', 'position': i + 1, 'item': buildAgency(a) })),
    },
  }]
}
