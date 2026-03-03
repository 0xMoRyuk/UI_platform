import { z } from 'zod'
import { PaginationParamsSchema } from './common.schema'

export const ActivityTypeEnum = z.enum(['event', 'research', 'workshop', 'women-founders'])

export const SearchActivitiesInputSchema = PaginationParamsSchema.extend({
  type: ActivityTypeEnum.optional(),
  country: z.string().optional(),
})

export const GetActivityInputSchema = z.object({
  id: z.string().min(1),
})

export type SearchActivitiesInput = z.infer<typeof SearchActivitiesInputSchema>
