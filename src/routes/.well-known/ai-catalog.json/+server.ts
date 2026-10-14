import { SITE_URL } from '$lib/site.js'
import { SKILL_DESCRIPTION, SKILL_PATH } from '$lib/server/agent-skill.js'

// AI Catalog (Agentic Resource Discovery), prerendered to
// /.well-known/ai-catalog.json and found through robots.txt's Agentmap line
// and the Link header in static/_headers. The catalog is a contract: list
// only things that resolve. The publication runs no MCP server or agent, so
// it lists the two real resources it has: the Agent Skill and the OKF bundle
// (written after the build by scripts/generate-agent-files.mjs).
// https://specification.website/spec/agent-readiness/agentic-resource-discovery/
export const prerender = true

export function GET() {
  const updatedAt = `${new Date().toISOString().slice(0, 10)}T00:00:00Z`
  const catalog = {
    specVersion: '1.0',
    host: {
      displayName: 'Commonway System',
      identifier: 'commonwaysystem.org',
      documentationUrl: `${SITE_URL}/about/website-audit/#agent-readiness`,
      logoUrl: `${SITE_URL}/favicons/icon-512.png`,
    },
    entries: [
      {
        identifier: 'urn:ai:commonwaysystem.org:skill:commonway-system',
        displayName: 'Commonway System: Agent Skill',
        description: `${SKILL_DESCRIPTION} Served as SKILL.md (text/markdown) and listed in /.well-known/agent-skills/index.json.`,
        mediaType: 'text/markdown',
        type: 'text/markdown',
        url: `${SITE_URL}${SKILL_PATH}`,
        representativeQueries: [
          'what does the Commonway System recommend for a collector street',
          'what does the Pattern ID LOC-BBG-12 mean',
          'which retrofit turns a four-lane road into three lanes',
        ],
        tags: ['agent-skill', 'street-design', 'transportation', 'pattern-language'],
        updatedAt,
      },
      {
        identifier: 'urn:ai:commonwaysystem.org:bundle:okf',
        displayName: 'Commonway System: OKF bundle',
        description: 'The whole guidebook as an Open Knowledge Format (v0.2) bundle: one Markdown concept per page with typed front matter (patterns carry their Pattern ID and status), each page\'s numbered references as sources with their evidence tier, a mirrored concept per cited work, folder indexes and a change log. Browsable at /okf/ or downloadable as one gzipped tar. The media type is interim and unregistered.',
        mediaType: 'application/okf-bundle+gzip',
        type: 'application/okf-bundle+gzip',
        url: `${SITE_URL}/okf.tar.gz`,
        representativeQueries: [
          'give me the whole Commonway System guidebook as one download',
          'list every street pattern with its Pattern ID and status',
          'which sources does the Commonway System cite, and how strong is each',
        ],
        tags: ['okf', 'knowledge-bundle', 'street-design', 'transportation'],
        updatedAt,
      },
    ],
  }
  return new Response(`${JSON.stringify(catalog, null, 2)}\n`, { headers: { 'content-type': 'application/ai-catalog+json' } })
}
