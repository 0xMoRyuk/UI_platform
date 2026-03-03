import { getHackathonBySlug, resolveHackathonModels } from '@/domain/hackathons'

export const getHackathonTool = {
  name: 'get-hackathon',
  description: 'Retrieve a single hackathon by slug, with resolved AI models.',
  parameters: {
    slug: { type: 'string' as const, description: 'The hackathon slug (e.g., nairobi-ai-agriculture-2025)' },
  },
  execute(params: { slug: string }) {
    const hackathon = getHackathonBySlug(params.slug)
    if (!hackathon) return null
    return { ...hackathon, models: resolveHackathonModels(hackathon) }
  },
}
