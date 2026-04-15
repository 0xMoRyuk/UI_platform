import { searchActivities, type ActivitySearchParams } from '@/domain/activities'

export const searchActivitiesTool = {
  name: 'search-activities',
  description: 'Search ecosystem activities (events, research, workshops, networking, and capacity-building sessions).',
  parameters: {
    type: {
      type: 'string' as const,
      description: 'Activity type filter (event, research, workshop, hackathon, networking, capacity building)',
    },
    country: { type: 'string' as const, description: 'Country code filter' },
    page: { type: 'number' as const, description: 'Page number (default: 1)' },
    limit: { type: 'number' as const, description: 'Items per page (default: 20)' },
  },
  execute(params: ActivitySearchParams) {
    return searchActivities(params)
  },
}
