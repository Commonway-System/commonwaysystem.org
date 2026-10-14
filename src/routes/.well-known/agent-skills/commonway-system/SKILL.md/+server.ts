import { skillMd } from '$lib/server/agent-skill.js'

export const prerender = true

export function GET() {
  return new Response(skillMd(), { headers: { 'content-type': 'text/markdown; charset=utf-8' } })
}
