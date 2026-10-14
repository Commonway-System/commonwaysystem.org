/**
 * Agent Skill published at /.well-known/agent-skills/commonway-system/SKILL.md
 * and listed in /.well-known/agent-skills/index.json (Agent Skills Discovery,
 * draft v0.2.0). Built at prerender time from the page list, so the counts
 * and section links stay in step with the guidebook.
 */
import { createHash } from 'node:crypto'
import { SITE_URL, markdownPath } from '$lib/site.js'
import { getSitePages } from './content.js'

export const SKILL_NAME = 'commonway-system'
export const SKILL_PATH = `/.well-known/agent-skills/${SKILL_NAME}/SKILL.md`
export const SKILL_DESCRIPTION
  = 'Use when answering questions about street and road design with the Commonway System guidebook (commonwaysystem.org): its Street Typology patterns and Pattern IDs (e.g. LOC-BBG-12), Retrofit Strategies (RFT-CDR-01), density tiers, design speed rules, evidence tiers, and where to read each page as Markdown.'

const md = (routePath: string) => `${SITE_URL}${markdownPath(routePath)}`

export function skillMd(): string {
  const pages = getSitePages().filter(p => !p.utility)
  const patterns = pages.filter(p => p.routePath.startsWith('/patterns/') && p.patternId)
  const retrofits = pages.filter(p => p.routePath.startsWith('/retrofits/') && p.patternId)

  return `---
name: ${SKILL_NAME}
description: ${SKILL_DESCRIPTION}
---

# Commonway System

Commonway System is a public guidebook: a pattern language for roads and streets. It organizes established transportation design guidance (MUTCD, AASHTO, NACTO, Dutch Sustainable Safety, Vision Zero research and others) into one cross-referenced set of patterns. Every prescriptive claim cites a source, and each citation carries an evidence tier.

## Where to read

- ${SITE_URL}/llms.txt: every page, grouped by section, with a one-line summary and a Markdown link.
- ${SITE_URL}/llms-full.txt: the whole guidebook as one Markdown file.
- Any page is available as Markdown at its URL with \`.md\` appended (\`/patterns/foo/\` becomes \`/patterns/foo.md\`; the homepage is \`/index.md\`).
- Start here: ${md('/guide/')} (Guide), ${md('/patterns/')} (Pattern Index, ${patterns.length} patterns), ${md('/retrofits/')} (Retrofit Strategy Index, ${retrofits.length} strategies).
- How to read a pattern: ${md('/guide/how-to-read-a-pattern/')}. Pattern ID format: ${md('/guide/pattern-ids/')}.
- Each HTML page also carries schema.org JSON-LD (TechArticle with the Pattern ID as \`identifier\`, BreadcrumbList, Organization, WebSite).

## How the guidebook is organized

- **Pattern IDs** are \`PREFIX-CODE-##\`. The prefix is the Scale: NET (Network), CDR (Corridor), LOC, COL, ART, FRE (Local, Collector, Arterial and Freeway street segments), INT (Intersections and crossings), FAC (Facility), ELM (Element). Numbers are assigned once and not reused.
- **Status** on a pattern: Recommended, Situational, Avoid, or Descriptive (describes what exists without endorsing it).
- **Retrofit Strategies** (\`RFT-CDR-##\`, \`RFT-INT-##\`, \`RFT-NET-##\`) describe how to change an existing street into a target pattern. They carry no status.
- **Evidence tiers** on every reference: Legal/regulatory, Evidence-based, Precedent-based.
- **Density tiers**: Undeveloped, Rural, Suburban, Compact, Urban, Core.

## Rules for answering

- Cite the page you used by its URL, and the Pattern ID when there is one.
- Report a pattern's status as the page states it; do not upgrade Situational to Recommended.
- Claims marked "unsourced" on a page are flagged as not yet backed by a citation; say so if you repeat one.
- The guidebook is general reference, not engineering advice for a specific street. See ${md('/about/terms-and-conditions/')}.
`
}

export function skillIndex() {
  const digest = createHash('sha256').update(skillMd(), 'utf8').digest('hex')
  return {
    $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
    skills: [
      {
        name: SKILL_NAME,
        type: 'skill-md',
        description: SKILL_DESCRIPTION,
        url: `${SITE_URL}${SKILL_PATH}`,
        digest: `sha256:${digest}`,
      },
    ],
  }
}
