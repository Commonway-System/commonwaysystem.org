import { SITE_URL } from '$lib/site.js'

// Prerendered to a plain static file (see kit.prerender.entries in
// svelte.config.js, nothing links to this route so it needs listing
// explicitly). The whole guidebook is public, and AI use is welcome:
// search, AI answers that cite the publication, and model training
// (decided 2026.10.14, see /about/website-audit/). The named AI crawlers
// below are listed so that policy is explicit rather than implied by the
// catch-all; each gets the same rules as everyone else.
export const prerender = true

const AI_CRAWLERS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
  'Google-Extended', 'Applebot-Extended',
  'PerplexityBot', 'Perplexity-User',
  'CCBot', 'Meta-ExternalAgent', 'Amazonbot', 'Bytespider', 'cohere-ai', 'DuckAssistBot', 'MistralAI-User',
]

// The search index's own data files are for the in-page search only. The
// text-only copies and /search/ stay crawlable so crawlers can read their
// noindex tags (a Disallow would hide those).
// Content Signals (https://contentsignals.org/) sit inside each group.
const RULES = 'Content-Signal: search=yes, ai-input=yes, ai-train=yes\nAllow: /\nDisallow: /pagefind/'

export function GET() {
  const body = [
    '# Commonway System: a public guidebook. Search, AI answers and AI training are all welcome.',
    'User-agent: *',
    RULES,
    '',
    '# AI crawlers, named so the policy above is explicit. Same rules as everyone else.',
    ...AI_CRAWLERS.map(ua => `User-agent: ${ua}`),
    RULES,
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '# AI Catalog (Agentic Resource Discovery): the Agent Skill and the OKF bundle.',
    `Agentmap: ${SITE_URL}/.well-known/ai-catalog.json`,
    '',
  ].join('\n')

  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  })
}
