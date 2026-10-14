import { skillIndex } from '$lib/server/agent-skill.js'

export const prerender = true

export function GET() {
  return new Response(`${JSON.stringify(skillIndex(), null, 2)}\n`, { headers: { 'content-type': 'application/json' } })
}
