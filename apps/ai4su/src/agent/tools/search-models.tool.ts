import { searchModels } from '@/domain/models'
import type { ModelSearchParams } from '@/domain/types'

export const searchModelsTool = {
  name: 'search-models',
  description: 'Search and filter the 24 open-source AI models by text, sector, or country.',
  parameters: {
    q: { type: 'string' as const, description: 'Text search on name, description, sector' },
    sector: { type: 'string' as const, description: 'Sector filter (agriculture, healthcare, fintech, education, environment, logistics)' },
    country: { type: 'string' as const, description: 'Country code filter (KE, NG, GH, SN, RW, ZA, EG, MA)' },
    page: { type: 'number' as const, description: 'Page number (default: 1)' },
    limit: { type: 'number' as const, description: 'Items per page (default: 20, max: 100)' },
  },
  execute(params: ModelSearchParams) {
    return searchModels(params)
  },
}
