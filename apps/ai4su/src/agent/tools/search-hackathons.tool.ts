import { searchHackathons } from '@/domain/hackathons'
import type { HackathonSearchParams } from '@/domain/types'

export const searchHackathonsTool = {
  name: 'search-hackathons',
  description: 'Search hackathon events, optionally filter by country.',
  parameters: {
    country: { type: 'string' as const, description: 'Country code filter (KE, NG, GH, SN, RW, ZA, EG, MA)' },
    page: { type: 'number' as const, description: 'Page number (default: 1)' },
    limit: { type: 'number' as const, description: 'Items per page (default: 20)' },
  },
  execute(params: HackathonSearchParams) {
    return searchHackathons(params)
  },
}
